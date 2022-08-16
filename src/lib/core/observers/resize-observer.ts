export abstract class ForgeResizeObserver {
  private static _observer?: ResizeObserver;
  private static _targets: Map<Element, (entry: ResizeObserverEntry) => unknown> = new Map();

  /**
   * Initiates the observing of a specified `Element`. Calling with an already observed `Element`
   * overwrites the exisiting observation. 
   * 
   * @param target An `Element` reference.
   * @param callback A function that accepts a `ResizeObserverEntry` for the `Element`.
   * @param options An options object allowing you to set options for the observation.
   * @returns `true` if the `Element` was successfully observed or `false` if the browser does not
   * support `ResizeObserver`.
   */

  public static observe(target: Element, callback: (entry: ResizeObserverEntry) => unknown, options?: { box: 'content-box' | 'border-box' | 'device-pixel-content-box' }): boolean {
    if (!ForgeResizeObserver._supportedByBrowser) {
      console.warn('The supplied element could not be observed. The browser does not support ResizeObserver.');
      return false;
    }

    if (ForgeResizeObserver._targets.has(target)) {
      ForgeResizeObserver._observer?.unobserve(target);
    }

    ForgeResizeObserver._targets.set(target, callback);
    ForgeResizeObserver._countTargets();
    ForgeResizeObserver._observer?.observe(target, options);

    return true;
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

  /**
   * Checks whether the browser supports `ResizeObserver`.
   * 
   * @returns `true` if the broswer supports `ResizeObserver`, otherwise `false`.
   */
  private static _supportedByBrowser(): boolean {
    return 'ResizeObserver' in window;
  }
}
