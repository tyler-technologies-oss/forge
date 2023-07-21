import { CustomElement, attachShadowTemplate, coerceBoolean, getShadowElement, toggleAttribute, toggleClass } from '@tylertech/forge-core';
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
 * 
 * @cssproperty --forge-card-height - The height of the card.
 * @cssproperty --forge-card-width - The width of the card.
 * @cssproperty --forge-card-padding - The padding of the card.
 * @cssproperty --forge-card-overflow - The overflow of the card.
 * 
 * @csspart root - The components' internal root container element.
 */
@CustomElement({
  name: CARD_CONSTANTS.elementName
})
export class CardComponent extends BaseComponent implements ICardComponent {
  public static get observedAttributes(): string[] {
    return [
      CARD_CONSTANTS.attributes.RAISED
    ];
  }

  private _rootElement: HTMLElement;
  private _raised = false;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._rootElement = getShadowElement(this, CARD_CONSTANTS.selectors.ROOT);
  }

  public connectedCallback(): void {
    this._applyRaised();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case CARD_CONSTANTS.attributes.RAISED:
        this.raised = coerceBoolean(newValue);
        break;
    }
  }

  private _applyRaised(): void {
    toggleClass(this._rootElement, this._raised, CARD_CONSTANTS.classes.RAISED);
  }

  /** Gets/sets whether the card is elevated or not. */
  public get raised(): boolean {
    return this._raised;
  }
  public set raised(value: boolean) {
    value = Boolean(value);
    if (this._raised !== value) {
      this._raised = value;
      this._applyRaised();
      toggleAttribute(this, this._raised, CARD_CONSTANTS.attributes.RAISED, String(!!this._raised));
    }
  }
}
