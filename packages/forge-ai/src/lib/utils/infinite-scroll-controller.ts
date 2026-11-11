import { ReactiveController, ReactiveControllerHost } from 'lit';

export interface InfiniteScrollControllerConfig {
  /** Callback when load-more conditions met */
  onLoadMore: () => void;
  /** Distance from bottom to trigger load (default: 100px) */
  scrollThreshold?: number;
  /** Debounce delay for scroll events (default: 150ms) */
  debounceMs?: number;
}

/**
 * Reactive controller for infinite scroll functionality.
 * Manages scroll detection, debouncing, and pagination state.
 */
export class InfiniteScrollController implements ReactiveController {
  #host: ReactiveControllerHost;
  #config: Required<InfiniteScrollControllerConfig>;
  #container: HTMLElement | null = null;
  #scrollDebounceTimeout?: number;
  #isLoadingMore = false;
  #hasMoreResults = true;
  #lastLoadScrollTop = -1;

  constructor(host: ReactiveControllerHost, config: InfiniteScrollControllerConfig) {
    this.#host = host;
    this.#config = {
      onLoadMore: config.onLoadMore,
      scrollThreshold: config.scrollThreshold ?? 100,
      debounceMs: config.debounceMs ?? 150
    };
    host.addController(this);
  }

  public hostConnected(): void {}

  public hostDisconnected(): void {
    this.detach();
    clearTimeout(this.#scrollDebounceTimeout);
  }

  /** Attach scroll listener to container element */
  public attach(container: HTMLElement): void {
    if (this.#container === container) {
      return;
    }

    this.detach();
    this.#container = container;
    this.#container.addEventListener('scroll', this.#handleScroll);
  }

  /** Remove scroll listener from current container */
  public detach(): void {
    if (this.#container) {
      this.#container.removeEventListener('scroll', this.#handleScroll);
      this.#container = null;
    }
  }

  /** Reset pagination state */
  public reset(): void {
    this.#isLoadingMore = false;
    this.#hasMoreResults = true;
    this.#lastLoadScrollTop = -1;
    clearTimeout(this.#scrollDebounceTimeout);
    this.#host.requestUpdate();
  }

  /** Set loading state (call when starting async load) */
  public setLoadingState(isLoading: boolean): void {
    this.#isLoadingMore = isLoading;
    if (!isLoading) {
      clearTimeout(this.#scrollDebounceTimeout);
    }
    this.#host.requestUpdate();
  }

  /** Set whether more results available (false = end of list) */
  public setHasMore(hasMore: boolean): void {
    this.#hasMoreResults = hasMore;
    this.#host.requestUpdate();
  }

  /** Current loading state */
  public get isLoadingMore(): boolean {
    return this.#isLoadingMore;
  }

  /** Whether more results available */
  public get hasMoreResults(): boolean {
    return this.#hasMoreResults;
  }

  #handleScroll = (): void => {
    clearTimeout(this.#scrollDebounceTimeout);
    this.#scrollDebounceTimeout = window.setTimeout(() => {
      this.#checkScrollPosition();
    }, this.#config.debounceMs);
  };

  #checkScrollPosition(): void {
    if (!this.#hasMoreResults || this.#isLoadingMore || !this.#container) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = this.#container;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    if (distanceFromBottom < this.#config.scrollThreshold) {
      if (this.#lastLoadScrollTop === scrollTop) {
        return;
      }

      this.#lastLoadScrollTop = scrollTop;
      this.#isLoadingMore = true;
      clearTimeout(this.#scrollDebounceTimeout);
      this.#host.requestUpdate();
      this.#config.onLoadMore();
    }
  }
}
