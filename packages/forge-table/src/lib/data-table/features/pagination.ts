import type { PaginationState, Table } from '@tanstack/lit-table';
import type { IPaginatorChangeEventData, IPaginatorComponent } from '@tylertech/forge';
import type { ReactiveController } from 'lit';
import { COMPACT_ROW_HEIGHT, DEFAULT_PAGE_SIZE, DEFAULT_ROW_HEIGHT, PAGINATOR_SELECTOR } from '../constants.js';
import type { DataTableElement } from '../data-table.js';
import type { DataTableFeatures } from '../table-features.js';
import type { Row } from '../types.js';

export const DEFAULT_PAGINATION: Readonly<PaginationState> = { pageIndex: 0, pageSize: DEFAULT_PAGE_SIZE };

export interface PaginationControllerOptions<TData extends Row> {
  getTable: () => Table<DataTableFeatures, TData> | null;
  getPagination: () => PaginationState;
  setPagination: (pagination: PaginationState) => void;
}

/**
 * Connects a `forge-paginator` slotted into the `paginator` slot to the table's TanStack pagination state.
 *
 * The table owns the state. The paginator is configured by the consumer, so the first time the table sees one while `paginate` is on, it adopts
 * the paginator's `page-size`. It does not adopt `page-index`, because TanStack returns to the first page when the rows load or change. After that
 * the paginator only reports what the user chose, through `forge-paginator-change`, and gets the table's page index, page size and row count written
 * back after every render.
 */
export class PaginationController<TData extends Row> implements ReactiveController {
  readonly #host: DataTableElement<TData>;
  readonly #options: PaginationControllerOptions<TData>;
  #adopted: IPaginatorComponent | undefined;

  constructor(host: DataTableElement<TData>, options: PaginationControllerOptions<TData>) {
    this.#host = host;
    this.#options = options;
    host.addController(this);
  }

  public hostUpdate(): void {
    const paginator = this.#getPaginator();
    if (!this.#host.paginate || !paginator) {
      this.#adopted = undefined;
      return;
    }
    if (paginator === this.#adopted) {
      return;
    }

    const { pageSize } = paginator;
    if (!Number.isFinite(pageSize)) {
      return;
    }
    this.#adopted = paginator;
    this.#options.setPagination({ ...this.#options.getPagination(), pageSize });
  }

  public hostUpdated(): void {
    const paginator = this.#getPaginator();
    const table = this.#options.getTable();
    if (!this.#host.paginate || !paginator || !table || paginator !== this.#adopted) {
      return;
    }

    const { pageIndex, pageSize } = this.#options.getPagination();
    paginator.total = table.getRowCount();
    paginator.pageSize = pageSize;
    paginator.pageIndex = pageIndex;
  }

  /**
   * Returns the height, in pixels, of the rows a page is short of, so the table is as tall on a page with fewer rows than the page size as on a full one.
   *
   * It is `0` for a full page, an empty table (which shows the empty state) and a virtualized table, which sizes its own body.
   */
  public getPaddingHeight(rowCount: number): number {
    const { pageSize } = this.#options.getPagination();
    const missingRows = pageSize - rowCount;
    if (!this.#host.paginate || this.#host.virtualized || rowCount === 0 || !Number.isFinite(missingRows) || missingRows <= 0) {
      return 0;
    }
    return missingRows * (this.#host.compact ? COMPACT_ROW_HEIGHT : DEFAULT_ROW_HEIGHT);
  }

  public handleSlotChange = (): void => {
    this.#host.requestUpdate();
  };

  public handleChange = (evt: CustomEvent<IPaginatorChangeEventData>): void => {
    const table = this.#options.getTable();
    if (!table || !this.#host.paginate || evt.target !== this.#adopted) {
      return;
    }
    const { pageIndex, pageSize } = evt.detail;
    table.setPagination({ pageIndex, pageSize });
  };

  #getPaginator(): IPaginatorComponent | undefined {
    return this.#host.querySelector<IPaginatorComponent>(PAGINATOR_SELECTOR) ?? undefined;
  }
}
