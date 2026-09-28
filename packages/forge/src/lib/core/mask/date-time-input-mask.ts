import { InputMask, type AppendFlags, type FactoryArg } from 'imask';
import { DEFAULT_DATE_MASK, DEFAULT_DATE_MASK_LENGTH, prepareDateChar } from './date-input-mask.js';
import type { IMaskSelection, IMaskView } from './mask-view.js';
import { createTimeMaskBlocks, createTimeMaskPadState, getTimeMaskPattern, prepareTimeChar } from './time-input-mask.js';

export interface IDateTimeInputMaskOptions {
  showMaskFormat?: boolean;
  use24HourTime?: boolean;
  showSeconds?: boolean;
  onChange?: (value: string) => void;
}

export const DATE_TIME_MASK_SEPARATOR = ' ';

const TIME_START = DEFAULT_DATE_MASK_LENGTH + DATE_TIME_MASK_SEPARATOR.length;
const PLACEHOLDER_CHAR = '_';
const TYPED_INPUT_TYPE = 'insertText';

/** Returns the display format of the combined mask, e.g. `MM/DD/YYYY hh:mm aa`. */
export function getDateTimeMaskFormat(use24HourTime: boolean, showSeconds: boolean): string {
  const hours = use24HourTime ? 'HH' : 'hh';
  const seconds = showSeconds ? ':ss' : '';
  const meridiem = use24HourTime ? '' : ' aa';
  return `MM/DD/YYYY${DATE_TIME_MASK_SEPARATOR}${hours}:mm${seconds}${meridiem}`;
}

/** Input mask for a combined `MM/DD/YYYY` date and time value in a single input. */
export class DateTimeInputMask {
  private readonly _mask: InputMask<FactoryArg>;
  private readonly _dateView: IMaskView;
  private readonly _timeView: IMaskView;
  private readonly _timePadState = createTimeMaskPadState();
  private readonly _acceptListener?: () => void;

  constructor(
    private readonly _element: HTMLInputElement,
    private readonly _options: IDateTimeInputMaskOptions = {}
  ) {
    this._dateView = this._createDateView();
    this._timeView = this._createTimeView();
    this._mask = new InputMask(this._element, {
      mask: `${DEFAULT_DATE_MASK}{${DATE_TIME_MASK_SEPARATOR}}\`${getTimeMaskPattern(this._options.use24HourTime, this._options.showSeconds)}`,
      lazy: !this._options.showMaskFormat,
      overwrite: true,
      prepareChar: (char: string, _masked: unknown, flags: AppendFlags) => this._prepareChar(char, flags),
      blocks: createTimeMaskBlocks()
    });
    if (this._options.onChange) {
      this._acceptListener = () => this._options.onChange?.(this._mask.value);
      this._mask.on('accept', this._acceptListener);
    }
  }

  public destroy(): void {
    if (this._acceptListener) {
      this._mask.off('accept', this._acceptListener);
    }
    this._mask.destroy();
  }

  public updateMask(): void {
    this._mask.updateValue();
  }

  /** Toggles whether the unfilled format guide is shown (imask lazy mode) without recreating the mask. */
  public setShowMaskFormat(show: boolean): void {
    const root = this._element.getRootNode() as Document | ShadowRoot;
    const isFocused = root.activeElement === this._element;
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

  /** `MM/DD/YYYY` portion of the masked value (may contain guide chars, or be partial/empty when lazy). */
  public get datePart(): string {
    return this._mask.value.slice(0, DEFAULT_DATE_MASK_LENGTH);
  }
  public set datePart(value: string) {
    this._setParts(value, this.timePart);
  }

  /** Time portion of the masked value after the separator. */
  public get timePart(): string {
    return this._mask.value.slice(TIME_START);
  }
  public set timePart(value: string) {
    this._setParts(this.datePart, value);
  }

  /** imask can't fill slots after an unfilled one, so the time is only kept when the date is complete. */
  private _setParts(date: string, time: string): void {
    const isDateComplete = date.length === DEFAULT_DATE_MASK_LENGTH && !date.includes(PLACEHOLDER_CHAR);
    const hasTime = /[^_:\s]/.test(time);
    this._mask.unmaskedValue = isDateComplete && hasTime ? `${date}${DATE_TIME_MASK_SEPARATOR}${time}` : date;
  }

  private _prepareChar(char: string, flags: AppendFlags): string {
    const inputType = this._mask?._inputEvent?.inputType;
    if (!flags.input || !char.length || inputType !== TYPED_INPUT_TYPE) {
      return char.toUpperCase();
    }

    if (this._mask.cursorPos > DEFAULT_DATE_MASK_LENGTH) {
      return prepareTimeChar(char, this._timeView, this._timePadState, this._options).toUpperCase();
    }

    const isAllSelected = this._isAllSelected();
    if (isAllSelected) {
      Object.assign(this._timePadState, createTimeMaskPadState());
    }
    return prepareDateChar(char, this._dateView, { isAllSelected, useSegmentCursor: true });
  }

  private _isAllSelected(): boolean {
    const { start, end } = this._mask._selection ?? { start: 0, end: 0 };
    return start === 0 && end > 0 && end === this._mask.value.length;
  }

  /** A view of the whole value that hides the format guide, so the date logic sees the same value in both modes. */
  private _createDateView(): IMaskView {
    const mask = (): InputMask<FactoryArg> => this._mask;

    return {
      get value(): string {
        const { value } = mask();
        const guideIndex = value.indexOf(PLACEHOLDER_CHAR);
        return guideIndex === -1 ? value : value.slice(0, guideIndex);
      },
      get cursorPos(): number {
        return mask().cursorPos;
      },
      get _selection(): IMaskSelection {
        return mask()._selection;
      },
      get _inputEvent(): InputEvent | undefined {
        return mask()._inputEvent;
      },
      get unmaskedValue(): string {
        return mask().unmaskedValue;
      },
      set unmaskedValue(value: string) {
        mask().unmaskedValue = value;
      },
      updateCursor(cursorPos: number): void {
        mask().updateCursor(cursorPos);
      }
    };
  }

  /** A view of the time portion with positions relative to the start of the time. */
  private _createTimeView(): IMaskView {
    const mask = (): InputMask<FactoryArg> => this._mask;
    const getSelection = (): IMaskSelection => mask()._selection ?? { start: 0, end: 0 };
    // A char typed on the separator lands in the first time position
    const getReadOffset = (): number => (getSelection().start === DEFAULT_DATE_MASK_LENGTH ? DEFAULT_DATE_MASK_LENGTH : TIME_START);

    return {
      get value(): string {
        return mask().value.slice(TIME_START);
      },
      get cursorPos(): number {
        return mask().cursorPos - getReadOffset();
      },
      get _selection(): IMaskSelection {
        const { start, end } = getSelection();
        return { start: Math.max(0, start - TIME_START), end: end - TIME_START };
      },
      get _inputEvent(): InputEvent | undefined {
        return mask()._inputEvent;
      },
      get unmaskedValue(): string {
        return mask().unmaskedValue.slice(TIME_START);
      },
      set unmaskedValue(value: string) {
        mask().unmaskedValue = `${mask().value.slice(0, DEFAULT_DATE_MASK_LENGTH)}${DATE_TIME_MASK_SEPARATOR}${value}`;
      },
      updateCursor(cursorPos: number): void {
        mask().updateCursor(cursorPos + TIME_START);
      }
    };
  }
}
