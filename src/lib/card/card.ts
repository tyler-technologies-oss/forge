import { CustomElement, attachShadowTemplate, coerceBoolean } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';

import { CARD_CONSTANTS } from './card-constants';

import template from './card.html';
import styles from './card.scss';

export interface ICardComponent extends IBaseComponent {
  raised: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-card': ICardComponent;
  }
}

/**
 * @tag forge-card
 * 
 * @summary Cards are used to group related information and actions about a single subject.
 * 
 * @property {boolean} raised - Whether the card has elevation or not.
 * 
 * @attribute {boolean} raised - Whether the card has an raised or not.
 * @attribute {boolean} no-padding - Removes the default padding from the card.
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
 * @cssproperty --forge-card-raised-outline-width
 * 
 * @csspart root - The root container element.
 */
@CustomElement({
  name: CARD_CONSTANTS.elementName
})
export class CardComponent extends BaseComponent implements ICardComponent {
  public static get observedAttributes(): string[] {
    return Object.values(CARD_CONSTANTS.observedAttributes);
  }

  private _raised = false;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case CARD_CONSTANTS.attributes.RAISED:
        this.raised = coerceBoolean(newValue);
        break;
    }
  }

  public get raised(): boolean {
    return this._raised;
  }
  public set raised(value: boolean) {
    value = Boolean(value);
    if (this._raised !== value) {
      this._raised = value;
      this.toggleAttribute(CARD_CONSTANTS.attributes.RAISED, this._raised);
    }
  }
}
