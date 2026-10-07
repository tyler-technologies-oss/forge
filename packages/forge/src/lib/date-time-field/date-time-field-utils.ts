import { parseTimeString } from '../date-time-picker/date-time-picker-utils.js';
import { parseDateString } from '../core/utils/date-utils.js';
import { tryCoerceTimeString } from '../core/utils/time-utils.js';

const pad = (n: number): string => String(n).padStart(2, '0');

/** What an endpoint input captures: a date and time, only a date, or only a time. */
export type DateTimeFieldEndpointKind = 'datetime' | 'date' | 'time';

/** The format hint (and intrinsic width) for an endpoint input of the given kind. */
export function endpointFormatHint(kind: DateTimeFieldEndpointKind, use24HourTime: boolean, allowSeconds: boolean): string {
  const time = use24HourTime ? (allowSeconds ? 'HH:mm:ss' : 'HH:mm') : allowSeconds ? 'hh:mm:ss aa' : 'hh:mm aa';
  if (kind === 'date') {
    return 'MM/DD/YYYY';
  }
  return kind === 'time' ? time : `MM/DD/YYYY ${time}`;
}
const DATE_INPUT_PATTERN = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;

export interface IParsedDateInput {
  year: number;
  month: number;
  day: number;
}

/** Parses a masked `MM/DD/YYYY` date-input string into its parts, rejecting impossible dates. */
export function parseDateInput(input: string | null | undefined): IParsedDateInput | null {
  if (!input) {
    return null;
  }
  const match = input.trim().match(DATE_INPUT_PATTERN);
  if (!match) {
    return null;
  }
  const month = Number(match[1]);
  const day = Number(match[2]);
  const year = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return null;
  }
  const probe = new Date(year, month - 1, day);
  if (probe.getFullYear() !== year || probe.getMonth() !== month - 1 || probe.getDate() !== day) {
    return null;
  }
  return { year, month, day };
}

/** Combines a typed date-input string with a typed time-input string into a local `Date`. */
export function parseTypedValue(dateInput: string | null | undefined, timeInput: string | null | undefined, allowSeconds: boolean): Date | null {
  const date = parseDateInput(dateInput);
  const time = parseTimeString(timeInput);
  if (!date || !time) {
    return null;
  }
  return new Date(date.year, date.month - 1, date.day, time.hours, time.minutes, allowSeconds ? time.seconds : 0);
}

/** Coerces loose date text (`1/2/25`) to `MM/DD/YYYY`; null when nothing parseable was typed. */
export function coerceDateInput(input: string | null | undefined): string | null {
  if (!input?.trim()) {
    return null;
  }
  const date = parseDateString(input);
  return date ? formatDateInput(date) : null;
}

/** Coerces loose time text (`130`, `5p`) to the canonical time string; null when nothing parseable was typed. */
export function coerceTimeInput(input: string | null | undefined, use24HourTime: boolean, allowSeconds: boolean): string | null {
  if (!input?.trim()) {
    return null;
  }
  const parsed = parseTimeString(tryCoerceTimeString(input, use24HourTime, allowSeconds));
  if (!parsed) {
    return null;
  }
  return formatTimeInput(new Date(2000, 0, 1, parsed.hours, parsed.minutes, parsed.seconds), use24HourTime, allowSeconds);
}

/** Formats a `Date` for the masked date input (`MM/DD/YYYY`). */
export function formatDateInput(date: Date): string {
  return `${pad(date.getMonth() + 1)}/${pad(date.getDate())}/${date.getFullYear()}`;
}

/** Formats a `Date` for the masked time input (`HH:mm[:ss]` 24h, or `hh:mm[:ss] AM/PM` 12h). */
export function formatTimeInput(date: Date, use24HourTime: boolean, allowSeconds: boolean): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  if (use24HourTime) {
    return allowSeconds ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}` : `${pad(hours)}:${pad(minutes)}`;
  }
  const meridiem = hours < 12 ? 'AM' : 'PM';
  const twelve = hours % 12 === 0 ? 12 : hours % 12;
  const base = `${pad(twelve)}:${pad(minutes)}`;
  return allowSeconds ? `${base}:${pad(seconds)} ${meridiem}` : `${base} ${meridiem}`;
}
