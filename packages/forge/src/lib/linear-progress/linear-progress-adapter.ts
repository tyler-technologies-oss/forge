import { getShadowElement } from '@tylertech/forge-core';
import { setDefaultAria } from '../constants.js';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter.js';
import { ILinearProgressComponent } from './linear-progress.js';
import { LINEAR_PROGRESS_CONSTANTS } from './linear-progress-constants.js';

export interface ILinearProgressAdapter extends IBaseAdapter {
  initialize(): void;
  setDeterminate(value: boolean): void;
  setProgress(value: number): void;
  setBuffer(value: number): void;
}

export class LinearProgressAdapter extends BaseAdapter<ILinearProgressComponent> implements ILinearProgressAdapter {
  private readonly _rootElement: HTMLElement;
  private readonly _trackElement: HTMLElement;
  private readonly _progressElement: HTMLElement;

  constructor(component: ILinearProgressComponent) {
    super(component);
    this._rootElement = getShadowElement(component, LINEAR_PROGRESS_CONSTANTS.selectors.ROOT);
    this._trackElement = getShadowElement(component, LINEAR_PROGRESS_CONSTANTS.selectors.TRACK);
    this._progressElement = getShadowElement(component, LINEAR_PROGRESS_CONSTANTS.selectors.PROGRESS);
  }

  public initialize(): void {
    this._component[setDefaultAria]({
      role: 'progressbar',
      ariaValueMin: '0',
      ariaValueMax: '1',
      ariaValueNow: this._component.determinate ? `${this._component.progress}` : null
    });
  }

  public setDeterminate(value: boolean): void {
    this._component[setDefaultAria]({ ariaValueNow: value ? `${this._component.progress}` : null });
    if (value) {
      this.setProgress(this._component.progress);
    } else {
      this._trackElement.style.transform = 'scaleX(100%)';
      this._progressElement.style.transform = '';
    }
    this._rootElement.classList.toggle(LINEAR_PROGRESS_CONSTANTS.classes.INDETERMINATE, !value);
  }

  public setProgress(value: number): void {
    this._component[setDefaultAria]({ ariaValueNow: `${value}` });
    this._progressElement.style.transform = `scaleX(${value * 100}%)`;
  }

  public setBuffer(value: number): void {
    this._trackElement.style.transform = `scaleX(${value * 100}%)`;
  }
}
