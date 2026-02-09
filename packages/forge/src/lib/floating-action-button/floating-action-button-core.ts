import { BaseButtonCore, IBaseButtonCore } from '../button/base/base-button-core.js';
import { ButtonTheme } from '../button/button-constants.js';
import { IFloatingActionButtonAdapter } from './floating-action-button-adapter.js';
import { FloatingActionButtonDensity, FloatingActionButtonElevation, FLOATING_ACTION_BUTTON_CONSTANTS } from './floating-action-button-constants.js';

export interface IFloatingActionButtonCore extends IBaseButtonCore {
  theme: ButtonTheme;
  density: FloatingActionButtonDensity;
  elevation: FloatingActionButtonElevation;
}

export class FloatingActionButtonCore extends BaseButtonCore<IFloatingActionButtonAdapter> implements IFloatingActionButtonCore {
  private _theme: ButtonTheme = FLOATING_ACTION_BUTTON_CONSTANTS.defaults.DEFAULT_THEME;
  private _density: FloatingActionButtonDensity = FLOATING_ACTION_BUTTON_CONSTANTS.defaults.DEFAULT_DENSITY;
  private _elevation: FloatingActionButtonElevation = FLOATING_ACTION_BUTTON_CONSTANTS.defaults.DEFAULT_ELEVATION;

  constructor(adapter: IFloatingActionButtonAdapter) {
    super(adapter);
  }

  public get theme(): ButtonTheme {
    return this._theme;
  }
  public set theme(value: ButtonTheme) {
    if (this._theme !== value) {
      this._theme = value ?? FLOATING_ACTION_BUTTON_CONSTANTS.defaults.DEFAULT_THEME;
      const hasAttr = this._theme !== FLOATING_ACTION_BUTTON_CONSTANTS.defaults.DEFAULT_THEME;
      this._adapter.toggleHostAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.THEME, hasAttr, this._theme);
    }
  }

  public get density(): FloatingActionButtonDensity {
    return this._density;
  }
  public set density(value: FloatingActionButtonDensity) {
    if (this._density !== value) {
      this._density = value ?? FLOATING_ACTION_BUTTON_CONSTANTS.defaults.DEFAULT_DENSITY;
      const hasAttr = this._density !== FLOATING_ACTION_BUTTON_CONSTANTS.defaults.DEFAULT_DENSITY;
      this._adapter.toggleHostAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.DENSITY, hasAttr, this._density);
    }
  }

  public get elevation(): FloatingActionButtonElevation {
    return this._elevation;
  }
  public set elevation(value: FloatingActionButtonElevation) {
    if (this._elevation !== value) {
      this._elevation = value ?? FLOATING_ACTION_BUTTON_CONSTANTS.defaults.DEFAULT_ELEVATION;
      const hasAttr = this._elevation !== FLOATING_ACTION_BUTTON_CONSTANTS.defaults.DEFAULT_ELEVATION;
      this._adapter.toggleHostAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.ELEVATION, hasAttr, this._elevation);
    }
  }
}
