import { throttle } from '@tylertech/forge-core';
import { IVirtualScrollerItem, IVirtualScrollerOptions, VirtualScrollerAlignment, VirtualScrollerItemBuilder } from './virtual-scroller-constants';
import { createItem, createSpacer, getFirstMapKey, getScrollTopWithItemInView, limitCountToRender, deleteFirstFromMap, scrollToItem, setItemAccessibility, setItemTop } from './virtual-scroller-utils';

export class VirtualScroller<T = unknown> {
  /**
   * Prevents elements from being removed when they scroll out of view.
   */
  private _appendOnly = false;

  /**
   * Sets the number of elements above and below the viewable area to render.
   */
  private _buffer = 10;

  /**
   * The data to display in the virtual scroller.
   */
  private _data: T[];

  /**
   * Sets the number of recently added elements to store even after being
   * removed from the DOM, for faster repeat rendering.
   */
  private _cacheSize = 100;

  /**
   * A margin to apply to the top of the internal spacer element and to adjust
   * the position of each item element by. Because all item elements are
   * absolutely positioned this is required to account for margin or padding
   * on the container.
   */
  private _insetBottom = '0px';

  /**
   * A margin to apply to the bottom of the internal spacer element. Because 
   * the spacer is absolutely positioned this is required to account for margin
   * or padding on the container.
   */
  private _insetTop = '0px';

  /**
   * The function provided to create items from data.
   */
  private _itemBuilder: VirtualScrollerItemBuilder<T>;

  /**
   * A fixed height common to all item elements. This is necessary to
   * calculate the total height of the container as well as the position of
   * each item within it.
   */
  private _itemHeight: number;

  /**
   * Where to place an item programmatically scrolled into view.
   */
  private _scrollAlignment: VirtualScrollerAlignment = 'top';

  /**
   * Prevents `aria-setsize` and `aria-posinset` from being set by the virtual
   * scroller. These are used to communicate the number of items and position
   * of each item within the total. If set to `true` the consumer is expected
   * to handle this instead.
   */
  private _skipAccessibility = false;

  /**
   * Sets the index of an element to bring into view when the virtual scroller
   * inits.
   */
  private _startIndex = 0;

  /**
   * Sets a throttle duration in ms when handling scroll events. This does not
   * affect how quickly the user is able to scroll through the container, so if
   * set there may be a delay before new items are added to the DOM.
   */
  private _throttle = 0;

  // Elements

  /**
   * The container element to append items to.
   */
  private _container: HTMLElement;

  /**
   * An internal element used to force the required scroll height on the
   * container.
   */
  private _spacerElement: HTMLElement;

  /**
   * The array of items that are in view or within the buffer and
   * should be rendered to the DOM.
   * */
  private _itemsToRender: Map<number, IVirtualScrollerItem> = new Map();

  // Data

  /**
   * The total number of elements both rendered and unrendered.
   */
  private _setSize: number;

  /**
   * The total height of all item elements both rendered and unrendered.
   * Calculated by multiplying `_setSize` and `_itemHeight`.
   */
  private _scrollHeight: number;

  /**
   * The current scroll position of the container element.
   */
  private _scrollTop = 0;

  /**
   * The index of the first item in view disregarding the buffer.
   */
  private _first = 0;

  /**
   * The index of the last item in view disregarding the buffer.
   */
  private _last = 0;

  /**
   * A map storing recently rendered items, including those currently
   * rendered and those removed from the DOM. Enables faster rendering of
   * elements to the DOM.
   */
  private _cache: Map<number, IVirtualScrollerItem> = new Map();

  // Events

  /**
   * The function that runs when the container element is scrolled.
   * 
   * @todo Determine the correct type of a scroll event.
   */
  private _scrollListener: (evt: Event) => void;

  // Getters

  /**
   * Returns the index of the first item in view including the buffer.
   */
  private get _firstToRender(): number {
    return Math.max(0, this._first - this._buffer - 1);
  }

  /**
   * Returns the index of the last item in view including the buffer.
   */
  private get _lastToRender(): number {
    return Math.min(this._data.length - 1, this._last + this._buffer);
  }

  /**
   * Returns the maximum number of items that should render at once.
   * Calculated from the number of items that can fit in view at once
   * plus the buffer amount at the top and bottom.
   */
  private get _numberOfItemsToRender(): number {
    return Math.ceil(this._container.clientHeight / this._itemHeight) + this._buffer * 2;
  }

  constructor(options: IVirtualScrollerOptions<T>) {
    this.init(options);
  }

