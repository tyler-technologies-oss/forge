import { randomHexColor } from '@tylertech/forge/utils/color-utils';

interface ITestContext {}

describe('ColorUtils', function(this: ITestContext) {
  describe('randomHexColor', function(this: ITestContext) {
    it('should return valid hex', function(this: ITestContext) {
      const hex = randomHexColor();

      expect(hex.length).toBe(7);
    });
  });
});
