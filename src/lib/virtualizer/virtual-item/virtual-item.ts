import { consume } from '@lit/context';
import { VirtualItem } from '@tanstack/virtual-core';
import { html, LitElement, nothing, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ref } from 'lit/directives/ref.js';
import { styleMap } from 'lit/directives/style-map.js';
import { IVirtualizerContext, VIRTUALIZER_CONTEXT } from '../virtualizer-constants';
import { VIRTUAL_ITEM_CONSTANTS } from './virtual-item-constants';

import styles from './virtual-item.scss';

export interface IVirtualItemComponent extends LitElement {
  item: VirtualItem;
  measure: () => void;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-virtual-item': IVirtualItemComponent;
  }
}

/**
 * @tag forge-virtualizer
 *
 * @summary Virtual items position content within a virtualizer.
 *
 * @part root - The root element of the virtual item.
 *
 * @slot - The default (unnamed) slot for the virtual item's content.
 */
@customElement(VIRTUAL_ITEM_CONSTANTS.elementName)
export class VirtualItemComponent extends LitElement implements IVirtualItemComponent {
  public static styles = unsafeCSS(styles);

  /**
   * The virtual item to render.
   * @default undefined
   */
  @property() public item: VirtualItem;

  @consume({ context: VIRTUALIZER_CONTEXT, subscribe: true }) private _context: IVirtualizerContext;

  public render(): TemplateResult {
    return html`<div
      part="root"
      data-index=${this.item.index}
      ${this._context.dynamic ? ref(this._context.virtualizer.measureElement) : nothing}
      class=${classMap({ 'forge-virtual-item': true, horizontal: this._context.direction === 'horizontal' })}
      style=${styleMap({ '--size': this._context.dynamic ? 'initial' : this.item.size + 'px', '--start': this.item.start + 'px', '--lane': this.item.lane })}>
      <slot></slot>
    </div>`;
  }

  /**
   * Measures the virtual item as rendered. Use this when the item's size has changed to update the virtualizer.
   */
  public measure(): void {
    this._context.virtualizer.measureElement(this);
  }
}
