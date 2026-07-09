import { expect, describe, it } from 'vitest';
import {
  parseDatetimePattern,
  isValidDatetimePattern,
  getDatetimePatternInfo,
  formatDate,
  parseDate,
  escapeDatetimeLiterals,
  unescapeDatetimeLiterals,
  isDatetimePatternLetter
} from './date-utils.js';

describe('CldrDateUtils', () => {
  describe('Pattern Letter Detection', () => {
    describe('isCldrPatternLetter', () => {
      it('should return true for valid pattern letters', () => {
        expect(isDatetimePatternLetter('y')).toBe(true);
        expect(isDatetimePatternLetter('M')).toBe(true);
        expect(isDatetimePatternLetter('d')).toBe(true);
        expect(isDatetimePatternLetter('H')).toBe(true);
        expect(isDatetimePatternLetter('z')).toBe(true);
      });

      it('should return false for invalid characters', () => {
        expect(isDatetimePatternLetter('x')).toBe(true); // x is valid (ISO timezone)
        expect(isDatetimePatternLetter('n')).toBe(false);
        expect(isDatetimePatternLetter('!')).toBe(false);
        expect(isDatetimePatternLetter('1')).toBe(false);
      });
    });
  });

  describe('Pattern Parsing', () => {
    describe('parseCldrPattern', () => {
      it('should parse simple date pattern', () => {
        const tokens = parseDatetimePattern('yyyy-MM-dd');
        expect(tokens).toHaveLength(5);
        expect(tokens[0]).toEqual({ letter: 'y', count: 4, literal: false });
        expect(tokens[1]).toEqual({ letter: null, count: 0, literal: true, value: '-' });
        expect(tokens[2]).toEqual({ letter: 'M', count: 2, literal: false });
        expect(tokens[3]).toEqual({ letter: null, count: 0, literal: true, value: '-' });
        expect(tokens[4]).toEqual({ letter: 'd', count: 2, literal: false });
      });

      it('should parse date-time pattern', () => {
        const tokens = parseDatetimePattern('yyyy-MM-dd HH:mm:ss');
        expect(tokens.length).toBeGreaterThan(5);
        expect(tokens.some(t => t.letter === 'y')).toBe(true);
        expect(tokens.some(t => t.letter === 'H')).toBe(true);
        expect(tokens.some(t => t.letter === 'm')).toBe(true);
        expect(tokens.some(t => t.letter === 's')).toBe(true);
      });

      it('should parse pattern with quoted literals', () => {
        const tokens = parseDatetimePattern("'Today is' yyyy-MM-dd");
        expect(tokens[0]).toEqual({ letter: null, count: 0, literal: true, value: 'Today is' });
        expect(tokens[1]).toEqual({ letter: null, count: 0, literal: true, value: ' ' });
        expect(tokens[2]).toEqual({ letter: 'y', count: 4, literal: false });
      });

      it('should handle escaped quotes', () => {
        const tokens = parseDatetimePattern("'o''clock'");
        expect(tokens[0]).toEqual({ letter: null, count: 0, literal: true, value: "o'clock" });
      });

      it('should count consecutive letters correctly', () => {
        const tokens = parseDatetimePattern('yy yyyy MMMM');
        expect(tokens[0]).toEqual({ letter: 'y', count: 2, literal: false });
        expect(tokens[1]).toEqual({ letter: null, count: 0, literal: true, value: ' ' });
        expect(tokens[2]).toEqual({ letter: 'y', count: 4, literal: false });
        expect(tokens[3]).toEqual({ letter: null, count: 0, literal: true, value: ' ' });
        expect(tokens[4]).toEqual({ letter: 'M', count: 4, literal: false });
      });
    });

    describe('isValidCldrPattern', () => {
      it('should validate correct patterns', () => {
        expect(isValidDatetimePattern('yyyy-MM-dd')).toBe(true);
        expect(isValidDatetimePattern('HH:mm:ss')).toBe(true);
        expect(isValidDatetimePattern("'Today is' yyyy")).toBe(true);
      });

      it('should reject patterns with unmatched quotes', () => {
        expect(isValidDatetimePattern("'unmatched")).toBe(false);
      });

      it('should reject conflicting hour patterns', () => {
        expect(isValidDatetimePattern('hh HH')).toBe(false);
        expect(isValidDatetimePattern('h H')).toBe(false);
        expect(isValidDatetimePattern('K k')).toBe(false);
      });

      it('should allow single hour pattern types', () => {
        expect(isValidDatetimePattern('hh:mm a')).toBe(true);
        expect(isValidDatetimePattern('HH:mm')).toBe(true);
      });
    });

    describe('getCldrPatternInfo', () => {
      it('should detect date patterns', () => {
        const info = getDatetimePatternInfo('yyyy-MM-dd');
        expect(info.hasDate).toBe(true);
        expect(info.hasTime).toBe(false);
        expect(info.hasTimeZone).toBe(false);
      });

      it('should detect time patterns', () => {
        const info = getDatetimePatternInfo('HH:mm:ss');
        expect(info.hasDate).toBe(false);
        expect(info.hasTime).toBe(true);
        expect(info.hasTimeZone).toBe(false);
      });

      it('should detect datetime patterns', () => {
        const info = getDatetimePatternInfo('yyyy-MM-dd HH:mm:ss');
        expect(info.hasDate).toBe(true);
        expect(info.hasTime).toBe(true);
        expect(info.hasTimeZone).toBe(false);
      });

      it('should detect timezone patterns', () => {
        const info = getDatetimePatternInfo('yyyy-MM-dd HH:mm:ss z');
        expect(info.hasTimeZone).toBe(true);
      });

      it('should detect era patterns', () => {
        const info = getDatetimePatternInfo('GGGG yyyy');
        expect(info.hasEra).toBe(true);
      });

      it('should detect week patterns', () => {
        const info = getDatetimePatternInfo('ww yyyy');
        expect(info.hasWeek).toBe(true);
      });
    });
  });

  describe('Literal Handling', () => {
    describe('escapeCldrLiterals', () => {
      it('should wrap text in quotes', () => {
        expect(escapeDatetimeLiterals('Today')).toBe("'Today'");
      });

      it('should escape internal quotes', () => {
        expect(escapeDatetimeLiterals("o'clock")).toBe("'o''clock'");
      });
    });

    describe('unescapeCldrLiterals', () => {
      it('should remove surrounding quotes', () => {
        expect(unescapeDatetimeLiterals("'Today'")).toBe('Today');
      });

      it('should unescape double quotes', () => {
        expect(unescapeDatetimeLiterals("'o''clock'")).toBe("o'clock");
      });
    });
  });

  describe('Date Formatting', () => {
    const testDate = new Date(2024, 0, 15, 14, 30, 45, 123);

    describe('Year patterns', () => {
      it('should format year with y pattern', () => {
        expect(formatDate(testDate, 'y')).toMatch(/2024/);
      });

      it('should format two-digit year with yy pattern', () => {
        expect(formatDate(testDate, 'yy')).toMatch(/24/);
      });

      it('should format four-digit year with yyyy pattern', () => {
        expect(formatDate(testDate, 'yyyy')).toMatch(/2024/);
      });
    });

    describe('Month patterns', () => {
      it('should format numeric month with M', () => {
        const result = formatDate(testDate, 'M');
        expect(['1', '01']).toContain(result);
      });

      it('should format zero-padded month with MM', () => {
        expect(formatDate(testDate, 'MM')).toBe('01');
      });

      it('should format abbreviated month with MMM', () => {
        expect(formatDate(testDate, 'MMM')).toMatch(/Jan/i);
      });

      it('should format full month with MMMM', () => {
        expect(formatDate(testDate, 'MMMM')).toMatch(/January/i);
      });
    });

    describe('Day patterns', () => {
      it('should format day of month with d', () => {
        const result = formatDate(testDate, 'd');
        expect(['15']).toContain(result);
      });

      it('should format zero-padded day with dd', () => {
        expect(formatDate(testDate, 'dd')).toBe('15');
      });

      it('should format day of year with D', () => {
        const result = formatDate(testDate, 'D');
        expect(result).toMatch(/^\d+$/);
        expect(parseInt(result, 10)).toBeGreaterThan(0);
        expect(parseInt(result, 10)).toBeLessThanOrEqual(366);
      });
    });

    describe('Weekday patterns', () => {
      it('should format abbreviated weekday with E', () => {
        const result = formatDate(testDate, 'E');
        expect(result).toMatch(/Mon/i);
      });

      it('should format full weekday with EEEE', () => {
        const result = formatDate(testDate, 'EEEE');
        expect(result).toMatch(/Monday/i);
      });
    });

    describe('Time patterns', () => {
      it('should format 24-hour with H', () => {
        expect(formatDate(testDate, 'H')).toMatch(/14/);
      });

      it('should format 24-hour with HH', () => {
        expect(formatDate(testDate, 'HH')).toBe('14');
      });

      it('should format 12-hour with h', () => {
        const result = formatDate(testDate, 'h');
        expect(['2']).toContain(result);
      });

      it('should format 12-hour with hh', () => {
        expect(formatDate(testDate, 'hh')).toBe('02');
      });

      it('should format minutes with m', () => {
        expect(formatDate(testDate, 'm')).toMatch(/30/);
      });

      it('should format minutes with mm', () => {
        expect(formatDate(testDate, 'mm')).toBe('30');
      });

      it('should format seconds with s', () => {
        expect(formatDate(testDate, 's')).toMatch(/45/);
      });

      it('should format seconds with ss', () => {
        expect(formatDate(testDate, 'ss')).toBe('45');
      });

      it('should format fractional seconds with S', () => {
        const result = formatDate(testDate, 'S');
        expect(result).toMatch(/^\d$/);
      });

      it('should format fractional seconds with SSS', () => {
        const result = formatDate(testDate, 'SSS');
        expect(result).toMatch(/^\d{3}$/);
      });
    });

    describe('Quarter patterns', () => {
      it('should format quarter with Q', () => {
        const result = formatDate(testDate, 'Q');
        expect(result).toBe('1');
      });

      it('should format quarter with QQ', () => {
        const result = formatDate(testDate, 'QQ');
        expect(result).toBe('01');
      });

      it('should format quarter with QQQ', () => {
        const result = formatDate(testDate, 'QQQ');
        expect(result).toBe('Q1');
      });

      it('should format quarter with QQQQ', () => {
        const result = formatDate(testDate, 'QQQQ');
        expect(result).toBe('1st quarter');
      });
    });

    describe('Week patterns', () => {
      it('should format week of year with w', () => {
        const result = formatDate(testDate, 'w');
        expect(result).toMatch(/^\d+$/);
        const week = parseInt(result, 10);
        expect(week).toBeGreaterThanOrEqual(1);
        expect(week).toBeLessThanOrEqual(53);
      });

      it('should format week of year with ww', () => {
        const result = formatDate(testDate, 'ww');
        expect(result).toMatch(/^\d{2}$/);
      });

      it('should format week of month with W', () => {
        const result = formatDate(testDate, 'W');
        expect(result).toMatch(/^\d$/);
        const week = parseInt(result, 10);
        expect(week).toBeGreaterThanOrEqual(1);
        expect(week).toBeLessThanOrEqual(5);
      });
    });

    describe('Timezone patterns', () => {
      it('should format ISO8601 timezone with X', () => {
        const result = formatDate(testDate, 'X');
        expect(result).toMatch(/^[Z+-]\d{0,2}$/);
      });

      it('should format ISO8601 timezone with XXX', () => {
        const result = formatDate(testDate, 'XXX');
        expect(result).toMatch(/^[Z+-]\d{2}:\d{2}$/);
      });

      it('should format timezone offset with Z', () => {
        const result = formatDate(testDate, 'Z');
        expect(result).toMatch(/^[+-]\d{4}$/);
      });
    });

    describe('Complex patterns', () => {
      it('should format ISO 8601: yyyy-MM-dd HH:mm:ss', () => {
        const result = formatDate(testDate, 'yyyy-MM-dd HH:mm:ss');
        expect(result).toBe('2024-01-15 14:30:45');
      });

      it('should format US long: EEEE, MMMM d, yyyy', () => {
        const result = formatDate(testDate, 'EEEE, MMMM d, yyyy');
        expect(result).toMatch(/Monday, January 15, 2024/i);
      });

      it('should format with literals', () => {
        const result = formatDate(testDate, "'Today is' yyyy-MM-dd");
        expect(result).toBe('Today is 2024-01-15');
      });

      it('should format with escaped quotes', () => {
        const result = formatDate(testDate, "HH 'o''clock'");
        expect(result).toBe("14 o'clock");
      });
    });

    describe('Locale support', () => {
      it('should format with en-US locale', () => {
        const result = formatDate(testDate, 'MMMM', { locale: 'en-US' });
        expect(result).toMatch(/January/i);
      });

      it('should format with de-DE locale', () => {
        const result = formatDate(testDate, 'MMMM', { locale: 'de-DE' });
        expect(result).toMatch(/Januar|Jänner/i);
      });

      it('should format with ja-JP locale', () => {
        const result = formatDate(testDate, 'M', { locale: 'ja-JP' });
        expect(result).toBe('1');
      });
    });

    describe('Error handling', () => {
      it('should throw error for invalid date', () => {
        const invalidDate = new Date('invalid');
        expect(() => formatDate(invalidDate, 'yyyy-MM-dd')).toThrow('Invalid date');
      });

      it('should throw error for invalid pattern', () => {
        expect(() => formatDate(testDate, "'unmatched")).toThrow('Invalid CLDR pattern');
      });
    });
  });

  describe('Date Parsing', () => {
    describe('parseDateWithCldrPattern', () => {
      it('should parse ISO format: yyyy-MM-dd', () => {
        const result = parseDate('2024-01-15', 'yyyy-MM-dd');
        expect(result).toBeInstanceOf(Date);
        expect(result?.getFullYear()).toBe(2024);
        expect(result?.getMonth()).toBe(0);
        expect(result?.getDate()).toBe(15);
      });

      it('should parse US format: MM/dd/yyyy', () => {
        const result = parseDate('01/15/2024', 'MM/dd/yyyy');
        expect(result).toBeInstanceOf(Date);
        expect(result?.getFullYear()).toBe(2024);
        expect(result?.getMonth()).toBe(0);
        expect(result?.getDate()).toBe(15);
      });

      it('should parse EU format: dd.MM.yyyy', () => {
        const result = parseDate('15.01.2024', 'dd.MM.yyyy');
        expect(result).toBeInstanceOf(Date);
        expect(result?.getFullYear()).toBe(2024);
        expect(result?.getMonth()).toBe(0);
        expect(result?.getDate()).toBe(15);
      });

      it('should parse with time: yyyy-MM-dd HH:mm:ss', () => {
        const result = parseDate('2024-01-15 14:30:45', 'yyyy-MM-dd HH:mm:ss');
        expect(result).toBeInstanceOf(Date);
        expect(result?.getHours()).toBe(14);
        expect(result?.getMinutes()).toBe(30);
        expect(result?.getSeconds()).toBe(45);
      });

      it('should parse with 12-hour time and AM', () => {
        const result = parseDate('02:30 AM', 'hh:mm a');
        expect(result).toBeInstanceOf(Date);
        expect(result?.getHours()).toBe(2);
        expect(result?.getMinutes()).toBe(30);
      });

      it('should parse with 12-hour time and PM', () => {
        const result = parseDate('02:30 PM', 'hh:mm a');
        expect(result).toBeInstanceOf(Date);
        expect(result?.getHours()).toBe(14);
        expect(result?.getMinutes()).toBe(30);
      });

      it('should parse two-digit year', () => {
        const result = parseDate('24-01-15', 'yy-MM-dd');
        expect(result).toBeInstanceOf(Date);
        expect(result?.getFullYear()).toBe(2024);
      });

      it('should parse with milliseconds', () => {
        const result = parseDate('14:30:45.123', 'HH:mm:ss.SSS');
        expect(result).toBeInstanceOf(Date);
        expect(result?.getHours()).toBe(14);
        expect(result?.getMinutes()).toBe(30);
        expect(result?.getSeconds()).toBe(45);
        expect(result?.getMilliseconds()).toBe(123);
      });

      it('should return null for invalid input', () => {
        const result = parseDate('invalid', 'yyyy-MM-dd');
        expect(result).toBeNull();
      });

      it('should return null for mismatched pattern', () => {
        const result = parseDate('2024-01-15', 'MM/dd/yyyy');
        expect(result).toBeNull();
      });

      it('should round-trip format then parse', () => {
        const original = new Date(2024, 6, 15, 14, 30, 45, 0);
        const formatted = formatDate(original, 'yyyy-MM-dd HH:mm:ss');
        const parsed = parseDate(formatted, 'yyyy-MM-dd HH:mm:ss');
        expect(parsed?.getFullYear()).toBe(original.getFullYear());
        expect(parsed?.getMonth()).toBe(original.getMonth());
        expect(parsed?.getDate()).toBe(original.getDate());
        expect(parsed?.getHours()).toBe(original.getHours());
        expect(parsed?.getMinutes()).toBe(original.getMinutes());
        expect(parsed?.getSeconds()).toBe(original.getSeconds());
      });
    });
  });

  describe('Integration', () => {
    it('should handle leap years correctly', () => {
      const leapYear = new Date(2024, 1, 29);
      const result = formatDate(leapYear, 'yyyy-MM-dd');
      expect(result).toBe('2024-02-29');

      const parsed = parseDate('2024-02-29', 'yyyy-MM-dd');
      expect(parsed?.getDate()).toBe(29);
    });

    it('should handle month boundaries', () => {
      const endOfMonth = new Date(2024, 0, 31);
      const result = formatDate(endOfMonth, 'yyyy-MM-dd');
      expect(result).toBe('2024-01-31');
    });

    it('should format 1000 dates quickly', () => {
      const date = new Date(2024, 6, 15, 14, 30, 45);
      const start = performance.now();
      for (let i = 0; i < 1000; i++) {
        formatDate(date, 'yyyy-MM-dd HH:mm:ss');
      }
      const elapsed = performance.now() - start;
      expect(elapsed).toBeLessThan(1000); // Less than 1 second for 1000 formats
    });
  });
});
