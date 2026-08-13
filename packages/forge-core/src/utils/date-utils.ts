import { isValidDate } from './utils.js';

export type DatetimePatternLetter =
  | 'G'
  | 'y'
  | 'Y'
  | 'u'
  | 'Q'
  | 'q'
  | 'M'
  | 'L'
  | 'w'
  | 'W'
  | 'd'
  | 'D'
  | 'F'
  | 'g'
  | 'E'
  | 'e'
  | 'c'
  | 'a'
  | 'b'
  | 'B'
  | 'h'
  | 'H'
  | 'K'
  | 'k'
  | 'm'
  | 's'
  | 'S'
  | 'A'
  | 'z'
  | 'Z'
  | 'O'
  | 'v'
  | 'V'
  | 'X'
  | 'x';

export interface DatetimePatternToken {
  letter: DatetimePatternLetter | null;
  count: number;
  literal: boolean;
  value?: string;
}

export interface DatetimeFormatOptions {
  locale?: string;
  timeZone?: string;
  calendar?: string;
  numberingSystem?: string;
}

export interface DatetimeParseOptions {
  locale?: string;
  strict?: boolean;
  timeZone?: string;
}

export interface CldrPatternInfo {
  hasDate: boolean;
  hasTime: boolean;
  hasTimeZone: boolean;
  hasEra: boolean;
  hasWeek: boolean;
  tokens: DatetimePatternToken[];
}

const PATTERN_LETTERS = new Set<string>([
  'G',
  'y',
  'Y',
  'u',
  'Q',
  'q',
  'M',
  'L',
  'w',
  'W',
  'd',
  'D',
  'F',
  'g',
  'E',
  'e',
  'c',
  'a',
  'b',
  'B',
  'h',
  'H',
  'K',
  'k',
  'm',
  's',
  'S',
  'A',
  'z',
  'Z',
  'O',
  'v',
  'V',
  'X',
  'x'
]);

const DATE_LETTERS = new Set(['y', 'Y', 'u', 'M', 'L', 'd', 'D', 'F', 'g', 'E', 'e', 'c']);
const TIME_LETTERS = new Set(['h', 'H', 'K', 'k', 'm', 's', 'S', 'A', 'a', 'b', 'B']);
const TIMEZONE_LETTERS = new Set(['z', 'Z', 'O', 'v', 'V', 'X', 'x']);

/**
 * Checks if a character is a valid CLDR pattern letter.
 * @param char The character to check
 */
export function isDatetimePatternLetter(char: string): char is DatetimePatternLetter {
  return PATTERN_LETTERS.has(char);
}

/**
 * Parses a CLDR date pattern into tokens.
 * @param pattern The CLDR pattern string (e.g., 'yyyy-MM-dd HH:mm:ss')
 * @returns Array of pattern tokens
 */
export function parseDatetimePattern(pattern: string): DatetimePatternToken[] {
  const tokens: DatetimePatternToken[] = [];
  let i = 0;

  while (i < pattern.length) {
    const char = pattern[i];

    if (char === "'") {
      let literal = '';
      i++;
      while (i < pattern.length) {
        if (pattern[i] === "'") {
          if (pattern[i + 1] === "'") {
            literal += "'";
            i += 2;
          } else {
            i++;
            break;
          }
        } else {
          literal += pattern[i];
          i++;
        }
      }
      tokens.push({ letter: null, count: 0, literal: true, value: literal });
      continue;
    }

    if (isDatetimePatternLetter(char)) {
      let count = 1;
      while (i + count < pattern.length && pattern[i + count] === char) {
        count++;
      }
      tokens.push({ letter: char, count, literal: false });
      i += count;
      continue;
    }

    tokens.push({ letter: null, count: 0, literal: true, value: char });
    i++;
  }

  return tokens;
}

/**
 * Validates a CLDR date pattern.
 * @param pattern The pattern to validate
 */
