import { BUTTON_TOGGLE_CONSTANTS, IButtonToggleSelectEventData } from '../button-toggle/button-toggle-constants';
import { IButtonToggleGroupAdapter } from './button-toggle-group-adapter';
import { ButtonToggleGroupTheme, BUTTON_TOGGLE_GROUP_CONSTANTS, IButtonToggleGroupChangeEventData } from './button-toggle-group-constants';

export interface IButtonToggleGroupCore {
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

export class ButtonToggleGroupCore implements IButtonToggleGroupCore {
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
  private _theme: ButtonToggleGroupTheme = 'tertiary';

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
    if (this._disabled) {
      this._adapter.setDisabled(this._disabled);
    }
    if (this._readonly) {
      this._adapter.setReadonly(this._readonly);
    }

    if (this._multiple) {
      const selectedValues = new Set(this._adapter.getSelectedValues().concat(this._values));
      this.value = Array.from(selectedValues);
    } else {
      const selectedValues = this._adapter.getSelectedValues().concat(this._values);
      this.value = selectedValues.length ? selectedValues[selectedValues.length - 1] : null;
    }
  }

  private _onSelect(evt: CustomEvent<IButtonToggleSelectEventData>): void {
    // When in mandatory mode we need to ensure at least one element is selected. If the user tries to deselect the last
    // element, we prevent the select event from toggling.
    if (this._mandatory) {
      const values = this._adapter.getSelectedValues();
      if (!values.length) {
        evt.preventDefault();
        return;
      }
    }

    // Compute the new state to provide in the change event
    let value: unknown[];
    if (evt.detail.selected) {
      value = this._multiple ? [...this._values, evt.detail.value] : [evt.detail.value];
    } else {
      value = this._multiple ? this._values.filter(v => v !== evt.detail.value) : [];
    }

    const detail: IButtonToggleGroupChangeEventData = this._multiple ? value : value.length ? value[0] : null;
    const changeEvt = new CustomEvent(BUTTON_TOGGLE_GROUP_CONSTANTS.events.CHANGE, {
      detail,
      bubbles: true,
      cancelable: true
    });
    this._adapter.dispatchHostEvent(changeEvt);

    if (changeEvt.defaultPrevented) {
      evt.preventDefault();
      return;
    }

    this._values = value;
    this._adapter.applyValues(this._values);
    this._adapter.setFormValue();
    this._adapter.setFormValidity();
  }

  private _applyValue(value: unknown[]): void {
    let values = Array.isArray(value) ? value : value != null ? [value] : [];
    this._values = values;

    if (!this._multiple && values.length > 1) {
      values = [values[0]];
    }

    this._adapter.applyValues(values);
    this._adapter.setFormValue();
    this._adapter.setFormValidity();
  }

  public get value(): any {
    // Combine the selected toggle values with our current state to ensure we always return the latest value
    // even if our state doesn't match a selected toggle.
    const values = Array.from(new Set(this._adapter.getSelectedValues().concat(this._values)));
    return this._multiple ? Array.from(values) : values[0] ?? null;
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
      this._adapter.setReadonly(this._readonly);
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
      this._adapter.toggleHostAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.THEME, this._theme !== 'tertiary', this._theme);
    }
  }
}
