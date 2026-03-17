import { describe, it, expect } from 'vitest';
import { randomHexColor } from './color-utils.js';

describe('ColorUtils', () => {
  describe('randomHexColor', () => {
    it('should return valid hex', () => {
      const hex = randomHexColor();

      expect(hex.length).toBe(7);
    });
  });
});
