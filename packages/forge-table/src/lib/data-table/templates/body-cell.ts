import { FlexRender, type Cell, type Table } from '@tanstack/lit-table';
import { html, nothing, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { guard } from 'lit/directives/guard.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';
import { EXPANDER_COLUMN_ID, SELECT_COLUMN_ID } from '../constants.js';
import type { DataTableElement } from '../data-table.js';
import { formatAttribute } from '../directives/format-attribute.js';
import { lightDomRender } from '../directives/light-dom-render.js';
import { getCellRole, type CellSelectionController } from '../features/cell-selection.js';
import { getPinnedColumnClasses, getPinnedColumnStyle } from '../features/column-pinning.js';
import { getColumnWidthStyle } from '../features/column-sizing.js';
import { getGroupLabelCell, renderGroupCheckbox, renderGroupRowCell } from '../features/row-grouping.js';
import type { DataTableFeatures } from '../table-features.js';
import type { Row } from '../types.js';
import { isCellEditable } from './input-cell.js';

export interface BodyCellContext<TData extends Row> {
  host: DataTableElement<TData>;
  table: Table<DataTableFeatures, TData>;
  cellSelection: CellSelectionController<TData>;
}

export function renderBodyCell<TData extends Row>(
  context: BodyCellContext<TData>,
  cell: Cell<DataTableFeatures, TData>,
  rowId: string,
  groupStartColumnIds: ReadonlySet<string>
): TemplateResult {
  const { host, cellSelection } = context;
  const editable = !cell.row.getIsGrouped() && isCellEditable(cell as Cell<DataTableFeatures, any>);
  const selectable = host.cellSelection && cell.getCanSelect();
  const selected = selectable && cell.getIsSelected();
  const edges = selected ? cell.getSelectionEdges() : undefined;
  const isGroupLabel = cell.row.getIsGrouped() && getGroupLabelCell(cell.row)?.id === cell.id;
  return html`
    <td
      role=${getCellRole(host.cellSelection)}
      part="body-cell cell"
      style=${styleMap({ width: getColumnWidthStyle(cell.column, host.resizable), ...getPinnedColumnStyle(cell.column) })}
      class=${classMap({
        ...getPinnedColumnClasses(cell.column),
        'cell-selectable': selectable,
        'cell-selected': selected,
        'selection-top': !!edges?.top,
        'selection-right': !!edges?.right,
        'selection-bottom': !!edges?.bottom,
        'selection-left': !!edges?.left,
        'select-column': host.rowSelection && cell.column.columnDef.id === SELECT_COLUMN_ID,
        'expander-column': cell.column.columnDef.id === EXPANDER_COLUMN_ID,
        'editable-cell': editable,
        'group-start': groupStartColumnIds.has(cell.column.id)
      })}
      id=${cell.column.id}
      data-row-id=${ifDefined(selectable ? cell.row.id : undefined)}
      data-column-id=${ifDefined(selectable ? cell.column.id : undefined)}
      tabindex=${ifDefined(selectable ? (cell.id === cellSelection.tabStopId ? 0 : -1) : undefined)}
      aria-selected=${ifDefined(selectable ? String(selected) : undefined)}
      @mousedown=${selectable ? (evt: MouseEvent) => cellSelection.onCellMouseDown(evt, cell) : nothing}
      @mouseenter=${selectable ? cell.getSelectionExtendHandler() : nothing}
      @keydown=${selectable ? (evt: KeyboardEvent) => cellSelection.onCellKeydown(evt, cell) : nothing}
      @focus=${selectable ? () => cellSelection.onCellFocus(cell) : nothing}
      data-align=${ifDefined(isGroupLabel ? undefined : cell.column.columnDef.meta?.align)}
      ${formatAttribute(isGroupLabel ? undefined : cell.column.columnDef.meta?.formatAttribute)}
      ?data-forge-stop-row-click-propagation=${cell.column.columnDef.meta?.stopRowClickPropagation ||
      cell.column.columnDef.id === SELECT_COLUMN_ID ||
      cell.column.columnDef.id === EXPANDER_COLUMN_ID ||
      editable}>
      <div class="cell-content" part="body-cell-content cell-content">${renderCellContent(context, cell, rowId)}</div>
    </td>
  `;
}

function renderCellContent<TData extends Row>(context: BodyCellContext<TData>, cell: Cell<DataTableFeatures, TData>, rowId: string): unknown {
  if (cell.row.getIsGrouped()) {
    return renderGroupRowCellContent(context, cell);
  }

  return cell.column.columnDef.meta?.cellSlot
    ? guard(
        [cell.column],
        () => html`<slot ${lightDomRender(context.host, cell as Cell<DataTableFeatures, any>)} name=${`col-${cell.column.id}:row-${rowId}`}></slot>`
      )
    : FlexRender({ cell });
}

function renderGroupRowCellContent<TData extends Row>({ host, table }: BodyCellContext<TData>, cell: Cell<DataTableFeatures, TData>): unknown {
  if (cell.column.id === SELECT_COLUMN_ID) {
    return host.rowSelection === 'multiple' ? renderGroupCheckbox(table, cell) : nothing;
  }

  return renderGroupRowCell(cell);
}
