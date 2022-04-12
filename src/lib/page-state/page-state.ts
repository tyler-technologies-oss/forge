import { CustomElement, attachShadowTemplate } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';

import { PAGE_STATE_CONSTANTS } from './page-state-constants';

import template from './page-state.html';
import styles from './page-state.scss';

export interface IPageStateComponent extends IBaseComponent {}

declare global {
  interface HTMLElementTagNameMap {
    'forge-page-state': IPageStateComponent;
  }
}

@CustomElement({
  name: PAGE_STATE_CONSTANTS.elementName
})
export class PageStateComponent extends BaseComponent implements IPageStateComponent {
  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
  }
}
