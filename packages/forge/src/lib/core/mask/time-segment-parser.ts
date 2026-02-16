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

  constructor(timeStr: string) {
    this._segments = this._parseSegments(timeStr);
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

  public applyValue(timeStr: string): void {
    this._segments = this._parseSegments(timeStr);
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
    const [time, meridiem = ''] = timeStr
      .trim()
      .replace(/\s+|_/g, '')
      .split(/([AaPp][Mm]?)/);
    const [hours = '', minutes = '', seconds = ''] = time.split(':');
    return [hours, minutes, seconds, meridiem];
  }
}
