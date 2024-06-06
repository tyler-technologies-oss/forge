import { ICustomElementCore } from '@tylertech/forge-core';
import { IAppBarAdapter } from './app-bar-adapter';
import { AppBarElevation, AppBarTheme, APP_BAR_CONSTANTS } from './app-bar-constants';

export interface IAppBarCore extends ICustomElementCore {
  titleText: string;
  elevation: AppBarElevation;
  theme: string;
  href: string;
  target: string;
}

export class AppBarCore implements IAppBarCore {
  private _titleText = '';
  private _elevation: AppBarElevation = 'raised';
  private _theme: AppBarTheme;
  private _href = '';
  private _target = '';

  private _centerSlotListener: EventListener = (): void => this._adapter.setCenterSlotVisibility();
  private _anchorClickListener: EventListener = this._onHrefClick.bind(this);

  constructor(private _adapter: IAppBarAdapter) {}

  public initialize(): void {
    this._adapter.initialize();
    this._adapter.addCenterSlotListener(this._centerSlotListener);
    this._adapter.setCenterSlotVisibility();
  }

  private _onHrefClick(evt: Event): void {
    const event = new CustomEvent(APP_BAR_CONSTANTS.events.NAVIGATE, { bubbles: true, composed: true, cancelable: true });
    this._adapter.dispatchHostEvent(event);
    if (event.defaultPrevented) {
      evt.preventDefault();
    }
  }

  public get titleText(): string {
    return this._titleText;
  }
  public set titleText(value: string) {
    if (this._titleText !== value) {
      this._titleText = value ?? '';
      this._adapter.setTitleText(this._titleText);
      this._adapter.setHostAttribute(APP_BAR_CONSTANTS.attributes.TITLE_TEXT, value);
    }
  }

  public get elevation(): AppBarElevation {
    return this._elevation;
  }
  public set elevation(value: AppBarElevation) {
    if (this._elevation !== value) {
      this._elevation = value;
      this._adapter.setHostAttribute(APP_BAR_CONSTANTS.attributes.ELEVATION, value);
    }
  }

  public get theme(): AppBarTheme {
    return this._theme;
  }
  public set theme(value: AppBarTheme) {
    if (this._theme !== value) {
      this._theme = value ?? '';
      this._adapter.toggleHostAttribute(APP_BAR_CONSTANTS.attributes.THEME, !!this._theme, this._theme);
    }
  }

  public get href(): string {
    return this._href ?? '';
  }
  public set href(value: string) {
    if (this._href !== value) {
      this._href = value?.trim().length ? value.trim() : '';
      this._adapter.setHref(this._href, this._anchorClickListener);
      this._adapter.toggleHostAttribute(APP_BAR_CONSTANTS.attributes.HREF, !!this._href, this._href);
    }
  }

  public get target(): string {
    return this._target ?? '';
  }
  public set target(value: string) {
    if (this._target !== value) {
      this._target = value?.trim().length ? value.trim() : '';
      this._adapter.setTarget(this._target);
      this._adapter.toggleHostAttribute(APP_BAR_CONSTANTS.attributes.TARGET, !!this._target, this._target);
    }
  }
}
