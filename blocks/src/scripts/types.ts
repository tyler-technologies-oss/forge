/**
 * Shared type definitions for the Forge Blocks build system.
 * Contains interfaces used across manifest generation, screenshots, and validation.
 */

/** Categorizes the scope of a block. */
export type BlockType = 'component' | 'pattern' | 'template';

export const BLOCK_TYPES: readonly BlockType[] = ['component', 'pattern', 'template'];

export const DEFAULT_BLOCK_TYPE: BlockType = 'pattern';

/** Metadata extracted from block HTML comment annotations */
export interface BlockMetadata {
  name: string;
  description: string;
  tags: string[];
  type: BlockType;
}

/** Complete block representation including file path information */
export interface Block extends BlockMetadata {
  id: string;
  file: string;
  screenshot?: string;
  /** Display name for the block's category (e.g., "Application Layout") */
  category: string;
  /** Whether this block has associated JavaScript/TypeScript for interactivity */
  hasScript: boolean;
  /** Forge components used in this block (auto-detected from HTML content), for discovery/filtering in the browser */
  componentsUsed: string[];
}

/** Category folder information */
export interface Category {
  name: string;
  path: string;
}

/** Generated manifest structure */
export interface Manifest {
  blocks: Block[];
  categories: { name: string }[];
  generatedAt: string;
}

/** Validation issue severity levels */
export type ValidationSeverity = 'error' | 'warning';

/** Individual validation issue */
export interface ValidationIssue {
  severity: ValidationSeverity;
  message: string;
  file?: string;
  line?: number;
}

/** Result of block content validation */
export interface ValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
}
