import { attachShadowTemplate, coerceBoolean, customElement } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { DIVIDER_CONSTANTS } from './divider-constants';

import template from './divider.html';
import styles from './divider.scss';

export interface IDividerComponent extends IBaseComponent {
  vertical: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-divider': IDividerComponent;
  }
}

/**
 * @tag forge-divider
 *
 * @summary Divider is used to separate elements.
 *
 * @property {boolean} [vertical=false] - Controls if the divider is displayed vertically or horizontally.
 *
 * @attribute {boolean} [vertical=false] - Controls if the divider is displayed vertically or horizontally.
 *
 * @cssproperty --forge-divider-color - The color of the divider.
 * @cssproperty --forge-divider-width - The width of the divider.
 * @cssproperty --forge-divider-border-style - The border-style (dashed, solid) of the divider.
 * @cssproperty --forge-divider-margin - The margin of divider.
 *
 * @csspart root - The root container element.
 */
@customElement({
  name: DIVIDER_CONSTANTS.elementName
})
export class DividerComponent extends BaseComponent implements IDividerComponent {
  public static get observedAttributes(): string[] {
    return [DIVIDER_CONSTANTS.attributes.VERTICAL];
  }

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case DIVIDER_CONSTANTS.attributes.VERTICAL:
        this.vertical = coerceBoolean(newValue);
        break;
    }
  }

  public get vertical(): boolean {
    return this.hasAttribute(DIVIDER_CONSTANTS.attributes.VERTICAL);
  }

  public set vertical(value: boolean) {
    this.toggleAttribute(DIVIDER_CONSTANTS.attributes.VERTICAL, value);
  }
}
