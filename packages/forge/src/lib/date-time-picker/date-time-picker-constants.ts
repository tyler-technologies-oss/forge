import { COMPONENT_NAME_PREFIX } from '../constants.js';
import type { CalendarDisabledDateBuilder, DayOfWeek } from '../calendar/calendar-constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}date-time-picker`;

const observedAttributes = {
  TIME_MODE: 'time-mode',
  VALUE: 'value',
  NAME: 'name',
  DISABLED: 'disabled',
  READONLY: 'readonly',
  REQUIRED: 'required',
  ORIENTATION: 'orientation',
  LOCALE: 'locale',
  USE_24_HOUR_TIME: 'use-24-hour-time',
  ALLOW_SECONDS: 'allow-seconds',
  MIN: 'min',
  MAX: 'max',
  MIN_TIME: 'min-time',
  MAX_TIME: 'max-time',
  STEP: 'step',
  FIRST_DAY_OF_WEEK: 'first-day-of-week',
  CLEAR_BUTTON: 'clear-button',
  TODAY_BUTTON: 'today-button',
  SHOW_HEADER: 'show-header'
} as const;

const attributes = {
  ...observedAttributes
} as const;

const slots = {
  HEADER: 'header',
  FOOTER: 'footer',
  TIME_LABEL: 'time-label',
  PREVIOUS_MONTH_BUTTON_TEXT: 'previous-month-button-text',
  NEXT_MONTH_BUTTON_TEXT: 'next-month-button-text',
  TODAY_BUTTON_TEXT: 'today-button-text',
  CLEAR_BUTTON_TEXT: 'clear-button-text'
} as const;

const parts = {
  ROOT: 'root',
  HEADER: 'header',
  BODY: 'body',
  CALENDAR_SECTION: 'calendar-section',
  CALENDAR: 'calendar',
  TIME_SECTION: 'time-section',
  TIME_LABEL: 'time-label',
  TIME_INPUTS: 'time-inputs',
  TIME_INPUT: 'time-input',
  SLOT_LIST: 'slot-list',
  SLOT: 'slot',
  SEPARATOR: 'separator',
  FOOTER: 'footer',
  LIVE_REGION: 'live-region'
} as const;

const events = {
  CHANGE: `${elementName}-change`
} as const;

const defaultValues = {
  TIME_MODE: 'single',
  ORIENTATION: 'auto',
  MIN_TIME: '09:00',
  MAX_TIME: '17:00',
  STEP: 15,
  USE_24_HOUR_TIME: false,
  ALLOW_SECONDS: false,
  SHOW_HEADER: true,
  CLEAR_BUTTON: false,
  TODAY_BUTTON: false
} as const;

export const DATE_TIME_PICKER_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  slots,
  parts,
  events,
  defaultValues
};

export type TimeMode = 'single' | 'range' | 'slots';

export type Orientation = 'auto' | 'horizontal' | 'vertical';

export type ResolvedOrientation = 'horizontal' | 'vertical';

export type ChangeSource = 'date' | 'time' | 'time-from' | 'time-to' | 'slot' | 'clear' | 'mode-change' | 'initial';

export interface ITimeSlot {
  /** Time of day as 'HH:mm' or 'HH:mm:ss' (24-hour). */
  value: string;
  /** Optional display label override. When omitted, the label is formatted from `value`. */
  label?: string;
  /** Optional flag marking the slot as unavailable. */
  disabled?: boolean;
}

export interface IDateTimePickerRange {
  from: Date;
  to: Date;
}

export type DateTimePickerValue = Date | IDateTimePickerRange | null;

export type DisableSlotCallback = (date: Date, slot: ITimeSlot) => boolean;

export interface IDateTimePickerChangeEventData {
  value: DateTimePickerValue;
  date: Date | null;
  time: string | null;
  from: string | null;
  to: string | null;
  source: ChangeSource;
  complete: boolean;
}

export type DateTimePickerChangeEvent = CustomEvent<IDateTimePickerChangeEventData>;

export type { CalendarDisabledDateBuilder, DayOfWeek };
