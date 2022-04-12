import { ICustomElementFoundation, Platform, debounce } from '@tylertech/forge-core';
import { ITimePickerAdapter } from './time-picker-adapter';
import { randomChars } from '../core';
import { ITimeInputMaskOptions } from '../core/mask/time-input-mask';
import { isSupportedTimeFormat, TWENTY_FOUR_HOUR_TIME_REGEX, tryCoerceTimeString } from '../core/time-utils';
import {
  TIME_PICKER_CONSTANTS,
  ITimePickerOptionValue,
  ITimePickerOption,
  TimePickerValidationCallback,
  TimePickerParseCallback,
  TimePickerFormatCallback,
  TimePickerCoercionCallback,
  TimePickerPrepareMaskCallback
} from './time-picker-constants';
import { IListDropdownConfig, ListDropdownType, IListDropdownOption } from '../list-dropdown/list-dropdown-constants';
import { timeStringToMillis, millisToTimeString, minutesToMillis, getCurrentTimeOfDayMillis, millisToMinutes, stripSecondsFromMillis } from './time-picker-utils';

export interface ITimePickerFoundation extends ICustomElementFoundation {
  value: string | null;
  open: boolean;
  allowSeconds: boolean;
  masked: boolean;
  showMaskFormat: boolean;
  use24HourTime: boolean;
  allowInvalidTime: boolean;
  min: string | null;
  max: string | null;
  restrictedTimes: string[];
  startTime: string | null;
  step: number;
  allowInput: boolean;
  showNow: boolean;
  customOptions: ITimePickerOption[];
  validationCallback: TimePickerValidationCallback;
  parseCallback: TimePickerParseCallback;
  formatCallback: TimePickerFormatCallback;
  coercionCallback: TimePickerCoercionCallback;
  prepareMaskCallback: TimePickerPrepareMaskCallback;
  disabled: boolean;
  popupClasses: string | string[];
  allowDropdown: boolean;
}

export class TimePickerFoundation implements ITimePickerFoundation {
  // State vars
  private _value: number | null = null;
  private _masked = true;
  private _use24HourTime = false;
  private _showMaskFormat = false;
  private _min: number | null = null;
  private _max: number | null = null;
  private _restrictedTimes: number[] = [];
  private _startTime: number | null = null;
  private _step = TIME_PICKER_CONSTANTS.numbers.DEFAULT_MINUTE_STEP;
  private _allowInput = true;
  private _identifier: string;
  private _open = false;
  private _allowSeconds = false;
  private _allowInvalidTime = false;
  private _popupTarget: string;
  private _showNow = false;
  private _customOptions: ITimePickerOption[] = [];
  private _validationCallback: TimePickerValidationCallback;
  private _parseCallback: TimePickerParseCallback;
  private _formatCallback: TimePickerFormatCallback;
  private _coercionCallback: TimePickerCoercionCallback;
  private _prepareMaskCallback: TimePickerPrepareMaskCallback;
  private _disabled = false;
  private _popupClasses: string[] = [];
  private _allowDropdown = true;
  
  // Internal state vars
  private _isInitialized = false;

  // Listeners
  private _inputListener: (evt: Event) => void;
  private _inputKeydownListener: (evt: KeyboardEvent) => void;
  private _toggleMousedownListener: (evt: MouseEvent) => void;
  private _inputFocusListener: (evt: Event) => void;
  private _inputBlurListener: (evt: Event) => void;
  private _inputMousedownListener: (evt: MouseEvent) => void;
  
  constructor(private _adapter: ITimePickerAdapter) {
    this._identifier = randomChars(); // This is a unique identifier for this instance of the time picker (used for a11y purposes)

    // Set up listeners
    this._inputListener = evt => this._onInput(evt);
    this._inputKeydownListener = evt => this._onInputKeydown(evt);
    this._toggleMousedownListener = evt => this._onToggleMousedown(evt);
    this._inputFocusListener = evt => this._onInputFocus(evt);
    this._inputBlurListener = evt => this._onInputBlur(evt);
    this._inputMousedownListener = evt => this._onInputMousedown(evt);
  }

