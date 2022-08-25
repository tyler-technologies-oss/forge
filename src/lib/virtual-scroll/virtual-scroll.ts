import { attachShadowTemplate, CustomElement } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { VIRTUAL_SCROLL_CONSTANTS } from './virtual-scroll-constants';

import template from './virtual-scroll.html';
import styles from './virtual-scroll.scss';
import { VirtualScroller } from './virtual-scroller';
import { IVirtualScrollerOptions, VirtualScrollerItemBuilder } from './virtual-scroller/virtual-scroller-constants';

export interface IVirtualScrollComponent extends IBaseComponent {
  container: HTMLElement;
  itemBuilder: VirtualScrollerItemBuilder;
  data: unknown[];
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-virtual-scroll': IVirtualScrollComponent;
  }
}

@CustomElement({
  name: VIRTUAL_SCROLL_CONSTANTS.elementName
})
export class VirtualScrollComponent extends BaseComponent implements IVirtualScrollComponent {
  public static get observedAttributes(): string[] {
    return [
      VIRTUAL_SCROLL_CONSTANTS.observedAttributes.BUFFER
    ];
  }

  private _virtualScroller?: VirtualScroller;
  private _containerElement: HTMLElement;
  private _itemBuilder: VirtualScrollerItemBuilder;
  private _data: unknown[];
  private _buffer: number;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._containerElement = this.shadowRoot?.querySelector('div') as HTMLElement;
  }

  public connectedCallback(): void {
    if (!this._containerElement) {
      throw new Error(`[forge-virtual-scroll] You must provide a container element.`);
    }

    if (typeof this._itemBuilder !== 'function') {
      throw new Error(`[forge-virtual-scroll] You must provide an item builder callback.`);
    }

    const options: IVirtualScrollerOptions = {
      buffer: this._buffer,
      itemBuilder: this._itemBuilder,
      itemHeight: 48,
      container: this._containerElement,
      data: this._data,
      insetTop: '8px',
      insetBottom: '8px'
    };
    this._virtualScroller = new VirtualScroller(options);
  }

  public disconnectedCallback(): void {
    this._virtualScroller?.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {

    }
  }

  public get container(): HTMLElement {
    return this._containerElement;
  }
  public set container(el: HTMLElement) {
    this._containerElement = el;
    if (this._virtualScroller) {
      this._virtualScroller.container = this._containerElement;
    }
  }

  public get itemBuilder(): VirtualScrollerItemBuilder {
    return this._itemBuilder;
  }
  public set itemBuilder(cb: VirtualScrollerItemBuilder) {
    this._itemBuilder = cb;
    if (this._virtualScroller) {
      this._virtualScroller.itemBuilder = cb;
    }
  }

  public get data(): unknown[] {
    return this._data;
  }
  public set data(value: unknown[]) {
    this._data = value;
    if (this._virtualScroller) {
      this._virtualScroller.data = value;
    }
  }
}
