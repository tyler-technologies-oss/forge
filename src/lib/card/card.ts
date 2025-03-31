import { html, LitElement, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { toggleState } from '../core/utils/utils';
import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';

import styles from './card.scss';

export interface ICardComponent extends LitElement {
  raised: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-card': ICardComponent;
  }
}

export const CARD_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-card';

/**
 * @tag forge-card
 *
 * @attribute {boolean} [no-padding=false] - Removes the default padding from the card.
 *
 * @cssproperty --forge-card-background - The background color of the card.
 * @cssproperty --forge-card-height - The height of the card.
 * @cssproperty --forge-card-width - The width of the card.
 * @cssproperty --forge-card-outline-color - The outline color of the card.
 * @cssproperty --forge-card-outline-width - The outline width of the card.
 * @cssproperty --forge-card-outline-style - The outline style of the card.
 * @cssproperty --forge-card-elevation - The elevation/shadow of the card.
 * @cssproperty --forge-card-padding - The padding of the card.
 * @cssproperty --forge-card-shape - The shape (border-radius) of the card.
 * @cssproperty --forge-card-overflow - The overflow of the card.
 * @cssproperty --forge-card-raised-elevation - The elevation/shadow of the card when raised.
 * @cssproperty --forge-card-raised-outline-width - The outline width of the card when raised.
 *
 * @csspart root - The root container element.
 *
 * @state raised - The state of the card when raised.
 *
 * @cssclass forge-card - The card container element _(required)_.
 * @cssclass forge-card--raised - The card container element when raised _(required)_.
 */
@customElement(CARD_TAG_NAME)
export class CardComponent extends LitElement implements ICardComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = CARD_TAG_NAME;

  #internals: ElementInternals;

  /** Whether the card has elevation or not. */
  @property({ type: Boolean, reflect: true }) public raised = false; // TODO: remove reflect in v4 in favor of :state

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('raised')) {
      toggleState(this.#internals, 'raised', this.raised);
    }
  }

  public render(): TemplateResult {
    return html`<div class="forge-card" part="root"><slot></slot></div>`;
  }
}
