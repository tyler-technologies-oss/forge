import { getShadowElement, emitEvent, getActiveElement, toggleAttribute } from '@tylertech/forge-core';
import { ITimePickerComponent } from './time-picker';
import { BaseAdapter } from '../core';
import { TIME_PICKER_CONSTANTS } from './time-picker-constants';
import { ITimeInputMaskOptions, TimeInputMask } from '../core/mask/time-input-mask';
import { TEXT_FIELD_CONSTANTS, ITextFieldComponent } from '../text-field';
import { ICON_BUTTON_CONSTANTS, IIconButtonComponent } from '../icon-button';
import { ICON_CONSTANTS, IIconComponent } from '../icon';
import { IListDropdownConfig, IListDropdownOption } from '../list-dropdown/list-dropdown-constants';
import { IListDropdown, ListDropdown } from '../list-dropdown';

export interface ITimePickerAdapter extends BaseAdapter<ITimePickerComponent> {
  initialize(): void;
  initializeMask(options: ITimeInputMaskOptions): void;
  destroy(): void;
  destroyMask(): void;
  initializeAccessibility(identifier: string): void;
  addInputListener(type: string, listener: (event: Event) => void, capture?: boolean): void;
  removeInputListener(type: string, listener: (event: Event) => void, capture?: boolean): void;
  addToggleListener(type: string, listener: (event: Event) => void): void;
  removeToggleListener(type: string, listener: (event: Event) => void): void;
  hasInputElement(): boolean;
  tryCreateToggle(): void;
  tryFocusInput(): void;
  tryBlurInput(): void;
  selectInputText(): void;
  getInputValue(): string;
  setInputValue(value: string, emitEvents: boolean): void;
  isInputDisabled(): boolean;
  isInputFocused(): boolean;
  setDisabled(isDisabled: boolean): void;
  attachDropdown(config: IListDropdownConfig): void;
  detachDropdown(): void;
  setActiveDescendant(id: string): void;
  propagateKey(key: string): void;
  getTargetElementWidth(selector: string): number;
  emitInputEvent(type: string, data?: any): void;
  setInputReadonly(value: boolean): void;
  setToggleDisabled(value: boolean): void;
  hasActiveOption(): boolean;
  activateOptionByIndex(index: number): void;
  activateFirstOption(): void;
  getActiveOption(): IListDropdownOption | undefined;
}

export class TimePickerAdapter extends BaseAdapter<ITimePickerComponent> implements ITimePickerAdapter {
  private _inputElement: HTMLInputElement;
  private _toggleElement?: HTMLElement;
  private _inputMask?: TimeInputMask;
  private _listDropdown?: IListDropdown;
  private _targetElement?: HTMLElement;

  constructor(component: ITimePickerComponent) {
    super(component);
  }

  public initialize(): void {
    this._inputElement = this._component.querySelector(TIME_PICKER_CONSTANTS.selectors.INPUT) as HTMLInputElement;
  }

  public initializeMask(options: ITimeInputMaskOptions): void {
    this.destroyMask();
    this._inputMask = new TimeInputMask(this._inputElement, options);
  }

  public destroy(): void {
    this._targetElement = undefined;
    this._toggleElement = undefined as any;
    this._inputElement = undefined as any;
  }

  public destroyMask(): void {
    this._inputMask?.destroy();
    this._inputMask = undefined;
  }

  public initializeAccessibility(identifier: string): void {
    this._inputElement.setAttribute('autocomplete', 'off');
    this._inputElement.setAttribute('autocorrect', 'off');
    this._inputElement.setAttribute('autocapitalize', 'off');
    this._inputElement.setAttribute('spellcheck', 'false');
    this._inputElement.setAttribute('role', 'combobox');
    this._inputElement.setAttribute('aria-live', 'assertive');
    this._inputElement.setAttribute('aria-atomic', 'true');
    this._inputElement.setAttribute('aria-haspopup', 'true');
    this._inputElement.setAttribute('aria-expanded', 'false');
  }

  public addInputListener(type: string, listener: (event: Event) => void, capture?: boolean): void {
    this._inputElement.addEventListener(type, listener, { capture });
  }

  public removeInputListener(type: string, listener: (event: Event) => void, capture?: boolean): void {
    if (this._inputElement) {
      this._inputElement.removeEventListener(type, listener, { capture });
    }
  }

  public addToggleListener(type: string, listener: (event: Event) => void): void {
    if (this._toggleElement) {
      this._toggleElement.addEventListener(type, listener);
    }
  }

  public removeToggleListener(type: string, listener: (event: Event) => void): void {
    if (this._toggleElement) {
      this._toggleElement.removeEventListener(type, listener);
    }
  }

  public hasInputElement(): boolean {
    return !!this._inputElement;
  }

