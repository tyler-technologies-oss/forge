import { ICustomElementFoundation } from '@tylertech/forge-core';
import { IMenuOption } from '../../menu';
import { IAppBarHelpButtonAdapter } from './app-bar-help-button-adapter';
import { APP_BAR_HELP_BUTTON_CONSTANTS } from './app-bar-help-button-constants';

export interface IAppBarHelpButtonFoundation extends ICustomElementFoundation {
  options: IMenuOption[];
  icon: string;
}

export class AppBarHelpButtonFoundation implements IAppBarHelpButtonFoundation {
  private _options: IMenuOption[] = [];
  private _icon = APP_BAR_HELP_BUTTON_CONSTANTS.defaults.ICON;
  private _isInitialized = false;

  constructor(private _adapter: IAppBarHelpButtonAdapter) {}

  public initialize(): void {
    this._adapter.initialize();
    this._adapter.setMenuOptions(this._options);
    this._adapter.setIcon(this._icon);
    this._isInitialized = true;
  }

  public disconnect(): void {
    this._adapter.destroy();
    this._isInitialized = false;
  }

  public get options(): IMenuOption[] {
    return this._options;
  }
  public set options(value: IMenuOption[]) {
    this._options = value.map(o => ({ ...o }));
    if (this._isInitialized) {
      this._adapter.setMenuOptions(value);
    }
  }

  public get icon(): string {
    return this._icon;
  }
  public set icon(value: string) {
    if (this._icon !== value) {
      this._icon = value || APP_BAR_HELP_BUTTON_CONSTANTS.defaults.ICON;
      if (this._isInitialized) {
        this._adapter.setIcon(value);
      }
      this._adapter.setHostAttribute(APP_BAR_HELP_BUTTON_CONSTANTS.attributes.ICON, this._icon);
    }
  }
}
