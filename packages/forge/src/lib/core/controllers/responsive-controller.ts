import type { ReactiveController, ReactiveControllerHost } from 'lit';
import { ForgeResizeObserver, throttle } from '@tylertech/forge-core';

/** The default delay in milliseconds to throttle resize events. */
export const RESPONSIVE_CONTROLLER_DEFAULT_DELAY = 100;

export interface ResponsiveControllerConfig<T> {
  /** Computes the current responsive state from the host's layout. Called after the host has rendered. */
  measure: () => T;
  /** Called only when `measure` returns a value different from the previous one. */
  onChange: (state: T, previous: T | undefined) => void;
  /** The delay in milliseconds to throttle resize events. */
  delay?: number;
}

/**
 * Observes the host's size and re-measures a responsive state, notifying only when that state changes.
 *
 * Measurement is throttled and deferred to an animation frame for resize events. Use `measure()` to
 * measure synchronously (e.g. from `slotchange`) and `schedule()` to request a throttled measurement.
 */
export class ResponsiveController<T> implements ReactiveController {
  readonly #host: ReactiveControllerHost & HTMLElement;
  readonly #config: ResponsiveControllerConfig<T>;
  #throttledMeasure: () => void;
  #state: T | undefined;

  constructor(host: ReactiveControllerHost & HTMLElement, config: ResponsiveControllerConfig<T>) {
    this.#host = host;
    this.#config = config;
    this.#throttledMeasure = this.#createThrottledMeasure(config.delay);
    host.addController(this);
  }

  /** The most recently measured state, or `undefined` if not yet measured. */
  public get state(): T | undefined {
    return this.#state;
  }

  public hostConnected(): void {
    ForgeResizeObserver.observe(this.#host, this.schedule);
  }

  public hostDisconnected(): void {
    ForgeResizeObserver.unobserve(this.#host);
    this.#state = undefined;
  }

  /** Updates the resize throttle delay in milliseconds. */
  public setDelay(delay: number): void {
    this.#throttledMeasure = this.#createThrottledMeasure(delay);
  }

  /** Requests a throttled measurement. */
  public schedule = (): void => {
    this.#throttledMeasure();
  };

  /** Measures immediately and notifies if the state changed. */
  public measure(): void {
    const next = this.#config.measure();
    if (next === this.#state) {
      return;
    }
    const previous = this.#state;
    this.#state = next;
    this.#config.onChange(next, previous);
  }

  #createThrottledMeasure(delay = RESPONSIVE_CONTROLLER_DEFAULT_DELAY): () => void {
    return throttle(() => requestAnimationFrame(() => this.measure()), delay);
  }
}
