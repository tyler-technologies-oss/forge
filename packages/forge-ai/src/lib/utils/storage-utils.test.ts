import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { readStoredNumber, removeStoredValue, writeStoredNumber } from './storage-utils.js';

const KEY = 'forge-ai-test-key';

describe('storage-utils', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
    window.sessionStorage.clear();
  });

  describe('writeStoredNumber / readStoredNumber', () => {
    it('should round-trip a number through localStorage', () => {
      writeStoredNumber({ kind: 'local', key: KEY, value: 123 });

      expect(readStoredNumber({ kind: 'local', key: KEY })).toBe(123);
      expect(window.sessionStorage.getItem(KEY)).toBeNull();
    });

    it('should round-trip a number through sessionStorage', () => {
      writeStoredNumber({ kind: 'session', key: KEY, value: 7.5 });

      expect(readStoredNumber({ kind: 'session', key: KEY })).toBe(7.5);
      expect(window.localStorage.getItem(KEY)).toBeNull();
    });

    it('should return undefined when the key is missing', () => {
      expect(readStoredNumber({ kind: 'local', key: KEY })).toBeUndefined();
    });

    it('should return undefined when the stored value is not a finite number', () => {
      window.localStorage.setItem(KEY, 'abc');
      expect(readStoredNumber({ kind: 'local', key: KEY })).toBeUndefined();

      window.localStorage.setItem(KEY, 'Infinity');
      expect(readStoredNumber({ kind: 'local', key: KEY })).toBeUndefined();
    });

    it('should read a stored zero', () => {
      writeStoredNumber({ kind: 'local', key: KEY, value: 0 });

      expect(readStoredNumber({ kind: 'local', key: KEY })).toBe(0);
    });

    it('should return undefined when storage access throws', () => {
      vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new DOMException('denied', 'SecurityError');
      });

      expect(readStoredNumber({ kind: 'local', key: KEY })).toBeUndefined();
    });

    it('should not throw when writing fails', () => {
      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new DOMException('quota', 'QuotaExceededError');
      });

      expect(() => writeStoredNumber({ kind: 'session', key: KEY, value: 1 })).not.toThrow();
    });
  });

  describe('removeStoredValue', () => {
    it('should remove a stored value', () => {
      writeStoredNumber({ kind: 'local', key: KEY, value: 5 });

      removeStoredValue({ kind: 'local', key: KEY });

      expect(readStoredNumber({ kind: 'local', key: KEY })).toBeUndefined();
    });

    it('should only remove from the requested storage kind', () => {
      writeStoredNumber({ kind: 'local', key: KEY, value: 5 });
      writeStoredNumber({ kind: 'session', key: KEY, value: 6 });

      removeStoredValue({ kind: 'session', key: KEY });

      expect(readStoredNumber({ kind: 'local', key: KEY })).toBe(5);
      expect(readStoredNumber({ kind: 'session', key: KEY })).toBeUndefined();
    });

    it('should not throw when removal fails', () => {
      vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
        throw new DOMException('denied', 'SecurityError');
      });

      expect(() => removeStoredValue({ kind: 'local', key: KEY })).not.toThrow();
    });
  });
});
