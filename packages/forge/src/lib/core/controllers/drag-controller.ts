import { ReactiveController, ReactiveControllerHost, ReactiveElement } from 'lit';
import { DragDropManager } from '../utils/drag-drop-manager.js';

export interface GetDragItemArgs {
  event: DragEvent;
  draggableElement: HTMLElement;
}

export interface DragEventArgs {
  event: DragEvent;
  item: HTMLElement;
  controller: DragController;
}

interface DragImageConfig {
  image: Element;
  x: number;
  y: number;
}

/**
 * Configuration interface for the drag controller.
 */
export interface DragControllerConfig {
  /**
   * Callback to retrieve the actual drag item from the draggable element.
   * This allows traversing from a draggable descendant (e.g., drag handle) to find
   * the semantic drag item (e.g., the option element containing the handle).
   *
   * @param draggableElement - The element with draggable="true" that triggered the drag
   * @param event - The dragstart event
   * @returns The element to use for transfer data and drag image, or null to cancel the drag
   *
   * @example
   * // In a listbox, traverse from drag handle icon to parent option
   * getDragItem: ({ draggableElement }) => draggableElement.closest('forge-option')
   */
  getDragItem?: (args: GetDragItemArgs) => HTMLElement | null;

  /**
   * Callback to retrieve the source element (ancestor/container) of the drag item.
   * This allows identifying which component/container the item is being dragged from.
   *
   * @param dragItem - The drag item element
   * @param event - The dragstart event
   * @returns The source container element, or null to use the host
   *
   * @example
   * // In a listbox, return the listbox element itself
   * getSourceElement: ({ dragItem }) => dragItem.closest('forge-listbox')
   */
  getSourceElement?: (args: DragEventArgs) => HTMLElement | null;

  /**
   * Callback when drag operation starts. This is called after the drag item has been determined but
   * before transfer data and drag image are set.
   * @param event - The dragstart event
   * @param dragItem - The drag item (from getDragItem callback or the draggable element itself)
   */
  onDragStart?: (args: DragEventArgs) => void;

  /**
   * Callback to set a custom drag image.
   * @param event - The dragstart event
   * @param dataTransfer - The DataTransfer object
   * @param dragItem - The drag item (from getDragItem callback or the draggable element itself)
   * @returns An object containing the image element and its x/y offset or undefined to use the
   * default image
   */
  setDragImage?: (args: DragEventArgs) => DragImageConfig | undefined;

  /**
   * Callback when drag operation ends (success or cancel).
   * @param event - The dragend event
   * @param dragItem - The drag item (from getDragItem callback or the draggable element itself)
   */
  onDragEnd?: (args: DragEventArgs) => void;

  /**
   * The drag effect allowed for this drag operation.
   * @default 'move'
   */
  effectAllowed?: DataTransfer['effectAllowed'];
}

/**
 * A Lit controller for handling HTML5 drag operations on descendant draggable elements.
 *
 * This controller listens for drag events that bubble from descendant draggable elements
 * without making the host element itself draggable. It supports customizing the drag item
 * and drag image through callbacks.
 *
 * @example
 * class ListboxComponent extends LitElement {
 *   #dragController = new DragController(this, {
 *     // Traverse from drag handle to parent option element
 *     getDragItem: ({ draggableElement }) => draggableElement.closest('forge-option'),
 *     effectAllowed: 'move'
 *   });
 * }
 */
export class DragController implements ReactiveController {
  public host: ReactiveControllerHost & ReactiveElement;

  #config: DragControllerConfig;
  #enabled = true;
  #dragStartListener = (event: DragEvent): void => this.#handleDragStart(event);
  #dragEndListener = (event: DragEvent): void => this.#handleDragEnd(event);
  #manager = DragDropManager.instance;
  #currentOperation: string | null = null;
  #subscription: ReturnType<typeof DragDropManager.instance.subscribe> | null = null;

  constructor(host: ReactiveControllerHost & ReactiveElement, config: DragControllerConfig = {}) {
    this.host = host;
    this.#config = config;
    host.addController(this);
  }

