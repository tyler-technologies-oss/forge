import { isDate, Platform } from '@tylertech/forge-core';
import { CalendarMode, ICalendarDateSelectEventData } from '../calendar';
import { isSameDate } from '../core';
import { BaseDatePickerFoundation, IBaseDatePickerFoundation } from './base/base-date-picker-foundation';
import { IDatePickerAdapter } from './date-picker-adapter';
import { DATE_PICKER_CONSTANTS } from './date-picker-constants';

export interface IDatePickerFoundation extends IBaseDatePickerFoundation<Date | string> {}

export class DatePickerFoundation extends BaseDatePickerFoundation<IDatePickerAdapter, Date | string | null, Date> implements IDatePickerFoundation {
  protected _mode: CalendarMode = 'single';

  constructor(adapter: IDatePickerAdapter) {
    super(adapter);
  }

  protected _initializeState(): void {
    if (!this._value) {
      this._value = this._coerceDateValue(this._adapter.getInputValue());
    }
  }

  protected _emitChangeEvent(value: Date | null, force?: boolean): boolean {
    const typedValue = this._getTypedValue(value);
    const wasCancelled = !this._adapter.emitHostEvent(DATE_PICKER_CONSTANTS.events.CHANGE, typedValue, true, !force);
    if (!wasCancelled) {
      this._setValue(value);
      return true;
    }
    return false;
  }

  protected _emitOpenEvent(): void {
    this._adapter.emitHostEvent(DATE_PICKER_CONSTANTS.events.OPEN, undefined, false);
  }

  protected _emitCloseEvent(): void {
    this._adapter.emitHostEvent(DATE_PICKER_CONSTANTS.events.CLOSE, undefined, false);
  }

  protected _onToday(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this._onDateSelected({ date: today, selected: true, type: 'date' });
  }

  protected _onClear(): void {
    this._onDateSelected({ date: null, selected: false, type: 'date' });
  }

  protected _getCurrentValue(): Date | null {
    return this._value;
  }

  protected _setFormattedInputValue(suppressValueChanges?: boolean): void {
    const formattedDate = this._formatDate(this._value);
    if (formattedDate) {
      this._adapter.setInputValue(formattedDate, suppressValueChanges ? false : this._notifyInputValueChanges);
    } else {
      if (!this._allowInvalidDate) {
        this._adapter.setInputValue('', suppressValueChanges ? false : this._notifyInputValueChanges);
      }
    }
  }

  protected _setValue(value: Date | null): void {
    if (!value || this._isDateValueAcceptable(value)) {
      this._value = value;
    }
  }

  protected _onDateSelected(event: ICalendarDateSelectEventData): void {
    const value = event.date;

    if (event.type === 'date') {
      this._closeCalendar(true);
    }
    
    if (!this._emitChangeEvent(value)) {
      return;
    }

    const formattedValue = this._formatDate(value);

    this._adapter.setInputValue(formattedValue, this._notifyInputValueChanges);
    this._formatInputValue();

    if (!Platform.isMobile) {
      this._adapter.selectInputText();
    }
  }

  protected override _openCalendar(emitOpenEvent?: boolean): void {
    super._openCalendar(emitOpenEvent);

    const currentValue = this._getCurrentValue();
    if (!!currentValue) {
      this._adapter.goToCalendarDate(new Date(currentValue));
    }
  }

  protected override _applyMin(): void {
    if (this._value && !this._isDateValueAcceptable(this._value)) {
      this._emitChangeEvent(null, true);
      this._setFormattedInputValue();
    }
    super._applyMin();
  }

  protected override _applyMax(): void {
    if (this._value && !this._isDateValueAcceptable(this._value)) {
      this._emitChangeEvent(null, true);
      this._setFormattedInputValue();
    }
    super._applyMax();
  }

  protected _applyDisabledDates(): void {
    if (this._value && !this._isDateValueAcceptable(this._value)) {
      this._emitChangeEvent(null, true);
      this._setFormattedInputValue();
    }
  }

  protected _applyDisabledDaysOfWeek(): void {
    if (this._value && !this._isDateValueAcceptable(this._value)) {
      this._emitChangeEvent(null, true);
      this._setFormattedInputValue();
    }
  }

  protected _handleInput(value: string): void {
    const sanitizedValue = this._getSanitizedDateString(value);
    const date = this._coerceDateValue(sanitizedValue);
    if (this._masked) {
      this._adapter.emitInputEvent(DATE_PICKER_CONSTANTS.events.INPUT, sanitizedValue);
    }
    if (!isSameDate(date, this._value) && this._isDateValueAcceptable(date)) {
      this._emitChangeEvent(date);
    }
  }

  protected _onInputValueChanged(value: string): void {
    const sanitizedValue = this._getSanitizedDateString(value);
    if (this._masked && sanitizedValue) {
      // If masked, allow clearing value by setting input.value directly
      // To set a date value, dispatch `input` event and mask will handle it.
      return;
    }
    const date = this._coerceDateValue(sanitizedValue);
    if (!isSameDate(date, this._value) && this._isDateValueAcceptable(date)) {
      this.value = date;
      this._emitChangeEvent(this._value);
    }
  }

  private _applyValue(): void {
    this._setFormattedInputValue();
    if (this._open) {
      this._adapter.setCalendarValue(this._value);
    }
  }

  public get value(): Date | string | null {
    const date = this._getTypedValue(this._value);

    if (!date) {
      return null;
    }

    if (isDate(date)) {
      return new Date(date.getTime());
    }

    return date;
  }

  public set value(value: Date | string | null) {
    if (this._value !== value) {
      this._setValue(this._coerceDateValue(value));
      if (this._isInitialized) {
        this._applyValue();
      }
    }
  }
}
