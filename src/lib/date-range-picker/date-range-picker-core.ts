import { isDate, isValidDate, Platform } from '@tylertech/forge-core';
import { CalendarMode, DateRange, ICalendarDateSelectEventData } from '../calendar';
import { isSameDate } from '../core/utils/date-utils';
import { IDateInputMaskOptions } from '../core/mask/date-input-mask';
import { BaseDatePickerCore, IBaseDatePickerCore } from '../date-picker/base/base-date-picker-core';
import { IDateRangePickerAdapter } from './date-range-picker-adapter';
import { DatePickerRange, DATE_RANGE_PICKER_CONSTANTS, IDatePickerRange, IDateRangePickerChangeEventData } from './date-range-picker-constants';

export interface IDateRangePickerCore extends IBaseDatePickerCore<IDatePickerRange> {
  from: Date | string | null | undefined;
  to: Date | string | null | undefined;
}

export class DateRangePickerCore extends BaseDatePickerCore<IDateRangePickerAdapter, IDatePickerRange> implements IDateRangePickerCore {
  protected _mode: CalendarMode = 'range';
  private _from?: Date | null = null;
  private _to?: Date | null = null;
  private _toInputListener: (evt: Event) => void;
  private _toInputKeydownListener: (evt: KeyboardEvent) => void;
  private _toInputFocusListener: (evt: FocusEvent) => void;
  private _toInputBlurListener: (evt: FocusEvent) => void;
  private _toInputValueChangedListener: (value: string) => void;

  constructor(adapter: IDateRangePickerAdapter) {
    super(adapter);
    this._toInputListener = evt => this._onToInput(evt);
    this._toInputValueChangedListener = value => this._onToInputValueChanged(value);
    this._toInputKeydownListener = evt => this._onInputKeydown(evt);
    this._toInputFocusListener = evt => this._onToInputFocus();
    this._toInputBlurListener = evt => this._onToInputBlur(evt);
  }

  public override initialize(): void {
    super.initialize();
    this._setFormattedToInputValue(true);
  }

  protected _initializeState(): void {
    this._applyToMask();

    if (!this._from) {
      this._from = this._coerceDateValue(this._adapter.getInputValue());
    }
    if (!this._to) {
      this._to = this._coerceDateValue(this._adapter.getToInputValue());
    }
  }

  protected override _initializeListeners(): void {
    super._initializeListeners();
    this._adapter.addToInputListener('keydown', this._toInputKeydownListener);
    this._adapter.addToInputListener('focus', this._toInputFocusListener);
    this._adapter.addToInputListener('blur', this._toInputBlurListener);
  }

  protected override _initializeValueChangedListeners(): void {
    super._initializeValueChangedListeners();
    this._adapter.setToInputValueChangedListener(this, this._toInputValueChangedListener);
  }

  protected override _setInputChangeListeners(): void {
    super._setInputChangeListeners();
    this._adapter.addToInputListener('input', this._toInputListener);
  }

  protected override _removeInputChangeListeners(): void {
    super._removeInputChangeListeners();
    this._adapter.removeToInputListener('input', this._toInputListener);
  }

  protected override _openCalendar(emitOpenEvent?: boolean): void {
    this._formatToInputValue();
    super._openCalendar(emitOpenEvent);

    const currentValue = this._getCurrentValue();
    if (!!currentValue?.to) {
      this._adapter.goToCalendarDate(new Date(currentValue.to));
    } else if (!!currentValue?.from) {
      this._adapter.goToCalendarDate(new Date(currentValue.from));
    }
  }

  protected _emitChangeEvent(value: DateRange | null | undefined, force?: boolean): boolean {
    const typedStartValue = this._getTypedValue((value && value.from) || null);
    const typedEndValue = this._getTypedValue((value && value.to) || null);
    const rangeName = (value && value.rangeName) || null;
    const detail: IDateRangePickerChangeEventData = new DatePickerRange({ from: typedStartValue, to: typedEndValue, rangeName });
    const wasCancelled = !this._adapter.emitHostEvent(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, detail, true, !force);
    if (!wasCancelled) {
      this._setValue(this._coerceDateValue((value && value.from) || null));
      this._setToValue(this._coerceDateValue((value && value.to) || null));
      return true;
    }
    return false;
  }

