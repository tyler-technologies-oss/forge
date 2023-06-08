import { ICustomElementFoundation } from '@tylertech/forge-core';

import { ICircularProgressAdapter } from './circular-progress-adapter';
import { CIRCULAR_PROGRESS_CONSTANTS } from './circular-progress-constants';

export interface ICircularProgressFoundation extends ICustomElementFoundation {
  determinate: boolean;
  progress: number;
}

export class CircularProgressFoundation implements ICircularProgressFoundation {
  private _determinate = false;
  private _progress = 0;

  constructor(private _adapter: ICircularProgressAdapter) {}

  public initialize(): void {
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
    if (this._progress !== value) {
      this._progress = value;
      if (this._determinate) {
        this._adapter.setProgress(this._progress);
      }
      this._adapter.setHostAttribute(CIRCULAR_PROGRESS_CONSTANTS.attributes.PROGRESS, `${this._progress}`);
    }
  }

  public set ariaLabel(value: string) {
    this._adapter.setAriaLabel(value);
  }
}
