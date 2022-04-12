import IMask, { InputMask, createMask, MaskedEnum, Masked } from 'imask';
import { isNumeric } from '../utils';

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
    return this._prepareDefault(value, masked, flags, maskInstance).toUpperCase();
  }

  private _prepareDefault(value: string, masked: Masked<string>, flags: IMask.AppendFlags, maskInstance: InputMask<IMask.AnyMaskedOptions>): string {
    if (!flags.input || !value.length || !maskInstance) {
      return value;
    }

    // eslint-disable-next-line @typescript-eslint/dot-notation
    const isAllSelected = maskInstance['_selection'] && maskInstance['_selection'].end === 8;
    const currentValue = isAllSelected ? '' : maskInstance.value;

    if (!isNumeric(value)) {
      // Before we ignore this character let's do some checks for common scenarios where the user enters a colon to help with coercion
      if (value === ':') {
        const isFinalHoursChar = maskInstance.cursorPos === 2 && currentValue.length === 1;
        if (isFinalHoursChar) {
          // The user attempted to press the colon key after entering a single hour character so let's pad the value
          this._setMaskedValueAdjusted(currentValue.padStart(2, '0'), 3);
          return ':';
        }

        const isFinalMinutesChar = maskInstance.cursorPos === 5 && currentValue.length === 4;
        if (isFinalMinutesChar) {
          // The user attempted to press the colon key after entering a single minute character so let's pad the value
          const newValue = `${currentValue.substring(0, 3)}${currentValue[3].padStart(2, '0').padStart(2, '0')}`;
          this._setMaskedValueAdjusted(newValue, 3);
          return ':';
        }

        if (this._options.showSeconds) {
          const isFinalSecondsChar = maskInstance.cursorPos === 8 && currentValue.length === 6;
          if (isFinalSecondsChar) {
            // The user attempted to press the colon key after entering a single second character so let's pad the value
            const newValue = `${currentValue.substring(0, 6)}${currentValue[5].padStart(2, '0')}${currentValue.slice(8)}`;
            this._setMaskedValueAdjusted(newValue, 3);
            return ':';
          }
        }
      }
      return value;
    }

    const numValue = +value;

    // Attempt to pad a leading zero to the hours segment
    const isFirstHourChar = maskInstance.cursorPos === 1 && numValue > 2;
    if (isFirstHourChar) {
      // Replace just the hours segment with the padded value and update cursor position
      const newValue = `${String(numValue).padStart(2, '0')}${currentValue.slice(2)}`;
      this._setMaskedValueAdjusted(newValue, 3);
      return ':';
    }
    
    // Attempt to pad a leading zero to the minutes segment
    const isFirstMinuteChar = (maskInstance.cursorPos === 3 || maskInstance.cursorPos === 4) && numValue > 5;
    if (isFirstMinuteChar) {
      // Replace just the minute segment with the padded value and update cursor position
      const newValue = `${currentValue.substring(0, 3)}${String(numValue).padStart(2, '0')}${currentValue.slice(5)}`;
      this._setMaskedValueAdjusted(newValue, 3);
      return ':';
    }
    
    // Attempt to pad a leading zero to the seconds segment
    if (this._options.showSeconds) {
      const isFirstSecondChar = (maskInstance.cursorPos === 6 || maskInstance.cursorPos === 7) && numValue > 5;
      if (isFirstSecondChar) {
        // Replace just the second segment with the padded value and update cursor position
        const newValue = `${currentValue.substring(0, 6)}${String(numValue).padStart(2, '0')}${currentValue.slice(8)}`;
        this._setMaskedValueAdjusted(newValue, 3);
        return ':';
      }
    }
    
    // Attempt to automatically add a colon after the hours or minutes segment is complete and/or move cursor to after colon
    if (!this._options.showMaskFormat && (maskInstance.cursorPos === 2 || (this._options.showSeconds && maskInstance.cursorPos === 5))) {
      let newValue: string;
      if (maskInstance.cursorPos === 2) {
        newValue = `${currentValue.substring(0, 1)}${numValue}:${currentValue.slice(3)}`;
      } else {
        newValue = `${currentValue.substring(0, 4)}${numValue}:${currentValue.slice(6)}`;
      }
      this._setMaskedValueAdjusted(newValue, 2);
      return '';
    }

    return value;
  }

  private _setMaskedValueAdjusted(value: string, position: number): void {
    this._mask.unmaskedValue = value;
    window.requestAnimationFrame(() => this._mask.updateCursor(this._mask.cursorPos + position));
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
