import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import type { ReactiveController, ReactiveControllerHost } from 'lit';
import { InfiniteScrollController } from './infinite-scroll-controller.js';

class MockHost implements ReactiveControllerHost {
  public controllers: ReactiveController[] = [];
  public requestUpdate = vi.fn();
  public updateComplete = Promise.resolve(true);
  public addController(controller: ReactiveController): void {
    this.controllers.push(controller);
  }
  public removeController(): void {}
}

function createContainer({ scrollTop = 0, scrollHeight = 1000, clientHeight = 200 } = {}): HTMLElement {
  const container = document.createElement('div');
  const state = { scrollTop, scrollHeight, clientHeight };
  Object.defineProperties(container, {
    scrollTop: { get: () => state.scrollTop, set: (v: number) => (state.scrollTop = v), configurable: true },
    scrollHeight: { get: () => state.scrollHeight, configurable: true },
    clientHeight: { get: () => state.clientHeight, configurable: true }
  });
  return container;
}

function scrollTo(container: HTMLElement, top: number): void {
  container.scrollTop = top;
  container.dispatchEvent(new Event('scroll'));
}

describe('InfiniteScrollController', () => {
  let host: MockHost;
  let onLoadMore: Mock<() => void>;

  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    host = new MockHost();
    onLoadMore = vi.fn<() => void>();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should register itself with the host', () => {
    const controller = new InfiniteScrollController(host, { onLoadMore });

    expect(host.controllers).toContain(controller);
  });

  it('should default to not loading and having more results', () => {
    const controller = new InfiniteScrollController(host, { onLoadMore });

    expect(controller.isLoadingMore).toBe(false);
    expect(controller.hasMoreResults).toBe(true);
  });

  it('should load more after the debounce when scrolled within the threshold of the bottom', () => {
    const controller = new InfiniteScrollController(host, { onLoadMore });
    const container = createContainer();
    controller.attach(container);

    scrollTo(container, 750);
    expect(onLoadMore).not.toHaveBeenCalled();
    vi.advanceTimersByTime(150);

    expect(onLoadMore).toHaveBeenCalledTimes(1);
    expect(controller.isLoadingMore).toBe(true);
    expect(host.requestUpdate).toHaveBeenCalled();
  });

  it('should not load at a distance of 150 with the default threshold', () => {
    const controller = new InfiniteScrollController(host, { onLoadMore });
    const container = createContainer();
    controller.attach(container);

    scrollTo(container, 650);
    vi.advanceTimersByTime(500);

    expect(onLoadMore).not.toHaveBeenCalled();
  });

  it('should not load at a distance exactly equal to the threshold', () => {
    const controller = new InfiniteScrollController(host, { onLoadMore });
    const container = createContainer();
    controller.attach(container);

    scrollTo(container, 700);
    vi.advanceTimersByTime(500);

    expect(onLoadMore).not.toHaveBeenCalled();
  });

  it('should wait exactly the default 150ms debounce before loading', () => {
    const controller = new InfiniteScrollController(host, { onLoadMore });
    const container = createContainer();
    controller.attach(container);

    scrollTo(container, 750);
    vi.advanceTimersByTime(149);
    expect(onLoadMore).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);

    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it('should not load more when far from the bottom', () => {
    const controller = new InfiniteScrollController(host, { onLoadMore });
    const container = createContainer();
    controller.attach(container);

    scrollTo(container, 100);
    vi.advanceTimersByTime(500);

    expect(onLoadMore).not.toHaveBeenCalled();
  });

  it('should debounce rapid scroll events into one load', () => {
    const controller = new InfiniteScrollController(host, { onLoadMore });
    const container = createContainer();
    controller.attach(container);

    scrollTo(container, 700);
    vi.advanceTimersByTime(100);
    scrollTo(container, 750);
    vi.advanceTimersByTime(100);
    scrollTo(container, 790);
    vi.advanceTimersByTime(150);

    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it('should honor a custom debounce and scroll threshold', () => {
    const controller = new InfiniteScrollController(host, { onLoadMore, debounceMs: 50, scrollThreshold: 10 });
    const container = createContainer();
    controller.attach(container);

    scrollTo(container, 700);
    vi.advanceTimersByTime(50);
    expect(onLoadMore).not.toHaveBeenCalled();

    scrollTo(container, 795);
    vi.advanceTimersByTime(49);
    expect(onLoadMore).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it('should not load while a load is in flight', () => {
    const controller = new InfiniteScrollController(host, { onLoadMore });
    const container = createContainer();
    controller.attach(container);
    controller.setLoadingState(true);

    scrollTo(container, 790);
    vi.advanceTimersByTime(200);

    expect(onLoadMore).not.toHaveBeenCalled();
    expect(controller.isLoadingMore).toBe(true);
  });

  it('should not load when there are no more results', () => {
    const controller = new InfiniteScrollController(host, { onLoadMore });
    const container = createContainer();
    controller.attach(container);
    controller.setHasMore(false);

    scrollTo(container, 790);
    vi.advanceTimersByTime(200);

    expect(controller.hasMoreResults).toBe(false);
    expect(onLoadMore).not.toHaveBeenCalled();
    expect(host.requestUpdate).toHaveBeenCalled();
  });

  it('should not load twice for the same scroll position until reset', () => {
    const controller = new InfiniteScrollController(host, { onLoadMore });
    const container = createContainer();
    controller.attach(container);

    scrollTo(container, 790);
    vi.advanceTimersByTime(150);
    controller.setLoadingState(false);
    scrollTo(container, 790);
    vi.advanceTimersByTime(150);
    expect(onLoadMore).toHaveBeenCalledTimes(1);

    controller.reset();
    scrollTo(container, 790);
    vi.advanceTimersByTime(150);
    expect(onLoadMore).toHaveBeenCalledTimes(2);
  });

  it('should load again at a different scroll position after the previous load completes', () => {
    const controller = new InfiniteScrollController(host, { onLoadMore });
    const container = createContainer();
    controller.attach(container);

    scrollTo(container, 790);
    vi.advanceTimersByTime(150);
    controller.setLoadingState(false);
    scrollTo(container, 795);
    vi.advanceTimersByTime(150);

    expect(onLoadMore).toHaveBeenCalledTimes(2);
  });

  it('should cancel a pending scroll check when loading state is cleared', () => {
    const controller = new InfiniteScrollController(host, { onLoadMore });
    const container = createContainer();
    controller.attach(container);

    scrollTo(container, 790);
    controller.setLoadingState(false);
    vi.advanceTimersByTime(300);

    expect(onLoadMore).not.toHaveBeenCalled();
  });

  it('should reset loading and has-more state and request an update', () => {
    const controller = new InfiniteScrollController(host, { onLoadMore });
    controller.setLoadingState(true);
    controller.setHasMore(false);
    host.requestUpdate.mockClear();

    controller.reset();

    expect(controller.isLoadingMore).toBe(false);
    expect(controller.hasMoreResults).toBe(true);
    expect(host.requestUpdate).toHaveBeenCalledTimes(1);
  });

  it('should cancel a pending scroll check on reset', () => {
    const controller = new InfiniteScrollController(host, { onLoadMore });
    const container = createContainer();
    controller.attach(container);

    scrollTo(container, 790);
    controller.reset();
    vi.advanceTimersByTime(300);

    expect(onLoadMore).not.toHaveBeenCalled();
  });

  it('should ignore re-attaching the same container', () => {
    const controller = new InfiniteScrollController(host, { onLoadMore });
    const container = createContainer();
    const addSpy = vi.spyOn(container, 'addEventListener');

    controller.attach(container);
    controller.attach(container);

    expect(addSpy).toHaveBeenCalledTimes(1);
  });

  it('should stop listening to the previous container when attached to a new one', () => {
    const controller = new InfiniteScrollController(host, { onLoadMore });
    const first = createContainer();
    const second = createContainer();
    controller.attach(first);
    controller.attach(second);

    scrollTo(first, 790);
    vi.advanceTimersByTime(300);
    expect(onLoadMore).not.toHaveBeenCalled();

    scrollTo(second, 790);
    vi.advanceTimersByTime(150);
    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it('should stop listening after detach', () => {
    const controller = new InfiniteScrollController(host, { onLoadMore });
    const container = createContainer();
    controller.attach(container);

    controller.detach();
    scrollTo(container, 790);
    vi.advanceTimersByTime(300);

    expect(onLoadMore).not.toHaveBeenCalled();
  });

  it('should tolerate detach without an attached container', () => {
    const controller = new InfiniteScrollController(host, { onLoadMore });

    expect(() => controller.detach()).not.toThrow();
  });

  it('should detach and cancel pending checks when the host disconnects', () => {
    const controller = new InfiniteScrollController(host, { onLoadMore });
    const container = createContainer();
    controller.attach(container);

    scrollTo(container, 790);
    controller.hostDisconnected();
    vi.advanceTimersByTime(300);
    scrollTo(container, 795);
    vi.advanceTimersByTime(300);

    expect(onLoadMore).not.toHaveBeenCalled();
  });

  it('should provide a no-op hostConnected', () => {
    const controller = new InfiniteScrollController(host, { onLoadMore });

    expect(() => controller.hostConnected()).not.toThrow();
  });
});
