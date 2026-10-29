import { CUSTOM_ELEMENT_NAME_PROPERTY, tryDefine } from '@tylertech/forge-core';
import { html, TemplateResult, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { LABEL_VALUE_CONSTANTS } from './label-value-constants.js';

import styles from './label-value.scss';

/** @deprecated - This will be removed in the future. Please switch to using LabelValueComponent. */
export interface ILabelValueComponent extends BaseLitElement {
  empty: boolean;
  ellipsis: boolean;
  inline: boolean;
  /** @deprecated Use `inline` instead. */
  dense: boolean;
}

/**
 * @tag forge-label-value
 *
 * @summary Label values are used to display a label and value pair in a compact format with the proper typography and spacing styles applied.
 *
 * @cssproperty --forge-label-value-align - Aligns the label and value. Possible values: `start` (default), `center`, `end`.
 * @cssproperty --forge-label-value-label-spacing - The spacing between the label and value.
 * @cssproperty --forge-label-value-label-block-start-spacing - The block start spacing for the label.
 * @cssproperty --forge-label-value-label-block-end-spacing - The block end spacing for the label.
 * @cssproperty --forge-label-value-label-color - The color to apply to the label.
 * @cssproperty --forge-label-value-icon-spacing - The spacing between the icon and the label.
 * @cssproperty --forge-label-value-inline-label-spacing - The spacing between the label and value when displayed inline.
 * @cssproperty --forge-label-value-empty-color - The color to apply to the value when empty.
 * @cssproperty --forge-label-value-empty-style - The font-style to apply to the value when empty.
 *
 * @csspart root - The root layout container element.
 * @csspart label - The label container element.
 * @csspart value - The value container element.
 * @csspart icon - The icon container element.
 *
 * @cssclass forge-label-value - The container element for the label and value elements.
 * @cssclass forge-label-value--inline - Applied to the container element when the label and value are displayed inline next to each other.
 * @cssclass forge-label-value--empty - Applied to the container element when the value is empty.
 * @cssclass forge-label-value--ellipsis - Applied to the container element when the value is truncated with an ellipsis if overflowing
 * @cssclass forge-label-value__label - The label element.
 * @cssclass forge-label-value__value - The value element.
 * @cssclass forge-label-value__icon - The icon element.
 *
 * @slot label - The label to display.
 * @slot value - The value to display.
 * @slot icon - An icon to display next to the label.
 */
export class LabelValueComponent extends BaseLitElement implements ILabelValueComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = LABEL_VALUE_CONSTANTS.elementName;

  /**
   * If true, the value will be displayed in an alternative emphasized style.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public empty = false;

  /**
   * If true, the value will be truncated with an ellipsis if it overflows its container.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public ellipsis = false;

  /**
   * If true, the label and value will be displayed on the same line.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public inline = false;

  /**
   * Deprecated. Use `inline` instead.
   * @deprecated Use `inline` instead.
   * @default false
   * @attribute
   */
  @property({ type: Boolean })
  public set dense(value: boolean) {
    this.inline = value;
  }
  public get dense(): boolean {
    return this.inline;
  }

  public render(): TemplateResult {
    return html`
      <div class="forge-label-value" part="root">
        <div class="icon" part="icon">
          <slot name="icon"></slot>
        </div>
        <div class="label" part="label">
          <slot name="label"></slot>
        </div>
        <div class="value" part="value">
          <slot name="value"></slot>
        </div>
      </div>
    `;
  }
}

tryDefine(LABEL_VALUE_CONSTANTS.elementName, LabelValueComponent);

declare global {
  interface HTMLElementTagNameMap {
    'forge-label-value': ILabelValueComponent;
  }
}