export function isValidDatetimePattern(pattern: string): boolean {
  try {
    const tokens = parseDatetimePattern(pattern);

    let openQuote = false;
    for (let i = 0; i < pattern.length; i++) {
      if (pattern[i] === "'") {
        if (pattern[i + 1] === "'") {
          i++;
        } else {
          openQuote = !openQuote;
        }
      }
    }

    if (openQuote) {
      return false;
    }

    const hasH12 = tokens.some(t => t.letter === 'h' || t.letter === 'K');
    const hasH24 = tokens.some(t => t.letter === 'H' || t.letter === 'k');
    if (hasH12 && hasH24) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Gets information about a CLDR pattern.
 * @param pattern The CLDR pattern string
 */
export function getDatetimePatternInfo(pattern: string): CldrPatternInfo {
  const tokens = parseDatetimePattern(pattern);
  return {
    hasDate: tokens.some(t => t.letter && DATE_LETTERS.has(t.letter)),
    hasTime: tokens.some(t => t.letter && TIME_LETTERS.has(t.letter)),
    hasTimeZone: tokens.some(t => t.letter && TIMEZONE_LETTERS.has(t.letter)),
    hasEra: tokens.some(t => t.letter === 'G'),
    hasWeek: tokens.some(t => t.letter === 'w' || t.letter === 'W'),
    tokens
  };
}

/**
 * Escapes text for use as a literal in a CLDR pattern.
 * @param text The text to escape
 */
export function escapeDatetimeLiterals(text: string): string {
  return "'" + text.replace(/'/g, "''") + "'";
}

/**
 * Unescapes CLDR literal text.
 * @param text The escaped text
 */
export function unescapeDatetimeLiterals(text: string): string {
  if (text.startsWith("'") && text.endsWith("'")) {
    text = text.slice(1, -1);
  }
  return text.replace(/''/g, "'");
}

/**
 * Converts a CLDR pattern to Intl.DateTimeFormat options.
 * @param pattern The CLDR pattern string
 */
export function datetimePatternToIntlOptions(pattern: string): Partial<Intl.DateTimeFormatOptions> {
  const tokens = parseDatetimePattern(pattern);
  const options: Partial<Intl.DateTimeFormatOptions> = {};

  for (const token of tokens) {
    if (token.literal || !token.letter) {
      continue;
    }

    switch (token.letter) {
      case 'G':
        options.era = token.count >= 4 ? 'long' : token.count === 5 ? 'narrow' : 'short';
        break;
      case 'y':
      case 'Y':
      case 'u':
        options.year = token.count === 2 ? '2-digit' : 'numeric';
        break;
      case 'M':
      case 'L':
        if (token.count === 1) {
          options.month = 'numeric';
        } else if (token.count === 2) {
          options.month = '2-digit';
        } else if (token.count === 3) {
          options.month = 'short';
        } else if (token.count === 4) {
          options.month = 'long';
        } else if (token.count === 5) {
          options.month = 'narrow';
        }
        break;
      case 'd':
        options.day = token.count === 1 ? 'numeric' : '2-digit';
        break;
      case 'E':
      case 'e':
      case 'c':
        if (token.count <= 3) {
          options.weekday = 'short';
        } else if (token.count === 4) {
          options.weekday = 'long';
        } else if (token.count >= 5) {
          options.weekday = 'narrow';
        }
        break;
      case 'a':
      case 'b':
      case 'B':
        options.dayPeriod = token.count >= 4 ? 'long' : 'short';
        break;
      case 'h':
        options.hour = token.count === 1 ? 'numeric' : '2-digit';
        options.hour12 = true;
        break;
      case 'H':
        options.hour = token.count === 1 ? 'numeric' : '2-digit';
        options.hour12 = false;
        break;
      case 'K':
        options.hour = token.count === 1 ? 'numeric' : '2-digit';
        options.hour12 = true;
        options.hourCycle = 'h11';
        break;
      case 'k':
        options.hour = token.count === 1 ? 'numeric' : '2-digit';
        options.hour12 = false;
        options.hourCycle = 'h24';
        break;
      case 'm':
        options.minute = token.count === 1 ? 'numeric' : '2-digit';
        break;
      case 's':
        options.second = token.count === 1 ? 'numeric' : '2-digit';
        break;
      case 'S':
        options.fractionalSecondDigits = Math.min(token.count, 3) as 1 | 2 | 3;
        break;
      case 'z':
      case 'Z':
      case 'O':
      case 'v':
      case 'V':
        options.timeZoneName = token.count >= 4 ? 'long' : 'short';
        break;
    }
  }

  return options;
}

function padZero(num: number, length: number): string {
  return String(num).padStart(length, '0');
}

function getWeekOfYear(date: Date): number {
  const target = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
  }
  return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
}

function getWeekOfMonth(date: Date): number {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDayOfWeek = (firstDay.getDay() + 6) % 7;
  const dayOfMonth = date.getDate();
  return Math.ceil((dayOfMonth + firstDayOfWeek) / 7);
}

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / 86400000);
}

function getQuarter(month: number): number {
  return Math.floor(month / 3) + 1;
}

function getMillisecondsInDay(date: Date): number {
  return date.getHours() * 3600000 + date.getMinutes() * 60000 + date.getSeconds() * 1000 + date.getMilliseconds();
}

