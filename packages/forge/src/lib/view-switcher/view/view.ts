import { customElement, attachShadowTemplate } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component.js';

import { VIEW_CONSTANTS } from './view-constants.js';

import template from './view.html';
import styles from './view.scss';

export interface IViewComponent extends IBaseComponent {}

declare global {
  interface HTMLElementTagNameMap {
    'forge-view': IViewComponent;
  }
}

/**
 * @summary Represents a single view content area within a view-switcher for organizing and displaying content sections.
 *
 * @tag forge-view
 */
@customElement({
  name: VIEW_CONSTANTS.elementName
})
export class ViewComponent extends BaseComponent implements IViewComponent {
  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
  }
}
