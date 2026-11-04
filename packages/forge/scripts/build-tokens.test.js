import { mkdtemp, readFile, rm } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { buildTokens, findMissingDescriptions, extractThemeTokens, getThemeCategory, groupTokensByCategory } from './build-tokens.js';

describe('build-tokens', () => {
  describe('buildTokens', () => {
    let dir;
    let manifest;

    const findToken = name => manifest.categories.flatMap(({ tokens }) => tokens).find(token => token.name === name);

    beforeAll(async () => {
      dir = await mkdtemp(join(tmpdir(), 'forge-tokens-'));
      const outfile = join(dir, 'design-tokens.json');
      await buildTokens({ outfile });
      manifest = JSON.parse(await readFile(outfile, 'utf-8'));
    });

    afterAll(async () => {
      await rm(dir, { recursive: true, force: true });
    });

    it('should write the current schema version when building the manifest', () => {
      expect(manifest.schemaVersion).toBe('1.2.0');
    });

    it('should include both global and theme categories when building the manifest', () => {
      const names = manifest.categories.map(({ name }) => name);

      expect(names).toEqual(expect.arrayContaining(['color', 'spacing', 'primary', 'surface']));
    });

    it('should include global tokens without mode values when building the manifest', () => {
      const token = findToken('--forge-spacing-medium');

      expect(token?.value).toBeTruthy();
      expect(token).not.toHaveProperty('values');
    });

    it('should describe every category and token when building the manifest', () => {
      const undescribedCategories = manifest.categories.filter(({ description }) => !description).map(({ name }) => name);
      const undescribedTokens = manifest.categories
        .flatMap(({ tokens }) => tokens)
        .filter(({ description }) => !description)
        .map(({ name }) => name);

      expect(undescribedCategories).toEqual([]);
      expect(undescribedTokens).toEqual([]);
    });

    it('should include theme tokens with light and dark values when building the manifest', () => {
      const token = findToken('--forge-theme-primary');

      expect(token?.values).toEqual({ light: expect.any(String), dark: expect.any(String) });
      expect(token?.value).toBe(token?.values.light);
    });
  });

  describe('extractThemeTokens', () => {
    const tokens = extractThemeTokens();

    it('should include both light and dark values when a theme token differs between modes', () => {
      const token = tokens.find(({ name }) => name === '--forge-theme-text-high');

      expect(token?.value).toBe(token?.values.light);
      expect(token?.values.light).not.toBe(token?.values.dark);
    });

    it('should resolve values to concrete colors when tokens are derived from Sass functions', () => {
      const unresolved = tokens.filter(({ values }) => /\$|\bmap\./.test(`${values.light}${values.dark}`));

      expect(unresolved).toEqual([]);
    });

    it('should assign every theme token to a role category', () => {
      expect(tokens.length).toBeGreaterThan(0);
      expect(tokens.every(({ category }) => category)).toBe(true);
    });
  });

  describe('getThemeCategory', () => {
    it('should group on-role tokens with their role when the name starts with on', () => {
      expect(getThemeCategory('--forge-theme-on-primary-container')).toBe('primary');
      expect(getThemeCategory('--forge-theme-on-surface')).toBe('surface');
    });

    it('should return undefined when the role is not recognized', () => {
      expect(getThemeCategory('--forge-theme-unknown-thing')).toBeUndefined();
    });
  });

  describe('groupTokensByCategory', () => {
    it('should preserve category order and carry values when present', () => {
      const values = { light: '#fff', dark: '#000' };
      const groups = groupTokensByCategory([
        { category: 'spacing', name: '--forge-spacing-xs', value: '4px' },
        { category: 'surface', name: '--forge-theme-surface', value: '#fff', values },
        { category: 'spacing', name: '--forge-spacing-sm', value: '8px' }
      ]);

      expect(groups.map(({ name }) => name)).toEqual(['spacing', 'surface']);
      expect(groups[0].tokens).toEqual([
        { name: '--forge-spacing-xs', value: '4px' },
        { name: '--forge-spacing-sm', value: '8px' }
      ]);
      expect(groups[1].tokens[0].values).toEqual(values);
    });

    it('should attach descriptions when the category and token are known', () => {
      const [group] = groupTokensByCategory([{ category: 'spacing', name: '--forge-spacing-medium', value: '16px' }]);

      expect(group.description).toBeTruthy();
      expect(group.tokens[0].description).toBeTruthy();
    });
  });

  describe('findMissingDescriptions', () => {
    it('should list undescribed categories and tokens when descriptions are missing', () => {
      const missing = findMissingDescriptions([
        { name: 'spacing', description: 'Spacing.', tokens: [{ name: '--forge-spacing-a', description: 'A.' }, { name: '--forge-spacing-b' }] },
        { name: 'unknown', tokens: [{ name: '--forge-unknown-a', description: 'A.' }] }
      ]);

      expect(missing).toEqual(['--forge-spacing-b', 'category "unknown"']);
    });

    it('should return an empty list when everything is described', () => {
      expect(findMissingDescriptions([{ name: 'spacing', description: 'Spacing.', tokens: [{ name: '--forge-spacing-a', description: 'A.' }] }])).toEqual([]);
    });
  });
});
