import { getShadowElement } from '@tylertech/forge-core';
import { MDCCircularProgress } from '@material/circular-progress';

import { ICircularProgressComponent } from './circular-progress';
import { CIRCULAR_PROGRESS_CONSTANTS } from './circular-progress-constants';

export interface ICircularProgressAdapter {
  initialize(): void;
  destroy(): void;
  open(): void;
  close(): void;
  setDeterminate(value: boolean): void;
  setProgress(value: number): void;
  setAriaLabel(value: string): void;
}

export class CircularProgressAdapter implements ICircularProgressAdapter {
  private _rootElement: HTMLElement;
  private _mdcCircularProgress: MDCCircularProgress;

  constructor(private _component: ICircularProgressComponent) {
    this._rootElement = getShadowElement(this._component, CIRCULAR_PROGRESS_CONSTANTS.selectors.ROOT);
  }

  public initialize(): void {
    this._mdcCircularProgress = new MDCCircularProgress(this._rootElement);
  }

  public destroy(): void {
    this._mdcCircularProgress?.destroy();
  }

  public setDeterminate(value: boolean): void {
    if (this._mdcCircularProgress) {
      this._mdcCircularProgress.determinate = value;
    }
  }

  public setProgress(value: number): void {
    if (this._mdcCircularProgress) {
      this._mdcCircularProgress.progress = value;
    }
  }

  public open(): void {
    this._mdcCircularProgress?.open();
  }

  public close(): void {
    this._mdcCircularProgress?.close();
  }

  public setAriaLabel(value: string): void {
    this._rootElement.setAttribute('aria-label', value);
  }
}
