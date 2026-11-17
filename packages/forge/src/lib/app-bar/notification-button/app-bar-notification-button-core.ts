import { IAppBarNotificationButtonAdapter } from './app-bar-notification-button-adapter.js';
import { APP_BAR_NOTIFICATION_BUTTON_CONSTANTS } from './app-bar-notification-button-constants.js';

export interface IAppBarNotificationButtonCore {
  count: string | number | null | undefined;
  dot: boolean;
  theme: string;
  showBadge: boolean;
  icon: string;
  max: number;
}

export class AppBarNotificationButtonCore implements IAppBarNotificationButtonCore {
  private _count: string | number | null | undefined = 0;
  private _dot = false;
  private _theme: string;
  private _showBadge = false;
  private _isInitialized = false;
  private _icon = 'notifications';
  private _max = APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.defaults.MAX;

  constructor(private _adapter: IAppBarNotificationButtonAdapter) {}

  public initialize(): void {
    this._adapter.initialize();
    this._adapter.setBadgeType(this._dot);
    this._updateCount();
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

  public get count(): string | number | null | undefined {
    return this._count;
  }
  public set count(value: string | number | null | undefined) {
    if (this._count !== value) {
      this._count = value;
      if (this._isInitialized) {
        this._updateCount();

        if (typeof this._count === 'string') {
          this._adapter.setHostAttribute(APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.COUNT, this._count);
        } else if (value == null) {
          this._adapter.removeHostAttribute(APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.COUNT);
        }
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
        this._updateCount();
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
        this._updateCountDescription();
      }
      this._adapter.toggleHostAttribute(APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.SHOW_BADGE, this._showBadge);
    }
  }

  public get max(): number {
    return this._max;
  }
  public set max(value: number) {
    value = Number(value);
    if (this._max !== value) {
      this._max = value;
      if (this._isInitialized) {
        this._updateCount();
      }
      this._adapter.setHostAttribute(APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.MAX, String(this._max));
    }
  }

  private _updateCount(): void {
    this._adapter.setCount(this._dot ? null : this._formatCount());
    this._updateCountDescription();
  }

  private _updateCountDescription(): void {
    const hasCount = this._showBadge && !this._dot && this._count != null && String(this._count).trim() !== '';
    this._adapter.setCountDescription(hasCount ? `${this._count} unread` : null);
  }

  /** Caps whole-number counts above `max` at `max+`, so `100` shows as `99+`. Other values show as given. */
  private _formatCount(): string | number | null | undefined {
    const count = typeof this._count === 'string' && /^\d+$/.test(this._count.trim()) ? Number(this._count) : this._count;
    if (typeof count !== 'number' || !Number.isFinite(this._max) || this._max <= 0) {
      return this._count;
    }
    return count > this._max ? `${this._max}+` : this._count;
  }
}