  protected _emitOpenEvent(): void {
    this._adapter.emitHostEvent(DATE_RANGE_PICKER_CONSTANTS.events.OPEN, undefined, false);
  }

  protected _emitCloseEvent(): void {
    this._adapter.emitHostEvent(DATE_RANGE_PICKER_CONSTANTS.events.CLOSE, undefined, false);
  }

  protected _onToday(): void {
    this._onClear();
    const today = new Date();
    const todayFrom = new Date();
    todayFrom.setHours(0, 0, 0, 0);
    this._tryMergeCurrentTime({ from: today });
    const range = this._open
      ? new DateRange({ from: this._from || todayFrom, to: this._to || today, rangeName: 'today' })
      : new DateRange({ from: todayFrom, to: today, rangeName: 'today' });
    if (!this._isDateRangeAcceptable(range)) {
      return;
    }
    this.value = range;
    this._onDateSelected({ date: today, range, selected: true, type: 'date' });
    this._adapter.setCalendarActiveDate(today);
  }

  protected _onYesterday(): void {
    this._onClear();
    const today = new Date();
    const yesterdayFrom = new Date(today.setDate(today.getDate() - 1));
    yesterdayFrom.setHours(0, 0, 0, 0);
    const yesterdayTo = new Date(yesterdayFrom);
    yesterdayTo.setHours(23, 59, 59, 0);

    this._tryMergeCurrentTime({ from: yesterdayFrom, to: yesterdayTo });
    const range = this._open
      ? new DateRange({ from: this._from || yesterdayFrom, to: this._to || yesterdayTo, rangeName: 'yesterday' })
      : new DateRange({ from: yesterdayFrom, to: yesterdayTo, rangeName: 'yesterday' });
    if (!this._isDateRangeAcceptable(range)) {
      return;
    }
    this.value = range;
    this._onDateSelected({ date: yesterdayFrom, range, selected: true, type: 'date' });
    this._adapter.setCalendarActiveDate(yesterdayFrom);
  }

  protected _onLastSevenDays(): void {
    this._onClear();
    const today = new Date();
    const lastSevenDaysFrom = new Date(today.setDate(today.getDate() - 7));
    lastSevenDaysFrom.setHours(0, 0, 0, 0);
    const lastSevenDaysTo = new Date();
    lastSevenDaysTo.setHours(23, 59, 59, 0);

    this._tryMergeCurrentTime({ from: lastSevenDaysFrom, to: lastSevenDaysTo });
    const range = this._open
      ? new DateRange({ from: this._from || lastSevenDaysFrom, to: this._to || lastSevenDaysTo, rangeName: 'last 7 days' })
      : new DateRange({ from: lastSevenDaysFrom, to: lastSevenDaysTo, rangeName: 'last 7 days' });
    if (!this._isDateRangeAcceptable(range)) {
      return;
    }
    this.value = range;
    this._onDateSelected({ date: lastSevenDaysFrom, range, selected: true, rangeSelectionState: 'from', type: 'date' });
    this._onDateSelected({ date: lastSevenDaysTo, range, selected: true, rangeSelectionState: 'to', type: 'date' });
  }

  protected _onLastThirtyDays(): void {
    this._onClear();
    const today = new Date();
    const lastThirtyDaysFrom = new Date(today.setDate(today.getDate() - 30));
    lastThirtyDaysFrom.setHours(0, 0, 0, 0);
    const lastThirtyDaysTo = new Date();
    lastThirtyDaysTo.setHours(23, 59, 59, 0);

    this._tryMergeCurrentTime({ from: lastThirtyDaysFrom, to: lastThirtyDaysTo });
    const range = this._open
      ? new DateRange({ from: this._from || lastThirtyDaysFrom, to: this._to || lastThirtyDaysTo, rangeName: 'last 30 days' })
      : new DateRange({ from: lastThirtyDaysFrom, to: lastThirtyDaysTo, rangeName: 'last 30 days' });
    if (!this._isDateRangeAcceptable(range)) {
      return;
    }
    this.value = range;
    this._onDateSelected({ date: lastThirtyDaysFrom, range, selected: true, rangeSelectionState: 'from', type: 'date' });
    this._onDateSelected({ date: lastThirtyDaysTo, range, selected: true, rangeSelectionState: 'to', type: 'date' });
  }

