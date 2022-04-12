import { ICustomElementFoundation } from '@tylertech/forge-core';

import { ICircularProgressAdapter } from './circular-progress-adapter';

export interface ICircularProgressFoundation extends ICustomElementFoundation {
  open: boolean;
  determinate: boolean;
  progress: number;
  ariaLabel: string;
}

export class CircularProgressFoundation implements ICircularProgressFoundation {
  private _open = true;
  private _determinate = false;
  private _progress = 0;

  constructor(private _adapter: ICircularProgressAdapter) {}

  public initialize(): void {
    this._adapter.initialize();
    this._applyOpen();
    this._applyDeterminate();
    this._applyProgress();
  }

  public disconnect(): void {
    this._adapter.destroy();
  }

  private _applyOpen(): void {
    if (this._open) {
      this._adapter.open();
    } else {
      this._adapter.close();
    }
  }

  private _applyDeterminate(): void {
    this._adapter.setDeterminate(this._determinate);
  }


  private _applyProgress(): void {
    this._adapter.setProgress(this._progress);
  }

  public get open(): boolean {
    return this._open;
  }
  public set open(value: boolean) {
    if (this._open !== value) {
      this._open = value;
      this._applyOpen();
    }
  }

  public get determinate(): boolean {
    return this._determinate;
  }
  public set determinate(value: boolean) {
    if (this._determinate !== value) {
      this._determinate = value;
      this._applyDeterminate();
    }
  }

  public get progress(): number {
    return this._progress;
  }
  public set progress(value: number) {
    if (this._progress !== value) {
      this._progress = value;
      this._applyProgress();
    }
  }

  public set ariaLabel(value: string) {
    this._adapter.setAriaLabel(value);
  }
}
