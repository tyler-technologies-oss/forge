import { ReactiveController, ReactiveControllerHost, ReactiveElement } from 'lit';

export interface GetDragItemArgs {
  draggableElement: HTMLElement;
  event: DragEvent;
}

export interface SetTransferDataArgs {
  event: DragEvent;
  dataTransfer: DataTransfer;
  dragItem: HTMLElement;
}

export interface SetDragImageArgs {
  event: DragEvent;
  dataTransfer: DataTransfer;
  dragItem: HTMLElement;
}

export interface DragStartArgs {
  event: DragEvent;
  dragItem: HTMLElement;
}

export interface DragEndArgs {
  event: DragEvent;
  dragItem: HTMLElement;
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
   * Callback when drag operation starts.
   * This is called after the drag item has been determined but before transfer data and drag image are set.
   * @param event - The dragstart event
   * @param dragItem - The drag item (from getDragItem callback or the draggable element itself)
   */
  onDragStart?: (args: DragStartArgs) => void;

  /**
   * Callback to set custom drag transfer data.
   * @param event - The dragstart event
   * @param dataTransfer - The DataTransfer object
   * @param dragItem - The drag item (from getDragItem callback or the draggable element itself)
   */
  onSetTransferData?: (args: SetTransferDataArgs) => void;

  /**
   * Callback to set a custom drag image.
   * @param event - The dragstart event
   * @param dataTransfer - The DataTransfer object
   * @param dragItem - The drag item (from getDragItem callback or the draggable element itself)
   */
  onSetDragImage?: (args: SetDragImageArgs) => void;

  /**
   * Callback when drag operation ends (success or cancel).
   * @param event - The dragend event
   * @param dragItem - The drag item (from getDragItem callback or the draggable element itself)
   */
  onDragEnd?: (args: DragEndArgs) => void;

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
 * without making the host element itself draggable. It supports customizing the drag item,
 * transfer data, and drag image through callbacks.
 *
 * @example
 * class ListboxComponent extends LitElement {
 *   #dragController = new DragController(this, {
 *     // Traverse from drag handle to parent option element
 *     getDragItem: ({ draggableElement }) => draggableElement.closest('forge-option'),
 *
 *     // Set transfer data using the option element
 *     onSetTransferData: ({ event, dataTransfer, dragItem: option }) => {
 *       dataTransfer.setData('text/plain', option.textContent?.trim() || '');
 *       dataTransfer.setData('application/x-forge-option-id', option.id);
 *     },
 *
 *     // Use the option element for the drag image
 *     onSetDragImage: ({ event, dataTransfer, dragItem: option }) => {
 *       const clone = option.cloneNode(true) as HTMLElement;
 *       clone.style.position = 'absolute';
 *       clone.style.top = '-9999px';
 *       clone.style.opacity = '0.7';
 *       document.body.appendChild(clone);
 *       const rect = option.getBoundingClientRect();
 *       dataTransfer.setDragImage(clone, rect.width / 2, rect.height / 2);
 *       requestAnimationFrame(() => clone.remove());
 *     },
 *
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
  #currentDragItem: HTMLElement | null = null;

  constructor(host: ReactiveControllerHost & ReactiveElement, config: DragControllerConfig = {}) {
    this.host = host;
    this.#config = config;
    host.addController(this);
  }

  public hostConnected(): void {
    this.host.addEventListener('dragstart', this.#dragStartListener);
    this.host.addEventListener('dragend', this.#dragEndListener);
  }

  public hostDisconnected(): void {
    this.host.removeEventListener('dragstart', this.#dragStartListener);
    this.host.removeEventListener('dragend', this.#dragEndListener);
    this.#currentDragItem = null;
  }

  /**
   * Updates the controller configuration.
   * @param config - Partial configuration to merge with existing config
   */
  public updateConfig(config: Partial<DragControllerConfig>): void {
    this.#config = { ...this.#config, ...config };
  }

  /**
   * Enables or disables the drag controller.
   * @param enabled - Whether the controller should handle drag events
   */
  public setEnabled(enabled: boolean): void {
    this.#enabled = enabled;
  }

  #handleDragStart(event: DragEvent): void {
    if (!this.#enabled) {
      return;
    }

    const target = event.target as HTMLElement | null;
    if (!target) {
      return;
    }

    const dragItem = this.#getDragItem(target, event);
    if (!dragItem) {
      event.preventDefault();
      return;
    }

    const dataTransfer = event.dataTransfer;
    if (!dataTransfer) {
      return;
    }

    this.#currentDragItem = dragItem;
    this.#config.onDragStart?.({ event, dragItem });
    dataTransfer.effectAllowed = this.#config.effectAllowed ?? 'move';

    if (this.#config.onSetTransferData) {
      this.#config.onSetTransferData({ event, dataTransfer, dragItem });
    } else {
      this.#setDefaultTransferData(dataTransfer, dragItem);
    }

    if (this.#config.onSetDragImage) {
      this.#config.onSetDragImage({ event, dataTransfer, dragItem });
    } else {
      this.#setDefaultDragImage(dataTransfer, dragItem);
    }
  }

  #handleDragEnd(event: DragEvent): void {
    if (!this.#enabled || !this.#currentDragItem) {
      return;
    }

    const dragItem = this.#currentDragItem;
    this.#currentDragItem = null;
    this.#config.onDragEnd?.({ event, dragItem });
  }

  #getDragItem(draggableElement: HTMLElement, event: DragEvent): HTMLElement | null {
    if (this.#config.getDragItem) {
      return this.#config.getDragItem({ draggableElement, event });
    }
    return draggableElement;
  }

  #setDefaultTransferData(dataTransfer: DataTransfer, dragItem: HTMLElement): void {
    const textData = dragItem.id || dragItem.textContent?.trim() || '';
    dataTransfer.setData('text/plain', textData);

    if (dragItem.id) {
      dataTransfer.setData('application/x-forge-element-id', dragItem.id);
    }
  }

  #setDefaultDragImage(dataTransfer: DataTransfer, dragItem: HTMLElement): void {
    const rect = dragItem.getBoundingClientRect();
    dataTransfer.setDragImage(dragItem, 0, rect.height / 2);
  }
}
