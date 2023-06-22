import { ICustomElementFoundation } from '@tylertech/forge-core';
import { ILinearProgressAdapter } from './linear-progress-adapter';
import { LINEAR_PROGRESS_CONSTANTS } from './linear-progress-constants';

export interface ICircularProgressFoundation extends ICustomElementFoundation {
  determinate: boolean;
  progress: number;
  buffer: number;
}

export class LinearProgressFoundation {
  private _determinate = false;
  private _progress = 0;
  private _buffer = 1;

  constructor(private _adapter: ILinearProgressAdapter) {}

  public set ariaLabel(value: string) {
    this._adapter.setAriaLabel(value);
  }

  public get determinate(): boolean {
    return this._determinate;
  }
  public set determinate(value: boolean) {
    if (this._determinate !== value) {
      this._determinate = value;
      this._adapter.setBuffer(this._determinate ? this._buffer : 1);
      this._adapter.setProgress(this._determinate ? this._progress : 0);
      this._adapter.setDeterminate(this._determinate);
      this._adapter.toggleHostAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.DETERMINATE, value);
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
      this._adapter.setHostAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.PROGRESS, value.toString());
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
      this._adapter.setHostAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.BUFFER, value.toString());
    }
  }
}
