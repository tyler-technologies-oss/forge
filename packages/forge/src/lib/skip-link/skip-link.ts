import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { html, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { classMap } from 'lit-html/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { FocusIndicatorComponent } from '../focus-indicator/index.js';
import { StateLayerComponent } from '../state-layer/index.js';
import { SKIP_LINK_CONSTANTS, SkipLinkTheme } from './skip-link-constants.js';
import { toggleState } from '../core/utils/utils.js';

import styles from './skip-link.scss';

/** @deprecated - This will be removed in the future. Please switch to using SkipLinkComponent. */
export interface ISkipLinkComponent extends BaseLitElement {
  target: string;
  theme: SkipLinkTheme;
  muted: boolean;
  persistent: boolean;
  inline: boolean;
  skipUrlChange: boolean;
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
 * @state inline - Applied when the skip link is set to render within its container.
 * @state persistent - Applied when the skip link will remain visible when not focused.
 *
 * @slot - The default/unnamed slot for link text.
 *
 * @dependency forge-focus-indicator
 * @dependency forge-state-layer
 */
@customElement(SKIP_LINK_CONSTANTS.elementName)
export class SkipLinkComponent extends BaseLitElement {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = SKIP_LINK_CONSTANTS.elementName;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [FocusIndicatorComponent, StateLayerComponent];

  #internals: ElementInternals;

  /**
   * The IDREF of the element to which the skip link should navigate.
   * @default ''
   * @attribute
   */
  @property({ reflect: true })
  public target = '';

  /**
   * The theme applied to the skip link.
   * @default 'default'
   * @attribute
   */
  @property({ reflect: true })
  public theme: SkipLinkTheme = 'default';

  /**
   * Whether or not the skip link uses a muted color scheme.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public muted = false;

  /**
   * Whether or not the skip link should remain visible when not focused.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public persistent = false;

  /**
   * Whether or not the skip link is positioned within its container.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public inline = false;

  /**
   * Sets the skip link to skip browser navigation and scroll to the target element.
   * @default false
   * @attribute skip-url-change
   */
  @property({ type: Boolean, reflect: true, attribute: 'skip-url-change' })
  public skipUrlChange = false;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public override updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);
    if (changedProperties.has('inline')) {
      toggleState(this.#internals, 'inline', this.inline);
    }
    if (changedProperties.has('persistent')) {
      toggleState(this.#internals, 'persistent', this.persistent);
    }
  }

  public render(): TemplateResult {
    const classes = {
      'forge-skip-link': true,
      [this.theme]: true,
      muted: this.muted
    };
    return html`
      <a class=${classMap(classes)} part="anchor" href=${`#${this.target}`} @click=${this.#handleClick}>
        <slot>Skip to main content</slot>
        <forge-focus-indicator part="focus-indicator"></forge-focus-indicator>
        <forge-state-layer exportparts="surface:state-layer"></forge-state-layer>
      </a>
    `;
  }

  #handleClick(evt: Event): void {
    if (!this.skipUrlChange) {
      return;
    }

    evt.preventDefault();
    const targetElement = document.getElementById(this.target);
    targetElement?.focus();
    targetElement?.scrollIntoView({ behavior: 'smooth' });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-skip-link': SkipLinkComponent;
  }
}
