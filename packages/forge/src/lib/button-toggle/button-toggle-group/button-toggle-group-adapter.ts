import { getShadowElement } from '@tylertech/forge-core';
import { getFormState, getFormValue, getValidationMessage, internals } from '../../constants.js';
import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter.js';
import { IButtonToggleComponent } from '../button-toggle/button-toggle.js';
import { BUTTON_TOGGLE_CONSTANTS } from '../button-toggle/button-toggle-constants.js';
import { IButtonToggleGroupComponent } from './button-toggle-group.js';
import { BUTTON_TOGGLE_GROUP_CONSTANTS } from './button-toggle-group-constants.js';

export interface IButtonToggleGroupAdapter extends IBaseAdapter {
  addListener(type: string, listener: (evt: Event) => void): void;
  removeListener(type: string, listener: (evt: Event) => void): void;
  addSlotChangeListener(listener: (evt: Event) => void): void;
  removeSlotChangeListener(listener: (evt: Event) => void): void;
  deselect(selectedToggle: IButtonToggleComponent): void;
  setDisabled(value: boolean): void;
  setReadonly(value: boolean): void;
  getSelectedValues(): any[];
  applyValues(values: any[]): void;
  setFormValue(): void;
  setFormValidity(): void;
}

export class ButtonToggleGroupAdapter extends BaseAdapter<IButtonToggleGroupComponent> implements IButtonToggleGroupAdapter {
  private _rootElement: HTMLElement;
  private _defaultSlotElement: HTMLSlotElement;

  constructor(component: IButtonToggleGroupComponent) {
    super(component);
    this._rootElement = getShadowElement(component, BUTTON_TOGGLE_GROUP_CONSTANTS.selectors.ROOT);
    this._defaultSlotElement = this._rootElement.querySelector('slot') as HTMLSlotElement;
  }

  public addListener(type: string, listener: (evt: Event) => void): void {
    this._rootElement.addEventListener(type, listener);
  }

  public removeListener(type: string, listener: (evt: Event) => void): void {
    this._rootElement.removeEventListener(type, listener);
  }

  public addSlotChangeListener(listener: EventListener): void {
    this._defaultSlotElement.addEventListener('slotchange', listener);
  }

  public removeSlotChangeListener(listener: EventListener): void {
    this._defaultSlotElement.addEventListener('slotchange', listener);
  }

  public deselect(selectedToggle: IButtonToggleComponent): void {
    const toggles = this._getButtonToggleElements();
    toggles.filter(t => t !== selectedToggle).forEach(t => (t.selected = false));
  }

  public setDisabled(value: boolean): void {
    const toggles = this._getButtonToggleElements();
    toggles.forEach(t => (t.disabled = value));
  }

  public setReadonly(value: boolean): void {
    const toggles = this._getButtonToggleElements();
    toggles.forEach(t => (t.readonly = value));
  }

  public getSelectedValues(): any[] {
    const toggles = this._getButtonToggleElements();
    return toggles.filter(t => t.selected).map(t => t.value);
  }

  public applyValues(values: any[]): void {
    const toggles = this._getButtonToggleElements();
    toggles.forEach(t => (t.selected = values.indexOf(t.value) >= 0));
  }

  public setFormValue(): void {
    if (!this._component.form) {
      return;
    }
    const data = this._component[getFormValue]();
    const state = this._component[getFormState]();
    this._component[internals].setFormValue(data, state);
  }

  public setFormValidity(): void {
    if (!this._component.form || !this._component.required) {
      return;
    }
    const required = this._component.multiple ? !this._component.value.length : !this._component.value;
    if (required) {
      const validationMessage = this._component[getValidationMessage]({ required });
      this._component[internals].setValidity({ valueMissing: required }, validationMessage, this._getButtonToggleElements()[0]);
    } else {
      this._component[internals].setValidity({});
    }
  }

  private _getButtonToggleElements(): IButtonToggleComponent[] {
    return Array.from(this._component.querySelectorAll(BUTTON_TOGGLE_CONSTANTS.elementName));
  }
}
