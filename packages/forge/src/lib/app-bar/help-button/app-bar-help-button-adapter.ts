import { getLightElement, toggleAttribute } from '@tylertech/forge-core';
import { forwardAttributes } from '../../core/utils/reflect-utils.js';
import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter.js';
import { IMenuComponent, IMenuOption, MENU_CONSTANTS } from '../../menu/index.js';
import type { IAppBarHelpButtonComponent } from './app-bar-help-button.js';
import type { IIconButtonComponent } from '../../icon-button/icon-button.js';
import { ICON_BUTTON_CONSTANTS } from '../../icon-button/icon-button-constants.js';
import { APP_BAR_HELP_BUTTON_CONSTANTS } from './app-bar-help-button-constants.js';
import { ICON_CONSTANTS, IIconComponent } from '../../icon/index.js';

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

    const originalAriaLabelledBy = this._iconButtonElement.getAttribute('aria-labelledby');

    this._forwardObserver = forwardAttributes(this._component, APP_BAR_HELP_BUTTON_CONSTANTS.forwardedAttributes, (name, value) => {
      if (name === 'aria-labelledby' && !value) {
        value = originalAriaLabelledBy;
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
