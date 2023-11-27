import { getShadowElement } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import { ILinearProgressComponent } from './linear-progress';
import { LINEAR_PROGRESS_CONSTANTS } from './linear-progress-constants';

export interface ILinearProgressAdapter extends IBaseAdapter {
  initialize(): void;
  setDeterminate(value: boolean): void;
  setProgress(value: number): void;
  setBuffer(value: number): void;
}

export class LinearProgressAdapter extends BaseAdapter<ILinearProgressComponent> implements ILinearProgressAdapter {
  private readonly _rootElement: HTMLElement;
  private readonly _progressElement: HTMLElement;
  private readonly _bufferElement: HTMLElement;

  constructor(component: ILinearProgressComponent) {
    super(component);
    this._rootElement = getShadowElement(component, LINEAR_PROGRESS_CONSTANTS.selectors.ROOT);
    this._progressElement = getShadowElement(component, LINEAR_PROGRESS_CONSTANTS.selectors.PROGRESS);
    this._bufferElement = getShadowElement(component, LINEAR_PROGRESS_CONSTANTS.selectors.BUFFER);
  }

  public initialize(): void {
    if (!this._component.hasAttribute('role')) {
      this._component.setAttribute('role', 'progressbar');
    }
    if (!this._component.hasAttribute('aria-valuemin')) {
      this._component.setAttribute('aria-valuemin', '0');
    }
    if (!this._component.hasAttribute('aria-valuemax')) {
      this._component.setAttribute('aria-valuemax', '1');
    }
  }
  
  public setDeterminate(value: boolean): void {
    if (!value) {
      this._component.removeAttribute('aria-valuenow');
      this._progressElement.style.transform = '';
      this._bufferElement.style.transform = '';
    }
    this._rootElement.classList.toggle(LINEAR_PROGRESS_CONSTANTS.classes.INDETERMINATE, !value);
  }

  public setProgress(value: number): void {
    this._component.setAttribute('aria-valuenow', `${value}`);
    this._progressElement.style.transform = `scaleX(${value * 100}%)`;
  }

  public setBuffer(value: number): void {
    this._bufferElement.style.transform = `scaleX(${value * 100}%)`;
  }
}
