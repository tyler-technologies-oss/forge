import { getShadowElement, toggleAttribute } from '@tylertech/forge-core';
import { isFocusable, setValidity } from '../../constants.js';
import { setAriaControls, tryCreateAriaControlsPlaceholder } from '../../core/utils/utils.js';
import type { IFieldComponent } from '../../field/field.js';
import { FIELD_CONSTANTS } from '../../field/field-constants.js';
import { IListDropdownConfig } from '../../list-dropdown/list-dropdown-constants.js';
import { BaseSelectAdapter, IBaseSelectAdapter } from '../core/index.js';
import { ISelectComponent } from './select.js';
import { SELECT_CONSTANTS } from './select-constants.js';

export type OptionListenerDestructor = () => void;

export interface ISelectAdapter extends IBaseSelectAdapter<ISelectComponent> {
  readonly fieldElement: IFieldComponent;
  floatLabel(value: boolean): void;
  setLabel(value: string): void;
  setPlaceholderText(value: string): void;
  setSelectedText(value: string): void;
  setDisabled(value: boolean): void;
  setRequired(): void;
  syncValue(value: unknown | null): void;
}

export class SelectAdapter extends BaseSelectAdapter<ISelectComponent> implements ISelectAdapter {
  private _fieldElement: IFieldComponent;
  private _labelElement: HTMLLabelElement;
  private _selectedTextElement: HTMLElement;

  constructor(component: ISelectComponent) {
    super(component);
    this._fieldElement = getShadowElement(component, SELECT_CONSTANTS.selectors.FIELD) as IFieldComponent;
    this._labelElement = getShadowElement(component, SELECT_CONSTANTS.selectors.LABEL) as HTMLLabelElement;
    this._selectedTextElement = getShadowElement(component, SELECT_CONSTANTS.selectors.SELECTED_TEXT) as HTMLElement;

    this._fieldElement.setAttribute('exportparts', Object.values(FIELD_CONSTANTS.parts).join(', '));
    this._fieldElement.focusIndicatorTargetElement = this._component;
  }

  public get fieldElement(): IFieldComponent {
    return this._fieldElement;
  }

  public initializeAccessibility(): void {
    this._component.setAttribute('role', 'combobox');
    this._component.setAttribute('aria-haspopup', 'true');
    this._component.setAttribute('aria-expanded', 'false');
    tryCreateAriaControlsPlaceholder();
    setAriaControls(this._component);

    if (this.fieldElement.required) {
      this.setHostAttribute('aria-required', 'true');
    }
    if (this.fieldElement.disabled) {
      this.setHostAttribute('aria-disabled', 'true');
    }
    if (this.fieldElement.invalid) {
      this.setHostAttribute('aria-invalid', 'true');
    }

    this._component[isFocusable] = !this._component.disabled;
  }

  public setLabel(value: string): void {
    const isInsetAndDense = this._fieldElement.labelPosition === 'inset' && (this._fieldElement.density === 'extra-small' || this._fieldElement.dense);
    const hasLabel = !isInsetAndDense && !!value?.trim();

    if (!this._component.hasAttribute('aria-label') || this._component.getAttribute('aria-label') === this._labelElement.textContent) {
      this._component.setAttribute('aria-label', value);
    }

    if (hasLabel) {
      if (!this._labelElement.isConnected) {
        this._fieldElement.insertAdjacentElement('afterbegin', this._labelElement);
      }
      this._labelElement.textContent = value;
    } else {
      this._labelElement.remove();
    }
  }

  public setPlaceholderText(value: string): void {
    toggleAttribute(this._selectedTextElement, !!value?.trim(), 'placeholder', value);
  }

  public open(config: IListDropdownConfig): void {
    if (!this._targetElement) {
      this._targetElement = getShadowElement(this._fieldElement, FIELD_CONSTANTS.selectors.POPOVER_TARGET) as HTMLElement;
    }

    super.open(config);

    this._component.setAttribute('aria-controls', `list-dropdown-popup-${config.id}`);
    this._component.setAttribute('aria-expanded', 'true');
    this._fieldElement.popoverExpanded = true;
  }

  public close(): Promise<void> {
    this._component.setAttribute('aria-expanded', 'false');
    this._component.removeAttribute('aria-activedescendant');
    setAriaControls(this._component);
    this._fieldElement.popoverExpanded = false;
    return super.close();
  }

  public floatLabel(value: boolean): void {
    this._fieldElement.floatLabel = value;
  }

  public updateActiveDescendant(id: string): void {
    toggleAttribute(this._component, !!id, 'aria-activedescendant', id);
  }

  public setSelectedText(value: string): void {
    this._selectedTextElement.textContent = value;
  }

  public setDisabled(value: boolean): void {
    this._component[isFocusable] = !value;
    toggleAttribute(this._component, value, 'aria-disabled', 'true');
  }

  public setRequired(): void {
    this._component[setValidity]();
  }

  public addClickListener(listener: (evt: Event) => void): void {
    this._component.addEventListener('click', listener);
  }

  public removeClickListener(listener: (evt: Event) => void): void {
    this._component.removeEventListener('click', listener);
  }

  public addTargetListener(type: string, listener: (evt: Event) => void): void {
    this._component.addEventListener(type, listener);
  }

  public removeTargetListener(type: string, listener: (evt: Event) => void): void {
    this._component.removeEventListener(type, listener);
  }

  public syncValue(value: unknown | null): void {
    // If the value is an empty or entirely null array, the form value should be null
    const isEmpty = Array.isArray(value) ? !value.length || !value.some(entry => entry != null) : value == null;
    const data = isEmpty ? null : new FormData();
    const stringValue = JSON.stringify(value);
    if (data && value) {
      data.append(this._component.name, stringValue);
    }
    this._component.setFormValue(data, stringValue);
    this._component[setValidity]();
  }
}
