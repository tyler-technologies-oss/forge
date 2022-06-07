import { getLightElement, toggleAttribute } from '@tylertech/forge-core';
import { BADGE_CONSTANTS, IBadgeComponent } from '../../badge';
import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { IAppBarNotificationButtonComponent } from './app-bar-notification-button';

export interface IAppBarNotificationButtonAdapter extends IBaseAdapter {
  initialize(): void;
  setCount(value: number): void;
  setBadgeType(dot: boolean): void;
  setBadgeTheme(theme: string): void;
  setBadgeVisible(isVisible: boolean): void;
}

export class AppBarNotificationButtonAdapter extends BaseAdapter<IAppBarNotificationButtonComponent> implements IAppBarNotificationButtonAdapter {
  private _badgeElement: IBadgeComponent;

  constructor(component: IAppBarNotificationButtonComponent) {
    super(component);
  }

  public initialize(): void {
    this._badgeElement = getLightElement(this._component, BADGE_CONSTANTS.elementName) as IBadgeComponent;
  }

  public setCount(value: number): void {
    this._badgeElement.textContent = value as any;
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
