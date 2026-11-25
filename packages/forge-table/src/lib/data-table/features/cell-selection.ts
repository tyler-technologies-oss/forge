import type { Cell, CellSelectionState, Column, LitTable, Updater } from '@tanstack/lit-table';
import type { ReactiveController } from 'lit';
import { CELL_SELECTION_KEY_DIRECTIONS } from '../constants.js';
import type { DataTableElement } from '../data-table.js';
import type { DataTableFeatures } from '../table-features.js';
import type { Row } from '../types.js';
import { CellSelectionAutoScroller, type AutoScrollInsets } from './cell-selection-autoscroll.js';

export const getCellRole = (cellSelection: boolean): 'cell' | 'gridcell' => (cellSelection ? 'gridcell' : 'cell');

export interface CellSelectionControllerOptions<TData extends Row> {
  getTable: () => LitTable<DataTableFeatures, TData> | null;
  getScrollElement: () => HTMLElement | undefined;
  scrollToRow: (rowIndex: number) => void;
}

/**
 * Owns the cell selection state and the pointer and keyboard interaction that changes it.
 */
export class CellSelectionController<TData extends Row> implements ReactiveController {
  readonly #host: DataTableElement<TData>;
  readonly #options: CellSelectionControllerOptions<TData>;
  readonly #autoScroller: CellSelectionAutoScroller;
  #state: CellSelectionState = [];
  #tabStopId: string | undefined;
  #pendingFocus = false;

