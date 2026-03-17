import { isValidDate } from '@tylertech/forge-core';

export type SupportedDateFormats =
  | 'MM/DD/YYYY'
  | 'MM/DD/YY'
  | 'DD/MMM/YYYY'
  | 'MM-DD-YYYY'
  | 'MM-DD-YY'
  | 'DD-MMM-YYYY'
  | 'YYYY-MM-DD'
  | 'YYYY-MMM-DD'
  | 'DD.MM.YYYY'
  | 'DD.MM.YY';
export const ISO_8601_REGEX =
  /^([+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([.,]\d+(?!:))?)?(\17[0-5]\d([.,]\d+)?)?([zZ]|([+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
export const ISO_TIMEZONE_REGEX = /a-z/i;
const FUTURE_YEAR_COERCION = 10; // The number of years in the future to coerce two-digit years into current century

const MONTH_ABBREVIATIONS = {
  JAN: 1,
  FEB: 2,
  MAR: 3,
  APR: 4,
  MAY: 5,
  JUN: 6,
  JUL: 7,
  AUG: 8,
  SEP: 9,
  OCT: 10,
  NOV: 11,
  DEC: 12
} as const;

const MONTH_NAMES = {
  1: 'JAN',
  2: 'FEB',
  3: 'MAR',
  4: 'APR',
  5: 'MAY',
  6: 'JUN',
  7: 'JUL',
  8: 'AUG',
  9: 'SEP',
  10: 'OCT',
  11: 'NOV',
  12: 'DEC'
} as const;

// Date format patterns and their parsers
interface DatePattern {
  regex: RegExp;
  parser: (parts: string[]) => Date | null;
}

const DATE_PATTERNS: DatePattern[] = [
  // YYYY-MM-DD (ISO-like numeric)
  {
    regex: /^(\d{4})-(\d{1,2})-(\d{1,2})$/,
    parser: ([year, month, day]) => parseNumericDate(year, month, day, 'YMD')
  },
  // YYYY-MMM-DD
  {
    regex: /^(\d{4})-([A-Za-z]{3})-(\d{1,2})$/,
    parser: ([year, monthAbbr, day]) => parseWithMonthAbbr(year, monthAbbr, day, 'YMD')
  },
  // MM/DD/YYYY or MM/DD/YY
  {
    regex: /^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/,
    parser: ([month, day, year]) => parseNumericDate(month, day, year, 'MDY')
  },
  // MM-DD-YYYY or MM-DD-YY
  {
    regex: /^(\d{1,2})-(\d{1,2})-(\d{2,4})$/,
    parser: ([month, day, year]) => parseNumericDate(month, day, year, 'MDY')
  },
  // DD/MMM/YYYY
  {
    regex: /^(\d{1,2})\/([A-Za-z]{3})\/(\d{2,4})$/,
    parser: ([day, monthAbbr, year]) => parseWithMonthAbbr(day, monthAbbr, year, 'DMY')
  },
  // DD-MMM-YYYY
  {
    regex: /^(\d{1,2})-([A-Za-z]{3})-(\d{2,4})$/,
    parser: ([day, monthAbbr, year]) => parseWithMonthAbbr(day, monthAbbr, year, 'DMY')
  },
  // Numeric without separators (MMDDYYYY or MMDDYY)
  {
    regex: /^(\d{2})(\d{2})(\d{2,4})$/,
    parser: ([month, day, year]) => parseNumericDate(month, day, year, 'MDY')
  },
  // DD.MM.YYYY or DD.MM.YY
  {
    regex: /^(\d{1,2})\.(\d{1,2})\.(\d{2,4})$/,
    parser: ([day, month, year]) => parseNumericDate(day, month, year, 'DMY')
  }
];

// Format configurations
interface FormatConfig {
  pattern: string;
  formatter: (date: Date) => string;
}

const FORMAT_CONFIGS: Record<SupportedDateFormats, FormatConfig> = {
  'MM/DD/YYYY': {
    pattern: 'MM/DD/YYYY',
    formatter: date => `${pad(date.getMonth() + 1)}/${pad(date.getDate())}/${date.getFullYear()}`
  },
  'MM/DD/YY': {
    pattern: 'MM/DD/YY',
    formatter: date => `${pad(date.getMonth() + 1)}/${pad(date.getDate())}/${String(date.getFullYear()).slice(-2)}`
  },
  'DD/MMM/YYYY': {
    pattern: 'DD/MMM/YYYY',
    formatter: date => `${pad(date.getDate())}/${MONTH_NAMES[(date.getMonth() + 1) as keyof typeof MONTH_NAMES]}/${date.getFullYear()}`
  },
  'MM-DD-YYYY': {
    pattern: 'MM-DD-YYYY',
    formatter: date => `${pad(date.getMonth() + 1)}-${pad(date.getDate())}-${date.getFullYear()}`
  },
  'MM-DD-YY': {
    pattern: 'MM-DD-YY',
    formatter: date => `${pad(date.getMonth() + 1)}-${pad(date.getDate())}-${String(date.getFullYear()).slice(-2)}`
  },
  'DD-MMM-YYYY': {
    pattern: 'DD-MMM-YYYY',
    formatter: date => `${pad(date.getDate())}-${MONTH_NAMES[(date.getMonth() + 1) as keyof typeof MONTH_NAMES]}-${date.getFullYear()}`
  },
  'YYYY-MM-DD': {
    pattern: 'YYYY-MM-DD',
    formatter: date => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
  },
  'YYYY-MMM-DD': {
    pattern: 'YYYY-MMM-DD',
    formatter: date => `${date.getFullYear()}-${MONTH_NAMES[(date.getMonth() + 1) as keyof typeof MONTH_NAMES]}-${pad(date.getDate())}`
  },
  'DD.MM.YYYY': {
    pattern: 'DD.MM.YYYY',
    formatter: date => `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`
  },
  'DD.MM.YY': {
    pattern: 'DD.MM.YY',
    formatter: date => `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${String(date.getFullYear()).slice(-2)}`
  }
};

function pad(num: number): string {
  return String(num).padStart(2, '0');
}

function normalizeYear(year: string): number {
  if (year.length === 3) {
    year = year.padStart(4, '0');
  }

  if (year.length === 2) {
    const currentYear = new Date().getFullYear();
    const minYear = currentYear - (100 - FUTURE_YEAR_COERCION);
    const maxYear = currentYear + FUTURE_YEAR_COERCION;
    const minCentury = String(minYear).slice(0, 2);
    const maxCentury = String(maxYear).slice(0, 2);
    const maxYearLastTwo = +String(maxYear).slice(2);

    return +year <= maxYearLastTwo ? +`${maxCentury}${year}` : +`${minCentury}${year}`;
  }

  return +year;
}

function validateAndClampDate(month: number, day: number, year: number): { month: number; day: number; year: number } {
  const clampedMonth = Math.min(Math.max(month, 1), 12);
  const maxDaysInMonth = new Date(year, clampedMonth, 0).getDate();
  const clampedDay = Math.min(Math.max(day, 1), maxDaysInMonth);

  return { month: clampedMonth, day: clampedDay, year };
}

function parseMonthAbbreviation(abbr: string): number | null {
  const upperAbbr = abbr.toUpperCase() as keyof typeof MONTH_ABBREVIATIONS;
  return MONTH_ABBREVIATIONS[upperAbbr] || null;
}

function parseNumericDate(part1: string, part2: string, part3: string, order: 'MDY' | 'YMD' | 'DMY'): Date | null {
  let monthStr: string;
  let dayStr: string;
  let yearStr: string;

  if (order === 'MDY') {
    [monthStr, dayStr, yearStr] = [part1, part2, part3];
  } else if (order === 'YMD') {
    [yearStr, monthStr, dayStr] = [part1, part2, part3];
  } else {
    // DMY
    [dayStr, monthStr, yearStr] = [part1, part2, part3];
  }

  // Handle edge cases for incomplete input
  if (monthStr === '0') {
    monthStr = '1';
  }
  if (dayStr === '0') {
    dayStr = '1';
  }

  const year = normalizeYear(yearStr);
  const month = +monthStr;
  const day = +dayStr;

  const { month: validMonth, day: validDay, year: validYear } = validateAndClampDate(month, day, year);

  const date = new Date(validYear, validMonth - 1, validDay, 0, 0, 0, 0);
  return isValidDate(date) ? date : null;
}

function parseWithMonthAbbr(part1: string, monthAbbr: string, part3: string, order: 'DMY' | 'YMD'): Date | null {
  const monthNum = parseMonthAbbreviation(monthAbbr);
  if (!monthNum) {
    return null;
  }

  let dayStr: string;
  let yearStr: string;

  if (order === 'DMY') {
    [dayStr, yearStr] = [part1, part3];
  } else {
    [yearStr, dayStr] = [part1, part3];
  }

  const year = normalizeYear(yearStr);
  const day = +dayStr;

  const { day: validDay, year: validYear } = validateAndClampDate(monthNum, day, year);

  const date = new Date(validYear, monthNum - 1, validDay, 0, 0, 0, 0);
  return isValidDate(date) ? date : null;
}

function parseISO8601(value: string): Date | null {
  if (!ISO_8601_REGEX.test(value)) {
    return null;
  }

  const date = new Date(value);

  // Handle timezone offset for ISO strings without explicit timezone
  if (!ISO_TIMEZONE_REGEX.test(value)) {
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  }

  return isValidDate(date) ? date : null;
}

/**
 * Parses a date string value to a `Date` object in local time.
 * Supports multiple formats as defined in SupportedDateFormats.
 *
 * @param value The date string value to parse
 * @param format Optional format hint for better parsing accuracy
 * @returns Parsed Date object or null if parsing fails
 */
export function parseDateString(value: string, format?: SupportedDateFormats): Date | null {
  const cleanValue = value.replace(/[_\s]/g, '');

  // Try ISO 8601 first
  const isoDate = parseISO8601(cleanValue);
  if (isoDate) {
    return isoDate;
  }

  // Try each pattern until one matches
  for (const pattern of DATE_PATTERNS) {
    const match = cleanValue.match(pattern.regex);
    if (match) {
      const result = pattern.parser(match.slice(1));
      if (result) {
        return result;
      }
    }
  }

  return null;
}

/**
 * Formats a Date object to a specified string format.
 *
 * @param date The Date object to format
 * @param format The desired output format (defaults to 'MM/DD/YYYY')
 * @returns Formatted date string
 * @throws Error if date is invalid or format is unsupported
 */
export function formatDate(date: Date, format: SupportedDateFormats = 'MM/DD/YYYY'): string {
  if (!isValidDate(date)) {
    throw new Error('Invalid date provided');
  }

  const config = FORMAT_CONFIGS[format];
  if (!config) {
    throw new Error(`Unsupported format: ${format}`);
  }

  return config.formatter(date);
}

/**
 * Determines if two date objects are equal.
 *
 * Note: Time values are ignored.
 * @param first The date to compare.
 * @param second The date to compare the first date to.
 * @returns A boolean whether the two dates are equivalent.
 */
export function isSameDate(first?: Date | null, second?: Date | null): boolean {
  if (!first && !second) {
    return true;
  } else if (!first || !second) {
    return false;
  } else if (!isValidDate(first) || !isValidDate(second)) {
    return false;
  }
  return new Date(first).setHours(0, 0, 0, 0) === new Date(second).setHours(0, 0, 0, 0);
}

/**
 * Returns the last date on a month.
 *
 * @param month The month.
 * @param year The year of the month, needed for February otherwise optional.
 * @returns The last date of the given month.
 */
export function getLastDateOfMonth(month: number, year?: number): Date {
  return new Date(year ?? 1970, month + 1, 0);
}

/**
 * Returns the number of days in a month.
 *
 * @param month The month to find the length of.
 * @param year The year to check within, needed for February otherwise optional.
 * @returns The number of days in the month.
 */
export function getMonthLength(month: number, year?: number): number {
  return getLastDateOfMonth(month, year).getDate();
}