  public initialize(): void {
    this._adapter.initialize();
    
    // We require an input element to be a child of this component
    if (!this._adapter.hasInputElement()) {
      throw new Error('Unable to locate <input> element to attach to.');
    }

    this._adapter.initializeAccessibility(this._identifier);

    // Detect if a value already exists in the input and set our values based on that
    if (!this._value) {
      const inputValue = this._adapter.getInputValue();
      this._setValue(this._convertTimeStringToMillis(inputValue, this._use24HourTime, this._allowSeconds));
    }

    // Attach required listeners
    this._adapter.addInputListener('focus', this._inputFocusListener);
    this._adapter.addInputListener('blur', this._inputBlurListener);
    this._adapter.addInputListener('keydown', this._inputKeydownListener, true);

    // Ensure our input has the correct time format (make sure not to emit input events manually at this point)
    this._formatInputValue(false);

    // Apply our state
    if (typeof this._value === 'number') {
      this._applyValue(this._value, false);
    }
    this._applyAllowInput();
    this._applyAllowDropdown();
    this._applyDisabled();
    this._applyMask();

    this._isInitialized = true;
  }

  public disconnect(): void {
    this._isInitialized = false;

    // Remove listeners
    this._adapter.removeInputListener('input', this._inputListener);
    this._adapter.removeInputListener('focus', this._inputFocusListener);
    this._adapter.removeInputListener('blur', this._inputBlurListener);
    this._adapter.removeToggleListener('mousedown', this._toggleMousedownListener);
    this._adapter.removeInputListener('keydown', this._inputKeydownListener, true);

    // If we are using an input mask, let's destroy that now
    if (this._masked) {
      this._adapter.destroyMask();
    }

    // Ensure we remove our dropdown
    this._closeDropdown();

    // Cleanup any resources used in the adapter
    this._adapter.destroy();
  }

  /** Called when the input mask changes or the `input` event occurs on our `<input>` element. */
  private _onInput(evt: Event): void {
    this._handleInput(this._adapter.getInputValue());
  }

  private _onInputKeydown(evt: KeyboardEvent): void {
    if (evt.shiftKey) {
      switch (evt.code) {
        case 'Backspace':
        case 'Delete':
          evt.preventDefault();
          const result = this._trySetValue(null);
          if (result) {
            this._formatInputValue();
          }
          return;
      }
    }

    switch (evt.code) {
      case 'Tab':
        if (this._open) {
          this._selectActiveOption();
        }
        break;
      case 'Esc':
      case 'Escape':
        if (this._open) {
          evt.preventDefault();
          this._closeDropdown(true);
        }
        break;
      case 'Down':
      case 'ArrowDown':
        if (this._allowDropdown) {
          evt.preventDefault();
          if (!this._open) {
            this._openDropdown();
            this._adapter.activateFirstOption();
            // TODO: Should we cycle the hours, minutes, seconds, or meridiem where the cursor is instead of opening the dropdown?
          } else {
            this._adapter.propagateKey(evt.code);
          }
        }
        break;
      case 'Up':
      case 'ArrowUp':
        if (this._allowDropdown) {
          evt.preventDefault();
          if (this._open) {
            this._adapter.propagateKey(evt.code);
          } else {
            // TODO: cycle the hours, minutes, seconds, or meridiem where the cursor is
          }
        }
        break;
      case 'Enter':
      case 'Home':
      case 'End':
        if (this._open) {
          if (evt.code === 'Enter') {
            evt.stopPropagation();
          }
          evt.preventDefault();
          this._adapter.propagateKey(evt.code);
        }
        break;
      case 'KeyN':
        evt.preventDefault();
        const nowMillis = getCurrentTimeOfDayMillis(this._allowSeconds);
        if (this._value !== nowMillis) {
          const timeString = millisToTimeString(nowMillis, true, this._allowSeconds);
          const canContinue = this._emitChangeEvent(timeString);
          if (canContinue) {
            this._applyValue(nowMillis);
            this._selectInputText();
          }
        }
        break;
    }
  }

  private _selectActiveOption(): void {
    const activeOption = this._adapter.getActiveOption();
    if (activeOption) {
      this._onSelect(activeOption.value);
    }
  }

