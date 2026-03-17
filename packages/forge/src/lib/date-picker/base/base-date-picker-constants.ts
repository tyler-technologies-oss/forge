import { Masked, InputMask, type AppendFlags, type FactoryArg } from 'imask';
import { DayOfWeek, ICalendarDateSelectEventData } from '../../calendar/index.js';
import { type IDatePickerComponent } from '../date-picker.js';
import { SupportedDateFormats } from '../../core/utils/date-utils.js';

export type DatePickerParseCallback = (value: string) => Date | null;
export type DatePickerFormatCallback = (value: Date | null) => string | null;
export type DatePickerPrepareMaskCallback = (value: string, masked: Masked<string>, flags: AppendFlags, maskInstance: InputMask<FactoryArg>) => string;
export type DatePickerValueMode = 'object' | 'string' | 'iso-string';
export type DatePickerShortcuts = IDatePickerShortcuts | 'off' | undefined;
export type DatePickerDateFormat = SupportedDateFormats;

export interface IDatePickerShortcuts {
  [key: string]: (context: { instance: IDatePickerComponent }) => Date | null | undefined | void;
}

export interface IDatePickerCalendarDropdownConfig<T> {
  value?: T | null;
  min?: Date | null;
  max?: Date | null;
  disabledDates?: Date | Date[] | null;
  popupClasses: string | string[];
  closeCallback: () => void;
  selectCallback: (value: ICalendarDateSelectEventData) => void;
  activeChangeCallback: (id: string) => void;
  disableDayCallback: (date: Date) => boolean;
  showToday: boolean;
  showClear: boolean;
  todayCallback: () => void;
  clearCallback: () => void;
  disabledDaysOfWeek?: DayOfWeek[] | null;
}

export interface IDatePickerCalendarDropdownText {
  today?: string;
  clear?: string;
  previousMonth?: string;
  nextMonth?: string;
  previousYear?: string;
  nextYear?: string;
  previousYears?: string;
  nextYears?: string;
}

const observedAttributes = {
  MIN: 'min',
  MAX: 'max',
  OPEN: 'open',
  DISABLED: 'disabled',
  POPUP_CLASSES: 'popup-classes',
  MASKED: 'masked',
  MASK_FORMAT: 'mask-format',
  SHOW_MASK_FORMAT: 'show-mask-format',
  DATE_FORMAT: 'date-format',
  VALUE_MODE: 'value-mode',
  SHORTCUTS: 'shortcuts',
  ALLOW_INVALID_DATE: 'allow-invalid-date',
  SHOW_TODAY: 'show-today',
  SHOW_CLEAR: 'show-clear',
  DISABLED_DAYS_OF_WEEK: 'disabled-days-of-week',
  YEAR_RANGE: 'year-range',
  LOCALE: 'locale',
  CALENDAR_TEXT: 'calendar-text'
};

const attributes = {
  TOGGLE: 'forge-date-picker-toggle'
};

const selectors = {
  INPUT: 'input',
  TOGGLE: '[forge-date-picker-toggle],[data-forge-date-picker-toggle]'
};

const defaults = {
  DATE_FORMAT: 'MM/DD/YYYY' as DatePickerDateFormat
};

const supportedDateFormats: DatePickerDateFormat[] = [
  'MM/DD/YYYY',
  'MM/DD/YY',
  'DD/MMM/YYYY',
  'MM-DD-YYYY',
  'MM-DD-YY',
  'DD-MMM-YYYY',
  'YYYY-MM-DD',
  'YYYY-MMM-DD',
  'DD.MM.YYYY',
  'DD.MM.YY'
];

export const BASE_DATE_PICKER_CONSTANTS = {
  observedAttributes,
  attributes,
  selectors,
  defaults,
  supportedDateFormats
};
