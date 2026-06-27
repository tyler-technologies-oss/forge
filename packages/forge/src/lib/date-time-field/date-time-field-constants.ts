import { COMPONENT_NAME_PREFIX } from '../constants.js';
import type { DateTimePickerPublicValue } from '../date-time-picker/date-time-picker-constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}date-time-field`;

const observedAttributes = {
  DATE_MODE: 'date-mode',
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
  POPOVER_PLACEMENT: 'popover-placement',
  PICKER: 'picker'
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
  TO_DATE_INPUT: 'to-date-input',
  DURATION: 'duration'
} as const;

const events = {
  CHANGE: `${elementName}-change`,
  OPEN: `${elementName}-open`,
  CLOSE: `${elementName}-close`
} as const;

const defaultValues = {
  DATE_MODE: 'single',
  TIME_MODE: 'single',
  VALUE_MODE: 'temporal',
  REQUIRED_PARTS: 'both',
  POPOVER_PLACEMENT: 'bottom-start'
} as const;

const messages = {
  END_BEFORE_START: 'End must be after start.'
} as const;

export const DATE_TIME_FIELD_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  slots,
  parts,
  events,
  defaultValues,
  MESSAGES: messages
};

export type DateTimeFieldDateMode = 'single' | 'range';

export type DateTimeFieldRequiredParts = 'both' | 'date' | 'time';

export interface IDateTimeFieldChangeEventData {
  value: DateTimePickerPublicValue;
  complete: boolean;
}

export type DateTimeFieldChangeEvent = CustomEvent<IDateTimeFieldChangeEventData>;
