import type { FactoryArg, InputMask } from 'imask';

export interface IMaskSelection {
  start: number;
  end: number;
}

/** The subset of an imask `InputMask` that the custom prepare logic reads and writes. */
export interface IMaskView {
  readonly value: string;
  readonly cursorPos: number;
  readonly _selection: IMaskSelection;
  readonly _inputEvent?: InputEvent;
  unmaskedValue: string;
  updateCursor(cursorPos: number): void;
}

/** Whether the input event is a single typed key; multi-char inserts (IME, dictation, automation) are handled like paste. */
export function isSingleKeyInput(event?: InputEvent): boolean {
  return event?.inputType === 'insertText' && event.data?.length === 1;
}

/** A view that delegates to `getMask()` but reads its `value` through `readValue` and moves the caret through `updateCursor`. */
export function createMaskView(getMask: () => IMaskView, readValue: () => string, updateCursor: (cursorPos: number) => void): IMaskView {
  return {
    get value(): string {
      return readValue();
    },
    get cursorPos(): number {
      return getMask().cursorPos;
    },
    get _selection(): IMaskSelection {
      return getMask()._selection;
    },
    get _inputEvent(): InputEvent | undefined {
      return getMask()._inputEvent;
    },
    get unmaskedValue(): string {
      return getMask().unmaskedValue;
    },
    set unmaskedValue(value: string) {
      getMask().unmaskedValue = value;
    },
    updateCursor
  };
}

/** Lands caret moves made while handling input synchronously, since imask defers them on a timer that background tabs throttle. */
export class MaskCursorSync {
  private _pendingCursorPos?: number;
  private readonly _inputListener = (): void => this._applyPendingCursor();

  /** Create after the `InputMask` so this input listener runs after imask's. */
  constructor(
    private readonly _element: HTMLInputElement,
    private readonly _mask: InputMask<FactoryArg>
  ) {
    this._element.addEventListener('input', this._inputListener);
  }

  public updateCursor(cursorPos: number): void {
    this._pendingCursorPos = cursorPos;
    this._mask.updateCursor(cursorPos);
  }

  public destroy(): void {
    this._element.removeEventListener('input', this._inputListener);
  }

  private _applyPendingCursor(): void {
    const cursorPos = this._pendingCursorPos;
    this._pendingCursorPos = undefined;
    if (cursorPos === undefined) {
      return;
    }
    this._mask._abortUpdateCursor();
    this._mask.cursorPos = cursorPos;
  }
}
