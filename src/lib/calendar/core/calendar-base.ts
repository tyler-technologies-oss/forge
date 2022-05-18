import { CalendarDateBuilder, CalendarDateSelectCallback, CalendarDayBuilder, CalendarDisabledDateBuilder, CalendarEventBuilder, DayOfWeek, ICalendarEvent } from '../calendar-constants';
import { DateRange } from './date-range';

export interface ICalendarBase {
  readonly activeDate: Date;
  allowSingleDateRange: boolean;
  constrainToEnabled: boolean;
  disabledDates: Date | Date[] | null;
  disabledDaysOfWeek: DayOfWeek | DayOfWeek[] | null;
  events: ICalendarEvent[] | null;
  firstDayOfWeek: DayOfWeek | undefined;
  fixedHeight: boolean;
  listYears: boolean;
  locale: string | undefined;
  max: Date | string | null;
  min: Date | string | null;
  month: number;
  readonly: boolean;
  showOtherMonths: boolean;
  showToday: boolean;
  value: Date | Date[] | DateRange | null;
  weekendDays: DayOfWeek[] | null;
  year: number;
  yearRange: string;
  dateBuilder: CalendarDateBuilder | undefined;
  dateSelectCallback: CalendarDateSelectCallback | undefined;
  dayBuilder: CalendarDayBuilder | undefined;
  disabledDateBuilder: CalendarDisabledDateBuilder | undefined;
  eventBuilder: CalendarEventBuilder | undefined;
}
