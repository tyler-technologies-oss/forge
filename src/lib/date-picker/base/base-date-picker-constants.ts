import IMask, { Masked, InputMask } from 'imask';
import { DayOfWeek, ICalendarDateSelectEventData } from '../../calendar';

export declare type DatePickerParseCallback = (value: string) => Date | null;
export declare type DatePickerFormatCallback = (value: Date | null) => string;
export declare type DatePickerPrepareMaskCallback = (value: string, masked: Masked<string>, flags: IMask.AppendFlags, maskInstance: InputMask<IMask.MaskedPatternOptions>) => string;
export declare type DatePickerValueMode = 'object' | 'string' | 'iso-string';

export interface IDatePickerCalendarDropdownConfig<T> {
  value: T | null;
  min: Date | null;
  max: Date | null;
  disabledDates: Date | Date[] | null;
  popupClasses: string | string[];
  closeCallback: () => void;
  selectCallback: (value: ICalendarDateSelectEventData) => void;
  activeChangeCallback: (id: string) => void;
  disableDayCallback: (date: Date) => boolean;
  showToday: boolean;
  showClear: boolean;
  todayCallback: () => void;
  clearCallback: () => void;
  disabledDaysOfWeek: DayOfWeek[] | null;
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
  VALUE_MODE: 'value-mode',
  ALLOW_INVALID_DATE: 'allow-invalid-date',
  SHOW_TODAY: 'show-today',
  SHOW_CLEAR: 'show-clear',
  DISABLED_DAYS_OF_WEEK: 'disabled-days-of-week',
  YEAR_RANGE: 'year-range'
};

const attributes = {
  TOGGLE: 'forge-date-picker-toggle'
};

const selectors = {
  INPUT: 'input',
  TOGGLE: '[forge-date-picker-toggle],[data-forge-date-picker-toggle]'
};

export const BASE_DATE_PICKER_CONSTANTS = {
  observedAttributes,
  attributes,
  selectors
};
