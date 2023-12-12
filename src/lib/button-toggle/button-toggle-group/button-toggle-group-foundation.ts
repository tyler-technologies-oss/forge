import { ICustomElementFoundation } from '@tylertech/forge-core';
import { IButtonToggleComponent } from '../button-toggle/button-toggle';
import { BUTTON_TOGGLE_CONSTANTS, IButtonToggleSelectEventData } from '../button-toggle/button-toggle-constants';
import { IButtonToggleGroupAdapter } from './button-toggle-group-adapter';
import { ButtonToggleGroupTheme, BUTTON_TOGGLE_GROUP_CONSTANTS, IButtonToggleGroupChangeEventData } from './button-toggle-group-constants';

export interface IButtonToggleGroupFoundation extends ICustomElementFoundation {
  value: unknown;
  multiple: boolean;
  stretch: boolean;
  mandatory: boolean;
  vertical: boolean;
  dense: boolean;
  disabled: boolean;
  readonly: boolean;
  required: boolean;
  outlined: boolean;
  theme: ButtonToggleGroupTheme;
}

export class ButtonToggleGroupFoundation implements IButtonToggleGroupFoundation {
  private _values: unknown[] = [];
  private _outlined = true;
  private _multiple = false;
  private _mandatory = false;
  private _vertical = false;
  private _stretch = false;
  private _dense = false;
  private _disabled = false;
  private _readonly = false;
  private _required = false;
  private _theme: ButtonToggleGroupTheme = 'primary';

  private _selectListener: (evt: CustomEvent<IButtonToggleSelectEventData>) => void;
  private _slotListener: () => void;

  constructor(private _adapter: IButtonToggleGroupAdapter) {
    this._selectListener = evt => this._onSelect(evt);
    this._slotListener = () => this._synchronize();
  }

  public initialize(): void {
    this._adapter.setFormValue();
    this._adapter.setFormValidity();
    this._adapter.addListener(BUTTON_TOGGLE_CONSTANTS.events.SELECT, this._selectListener);
    this._adapter.addSlotChangeListener(this._slotListener);
  }

  public destroy(): void {
    this._adapter.removeListener(BUTTON_TOGGLE_CONSTANTS.events.SELECT, this._selectListener);
    this._adapter.removeSlotChangeListener(this._slotListener);
  }

  private _synchronize(): void {
    if (!this._multiple) {
      const selectedValues = this._adapter.getSelectedValues().concat(this._values);
      this.value = selectedValues.length ? selectedValues[selectedValues.length - 1] : null;
    } else {
      const selectedValues = new Set(this._adapter.getSelectedValues().concat(this._values));
      this._applyValue(Array.from(selectedValues));
    }
  }

  private _onSelect(evt: CustomEvent<IButtonToggleSelectEventData>): void {
    const target = evt.target as IButtonToggleComponent;

    // When in mandatory mode we need to ensure at least one element is selected. If the user tries to deselect the last
    // element, we prevent the select event from toggling.
    if (this._mandatory) {
      const values = this._adapter.getSelectedValues();
      if (!values.length) {
        evt.preventDefault();
        return;
      }
    }

    const detail: IButtonToggleGroupChangeEventData = this._getValue();
    const changeEvt = new CustomEvent(BUTTON_TOGGLE_GROUP_CONSTANTS.events.CHANGE, { detail, bubbles: true, cancelable: true });
    this._adapter.dispatchHostEvent(changeEvt);

    if (changeEvt.defaultPrevented) {
      evt.preventDefault();
      return;
    }

    // When not in multiple mode, we deselect all toggles except for the one that triggered this event
    if (!this._multiple) {
      this._adapter.deselect(target);
    }
    
    this._adapter.setFormValue();
    this._adapter.setFormValidity();
  }

  private _getValue(): any {
    const selections = this._adapter.getSelectedValues();
    return this._multiple ? Array.from(new Set(selections)) : selections.slice(0, 1)[0] ?? null;
  }

  private _applyValue(value: unknown[]): void {
    let values = Array.isArray(value) ? value : [value];
    this._values = values;

    if (!this._multiple && values.length > 1) {
      values = values[0];
    }

    this._adapter.applyValues(values);
    this._adapter.setFormValue();
    this._adapter.setFormValidity();
  }

  public get value(): any {
    return this._getValue();
  }
  public set value(value: any) {
    this._applyValue(value);
  }

  public get multiple(): boolean {
    return this._multiple;
  }
  public set multiple(value: boolean) {
    value = !!value;
    if (this._multiple !== value) {
      this._multiple = value;
      this._applyValue(this._values);
      this._adapter.toggleHostAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.MULTIPLE, this._multiple);
    }
  }

  public get mandatory(): boolean {
    return this._mandatory;
  }
  public set mandatory(value: boolean) {
    value = !!value;
    if (this._mandatory !== value) {
      this._mandatory = value;
      this._adapter.toggleHostAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.MANDATORY, this._mandatory);
    }
  }

  public get vertical(): boolean {
    return this._vertical;
  }
  public set vertical(value: boolean) {
    value = !!value;
    if (this._vertical !== value) {
      this._vertical = value;
      this._adapter.toggleHostAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.VERTICAL, this._vertical);
    }
  }

  public get stretch(): boolean {
    return this._stretch;
  }
  public set stretch(value: boolean) {
    value = !!value;
    if (this._stretch !== value) {
      this._stretch = value;
      this._adapter.toggleHostAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.STRETCH, this._stretch);
    }
  }

  public get dense(): boolean {
    return this._dense;
  }
  public set dense(value: boolean) {
    value = !!value;
    if (this._dense !== value) {
      this._dense = value;
      this._adapter.toggleHostAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.DENSE, this._dense);
    }
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    value = !!value;
    if (this._disabled !== value) {
      this._disabled = value;
      this._adapter.setDisabled(this._disabled);
      this._adapter.toggleHostAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.DISABLED, this._disabled);
    }
  }

  public get readonly(): boolean {
    return this._readonly;
  }
  public set readonly(value: boolean) {
    value = !!value;
    if (this._readonly !== value) {
      this._readonly = value;
      this._adapter.toggleHostAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.READONLY, this._readonly);
    }
  }

  public get required(): boolean {
    return this._required;
  }
  public set required(value: boolean) {
    value = !!value;
    if (this._required !== value) {
      this._required = value;
      this._adapter.toggleHostAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.REQUIRED, this._required);
    }
  }

  public get outlined(): boolean {
    return this._outlined;
  }
  public set outlined(value: boolean) {
    value = !!value;
    if (this._outlined !== value) {
      this._outlined = value;
      this._adapter.toggleHostAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.NO_OUTLINE, !this._outlined);
    }
  }

  public get theme(): ButtonToggleGroupTheme {
    return this._theme;
  }
  public set theme(value: ButtonToggleGroupTheme) {
    if (this._theme !== value) {
      this._theme = value;
      this._adapter.toggleHostAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.THEME, this._theme !== 'primary', this._theme);
    }
  }
}
