import { EventAware, IEventAware } from '../events/event-aware.js';
import { ScrollAxis, IScrollObserverConfiguration, ScrollEvents, IScrollInfo, ScrollDirection } from './scroll-types.js';
import { isDefined, throttle, isNumber } from '../utils/index.js';

const DEFAULT_SCROLL_THROTTLE = 100;

export interface IScrollAxisObserver extends IEventAware {
  scrollPosition: number;
  isScrolled: boolean;
  isScrolledStart: boolean;
  isScrolledEnd: boolean;
  isScrollable: boolean;
  scrollSize: number;
  elementSize: number;
  setScrollPosition(position: number): void;
  destroy(): void;
  start(): void;
  stop(): void;
}

/**
 * Provides facilties for observing and reacting to scroll events and information on a given element.
 */
export class ScrollAxisObserver extends EventAware implements IScrollAxisObserver {
  private _axis: ScrollAxis = 'vertical';
  private _scrollThreshold = 0;
  private _lastScrollPosition = 0;
  private _lastScrollTop = 0;
  private _lastScrollLeft = 0;
  private _isListening = false;
  private _scrollListener: (evt: Event) => void;

  constructor(
    private _element: HTMLElement,
    private _config: IScrollObserverConfiguration = {}
  ) {
    super();
    this._initialize();
  }

  public destroy(): void {
    this.stop();
  }

  public start(): void {
    if (!this._isListening) {
      this._element.addEventListener('scroll', this._scrollListener);
      this._isListening = true;
    }
  }

  public stop(): void {
    this._element.removeEventListener('scroll', this._scrollListener);
    this._isListening = false;
  }

  private _initialize(): void {
    if (this._config.throttle) {
      const wait = this._config.throttleTime || DEFAULT_SCROLL_THROTTLE;
      this._scrollListener = throttle(() => this._onScroll(), wait);
    } else {
      this._scrollListener = () => this._onScroll();
    }

    if (!isDefined(this._config.paused) || !this._config.paused) {
      this.start();
    }

    if (isDefined(this._config.axis)) {
      this._axis = this._config.axis as ScrollAxis;
    }

    if (isDefined(this._config.scrollThreshold) && isNumber(this._config.scrollThreshold)) {
      this._scrollThreshold = this._config.scrollThreshold;
    }
  }

  private _isScrollAxis(): boolean {
    const isVertical = this._lastScrollTop !== this._element.scrollTop;
    const isHorizontal = this._lastScrollLeft !== this._element.scrollLeft;
    return (this._axis === 'vertical' && isVertical) || (this._axis === 'horizontal' && isHorizontal);
  }

  private _onScroll(): void {
    if (!this._isScrollAxis()) {
      return;
    }

    const position = this.scrollPosition;
    const direction =
      this._lastScrollPosition - position < 0
        ? this._axis === 'vertical'
          ? ScrollDirection.Down
          : ScrollDirection.Right
        : this._axis === 'vertical'
          ? ScrollDirection.Up
          : ScrollDirection.Left;
    this._emit(ScrollEvents.Scroll, { direction, position } as IScrollInfo);

    if (this._lastScrollPosition <= this._scrollThreshold && position > this._scrollThreshold) {
      this._emit(ScrollEvents.Scrolled, true);
    } else if (this._lastScrollPosition >= this._scrollThreshold && (this._scrollThreshold > 0 ? position < this._scrollThreshold : position === 0)) {
      this._emit(ScrollEvents.Scrolled, false);
    }

    const scrollStart = Math.round(position - this._scrollThreshold);
    const scrollEnd = Math.round(this.scrollSize - position);

    if (this._lastScrollPosition >= this._scrollThreshold && scrollStart <= 0) {
      this._emit(ScrollEvents.ScrolledStart);
    } else if (this._lastScrollPosition <= this.scrollSize - this._scrollThreshold && scrollEnd <= this._scrollThreshold) {
      this._emit(ScrollEvents.ScrolledEnd);
    }

    this._lastScrollPosition = position || 0;
    this._lastScrollTop = this._element.scrollTop || 0;
    this._lastScrollLeft = this._element.scrollLeft || 0;
  }

  public get scrollPosition(): number {
    return this._axis === 'vertical' ? this._element.scrollTop : this._element.scrollLeft;
  }

  public get isScrolled(): boolean {
    return this.scrollPosition > this._scrollThreshold;
  }

  public get isScrolledStart(): boolean {
    return this.scrollPosition === 0;
  }

  public get isScrolledEnd(): boolean {
    return this.scrollPosition === this._element.scrollWidth;
  }

  public get isScrollable(): boolean {
    if (this._axis === 'vertical') {
      return this._element.scrollHeight > this._element.clientHeight;
    }
    return this._element.scrollWidth > this._element.clientWidth;
  }

  public get scrollSize(): number {
    return (this._axis === 'vertical' ? this._element.scrollHeight : this._element.scrollWidth) - this.elementSize;
  }

  public get elementSize(): number {
    return this._axis === 'vertical' ? this._element.clientHeight : this._element.clientWidth;
  }

  public setScrollPosition(position: number): void {
    if (this._axis === 'vertical') {
      this._element.scrollTop = position;
    } else {
      this._element.scrollLeft = position;
    }
  }
}