  constructor(host: DataTableElement<TData>, options: CellSelectionControllerOptions<TData>) {
    this.#host = host;
    this.#options = options;
    this.#autoScroller = new CellSelectionAutoScroller({
      getScrollElement: options.getScrollElement,
      getInsets: () => this.#getStickyInsets(),
      onPoint: (x, y, evt) => this.#extendSelectionAtPoint(x, y, evt)
    });
    host.addController(this);
  }

  public get state(): CellSelectionState {
    return this.#state;
  }

  public get tabStopId(): string | undefined {
    return this.#tabStopId;
  }

  public hostConnected(): void {}

  public hostDisconnected(): void {
    this.#autoScroller.stop();
  }

  public hostUpdated(): void {
    if (this.#pendingFocus) {
      this.#focusTabStop();
    }
  }

  /**
   * Clears the selection and everything in progress, for when cell selection is turned off.
   */
  public reset(): void {
    this.#state = [];
    this.#pendingFocus = false;
    this.#autoScroller.stop();
    this.#host.requestUpdate();
  }

  public updateTabStop(table: LitTable<DataTableFeatures, TData>): void {
    this.#tabStopId = this.#host.cellSelection ? this.#getTabStopId(table) : undefined;
  }

  public canSelect(cell: Cell<DataTableFeatures, TData, any>): boolean {
    if (cell.row.getIsGrouped()) {
      return false;
    }
    const columnOption = cell.column.columnDef.meta?.enableCellSelection ?? this.#host.enableCellSelection;
    return typeof columnOption === 'function' ? columnOption(cell as Cell<DataTableFeatures, any, any>) : columnOption;
  }

  public onSelectionChange(updaterOrValue: Updater<CellSelectionState>): void {
    const nextState = typeof updaterOrValue === 'function' ? updaterOrValue(this.#state) : updaterOrValue;
    if (!nextState.length && !this.#state.length) {
      return;
    }
    this.#state = nextState;
    this.#host.requestUpdate();
    this.#host.dispatchEvent(new CustomEvent('forge-data-table-cell-select', { detail: this.#state, bubbles: true, composed: true }));
  }

  public onCellMouseDown(evt: MouseEvent, cell: Cell<DataTableFeatures, TData>): void {
    if (evt.button !== 0) {
      return;
    }
    this.#pendingFocus = false;
    cell.getSelectionStartHandler()(evt);
    this.#autoScroller.start(evt, this.#host.ownerDocument);
  }

  public onCellFocus(cell: Cell<DataTableFeatures, TData>): void {
    if (!this.#state.length) {
      cell.table.setFocusedCell(cell.row.id, cell.column.id);
    }
  }

  public onCellKeydown(evt: KeyboardEvent, cell: Cell<DataTableFeatures, TData>): void {
    if (evt.target !== evt.currentTarget) {
      return;
    }

    const { table } = cell;
    const direction = CELL_SELECTION_KEY_DIRECTIONS[evt.key];
    const hasModifier = evt.ctrlKey || evt.metaKey;
    const selectsAll = hasModifier && evt.key.toLowerCase() === 'a';
    const copies = hasModifier && evt.key.toLowerCase() === 'c';
    if (copies) {
      this.#copySelectedCells(evt);
      return;
    }

    if (!direction && !selectsAll && evt.key !== 'Escape') {
      return;
    }

    evt.preventDefault();

    if (evt.key === 'Escape') {
      table.resetCellSelection(true);
    } else if (!this.#state.length) {
      table.setFocusedCell(cell.row.id, cell.column.id);
    } else if (selectsAll) {
      table.selectAllCells();
    } else if (evt.shiftKey) {
      table.extendCellSelection(direction);
    } else {
      this.#pendingFocus = true;
      table.moveCellSelection(direction);
    }
  }

  #getTabStopId(table: LitTable<DataTableFeatures, TData>): string | undefined {
    const focusedCell = table.getFocusedCell();
    if (focusedCell?.getCanSelect()) {
      return focusedCell.id;
    }
    return table
      .getRowModel()
      .rows.find(row => !row.getIsGrouped())
      ?.getVisibleCells()
      .find(cell => cell.getCanSelect())?.id;
  }

  #getStickyInsets(): AutoScrollInsets {
    const { shadowRoot, stickyHeader, stickyFooter } = this.#host;
    const table = this.#options.getTable();
    const sumSizes = (columns: Column<DataTableFeatures, TData>[]): number => columns.reduce((total, column) => total + column.getSize(), 0);
    return {
      top: stickyHeader ? (shadowRoot?.querySelector('thead')?.offsetHeight ?? 0) : 0,
      right: sumSizes(table?.getEndVisibleLeafColumns() ?? []),
      bottom: stickyFooter ? (shadowRoot?.querySelector('tfoot')?.offsetHeight ?? 0) : 0,
      left: sumSizes(table?.getStartVisibleLeafColumns() ?? [])
    };
  }

  #extendSelectionAtPoint(x: number, y: number, evt: MouseEvent): void {
    const target = this.#host.shadowRoot
      ?.elementsFromPoint(x, y)
      .map(element => element.closest<HTMLElement>('tbody :is(td, th)[data-row-id]'))
      .find(Boolean);
    const { rowId, columnId } = target?.dataset ?? {};
    const row = this.#options
      .getTable()
      ?.getRowModel()
      .rows.find(({ id }) => id === rowId);
    row
      ?.getVisibleCells()
      .find(cell => cell.column.id === columnId)
      ?.getSelectionExtendHandler()(evt);
  }

  #copySelectedCells(evt: KeyboardEvent): void {
    const data = this.#host.getSelectedCellRangesData();
    if (!data.length) {
      return;
    }

    evt.preventDefault();
    void navigator.clipboard?.writeText(this.#host.getSelectionClipboardValue(data)).catch(() => {});
  }

  #focusTabStop(): void {
    const cell = this.#host.shadowRoot?.querySelector<HTMLElement>('tbody :is(td, th)[tabindex="0"]');
    if (cell) {
      this.#pendingFocus = false;
      cell.focus();
      return;
    }

    // The cell is in a row the virtualizer has not rendered; scrolling to it triggers another update that retries the focus
    const table = this.#options.getTable();
    const focusedCell = table?.getFocusedCell();
    const rowIndex = focusedCell ? (table?.getRowModel().rows.findIndex(row => row.id === focusedCell.row.id) ?? -1) : -1;
    if (rowIndex >= 0) {
      this.#options.scrollToRow(rowIndex);
    }
  }
}
