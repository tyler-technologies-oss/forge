import { InputMask } from 'imask';
import { ITimeInputMaskOptions } from './time-input-mask';

export class IntermediateTimeParser {
  constructor(
    private _char: string,
    private _instance: InputMask<IMask.AnyMaskedOptions>,
    private _options: ITimeInputMaskOptions) {}

  public get value(): string {
    return this._isAllSelected ? '' : this._instance.unmaskedValue;
  }

  public get numChar(): number {
    return Number(this._char);
  }

  public get asPaddedChar(): string {
    return String(this.numChar).padStart(2, '0');
  }

  public get segments(): string[] {
    return this.value.split(':').filter(s => !!s);
  }

  private get _isAllSelected(): boolean {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    return this._instance['_selection']?.end === this._instance.value.length;
  }

  /** Determines if this is the first non-zero hours character being entered. */
  public get isFirstHoursChar(): boolean {
    return this._instance.cursorPos === 1 && this.numChar > 0;
  }

  /** Determines if this is the first minutes char being entered */
  public get isFirstMinutesChar(): boolean {
    return [3, 4].includes(this._instance.cursorPos) && this.numChar > 5;
  }

  public get isFirstSecondsChar(): boolean {
    return [6, 7].includes(this._instance.cursorPos) && this.numChar > 5;
  }

  public get isFinalHoursChar(): boolean {
    return this._instance.cursorPos === 2 && this.value.length === 1;
  }

  public get isFinalMinutesChar(): boolean {
    return this._instance.cursorPos === 5 && this.value.length === 4;
  }

  public get isFinalSecondsChar(): boolean {
    return this._instance.cursorPos === 8 && this.value.length === 6;
  }

  public get isInitialEntry(): boolean {
    return this.value.length === 0;
  }

  public get hasOnlyHoursSegment(): boolean {
    return this.segments.length === 1;
  }

  public get hoursSegmentNum(): number {
    return Number(this.segments[0]);
  }

  public get canOverwriteHoursChar(): boolean {
    return this._instance.cursorPos === 3 && this.hoursSegmentNum < 3;
  }
}
