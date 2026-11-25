import { defaultRangeExtractor, VirtualizerController, type Range } from '@tanstack/lit-virtual';
import type { DataTableElement } from '../data-table.js';
import { COMPACT_ROW_HEIGHT, DEFAULT_ROW_HEIGHT, VIRTUALIZER_OVERSCAN } from '../constants.js';
import type { Row } from '../types.js';

const FOCUSABLE_ROW_SELECTOR = 'tr[data-index]';

export type RowVirtualizer = ReturnType<VirtualizerController<HTMLElement, HTMLElement>['getVirtualizer']>;

/**
 * Creates and removes the row virtualizer as the host's `virtualized` property changes.
 */
export class RowVirtualization<TData extends Row> {
  readonly #host: DataTableElement<TData>;
  readonly #getScrollElement: () => HTMLElement | undefined;
  #controller: VirtualizerController<HTMLElement, HTMLElement> | null = null;

  constructor(host: DataTableElement<TData>, getScrollElement: () => HTMLElement | undefined) {
    this.#host = host;
    this.#getScrollElement = getScrollElement;
  }

  public getVirtualizer(): RowVirtualizer | undefined {
    return this.#controller?.getVirtualizer();
  }

  public scrollToRow(rowIndex: number): void {
    this.#controller?.getVirtualizer().scrollToIndex(rowIndex);
  }

  public sync(rowCount: number): void {
    if (!this.#host.virtualized) {
      if (this.#controller) {
        this.#host.removeController(this.#controller);
        this.#controller = null;
      }
      return;
    }

    if (!this.#controller) {
      this.#controller = new VirtualizerController(this.#host, {
        getScrollElement: () => this.#getScrollElement() as HTMLElement,
        estimateSize: () => (this.#host.compact ? COMPACT_ROW_HEIGHT : DEFAULT_ROW_HEIGHT),
        overscan: VIRTUALIZER_OVERSCAN,
        rangeExtractor: range => this.#extractRange(range),
        count: rowCount
      });
      this.#host.addController(this.#controller);
      return;
    }

    const virtualizer = this.#controller.getVirtualizer();
    virtualizer.setOptions({ ...virtualizer.options, count: rowCount });
  }

  #extractRange(range: Range): number[] {
    const indexes = defaultRangeExtractor(range);
    const focusedIndex = this.#getFocusedRowIndex();
    if (focusedIndex === undefined || focusedIndex >= range.count || indexes.includes(focusedIndex)) {
      return indexes;
    }
    return [...indexes, focusedIndex].sort((a, b) => a - b);
  }

  #getFocusedRowIndex(): number | undefined {
    const { shadowRoot, ownerDocument } = this.#host;
    const row =
      shadowRoot?.activeElement?.closest<HTMLElement>(FOCUSABLE_ROW_SELECTOR) ??
      this.#getSlottedFocusedElement(ownerDocument)?.assignedSlot?.closest<HTMLElement>(FOCUSABLE_ROW_SELECTOR);
    return row ? Number(row.dataset.index) : undefined;
  }

  #getSlottedFocusedElement(ownerDocument: Document): HTMLElement | null {
    let element = ownerDocument.activeElement as HTMLElement | null;
    while (element && element.parentElement !== this.#host) {
      element = element.parentElement;
    }
    return element;
  }
}
