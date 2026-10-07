import { InputMask, type AppendFlags, type FactoryArg, type Masked } from 'imask';
import { DEFAULT_DATE_MASK, DEFAULT_DATE_MASK_FORMAT, DEFAULT_DATE_MASK_LENGTH, prepareDateChar } from './date-input-mask.js';
import { createLetterGuideMask, toUnderscoreGuide, UNDERSCORE_GUIDE_CHAR } from './letter-guide.js';
import { createMaskView, isSingleKeyInput, MaskCursorSync, type IMaskSelection, type IMaskView } from './mask-view.js';
import { createTimeMaskBlocks, createTimeMaskPadState, getTimeMaskFormat, getTimeMaskPattern, prepareTimeChar } from './time-input-mask.js';

export interface IDateTimeInputMaskOptions {
  showMaskFormat?: boolean;
  use24HourTime?: boolean;
  showSeconds?: boolean;
  /** Shows the format letters (`MM/DD/YYYY hh:mm aa`) instead of `_` in unfilled slots of the guide. */
  letterGuide?: boolean;
  onChange?: (value: string) => void;
}

export const DATE_TIME_MASK_SEPARATOR = ' ';

const TIME_START = DEFAULT_DATE_MASK_LENGTH + DATE_TIME_MASK_SEPARATOR.length;

/** Returns the display format of the combined mask, e.g. `MM/DD/YYYY hh:mm aa`. */
export function getDateTimeMaskFormat(use24HourTime: boolean, showSeconds: boolean): string {
  return `${DEFAULT_DATE_MASK_FORMAT}${DATE_TIME_MASK_SEPARATOR}${getTimeMaskFormat(use24HourTime, showSeconds)}`;
}

/** Input mask for a combined `MM/DD/YYYY` date and time value in a single input. */
export class DateTimeInputMask {
  private readonly _mask: InputMask<FactoryArg>;
  private readonly _dateView: IMaskView;
  private readonly _timeView: IMaskView;
  private readonly _timePadState = createTimeMaskPadState();
  private readonly _format: string;
  private readonly _cursorSync: MaskCursorSync;
  private readonly _acceptListener?: () => void;

  constructor(
    private readonly _element: HTMLInputElement,
    private readonly _options: IDateTimeInputMaskOptions = {}
  ) {
    const { use24HourTime, showSeconds, letterGuide } = this._options;
    const pattern = `${DEFAULT_DATE_MASK}{${DATE_TIME_MASK_SEPARATOR}}\`${getTimeMaskPattern(use24HourTime, showSeconds)}`;
    this._format = getDateTimeMaskFormat(!!use24HourTime, !!showSeconds);
    this._dateView = this._createDateView();
    this._timeView = this._createTimeView();
    this._mask = new InputMask(this._element, {
      mask: pattern,
      lazy: !this._options.showMaskFormat,
      overwrite: true,
      prepareChar: (char: string, _masked: unknown, flags: AppendFlags) => this._prepareChar(char, flags),
      ...(letterGuide && { ...createLetterGuideMask(pattern, this._format), prepare: this._stripGuide }),
      blocks: createTimeMaskBlocks(letterGuide)
    });
    this._cursorSync = new MaskCursorSync(this._element, this._mask);
    if (this._options.onChange) {
      this._acceptListener = () => this._options.onChange?.(this._mask.value);
      this._mask.on('accept', this._acceptListener);
    }
  }

  public destroy(): void {
    if (this._acceptListener) {
      this._mask.off('accept', this._acceptListener);
    }
    this._cursorSync.destroy();
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

  /** `maskedValue` with letter-guide slots read back as `_`. */
  public get normalizedValue(): string {
    const { value } = this._mask;
    return this._options.letterGuide ? toUnderscoreGuide(value, this._format) : value;
  }

  /** `MM/DD/YYYY` portion of the value (may contain `_` guide chars, or be partial/empty when lazy). */
  public get datePart(): string {
    return this.normalizedValue.slice(0, DEFAULT_DATE_MASK_LENGTH);
  }
  public set datePart(value: string) {
    this._setParts(value, this.timePart);
  }

  /** Time portion of the masked value after the separator. */
  public get timePart(): string {
    return this.normalizedValue.slice(TIME_START);
  }
  public set timePart(value: string) {
    this._setParts(this.datePart, value);
  }

  /** imask can't fill slots after an unfilled one, so the time is only kept when the date is complete. */
  private _setParts(date: string, time: string): void {
    const isDateComplete = date.length === DEFAULT_DATE_MASK_LENGTH && !date.includes(UNDERSCORE_GUIDE_CHAR);
    const hasTime = /[^_:\s]/.test(time);
    this._mask.unmaskedValue = isDateComplete && hasTime ? `${date}${DATE_TIME_MASK_SEPARATOR}${time}` : date;
  }

  // Re-appended display text (guide toggle, value sets) must not turn the `aa` guide into a meridiem.
  private readonly _stripGuide = (value: string, masked: Masked<string>): string => toUnderscoreGuide(value, this._format, masked.displayValue.length);

  private _prepareChar(char: string, flags: AppendFlags): string {
    if (!flags.input || !char.length || !isSingleKeyInput(this._mask?._inputEvent)) {
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
    return createMaskView(
      () => this._mask,
      () => {
        const value = this.normalizedValue;
        const guideIndex = value.indexOf(UNDERSCORE_GUIDE_CHAR);
        return guideIndex === -1 ? value : value.slice(0, guideIndex);
      },
      cursorPos => this._cursorSync.updateCursor(cursorPos)
    );
  }

  /** A view of the time portion with positions relative to the start of the time. */
  private _createTimeView(): IMaskView {
    const mask = (): InputMask<FactoryArg> => this._mask;
    const readValue = (): string => this.normalizedValue;
    const cursorSync = (): MaskCursorSync => this._cursorSync;
    const getSelection = (): IMaskSelection => mask()._selection ?? { start: 0, end: 0 };
    // A char typed on the separator lands in the first time position
    const getReadOffset = (): number => (getSelection().start === DEFAULT_DATE_MASK_LENGTH ? DEFAULT_DATE_MASK_LENGTH : TIME_START);

    return {
      get value(): string {
        return readValue().slice(TIME_START);
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
        mask().unmaskedValue = `${readValue().slice(0, DEFAULT_DATE_MASK_LENGTH)}${DATE_TIME_MASK_SEPARATOR}${value}`;
      },
      updateCursor(cursorPos: number): void {
        cursorSync().updateCursor(cursorPos + TIME_START);
      }
    };
  }
}
