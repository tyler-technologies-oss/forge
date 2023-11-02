import { BaseButtonFoundation, IBaseButtonFoundation } from './base/base-button-foundation';
import { IButtonAdapter } from './button-adapter';
import { ButtonTheme, ButtonVariant, BUTTON_CONSTANTS } from './button-constants';

export interface IButtonFoundation extends IBaseButtonFoundation {
  variant: ButtonVariant;
  pill: boolean;
  theme: ButtonTheme;
}

export class ButtonFoundation extends BaseButtonFoundation<IButtonAdapter> implements IButtonFoundation {
  private _variant: ButtonVariant = 'text';
  private _pill = false;
  private _theme: ButtonTheme = 'primary';

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

  public get pill(): boolean {
    return this._pill;
  }
  public set pill(value: boolean) {
    if (this._pill !== value) {
      this._pill = value;
      this._adapter.toggleHostAttribute(BUTTON_CONSTANTS.attributes.PILL, this._pill);
    }
  }

  public get theme(): ButtonTheme {
    return this._theme;
  }
  public set theme(value: ButtonTheme) {
    if (this._theme !== value) {
      this._theme = value;
      this._adapter.setHostAttribute(BUTTON_CONSTANTS.attributes.THEME, this._theme);
    }
  }
}
