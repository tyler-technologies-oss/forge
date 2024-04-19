import { TOOLTIP_CONSTANTS } from '../tooltip/tooltip-constants';
import { COMPONENT_NAME_PREFIX } from '../constants';
import { CALENDAR_MENU_CONSTANTS } from './calendar-menu';
import { DateRange } from './core/date-range';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}calendar`;

const observedAttributes = {
  ALLOW_SINGLE_DATE_RANGE: 'allow-single-date-range',
  CLEAR_BUTTON: 'clear-button',
  CONSTRAIN_TO_ENABLED: 'constrain-to-enabled',
  FIRST_DAY_OF_WEEK: 'first-day-of-week',
  FIXED_HEIGHT: 'static-height',
  LIST_YEARS: 'list-years',
  LOCALE: 'locale',
  MAX: 'max',
  MENU_ANIMATION: 'menu-animation',
  MIN: 'min',
  MODE: 'mode',
  MONTH: 'month',
  PREVENT_FOCUS: 'prevent-focus',
  READONLY: 'readonly',
  SELECTION_FOLLOWS_MONTH: 'selection-follows-month',
  SHOW_HEADER: 'show-header',
  SHOW_OTHER_MONTHS: 'show-other-months',
  SHOW_TODAY: 'show-today',
  TODAY_BUTTON: 'today-button',
  VIEW: 'view',
  YEAR: 'year',
  YEAR_RANGE: 'year-range'
};

const attributes = {
  ...observedAttributes,
  DATA_DATE: 'data-date',
  DATA_EVENT_THEME: 'data-event-theme',
  POPOVER_CONTEXT: 'forge-popover-context'
};

const classes = {
  ALLOW_SINGLE_DATE_RANGE: 'forge-calendar--allow-single-date-range',
  DATE: 'forge-calendar__date',
  DATE_GRID: 'forge-calendar__date-grid',
  DATE_INNER: 'forge-calendar__date__inner',
  DATE_OTHER_MONTH: 'forge-calendar__date--other-month',
  DATE_SPACER: 'forge-calendar__date-spacer',
  DATE_SELECTED: 'forge-calendar__date--selected',
  DATE_TODAY: 'forge-calendar__date--today',
  DATE_VIEW: 'forge-calendar__date-view',
  DATE_VIEW_ROW: 'forge-calendar__date-view__row',
  DATE_WRAPPER: 'forge-calendar__date-wrapper',
  DAY: 'forge-calendar__day',
  EVENT: 'forge-calendar__event',
  EVENT_OVERFLOW: 'forge-calendar__event--overflow',
  EVENT_WRAPPER: 'forge-calendar__event__wrapper',
  FIXED_HEIGHT: 'forge-calendar--fixed-height',
  FOOTER: 'forge-calendar__footer',
  HEADER: 'forge-calendar__header',
  MONTH_MENU_OPEN: 'forge-calendar--month-menu-open',
  PREVENT_FOCUS: 'forge-calendar--prevent-focus',
  RANGE: 'forge-calendar__range',
  RANGE_END: 'forge-calendar__range--end',
  RANGE_START: 'forge-calendar__range--start',
  RANGE_TARGET: 'forge-calendar__range__target',
  READONLY: 'forge-calendar--readonly',
  RTL: 'forge-calendar--rtl',
  SHOW_OTHER_MONTHS: 'forge-calendar--show-other-months',
  SHOW_TODAY: 'forge-calendar--show-today',
  VIEW: 'forge-calendar__view',
  YEAR_MENU_OPEN: 'forge-calendar--year-menu-open'
};

const ids = {
  ACCESSIBLE_HEADER: 'accessible-header',
  ACCESSIBLE_MONTH: 'accessible-month',
  ACCESSIBLE_YEAR: 'accessible-year',
  CLEAR_BUTTON: 'clear-button',
  DATE_GRID: 'date-grid',
  DATE_VIEW: 'date-view',
  DAY_ROW: 'day-row',
  FOOTER: 'footer',
  HEADER: 'header',
  MENU: 'menu',
  MONTH_BUTTON: 'month-button',
  NEXT_BUTTON: 'next-button',
  NEXT_BUTTON_TOOLTIP: 'next-button-tooltip',
  PREVIOUS_BUTTON: 'previous-button',
  PREVIOUS_BUTTON_TOOLTIP: 'previous-button-tooltip',
  TODAY_BUTTON: 'today-button',
  YEAR_BUTTON: 'year-button'
};

const weekdayParts = {
  SUNDAY: 'sunday',
  MONDAY: 'monday',
  TUESDAY: 'tuesday',
  WEDNESDAY: 'wednesday',
  THURSDAY: 'thursday',
  FRIDAY: 'friday',
  SATURDAY: 'saturday'
};

const parts = {
  ...weekdayParts,
  CLEAR_BUTTON: 'clear-button',
  DATE: 'date',
  DATE_OTHER_MONTH: 'date-other-month',
  DATE_VIEW: 'date-view',
  DATE_WRAPPER: 'date-wrapper',
  DAY: 'day',
  EVENT: 'event',
  EVENT_WRAPPER: 'event-wrapper',
  FOOTER: 'footer',
  HEADER: 'header',
  MONTH_BUTTON: 'month-button',
  MONTH_BUTTON_ELEMENT: 'month-button-element',
  NEXT_BUTTON: 'next-button',
  PREVIOUS_BUTTON: 'previous-button',
  RANGE: 'range',
  RANGE_END: 'range-end',
  RANGE_START: 'range-start',
  TODAY: 'today',
  TODAY_BUTTON: 'today-button',
  WEEKEND: 'weekend',
  YEAR_BUTTON: 'year-button',
  YEAR_BUTTON_ELEMENT: 'year-button-element'
};

const selectors = {
  ACCESSIBLE_HEADER: `#${ids.ACCESSIBLE_HEADER}`,
  ACCESSIBLE_MONTH: `#${ids.ACCESSIBLE_MONTH}`,
  ACCESSIBLE_YEAR: `#${ids.ACCESSIBLE_YEAR}`,
  CALENDAR: '.forge-calendar',
  CLEAR_BUTTON: `#${ids.CLEAR_BUTTON}`,
  DATE: `.${classes.DATE}`,
  DATE_GRID: `#${ids.DATE_GRID}`,
  DATE_INNER: `.${classes.DATE_INNER}`,
  DATE_OTHER_MONTH: `.${classes.DATE_OTHER_MONTH}`,
  DATE_SPACER: `.${classes.DATE_SPACER}`,
  DATE_SELECTED: `.${classes.DATE_SELECTED}`,
  DATE_TODAY: `.${classes.DATE_TODAY}`,
  DATE_VIEW: `#${ids.DATE_VIEW}`,
  DATE_WRAPPER: `.${classes.DATE_WRAPPER}`,
  DAY_ROW: `#${ids.DAY_ROW}`,
  EVENT_WRAPPER: `.${classes.EVENT_WRAPPER}`,
  FOOTER: `#${ids.FOOTER}`,
  HEADER: `#${ids.HEADER}`,
  MENU: CALENDAR_MENU_CONSTANTS.elementName,
  MONTH_BUTTON: `#${ids.MONTH_BUTTON}`,
  NEXT_BUTTON: `#${ids.NEXT_BUTTON}`,
  NEXT_BUTTON_TOOLTIP: `#${ids.NEXT_BUTTON_TOOLTIP}`,
  PREVIOUS_BUTTON: `#${ids.PREVIOUS_BUTTON}`,
  PREVIOUS_BUTTON_TOOLTIP: `#${ids.PREVIOUS_BUTTON_TOOLTIP}`,
  RANGE: `.${classes.RANGE}`,
  RANGE_END: `.${classes.RANGE_END}`,
  RANGE_START: `.${classes.RANGE_START}`,
  TODAY_BUTTON: `#${ids.TODAY_BUTTON}`,
  TOOLTIP: TOOLTIP_CONSTANTS.elementName,
  VIEW: '#view',
  YEAR_BUTTON: `#${ids.YEAR_BUTTON}`
};

