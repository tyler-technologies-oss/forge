import { METADATA_REGEX } from './block-metadata.js';

export type ValidationSeverity = 'error' | 'warning';

export interface ValidationIssue {
  severity: ValidationSeverity;
  message: string;
  file?: string;
  line?: number;
}

export interface ValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
}

export function validateBlockContent(content: string, filePath?: string): ValidationResult {
  const issues: ValidationIssue[] = [];

  const metadataMatch = content.match(METADATA_REGEX);
  if (!metadataMatch) {
    issues.push({
      severity: 'error',
      message: 'Missing block metadata comment. Expected: <!-- @block Name @description ... @tags ... -->',
      file: filePath
    });
    return { valid: false, issues };
  }

  const blockMatch = metadataMatch[1]?.match(/@block\s+(.+)/);
  if (!blockMatch || !blockMatch[1]?.trim()) {
    issues.push({
      severity: 'error',
      message: 'Missing @block name in metadata comment',
      file: filePath
    });
  }

  const descMatch = metadataMatch[2]?.match(/@description\s+(.+)/);
  if (!descMatch || !descMatch[1]?.trim()) {
    issues.push({
      severity: 'warning',
      message: 'Missing @description in metadata comment',
      file: filePath
    });
  }

  const tagsMatch = metadataMatch[3]?.match(/@tags\s+(.+)/);
  if (!tagsMatch || !tagsMatch[1]?.trim()) {
    issues.push({
      severity: 'warning',
      message: 'Missing @tags in metadata comment',
      file: filePath
    });
  }

  const hasErrors = issues.some(i => i.severity === 'error');
  return { valid: !hasErrors, issues };
}

export function formatValidationIssues(issues: ValidationIssue[]): string {
  return issues
    .map(issue => {
      const prefix = issue.severity === 'error' ? '✗' : '⚠';
      const location = issue.file ? ` (${issue.file})` : '';
      return `${prefix} ${issue.message}${location}`;
    })
    .join('\n');
}
