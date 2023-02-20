import { getShadowElement, removeClass, toggleClass } from '@tylertech/forge-core';
import type { IRippleComponent } from '@tylertech/forge/ripple';
import { BaseAdapter, IBaseAdapter, userInteractionListener } from '../../core';
import { INextButtonComponent } from './next-button-component';
import { NextButtonType, NextButtonVariant, NEXT_BUTTON_CONSTANTS } from './next-button-constants';

export interface INextButtonAdapter extends IBaseAdapter {
  deferRippleInitialization():  Promise<void>;
  setButtonType(type: NextButtonType): void;
  setVariant(variant: NextButtonVariant): void;
  setDense(value: boolean): void;
  setDisabled(value: boolean): void;
}

export class NextButtonAdapter extends BaseAdapter<INextButtonComponent> implements INextButtonAdapter {
  private _rootElement: HTMLButtonElement;
  private _rippleElement: IRippleComponent | undefined;

  constructor(_component: INextButtonComponent) {
    super(_component);
    this._rootElement = getShadowElement(_component, NEXT_BUTTON_CONSTANTS.selectors.ROOT) as HTMLButtonElement;
  }

  public async deferRippleInitialization(): Promise<void> {
    const type = await userInteractionListener(this._rootElement);
    if (!this._rippleElement) {
      if (!this._rippleElement) {
        this._rippleElement = document.createElement('forge-ripple');
      }

      this._rootElement.appendChild(this._rippleElement);

      if (type === 'focusin') {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        this._rippleElement.getRippleInstance()?.['foundation'].handleFocus();
      }
    }
  }

  public setButtonType(type: NextButtonType): void {
    this._rootElement.type = type;
  }

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

  public setDisabled(value: boolean): void {
    this._rootElement.disabled = value;
    toggleClass(this._rootElement, value, NEXT_BUTTON_CONSTANTS.classes.DISABLED);
  }

  private _initRipple(): void {
    
  }
}