const events = {
  DATE_SELECT: `${elementName}-date-select`,
  FOCUS_CHANGE: `${elementName}-focus-change`,
  MONTH_CHANGE: `${elementName}-month-change`,
  VIEW_CHANGE: `${elementName}-view-change`
};

const numbers = {
  DEFAULT_MAX_YEAR_OFFSET: 50,
  DEFAULT_MIN_YEAR_OFFSET: 50,
  FINAL_WEEK_BEGIN_INDEX: 35,
  MONTH_LENGTH: 42,
  PENULTIMATE_WEEK_BEGIN_INDEX: 28,
  WEEK_LENGTH: 7,
  YEARS_IN_VIEW: 20
};

export const CALENDAR_CONSTANTS = {
  elementName,
  attributes,
  classes,
  ids,
  parts,
  selectors,
  events,
  numbers
};

export type CalendarDateBuilder = (date: ICalendarDateConfig, element: HTMLElement) => HTMLElement;
export type CalendarDateSelectCallback = (date: ICalendarDate) => boolean | Promise<boolean>;
export type CalendarDayBuilder = (day: DayOfWeek, element: HTMLElement) => HTMLElement;
export type CalendarDisabledDateBuilder = (date: Date) => boolean;
export type CalendarEventBuilder = (date: Date) => ICalendarEvent[] | ICalendarEvent | null;
export type CalendarTooltipBuilder = (date: ICalendarDate, content: string) => string | null;

