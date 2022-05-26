import { ICustomElementFoundation, isValidDate, Platform } from '@tylertech/forge-core';
import { ICalendarComponent, ICalendarDropdownPopupConfig } from '../../calendar';
import { CalendarMode, DayOfWeek, ICalendarDateSelectEventData } from '../../calendar/calendar-constants';
import { DateRange } from '../../calendar/core/date-range';
import { formatDate, parseDateString } from '../../core/utils/date-utils';
import { DEFAULT_DATE_MASK, IDateInputMaskOptions } from '../../core/mask/date-input-mask';
import { IBaseDatePickerAdapter } from './base-date-picker-adapter';
import { BASE_DATE_PICKER_CONSTANTS, DatePickerFormatCallback, DatePickerParseCallback, DatePickerPrepareMaskCallback, DatePickerValueMode } from './base-date-picker-constants';

export interface IBaseDatePickerFoundation<TValue> extends ICustomElementFoundation {
  value: TValue | null;
  min: Date | string | null;
  max: Date | string | null;
  disabledDates: Date | Date[] | null;
  open: boolean;
  parseCallback: DatePickerParseCallback;
  formatCallback: DatePickerFormatCallback;
  prepareMaskCallback: DatePickerPrepareMaskCallback;
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
  yearRange: string;
}

export abstract class BaseDatePickerFoundation<TAdapter extends IBaseDatePickerAdapter, TPublicValue, TPrivateValue = TPublicValue> implements IBaseDatePickerFoundation<TPublicValue> {
  // State
  protected abstract _mode: CalendarMode;
  protected _value: TPrivateValue | null = null;
  protected _min: Date | null = null;
  protected _max: Date | null = null;
  protected _disabledDates: Date | Date[] | null = null;
  protected _open = false;
  protected _parseCallback: DatePickerParseCallback;
  protected _formatCallback: DatePickerFormatCallback;
  protected _prepareMaskCallback: DatePickerPrepareMaskCallback;
  protected _disableDayCallback: (date: Date) => boolean;
  protected _popupClasses: string | string[];
  protected _disabled = false;
  protected _masked = true;
  protected _maskFormat = DEFAULT_DATE_MASK;
  protected _showMaskFormat = false;
  protected _valueMode: DatePickerValueMode = 'object';
  protected _notifyInputValueChanges = true;
  protected _allowInvalidDate = false;
  protected _showToday = false;
  protected _showClear = false;
  protected _disabledDaysOfWeek: DayOfWeek[];
  protected _yearRange = '-50:+50';
  protected _isInitialized = false;

  // Listeners
  private _inputListener: (evt: Event) => void;
  private _inputKeydownListener: (evt: KeyboardEvent) => void;
  private _inputFocusListener: (evt: Event) => void;
  private _inputBlurListener: (evt: Event) => void;
  private _inputValueChangedListener: (value: string) => void;
  private _toggleMousedownListener: (evt: MouseEvent) => void;
  private _dropdownCloseListener: () => void;
  private _activeChangeListener: (id: string) => void;
  private _todayListener: () => void;
  private _clearListener: () => void;
  private _dateSelectListener: (evt: CustomEvent<ICalendarDateSelectEventData>) => void;
  
  constructor(protected _adapter: TAdapter) {
    this._inputListener = evt => this._onInput(evt);
    this._inputKeydownListener = evt => this._onInputKeydown(evt);
    this._inputFocusListener = evt => this._onInputFocus(evt);
    this._inputBlurListener = evt => this._onInputBlur(evt);
    this._inputValueChangedListener = value => this._onInputValueChanged(value);
    this._dropdownCloseListener = () => this._onDropdownClose();
    this._toggleMousedownListener = evt => this._onToggleMousedown(evt);
    this._dateSelectListener = evt => this._onDateSelected(evt.detail);
    this._activeChangeListener = id => this._onActiveDescendantChanged(id);
    this._todayListener = () => this._onToday();
    this._clearListener = () => this._onClear();
  }

  protected _initializeState?(): void;
  public abstract value: TPublicValue | null;
  protected abstract _emitChangeEvent(value: TPrivateValue | null, force?: boolean): boolean;
  protected abstract _emitOpenEvent(): void;
  protected abstract _emitCloseEvent(): void;
  protected abstract _onToday(): void;
  protected abstract _onClear(): void;
  protected abstract _getCurrentValue(): TPrivateValue | null;
  protected abstract _setFormattedInputValue(suppressValueChanges?: boolean): void;
  protected abstract _onInputValueChanged(value: string): void;
  protected abstract _handleInput(value: string): void;
  protected abstract _setValue(value: Date | null): void;
  protected abstract _onDateSelected(event: ICalendarDateSelectEventData): void;
  protected abstract _applyDisabledDates(): void;
  protected abstract _applyDisabledDaysOfWeek(): void;

