/**
 * Block metadata parsing utilities.
 * Extracts @block, @description, and @tags annotations from HTML comment headers.
 */

import path from 'node:path';
import type { BlockMetadata } from './types.js';

export type { Block, BlockMetadata } from './types.js';

/** Regex pattern for matching block metadata comments */
export const METADATA_REGEX = /<!--\s*(@block\s+.+?)\s*(@description\s+.+?)?\s*(@tags\s+.+?)?\s*-->/s;

/**
 * Parses block metadata from HTML content.
 * Extracts name, description, and tags from the metadata comment.
 */
export function parseBlockMetadata(content: string, filePath: string): BlockMetadata | null {
  const match = content.match(METADATA_REGEX);
  if (!match) {
    return null;
  }

  const blockMatch = match[1]?.match(/@block\s+(.+)/);
  const descMatch = match[2]?.match(/@description\s+(.+)/);
  const tagsMatch = match[3]?.match(/@tags\s+(.+)/);

  const name = blockMatch?.[1]?.trim() || path.basename(filePath, '.html');
  const description = descMatch?.[1]?.trim() || '';
  const tags = tagsMatch?.[1]?.split(',').map(t => t.trim()).filter(Boolean) || [];

  return { name, description, tags };
}
