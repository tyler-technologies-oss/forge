import IMask, { InputMask, createMask, Masked, MaskedRange } from 'imask';
import { isNumeric } from '@tylertech/forge-core';

export interface IDateInputMaskOptions {
  showMaskFormat?: boolean;
  pattern?: string;
  useBlockCharPlaceholder?: boolean;
  prepareCallback?: (value: string, masked: Masked<string>, flags: IMask.AppendFlags, maskInstance: InputMask<IMask.MaskedPatternOptions>) => string;
  onChange?: (value: string) => void;
}

export const DEFAULT_DATE_MASK = '0`0{/}`0`0{/}`0`0`0`0';

export class DateInputMask {
  private _mask: InputMask<IMask.MaskedPatternOptions>;
  private _maskOptions: IMask.MaskedPatternOptions;
  private _acceptListener: () => void;

  constructor(private _element: HTMLInputElement, private _options: IDateInputMaskOptions = {}) {
    this._maskOptions = this._createOptions();
    this._mask = new InputMask<IMask.MaskedPatternOptions>(this._element, this._maskOptions);
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

  private _onAccept(): void {
    if (typeof this._options.onChange === 'function') {
      this._options.onChange(this._mask.value);
    }
  }

  private get _isDefaultMask(): boolean {
    return this._options.pattern === DEFAULT_DATE_MASK;
  }

  private _createOptions(): IMask.MaskedPatternOptions {
    const options: IMask.MaskedRangeOptions & IMask.AnyMaskedOptions = {
      mask: this._options.pattern || DEFAULT_DATE_MASK,
      lazy: this._options.showMaskFormat === undefined ? false : !this._options.showMaskFormat,
      overwrite: true,
      prepare: (value: string, masked: IMask.Masked<string>, flags: IMask.AppendFlags) => this._prepare(value, masked, flags, this._mask),
      blocks: {
        MM: {
          mask: MaskedRange,
          autofix: true,
          from: 1,
          to: 12,
          maxLength: 2
        } as IMask.AnyMaskedOptions,
        DD: {
          mask: MaskedRange,
          autofix: true,
          from: 1,
          to: 31,
          maxLength: 2
        } as IMask.AnyMaskedOptions,
        YYYY: {
          mask: MaskedRange,
          autofix: true,
          from: 0,
          to: 9999,
          maxLength: 4
        } as IMask.AnyMaskedOptions
      }
    } as IMask.MaskedRangeOptions;
    return options;
  }

  private _prepare(value: string, masked: Masked<string>, flags: IMask.AppendFlags, maskInstance: InputMask<IMask.MaskedPatternOptions>): string {
    if (typeof this._options.prepareCallback === 'function') {
      return this._options.prepareCallback.call(null, value, masked, flags, this._mask);
    }
    return this._isDefaultMask ? this._prepareDefault(value, masked, flags, maskInstance) : value;
  }

  private _prepareDefault(value: string, masked: Masked<string>, flags: IMask.AppendFlags, maskInstance: InputMask<IMask.MaskedPatternOptions>): string {
    if (!flags.input || !value.length || !maskInstance) {
      return value;
    }

    // eslint-disable-next-line @typescript-eslint/dot-notation
    const isAllSelected = maskInstance['_selection'] && maskInstance['_selection'].end === 10;
    const currentValue = isAllSelected ? '' : maskInstance.value;

    if (!isNumeric(value)) {
      // Before we ignore this character let's do some checks for common scenarios where the user enters a slash to help with coercion
      if (value === '/') {
        const isFinalMonthChar = maskInstance.cursorPos === 2 && currentValue.length === 1;
        if (isFinalMonthChar) {
          // The user attempted to press the slash key after entering a single month character so let's pad the value
          this._setMaskedValueAdjusted(currentValue.padStart(2, '0'), 3);
          return '/';
        }

        const isFinalDayChar = maskInstance.cursorPos === 5 && currentValue.length === 4;
        if (isFinalDayChar) {
          // The user attempted to press the slash key after entering a single day character so let's pad the value
          const newValue = `${currentValue.substring(0, 3)}${currentValue[3].padStart(2, '0').padStart(2, '0')}`;
          this._setMaskedValueAdjusted(newValue, 3);
          return '/';
        }
      }
      return value;
    }

    // We know that the value is numeric so let's coerce it to a number type for comparison below
    const numValue = +value;

    // Attempt to pad a leading zero to the month segment
    const isFirstMonthChar = maskInstance.cursorPos === 1 && numValue > 1;
    if (isFirstMonthChar) {
      // Replace just the month segment with the padded value and update cursor position
      const newValue = `${String(numValue).padStart(2, '0')}${currentValue.slice(2)}`;
      this._setMaskedValueAdjusted(newValue, 3);
      return '/';
    }
    
    // Attempt to pad a leading zero to the day segment
    const isFirstDayChar = (maskInstance.cursorPos === 3 || maskInstance.cursorPos === 4) && numValue > 3;
    if (isFirstDayChar) {
      // Replace just the day segment with the padded value and update cursor position
      const newValue = `${currentValue.substring(0, 3)}${String(numValue).padStart(2, '0')}${currentValue.slice(5)}`;
      this._setMaskedValueAdjusted(newValue, 3);
      return '/';
    }
    
    // Attempt to automatically add a slash after the month or day segment is complete and/or move cursor to after slash
    if (!this._options.showMaskFormat) {
      if (maskInstance.cursorPos === 2 || maskInstance.cursorPos === 5) {
        let newValue: string;
        if (maskInstance.cursorPos === 2) {
          newValue = `${currentValue.substring(0, 1)}${numValue}/${currentValue.slice(3)}`;
        } else {
          newValue = `${currentValue.substring(0, 4)}${numValue}/${currentValue.slice(6)}`;
        }
        this._setMaskedValueAdjusted(newValue, 2);
        return '';
      }
    }

    return value;
  }

  private _setMaskedValueAdjusted(value: string, position: number): void {
    this._mask.unmaskedValue = value;
    window.requestAnimationFrame(() => this._mask.updateCursor(this._mask.cursorPos + position));
  }

  public updateMask(): void {
    this._mask.updateValue();
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