  /**
   * Initialize with all provided properties and elements.
   * 
   * @param options
   */
  public init(options: Partial<IVirtualScrollerOptions<T>>): void {
    this._appendOnly = options.appendOnly ?? this._appendOnly;
    this._buffer = options.buffer ?? this._buffer;
    this._cacheSize = options.cacheSize ?? this._cacheSize;
    this._container = options.container ?? this._container;
    this._data = options.data ? [...options.data] : this._data;
    this._insetBottom = options.insetBottom ?? this._insetBottom;
    this._insetTop = options.insetTop ?? this._insetTop;
    this._itemBuilder = options.itemBuilder ?? this._itemBuilder;
    this._itemHeight = options.itemHeight ?? this._itemHeight;
    this._scrollAlignment = options.scrollAlignment ?? this._scrollAlignment;
    this._skipAccessibility = options.skipAccessibility ?? this._skipAccessibility;
    this._startIndex = options.startIndex ?? this._startIndex;
    this._throttle = options.throttle ?? this._throttle;
    this._setSize = this._data.length;
    this._scrollHeight = this._setSize * this._itemHeight;

    this._removeSpacer();
    this._spacerElement = createSpacer(this._scrollHeight, this._insetTop, this._insetBottom);
    this._appendSpacer();

    if (this._startIndex) {
      this._scrollToStartIndex();
    }

    this._initScrollListener();
    this._layoutItems();
    this._renderItems();
  }

  /**
   * Safely destroy the virtual scroller instance.
   * 
   * @todo Should items be removed from the container?
   */
  public disconnect(): void {
    this._removeScrollListener();
    this._removeSpacer();
  }

  /**
   * Scrolls an item into view.
   * 
   * @param index The index of the item.
   * @param alignment Where in the container to scroll the item to.
   * @param behavior
   */
  public scrollToItem(index: number, alignment?: VirtualScrollerAlignment, behavior?: 'smooth' | 'auto'): void {
    scrollToItem(index, this.itemHeight, this._container, alignment ?? this._scrollAlignment, behavior);
  }

  /**
   * Clears then registers the scroll listener with a throttle applied.
   */
  private _initScrollListener(): void {
    this._removeScrollListener();
    this._scrollListener = throttle((evt: Event) => this._onScroll(evt), this._throttle);
    this._registerScrollListener();
  }
  
  private _registerScrollListener(): void {
    this._container.addEventListener('scroll', this._scrollListener);
  }

  private _removeScrollListener(): void {
    this._container.removeEventListener('scroll', this._scrollListener);
  }

  private _appendSpacer(): void {
    this._container.append(this._spacerElement);
  }

  private _removeSpacer(): void {
    if (this._spacerElement) {
      this._container.removeChild(this._spacerElement);
    }
  }

  /**
   * Respond to scroll events on the container.
   * @param evt The native scroll event.
   * 
   */
  private _onScroll(evt: Event): void {
    this._layoutItems();
    this._renderItems();
  }

  /**
   * Returns the item at an index, first checking to see if it's
   * already in the cache then creating it if not.
   * 
   * @param index The index of the desired item.
   * @param recreate Whether the item element should be recreated.
   * @returns The item at the given index.
   */
  private _getItem(index: number, recreate = false): IVirtualScrollerItem {
    if (!recreate && this._cache.has(index)) {
      return this._cache.get(index) as IVirtualScrollerItem;
    }

    const item = createItem(index, this._data[index], this._itemBuilder);
    setItemTop(item, index, this._itemHeight, this._insetTop);
    if (!this._skipAccessibility) {
      setItemAccessibility(item, index, this._setSize);
    }
    this._addToCache(index, item);
    return item;
  }

  /**
   * Adds an item to the cache, removing entries from the start to
   * maintain the maximum cache size.
   * 
   * @param index The index of the item.
   * @param item The item.
   */
  private _addToCache(index: number, item: IVirtualScrollerItem): void {
    if (this._cacheSize === 0) {
      return;
    }

    this._cache.set(index, item);

    if (this._cache.size > this._cacheSize) {
      deleteFirstFromMap(this._cache);
    }
  }

  /**
   * Returns the index of the first visible item.
   * 
   * @returns An item index.
   */
  private _getFirst(): number {
    return Math.floor(this._scrollTop / this._itemHeight);
  }

  /**
   * Returns the index of the last visible item.
   * 
   * @returns An item index.
   */
  private _getLast(): number {
    const clientHeight = this._container.clientHeight;
    return Math.ceil(clientHeight / this._itemHeight) + this._first;
  }

  /**
   * Retrieves the scroll position and first and last visible items.
   */
  private _layoutItems(): void {
    this._scrollTop = this._container.scrollTop;
    this._first = this._getFirst();
    this._last = this._getLast();
  }

  /**
   * Removes out-of-view items and adds in-view items to the DOM.
   */
  private _renderItems(): void {
    const firstToRender = this._firstToRender;
    const lastToRender = this._lastToRender;
    // Start with an item's index to ensure that min is within the set
    let min = getFirstMapKey(this._itemsToRender) ?? this._firstToRender;
    let max = 0;

    // Remove hidden items and get the min and max already rendered items
    this._itemsToRender.forEach((item, index) => {
      if (!this.appendOnly && (index < firstToRender || index > lastToRender)) {
        this._container.removeChild(item.element);
        this._itemsToRender.delete(index);
      }

      if (index < min) {
        min = index;
      }
      if (index > max) {
        max = index;
      }
    });

    // Add items to the beginning of the container
    if (min > firstToRender) {
      const count = this.appendOnly ? min - firstToRender : limitCountToRender(min - firstToRender, this._numberOfItemsToRender);
      const start = firstToRender + count - 1;

      for (let i = start; i >= firstToRender; i--) {
        this._prependItem(i);
      }
    }

    // Add items to the end of the container
    if (max < lastToRender) {
      const count = this.appendOnly ? lastToRender - max : limitCountToRender(lastToRender - max, this._numberOfItemsToRender);
      const start = lastToRender - count + 1;

      for (let i = start; i <= lastToRender; i++) {
        this._appendItem(i);
      }
    }

    // Prepend 0 if missed by the other loops
    if (firstToRender === 0 && this._data.length && !this._itemsToRender.has(0)) {
      this._prependItem(0);
    }
  }

