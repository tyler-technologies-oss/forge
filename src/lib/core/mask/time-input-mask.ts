import IMask, { InputMask, createMask, MaskedEnum, Masked } from 'imask';
import { isNumeric } from '@tylertech/forge-core';
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

  constructor(private _element: HTMLInputElement, private _options: ITimeInputMaskOptions = {}) {
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

    // const parser = new IntermediateTimeParser(value, maskInstance, this._options);
    // return parser.process();
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
          parser.patchUnmaskedValue(parser.value.padStart(2, '0'), 3);
          return char;
        }

        if (parser.isFinalMinutesChar) {
          // The user attempted to press the colon key after entering a single minute character so let's pad the value
          const newValue = `${parser.value.substring(0, 3)}${parser.value[3].padStart(2, '0').padStart(2, '0')}`;
          parser.patchUnmaskedValue(newValue, 5);
          return char;
        }

        if (this._options.showSeconds && parser.isFinalSecondsChar) {
          // The user attempted to press the colon key after entering a single second character so let's pad the value
          const newValue = `${parser.value.substring(0, 6)}${parser.value[5].padStart(2, '0')}${parser.value.slice(8)}`;
          parser.patchUnmaskedValue(newValue, 8);
          return char;
        }
      }
      return char;
    }

    // Attempt to pad a leading zero to the hours segment on initial entry only
    if (parser.isInitialEntry && parser.isFirstHoursChar) {
      // Replace just the hours segment with the padded value and update cursor position
      const newValue = `${parser.asPaddedChar}${parser.value.slice(2)}`;
      parser.patchUnmaskedValue(newValue, 2);
      return ':';
    }

    // Attempt to overwrite the hours (w/leading zero)
    if (parser.hasOnlyHoursSegment && parser.canOverwriteHoursChar) {
      const numNewHour = +`${parser.hoursSegmentNum}${parser.numChar}`;
      if (numNewHour <= 12 || (this._options.use24HourTime && numNewHour <= 23)) {
        // Overwrite the hours segment with the entered char concatenated with the previous entry value
        const newValue = String(numNewHour);
        parser.patchUnmaskedValue(newValue, 3);
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
      const newValue = `${parser.value.substring(0, 3)}${parser.asPaddedChar}${parser.value.slice(5)}`;
      parser.patchUnmaskedValue(newValue, 5);
      return ':';
    }
    
    // Attempt to overwrite the minutes (w/leading zero)
    if (parser.canOverwriteMinutesChar) {
      const numNewMins = +`${parser.minutesSegmentNum}${parser.numChar}`;
      if (numNewMins < 60) {
        const newValuePadded = String(numNewMins).padStart(2, '0');
        // Overwrite the hours segment with the entered char concatenated with the previous entry value
        const newValueStr = `${parser.value.substring(0, 3)}${newValuePadded}${parser.value.slice(5)}`;
        parser.patchUnmaskedValue(newValueStr, 5);
        return ':';
      }
    }

    if (this._options.showSeconds) {
      // Attempt to pad a leading zero to the seconds segment
      if (parser.isFirstSecondsChar) {
        // Replace just the seconds segment with the padded value and update cursor position
        const newValue = `${parser.value.substring(0, 6)}${parser.asPaddedChar}${parser.value.slice(8)}`;
        parser.patchUnmaskedValue(newValue, 8);
        return ':';
      }
      
      // Attempt to overwrite the minutes (w/leading zero)
      if (parser.canOverwriteSecondsChar) {
        const numNewSeconds = +`${parser.secondsSegmentNum}${parser.numChar}`;
        if (numNewSeconds < 60) {
          const newValuePadded = String(numNewSeconds).padStart(2, '0');
          // Overwrite the seconds segment with the entered char concatenated with the previous entry value
          const newValueStr = `${parser.value.substring(0, 6)}${newValuePadded}${parser.value.slice(8)}`;
          parser.patchUnmaskedValue(newValueStr, 8);
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
