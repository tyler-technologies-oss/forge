import { CustomElement, attachShadowTemplate, coerceBoolean, getShadowElement, toggleAttribute, toggleClass } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';

import { CARD_CONSTANTS } from './card-constants';

import template from './card.html';
import styles from './card.scss';

export interface ICardComponent extends IBaseComponent {
  outlined: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-card': ICardComponent;
  }
}

/** The custom element class behind the `forge-card` component. */
@CustomElement({
  name: CARD_CONSTANTS.elementName
})
export class CardComponent extends BaseComponent implements ICardComponent {
  public static get observedAttributes(): string[] {
    return [
      CARD_CONSTANTS.attributes.OUTLINED
    ];
  }

  private _rootElement: HTMLElement;
  private _outlined = false;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._rootElement = getShadowElement(this, CARD_CONSTANTS.selectors.ROOT);
  }

  public connectedCallback(): void {
    this._applyOutlined();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (oldValue === newValue) {
      return;
    }
    switch (name) {
      case CARD_CONSTANTS.attributes.OUTLINED:
        this.outlined = coerceBoolean(newValue);
        break;
    }
  }

  private _applyOutlined(): void {
    toggleClass(this._rootElement, this._outlined, CARD_CONSTANTS.classes.OUTLINED);
  }

  /** Gets/sets whether the card is using the outlined style or not. */
  public get outlined(): boolean {
    return this._outlined;
  }
  public set outlined(value: boolean) {
    if (this._outlined !== value) {
      this._outlined = !!value;
      toggleAttribute(this, this._outlined, CARD_CONSTANTS.attributes.OUTLINED, String(!!this._outlined));
      this._applyOutlined();
    }
  }
}
