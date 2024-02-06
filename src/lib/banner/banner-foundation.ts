import { ICustomElementFoundation } from '@tylertech/forge-core';
import { IBannerAdapter } from './banner-adapter';
import { BannerTheme, BANNER_CONSTANTS } from './banner-constants';

export interface IBannerFoundation extends ICustomElementFoundation {
  dismissed: boolean;
  persistent: boolean;
  theme: BannerTheme;
}

export class BannerFoundation implements IBannerFoundation {
  private _dismissed = false;
  private _persistent = false;
  private _theme: BannerTheme = BANNER_CONSTANTS.defaults.THEME;
  private _dismissListener: EventListener = this._onDismiss.bind(this);

  constructor(private _adapter: IBannerAdapter) {}

  public initialize(): void {
    this._adapter.initialize();

    if (!this._persistent) {
      this._addDismissListener();
    }
  }

  private async _onDismiss(): Promise<void> {
    const originalDismissed = this._dismissed;
    this._dismissed = !this._dismissed;

    const evt = new CustomEvent(BANNER_CONSTANTS.events.DISMISSED, { bubbles: true, composed: true, cancelable: true });
    this._adapter.dispatchHostEvent(evt);
    this._dismissed = originalDismissed;

    if (evt.defaultPrevented) {
      return;
    }

    this.dismissed = !this._dismissed;
  }

  private _addDismissListener(): void {
    this._adapter.addDismissListener(this._dismissListener);
  }

  private _removeDismissEventListener(): void {
    this._adapter.removeDismissListener(this._dismissListener);
  }

  private _applyPersistent(): void {
    this._adapter.setDismissButtonVisibility(!this._persistent);
    if (this._persistent) {
      this._removeDismissEventListener();
    } else {
      this._addDismissListener();
    }
  }

  public get dismissed(): boolean {
    return this._dismissed;
  }
  public set dismissed(value: boolean) {
    value = Boolean(value);
    if (this.dismissed !== value) {
      this._dismissed = value;
      this._adapter.setDismissed(this._dismissed);
      this._adapter.toggleHostAttribute(BANNER_CONSTANTS.attributes.DISMISSED, this.dismissed);
    }
  }

  public get persistent(): boolean {
    return this._persistent;
  }
  public set persistent(value: boolean) {
    value = Boolean(value);
    if (this._persistent !== value) {
      this._persistent = value;
      this._applyPersistent();
      this._adapter.toggleHostAttribute(BANNER_CONSTANTS.attributes.PERSISTENT, this._persistent);
    }
  }

  public get theme(): BannerTheme {
    return this._theme;
  }
  public set theme(value: BannerTheme) {
    if (this._theme !== value) {
      this._theme = value ?? BANNER_CONSTANTS.defaults.THEME;
      this._adapter.setHostAttribute(BANNER_CONSTANTS.attributes.THEME, this._theme);
    }
  }
}
