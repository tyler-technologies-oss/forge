import { describe, it, expect } from 'vitest';
import { coerceDateInput, coerceTimeInput } from './date-time-field-utils.js';

describe('date-time-field-utils / coerceDateInput', () => {
  it('should complete a two-digit year into the current century', () => {
    expect(coerceDateInput('1/2/25')).toBe(`01/02/${String(new Date().getFullYear()).slice(0, 2)}25`);
  });

  it('should pad single-digit month and day segments', () => {
    expect(coerceDateInput('3/4/2025')).toBe('03/04/2025');
  });

  it('should clamp an out-of-range day to the last day of the month', () => {
    expect(coerceDateInput('02/30/2025')).toBe('02/28/2025');
  });

  it('should return null for an empty or whitespace value', () => {
    expect(coerceDateInput('')).toBeNull();
    expect(coerceDateInput('   ')).toBeNull();
    expect(coerceDateInput(null)).toBeNull();
  });

  it('should return null for an unparseable partial value', () => {
    expect(coerceDateInput('12/')).toBeNull();
    expect(coerceDateInput('ab')).toBeNull();
  });
});

describe('date-time-field-utils / coerceTimeInput', () => {
  it('should expand three-digit shorthand into HH:mm (24-hour)', () => {
    expect(coerceTimeInput('130', true, false)).toBe('01:30');
  });

  it('should expand three-digit shorthand into hh:mm AM (12-hour)', () => {
    expect(coerceTimeInput('130', false, false)).toBe('01:30 AM');
  });

  it('should honor a "p" meridiem shorthand in 12-hour mode', () => {
    expect(coerceTimeInput('530p', false, false)).toBe('05:30 PM');
  });

  it('should append seconds when allowSeconds is set', () => {
    expect(coerceTimeInput('130', true, true)).toBe('01:30:00');
  });

  it('should return null for an empty value', () => {
    expect(coerceTimeInput('', false, false)).toBeNull();
    expect(coerceTimeInput(null, true, false)).toBeNull();
  });
});
