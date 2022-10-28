import { coerceBoolean, ensureChild, FoundationProperty, coerceNumberArray } from '@tylertech/forge-core';
import { DayOfWeek } from '../../calendar/calendar-constants';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';
import { BASE_DATE_PICKER_CONSTANTS, DatePickerFormatCallback, DatePickerParseCallback, DatePickerPrepareMaskCallback, DatePickerValueMode } from './base-date-picker-constants';
import { BaseDatePickerFoundation } from './base-date-picker-foundation';
import { IBaseDatePickerAdapter } from './base-date-picker-adapter';

export interface IBaseDatePickerComponent<TValue> extends IBaseComponent {
  value: TValue | undefined;
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
}

export abstract class BaseDatePickerComponent<TPublicValue, TPrivateValue, TFoundation extends BaseDatePickerFoundation<IBaseDatePickerAdapter, TPublicValue, TPrivateValue>> extends BaseComponent implements IBaseDatePickerComponent<TPublicValue> {
  protected _foundation: TFoundation;

  constructor() {
    super();
  }

  public async connectedCallback(): Promise<void> {
    if (this.querySelector(BASE_DATE_PICKER_CONSTANTS.selectors.INPUT)) {
      this._foundation.initialize();
    } else {
      await ensureChild(this, BASE_DATE_PICKER_CONSTANTS.selectors.INPUT);
      this._foundation.initialize();
    }
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
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
    }
  }

  /** Gets/sets the value of the component. */
  @FoundationProperty()
  public value: TPublicValue | undefined;

  /** Gets/sets the minimum date the calendar will allow. */
  @FoundationProperty()
  public min: Date | string | null | undefined;

  /** Gets/sets the maximum date the calendar will allow. */
  @FoundationProperty()
  public max: Date | string | null | undefined;

  /** Gets/sets the dates that are restricted from being selected. */
  @FoundationProperty()
  public disabledDates: Date | Date[] | null | undefined;

  /** Gets/sets whether the calendar dropdown is open. */
  @FoundationProperty()
  public open: boolean;

  /** Gets/sets the CSS classes that are applied to the popup element. */
  @FoundationProperty()
  public popupClasses: string | string[];

  /** Gets/sets whether the date picker is disabled or not. */
  @FoundationProperty()
  public disabled: boolean;

  /** Gets/sets whether the input mask is applied or not. */
  @FoundationProperty()
  public masked: boolean;

  /** Gets/sets the mask format that displayed in the input. Default is `MM/DD/YYYY` */
  @FoundationProperty()
  public maskFormat: string;

  /** Gets/sets whether the mask format is displayed in the input or not. Only applies if `masked` is `true`. */
  @FoundationProperty()
  public showMaskFormat: boolean;

  /** Gets/sets the type for the `value` property and `forge-date-picker-change` event. */
  @FoundationProperty()
  public valueMode: DatePickerValueMode;

  /** Gets/sets whether the native input will be notified of value changes via the `input` and `change` events. */
  @FoundationProperty()
  public notifyInputValueChanges: boolean;

  /** Gets/sets whether to allow an invalid date to be input. When true, the date picker will not clear out the value of the input if the date was invalid (i.e. could not be parsed). */
  @FoundationProperty()
  public allowInvalidDate: boolean;

  /** Gets/sets whether the today button is visible in the popup. */
  @FoundationProperty()
  public showToday: boolean;

  /** Gets/sets whether the clear button is visible in the popup. */
  @FoundationProperty()
  public showClear: boolean;

  /** Sets the callback to use for parsing a date value string to a `Date` object. */
  @FoundationProperty()
  public parseCallback: DatePickerParseCallback;

  /** Sets the callback to use for formatting `Date` value to a custom string format. */
  @FoundationProperty()
  public formatCallback: DatePickerFormatCallback;

  /** Sets the callback to use when altering default mask entry. */
  @FoundationProperty()
  public prepareMaskCallback: DatePickerPrepareMaskCallback;

  /** Sets the days of the week to disable from selection. */
  @FoundationProperty()
  public disabledDaysOfWeek: DayOfWeek[];

  /** Sets the callback to use for testing whether a specific date should be disabled or not. */
  @FoundationProperty()
  public disableDayCallback: (date: Date) => boolean;

  /** Sets the year range. */
  @FoundationProperty()
  public yearRange: string;
}
