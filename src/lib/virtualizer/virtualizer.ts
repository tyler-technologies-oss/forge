import { provide } from '@lit/context';
import { VirtualizerController } from '@tanstack/lit-virtual';
import { VirtualizerOptions } from '@tanstack/virtual-core';
import { debounce } from '@tylertech/forge-core';
import { html, LitElement, nothing, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref, Ref } from 'lit/directives/ref.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
  EstimateSizeCallback,
  GetItemKeyCallback,
  IVirtualizerContext,
  VirtualItem,
  VirtualItemBuilder,
  VIRTUALIZER_CONSTANTS,
  VIRTUALIZER_CONTEXT,
  VirtualizerDirection
} from './virtualizer-constants';

import styles from './virtualizer.scss';

export interface IVirtualizerComponent extends LitElement {
  count: number;
  buffer: number;
  direction: VirtualizerDirection;
  paddingStart: number;
  paddingEnd: number;
  scrollPaddingStart: number;
  scrollPaddingEnd: number;
  gap: number;
  disabled: boolean;
  dynamic: boolean;
  estimateSize: EstimateSizeCallback;
  getItemKey: GetItemKeyCallback;
  itemBuilder: VirtualItemBuilder;
  readonly items: VirtualItem[];
}

/**
 * A map of component properties to virtualizer options.
 */
const propertyMap = new Map<keyof IVirtualizerComponent, { optionName: keyof VirtualizerOptions<Element, Element>; transform?: (input: any) => any }>([
  ['buffer', { optionName: 'overscan' }],
  ['count', { optionName: 'count' }],
  ['direction', { optionName: 'horizontal', transform: (input: VirtualizerDirection) => input === 'horizontal' }],
  ['disabled', { optionName: 'enabled', transform: (input: boolean) => !input }],
  ['estimateSize', { optionName: 'estimateSize' }],
  ['gap', { optionName: 'gap' }],
  ['getItemKey', { optionName: 'getItemKey' }],
  ['paddingEnd', { optionName: 'paddingEnd' }],
  ['paddingStart', { optionName: 'paddingStart' }],
  ['scrollPaddingEnd', { optionName: 'scrollPaddingEnd' }],
  ['scrollPaddingStart', { optionName: 'scrollPaddingStart' }]
]);

declare global {
  interface HTMLElementTagNameMap {
    'forge-virtualizer': IVirtualizerComponent;
  }
}

/**
 * @tag forge-virtualizer
 *
 * @summary Virtualizers are used to performantly present large collections of repeated elements by rendering only those in view.
 *
 * @event {Event} change - Emits when the set of rendered items changes.
 *
 * @part root - The root element of the virtualizer.
 * @part scroller - The scroller element of the virtualizer.
 *
 * @slot - The default (unnamed) slot for the virtual items.
 * @slot header - A slot for content to be placed at the start of the virtualizer.
 * @slot footer - A slot for content to be placed at the end of the virtualizer.
 *
 * @dependency forge-virtual-item
 */
@customElement(VIRTUALIZER_CONSTANTS.elementName)
export class VirtualizerComponent extends LitElement implements IVirtualizerComponent {
  public static styles = unsafeCSS(styles);

  /**
   * The number of items in the virtualizer.
   * @default 0
   * @attribute
   */
  @property({ type: Number, reflect: true }) public count = 0;
  /**
   * The number of items to render outside the visible area.
   * @default 5
   * @attribute
   */
  @property({ type: Number, reflect: true }) public buffer = 5;
  /**
   * The scroll direction of the virtualizer.
   * @default 'vertical'
   * @attribute
   */
  @property({ reflect: true }) public direction: VirtualizerDirection = 'vertical';
  /**
   * The padding in pixels applied to the start of the virtualizer.
   * @default 0
   * @attribute
   */
  @property({ type: Number, reflect: true, attribute: 'padding-start' }) public paddingStart = 0;
  /**
   * The padding in pixels applied to the end of the virtualizer.
   * @default 0
   * @attribute
   */
  @property({ type: Number, reflect: true, attribute: 'padding-end' }) public paddingEnd = 0;
  /**
   * The padding in pixels applied to the start of the virtualizer when scrolling.
   * @default 0
   * @attribute
   */
  @property({ type: Number, reflect: true, attribute: 'scroll-padding-start' }) public scrollPaddingStart = 0;
  /**
   * The padding in pixels applied to the end of the virtualizer when scrolling.
   * @default 0
   * @attribute
   */
  @property({ type: Number, reflect: true, attribute: 'scroll-padding-end' }) public scrollPaddingEnd = 0;
  /**
   * The space in pixels between items.
   * @default 0
   * @attribute
   */
  @property({ type: Number, reflect: true }) public gap = 0;
  /**
   * Disables the virtualizer.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true }) public disabled = false;
  /**
   * Enables dynamic sizing of items.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true }) public dynamic = false;
  /**
   * A function used byt he virtualizer to estimate the size of an item.
   * @default () => 0
   */
  @property() public estimateSize: EstimateSizeCallback = () => 0;
  /**
   * A function used by the virtualizer to associate each item with a unique key.
   */
  @property() public getItemKey: GetItemKeyCallback = (index: number) => index;
  /**
   * A function used to impertively render the content of each virtual item.
   */
  @property() public itemBuilder: VirtualItemBuilder;

