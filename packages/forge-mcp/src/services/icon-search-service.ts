import levenshtein from 'js-levenshtein-esm';

export interface IconMetadata {
  name: string;
  data: string;
  keywords: string[];
}

export interface IconSearchResult extends IconMetadata {
  score: number;
  matchType: 'exact' | 'prefix' | 'contains' | 'fuzzy' | 'keyword';
  esmImportName: string;
}

/**
 * Convert icon name to ESM import name
 * Examples: "camera" => "tylIconCamera", "photo_album" => "tylIconPhotoAlbum"
 */
export function convertToEsmImportName(iconName: string): string {
  return (
    'tylIcon' +
    iconName
      .split(/[-_]/)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join('')
  );
}

const ICON_METADATA_URI =
  'https://cdn.forge.tylertech.com/v1/metadata/icons/tyler-icons-metadata-all.json';
const SIMILARITY_THRESHOLD = 0.6;
const FUZZY_MIN_SCORE = 0.6;
const FUZZY_SCORE_MULTIPLIER = 0.19;

/**
 * Service for searching Tyler Icons with caching and fuzzy matching
 */
export class IconSearchService {
  private static _instance: IconSearchService;
  private _icons: IconMetadata[] | null = null;
  private _isLoading = false;

  private constructor() {}

  public static getInstance(): IconSearchService {
    if (!IconSearchService._instance) {
      IconSearchService._instance = new IconSearchService();
    }
    return IconSearchService._instance;
  }

  /**
   * Fetch and cache icon metadata.
   */
  private async _loadIcons(): Promise<IconMetadata[]> {
    if (this._icons) {
      return this._icons;
    }

    if (this._isLoading) {
      // Wait for existing load to complete
      while (this._isLoading) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      return this._icons || [];
    }

    this._isLoading = true;

    try {
      const response = await fetch(ICON_METADATA_URI);

      if (!response.ok) {
        throw new Error(`Failed to fetch icons: ${response.statusText}`);
      }

      const icons = (await response.json()) as IconMetadata[];
      this._icons = icons;
      return icons;
    } catch (error) {
      throw new Error(
        `Failed to load icon metadata: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    } finally {
      this._isLoading = false;
    }
  }

  /**
   * Compute string similarity using Levenshtein distance
   * Same algorithm as Tyler Forge design system
   */
  private _computeSimilarity(str1: string, str2: string): number {
    const maxLength = Math.max(str1.length, str2.length);
    if (maxLength === 0) {
      return 1;
    }
    return 1 - levenshtein(str1.toLowerCase(), str2.toLowerCase()) / maxLength;
  }

  /**
   * Search icons by query with fuzzy matching and intelligent scoring
   */
  public async searchIcons(
    query: string,
    limit: number = 10,
  ): Promise<IconSearchResult[]> {
    const icons = await this._loadIcons();
    const searchTerms = query
      .toLowerCase()
      .split(/\s+/)
      .filter(term => term.length > 0);

    if (searchTerms.length === 0) {
      return icons.slice(0, limit).map(icon => ({
        ...icon,
        score: 0,
        matchType: 'exact' as const,
        esmImportName: convertToEsmImportName(icon.name),
      }));
    }

    const results: IconSearchResult[] = [];

    for (const icon of icons) {
      const iconName = icon.name.toLowerCase();
      let bestScore = 0;
      let bestMatchType: IconSearchResult['matchType'] = 'keyword';

      // Check each search term against icon name and keywords
      for (const term of searchTerms) {
        // Exact name match (highest priority)
        if (iconName === term) {
          bestScore = Math.max(bestScore, 1.0);
          bestMatchType = 'exact';
          continue;
        }

        // Name prefix match
        if (iconName.startsWith(term)) {
          bestScore = Math.max(bestScore, 0.9);
          if (bestMatchType !== 'exact') {
            bestMatchType = 'prefix';
          }
          continue;
        }

        // Name contains match
        if (iconName.includes(term)) {
          bestScore = Math.max(bestScore, 0.8);
          if (!['exact', 'prefix'].includes(bestMatchType)) {
            bestMatchType = 'contains';
          }
          continue;
        }

        // Fuzzy name match
        const nameSimilarity = this._computeSimilarity(iconName, term);
        if (nameSimilarity >= SIMILARITY_THRESHOLD) {
          const fuzzyScore =
            FUZZY_MIN_SCORE +
            (nameSimilarity - FUZZY_MIN_SCORE) * FUZZY_SCORE_MULTIPLIER;
          bestScore = Math.max(bestScore, fuzzyScore);
          if (!['exact', 'prefix', 'contains'].includes(bestMatchType)) {
            bestMatchType = 'fuzzy';
          }
          continue;
        }

        // Keyword matches (lower priority)
        for (const keyword of icon.keywords) {
          const keywordLower = keyword.toLowerCase();
          if (keywordLower.includes(term)) {
            const keywordScore = keywordLower === term ? 0.59 : 0.4;
            bestScore = Math.max(bestScore, keywordScore);
            // Keep existing match type if better than keyword
          }
        }
      }

      if (bestScore > 0) {
        results.push({
          ...icon,
          score: bestScore,
          matchType: bestMatchType,
          esmImportName: convertToEsmImportName(icon.name),
        });
      }
    }

    // Sort by score (descending), then by match type priority, then alphabetically
    const matchTypePriority = {
      exact: 5,
      prefix: 4,
      contains: 3,
      fuzzy: 2,
      keyword: 1,
    };

    results.sort((a, b) => {
      // Primary: score
      if (Math.abs(a.score - b.score) > 0.001) {
        return b.score - a.score;
      }
      // Secondary: match type priority
      const priorityDiff =
        matchTypePriority[b.matchType] - matchTypePriority[a.matchType];
      if (priorityDiff !== 0) {
        return priorityDiff;
      }
      // Tertiary: alphabetical
      return a.name.localeCompare(b.name);
    });

    return results.slice(0, limit);
  }
}

/**
 * Get the singleton icon search service instance
 */
export function getIconSearchService(): IconSearchService {
  return IconSearchService.getInstance();
}
