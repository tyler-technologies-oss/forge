import { consume } from '@lit/context';
import { VirtualItem } from '@tanstack/virtual-core';
import { html, LitElement, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { IVirtualizerContext, VIRTUALIZER_CONTEXT } from '../virtualizer-constants';
import { VIRTUAL_ITEM_CONSTANTS } from './virtual-item-constants';

import styles from './virtual-item.scss';

export interface IVirtualItemComponent extends LitElement {
  item: VirtualItem;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-virtual-item': IVirtualItemComponent;
  }
}

/**
 * @tag forge-virtualizer
 */
@customElement(VIRTUAL_ITEM_CONSTANTS.elementName)
export class VirtualItemComponent extends LitElement implements IVirtualItemComponent {
  public static styles = unsafeCSS(styles);

  @property() public item: VirtualItem;

  @consume({ context: VIRTUALIZER_CONTEXT, subscribe: true }) private _context: IVirtualizerContext;

  public render(): TemplateResult {
    return html`<div
      part="root"
      class=${classMap({ 'forge-virtual-item': true, horizontal: this._context.direction === 'horizontal' })}
      style=${styleMap({ '--size': this.item.size + 'px', '--start': this.item.start + 'px', '--lane': this.item.lane })}>
      <slot></slot>
    </div>`;
  }
}
