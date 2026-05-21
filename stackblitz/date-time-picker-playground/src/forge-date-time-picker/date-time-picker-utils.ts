import type { DateTimePickerValue, IDateTimePickerRange, ITimeSlot, TimeMode } from './date-time-picker-constants.js';

const SLOT_REFERENCE_YEAR = 2000;
const SLOT_REFERENCE_MONTH = 0;
const SLOT_REFERENCE_DAY = 1;
const TIME_PATTERN_BASIC = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/;
const TIME_PATTERN_AMPM = /^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*([AaPp][Mm])$/;

export interface IParsedTime {
  hours: number;
  minutes: number;
  seconds: number;
}

/** Parses a time string in 24-hour `HH:mm[:ss]` or 12-hour `h:mm[:ss] am/pm` form. */
export function parseTimeString(input: string | null | undefined): IParsedTime | null {
  if (!input) {
    return null;
  }
  const trimmed = input.trim();
  if (!trimmed) {
    return null;
  }

  const ampmMatch = trimmed.match(TIME_PATTERN_AMPM);
  if (ampmMatch) {
    const meridiem = ampmMatch[4].toLowerCase();
    let ampmHours = Number(ampmMatch[1]);
    const ampmMinutes = Number(ampmMatch[2]);
    const ampmSeconds = ampmMatch[3] ? Number(ampmMatch[3]) : 0;
    if (ampmHours < 1 || ampmHours > 12 || ampmMinutes > 59 || ampmSeconds > 59) {
      return null;
    }
    if (meridiem === 'am') {
      ampmHours = ampmHours === 12 ? 0 : ampmHours;
    } else {
      ampmHours = ampmHours === 12 ? 12 : ampmHours + 12;
    }
    return { hours: ampmHours, minutes: ampmMinutes, seconds: ampmSeconds };
  }

  const basic = trimmed.match(TIME_PATTERN_BASIC);
  if (!basic) {
    return null;
  }
  const basicHours = Number(basic[1]);
  const basicMinutes = Number(basic[2]);
  const basicSeconds = basic[3] ? Number(basic[3]) : 0;
  if (basicHours > 23 || basicMinutes > 59 || basicSeconds > 59) {
    return null;
  }
  return { hours: basicHours, minutes: basicMinutes, seconds: basicSeconds };
}

/** Formats a parsed time into a canonical `HH:mm` or `HH:mm:ss` string. */
export function formatCanonicalTime(time: IParsedTime, allowSeconds: boolean): string {
  const hh = String(time.hours).padStart(2, '0');
  const mm = String(time.minutes).padStart(2, '0');
  if (allowSeconds) {
    const ss = String(time.seconds).padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
  }
  return `${hh}:${mm}`;
}

/** Compares two parsed times in absolute order (HH:mm:ss). */
export function compareTimes(a: IParsedTime, b: IParsedTime): number {
  const aTotal = a.hours * 3600 + a.minutes * 60 + a.seconds;
  const bTotal = b.hours * 3600 + b.minutes * 60 + b.seconds;
  return aTotal - bTotal;
}

/**
 * Generates slot times between `min` and `max` (inclusive) stepping every `step` minutes.
 * Times are produced as canonical strings; labels are generated at render time so they
 * honor locale/use24/allowSeconds.
 */
export function buildSlotsFromRange(min: string, max: string, stepMinutes: number, allowSeconds: boolean): ITimeSlot[] {
  const parsedMin = parseTimeString(min);
  const parsedMax = parseTimeString(max);
  const step = Math.max(1, Math.floor(stepMinutes));
  if (!parsedMin || !parsedMax) {
    return [];
  }
  if (compareTimes(parsedMin, parsedMax) > 0) {
    return [];
  }
  const result: ITimeSlot[] = [];
  let total = parsedMin.hours * 60 + parsedMin.minutes;
  const end = parsedMax.hours * 60 + parsedMax.minutes;
  while (total <= end) {
    const hours = Math.floor(total / 60);
    const minutes = total % 60;
    result.push({
      value: formatCanonicalTime({ hours, minutes, seconds: 0 }, allowSeconds)
    });
    total += step;
  }
  return result;
}

/**
 * Builds a Date object for slot label formatting using a fixed reference date so
 * `Intl.DateTimeFormat` output never drifts across DST boundaries.
 */
function timeToReferenceDate(time: IParsedTime): Date {
  return new Date(SLOT_REFERENCE_YEAR, SLOT_REFERENCE_MONTH, SLOT_REFERENCE_DAY, time.hours, time.minutes, time.seconds);
}

