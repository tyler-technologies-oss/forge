import { throttle } from '@tylertech/forge-core';
import { ReactiveController, ReactiveControllerHost, ReactiveElement } from 'lit';

export interface GetDropTargetArgs {
  targetElement: HTMLElement;
  event: DragEvent;
}

export interface DragEnterArgs {
  event: DragEvent;
  dataTransfer: DataTransfer;
  dropTarget: HTMLElement;
  insertionIndex: number;
  clientX: number;
  clientY: number;
}

export interface DragOverArgs {
  event: DragEvent;
  dataTransfer: DataTransfer;
  dropTarget: HTMLElement;
  insertionIndex: number;
  clientX: number;
  clientY: number;
}

export interface DragLeaveArgs {
  event: DragEvent;
  dataTransfer: DataTransfer;
  dropTarget: HTMLElement;
}

export interface DropArgs {
  event: DragEvent;
  dataTransfer: DataTransfer;
  dropTarget: HTMLElement;
  insertionIndex: number;
  clientX: number;
  clientY: number;
}

export interface CreatePlaceholderArgs {
  dataTransfer: DataTransfer;
  dropTarget: HTMLElement;
  insertionIndex: number;
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
  getDropTarget?: (args: GetDropTargetArgs) => HTMLElement | null;

  /**
   * Callback invoked when a dragged item enters the drop zone.
   * @param args - Event details including dataTransfer, coordinates, and insertion index
   */
  onDragEnter?: (args: DragEnterArgs) => void;

  /**
   * Callback invoked while a dragged item is over the drop zone.
   * Called repeatedly as the mouse moves.
   * @param args - Event details including dataTransfer, coordinates, and insertion index
   */
  onDragOver?: (args: DragOverArgs) => void;

  /**
   * Callback invoked when a dragged item leaves the drop zone.
   * @param args - Event details including dataTransfer
   */
  onDragLeave?: (args: DragLeaveArgs) => void;

  /**
   * Callback invoked when an item is dropped on the drop zone.
   * @param args - Event details including dataTransfer, coordinates, and insertion index
   */
  onDrop?: (args: DropArgs) => void;

  /**
   * Callback to create a custom placeholder element for previewing the drop.
   * If not provided, a default placeholder is created.
   * The placeholder is not automatically inserted into the DOM - the host component
   * must retrieve it via `controller.placeholder` and insert it at the desired position.
   *
   * @param args - Context for creating the placeholder
   * @returns A placeholder element or null to disable placeholder
   *
   * @example
   * onCreatePlaceholder: ({ dataTransfer, dropTarget, insertionIndex }) => {
   *   const placeholder = document.createElement('div');
   *   placeholder.className = 'custom-placeholder';
   *   placeholder.textContent = `Drop at position ${insertionIndex}`;
   *   return placeholder;
   * }
   */
  onCreatePlaceholder?: (args: CreatePlaceholderArgs) => HTMLElement | null;

  /**
   * The drop effect to indicate what operation will occur.
   * @default 'move'
   */
  dropEffect?: DataTransfer['dropEffect'];

  /**
   * Whether to create a placeholder element when dragging over.
   * The placeholder must be manually inserted by the host component.
   * @default true
   */
  showPlaceholder?: boolean;

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
  #dragOver = false;
  #dragDepth = 0;
  #currentDropTarget: HTMLElement | null = null;
  #placeholder: HTMLElement | null = null;
  #insertionIndex: number | null = null;
  #throttledDragOverCallback: ((args: DragOverArgs) => void) | null = null;
  #dragEnterListener = (event: DragEvent): void => this.#handleDragEnter(event);
  #dragOverListener = (event: DragEvent): void => this.#handleDragOver(event);
  #dragLeaveListener = (event: DragEvent): void => this.#handleDragLeave(event);
  #dropListener = (event: DragEvent): void => this.#handleDrop(event);

  constructor(host: ReactiveControllerHost & ReactiveElement, config: DropControllerConfig = {}) {
    this.host = host;
    this.#config = config;
    this.#initializeThrottledCallback();
    host.addController(this);
  }

