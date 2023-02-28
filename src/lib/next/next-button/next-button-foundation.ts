import { INextBaseButtonFoundation, NextBaseButtonFoundation } from '../core/button/base-button-foundation';
import { INextButtonAdapter } from './next-button-adapter';
import { NextButtonVariant, NEXT_BUTTON_CONSTANTS } from './next-button-constants';

export interface INextButtonFoundation extends INextBaseButtonFoundation {
  variant: NextButtonVariant;
  dense: boolean;
}

export class NextButtonFoundation extends NextBaseButtonFoundation<INextButtonAdapter> implements INextButtonFoundation {
  private _variant: NextButtonVariant = 'text';
  private _dense = false;

  constructor(adapter: INextButtonAdapter) {
    super(adapter);
  }

  protected override _syncState(): void {
    super._syncState();
    this._adapter.setVariant(this._variant);
    this._adapter.setDense(this._dense);
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
}
