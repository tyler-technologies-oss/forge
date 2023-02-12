import { isValidDate } from '@tylertech/forge-core';

export const ISO_8601_REGEX = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
export const ISO_TIMEZONE_REGEX = /a-z/i;
const FUTURE_YEAR_COERCION = 10; // The number of years in the future to coerce two-digit years into current century

/**
 * Parses a date string value to a `Date` object in local time.
 * @param str The date string value.
 */
export function parseDateString(value: string): Date | null {
  value = value.replace(/_|\s/g, ''); // Remove potential extraneous characters

  // We first check if this is a valid date in ISO 8601 format and return it if so
  if (ISO_8601_REGEX.test(value)) {
    const iso8601Date = new Date(value);

    // This is an ISO string, but does it have a timezone? If not, we add current timezone offset
    if (!ISO_TIMEZONE_REGEX.test(value)) {
      iso8601Date.setMinutes(iso8601Date.getMinutes() + iso8601Date.getTimezoneOffset());
    }

    if (isValidDate(iso8601Date)) {
      return iso8601Date;
    }
  }

  let values: string[] = [];

  // We accept dates with a "/" or "-" separator and in the format of MM/DD/YYYY
  if (value.indexOf('/') !== -1) {
    values = value.split('/');
  } else if (value.indexOf('-') !== -1) {
    values = value.split('-');
  } else if ((value.length === 6 || value.length === 8) && !isNaN(+value)) {
    values = [value.substring(0, 2), value.substring(2, 4), value.substring(4)];
  }

  const hasMonthDayYear = values.length === 3;
  let [month, day, year] = values;

  // Ensure are month and year values are coerced from 0 to 1 in case of incomplete entry
  if (month === '0') {
    month = '1';
  }
  if (day === '0') {
    day = '1';
  }

  // Trap for the case where a 4 digit year is entered with a leading 0 
  if (typeof year === 'string' && year.length === 4) {
    year = year.replace(/^0+/, '');
  }

  // Trap for the case where only 3 digit years are entered
  if (typeof year === 'string' && year.length === 3) {
    year = year.padEnd(4, '0');
  }
  
  if (hasMonthDayYear) {
    const isValidMonthLength = month.length === 1 || month.length === 2;
    const isValidDayLength = day.length === 1 || day.length === 2;
    const isValidYearLength = year.length === 2 || year.length === 4;

    if (!isValidMonthLength || !isValidDayLength || !isValidYearLength) {
      return null;
    }
  } else {
    return null;
  }

  // Check if we need to coerce two-digit years to the four-digit equivalent
  if (year.length === 2) {
    const minYear = new Date().getFullYear() - (100 - FUTURE_YEAR_COERCION);
    const maxYear = new Date().getFullYear() + FUTURE_YEAR_COERCION;
    const minYearCentury = String(minYear).slice(0, 2);
    const maxYearCentury = String(maxYear).slice(0, 2);
    const normalizedMaxYear = +String(maxYear).slice(2);
    year = +year <= normalizedMaxYear ? `${maxYearCentury}${year}` : `${minYearCentury}${year}`;
  }

  let numMonth = +month;
  let numDay = +day;
  const numYear = +year;

  if (numMonth > 12) {
    numMonth = 12;
  }

  const maxDaysInMonth = new Date(numYear, numMonth, 0).getDate();

  if (numDay > maxDaysInMonth) {
    numDay = maxDaysInMonth;
  }

  const parsedDate = new Date(numYear, numMonth - 1, numDay, 0, 0, 0, 0);
  return isValidDate(parsedDate) ? parsedDate : null;
}

/**
 * Formats a `Date` to a specified format.
 * @param str The date string value.
 */
export function formatDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return [month, day, year].join('/');
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
  return first.setHours(0, 0, 0, 0) === second.setHours(0, 0, 0, 0);
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
