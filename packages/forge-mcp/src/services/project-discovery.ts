import { access, readFile } from 'fs/promises';
import { join, dirname } from 'path';

export interface ProjectInfo {
  rootPath: string;
  type: 'npm' | 'yarn' | 'pnpm' | 'git' | 'unknown';
  hasNodeModules: boolean;
  isMonorepo: boolean;
}

export class ProjectDiscoveryService {
  private _discoveryCache = new Map<string, ProjectInfo[]>();

  /**
   * Discover project roots starting from the given directory and walking up
   */
  public async discoverProjectRoots(
    startPath: string = process.cwd(),
  ): Promise<ProjectInfo[]> {
    if (this._discoveryCache.has(startPath)) {
      return this._discoveryCache.get(startPath) as ProjectInfo[];
    }

    const projectRoots: ProjectInfo[] = [];
    let currentPath = startPath;
    const visitedPaths = new Set<string>();

    while (currentPath && !visitedPaths.has(currentPath)) {
      visitedPaths.add(currentPath);

      const projectInfo = await this._analyzeDirectory(currentPath);
      if (projectInfo) {
        projectRoots.push(projectInfo);
      }

      const parentPath = dirname(currentPath);
      if (parentPath === currentPath) {
        break; // Reached filesystem root
      }
      currentPath = parentPath;
    }

    this._discoveryCache.set(startPath, projectRoots);
    return projectRoots;
  }

  /**
   * Find the nearest project root from the given directory
   */
  public async findNearestProjectRoot(
    startPath: string = process.cwd(),
  ): Promise<ProjectInfo | null> {
    const projectRoots = await this.discoverProjectRoots(startPath);
    return projectRoots.length > 0 ? projectRoots[0] : null;
  }

  /**
   * Get all node_modules directories from discovered project roots
   */
  public async getNodeModulesPaths(
    startPath: string = process.cwd(),
  ): Promise<string[]> {
    const projectRoots = await this.discoverProjectRoots(startPath);
    const nodeModulesPaths: string[] = [];

    for (const project of projectRoots) {
      if (project.hasNodeModules) {
        const nodeModulesPath = join(project.rootPath, 'node_modules');
        try {
          await access(nodeModulesPath);
          nodeModulesPaths.push(nodeModulesPath);
        } catch {
          // Directory doesn't exist or isn't accessible
        }
      }
    }

    return nodeModulesPaths;
  }

  /**
   * Clear the discovery cache (useful for testing or when filesystem changes)
   */
  public clearCache(): void {
    this._discoveryCache.clear();
  }

  /**
   * Analyze a directory to determine if it's a project root
   */
  private async _analyzeDirectory(
    dirPath: string,
  ): Promise<ProjectInfo | null> {
    const indicators = await this._checkProjectIndicators(dirPath);

    if (!indicators.hasAnyIndicator) {
      return null;
    }

    let projectType: ProjectInfo['type'] = 'unknown';
    if (indicators.hasYarnLock) {
      projectType = 'yarn';
    } else if (indicators.hasPnpmLock) {
      projectType = 'pnpm';
    } else if (indicators.hasPackageLock) {
      projectType = 'npm';
    } else if (indicators.hasGit) {
      projectType = 'git';
    }

    return {
      rootPath: dirPath,
      type: projectType,
      hasNodeModules: indicators.hasNodeModules,
      isMonorepo: await this._detectMonorepo(
        dirPath,
        indicators.hasPackageJson,
      ),
    };
  }

  /**
   * Check for various project indicators in a directory
   */
  private async _checkProjectIndicators(dirPath: string): Promise<{
    hasAnyIndicator: boolean;
    hasPackageJson: boolean;
    hasPackageLock: boolean;
    hasYarnLock: boolean;
    hasPnpmLock: boolean;
    hasGit: boolean;
    hasNodeModules: boolean;
  }> {
    const checks = [
      { file: 'package.json', key: 'hasPackageJson' },
      { file: 'package-lock.json', key: 'hasPackageLock' },
      { file: 'yarn.lock', key: 'hasYarnLock' },
      { file: 'pnpm-lock.yaml', key: 'hasPnpmLock' },
      { file: '.git', key: 'hasGit' },
      { file: 'node_modules', key: 'hasNodeModules' },
    ] as const;

    const results: Record<string, boolean> = {};

    await Promise.all(
      checks.map(async ({ file, key }) => {
        try {
          await access(join(dirPath, file));
          results[key] = true;
        } catch {
          results[key] = false;
        }
      }),
    );

    const hasAnyIndicator = Object.values(results).some(Boolean);

    return {
      hasAnyIndicator,
      ...results,
    } as {
      hasAnyIndicator: boolean;
      hasPackageJson: boolean;
      hasPackageLock: boolean;
      hasYarnLock: boolean;
      hasPnpmLock: boolean;
      hasGit: boolean;
      hasNodeModules: boolean;
    };
  }

  /**
   * Detect if a project is a monorepo by checking package.json workspaces
   */
  private async _detectMonorepo(
    dirPath: string,
    hasPackageJson: boolean,
  ): Promise<boolean> {
    if (!hasPackageJson) {
      return false;
    }

    try {
      const packageJsonPath = join(dirPath, 'package.json');
      const packageJsonContent = await readFile(packageJsonPath, 'utf-8');
      const packageJson = JSON.parse(packageJsonContent);

      // Check for workspaces configuration
      return !!(
        packageJson.workspaces ||
        (packageJson.private === true &&
          (packageJson.devDependencies?.lerna ||
            packageJson.devDependencies?.nx ||
            packageJson.scripts?.lerna ||
            packageJson.scripts?.nx))
      );
    } catch {
      return false;
    }
  }
}

// Singleton instance
let projectDiscoveryInstance: ProjectDiscoveryService | null = null;

/**
 * Get the singleton project discovery service instance
 */
export function getProjectDiscoveryService(): ProjectDiscoveryService {
  if (!projectDiscoveryInstance) {
    projectDiscoveryInstance = new ProjectDiscoveryService();
  }
  return projectDiscoveryInstance;
}
