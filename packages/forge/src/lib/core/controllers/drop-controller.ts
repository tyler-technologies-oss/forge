import { throttle } from '@tylertech/forge-core';
import { ReactiveController, ReactiveControllerHost, ReactiveElement } from 'lit';
import { DragDropManager } from '../utils/drag-drop-manager.js';

export interface DropEventArgs {
  event: DragEvent;
  item: HTMLElement | null;
  target: HTMLElement | null;
  source: HTMLElement | null;
  index: number;
}

/**
 * Configuration interface for the drop controller.
 */
export interface DropControllerConfig {
  /**
   * Callback to retrieve the actual drop target from the event target.
   * This allows traversing from a descendant element to find the semantic drop zone.
   *
   * @param targetElement - The element that triggered the drag event
   * @param event - The drag event
   * @returns The element to use as drop target, or null to reject the drop
   *
   * @example
   * // In a listbox, use the listbox itself as the drop target
   * getDropTarget: ({ targetElement }) => targetElement.closest('forge-listbox')
   */
  getDropTarget?: (event: DragEvent) => HTMLElement | null;

  /**
   * Callback to calculate the insertion index based on the drag event.
   * @param event - The drag event
   * @returns The index at which the dragged item should be inserted.
   */
  getIndex?: (event: DragEvent) => number;

  /**
   * Callback invoked when a drag operation starts.
   * @param args - Event details including dataTransfer, coordinates, and insertion index
   * @returns Return true to allow the drag, false to cancel it, or undefined to use the default behavior
   */
  onDragStart?: (args: DropEventArgs) => boolean | undefined;

  /**
   * Callback invoked when a dragged item enters the drop zone.
   * @param args - Event details including dataTransfer, coordinates, and insertion index
   */
  onDragEnter?: (args: DropEventArgs) => void;

  /**
   * Callback invoked while a dragged item is over the drop zone.
   * Called repeatedly as the mouse moves.
   * @param args - Event details including dataTransfer, coordinates, and insertion index
   */
  onDragOver?: (args: DropEventArgs) => void;

  /**
   * Callback invoked when a dragged item leaves the drop zone.
   * @param args - Event details including dataTransfer
   */
  onDragLeave?: (args: DropEventArgs) => void;

  /**
   * Callback invoked when a drag operation ends, regardless of whether it was dropped or canceled.
   * @param args - Event details including dataTransfer
   */
  onDragEnd?: (args: DropEventArgs) => void;

  /**
   * Callback invoked when an item is dropped on the drop zone.
   * @param args - Event details including dataTransfer, coordinates, and insertion index
   */
  onDrop?: (args: DropEventArgs) => void;

  /**
   * The drop effect to indicate what operation will occur.
   * @default 'move'
   */
  dropEffect?: DataTransfer['dropEffect'];

  /**
   * CSS selector for querying children of the drop target.
   * Used to calculate insertion index.
   * @default '*'
   */
  childSelector?: string;

  /**
   * Orientation for calculating insertion position.
   * @default 'vertical'
   */
  orientation?: 'vertical' | 'horizontal';

  /**
   * Throttle time in milliseconds for the onDragOver callback.
   * The dragover event fires frequently, so throttling can improve performance.
   * The insertion index calculation and preventDefault are not throttled.
   * @default 100
   */
  throttle?: number;
}

/**
 * A Lit controller for handling HTML5 drop operations on the host element.
 *
 * This controller listens for drag events on the host element and provides callbacks
 * for handling drop operations. It automatically calculates the insertion index based
 * on cursor position and creates a placeholder element for visual feedback.
 *
 * The placeholder element is exposed via `controller.placeholder` and must be manually
 * inserted into the host component's template at the position indicated by
 * `controller.insertionIndex`.
 *
 * @example
 * class ListboxComponent extends LitElement {
 *   #dropController = new DropController(this, {
 *     childSelector: 'forge-option',
 *     orientation: 'vertical',
 *
 *     onDragEnter: () => {
 *       this.requestUpdate(); // Trigger re-render to show placeholder
 *     },
 *
 *     onDragOver: () => {
 *       this.requestUpdate(); // Update placeholder position
 *     },
 *
 *     onDrop: ({ dataTransfer, insertionIndex }) => {
 *       const value = dataTransfer.getData('text/plain');
 *       this.#insertOption(value, insertionIndex);
 *       this.requestUpdate();
 *     },
 *
 *     dropEffect: 'move'
 *   });
 *
 *   public render(): TemplateResult {
 *     const options = this.#getOptions();
 *     const placeholder = this.#dropController.placeholder;
 *     const insertionIndex = this.#dropController.insertionIndex;
 *
 *     return html`
 *       ${options.map((opt, idx) => html`
 *         ${placeholder && insertionIndex === idx ? placeholder : nothing}
 *         ${opt}
 *       `)}
 *       ${placeholder && insertionIndex === options.length ? placeholder : nothing}
 *     `;
 *   }
 * }
 */
