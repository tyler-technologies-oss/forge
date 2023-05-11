import { InputMask } from 'imask';
import { ITimeInputMaskOptions } from './time-input-mask';
import { TimeSegmentParser, TimeSegmentType } from './time-segment-parser';

export class IntermediateTimeParser {
  private segmentParser: TimeSegmentParser;

  constructor(
    private _char: string,
    private _mask: InputMask<IMask.AnyMaskedOptions>) {
    this.segmentParser = new TimeSegmentParser(this._mask.value, this._char);
  }

  public get value(): string {
    return this._isAllSelected ? '' : this._mask.value.replace(/\s+|_/g, '');
  }

  public get numChar(): number {
    return Number(this._char);
  }

  public get asPaddedChar(): string {
    return String(this.numChar).padStart(2, '0');
  }

  private get _isAllSelected(): boolean {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    const { start, end } = this._mask['_selection'];
    return start === 0 && end > 0 && end === this._mask.value.length;
  }

  /** Determines if this is the first non-zero hours character being entered. */
  public get isFirstHoursChar(): boolean {
    return this._mask.cursorPos === 1 && this.numChar > 0;
  }

  /** Determines if this is the first minutes char being entered */
  public get isFirstMinutesChar(): boolean {
    return [3, 4].includes(this._mask.cursorPos) && this.segmentParser.minutes.length !== 2;
  }

  public get isFirstSecondsChar(): boolean {
    return [6, 7].includes(this._mask.cursorPos) && this.segmentParser.seconds.length !== 2;
  }

  public get isFinalHoursChar(): boolean {
    // console.log('this._mask.cursorPos === 2 && this.segmentParser.hours.length === 2', this._mask.cursorPos, this.segmentParser.hours.length);
    return this._mask.cursorPos === 3 && this.segmentParser.hours.length === 2;
  }

  public get isFinalMinutesChar(): boolean {
    return this._mask.cursorPos === 6 && this.segmentParser.minutes.length === 2;
  }

  public get isFinalSecondsChar(): boolean {
    return this._mask.cursorPos === 9 && this.segmentParser.seconds.length === 2;
  }

  public get isInitialEntry(): boolean {
    return this.value.length === 0;
  }

  public get hasOnlyHoursSegment(): boolean {
    return !!this.segmentParser.hours && !this.segmentParser.minutes && !this.segmentParser.seconds;
  }

  public get hoursSegmentNum(): number {
    return Number(this.segmentParser.hours);
  }

  public get minutesSegmentNum(): number {
    return Number(this.segmentParser.minutes);
  }

  public get secondsSegmentNum(): number {
    return Number(this.segmentParser.seconds);
  }

  public get canOverwriteHoursChar(): boolean {
    return this._mask.cursorPos === 3 && !!this.segmentParser.hours.length && this.hoursSegmentNum < 3;
  }

  public get canOverwriteMinutesChar(): boolean {
    return [5, 6].includes(this._mask.cursorPos) && !!this.segmentParser.minutes.length && this.minutesSegmentNum < 60;
  }

  public get canOverwriteSecondsChar(): boolean {
    return [8, 9].includes(this._mask.cursorPos) && !!this.segmentParser.seconds.length && this.secondsSegmentNum < 60;
  }

  public patchUnmaskedValue(value: string, cursorPos?: number): void {
    this._mask.unmaskedValue = value;
    if (cursorPos !== undefined) {
      window.requestAnimationFrame(() => this._mask.updateCursor(cursorPos));
    }
  }

  // public process(): string {
  //   const segmentParser = new TimeSegmentParser(this._mask.value, this._char);
  //   const { segment, value } = segmentParser.getSegmentByCursorPosition(this._mask.cursorPos);

  //   // We don't handle any parsing of meridiem values
  //   if (segment === 'meridiem') {
  //     return this._char;
  //   }

  //   const isSegmentFirstEntry = value.length === 1;
  //   const isSegmentLastEntry = value.length > 1;

  //   if (isSegmentFirstEntry) {
  //     // console.log('First segment entry:', segment);
  //     segmentParser.patchSegmentValue(segment, value);
  //     this.patchUnmaskedValue(segmentParser.toString(), this._getCursorPositionBySegment(segment));
  //   } else if (isSegmentLastEntry) {
  //     // console.log('Last segment entry:', segment);
  //     const numNewSegment = Number(`${value}${this._char}`);
  //     if (numNewSegment <= (segment === 'hours' ? 12 : 59)) {
  //       segmentParser.patchSegmentValue(segment, String(numNewSegment));
  //       this.patchUnmaskedValue(segmentParser.toString(), this._getCursorPositionBySegment(segment));
  //     }
  //   } else {
  //     // console.log('Overwrite segment:', segment, value);
  //     const numValue = Number(value);

  //     if (segment === 'hours') {
  //       if (numValue <= 12 || (this._options.use24HourTime && numValue <= 23)) {
  //         segmentParser.patchSegmentValue(segment, String(numValue));
  //       } else {
  //         segmentParser.patchSegmentValue('minutes', `${this._mask.value}${this.asPaddedChar}`);
  //       }
  //     } else {
  //       if (numValue < 60) {
  //         segmentParser.patchSegmentValue(segment, String(numValue));
  //       } else {
  //         let newSegment = segment;
  //         if (segment === 'minutes' && this._options.showSeconds) {
  //           newSegment = 'seconds';
  //         }
  //         segmentParser.patchSegmentValue(newSegment, `${this._mask.value}${this.asPaddedChar}`);
  //       }
  //     }

  //     this.patchUnmaskedValue(segmentParser.toString(), this._getCursorPositionBySegment(segment) + 1);
  //   }

  //   return ':';
  // }

  // private _getCursorPositionBySegment(segment: TimeSegmentType): number {
  //   switch (segment) {
  //     case 'hours':
  //       return 2;
  //     case 'minutes':
  //       return 5;
  //     case 'seconds':
  //       return 8;
  //     default:
  //       return 11;
  //   }
  // }
}