/**
 * Formats a canonical time string for display, honoring locale + 12/24h + seconds.
 * Pass a pre-built `formatter` to avoid the per-call `Intl.DateTimeFormat` allocation
 * when rendering many slots.
 */
export function formatSlotLabel(
  value: string,
  locale: string | undefined,
  use24HourTime: boolean,
  allowSeconds: boolean,
  formatter?: Intl.DateTimeFormat
): string {
  const parsed = parseTimeString(value);
  if (!parsed) {
    return value;
  }
  const ref = timeToReferenceDate(parsed);
  if (formatter) {
    return formatter.format(ref);
  }
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: !use24HourTime,
    hourCycle: use24HourTime ? 'h23' : 'h12'
  };
  if (allowSeconds) {
    options.second = '2-digit';
  }
  return new Intl.DateTimeFormat(locale, options).format(ref);
}

/** Merges a calendar Date with a canonical time string into a single Date. */
export function mergeDateAndTime(date: Date | null, time: string | null): Date | null {
  if (!date) {
    return null;
  }
  const parsed = parseTimeString(time);
  if (!parsed) {
    return null;
  }
  const merged = new Date(date);
  merged.setHours(parsed.hours, parsed.minutes, parsed.seconds, 0);
  return merged;
}

/** Extracts a canonical time string from a Date. */
export function timeFromDate(date: Date | null | undefined, allowSeconds: boolean): string | null {
  if (!date) {
    return null;
  }
  return formatCanonicalTime(
    {
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds()
    },
    allowSeconds
  );
}

/** Extracts the calendar-only Date part (midnight) from a Date. */
export function dateOnly(date: Date | null | undefined): Date | null {
  if (!date) {
    return null;
  }
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function isRange(value: unknown): value is IDateTimePickerRange {
  return (
    !!value &&
    typeof value === 'object' &&
    value !== null &&
    'from' in value &&
    'to' in value &&
    (value as IDateTimePickerRange).from instanceof Date &&
    (value as IDateTimePickerRange).to instanceof Date
  );
}

/**
 * Coerces any accepted `value` input into the normalized internal shape.
 * Accepts `Date`, ISO strings, `{ from, to }` ranges, or `null`.
 */
export function coerceValue(input: unknown, timeMode: TimeMode, allowSeconds: boolean): DateTimePickerValue {
  if (input == null || input === '') {
    return null;
  }

  if (timeMode === 'range') {
    if (typeof input === 'string') {
      const parts = input.split('|');
      if (parts.length === 2) {
        const from = parseMaybeDate(parts[0]);
        const to = parseMaybeDate(parts[1]);
        if (from && to) {
          return { from, to };
        }
      }
      return null;
    }
    if (typeof input === 'object' && input !== null) {
      const candidate = input as Partial<IDateTimePickerRange>;
      const from = parseMaybeDate(candidate.from);
      const to = parseMaybeDate(candidate.to);
      if (from && to) {
        return { from, to };
      }
    }
    return null;
  }

  const date = parseMaybeDate(input);
  if (date) {
    if (!allowSeconds) {
      date.setSeconds(0, 0);
    } else {
      date.setMilliseconds(0);
    }
    return date;
  }
  return null;
}

function parseMaybeDate(input: unknown): Date | null {
  if (input instanceof Date) {
    return Number.isNaN(input.getTime()) ? null : new Date(input);
  }
  if (typeof input === 'string') {
    const trimmed = input.trim();
    if (!trimmed) {
      return null;
    }
    const date = new Date(trimmed);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  if (typeof input === 'number') {
    const date = new Date(input);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  return null;
}

/** Builds the formatted announcement string for the live region. */
export function buildAnnouncement(value: DateTimePickerValue, locale: string | undefined, use24HourTime: boolean, allowSeconds: boolean): string {
  if (value == null) {
    return 'Date and time cleared.';
  }
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: !use24HourTime,
    hourCycle: use24HourTime ? 'h23' : 'h12'
  };
  if (allowSeconds) {
    timeOptions.second = '2-digit';
  }
  if (isRange(value)) {
    const rangeDateLabel = new Intl.DateTimeFormat(locale, dateOptions).format(value.from);
    const fromLabel = new Intl.DateTimeFormat(locale, timeOptions).format(value.from);
    const toLabel = new Intl.DateTimeFormat(locale, timeOptions).format(value.to);
    return `Selected ${rangeDateLabel} from ${fromLabel} to ${toLabel}.`;
  }
  const dateLabel = new Intl.DateTimeFormat(locale, dateOptions).format(value);
  const timeLabel = new Intl.DateTimeFormat(locale, timeOptions).format(value);
  return `Selected ${dateLabel} at ${timeLabel}.`;
}
