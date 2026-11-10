import { describe, expect, it } from 'vitest';
import { applyAlpha, colorAlphaTransform, EXTENSION_NAMESPACE, getTokenAlpha } from '../scripts/color-alpha.js';

const createToken = ($value, alpha) => ({
  $value,
  $type: 'color',
  ...(alpha === undefined ? {} : { $extensions: { [EXTENSION_NAMESPACE]: { alpha } } })
});

describe('color alpha', () => {
  describe('applyAlpha', () => {
    it('should apply the alpha to an oklch color', () => {
      expect(applyAlpha('oklch(0.1785 0.0041 285.98)', 0.5)).toBe('oklch(0.1785 0.0041 285.98 / 50%)');
    });

    it('should convert a hex color to oklch', () => {
      expect(applyAlpha('#ffffff', 0)).toBe('oklch(1 0 0 / 0%)');
    });

    it('should use a hue of 0 for achromatic colors', () => {
      expect(applyAlpha('#000000', 1)).toBe('oklch(0 0 0 / 100%)');
    });

    it('should replace an existing alpha', () => {
      expect(applyAlpha('oklch(1 0 0 / 80%)', 0.25)).toBe('oklch(1 0 0 / 25%)');
    });

    it('should throw when the alpha is out of range', () => {
      expect(() => applyAlpha('#ffffff', 2)).toThrow();
    });
  });

  describe('getTokenAlpha', () => {
    it('should return the alpha from the extension namespace', () => {
      expect(getTokenAlpha(createToken('#ffffff', 0))).toBe(0);
    });

    it('should return undefined when the token has no alpha', () => {
      expect(getTokenAlpha(createToken('#ffffff'))).toBeUndefined();
    });
  });

  describe('transform', () => {
    it('should only apply to tokens with an alpha', () => {
      expect(colorAlphaTransform.filter(createToken('#ffffff', 0))).toBe(true);
      expect(colorAlphaTransform.filter(createToken('#ffffff'))).toBe(false);
    });

    it('should run after references are resolved', () => {
      expect(colorAlphaTransform.transitive).toBe(true);
    });

    it('should apply the alpha to the resolved value', () => {
      expect(colorAlphaTransform.transform(createToken('#ffffff', 0))).toBe('oklch(1 0 0 / 0%)');
    });
  });
});
