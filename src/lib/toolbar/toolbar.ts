import { CustomElement, attachShadowTemplate, getShadowElement, coerceBoolean } from '@tylertech/forge-core';
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
 * @summary The toolbar component allows you to place titles and actions within a container and align them to the start, center, 
 * or end of the toolbar. This component is useful as headers and footers within pages, dialogs, sections... etc. to ensure 
 * consistent spacing and positioning.
 * 
 * @property {boolean} inverted - Controls whether a border bottom (default) or top (true) is used.
 * 
 * @attribute {boolean} inverted - Controls whether a border bottom (default) or top (true) is used.
 * @attribute {boolean} no-border - Disables the internal border-top or border-bottom styles.
 * @attribute {boolean} no-padding - Sets the internal padding style to 0.
 * @attribute {boolean} auto-height - Forces the internal container to use height: auto for dynamic content that doesn't fit the static height.
 * @cssproperty --forge-theme-height - Controls the height.
 * @cssproperty --forge-theme-min-height - Controls the minimum height.
 * @cssproperty --forge-theme-surface - Controls the background-color of the toolbar.
 * @cssproperty --forge-toolbar-divider-color - Controls the border-color of the toolbar.
 * @cssproperty --forge-toolbar-border-block-start-width - Controls the size of the top border.
 * @cssproperty --forge-toolbar-border-block-end-width - Controls the size of the bottom border.
 * @cssproperty --forge-toolbar-border-block-start-style - Controls the border style of the top border.
 * @cssproperty --forge-toolbar-border-block-end-style - Controls the border style of the bottom border.
 * @cssproperty --forge-toolbar-border-start-start-radius - Controls the border radius of the top left corner.
 * @cssproperty --forge-toolbar-border-start-end-radius - Controls the border radius of the top right corner.
 * @cssproperty --forge-toolbar-border-end-start-radius - Controls the border radius of the bottom left corner.
 * @cssproperty --forge-toolbar-border-end-end-radius - Controls the border radius of the bottom right corner.
 * @cssproperty --forge-toolbar-padding - Controls the left and right padding using the padding-inline style.
 * @cssproperty --forge-toolbar-padding-block - Controls the top and bottom padding using the padding-block style.
 * @cssproperty --forge-toolbar-padding-inline - Controls the left and right padding using the padding-block style.
 * 
 * @csspart root - The outer container element that runs edge to edge horizontally. It contains the before-start slot, 
 * the inner-container element, and the after-end slot.
 * @csspart inner-container - The container element with default inline-padding. It contains the start, center, and end slots.
 * @csspart before-section-start - The container element for the before-start slot.
 * @csspart section-start - The container element for the start slot.
 * @csspart section-center - The container element for the center slot.
 * @csspart section-end - The container element for the end slot.
 * @csspart after-section-end - The container element for the after-end slot.
 */
@CustomElement({
  name: TOOLBAR_CONSTANTS.elementName
})
export class ToolbarComponent extends BaseComponent implements IToolbarComponent {
  public static get observedAttributes(): string[] {
    return [
      TOOLBAR_CONSTANTS.attributes.INVERTED
    ];
  }
  
  private _rootElement: HTMLElement;
  private _inverted = false;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._rootElement = getShadowElement(this, TOOLBAR_CONSTANTS.selectors.TOOLBAR);
  }

  public connectedCallback(): void {
    this._initialize();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case TOOLBAR_CONSTANTS.attributes.INVERTED:
        this.inverted = coerceBoolean(newValue);
        break;
    }
  }

  private _initialize(): void {
    this._setInverted(this._inverted);
  }
  
  private _setInverted(isInverted: boolean): void {
    if (isInverted) {
      this.toggleAttribute(TOOLBAR_CONSTANTS.attributes.INVERTED, isInverted);
    } else {
      this.toggleAttribute(TOOLBAR_CONSTANTS.attributes.INVERTED, isInverted);
    }
  }

  public get inverted(): boolean {
    return this._inverted;
  }
  public set inverted(value: boolean) {
    this._inverted = value;
    this._setInverted(this._inverted);
  }
}
