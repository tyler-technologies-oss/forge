import * as sass from 'sass';
import { writeFile } from 'fs/promises';
import { resolve } from 'path';

const TOKENS_ENTRY = 'src/lib/forge-tokens.scss';
const THEME_LIGHT_ENTRY = 'scripts/tokens/theme-light.scss';
const THEME_DARK_ENTRY = 'scripts/tokens/theme-dark.scss';
const SCHEMA_VERSION = '1.1.0';
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

const THEME_TOKEN_PREFIX = '--forge-theme-';
const THEME_ROLES = ['brand', 'primary', 'secondary', 'tertiary', 'surface', 'text', 'success', 'error', 'warning', 'info', 'outline'];

/**
 * Derives the theme category from a theme token name, treating `on-<role>` tokens as part of the `<role>` category.
 *
 * @param {string} name The full custom property name, such as `--forge-theme-on-primary-container`.
 * @returns {string | undefined} The category (such as `primary`), or `undefined` when the token has no known role.
 */
export function getThemeCategory(name) {
  const [first, second] = name.slice(THEME_TOKEN_PREFIX.length).split('-');
  const role = first === 'on' ? second : first;
  return THEME_ROLES.includes(role) ? role : undefined;
}

function compileCustomProperties(entry) {
  const { css } = sass.compile(resolve(entry), { style: 'expanded', quietDeps: true });
  return [...css.matchAll(CUSTOM_PROPERTY_PATTERN)].map(([, name, prefix, value]) => ({ name, prefix, value: value.trim() }));
}

/**
 * Compiles the light and dark themes and extracts each `--forge-theme-*` custom property with both resolved values.
 *
 * @param {{ light?: string; dark?: string }} [entries] The Sass entry points that emit the light and dark theme properties.
 * @returns {{ category: string; name: string; value: string; values: { light: string; dark: string } }[]} The tokens, in declaration order.
 */
export function extractThemeTokens({ light = THEME_LIGHT_ENTRY, dark = THEME_DARK_ENTRY } = {}) {
  const darkValues = new Map(compileCustomProperties(dark).map(({ name, value }) => [name, value]));
  const tokens = [];

  for (const { name, prefix, value } of compileCustomProperties(light)) {
    const category = prefix === 'theme' ? getThemeCategory(name) : undefined;
    if (category) {
      tokens.push({ category, name, value, values: { light: value, dark: darkValues.get(name) ?? value } });
    }
  }

  return tokens;
}

/**
 * Compiles the global token stylesheet and extracts each `--forge-*` custom property with its resolved value.
 *
 * @param {string} [entry] The Sass entry point that emits the global tokens.
 * @returns {{ category: string; name: string; value: string }[]} The tokens, in declaration order.
 */
export function extractDesignTokens(entry = TOKENS_ENTRY) {
  return compileCustomProperties(entry).flatMap(({ name, prefix, value }) => {
    const category = CATEGORY_BY_PREFIX[prefix];
    return category ? [{ category, name, value }] : [];
  });
}

/**
 * Groups tokens by category, preserving the order in which categories first appear.
 *
 * @param {{ category: string; name: string; value: string }[]} tokens The flat list of extracted tokens.
 * @returns {{ name: string; tokens: { name: string; value: string }[] }[]} One entry per category.
 */
export function groupTokensByCategory(tokens) {
  const categories = new Map();

  for (const { category, name, value, values } of tokens) {
    const group = categories.get(category) ?? { name: category, tokens: [] };
    group.tokens.push(values ? { name, value, values } : { name, value });
    categories.set(category, group);
  }

  return [...categories.values()];
}

/**
 * Builds the design tokens manifest (`design-tokens.json`) containing the global Forge tokens.
 */
export async function buildTokens({ entry = TOKENS_ENTRY, outfile = 'design-tokens.json' } = {}) {
  const tokens = [...extractDesignTokens(entry), ...extractThemeTokens()];
  const manifest = { schemaVersion: SCHEMA_VERSION, categories: groupTokensByCategory(tokens) };
  await writeFile(outfile, `${JSON.stringify(manifest, null, 2)}\n`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await buildTokens();
}
