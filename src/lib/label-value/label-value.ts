import { customElement, attachShadowTemplate, coerceBoolean } from '@tylertech/forge-core';
import { LABEL_VALUE_CONSTANTS } from './label-value-constants';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';

import template from './label-value.html';
import styles from './label-value.scss';

export interface ILabelValueComponent extends IBaseComponent {
  empty: boolean;
  ellipsis: boolean;
  inline: boolean;
  /** @deprecated Use `inline` instead. */
  dense: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-label-value': ILabelValueComponent;
  }
}

/**
 * @tag forge-label-value
 *
 * @summary Label-value pairs are used to display a label and a value in a compact format.
 *
 * @property {boolean} [empty=false] - If true, the value will be displayed in an alternative emphasized style.
 * @property {boolean} [ellipsis=false] - If true, the value will be truncated with an ellipsis if it overflows its container.
 * @property {boolean} [inline=false] - If true, the label and value will be displayed on the same line.
 * @property {boolean} [dense=false] - Deprecated. Use `inline` instead.
 *
 * @attribute {boolean} empty - If present, the value will be displayed in an alternative emphasized style.
 * @attribute {boolean} ellipsis - If present, the value will be truncated with an ellipsis if it overflows its container.
 * @attribute {boolean} inline - If present, the label and value will be displayed on the same line.
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
 * @slot label - The label to display.
 * @slot value - The value to display.
 * @slot icon - An icon to display next to the label.
 */
@customElement({
  name: LABEL_VALUE_CONSTANTS.elementName
})
export class LabelValueComponent extends BaseComponent implements ILabelValueComponent {
  public static get observedAttributes(): string[] {
    return Object.values(LABEL_VALUE_CONSTANTS.observedAttributes);
  }

  private _empty = false;
  private _ellipsis = false;
  private _inline = false;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case LABEL_VALUE_CONSTANTS.observedAttributes.EMPTY:
        this.empty = coerceBoolean(newValue);
        break;
      case LABEL_VALUE_CONSTANTS.observedAttributes.ELLIPSIS:
        this.ellipsis = coerceBoolean(newValue);
        break;
      case LABEL_VALUE_CONSTANTS.observedAttributes.INLINE:
      case LABEL_VALUE_CONSTANTS.observedAttributes.DENSE:
        this.inline = coerceBoolean(newValue);
        break;
    }
  }

  public get empty(): boolean {
    return this._empty;
  }
  public set empty(value: boolean) {
    value = Boolean(value);
    if (this._empty !== value) {
      this._empty = value;
      this.toggleAttribute(LABEL_VALUE_CONSTANTS.attributes.EMPTY, this._empty);
    }
  }

  public get ellipsis(): boolean {
    return this._ellipsis;
  }
  public set ellipsis(value: boolean) {
    value = Boolean(value);
    if (this._ellipsis !== value) {
      this._ellipsis = value;
      this.toggleAttribute(LABEL_VALUE_CONSTANTS.attributes.ELLIPSIS, this._ellipsis);
    }
  }

  public get inline(): boolean {
    return this._inline;
  }
  public set inline(value: boolean) {
    value = Boolean(value);
    if (this._inline !== value) {
      this._inline = value;
      this.toggleAttribute(LABEL_VALUE_CONSTANTS.attributes.INLINE, this._inline);
    }
  }

  /** @deprecated Use `inline` instead. */
  public get dense(): boolean {
    return this.inline;
  }
  public set dense(value: boolean) {
    this.inline = value;
  }
}
