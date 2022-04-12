import { getTextColor, randomHexColor } from '@tylertech/forge/utils/color-utils';

interface ITestContext {}

describe('ColorUtils', function(this: ITestContext) {
  describe('randomHexColor', function(this: ITestContext) {
    it('should return valid hex', function(this: ITestContext) {
      const hex = randomHexColor();

      expect(hex.length).toBe(7);
    });
  });

  describe(`getTextColor`, function(this: ITestContext) {
    it('should return color', function(this: ITestContext) {
      const a = getTextColor('A');

      expect(a).toBe('#EF5350');
    });

    it('should return random color for non alphabetical', function(this: ITestContext) {
      const one = getTextColor('1');
      const juan = getTextColor('1');

      expect(one).not.toBe(juan);
    });

    it('should return undefined color for empty string', function(this: ITestContext) {
      const one = getTextColor('');

      expect(one).toBeUndefined();
    });
  });
});
