import { getShadowElement, toggleAttribute } from '@tylertech/forge-core';

import { ICircularProgressComponent } from './circular-progress';
import { CIRCULAR_PROGRESS_CONSTANTS } from './circular-progress-constants';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';

import indeterminateTemplate from './_indeterminate.html';
import determinateTemplate from './_determinate.html';

export interface ICircularProgressAdapter extends IBaseAdapter {
  setDeterminate(value: boolean): void;
  setProgress(value: number): void;
  setAriaLabel(value: string): void;
}

export class CircularProgressAdapter extends BaseAdapter<ICircularProgressComponent> implements ICircularProgressAdapter {
  private _rootElement: HTMLElement;
  private _determinateProgressCircleElement: HTMLElement | undefined;

  constructor(component: ICircularProgressComponent) {
    super(component);
    this._rootElement = getShadowElement(this._component, CIRCULAR_PROGRESS_CONSTANTS.selectors.ROOT);
  }

  public setDeterminate(value: boolean): void {
    this._tryResetTemplate();
    this._rootElement.classList.toggle(CIRCULAR_PROGRESS_CONSTANTS.classes.INDETERMINATE, !value);
    
    if (value) {
      this._rootElement.insertAdjacentHTML('beforeend', determinateTemplate);
      this._determinateProgressCircleElement = getShadowElement(this._component, CIRCULAR_PROGRESS_CONSTANTS.selectors.DETERMINATE_PROGRESS_CIRCLE);
    } else {
      this._rootElement.insertAdjacentHTML('beforeend', indeterminateTemplate);
      this._rootElement.removeAttribute('aria-valuenow');
      this._determinateProgressCircleElement = undefined;
    }
  }

  public setProgress(value: number): void {
    this._rootElement.setAttribute('aria-valuenow', `${value}`);
    this._determinateProgressCircleElement?.setAttribute('stroke-dashoffset', `${(1 - value) * 100}`);
  }

  public setAriaLabel(value: string): void {
    toggleAttribute(this._rootElement, !!value, 'aria-label', value);
  }

  private _tryResetTemplate(): void {
    const elements = this._component.shadowRoot?.querySelectorAll(CIRCULAR_PROGRESS_CONSTANTS.selectors.TEMPLATES);
    elements?.forEach(el => el.remove());
  }
}
