import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DesignToken, DesignTokenCategory, DesignTokensManifest } from '../types/index.js';

export const DESIGN_TOKENS_FILENAME = '@tylertech-forge-design-tokens.json';

export interface DesignTokensServiceOptions {
  /**
   * Path to the design tokens manifest. If not provided, will use the bundled manifest
   */
  manifestPath?: string;
}

export class DesignTokensService {
  private readonly _manifestPath: string;
  private _manifestPromise: Promise<DesignTokensManifest> | null = null;

  constructor(options: DesignTokensServiceOptions = {}) {
    this._manifestPath = options.manifestPath ?? this._getDefaultManifestPath();
  }

  /**
   * Get all token categories in manifest order
   * @throws Error if the manifest cannot be loaded
   */
  public async getCategories(): Promise<DesignTokenCategory[]> {
    return (await this._load()).categories;
  }

  /**
   * Get a token category by name, or undefined if it does not exist
   * @throws Error if the manifest cannot be loaded
   */
  public async getCategory(name: string): Promise<DesignTokenCategory | undefined> {
    return (await this.getCategories()).find(category => category.name === name);
  }

  /**
   * Get a token by its full custom property name (such as `--forge-spacing-medium`), or undefined if it does not exist
   * @throws Error if the manifest cannot be loaded
   */
  public async getToken(name: string): Promise<DesignToken | undefined> {
    const categories = await this.getCategories();
    return categories.flatMap(category => category.tokens).find(token => token.name === name);
  }

  /**
   * Clear the cached manifest
   */
  public clearCache(): void {
    this._manifestPromise = null;
  }

  private _load(): Promise<DesignTokensManifest> {
    this._manifestPromise ??= this._read().catch(error => {
      this._manifestPromise = null;
      throw error;
    });
    return this._manifestPromise;
  }

  private async _read(): Promise<DesignTokensManifest> {
    let content: string;
    try {
      content = await readFile(this._manifestPath, 'utf-8');
    } catch (error) {
      throw new Error(`Design tokens manifest not found at ${this._manifestPath}: ${error instanceof Error ? error.message : String(error)}`);
    }

    const manifest = JSON.parse(content) as DesignTokensManifest;
    if (!Array.isArray(manifest.categories)) {
      throw new Error(`Invalid design tokens manifest at ${this._manifestPath}: missing "categories"`);
    }
    return manifest;
  }

  private _getDefaultManifestPath(): string {
    const currentDir = dirname(fileURLToPath(import.meta.url));
    return join(currentDir, '..', 'bundled-manifests', DESIGN_TOKENS_FILENAME);
  }
}

let designTokensServiceInstance: DesignTokensService | null = null;

/**
 * Get the singleton design tokens service instance
 */
export function getDesignTokensService(options?: DesignTokensServiceOptions): DesignTokensService {
  if (!designTokensServiceInstance) {
    designTokensServiceInstance = new DesignTokensService(options);
  }
  return designTokensServiceInstance;
}