  private _onToggleMousedown(evt: Event): void {
    if (this._disabled || !this.allowDropdown) {
      return;
    }

    evt.stopPropagation();

    if (this._adapter.isInputDisabled()) {
      return;
    }

    evt.preventDefault();

    if (this._open) {
      this._closeDropdown(true);
    } else {
      if (!Platform.isMobile) {
        this._adapter.tryFocusInput();
      } else {
        this._adapter.tryBlurInput();
      }
      this._openDropdown();
    }
  }

  private _onInputFocus(evt: Event): void {
    if (this._allowInput) {
      this._adapter.selectInputText();
    }
  }

  private _onInputBlur(evt: Event): void {
    this._formatInputValue();
    if (this._open && !this._adapter.isInputFocused()) {
      this._closeDropdown(true);
    }
  }

  private _onInputMousedown(evt: MouseEvent): void {
    if (!this._allowInput && !this._open) {
      this._openDropdown();
      this._adapter.tryFocusInput();
      window.requestAnimationFrame(() => this._adapter.selectInputText());
    }
  }

  private _applyDisabled(): void {
    this._adapter.setDisabled(this._disabled);
  }

  private _applyMask(): void {
    if (this._masked && this._allowInput) {
      const options: ITimeInputMaskOptions = {
        showMaskFormat: this._showMaskFormat,
        use24HourTime: this._use24HourTime,
        showSeconds: this._allowSeconds,
        prepareCallback: this._prepareMaskCallback,
        onChange: debounce((value: string) => this._handleInput(value), 0, true) // debounce this to avoid multiple callbacks for same value
      };
      this._adapter.initializeMask(options);
    } else {
      this._adapter.destroyMask();
      this._formatInputValue();
    }
  }

  private _applyAllowInput(): void {
    this._adapter.setInputReadonly(!this._allowInput);
    if (this._allowInput) {
      this._adapter.removeInputListener('mousedown', this._inputMousedownListener);
      // If not using an input mask we need to attach our own `input` listener, otherwise
      // we use the mask to notify us of changes
      if (!this._masked) {
        this._adapter.addInputListener('input', this._inputListener);
      }
    } else {
      this._adapter.addInputListener('mousedown', this._inputMousedownListener);
      this._adapter.removeInputListener('input', this._inputListener);
    }
  }

  private _applyAllowDropdown(): void {
    this._adapter.setToggleDisabled(!this._allowDropdown);
    if (this._allowDropdown) {
      this._adapter.removeToggleListener('mousedown', this._toggleMousedownListener);
      this._adapter.tryCreateToggle();
      this._adapter.addToggleListener('mousedown', this._toggleMousedownListener);
    } else if (this._open) {
      this._closeDropdown(true);
    }
  }

  private _applyAllowSeconds(): void {
    const originalValue = this._value;
    if (!this._allowSeconds) {
      // If we are not using seconds, we need to remove our seconds from the value
      if (typeof this._value !== 'number') {
        return;
      }

      this._setValue(stripSecondsFromMillis(this._value));

      if (this._isInitialized && originalValue !== this._value) {
        // We need to emit a change event with our new value which does not include the seconds
        const timeString = millisToTimeString(this._value, true, false);
        this._emitChangeEvent(timeString);
      }
    } else if (this._isInitialized && originalValue !== this._value) {
      // We need to emit a change event with our new value which includes the seconds
      const timeString = millisToTimeString(this._value, true, true);
      this._emitChangeEvent(timeString);
    }
  }

  private _handleInput(value: string): void {
    const rawValue = value;

    if (!this._allowInput) {
      return;
    }

    if (this._open) {
      this._closeDropdown(true);
    }

    // Let's attempt to coerce our time string into a known format to help with ease of entry
    value = tryCoerceTimeString(value, this._use24HourTime, this._allowSeconds);

    // If we were provided a custom coercion callback then we need to call that now to perform any further coercion by the consumer
    if (typeof this._coercionCallback === 'function') {
      value = this._coercionCallback.call(null, rawValue, value, this._allowSeconds);
    }

    // Validate the time format and make sure it's supported
    if (!this._isValidTimeFormat(value)) {
      value = '';
    }

    // Convert the time string to milliseconds
    let millis: number | null;
    if (!this._masked && typeof this._parseCallback === 'function') {
      millis = this._parseCallback.call(null, value);
    } else {
      millis = this._convertTimeStringToMillis(value, this._use24HourTime, this._allowSeconds);
    }

    // Validate that our time can be chosen as a valid value
    millis = this._validateMillis(millis);

    // Update our value
    this._trySetValue(millis);
  }