  /**
   * Recreates all item elements and appends them to the container.
   * This might not work as expected if the itemHeight or setSize has changed.
   */
  private _rerenderItems(): void {
    const items = [...this._itemsToRender.entries()];
    items.sort((a, b) => {
      return a[0] - b[0];
    });
    items.forEach(([index, item]) => {
      const newElement = this._getItem(index, true);
      this._container.removeChild(item.element);
      this._itemsToRender.set(index, newElement);
      this._container.append(newElement.element);
    });
  }

  /**
   * Creates an item element and adds it to the beginning of the container element.
   * 
   * @param index The index of the item to add.
   */
  private _prependItem(index: number): void {
    const item = this._getItem(index);
    this._container.prepend(item.element);
    this._itemsToRender.set(index, item);
  }

  /**
   * Creates an item element and adds it to the end of the container element.
   * 
   * @param index The index of the item to add.
   */
  private _appendItem(index: number): void {
    const item = this._getItem(index);
    this._container.append(item.element);
    this._itemsToRender.set(index, item);
  }

  /**
   * Sets the container's scrollTop to brign the start index item into view.
   * 
   * @todo Take insets into account.
   */
  private _scrollToStartIndex(): void {
    const scrollPosition = getScrollTopWithItemInView(this._startIndex, this._itemHeight, this._container.clientHeight, this._scrollAlignment);
    this._container.scrollTop = scrollPosition;
  }

  /**
   * Public getters and setters
   */

  public set options(value: Partial<IVirtualScrollerOptions<T>>) {
    this.init(value);
  }

  public get appendOnly(): boolean {
    return this._appendOnly;
  }
  public set appendOnly(value: boolean) {
    this._appendOnly = value;
  }

  public get buffer(): number {
    return this._buffer;
  }
  public set buffer(value: number) {
    this._buffer = value;
  }

  public get cacheSize(): number {
    return this._cacheSize;
  }
  public set cacheSize(value: number) {
    this._cacheSize = value;

    while (this._cache.size > this._cacheSize) {
      deleteFirstFromMap(this._cache);
    }
  }

  public get container(): HTMLElement {
    return this._container;
  }
  public set container(value: HTMLElement) {
    this.disconnect();
    this._container = value;
    this.init({});
  }

  public get data(): T[] {
    return this._data;
  }
  public set data(value: T[]) {
    this._data = [...value];
    this._setSize = this._data.length;
    this._scrollHeight = this._setSize * this._itemHeight;
    this._rerenderItems();
  }

  public get insetBottom(): string {
    return this._insetBottom;
  }
  public set insetBottom(value: string) {
    this._insetBottom = value;
    this._spacerElement.style.setProperty('margin-bottom', this._insetBottom);
  }

  public get insetTop(): string {
    return this._insetTop;
  }
  public set insetTop(value: string) {
    this._insetTop = value;
    this._spacerElement.style.setProperty('margin-top', this.insetTop);
    this._rerenderItems();
  }

  public get itemBuilder(): VirtualScrollerItemBuilder<T> {
    return this._itemBuilder;
  }
  public set itemBuilder(value: VirtualScrollerItemBuilder<T>) {
    this._itemBuilder = value;
    this._rerenderItems();
  }

  public get itemHeight(): number {
    return this._itemHeight;
  }
  public set itemHeight(value: number) {
    this._itemHeight = value;
    this._scrollHeight = this._setSize * this._itemHeight;
    this._rerenderItems();
  }

  public get scrollAlignment(): VirtualScrollerAlignment {
    return this._scrollAlignment;
  }
  public set scrollAlignment(value: VirtualScrollerAlignment) {
    this._scrollAlignment = value;
  }

  public get skipAccessibility(): boolean {
    return this._skipAccessibility;
  }
  public set skipAccessibility(value: boolean) {
    this._skipAccessibility = value;
    this._rerenderItems();
  }

  public get startIndex(): number {
    return this._startIndex;
  }
  public set startIndex(value: number) {
    this._startIndex = value;
  }

  public get throttle(): number {
    return this._throttle;
  }
  public set throttle(value: number) {
    this._throttle = value;
    this._initScrollListener();
  }

  // Exposed for possible style manipulation
  public get spacerElement(): HTMLElement {
    return this._spacerElement;
  }

  // Exposed for debugging
  public get renderedItemCount(): number {
    return this._itemsToRender.size;
  }
}
