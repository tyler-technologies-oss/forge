import { elementScroll, observeElementOffset, observeElementRect, Virtualizer as TanStackVirtualizer } from '@tanstack/virtual-core';
import { EstimateSizeCallback, VirtualizerDirection, VirtualItem } from './virtualizer-constants';
import { debounce } from '@tylertech/forge-core';

export type VirtualizerChangeCallback = (virtualizer: IVirtualizer) => void;

export interface IVirtualizer {
  scrollElement: HTMLElement | null;
  count: number;
  buffer: number;
  direction: VirtualizerDirection;
  gap: number;
  disabled: boolean;
  estimateSize: EstimateSizeCallback;
  onChange: VirtualizerChangeCallback | null;
  readonly items: VirtualItem[];
  readonly totalSize: number;
  measure(): void;
  measureElement(element: HTMLElement): void;
}

export class Virtualizer implements IVirtualizer {
  public static positionItem(item: VirtualItem, element: HTMLElement, direction: VirtualizerDirection, dynamic = false): void {
    const style = element.style;
    style.position = 'absolute';
    style.top = '0';
    style.left = '0';
    style.transform = `translate${direction === 'horizontal' ? 'X' : 'Y'}(${item.start}px)`;
    if (dynamic) {
      style.width = 'initial';
      style.height = 'initial';
    } else if (direction === 'horizontal') {
      style.width = `${item.size}px`;
    } else {
      style.height = `${item.size}px`;
    }
  }

  private _scrollElement: HTMLElement | null = null;
  private _count = 0;
  private _buffer = 5;
  private _direction: VirtualizerDirection = 'vertical';
  private _gap = 0;
  private _disabled = false;
  private _estimateSize: EstimateSizeCallback = () => 0;
  private _onChange: VirtualizerChangeCallback | null = null;

  private _virtualizer: TanStackVirtualizer<HTMLElement, HTMLElement>;

  constructor(config?: Partial<IVirtualizer>) {
    Object.entries(config ?? {}).forEach(([key, value]) => {
      (this as any)[`_${key}`] = value;
    });
    this._initializeVirtualizer();
  }

  //
  // Public API
  //

  /**
   * Returns the virtual items to be rendered.
   */
  public get items(): VirtualItem[] {
    return this._virtualizer.getVirtualItems();
  }

  /**
   * Returns the total size of all virtual items.
   */
  public get totalSize(): number {
    return this._virtualizer.getTotalSize();
  }

  /**
   * Recalculates the size and placement of all virtual items.
   */
  public measure(): void {
    this._virtualizer.measure();
  }

  /**
   * Measures an element as rendered. Use this when an element's size has changed to update the virtualizer.
   *
   * @param element An element rendered as a virtual item.
   */
  public measureElement(element: HTMLElement): void {
    this._virtualizer.measureElement(element);
  }

  /**
   * The scrolling element virtual items are rendered in.
   */
  public get scrollElement(): HTMLElement | null {
    return this._scrollElement;
  }
  public set scrollElement(value: HTMLElement | null) {
    this._scrollElement = value;
    this._virtualizer.options.getScrollElement = () => this._scrollElement;
    this._requestUpdate();
  }

  /**
   * The total number of virtual items.
   */
  public get count(): number {
    return this._count;
  }
  public set count(value: number) {
    this._count = value;
    this._virtualizer.options.count = value;
    this._requestUpdate();
  }

  /**
   * The number of virtual items to render outside the visible area.
   */
  public get buffer(): number {
    return this._buffer;
  }
  public set buffer(value: number) {
    this._buffer = value;
    this._virtualizer.options.overscan = value;
    this._requestUpdate();
  }

  /**
   * Whether the virtualizer scrolls horizontally or vertically.
   */
  public get direction(): VirtualizerDirection {
    return this._direction;
  }
  public set direction(value: VirtualizerDirection) {
    this._direction = value;
    this._virtualizer.options.horizontal = value === 'horizontal';
    this._requestUpdate();
  }

  /**
   * The space in pixels between items.
   */
  public get gap(): number {
    return this._gap;
  }
  public set gap(value: number) {
    this._gap = value;
    this._virtualizer.options.gap = value;
    this._requestUpdate();
  }

  /**
   * Whether the virtualizer is disabled.
   */
  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    this._disabled = value;
    this._virtualizer.options.enabled = !value;
    this._requestUpdate();
  }

  /**
   * A function that estimates the size of a virtual item at a given index.
   */
  public get estimateSize(): EstimateSizeCallback {
    return this._estimateSize;
  }
  public set estimateSize(value: EstimateSizeCallback) {
    this._estimateSize = value;
    this._virtualizer.options.estimateSize = value;
    this._requestUpdate();
  }

  /**
   * A callback that fires when the set of rendered items changes.
   */
  public get onChange(): VirtualizerChangeCallback | null {
    return this._onChange;
  }
  public set onChange(value: VirtualizerChangeCallback | null) {
    this._onChange = value;
    this._requestUpdate();
  }

  //
  // Internal Logic
  //

  private _initializeVirtualizer(): void {
    this._virtualizer = new TanStackVirtualizer({
      getScrollElement: () => this._scrollElement,
      count: this.count,
      overscan: this.buffer,
      horizontal: this.direction === 'horizontal',
      gap: this.gap,
      enabled: !this.disabled,
      estimateSize: this.estimateSize.bind(this),
      onChange: () => this.onChange?.(this),
      observeElementRect,
      observeElementOffset,
      scrollToFn: elementScroll
    });
    this._virtualizer._willUpdate();
  }

  private _requestUpdate = debounce(() => this._virtualizer.measure(), 0);
}