  public hostConnected(): void {
    this.#attachListeners();
    this.#subscription = this.#manager.subscribe({
      end: () => {
        this.#currentOperation = null;
      }
    });
  }

  public hostDisconnected(): void {
    this.#detachListeners();
    this.#endCurrentOperation();
    this.#unsubscribe();
  }

  /**
   * Updates the controller configuration.
   * @param config - Partial configuration to merge with existing config
   */
  public updateConfig(config: Partial<DragControllerConfig>): void {
    this.#config = { ...this.#config, ...config };
  }

  /**
   * Gets whether the drag controller is enabled.
   * @default true
   */
  public get enabled(): boolean {
    return this.#enabled;
  }

  /**
   * Sets whether the drag controller is enabled. When disabled, it will not listen for drag events.
   * @param enabled - true to enable, false to disable
   */
  public setEnabled(enabled: boolean): void {
    if (this.#enabled === enabled) {
      return;
    }

    this.#enabled = enabled;
    if (!enabled) {
      this.#detachListeners();
      this.#endCurrentOperation();
    } else {
      this.#attachListeners();
    }
  }

  #attachListeners(): void {
    this.host.addEventListener('dragstart', this.#dragStartListener);
    this.host.addEventListener('dragend', this.#dragEndListener);
  }

  #detachListeners(): void {
    this.host.removeEventListener('dragstart', this.#dragStartListener);
    this.host.removeEventListener('dragend', this.#dragEndListener);
  }

  #handleDragStart(event: DragEvent): void {
    if (this.#manager.currentOperation) {
      // Another drag operation is already in progress, cancel this one
      event.preventDefault();
      console.warn('DragController: A drag operation is already in progress. Cancelling this drag.');
      return;
    }

    // Ensure the event target is defined
    const target = event.target as HTMLElement | null;
    if (!target) {
      return;
    }

    // Determine the drag item from the target element
    const item = this.#getItem(target, event);
    if (!item) {
      event.preventDefault();
      return;
    }

    // Update manager state
    const sourceElement =
      this.#config.getSourceElement?.({
        event,
        item,
        controller: this
      }) ?? (this.host as HTMLElement);
    this.#startOperation(item, sourceElement, event);

    // Set the drag image and effect allowed
    if (event.dataTransfer) {
      const dragImage = this.#config.setDragImage?.({ event, item, controller: this }) ?? this.#getDefaultDragImage(event, item);
      event.dataTransfer.setDragImage(dragImage.image, dragImage.x, dragImage.y);
      event.dataTransfer.effectAllowed = this.#config.effectAllowed ?? 'move';
    }

    // Call the onDragStart callback
    this.#config.onDragStart?.({ event, item, controller: this });
  }

  #handleDragEnd(event: DragEvent): void {
    if (this.#enabled && this.#validateOperation() && this.#manager.item) {
      this.#config.onDragEnd?.({ event, item: this.#manager.item, controller: this });
    }

    this.#endCurrentOperation(event);
  }

  #getItem(draggableElement: HTMLElement, event: DragEvent): HTMLElement | null {
    return this.#config.getDragItem?.({ draggableElement, event }) ?? draggableElement;
  }

  #getDefaultDragImage(event: DragEvent, dragItem: HTMLElement): DragImageConfig {
    return {
      image: dragItem,
      x: event.offsetX,
      y: event.offsetY
    };
  }

  #startOperation(item: HTMLElement, source: HTMLElement, event: DragEvent): void {
    this.#manager.setItem(item);
    this.#manager.setSource(source);
    this.#manager.startOperation(event);
    this.#currentOperation = this.#manager.currentOperation;
  }

  #endCurrentOperation(event?: DragEvent): void {
    if (this.#validateOperation()) {
      this.#manager.endOperation(event);
    }
  }

  #validateOperation(): boolean {
    return !!this.#currentOperation && this.#currentOperation === this.#manager.currentOperation;
  }

  #unsubscribe(): void {
    if (this.#subscription) {
      this.#subscription();
      this.#subscription = null;
    }
  }
}
