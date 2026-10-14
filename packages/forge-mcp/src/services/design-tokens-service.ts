import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import levenshtein from 'js-levenshtein-esm';
import { DesignToken, DesignTokenCategory, DesignTokensManifest } from '../types/index.js';

export const DESIGN_TOKENS_FILENAME = '@tylertech-forge-design-tokens.json';

const FORGE_TOKEN_PREFIX = '--forge-';
const SUGGESTION_SIMILARITY_THRESHOLD = 0.7;
const MAX_SUGGESTIONS = 3;

export interface DesignTokenSearchOptions {
  /**
   * Restrict results to a single category
   */
  category?: string;
  /**
   * Whitespace-separated terms; a token matches when every term appears in its category, name, description, or value
   */
  query?: string;
}

export interface UnknownDesignToken {
  name: string;
  suggestions: string[];
}

export interface DesignTokenValidationResult {
  valid: DesignToken[];
  unknown: UnknownDesignToken[];
  /**
   * Custom properties outside the `--forge-` namespace, which are not validated
   */
  ignored: string[];
}

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
   * Find tokens by category and/or search terms. Categories with no matching tokens are omitted.
   * @throws Error if the category does not exist or the manifest cannot be loaded
   */
  public async search({ category, query }: DesignTokenSearchOptions = {}): Promise<DesignTokenCategory[]> {
    const categories = await this.getCategories();
    const scoped = category ? [await this._requireCategory(category)] : categories;
    const terms = query?.toLowerCase().split(/\s+/).filter(Boolean) ?? [];
    if (!terms.length) {
      return scoped;
    }

    return scoped
      .map(scopedCategory => ({
        ...scopedCategory,
        tokens: scopedCategory.tokens.filter(token => matchesAllTerms(scopedCategory, token, terms))
      }))
      .filter(({ tokens }) => tokens.length > 0);
  }

  /**
   * Check custom property names against the manifest, suggesting close matches for unknown `--forge-` names
   * @throws Error if the manifest cannot be loaded
   */
  public async validate(names: string[]): Promise<DesignTokenValidationResult> {
    const tokens = (await this.getCategories()).flatMap(category => category.tokens);
    const tokensByName = new Map(tokens.map(token => [token.name, token]));
    const result: DesignTokenValidationResult = { valid: [], unknown: [], ignored: [] };

    for (const name of new Set(names.map(normalizeTokenName))) {
      const token = tokensByName.get(name);
      if (token) {
        result.valid.push(token);
      } else if (name.startsWith(FORGE_TOKEN_PREFIX)) {
        result.unknown.push({ name, suggestions: findSuggestions(name, tokens) });
      } else {
        result.ignored.push(name);
      }
    }
    return result;
  }

  /**
   * Clear the cached manifest
   */
  public clearCache(): void {
    this._manifestPromise = null;
  }

  private async _requireCategory(name: string): Promise<DesignTokenCategory> {
    const category = await this.getCategory(name);
    if (!category) {
      const available = (await this.getCategories()).map(({ name: categoryName }) => categoryName);
      throw new Error(`Unknown design token category: ${name}. Available categories: ${available.join(', ')}`);
    }
    return category;
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

function matchesAllTerms(category: DesignTokenCategory, token: DesignToken, terms: string[]): boolean {
  const haystack = [category.name, token.name, token.description, token.value, token.values?.light, token.values?.dark].join(' ').toLowerCase();
  return terms.every(term => haystack.includes(term));
}

function normalizeTokenName(name: string): string {
  const trimmed = name.trim();
  return trimmed.startsWith('--') ? trimmed : `--${trimmed}`;
}

function findSuggestions(name: string, tokens: DesignToken[]): string[] {
  const unprefixed = name.slice(FORGE_TOKEN_PREFIX.length);
  return tokens
    .map(token => {
      const candidate = token.name.slice(FORGE_TOKEN_PREFIX.length);
      const similarity = 1 - levenshtein(unprefixed, candidate) / Math.max(unprefixed.length, candidate.length);
      return { name: token.name, similarity };
    })
    .filter(({ similarity }) => similarity >= SUGGESTION_SIMILARITY_THRESHOLD)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, MAX_SUGGESTIONS)
    .map(({ name: suggestion }) => suggestion);
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