  protected _onClear(): void {
    this._onDateSelected({ date: null, range: new DateRange(), selected: false, type: 'date' });
    this._closeCalendar(true);
  }

  protected _getCurrentValue(): IDatePickerRange | null | undefined {
    return this._value;
  }

  private _applyToMask(): void {
    if (this._masked) {
      this._initializeToMask();
    } else {
      this._adapter.destroyToMask();
      this._formatToInputValue();
    }
  }

  private _formatToInputValue(): void {
    const inputValue = this._adapter.getToInputValue();
    if (inputValue) {
      const parsedDate = this._parseDateString(inputValue);
      if (isValidDate(parsedDate) && this._isDateValueAcceptable(parsedDate)) {
        const formattedDate = this._formatDate(parsedDate);
        if (formattedDate) {
          this._adapter.setToInputValue(formattedDate, this._notifyInputValueChanges);
        }
      } else {
        if (!this._allowInvalidDate) {
          this._adapter.setToInputValue('', this._notifyInputValueChanges);
        }
      }
    }
  }

  protected _setFormattedInputValue(suppressValueChanges?: boolean): void {
    let formattedDate = this._formatDate(this._from);
    if (!formattedDate && !this._allowInvalidDate) {
      formattedDate = '';
    }
    this._adapter.setInputValue(formattedDate, suppressValueChanges ? false : this._notifyInputValueChanges);
  }

  private _setFormattedToInputValue(suppressValueChanges?: boolean): void {
    let formattedDate = this._formatDate(this._to);
    if (!formattedDate && !this._allowInvalidDate) {
      formattedDate = '';
    }
    this._adapter.setToInputValue(formattedDate, suppressValueChanges ? false : this._notifyInputValueChanges);
  }

  protected _isDateRangeAcceptable(value?: DateRange | null | undefined): boolean {
    if (!value?.to) {
      return true;
    }

    const passesMinDate = (): boolean => this._isDateValueAcceptable(value.from);
    const passesMaxDate = (): boolean => this._isDateValueAcceptable(value.to);
    const passesDateRange = (): boolean => (value?.from && value?.to ? value.from.getTime() <= value.to.getTime() : true);

    return passesMinDate() && passesMaxDate() && passesDateRange();
  }

  protected _setValue(value: Date | null | undefined): void {
    if (this._isDateValueAcceptable(value)) {
      this._from = value || null;
      if (!this._value) {
        this._value = { from: this._from, to: this._to };
      } else {
        this._value.from = this._from;
      }
    }
  }

  private _setToValue(value: Date | null | undefined): void {
    if (this._isDateValueAcceptable(value)) {
      this._to = value || null;
      if (!this._value) {
        this._value = { from: this._from, to: this._to };
      } else {
        this._value.to = this._to;
      }
    }
  }

  protected _onDateSelected(event: ICalendarDateSelectEventData): void {
    const value = event.range;

    if (event.rangeSelectionState === 'to') {
      this._closeCalendar(true);
    }

    this._tryMergeCurrentTime(value);

    if (!this._emitChangeEvent(value ?? null)) {
      return;
    }

    const formattedFromValue = this._formatDate((value && value.from) || null);
    const formattedToValue = this._formatDate((value && value.to) || null);
    this._adapter.setInputValue(formattedFromValue, this._notifyInputValueChanges);
    this._adapter.setToInputValue(formattedToValue, this._notifyInputValueChanges);
    this._formatInputValue();
    this._formatToInputValue();

    this._from = (value && value.from) || null;
    this._to = (value && value.to) || null;

    if (!Platform.isMobile) {
      if (formattedToValue) {
        this._adapter.selectToInputText();
      } else {
        this._adapter.selectInputText();
      }
    }
  }

