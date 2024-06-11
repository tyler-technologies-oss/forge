import { getShadowElement } from '@tylertech/forge-core';

import { ICircularProgressComponent } from './circular-progress';
import { CIRCULAR_PROGRESS_CONSTANTS } from './circular-progress-constants';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';

import indeterminateTemplate from './_indeterminate.html';
import determinateTemplate from './_determinate.html';
import { setDefaultAria } from '../constants';

export interface ICircularProgressAdapter extends IBaseAdapter<ICircularProgressComponent> {
  initialize(): void;
  setDeterminate(value: boolean): void;
  setProgress(value: number): void;
}

export class CircularProgressAdapter extends BaseAdapter<ICircularProgressComponent> implements ICircularProgressAdapter {
  private readonly _rootElement: HTMLElement;
  private _determinateProgressCircleElement: HTMLElement | undefined;

  constructor(component: ICircularProgressComponent) {
    super(component);
    this._rootElement = getShadowElement(this._component, CIRCULAR_PROGRESS_CONSTANTS.selectors.ROOT);
  }

  public initialize(): void {
    this._component[setDefaultAria]({
      role: 'progressbar',
      ariaValueMin: '0',
      ariaValueMax: '1'
    });
  }

  public setDeterminate(value: boolean): void {
    this._tryResetTemplate();
    this._rootElement.classList.toggle(CIRCULAR_PROGRESS_CONSTANTS.classes.INDETERMINATE, !value);

    if (value) {
      this._rootElement.insertAdjacentHTML('beforeend', determinateTemplate);
      this._determinateProgressCircleElement = getShadowElement(this._component, CIRCULAR_PROGRESS_CONSTANTS.selectors.DETERMINATE_PROGRESS_CIRCLE);
    } else {
      this._rootElement.insertAdjacentHTML('beforeend', indeterminateTemplate);
      this._component[setDefaultAria]({ ariaValueNow: null });
      this._determinateProgressCircleElement = undefined;
    }
  }

  public setProgress(value: number): void {
    this._component[setDefaultAria]({ ariaValueNow: `${value}` });
    this._determinateProgressCircleElement?.setAttribute('stroke-dashoffset', `${(1 - value) * 100}`);
  }

  private _tryResetTemplate(): void {
    const elements = this._component.shadowRoot?.querySelectorAll(CIRCULAR_PROGRESS_CONSTANTS.selectors.TEMPLATES);
    elements?.forEach(el => el.remove());
  }
}
