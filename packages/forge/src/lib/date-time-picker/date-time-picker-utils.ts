import type {
  DateRangePresetId,
  DateTimePickerPublicSingle,
  DateTimePickerPublicValue,
  DateTimePickerValue,
  DateTimePickerValueMode,
  IDateTimePickerRange,
  ITimeSlot,
  TimeMode
} from './date-time-picker-constants.js';
import { getTemporal } from './temporal-loader.js';

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

/** Strips sub-minute (or sub-second) precision so equality checks don't churn on stray ms. */
function normalizePrecision(date: Date, allowSeconds: boolean): Date {
  if (allowSeconds) {
    date.setMilliseconds(0);
  } else {
    date.setSeconds(0, 0);
  }
  return date;
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
          return { from: normalizePrecision(from, allowSeconds), to: normalizePrecision(to, allowSeconds) };
        }
      }
      return null;
    }
    if (typeof input === 'object' && input !== null) {
      const candidate = input as Partial<IDateTimePickerRange>;
      const from = parseMaybeDate(candidate.from);
      const to = parseMaybeDate(candidate.to);
      if (from && to) {
        return { from: normalizePrecision(from, allowSeconds), to: normalizePrecision(to, allowSeconds) };
      }
    }
    return null;
  }

  const date = parseMaybeDate(input);
  if (date) {
    return normalizePrecision(date, allowSeconds);
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
  return temporalToDate(input);
}

/**
 * Converts a `Temporal.PlainDateTime` / `PlainDate` (duck-typed by its calendar fields) into a
 * local `Date`. Temporal months are 1-based; missing time fields default to 0.
 */
function temporalToDate(input: unknown): Date | null {
  if (!input || typeof input !== 'object') {
    return null;
  }
  const candidate = input as { year?: unknown; month?: unknown; day?: unknown; hour?: unknown; minute?: unknown; second?: unknown };
  if (typeof candidate.year !== 'number' || typeof candidate.month !== 'number' || typeof candidate.day !== 'number') {
    return null;
  }
  const hour = typeof candidate.hour === 'number' ? candidate.hour : 0;
  const minute = typeof candidate.minute === 'number' ? candidate.minute : 0;
  const second = typeof candidate.second === 'number' ? candidate.second : 0;
  return new Date(candidate.year, candidate.month - 1, candidate.day, hour, minute, second);
}

/**
 * Computes date endpoints for a named quick-range preset.
 * All returned dates are at 00:00:00.000 local time (midnight).
 * The caller is responsible for merging time-of-day values if desired.
 *
 * @param id - The preset identifier.
 * @param now - The reference instant (do NOT use `Date.now()` — pass this arg).
 * @param firstDayOfWeek - 0 = Sunday, 1 = Monday, etc.
 */
export function computePreset(id: DateRangePresetId, now: Date, firstDayOfWeek: number): { from: Date; to: Date } {
  const midnight = (d: Date): Date => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const addDays = (d: Date, n: number): Date => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
  const today = midnight(now);

  switch (id) {
    case 'today':
      return { from: today, to: today };
    case 'this-week': {
      const dow = today.getDay();
      const diffToStart = (dow - firstDayOfWeek + 7) % 7;
      const weekStart = addDays(today, -diffToStart);
      const weekEnd = addDays(weekStart, 6);
      return { from: weekStart, to: weekEnd };
    }
    case 'next-7-days':
      return { from: today, to: addDays(today, 6) };
    case 'this-month': {
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return { from: monthStart, to: monthEnd };
    }
  }
}

const MS_PER_MINUTE = 60_000;
const MS_PER_HOUR = 3_600_000;
const MS_PER_DAY = 86_400_000;

/**
 * Formats the duration between two dates as a human-readable string.
 * Returns `''` when `to <= from`.
 * Prefers `Intl.DurationFormat` when available; otherwise falls back to manual plural formatting.
 *
 * @param from - Start of the range.
 * @param to - End of the range.
 * @param locale - Optional BCP 47 locale tag.
 */
