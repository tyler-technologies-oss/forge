import { expect } from '@esm-bundle/chai';
import { randomHexColor } from './color-utils.js';

describe('ColorUtils', () => {
  describe('randomHexColor', () => {
    it('should return valid hex', () => {
      const hex = randomHexColor();

      expect(hex.length).to.equal(7);
    });
  });
});
