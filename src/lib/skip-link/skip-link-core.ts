import { ISkipLinkAdapter } from './skip-link-adapter';
import { SKIP_LINK_CONSTANTS, SkipLinkTheme } from './skip-link-constants';

export interface ISkipLinkCore {
  target: string;
  theme: SkipLinkTheme;
  muted: boolean;
  persistent: boolean;
}

export class SkipLinkCore implements ISkipLinkCore {
  private _target = '';
  private _theme: SkipLinkTheme = 'default';
  private _muted = false;
  private _persistent = false;

  constructor(private _adapter: ISkipLinkAdapter) {}

  public get target(): string {
    return this._target;
  }
  public set target(value: string) {
    if (this._target !== value) {
      this._target = value;
      this._adapter.setHostAttribute(SKIP_LINK_CONSTANTS.attributes.TARGET, this._target);

      this._adapter.setHref(`#${this._target}`);
    }
  }

  public get theme(): SkipLinkTheme {
    return this._theme;
  }
  public set theme(value: SkipLinkTheme) {
    if (this._theme !== value) {
      this._theme = value;
      this._adapter.setHostAttribute(SKIP_LINK_CONSTANTS.attributes.THEME, this._theme);
    }
  }

  public get muted(): boolean {
    return this._muted;
  }
  public set muted(value: boolean) {
    if (this._muted !== value) {
      this._muted = value;
      this._adapter.toggleHostAttribute(SKIP_LINK_CONSTANTS.attributes.MUTED, this._muted);
    }
  }

  public get persistent(): boolean {
    return this._persistent;
  }
  public set persistent(value: boolean) {
    if (this._persistent !== value) {
      this._persistent = value;
      this._adapter.toggleHostAttribute(SKIP_LINK_CONSTANTS.attributes.PERSISTENT, this._persistent);
    }
  }
}
