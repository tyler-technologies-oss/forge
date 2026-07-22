/**
 * Detects Forge components used in block HTML content.
 * Resolves partials to include components from referenced partials.
 */

import type { PartialRegistry } from './partial-registry.js';

const FORGE_COMPONENT_REGEX = /<forge-([a-z-]+)/g;
const PARTIAL_REFERENCE_REGEX = /\{\{>\s*([a-z0-9-]+)[\s}]/g;

/**
 * Extracts all forge-* component tag names from HTML content.
 */
function extractForgeComponents(content: string): Set<string> {
  const components = new Set<string>();
  let match: RegExpExecArray | null;

  while ((match = FORGE_COMPONENT_REGEX.exec(content)) !== null) {
    components.add(`forge-${match[1]}`);
  }

  return components;
}

/**
 * Extracts all partial references ({{> partial-name}}) from content.
 */
function extractPartialReferences(content: string): string[] {
  const partials: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = PARTIAL_REFERENCE_REGEX.exec(content)) !== null) {
    partials.push(match[1]);
  }

  return partials;
}

export interface DetectComponentsOptions {
  content: string;
  partialRegistry?: PartialRegistry;
}

/**
 * Detects all Forge components used in HTML content, including those in referenced partials.
 * Handles nested partials with cycle detection.
 */
export function detectComponents(options: DetectComponentsOptions): string[] {
  const { content, partialRegistry } = options;
  const allComponents = new Set<string>();
  const visitedPartials = new Set<string>();

  function processContent(html: string): void {
    const components = extractForgeComponents(html);
    components.forEach(c => allComponents.add(c));

    if (partialRegistry) {
      const partialRefs = extractPartialReferences(html);

      for (const partialName of partialRefs) {
        if (visitedPartials.has(partialName)) {
          continue;
        }

        visitedPartials.add(partialName);

        const partialContent = partialRegistry.get(partialName);
        if (partialContent) {
          processContent(partialContent);
        }
      }
    }
  }

  processContent(content);

  return Array.from(allComponents).sort();
}
