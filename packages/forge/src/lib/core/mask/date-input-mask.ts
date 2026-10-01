import { isNumeric } from '@tylertech/forge-core';
import { InputMask, MaskedEnum, MaskedRange, createMask, type AppendFlags, type FactoryArg, type Masked } from 'imask';
import type { IMaskView } from './mask-view.js';

export interface IDateInputMaskOptions {
  showMaskFormat?: boolean;
  pattern?: string;
  useBlockCharPlaceholder?: boolean;
  prepareCallback?: (value: string, masked: Masked<string>, flags: AppendFlags, maskInstance: InputMask<FactoryArg>) => string;
  onChange?: (value: string) => void;
}

export const DEFAULT_DATE_MASK = '0`0{/}`0`0{/}`0`0`0`0';
export const DEFAULT_DATE_MASK_LENGTH = 10;

export interface IDatePrepareOptions {
  showMaskFormat?: boolean;
  /** Overrides the default select-all detection (selection ending at the end of the date). */
  isAllSelected?: boolean;
  /** Places the caret after the segment's slash instead of offsetting the post-update caret, which only lands correctly in lazy mode. */
  useSegmentCursor?: boolean;
}

const CURSOR_AFTER_MONTH = 3;
const CURSOR_AFTER_DAY = 6;

function setValueAdjusted(view: IMaskView, value: string, position: number, target: number, options: IDatePrepareOptions): void {
  view.unmaskedValue = value;
  view.updateCursor(options.useSegmentCursor ? target : view.cursorPos + position);
}

/** Default prepare logic for {@link DEFAULT_DATE_MASK}, run against a view whose positions start at the month. */
export function prepareDateChar(value: string, view: IMaskView, options: IDatePrepareOptions = {}): string {
  const isAllSelected = options.isAllSelected ?? (!!view._selection && view._selection.end === DEFAULT_DATE_MASK_LENGTH);
  const currentValue = isAllSelected ? '' : view.value;

  if (!isNumeric(value)) {
    // Before we ignore this character let's do some checks for common scenarios where the user enters a slash to help with coercion
    if (value === '/') {
      const isFinalMonthChar = view.cursorPos === 2 && currentValue.length === 1;
      if (isFinalMonthChar) {
        // The user attempted to press the slash key after entering a single month character so let's pad the value
        setValueAdjusted(view, currentValue.padStart(2, '0'), 3, CURSOR_AFTER_MONTH, options);
        return '/';
      }

      const isFinalDayChar = view.cursorPos === 5 && currentValue.length === 4;
      if (isFinalDayChar) {
        // The user attempted to press the slash key after entering a single day character so let's pad the value
        const newValue = `${currentValue.substring(0, 3)}${currentValue[3].padStart(2, '0').padStart(2, '0')}`;
        setValueAdjusted(view, newValue, 3, CURSOR_AFTER_DAY, options);
        return '/';
      }
    }
    return value;
  }

  // We know that the value is numeric so let's coerce it to a number type for comparison below
  const numValue = +value;

  // Attempt to pad a leading zero to the month segment
  const isFirstMonthChar = view.cursorPos === 1 && numValue > 1;
  if (isFirstMonthChar) {
    // Replace just the month segment with the padded value and update cursor position
    const newValue = `${String(numValue).padStart(2, '0')}${currentValue.slice(2)}`;
    setValueAdjusted(view, newValue, 3, CURSOR_AFTER_MONTH, options);
    return '/';
  }

  // Attempt to pad a leading zero to the day segment
  const isFirstDayChar = (view.cursorPos === 3 || view.cursorPos === 4) && numValue > 3;
  if (isFirstDayChar) {
    // Replace just the day segment with the padded value and update cursor position
    const newValue = `${currentValue.substring(0, 3)}${String(numValue).padStart(2, '0')}${currentValue.slice(5)}`;
    setValueAdjusted(view, newValue, 3, CURSOR_AFTER_DAY, options);
    return '/';
  }

  // Attempt to automatically add a slash after the month or day segment is complete and/or move cursor to after slash
  if (!options.showMaskFormat) {
    if (view.cursorPos === 2 || view.cursorPos === 5) {
      let newValue: string;
      if (view.cursorPos === 2) {
        newValue = `${currentValue.substring(0, 1)}${numValue}/${currentValue.slice(3)}`;
      } else {
        newValue = `${currentValue.substring(0, 4)}${numValue}/${currentValue.slice(6)}`;
      }
      setValueAdjusted(view, newValue, 2, view.cursorPos === 2 ? CURSOR_AFTER_MONTH : CURSOR_AFTER_DAY, options);
      return '';
    }
  }

  return value;
}

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

  private _createOptions(): FactoryArg {
    return {
      mask: this._options.pattern || DEFAULT_DATE_MASK,
      lazy: this._options.showMaskFormat === undefined ? false : !this._options.showMaskFormat,
      overwrite: true,
      prepareChar: (value: string, masked: Masked<string>, flags: AppendFlags) => this._prepare(value, masked, flags, this._mask),
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

  private _prepare(value: string, masked: Masked<string>, flags: AppendFlags, maskInstance: InputMask<FactoryArg>): string {
    if (typeof this._options.prepareCallback === 'function') {
      return this._options.prepareCallback.call(null, value, masked, flags, this._mask);
    }
    return this._isDefaultMask ? this._prepareDefault(value, masked, flags, maskInstance) : value;
  }

  private _prepareDefault(value: string, masked: Masked<string>, flags: AppendFlags, maskInstance: InputMask<FactoryArg>): string {
    if (!flags.input || !value.length || !maskInstance) {
      return value;
    }
    return prepareDateChar(value, maskInstance, { showMaskFormat: this._options.showMaskFormat });
  }

  public updateMask(): void {
    this._mask.updateValue();
  }

  /** Toggles whether the unfilled format guide is shown (imask lazy mode) without recreating the mask. */
  public setShowMaskFormat(show: boolean): void {
    // Preserve the current selection and focus state due to IMask's lazy operation kicking in,
    // which pushes the cursor to the end of the input, disrupting user.
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
