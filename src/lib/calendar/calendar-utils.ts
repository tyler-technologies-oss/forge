import { getEventPath, isArray, isValidDate } from '@tylertech/forge-core';

import { isSameDate } from '../core/utils/date-utils';
import { ICalendarMenuOption } from './calendar-menu/calendar-menu-constants';
import {
  CALENDAR_CONSTANTS,
  CalendarEventBuilder,
  DayOfWeek,
  ICalendarEvent,
  ICalendarNumberRange,
  ICalendarMenuMonthConfig,
  ICalendarMenuYearConfig,
  ICalendarDisabledDateParams,
  CalendarView
} from './calendar-constants';
import { getLocalizedMonth, getLocalizedYear } from './calendar-locale-utils';
import { DateRange } from './core/date-range';
import { eventIncludesDate, eventIncludesElement } from './calendar-dom-utils';

/** Returns an array of dates encompassing an entire month and the beginning and end of adjacent months to fill weeks. */
export function getMonthDates(month: number, year: number, firstDayOfWeek: DayOfWeek = DayOfWeek.Sunday): Date[] {
  const dates: Date[] = [];
  const startDate = getFirstDateOfWeek(new Date(year, month, 1), firstDayOfWeek);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + CALENDAR_CONSTANTS.numbers.MONTH_LENGTH);

  for (const d = startDate; d < endDate; d.setDate(d.getDate() + 1)) {
    dates.push(new Date(d));
  }
  return dates;
}

/** Returns an array of the dates in single week given a date from the week. */
export function getWeekDates(date: Date, firstDayOfWeek: DayOfWeek = DayOfWeek.Sunday): Date[] {
  const dates: Date[] = [];
  const startDate = getFirstDateOfWeek(date, firstDayOfWeek);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 7);

  for (const d = startDate; d < endDate; d.setDate(d.getDate() + 1)) {
    dates.push(new Date(d));
  }
  return dates;
}

/** Returns the first date of the week containing the given date. */
export function getFirstDateOfWeek(date: Date, firstDayOfWeek: DayOfWeek = DayOfWeek.Sunday): Date {
  const day = date.getDay();
  const firstDate = new Date(date);
  const diff = day >= firstDayOfWeek ? day - firstDayOfWeek : 7 + (day - firstDayOfWeek);
  firstDate.setDate(date.getDate() - diff);
  firstDate.setHours(0, 0, 0, 0);
  return firstDate;
}

/** Returns the last date of the week containing the given date. */
export function getLastDateOfWeek(date: Date, firstDayOfWeek: DayOfWeek = DayOfWeek.Sunday): Date {
  const lastDate = getFirstDateOfWeek(date, firstDayOfWeek);
  lastDate.setDate(lastDate.getDate() + 6);
  return lastDate;
}

/** Returns the day of week of the first date of the given month. */
export function getFirstDayOfMonth(month: number, year: number): DayOfWeek {
  const date = new Date(year, month, 1);
  return date.getDay();
}

/** Returns an array of day strings for a week starting on the given first day of week. */
export function getSortedDaysOfWeek(firstDayOfWeek: DayOfWeek = DayOfWeek.Sunday): DayOfWeek[] {
  const days: DayOfWeek[] = [];
  let day = firstDayOfWeek;
  do {
    days.push(day);
    day += 1;
    day %= 7;
  } while (day !== firstDayOfWeek);
  return days;
}

/** Returns whether the given date object is today. */
export function isToday(date: Date): boolean {
  return isSameDate(new Date(), date);
}

/** Returns whether the given date is in a given month. */
export function isInMonth(date: Date, month: number, year: number): boolean {
  return date.getMonth() === month && date.getFullYear() === year;
}

/** Returns whether the given date falls between two other dates. */
export function isInRange(date: Date, start: Date, end: Date): boolean {
  return (date > start && date < end) || isSameDate(date, start) || isSameDate(date, end);
}

/** Sorts an array of dates from earliest to latest. */
export function sortDates(dates: Date[]): Date[] {
  return dates.sort((a, b) => a.getTime() - b.getTime());
}

