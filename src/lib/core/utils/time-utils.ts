export const TWENTY_FOUR_HOUR_TIME_REGEX = /^(0?[0-9]|1\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/;
export const TWELVE_HOUR_TIME_REGEX = /^(0?[1-9]|1[0-2]):([0-5]\d)(:([0-5]\d))?\s*([AaPp][Mm])?$/;
export const PARSEABLE_TIME_FORMAT = /^(\d?\d?):?(\d?\d?)(:?(\d?\d?))?\s*([AaPp][Mm]?)?$/;
export const HAS_MERIDIEM_REGEX = /[AaPp][Mm]?/;

export function tokenize24HourTimeString(value: string): { hours: string; minutes: string; seconds: string } {
  const matches = value.match(TWENTY_FOUR_HOUR_TIME_REGEX) as RegExpMatchArray || [null, 0, 0, null, 0];
  const hours = matches[1];
  const minutes = matches[2];
  const seconds = matches[4];
  return { hours, minutes, seconds };
}

export function tokenize12HourTimeString(value: string): { hours: string; minutes: string; seconds: string; meridiem: string } {
  const matches = value.match(TWELVE_HOUR_TIME_REGEX) as RegExpMatchArray || [null, 0, 0, null, 0, 'AM'];
  const hours = matches[1];
  const minutes = matches[2];
  const seconds = matches[4];
  const meridiem = matches[5];
  return { hours, minutes, seconds, meridiem };
}

export function isSupportedTimeFormat(value: string): boolean {
  return TWENTY_FOUR_HOUR_TIME_REGEX.test(value) ||
         TWELVE_HOUR_TIME_REGEX.test(value);
}

export function tryCoerceTimeString(str: string, use24HourTime: boolean, allowSeconds: boolean): string {
  str = str && typeof str === 'string' ? str.replace(/_|\s/g, '') : '';
  if (/^\s*$/.test(str) || /^:+$/.test(str)) {
    return '';
  }

  const matches = str.match(PARSEABLE_TIME_FORMAT);
  if (!matches) {
    return '';
  }

  let hoursStr = matches[1];
  let minutesStr = matches[2];
  let secondsStr = matches[4];
  let meridiem = matches[5];

  // Special case detection for meridiem
  const meridiemMatches = str.match(HAS_MERIDIEM_REGEX);
  if (meridiemMatches) {
    meridiem = meridiemMatches[0];
    str = str.replace(meridiem, ''); // Remove the meridiem from the input string our next special case

    // We allow for entering an "a" or "p" shorthand so let's coerce it to the proper value
    if (meridiem.length === 1) {
      meridiem += 'm';
    }
  }

  // Special case handling for 3-digit "shorthand" time values (ex. "130" => "1:30 AM")
  if (str.length === 3 && !str.includes(':')) {
    hoursStr = str[0];
    minutesStr = str.substring(1);
  }

  // Normalize the meridiem string
  if (use24HourTime) {
    meridiem = '';
  } else if (HAS_MERIDIEM_REGEX.test(meridiem)) {
    meridiem = meridiem.toUpperCase();
  } else {
    if (/^[AaPp]/.test(meridiem)) {
      if (meridiem.toLowerCase().startsWith('a')) {
        meridiem = 'AM';
      } else if (meridiem.toLowerCase().startsWith('p')) {
        meridiem = 'PM';
      }
    } else {
      meridiem = '';
    }
  }

  const hoursNum = +hoursStr || 0;
  const minutesNum = +minutesStr || 0;

  // Clamp and normalize hours
  const maxHours = !meridiem || use24HourTime ? 23 : 12;
  if (hoursNum >= maxHours) {
    hoursStr = String(maxHours);
  } else if (hoursNum < 0) {
    hoursStr = '00';
  }

  hoursStr = hoursStr.padStart(2, '0');

  // Clamp and normalize minutes
  if (minutesStr !== undefined) {
    if (minutesNum > 59) {
      minutesStr = '59';
    } else if (minutesNum < 0) {
      minutesStr = '00';
    } else {
      minutesStr = minutesStr.padStart(2, '0');
    }
  }

  // Clamp and normalize seconds (if applicable)
  if (secondsStr !== undefined) {
    const secondsNum = +secondsStr || 0;
    if (secondsNum > 59) {
      secondsStr = '59';
    } else if (secondsNum < 0) {
      secondsStr = '00';
    } else {
      secondsStr = secondsStr.padStart(2, '0');
    }
  }

  // Build resulting time string
  let timeStr = hoursStr;
  if (minutesStr !== undefined) {
    timeStr += `:${minutesStr}`;
    if (secondsStr === undefined && allowSeconds) {
      secondsStr = '00';
    }
  }
  if (secondsStr !== undefined) {
    timeStr += `:${secondsStr}`;
  }
  if (meridiem) {
    timeStr += ` ${meridiem}`;
  }

  return timeStr;
}
