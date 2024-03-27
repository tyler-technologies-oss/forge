import { ICustomElementFoundation } from '@tylertech/forge-core';

import { ICheckboxAdapter } from './checkbox-adapter';
import { CHECKBOX_CONSTANTS, CheckboxLabelPosition, CheckboxState } from './checkbox-constants';

export interface ICheckboxFoundation extends ICustomElementFoundation {
  checked: boolean;
  defaultChecked: boolean;
  indeterminate: boolean;
  value: string;
  dense: boolean;
  disabled: boolean;
  required: boolean;
  readonly: boolean;
  labelPosition: CheckboxLabelPosition;
}

export class CheckboxFoundation implements ICheckboxFoundation {
  // State
  private _checked = false;
  private _defaultChecked = false;
  private _indeterminate = false;
  private _value = 'on';
  private _dense = false;
  private _disabled = false;
  private _required = false;
  private _readonly = false;
  private _labelPosition: CheckboxLabelPosition = 'end';

  private get _submittedValue(): string | null {
    return this._checked ? this._value : null;
  }
  private get _formState(): CheckboxState {
    return this._checked
      ? this._indeterminate
        ? 'checked-indeterminate'
        : 'checked'
      : this._indeterminate
        ? 'unchecked-indeterminate'
        : 'unchecked';
  }

  // Listeners
  private readonly _clickListener: EventListener = (evt: Event) => this._handleChange(evt);
  private readonly _keyupListener: EventListener = (evt: KeyboardEvent) => evt.key === ' ' ? this._handleChange(evt) : null;

  constructor(private _adapter: ICheckboxAdapter) {}

  public initialize(): void {
    this._adapter.addHostListener('click', this._clickListener);
    this._adapter.addHostListener('keyup', this._keyupListener);
    this._adapter.syncValue(this._submittedValue, this._formState);
  };

  private _handleChange(evt: Event): void {
    if (this._readonly) {
      evt.stopPropagation();
      return;
    }
    
    const oldValue = this._checked;
    const newValue = !this._checked;
    // Call the public setter to ensure all the update logic is run
    this.checked = newValue;

    const event = new Event('change', { cancelable: true });
    this._adapter.redispatchEvent(event);
    if (event.defaultPrevented) {
      this.checked = oldValue;
      return;
    }

    // Toggle inderminate off after a user action
    this._indeterminate = false;
    this._adapter.toggleHostAttribute(CHECKBOX_CONSTANTS.attributes.INDETERMINATE, this._indeterminate);
  }

  public get checked(): boolean {
    return this._checked;
  }
  public set checked(value: boolean) {
    if (this._checked !== value) {
      this._checked = value;
      this._adapter.setChecked(this._checked);
      this._adapter.syncValue(this._submittedValue, this._formState);
      this._adapter.toggleHostAttribute(CHECKBOX_CONSTANTS.attributes.CHECKED, this._checked);
    }
  }

  public get defaultChecked(): boolean {
    return this._defaultChecked;
  }
  public set defaultChecked(value: boolean) {
    if (this._defaultChecked !== value) {
      this._defaultChecked = value;
      this._adapter.toggleHostAttribute(CHECKBOX_CONSTANTS.attributes.DEFAULT_CHECKED, this._defaultChecked);
    }
  }

  public get indeterminate(): boolean {
    return this._indeterminate;
  }
  public set indeterminate(value: boolean) {
    if (this._indeterminate !== value) {
      this._indeterminate = value;
      this._adapter.syncValue(this._submittedValue, this._formState);
      this._adapter.toggleHostAttribute(CHECKBOX_CONSTANTS.attributes.INDETERMINATE, this._indeterminate);
    }
  }

  public get value(): string {
    return this._value;
  }
  public set value(value: string) {
    if (this._value !== value) {
      this._value = value;
      this._adapter.syncValue(this._submittedValue, this._formState);
      this._adapter.setHostAttribute(CHECKBOX_CONSTANTS.attributes.VALUE, this._value);
    }
  }

  public get dense(): boolean {
    return this._dense;
  }
  public set dense(value: boolean) {
    if (this._dense !== value) {
      this._dense = value;
      this._adapter.toggleHostAttribute(CHECKBOX_CONSTANTS.attributes.DENSE, this._dense);
    }
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      this._adapter.setDisabled(this.disabled);
      this._adapter.toggleHostAttribute(CHECKBOX_CONSTANTS.attributes.DISABLED, this._disabled);
    }
  }

  public get required(): boolean {
    return this._required;
  }
  public set required(value: boolean) {
    if (this._required !== value) {
      this._required = value;
      this._adapter.setRequired(this._required);
      this._adapter.toggleHostAttribute(CHECKBOX_CONSTANTS.attributes.REQUIRED, this._required);
    }
  }

  public get readonly(): boolean {
    return this._readonly;
  }
  public set readonly(value: boolean) {
    if (this._readonly !== value) {
      this._readonly = value;
      this._adapter.setReadonly(this._readonly);
      this._adapter.toggleHostAttribute(CHECKBOX_CONSTANTS.attributes.READONLY, this._readonly);
    }
  }

  public get labelPosition(): CheckboxLabelPosition {
    return this._labelPosition;
  }
  public set labelPosition(value: CheckboxLabelPosition) {
    if (this.labelPosition !== value) {
      this._labelPosition = value;
      this._adapter.setLabelPosition(this._labelPosition);
      this._adapter.setHostAttribute(CHECKBOX_CONSTANTS.attributes.LABEL_POSITION, this._labelPosition);
    }
  }
}
