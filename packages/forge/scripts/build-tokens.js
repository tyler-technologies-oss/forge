import * as sass from 'sass';
import { writeFile } from 'fs/promises';
import { resolve } from 'path';

const TOKENS_ENTRY = 'src/lib/forge-tokens.scss';
const SCHEMA_VERSION = '1.0.0';
const CUSTOM_PROPERTY_PATTERN = /(--forge-([a-z0-9]+)-[a-z0-9-]+):\s*([^;]+);/g;

const CATEGORY_BY_PREFIX = {
  animation: 'animation',
  border: 'border',
  color: 'color',
  elevation: 'elevation',
  shape: 'shape',
  spacing: 'spacing',
  z: 'layering'
};

/**
 * Compiles the global token stylesheet and extracts each `--forge-*` custom property with its resolved value.
 *
 * @param {string} [entry] The Sass entry point that emits the global tokens.
 * @returns {{ category: string; name: string; value: string }[]} The tokens, in declaration order.
 */
export function extractDesignTokens(entry = TOKENS_ENTRY) {
  const { css } = sass.compile(resolve(entry), { style: 'expanded', quietDeps: true });
  const tokens = [];

  for (const [, name, prefix, value] of css.matchAll(CUSTOM_PROPERTY_PATTERN)) {
    const category = CATEGORY_BY_PREFIX[prefix];
    if (category) {
      tokens.push({ category, name, value: value.trim() });
    }
  }

  return tokens;
}

/**
 * Groups tokens by category, preserving the order in which categories first appear.
 *
 * @param {{ category: string; name: string; value: string }[]} tokens The flat list of extracted tokens.
 * @returns {{ name: string; tokens: { name: string; value: string }[] }[]} One entry per category.
 */
export function groupTokensByCategory(tokens) {
  const categories = new Map();

  for (const { category, name, value } of tokens) {
    const group = categories.get(category) ?? { name: category, tokens: [] };
    group.tokens.push({ name, value });
    categories.set(category, group);
  }

  return [...categories.values()];
}

/**
 * Builds the design tokens manifest (`design-tokens.json`) containing the global Forge tokens.
 */
export async function buildTokens({ entry = TOKENS_ENTRY, outfile = 'design-tokens.json' } = {}) {
  const manifest = { schemaVersion: SCHEMA_VERSION, categories: groupTokensByCategory(extractDesignTokens(entry)) };
  await writeFile(outfile, `${JSON.stringify(manifest, null, 2)}\n`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await buildTokens();
}
