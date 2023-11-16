import { BaseButtonFoundation, IBaseButtonFoundation } from '../button/base/base-button-foundation';
import { ButtonTheme } from '../button/button-constants';
import { IFloatingActionButtonAdapter } from './floating-action-button-adapter';
import { FloatingActionButtonDensity, FloatingActionButtonElevation, FLOATING_ACTION_BUTTON_CONSTANTS } from './floating-action-button-constants';

export interface IFloatingActionButtonFoundation extends IBaseButtonFoundation {
  theme: ButtonTheme;
  density: FloatingActionButtonDensity;
  elevation: FloatingActionButtonElevation;
}

export class FloatingActionButtonFoundation extends BaseButtonFoundation<IFloatingActionButtonAdapter> implements IFloatingActionButtonFoundation {
  private _theme: ButtonTheme = 'secondary';
  private _density: FloatingActionButtonDensity = 'medium';
  private _elevation: FloatingActionButtonElevation = 'raised';

  constructor(adapter: IFloatingActionButtonAdapter) {
    super(adapter);
  }

  public destroy(): void {
    this._adapter.destroy();
  }

  public get theme(): ButtonTheme {
    return this._theme;
  }
  public set theme(value: ButtonTheme) {
    if (this._theme !== value) {
      this._theme = value;
      this._adapter.toggleHostAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.THEME, this._theme !== 'secondary', this._theme);
    }
  }

  public get density(): FloatingActionButtonDensity {
    return this._density;
  }
  public set density(value: FloatingActionButtonDensity) {
    if (this._density !== value) {
      this._density = value;
      this._adapter.toggleHostAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.DENSITY, this._density !== 'medium', this._density);
    }
  }

  public get elevation(): FloatingActionButtonElevation {
    return this._elevation;
  }
  public set elevation(value: FloatingActionButtonElevation) {
    if (this._elevation !== value) {
      this._elevation = value;
      this._adapter.toggleHostAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.ELEVATION, this._elevation !== 'raised', this._elevation);
    }
  }
}
