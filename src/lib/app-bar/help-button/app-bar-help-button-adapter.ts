import { getLightElement } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { IMenuComponent, IMenuOption, MENU_CONSTANTS } from '../../menu';
import { IAppBarHelpButtonComponent } from './app-bar-help-button';

export interface IAppBarHelpButtonAdapter extends IBaseAdapter {
  initialize(): void;
  setMenuOptions(options: IMenuOption[]): void;
}

export class AppBarHelpButtonAdapter extends BaseAdapter<IAppBarHelpButtonComponent> implements IAppBarHelpButtonAdapter {
  private _menuElement: IMenuComponent;

  constructor(component: IAppBarHelpButtonComponent) {
    super(component);
  }

  public initialize(): void {
    this._menuElement = getLightElement(this._component, MENU_CONSTANTS.elementName) as IMenuComponent;
  }

  public setMenuOptions(options: IMenuOption[]): void {
    this._menuElement.options = options;
  }
}
