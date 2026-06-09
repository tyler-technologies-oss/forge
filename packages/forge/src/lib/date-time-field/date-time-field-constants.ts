import { COMPONENT_NAME_PREFIX } from '../constants.js';
import type { DateTimePickerPublicValue } from '../date-time-picker/date-time-picker-constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}date-time-field`;

const observedAttributes = {
  TIME_MODE: 'time-mode',
  VALUE_MODE: 'value-mode',
  NAME: 'name',
  LABEL: 'label',
  PLACEHOLDER: 'placeholder',
  DISABLED: 'disabled',
  READONLY: 'readonly',
  REQUIRED: 'required',
  REQUIRED_PARTS: 'required-parts',
  OPEN: 'open',
  PERSISTENT: 'persistent',
  LOCALE: 'locale',
  USE_24_HOUR_TIME: 'use-24-hour-time',
  ALLOW_SECONDS: 'allow-seconds',
  MIN: 'min',
  MAX: 'max',
  MIN_TIME: 'min-time',
  MAX_TIME: 'max-time',
  STEP: 'step',
  POPOVER_PLACEMENT: 'popover-placement'
} as const;

const attributes = {
  ...observedAttributes
} as const;

const slots = {
  LABEL: 'label',
  SUPPORT_TEXT: 'support-text',
  SUPPORT_TEXT_END: 'support-text-end'
} as const;

const parts = {
  FIELD: 'field',
  INPUT: 'input',
  TOGGLE: 'toggle',
  POPOVER: 'popover',
  PICKER: 'picker'
} as const;

const events = {
  CHANGE: `${elementName}-change`,
  OPEN: `${elementName}-open`,
  CLOSE: `${elementName}-close`
} as const;

const defaultValues = {
  TIME_MODE: 'single',
  VALUE_MODE: 'temporal',
  REQUIRED_PARTS: 'both',
  POPOVER_PLACEMENT: 'bottom-start'
} as const;

export const DATE_TIME_FIELD_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  slots,
  parts,
  events,
  defaultValues
};

/** Which segment(s) must be filled for the field to be valid when `required` is set. */
export type DateTimeFieldRequiredParts = 'both' | 'date' | 'time';

export interface IDateTimeFieldChangeEventData {
  value: DateTimePickerPublicValue;
  complete: boolean;
}

export type DateTimeFieldChangeEvent = CustomEvent<IDateTimeFieldChangeEventData>;
