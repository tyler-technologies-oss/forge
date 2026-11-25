import type { ColumnDef as TanstackColumnDef, Row as TanstackRow } from '@tanstack/lit-table';
import { html, nothing, type ReactiveController, type ReactiveControllerHost, type TemplateResult } from 'lit';
import { guard } from 'lit/directives/guard.js';
import { EXPANDED_SLOT_PREFIX, EXPANDER_COLUMN_ID, EXPANDER_COLUMN_LABEL, EXPANDER_COLUMN_WIDTH } from '../constants.js';
import type { DataTableElement } from '../data-table.js';
import type { DataTableFeatures } from '../table-features.js';
import { renderExpandToggle } from '../templates/expand-toggle.js';
import type { Row } from '../types.js';
import { getCellRole } from './cell-selection.js';
import { isFromInteractiveContent } from './row-click.js';
import { getExpanderButtonId, getRowMeta } from './row-meta.js';

type ExpandableHost<TData extends Row> = Pick<
  DataTableElement<TData>,
  'expandable' | 'getSubRows' | 'getRowHasDetail' | 'getRowDetail' | 'cellSelection' | 'children'
>;

/**
 * Requests an update of the host when content is added to, removed from or moved between the `expanded:row-<id>` slots, because a row with
 * slotted content can expand and rows that are not expanded have no `<slot>` to report it through `slotchange`.
 */
export class ExpandedSlotController implements ReactiveController {
  readonly #host: ReactiveControllerHost & HTMLElement;
  readonly #observer = new MutationObserver(mutations => {
    if (mutations.some(mutation => this.#affectsExpandedSlot(mutation))) {
      this.#host.requestUpdate();
    }
  });

  constructor(host: ReactiveControllerHost & HTMLElement) {
    this.#host = host;
    host.addController(this);
  }

  public hostConnected(): void {
    this.#observer.observe(this.#host, { childList: true, attributes: true, attributeFilter: ['slot'], attributeOldValue: true });
  }

  public hostDisconnected(): void {
    this.#observer.disconnect();
  }

  #affectsExpandedSlot(mutation: MutationRecord): boolean {
    if (mutation.type === 'attributes') {
      return [mutation.oldValue, (mutation.target as Element).getAttribute('slot')].some(isExpandedSlotName);
    }
    return [...mutation.addedNodes, ...mutation.removedNodes].some(node => node instanceof Element && isExpandedSlotName(node.getAttribute('slot')));
  }
}

function isExpandedSlotName(name: string | null | undefined): boolean {
  return !!name?.startsWith(EXPANDED_SLOT_PREFIX);
}

function getExpandedSlotName<TData extends Row>(row: TanstackRow<DataTableFeatures, TData>): string {
  return `${EXPANDED_SLOT_PREFIX}${row.id}`;
}

function rowHasSlottedContent<TData extends Row>(host: ExpandableHost<TData>, row: TanstackRow<DataTableFeatures, TData>): boolean {
  const name = getExpandedSlotName(row);
  return !row.getIsGrouped() && [...host.children].some(child => child.getAttribute('slot') === name);
}

/**
 * Returns whether `getRowHasDetail` says the row has a detail.
 */
function rowHasDetail<TData extends Row>(host: ExpandableHost<TData>, row: TanstackRow<DataTableFeatures, TData>): boolean {
  return !row.getIsGrouped() && !!host.getRowHasDetail?.(row.original, row.index);
}

/**
 * Backs TanStack's `getRowCanExpand`.
 *
 * Group rows can always expand. Other rows need `expandable`, and then: when neither `getSubRows` nor `getRowHasDetail` is set every row can
 * expand (its content is the `expanded:row-<id>` slot), otherwise a row can expand when it has sub rows, a detail, or content in its
 * `expanded:row-<id>` slot, whatever `getRowHasDetail` returns for it.
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
  return row.subRows.length > 0 || rowHasDetail(host, row) || rowHasSlottedContent(host, row);
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
 * Renders the full span row under an expanded row: for a row that has a detail, the element from `getRowDetail`, or the `expanded:row-<id>`
 * slot when `getRowDetail` is not set. The slot is also used for a row that has content in it, and for every row when neither `getSubRows`
 * nor `getRowHasDetail` is set.
 *
 * Sub rows follow the detail row because TanStack lists them after their parent in the row model.
 */
export function renderRowDetail<TData extends Row>(host: ExpandableHost<TData>, row: TanstackRow<DataTableFeatures, TData>): TemplateResult | typeof nothing {
  if (!row.getIsExpanded() || row.getIsGrouped()) {
    return nothing;
  }

  const hasDetail = rowHasDetail(host, row);
  if (!hasDetail && (host.getSubRows || host.getRowHasDetail) && !rowHasSlottedContent(host, row)) {
    return nothing;
  }

  const { getRowDetail } = host;
  const content =
    hasDetail && getRowDetail
      ? guard([row.original, row.index, getRowDetail], () => getRowDetail(row.original, row.index))
      : html`<slot name=${getExpandedSlotName(row)}></slot>`;

  return html`
    <tr role="row" part="body-tr tr detail-tr">
      <td role=${getCellRole(host.cellSelection)} part="body-cell cell detail-cell" colspan=${row.getVisibleCells().length}>
        <div class="expanded-content">${content}</div>
      </td>
    </tr>
  `;
}
