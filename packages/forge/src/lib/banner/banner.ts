import { attachShadowTemplate, coerceBoolean, customElement, coreProperty } from '@tylertech/forge-core';
import { tylIconCancel } from '@tylertech/tyler-icons';
import { BaseComponent, IBaseComponent } from '../core/base/base-component.js';
import { IconRegistry } from '../icon/index.js';
import { IconButtonComponent } from '../icon-button/index.js';
import { TooltipComponent } from '../tooltip/index.js';
import { BannerAdapter } from './banner-adapter.js';
import { BannerTheme, BannerVariant, BANNER_CONSTANTS } from './banner-constants.js';
import { BannerCore } from './banner-core.js';

import template from './banner.html';
import styles from './banner.scss';

export interface IBannerComponent extends IBaseComponent {
  dismissed: boolean;
  persistent: boolean;
  theme: BannerTheme;
  variant: BannerVariant;
  /** @deprecated Use `persistent` instead. */
  canDismiss: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-banner': IBannerComponent;
  }

  interface HTMLElementEventMap {
    'forge-banner-before-dismiss': CustomEvent<void>;
    'forge-banner-dismissed': CustomEvent<void>;
  }
}

/**
 * @tag forge-banner
 *
 * @summary Banners are used to inform users of important information, such as errors, warnings, or success messages. Use banners for non-critical messages that require user attention but do not interrupt workflow.
 *
 * @property {boolean} [dismissed=false] - Controls the visibility of the banner.
 * @property {boolean} [persistent=false] - Controls the visibility of the built-in dismiss button.
 * @property {BannerTheme} [theme="default"] - The theme of the banner. `default` is neutral; `info`, `success`, `warning`, and `error` (or `critical`) convey meaning. `primary`, `secondary`, `tertiary`, and `info-secondary` are deprecated and render as `default`.
 *
 * @property {BannerVariant} [variant="tonal"] - The variant of the banner. `tonal` uses a tinted background; `outlined` uses a lighter background with a border.
 *
 * @attribute {boolean} [dismissed=false] - Controls the visibility of the banner.
 * @attribute {boolean} [persistent=false] - Controls the visibility of the built-in dismiss button.
 * @attribute {BannerTheme} [theme="default"] - The theme of the banner. `default` is neutral; `info`, `success`, `warning`, and `error` (or `critical`) convey meaning. `primary`, `secondary`, `tertiary`, and `info-secondary` are deprecated and render as `default`.
 *
 * @attribute {BannerVariant} [variant="tonal"] - The variant of the banner. `tonal` uses a tinted background; `outlined` uses a lighter background with a border.
 *
 * @event {CustomEvent<void>} forge-banner-before-dismiss - Dispatched before the banner is dismissed. Cancelable to prevent dismissal.
 * @event {CustomEvent<void>} forge-banner-dismissed - Dispatched when the banner is dismissed.
 *
 * @cssproperty --forge-banner-background - The background color of the banner.
 * @cssproperty --forge-banner-color - The text color of the banner.
 * @cssproperty --forge-banner-icon-color - The color of the icon.
 * @cssproperty --forge-banner-shape - The border radius. Defaults to `0`.
 * @cssproperty --forge-banner-outlined-background - The background color in the outlined variant.
 * @cssproperty --forge-banner-outlined-border-width - The width of the inset border ring in the outlined variant.
 * @cssproperty --forge-banner-outlined-border-color - The color of the inset border ring in the outlined variant.
 * @cssproperty --forge-banner-outlined-shape - The border radius in the outlined variant.
 * @cssproperty --forge-banner-gap - The gap between the contents.
 * @cssproperty --forge-banner-padding-inline - The inline padding.
 * @cssproperty --forge-banner-padding-block - The block padding.
 * @cssproperty --forge-banner-transition-duration - The transition duration.
 * @cssproperty --forge-banner-transition-easing - The transition easing function.
 *
 * @slot - The content of the banner.
 * @slot icon - The icon to display.
 * @slot button - The optional button to display.
 *
 * @cssclass forge-banner - The banner class _(required)_.
 * @cssclass forge-banner--outlined - Applies the outlined variant.
 */
@customElement({
  name: BANNER_CONSTANTS.elementName,
  dependencies: [IconButtonComponent, TooltipComponent]
})
export class BannerComponent extends BaseComponent implements IBannerComponent {
  public static get observedAttributes(): string[] {
    return Object.values(BANNER_CONSTANTS.observedAttributes);
  }

  protected _core: BannerCore;

  constructor() {
    super();
    IconRegistry.define(tylIconCancel);
    attachShadowTemplate(this, template, styles);
    this._core = new BannerCore(new BannerAdapter(this));
  }

  public connectedCallback(): void {
    this._core.initialize();
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
      case BANNER_CONSTANTS.observedAttributes.VARIANT:
        this.variant = newValue as BannerVariant;
        break;
    }
  }

  @coreProperty()
  declare public dismissed: boolean;

  @coreProperty()
  declare public persistent: boolean;

  @coreProperty()
  declare public theme: BannerTheme;

  @coreProperty()
  declare public variant: BannerVariant;

  /** @deprecated Use `persistent` instead. */
  public get canDismiss(): boolean {
    return !this.persistent;
  }
  public set canDismiss(value: boolean) {
    this.persistent = !value;
  }
}