  public initialize(): void {
    this._adapter.initialize();
    this._adapter.initializeAccessibility();

    if (!this._adapter.hasInputElement()) {
      throw new Error('Unable to locate child <input> element.');
    }

    this._initializeState?.();
    this._adapter.tryCreateToggle();

    if (!this._masked) {
      this._setInputChangeListeners();
    }

    this._initializeListeners();
    this._setFormattedInputValue(true);
    this._applyDisabled();
    this._applyMask();
    this._initializeValueChangedListeners();
    this._isInitialized = true;
  }

  public disconnect(): void {
    this._isInitialized = false;
    this._destroyListeners();

    if (this._masked) {
      this._adapter.destroyMask();
    }

    this._closeCalendar();
    this._adapter.destroy();
  }

  protected _initializeListeners(): void {
    this._adapter.addToggleListener('mousedown', this._toggleMousedownListener);
    this._adapter.addInputListener('keydown', this._inputKeydownListener, true);
    this._adapter.addInputListener('focus', this._inputFocusListener);
    this._adapter.addInputListener('blur', this._inputBlurListener);
  }

  protected _initializeValueChangedListeners(): void {
    this._adapter.setInputValueChangedListener(this, this._inputValueChangedListener);
  }

  protected _setInputChangeListeners(): void {
    this._adapter.addInputListener('input', this._inputListener);
  }

  protected _removeInputChangeListeners(): void {
    this._adapter.removeInputListener('input', this._inputListener);
  }

  protected _destroyListeners(): void {
    this._adapter.removeToggleListener('mousedown', this._toggleMousedownListener);
    this._adapter.removeInputListener('keydown', this._inputKeydownListener, true);
    this._adapter.removeInputListener('focus', this._inputFocusListener);
    this._adapter.removeInputListener('blur', this._inputBlurListener);
    this._removeInputChangeListeners();
  }

  protected _onInput(evt: Event): void {
    this._handleInput(this._adapter.getInputValue());
  }

  protected _onInputFocus(evt: Event): void {
    this._adapter.selectInputText();
  }

  protected _onInputBlur(evt: Event): void {
    this._formatInputValue();
    if (this._open && !this._adapter.isInputFocused()) {
      this._closeCalendar(true);
    }
  }

  protected _openCalendar(emitOpenEvent = false): void {
    this._formatInputValue();

    const calendarConfig: Partial<ICalendarComponent> = {
      mode: this._mode,
      value: this._getCurrentValue() as Date | Date[] | DateRange | null,
      min: this._min,
      max: this._max,
      disabledDates: this._disabledDates,
      yearRange: this._yearRange,
      todayButton: this._showToday,
      clearButton: this._showClear,
      todayCallback: this._todayListener,
      clearCallback: this._clearListener,
      disabledDateBuilder: this._disableDayCallback,
      disabledDaysOfWeek: this._disabledDaysOfWeek,
      preventFocus: true,
      menuAnimation: 'fade',
      fixedHeight: true,
      selectionFollowsMonth: true
    };
    const dropdownConfig: ICalendarDropdownPopupConfig = {
      popupClasses: this._popupClasses,
      closeCallback: this._dropdownCloseListener,
      activeChangeCallback: this._activeChangeListener
    };

    this._adapter.attachCalendar(calendarConfig, dropdownConfig);
    this._adapter.addDateSelectListener(this._dateSelectListener);
    this._open = true;
    this._adapter.setHostAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.OPEN);

