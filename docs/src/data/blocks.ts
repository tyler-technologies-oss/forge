/**
 * Blocks data fetched from remote manifest at build time.
 *
 * Blocks are pre-built UI patterns/templates that can be used as starting points.
 * The manifest is fetched from the Forge blocks preview URL.
 */

const BLOCKS_BASE_URL =
  import.meta.env.PUBLIC_BLOCKS_BASE_URL ??
  "https://forge.tylerdev.io/blocks/v1";
const MANIFEST_URL = `${BLOCKS_BASE_URL}/manifest.json`;
const MAX_DESC_CHAR_COUNT = 135;

// ============================================================================
// Types
// ============================================================================

export interface Block {
  id: string;
  name: string;
  description: string;
  tags: string[];
  file: string;
  category: string;
  hasScript?: boolean;
}

export interface Category {
  name: string;
}

export interface Manifest {
  blocks: Block[];
  categories: Category[];
  generatedAt: string;
}

export interface GroupedBlocks {
  label: string;
  items: Block[];
}

// ============================================================================
// Data Fetching
// ============================================================================

let cachedManifest: Manifest | null = null;
const blockHtmlCache = new Map<string, string>();

/**
 * Fetches the blocks manifest from the remote URL.
 * Results are cached for the duration of the build.
 */
export async function getBlocksManifest(): Promise<Manifest | null> {
  if (cachedManifest) return cachedManifest;

  try {
    const response = await fetch(MANIFEST_URL);
    if (!response.ok) {
      console.warn(`Failed to fetch blocks manifest: ${response.status}`);
      return null;
    }
    cachedManifest = await response.json();
    return cachedManifest;
  } catch (error) {
    console.warn("Failed to fetch blocks manifest:", error);
    return null;
  }
}

/**
 * Gets all blocks from the manifest.
 */
export async function getAllBlocks(): Promise<Block[]> {
  const manifest = await getBlocksManifest();
  return manifest?.blocks ?? [];
}

/**
 * Gets all categories from the manifest.
 */
export async function getCategories(): Promise<Category[]> {
  const manifest = await getBlocksManifest();
  return manifest?.categories ?? [];
}

/**
 * Fetches a block's raw HTML file, cached by URL for the duration of the
 * build. Used to inline a block's markup directly into a page (e.g. via
 * `<Example blockUrl>`) instead of embedding it in an iframe.
 */
export async function getBlockHtml(url: string): Promise<string | null> {
  if (blockHtmlCache.has(url)) return blockHtmlCache.get(url)!;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`Failed to fetch block HTML: ${url} (${response.status})`);
      return null;
    }
    const html = await response.text();
    blockHtmlCache.set(url, html);
    return html;
  } catch (error) {
    console.warn(`Failed to fetch block HTML: ${url}`, error);
    return null;
  }
}

/**
 * Gets a single block by ID.
 */
export async function getBlockById(id: string): Promise<Block | undefined> {
  const blocks = await getAllBlocks();
  return blocks.find((block) => block.id === id);
}

/**
 * Gets blocks grouped by category.
 * Groups blocks by their category field and sorts alphabetically.
 */
export async function getBlocksGroupedByCategory(): Promise<GroupedBlocks[]> {
  const blocks = await getAllBlocks();
  if (blocks.length === 0) return [];

  // Group blocks by their category field
  const groupMap = new Map<string, Block[]>();
  for (const block of blocks) {
    const category = block.category;
    if (!groupMap.has(category)) {
      groupMap.set(category, []);
    }
    groupMap.get(category)!.push(block);
  }

  // Convert to array and sort by category label, then by block name within each category
  return Array.from(groupMap.entries())
    .map(([label, items]) => ({
      label,
      items: items.sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

/**
 * Gets blocks filtered by category name.
 */
export async function getBlocksByCategory(
  categoryName: string,
): Promise<Block[]> {
  const blocks = await getAllBlocks();
  return blocks.filter((block) => block.category === categoryName);
}

/**
 * Searches blocks by name, description, or tags.
 */
export async function searchBlocks(query: string): Promise<Block[]> {
  const blocks = await getAllBlocks();
  const lowerQuery = query.toLowerCase();

  return blocks.filter(
    (block) =>
      block.name.toLowerCase().includes(lowerQuery) ||
      block.description.toLowerCase().includes(lowerQuery) ||
      block.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
  );
}

// ============================================================================
// URL Helpers
// ============================================================================

/**
 * Gets the full URL to a block's HTML file.
 */
export function getBlockFileUrl(block: Block): string {
  return `${BLOCKS_BASE_URL}/${block.file}`;
}

/**
 * Given a block's bundled `.js` file URL, returns the sibling `.source.js`
 * URL — the block's original TS source with only types stripped (no
 * bundling, no minification, original import statements preserved). Use
 * this for copy/paste and view-source display; the bundled `.js` has its
 * imports rewritten to hashed chunk files and is only meant to execute
 * inside the live block preview iframe.
 */
export function getBlockSourceJsUrl(jsUrl: string): string {
  return jsUrl.replace(/\.js$/, ".source.js");
}

/**
 * Gets the full URL to a block's screenshot.
 */
export function getBlockScreenshotUrl(block: Block): string {
  // Assuming screenshots follow pattern: screenshots/{id}.webp
  return `${BLOCKS_BASE_URL}/${block.id}.webp`;
}

/**
 * Truncates description to max character count.
 */
export function truncateDescription(description: string): string {
  if (description.length <= MAX_DESC_CHAR_COUNT) return description;
  return description.slice(0, MAX_DESC_CHAR_COUNT).trim() + "...";
}

// ============================================================================
// Constants
// ============================================================================

export { MANIFEST_URL, BLOCKS_BASE_URL, MAX_DESC_CHAR_COUNT };
