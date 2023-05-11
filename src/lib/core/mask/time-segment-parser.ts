export type TimeSegmentType = 'hours' | 'minutes' | 'seconds' | 'meridiem';

export interface ISegmentDescriptor {
  segment: TimeSegmentType;
  value: string;
}

const SEGMENT_INDEX_DICT: Record<TimeSegmentType, number> = {
  hours: 0,
  minutes: 1,
  seconds: 2,
  meridiem: 3
};

export class TimeSegmentParser {
  private _segments: string[];

  constructor(private _timeStr: string, private _char: string) {
    this._segments = this._parseSegments(_timeStr);
  }

  public get hours(): string {
    return this._segments[SEGMENT_INDEX_DICT.hours];
  }

  public get minutes(): string {
    return this._segments[SEGMENT_INDEX_DICT.minutes];
  }

  public get seconds(): string {
    return this._segments[SEGMENT_INDEX_DICT.seconds];
  }

  public get meridiem(): string {
    return this._segments[SEGMENT_INDEX_DICT.meridiem];
  }

  public patchSegmentValue(type: TimeSegmentType, value: string): string {
    const index = SEGMENT_INDEX_DICT[type];
    this._segments[index] = value.padStart(2, '0');
    return this._segments[index];
  }

  public toString(): string {
    const [hours, minutes, seconds, meridiem] = this._segments;
    const timeStr = [hours, minutes, seconds].filter(v => !!v.length);
    return `${timeStr.join(':')}${meridiem}`;
  }

  private _parseSegments(timeStr: string): string[] {
    const [time, meridiem = ''] = timeStr.trim().replace(/\s+|_/g, '').split(/([AaPp][Mm]?)/);
    const [hours = '', minutes = '', seconds = ''] = time.split(':');
    return [hours, minutes, seconds, meridiem];
  }

  // public getSegmentByCursorPosition(pos: number): ISegmentDescriptor {
  //   const intermediateTimeStr = `${this._timeStr.substring(0, pos - 1)}${this._char}${this._timeStr.substring(pos - 1)}`;
  //   const [hours, minutes, seconds, meridiem] = this._parseSegments(intermediateTimeStr);

  //   if ([1, 2].includes(pos) && this._isSegmentValidAtPosition(0, intermediateTimeStr)) {
  //     return { segment: 'hours', value: hours };
  //   }
    
  //   // if ([3, 4, 5, 6].includes(pos) && isNumber(+intermediateTimeStr[5]) && isNumber(+intermediateTimeStr[6])) {
  //   if ([3, 4, 5].includes(pos) && this._isSegmentValidAtPosition(3, intermediateTimeStr)) {
  //     return { segment: 'minutes', value: minutes };
  //   }
    
  //   // if (this._allowSeconds && [6, 7, 8, 9].includes(pos) && this._isSegmentValidAtPosition(6, intermediateTimeStr)) {
  //   // // if ([6, 7, 8, 9].includes(pos) && isNumber(+intermediateTimeStr[8]) && isNumber(+intermediateTimeStr[9])) {
  //   //   return { segment: 'seconds', value: seconds };
  //   // }

  //   return { segment: 'meridiem', value: meridiem };
  // }

  // private _isSegmentValidAtPosition(start: number, timeStr: string): boolean {
  //   const segment = timeStr.substring(start, start + 3);
  //   return isNumber(+segment.substring(-2));
  // }
}
