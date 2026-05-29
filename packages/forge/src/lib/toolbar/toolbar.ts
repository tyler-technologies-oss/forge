import { TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { IBaseComponent } from '../core/base/base-component.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';

import styles from './toolbar.scss';

/** @deprecated - This will be removed in the future. Please switch to using ToolbarComponent. */
export interface IToolbarComponent extends IBaseComponent {
  inverted: boolean;
}

export const TOOLBAR_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-toolbar';

/**
 * @tag forge-toolbar
 *
 * @summary Toolbars allow you to place titles and actions within a container and align them to the start, center, or end of the toolbar.
 * This component is useful as headers and footers within pages, dialogs, sections... etc. to ensure consistent layout and alignment.
 *
 * @property {boolean} [inverted=false] - Controls whether a bottom divider (default) or top divider (true) is used.
 *
 * @attribute {boolean} [inverted=false] - Controls whether a bottom divider (default) or top divider (true) is used.
 * @attribute {boolean} no-divider - Hides the internal divider.
 * @attribute {boolean} no-border - Deprecated. Use `no-divider` instead.
 * @attribute {boolean} no-padding - Sets the internal padding style to 0.
 * @attribute {boolean} auto-height - Forces the internal container to use `height: auto` for dynamic content that doesn't fit the static height.
 *
 * @cssproperty --forge-toolbar-height - Controls the height.
 * @cssproperty --forge-toolbar-min-height - Controls the minimum height. Defaults to the toolbar height.
 * @cssproperty --forge-theme-surface - Controls the background-color of the toolbar.
 * @cssproperty --forge-toolbar-divider-width - Controls the divider width.
 * @cssproperty --forge-toolbar-divider-style - Controls the divider style.
 * @cssproperty --forge-toolbar-divider-color - Controls the divider color.
 * @cssproperty --forge-toolbar-shape - Controls the border radius of the toolbar.
 * @cssproperty --forge-toolbar-start-start-shape - Controls the border radius of the top left corner.
 * @cssproperty --forge-toolbar-start-end-shape - Controls the border radius of the top right corner.
 * @cssproperty --forge-toolbar-end-start-shape - Controls the border radius of the bottom left corner.
 * @cssproperty --forge-toolbar-end-end-shape - Controls the border radius of the bottom right corner.
 * @cssproperty --forge-toolbar-padding - Controls the left and right padding using the padding-inline style.
 * @cssproperty --forge-toolbar-padding-block - Controls the top and bottom padding using the padding-block style.
 * @cssproperty --forge-toolbar-padding-inline - Controls the left and right padding using the padding-block style.
 * @cssproperty --forge-toolbar-columns - The grid column track sizes.
 *
 * @csspart root - The root container element wrapping all slots and content.
 * @csspart inner - The internal container element for the start, center, and end slots.
 * @csspart before-section-start - The container element for the before-start slot.
 * @csspart section-start - The container element for the start slot.
 * @csspart section-center - The container element for the center slot.
 * @csspart section-end - The container element for the end slot.
 * @csspart after-section-end - The container element for the after-end slot.
 *
 * @slot before-start - The content to place before the start slot.
 * @slot start - The content to place at the start of the toolbar.
 * @slot center - The content to place in the center of the toolbar.
 * @slot end - The content to place at the end of the toolbar.
 * @slot after-end - The content to place after the end slot.
 *
 * @cssclass forge-toolbar - Apply to the root element _(required)_.
 * @cssclass forge-toolbar--inverted - Inverts the toolbar so the divider is at the top.
 */
@customElement(TOOLBAR_TAG_NAME)
export class ToolbarComponent extends BaseLitElement {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = TOOLBAR_TAG_NAME;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [];

  @property({ type: Boolean, reflect: true }) public inverted = false;

  public render(): TemplateResult {
    const classes = {
      'forge-toolbar': true,
      'forge-toolbar--inverted': this.inverted
    };
    return html`<div class=${classMap(classes)} part="root">
      <div class="section" part="before-section-start">
        <slot name="before-start"></slot>
      </div>
      <div class="inner center" part="inner">
        <div class="section" part="section-start">
          <slot name="start"></slot>
          <slot></slot>
        </div>
        <div class="section center" part="section-center">
          <slot name="center"></slot>
        </div>
        <div class="section end" part="section-end">
          <slot name="end"></slot>
        </div>
      </div>
      <div class="section end" part="after-section-end">
        <slot name="after-end"></slot>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-toolbar': ToolbarComponent;
  }
}
