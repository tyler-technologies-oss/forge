import { CustomElement, attachShadowTemplate } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';

import { VIEW_CONSTANTS } from './view-constants';

import template from './view.html';
import styles from './view.scss';

export interface IViewComponent extends IBaseComponent {}

declare global {
  interface HTMLElementTagNameMap {
    'forge-view': IViewComponent;
  }
}

@CustomElement({
  name: VIEW_CONSTANTS.elementName
})
export class ViewComponent extends BaseComponent implements IViewComponent {
  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
  }
}
