import { describe, expect, it } from 'vitest';
import { hasTopLevelComma, sassFormat, toSassKey, toSassValue } from '../scripts/sass-format.js';

const createToken = (path, $value, $type = 'dimension') => ({ path, $value, $type });
const createDictionary = (...tokens) => ({ allTokens: tokens });

describe('sass format', () => {
  describe('toSassKey', () => {
    it('should leave identifiers bare', () => {
      expect(toSassKey('duration-short1')).toBe('duration-short1');
    });

    it('should leave integers bare', () => {
      expect(toSassKey('24')).toBe('24');
    });

    it('should quote keys with leading zeros', () => {
      expect(toSassKey('0875')).toBe("'0875'");
    });

    it('should always quote when requested', () => {
      expect(toSassKey('1000', true)).toBe("'1000'");
    });
  });

  describe('hasTopLevelComma', () => {
    it('should detect a comma separated list', () => {
      expect(hasTopLevelComma("'Roboto', sans-serif")).toBe(true);
    });

    it('should ignore commas inside of functions', () => {
      expect(hasTopLevelComma('rgba(0, 0, 0, 0.2)')).toBe(false);
    });
  });

  describe('toSassValue', () => {
    it('should wrap comma separated values in parentheses', () => {
      expect(toSassValue(createToken(['a'], '1px 1px red, 2px 2px blue'))).toBe('(1px 1px red, 2px 2px blue)');
    });

    it('should not wrap values that only contain commas within functions', () => {
      expect(toSassValue(createToken(['a'], 'cubic-bezier(0, 0, 1, 1)'))).toBe('cubic-bezier(0, 0, 1, 1)');
    });

    it('should stringify numbers', () => {
      expect(toSassValue(createToken(['a'], 0.87, 'number'))).toBe('0.87');
    });
  });

  describe('sassFormat', () => {
    it('should generate a flat map with remaining path segments joined by dashes', () => {
      const dictionary = createDictionary(createToken(['animation', 'duration', 'short1'], '50ms'), createToken(['animation', 'duration', 'short2'], '100ms'));
      const output = sassFormat({ dictionary, options: { variables: [{ name: 'tokens', root: ['animation'], defaultable: true }] } });
      expect(output).toContain('$tokens: (\n  duration-short1: 50ms,\n  duration-short2: 100ms\n) !default;');
    });

    it('should generate nested maps for the requested depth', () => {
      const dictionary = createDictionary(createToken(['typography', 'style', 'body1', 'font-size'], 1, 'number'));
      const output = sassFormat({ dictionary, options: { variables: [{ name: 'styles', root: ['typography', 'style'], depth: 1 }] } });
      expect(output).toContain('$styles: (\n  body1: (\n    font-size: 1\n  )\n);');
    });

    it('should generate a variable for each token', () => {
      const dictionary = createDictionary(createToken(['color', 'palette', 'indigo', '500'], '#3f51b5', 'color'));
      const output = sassFormat({ dictionary, options: { variables: [{ type: 'variables', root: ['color', 'palette'] }] } });
      expect(output).toContain('$indigo-500: #3f51b5;');
    });

    it('should generate a single value', () => {
      const dictionary = createDictionary(createToken(['typography', 'font-size'], '1rem'));
      const output = sassFormat({ dictionary, options: { variables: [{ name: 'font-size', root: ['typography', 'font-size'], type: 'value' }] } });
      expect(output).toContain('$font-size: 1rem;');
    });

    it('should throw when no tokens are found below the root', () => {
      const dictionary = createDictionary(createToken(['border', 'thin'], '1px'));
      expect(() => sassFormat({ dictionary, options: { variables: [{ name: 'tokens', root: ['shape'] }] } })).toThrow(/No tokens found/);
    });
  });
});
