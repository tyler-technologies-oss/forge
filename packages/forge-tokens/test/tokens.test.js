import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { describe, expect, it } from 'vitest';

const TOKENS_DIR = new URL('../tokens', import.meta.url).pathname;
const REFERENCE_PATTERN = /\{([^{}]+)\}/g;

const getJsonFiles = dir =>
  readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? getJsonFiles(path) : entry.name.endsWith('.json') ? [path] : [];
  });

/** Walks a design token tree, yielding each token with its path and its inherited `$type`. */
function* walkTokens(node, path = [], inheritedType = undefined) {
  const type = node.$type ?? inheritedType;
  if ('$value' in node) {
    yield { path, token: node, type };
    return;
  }
  for (const [key, child] of Object.entries(node)) {
    if (!key.startsWith('$')) {
      yield* walkTokens(child, [...path, key], type);
    }
  }
}

const files = getJsonFiles(TOKENS_DIR).map(file => ({ file, name: file.slice(TOKENS_DIR.length + 1), tree: JSON.parse(readFileSync(file, 'utf-8')) }));
const allTokens = files.flatMap(({ name, tree }) => [...walkTokens(tree)].map(entry => ({ ...entry, file: name })));

describe('design tokens', () => {
  it('should include tokens', () => {
    expect(files.length).toBeGreaterThan(0);
    expect(allTokens.length).toBeGreaterThan(0);
  });

  it('should define a type for every token', () => {
    const untyped = allTokens.filter(({ type }) => !type).map(({ file, path }) => `${file}: ${path.join('.')}`);
    expect(untyped).toEqual([]);
  });

  it('should only reference tokens that exist', () => {
    const light = new Set(allTokens.filter(({ file }) => file !== 'theme/dark.json').map(({ path }) => path.join('.')));
    const dark = new Set(allTokens.filter(({ file }) => file !== 'theme/light.json').map(({ path }) => path.join('.')));
    const missing = [];

    for (const { file, path, token } of allTokens) {
      const known = file === 'theme/dark.json' ? dark : light;
      const values = typeof token.$value === 'string' ? [token.$value] : (JSON.stringify(token.$value).match(REFERENCE_PATTERN) ?? []);
      for (const value of values) {
        for (const [, reference] of String(value).matchAll(REFERENCE_PATTERN)) {
          if (!known.has(reference)) {
            missing.push(`${file}: ${path.join('.')} -> ${reference}`);
          }
        }
      }
    }

    expect(missing).toEqual([]);
  });

  it('should define the same theme tokens for the light and dark themes', () => {
    const names = file => allTokens.filter(token => token.file === file).map(({ path }) => path.join('.'));
    expect(names('theme/dark.json').sort()).toEqual(names('theme/light.json').sort());
  });
});
