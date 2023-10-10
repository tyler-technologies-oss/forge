import { getShadowElement, toggleAttribute } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter, forwardAttributes } from '../core';
import { ICheckboxComponent, forwardedAttributes } from './checkbox';
import { CHECKBOX_CONSTANTS, CheckboxLabelPosition } from './checkbox-constants';

export interface ICheckboxAdapter extends IBaseAdapter {
  setChecked(value: boolean): void;
  setDefaultChecked(value: boolean): void;
  setIndeterminate(value: boolean): void;
  setDisabled(value: boolean): void;
  setRequired(value: boolean): void;
  setReadonly(value: boolean): void;
  setLabelPosition(value: CheckboxLabelPosition): void;
  addInputListener(event: string, callback: EventListener): void;
  syncValue(value: boolean): void;
  syncValidity(hasCustomValidityError: boolean): void;
  setValidity(flags?: ValidityStateFlags | undefined, message?: string | undefined): void;
}

export class CheckboxAdapter extends BaseAdapter<ICheckboxComponent> implements ICheckboxAdapter {
  private readonly _rootElement: HTMLElement;
  private readonly _inputElement: HTMLInputElement;
  private readonly _labelElement: HTMLElement;

  constructor(component: ICheckboxComponent) {
    super(component);
    this._rootElement = getShadowElement(component, CHECKBOX_CONSTANTS.selectors.ROOT);
    this._inputElement = getShadowElement(component, CHECKBOX_CONSTANTS.selectors.INPUT) as HTMLInputElement;
    this._labelElement = getShadowElement(component, CHECKBOX_CONSTANTS.selectors.LABEL);
  }

  public override initialize(): void {
    forwardAttributes(this._component, forwardedAttributes, (name, value) => {
      toggleAttribute(this._inputElement, !!value, name, value ?? undefined);
    });
  }

  // public inputAdapter(initializeCallback: (oldEl: HTMLInputElement | null, newEl: HTMLInputElement) => void): void {
  //   let inputElement;
  // }

  public setChecked(value: boolean): void {
    this._inputElement.checked = value;
  }

  public setDefaultChecked(value: boolean): void {
    this._inputElement.toggleAttribute('checked', value);
  }

  public setIndeterminate(value: boolean): void {
    this._inputElement.indeterminate = value;
  }

  public setDisabled(value: boolean): void {
    this._inputElement.disabled = value;
  }

  public setRequired(value: boolean): void {
    this._inputElement.required = value;
  }

  public setReadonly(value: boolean): void {
    this._inputElement.readOnly = value;
    toggleAttribute(this._inputElement, value, 'aria-readonly', value.toString());
  }

  public setLabelPosition(value: CheckboxLabelPosition): void {
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
    // data.append(this._component.name, String(value));
    // this._component.internals.setFormValue(data, value.toString());
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
