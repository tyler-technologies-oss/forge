/**
 * Block HTML compiler.
 * Processes block HTML files by injecting them into the base layout template
 * and expanding Handlebars partials.
 */

import fs from 'node:fs';
import Handlebars from 'handlebars';
import type { PartialRegistry } from './partial-registry.js';

export interface BlockTemplate {
  title: string;
  bodyClass: string;
  body: string;
}

export interface CompileOptions {
  layoutPath: string;
  partialRegistry: PartialRegistry;
  baseHref: string;
  /** Optional URL for a per-block script tag injected at the end of the body */
  blockScriptSrc?: string;
}

export interface CompileResult {
  success: boolean;
  html: string;
  error?: string;
}

const BLOCK_TITLE_REGEX = /@block\s+(.+?)(?=\s*@|\s*-->)/;
const BODY_REGEX = /<body([^>]*)>([\s\S]*)<\/body>/;
const CLASS_REGEX = /class="([^"]*)"/;
const METADATA_COMMENT_REGEX = /<!--[\s\S]*?-->/;
const BLOCK_SCRIPT_TAG_REGEX = /\s*<script\b[^>]*\bsrc=(?:"|')\/src\/blocks\/[^"']+\.ts(?:"|')[^>]*><\/script>/gi;

/**
 * Parses block HTML content to extract template components.
 */
export function parseBlockTemplate(content: string): BlockTemplate | null {
  const titleMatch = content.match(BLOCK_TITLE_REGEX);
  if (!titleMatch) {
    return null;
  }

  const bodyMatch = content.match(BODY_REGEX);

  if (bodyMatch) {
    const bodyAttrs = bodyMatch[1] || '';
    const classMatch = bodyAttrs.match(CLASS_REGEX);
    return {
      title: titleMatch[1].trim(),
      bodyClass: classMatch ? classMatch[1] : '',
      body: stripBlockScriptTags(bodyMatch[2]).trim()
    };
  }

  const metadataMatch = content.match(METADATA_COMMENT_REGEX);
  const bodyContent = metadataMatch
    ? content.slice(metadataMatch.index! + metadataMatch[0].length).trim()
    : content;

  return {
    title: titleMatch[1].trim(),
    bodyClass: '',
    body: stripBlockScriptTags(bodyContent).trim()
  };
}

/**
 * Strips hand-written `<script src="/src/blocks/.../*.ts">` tags from block source.
 * These worked in the Vite dev server but never bundled in production. The compiler
 * now injects the correct script tag based on discovered sibling .ts files.
 *
 * Loops until stable so overlapping tags (e.g. `<script<script ...></script>`) can't
 * leave a partial `<script` behind — closes CodeQL's incomplete-sanitization warning.
 */
function stripBlockScriptTags(body: string): string {
  let previous: string;
  let current = body;
  do {
    previous = current;
    current = current.replace(BLOCK_SCRIPT_TAG_REGEX, '');
  } while (current !== previous);
  return current;
}

/**
 * Compiles a block by processing partials and injecting into the layout.
 */
export function compileBlock(content: string, options: CompileOptions): CompileResult {
  const blockTemplate = parseBlockTemplate(content);

  if (!blockTemplate) {
    return {
      success: false,
      html: content,
      error: 'Failed to parse block template - missing @block metadata'
    };
  }

  try {
    const handlebars = Handlebars.create();

    for (const name of options.partialRegistry.names()) {
      const partial = options.partialRegistry.get(name);
      if (partial) {
        handlebars.registerPartial(name, partial);
      }
    }

    const bodyTemplate = handlebars.compile(blockTemplate.body);
    const compiledBody = options.blockScriptSrc
      ? `${bodyTemplate({})}\n<script type="module" src="${options.blockScriptSrc}"></script>`
      : bodyTemplate({});

    if (!fs.existsSync(options.layoutPath)) {
      return {
        success: false,
        html: content,
        error: `Layout file not found: ${options.layoutPath}`
      };
    }

    const layoutContent = fs.readFileSync(options.layoutPath, 'utf-8');
    const layoutTemplate = handlebars.compile(layoutContent);

    const metadataMatch = content.match(METADATA_COMMENT_REGEX);
    const metadata = metadataMatch ? metadataMatch[0] + '\n' : '';

    const compiledHtml = metadata + layoutTemplate({
      ...blockTemplate,
      body: compiledBody,
      baseHref: options.baseHref
    });

    return {
      success: true,
      html: compiledHtml
    };
  } catch (error) {
    return {
      success: false,
      html: content,
      error: error instanceof Error ? error.message : 'Unknown compilation error'
    };
  }
}
