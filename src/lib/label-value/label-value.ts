import { html, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { BaseLitElement } from '../core/base/base-lit-element';
import { customElement, property } from 'lit/decorators.js';
import { toggleState } from '../core/utils/utils';
import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';

import styles from './label-value.scss';

export interface ILabelValueComponent extends BaseLitElement {
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

export const LABEL_VALUE_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-label-value';

/**
 * @tag forge-label-value
 *
 * @summary Label-value pairs display a label and a value in a compact format.
 *
 * @cssproperty --forge-label-value-align
 * @cssproperty --forge-label-value-label-spacing
 * @cssproperty --forge-label-value-label-block-start-spacing
 * @cssproperty --forge-label-value-label-block-end-spacing
 * @cssproperty --forge-label-value-label-color
 * @cssproperty --forge-label-value-icon-spacing
 * @cssproperty --forge-label-value-inline-label-spacing
 * @cssproperty --forge-label-value-empty-color
 * @cssproperty --forge-label-value-empty-style
 *
 * @slot label
 * @slot value
 * @slot icon
 *
 * @state empty - display the value in an alternative emphasized style.
 * @state ellipsis - truncate overflowing text with an ellipsis.
 * @state inline - display the label and value in a single line.
 * @state dense - Deprecated. Use `inline` instead.
 *
 * @cssclass forge-label-value - The container element for the label and value elements.
 * @cssclass forge-label-value--inline - Applied to the container element when the label and value are displayed inline next to each other.
 * @cssclass forge-label-value--empty - Applied to the container element when the value is empty.
 * @cssclass forge-label-value--ellipsis - Applied to the container element when the value is truncated with an ellipsis if overflowing
 * @cssclass forge-label-value__label - The label element.
 * @cssclass forge-label-value__value - The value element.
 * @cssclass forge-label-value__icon - The icon element.
 */
@customElement(LABEL_VALUE_TAG_NAME)
export class LabelValueComponent extends BaseLitElement implements ILabelValueComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = LABEL_VALUE_TAG_NAME;

  #internals: ElementInternals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  /** Controls whether the value is displayed in an alternative emphasized style. */
  @property({ type: Boolean, reflect: true })
  public empty = false;

  /** Controls whether overflowing text is truncated with an ellipsis. */
  @property({ type: Boolean, reflect: true })
  public ellipsis = false;

  /** Controls whether the label and value are displayed inline. */
  @property({ type: Boolean, reflect: true })
  public inline = false;

  /** Deprecated. Use `inline` instead. */
  @property({ type: Boolean, reflect: true })
  public dense = false;

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('dense')) {
      if (this.hasUpdated || this.hasAttribute('dense')) {
        // Ignore the initialization cycle. On subsequent updates, map dense to inline
        if (this.inline !== this.dense) {
          this.inline = this.dense;
        }
      }
    }

    if (changedProperties.has('empty')) {
      toggleState(this.#internals, 'empty', this.empty);
    }
    if (changedProperties.has('ellipsis')) {
      toggleState(this.#internals, 'ellipsis', this.ellipsis);
    }
    if (changedProperties.has('inline') || changedProperties.has('dense')) {
      toggleState(this.#internals, 'inline', this.inline);
    }
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
