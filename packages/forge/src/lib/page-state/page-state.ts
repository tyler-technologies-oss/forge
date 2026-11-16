import { CUSTOM_ELEMENT_NAME_PROPERTY, tryDefine } from '@tylertech/forge-core';
import { html, TemplateResult, unsafeCSS } from 'lit';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { PAGE_STATE_CONSTANTS } from './page-state-constants.js';

import styles from './page-state.scss';

/** @deprecated - This will be removed in the future. Please switch to using PageStateComponent. */
export interface IPageStateComponent extends BaseLitElement {}

/**
 * @tag forge-page-state
 *
 * @summary Page states display full-height messages for empty states, errors, or other general information. They can be used as full page content, or within smaller containers and will adapt accordingly.
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
 * @slot action - The slot where the actions will be rendered.
 */
export class PageStateComponent extends BaseLitElement implements IPageStateComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = PAGE_STATE_CONSTANTS.elementName;

  public render(): TemplateResult {
    return html`
      <div class="forge-page-state" part="root">
        <div class="graphic" part="graphic-container">
          <slot name="graphic"></slot>
        </div>
        <div class="title" part="title-container">
          <slot name="title"></slot>
        </div>
        <div class="message" part="message-container">
          <slot name="message"></slot>
        </div>
        <div class="actions" part="actions-container">
          <slot name="action"></slot>
        </div>
      </div>
    `;
  }
}

tryDefine(PAGE_STATE_CONSTANTS.elementName, PageStateComponent);

declare global {
  interface HTMLElementTagNameMap {
    'forge-page-state': IPageStateComponent;
  }
}
