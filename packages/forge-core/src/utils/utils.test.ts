import { expect, describe, it } from 'vitest';
import * as Utils from './utils.js';

describe('Utils', () => {
  describe('randomChars', () => {
    it('should return default of 5 characters', () => {
      expect(Utils.randomChars().length).toBe(5);
    });

    it('should return custom length string', () => {
      const len = 10;
      expect(Utils.randomChars(len).length).toBe(len);
    });
  });

  describe('isDefined', () => {
    it('should return true when defined', () => {
      const test = true;
      expect(Utils.isDefined(test)).toBe(true);
    });

    it('should return false when undefined or null', () => {
      const test = undefined;
      expect(Utils.isDefined(test)).toBe(false);
      expect(Utils.isDefined(null)).toBe(false);
    });
  });

  describe('isString', () => {
    it('should return true when defined', () => {
      const test = '';
      expect(Utils.isString(test)).toBe(true);
    });

    it('should return false when undefined', () => {
      const test = undefined;
      expect(Utils.isString(test)).toBe(false);
    });

    it('should return false for a non-string type', () => {
      const test = 0;
      expect(Utils.isString(test)).toBe(false);
    });
  });

  describe('isBoolean', () => {
    it('should return true when defined', () => {
      const test = false;
      expect(Utils.isBoolean(test)).toBe(true);
    });

    it('should return false when undefined', () => {
      const test = undefined;
      expect(Utils.isBoolean(test)).toBe(false);
    });

    it('should return false for a non-boolean type', () => {
      const test = 0;
      expect(Utils.isBoolean(test)).toBe(false);
    });
  });

  describe('isNumber', () => {
    it('should return true when defined', () => {
      const test = 1;
      expect(Utils.isNumber(test)).toBe(true);
    });

    it('should return false when undefined', () => {
      const test = undefined;
      expect(Utils.isNumber(test)).toBe(false);
    });

    it('should return false for a non-number type', () => {
      const test = '0';
      expect(Utils.isNumber(test)).toBe(false);
    });
  });

  describe('isDate', () => {
    it('should return true when defined', () => {
      const test = new Date();
      expect(Utils.isDate(test)).toBe(true);
    });

    it('should return false when undefined', () => {
      const test = undefined;
      expect(Utils.isDate(test)).toBe(false);
    });

    it('should return false for a non-date type', () => {
      const test = 0;
      expect(Utils.isDate(test)).toBe(false);
    });
  });

  describe('isValidDate', () => {
    it('should return true for a valid date', () => {
      const test = new Date(Date.now());
      expect(Utils.isValidDate(test)).toBe(true);
    });

    it('should return false for an invalid date', () => {
      const test = new Date('invalid');
      expect(Utils.isValidDate(test)).toBe(false);
    });
  });

  describe('isFunction', () => {
    it('should return true when defined', () => {
      const test = (): void => {};
      expect(Utils.isFunction(test)).toBe(true);
    });

    it('should return false when undefined', () => {
      const test = undefined;
      expect(Utils.isFunction(test)).toBe(false);
    });

    it('should return false for a non-function type', () => {
      const test = 0;
      expect(Utils.isFunction(test)).toBe(false);
    });
  });

  describe('isArray', () => {
    it('should return true when defined', () => {
      const test: unknown[] = [];
      expect(Utils.isArray(test)).toBe(true);
    });

    it('should return false when undefined', () => {
      const test = undefined;
      expect(Utils.isArray(test)).toBe(false);
    });

    it('should return false for a non-array type', () => {
      const test = 0;
      expect(Utils.isArray(test)).toBe(false);
    });
  });

  describe('isObject', () => {
    it('should return true when defined', () => {
      const test = {};
      expect(Utils.isObject(test)).toBe(true);
    });

    it('should return false when undefined', () => {
      const test = undefined;
      expect(Utils.isObject(test)).toBe(false);
    });

    it('should return false for a primitive type', () => {
      const test = 0;
      expect(Utils.isObject(test)).toBe(false);
    });
  });

  describe('coerceBoolean', () => {
    it('should return true for "true"', () => {
      expect(Utils.coerceBoolean('true')).toBe(true);
    });

    it('should return false for "false"', () => {
      expect(Utils.coerceBoolean('false')).toBe(false);
    });

    it('should return true for any string !== false', () => {
      expect(Utils.coerceBoolean('')).toBe(true);
    });
  });

  describe('coerceNumber', () => {
    it('should return 987 for "987"', () => {
      expect(Utils.coerceNumber('987')).toBe(987);
    });

    it('should return NaN for non-numeric string', () => {
      expect(Utils.coerceNumber('blah')).toBeNaN();
    });
  });

  describe('nameof', () => {
    it('should return name of variable', () => {
      const simpleVar = true;
      const simpleVarObj = { simpleVar };
      expect(
        Utils.nameof(function () {
          return simpleVarObj.simpleVar;
        })
      ).toBe('simpleVar');
    });

    it('should return name of property with arrow function', () => {
      const obj = { simpleVar: true };
      expect(
        Utils.nameof(function () {
          return obj.simpleVar;
        })
      ).toBe('simpleVar');
    });

    it('should return name of method with arrow function', () => {
      function TestObj(): void {}
      TestObj.prototype.someMethod = (): void => {};
      const obj = new (TestObj as any)();
      expect(
        Utils.nameof(function () {
          return obj.someMethod;
        })
      ).toBe('someMethod');
    });

    it('should return name of property with function keyword', () => {
      const obj = { simpleVar: true };
      expect(
        Utils.nameof(function () {
          return obj.simpleVar;
        })
      ).toBe('simpleVar');
    });

    it('should return name of method with function keyword', () => {
      function TestObj(): void {}
      TestObj.prototype.someMethod = (): void => {};
      const obj = new (TestObj as any)();
      expect(
        Utils.nameof(function () {
          return obj.someMethod;
        })
      ).toBe('someMethod');
    });
  });
});
