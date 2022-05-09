import { getShadowElement } from '@tylertech/forge-core';
import { ForgeRipple } from '../../ripple';
import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { IButtonToggleGroupComponent } from '../button-toggle-group';
import { IButtonToggleComponent } from './button-toggle';
import { BUTTON_TOGGLE_CONSTANTS } from './button-toggle-constants';

export interface IButtonToggleAdapter extends IBaseAdapter {
  setSelected(value: boolean): void;
  addEventListener(type: string, listener: (evt: Event) => void): void;
  removeEventListener(type: string, listener: (evt: Event) => void): void;
  initializeRipple(): ForgeRipple;
  setDisabled(value: boolean): void;
  setDense(value: boolean): void;
  requestFocus(): void;
  detectStretchState(): void;
}

export class ButtonToggleAdapter extends BaseAdapter<IButtonToggleComponent> implements IButtonToggleAdapter {
  private _buttonElement: HTMLButtonElement;

  constructor(component: IButtonToggleComponent) {
    super(component);
    this._buttonElement = getShadowElement(component, BUTTON_TOGGLE_CONSTANTS.selectors.BUTTON) as HTMLButtonElement;
  }

  public setSelected(value: boolean): void {
    if (value) {
      this._buttonElement.classList.add(BUTTON_TOGGLE_CONSTANTS.classes.SELECTED);
    } else {
      this._buttonElement.classList.remove(BUTTON_TOGGLE_CONSTANTS.classes.SELECTED);
    }
    this._buttonElement.setAttribute('aria-pressed', value.toString());
  }

  public addEventListener(type: string, listener: (evt: Event) => void): void {
    this._buttonElement.addEventListener(type, listener);
  }

  public removeEventListener(type: string, listener: (evt: Event) => void): void {
    this._buttonElement.removeEventListener(type, listener);
  }

  public initializeRipple(): ForgeRipple {
    return new ForgeRipple(this._buttonElement);
  }

  public setDisabled(value: boolean): void {
    this._buttonElement.disabled = value;
    if (value) {
      this._buttonElement.setAttribute('aria-disabled', value.toString());
    } else {
      this._buttonElement.removeAttribute('aria-disabled');
    }
  }

  public setDense(value: boolean): void {
    if (value) {
      this._buttonElement.classList.add(BUTTON_TOGGLE_CONSTANTS.classes.DENSE);
    } else {
      this._buttonElement.classList.remove(BUTTON_TOGGLE_CONSTANTS.classes.DENSE);
    }
  }

  public requestFocus(): void {
    this._buttonElement.focus();
  }

  public detectStretchState(): void {
    if (this._component.hasAttribute(BUTTON_TOGGLE_CONSTANTS.attributes.STRETCH)) {
      return;
    }
    const buttonToggleGroup = this._component.parentElement as IButtonToggleGroupComponent;
    if (buttonToggleGroup && buttonToggleGroup.hasAttribute(BUTTON_TOGGLE_CONSTANTS.attributes.STRETCH) && buttonToggleGroup.stretch) {
      this._component.setAttribute(BUTTON_TOGGLE_CONSTANTS.attributes.STRETCH, '');
    }
  }
}
