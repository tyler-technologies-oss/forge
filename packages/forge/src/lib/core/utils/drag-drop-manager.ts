import { randomChars } from '@tylertech/forge-core';

declare global {
  interface Window {
    [DRAG_DROP_MANAGER_SYMBOL]?: DragDropManager;
  }
}

const DRAG_DROP_MANAGER_SYMBOL = Symbol('forgeDragDropManager');

export type DragDropSubscriberFn = (event?: DragEvent) => void;

export interface DragDropSubscriberConfig {
  start?: DragDropSubscriberFn;
  end?: DragDropSubscriberFn;
}

/**
 * A singleton service that manages shared state for drag and drop operations.
 *
 * This manager provides a centralized store for drag and drop state that can be accessed
 * by both DragController and DropController instances. It eliminates the need for manual
 * serialization/deserialization through the DataTransfer API.
 *
 * The manager is stored on the window object using a Symbol to avoid naming conflicts
 * and ensure proper isolation per window/iframe context.
 *
 * @example
 * const manager = DragDropManager.instance;
 * console.log(manager.item); // Currently dragged element
 * console.log(manager.source); // Source container of the drag operation
 * console.log(manager.target); // Current drop target
 */
export class DragDropManager {
  #item: HTMLElement | null = null;
  #source: HTMLElement | null = null;
  #target: HTMLElement | null = null;
  #currentOperation: string | null = null;
  #subscribers: Set<DragDropSubscriberConfig> = new Set();

  /**
   * Gets the singleton instance of the DragDropManager.
   * Creates a new instance if one doesn't exist for the current window.
   */
  public static get instance(): DragDropManager {
    if (!window[DRAG_DROP_MANAGER_SYMBOL]) {
      window[DRAG_DROP_MANAGER_SYMBOL] = new DragDropManager();
    }
    return window[DRAG_DROP_MANAGER_SYMBOL];
  }

  /**
   * Gets the currently dragged item element.
   * Returns null when no drag operation is active.
   */
  public get item(): HTMLElement | null {
    return this.#item;
  }

  /**
   * Gets the source element (ancestor/container) of the drag operation.
   * Returns null when no drag operation is active.
   */
  public get source(): HTMLElement | null {
    return this.#source;
  }

  /**
   * Gets the current drop target element.
   * Returns null when no valid drop target is active.
   */
  public get target(): HTMLElement | null {
    return this.#target;
  }

  /**
   * Sets the currently dragged item element.
   * @internal This method is intended for use only by DragController.
   */
  public setItem(item: HTMLElement | null): void {
    this.#item = item;
  }

  /**
   * Sets the source element (ancestor/container) of the drag operation.
   * @internal This method is intended for use only by DragController.
   */
  public setSource(source: HTMLElement | null): void {
    this.#source = source;
  }

  /**
   * Sets the current drop target element.
   * @internal This method is intended for use only by DropController.
   */
  public setTarget(target: HTMLElement | null): void {
    this.#target = target;
  }

  /**
   * Starts a new drag and drop operation by generating a unique operation ID.
   * This ID can be used to track the operation across multiple drag and drop events.
   * @internal This method is intended for use only by DragController.
   */
  public startOperation(event?: DragEvent): void {
    this.#currentOperation = randomChars(8);
    this.#notifySubscribers('start', event);
  }

  /**
   * Ends the current drag and drop operation by clearing the operation ID.
   * @internal This method is intended for use only by DragController and DropController.
   */
  public endOperation(event?: DragEvent): void {
    this.#notifySubscribers('end', event);
    this.#item = null;
    this.#source = null;
    this.#target = null;
    this.#currentOperation = null;
  }

  /**
   * Gets the unique ID of the current drag and drop operation.
   * Returns null when no operation is active.
   */
  public get currentOperation(): string | null {
    return this.#currentOperation;
  }

  /**
   * Subscribes to drag and drop operation events. Subscribers will be notified when a drag
   * operation starts or ends.
   * @param subscriber The subscriber configuration object containing start and/or end callbacks.
   * @returns A function to unsubscribe the subscriber.
   */
  public subscribe(subscriber: DragDropSubscriberConfig): () => void {
    this.#subscribers.add(subscriber);
    return () => {
      this.#subscribers.delete(subscriber);
    };
  }

  #notifySubscribers(eventType: 'start' | 'end', event?: DragEvent): void {
    this.#subscribers.forEach(subscriber => {
      if (eventType === 'start' && subscriber.start) {
        subscriber.start(event);
      } else if (eventType === 'end' && subscriber.end) {
        subscriber.end(event);
      }
    });
  }
}
