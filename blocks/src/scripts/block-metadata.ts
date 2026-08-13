/**
 * Block metadata parsing utilities.
 * Extracts @block, @type, @description, and @tags annotations from HTML comment headers.
 */

import path from 'node:path';
import { BLOCK_TYPES, DEFAULT_BLOCK_TYPE, type BlockMetadata, type BlockType } from './types.js';

export type { Block, BlockMetadata, BlockType } from './types.js';

/** Regex matching the metadata comment as a whole. Individual annotations are parsed independently so order is not significant. */
export const METADATA_REGEX = /<!--([\s\S]*?)-->/;

/** Matches a single annotation value up to the next `@` annotation or the end of the comment body. */
const ANNOTATION_REGEX = (name: string): RegExp => new RegExp(`@${name}\\s+([\\s\\S]+?)(?=\\s*@\\w|\\s*$)`);

/**
 * Parses block metadata from HTML content.
 * Extracts name, type, description, and tags from the metadata comment.
 */
export function parseBlockMetadata(content: string, filePath: string): BlockMetadata | null {
  const commentMatch = content.match(METADATA_REGEX);
  if (!commentMatch) {
    return null;
  }

  const body = commentMatch[1];

  const blockMatch = body.match(ANNOTATION_REGEX('block'));
  if (!blockMatch) {
    return null;
  }

  const descMatch = body.match(ANNOTATION_REGEX('description'));
  const tagsMatch = body.match(ANNOTATION_REGEX('tags'));
  const typeMatch = body.match(ANNOTATION_REGEX('type'));

  const name = blockMatch[1]?.trim() || path.basename(filePath, '.html');
  const description = descMatch?.[1]?.trim() || '';
  const tags = tagsMatch?.[1]?.split(',').map(t => t.trim()).filter(Boolean) || [];
  const type = normalizeBlockType(typeMatch?.[1]?.trim());

  return { name, description, tags, type };
}

/** Returns a valid BlockType, falling back to the default if the input is missing or invalid. */
export function normalizeBlockType(value: string | undefined): BlockType {
  if (!value) {
    return DEFAULT_BLOCK_TYPE;
  }
  const lower = value.toLowerCase();
  return (BLOCK_TYPES as readonly string[]).includes(lower) ? (lower as BlockType) : DEFAULT_BLOCK_TYPE;
}
