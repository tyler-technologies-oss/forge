import { expect, describe, it } from 'vitest';
import { dashify } from './string-utils.js';

describe('StringUtils', () => {
  describe('dashify', () => {
    it('should convert camelCase to dash seperators', () => {
      expect(dashify('camelCaseCamelCase')).toBe('camel-case-camel-case');
    });

    it('should return original value', () => {
      expect(dashify(0 as any)).toBe(0 as any);
      expect(dashify(undefined as any)).toBeUndefined();
    });
  });
});
