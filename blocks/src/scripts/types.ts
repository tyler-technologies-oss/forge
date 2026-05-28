/**
 * Shared type definitions for the Forge Blocks build system.
 * Contains interfaces used across manifest generation, screenshots, and validation.
 */

/** Metadata extracted from block HTML comment annotations */
export interface BlockMetadata {
  name: string;
  description: string;
  tags: string[];
}

/** Complete block representation including file path information */
export interface Block extends BlockMetadata {
  id: string;
  file: string;
  screenshot?: string;
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
