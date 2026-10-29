import { CUSTOM_ELEMENT_NAME_PROPERTY, tryDefine } from '@tylertech/forge-core';
import { html, TemplateResult, unsafeCSS } from 'lit';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { VIEW_CONSTANTS } from './view-constants.js';

import styles from './view.scss';

/** @deprecated - This will be removed in the future. Please switch to using ViewComponent. */
export interface IViewComponent extends BaseLitElement {}

/**
 * @tag forge-view
 *
 * @summary Represents a single view content area within a view-switcher for organizing and displaying content sections.
 *
 * @slot - The content of the view.
 */
export class ViewComponent extends BaseLitElement implements IViewComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = VIEW_CONSTANTS.elementName;

  public render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

tryDefine(VIEW_CONSTANTS.elementName, ViewComponent);

declare global {
  interface HTMLElementTagNameMap {
    'forge-view': IViewComponent;
  }
}
