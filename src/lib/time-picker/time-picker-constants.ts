import { COMPONENT_NAME_PREFIX } from '../constants';
import { IListDropdownOption } from '../list-dropdown/list-dropdown-constants';
import IMask, { Masked, InputMask } from 'imask';

const elementName = `${COMPONENT_NAME_PREFIX}time-picker`;

const attributes = {
  TOGGLE: 'forge-time-picker-toggle',
  VALUE: 'value',
  OPEN: 'open',
  ALLOW_SECONDS: 'allow-seconds',
  MASKED: 'masked',
  SHOW_MASK_FORMAT: 'show-mask-format',
  USE_24_HOUR_TIME: 'use-24-hour-time',
  ALLOW_INVALID_TIME: 'allow-invalid-time',
  MIN: 'min',
  MAX: 'max',
  START_TIME: 'start-time',
  STEP: 'step',
  ALLOW_INPUT: 'allow-input',
  SHOW_NOW: 'show-now',
  DISABLED: 'disabled',
  POPUP_CLASSES: 'popup-classes',
  ALLOW_DROPDOWN: 'allow-dropdown'
};

const selectors = {
  INPUT: 'input, input[forge-time-picker-input]',
  TOGGLE: `[${attributes.TOGGLE}]`
};

const events = {
  OPEN: `${elementName}-open`,
  CLOSE: `${elementName}-close`,
  INPUT: `${elementName}-input`,
  CHANGE: `${elementName}-change`
};

const numbers = {
  DEFAULT_MINUTE_STEP: 60,
  MAX_DAY_MILLIS: 86400000,
  MAX_DAY_MINUTES: 1440
};

export const TIME_PICKER_CONSTANTS = {
  elementName,
  attributes,
  selectors,
  events,
  numbers
};

export type TimePickerValidationCallback = (time: string) => boolean;
export type TimePickerParseCallback = (time: string) => number | null;
export type TimePickerFormatCallback = (value: number | null) => string;
export type TimePickerCustomOptionCallback<T> = (value: T, use24HourTime: boolean, allowSeconds: boolean) => number;
export type TimePickerCoercionCallback = (rawValue: string, coercedValue: string, allowSeconds: boolean) => string;
export type TimePickerPrepareMaskCallback = (value: string, masked: Masked<string>, flags: IMask.AppendFlags, maskInstance: InputMask<IMask.AnyMaskedOptions>) => string;

export interface ITimePickerOption<T = any> extends IListDropdownOption<T> {
  toMilliseconds: TimePickerCustomOptionCallback<T>;
}
export interface ITimePickerOptionValue {
  time: number | null;
  metadata?: any;
  isCustom?: boolean;
  customCallback?: TimePickerCustomOptionCallback<any>;
}
