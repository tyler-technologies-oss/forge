import { throttle, toggleAttribute } from '@tylertech/forge-core';

export interface IVirtualScrollerOptions {
  appendOnly?: boolean;
  buffer?: number;
  insetBottom?: string;
  insetTop?: string;
  skipAccessibility?: boolean;
  startIndex?: number; // TODO: use `startIndex` to open the scroller with an element in view
}

export interface IVirtualScrollerChild {
  element: HTMLElement;
  index: number;
}

export type VirtualScrollerChildBuilder<T> = (data: T, index: number) => HTMLElement;

// TODO: prevent duplicate children when `appendOnly` is enabled

export class VirtualScroller<T> {
  // Configurable properties
  private _appendOnly = false;
  private _buffer = 10;
  private _data: T[];
  private _childBuilder: VirtualScrollerChildBuilder<T>;
  private _childHeight: number;
  private _insetBottom = '0px';
  private _insetTop = '0px';
  private _skipAccessibility = false;

  // Elements
  private _container: HTMLElement;
  private _spacer: HTMLElement = document.createElement('div');
  private _childrenToRender: IVirtualScrollerChild[] = [];

  // Data
  private _setSize: number;
  private _virtualHeight: number;
  private _scrollTop = 0;
  private _first = 0;
  private _last = 0;

  // Events
  private _scrollListener: (evt: Event) => void; // What's the type of a scroll event?

  // Getters
  private get _firstToRender(): number {
    return Math.max(0, this._first - this._buffer);
  }
  private get _lastToRender(): number {
    return Math.min(this._data.length - 1, this._last + this._buffer);
  }
  private get _numberOfChildrenToRender(): number {
    return Math.ceil(this._container.clientHeight / this._childHeight) + this._buffer * 2;
  }

  constructor(container: HTMLElement, data: T[], childBuilder: (data: T, index: number) => HTMLElement, childHeight: number, options?: IVirtualScrollerOptions) {
    this._applyContainer(container);
    this._data = [...data];
    this._childBuilder = childBuilder;
    this._childHeight = childHeight;

    this._appendOnly = options?.appendOnly ?? this._appendOnly;
    this._buffer = options?.buffer ?? this._buffer;
    this._skipAccessibility = options?.skipAccessibility ?? this._skipAccessibility;
    this._insetBottom = options?.insetBottom ?? this._insetBottom;
    this._insetTop = options?.insetTop ?? this._insetTop;

    this._setSize = this._data.length;
    this._virtualHeight = this._setSize * this._childHeight;

    this._configureSpacer();
    this._appendSpacer();

    this._scrollListener = throttle((evt: Event) => this._onScroll(evt), 100);
    this._registerScrollListener();
    this._layoutChildren();
  }

  public disconnect(): void {}

  private _registerScrollListener(): void {
    this._container.addEventListener('scroll', this._scrollListener);
  }

  private _onScroll(evt: Event): void {
    this._layoutChildren();
  }

  private _configureSpacer(): void {
    this._spacer.style.position = 'absolute';
    this._spacer.style.top = '0';
    this._spacer.style.left = '0';
    this._spacer.style.width = '1px';
    this._spacer.style.height = `${this._virtualHeight}px`;
    this._spacer.style.marginTop = this._insetTop;
    this._spacer.style.marginBottom = this._insetBottom;
    this._spacer.style.pointerEvents = 'none';
    toggleAttribute(this._spacer, true, 'aria-hidden', 'true');
  }

  private _appendSpacer(): void {
    this._container.append(this._spacer);
  }

  private _getChildTop(index: number): string {
    return `calc(${index * this._childHeight}px + ${this._insetTop})`;
  }

  private _createChildElement(index: number): HTMLElement {
    const element = this._childBuilder(this._data[index], index);
    element.style.position = 'absolute';
    element.style.left = '0';
    element.style.top = this._getChildTop(index);
    if (!this._skipAccessibility) {
      toggleAttribute(element, true, 'aria-setsize', this._setSize.toString());
      toggleAttribute(element, true, 'aria-posinset', (index + 1).toString());
    }
    return element;
  }

  private _getFirst(): number {
    return Math.floor(this._scrollTop / this._childHeight);
  }

  private _getLast(): number {
    const clientHeight = this._container.clientHeight;
    return Math.ceil(clientHeight / this._childHeight) + this._first;
  }

  private _layoutChildren(): void {
    this._scrollTop = this._container.scrollTop;
    this._first = this._getFirst();
    this._last = this._getLast();
    this._renderChildren();
  }

