import { getShadowElement, toggleClass } from '@tylertech/forge-core';

import { BaseAdapter, IBaseAdapter, forwardAriaAttributes } from '../core';
import { ISwitchComponent } from './switch';
import { SWITCH_CONSTANTS, SwitchIconVisibility, SwitchLabelPosition } from './switch-constants';

export interface ISwitchAdapter extends IBaseAdapter {
  initialize(): void;
  setOn(value: boolean): void;
  setDisabled(value: boolean): void;
  setRequired(value: boolean): void;
  setIconVisibility(value: SwitchIconVisibility): void;
  setLabelPosition(value: SwitchLabelPosition): void;
  addInputListener(event: string, callback: EventListener): void;
  syncValue(value: boolean): void;
  syncValidity(hasCustomValidityError: boolean): void;
  setValidity(flags?: ValidityStateFlags | undefined, message?: string | undefined): void;
}

export class SwitchAdapter extends BaseAdapter<ISwitchComponent> implements ISwitchAdapter {
  private readonly _rootElement: HTMLElement;
  private readonly _inputElement: HTMLInputElement;
  private readonly _labelElement: HTMLElement;
  private readonly _iconOnElement: HTMLElement;
  private readonly _iconOffElement: HTMLElement;

  constructor(component: ISwitchComponent) {
    super(component);
    
    this._rootElement = getShadowElement(component, SWITCH_CONSTANTS.selectors.ROOT);
    this._inputElement = getShadowElement(component, SWITCH_CONSTANTS.selectors.INPUT) as HTMLInputElement;
    this._labelElement = getShadowElement(component, SWITCH_CONSTANTS.selectors.LABEL);
    this._iconOnElement = getShadowElement(component, SWITCH_CONSTANTS.selectors.ICON_ON);
    this._iconOffElement = getShadowElement(component, SWITCH_CONSTANTS.selectors.ICON_OFF);
  }

  public initialize(): void {
    forwardAriaAttributes({
      observedAttributes: SWITCH_CONSTANTS.ariaAttributes,
      sourceEl: this._component,
      targetEl: this._inputElement
    });
  }

  public setOn(value: boolean): void {
    this._inputElement.checked = value;
  }

  public setDisabled(value: boolean): void {
    this._inputElement.disabled = value;
  }

  public setRequired(value: boolean): void {
    this._inputElement.required = value;
  }

  public setIconVisibility(value: SwitchIconVisibility): void {
    const hideOn = value === 'none' || value === 'off';
    const hideOff = value === 'none' || value === 'on';
    toggleClass(this._iconOnElement, hideOn, SWITCH_CONSTANTS.classes.HIDDEN);
    toggleClass(this._iconOffElement, hideOff, SWITCH_CONSTANTS.classes.HIDDEN);
  }

  public setLabelPosition(value: SwitchLabelPosition): void {
    this._labelElement.remove();

    if (value === 'start') {
      this._rootElement.prepend(this._labelElement);
    } else {
      this._rootElement.append(this._labelElement);
    }
  }

  public addInputListener(event: string, callback: EventListener): void {
    this._inputElement.addEventListener(event, callback);
  }

  public syncValue(value: boolean): void {
    const data = new FormData();
    data.append(this._component.name, String(value));
    this._component.internals.setFormValue(data, value.toString());
  }

  public syncValidity(hasCustomValidityError: boolean): void {
    if (hasCustomValidityError) {
      this._inputElement.setCustomValidity(this._component.internals.validationMessage);
    } else {
      this._inputElement.setCustomValidity('');
    }

    this._component.internals.setValidity(this._inputElement.validity, this._inputElement.validationMessage, this._inputElement);
  }

  public setValidity(flags?: ValidityStateFlags | undefined, message?: string | undefined): void {
    this._component.internals.setValidity(flags, message, this._inputElement);
  }
}
