import type { ReactiveController, ReactiveControllerHost } from 'lit';

const CELL_SLOT_NAME_PATTERN = /^col-.+:row-.+$/;
const GENERATED_CELL_ATTRIBUTE = 'data-custom-cell';

/**
 * Returns the name of the slot that holds the content of a body cell: `col-<id>:row-<id>`.
 * Both the element the table renders for a `useTemplateSlot` column and content slotted by the consumer use it.
 */
export function getCellSlotName(rowId: string, columnId: string): string {
  return `col-${columnId}:row-${rowId}`;
}

/**
 * Returns the element the table rendered into the light DOM for a `useTemplateSlot` cell, which is not content slotted by the consumer.
 */
export function getTemplateSlotElement(host: HTMLElement, rowId: string, columnId: string): Element | null {
  return host.querySelector(`:scope > [${GENERATED_CELL_ATTRIBUTE}][slot="${CSS.escape(getCellSlotName(rowId, columnId))}"]`);
}

/**
 * Removes the element the table rendered into the light DOM for a `useTemplateSlot` cell, because content slotted by the consumer takes its place.
 */
export function removeTemplateSlotElement(host: HTMLElement, rowId: string, columnId: string): void {
  getTemplateSlotElement(host, rowId, columnId)?.remove();
}

function isConsumerCellContent(element: Element): boolean {
  return !element.hasAttribute(GENERATED_CELL_ATTRIBUTE) && CELL_SLOT_NAME_PATTERN.test(element.getAttribute('slot') ?? '');
}

/**
 * Tracks which cells have content slotted into them by the consumer, and requests an update of the host when it is added, removed or moved,
 * because a cell without slotted content renders its own value and has no `<slot>` to report it through `slotchange`.
 */
export class CellSlotController implements ReactiveController {
  readonly #host: ReactiveControllerHost & HTMLElement;
  #slotNames = new Set<string>();
  readonly #observer = new MutationObserver(mutations => {
    if (mutations.some(mutation => this.#affectsCellSlot(mutation))) {
      this.#sync();
      this.#host.requestUpdate();
    }
  });

  constructor(host: ReactiveControllerHost & HTMLElement) {
    this.#host = host;
    host.addController(this);
  }

  public hostConnected(): void {
    this.#sync();
    this.#observer.observe(this.#host, { childList: true, attributes: true, attributeFilter: ['slot'], attributeOldValue: true, subtree: true });
  }

  public hostDisconnected(): void {
    this.#observer.disconnect();
  }

  /**
   * Returns whether the consumer slotted content into the cell.
   */
  public hasContent(rowId: string, columnId: string): boolean {
    return this.#slotNames.has(getCellSlotName(rowId, columnId));
  }

  #sync(): void {
    this.#slotNames = new Set(
      Array.from(this.#host.children)
        .filter(isConsumerCellContent)
        .map(child => child.getAttribute('slot') as string)
    );
  }

  #affectsCellSlot(mutation: MutationRecord): boolean {
    if (mutation.type === 'attributes') {
      const target = mutation.target as Element;
      return (
        target.parentElement === this.#host &&
        !target.hasAttribute(GENERATED_CELL_ATTRIBUTE) &&
        [mutation.oldValue, target.getAttribute('slot')].some(name => CELL_SLOT_NAME_PATTERN.test(name ?? ''))
      );
    }
    return (
      mutation.target === this.#host && [...mutation.addedNodes, ...mutation.removedNodes].some(node => node instanceof Element && isConsumerCellContent(node))
    );
  }
}
