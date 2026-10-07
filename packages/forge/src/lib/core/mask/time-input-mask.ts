import { isNumeric } from '@tylertech/forge-core';
import { FactoryArg, InputMask, MaskedEnum, createMask, type AppendFlags, type Masked } from 'imask';
import { IntermediateTimeParser } from './intermediate-time-parser.js';
import { createLetterGuideMask, MERIDIEM_GUIDE_CHAR, toUnderscoreGuide } from './letter-guide.js';
import { createMaskView, isSingleKeyInput, MaskCursorSync, type IMaskView } from './mask-view.js';

export interface ITimeInputMaskOptions {
  showMaskFormat?: boolean;
  use24HourTime?: boolean;
  showSeconds?: boolean;
  /** Shows the format letters (`hh:mm aa`) instead of `_` in the guide; also lands caret moves synchronously and treats multi-char inserts like paste. */
  letterGuide?: boolean;
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

/** Returns the display format of a time mask, e.g. `hh:mm aa`. */
export function getTimeMaskFormat(use24HourTime?: boolean, showSeconds?: boolean): string {
  const hours = use24HourTime ? 'HH' : 'hh';
  const seconds = showSeconds ? ':ss' : '';
  const meridiem = use24HourTime ? '' : ` ${MERIDIEM_GUIDE_CHAR}${MERIDIEM_GUIDE_CHAR}`;
  return `${hours}:mm${seconds}${meridiem}`;
}

/** Meridiem blocks used by the 12 hour time masks. */
export function createTimeMaskBlocks(letterGuide = false): Record<string, FactoryArg> {
  const guide = letterGuide ? { placeholderChar: MERIDIEM_GUIDE_CHAR } : {};
  return {
    A: {
      mask: MaskedEnum,
      enum: ['a', 'A', 'p', 'P'],
      ...guide
    },
    M: {
      mask: MaskedEnum,
      enum: ['m', 'M'],
      ...guide
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
  private readonly _cursorSync?: MaskCursorSync;
  private readonly _view = createMaskView(
    () => this._mask,
    () => this.normalizedValue,
    cursorPos => (this._cursorSync ? this._cursorSync.updateCursor(cursorPos) : this._mask.updateCursor(cursorPos))
  );

  constructor(
    private _element: HTMLInputElement,
    private _options: ITimeInputMaskOptions = {}
  ) {
    this._maskOptions = this._createOptions();
    this._mask = new InputMask(this._element, this._maskOptions);
    // Only the field opts in; the pickers keep imask's deferred caret.
    if (this._options.letterGuide) {
      this._cursorSync = new MaskCursorSync(this._element, this._mask);
    }
    if (this._options.onChange) {
      this._acceptListener = () => this._onAccept();
      this._mask.on('accept', this._acceptListener);
    }
  }

  public destroy(): void {
    if (this._acceptListener) {
      this._mask.off('accept', this._acceptListener);
    }
    this._cursorSync?.destroy();
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
    const { use24HourTime, showSeconds, letterGuide } = this._options;
    const pattern = getTimeMaskPattern(use24HourTime, showSeconds);
    return {
      mask: pattern,
      overwrite: true,
      lazy: !this._options.showMaskFormat,
      prepareChar: (value: string, masked: Masked<string>, flags: AppendFlags) => this._prepare(value, masked, flags, this._mask),
      ...(letterGuide && {
        ...createLetterGuideMask(pattern, getTimeMaskFormat(use24HourTime, showSeconds)),
        // Re-appended display text (guide toggle, value sets) must not turn the `aa` guide into a meridiem.
        prepare: (value: string, masked: Masked<string>) => toUnderscoreGuide(value, getTimeMaskFormat(use24HourTime, showSeconds), masked.displayValue.length)
      }),
      blocks: createTimeMaskBlocks(letterGuide)
    };
  }

  private _prepare(value: string, masked: Masked<string>, flags: AppendFlags, maskInstance: InputMask<FactoryArg>): string {
    if (typeof this._options.prepareCallback === 'function') {
      return this._options.prepareCallback.call(null, value, masked, flags, this._mask);
    }

    if (!flags.input || !value.length || !maskInstance) {
      return value.toUpperCase();
    }

    // Pasted text skips the typing logic; with the letter guide, so do multi-char inserts.
    const isTyped = this._options.letterGuide ? isSingleKeyInput(maskInstance._inputEvent) : maskInstance._inputEvent?.inputType === 'insertText';
    if (!isTyped) {
      // A lowercase meridiem would read as the `a` letter guide.
      return this._options.letterGuide ? value.toUpperCase() : value;
    }

    return prepareTimeChar(value, this._view, this._padState, this._options).toUpperCase();
  }

  public get maskedValue(): string {
    return this._mask.value;
  }
  public set maskedValue(value: string) {
    this._mask.value = value;
  }

  /** `maskedValue` with letter-guide slots read back as `_`. */
  public get normalizedValue(): string {
    const { value } = this._mask;
    return this._options.letterGuide ? toUnderscoreGuide(value, getTimeMaskFormat(this._options.use24HourTime, this._options.showSeconds)) : value;
  }

  public get unmaskedValue(): string {
    return this._mask.unmaskedValue;
  }
  public set unmaskedValue(value: string) {
    this._mask.unmaskedValue = value;
  }
}
