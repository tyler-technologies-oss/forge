import { access, readFile } from 'fs/promises';
import { join } from 'path';
import {
  getProjectDiscoveryService,
  ProjectDiscoveryService,
} from './project-discovery.js';

export interface PackageManifest {
  packageName: string;
  manifestPath: string;
  content: any;
}

export interface PackageDiscoveryOptions {
  /**
   * Starting directory for discovery. Defaults to process.cwd()
   */
  startPath?: string;

  /**
   * Name of the manifest file to look for. Defaults to 'custom-elements.json'
   */
  manifestFileName?: string;

  /**
   * Whether to stop at the first found manifest or continue searching all project roots
   */
  stopAtFirst?: boolean;
}

export class PackageDiscoveryService {
  private _projectDiscovery: ProjectDiscoveryService;
  private _manifestCache = new Map<string, PackageManifest | null>();

  constructor(projectDiscovery?: ProjectDiscoveryService) {
    this._projectDiscovery = projectDiscovery || getProjectDiscoveryService();
  }

  /**
   * Discover a specific package's manifest file
   */
  public async discoverPackageManifest(
    packageName: string,
    options: PackageDiscoveryOptions = {},
  ): Promise<PackageManifest | null> {
    const {
      startPath = process.cwd(),
      manifestFileName = 'custom-elements.json',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      stopAtFirst = true,
    } = options;

    const cacheKey = `${packageName}:${startPath}:${manifestFileName}`;
    if (this._manifestCache.has(cacheKey)) {
      return this._manifestCache.get(cacheKey) as PackageManifest | null;
    }

    const nodeModulesPaths =
      await this._projectDiscovery.getNodeModulesPaths(startPath);

    for (const nodeModulesPath of nodeModulesPaths) {
      const packagePath = join(nodeModulesPath, packageName);
      const manifestPath = join(packagePath, manifestFileName);

      try {
        await access(manifestPath);
        const content = await readFile(manifestPath, 'utf-8');
        const manifest: PackageManifest = {
          packageName,
          manifestPath,
          content: JSON.parse(content),
        };

        this._manifestCache.set(cacheKey, manifest);
        return manifest;
      } catch {
        // Package not found or manifest not readable, continue searching
        continue;
      }
    }

    // Cache the null result to avoid repeated searches
    this._manifestCache.set(cacheKey, null);
    return null;
  }

  /**
   * Discover manifests from multiple packages
   */
  public async discoverMultiplePackageManifests(
    packageNames: string[],
    options: PackageDiscoveryOptions = {},
  ): Promise<PackageManifest[]> {
    const manifests: PackageManifest[] = [];

    await Promise.all(
      packageNames.map(async packageName => {
        const manifest = await this.discoverPackageManifest(
          packageName,
          options,
        );
        if (manifest) {
          manifests.push(manifest);
        }
      }),
    );

    return manifests;
  }

  /**
   * Check if a specific package exists in any of the discovered node_modules
   */
  public async hasPackage(
    packageName: string,
    startPath: string = process.cwd(),
  ): Promise<boolean> {
    const nodeModulesPaths =
      await this._projectDiscovery.getNodeModulesPaths(startPath);

    for (const nodeModulesPath of nodeModulesPaths) {
      const packagePath = join(nodeModulesPath, packageName);
      try {
        await access(packagePath);
        return true;
      } catch {
        continue;
      }
    }

    return false;
  }

  /**
   * Get the package.json for a specific package
   */
  public async getPackageInfo(
    packageName: string,
    startPath: string = process.cwd(),
  ): Promise<any | null> {
    const nodeModulesPaths =
      await this._projectDiscovery.getNodeModulesPaths(startPath);

    for (const nodeModulesPath of nodeModulesPaths) {
      const packageJsonPath = join(
        nodeModulesPath,
        packageName,
        'package.json',
      );
      try {
        const content = await readFile(packageJsonPath, 'utf-8');
        return JSON.parse(content);
      } catch {
        continue;
      }
    }

    return null;
  }

  /**
   * Discover all Tyler Technologies packages that have custom-elements.json manifests
   */
  public async discoverTylerTechPackages(
    options: PackageDiscoveryOptions = {},
  ): Promise<PackageManifest[]> {
    const {
      startPath = process.cwd(),
      manifestFileName = 'custom-elements.json',
    } = options;

    const knownPackages = ['@tylertech/forge'];

    // First, try the known packages
    const manifests = await this.discoverMultiplePackageManifests(
      knownPackages,
      options,
    );

    // Optionally, we could search for other @tylertech packages dynamically
    // This would require scanning the node_modules/@tylertech directory
    const additionalManifests = await this._discoverAdditionalTylerTechPackages(
      startPath,
      manifestFileName,
      knownPackages,
    );

    return [...manifests, ...additionalManifests];
  }

  /**
   * Clear the manifest cache
   */
  public clearCache(): void {
    this._manifestCache.clear();
    this._projectDiscovery.clearCache();
  }

  /**
   * Discover additional Tyler Tech packages not in the known list
   */
  private async _discoverAdditionalTylerTechPackages(
    startPath: string,
    manifestFileName: string,
    knownPackages: string[],
  ): Promise<PackageManifest[]> {
    const manifests: PackageManifest[] = [];
    const nodeModulesPaths =
      await this._projectDiscovery.getNodeModulesPaths(startPath);

    for (const nodeModulesPath of nodeModulesPaths) {
      const tylerTechPath = join(nodeModulesPath, '@tylertech');

      try {
        await access(tylerTechPath);

        // This would require reading the directory and checking each package
        // For now, we'll skip this optimization and stick to known packages
        // to avoid the complexity of directory scanning
      } catch {
        continue;
      }
    }

    return manifests;
  }
}

// Singleton instance
let packageDiscoveryInstance: PackageDiscoveryService | null = null;

/**
 * Get the singleton package discovery service instance
 */
export function getPackageDiscoveryService(): PackageDiscoveryService {
  if (!packageDiscoveryInstance) {
    packageDiscoveryInstance = new PackageDiscoveryService();
  }
  return packageDiscoveryInstance;
}