function formatCustomToken(date: Date, token: DatetimePatternToken, _options?: DatetimeFormatOptions): string {
  if (!token.letter) {
    return '';
  }

  switch (token.letter) {
    case 'Q':
    case 'q': {
      const quarter = getQuarter(date.getMonth());
      if (token.count === 1) {
        return String(quarter);
      }
      if (token.count === 2) {
        return padZero(quarter, 2);
      }
      if (token.count === 3) {
        return `Q${quarter}`;
      }
      const suffixes = ['st', 'nd', 'rd', 'th'];
      const suffix = quarter === 1 ? suffixes[0] : quarter === 2 ? suffixes[1] : quarter === 3 ? suffixes[2] : suffixes[3];
      return `${quarter}${suffix} quarter`;
    }
    case 'w': {
      const week = getWeekOfYear(date);
      return token.count === 1 ? String(week) : padZero(week, 2);
    }
    case 'W': {
      const week = getWeekOfMonth(date);
      return String(week);
    }
    case 'D': {
      const dayOfYear = getDayOfYear(date);
      return padZero(dayOfYear, token.count);
    }
    case 'F': {
      const dayOfMonth = date.getDate();
      return String(Math.ceil(dayOfMonth / 7));
    }
    case 'g': {
      const mjd = Math.floor(date.getTime() / 86400000) + 40587;
      return String(mjd);
    }
    case 'A': {
      const ms = getMillisecondsInDay(date);
      return String(ms);
    }
    case 'S': {
      const ms = date.getMilliseconds();
      const str = padZero(ms, 3);
      return str.substring(0, token.count);
    }
    case 'X':
    case 'x': {
      const offset = -date.getTimezoneOffset();
      if (offset === 0) {
        return token.letter === 'X' ? 'Z' : '+00:00';
      }
      const sign = offset >= 0 ? '+' : '-';
      const absOffset = Math.abs(offset);
      const hours = Math.floor(absOffset / 60);
      const minutes = absOffset % 60;

      if (token.count === 1) {
        return `${sign}${padZero(hours, 2)}`;
      }
      if (token.count === 2) {
        return `${sign}${padZero(hours, 2)}${padZero(minutes, 2)}`;
      }
      if (token.count === 3) {
        return `${sign}${padZero(hours, 2)}:${padZero(minutes, 2)}`;
      }
      if (token.count === 4) {
        return `${sign}${padZero(hours, 2)}${padZero(minutes, 2)}`;
      }
      if (token.count === 5) {
        return `${sign}${padZero(hours, 2)}:${padZero(minutes, 2)}`;
      }
      return `${sign}${padZero(hours, 2)}:${padZero(minutes, 2)}`;
    }
    case 'Z': {
      const offset = -date.getTimezoneOffset();
      const sign = offset >= 0 ? '+' : '-';
      const absOffset = Math.abs(offset);
      const hours = Math.floor(absOffset / 60);
      const minutes = absOffset % 60;

      if (token.count === 1 || token.count === 2) {
        return `${sign}${padZero(hours, 2)}${padZero(minutes, 2)}`;
      }
      if (token.count === 3) {
        return `${sign}${padZero(hours, 2)}:${padZero(minutes, 2)}`;
      }
      if (token.count === 4) {
        return `GMT${sign}${padZero(hours, 2)}:${padZero(minutes, 2)}`;
      }
      if (token.count === 5) {
        return `${sign}${padZero(hours, 2)}:${padZero(minutes, 2)}`;
      }
      return `${sign}${padZero(hours, 2)}${padZero(minutes, 2)}`;
    }
    case 'O': {
      const offset = -date.getTimezoneOffset();
      const sign = offset >= 0 ? '+' : '-';
      const absOffset = Math.abs(offset);
      const hours = Math.floor(absOffset / 60);
      const minutes = absOffset % 60;

      if (token.count === 1) {
        return `GMT${sign}${hours}`;
      }
      return `GMT${sign}${padZero(hours, 2)}:${padZero(minutes, 2)}`;
    }
    default:
      return '';
  }
}

function needsCustomFormatter(token: DatetimePatternToken): boolean {
  if (token.literal || !token.letter) {
    return false;
  }
  return ['Q', 'q', 'w', 'W', 'D', 'F', 'g', 'A', 'X', 'x', 'Z', 'O'].includes(token.letter);
}

/**
 * Formats a Date object using a CLDR pattern.
 * @param date The date to format
 * @param pattern The CLDR pattern string (e.g., 'yyyy-MM-dd HH:mm:ss')
 * @param options Optional formatting options
 * @returns The formatted date string
 */
