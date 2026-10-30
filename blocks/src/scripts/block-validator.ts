/**
 * Block content validation utilities.
 * Validates that block HTML files contain required metadata annotations.
 */

import { ANNOTATION_REGEX, METADATA_REGEX, parseScreenshotOptions } from './block-metadata.js';
import { BLOCK_TYPES } from './types.js';
import type { ValidationIssue, ValidationResult } from './types.js';

export type { ValidationIssue, ValidationResult, ValidationSeverity } from './types.js';

/**
 * Validates block HTML content for required metadata.
 * Checks for @block name, @description, @tags, (if present) a valid @type value, and @screenshot-* consistency.
 */
export function validateBlockContent(content: string, filePath?: string): ValidationResult {
  const issues: ValidationIssue[] = [];

  const commentMatch = content.match(METADATA_REGEX);
  if (!commentMatch) {
    issues.push({
      severity: 'error',
      message: 'Missing block metadata comment. Expected: <!-- @block Name @type ... @description ... @tags ... -->',
      file: filePath
    });
    return { valid: false, issues };
  }

  const body = commentMatch[1];

  const blockMatch = body.match(ANNOTATION_REGEX('block'));
  if (!blockMatch || !blockMatch[1]?.trim()) {
    issues.push({
      severity: 'error',
      message: 'Missing @block name in metadata comment',
      file: filePath
    });
  }

  const descMatch = body.match(ANNOTATION_REGEX('description'));
  if (!descMatch || !descMatch[1]?.trim()) {
    issues.push({
      severity: 'warning',
      message: 'Missing @description in metadata comment',
      file: filePath
    });
  }

  const tagsMatch = body.match(ANNOTATION_REGEX('tags'));
  if (!tagsMatch || !tagsMatch[1]?.trim()) {
    issues.push({
      severity: 'warning',
      message: 'Missing @tags in metadata comment',
      file: filePath
    });
  }

  const typeMatch = body.match(ANNOTATION_REGEX('type'));
  if (typeMatch) {
    const value = typeMatch[1]?.trim().toLowerCase();
    if (!value || !(BLOCK_TYPES as readonly string[]).includes(value)) {
      issues.push({
        severity: 'warning',
        message: `Invalid @type value "${typeMatch[1]?.trim()}". Expected one of: ${BLOCK_TYPES.join(', ')}`,
        file: filePath
      });
    }
  } else {
    issues.push({
      severity: 'warning',
      message: `Missing @type in metadata comment. Expected one of: ${BLOCK_TYPES.join(', ')}`,
      file: filePath
    });
  }

  issues.push(...validateScreenshotOptions(content, filePath));

  const hasErrors = issues.some(i => i.severity === 'error');
  return { valid: !hasErrors, issues };
}

/** Matches a selector that is only an id, e.g. `#open-dialog-btn`. */
const ID_SELECTOR_REGEX = /^#([\w-]+)$/;

/**
 * Validates @screenshot-click and @screenshot-wait annotations.
 * Only id selectors are checked against the HTML, since other selectors need a DOM to resolve.
 */
function validateScreenshotOptions(content: string, filePath?: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const { click, wait } = parseScreenshotOptions(content);

  if (wait && !click) {
    issues.push({
      severity: 'warning',
      message: '@screenshot-wait has no effect without @screenshot-click',
      file: filePath
    });
  }

  const id = click?.match(ID_SELECTOR_REGEX)?.[1];
  if (id && !content.includes(`id="${id}"`)) {
    issues.push({
      severity: 'warning',
      message: `@screenshot-click selector "${click}" does not match any id in the block`,
      file: filePath
    });
  }

  return issues;
}

/**
 * Formats validation issues into a human-readable string.
 */
export function formatValidationIssues(issues: ValidationIssue[]): string {
  return issues
    .map(issue => {
      const prefix = issue.severity === 'error' ? '✗' : '⚠';
      const location = issue.file ? ` (${issue.file})` : '';
      return `${prefix} ${issue.message}${location}`;
    })
    .join('\n');
}
