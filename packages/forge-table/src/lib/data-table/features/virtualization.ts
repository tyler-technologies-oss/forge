import { VirtualizerController } from '@tanstack/lit-virtual';
import type { DataTableElement } from '../data-table.js';
import { COMPACT_ROW_HEIGHT, DEFAULT_ROW_HEIGHT, VIRTUALIZER_OVERSCAN } from '../constants.js';
import type { Row } from '../types.js';

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
        count: rowCount
      });
      this.#host.addController(this.#controller);
      return;
    }

    const virtualizer = this.#controller.getVirtualizer();
    virtualizer.setOptions({ ...virtualizer.options, count: rowCount });
  }
}
