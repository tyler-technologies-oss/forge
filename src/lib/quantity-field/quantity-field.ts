import { CustomElement, attachShadowTemplate, coerceBoolean, FoundationProperty } from '@tylertech/forge-core';
import { QuantityFieldAdapter } from './quantity-field-adapter';
import { QuantityFieldFoundation } from './quantity-field-foundation';
import { QUANTITY_FIELD_CONSTANTS } from './quantity-field-constants';
import { IconButtonComponent } from '../icon-button';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';

import template from './quantity-field.html';
import styles from './quantity-field.scss';

export interface IQuantityFieldComponent extends IBaseComponent {
  invalid: boolean;
  required: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-quantity-field': IQuantityFieldComponent;
  }
}

/**
 * The web component class behind the `<forge-quantity-field>` custom element.
 * 
 * @tag forge-quantity-field
 */
@CustomElement({
  name: QUANTITY_FIELD_CONSTANTS.elementName,
  dependencies: [
    IconButtonComponent
  ]
})
export class QuantityFieldComponent extends BaseComponent implements IQuantityFieldComponent {
  public static get observedAttributes(): string[] {
    return [
      QUANTITY_FIELD_CONSTANTS.attributes.INVALID,
      QUANTITY_FIELD_CONSTANTS.attributes.REQUIRED
    ];
  }

  private _foundation: QuantityFieldFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new QuantityFieldFoundation(new QuantityFieldAdapter(this));
  }

  public connectedCallback(): void {
    if (this._requiredElementsPresent()) {
      this._foundation.connect();
    } else {
      this._ensureElementsPresent().then(() => {
        this._foundation.connect();
      });
    }
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case QUANTITY_FIELD_CONSTANTS.attributes.INVALID:
        this.invalid = coerceBoolean(newValue);
        break;
      case QUANTITY_FIELD_CONSTANTS.attributes.REQUIRED:
        this.required = coerceBoolean(newValue);
        break;
    }
  }

  private _ensureElementsPresent(): Promise<void> {
    return new Promise<void>(resolve => {
      if (this._requiredElementsPresent()) {
        resolve();
        return;
      }

      const observer = new MutationObserver(changes => {
        const hasAddedNodes = changes.reduce((prev, curr) => prev + curr.addedNodes.length, 0) > 0;
        if (hasAddedNodes) {
          if (this._requiredElementsPresent()) {
            observer.disconnect();
            resolve();
          }
        }
      });
      observer.observe(this, { childList: true, subtree: true });
    });
  }

  private _requiredElementsPresent(): boolean {
    const inputElement = this.querySelector(QUANTITY_FIELD_CONSTANTS.selectors.INPUT);
    const decrementElement = this.querySelector(QUANTITY_FIELD_CONSTANTS.selectors.DECREMENT_BUTTON);
    const incrementElement = this.querySelector(QUANTITY_FIELD_CONSTANTS.selectors.INCREMENT_BUTTON);
    return !!inputElement && !!decrementElement && !!incrementElement;
  }

  /** Gets/sets the invalid state. */
  @FoundationProperty()
  public declare invalid: boolean;

  /** Gets/sets the required state which controls the visibility of the asterisk in the label. */
  @FoundationProperty()
  public declare required: boolean;
}
