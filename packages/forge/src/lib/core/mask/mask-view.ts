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
