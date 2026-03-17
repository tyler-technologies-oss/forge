import { ForgeResizeObserverCallback, IResizeObserverOptions } from './resize-types.js';

/**
 * Provides a set of methods for observing and responding to resizing of elements.
 */
export abstract class ForgeResizeObserver {
  private static _observer?: ResizeObserver;
  private static _targets: Map<Element, ForgeResizeObserverCallback> = new Map();

  /**
   * Initiates the observing of a specified `Element`. Calling with an already observed `Element`
   * overwrites the exisiting observation. It is expected that the consumer will eventually
   * {@link unobserve} the `Element` to avoid memory leaks.
   *
   * @param target An `Element` reference.
   * @param callback A function that accepts a `ResizeObserverEntry` for the `Element`.
   * @param options An options object allowing you to set options for the observation.
   */
  public static observe(target: Element, callback: ForgeResizeObserverCallback, options?: IResizeObserverOptions): void {
    if (ForgeResizeObserver._targets.has(target)) {
      ForgeResizeObserver._observer?.unobserve(target);
    }

    ForgeResizeObserver._targets.set(target, callback);
    ForgeResizeObserver._countTargets();
    ForgeResizeObserver._observer?.observe(target, options);
  }

  /**
   * Ends the observing of a specified `Element`.
   *
   * @param target An `Element` reference.
   */
  public static unobserve(target: Element): void {
    ForgeResizeObserver._targets.delete(target);
    ForgeResizeObserver._observer?.unobserve(target);
    ForgeResizeObserver._countTargets();
  }

  /**
   * Creates or destroys the `ResizeObserver` based on whether targets exist.
   */
  private static _countTargets(): void {
    if (ForgeResizeObserver._observer) {
      // If there are no targets destroy the observer
      if (ForgeResizeObserver._targets.size < 1) {
        ForgeResizeObserver._observer = undefined;
      }
    } else {
      // If there are targets create the observer
      if (ForgeResizeObserver._targets.size) {
        ForgeResizeObserver._observer = new ResizeObserver(ForgeResizeObserver._handleResize);
      }
    }
  }

  /**
   * Runs the callback function of targets when they are resized.
   *
   * @param entries An array of `ResizeObserverEntry`s.
   */
  private static _handleResize: ResizeObserverCallback = entries => {
    entries.forEach(entry => {
      ForgeResizeObserver._targets.get(entry.target)?.(entry);
    });
  };
}
