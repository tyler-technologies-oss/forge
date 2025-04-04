import { InputMask, type FactoryArg } from 'imask';
import { TimeSegmentParser, TimeSegmentType } from './time-segment-parser';

export const SEGMENT_CURSOR_POSITION = {
  'hours-start': 0,
  'hours-end': 2,
  'minutes-start': 3,
  'minutes-end': 5,
  'seconds-start': 6,
  'seconds-end': 8,
  'meridiem-start': 9,
  'meridiem-end': 11
};

export class IntermediateTimeParser {
  private _segmentParser: TimeSegmentParser;

  constructor(
    private _char: string,
    private _mask: InputMask<FactoryArg>
  ) {
    this._segmentParser = new TimeSegmentParser(this._mask.value);
  }

  public get value(): string {
    return this.isAllSelected ? '' : this._normalizeTimeString(this._mask.value);
  }

  public get numChar(): number {
    return Number(this._char);
  }

  public get asPaddedChar(): string {
    return String(this.numChar).padStart(2, '0');
  }

  private _normalizeTimeString(str: string): string {
    // Remove all whitespace and placeholder chars
    let value = str.replace(/\s+|_/g, '');

    // If the time value only contains separator chars (:) then we can assume it's empty (applicable when the mask format is visible)
    if (/^:+$/.test(value)) {
      value = '';
    }

    return value;
  }

  public get isAllSelected(): boolean {
    const { start, end } = this._mask._selection;
    return start === 0 && end > 0 && end === this._mask.value.length;
  }

  /** Determines if this is the first non-zero hours character being entered. */
  public get isFirstHoursChar(): boolean {
    return this._mask.cursorPos === 1 && this.numChar > 0;
  }

  /** Determines if this is the first minutes char being entered */
  public get isFirstMinutesChar(): boolean {
    return [3, 4].includes(this._mask.cursorPos) && this._segmentParser.minutes.length !== 2;
  }

  public get isFirstSecondsChar(): boolean {
    return [6, 7].includes(this._mask.cursorPos) && this._segmentParser.seconds.length !== 2;
  }

  public get isFinalHoursChar(): boolean {
    return this._mask.cursorPos === 3 && this._segmentParser.hours.length === 2;
  }

  public get isFinalMinutesChar(): boolean {
    return this._mask.cursorPos === 6 && this._segmentParser.minutes.length === 2;
  }

  public get isFinalSecondsChar(): boolean {
    return this._mask.cursorPos === 9 && this._segmentParser.seconds.length === 2;
  }

  public get isInitialHoursEntry(): boolean {
    return this._segmentParser.hours.length === 0;
  }

  public get hasOnlyHoursSegment(): boolean {
    return !!this._segmentParser.hours && !this._segmentParser.minutes && !this._segmentParser.seconds;
  }

  public get hoursSegmentNum(): number {
    return Number(this._segmentParser.hours);
  }

  public get minutesSegmentNum(): number {
    return Number(this._segmentParser.minutes);
  }

  public get secondsSegmentNum(): number {
    return Number(this._segmentParser.seconds);
  }

  public get canOverwriteHoursChar(): boolean {
    return this._mask.cursorPos === 3 && !!this._segmentParser.hours.length && this.hoursSegmentNum < 3;
  }

  public get canOverwriteMinutesChar(): boolean {
    return [5, 6].includes(this._mask.cursorPos) && !!this._segmentParser.minutes.length && this.minutesSegmentNum < 60;
  }

  public get canOverwriteSecondsChar(): boolean {
    return [8, 9].includes(this._mask.cursorPos) && !!this._segmentParser.seconds.length && this.secondsSegmentNum < 60;
  }

  public reset(): void {
    this._segmentParser.applyValue('');
  }

  public patchSegmentValue(type: TimeSegmentType, value: string, { overwrite = false } = {}): string {
    if (overwrite) {
      this.reset();
    }
    this._segmentParser.patchSegmentValue(type, value);
    return this._segmentParser.toString();
  }

  public applyValue(value: string, cursorPos?: keyof typeof SEGMENT_CURSOR_POSITION): void {
    this._mask.unmaskedValue = value;
    if (cursorPos !== undefined) {
      this._mask.updateCursor(SEGMENT_CURSOR_POSITION[cursorPos]);
    }
  }
}
