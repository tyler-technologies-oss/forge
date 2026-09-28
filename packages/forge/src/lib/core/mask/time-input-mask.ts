import { isNumeric } from '@tylertech/forge-core';
import { FactoryArg, InputMask, MaskedEnum, createMask, type AppendFlags, type Masked } from 'imask';
import { IntermediateTimeParser } from './intermediate-time-parser.js';
import type { IMaskView } from './mask-view.js';

export interface ITimeInputMaskOptions {
  showMaskFormat?: boolean;
  use24HourTime?: boolean;
  showSeconds?: boolean;
  onChange?: (value: string) => void;
  prepareCallback?: (value: string, masked: Masked<string>, flags: AppendFlags, maskInstance: InputMask<FactoryArg>) => string;
}

export const TWELVE_HOUR_TIME_MASK = '0`0{:}`0`0 `AM';
export const TWELVE_HOUR_TIME_MASK_WITH_SECONDS = '0`0{:}`0`0{:}`0`0 `AM';
export const TWENTY_FOUR_HOUR_TIME_MASK = '0`0{:}`0`0';
export const TWENTY_FOUR_HOUR_TIME_MASK_WITH_SECONDS = '0`0{:}`0`0{:}`0`0';

export interface ITimeMaskPadState {
  hoursAutoPadded: boolean;
  minutesAutoPadded: boolean;
  secondsAutoPadded: boolean;
}

export interface ITimePrepareOptions {
  use24HourTime?: boolean;
  showSeconds?: boolean;
}

export function createTimeMaskPadState(): ITimeMaskPadState {
  return { hoursAutoPadded: false, minutesAutoPadded: false, secondsAutoPadded: false };
}

export function getTimeMaskPattern(use24HourTime?: boolean, showSeconds?: boolean): string {
  if (use24HourTime) {
    return showSeconds ? TWENTY_FOUR_HOUR_TIME_MASK_WITH_SECONDS : TWENTY_FOUR_HOUR_TIME_MASK;
  }
  return showSeconds ? TWELVE_HOUR_TIME_MASK_WITH_SECONDS : TWELVE_HOUR_TIME_MASK;
}

/** Meridiem blocks used by the 12 hour time masks. */
export function createTimeMaskBlocks(): Record<string, FactoryArg> {
  return {
    A: {
      mask: MaskedEnum,
      enum: ['a', 'A', 'p', 'P']
    },
    M: {
      mask: MaskedEnum,
      enum: ['m', 'M']
    }
  };
}

/** Default prepare logic for the time masks, run against a view whose positions start at the hours. */
export function prepareTimeChar(char: string, view: IMaskView, state: ITimeMaskPadState, options: ITimePrepareOptions = {}): string {
  const parser = new IntermediateTimeParser(char, view);

  // Handle non-numeric character entry here
  if (!isNumeric(char)) {
    // Before we ignore this character let's do some checks for common scenarios where the user enters a colon to help with coercion
    if (char === ':') {
      if (parser.isFinalHoursChar) {
        // The user attempted to press the colon key after entering a single hour character so let's pad the value
        const newValue = parser.patchSegmentValue('hours', parser.value);
        parser.applyValue(newValue, 'minutes-start');
        return char;
      }

      if (parser.isFinalMinutesChar) {
        // The user attempted to press the colon key after entering a single minute character so let's pad the value
        const newValue = parser.patchSegmentValue('minutes', String(parser.minutesSegmentNum));
        parser.applyValue(newValue, options.showSeconds ? 'seconds-start' : 'minutes-end');
        return char;
      }

      if (options.showSeconds && parser.isFinalSecondsChar) {
        // The user attempted to press the colon key after entering a single second character so let's pad the value
        const newValue = parser.patchSegmentValue('seconds', String(parser.secondsSegmentNum));
        parser.applyValue(newValue, 'meridiem-start');
        return char;
      }
    }
    return char;
  }

  // If all of the text is selected, we can safely assume the whole value is being overwritten
  if (parser.isAllSelected) {
    parser.reset();
    state.hoursAutoPadded = false;
    state.minutesAutoPadded = false;
    state.secondsAutoPadded = false;
  }

  if (parser.isInitialHoursEntry) {
    state.hoursAutoPadded = false;
  }
  if (parser.isInitialMinutesEntry) {
    state.minutesAutoPadded = false;
  }
  if (parser.isInitialSecondsEntry) {
    state.secondsAutoPadded = false;
  }

  // Attempt to pad a leading zero to the hours segment on initial entry only
  if (parser.isInitialHoursEntry && parser.isFirstHoursChar) {
    // Replace just the hours segment with the padded value and update cursor position
    const newValue = parser.patchSegmentValue('hours', parser.asPaddedChar);
    parser.applyValue(newValue, 'hours-end');
    state.hoursAutoPadded = true;
    return ':';
  }

  // Attempt to overwrite the hours (w/leading zero)
  if (parser.hasOnlyHoursSegment && parser.canOverwriteHoursChar && state.hoursAutoPadded) {
    const numNewHour = +`${parser.hoursSegmentNum}${parser.numChar}`;
    if (numNewHour <= 12 || (options.use24HourTime && numNewHour <= 23)) {
      // Overwrite the hours segment with the entered char concatenated with the previous entry value
      const newValue = parser.patchSegmentValue('hours', String(numNewHour));
      parser.applyValue(newValue, 'minutes-start');
      state.hoursAutoPadded = false;
      return ':';
    }
  }

  // Check if we are entering the last hour value and automatically move to the minutes segment for next entry
  if (parser.value.length + 1 === 2) {
    return `${char}:`;
  }

  // Attempt to pad a leading zero to the minutes segment
  if (parser.isFirstMinutesChar) {
    // Replace just the minute segment with the padded value and update cursor position
    const newValue = parser.patchSegmentValue('minutes', parser.asPaddedChar);
    parser.applyValue(newValue, 'minutes-end');
    state.minutesAutoPadded = true;
    return ':';
  }

  // Attempt to overwrite the minutes (w/leading zero)
  if (parser.canOverwriteMinutesChar && state.minutesAutoPadded) {
    const numNewMins = +`${parser.minutesSegmentNum}${parser.numChar}`;
    if (numNewMins < 60) {
      // Overwrite the minutes segment with the entered char concatenated with the previous entry value
      const newValue = parser.patchSegmentValue('minutes', String(numNewMins));
      parser.applyValue(newValue, 'minutes-end');
      state.minutesAutoPadded = false;
      return ':';
    }
  }

  if (options.showSeconds) {
    // Attempt to pad a leading zero to the seconds segment
    if (parser.isFirstSecondsChar) {
      // Replace just the seconds segment with the padded value and update cursor position
      const newValue = parser.patchSegmentValue('seconds', parser.asPaddedChar);
      parser.applyValue(newValue, 'seconds-end');
      state.secondsAutoPadded = true;
      return ':';
    }

    // Attempt to overwrite the seconds (w/leading zero)
    if (parser.canOverwriteSecondsChar && state.secondsAutoPadded) {
      const numNewSeconds = +`${parser.secondsSegmentNum}${parser.numChar}`;
      if (numNewSeconds < 60) {
        // Overwrite the seconds segment with the entered char concatenated with the previous entry value
        const newValue = parser.patchSegmentValue('seconds', String(numNewSeconds));
        parser.applyValue(newValue, 'seconds-end');
        state.secondsAutoPadded = false;
        return ':';
      }
    }
  }

  return char;
}

