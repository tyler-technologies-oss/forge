import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { formatRelativeTime } from './format.js';

const NOW = new Date('2025-06-15T12:00:00Z');
const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

function ago(ms: number): string {
  return new Date(NOW.getTime() - ms).toISOString();
}

describe('formatRelativeTime', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return "Just now" when less than a minute has elapsed', () => {
    expect(formatRelativeTime(ago(30_000))).toBe('Just now');
  });

  it('should return "Just now" for a date in the future', () => {
    expect(formatRelativeTime(ago(-5 * MINUTE))).toBe('Just now');
  });

  it('should return minutes when between one minute and one hour have elapsed', () => {
    expect(formatRelativeTime(ago(MINUTE))).toBe('1m ago');
    expect(formatRelativeTime(ago(59 * MINUTE))).toBe('59m ago');
  });

  it('should return hours when between one and 24 hours have elapsed', () => {
    expect(formatRelativeTime(ago(HOUR))).toBe('1h ago');
    expect(formatRelativeTime(ago(23 * HOUR + 59 * MINUTE))).toBe('23h ago');
  });

  it('should return "Yesterday" when between 24 and 48 hours have elapsed', () => {
    expect(formatRelativeTime(ago(DAY))).toBe('Yesterday');
    expect(formatRelativeTime(ago(47 * HOUR))).toBe('Yesterday');
  });

  it('should return a short date once exactly two days have elapsed', () => {
    expect(formatRelativeTime(ago(2 * DAY))).toBe('Jun 13');
  });

  it('should return a short month and day when older than two days in the current year', () => {
    expect(formatRelativeTime('2025-03-05T12:00:00')).toBe('Mar 5');
  });

  it('should include the year when the date is not in the current year', () => {
    expect(formatRelativeTime('2023-11-20T12:00:00')).toBe('Nov 20, 2023');
  });
});