  public tryCreateToggle(): void {
    const textField = this._component.querySelector(TEXT_FIELD_CONSTANTS.elementName) as ITextFieldComponent;
    const toggleElement = this._component.querySelector(TIME_PICKER_CONSTANTS.selectors.TOGGLE);
    if (textField) {
      const existingIconButton = textField.querySelector(`${ICON_BUTTON_CONSTANTS.elementName}[slot=trailing]`);
      if (existingIconButton || toggleElement) {
        this._toggleElement = (existingIconButton || toggleElement) as IIconButtonComponent;
        return;
      }

      const iconButtonElement = document.createElement(ICON_BUTTON_CONSTANTS.elementName) as IIconButtonComponent;
      iconButtonElement.slot = 'trailing';
      iconButtonElement.dense = true;
      iconButtonElement.densityLevel = 3;
      iconButtonElement.style.marginRight = '4px'; // Override default trailing slot margin in text-field

      const buttonElement = document.createElement('button');
      buttonElement.type = 'button';
      buttonElement.tabIndex = -1;
      buttonElement.setAttribute('aria-label', 'Toggle time dropdown');

      const iconElement = document.createElement(ICON_CONSTANTS.elementName) as IIconComponent;
      iconElement.name = 'clock_outline';
      buttonElement.appendChild(iconElement);
      iconButtonElement.appendChild(buttonElement);

      textField.appendChild(iconButtonElement);
      this._toggleElement = iconButtonElement;
    } else if (toggleElement) {
      this._toggleElement = toggleElement as HTMLElement;
    }
  }

  public tryFocusInput(): void {
    this._inputElement.select();
  }

  public tryBlurInput(): void {
    this._inputElement.blur();
  }

  public selectInputText(): void {
    this._inputElement.select();
  }

  public isInputDisabled(): boolean {
    return this._inputElement.disabled;
  }

  public isInputFocused(): boolean {
    return getActiveElement() === this._inputElement;
  }

  public setInputValue(value: string, emitEvents: boolean): void {
    if (this._inputElement.value === value) {
      return;
    }

    this._inputElement.value = value;

    if (this._inputMask) {
      this._inputMask.update();
    }

    if (emitEvents) {
      this._emitInputEvent('change');
      this._emitInputEvent('input');
    }
  }

  public getInputValue(): string {
    return this._inputMask ? this._inputMask.maskedValue : this._inputElement.value;
  }

  public setDisabled(isDisabled: boolean): void {
    this._inputElement.disabled = isDisabled;
    this._inputElement.setAttribute('aria-disabled', isDisabled.toString());
    this.setToggleDisabled(isDisabled);
  }

  public attachDropdown(config: IListDropdownConfig): void {
    this._listDropdown = new ListDropdown(this._inputElement, config);
    this._listDropdown.open();
    this._inputElement.setAttribute('aria-controls', `list-dropdown-popup-${config.id}`);
  }
  
  public detachDropdown(): void {
    if (this._listDropdown) {
      this._listDropdown.close();
      this._listDropdown.destroy();
      this._listDropdown = undefined;
    }
    this._inputElement.removeAttribute('aria-controls');
  }

  public propagateKey(key: string): void {
    this._listDropdown?.handleKey(key);
  }

  public setActiveDescendant(id: string): void {
    toggleAttribute(this._inputElement, !!id, 'aria-activedescendant', id);
  }

  public getTargetElementWidth(selector: string): number {
    const targetElement = this._getTargetElement(selector);
    return targetElement.getBoundingClientRect().width;
  }

  private _emitInputEvent(type: string): void {
    this._inputElement.dispatchEvent(new Event(type));
  }

  public emitInputEvent(type: string, data?: any): void {
    emitEvent(this._inputElement, type, data);
  }

  public setInputReadonly(value: boolean): void {
    this._inputElement.readOnly = value;
  }

  public setToggleDisabled(value: boolean): void {
    if (this._toggleElement) {
      this._toggleElement.setAttribute('aria-disabled', value.toString());
      if ('disabled' in this._toggleElement) {
        (this._toggleElement as HTMLButtonElement).disabled = value;
      } else {
        const button = this._toggleElement.querySelector('button') as HTMLButtonElement;
        if (button) {
          button.disabled = value;
        }
      }
    }
  }

  public hasActiveOption(): boolean {
    return (this._listDropdown?.getActiveOptionIndex() ?? -1) >= 0;
  }

  public activateOptionByIndex(index: number): void {
    this._listDropdown?.activateOption(index);
  }

  public activateFirstOption(): void {
    this._listDropdown?.activateFirstOption();
  }

  public getActiveOption(): IListDropdownOption | undefined {
    return this._listDropdown?.getActiveOption();
  }

  private _getTargetElement(selector?: string): HTMLElement {
    if (this._targetElement) {
      return this._targetElement;
    }
    this._targetElement = selector ? this._component.querySelector(selector) as HTMLElement || this._getDefaultTargetElement() : this._getDefaultTargetElement();
    return this._targetElement;
  }

  private _getDefaultTargetElement(): HTMLElement {
    // This component is often used with the text-field, if so, let's target our popup around one if its internal elements for proper alignnment
    const textField = this._component.querySelector(TEXT_FIELD_CONSTANTS.elementName) as HTMLElement;
    if (textField && textField.shadowRoot) {
      const textFieldRoot = getShadowElement(textField, TEXT_FIELD_CONSTANTS.selectors.ROOT) as HTMLElement;
      if (textFieldRoot) {
        return textFieldRoot;
      }
    }
    return this._component; // Otherwise we just use the time-picker host as the target
  }
}
