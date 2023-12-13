import { ICustomElementFoundation } from '@tylertech/forge-core';
import { ILinearProgressAdapter } from './linear-progress-adapter';
import { LinearProgressTheme, LINEAR_PROGRESS_CONSTANTS } from './linear-progress-constants';

export interface ICircularProgressFoundation extends ICustomElementFoundation {
  determinate: boolean;
  progress: number;
  buffer: number;
  theme: LinearProgressTheme;
}

export class LinearProgressFoundation {
  private _determinate = false;
  private _progress = 0;
  private _buffer = 1;
  private _theme: LinearProgressTheme = 'primary';

  constructor(private _adapter: ILinearProgressAdapter) {}

  public initialize(): void {
    this._adapter.initialize();
  }

  public get determinate(): boolean {
    return this._determinate;
  }
  public set determinate(value: boolean) {
    value = Boolean(value);
    if (this._determinate !== value) {
      this._determinate = value;
      this._adapter.setBuffer(this._determinate ? this._buffer : 1);
      this._adapter.setProgress(this._determinate ? this._progress : 0);
      this._adapter.setDeterminate(this._determinate);
      this._adapter.toggleHostAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.DETERMINATE, this._determinate);
    }
  }

  public get progress(): number {
    return this._progress;
  }
  public set progress(value: number) {
    if (this._progress !== value) {
      this._progress = value;
      if (this._determinate) {
        this._adapter.setProgress(this._progress);
      }
      this._adapter.setHostAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.PROGRESS, String(this._progress));
    }
  }

  public get buffer(): number {
    return this._buffer;
  }
  public set buffer(value: number) {
    if (this._buffer !== value) {
      this._buffer = value;
      if (this._determinate) {
        this._adapter.setBuffer(this._buffer);
      }
      this._adapter.setHostAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.BUFFER, this._buffer.toString());
    }
  }

  public get theme(): LinearProgressTheme {
    return this._theme;
  }
  public set theme(value: LinearProgressTheme) {
    if (this._theme !== value) {
      this._theme = value;
      this._adapter.toggleHostAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.THEME, !!this._theme, this._theme);
    }
  }
}
