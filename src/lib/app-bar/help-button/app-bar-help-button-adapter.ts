import { getLightElement, toggleAttribute } from '@tylertech/forge-core';
import { forwardAttributes } from '../../core/utils/reflect-utils';
import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { IMenuComponent, IMenuOption, MENU_CONSTANTS } from '../../menu';
import type { IAppBarHelpButtonComponent } from './app-bar-help-button';
import type { IIconButtonComponent } from '../../icon-button/icon-button';
import { ICON_BUTTON_CONSTANTS } from '../../icon-button/icon-button-constants';
import { APP_BAR_HELP_BUTTON_CONSTANTS } from './app-bar-help-button-constants';
import { ICON_CONSTANTS, IIconComponent } from '../../icon';

export interface IAppBarHelpButtonAdapter extends IBaseAdapter {
  initialize(): void;
  destroy(): void;
  setMenuOptions(options: IMenuOption[]): void;
  setIcon(icon: string): void;
}

export class AppBarHelpButtonAdapter extends BaseAdapter<IAppBarHelpButtonComponent> implements IAppBarHelpButtonAdapter {
  private _menuElement: IMenuComponent;
  private _iconButtonElement: IIconButtonComponent;
  private _iconElement: IIconComponent;
  private _forwardObserver?: MutationObserver;

  constructor(component: IAppBarHelpButtonComponent) {
    super(component);
  }

  public initialize(): void {
    this._menuElement = getLightElement(this._component, MENU_CONSTANTS.elementName) as IMenuComponent;
    this._iconButtonElement = getLightElement(this._component, ICON_BUTTON_CONSTANTS.elementName) as IIconButtonComponent;
    this._iconElement = getLightElement(this._component, ICON_CONSTANTS.elementName) as IIconComponent;

    const originalAriaLabel = this._iconButtonElement.getAttribute('aria-label');

    this._forwardObserver = forwardAttributes(this._component, APP_BAR_HELP_BUTTON_CONSTANTS.forwardedAttributes, (name, value) => {
      if (name === 'aria-label' && !value) {
        value = originalAriaLabel;
      }
      toggleAttribute(this._iconButtonElement, !!value, name, value ?? undefined);
    });
  }

  public destroy(): void {
    this._forwardObserver?.disconnect();
    this._forwardObserver = undefined;
  }

  public setMenuOptions(options: IMenuOption[]): void {
    this._menuElement.options = options;
  }

  public setIcon(icon: string): void {
    this._iconElement.name = icon;
  }
}