export class DropController implements ReactiveController {
  public host: ReactiveControllerHost & ReactiveElement;

  #config: DropControllerConfig;
  #enabled = true;
  #dragDepth = 0;
  #preventDrop = false;
  #insertionIndex: number | null = null;
  #throttledDragOverCallback: ((args: DropEventArgs) => void) | null = null;
  #dragEnterListener = (event: DragEvent): void => this.#handleDragEnter(event);
  #dragOverListener = (event: DragEvent): void => this.#handleDragOver(event);
  #dragLeaveListener = (event: DragEvent): void => this.#handleDragLeave(event);
  #dropListener = (event: DragEvent): void => this.#handleDrop(event);
  #manager = DragDropManager.instance;
  #subscription: ReturnType<typeof DragDropManager.instance.subscribe> | null = null;

  constructor(host: ReactiveControllerHost & ReactiveElement, config: DropControllerConfig = {}) {
    this.host = host;
    this.#config = config;
    this.#initializeThrottledCallback();
    host.addController(this);
  }

  public hostConnected(): void {
    this.#attachListeners();

    // Subscribe to drag start and end events from the DragDropManager
    this.#subscription = this.#manager.subscribe({
      start: event => {
        if (event) {
          this.#handleDragStart(event);
        }
      },
      end: event => {
        if (event) {
          this.#handleDragEnd(event);
        }
      }
    });
  }

  public hostDisconnected(): void {
    this.#detachListeners();

    // Reset all state
    this.#dragDepth = 0;
    this.#insertionIndex = null;
    this.#subscription?.();
    this.#subscription = null;
  }

  /**
   * Updates the controller configuration.
   * @param config - Partial configuration to merge with existing config
   */
  public updateConfig(config: Partial<DropControllerConfig>): void {
    this.#config = { ...this.#config, ...config };
    this.#initializeThrottledCallback();
  }

  /**
   * Enables or disables the drop controller.
   * @param enabled - Whether the controller should handle drop events
   */
  public setEnabled(enabled: boolean): void {
    this.#enabled = enabled;
  }

  /**
   * Prevents the current drop operation from being accepted. Call this during the `onDragEnter`
   * callback to prevent future events from being handled until the drag leaves the drop target or
   * ends.
   */
  public preventDrop(): void {
    this.#preventDrop = true;
  }

  /**
   * Gets the current drop target element.
   */
  public get dropTarget(): HTMLElement | null {
    return this.#manager.target;
  }

  /**
   * Gets the calculated insertion index among the drop target's children.
   * This indicates where the dragged item should be inserted.
   * Returns null when no drag operation is active.
   */
  public get insertionIndex(): number | null {
    return this.#insertionIndex;
  }

  #attachListeners(): void {
    this.host.addEventListener('dragenter', this.#dragEnterListener);
    this.host.addEventListener('dragover', this.#dragOverListener);
    this.host.addEventListener('dragleave', this.#dragLeaveListener);
    this.host.addEventListener('drop', this.#dropListener);
  }

  #detachListeners(): void {
    this.host.removeEventListener('dragenter', this.#dragEnterListener);
    this.host.removeEventListener('dragover', this.#dragOverListener);
    this.host.removeEventListener('dragleave', this.#dragLeaveListener);
    this.host.removeEventListener('drop', this.#dropListener);
  }

  #handleDragStart(event: DragEvent): void {
    if (!this.#enabled) {
      return;
    }

    // Stop handling this operation if onDrag
    const prevented = this.#config.onDragStart?.({
      event,
      item: this.#manager.item,
      target: this.#manager.target,
      source: this.#manager.source,
      index: -1
    });
    this.#preventDrop = prevented === false;
  }

  #handleDragEnter(event: DragEvent): void {
    if (!this.#enabled || this.#preventDrop) {
      return;
    }

    const target = event.target as HTMLElement | null;
    if (!target) {
      return;
    }

    this.#dragDepth++;

    // Only process on first enter
    if (this.#dragDepth !== 1) {
      return;
    }

    const dropTarget = this.#getDropTarget(event);
    if (!dropTarget) {
      event.preventDefault();
      this.#dragDepth = 0;
      return;
    }

    // Update manager state
    this.#manager.setTarget(dropTarget);

    // Calculate insertion index
    this.#insertionIndex = this.#calculateInsertionIndex(event, dropTarget);

    // Set drop effect
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = this.#config.dropEffect ?? 'move';
    }

    // Invoke callback with manager data
    this.#config.onDragEnter?.({
      event,
      item: this.#manager.item,
      target: dropTarget,
      source: this.#manager.source,
      index: this.#insertionIndex
    });
  }

  #handleDragOver(event: DragEvent): void {
    if (!this.#enabled || !this.#manager.target || this.#preventDrop) {
      return;
    }

    // Prevent default to allow drop (not throttled)
    event.preventDefault();

    // Recalculate insertion index (not throttled for accurate positioning)
    this.#insertionIndex = this.#calculateInsertionIndex(event, this.#manager.target);

    // Set drop effect (not throttled)
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = this.#config.dropEffect ?? 'move';
    }

    // Invoke throttled callback with manager data
    this.#throttledDragOverCallback?.({
      event,
      item: this.#manager.item,
      target: this.#manager.target,
      source: this.#manager.source,
      index: this.#insertionIndex
    });
  }

  #handleDragLeave(event: DragEvent): void {
    if (!this.#enabled) {
      return;
    }

    this.#dragDepth--;

    // Only process on last leave
    if (this.#dragDepth !== 0) {
      return;
    }

    this.#insertionIndex = null;

    if (!this.#preventDrop) {
      this.#config.onDragLeave?.({
        event,
        item: this.#manager.item,
        source: this.#manager.source,
        target: this.#manager.target,
        index: -1
      });
    }

    // Clear target and reset prevention when leaving
    this.#manager.setTarget(null);
    this.#preventDrop = false;
  }

  #handleDragEnd(event: DragEvent): void {
    if (!this.#enabled) {
      return;
    }

    this.#config.onDragEnd?.({
      event,
      item: this.#manager.item,
      source: this.#manager.source,
      target: this.#manager.target,
      index: -1
    });

    this.#dragDepth = 0;
    this.#insertionIndex = null;
    this.#preventDrop = false;
  }

  #handleDrop(event: DragEvent): void {
    if (!this.#enabled || !this.#manager.target || this.#preventDrop) {
      return;
    }

    event.preventDefault();

    // Invoke callback with manager data
    this.#config.onDrop?.({
      event,
      source: this.#manager.source,
      target: this.#manager.target,
      item: this.#manager.item,
      index: this.#insertionIndex ?? -1
    });

    this.#manager.endOperation(event);
  }

  #getDropTarget(event: DragEvent): HTMLElement | null {
    if (this.#config.getDropTarget) {
      return this.#config.getDropTarget(event);
    }
    return this.host as HTMLElement;
  }

  #calculateInsertionIndex(event: DragEvent, target: HTMLElement): number {
    if (this.#config.getIndex) {
      return this.#config.getIndex(event);
    }

    const selector = this.#config.childSelector || '*';
    const children = Array.from(target.querySelectorAll<HTMLElement>(selector));
    const orientation = this.#config.orientation || 'vertical';
    const cursorPos = orientation === 'horizontal' ? event.clientX : event.clientY;

    for (let i = 0; i < children.length; i++) {
      const rect = children[i].getBoundingClientRect();
      const midpoint = orientation === 'horizontal' ? (rect.left + rect.right) / 2 : (rect.top + rect.bottom) / 2;

      if (cursorPos < midpoint) {
        return i;
      }
    }

    return children.length;
  }

  #initializeThrottledCallback(): void {
    if (this.#config.onDragOver) {
      const throttleTime = this.#config.throttle ?? 100;
      this.#throttledDragOverCallback = throttle(this.#config.onDragOver, throttleTime, true);
    } else {
      this.#throttledDragOverCallback = null;
    }
  }
}