  private _emitChangeEvent(value: string | null, force = false): boolean {
    return this._adapter.emitHostEvent(TIME_PICKER_CONSTANTS.events.CHANGE, value, true, !force);
  }

  private _trySetValue(millis: number | null): boolean {
    // If our value hasn't changed, we can just return
    if (millis === this._value) {
      return false;
    }

    // Convert our milliseconds to a 24-hour time string to use as our normalized value
    const timeString = millisToTimeString(millis, true, this._allowSeconds);

    // If we are using an input mask, we need to dispatch our custom input event to let consumers know input happened (before our change event)
    if (this._masked) {
      this._adapter.emitInputEvent(TIME_PICKER_CONSTANTS.events.INPUT, timeString);
    }

    // Only emit our change event if the value is different
    if (this._value !== millis) {
      const canContinue = this._emitChangeEvent(timeString);
      if (canContinue) {
        this._setValue(millis);
        return true;
      }
    }

    return false;
  }

  private _setValue(value: number | null): void {
    this._value = this._normalizeTimeValue(value);
  }

  private _validateMillis(millis: number | null): number | null {
    // Trap for min/max validation
    if (typeof millis === 'number') {
      const isBelowMin = typeof this._min === 'number' && millis < this._min;
      const isAboveMax = typeof this._max === 'number' && millis > this._max;
      if (isBelowMin || isAboveMax) {
        millis = null;
      }
    }
    
    // Trap for restricted times
    if (typeof millis === 'number' && this._restrictedTimes.length) {
      if (this._restrictedTimes.includes(millis)) {
        millis = null;
      }
    }

    return millis;
  }

  private _isValidTimeFormat(value: string): boolean {
    if (!this._masked && typeof this._validationCallback === 'function') {
      return this._validationCallback.call(this, value);
    }
    return isSupportedTimeFormat(value);
  }

  private _isValidInputValue(value: string): boolean {
    return TWENTY_FOUR_HOUR_TIME_REGEX.test(value);
  }

  private _onSelect(value: ITimePickerOptionValue): void {
    this._closeDropdown(true);

    // Check if the "Now" option was selected
    if (!value.isCustom && value.metadata === 'now') {
      value.time = getCurrentTimeOfDayMillis(this._allowSeconds);
    }

    // Check if this is a custom option, and then call the provided callback for it
    if (value.isCustom) {
      if (typeof value.customCallback === 'function') {
        const result = value.customCallback.call(null, value.metadata);
        if (typeof result !== 'number') {
          throw new Error('Custom options must provide a time of day value in milliseconds.');
        }
        value.time = result;
      } else {
        throw new Error('You must implement a `toMilliseconds` callback that returns the time value to use for this custom option.');
      }
    }

    // Make sure the time is different than what is already populated or we can just return
    if (this._value === value.time) {
      return;
    }

    // Emit the change event
    const timeString = millisToTimeString(value.time, true, this._allowSeconds);
    const canContinue = this._emitChangeEvent(timeString);
    if (!canContinue) {
      return;
    }

    // This will update our state and the UI at once
    this._applyValue(value.time);

    // Select full input text
    this._selectInputText();
  }

