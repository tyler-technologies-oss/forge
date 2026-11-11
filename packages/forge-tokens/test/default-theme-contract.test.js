import { readFileSync } from 'fs';
import { describe, expect, it } from 'vitest';

const readJson = path => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf-8'));

const flatten = (node, path = [], out = {}) => {
  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith('$')) {
      continue;
    }
    const next = [...path, key];
    if ('$value' in child) {
      out[next.join('.')] = child.$value;
    } else {
      flatten(child, next, out);
    }
  }
  return out;
};

const readTokens = name => flatten(readJson(`../tokens/${name}.json`));

const contract = readJson('./fixtures/default-theme-contract.json');

describe('default theme contract', () => {
  it.each(Object.keys(contract))('should keep every existing %s token value unchanged', name => {
    const current = readTokens(name);
    const changed = Object.entries(contract[name])
      .filter(([token, value]) => current[token] !== value)
      .map(([token, value]) => `${token}: ${JSON.stringify(value)} -> ${JSON.stringify(current[token])}`);
    expect(changed).toEqual([]);
  });

  it.each([
    ['theme/radix-light', 'theme/light'],
    ['theme/radix-dark', 'theme/dark']
  ])('should define every %s token that %s defines', (radix, base) => {
    const radixTokens = readTokens(radix);
    const missing = Object.keys(readTokens(base)).filter(token => !(token in radixTokens));
    expect(missing).toEqual([]);
  });

  it.each(['theme/light', 'theme/dark', 'typography'])('should not reference the radix palette from the default %s tokens', name => {
    const references = Object.entries(readTokens(name))
      .filter(([, value]) => JSON.stringify(value).includes('{color.radix'))
      .map(([token]) => token);
    expect(references).toEqual([]);
  });
});
