import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

/**
 * Cache for tool call results to avoid redundant computations during a session.
 *
 * Since CEM data and other Forge resources don't change during an MCP session,
 * caching tool results significantly improves response times when tools are
 * called multiple times with the same arguments.
 */
export class ToolCallCache {
  private _cache = new Map<string, CallToolResult>();
  private _hits = 0;
  private _misses = 0;

  /**
   * Generate a cache key from tool name and arguments.
   * Uses a stable JSON stringification for consistent keys.
   */
  public generateKey(toolName: string, args: Record<string, unknown>): string {
    const sortedArgs = this._sortObject(args);
    return `${toolName}:${JSON.stringify(sortedArgs)}`;
  }

  /**
   * Check if a cached result exists for the given key.
   */
  public has(key: string): boolean {
    return this._cache.has(key);
  }

  /**
   * Get a cached result by key.
   */
  public get(key: string): CallToolResult | undefined {
    const result = this._cache.get(key);
    if (result) {
      this._hits++;
    } else {
      this._misses++;
    }
    return result;
  }

  /**
   * Store a tool result in the cache.
   */
  public set(key: string, result: CallToolResult): void {
    this._cache.set(key, result);
  }

  /**
   * Clear all cached results.
   */
  public clear(): void {
    this._cache.clear();
    this._hits = 0;
    this._misses = 0;
  }

  /**
   * Get cache statistics for diagnostics.
   */
  public getStats(): { size: number; hits: number; misses: number } {
    return {
      size: this._cache.size,
      hits: this._hits,
      misses: this._misses,
    };
  }

  /**
   * Sort object keys recursively for stable JSON stringification.
   */
  private _sortObject(obj: unknown): unknown {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(item => this._sortObject(item));
    }

    const sorted: Record<string, unknown> = {};
    const keys = Object.keys(obj as Record<string, unknown>).sort();
    for (const key of keys) {
      sorted[key] = this._sortObject((obj as Record<string, unknown>)[key]);
    }
    return sorted;
  }
}

let toolCallCacheInstance: ToolCallCache | null = null;

/**
 * Get the singleton tool call cache instance.
 */
export function getToolCallCache(): ToolCallCache {
  if (!toolCallCacheInstance) {
    toolCallCacheInstance = new ToolCallCache();
  }
  return toolCallCacheInstance;
}
