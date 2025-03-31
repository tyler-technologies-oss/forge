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
  disabledDates: Date | Date[] | null | undefined;
  disabledDaysOfWeek: DayOfWeek | DayOfWeek[] | null | undefined;
  events: ICalendarEvent[] | null | undefined;
  firstDayOfWeek: DayOfWeek | undefined;
  fixedHeight: boolean;
  listYears: boolean;
  locale: string | undefined;
  max: Date | string | null | undefined;
  min: Date | string | null | undefined;
  month: number;
  readonly: boolean;
  showOtherMonths: boolean;
  showToday: boolean;
  showYesterday: boolean;
  showLastSevenDays: boolean;
  showLastThirtyDays: boolean;
  value: Date | Date[] | DateRange | null | undefined;
  weekendDays: DayOfWeek[] | null | undefined;
  year: number;
  yearRange: string;
  dateBuilder: CalendarDateBuilder | undefined;
  dateSelectCallback: CalendarDateSelectCallback | undefined;
  dayBuilder: CalendarDayBuilder | undefined;
  disabledDateBuilder: CalendarDisabledDateBuilder | undefined;
  eventBuilder: CalendarEventBuilder | undefined;
}
