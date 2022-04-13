import { getShadowElement, removeAllChildren } from '@tylertech/forge-core';
import { ICON_CLASS_NAME } from '../../constants';
import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { IButtonToggleComponent } from '../button-toggle/button-toggle';
import { BUTTON_TOGGLE_CONSTANTS } from '../button-toggle/button-toggle-constants';
import { IButtonToggleGroupComponent } from './button-toggle-group';
import { BUTTON_TOGGLE_GROUP_CONSTANTS, IButtonToggleOption } from './button-toggle-group-constants';

export interface IButtonToggleGroupAdapter extends IBaseAdapter {
  addListener(type: string, listener: (evt: Event) => void): void;
  removeListener(type: string, listener: (evt: Event) => void): void;
  addSlotChangeListener(listener: (evt: Event) => void): void;
  removeSlotChangeListener(listener: (evt: Event) => void): void;
  deselect(selectedToggle: IButtonToggleComponent): void;
  applyAdjacentSelections(isVertical: boolean): void;
  setVertical(isVertical: boolean): void;
  setStretch(value: boolean): void;
  setDense(value: boolean): void;
  setDisabled(value: boolean): void;
  getSelectedValues(): any[];
  applyValues(values: any[]): void;
  createOptions(options: IButtonToggleOption[]): void;
}

export class ButtonToggleGroupAdapter extends BaseAdapter<IButtonToggleGroupComponent> implements IButtonToggleGroupAdapter {
  private _rootElement: HTMLElement;
  private _slotElement: HTMLSlotElement;

  constructor(component: IButtonToggleGroupComponent) {
    super(component);
    this._rootElement = getShadowElement(component, BUTTON_TOGGLE_GROUP_CONSTANTS.selectors.ROOT);
    this._slotElement = this._rootElement.querySelector('slot') as HTMLSlotElement;
  }

  public addListener(type: string, listener: (evt: Event) => void): void {
    this._rootElement.addEventListener(type, listener);
  }

  public removeListener(type: string, listener: (evt: Event) => void): void {
    this._rootElement.removeEventListener(type, listener);
  }

  public addSlotChangeListener(listener: EventListener): void {
    this._slotElement.addEventListener('slotchange', listener);
  }
  public removeSlotChangeListener(listener: EventListener): void {
    this._slotElement.addEventListener('slotchange', listener);
  }

  public deselect(selectedToggle: IButtonToggleComponent): void {
    const toggles = this._getButtonToggleElements();
    toggles.filter(t => t !== selectedToggle).forEach(t => t.selected = false);
  }

  public applyAdjacentSelections(isVertical: boolean): void {
    const toggles = this._getButtonToggleElements();
    for (let i = toggles.length - 1; i > 0; i--) {
      toggles[i].removeAttribute(BUTTON_TOGGLE_CONSTANTS.attributes.SELECTED_ADJACENT);
      toggles[i].removeAttribute(BUTTON_TOGGLE_CONSTANTS.attributes.SELECTED_ADJACENT_VERTICAL);
      if (toggles[i].selected && toggles[i - 1].selected) {
        const attr = isVertical ? BUTTON_TOGGLE_CONSTANTS.attributes.SELECTED_ADJACENT_VERTICAL : BUTTON_TOGGLE_CONSTANTS.attributes.SELECTED_ADJACENT;
        toggles[i].setAttribute(attr, '');
      }
    }
  }

  public setVertical(isVertical: boolean): void {
    if (isVertical) {
      this._rootElement.classList.add(BUTTON_TOGGLE_GROUP_CONSTANTS.classes.VERTICAL);
    } else {
      this._rootElement.classList.remove(BUTTON_TOGGLE_GROUP_CONSTANTS.classes.VERTICAL);
    }
  }

  public setStretch(value: boolean): void {
    if (value) {
      this._rootElement.classList.add(BUTTON_TOGGLE_GROUP_CONSTANTS.classes.STRETCH);
    } else {
      this._rootElement.classList.remove(BUTTON_TOGGLE_GROUP_CONSTANTS.classes.STRETCH);
    }

    const toggles = this._getButtonToggleElements();
    toggles.forEach(toggle => {
      if (value) {
        toggle.setAttribute('stretch', '');
      } else {
        toggle.removeAttribute('stretch');
      }
    });
  }

  public setDense(value: boolean): void {
    const toggles = this._getButtonToggleElements();
    toggles.forEach(t => t.dense = value);
  }

  public setDisabled(value: boolean): void {
    const toggles = this._getButtonToggleElements();
    toggles.forEach(t => t.disabled = value);
  }

  public getSelectedValues(): any[] {
    const toggles = this._getButtonToggleElements();
    return toggles.filter(t => t.selected).map(t => t.value);
  }

  public applyValues(values: any[]): void {
    const toggles = this._getButtonToggleElements();
    toggles.forEach(t => t.selected = values.indexOf(t.value) >= 0);
  }

  public createOptions(options: IButtonToggleOption[]): void {
    removeAllChildren(this._component);
    options.forEach(o => {
      this._component.appendChild(this._createButtonToggle(o));
    });
  }

  private _createButtonToggle(option: IButtonToggleOption): IButtonToggleComponent {
    const buttonToggle = document.createElement(BUTTON_TOGGLE_CONSTANTS.elementName) as IButtonToggleComponent;
    buttonToggle.value = option.value;

    if (option.label) {
      buttonToggle.textContent = option.label;
    } else if (option.icon) {
      const icon = document.createElement('i');
      icon.textContent = option.icon;
      icon.classList.add(ICON_CLASS_NAME);
      icon.setAttribute('aria-hidden', 'true');
      buttonToggle.appendChild(icon);
    }

    if (option.leadingIcon) {
      const leadingIcon = document.createElement('i');
      leadingIcon.slot = 'leading';
      leadingIcon.textContent = option.leadingIcon;
      leadingIcon.classList.add(ICON_CLASS_NAME);
      leadingIcon.setAttribute('aria-hidden', 'true');
      buttonToggle.appendChild(leadingIcon);
    }

    if (option.trailingIcon) {
      const trailingIcon = document.createElement('i');
      trailingIcon.slot = 'trailing';
      trailingIcon.textContent = option.trailingIcon;
      trailingIcon.classList.add(ICON_CLASS_NAME);
      trailingIcon.setAttribute('aria-hidden', 'true');
      buttonToggle.appendChild(trailingIcon);
    }

    return buttonToggle;
  }

  private _getButtonToggleElements(): IButtonToggleComponent[] {
    return Array.from(this._component.querySelectorAll(BUTTON_TOGGLE_CONSTANTS.elementName));
  }
}
