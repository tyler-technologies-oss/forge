import { getShadowElement, toggleAttribute } from '@tylertech/forge-core';
import { ISelectComponent } from './select';
import { SELECT_CONSTANTS } from './select-constants';
import { IBaseSelectAdapter, BaseSelectAdapter } from '../core';
import { IListDropdownConfig } from '../../list-dropdown/list-dropdown-constants';
import type { IFieldComponent } from '../../field-next/field';
import { FieldLabelPosition, FIELD_CONSTANTS } from '../../field-next';

export type OptionListenerDestructor = () => void;

export interface ISelectAdapter extends IBaseSelectAdapter {
  readonly fieldElement: IFieldComponent;
  floatLabel(value: boolean): void;
  setLabel(value: string): void;
  setPlaceholderText(value: string): void;
  setSelectedText(value: string): void;
  setDisabled(value: boolean): void;
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

    if (this.fieldElement.required) {
      this.setHostAttribute('aria-required', 'true');
    }
    if (this.fieldElement.disabled) {
      this.setHostAttribute('aria-disabled', 'true');
    }
    if (this.fieldElement.invalid) {
      this.setHostAttribute('aria-invalid', 'true');
    }

    if (!this._component.hasAttribute('tabindex')) {
      this._component.tabIndex = this._component.disabled ? -1 : 0;
    }
  }

  public setLabel(value: string): void {
    const hasLabel = this._fieldElement.density !== 'extra-small' && !this._fieldElement.dense && !!value?.trim();

    if (!this._component.hasAttribute('aria-label') || this._component.getAttribute('aria-label') === this._labelElement.textContent) {
      if (hasLabel) {
        this._component.setAttribute('aria-label', value);
      } else {
        this._component.removeAttribute('aria-label');
      }
    }

    if (hasLabel) {
      this._fieldElement.labelPosition = this._component.getAttribute('label-position') as FieldLabelPosition ?? FIELD_CONSTANTS.defaults.DEFAULT_LABEL_POSITION;
      if (!this._labelElement.isConnected) {
        this._fieldElement.insertAdjacentElement('afterbegin', this._labelElement);
      }
      this._labelElement.textContent = value;
    } else {
      this._fieldElement.labelPosition = 'none';
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
    this._component.removeAttribute('aria-controls');
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

  public setMultiple(multiple: boolean): void {
    this.toggleHostAttribute('aria-multiselectable', multiple, 'true');
  }

  public setDisabled(value: boolean): void {
    this._component.tabIndex = value ? -1 : 0;
    toggleAttribute(this._component, value, 'aria-disabled', 'true');
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
}
