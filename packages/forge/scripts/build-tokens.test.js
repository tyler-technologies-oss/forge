import { describe, expect, it } from 'vitest';
import { extractThemeTokens, getThemeCategory, groupTokensByCategory } from './build-tokens.js';

describe('build-tokens', () => {
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
  });
});
