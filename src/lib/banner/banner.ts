import { attachShadowTemplate, coerceBoolean, CustomElement, FoundationProperty } from '@tylertech/forge-core';
import { tylIconCancel } from '@tylertech/tyler-icons/standard';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { IconRegistry } from '../icon';
import { IconButtonComponent } from '../icon-button';
import { TooltipComponent } from '../tooltip';
import { BannerAdapter } from './banner-adapter';
import { BannerTheme, BANNER_CONSTANTS } from './banner-constants';
import { BannerFoundation } from './banner-foundation';

import template from './banner.html';
import styles from './banner.scss';

export interface IBannerComponent extends IBaseComponent {
  dismissed: boolean;
  persistent: boolean;
  theme: BannerTheme;
  /** @deprecated Use `persistent` instead. */
  canDismiss: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-banner': IBannerComponent;
  }

  interface HTMLElementEventMap {
    'forge-banner-dismissed': CustomEvent<void>;
  }
}

/**
 * @tag forge-banner
 * 
 * @summary Banners are used to inform users of important information, such as errors, warnings, or success messages.
 * 
 * @property {boolean} dismissed - Controls the visibility of the banner.
 * @property {boolean} persistent - Controls the visibility of the built-in dismiss button.
 * @property {BannerTheme} theme - The theme of the banner.
 * 
 * @attribute {boolean} dismissed - Controls the visibility of the banner.
 * @attribute {boolean} persistent - Controls the visibility of the built-in dismiss button.
 * @attribute {BannerTheme} theme - The theme of the banner.
 * 
 * @event {CustomEvent} forge-banner-dismissed - Dispatched when the banner is dismissed.
 * 
 * @cssproperty --forge-banner-background - The background color of the banner.
 * @cssproperty --forge-banner-color - The text color of the banner.
 * @cssproperty --forge-banner-gap - The gap between the contents.
 * @cssproperty --forge-banner-padding-inline - The inline padding.
 * @cssproperty --forge-banner-padding-block - The block padding.
 * @cssproperty --forge-banner-transition-duration - The transition duration.
 * @cssproperty --forge-banner-transition-easing - The transition easing function.
 * 
 * @slot - The content of the banner.
 * @slot icon - The icon to display.
 * @slot button - The optional button to display.
 */
@CustomElement({
  name: BANNER_CONSTANTS.elementName,
  dependencies: [
    IconButtonComponent,
    TooltipComponent
  ]
})
export class BannerComponent extends BaseComponent implements IBannerComponent {
  public static get observedAttributes(): string[] {
    return Object.values(BANNER_CONSTANTS.observedAttributes);
  }

  protected _foundation: BannerFoundation;

  constructor() {
    super();
    IconRegistry.define(tylIconCancel);
    attachShadowTemplate(this, template, styles);
    this._foundation = new BannerFoundation(new BannerAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case BANNER_CONSTANTS.observedAttributes.DISMISSED:
        this.dismissed = coerceBoolean(newValue);
        break;
      case BANNER_CONSTANTS.observedAttributes.PERSISTENT:
        this.persistent = coerceBoolean(newValue);
        break;
      case BANNER_CONSTANTS.observedAttributes.CAN_DISMISS:
        this.persistent = coerceBoolean(newValue) === false;
        break;
      case BANNER_CONSTANTS.observedAttributes.THEME:
        this.theme = newValue as BannerTheme;
        break;
    }
  }

  @FoundationProperty()
  public declare dismissed: boolean;

  @FoundationProperty()
  public declare persistent: boolean;

  @FoundationProperty()
  public declare theme: BannerTheme;

  /** @deprecated Use `persistent` instead. */
  public get canDismiss(): boolean {
    return this.persistent;
  }
  public set canDismiss(value: boolean) {
    this.persistent = !value;
  }
}
