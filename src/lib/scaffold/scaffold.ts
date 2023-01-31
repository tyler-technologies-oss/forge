import { CustomElement, attachShadowTemplate } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { SCAFFOLD_CONSTANTS } from './scaffold-constants';

import template from './scaffold.html';
import styles from './scaffold.scss';

export interface IScaffoldComponent extends IBaseComponent {}

declare global {
  interface HTMLElementTagNameMap {
    'forge-scaffold': IScaffoldComponent;
  }
}

/**
 * The custom element class behind the `<forge-scaffold>` element.
 * 
 * @tag forge-scaffold
 */
@CustomElement({
  name: SCAFFOLD_CONSTANTS.elementName
})
export class ScaffoldComponent extends BaseComponent implements IScaffoldComponent {
  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
  }
}
