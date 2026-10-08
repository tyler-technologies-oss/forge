import { generateJSON } from '@tiptap/core';
import type { RichTextDocument } from './editor-context.js';
import { getFeatureExtensions, RICH_TEXT_STANDARD_FEATURES, type RichTextFeature } from './extensions/feature-extensions.js';
import { sanitizeHTML } from './extensions/sanitize-utils.js';

export { RICH_TEXT_FEATURES, RICH_TEXT_STANDARD_FEATURES, type RichTextFeature } from './extensions/feature-extensions.js';

/**
 * Converts HTML to the document an editor with the given features would produce from it.
 *
 * The HTML is sanitized the same way the editor's `content` is, then parsed inertly against the
 * features' schema, so anything the schema does not allow is dropped. Pass the features of the
 * editor or renderer the document is shown in, or the result can keep formatting it would drop.
 *
 * Requires a DOM (`DOMParser`), so it runs in the browser but not in plain Node without a shim such
 * as jsdom or happy-dom.
 *
 * @param html The HTML to convert.
 * @param features The features to parse against. Defaults to those in `forge-rte-standard-tools`.
 *   Unknown names are skipped with a warning.
 * @returns The ProseMirror document.
 *
 * @example
 * toRichTextDocument('<p><strong>Hi</strong></p>');
 * toRichTextDocument(html, [...RICH_TEXT_STANDARD_FEATURES, 'link']);
 */
export function toRichTextDocument(html: string, features: readonly RichTextFeature[] = RICH_TEXT_STANDARD_FEATURES): RichTextDocument {
  return generateJSON(sanitizeHTML(html), getFeatureExtensions(features)) as RichTextDocument;
}
