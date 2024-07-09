import { coerceBoolean, ensureChild, coreProperty, coerceNumberArray } from '@tylertech/forge-core';
import { DayOfWeek } from '../../calendar/calendar-constants';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';
import {
  BASE_DATE_PICKER_CONSTANTS,
  DatePickerFormatCallback,
  DatePickerParseCallback,
  DatePickerPrepareMaskCallback,
  DatePickerValueMode
} from './base-date-picker-constants';
import { BaseDatePickerCore } from './base-date-picker-core';
import { IBaseDatePickerAdapter } from './base-date-picker-adapter';

export interface IBaseDatePickerComponent<TValue> extends IBaseComponent {
  value: TValue | null | undefined;
  min: Date | string | null | undefined;
  max: Date | string | null | undefined;
  disabledDates: Date | Date[] | null | undefined;
  open: boolean;
  parseCallback: DatePickerParseCallback;
  formatCallback: DatePickerFormatCallback;
  prepareMaskCallback: DatePickerPrepareMaskCallback;
  disableDayCallback: (date: Date) => boolean;
  popupClasses: string | string[];
  disabled: boolean;
  masked: boolean;
  maskFormat: string;
  showMaskFormat: boolean;
  valueMode: DatePickerValueMode;
  notifyInputValueChanges: boolean;
  allowInvalidDate: boolean;
  showToday: boolean;
  showClear: boolean;
  disabledDaysOfWeek: DayOfWeek[];
  yearRange: string;
  locale: string | undefined;
}

/**
 * @property {boolean} [allowInvalidDate=false] - Whether to allow an invalid date to be input. When true, the date picker will not clear out the value of the input if the date was invalid (i.e. could not be parsed).
 * @property {boolean} [disabled=false] - Whether the date picker is disabled or not.
 * @property {(date: Date) => boolean} disableDayCallback - The callback to use for testing whether a specific date should be disabled or not.
 * @property {Date | Date[] | null | undefined} disabledDates - The dates that are restricted from being selected.
 * @property {DayOfWeek[]} disabledDaysOfWeek - The days of the week to disable from selection.
 * @property {DatePickerFormatCallback} formatCallback - The callback to use for formatting `Date` value to a custom string format.
 * @property {string | undefined} locale - The locale to use.
 * @property {boolean} [masked=false] - Whether the input mask is applied or not.
 * @property {string} maskFormat - The mask format that displayed in the input. Default is `MM/DD/YYYY`.
 * @property {Date | string | null | undefined} max - The maximum date the calendar will allow.
 * @property {Date | string | null | undefined} min - The minimum date the calendar will allow.
 * @property {boolean} [notifyInputValueChanges=false] - Whether the native input will be notified of value changes via the `input` and `change` events.
 * @property {boolean} [open=false] - Whether the calendar dropdown is open.
 * @property {DatePickerParseCallback} parseCallback - The callback to use for parsing a date value string to a `Date` object.
 * @property {string | string[]} popupClasses - The CSS classes that are applied to the popup element.
 * @property {DatePickerPrepareMaskCallback} prepareMaskCallback - The callback to use when altering default mask entry.
 * @property {boolean} [showClear=false] - Whether the clear button is visible in the popup.
 * @property {boolean} [showMaskFormat=false] - Whether the mask format is displayed in the input or not. Only applies if `masked` is `true`.
 * @property {boolean} [showToday=false] - Whether the today button is visible in the popup.
 * @property {TValue} value - The value of the date picker.
 * @property {DatePickerValueMode} valueMode - The type for the `value` property and `forge-date-picker-change` event.
 * @property {string} yearRange - The year range.
 *
 * @attribute {boolean} [allow-invalid-date=false] - Whether to allow an invalid date to be input. When true, the date picker will not clear out the value of the input if the date was invalid (i.e. could not be parsed).
 * @attribute {boolean} [disabled=false] - Whether the date picker is disabled or not.
 * @attribute {string} [disabled-days-of-week] - The days of the week to disable from selection.
 * @attribute {string} [locale] - The locale to use.
 * @attribute {boolean} [masked=false] - Whether the input mask is applied or not.
 * @attribute {string} [mask-format=MM/DD/YYYY] - The mask format that displayed in the input.
 * @attribute {string} [max] - The maximum date the calendar will allow.
 * @attribute {string} [min] - The minimum date the calendar will allow.
 * @attribute {boolean} [open=false] - Whether the calendar dropdown is open.
 * @attribute {string} [popup-classes] - The CSS classes that are applied to the popup element.
 * @attribute {boolean} [show-clear=false] - Whether the clear button is visible in the popup.
 * @attribute {boolean} [show-mask-format=false] - Whether the mask format is displayed in the input or not. Only applies if `masked` is `true`.
 * @attribute {boolean} [show-today=false] - Whether the today button is visible in the popup.
 * @attribute {DatePickerValueMode} [value-mode=string] - The type for the `value` property and `forge-date-picker-change` event.
 * @attribute {string} [year-range] - The year range.
 */
