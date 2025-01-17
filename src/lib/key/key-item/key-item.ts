import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property, queryAssignedNodes, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { setDefaultAria } from '../../core/utils/a11y-utils';
import { KEY_ITEM_CONSTANTS } from './key-item-constants';

import styles from './key-item.scss';

export interface IKeyItemComponent extends LitElement {
  color: string | null | undefined;
  inline: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-key-item': IKeyItemComponent;
  }
}

/**
 * @tag forge-key-item
 *
 * @summary Key items label a chart or data visualization.
 */
@customElement(KEY_ITEM_CONSTANTS.elementName)
export class KeyItemComponent extends LitElement implements IKeyItemComponent {
  /* @ignore */
  public static styles = unsafeCSS(styles);

  /**
   * The color of the icon.
   * @default 'var(--forge-key-item-icon-color)'
   * @attribute
   */
  @property({ type: String, reflect: true }) public color: string | null | undefined;
  /**
   * Whether the label and value dislay on one line.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true }) public inline = false;

  @state() private _hasValue = false;

  @queryAssignedNodes({ slot: 'value' }) private _valueNodes: Node[];

  /* @ignore */
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

  /* @internal */
  public render(): TemplateResult {
    return html`
      <div
        part="root"
        class=${classMap({ 'forge-key-item': true, inline: this.inline, 'no-value': !this._hasValue })}
        style=${styleMap({ [KEY_ITEM_CONSTANTS.cssCustomProperties.ICON_COLOR]: this.color })}>
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
