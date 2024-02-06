import { getLightElement, toggleAttribute } from '@tylertech/forge-core';
import { BADGE_CONSTANTS, IBadgeComponent } from '../../badge';
import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { IAppBarNotificationButtonComponent } from './app-bar-notification-button';
import { ICON_CONSTANTS, IIconComponent } from '../../icon';
import { APP_BAR_NOTIFICATION_BUTTON_CONSTANTS } from './app-bar-notification-button-constants';
import { forwardAttributes } from '../../core/utils/reflect-utils';
import { ICON_BUTTON_CONSTANTS } from '../../icon-button/icon-button-constants';
import { IIconButtonComponent } from '../../icon-button/icon-button';

export interface IAppBarNotificationButtonAdapter extends IBaseAdapter {
  initialize(): void;
  destroy(): void;
  setIcon(icon: string): void;
  setCount(value: number | string): void;
  setBadgeType(dot: boolean): void;
  setBadgeTheme(theme: string): void;
  setBadgeVisible(isVisible: boolean): void;
}

export class AppBarNotificationButtonAdapter extends BaseAdapter<IAppBarNotificationButtonComponent> implements IAppBarNotificationButtonAdapter {
  private _iconButtonElement: IIconButtonComponent;
  private _badgeElement: IBadgeComponent;
  private _iconElement: IIconComponent;
  private _forwardObserver?: MutationObserver;

  constructor(component: IAppBarNotificationButtonComponent) {
    super(component);
  }

  public setIcon(icon: string): void {
    this._iconElement.name = icon;
  }

  public initialize(): void {
    this._iconButtonElement = getLightElement(this._component, ICON_BUTTON_CONSTANTS.elementName) as IIconButtonComponent;
    this._badgeElement = getLightElement(this._component, BADGE_CONSTANTS.elementName) as IBadgeComponent;
    this._iconElement = getLightElement(this._component, ICON_CONSTANTS.elementName) as IIconComponent;

    const originalAriaLabelledby = this._iconButtonElement.getAttribute('aria-labelledby');

    this._forwardObserver = forwardAttributes(this._component, APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.forwardedAttributes, (name, value) => {
      if (name === 'aria-labelledby' && !value) {
        value = originalAriaLabelledby;
      }
      toggleAttribute(this._iconButtonElement, !!value, name, value ?? undefined);
    });
  }

  public destroy(): void {
    this._forwardObserver?.disconnect();
    this._forwardObserver = undefined;
  }

  public setCount(value: number | string): void {
    this._badgeElement.textContent = String(value);
  }

  public setBadgeType(dot: boolean): void {
    this._badgeElement.dot = dot;
  }

  public setBadgeTheme(theme: string): void {
    toggleAttribute(this._badgeElement, !!theme, BADGE_CONSTANTS.attributes.THEME, theme);
  }

  public setBadgeVisible(isVisible: boolean): void {
    this._badgeElement.hide = !isVisible;
  }
}
