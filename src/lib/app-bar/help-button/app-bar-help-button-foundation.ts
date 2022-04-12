import { ICustomElementFoundation } from '@tylertech/forge-core';
import { IMenuOption } from '../../menu';
import { IAppBarHelpButtonAdapter } from './app-bar-help-button-adapter';

export interface IAppBarHelpButtonFoundation extends ICustomElementFoundation {
  options: IMenuOption[];
}

export class AppBarHelpButtonFoundation implements IAppBarHelpButtonFoundation {
  private _options: IMenuOption[] = [];
  private _isInitialized = false;

  constructor(private _adapter: IAppBarHelpButtonAdapter) { }

  public initialize(): void {
    this._adapter.initialize();
    this._adapter.setMenuOptions(this._options);
    this._isInitialized = true;
  }

  public disconnect(): void {
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
}
