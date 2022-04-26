import { ICustomElementFoundation } from '@tylertech/forge-core';
import { LINEAR_PROGRESS_CONSTANTS } from './linear-progress-constants';
import { getCorrectPropertyName } from '../utils/animation';
import { ILinearProgressAdapter } from './linear-progress-adapter';

export interface ILinearProgressFoundation extends ICustomElementFoundation {
  open: boolean;
  determinate: boolean;
  progress: number;
  buffer: number;
  ariaLabel: string;
}

export class LinearProgressFoundation implements ILinearProgressFoundation {
  private _open = true;
  private _determinate = false;
  private _progress = 0;
  private _buffer = 0;
  private _observer: ResizeObserver | null = null;

  constructor(private _adapter: ILinearProgressAdapter) { }

  public initialize(): void {
    this._open = !this._adapter.hasClass(LINEAR_PROGRESS_CONSTANTS.classes.CLOSED);
    this._determinate = !this._adapter.hasClass(LINEAR_PROGRESS_CONSTANTS.classes.INDETERMINATE);
    this._adapter.addClass(LINEAR_PROGRESS_CONSTANTS.classes.ANIMATION_READY);

    this._observer = this._adapter.attachResizeObserver((entries) => {
      if (this._determinate) {
        return;
      }

      for (const entry of entries) {
        if (entry.contentRect) {
          this._calculateAndSetDimensions(entry.contentRect.width);
        }
      }
    });

    if (!this._determinate && this._observer) {
      this._calculateAndSetDimensions(this._adapter.getWidth());
    }

    this._applyDeterminate();
  }

  public disconnect(): void {
    if (this._observer) {
      this._observer.disconnect();
    }
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

  public get buffer(): number {
    return this._buffer;
  }
  public set buffer(value: number) {
    if (this._buffer !== value) {
      this._buffer = value;
      this._applyBuffer();
    }
  }

  public set ariaLabel(value: string) {
    this._adapter.setAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.ARIA_LABEL, value);
  }

  public handleTransitionEnd(): void {
    if (this._adapter.hasClass(LINEAR_PROGRESS_CONSTANTS.classes.CLOSED)) {
      this._adapter.addClass(LINEAR_PROGRESS_CONSTANTS.classes.CLOSED_ANIMATION_OFF);
    }
  }

  public restartAnimation(): void {
    this._adapter.removeClass(LINEAR_PROGRESS_CONSTANTS.classes.ANIMATION_READY);
    this._adapter.forceLayout();
    this._adapter.addClass(LINEAR_PROGRESS_CONSTANTS.classes.ANIMATION_READY);
  }

  private _applyOpen(): void {
    if (this._open) {
      this._adapter.removeClass(LINEAR_PROGRESS_CONSTANTS.classes.CLOSED);
      this._adapter.removeClass(LINEAR_PROGRESS_CONSTANTS.classes.CLOSED_ANIMATION_OFF);
      this._adapter.removeAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.ARIA_HIDDEN);
    } else {
      this._adapter.addClass(LINEAR_PROGRESS_CONSTANTS.classes.CLOSED);
      this._adapter.setAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.ARIA_HIDDEN, 'true');
    }
  }

  private _applyDeterminate(): void {
    if (this._determinate) {
      this._adapter.removeClass(LINEAR_PROGRESS_CONSTANTS.classes.INDETERMINATE);
      this._adapter.setAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.ARIA_VALUENOW, this._progress.toString());
      this._adapter.setAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.ARIA_VALUEMAX, '1');
      this._adapter.setAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.ARIA_VALUEMIN, '0');
      this._adapter.setHostAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.DETERMINATE, this._determinate.toString());
      this._applyPrimaryBarProgress(this._progress);
      this._applyBufferBarProgress(this._buffer);

      return;
    }

    if (this._observer) {
      this._calculateAndSetDimensions(this._adapter.getWidth());
    }

    this._adapter.addClass(LINEAR_PROGRESS_CONSTANTS.classes.INDETERMINATE);
    this._adapter.removeAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.ARIA_VALUENOW);
    this._adapter.removeAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.ARIA_VALUEMAX);
    this._adapter.removeAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.ARIA_VALUEMIN);
    this._applyPrimaryBarProgress(1);
    this._applyBufferBarProgress(1);
  }

  private _applyProgress(): void {
    if (this._determinate) {
      this._applyPrimaryBarProgress(this._progress);
      this._adapter.setAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.ARIA_VALUENOW, this._progress.toString());
      this._adapter.setHostAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.PROGRESS, this._progress.toString());
    }
  }

  private _applyBuffer(): void {
    if (this._determinate) {
      this._applyBufferBarProgress(this._buffer);
      this._adapter.setHostAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.BUFFER, this._buffer.toString());
    }
  }

  private _applyPrimaryBarProgress(progressValue: number): void {
    const value = `scaleX(${progressValue})`;

    // Accessing `window` without a `typeof` check will throw on Node
    // environments.
    const transformProp = typeof window !== 'undefined' ?
      getCorrectPropertyName(window, 'transform') :
      'transform';
    this._adapter.setPrimaryBarStyle(transformProp, value);
  }

  private _applyBufferBarProgress(progressValue: number): void {
    const value = `${progressValue * 100}%`;
    this._adapter.setBufferBarStyle(LINEAR_PROGRESS_CONSTANTS.styleProperties.FLEX_BASIS, value);
  }

  private _calculateAndSetDimensions(width: number): void {
    const { PRIMARY_HALF, PRIMARY_FULL, SECONDARY_QUARTER, SECONDARY_HALF, SECONDARY_FULL } = LINEAR_PROGRESS_CONSTANTS.animationDimensionPercentages;
    const primaryHalf = width * PRIMARY_HALF;
    const primaryFull = width * PRIMARY_FULL;
    const secondaryQuarter = width * SECONDARY_QUARTER;
    const secondaryHalf = width * SECONDARY_HALF;
    const secondaryFull = width * SECONDARY_FULL;

    this._adapter.setStyle('--mdc-linear-progress-primary-half', `${primaryHalf}px`);
    this._adapter.setStyle('--mdc-linear-progress-primary-half-neg', `${- primaryHalf}px`);
    this._adapter.setStyle('--mdc-linear-progress-primary-full', `${primaryFull}px`);
    this._adapter.setStyle('--mdc-linear-progress-primary-full-neg', `${- primaryFull}px`);
    this._adapter.setStyle('--mdc-linear-progress-secondary-quarter', `${secondaryQuarter}px`);
    this._adapter.setStyle('--mdc-linear-progress-secondary-quarter-neg', `${- secondaryQuarter}px`);
    this._adapter.setStyle('--mdc-linear-progress-secondary-half', `${secondaryHalf}px`);
    this._adapter.setStyle('--mdc-linear-progress-secondary-half-neg', `${- secondaryHalf}px`);
    this._adapter.setStyle('--mdc-linear-progress-secondary-full', `${secondaryFull}px`);
    this._adapter.setStyle('--mdc-linear-progress-secondary-full-neg', `${- secondaryFull}px`);

    // need to restart animation for custom props to apply to keyframes
    this.restartAnimation();
  }
}
