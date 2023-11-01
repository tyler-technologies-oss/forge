import { BaseButtonFoundation, IBaseButtonFoundation } from './base/base-button-foundation';
import { IButtonAdapter } from './button-adapter';
import { ButtonVariant, BUTTON_CONSTANTS } from './button-constants';

export interface IButtonFoundation extends IBaseButtonFoundation {
  variant: ButtonVariant;
}

export class ButtonFoundation extends BaseButtonFoundation<IButtonAdapter> implements IButtonFoundation {
  private _variant: ButtonVariant = 'text';

  constructor(adapter: IButtonAdapter) {
    super(adapter);
  }

  public get variant(): ButtonVariant {
    return this._variant;
  }
  public set variant(value: ButtonVariant) {
    if (this._variant !== value) {
      const previousVariant = this._variant;
      this._variant = value;
      
      if (this._variant === 'link') {
        this._adapter.toggleStateLayer(false);
      } else if (previousVariant === 'link') {
        this._adapter.toggleStateLayer(true);
      }

      this._adapter.setHostAttribute(BUTTON_CONSTANTS.attributes.VARIANT, this._variant);
    }
  }
}
