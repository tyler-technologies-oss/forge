import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY, coerceBoolean, tryDefine } from '@tylertech/forge-core';
import { tylIconCancel } from '@tylertech/tyler-icons';
import { html, TemplateResult, unsafeCSS } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { removeDefaultAttribute } from '../core/utils/lit-utils.js';
import { IconRegistry } from '../icon/index.js';
import { IconButtonComponent } from '../icon-button/index.js';
import { TooltipComponent } from '../tooltip/index.js';
import { BANNER_CONSTANTS, BannerTheme } from './banner-constants.js';

import styles from './banner.scss';

/** @deprecated - This will be removed in the future. Please switch to using BannerComponent. */
export interface IBannerComponent extends BaseLitElement {
  dismissed: boolean;
  persistent: boolean;
  theme: BannerTheme;
  /** @deprecated Use `persistent` instead. */
  canDismiss: boolean;
}

/**
 * @tag forge-banner
 *
 * @summary Banners are used to inform users of important information, such as errors, warnings, or success messages. Use banners for non-critical messages that require user attention but do not interrupt workflow.
 *
 * @dependency forge-icon-button
 * @dependency forge-tooltip
 *
 * @event {CustomEvent<void>} forge-banner-before-dismiss - Dispatched before the banner is dismissed. Cancelable to prevent dismissal.
 * @event {CustomEvent<void>} forge-banner-dismissed - Dispatched when the banner is dismissed.
 *
 * @cssproperty --forge-banner-background - The background color of the banner.
 * @cssproperty --forge-banner-color - The text color of the banner.
 * @cssproperty --forge-banner-icon-color - The color of the icon.
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
 */
export class BannerComponent extends BaseLitElement implements IBannerComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = BANNER_CONSTANTS.elementName;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [IconButtonComponent, TooltipComponent];

  #dismissed = false;
  #theme: BannerTheme = BANNER_CONSTANTS.defaults.THEME;

  /**
   * Controls the visibility of the banner.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public set dismissed(value: boolean) {
    this.#dismissed = Boolean(value);
  }
  public get dismissed(): boolean {
    return this.#dismissed;
  }

  /**
   * Controls the visibility of the built-in dismiss button.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public persistent = false;

  /**
   * The theme of the banner.
   * @default 'info'
   * @attribute
   */
  @property({
    reflect: true,
    converter: { toAttribute: (value: BannerTheme) => removeDefaultAttribute(value, BANNER_CONSTANTS.defaults.THEME) }
  })
  public set theme(value: BannerTheme) {
    this.#theme = value ?? BANNER_CONSTANTS.defaults.THEME;
  }
  public get theme(): BannerTheme {
    return this.#theme;
  }

  /**
   * Controls whether the banner can be dismissed.
   * @deprecated Use `persistent` instead.
   * @attribute can-dismiss
   */
  @property({ attribute: BANNER_CONSTANTS.attributes.CAN_DISMISS, converter: { fromAttribute: (value: string | null) => coerceBoolean(value as string) } })
  public set canDismiss(value: boolean) {
    this.persistent = !value;
  }
  public get canDismiss(): boolean {
    return !this.persistent;
  }

  @state() private _hasIcon = false;
  @state() private _hasButton = false;

  @query('.forge-banner', true) private _root?: HTMLElement;

  constructor() {
    super();
    IconRegistry.define(tylIconCancel);
  }

  public override willUpdate(): void {
    if (!this.hasUpdated) {
      // Slotted content is detected up front so the first render is correct, and slotchange handles any later changes
      this._hasIcon = !!this.querySelector(':scope > [slot="icon"]');
      this._hasButton = !!this.querySelector(':scope > [slot="button"]');
    }
  }

  public render(): TemplateResult {
    const classes = {
      'forge-banner': true,
      [BANNER_CONSTANTS.classes.HAS_ICON]: this._hasIcon,
      [BANNER_CONSTANTS.classes.HAS_BUTTON]: this._hasButton
    };
    return html`
      <div class=${classMap(classes)} part="root" ?inert=${this.dismissed}>
        <div class="inner">
          <div class="container">
            <slot name="icon" @slotchange=${this.#handleIconSlotChange}></slot>
            <slot></slot>
            <div class="button-container">
              <slot name="button" @slotchange=${this.#handleButtonSlotChange}></slot>
            </div>
          </div>
          <div class="dismiss-button-container">
            <slot name="dismiss-button">
              <forge-icon-button part="dismiss-button" ?hidden=${this.persistent} @click=${this.#handleDismissClick}>
                <forge-icon name="cancel"></forge-icon>
              </forge-icon-button>
              <forge-tooltip type="label" placement="bottom">
                <slot name="dismiss-tooltip">Dismiss</slot>
              </forge-tooltip>
            </slot>
          </div>
        </div>
      </div>
    `;
  }

  #handleIconSlotChange(evt: Event): void {
    this._hasIcon = (evt.target as HTMLSlotElement).assignedNodes().length > 0;
  }

  #handleButtonSlotChange(evt: Event): void {
    this._hasButton = (evt.target as HTMLSlotElement).assignedNodes().length > 0;
  }

  async #handleDismissClick(): Promise<void> {
    if (this.dismissed || this.persistent) {
      return;
    }

    // The dismissed state is applied directly to the backing field while the event is dispatched so that listeners observe
    // the pending state without the attribute being updated until the event is resolved.
    this.#dismissed = true;
    const evt = new CustomEvent(BANNER_CONSTANTS.events.BEFORE_DISMISS, {
      bubbles: true,
      composed: true,
      cancelable: true
    });
    this.dispatchEvent(evt);
    this.#dismissed = false;

    if (evt.defaultPrevented) {
      return;
    }

    const dismissComplete = this.#startDismissCompleteListener();
    this.dismissed = true;
    await dismissComplete;
    this.dispatchEvent(new CustomEvent(BANNER_CONSTANTS.events.DISMISSED, { bubbles: true, composed: true }));
  }

  #startDismissCompleteListener(): Promise<void> {
    return new Promise<void>(resolve => {
      this._root?.addEventListener('transitionend', () => resolve(), { once: true });
    });
  }
}

tryDefine(BANNER_CONSTANTS.elementName, BannerComponent);

declare global {
  interface HTMLElementTagNameMap {
    'forge-banner': IBannerComponent;
  }

  interface HTMLElementEventMap {
    'forge-banner-before-dismiss': CustomEvent<void>;
    'forge-banner-dismissed': CustomEvent<void>;
  }
}