export function formatDate(date: Date, pattern: string, options?: DatetimeFormatOptions): string {
  if (!isValidDate(date)) {
    throw new Error('Invalid date provided');
  }

  if (!isValidDatetimePattern(pattern)) {
    throw new Error('Invalid CLDR pattern');
  }

  const tokens = parseDatetimePattern(pattern);
  const locale = options?.locale ?? (typeof navigator !== 'undefined' ? navigator.language : 'en-US');

  const intlOptions: Partial<Intl.DateTimeFormatOptions> = {
    ...datetimePatternToIntlOptions(pattern),
    timeZone: options?.timeZone,
    calendar: options?.calendar,
    numberingSystem: options?.numberingSystem
  };

  const formatter = new Intl.DateTimeFormat(locale, intlOptions);
  const parts = formatter.formatToParts(date);
  const partsMap = new Map<string, string>();
  parts.forEach(part => {
    if (part.type !== 'literal') {
      partsMap.set(part.type, part.value);
    }
  });

  let result = '';

  for (const token of tokens) {
    if (token.literal) {
      result += token.value ?? '';
      continue;
    }

    if (!token.letter) {
      continue;
    }

    if (needsCustomFormatter(token)) {
      result += formatCustomToken(date, token, options);
      continue;
    }

    let value = '';
    switch (token.letter) {
      case 'G':
        value = partsMap.get('era') ?? '';
        break;
      case 'y':
      case 'Y':
      case 'u':
        value = partsMap.get('year') ?? '';
        break;
      case 'M':
      case 'L':
        value = partsMap.get('month') ?? '';
        break;
      case 'd':
        value = partsMap.get('day') ?? '';
        break;
      case 'E':
      case 'e':
      case 'c':
        value = partsMap.get('weekday') ?? '';
        break;
      case 'a':
      case 'b':
      case 'B':
        value = partsMap.get('dayPeriod') ?? '';
        break;
      case 'h':
      case 'H':
      case 'K':
      case 'k':
        value = partsMap.get('hour') ?? '';
        break;
      case 'm':
        value = partsMap.get('minute') ?? '';
        break;
      case 's':
        value = partsMap.get('second') ?? '';
        break;
      case 'S':
        value = partsMap.get('fractionalSecond') ?? '';
        break;
      case 'z':
      case 'Z':
      case 'O':
      case 'v':
      case 'V':
        value = partsMap.get('timeZoneName') ?? '';
        break;
    }

    result += value;
  }

  return result;
}

function getMonthNamesForLocale(locale: string): { long: string[]; short: string[]; narrow: string[] } {
  const long: string[] = [];
  const short: string[] = [];
  const narrow: string[] = [];

  for (let i = 0; i < 12; i++) {
    const date = new Date(2024, i, 1);
    long.push(new Intl.DateTimeFormat(locale, { month: 'long' }).format(date));
    short.push(new Intl.DateTimeFormat(locale, { month: 'short' }).format(date));
    narrow.push(new Intl.DateTimeFormat(locale, { month: 'narrow' }).format(date));
  }

  return { long, short, narrow };
}