/** Splits an array into groups of seven. */
export function splitIntoWeeks<T>(array: T[]): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += 7) {
    const chunk = array.slice(i, i + 7);
    result.push(chunk);
  }
  return result;
}

/** Returns a date range from an array of dates. */
export function getDateRangeFromDates(dates: Date[]): DateRange {
  if (!dates.length) {
    return new DateRange();
  }
  if (dates.length === 1) {
    return new DateRange({ from: new Date(dates[0]) });
  }
  const minAndMax = getMinAndMaxDates(dates);
  return new DateRange({ from: minAndMax[0], to: minAndMax[minAndMax.length - 1] });
}

/** Returns an array of dates from a date range. */
export function getDatesFromDateRange(range: DateRange): Date[] {
  const dates: Date[] = [];
  if (range.from) {
    dates.push(new Date(range.from));
  }
  if (range.to) {
    dates.push(new Date(range.to));
  }
  return dates;
}

/** Returns the earliest and latest dates in an array as an array. */
export function getMinAndMaxDates(dates: Date[]): Date[] {
  if (!dates.length) {
    return [];
  }
  if (dates.length === 1) {
    return [new Date(dates[0])];
  }
  const sortedDates = sortDates(dates.slice().map(d => new Date(d)));
  return [new Date(sortedDates[0]), new Date(sortedDates[sortedDates.length - 1])];
}

/** Returns an array of ICalendarDates that fall between two other dates. */
export function getDatesInRange(dates: Date[], start: Date, end: Date): Date[] {
  if (!start || !end) {
    return [];
  }
  return dates.filter(d => isInRange(d, start, end));
}

/** Gets an accessible description of events. */
export function getEventDescriptions(events: ICalendarEvent[]): string {
  let description = `${events.length} event${events.length === 1 ? '' : 's'}`;
  const labels = events.map(e => e.label).join(', ');
  if (labels?.length) {
    description += `: ${labels}`;
  }
  return description;
}

/** Gets a date from a string of numbers postfixed by y, m, w, or d */
export function parseDateOffset(offset: string): Date {
  const date = new Date();
  const parts = offset.match(/-?[0-9]*[a-zA-Z]/g)?.map(p => p.trim()) ?? [];
  parts.forEach(p => {
    const postfix = p.slice(-1);
    const value = +p.slice(0, -1);
    switch (postfix) {
      case 'y':
        date.setFullYear(date.getFullYear() + value);
        break;
      case 'm':
        date.setMonth(date.getMonth() + value);
        break;
      case 'w':
        date.setDate(date.getDate() + value * 7);
        break;
      case 'd':
        date.setDate(date.getDate() + value);
        break;
    }
  });
  date.setHours(0, 0, 0, 0);
  return date;
}

/** Gets a min and max year from a string of two numbers separated by : and optionally prefixed with + or - */
export function parseYearRange(range: string): ICalendarNumberRange {
  const parts = range.split(':');
  if (parts?.length < 2) {
    return { min: 1970, max: 1970 };
  }
  const thisYear = new Date().getFullYear();
  const parsedParts = parts.slice(0, 2).map(p => {
    if (p.startsWith('-')) {
      return thisYear - +p.substring(1);
    } else if (p.startsWith('+')) {
      return thisYear + +p.substring(1);
    }
    return +p;
  });
  return { min: parsedParts[0], max: parsedParts[1] };
}

/** Gets an array of month ICalendarMenuOptions. */
export function getMonthOptions(config: ICalendarMenuMonthConfig): ICalendarMenuOption[] {
  const minYear = config.min?.getFullYear() ?? 0;
  const maxYear = config.max?.getFullYear() ?? 0;
  const minMonth = config.min?.getMonth() ?? -1;
  const maxMonth = config.max?.getMonth() ?? 12;
  return [...Array(12).keys()].map(k => {
    const lessThanMin = config.min ? config.selectedYear < minYear || (config.selectedYear === minYear && k < minMonth) : false;
    const greaterThanMax = config.max ? config.selectedYear > maxYear || (config.selectedYear === maxYear && k > maxMonth) : false;
    return {
      value: k,
      label: getLocalizedMonth(k, 'long', config.locale),
      selected: k === config.selectedMonth,
      disabled: lessThanMin || greaterThanMax
    };
  });
}