  // Prevent more children than necessary from being rendered when scrolling quickly
  private _capCountToRender(count: number): number {
    const cap = this._numberOfChildrenToRender;
    return count > cap ? cap : count;
  }

  private _renderChildren(): void {
    // Start with a child's index to ensure that min is within the set
    let min = this._childrenToRender[0]?.index ?? this._firstToRender;
    let max = 0;

    // Remove hidden children and get the min and max already rendered children
    for (let i = this._childrenToRender.length - 1; i >= 0; i-- ) {
      const child = this._childrenToRender[i];
      if (!this._appendOnly && (child.index < this._firstToRender || child.index > this._lastToRender)) {
        this._container.removeChild(child.element);
        this._childrenToRender.splice(i, 1);
      } else if (child.index < min) {
        min = child.index;
      } else if (child.index > max) {
        max = child.index;
      }
    }

    // Add children to the beginning of the list
    const firstToRender = this._firstToRender;
    if (min > firstToRender) {
      const count = this._capCountToRender(min - this._firstToRender);
      const start = firstToRender + count - 1;

      console.log({minCount: count, minStart: start, firstToRender});

      for (let i = start; i > this._firstToRender; i--) {
        console.log(i);
        this._prependChild(i);
      }
    }

    // Add children to the end of the list
    const lastToRender = this._lastToRender;
    if (max < this._lastToRender) {
      const count = this._capCountToRender(this._lastToRender - max);
      const start = lastToRender - count + 1;

      console.log({maxCount: count, maxStart: start, lastToRender});

      for (let i = start; i <= this._lastToRender; i++) {
        this._appendChild(i);
      }
    }

    // Add the first child to the list
    // The other loops miss this
    // The `some` lookup might be costly though
    if (firstToRender === 0 && this._data.length) {
      if (this._childrenToRender.some(child => child.index === 0)) {
        return;
      }
      this._prependChild(0);
    }
  }

  private _rerenderChildren(): void {
    // This might not work as expected if the childHeight or setSize has changed
    this._childrenToRender = this._childrenToRender.sort((a, b) => a.index - b.index);
    this._childrenToRender.forEach(child => {
      this._container.removeChild(child.element);
      child.element = this._createChildElement(child.index);
      this._container.append(child.element);
    });
  }

  private _prependChild(index: number): void {
    const child = this._createChildElement(index);
    this._container.prepend(child);
    this._childrenToRender.push({element: child, index});
  }

  private _appendChild(index: number): void {
    const child = this._createChildElement(index);
    this._container.append(child);
    this._childrenToRender.push({element: child, index});
  }

  /**
   * Apply functions
   */

  private _applyContainer(container: HTMLElement): void {
    this._container = container;
    this._container.style.overflowY = 'auto';
  }

  /**
   * Public getters and setters
   */

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

  public get data(): T[] {
    return this._data;
  }
  public set data(value: T[]) {
    this._data = [...value];
    this._setSize = this._data.length;
    this._virtualHeight = this._setSize * this._childHeight;
    this._rerenderChildren();
  }

  public get childBuilder(): VirtualScrollerChildBuilder<T> {
    return this._childBuilder;
  }
  public set childBuilder(value: VirtualScrollerChildBuilder<T>) {
    this._childBuilder = value;
    this._rerenderChildren();
  }

  public get childHeight(): number {
    return this._childHeight;
  }
  public set childHeight(value: number) {
    this._childHeight = value;
    this._virtualHeight = this._setSize * this._childHeight;
    this._rerenderChildren();
  }

  public get skipAccessibility(): boolean {
    return this._skipAccessibility;
  }
  public set skipAccessibility(value: boolean) {
    this._skipAccessibility = value;
    this._rerenderChildren();
  }

  public get insetBottom(): string {
    return this._insetBottom;
  }
  public set insetBottom(value: string) {
    this._insetBottom = value;
    this._spacer.style.marginBottom = this._insetBottom;
  }

  public get insetTop(): string {
    return this._insetTop;
  }
  public set insetTop(value: string) {
    this._insetTop = value;
    this._spacer.style.marginTop = this._insetTop;
    this._rerenderChildren();
  }

  // Exposed for possible style manipulation
  public get spacer(): HTMLElement {
    return this._spacer;
  }

  // Exposed for debugging
  public get actualChildCount(): number {
    return this._childrenToRender.length;
  }
}
