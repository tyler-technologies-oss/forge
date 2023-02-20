import { ICustomElementFoundation } from '@tylertech/forge-core';
import { INextButtonAdapter } from './next-button-adapter';
import { NextButtonType, NextButtonVariant, NEXT_BUTTON_CONSTANTS } from './next-button-constants';

export interface INextButtonFoundation extends ICustomElementFoundation {
  type: NextButtonType;
  variant: NextButtonVariant;
  dense: boolean;
  disabled: boolean;
  initialize(): void;
  destroy(): void;
}

export class NextButtonFoundation implements INextButtonFoundation {
  private _type: NextButtonType = 'button';
  private _variant: NextButtonVariant = 'text';
  private _dense = false;
  private _disabled = false;

  constructor(private _adapter: INextButtonAdapter) {

  }

  public initialize(): void {
    this._adapter.deferRippleInitialization();
  }

  public destroy(): void {

  }

  public get type(): NextButtonType {
    return this._type;
  }
  public set type(value: NextButtonType) {
    if (this._type !== value) {
      this._type = value;
      this._adapter.setButtonType(this._type);
      this._adapter.setHostAttribute(NEXT_BUTTON_CONSTANTS.attributes.TYPE, this._type);
    }
  }

  public get variant(): NextButtonVariant {
    return this._variant;
  }
  public set variant(value: NextButtonVariant) {
    if (this._variant !== value) {
      this._variant = value;
      this._adapter.setVariant(this._variant);
      this._adapter.setHostAttribute(NEXT_BUTTON_CONSTANTS.attributes.VARIANT, this._variant);
    }
  }

  public get dense(): boolean {
    return this._dense;
  }
  public set dense(value: boolean) {
    if (this._dense !== !!value) {
      this._dense = !!value;
      this._adapter.setDense(this._dense);
      this._adapter.toggleHostAttribute(NEXT_BUTTON_CONSTANTS.attributes.DENSE, this._dense);
    }
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (this._disabled !== !!value) {
      this._disabled = !!value;
      this._adapter.setDisabled(this._disabled);
      this._adapter.toggleHostAttribute(NEXT_BUTTON_CONSTANTS.attributes.DISABLED, this._disabled);
    }
  }
}
