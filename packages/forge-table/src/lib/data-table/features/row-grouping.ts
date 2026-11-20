import type { Cell, Row as TanstackRow, Table } from '@tanstack/lit-table';
import { IconRegistry } from '@tylertech/forge';
import { tylIconChevronDown, tylIconChevronRight } from '@tylertech/tyler-icons';
import { html, nothing, type TemplateResult } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { GROUP_INDENT_WIDTH, GROUPS_COLUMN_ID, SELECT_COLUMN_ID } from '../constants.js';
import type { DataTableFeatures } from '../table-features.js';
import type { Row } from '../types.js';
import { formatAggregationValue } from './aggregation.js';
import { getCellLabelledBy } from './row-meta.js';

import '@tylertech/forge/checkbox';
import '@tylertech/forge/icon';
import '@tylertech/forge/icon-button';
import '@tylertech/forge/tooltip';

IconRegistry.define([tylIconChevronDown, tylIconChevronRight]);

const EMPTY_GROUP_LABEL = '(Empty)';

type GroupingRow<TData extends Row> = TanstackRow<DataTableFeatures, TData>;

/**
 * The text shown for a group: its grouping value, formatted like a cell in the grouped column.
 */
export function getGroupLabel(value: unknown): string {
  return formatAggregationValue(value) || EMPTY_GROUP_LABEL;
}

/**
 * The data rows in a group, including the rows of any nested groups.
 */
export function getGroupDataRows<TData extends Row>(row: GroupingRow<TData>): GroupingRow<TData>[] {
  return row.subRows.flatMap(subRow => (subRow.getIsGrouped() ? getGroupDataRows(subRow) : [subRow]));
}

/**
 * Counts the data rows in a group, including the rows of any nested groups.
 */
export function countGroupDataRows<TData extends Row>(row: GroupingRow<TData>): number {
  return getGroupDataRows(row).length;
}

export interface GroupSelectionState {
  checked: boolean;
  indeterminate: boolean;
  disabled: boolean;
}

/**
 * The selection state of a group, from the data rows in it that can be selected: checked when all are selected, indeterminate when only some are.
 */
export function getGroupSelectionState<TData extends Row>(row: GroupingRow<TData>): GroupSelectionState {
  const rows = getGroupDataRows(row).filter(dataRow => dataRow.getCanSelect());
  const selectedCount = rows.filter(dataRow => dataRow.getIsSelected()).length;
  return {
    checked: rows.length > 0 && selectedCount === rows.length,
    indeterminate: selectedCount > 0 && selectedCount < rows.length,
    disabled: rows.length === 0
  };
}

/**
 * Selects or deselects every selectable data row in a group in one update.
 *
 * The group row itself is never added to the row selection, only the data rows in it, so the selection state holds the same ids with or without grouping.
 */
export function setGroupSelected<TData extends Row>(table: Table<DataTableFeatures, TData>, row: GroupingRow<TData>, selected: boolean): void {
  const rows = getGroupDataRows(row).filter(dataRow => dataRow.getCanSelect());
  table.setRowSelection(previous => {
    const next = { ...previous };
    rows.forEach(({ id }) => {
      if (selected) {
        next[id] = true;
      } else {
        delete next[id];
      }
    });
    return next;
  });
}

/**
 * The accessible name of a group row, `{column header}: {group label}`.
 */
export function getGroupRowName<TData extends Row>(table: Table<DataTableFeatures, TData>, row: GroupingRow<TData>): string {
  const columnId = row.groupingColumnId ?? '';
  const header = table.getColumn(columnId)?.columnDef.header;
  const label = getGroupLabel(row.getValue(columnId));
  return `${typeof header === 'string' && header.length > 0 ? header : columnId}: ${label}`;
}

/**
 * The data rows of the table in display order (sorted and filtered), without group rows and regardless of which groups are expanded.
 *
 * Without grouping these are the same rows as `table.getRowModel().rows`.
 */
export function getDataRows<TData extends Row>(table: Table<DataTableFeatures, TData>): GroupingRow<TData>[] {
  const collect = (rows: GroupingRow<TData>[]): GroupingRow<TData>[] => rows.flatMap(row => (row.getIsGrouped() ? collect(row.subRows) : [row]));
  return collect(table.getSortedRowModel().rows);
}

