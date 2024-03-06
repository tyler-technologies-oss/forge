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

/**
 * 
 * @tag forge-page-state
 * 
 * @cssproperty --forge-page-state-width - The width of the page state.
 * @cssproperty --forge-page-state-height - The height of the page state.
 * @cssproperty --forge-page-state-spacing - The spacing of the page state.
 * @cssproperty --forge-page-state-mobile-width - The mobile width of the page state.
 * @cssproperty --forge-page-state-graphic-height - The graphic height of the page state.
 * @cssproperty --forge-page-state-graphic-spacing - The graphic spacing of the page state.
 * @cssproperty --forge-page-state-mobile-graphic-height - The mobile graphic height of the page state.
 * @cssproperty --forge-page-state-title-color - The title color of the page state.
 * @cssproperty --forge-page-state-title-spacing - The title spacing of the page state.
 * @cssproperty --forge-page-state-message-color - The message color of the page state.
 * @cssproperty --forge-page-state-message-spacing - The message spacing of the page state.
 * @cssproperty --forge-page-state-actions-spacing - The actions spacing of the page state.
 * 
 */
@CustomElement({
  name: PAGE_STATE_CONSTANTS.elementName
})
export class PageStateComponent extends BaseComponent implements IPageStateComponent {
  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
  }
}
