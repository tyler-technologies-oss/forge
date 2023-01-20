import { CustomElement, attachShadowTemplate, coerceNumber, coerceBoolean, FoundationProperty } from '@tylertech/forge-core';
import { ProductIconAdapter } from './product-icon-adapter';
import { ProductIconFoundation } from './product-icon-foundation';
import { PRODUCT_ICON_CONSTANTS } from './product-icon-constants';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';

import template from './product-icon.html';
import styles from './product-icon.scss?inline';

export interface IProductIconComponent extends IBaseComponent {
  color: string;
  size: number;
  shadow: boolean;
  iterations: number;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-product-icon': IProductIconComponent;
  }
}

/**
 * The web component class behind the `<forge-product-icon>` custom element.
 * 
 * @tag forge-product-icon
 */
@CustomElement({
  name: PRODUCT_ICON_CONSTANTS.elementName
})
export class ProductIconComponent extends BaseComponent implements IProductIconComponent {
  public static get observedAttributes(): string[] {
    return [
      PRODUCT_ICON_CONSTANTS.attributes.COLOR,
      PRODUCT_ICON_CONSTANTS.attributes.SIZE,
      PRODUCT_ICON_CONSTANTS.attributes.SHADOW,
      PRODUCT_ICON_CONSTANTS.attributes.ITERATIONS
    ];
  }

  private _foundation: ProductIconFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new ProductIconFoundation(new ProductIconAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case PRODUCT_ICON_CONSTANTS.attributes.COLOR:
        this.color = newValue;
        break;
      case PRODUCT_ICON_CONSTANTS.attributes.SIZE:
        this.size = coerceNumber(newValue);
        break;
      case PRODUCT_ICON_CONSTANTS.attributes.SHADOW:
        this.shadow = coerceBoolean(newValue);
        break;
      case PRODUCT_ICON_CONSTANTS.attributes.ITERATIONS:
        this.iterations = coerceNumber(newValue);
        break;
    }
  }

  /** The color of the container element from the material color palette. */
  @FoundationProperty()
  public declare color: string;

  /** Controls the height and width of the container element. */
  @FoundationProperty()
  public declare size: number;

  /** Controls the visibility of the text shadow. */
  @FoundationProperty()
  public declare shadow: boolean;

  /** The number of iterations to apply the text shadow. */
  @FoundationProperty()
  public declare iterations: number;
}
