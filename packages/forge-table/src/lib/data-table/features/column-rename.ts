import type { Column, SortingState, Table } from '@tanstack/lit-table';
import type { ReactiveController, TemplateResult } from 'lit';
import { COLUMN_MENU_ACTION_EVENT } from '../../column-menu/constants.js';
import type { ColumnMenuActionEventDetail } from '../../column-menu/types.js';
import type { DataTableElement } from '../data-table.js';
import type { DataTableFeatures } from '../table-features.js';
import { renderRenameInput } from '../templates/rename-input.js';
import type { Row } from '../types.js';
import { getColumnHeaderId } from './row-meta.js';

export interface ColumnRenameControllerOptions<TData extends Row> {
  getTable: () => Table<DataTableFeatures, TData> | null;
  getSorting: () => SortingState;
  setSorting: (sorting: SortingState) => void;
}

/**
 * Owns the inline column rename: which column is being renamed and the header overrides that renames produce.
 */
export class ColumnRenameController<TData extends Row> implements ReactiveController {
  readonly #host: DataTableElement<TData>;
  readonly #options: ColumnRenameControllerOptions<TData>;
  #renamingColumnId: string | null = null;
  #headers: Record<string, string> = {};
  #sortingBeforeClick: SortingState | null = null;
  #focusInputPending = false;

  constructor(host: DataTableElement<TData>, options: ColumnRenameControllerOptions<TData>) {
    this.#host = host;
    this.#options = options;
    host.addController(this);
  }

  public get headers(): Record<string, string> {
    return this.#headers;
  }

  public get renamingColumnId(): string | null {
    return this.#renamingColumnId;
  }

  public hostConnected(): void {
    this.#host.addEventListener(COLUMN_MENU_ACTION_EVENT, this.#onColumnMenuAction);
  }

  public hostDisconnected(): void {
    this.#host.removeEventListener(COLUMN_MENU_ACTION_EVENT, this.#onColumnMenuAction);
  }

  public hostUpdated(): void {
    if (!this.#focusInputPending) {
      return;
    }

    this.#focusInputPending = false;
    const input = this.#host.shadowRoot?.querySelector<HTMLInputElement>('.rename-input');
    input?.focus();
    input?.select();
  }

  public isRenaming(columnId: string): boolean {
    return this.#renamingColumnId === columnId;
  }

  public canRename(column: Column<DataTableFeatures, TData>): boolean {
    return !!column.columnDef.meta?.renamable && typeof column.columnDef.header === 'string';
  }

  public reset(): void {
    this.#headers = {};
    this.#renamingColumnId = null;
    this.#host.requestUpdate();
  }

  public renderInput(column: Column<DataTableFeatures, TData>): TemplateResult {
    return renderRenameInput(column, {
      onKeydown: (evt, target) => this.#onKeydown(evt, target),
      onCommit: (target, value) => this.#commit(target, value)
    });
  }

  /**
   * Remembers the sorting before the first click of a (possible) double click, which `onHeaderDoubleClick` restores.
   */
  public captureSortingBeforeClick(evt: MouseEvent): void {
    if (evt.detail === 1) {
      this.#sortingBeforeClick = this.#options.getSorting();
    }
  }

  public onHeaderDoubleClick(column: Column<DataTableFeatures, TData>): void {
    // The two clicks of a double click each toggled sorting, so put it back before editing the name
    if (this.#sortingBeforeClick && this.#sortingBeforeClick !== this.#options.getSorting()) {
      this.#options.setSorting(this.#sortingBeforeClick);
    }
    this.#sortingBeforeClick = null;
    this.#startRenaming(column);
  }

  #onColumnMenuAction = (evt: CustomEvent<ColumnMenuActionEventDetail>): void => {
    const { action, columnId } = evt.detail;
    const column = this.#options.getTable()?.getColumn(columnId);
    if (action === 'rename' && column) {
      this.#startRenaming(column);
    }
  };

  #startRenaming(column: Column<DataTableFeatures, TData>): void {
    if (this.canRename(column)) {
      this.#setRenamingColumnId(column.id);
    }
  }

  #setRenamingColumnId(columnId: string | null): void {
    if (columnId === this.#renamingColumnId) {
      return;
    }
    this.#renamingColumnId = columnId;
    this.#focusInputPending = columnId !== null;
    this.#host.requestUpdate();
  }

  #onKeydown(evt: KeyboardEvent, column: Column<DataTableFeatures, TData>): void {
    evt.stopPropagation();
    if (evt.key === 'Enter') {
      evt.preventDefault();
      this.#commit(column, (evt.currentTarget as HTMLInputElement).value);
      void this.#focusColumnMenu(column.id);
    } else if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#setRenamingColumnId(null);
      void this.#focusColumnMenu(column.id);
    }
  }

  #commit(column: Column<DataTableFeatures, TData>, value: string): void {
    if (this.#renamingColumnId !== column.id) {
      return;
    }

    this.#setRenamingColumnId(null);

    const header = value.trim();
    if (!header || header === column.columnDef.header) {
      return;
    }

    this.#headers = { ...this.#headers, [column.id]: header };
    this.#host.requestUpdate();
    this.#host.dispatchEvent(new CustomEvent('forge-data-table-column-rename', { detail: { columnId: column.id, header }, bubbles: true, composed: true }));
  }

  async #focusColumnMenu(columnId: string): Promise<void> {
    await this.#host.updateComplete;
    const menu = this.#host.shadowRoot?.getElementById(getColumnHeaderId(columnId))?.querySelector('forge-data-table-column-menu');
    await menu?.updateComplete;
    menu?.focus();
  }
}
