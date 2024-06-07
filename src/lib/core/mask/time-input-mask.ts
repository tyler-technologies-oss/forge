import { isNumeric } from '@tylertech/forge-core';
import IMask, { createMask, InputMask, Masked, MaskedEnum } from 'imask';
import { IntermediateTimeParser } from './intermediate-time-parser';

export interface ITimeInputMaskOptions {
  showMaskFormat?: boolean;
  use24HourTime?: boolean;
  showSeconds?: boolean;
  onChange?: (value: string) => void;
  prepareCallback?: (value: string, masked: Masked<string>, flags: IMask.AppendFlags, maskInstance: InputMask<IMask.AnyMaskedOptions>) => string;
}

export const TWELVE_HOUR_TIME_MASK = '0`0{:}`0`0 `AM';
export const TWELVE_HOUR_TIME_MASK_WITH_SECONDS = '0`0{:}`0`0{:}`0`0 `AM';
export const TWENTY_FOUR_HOUR_TIME_MASK = '0`0{:}`0`0';
export const TWENTY_FOUR_HOUR_TIME_MASK_WITH_SECONDS = '0`0{:}`0`0{:}`0`0';

export class TimeInputMask {
  private _mask: InputMask<IMask.AnyMaskedOptions>;
  private _maskOptions: IMask.AnyMaskedOptions;
  private _acceptListener: (evt: InputEvent) => void;

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

  public resolve(value: string): string {
    const masked = createMask(this._maskOptions);
    return masked.resolve(value);
  }

  public update(): void {
    this._mask.updateValue();
  }

  private _onAccept(): void {
    if (typeof this._options.onChange === 'function') {
      this._options.onChange(this._mask.value);
    }
  }

  private _createOptions(): IMask.AnyMaskedOptions {
    return {
      mask: this._getMaskFormat(),
      overwrite: true,
      lazy: !this._options.showMaskFormat,
      prepare: (value, masked, flags) => this._prepare(value, masked, flags, this._mask),
      blocks: {
        A: {
          mask: MaskedEnum,
          enum: ['a', 'A', 'p', 'P']
        },
        M: {
          mask: MaskedEnum,
          enum: ['m', 'M']
        }
      }
    } as IMask.MaskedPatternOptions & IMask.MaskedEnumOptions;
  }

  private _prepare(value: string, masked: Masked<string>, flags: IMask.AppendFlags, maskInstance: InputMask<IMask.AnyMaskedOptions>): string {
    if (typeof this._options.prepareCallback === 'function') {
      return this._options.prepareCallback.call(null, value, masked, flags, this._mask);
    }

    if (!flags.input || !value.length || !maskInstance) {
      return value.toUpperCase();
    }

    // Whenever we paste text we don't care to send it through our custom prepare logic,
    // so just return the character being processed.
    // eslint-disable-next-line @typescript-eslint/dot-notation
    if (maskInstance['_inputEvent']?.inputType !== 'insertText') {
      return value;
    }

    return this._prepareDefault(value, maskInstance).toUpperCase();
  }

  private _prepareDefault(char: string, maskInstance: InputMask<IMask.AnyMaskedOptions>): string {
    const parser = new IntermediateTimeParser(char, maskInstance);

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
          parser.applyValue(newValue, this._options.showSeconds ? 'seconds-start' : 'minutes-end');
          return char;
        }

        if (this._options.showSeconds && parser.isFinalSecondsChar) {
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
    }

    // Attempt to pad a leading zero to the hours segment on initial entry only
    if (parser.isInitialHoursEntry && parser.isFirstHoursChar) {
      // Replace just the hours segment with the padded value and update cursor position
      const newValue = parser.patchSegmentValue('hours', parser.asPaddedChar);
      parser.applyValue(newValue, 'hours-end');
      return ':';
    }

    // Attempt to overwrite the hours (w/leading zero)
    if (parser.hasOnlyHoursSegment && parser.canOverwriteHoursChar) {
      const numNewHour = +`${parser.hoursSegmentNum}${parser.numChar}`;
      if (numNewHour <= 12 || (this._options.use24HourTime && numNewHour <= 23)) {
        // Overwrite the hours segment with the entered char concatenated with the previous entry value
        const newValue = parser.patchSegmentValue('hours', String(numNewHour));
        parser.applyValue(newValue, 'minutes-start');
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
      return ':';
    }

    // Attempt to overwrite the minutes (w/leading zero)
    if (parser.canOverwriteMinutesChar) {
      const numNewMins = +`${parser.minutesSegmentNum}${parser.numChar}`;
      if (numNewMins < 60) {
        // Overwrite the hours segment with the entered char concatenated with the previous entry value
        const newValue = parser.patchSegmentValue('minutes', String(numNewMins));
        parser.applyValue(newValue, 'minutes-end');
        return ':';
      }
    }

    if (this._options.showSeconds) {
      // Attempt to pad a leading zero to the seconds segment
      if (parser.isFirstSecondsChar) {
        // Replace just the seconds segment with the padded value and update cursor position
        const newValue = parser.patchSegmentValue('seconds', parser.asPaddedChar);
        parser.applyValue(newValue, 'seconds-end');
        return ':';
      }

      // Attempt to overwrite the seconds (w/leading zero)
      if (parser.canOverwriteSecondsChar) {
        const numNewSeconds = +`${parser.secondsSegmentNum}${parser.numChar}`;
        if (numNewSeconds < 60) {
          // Overwrite the seconds segment with the entered char concatenated with the previous entry value
          const newValue = parser.patchSegmentValue('seconds', String(numNewSeconds));
          parser.applyValue(newValue, 'seconds-end');
          return ':';
        }
      }
    }

    return char;
  }

  private _getMaskFormat(): string {
    if (this._options.use24HourTime) {
      return this._options.showSeconds ? TWENTY_FOUR_HOUR_TIME_MASK_WITH_SECONDS : TWENTY_FOUR_HOUR_TIME_MASK;
    }
    return this._options.showSeconds ? TWELVE_HOUR_TIME_MASK_WITH_SECONDS : TWELVE_HOUR_TIME_MASK;
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