export class TimeInputMask {
  private _mask: InputMask<FactoryArg>;
  private _maskOptions: FactoryArg;
  private _acceptListener: (evt: InputEvent) => void;
  private readonly _padState = createTimeMaskPadState();

  constructor(
    private _element: HTMLInputElement,
    private _options: ITimeInputMaskOptions = {}
  ) {
    this._maskOptions = this._createOptions();
    this._mask = new InputMask(this._element, this._maskOptions);
    if (this._options.onChange) {
      this._acceptListener = () => this._onAccept();
      this._mask.on('accept', this._acceptListener);
    }
  }

  public destroy(): void {
    if (this._acceptListener) {
      this._mask.off('accept', this._acceptListener);
    }
    this._mask.destroy();
  }

  public resolve(value: string): void {
    const masked = createMask(this._maskOptions);
    masked.resolve(value);
  }

  public update(): void {
    this._mask.updateValue();
  }

  /** Toggles whether the unfilled format guide is shown (imask lazy mode) without recreating the mask. */
  public setShowMaskFormat(show: boolean): void {
    const root = this._element.getRootNode() as Document | ShadowRoot;
    const activeElement = root.activeElement;
    const isFocused = activeElement === this._element;
    const selectionStart = isFocused ? this._element.selectionStart : null;
    const selectionEnd = isFocused ? this._element.selectionEnd : null;

    this._mask.updateOptions({ lazy: !show });
    this._mask.updateControl();

    if (isFocused && selectionStart != null && selectionEnd != null) {
      this._element.setSelectionRange(selectionStart, selectionEnd);
    }
  }

  private _onAccept(): void {
    if (typeof this._options.onChange === 'function') {
      this._options.onChange(this._mask.value);
    }
  }

  private _createOptions(): FactoryArg {
    return {
      mask: this._getMaskFormat(),
      overwrite: true,
      lazy: !this._options.showMaskFormat,
      prepareChar: (value: string, masked: Masked<string>, flags: AppendFlags) => this._prepare(value, masked, flags, this._mask),
      blocks: createTimeMaskBlocks()
    };
  }

  private _prepare(value: string, masked: Masked<string>, flags: AppendFlags, maskInstance: InputMask<FactoryArg>): string {
    if (typeof this._options.prepareCallback === 'function') {
      return this._options.prepareCallback.call(null, value, masked, flags, this._mask);
    }

    if (!flags.input || !value.length || !maskInstance) {
      return value.toUpperCase();
    }

    // Whenever we paste text we don't care to send it through our custom prepare logic,
    // so just return the character being processed.
    if (maskInstance._inputEvent?.inputType !== 'insertText') {
      return value;
    }

    return prepareTimeChar(value, maskInstance, this._padState, this._options).toUpperCase();
  }

  private _getMaskFormat(): string {
    return getTimeMaskPattern(this._options.use24HourTime, this._options.showSeconds);
  }

  public get maskedValue(): string {
    return this._mask.value;
  }
  public set maskedValue(value: string) {
    this._mask.value = value;
  }

  public get unmaskedValue(): string {
    return this._mask.unmaskedValue;
  }
  public set unmaskedValue(value: string) {
    this._mask.unmaskedValue = value;
  }
}
