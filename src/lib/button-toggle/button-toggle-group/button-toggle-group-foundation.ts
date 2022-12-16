import { ICustomElementFoundation } from '@tylertech/forge-core';
import { IButtonToggleComponent } from '../button-toggle/button-toggle';
import { BUTTON_TOGGLE_CONSTANTS, IButtonToggleSelectEventData } from '../button-toggle/button-toggle-constants';
import { IButtonToggleGroupAdapter } from './button-toggle-group-adapter';
import { BUTTON_TOGGLE_GROUP_CONSTANTS, IButtonToggleOption } from './button-toggle-group-constants';

export interface IButtonToggleGroupFoundation extends ICustomElementFoundation {
  value: any;
  multiple: boolean;
  stretch: boolean;
  mandatory: boolean;
  vertical: boolean;
  dense: boolean;
  disabled: boolean;
  options: IButtonToggleOption[];
}

export class ButtonToggleGroupFoundation implements IButtonToggleGroupFoundation {
  private _isInitialized = false;
  private _multiple = false;
  private _mandatory = false;
  private _vertical = false;
  private _stretch = false;
  private _dense = false;
  private _disabled = false;
  private _options: IButtonToggleOption[] = [];
  private _values: any[] = [];
  private _originalValue: any;
  private _selectListener: (evt: CustomEvent<IButtonToggleSelectEventData>) => void;
  private _slotListener: () => void;

  constructor(private _adapter: IButtonToggleGroupAdapter) {
    this._selectListener = evt => this._onSelect(evt);
    this._slotListener = () => this._synchronize();
  }

  public initialize(): void {
    if (this._options && this._options.length) {
      this._applyOptions(false);
    }

    this._adapter.addListener(BUTTON_TOGGLE_CONSTANTS.events.SELECT, this._selectListener);
    this._adapter.addSlotChangeListener(this._slotListener);
    this._adapter.setVertical(this._vertical);
    this._adapter.setStretch(this._stretch);
    this._adapter.setDense(this._dense);
    this._adapter.setDisabled(this._disabled);
    this._adapter.applyAdjacentSelections(this._vertical);
    this._isInitialized = true;
  }

  public disconnect(): void {
    this._isInitialized = false;
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

    // When in mandatory mode we need to ensure at least one element is selected. If there are no selections
    // then we need to reselect the target toggle because it was deselected
    if (this._mandatory) {
      const values = this._adapter.getSelectedValues();
      if (!values.length) {
        target.selected = true;
        return;
      }
    }

    // When not in multiple mode, we deselect all toggles, except for the one that was just changed
    if (!this._multiple) {
      this._adapter.deselect(target);
    }

    this._adapter.applyAdjacentSelections(this._vertical);
    this._adapter.emitHostEvent(BUTTON_TOGGLE_GROUP_CONSTANTS.events.CHANGE, this._getValue());
  }

  private _getValue(): any {
    const selections = this._adapter.getSelectedValues();
    return this._multiple ? Array.from(new Set(selections)) : selections.slice(0, 1)[0] ?? null;
  }

  private _applyValue(value: any): void {
    let values = value instanceof Array ? value : [value];
    if (!this._multiple && values.length > 1) {
      values = values[0];
    }
    this._values = values;
    this._adapter.applyValues(values);
    if (this._multiple) {
      this._adapter.applyAdjacentSelections(this._vertical);
    }
  }

  private _applyOptions(init = true): void {
    if (this._options) {
      this._adapter.createOptions(this._options);

      if (init) {
        this._adapter.setStretch(this._stretch);
        this._adapter.setDense(this._dense);
        this._adapter.setDisabled(this._disabled);
        this._adapter.applyAdjacentSelections(this._vertical);
      }
    }
  }

  public get value(): any {
    if (!this._isInitialized) {
      return this._originalValue;
    }
    return this._getValue();
  }
  public set value(value: any) {
    this._originalValue = value;
    this._applyValue(value);
  }

  public get multiple(): boolean {
    return this._multiple;
  }
  public set multiple(value: boolean) {
    if (this._multiple !== value) {
      this._multiple = value;
      this._adapter.setHostAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.MULTIPLE, this._multiple as any);
    }
  }

  public get mandatory(): boolean {
    return this._mandatory;
  }
  public set mandatory(value: boolean) {
    if (this._mandatory !== value) {
      this._mandatory = value;
      if (this._mandatory) {
        this._adapter.setHostAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.MANDATORY);
      } else {
        this._adapter.removeHostAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.MANDATORY);
      }
    }
  }

  public get vertical(): boolean {
    return this._vertical;
  }
  public set vertical(value: boolean) {
    if (this._vertical !== value) {
      this._vertical = value;
      this._adapter.setVertical(this._vertical);
      this._adapter.applyAdjacentSelections(this._vertical);
      if (this._vertical) {
        this._adapter.setHostAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.VERTICAL);
      } else {
        this._adapter.removeHostAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.VERTICAL);
      }
    }
  }

  public get stretch(): boolean {
    return this._stretch;
  }
  public set stretch(value: boolean) {
    if (this._stretch !== value) {
      this._stretch = value;
      this._adapter.setStretch(this._stretch);
      if (this._stretch) {
        this._adapter.setHostAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.STRETCH);
      } else {
        this._adapter.removeHostAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.STRETCH);
      }
    }
  }

  public get dense(): boolean {
    return this._dense;
  }
  public set dense(value: boolean) {
    if (this._dense !== value) {
      this._dense = value;
      this._adapter.setDense(this._dense);
      if (this._dense) {
        this._adapter.setHostAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.DENSE);
      } else {
        this._adapter.removeHostAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.DENSE);
      }
    }
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      this._adapter.setDisabled(this._disabled);
      if (this._disabled) {
        this._adapter.setHostAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.DISABLED);
      } else {
        this._adapter.removeHostAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.DISABLED);
      }
    }
  }

  public get options(): IButtonToggleOption[] {
    return this._options.map(o => ({ ...o }));
  }
  public set options(value: IButtonToggleOption[]) {
    this._options = value.map(o => ({ ...o }));
    if (this._isInitialized) {
      this._applyOptions();
    }
  }
}
