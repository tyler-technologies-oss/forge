import { attachShadowTemplate, coerceBoolean, customElement, getShadowElement } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/index.js';
import { FocusIndicatorComponent } from '../focus-indicator/index.js';
import { StateLayerComponent } from '../state-layer/index.js';
import { SKIP_LINK_CONSTANTS, SkipLinkTheme } from './skip-link-constants.js';

import template from './skip-link.html';
import style from './skip-link.scss';

export interface ISkipLinkComponent extends IBaseComponent {
  target: string;
  theme: SkipLinkTheme;
  muted: boolean;
  persistent: boolean;
  inline: boolean;
  skipUrlChange: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-skip-link': ISkipLinkComponent;
  }
}

/**
 * @tag forge-skip-link
 *
 * @summary The Forge Skip Link component is used to provide an accessible way for users to skip repetitive content and navigate directly to a section of the page. This is used for screen reader and keyboard users to improve the overall accessibility of web applications.
 *
 * @cssproperty --forge-skip-link-background - The background color of the skip link.
 * @cssproperty --forge-skip-link-color - The text color of the skip link.
 * @cssproperty --forge-skip-link-shape - The border radius of the skip link.
 * @cssproperty --forge-skip-link-inset - The skip link's inset from the edge of the viewport.
 * @cssproperty --forge-skip-link-z-index - The z-index of the skip link.
 * @cssproperty --forge-skip-link-elevation - The box shadow of the skip link.
 * @cssproperty --forge-skip-link-padding-block - The interior padding of the skip link along the block axis.
 * @cssproperty --forge-skip-link-padding-inline - The interior padding of the skip link along the inline axis.
 * @cssproperty --forge-skip-link-focus-indicator-color - The color of the focus indicator.
 * @cssproperty --forge-skip-link-transition-duration - The duration of the skip link's animations.
 * @cssproperty --forge-skip-link-transition-timing-function - The timing function of the skip link's animations.
 *
 * @csspart anchor - The root anchor element.
 * @csspart focus-indicator - The focus indicator element.
 * @csspart state-layer - The state layer element.
 *
 * @slot - The default/unnamed slot for link text.
 *
 * @dependency forge-focus-indicator
 * @dependency forge-state-layer
 */
@customElement({
  name: SKIP_LINK_CONSTANTS.elementName,
  dependencies: [FocusIndicatorComponent, StateLayerComponent]
})
export class SkipLinkComponent extends BaseComponent implements ISkipLinkComponent {
  public static get observedAttributes(): string[] {
    return Object.values(SKIP_LINK_CONSTANTS.observedAttributes);
  }

  private _target = '';
  private _theme: SkipLinkTheme = 'default';
  private _muted = false;
  private _persistent = false;
  private _inline = false;
  private _skipUrlChange = false;
  private _anchorElement: HTMLAnchorElement;

  private _clickListener: EventListener = (evt: Event) => this._handleClick(evt);

  constructor() {
    super();
    attachShadowTemplate(this, template, style);
    this._anchorElement = getShadowElement(this, SKIP_LINK_CONSTANTS.selectors.ANCHOR) as HTMLAnchorElement;
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case SKIP_LINK_CONSTANTS.observedAttributes.TARGET:
        this.target = newValue;
        break;
      case SKIP_LINK_CONSTANTS.observedAttributes.THEME:
        this.theme = newValue as SkipLinkTheme;
        break;
      case SKIP_LINK_CONSTANTS.observedAttributes.MUTED:
        this.muted = coerceBoolean(newValue);
        break;
      case SKIP_LINK_CONSTANTS.observedAttributes.PERSISTENT:
        this.persistent = coerceBoolean(newValue);
        break;
      case SKIP_LINK_CONSTANTS.observedAttributes.INLINE:
        this.inline = coerceBoolean(newValue);
        break;
      case SKIP_LINK_CONSTANTS.observedAttributes.SKIP_URL_CHANGE:
        this.skipUrlChange = coerceBoolean(newValue);
        break;
    }
  }

  /**
   * The IDREF of the element to which the skip link should navigate.
   * @default ''
   * @attribute
   */
  public get target(): string {
    return this._target;
  }
  public set target(value: string) {
    if (this._target !== value) {
      this._target = value;
      this.setAttribute(SKIP_LINK_CONSTANTS.attributes.TARGET, this._target);

      this._anchorElement.href = `#${this._target}`;
    }
  }

  /**
   * The theme applied to the skip link.
   * @default 'default'
   * @attribute
   */
  public get theme(): SkipLinkTheme {
    return this._theme;
  }
  public set theme(value: SkipLinkTheme) {
    if (this._theme !== value) {
      this._theme = value;
      this.setAttribute(SKIP_LINK_CONSTANTS.attributes.THEME, this._theme);
    }
  }

  /**
   * Whether or not the skip link uses a muted color scheme.
   * @default false
   * @attribute
   */
  public get muted(): boolean {
    return this._muted;
  }
  public set muted(value: boolean) {
    if (this._muted !== value) {
      this._muted = value;
      this.toggleAttribute(SKIP_LINK_CONSTANTS.attributes.MUTED, this._muted);
    }
  }

  /**
   * Whether or not the skip link should remain visible when not focused.
   * @default false
   * @attribute
   */
  public get persistent(): boolean {
    return this._persistent;
  }
  public set persistent(value: boolean) {
    if (this._persistent !== value) {
      this._persistent = value;
      this.toggleAttribute(SKIP_LINK_CONSTANTS.attributes.PERSISTENT, this._persistent);
    }
  }

  /**
   * Whether or not the skip link renders within its container.
   * @default false
   * @attribute
   */
  public get inline(): boolean {
    return this._inline;
  }
  public set inline(value: boolean) {
    if (this._inline !== value) {
      this._inline = value;
      this.toggleAttribute(SKIP_LINK_CONSTANTS.attributes.INLINE, this._inline);
    }
  }

  /**
   * Sets the skip link to skip browser navigation and scroll to the target element.
   * @default false
   * @attribute skip-url-change
   */
  public get skipUrlChange(): boolean {
    return this._skipUrlChange;
  }
  public set skipUrlChange(value: boolean) {
    if (this._skipUrlChange !== value) {
      this._skipUrlChange = value;
      this.toggleAttribute(SKIP_LINK_CONSTANTS.attributes.SKIP_URL_CHANGE, this._skipUrlChange);

      if (this._skipUrlChange) {
        this._anchorElement.addEventListener('click', this._clickListener);
        return;
      }

      this._anchorElement.removeEventListener('click', this._clickListener);
    }
  }

  private _handleClick(evt: Event): void {
    evt.preventDefault();
    const targetElement = document.getElementById(this._target);
    targetElement?.focus();
    targetElement?.scrollIntoView({ behavior: 'smooth' });
  }
}
