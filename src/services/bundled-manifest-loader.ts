import { readFile, access, readdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { PackageManifest } from './package-discovery.js';
import { CustomElementsManifest } from '../types/index.js';

export interface BundledManifestLoaderOptions {
  /**
   * Path to the bundled manifests directory. If not provided, will use default location
   */
  bundledManifestsPath?: string;
}

export class BundledManifestLoader {
  private _manifestCache = new Map<string, PackageManifest | null>();
  private readonly _bundledManifestsPath: string;

  constructor(options: BundledManifestLoaderOptions = {}) {
    // Default to the bundled manifests in the dist directory
    this._bundledManifestsPath =
      options.bundledManifestsPath || this._getDefaultBundledManifestsPath();
  }

  /**
   * Load all available bundled Tyler Tech manifests
   */
  public async loadBundledManifests(): Promise<PackageManifest[]> {
    const manifests: PackageManifest[] = [];

    try {
      // Check if bundled manifests directory exists
      await access(this._bundledManifestsPath);

      // Read all files in the bundled manifests directory
      const files = await readdir(this._bundledManifestsPath);
      const manifestFiles = files.filter(file =>
        file.endsWith('-custom-elements.json'),
      );

      for (const file of manifestFiles) {
        const manifest = await this.loadBundledManifest(file);
        if (manifest) {
          manifests.push(manifest);
        }
      }
    } catch {
      // Directory doesn't exist or isn't accessible - this is expected in some environments
    }

    return manifests;
  }

  /**
   * Load a specific bundled manifest by filename
   */
  public async loadBundledManifest(
    filename: string,
  ): Promise<PackageManifest | null> {
    const cacheKey = `bundled:${filename}`;

    if (this._manifestCache.has(cacheKey)) {
      return this._manifestCache.get(cacheKey) as PackageManifest | null;
    }

    try {
      const filePath = join(this._bundledManifestsPath, filename);
      await access(filePath);

      const content = await readFile(filePath, 'utf-8');
      const parsedContent = JSON.parse(content) as CustomElementsManifest;

      // Extract package name from filename
      // @tylertech-forge-custom-elements.json → @tylertech/forge
      const packageName = this._extractPackageNameFromFilename(filename);

      const manifest: PackageManifest = {
        packageName,
        manifestPath: filePath,
        content: parsedContent,
      };

      this._manifestCache.set(cacheKey, manifest);
      return manifest;
    } catch {
      // Failed to load bundled manifest
      this._manifestCache.set(cacheKey, null);
      return null;
    }
  }

  /**
   * Check if bundled manifests are available
   */
  public async hasBundledManifests(): Promise<boolean> {
    try {
      await access(this._bundledManifestsPath);
      const files = await readdir(this._bundledManifestsPath);
      return files.some(file => file.endsWith('-custom-elements.json'));
    } catch {
      return false;
    }
  }

  /**
   * Clear the manifest cache
   */
  public clearCache(): void {
    this._manifestCache.clear();
  }

  /**
   * Get the default bundled manifests directory path
   */
  private _getDefaultBundledManifestsPath(): string {
    // Get the current file's directory and navigate to the bundled manifests
    const currentFile = fileURLToPath(import.meta.url);
    const currentDir = dirname(currentFile);

    // From src/services/ navigate to dist/bundled-manifests/
    // In development: src/services/ → ../dist/bundled-manifests/
    // In production: dist/services/ → ../bundled-manifests/
    return join(currentDir, '..', 'bundled-manifests');
  }

  /**
   * Extract package name from bundled manifest filename
   */
  private _extractPackageNameFromFilename(filename: string): string {
    // @tylertech-forge-custom-elements.json → @tylertech/forge

    if (filename.startsWith('@tylertech-forge-')) {
      return '@tylertech/forge';
    }

    // Fallback: try to extract from pattern
    const match = filename.match(/^(@tylertech)-(.+)-custom-elements\.json$/);
    if (match) {
      return `${match[1]}/${match[2]}`;
    }

    // Last resort: use filename without extension
    return filename.replace('-custom-elements.json', '').replace('-', '/');
  }
}

// Singleton instance
let bundledManifestLoaderInstance: BundledManifestLoader | null = null;

/**
 * Get the singleton bundled manifest loader instance
 */
export function getBundledManifestLoader(
  options?: BundledManifestLoaderOptions,
): BundledManifestLoader {
  if (!bundledManifestLoaderInstance) {
    bundledManifestLoaderInstance = new BundledManifestLoader(options);
  }
  return bundledManifestLoaderInstance;
}