    if (emitOpenEvent) {
      this._emitOpenEvent();
    }
  }

  protected _closeCalendar(emitCloseEvent = false): void {
    this._open = false;
    this._adapter.removeHostAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.OPEN);
    this._adapter.removeDateSelectListener(this._dateSelectListener);
    this._adapter.detachCalendar();
    if (emitCloseEvent) {
      this._emitCloseEvent();
    }
  }

  protected _onInputKeydown(evt: KeyboardEvent): void {
    // Handle keyboard shortcuts that make use of the shift key first
    if (evt.shiftKey) {
      switch (evt.key) {
        case 'Delete':
        case 'Backspace':
          evt.preventDefault();
          this._onClear();
          if (this._open) {
            this._closeCalendar(true);
          }
          return;
        case 'ArrowLeft':
        case 'ArrowRight':
        case 'm':
        case 'M':
        case 'y':
        case 'Y':
        case 'd':
        case 'D':
          if (this._open) {
            evt.preventDefault();
            this._adapter.propagateCalendarKey(evt);
            return;
          }
          break;
      }
    }

    switch (evt.key) {
      case 'Escape':
        evt.preventDefault();
        if (this._open) {
          this._closeCalendar(true);
        }
        break;
      case 'ArrowDown':
        evt.preventDefault();
        if (!this._open) {
          this._adapter.selectInputText();
          this._openCalendar(true);
        } else {
          this._adapter.propagateCalendarKey(evt);
        }
        break;
      case 'ArrowUp':
        if (this._open) {
          evt.preventDefault();
          this._adapter.propagateCalendarKey(evt);
        }
        break;
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'Enter':
      case 'Home':
      case 'End':
        if (this._open) {
          if (evt.key === 'Enter') {
            evt.stopPropagation();
          }
          evt.preventDefault();
          // If we have an input mask applied, we want to make sure it doesn't receive the key events for left and right keys
          const isLeftRight = ['ArrowLeft', 'ArrowRight'].includes(evt.key);
          if (this._masked && isLeftRight) {
            evt.stopImmediatePropagation();
          }
          this._adapter.propagateCalendarKey(evt);
        }
        break;
      case 'n':
      case 't':
        evt.preventDefault();
        this._onToday();
        if (this._open) {
          this._closeCalendar(true);
        }
        break;
      case 'PageUp':
      case 'PageDown':
        if (this._open) {
          evt.preventDefault();
          this._adapter.propagateCalendarKey(evt);
        }
        break;
      case 'Tab':
        if (this._open) {
          const activeDate = this._adapter.getCalendarActiveDate();
          if (activeDate) {
            this._onDateSelected({
              date: activeDate,
              selected: true,
              type: 'date'
            });
          }
        }
        break;
    }
  }

  protected _getSanitizedDateString(value: string): string {
    return value.replace(/_|[a-z]|[A-Z]/g, '').replace(/\/$|\/\/$/, '');
  }

  private _onToggleMousedown(evt: Event): void {
    if (this._disabled) {
      return;
    }

    evt.stopPropagation();

    if (this._adapter.isInputDisabled()) {
      return;
    }

    evt.preventDefault();

    if (this._open) {
      this._closeCalendar(true);
    } else {
      if (!Platform.isMobile) {
        this._adapter.tryFocusInput();
      } else {
        this._adapter.tryBlurInput();
      }

      this._openCalendar(true);
    }
  }

  private _onDropdownClose(): void {
    this._closeCalendar(true);
  }

  private _onActiveDescendantChanged(id: string): void {
    this._adapter.setActiveDescendant(id);
  }

  protected _formatInputValue(): void {
    const inputValue = this._adapter.getInputValue();
    if (inputValue) {
      const parsedDate = this._parseDateString(inputValue);
      if (isValidDate(parsedDate) && this._isDateValueAcceptable(parsedDate)) {
        const formattedDate = this._formatDate(parsedDate);
        if (formattedDate && formattedDate !== inputValue) {
          this._adapter.setInputValue(formattedDate, this._notifyInputValueChanges);
        }
      } else {
        if (!this._allowInvalidDate) {
          this._adapter.setInputValue('', this._notifyInputValueChanges);
        }
      }
    }
  }

  protected _formatDate(date: Date | null): string {
    if (!isValidDate(date)) {
      return '';
    }
    return typeof this._formatCallback === 'function' ? this._formatCallback(date) : formatDate(date);
  }

  protected _parseDateString(value: string): Date | null {
    value = value.replace(/_|\s/g, '');
    if (!value || !value.length) {
      return null;
    }
    const parsedDate = typeof this._parseCallback === 'function' ? this._parseCallback(value) : parseDateString(value);
    return isValidDate(parsedDate) ? parsedDate : null;
  }

  protected _coerceDateValue(value: Date | string | null): Date | null {
    if (typeof value === 'string') {
      return this._parseDateString(value);
    }
    return value;
  }

  protected _getTypedValue(value: Date | null): Date | string | null {
    switch (this._valueMode) {
      case 'object':
        return value;
      case 'string':
        return this._formatDate(value);
      case 'iso-string':
        if (value) {
          // Remove the time portion of the date
          value.setHours(0, 0, 0, 0);
        }
        return value ? value.toISOString() : null;
      default:
        return value;
    }
  }

  protected _isDateValueAcceptable(value: Date | null): boolean {
    if (!value) {
      return true;
    }

    const passesMinDate = (): boolean => this._min ? this._min.getTime() <= value.getTime() : true;
    const passesMaxDate = (): boolean => this._max ? this._max.getTime() >= value.getTime() : true;
    const disabledDates = (): Date[] => Array.isArray(this._disabledDates) ? this._disabledDates : this._disabledDates ? [this._disabledDates] : [];
    const isNotDisabled = (): boolean => !disabledDates().some(bd => bd.getTime() === value.getTime());
    const dayNotDisabled = (): boolean => !(this._disabledDaysOfWeek && this._disabledDaysOfWeek.includes(value.getDay()));
    const dateNotDisabledThroughCallback = (): boolean => typeof this._disableDayCallback !== 'function' || !this._disableDayCallback(value);

    return passesMinDate() && passesMaxDate() && isNotDisabled() && dayNotDisabled() && dateNotDisabledThroughCallback();
  }

  protected _initializeMask(): void {
    const options: IDateInputMaskOptions = {
      showMaskFormat: this._showMaskFormat,
      pattern: this._maskFormat,
      onChange: (value: string) => this._handleInput(value)
    };

    if (this._prepareMaskCallback) {
      options.prepareCallback = (value, masked, flags, maskInstance) => {
        return this._prepareMaskCallback.call(null, value, masked, flags, maskInstance);
      };
    }

    this._adapter.initializeMask(options);
  }

  private _applyMask(): void {
    if (this._masked) {
      this._initializeMask();
    } else {
      this._adapter.destroyMask();
      this._formatInputValue();
    }
  }

  protected _applyMin(): void {
    if (this._isInitialized) {
      this._adapter.setCalendarMinDate(this._min);
    }
  }
  protected _applyMax(): void {
    if (this._isInitialized) {
      this._adapter.setCalendarMaxDate(this._max);
    }
  }

  private _applyDisableDayCallback(): void {
    this._adapter.setCalendarDisableDayCallback(this._disableDayCallback);
  }

  private _applyDisabled(): void {
    this._adapter.setDisabled(this._disabled);
  }

  public get valueMode(): DatePickerValueMode {
    return this._valueMode;
  }
  public set valueMode(value: DatePickerValueMode) {
    if (this._valueMode !== value) {
      const isValidMode = ['object', 'string', 'iso-string'].includes(value);
      if (!isValidMode) {
        return;
      }
      this._valueMode = value;
      this._emitChangeEvent(this._value);
      this._adapter.setHostAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.VALUE_MODE, this._valueMode);
    }
  }

  public get min(): Date | string | null {
    return this._min ? new Date(this._min.getTime()) : null;
  }
  public set min(value: Date | string | null) {
    if (this._min !== value) {
      const date = this._coerceDateValue(value);
      this._min = !!date ? new Date(date.getTime()) : null;
      this._applyMin();

      if (this._isInitialized && this._open) {
        this._adapter.setCalendarMinDate(this._min);
      }
    }
  }

  public get max(): Date | string | null {
    return this._max ? new Date(this._max.getTime()) : null;
  }
  public set max(value: Date | string | null) {
    if (this._max !== value) {
      this._max = this._coerceDateValue(value);
      this._applyMax();

      if (this._isInitialized && this._open) {
        this._adapter.setCalendarMaxDate(this._max);
      }
    }
  }

  public get open(): boolean {
    return this._open;
  }
  public set open(value: boolean) {
    if (this._open !== value) {
      if (this._isInitialized) {
        this._open = value;
        if (this._open) {
          this._openCalendar();
        } else {
          this._closeCalendar();
        }
      }
    }
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      if (this._isInitialized) {
        this._applyDisabled();
      }
    }
  }

  public get disabledDates(): Date | Date[] | null {
    if (!this._disabledDates) {
      return null;
    }

    if (Array.isArray(this._disabledDates)) {
      return this._disabledDates.map(d => new Date(d.getTime()));
    }

    return new Date(this._disabledDates.getTime());
  }

  public set disabledDates(value: Date | Date[] | null) {
    if (!value) {
      this._disabledDates = null;
    } else if (Array.isArray(value)) {
      this._disabledDates = value.map(d => new Date(d.getTime()));
    } else {
      this._disabledDates = new Date(value.getTime());
    }

    if (this._isInitialized && this._open) {
      this._adapter.setCalendarDisabledDates(this._disabledDates);
    }

    this._applyDisabledDates();
  }

  public get popupClasses(): string | string[] {
    if (Array.isArray(this._popupClasses)) {
      return [...this._popupClasses];
    }

    return this._popupClasses;
  }
  public set popupClasses(value: string | string[]) {
    if (Array.isArray(value)) {
      this._popupClasses = [...value];
    } else {
      this._popupClasses = value;
    }
  }

  public get masked(): boolean {
    return this._masked;
  }
  public set masked(value: boolean) {
    if (this._masked !== value) {
      this._masked = value;
      if (this._isInitialized) {
        if (this._masked) {
          this._removeInputChangeListeners();
          this._applyMask();
        } else {
          this._adapter.destroyMask();
          this._setInputChangeListeners();
          this._formatInputValue();
        }
      }
    }
  }

  public get maskFormat(): string {
    return this._maskFormat;
  }
  public set maskFormat(value: string) {
    if (this._maskFormat !== value) {
      this._maskFormat = value;
      if (this._isInitialized) {
        this._applyMask();
      }
    }
  }

  public get showMaskFormat(): boolean {
    return this._showMaskFormat;
  }
  public set showMaskFormat(value: boolean) {
    if (this._showMaskFormat !== value) {
      this._showMaskFormat = value;
      if (this._isInitialized) {
        this._applyMask();
      }
    }
  }

  public get notifyInputValueChanges(): boolean {
    return this._notifyInputValueChanges;
  }
  public set notifyInputValueChanges(value: boolean) {
    this._notifyInputValueChanges = value;
  }

  public get allowInvalidDate(): boolean {
    return this._allowInvalidDate;
  }
  public set allowInvalidDate(value: boolean) {
    if (this._allowInvalidDate !== value) {
      this._allowInvalidDate = value;
      this._adapter.toggleHostAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.ALLOW_INVALID_DATE, this._allowInvalidDate);
    }
  }

  public get disabledDaysOfWeek(): DayOfWeek[] {
    return this._disabledDaysOfWeek;
  }
  public set disabledDaysOfWeek(value: DayOfWeek[]) {
    if (this._disabledDaysOfWeek !== value) {
      this._disabledDaysOfWeek = value;

      if (this._isInitialized && this._open) {
        this._adapter.setCalendarDisabledDaysOfWeek(this._disabledDaysOfWeek);
      }

      this._applyDisabledDaysOfWeek();
    }
  }

  public get disableDayCallback(): (date: Date) => boolean {
    return this._disableDayCallback;
  }
  public set disableDayCallback(value: (date: Date) => boolean) {
    if (value !== this._disableDayCallback) {
      this._disableDayCallback = value;
      this._applyDisableDayCallback();
    }
  }

  public get parseCallback(): DatePickerParseCallback {
    return this._parseCallback;
  }
  public set parseCallback(cb: DatePickerParseCallback) {
    this._parseCallback = cb;
    if (this._isInitialized) {
      this._applyMask();
    }
  }

  public get formatCallback(): DatePickerFormatCallback {
    return this._formatCallback;
  }
  public set formatCallback(cb: DatePickerFormatCallback) {
    this._formatCallback = cb;
    if (this._isInitialized) {
      this._applyMask();
    }
  }

  public get prepareMaskCallback(): DatePickerPrepareMaskCallback {
    return this._prepareMaskCallback;
  }
  public set prepareMaskCallback(cb: DatePickerPrepareMaskCallback) {
    this._prepareMaskCallback = cb;
    if (this._isInitialized) {
      this._applyMask();
    }
  }

  public get showToday(): boolean {
    return this._showToday;
  }
  public set showToday(value: boolean) {
    this._showToday = value;
  }

  public get showClear(): boolean {
    return this._showClear;
  }
  public set showClear(value: boolean) {
    this._showClear = value;
  }

  public get yearRange(): string {
    return this._yearRange;
  }
  public set yearRange(value: string) {
    if (this._yearRange !== value) {
      this._yearRange = value;

      if (this._isInitialized && this._open) {
        this._adapter.setCalendarYearRange(this._yearRange);
      }
    }
  }
}
