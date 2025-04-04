import { Nullable } from '../../core';
import {
  CalendarDateBuilder,
  CalendarDateSelectCallback,
  CalendarDayBuilder,
  CalendarDisabledDateBuilder,
  CalendarEventBuilder,
  DayOfWeek,
  ICalendarEvent
} from '../calendar-constants';
import { DateRange } from './date-range';

export interface ICalendarBase {
  readonly activeDate: Date;
  allowSingleDateRange: boolean;
  constrainToEnabled: boolean;
  disabledDates: Nullable<Date | Date[]>;
  disabledDaysOfWeek: Nullable<DayOfWeek | DayOfWeek[]>;
  events: Nullable<ICalendarEvent[]>;
  firstDayOfWeek: Nullable<DayOfWeek>;
  fixedHeight: boolean;
  listYears: boolean;
  locale: Nullable<string>;
  max: Nullable<Date | string>;
  min: Nullable<Date | string>;
  month: number;
  readonly: boolean;
  showOtherMonths: boolean;
  showToday: boolean;
  value: Nullable<Date | Date[] | DateRange>;
  weekendDays: Nullable<DayOfWeek[]>;
  year: number;
  yearRange: string;
  dateBuilder: Nullable<CalendarDateBuilder>;
  dateSelectCallback: Nullable<CalendarDateSelectCallback>;
  dayBuilder: Nullable<CalendarDayBuilder>;
  disabledDateBuilder: Nullable<CalendarDisabledDateBuilder>;
  eventBuilder: Nullable<CalendarEventBuilder>;
}
