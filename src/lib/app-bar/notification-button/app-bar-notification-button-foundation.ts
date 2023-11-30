import { ICustomElementFoundation } from '@tylertech/forge-core';
import { IAppBarNotificationButtonAdapter } from './app-bar-notification-button-adapter';
import { APP_BAR_NOTIFICATION_BUTTON_CONSTANTS } from './app-bar-notification-button-constants';

export interface IAppBarNotificationButtonFoundation extends ICustomElementFoundation {
  count: number | string;
  dot: boolean;
  theme: string;
  showBadge: boolean;
  icon: string;
}

export class AppBarNotificationButtonFoundation implements IAppBarNotificationButtonFoundation {
  private _count: number | string = '0';
  private _dot = false;
  private _theme: string;
  private _showBadge = false;
  private _isInitialized = false;
  private _icon = 'notifications';

  constructor(private _adapter: IAppBarNotificationButtonAdapter) {}

  public initialize(): void {
    this._adapter.initialize();
    this._adapter.setCount(this._count);
    this._adapter.setBadgeType(this._dot);
    this._adapter.setBadgeTheme(this._theme);
    this._adapter.setBadgeVisible(this._showBadge);
    this._adapter.setIcon(this._icon);
    this._isInitialized = true;
  }

  public destroy(): void {
    this._adapter.destroy();
    this._isInitialized = false;
  }

  public get icon(): string {
    return this._icon;
  }
  public set icon(value: string) {
    if (this._icon !== value) {
      this._icon = value;
      if (this._isInitialized) {
        this._adapter.setIcon(this._icon);
      }
      this._adapter.setHostAttribute(APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.ICON, this._icon);
    }
  }

  public get count(): number | string {
    return this._count;
  }
  public set count(value: number | string) {
    if (this._count !== value) {
      this._count = value;
      if (this._isInitialized) {
        this._adapter.setCount(this._count);
      }
      this._adapter.setHostAttribute(APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.COUNT, this._count as any);
    }
  }

  public get dot(): boolean {
    return this._dot;
  }
  public set dot(value: boolean) {
    value = Boolean(value);
    if (this._dot !== value) {
      this._dot = value;
      if (this._isInitialized) {
        this._adapter.setBadgeType(this._dot);
      }
      this._adapter.toggleHostAttribute(APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.DOT, this._dot);
    }
  }

  public get theme(): string {
    return this._theme;
  }
  public set theme(value: string) {
    if (this._theme !== value) {
      this._theme = value;
      if (this._isInitialized) {
        this._adapter.setBadgeTheme(this._theme);
        this._adapter.setHostAttribute(APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.THEME, this._theme);
      }
    }
  }

  public get showBadge(): boolean {
    return this._showBadge;
  }
  public set showBadge(value: boolean) {
    value = Boolean(value);
    if (this._showBadge !== value) {
      this._showBadge = value;
      if (this._isInitialized) {
        this._adapter.setBadgeVisible(this._showBadge);
      }
      this._adapter.toggleHostAttribute(APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.SHOW_BADGE, this._showBadge);
    }
  }
}