/** Gets an array of year ICalendarMenuOptions. */
export function getYearOptions(config: ICalendarMenuYearConfig): ICalendarMenuOption[] {
  const menuOptions: ICalendarMenuOption[] = [];
  const offset = config.yearInView % CALENDAR_CONSTANTS.numbers.YEARS_IN_VIEW;
  const start = config.yearInView - offset;
  for (let i = start; i < start + CALENDAR_CONSTANTS.numbers.YEARS_IN_VIEW; i++) {
    menuOptions.push({
      value: i,
      label: getLocalizedYear(i, 'numeric', config.locale),
      selected: i === config.selectedYear,
      disabled: i < config.min || i > config.max
    });
  }
  return menuOptions;
}

/** Gets an array of year ICalendarMenuOptions including every year in range. */
export function getAllYearOptions(config: ICalendarMenuYearConfig): ICalendarMenuOption[] {
  const menuOptions: ICalendarMenuOption[] = [];
  for (let i = config.min; i <= config.max; i++) {
    menuOptions.push({
      value: i,
      label: getLocalizedYear(i, 'numeric', config.locale),
      selected: i === config.selectedYear
    });
  }
  return menuOptions;
}

/** Checks whether a date is present in the given array. */
export function isSelected(date: Date, values: Date[]): boolean {
  return values.some(d => isSameDate(d, date));
}

/** Checks wheter a date is disabled. */
export function isDisabled(date: Date, params: ICalendarDisabledDateParams): boolean {
  if ((params.minDate && date < params.minDate) || (params.maxDate && date > params.maxDate)) {
    return true;
  }
  if (params.otherMonth) {
    return true;
  }
  if (params.disabledDates.some(d => isSameDate(d, date))) {
    return true;
  }
  if (params.disabledDaysOfWeek.includes(date.getDay())) {
    return true;
  }
  if (params.builder && params.builder(date)) {
    return true;
  }
  return false;
}

/** Returns the index of the given date in the dates array. */
export function getIndexOfDate(date: Date, dates: Date[]): number {
  return dates.findIndex(d => isSameDate(d, date));
}

/** Returns all the events on the given date. */
export function getEventsOnDate(date: Date, events: ICalendarEvent[], builder: CalendarEventBuilder | undefined): ICalendarEvent[] {
  const eventsOnDate = events.filter(e => isSameDate(e.date, date));
  if (builder) {
    const builtEvents = builder(date);
    if (builtEvents) {
      if (isArray(builtEvents)) {
        eventsOnDate.push(...(builtEvents as ICalendarEvent[]));
      } else {
        eventsOnDate.push(builtEvents as ICalendarEvent);
      }
    }
  }
  return eventsOnDate;
}

/** Gets all enabled dates between the first and last items in an array of dates.  */
export function getMultipleFromRange(dates: Date[], disabledParams?: ICalendarDisabledDateParams): Date[] {
  if (!dates.length) {
    return [];
  }
  const current = new Date(dates[0]);
  const last = dates[dates.length - 1];
  const array: Date[] = [];
  while (current <= last) {
    if (!disabledParams || !isDisabled(current, disabledParams)) {
      array.push(new Date(current));
    }
    current.setDate(current.getDate() + 1);
  }
  return array;
}

/** Gets a date or null from a date, string, or date offset. */
export function coerceDateFromValue(value?: Date | string | null): Date | null {
  let date: Date | null = null;

  if (typeof value === 'string' && !value.length) {
    value = null;
  }

  if (value != null) {
    if (isValidDate(new Date(value as string | Date))) {
      date = new Date(value as Date);
    } else if ((value as string).length) {
      date = parseDateOffset(value as string);
    }
    date?.setHours(0, 0, 0, 0);
  }

  return date;
}

/** Returns whether an event should be handled or ignored. */
export function shouldHandleEvent(evt: Event, view: CalendarView, preventFocus: boolean): boolean {
  return (
    preventFocus ||
    !getEventPath(evt).length ||
    !!(view === 'date' && eventIncludesDate(evt)) ||
    !!(view !== 'date' && eventIncludesElement(evt, CALENDAR_CONSTANTS.ids.MENU))
  );
}