  /**
   * The items currently rendered in the virtualizer.
   */
  public get items(): VirtualItem[] {
    return this._virtualizerController.getVirtualizer().getVirtualItems();
  }

  @provide({ context: VIRTUALIZER_CONTEXT }) private _context: IVirtualizerContext;

  private _scrollElementRef: Ref<HTMLElement> = createRef();
  private _virtualizerController: VirtualizerController<Element, Element>;

  constructor() {
    super();
    this._initializeVirtualizer();
    this._updateContext();
  }

  public willUpdate(changedProperties: PropertyValues<this>): void {
    for (const prop of changedProperties.keys()) {
      if (prop === 'direction') {
        this._updateContext();
      }
      const option = propertyMap.get(prop as keyof IVirtualizerComponent);
      if (option) {
        const thisProp = this[prop as keyof IVirtualizerComponent];
        const value = option.transform ? option.transform(thisProp) : thisProp;
        this._setVirtualizerOption(option.optionName, value);
      }
    }
  }

  public render(): TemplateResult {
    const virtualizer = this._virtualizerController.getVirtualizer();

    return html`<div part="root" class="forge-virtualizer" ${ref(this._scrollElementRef)}>
      <div
        part="scroller"
        class=${classMap({ scroller: true, horizontal: this.direction === 'horizontal' })}
        style=${styleMap({ '--size': virtualizer.getTotalSize() + 'px' })}>
        <slot name="header"></slot>
        <slot>
          ${(!!this.itemBuilder &&
            repeat(
              this.items,
              item => item.key,
              item => html`<forge-virtual-item .item=${item}>${this.itemBuilder(item)}</forge-virtual-item>`
            )) ||
          nothing}
        </slot>
        <slot name="footer"></slot>
      </div>
    </div>`;
  }

  /**
   * Scrolls to the item at the given index.
   * @param index The index of the item to scroll to.
   */
  public scrollToIndex(index: number): void {
    this._virtualizerController.getVirtualizer().scrollToIndex(index);
  }

  /**
   * Scrolls to a pixel location within the virtualizer.
   * @param offset The number of pixels into the virtualizer to scroll.
   */
  public scrollToOffset(offset: number): void {
    this._virtualizerController.getVirtualizer().scrollToOffset(offset);
  }

  /**
   * Instantiates the virtualizer controller.
   */
  private _initializeVirtualizer(): void {
    this._virtualizerController = new VirtualizerController(this, {
      count: this.count,
      enabled: !this.disabled,
      estimateSize: this.estimateSize,
      gap: this.gap,
      getScrollElement: () => this._scrollElementRef.value ?? null,
      horizontal: this.direction === 'horizontal',
      onChange: this._emitChangeEvent.bind(this),
      overscan: this.buffer,
      paddingEnd: this.paddingEnd,
      paddingStart: this.paddingStart,
      scrollPaddingEnd: this.scrollPaddingEnd,
      scrollPaddingStart: this.scrollPaddingStart
    });
  }

  // Use a debounce to batch multiple options changes into one re-render.
  private _debounceMeasure = (): void => {
    debounce(() => this._virtualizerController.getVirtualizer().measure(), 0);
  };
  private _setVirtualizerOption<T extends VirtualizerOptions<Element, Element>, K extends keyof T>(name: K, value: T[K]): void {
    (this._virtualizerController.getVirtualizer().options as T)[name] = value;
    this._debounceMeasure();
  }

  private _updateContext(): void {
    this._context = {
      virtualizer: this._virtualizerController.getVirtualizer(),
      direction: this.direction,
      dynamic: this.dynamic
    };
  }

  private _emitChangeEvent(): void {
    this.dispatchEvent(new Event(VIRTUALIZER_CONSTANTS.events.CHANGE, { bubbles: true, composed: true }));
  }
}
