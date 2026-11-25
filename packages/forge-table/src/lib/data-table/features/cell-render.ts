import type { Cell } from '@tanstack/lit-table';
import type { ReactiveController } from 'lit';
import { EXPANDER_COLUMN_ID, GROUPS_COLUMN_ID, SELECT_COLUMN_ID } from '../constants.js';
import type { DataTableElement } from '../data-table.js';
import type { DataTableFeatures } from '../table-features.js';
import type { CellRenderFn, Row } from '../types.js';

const INTERNAL_COLUMN_IDS: ReadonlySet<string> = new Set([SELECT_COLUMN_ID, EXPANDER_COLUMN_ID, GROUPS_COLUMN_ID]);

/**
 * Runs `onCellRender` callbacks. Body cells register themselves while rendering (`queueCellRender`), and the callbacks run once the
 * host has committed the render, so they see the final cell DOM and can modify it in place.
 */
export class CellRenderController<TData extends Row> implements ReactiveController {
  readonly #host: DataTableElement<TData>;
  readonly #pending = new Map<HTMLElement, Cell<DataTableFeatures, TData>>();

  constructor(host: DataTableElement<TData>) {
    this.#host = host;
    host.addController(this);
  }

  public hostConnected(): void {}

  public hostDisconnected(): void {
    this.#pending.clear();
  }

  public queue(element: HTMLElement, cell: Cell<DataTableFeatures, TData>): void {
    if (cell.row.getIsGrouped() || INTERNAL_COLUMN_IDS.has(cell.column.id) || !this.#resolve(cell)) {
      return;
    }
    this.#pending.set(element, cell);
  }

  public hostUpdated(): void {
    const pending = [...this.#pending];
    this.#pending.clear();
    pending.forEach(([element, cell]) => {
      try {
        this.#resolve(cell)?.({ ...cell.getContext(), element } as unknown as Parameters<CellRenderFn<any, any>>[0]);
      } catch (error) {
        reportError(error);
      }
    });
  }

  #resolve(cell: Cell<DataTableFeatures, TData>): CellRenderFn<any, any> | undefined {
    return cell.column.columnDef.meta?.onCellRender ?? this.#host.onCellRender;
  }
}