function buildRegexFromPattern(pattern: string, _locale: string): RegExp {
  const tokens = parseDatetimePattern(pattern);
  let regexStr = '^';

  for (const token of tokens) {
    if (token.literal) {
      regexStr += (token.value ?? '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      continue;
    }

    if (!token.letter) {
      continue;
    }

    switch (token.letter) {
      case 'y':
      case 'Y':
      case 'u':
        regexStr += token.count === 2 ? '(\\d{2})' : '(\\d{4})';
        break;
      case 'M':
      case 'L':
        if (token.count <= 2) {
          regexStr += token.count === 2 ? '(\\d{2})' : '(\\d{1,2})';
        } else {
          regexStr += '([A-Za-z]+)';
        }
        break;
      case 'd':
        regexStr += token.count === 2 ? '(\\d{2})' : '(\\d{1,2})';
        break;
      case 'H':
      case 'h':
      case 'K':
      case 'k':
        regexStr += token.count === 2 ? '(\\d{2})' : '(\\d{1,2})';
        break;
      case 'm':
        regexStr += token.count === 2 ? '(\\d{2})' : '(\\d{1,2})';
        break;
      case 's':
        regexStr += token.count === 2 ? '(\\d{2})' : '(\\d{1,2})';
        break;
      case 'S':
        regexStr += `(\\d{${token.count}})`;
        break;
      case 'a':
      case 'b':
      case 'B':
        regexStr += '([AaPp][Mm])';
        break;
      case 'E':
      case 'e':
      case 'c':
        regexStr += '([A-Za-z]+)';
        break;
      default:
        regexStr += '(.*)';
    }
  }

  regexStr += '$';
  return new RegExp(regexStr, 'i');
}

/**
 * Parses a date string using a CLDR pattern.
 * @param dateString The date string to parse
 * @param pattern The CLDR pattern string
 * @param options Optional parsing options
 * @returns The parsed Date object or null if parsing fails
 */
export function parseDate(dateString: string, pattern: string, options?: DatetimeParseOptions): Date | null {
  const locale = options?.locale ?? (typeof navigator !== 'undefined' ? navigator.language : 'en-US');
  const tokens = parseDatetimePattern(pattern);
  const regex = buildRegexFromPattern(pattern, locale);
  const match = dateString.match(regex);

  if (!match) {
    return null;
  }

  const monthNames = getMonthNamesForLocale(locale);
  let year: number | undefined;
  let month: number | undefined;
  let day: number | undefined;
  let hour: number | undefined;
  let minute: number | undefined;
  let second: number | undefined;
  let millisecond: number | undefined;
  let isPM = false;
  let is12Hour = false;

  let matchIndex = 1;

  for (const token of tokens) {
    if (token.literal || !token.letter) {
      continue;
    }

    const value = match[matchIndex++];
    if (!value) {
      continue;
    }

    switch (token.letter) {
      case 'y':
      case 'Y':
      case 'u': {
        const y = parseInt(value, 10);
        if (token.count === 2 && y < 100) {
          const currentYear = new Date().getFullYear();
          const century = Math.floor(currentYear / 100) * 100;
          year = century + y;
          if (year > currentYear + 10) {
            year -= 100;
          }
        } else {
          year = y;
        }
        break;
      }
      case 'M':
      case 'L':
        if (token.count <= 2) {
          month = parseInt(value, 10) - 1;
        } else {
          const monthIndex =
            monthNames.long.findIndex(m => m.toLowerCase() === value.toLowerCase()) ??
            monthNames.short.findIndex(m => m.toLowerCase() === value.toLowerCase()) ??
            monthNames.narrow.findIndex(m => m.toLowerCase() === value.toLowerCase());
          if (monthIndex !== -1) {
            month = monthIndex;
          }
        }
        break;
      case 'd':
        day = parseInt(value, 10);
        break;
      case 'h':
      case 'K':
        is12Hour = true;
        hour = parseInt(value, 10);
        if (token.letter === 'h' && hour === 12) {
          hour = 0;
        }
        break;
      case 'H':
        hour = parseInt(value, 10);
        break;
      case 'k':
        hour = parseInt(value, 10) - 1;
        break;
      case 'm':
        minute = parseInt(value, 10);
        break;
      case 's':
        second = parseInt(value, 10);
        break;
      case 'S':
        millisecond = parseInt(value.padEnd(3, '0').substring(0, 3), 10);
        break;
      case 'a':
      case 'b':
      case 'B':
        isPM = value.toLowerCase().startsWith('p');
        break;
    }
  }

  if (is12Hour && isPM && hour !== undefined) {
    hour += 12;
  }

  if (year === undefined || month === undefined || day === undefined) {
    if (options?.strict) {
      return null;
    }
    const now = new Date();
    year = year ?? now.getFullYear();
    month = month ?? now.getMonth();
    day = day ?? now.getDate();
  }

  const result = new Date(year, month, day, hour ?? 0, minute ?? 0, second ?? 0, millisecond ?? 0);

  if (!isValidDate(result)) {
    return null;
  }

  return result;
}

/**
 * Gets a standard CLDR pattern for a given locale and style.
 * @param locale The BCP 47 locale identifier
 * @param style The date/time style
 * @param type The type of pattern to get
 */
export function getDatetimePatternForLocale(locale: string, style: 'short' | 'medium' | 'long' | 'full', type: 'date' | 'time' | 'datetime'): string {
  const dateStyles: Record<typeof style, Intl.DateTimeFormatOptions['dateStyle']> = {
    short: 'short',
    medium: 'medium',
    long: 'long',
    full: 'full'
  };

  const timeStyles: Record<typeof style, Intl.DateTimeFormatOptions['timeStyle']> = {
    short: 'short',
    medium: 'medium',
    long: 'long',
    full: 'full'
  };

  const options: Intl.DateTimeFormatOptions = {};
  if (type === 'date' || type === 'datetime') {
    options.dateStyle = dateStyles[style];
  }
  if (type === 'time' || type === 'datetime') {
    options.timeStyle = timeStyles[style];
  }

  const formatter = new Intl.DateTimeFormat(locale, options);
  const date = new Date(2024, 0, 15, 14, 30, 45);
  const formatted = formatter.format(date);

  return formatted;
}
