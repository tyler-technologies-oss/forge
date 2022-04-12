import { attachShadowTemplate, CustomElement } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { DIVIDER_CONSTANTS } from './divider-constants';

import template from './divider.html';
import styles from './divider.scss';

export interface IDividerComponent extends IBaseComponent {}

declare global {
  interface HTMLElementTagNameMap {
    'forge-divider': IDividerComponent;
  }
}

/**
 * The custom element class behind the `<forge-divider>` element.
 */
@CustomElement({
  name: DIVIDER_CONSTANTS.elementName
})
export class DividerComponent extends BaseComponent implements IDividerComponent {
  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
  }
}