export function formatDuration(from: Date, to: Date, locale?: string): string {
  const ms = to.getTime() - from.getTime();
  if (ms <= 0) {
    return '';
  }

  const totalMinutes = Math.floor(ms / MS_PER_MINUTE);
  const days = Math.floor(ms / MS_PER_DAY);
  const hours = Math.floor((ms % MS_PER_DAY) / MS_PER_HOUR);
  const minutes = totalMinutes % 60;

  if (typeof (Intl as { DurationFormat?: unknown }).DurationFormat === 'function') {
    type DurationFormatType = new (locale: string | undefined, opts: { style: string }) => { format: (val: Record<string, number>) => string };
    const DurationFormatCtor = (Intl as unknown as { DurationFormat: DurationFormatType }).DurationFormat;
    const fmt = new DurationFormatCtor(locale, { style: 'long' });
    const value: Record<string, number> = {};
    if (days > 0) {
      value['days'] = days;
    }
    if (hours > 0) {
      value['hours'] = hours;
    }
    if (days === 0 && minutes > 0) {
      value['minutes'] = minutes;
    }
    return fmt.format(value);
  }

  const plural = (n: number, unit: string): string => `${n} ${unit}${n !== 1 ? 's' : ''}`;
  const parts: string[] = [];
  if (days > 0) {
    parts.push(plural(days, 'day'));
  }
  if (hours > 0) {
    parts.push(plural(hours, 'hour'));
  }
  if (days === 0 && minutes > 0) {
    parts.push(plural(minutes, 'minute'));
  }
  return parts.join(', ');
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

const pad = (n: number): string => String(n).padStart(2, '0');

/** Formats a `Date` as a local (timezone-free) `datetime-local` string: `YYYY-MM-DDTHH:mm[:ss]`. */
export function toLocalIsoString(date: Date, allowSeconds: boolean): string {
  const base = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  return allowSeconds ? `${base}:${pad(date.getSeconds())}` : base;
}

/** Converts a single internal `Date` into the public shape requested by `valueMode`. */
function dateToPublic(date: Date, valueMode: DateTimePickerValueMode, allowSeconds: boolean): DateTimePickerPublicSingle {
  if (valueMode === 'date') {
    return new Date(date);
  }
  const iso = toLocalIsoString(date, allowSeconds);
  if (valueMode === 'iso') {
    return iso;
  }
  // 'temporal' — build a PlainDateTime when the namespace is available; otherwise fall back to the
  // ISO string (a valid datetime-local) until the lazily-loaded polyfill is ready.
  const temporal = getTemporal();
  return temporal ? temporal.PlainDateTime.from(allowSeconds ? iso : `${iso}:00`) : iso;
}

/** Formats an internal value for display in a field input (locale-aware date + time / range). Returns `''` for `null`. */
export function formatDisplayValue(value: DateTimePickerValue, locale: string | undefined, use24HourTime: boolean, allowSeconds: boolean): string {
  if (value == null) {
    return '';
  }
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: !use24HourTime,
    hourCycle: use24HourTime ? 'h23' : 'h12'
  };
  if (allowSeconds) {
    timeOptions.second = '2-digit';
  }
  const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  if (isRange(value)) {
    const dateFmt = new Intl.DateTimeFormat(locale, dateOptions);
    const timeFmt = new Intl.DateTimeFormat(locale, timeOptions);
    return `${dateFmt.format(value.from)} ${timeFmt.formatRange(value.from, value.to)}`;
  }
  return new Intl.DateTimeFormat(locale, { ...dateOptions, ...timeOptions }).format(value);
}

/** Converts the internal `Date`/range value into the public shape per `valueMode`. */
export function toPublicValue(value: DateTimePickerValue, valueMode: DateTimePickerValueMode, allowSeconds: boolean): DateTimePickerPublicValue {
  if (value == null) {
    return null;
  }
  if (isRange(value)) {
    return {
      from: dateToPublic(value.from, valueMode, allowSeconds),
      to: dateToPublic(value.to, valueMode, allowSeconds)
    };
  }
  return dateToPublic(value, valueMode, allowSeconds);
}