  protected override _applyMin(): void {
    if (this._from && !this._isDateValueAcceptable(this._from)) {
      this._emitChangeEvent(new DateRange({ to: this._to || undefined }), true);
      this._setFormattedInputValue();
    }
    if (this._to && !this._isDateValueAcceptable(this._to)) {
      this._emitChangeEvent(new DateRange({ from: this._from || undefined }), true);
      this._setFormattedToInputValue();
    }
    super._applyMin();
  }

  protected override _applyMax(): void {
    if (this._from && !this._isDateValueAcceptable(this._from)) {
      this._emitChangeEvent(new DateRange({ to: this._to || undefined }), true);
      this._setFormattedInputValue();
    }
    if (this._to && !this._isDateValueAcceptable(this._to)) {
      this._emitChangeEvent(new DateRange({ from: this._from || undefined }), true);
      this._setFormattedToInputValue();
    }
    super._applyMax();
  }

  protected _initializeToMask(): void {
    if (!this._masked) {
      return;
    }

    const options: IDateInputMaskOptions = {
      showMaskFormat: this._showMaskFormat && this._adapter.isInputFocused(),
      pattern: this._maskFormat,
      onChange: (value: string) => this._handleToInput(value)
    };

    if (this._prepareMaskCallback) {
      options.prepareCallback = (value, masked, flags, maskInstance) => {
        return this._prepareMaskCallback.call(null, value, masked, flags, maskInstance);
      };
    }

    this._adapter.initializeToMask(options);
  }

  protected _applyDisabledDates(): void {
    if (this._from && !this._isDateValueAcceptable(this._from)) {
      this._emitChangeEvent(new DateRange({ to: this._to || undefined }), true);
      this._setFormattedInputValue();
    }
    if (this._to && !this._isDateValueAcceptable(this._to)) {
      this._emitChangeEvent(new DateRange({ from: this._from || undefined }), true);
      this._setFormattedToInputValue();
    }
  }

  protected _applyDisabledDaysOfWeek(): void {
    if (this._from && !this._isDateValueAcceptable(this._from)) {
      this._emitChangeEvent(null, true);
      this._setFormattedInputValue();
    }
    if (this._to && !this._isDateValueAcceptable(this._to)) {
      this._emitChangeEvent(null, true);
      this._setFormattedToInputValue();
    }
  }

  private _onToInput(evt: Event): void {
    this._handleInput(this._adapter.getInputValue());
  }

  protected _handleInput(value: string): void {
    const sanitizedValue = this._getSanitizedDateString(value);
    const date = this._coerceDateValue(sanitizedValue);
    this._tryMergeCurrentTime({ from: date as Date | undefined });
    if (this._masked) {
      this._adapter.emitInputEvent(DATE_RANGE_PICKER_CONSTANTS.events.INPUT, sanitizedValue);
    }
    if (!isSameDate(date, this._from) && this._isDateValueAcceptable(date)) {
      this._emitChangeEvent(new DateRange({ from: date || undefined, to: this._to || undefined }));
    }
  }

  private _handleToInput(value: string): void {
    const sanitizedValue = this._getSanitizedDateString(value);
    const date = this._coerceDateValue(sanitizedValue);
    this._tryMergeCurrentTime({ to: date as Date | undefined });
    if (this._masked) {
      this._adapter.emitToInputEvent(DATE_RANGE_PICKER_CONSTANTS.events.INPUT, sanitizedValue);
    }
    if (!isSameDate(date, this._to) && this._isDateValueAcceptable(date)) {
      this._emitChangeEvent(new DateRange({ from: this._from || undefined, to: date || undefined }));
    }
  }

  private _onToInputFocus(): void {
    if (this.masked && this._showMaskFormat) {
      this._initializeMask();
      this._initializeToMask();
    }
    this._adapter.selectToInputText();
  }

