import { BaseButtonCore, IBaseButtonCore } from './base/base-button-core.js';
import { IButtonAdapter } from './button-adapter.js';
import { ButtonTheme, ButtonVariant, BUTTON_CONSTANTS } from './button-constants.js';

export interface IButtonCore extends IBaseButtonCore {
  variant: ButtonVariant;
  pill: boolean;
  theme: ButtonTheme;
  fullWidth: boolean;
}

export class ButtonCore extends BaseButtonCore<IButtonAdapter> implements IButtonCore {
  private _variant: ButtonVariant = 'text';
  private _pill = false;
  private _theme: ButtonTheme = 'primary';
  private _fullWidth = false;

  constructor(adapter: IButtonAdapter) {
    super(adapter);
  }

  public override initialize(): void {
    super.initialize();
    this._adapter.tryApplyGlobalConfiguration(['variant', 'dense']);
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

  public get fullWidth(): boolean {
    return this._fullWidth;
  }
  public set fullWidth(value: boolean) {
    if (this._fullWidth !== value) {
      this._fullWidth = value;
      this._adapter.toggleHostAttribute(BUTTON_CONSTANTS.attributes.FULL_WIDTH, this._fullWidth);
    }
  }
}
