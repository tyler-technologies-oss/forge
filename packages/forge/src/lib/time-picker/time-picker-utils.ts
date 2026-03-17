import { tokenize24HourTimeString, tokenize12HourTimeString, TWENTY_FOUR_HOUR_TIME_REGEX, TWELVE_HOUR_TIME_REGEX } from '../core/utils/time-utils.js';

export function timeStringToMillis(time: string | null, use24HourTime: boolean, allowSeconds: boolean): number | null {
  if (!time || /^\s*$/.test(time)) {
    return null;
  }

  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  if (TWENTY_FOUR_HOUR_TIME_REGEX.test(time)) {
    const tokens = tokenize24HourTimeString(time);
    hours = +tokens.hours || 0;
    minutes = +tokens.minutes || 0;
    seconds = +tokens.seconds || 0;
  } else if (TWELVE_HOUR_TIME_REGEX.test(time)) {
    const tokens = tokenize12HourTimeString(time);
    hours = +tokens.hours || 0;
    minutes = +tokens.minutes || 0;
    seconds = +tokens.seconds || 0;
    if (hours === 12 && tokens.meridiem === 'AM') {
      hours = 0;
    }
    if (hours < 12 && tokens.meridiem === 'PM') {
      hours += 12;
    }
  } else {
    return null;
  }

  return hoursToMillis(hours) + minutesToMillis(minutes) + (allowSeconds ? secondsToMillis(seconds) : 0);
}

export function millisToTimeString(value: number | null | undefined, use24HourTime: boolean, allowSeconds: boolean): string | null {
  if (typeof value !== 'number' || value < 0) {
    return null;
  }

  let hours = Math.min(millisToHours(value), 23);
  const minutes = Math.min(millisToMinutesClamped(value), 59);
  const totalMinutes = value / (1000 * 60);
  const meridiem = totalMinutes < 720 ? 'AM' : 'PM';

  if (!use24HourTime) {
    hours = hours <= 12 ? hours : hours - 12;
    if (hours === 0) {
      hours = 12;
    }
  }

  let time = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

  if (allowSeconds) {
    const seconds = Math.min(millisToSecondsClamped(value), 59);
    time += `:${String(seconds).padStart(2, '0')}`;
  }

  if (!use24HourTime) {
    time += ` ${meridiem}`;
  }

  return time;
}

export function millisToHours(millis: number): number {
  return Math.abs(Math.floor(millis / (1000 * 60 * 60)));
}

export function millisToMinutesClamped(millis: number): number {
  return Math.abs(Math.floor(millisToMinutes(millis) % 60));
}

export function millisToMinutes(millis: number): number {
  return millis / (1000 * 60);
}

export function millisToSecondsClamped(millis: number): number {
  return Math.abs(Math.floor(millisToSeconds(millis) % 60));
}

export function millisToSeconds(millis: number): number {
  return millis / 1000;
}

export function hoursToMillis(hours: number): number {
  return hours * 60 * 60 * 1000;
}

export function minutesToMillis(minutes: number): number {
  return minutes * 60 * 1000;
}

export function secondsToMillis(seconds: number): number {
  return seconds * 1000;
}

export function stripSecondsFromMillis(millis: number): number {
  return millis - secondsToMillis(millisToSecondsClamped(millis));
}

export function getCurrentTimeOfDayMillis(allowSeconds: boolean): number {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return hoursToMillis(hours) + minutesToMillis(minutes) + (allowSeconds ? secondsToMillis(date.getSeconds()) : 0);
}

/**
 * Combines a `Date` object with a 24-hour time string from the time-picker component.
 * @param date The `Date` object to adjust.
 * @param time The 24-hour time string.
 * @param useSeconds If your 24-hour time string contains seconds, set this to `true`.
 * @returns The same `Date` object that was provided, with the newly adjusted time.
 */
export function mergeDateWithTime(date: Date, time: string, useSeconds = false): Date {
  if (!date) {
    date = new Date();
  }

  const millis = timeStringToMillis(time, true, useSeconds);
  if (!millis) {
    date.setHours(0, 0, 0);
    return date;
  }

  let hours = millisToHours(millis);

  const twentyThreeHoursInMillis = 82800000;
  if (hours > twentyThreeHoursInMillis) {
    hours = twentyThreeHoursInMillis;
  } else if (hours < 0) {
    hours = 0;
  }

  const minutes = millisToMinutesClamped(millis);
  const seconds = useSeconds ? millisToSecondsClamped(millis) : 0;
  date.setHours(hours, minutes, seconds);

  return date;
}