  public hostConnected(): void {
    this.host.addEventListener('dragenter', this.#dragEnterListener);
    this.host.addEventListener('dragover', this.#dragOverListener);
    this.host.addEventListener('dragleave', this.#dragLeaveListener);
    this.host.addEventListener('drop', this.#dropListener);
  }

  public hostDisconnected(): void {
    this.host.removeEventListener('dragenter', this.#dragEnterListener);
    this.host.removeEventListener('dragover', this.#dragOverListener);
    this.host.removeEventListener('dragleave', this.#dragLeaveListener);
    this.host.removeEventListener('drop', this.#dropListener);

    // Reset all state
    this.#dragOver = false;
    this.#dragDepth = 0;
    this.#currentDropTarget = null;
    this.#placeholder = null;
    this.#insertionIndex = null;
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
   * Gets whether a dragged item is currently over the drop zone.
   */
  public get dragOver(): boolean {
    return this.#dragOver;
  }

  /**
   * Gets the current drop target element.
   */
  public get dropTarget(): HTMLElement | null {
    return this.#currentDropTarget;
  }

  /**
   * Gets the placeholder element for visual feedback.
   * The host component is responsible for inserting this element into its template
   * at the position indicated by `insertionIndex`.
   * Returns null when no drag operation is active.
   */
  public get placeholder(): HTMLElement | null {
    return this.#placeholder;
  }

  /**
   * Gets the calculated insertion index among the drop target's children.
   * This indicates where the dragged item should be inserted.
   * Returns null when no drag operation is active.
   */
  public get insertionIndex(): number | null {
    return this.#insertionIndex;
  }

  #handleDragEnter(event: DragEvent): void {
    if (!this.#enabled) {
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

    const dropTarget = this.#getDropTarget(target, event);
    if (!dropTarget) {
      event.preventDefault();
      this.#dragDepth = 0;
      return;
    }

    const dataTransfer = event.dataTransfer;
    if (!dataTransfer) {
      return;
    }

    this.#currentDropTarget = dropTarget;
    this.#dragOver = true;

    // Calculate insertion index
    this.#insertionIndex = this.#calculateInsertionIndex(event, dropTarget);

    // Create placeholder if enabled
    if (this.#config.showPlaceholder !== false) {
      if (this.#config.onCreatePlaceholder) {
        this.#placeholder = this.#config.onCreatePlaceholder({
          dataTransfer,
          dropTarget,
          insertionIndex: this.#insertionIndex
        });
      }
    }

    // Set drop effect
    dataTransfer.dropEffect = this.#config.dropEffect ?? 'move';

    // Invoke callback
    this.#config.onDragEnter?.({
      event,
      dataTransfer,
      dropTarget,
      insertionIndex: this.#insertionIndex,
      clientX: event.clientX,
      clientY: event.clientY
    });
  }

  #handleDragOver(event: DragEvent): void {
    if (!this.#enabled || !this.#currentDropTarget) {
      return;
    }

    // Prevent default to allow drop (not throttled)
    event.preventDefault();

    const dataTransfer = event.dataTransfer;
    if (!dataTransfer) {
      return;
    }

    // Recalculate insertion index (not throttled for accurate positioning)
    this.#insertionIndex = this.#calculateInsertionIndex(event, this.#currentDropTarget);

    // Set drop effect (not throttled)
    dataTransfer.dropEffect = this.#config.dropEffect ?? 'move';

    // Invoke throttled callback
    this.#throttledDragOverCallback?.({
      event,
      dataTransfer,
      dropTarget: this.#currentDropTarget,
      insertionIndex: this.#insertionIndex,
      clientX: event.clientX,
      clientY: event.clientY
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

    const dataTransfer = event.dataTransfer;
    const dropTarget = this.#currentDropTarget;

    this.#dragOver = false;
    this.#placeholder = null;
    this.#insertionIndex = null;

    if (dataTransfer && dropTarget) {
      this.#config.onDragLeave?.({
        event,
        dataTransfer,
        dropTarget
      });
    }

    this.#currentDropTarget = null;
  }

  #handleDrop(event: DragEvent): void {
    if (!this.#enabled || !this.#currentDropTarget) {
      return;
    }

    event.preventDefault();

    const dataTransfer = event.dataTransfer;
    if (!dataTransfer) {
      return;
    }

    const dropTarget = this.#currentDropTarget;
    const insertionIndex = this.#calculateInsertionIndex(event, dropTarget);

    // Reset state
    this.#dragDepth = 0;
    this.#dragOver = false;
    this.#placeholder = null;
    this.#insertionIndex = null;
    this.#currentDropTarget = null;

    // Invoke callback
    this.#config.onDrop?.({
      event,
      dataTransfer,
      dropTarget,
      insertionIndex,
      clientX: event.clientX,
      clientY: event.clientY
    });
  }

  #getDropTarget(targetElement: HTMLElement, event: DragEvent): HTMLElement | null {
    if (this.#config.getDropTarget) {
      return this.#config.getDropTarget({ targetElement, event });
    }
    return this.host as HTMLElement;
  }

  #calculateInsertionIndex(event: DragEvent, dropTarget: HTMLElement): number {
    const selector = this.#config.childSelector || '*';
    const children = Array.from(dropTarget.querySelectorAll<HTMLElement>(selector));
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
