import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property, queryAssignedNodes, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { setDefaultAria } from '../../core/utils/a11y-utils';
import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';

import styles from './key-item.scss';

export const KEY_ITEM_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-key-item';

/**
 * @tag forge-key-item
 *
 * @summary Key items label a chart or data visualization.
 *
 * @slot - The default slot for the label.
 * @slot icon - The icon to display.
 * @slot value - The value to display.
 *
 * @cssproperty --forge-key-item-icon-color - The color of the icon.
 * @cssproperty --forge-key-item-label-color - The color of the label.
 * @cssproperty --forge-key-item-value-color - The color of the value.
 * @cssproperty --forge-key-item-gap - The spacing between the icon and label.
 * @cssproperty --forge-key-item-icon-size - The size of the icon.
 *
 * @csspart root - The root element.
 * @csspart icon - The icon element.
 * @csspart label - The label element.
 * @csspart value - The value element.
 */
@customElement(KEY_ITEM_TAG_NAME)
export class KeyItemComponent extends LitElement {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = KEY_ITEM_TAG_NAME;

  /**
   * Whether the label and value dislay on one line.
   * @default false
   * @attribute
   */
  @property({ type: Boolean }) public inline = false;

  @state() private _hasValue = false;

  @queryAssignedNodes({ slot: 'value' }) private _valueNodes: Node[];

  private _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  public connectedCallback(): void {
    super.connectedCallback();
    setDefaultAria(this, this._internals, {
      role: 'listitem'
    });
    this._handleSlotChange();
  }

  public render(): TemplateResult {
    return html`
      <div part="root" class=${classMap({ 'forge-key-item': true, inline: this.inline, 'no-value': !this._hasValue })}>
        <div part="icon" class="icon">
          <slot name="icon">
            <div class="default-icon"></div>
          </slot>
        </div>
        <div part="label" class="label">
          <slot></slot>
        </div>
        <div part="value" class="value" @slotchange=${this._handleSlotChange}>
          <slot name="value"></slot>
        </div>
      </div>
    `;
  }

  private _handleSlotChange(): void {
    const nodes = this._valueNodes.filter(node => !!node.textContent?.trim());
    this._hasValue = !!nodes.length;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-key-item': KeyItemComponent;
  }
}
