import { removeClass, toggleClass } from '@tylertech/forge-core';
import { INextBaseButtonAdapter, NextBaseButtonAdapter } from '../core/button/base-button-adapter';
import { INextButtonComponent } from './next-button-component';
import { NextButtonVariant, NEXT_BUTTON_CONSTANTS } from './next-button-constants';

export interface INextButtonAdapter extends INextBaseButtonAdapter {
  setVariant(variant: NextButtonVariant): void;
  setDense(value: boolean): void;
}

export class NextButtonAdapter extends NextBaseButtonAdapter<INextButtonComponent> implements INextButtonAdapter {
  public setVariant(variant: NextButtonVariant): void {
    const { RAISED, FLAT, OUTLINED } = NEXT_BUTTON_CONSTANTS.classes;
    removeClass([RAISED, FLAT, OUTLINED], this._rootElement);
    switch (variant) {
      case 'raised':
        this._rootElement.classList.add(RAISED);
        break;
      case 'flat':
        this._rootElement.classList.add(FLAT);
        break;
      case 'outlined':
        this._rootElement.classList.add(OUTLINED);
        break;
    }
  }

  public setDense(value: boolean): void {
    toggleClass(this._rootElement, value, NEXT_BUTTON_CONSTANTS.classes.DENSE);
  }
}