  private _selectInputText(): void {
    // We need to select the text of the input in the next cycle to allow time for the UI to update
    // with the selected text (assuming it still has focus)
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (this._adapter.isInputFocused()) {
          this._adapter.selectInputText();
        }
      });
    });
  }

  private _applyValue(value: number | null, emitEvents = true): void {
    this._setValue(value);
    const formattedValue = this._formatValue(this._value);
    if (this._adapter.getInputValue() !== formattedValue) {
      this._adapter.setInputValue(formattedValue, emitEvents);
    }
  }

  private _normalizeTimeValue(value: number | null): number | null {
    if (value === null || value === undefined) {
      return null;
    } else if (value < 0) {
      return 0;
    } else if (value > TIME_PICKER_CONSTANTS.numbers.MAX_DAY_MILLIS) {
      return TIME_PICKER_CONSTANTS.numbers.MAX_DAY_MILLIS;
    }
    return value;
  }

  private _openDropdown(): void {
    if (!this.allowDropdown) {
      return;
    }

    this._formatInputValue();
    this._open = true;
    this._adapter.setHostAttribute(TIME_PICKER_CONSTANTS.attributes.OPEN);

    const options = this._generateTimeOptions();
    const selectableOptions = options.filter(o => !o.divider && !o.disabled);
    let selectedValues: ITimePickerOptionValue[] = [];
    let activeStartIndex: number | undefined;
    
    // Find closest match in list of time options and activate/select it
    if (this._value !== null) {
      const optionIndex = this._findClosestOptionIndex(this._value, selectableOptions);
      if (optionIndex >= 0) {
        const isExactMatch = selectableOptions[optionIndex].value.time === this._value;
        if (isExactMatch) {
          selectedValues = [selectableOptions[optionIndex].value];
        } else {
          activeStartIndex = optionIndex;
        }
      }
    } else if (typeof this._startTime === 'number') {
      const optionIndex = this._findClosestOptionIndex(this._startTime, selectableOptions);
      if (optionIndex >= 0 && optionIndex < selectableOptions.length) {
        activeStartIndex = optionIndex;
      }
    }

    const config: IListDropdownConfig<ITimePickerOptionValue> = {
      id: `forge-time-picker-${this._identifier}`,
      selectedValues,
      syncWidth: true,
      activeStartIndex,
      popupClasses: this._popupClasses,
      popupStatic: true,
      type: ListDropdownType.Standard,
      options,
      selectCallback: value => this._onSelect(value),
      closeCallback: () => this._closeDropdown(true),
      activeChangeCallback: id => this._adapter.setActiveDescendant(id),
      targetWidthCallback: () => this._adapter.getTargetElementWidth(this._popupTarget)
    };
    this._adapter.attachDropdown(config);
    this._adapter.emitHostEvent(TIME_PICKER_CONSTANTS.events.OPEN, undefined, false);
  }

  private _closeDropdown(emitCloseEvent = false): void {
    this._open = false;
    this._adapter.removeHostAttribute(TIME_PICKER_CONSTANTS.attributes.OPEN);
    this._adapter.detachDropdown();
    if (emitCloseEvent) {
      this._adapter.emitHostEvent(TIME_PICKER_CONSTANTS.events.CLOSE, true, false);
    }
  }

  private _findClosestOptionIndex(value: number, options: Array<IListDropdownOption<ITimePickerOptionValue>>): number {
    const closestItem = options.reduce((prev, curr) => {
                          return Math.abs((curr.value.time || 0) - value) < Math.abs((prev.value.time || 0) - value) ? curr : prev;
                        });
    return options.indexOf(closestItem);
  }

  private _formatInputValue(emitEvents = true): void {
    const inputValue = this._adapter.getInputValue();
    
    // If we allow invalid times, we can leave the input value as-is (only when unmasked)
    if (this._allowInvalidTime && !this._masked && inputValue && !this._value) {
      return;
    }

    const formattedValue = this._formatValue(this._value);
    
    if (inputValue !== formattedValue) {
      this._adapter.setInputValue(formattedValue, emitEvents);
    }
  }

  private _generateTimeOptions(): Array<IListDropdownOption<ITimePickerOptionValue>> {
    const minMinutes = this._min !== null ? Math.max(millisToMinutes(this._min), 0) : 0;
    const maxMinutes = this._max !== null ? Math.min(millisToMinutes(this._max), TIME_PICKER_CONSTANTS.numbers.MAX_DAY_MINUTES) : TIME_PICKER_CONSTANTS.numbers.MAX_DAY_MINUTES;
    const minuteStep = this._step;
    const times: IListDropdownOption[] = [];
    let leadingOptions: IListDropdownOption[] = [];
    
    for (let totalMinutes = minMinutes; totalMinutes <= maxMinutes; totalMinutes += minuteStep) {
      if (totalMinutes === TIME_PICKER_CONSTANTS.numbers.MAX_DAY_MINUTES) {
        break;
      }
      const millis = minutesToMillis(totalMinutes);
      const disabled = this._restrictedTimes.includes(millis);
      const label = millisToTimeString(millis, this._use24HourTime, false) || '';
      const value: ITimePickerOptionValue = { time: millis };
      times.push({ label, value, disabled });
    }

    // Add divider between AM/PM times
    const firstPmIndex = times.findIndex(t => t.value.time / 1000 / 60 >= 720);
    if (firstPmIndex >= 0 && firstPmIndex < times.length - 1) {
      times.splice(firstPmIndex, 0, { label: '', value: null, divider: true });
    }

    // Check if we need to prepend a "Now" option
    if (this._showNow) {
      const value: ITimePickerOptionValue = { time: null, metadata: 'now' };
      leadingOptions.push({ label: 'Now', value });
    }

    // Check for any custom provided options to prepend
    if (Array.isArray(this._customOptions) && this._customOptions.length) {
      const options = this._customOptions.map(o => {
        const value: ITimePickerOptionValue = { time: null, metadata: o.value, isCustom: true, customCallback: o.toMilliseconds };
        return { label: o.label, value };
      });
      leadingOptions = [...leadingOptions, ...options];
    }

    // Append all leading options
    if (leadingOptions.length) {
      times.splice(0, 0, { label: '', value: null, divider: true });
      leadingOptions.forEach((o, index) => times.splice(index, 0, o));
    }

    return times;
  }

  private _convertTimeStringToMillis(value: string | null, use24HourTime: boolean, allowSeconds: boolean): number | null {
    if (!value || !this._isValidTimeFormat(value)) {
      value = '';
    }
    return timeStringToMillis(value, use24HourTime, allowSeconds);
  }

  private _formatValue(value: number | null): string {
    if (!this._masked && typeof this._formatCallback === 'function') {
      return this._formatCallback.call(null, value, this._use24HourTime, this._allowSeconds);
    }
    return millisToTimeString(this._value, this._use24HourTime, this._allowSeconds) || '';
  }

  private _warnInvalidFormat(value: string): void {
    console.warn(`The specified value "${value}" does not conform to the required format. The format is "HH:mm", "HH:mm:ss" where HH is 00-23, mm is 00-59, and ss is 00-59.`);
  }

  public get open(): boolean {
    return this._open;
  }
  public set open(value: boolean) {
    if (this._open !== value) {
      if (this._isInitialized) {
        this._open = value;
        if (this._open) {
          this._openDropdown();
        } else {
          this._closeDropdown();
        }
      }
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
          this._adapter.removeInputListener('input', this._inputListener);
          this._applyMask();
        } else {
          this._adapter.destroyMask();
          this._formatInputValue();
          this._adapter.addInputListener('input', this._inputListener);
        }
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

  public get allowSeconds(): boolean {
    return this._allowSeconds;
  }
  public set allowSeconds(value: boolean) {
    if (this._allowSeconds !== value) {
      this._allowSeconds = !!value;
      this._applyAllowSeconds();
      if (this._isInitialized) {
        this._applyMask();
        this._formatInputValue();
      }
      this._adapter.setHostAttribute(TIME_PICKER_CONSTANTS.attributes.ALLOW_SECONDS, `${!!value}`);
    }
  }

  public get use24HourTime(): boolean {
    return this._use24HourTime;
  }
  public set use24HourTime(value: boolean) {
    if (this._use24HourTime !== value) {
      this._use24HourTime = !!value;
      if (this._isInitialized) {
        this._adapter.destroyMask();
        this._formatInputValue();
        this._applyMask();
      }
      this._adapter.setHostAttribute(TIME_PICKER_CONSTANTS.attributes.USE_24_HOUR_TIME, `${!!value}`);
    }
  }

  public get allowInvalidTime(): boolean {
    return this._allowInvalidTime;
  }
  public set allowInvalidTime(value: boolean) {
    if (this._allowInvalidTime !== value) {
      this._allowInvalidTime = !!value;
      this._adapter.setHostAttribute(TIME_PICKER_CONSTANTS.attributes.ALLOW_INVALID_TIME, `${!!value}`);
    }
  }

  public get value(): string | null {
    return millisToTimeString(this._value, true, this._allowSeconds);
  }
  public set value(value: string | null) {
    if (value && !this._isValidInputValue(value)) {
      this._warnInvalidFormat(value);
      return;
    }
    const millis = this._validateMillis(this._convertTimeStringToMillis(value, true, true));
    this._setValue(millis);
    if (this._isInitialized) {
      this._applyValue(this._value);
    }
  }

  public get min(): string | null {
    return millisToTimeString(this._min, true, this._allowSeconds);
  }
  public set min(value: string | null) {
    if (this._min !== value) {
      if (value && !this._isValidInputValue(value)) {
        this._warnInvalidFormat(value);
        return;
      }
      this._min = this._convertTimeStringToMillis(value, true, this._allowSeconds);

      // Validate and reset our millis to ensure within range
      const millis = this._validateMillis(this._value);
      this._setValue(millis);

      if (this._isInitialized) {
        this._applyValue(millis);
      }
    }
  }

  public get max(): string | null {
    return millisToTimeString(this._max, true, this._allowSeconds);
  }
  public set max(value: string | null) {
    if (this._max !== value) {
      if (value && !this._isValidInputValue(value)) {
        this._warnInvalidFormat(value);
        return;
      }
      this._max = this._convertTimeStringToMillis(value, true, this._allowSeconds);
      
      // Validate and reset our millis to ensure within range
      const millis = this._validateMillis(this._value);
      this._setValue(millis);

      if (this._isInitialized) {
        this._applyValue(millis);
      }
    }
  }

  public get restrictedTimes(): string[] {
    return this._restrictedTimes
            .map(t => millisToTimeString(t, true, this._allowSeconds))
            .filter(v => typeof v === 'string') as string[];
  }
  public set restrictedTimes(value: string[]) {
    if (!Array.isArray(value)) {
      value = [];
    }
    this._restrictedTimes = value
                              .filter(v => typeof v === 'string')
                              .map(v => this._convertTimeStringToMillis(v, true, true))
                              .filter(v => typeof v === 'number') as number[];
  }

  public get startTime(): string | null {
    return millisToTimeString(this._startTime, true, this._allowSeconds);
  }
  public set startTime(value: string | null) {
    if (this._startTime !== value) {
      if (value && !this._isValidInputValue(value)) {
        this._warnInvalidFormat(value);
        return;
      }
      this._startTime = this._convertTimeStringToMillis(value, true, this._allowSeconds);
    }
  }

  public get step(): number {
    return this._step;
  }
  public set step(value: number) {
    this._step = value;
  }

  public get allowInput(): boolean {
    return this._allowInput;
  }
  public set allowInput(value: boolean) {
    if (this._allowInput !== value) {
      this._allowInput = value;
      if (this._isInitialized) {
        this._applyAllowInput();
        this._applyMask();
      }
    }
  }

  public get popupTarget(): string {
    return this._popupTarget;
  }
  public set popupTarget(value: string) {
    if (this._popupTarget !== value) {
      this._popupTarget = value;
    }
  }

  public get showNow(): boolean {
    return this._showNow;
  }
  public set showNow(value: boolean) {
    if (this._showNow !== value) {
      this._showNow = value;
    }
  }

  public get customOptions(): ITimePickerOption[] {
    return this._customOptions;
  }
  public set customOptions(value: ITimePickerOption[]) {
    this._customOptions = Array.isArray(value) ? value : [];
  }

  public set validationCallback(cb: TimePickerValidationCallback) {
    this._validationCallback = cb;
    if (this._isInitialized) {
      this._applyMask();
    }
  }

  public set parseCallback(cb: TimePickerParseCallback) {
    this._parseCallback = cb;
  }

  public set formatCallback(cb: TimePickerFormatCallback) {
    this._formatCallback = cb;
  }

  public set coercionCallback(cb: TimePickerCoercionCallback) {
    this._coercionCallback = cb;
  }

  public set prepareMaskCallback(cb: TimePickerPrepareMaskCallback) {
    this._prepareMaskCallback = cb;
    if (this._isInitialized) {
      this._applyMask();
    }
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = !!value;
      if (this._isInitialized) {
        this._applyDisabled();
      }
      this._adapter.toggleHostAttribute(TIME_PICKER_CONSTANTS.attributes.DISABLED, this._disabled);
    }
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
      this._popupClasses = [value];
    }
  }

  public get allowDropdown(): boolean {
    return this._allowDropdown;
  }
  public set allowDropdown(value: boolean) {
    if (this._allowDropdown !== value) {
      this._allowDropdown = value;
      if (this._isInitialized) {
        this._applyAllowDropdown();
      }
    }
  }
}