export type CalendarMode = 'single' | 'multiple' | 'range';
export type CalendarView = 'date' | 'month' | 'year';
export type RangeSelectionState = 'none' | 'from' | 'to';
export type CalendarEventColor = 'primary' | 'secondary' | 'blue' | 'light-green' | 'cyan' | 'teal' | 'orange' | 'blue-grey' | 'grey' | 'red' | 'pink' | 'purple' | 'light-blue' | 'deep-purple' | 'green' | 'lime' | 'yellow' | 'brown' | 'deep-orange';

export interface ICalendarDate {
  date: Date;
  selected: boolean;
  events: ICalendarEvent[];
}

export interface ICalendarDateConfig {
  date: Date;
  selected: boolean;
  today: boolean;
  thisMonth: boolean;
  disabled: boolean;
}

export interface ICalendarDateOptions {
  builder?: CalendarDateBuilder;
  locale?: string;
  showOtherMonths?: boolean;
}

export interface ICalendarDayOptions {
  builder?: CalendarDayBuilder;
  locale?: string;
}

export interface ICalendarEvent {
  date: Date;
  label: string;
  color: CalendarEventColor | string;
}

export interface ICalendarDateSelectEventData {
  date: Date | null;
  selected: boolean;
  range?: DateRange;
  rangeSelectionState?: RangeSelectionState;
  type: CalendarView;
}

export interface ICalendarMonthChangeEventData {
  month: number;
  userSelected: boolean; // Indicates whether event is from explicit selection or regular navigation
  year: number;
}

export interface ICalendarFocusChangeEventData {
  selected: boolean;
  text: string;
  type: CalendarView;
  value: Date | number;
}

export interface ICalendarNumberRange {
  max: number;
  min: number;
}

export interface ICalendarDisabledDateParams {
  builder: CalendarDisabledDateBuilder | undefined;
  disabledDates: Date[];
  disabledDaysOfWeek: DayOfWeek[];
  maxDate: Date | null;
  minDate: Date | null;
  otherMonth?: boolean;
}

export interface ICalendarMenuMonthConfig {
  locale?: string;
  max: Date | null;
  min: Date | null;
  selectedMonth: number;
  selectedYear: number;
}

export interface ICalendarMenuYearConfig {
  locale?: string;
  max: number;
  min: number;
  selectedYear: number;
  yearInView: number;
}

export enum DayOfWeek {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6
}

export enum CalendarMonthFocus {
  First = 1,
  Last = 2,
  Current = 3
}