  private _onToInputBlur(evt: FocusEvent): void {
    if (this._masked && !this._adapter.isInputFocused(evt.relatedTarget)) {
      this._initializeMask();
      this._initializeToMask();
    }

    this._formatToInputValue();

    if (this._open) {
      this._closeCalendar(true);
    }
  }

  protected override _onInputFocus(evt: FocusEvent): void {
    if (this.masked && this._showMaskFormat) {
      this._initializeMask();
      this._initializeToMask();
    }
    this._adapter.selectInputText();
  }

  protected override _onInputBlur(evt: FocusEvent): void {
    if (this.masked && !this._adapter.isInputFocused(evt.relatedTarget)) {
      this._initializeMask();
      this._initializeToMask();
    }

    this._formatInputValue();

    if (this._open && !this._adapter.isInputFocused(evt.relatedTarget)) {
      this._closeCalendar(true);
    }
  }

  protected _onInputValueChanged(value: string): void {
    if (this._masked) {
      return;
    }
    const sanitizedValue = this._getSanitizedDateString(value);
    const date = this._coerceDateValue(sanitizedValue);
    if (!isSameDate(date, this._from)) {
      this.from = date;
      this._emitChangeEvent(new DateRange({ from: date || undefined, to: this._to || undefined }));
    }
  }

  private _onToInputValueChanged(value: string): void {
    if (this._masked) {
      return;
    }
    const sanitizedValue = this._getSanitizedDateString(value);
    const date = this._coerceDateValue(sanitizedValue);
    if (!isSameDate(date, this._to)) {
      this.to = date;
      this._emitChangeEvent(new DateRange({ from: this._from || undefined, to: date || undefined }));
    }
  }

  private _tryMergeCurrentTime(range: Partial<DateRange> | null | undefined): void {
    if (!range || !this._value || (!this._value.from && !this._value.to)) {
      return;
    }

    if (range.from && this._value.from && this._value.from instanceof Date) {
      range.from.setHours(this._value.from.getHours(), this._value.from.getMinutes(), this._value.from.getSeconds(), this._value.from.getMilliseconds());
    }

    if (range.to && this._value.to && this._value.to instanceof Date) {
      range.to.setHours(this._value.to.getHours(), this._value.to.getMinutes(), this._value.to.getSeconds(), this._value.to.getMilliseconds());
    }
  }

  public get value(): IDatePickerRange | null | undefined {
    return { from: this.from, to: this.to };
  }
  public set value(value: IDatePickerRange | null | undefined) {
    if (!value) {
      value = { from: null, to: null };
    }

    if (value.from === undefined) {
      value.from = null;
    }

    if (value.to === undefined) {
      value.to = null;
    }

    this.from = value.from;
    this.to = value.to;

    this._value = { from: this.from, to: this.to };
  }

  public get from(): Date | string | null | undefined {
    const date = this._getTypedValue(this._from);

    if (!date) {
      return null;
    }

    if (isDate(date)) {
      return new Date(date.getTime());
    }

    return date;
  }
  public set from(value: Date | string | null | undefined) {
    if (this._from !== value) {
      this._setValue(this._coerceDateValue(value));
      if (this._isInitialized) {
        this._setFormattedInputValue();
        if (this._open) {
          this._adapter.setCalendarValue(
            new DateRange({
              from: this._coerceDateValue(value) || undefined,
              to: this._coerceDateValue(this._to) || undefined
            })
          );
        }
      }
    }
  }

  public get to(): Date | string | null | undefined {
    const date = this._getTypedValue(this._to);

    if (!date) {
      return null;
    }

    if (isDate(date)) {
      return new Date(date.getTime());
    }

    return date;
  }
  public set to(value: Date | string | null | undefined) {
    if (this._to !== value) {
      this._setToValue(this._coerceDateValue(value));
      if (this._isInitialized) {
        this._setFormattedToInputValue();
        if (this._open) {
          this._adapter.setCalendarValue(
            new DateRange({
              to: this._coerceDateValue(value) || undefined,
              from: this._coerceDateValue(this._from) || undefined
            })
          );
        }
      }
    }
  }
}
