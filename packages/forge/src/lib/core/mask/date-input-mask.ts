import { isNumeric } from '@tylertech/forge-core';
import { ChangeDetails, InputMask, MaskedEnum, MaskedRange, createMask, type AppendFlags, type FactoryArg, type Masked } from 'imask';

export interface IDateInputMaskOptions {
  showMaskFormat?: boolean;
  pattern?: string;
  useBlockCharPlaceholder?: boolean;
  prepareCallback?: (value: string, masked: Masked<string>, flags: AppendFlags, maskInstance: InputMask<FactoryArg>) => string;
  onChange?: (value: string) => void;
}

export const DEFAULT_DATE_MASK = '0`0{/}`0`0{/}`0`0`0`0';

const DATE_SEPARATOR = '/';
const MONTH_START_POSITION = 0;
const MONTH_END_POSITION = 1;
const MONTH_SEPARATOR_POSITION = 2;
const DAY_START_POSITION = 3;
const DAY_END_POSITION = 4;
const DAY_SEPARATOR_POSITION = 5;
const DEFAULT_DATE_LENGTH = 10;
const MAX_MONTH_FIRST_DIGIT = 1;
const MAX_DAY_FIRST_DIGIT = 3;

export class DateInputMask {
  private _mask: InputMask<FactoryArg>;
  private _maskOptions: FactoryArg;
  private _acceptListener: () => void;

  constructor(
    private _element: HTMLInputElement,
    private _options: IDateInputMaskOptions = {}
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

  private _onAccept(): void {
    if (typeof this._options.onChange === 'function') {
      this._options.onChange(this._mask.value);
    }
  }

  private get _isDefaultMask(): boolean {
    return this._options.pattern === DEFAULT_DATE_MASK;
  }

  private _createPrepareOptions(): Partial<Pick<Masked<string>, 'prepare' | 'prepareChar'>> {
    const { prepareCallback } = this._options;
    if (typeof prepareCallback === 'function') {
      return {
        prepareChar: (value: string, masked: Masked<string>, flags: AppendFlags) => prepareCallback.call(null, value, masked, flags, this._mask)
      };
    }
    if (!this._isDefaultMask) {
      return {};
    }
    return { prepare: (value: string, masked: Masked<string>, flags: AppendFlags) => this._prepareDefault(value, masked, flags) };
  }

  private _createOptions(): FactoryArg {
    return {
      mask: this._options.pattern || DEFAULT_DATE_MASK,
      lazy: this._options.showMaskFormat === undefined ? false : !this._options.showMaskFormat,
      overwrite: true,
      ...this._createPrepareOptions(),
      blocks: {
        MM: {
          mask: MaskedRange,
          autofix: true,
          from: 1,
          to: 12,
          maxLength: 2
        },
        Mmm: {
          mask: MaskedEnum,
          enum: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          matchValue: (enumStr: string, inputStr: string, matchFrom: number) =>
            MaskedEnum.DEFAULTS.matchValue(enumStr.toLowerCase(), inputStr.toLowerCase(), matchFrom)
        },
        MMM: {
          mask: MaskedEnum,
          enum: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
          matchValue: (enumStr: string, inputStr: string, matchFrom: number) =>
            MaskedEnum.DEFAULTS.matchValue(enumStr.toLowerCase(), inputStr.toLowerCase(), matchFrom)
        },
        DD: {
          mask: MaskedRange,
          autofix: true,
          from: 1,
          to: 31,
          maxLength: 2
        },
        YYYY: {
          mask: MaskedRange,
          autofix: true,
          from: 0,
          to: 9999,
          maxLength: 4
        },
        YY: {
          mask: MaskedRange,
          autofix: true,
          from: 0,
          to: 99,
          maxLength: 2
        }
      }
    };
  }

  /**
   * Auto-pads single digit month/day segments and advances past separators as the user enters the default mask.
   *
   * This runs from the IMask `prepare` hook, where `masked` holds only the value before the insertion point (the tail
   * is detached), so its display value is the same regardless of whether the mask format is shown. Returning the
   * adjusted characters lets IMask handle overwriting the tail and cursor placement itself.
   */
  private _prepareDefault(value: string, masked: Masked<string>, flags: AppendFlags): string | [string, ChangeDetails] {
    if (!flags.input || !value) {
      return value;
    }

    const precedingValue = masked.displayValue;
    const result = [...value].reduce((current, char) => this._appendDefaultChar(current, char), precedingValue);

    if (result.startsWith(precedingValue)) {
      return result.slice(precedingValue.length);
    }

    // A previously entered character was padded, so replace it along with the inserted characters
    let keepLength = 0;
    while (result[keepLength] === precedingValue[keepLength]) {
      keepLength++;
    }
    masked.remove(keepLength);
    return [result.slice(keepLength), new ChangeDetails({ tailShift: keepLength - precedingValue.length })];
  }

  private _appendDefaultChar(current: string, char: string): string {
    const position = current.length;
    if (position >= DEFAULT_DATE_LENGTH) {
      return current;
    }

    const isSegmentEnd = position === MONTH_END_POSITION || position === DAY_END_POSITION;
    const isSeparator = position === MONTH_SEPARATOR_POSITION || position === DAY_SEPARATOR_POSITION;

    if (char === DATE_SEPARATOR) {
      if (isSegmentEnd && isNumeric(current[position - 1])) {
        return `${current.slice(0, -1)}0${current[position - 1]}${DATE_SEPARATOR}`;
      }
      return isSeparator ? `${current}${DATE_SEPARATOR}` : current;
    }

    if (!isNumeric(char)) {
      return current;
    }

    if (isSeparator) {
      return this._appendDefaultChar(`${current}${DATE_SEPARATOR}`, char);
    }

    const digit = +char;
    const shouldPad = (position === MONTH_START_POSITION && digit > MAX_MONTH_FIRST_DIGIT) || (position === DAY_START_POSITION && digit > MAX_DAY_FIRST_DIGIT);
    if (shouldPad) {
      return `${current}0${char}${DATE_SEPARATOR}`;
    }
    return isSegmentEnd ? `${current}${char}${DATE_SEPARATOR}` : `${current}${char}`;
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
