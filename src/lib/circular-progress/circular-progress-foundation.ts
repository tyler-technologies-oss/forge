import { ICustomElementFoundation } from '@tylertech/forge-core';
import { CIRCULAR_PROGRESS_CONSTANTS } from './circular-progress-constants';
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
  private _radius!: number;

  constructor(private _adapter: ICircularProgressAdapter) {}

  public initialize(): void {
    this._open = !this._adapter.hasClass(CIRCULAR_PROGRESS_CONSTANTS.classes.CLOSED);
    this._determinate = !this._adapter.hasClass(CIRCULAR_PROGRESS_CONSTANTS.classes.INDETERMINATE);

    if (this._determinate) {
      this._adapter.setAttribute(
        CIRCULAR_PROGRESS_CONSTANTS.attributes.ARIA_VALUENOW,
        this._progress.toString()
      );
    }

    this._radius = Number(this._adapter.getDeterminateCircleAttribute(CIRCULAR_PROGRESS_CONSTANTS.attributes.RADIUS));
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
    this._adapter.setAttribute(CIRCULAR_PROGRESS_CONSTANTS.attributes.ARIA_LABEL, value);
  }

  private _applyOpen(): void {
    if (this._open) {
      this._adapter.removeClass(CIRCULAR_PROGRESS_CONSTANTS.classes.CLOSED);
      this._adapter.removeAttribute(CIRCULAR_PROGRESS_CONSTANTS.attributes.ARIA_HIDDEN);
    } else {
      this._adapter.addClass(CIRCULAR_PROGRESS_CONSTANTS.classes.CLOSED);
      this._adapter.setAttribute(CIRCULAR_PROGRESS_CONSTANTS.attributes.ARIA_HIDDEN, 'true');
    }
  }

  private _applyDeterminate(): void {
    if (this._determinate) {
      this._adapter.removeClass(CIRCULAR_PROGRESS_CONSTANTS.classes.INDETERMINATE);
      this._applyProgress();
    } else {
      this._adapter.addClass(CIRCULAR_PROGRESS_CONSTANTS.classes.INDETERMINATE);
      this._adapter.removeAttribute(CIRCULAR_PROGRESS_CONSTANTS.attributes.ARIA_VALUENOW);
    }
  }

  private _applyProgress(): void {
    if (this.determinate) {
      const unfilledArcLength =
          (1 - this.progress) * (2 * Math.PI * this._radius);

      this._adapter.setDeterminateCircleAttribute(
        CIRCULAR_PROGRESS_CONSTANTS.attributes.STROKE_DASHOFFSET, `${unfilledArcLength}`
      );
      this._adapter.setAttribute(
        CIRCULAR_PROGRESS_CONSTANTS.attributes.ARIA_VALUENOW,
        this.progress.toString()
      );
    }
  }
}
