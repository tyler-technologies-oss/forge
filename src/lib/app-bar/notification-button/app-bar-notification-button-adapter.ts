import { getLightElement, toggleAttribute } from '@tylertech/forge-core';
import { BADGE_CONSTANTS, IBadgeComponent } from '../../badge';
import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { IAppBarNotificationButtonComponent } from './app-bar-notification-button';
import { ICON_CONSTANTS, IIconComponent } from '../../icon';

export interface IAppBarNotificationButtonAdapter extends IBaseAdapter {
  initialize(): void;
  setIcon(icon: string): void;
  setCount(value: string | number | null | undefined): void;
  setBadgeType(dot: boolean): void;
  setBadgeTheme(theme: string): void;
  setBadgeVisible(isVisible: boolean): void;
}

export class AppBarNotificationButtonAdapter extends BaseAdapter<IAppBarNotificationButtonComponent> implements IAppBarNotificationButtonAdapter {
  private _badgeElement: IBadgeComponent;
  private _iconElement: IIconComponent;

  constructor(component: IAppBarNotificationButtonComponent) {
    super(component);
  }

  public setIcon(icon: string): void {
    this._iconElement.name = icon;
  }

  public initialize(): void {
    this._badgeElement = getLightElement(this._component, BADGE_CONSTANTS.elementName) as IBadgeComponent;
    this._iconElement = getLightElement(this._component, ICON_CONSTANTS.elementName) as IIconComponent;
  }

  public setCount(value: string | number | undefined | null): void {
    this._badgeElement.textContent = value != null ? String(value) : '';
  }

  public setBadgeType(dot: boolean): void {
    this._badgeElement.dot = dot;
  }

  public setBadgeTheme(theme: string): void {
    toggleAttribute(this._badgeElement, !!theme, BADGE_CONSTANTS.attributes.THEME, theme);
  }

  public setBadgeVisible(isVisible: boolean): void {
    this._badgeElement.open = isVisible;
  }
}
