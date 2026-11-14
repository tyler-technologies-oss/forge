import type { Column, ColumnPinningState } from '@tanstack/lit-table';
import { hasChildColumns, resolveColumnId } from '../columns/column-utils.js';
import { SELECT_COLUMN_ID } from '../constants.js';
import type { DataTableFeatures } from '../table-features.js';
import type { ColumnDef, ColumnPin, Row } from '../types.js';

/**
 * Builds the TanStack column pinning state from the `pin` option of the column definitions.
 *
 * A column group's `pin` cascades to its child columns unless a child defines its own. When
 * `includeSelectColumn` is set and any column is pinned to the start, the row selection column
 * is pinned ahead of them so it stays the first column.
 */
export function getColumnPinningState<TData extends Row>(columns: ColumnDef<TData>[], includeSelectColumn = false): ColumnPinningState {
  const state: ColumnPinningState = { start: [], end: [] };
  collectPinnedColumns(columns, state);
  return pinSelectColumn(state, includeSelectColumn);
}

/**
 * Keeps the row selection column as the first start-pinned column while any other column is pinned to the start,
 * and unpinned otherwise.
 */
export function pinSelectColumn(state: ColumnPinningState, includeSelectColumn: boolean): ColumnPinningState {
  const start = state.start.filter(id => id !== SELECT_COLUMN_ID);
  return { ...state, start: includeSelectColumn && start.length ? [SELECT_COLUMN_ID, ...start] : start };
}

function collectPinnedColumns<TData extends Row>(
  columns: ColumnDef<TData>[],
  state: ColumnPinningState,
  inheritedPin?: ColumnPin,
  parentIndices: number[] = []
): void {
  columns.forEach((column, index) => {
    const indexPath = [...parentIndices, index];
    const pin = column.pin ?? inheritedPin;

    if (column.columns && hasChildColumns(column)) {
      collectPinnedColumns(column.columns, state, pin, indexPath);
      return;
    }

    if (pin) {
      state[pin].push(resolveColumnId(column, indexPath));
    }
  });
}

function getVisibleLeafColumns<TData extends Row>(column: Column<DataTableFeatures, TData>): Column<DataTableFeatures, TData>[] {
  return column.getLeafColumns().filter(leaf => leaf.getIsVisible());
}

function isPinnedEdge<TData extends Row>(column: Column<DataTableFeatures, TData>, position: ColumnPin): boolean {
  const leaves = getVisibleLeafColumns(column);
  const pinnedLeaves = position === 'start' ? column.table.getStartVisibleLeafColumns() : column.table.getEndVisibleLeafColumns();
  const leaf = position === 'start' ? leaves.at(-1) : leaves.at(0);
  const edge = position === 'start' ? pinnedLeaves.at(-1) : pinnedLeaves.at(0);
  return !!leaf && leaf.id === edge?.id;
}

/**
 * The CSS classes that describe how a header, body, or footer cell is pinned.
 *
 * `pinned-edge` marks the cell that borders the scrollable region so it can draw a separator.
 */
export function getPinnedColumnClasses<TData extends Row>(column: Column<DataTableFeatures, TData>): Record<string, boolean> {
  const position = column.getIsPinned();
  return {
    pinned: !!position,
    'pinned-start': position === 'start',
    'pinned-end': position === 'end',
    'pinned-edge': !!position && isPinnedEdge(column, position)
  };
}

/**
 * The inline sticky offset for a pinned cell, derived from the sizes of the pinned columns before (start) or after (end) it.
 *
 * A column group is offset by its first (start) or last (end) visible leaf column.
 */
export function getPinnedColumnStyle<TData extends Row>(column: Column<DataTableFeatures, TData>): Record<string, string> {
  const position = column.getIsPinned();
  if (!position) {
    return {};
  }

  const leaves = getVisibleLeafColumns(column);
  if (position === 'start') {
    const first = leaves.at(0);
    return first ? { insetInlineStart: `${first.getStart('start')}px` } : {};
  }

  const last = leaves.at(-1);
  return last ? { insetInlineEnd: `${last.getAfter('end')}px` } : {};
}
