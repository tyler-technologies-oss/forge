import type { ColumnDef as TanstackColumnDef, Row as TanstackRow } from '@tanstack/lit-table';
import { html, nothing, type TemplateResult } from 'lit';
import { guard } from 'lit/directives/guard.js';
import { EXPANDER_COLUMN_ID, EXPANDER_COLUMN_LABEL, EXPANDER_COLUMN_WIDTH } from '../constants.js';
import type { DataTableElement } from '../data-table.js';
import type { DataTableFeatures } from '../table-features.js';
import { renderExpandToggle } from '../templates/expand-toggle.js';
import type { Row } from '../types.js';
import { getCellRole } from './cell-selection.js';
import { isFromInteractiveContent } from './row-click.js';
import { getExpanderButtonId, getRowMeta } from './row-meta.js';

type ExpandableHost<TData extends Row> = Pick<DataTableElement<TData>, 'expandable' | 'getSubRows' | 'getRowHasDetail' | 'getRowDetail' | 'cellSelection'>;

/**
 * Returns whether the detail of a row should be shown when it is expanded.
 *
 * Requires `getRowHasDetail` to be set and to return `true` for the row.
 */
function rowHasDetail<TData extends Row>(host: ExpandableHost<TData>, row: TanstackRow<DataTableFeatures, TData>): boolean {
  return !row.getIsGrouped() && !!host.getRowHasDetail?.(row.original, row.index);
}

/**
 * Backs TanStack's `getRowCanExpand`.
 *
 * Group rows can always expand. Other rows need `expandable`, and then: when neither `getSubRows` nor `getRowHasDetail` is set every row can
 * expand (its content is the `expanded:row-<id>` slot), otherwise a row can expand when it has sub rows or a detail.
 */
export function canExpandRow<TData extends Row>(host: ExpandableHost<TData>, row: TanstackRow<DataTableFeatures, TData>): boolean {
  if (row.getIsGrouped()) {
    return true;
  }
  if (!host.expandable) {
    return false;
  }
  if (!host.getSubRows && !host.getRowHasDetail) {
    return true;
  }
  return row.subRows.length > 0 || rowHasDetail(host, row);
}

/**
 * Prepends the column with the button that expands a row, when the table has `expandable` rows. Group rows leave its cell empty, because their toggle is in the group cell.
 */
export function prependExpanderColumn<TData extends Row>(
  columns: TanstackColumnDef<DataTableFeatures, TData>[]
): TanstackColumnDef<DataTableFeatures, TData>[] {
  if (columns.some(column => column.id === EXPANDER_COLUMN_ID)) {
    return [...columns];
  }

  const expanderColumn: TanstackColumnDef<DataTableFeatures, TData> = {
    id: EXPANDER_COLUMN_ID,
    size: EXPANDER_COLUMN_WIDTH,
    enableResizing: false,
    enableColumnFilter: false,
    enableSorting: false,
    enableHiding: false,
    enableGrouping: false,
    enableCellSelection: false,
    cell: ({ row }) => {
      if (row.getIsGrouped() || !row.getCanExpand()) {
        return nothing;
      }
      const id = getExpanderButtonId(row);
      return renderExpandToggle({
        id,
        expanded: row.getIsExpanded(),
        label: EXPANDER_COLUMN_LABEL,
        labelledBy: id ? `${id} ${getRowMeta(row)?.nameId}` : undefined,
        onToggle: () => row.toggleExpanded()
      });
    }
  };

  return [expanderColumn, ...columns];
}

/**
 * Toggles the expansion of a group row, or of a data row that can expand, when it is double clicked.
 *
 * Double clicks that land on interactive content (the toggle buttons, checkboxes, inputs, ...) are ignored, because those handle their own clicks.
 */
export function toggleRowOnDoubleClick(evt: MouseEvent, row: { getCanExpand(): boolean; toggleExpanded(): void }): void {
  if (!row.getCanExpand()) {
    return;
  }

  if (isFromInteractiveContent(evt)) {
    return;
  }

  row.toggleExpanded();
}

/**
 * Renders the full span row under an expanded row: the element from `getRowDetail` when the row has a detail, otherwise the
 * `expanded:row-<id>` slot when neither `getSubRows` nor `getRowHasDetail` is set.
 *
 * Sub rows follow the detail row because TanStack lists them after their parent in the row model.
 */
export function renderRowDetail<TData extends Row>(host: ExpandableHost<TData>, row: TanstackRow<DataTableFeatures, TData>): TemplateResult | typeof nothing {
  if (!row.getIsExpanded() || row.getIsGrouped()) {
    return nothing;
  }

  const hasDetail = rowHasDetail(host, row);
  if (!hasDetail && (host.getSubRows || host.getRowHasDetail)) {
    return nothing;
  }

  const content = hasDetail
    ? guard([row.original, row.index, host.getRowDetail], () => host.getRowDetail?.(row.original, row.index))
    : html`<slot name=${`expanded:row-${row.id}`}></slot>`;

  return html`
    <tr role="row" part="body-tr tr detail-tr">
      <td role=${getCellRole(host.cellSelection)} part="body-cell cell detail-cell" colspan=${row.getVisibleCells().length}>
        <div class="expanded-content">${content}</div>
      </td>
    </tr>
  `;
}
