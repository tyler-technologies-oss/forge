import { CustomElement, attachShadowTemplate, FoundationProperty } from '@tylertech/forge-core';
import { AppBarAdapter } from './app-bar-adapter';
import { AppBarFoundation } from './app-bar-foundation';
import { AppBarElevation, AppBarTheme, APP_BAR_CONSTANTS } from './app-bar-constants';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';

import template from './app-bar.html';
import styles from './app-bar.scss';

export interface IAppBarComponent extends IBaseComponent {
  titleText: string;
  elevation: AppBarElevation;
  theme: AppBarTheme;
  href: string;
  target: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-app-bar': IAppBarComponent;
  }
}

/**
 * @tag forge-app-bar
 * 
 * @description App bars are a collection of components placed as a horizontal bar at the top of the screen. They typically contain a logo, title, and optional application-wide actions.
 * 
 * @property {string} titleText - The text to display in the title.
 * @property {AppBarElevation} elevation - The elevation of the app bar.
 * @property {AppBarTheme} theme - The theme of the app bar.
 * @property {string} href - The href that will be used to make the logo and title area a clickable link.
 * 
 * @attribute {string} title-text - The text to display in the title.
 * @attribute {string} elevation - The elevation of the app bar.
 * @attribute {string} theme - The theme of the app bar.
 * @attribute {string} href - The href that will be used to make the logo and title area a clickable link
 * 
 * @cssproperty --forge-app-bar-background - The background color of the app bar.
 * @cssproperty --forge-app-bar-foreground - The text color of the app bar.
 * @cssproperty --forge-app-bar-z-index - The `z-index` of the app bar.
 * @cssproperty --forge-app-bar-elevation - The elevation of the app bar.
 * @cssproperty --forge-app-bar-height - The height of the app bar.
 * @cssproperty --forge-app-bar-row-padding - The inline padding of the app bar.
 * @cssproperty --forge-app-bar-logo-gap - The space between the logo and title.
 * @cssproperty --forge-app-bar-title-padding - The padding around the title element.
 * @cssproperty --forge-app-bar-transition-duration - The transition duration for animations.
 * @cssproperty --forge-app-bar-transition-timing - The transition timing function for animations.
 * 
 * @csspart root - The root container element.
 * @csspart title - The title element.
 * 
 * @slot logo - Reserved for the brand logo.
 * @slot title - Reserved for the application title. This will overwrite the `titleText` property/attribute.
 * @slot start - Places content at the beginning of the app bar.
 * @slot center - Places content in the center of the app bar.
 * @slot end - Places content at the end of the app bar.
 */
@CustomElement({
  name: APP_BAR_CONSTANTS.elementName
})
export class AppBarComponent extends BaseComponent implements IAppBarComponent {
  public static get observedAttributes(): string[] {
    return [
      APP_BAR_CONSTANTS.attributes.TITLE_TEXT,
      APP_BAR_CONSTANTS.attributes.ELEVATION,
      APP_BAR_CONSTANTS.attributes.THEME,
      APP_BAR_CONSTANTS.attributes.HREF,
      APP_BAR_CONSTANTS.attributes.TARGET
    ];
  }

  private _foundation: AppBarFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new AppBarFoundation(new AppBarAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case APP_BAR_CONSTANTS.attributes.TITLE_TEXT:
        this.titleText = newValue;
        break;
      case APP_BAR_CONSTANTS.attributes.ELEVATION:
        this.elevation = newValue as AppBarElevation;
        break;
      case APP_BAR_CONSTANTS.attributes.THEME:
        this.theme = newValue as AppBarTheme;
        break;
      case APP_BAR_CONSTANTS.attributes.HREF:
        this.href = newValue;
        break;
      case APP_BAR_CONSTANTS.attributes.TARGET:
        this.target = newValue;
        break;
    }
  }

  @FoundationProperty()
  public declare titleText: string;

  @FoundationProperty()
  public declare elevation: AppBarElevation;

  @FoundationProperty()
  public declare theme: AppBarTheme;

  @FoundationProperty()
  public declare href: string;

  @FoundationProperty()
  public declare target: string;
}
