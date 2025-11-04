import { customElement, attachShadowTemplate } from '@tylertech/forge-core';
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
 * @tag forge-page-state
 *
 * @summary Page states display full-height messages for empty states, errors, or loading scenarios. Can be used within a full page or within a container.
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
 * @csspart root - The root container element.
 * @csspart graphic-container - The graphic container element.
 * @csspart title-container - The title container element.
 * @csspart message-container - The message container element.
 * @csspart actions-container - The actions container element.
 *
 * @cssclass forge-page-state - The page state layout container.
 * @cssclass forge-page-state__graphic - The graphic to display.
 * @cssclass forge-page-state__title - The title to display.
 * @cssclass forge-page-state__message - The message to display.
 * @cssclass forge-page-state__actions - The container element for optional actions.
 *
 * @slot graphic - The slot where the graphic will be rendered.
 * @slot title - The slot where the title will be rendered.
 * @slot message - The slot where the message will be rendered.
 * @slot actions - The slot where the actions will be rendered.
 */
@customElement({
  name: PAGE_STATE_CONSTANTS.elementName
})
export class PageStateComponent extends BaseComponent implements IPageStateComponent {
  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
  }
}