export abstract class BaseDatePickerComponent<
    TPublicValue,
    TPrivateValue,
    TCore extends BaseDatePickerCore<IBaseDatePickerAdapter, TPublicValue, TPrivateValue>
  >
  extends BaseComponent
  implements IBaseDatePickerComponent<TPublicValue>
{
  protected _core: TCore;

  constructor() {
    super();
  }

  public connectedCallback(): void {
    if (this.querySelector(BASE_DATE_PICKER_CONSTANTS.selectors.INPUT)) {
      this._core.initialize();
    } else {
      ensureChild(this, BASE_DATE_PICKER_CONSTANTS.selectors.INPUT).then(() => {
        this._core.initialize();
      });
    }
  }

  public disconnectedCallback(): void {
    this._core.destroy();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case BASE_DATE_PICKER_CONSTANTS.observedAttributes.MIN:
        this.min = newValue;
        break;
      case BASE_DATE_PICKER_CONSTANTS.observedAttributes.MAX:
        this.max = newValue;
        break;
      case BASE_DATE_PICKER_CONSTANTS.observedAttributes.OPEN:
        this.open = coerceBoolean(newValue);
        break;
      case BASE_DATE_PICKER_CONSTANTS.observedAttributes.POPUP_CLASSES:
        this.popupClasses = newValue;
        break;
      case BASE_DATE_PICKER_CONSTANTS.observedAttributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
      case BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASKED:
        this.masked = coerceBoolean(newValue);
        break;
      case BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_MASK_FORMAT:
        this.showMaskFormat = coerceBoolean(newValue);
        break;
      case BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASK_FORMAT:
        this.maskFormat = newValue;
        break;
      case BASE_DATE_PICKER_CONSTANTS.observedAttributes.VALUE_MODE:
        this.valueMode = newValue as DatePickerValueMode;
        break;
      case BASE_DATE_PICKER_CONSTANTS.observedAttributes.ALLOW_INVALID_DATE:
        this.allowInvalidDate = coerceBoolean(newValue);
        break;
      case BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_TODAY:
        this.showToday = coerceBoolean(newValue);
        break;
      case BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_CLEAR:
        this.showClear = coerceBoolean(newValue);
        break;
      case BASE_DATE_PICKER_CONSTANTS.observedAttributes.DISABLED_DAYS_OF_WEEK:
        this.disabledDaysOfWeek = coerceNumberArray(newValue);
        break;
      case BASE_DATE_PICKER_CONSTANTS.observedAttributes.YEAR_RANGE:
        this.yearRange = newValue;
        break;
      case BASE_DATE_PICKER_CONSTANTS.observedAttributes.LOCALE:
        this.locale = newValue;
        break;
    }
  }

  @coreProperty()
  public declare value: TPublicValue | null | undefined;

  @coreProperty()
  public declare min: Date | string | null | undefined;

  @coreProperty()
  public declare max: Date | string | null | undefined;

  @coreProperty()
  public declare disabledDates: Date | Date[] | null | undefined;

  @coreProperty()
  public declare open: boolean;

  @coreProperty()
  public declare popupClasses: string | string[];

  @coreProperty()
  public declare disabled: boolean;

  @coreProperty()
  public declare masked: boolean;

  @coreProperty()
  public declare maskFormat: string;

  @coreProperty()
  public declare showMaskFormat: boolean;

  @coreProperty()
  public declare valueMode: DatePickerValueMode;

  @coreProperty()
  public declare notifyInputValueChanges: boolean;

  @coreProperty()
  public declare allowInvalidDate: boolean;

  @coreProperty()
  public declare showToday: boolean;

  @coreProperty()
  public declare showClear: boolean;

  @coreProperty()
  public declare parseCallback: DatePickerParseCallback;

  @coreProperty()
  public declare formatCallback: DatePickerFormatCallback;

  @coreProperty()
  public declare prepareMaskCallback: DatePickerPrepareMaskCallback;

  @coreProperty()
  public declare disabledDaysOfWeek: DayOfWeek[];

  @coreProperty()
  public declare disableDayCallback: (date: Date) => boolean;

  @coreProperty()
  public declare yearRange: string;

  @coreProperty()
  public declare locale: string | undefined;
}
