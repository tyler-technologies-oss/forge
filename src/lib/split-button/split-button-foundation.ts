import { ICustomElementFoundation } from '@tylertech/forge-core';
import { ISplitButtonAdapter } from './split-button-adapter';
import { DEFAULT_VARIANT, SplitButtonVariant, SPLIT_BUTTON_CONSTANTS } from './split-button-constants';

export interface ISplitButtonFoundation extends ICustomElementFoundation {
  variant: SplitButtonVariant;
  disabled: boolean;
  dense: boolean;
  pill: boolean;
}

export class SplitButtonFoundation implements ISplitButtonFoundation {
  private _variant: SplitButtonVariant = DEFAULT_VARIANT;
  private _disabled = false;
  private _dense = false;
  private _pill = false;

  constructor(private readonly _adapter: ISplitButtonAdapter) {}

  public initialize(): void {
    this._adapter.startButtonObserver();

    this._adapter.setVariant(this._variant);
    this._adapter.setDisabled(this._disabled);
    this._adapter.setDense(this._dense);
    this._adapter.setPill(this._pill);
  }

  public destroy(): void {
    this._adapter.destroyButtonObserver();
  }

  public get variant(): SplitButtonVariant {
    return this._variant;
  }
  public set variant(value: SplitButtonVariant) {
    if (this._variant !== value) {
      this._variant = value ?? DEFAULT_VARIANT;
      this._adapter.setVariant(value);
      this._adapter.setHostAttribute(SPLIT_BUTTON_CONSTANTS.attributes.VARIANT, this._variant);
    }
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      this._adapter.setDisabled(this._disabled);
      this._adapter.toggleHostAttribute(SPLIT_BUTTON_CONSTANTS.attributes.DISABLED, this._disabled);
    }
  }

  public get dense(): boolean {
    return this._dense;
  }
  public set dense(value: boolean) {
    if (this._dense !== value) {
      this._dense = value;
      this._adapter.setDense(this._dense);
      this._adapter.toggleHostAttribute(SPLIT_BUTTON_CONSTANTS.attributes.DENSE, this._dense);
    }
  }

  public get pill(): boolean {
    return this._pill;
  }
  public set pill(value: boolean) {
    if (this._pill !== value) {
      this._pill = value;
      this._adapter.setPill(this._pill);
      this._adapter.toggleHostAttribute(SPLIT_BUTTON_CONSTANTS.attributes.PILL, this._pill);
    }
  }
}
