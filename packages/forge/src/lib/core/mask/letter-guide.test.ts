import { describe, expect, it } from 'vitest';
import { createLetterGuideMask, toUnderscoreGuide } from './letter-guide.js';

describe('letter guide', () => {
  it('should give each format letter its own single-char definition key', () => {
    const { mask, definitions } = createLetterGuideMask('0`0{/}`0`0', 'MM/DD');
    expect(mask).toBe('1`1{/}`2`2');
    expect(Object.keys(definitions)).toEqual(['1', '2']);
  });

  it('should throw when the format has more distinct letters than definition keys', () => {
    expect(() => createLetterGuideMask('0000000000', 'ABCDEFGHIJ')).toThrow();
  });

  it('should read unfilled letter slots as underscores', () => {
    expect(toUnderscoreGuide('12/2D/YYYY hh:mm aa', 'MM/DD/YYYY hh:mm aa')).toBe('12/2_/____ __:__ __');
  });

  it('should read only an untouched meridiem pair as the guide', () => {
    const format = 'hh:mm aa';
    expect(toUnderscoreGuide('10:30 aa', format)).toBe('10:30 __');
    expect(toUnderscoreGuide('10:30 Aa', format)).toBe('10:30 A_');
    expect(toUnderscoreGuide('10:30 am', format)).toBe('10:30 am');
  });

  it('should align to the format at the given offset', () => {
    expect(toUnderscoreGuide(' aa', 'hh:mm aa', 5)).toBe(' __');
  });
});
