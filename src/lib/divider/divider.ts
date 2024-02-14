import { attachShadowTemplate, coerceBoolean, CustomElement } from '@tylertech/forge-core';
import { BaseComponent } from '../core/base/base-component';
import { DIVIDER_CONSTANTS } from './divider-constants';
import { IWithDefaultAria, WithDefaultAria } from '../core/mixins/internals/with-default-aria';
import { IWithElementInternals, WithElementInternals } from '../core/mixins/internals/with-element-internals';

import template from './divider.html';
import styles from './divider.scss';
import { setDefaultAria } from '../constants';

export interface IDividerComponent extends IWithDefaultAria, IWithElementInternals {
  vertical: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-divider': IDividerComponent;
  }
}

const BaseClass = WithDefaultAria(WithElementInternals(BaseComponent));

/**
 * @tag forge-divider
 * 
 * @summary Divider is used to seperate elements.
 * 
 * @attribute {boolean} vertical - Controls if the divider is displayed vertically or horizontally.
 * 
 * @cssproperty --forge-divider-color - The color of the divider.
 * @cssproperty --forge-divider-width - The width of the divider.
 * @cssproperty --forge-divider-border-style - The border-style (dashed, solid) of the divider.
 * @cssproperty --forge-divider-margin - The margin of divider.
 */
@CustomElement({
  name: DIVIDER_CONSTANTS.elementName
})
export class DividerComponent extends BaseClass implements IDividerComponent {
  public static get observedAttributes(): string[] {
    return [
      DIVIDER_CONSTANTS.attributes.VERTICAL
    ];
  }

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
  }

  public connectedCallback(): void {
    this[setDefaultAria]({ role: 'separator' }, { setAttribute: !this.hasAttribute('role') });
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
