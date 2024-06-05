import { ICustomElementFoundation } from '@tylertech/forge-core';

import { ICircularProgressAdapter } from './circular-progress-adapter';
import { CircularProgressTheme, CIRCULAR_PROGRESS_CONSTANTS } from './circular-progress-constants';

export interface ICircularProgressFoundation extends ICustomElementFoundation {
  determinate: boolean;
  progress: number;
  theme: CircularProgressTheme;
  track: boolean;
}

export class CircularProgressFoundation implements ICircularProgressFoundation {
  private _determinate = false;
  private _progress = 0;
  private _theme: CircularProgressTheme = 'primary';
  private _track = false;

  constructor(private _adapter: ICircularProgressAdapter) {}

  public initialize(): void {
    this._adapter.tryApplyGlobalConfiguration(['track']);
    this._adapter.initialize();
    this._applyDeterminate();
  }

  private _applyDeterminate(): void {
    this._adapter.setDeterminate(this._determinate);

    if (this._determinate) {
      this._adapter.setProgress(this._progress);
    }
  }

  public get determinate(): boolean {
    return this._determinate;
  }
  public set determinate(value: boolean) {
    value = Boolean(value);
    if (this._determinate !== value) {
      this._determinate = value;
      this._applyDeterminate();
      this._adapter.toggleHostAttribute(CIRCULAR_PROGRESS_CONSTANTS.attributes.DETERMINATE, this._determinate);
    }
  }

  public get progress(): number {
    return this._progress;
  }
  public set progress(value: number) {
    if (isNaN(value)) {
      value = 0;
    }
    if (this._progress !== value) {
      this._progress = value;
      if (this._determinate) {
        this._adapter.setProgress(this._progress);
      }
      this._adapter.setHostAttribute(CIRCULAR_PROGRESS_CONSTANTS.attributes.PROGRESS, `${this._progress}`);
    }
  }

  public get theme(): CircularProgressTheme {
    return this._theme;
  }
  public set theme(value: CircularProgressTheme) {
    if (this._theme !== value) {
      this._theme = value;
      this._adapter.toggleHostAttribute(CIRCULAR_PROGRESS_CONSTANTS.attributes.THEME, !!this._theme, this._theme);
    }
  }

  public get track(): boolean {
    return this._track;
  }
  public set track(value: boolean) {
    value = Boolean(value);
    if (this._track !== value) {
      this._track = value;
      this._adapter.toggleHostAttribute(CIRCULAR_PROGRESS_CONSTANTS.attributes.TRACK, this._track);
    }
  }
}
