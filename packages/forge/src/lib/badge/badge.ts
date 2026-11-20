import { html, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { BadgeColor, BadgeTheme, BadgeVariant } from './badge-constants.js';
import { toggleState } from '../core/utils/utils.js';
import { CUSTOM_ELEMENT_NAME_PROPERTY, tryDefine } from '@tylertech/forge-core';
import { BaseLitElement } from '../core/base/base-lit-element.js';

import styles from './badge.scss';

export interface IBadgeComponent extends BaseLitElement {
  dot: boolean;
  theme: BadgeTheme;
  strong: boolean;
  variant: BadgeVariant;
  color: BadgeColor | undefined;
  hide: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-badge': IBadgeComponent;
  }
}

export const BADGE_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-badge';

/**
 * @tag forge-badge
 *
 * @summary Badges display small amounts of non-interactive information like counts, status indicators, or notifications.
 *
 * @cssproperty --forge-badge-background - The background color.
 * @cssproperty --forge-badge-color - The text color.
 * @cssproperty --forge-badge-shape - The shape radius.
 * @cssproperty --forge-badge-padding-inline - The inline padding.
 * @cssproperty --forge-badge-padding-block - The block padding.
 * @cssproperty --forge-badge-border-width - The border width.
 * @cssproperty --forge-badge-border-color - The border color.
 * @cssproperty --forge-badge-border-style - The border style.
 * @cssproperty --forge-badge-gap - The spacing between the content within the badge.
 * @cssproperty --forge-badge-outlined-background - The background color in the outlined variant.
 * @cssproperty --forge-badge-outlined-color - The text color in the outlined variant.
 * @cssproperty --forge-badge-outlined-border-width - The width of the inset border ring in the outlined variant.
 * @cssproperty --forge-badge-outlined-border-color - The color of the inset border ring in the outlined variant.
 * @cssproperty --forge-badge-strong-background - The background color when strong.
 * @cssproperty --forge-badge-strong-color - The text color when strong.
 *
 * @slot - Default content placed inside the badge.
 * @slot start - Content placed before the default content.
 * @slot end - Content placed after the default content.
 *
 * @state dot - The badge is rendered as a dot.
 * @state strong - The badge has a stronger visual appearance.
 * @state hide - The badge is hidden.
 *
 * @cssclass forge-badge - The badge class _(required)_.
 * @cssclass forge-badge--dot - Renders the badge as a dot.
 * @cssclass forge-badge--outlined - Applies the outlined variant.
 * @cssclass forge-badge--strong - Applies the strong appearance.
 * @cssclass forge-badge__icon - Styles a child element as an icon.
 */
export class BadgeComponent extends BaseLitElement implements IBadgeComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = BADGE_TAG_NAME;

  #internals: ElementInternals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  /** Controls whether the badge will be a small dot without any content visible. */
  @property({ type: Boolean, reflect: true })
  public dot = false;

  /**
   * The theme of the badge. `critical` is the same as `error`.
   * `primary`, `secondary`, `tertiary`, `info-primary`, `info-secondary`, and `danger` are deprecated.
   */
  @property({ type: String, reflect: true })
  public theme: BadgeTheme = 'default';

  /** The variant of the badge. `tonal` is the standard appearance and `outlined` draws a border ring over a lighter background. Setting `outlined` turns off `strong`. */
  @property({ type: String, reflect: true })
  public variant: BadgeVariant = 'tonal';

  /** An accent hue, such as `plum`, for badges that label a category rather than a status. Takes precedence over `theme` for appearance. */
  @property({ type: String, reflect: true })
  public color: BadgeColor | undefined;

  /** Controls whether the badge will have a stronger visual appearance. Setting `strong` resets `variant` to `tonal`. */
  @property({ type: Boolean, reflect: true })
  public strong = false;

  /** Controls whether the badge is visible. */
  @property({ type: Boolean, reflect: true })
  public hide = false;

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    // Strong and outlined are mutually exclusive, so the most recent one wins
    if (changedProperties.has('strong') && this.strong && this.variant === 'outlined') {
      this.variant = 'tonal';
    } else if (changedProperties.has('variant') && this.variant === 'outlined' && this.strong) {
      this.strong = false;
    }
    if (changedProperties.has('dot')) {
      toggleState(this.#internals, 'dot', this.dot);
    }
    if (changedProperties.has('strong')) {
      toggleState(this.#internals, 'strong', this.strong);
    }
    if (changedProperties.has('hide')) {
      toggleState(this.#internals, 'hide', this.hide);
    }
  }

  public render(): TemplateResult {
    return html`
      <div class="forge-badge" part="root">
        <slot name="start"></slot>
        <div class="content" part="content">
          <slot></slot>
        </div>
        <slot name="end"></slot>
      </div>
    `;
  }
}

tryDefine(BADGE_TAG_NAME, BadgeComponent);
