import { ICustomElementFoundation } from '@tylertech/forge-core';

import { ISwitchAdapter } from './switch-adapter';
import { SWITCH_CONSTANTS, SwitchIconVisibility, SwitchLabelPosition } from './switch-constants';

export interface ISwitchFoundation extends ICustomElementFoundation {
  on: boolean;
  disabled: boolean;
  required: boolean;
  dense: boolean;
  icon: SwitchIconVisibility;
  labelPosition: SwitchLabelPosition;
  syncValidity(hasCustomValidityError: boolean): void;
  setValidity(flags?: ValidityStateFlags | undefined, message?: string | undefined): void;
}

export class SwitchFoundation implements ISwitchFoundation {
  // State
  private _on = false;
  private _disabled = false;
  private _required = false;
  private _dense = false;
  private _icon: SwitchIconVisibility = 'on';
  private _labelPosition: SwitchLabelPosition = 'end';

  // Listeners
  private readonly _changeListener: EventListener;

  constructor(private readonly _adapter: ISwitchAdapter) {
    this._changeListener = (evt: Event) => this._handleChange(evt);
  }

  public initialize(): void {
    this._adapter.addInputListener('change', this._changeListener);
    this._adapter.setIconVisibility(this._icon);
    this._adapter.syncValue(this._on);
  }

  public syncValidity(hasCustomValidityError: boolean): void {
    this._adapter.syncValidity(hasCustomValidityError);
  }

  public setValidity(flags?: ValidityStateFlags | undefined, message?: string | undefined): void {
    this._adapter.setValidity(flags, message);
  }

  private _handleChange(evt: Event): void {
    const target = evt.target as HTMLInputElement;
    const newValue = target.checked;

    const isCancelled = !this._adapter.emitHostEvent(SWITCH_CONSTANTS.events.CHANGE, newValue, true, true);
    if (isCancelled) {
      this._adapter.setOn(this._on);
      return;
    }

    this._on = newValue;
    this._adapter.syncValue(this._on);
    this._setOnAttribute();
  }

  private _setOnAttribute(): void {
    this._adapter.toggleHostAttribute(SWITCH_CONSTANTS.attributes.ON, this._on);
    // Also set selected for backwards compatibility
    this._adapter.toggleHostAttribute(SWITCH_CONSTANTS.attributes.SELECTED, this._on);
  }

  public get on(): boolean {
    return this._on;
  }
  public set on(value: boolean) {
    if (this._on !== value) {
      this._on = value;
      this._adapter.setOn(this._on);
      this._adapter.syncValue(this._on);
      this._setOnAttribute();
    }
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      this._adapter.setDisabled(this._disabled);
      this._adapter.toggleHostAttribute(SWITCH_CONSTANTS.attributes.DISABLED, this._disabled);
    }
  }

  public get required(): boolean {
    return this._required;
  }
  public set required(value: boolean) {
    if (this._required !== value) {
      this._required = value;
      this._adapter.setRequired(this._required);
      this._adapter.toggleHostAttribute(SWITCH_CONSTANTS.attributes.REQUIRED, this._required);
    }
  }

  public get dense(): boolean {
    return this._dense;
  }
  public set dense(value: boolean) {
    if (this._dense !== value) {
      this._dense = value;
      this._adapter.toggleHostAttribute(SWITCH_CONSTANTS.attributes.DENSE, this._dense);
    }
  }

  public get icon(): SwitchIconVisibility {
    return this._icon;
  }
  public set icon(value: SwitchIconVisibility) {
    if (this._icon !== value) {
      this._icon = value;
      this._adapter.setIconVisibility(this._icon);
      this._adapter.setHostAttribute(SWITCH_CONSTANTS.attributes.ICON, this._icon);
    }
  }

  public get labelPosition(): SwitchLabelPosition {
    return this._labelPosition;
  }
  public set labelPosition(value: SwitchLabelPosition) {
    if (this._labelPosition !== value) {
      this._labelPosition = value;
      this._adapter.setLabelPosition(this._labelPosition);
      this._adapter.setHostAttribute(SWITCH_CONSTANTS.attributes.LABEL_POSITION, this._labelPosition);
    }
  }
}