/**
 * The column order that moves the grouped columns to the start of the table, in grouping order, right after the row selection column.
 *
 * TanStack's own `groupedColumnMode: 'reorder'` would put them ahead of the row selection column, so the table orders them through
 * `columnOrder` instead. Columns not listed keep their relative order after the grouped ones.
 *
 * With `singleGroupColumn` the groups column takes the place of the grouped columns (TanStack removes those from the table), and it keeps that place while nothing is grouped.
 */
export function getGroupedColumnOrder(columnOrder: string[], grouping: string[], hasSelectColumn: boolean, singleGroupColumn = false): string[] {
  if (!grouping.length && !singleGroupColumn) {
    return columnOrder;
  }

  const leading = [...(hasSelectColumn ? [SELECT_COLUMN_ID] : []), ...(singleGroupColumn ? [GROUPS_COLUMN_ID] : grouping)];
  return [...leading, ...columnOrder.filter(id => !leading.includes(id))];
}

/**
 * Finds the cell of a group row that shows the group: the cell of the column the row is grouped by.
 *
 * When that column is hidden, the first visible cell after the row selection column shows it instead, so a group is never unlabeled.
 */
export function getGroupLabelCell<TData extends Row>(row: GroupingRow<TData>): Cell<DataTableFeatures, TData> | undefined {
  const cells = row.getVisibleCells();
  return cells.find(cell => cell.getIsGrouped()) ?? cells.find(cell => cell.column.id !== SELECT_COLUMN_ID);
}

/**
 * Renders the content of a cell in a group row, other than the row selection cell.
 *
 * The group cell (see `getGroupLabelCell`) shows the expand toggle, the group label and the number of data rows. Cells of columns with
 * `ColumnDef.aggregate` show the aggregate of the group's rows. Every other cell is empty, because its column's cell template expects the values of a data row.
 */
export function renderGroupRowCell<TData extends Row>(cell: Cell<DataTableFeatures, TData>): TemplateResult | string | typeof nothing {
  if (getGroupLabelCell(cell.row)?.id === cell.id) {
    return renderGroupCell(cell.row, cell.column.id === GROUPS_COLUMN_ID);
  }

  const { aggregate, aggregateFormatter } = cell.column.columnDef.meta ?? {};
  if (aggregate && !cell.column.getIsGrouped()) {
    return formatAggregationValue(cell.getValue(), aggregate, aggregateFormatter);
  }

  return nothing;
}

/**
 * Renders the checkbox of a group row that selects the data rows in the group.
 *
 * `cell` is the row's cell in the row selection column, which names the checkbox the same way as the checkboxes of data rows.
 */
export function renderGroupCheckbox<TData extends Row>(table: Table<DataTableFeatures, TData>, cell: Cell<DataTableFeatures, TData>): TemplateResult {
  const { row } = cell;
  const { checked, indeterminate, disabled } = getGroupSelectionState(row);
  const onChange = (evt: Event): void => setGroupSelected(table, row, (evt.target as HTMLInputElement).checked);

  return html`
    <forge-checkbox
      aria-labelledby=${ifDefined(getCellLabelledBy(cell))}
      .checked=${checked}
      .indeterminate=${indeterminate}
      ?disabled=${disabled}
      @change=${onChange}></forge-checkbox>
    <forge-tooltip>Select group</forge-tooltip>
  `;
}

function renderGroupCell<TData extends Row>(row: GroupingRow<TData>, indented: boolean): TemplateResult {
  const expanded = row.getIsExpanded();
  const label = getGroupLabel(row.getValue(row.groupingColumnId ?? ''));
  const onToggle = (evt: Event): void => {
    evt.stopPropagation();
    row.toggleExpanded();
  };

  return html`
    <div
      class="group-cell"
      part="group-cell"
      style=${ifDefined(indented && row.depth > 0 ? `padding-inline-start: ${row.depth * GROUP_INDENT_WIDTH}px` : undefined)}>
      <forge-icon-button
        class="group-toggle"
        part="group-toggle"
        shape="squared"
        dense
        aria-label=${`${expanded ? 'Collapse' : 'Expand'} ${label}`}
        aria-expanded=${String(expanded)}
        @click=${onToggle}>
        <forge-icon name=${expanded ? 'chevron_down' : 'chevron_right'}></forge-icon>
      </forge-icon-button>
      <span class="group-label" part="group-label">${label}</span>
      <span class="group-count" part="group-count">(${countGroupDataRows(row)})</span>
    </div>
  `;
}
