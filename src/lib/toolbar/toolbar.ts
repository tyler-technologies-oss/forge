import { customElement, attachShadowTemplate, coerceBoolean } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';

import { TOOLBAR_CONSTANTS } from './toolbar-constants';

import template from './toolbar.html';
import styles from './toolbar.scss';

export interface IToolbarComponent extends IBaseComponent {
  inverted: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-toolbar': IToolbarComponent;
  }
}

/**
 * @tag forge-toolbar
 *
 * @summary
 * Toolbars allow you to place titles and actions within a container and align them to the start, center, or end of the toolbar.
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
 * @cssproperty --forge-theme-height - Controls the height.
 * @cssproperty --forge-theme-min-height - Controls the minimum height.
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
 * @cssfilepath \@tylertech/forge/dist/toolbar/forge-toolbar.css
 *
 * @cssclass forge-toolbar - Apply to the root element _(required)_.
 * @cssclass forge-toolbar--inverted - Inverts the toolbar so the divider is at the top.
 * @cssclass forge-toolbar--no-divider - Hides the internal divider.
 * @cssclass forge-toolbar--auto-height - Forces the internal container to use `height: auto` for dynamic content that doesn't fit the static/default height.
 * @cssclass forge-toolbar__section-start - Renders content in the start area within the toolbar.
 * @cssclass forge-toolbar__section-center - Renders content in the center area within the toolbar.
 * @cssclass forge-toolbar__section-end - Renders content in the end area within the toolbar.
 */
@customElement({
  name: TOOLBAR_CONSTANTS.elementName
})
export class ToolbarComponent extends BaseComponent implements IToolbarComponent {
  public static get observedAttributes(): string[] {
    return Object.values(TOOLBAR_CONSTANTS.observedAttributes);
  }

  private _inverted = false;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case TOOLBAR_CONSTANTS.observedAttributes.INVERTED:
        this.inverted = coerceBoolean(newValue);
        break;
    }
  }

  public get inverted(): boolean {
    return this._inverted;
  }
  public set inverted(value: boolean) {
    if (this._inverted !== value) {
      this._inverted = value;
      this.toggleAttribute(TOOLBAR_CONSTANTS.attributes.INVERTED, this._inverted);
    }
  }
}
