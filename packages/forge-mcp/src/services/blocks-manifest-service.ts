// Remote catalog of Forge UI blocks — pre-built HTML patterns demonstrating
// correct Forge component usage.
const BLOCKS_BASE_URL = 'https://forge.tylerdev.io/blocks/v1';

export interface BlockInfo {
  id: string;
  name: string;
  description: string;
  tags: string[];
  file: string;
  category?: string;
  componentsUsed?: string[];
}

export interface BlocksManifest {
  blocks: BlockInfo[];
  categories: Array<{ name: string }>;
  generatedAt: string;
}

let _cachedManifest: BlocksManifest | null = null;

/**
 * Fetch the Forge blocks manifest, caching it for the life of the process.
 * @throws Error if the manifest cannot be fetched
 */
export async function getBlocksManifest(): Promise<BlocksManifest> {
  if (_cachedManifest) {
    return _cachedManifest;
  }
  const response = await fetch(`${BLOCKS_BASE_URL}/manifest.json`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch blocks manifest: ${response.status} ${response.statusText}`,
    );
  }
  _cachedManifest = (await response.json()) as BlocksManifest;
  return _cachedManifest;
}

/** Test-only hook to clear the process-lifetime cache between test cases. */
export function _resetBlocksManifestCacheForTests(): void {
  _cachedManifest = null;
}

/**
 * Fetch the raw HTML content for a specific block file.
 * @throws Error if the block content cannot be fetched
 */
export async function getBlockContent(file: string): Promise<string> {
  const response = await fetch(`${BLOCKS_BASE_URL}/${file}`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch block content: ${response.status} ${response.statusText}`,
    );
  }
  return response.text();
}
