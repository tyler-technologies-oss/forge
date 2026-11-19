import { FlexRender, type Header, type HeaderGroup, type SortingState, type Table } from '@tanstack/lit-table';
import { html, nothing, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';
import { svg } from 'lit/static-html.js';
import type { ColumnMenuElement } from '../../column-menu/column-menu.js';
import { COLUMN_MENU_TAG_NAME } from '../../column-menu/constants.js';
import type { ColumnMenuActionEventDetail } from '../../column-menu/types.js';
import { canColumnBeReordered, getGroupStartColumnIds } from '../columns/column-utils.js';
import { GROUPS_COLUMN_ID, SELECT_COLUMN_ID } from '../constants.js';
import type { ColumnReorderController } from '../controllers/column-reorder-controller.js';
import type { DataTableElement } from '../data-table.js';
import type { ColumnRenameController } from '../features/column-rename.js';
import { getPinnedColumnClasses, getPinnedColumnStyle } from '../features/column-pinning.js';
import { getColumnWidthStyle } from '../features/column-sizing.js';
import { getColumnHeaderId, getColumnHeaderTextId } from '../features/row-meta.js';
import type { DataTableFeatures } from '../table-features.js';
import type { Row } from '../types.js';
import { renderFilterField } from './filter-fields.js';

export interface HeaderContext<TData extends Row> {
  host: DataTableElement<TData>;
  table: Table<DataTableFeatures, TData>;
  sorting: SortingState;
  rename: ColumnRenameController<TData>;
  reorder: ColumnReorderController<TData> | null;
}

type TableHeader<TData extends Row> = Header<DataTableFeatures, TData, unknown>;
type TableHeaderGroup<TData extends Row> = HeaderGroup<DataTableFeatures, TData>;

const SORT_ICON = svg`<svg class="sort-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"/></svg>`;

export function renderTableHeader<TData extends Row>(context: HeaderContext<TData>): TemplateResult {
  const headerGroups = context.table.getHeaderGroups();
  const groupStartColumnIds = getGroupStartColumnIds(context.table);
  return html`${headerGroups.map(
    headerGroup => html`
      <tr role="row" part="head-tr tr">
        ${headerGroup.headers.map(header => renderHeaderCell(context, header, headerGroup, headerGroups, groupStartColumnIds))}
      </tr>
    `
  )}`;
}

function renderHeaderCell<TData extends Row>(
  context: HeaderContext<TData>,
  header: TableHeader<TData>,
  headerGroup: TableHeaderGroup<TData>,
  headerGroups: TableHeaderGroup<TData>[],
  groupStartColumnIds: ReadonlySet<string>
): TemplateResult {
  const { host, table, rename, reorder } = context;
  const { column } = header;
  const isGroupHeader = headerGroup.depth < headerGroups.length - 1;
  const isGroupStart = groupStartColumnIds.has(header.getLeafHeaders()[0].column.id);
  const hasHeader = !!column.columnDef.header?.length;
  const isParent = (column.columns?.length ?? 0) > 0;
  const isLeadingColumn = column.columnDef.id === SELECT_COLUMN_ID || column.columnDef.id === GROUPS_COLUMN_ID;
  const canAcceptDrop = host.reorderable && !isLeadingColumn && ((isParent && !header.isPlaceholder) || hasHeader);
  const isRenaming = rename.isRenaming(column.id);
  const canBeDragged = canAcceptDrop && hasHeader && !header.isPlaceholder && !isRenaming && canColumnBeReordered(column);
  const canRename = !header.isPlaceholder && !isRenaming && rename.canRename(column);
  const sortClickHandler =
    host.sortable && !canBeDragged
      ? column.getToggleSortingHandler()
      : canBeDragged
        ? (evt: MouseEvent) => {
            if (!reorder?.consumeDragClick() && host.sortable && column.getCanSort()) {
              column.getToggleSortingHandler()?.(evt);
            }
          }
        : null;
  const hasColumnMenu = !isLeadingColumn && !header.isPlaceholder && !isParent;
  const onHeaderContextMenu = (evt: MouseEvent): void => {
    const menu = (evt.currentTarget as HTMLElement).querySelector<ColumnMenuElement<TData>>(COLUMN_MENU_TAG_NAME);
    if (!menu) {
      return;
    }
    evt.preventDefault();
    menu.openMenu(evt);
  };
  return html`
    <th
      id=${getColumnHeaderId(column.id)}
      role="columnheader"
      part="head-cell cell"
      colspan=${ifDefined(header.colSpan > 1 ? header.colSpan : undefined)}
      style=${styleMap({ width: getColumnWidthStyle(column, host.resizable), ...getPinnedColumnStyle(column) })}
      class=${classMap({
        ...getPinnedColumnClasses(column),
        'sort-asc': column.getIsSorted() === 'asc',
        'sort-desc': column.getIsSorted() === 'desc',
        'select-column': host.rowSelection && column.columnDef.id === SELECT_COLUMN_ID,
        'group-header': isGroupHeader,
        'group-start': isGroupStart,
        renaming: isRenaming
      })}
      data-column-id=${column.id}
      @dragover=${canAcceptDrop ? (evt: DragEvent) => reorder?.onDragOver(evt, column) : nothing}
      @drop=${canAcceptDrop ? (evt: DragEvent) => reorder?.onDrop(evt, column) : nothing}
      @contextmenu=${hasColumnMenu ? onHeaderContextMenu : nothing}>
      <div
        class="cell-container"
        part="head-cell-container"
        draggable=${canBeDragged ? 'true' : 'false'}
        @dragstart=${canBeDragged ? (evt: DragEvent) => reorder?.onDragStart(evt, column) : nothing}
        @dragend=${canBeDragged ? (evt: DragEvent) => reorder?.onDragEnd(evt) : nothing}
        style=${styleMap({
          cursor: host.sortable && column.getCanSort() ? 'default' : canBeDragged ? 'grab' : 'default',
          userSelect: canBeDragged ? 'none' : null
        })}>
        <div
          part="head-cell-content cell-content"
          class="cell-content"
          @click=${canRename && sortClickHandler
            ? (evt: MouseEvent) => {
                rename.captureSortingBeforeClick(evt);
                sortClickHandler(evt);
              }
            : sortClickHandler}
          @dblclick=${canRename ? () => rename.onHeaderDoubleClick(column) : nothing}>
          ${isRenaming
            ? rename.renderInput(column)
            : html`<span class="cell-text" id=${getColumnHeaderTextId(column.id)}>${header.isPlaceholder ? null : FlexRender({ header })}</span>`}
          ${renderSortIndicator(context, header)}
        </div>
        ${hasColumnMenu
          ? html`<forge-data-table-column-menu
              .table=${table}
              .column=${column}
              .reorderable=${host.reorderable}
              @forge-data-table-column-menu-action=${(evt: CustomEvent<ColumnMenuActionEventDetail>) =>
                rename.onColumnMenuAction(evt, column)}></forge-data-table-column-menu>`
          : nothing}
      </div>
      ${host.filterable && column.getCanFilter() ? html`<div class="filter-container">${renderFilterField(column)}</div>` : nothing}
      ${renderResizer(context, header)}
    </th>
  `;
}

function renderSortIndicator<TData extends Row>({ host, sorting }: HeaderContext<TData>, header: TableHeader<TData>): TemplateResult | typeof nothing {
  if (!host.sortable || !header.column.getIsSorted()) {
    return nothing;
  }

  return html` ${sorting.length > 1 ? html`<span class="sort-index" part="sort-index">${header.column.getSortIndex() + 1}</span>` : nothing} ${SORT_ICON} `;
}

function renderResizer<TData extends Row>({ host, table }: HeaderContext<TData>, header: TableHeader<TData>): TemplateResult | typeof nothing {
  if (!host.resizable || !header.column.getCanResize() || header.isPlaceholder) {
    return nothing;
  }

  return html`<div
    @doubleclick=${() => header.column.resetSize()}
    @mousedown=${header.getResizeHandler()}
    @touchstart=${header.getResizeHandler()}
    class=${classMap({ resizer: true, [table.options.columnResizeDirection ?? 'ltr']: true, resizing: header.column.getIsResizing() })}></div>`;
}
