import { Deferred } from './deferred';
import { task } from './utils';

// The symbol to use for the tryDismiss method on dismissible elements
export const tryDismiss = Symbol('tryDismiss');

// The key to use for storing the dismissible stack on the window object
const DISMISSIBLE_STACK_INSTANCE_KEY = Symbol('forgeDismissibleStack');

export interface IDismissibleStackState<T = string> {
  [key: string]: T;
}

export interface IDismissible extends HTMLElement {
  [tryDismiss](state?: IDismissibleStackState): boolean;
}

declare global {
  interface Window {
    [DISMISSIBLE_STACK_INSTANCE_KEY]: DismissibleStack<IDismissible>;
  }
}

export class DismissibleStack<T extends IDismissible> {
  private _deferredDismiss: Deferred | undefined;

  /**
   * A promise that resolves when all elements in the stack have finished dismissing.
   *
   * Resolves immediately if there are no elements in the stack.
   */
  public get dismissing(): Promise<void> {
    return this._deferredDismiss?.promise ?? Promise.resolve();
  }

  /**
   * A set of all elements that are currently eligible for dismissal.
   *
   * Typically used when a user is force dismissing an element, such as when they click
   * an element that triggered it to open.
   */
  private _dismissibleElements = new Set<T>();

  /**
   * A map of all elements that are requesting to be dismissed, and the state that they
   * are requesting to dismiss with.
   *
   * This is used to queue up dismiss requests so that we can wait for all other elements
   * to dispatch their dismiss events, typically used with light dismiss.
   */
  private _elementsRequestingDismiss = new Map<T, IDismissibleStackState | undefined>();

  private constructor() {}

  public static get instance(): DismissibleStack<IDismissible> {
    // We store our instance on the window object so that it can be shared across multiple
    // instances of Forge components
    if (!window[DISMISSIBLE_STACK_INSTANCE_KEY]) {
      window[DISMISSIBLE_STACK_INSTANCE_KEY] = new DismissibleStack();
    }
    return window[DISMISSIBLE_STACK_INSTANCE_KEY];
  }

  /**
   * Dismisses all elements in the stack that are descendants and have been presented after the provided element.
   * @param el The element to dismiss
   * @param state The state to pass to the dismiss method of each element
   */
  public async dismiss(el: T, state: IDismissibleStackState): Promise<void> {
    const elements = DismissibleStack.instance.getAll();
    const elementsAfter = elements
      .slice(elements.indexOf(el))
      .filter(element => element === el || element.contains(el))
      .reverse();
    for (const element of elementsAfter) {
      if (!element[tryDismiss](state)) {
        break;
      }
    }
  }

  /**
   * Queues an element to be dismissed. This allows for us to asynchronously wait for all
   * other elements to dispatch their dismiss events so that consumers can cancel the dismiss
   * if they want to, without closing their parent dismissible elements.
   * @param el
   * @param dismissState
   * @returns
   */
  public async requestDismiss(el: T, dismissState: IDismissibleStackState): Promise<void> {
    if (!this._deferredDismiss) {
      this._deferredDismiss = new Deferred();
    }

    this._elementsRequestingDismiss.set(el, dismissState);

    // Wait for all other element to finish queuing their dismiss events
    await task();

    // The first element to call this method will handle attempting to dismiss the rest of
    // elements, and will clear the queue when it is done. All other subsequent elements will
    // just return here if called within the same task.
    if (!this.isRequestingLightDismiss(el)) {
      return;
    }

    // Get all elements that are requesting to be dismissed, and reverse the order so that
    // we can attempt to dismiss them in a top-down order (most recently opened first)
    const elements = Array.from(this._elementsRequestingDismiss).reverse();

    // Clear all elements from the stack since we are don't need references to them anymore
    this._elementsRequestingDismiss.clear();

    // Attempt to dismiss each element in the queue (most recently opened first), if any of
    // them are prevented, stop trying to dismiss the rest
    try {
      for (const [element, state] of elements) {
        if (!element[tryDismiss](state)) {
          break;
        }
      }
    } finally {
      this._deferredDismiss?.resolve();
      this._deferredDismiss = undefined;
    }
  }

  /**
   * Adds an element to the dismissible queue.
   *
   * Use this when an element is opened and should be eligible for dismissal in a stack of other
   * dismissible elements.
   */
  public add(el: T): void {
    this._dismissibleElements.add(el);
  }

  /**
   * Removes an element from the dismissible queue.
   *
   * Use this when an element is closed and should no longer be eligible for dismissal in a stack.
   */
  public remove(el: T): void {
    this._dismissibleElements.delete(el);
    this._elementsRequestingDismiss.delete(el);
  }

  /**
   * Checks if an element is in the dismissible queue.
   */
  public has(el: T): boolean {
    return this._dismissibleElements.has(el);
  }

  /**
   * Checks if an element is requesting to be dismissed.
   */
  public isRequestingLightDismiss(el: T): boolean {
    return this._elementsRequestingDismiss.has(el);
  }

  /**
   * Checks if an element is the most recent element in the dismissible queue.
   * @param el The element to check.
   * @returns
   */
  public isMostRecent(el: T): boolean {
    const elements = Array.from(this._dismissibleElements);
    return elements[elements.length - 1] === el;
  }

  /**
   * Gets all elements in the dismissible queue.
   * @returns An array of all elements in the dismissible queue.
   */
  public getAll(): T[] {
    return Array.from(this._dismissibleElements);
  }
}
