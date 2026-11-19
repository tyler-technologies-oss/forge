import type { Row as TanstackRow } from '@tanstack/lit-table';
import { html, TemplateResult, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { getGroupStartColumnIds } from '../columns/column-utils.js';
import { getCellRole } from '../features/cell-selection.js';
import { dispatchRowClick } from '../features/row-click.js';
import { getGroupRowName } from '../features/row-grouping.js';
import { setRowName, type RowMeta } from '../features/row-meta.js';
import type { RowVirtualization, RowVirtualizer } from '../features/virtualization.js';
import type { DataTableFeatures } from '../table-features.js';
import type { Row } from '../types.js';
import { renderBodyCell, type BodyCellContext } from './body-cell.js';
import { renderEmptyState } from './empty-state.js';

export interface BodyContext<TData extends Row> extends BodyCellContext<TData> {
  filtered: boolean;
  virtualization: RowVirtualization<TData>;
}

export function renderBody<TData extends Row>(context: BodyContext<TData>): TemplateResult {
  const { host, table, filtered } = context;
  if (!table.getRowModel().rows.length) {
    return renderEmptyState({
      colSpan: Math.max(table.getVisibleLeafColumns().length, 1),
      cellRole: getCellRole(host.cellSelection),
      filtered,
      onClearFilters: () => table.setColumnFilters([])
    });
  }
  const virtualizer = host.virtualized ? context.virtualization.getVirtualizer() : undefined;
  return virtualizer ? renderVirtualizedTableBody(context, virtualizer) : renderTableBody(context);
}

function getRowMeta<TData extends Row>(context: BodyContext<TData>, row: TanstackRow<DataTableFeatures, TData>): RowMeta {
  const { host, table } = context;
  return setRowName(row, row.getIsGrouped() ? getGroupRowName(table, row) : host.getRowName(row.original, row.index));
}

function renderTableBody<TData extends Row>(context: BodyContext<TData>): TemplateResult {
  const { host, table } = context;
  const groupStartColumnIds = getGroupStartColumnIds(table);
  return html`<tbody class="standard-tbody" role="rowgroup">
    ${repeat(
      table.getRowModel().rows,
      row => row.id,
      row => {
        const { name, nameId } = getRowMeta(context, row);
        return html`
          <tr
            role="row"
            id=${nameId}
            aria-label=${name}
            class=${classMap({ selected: row.getIsSelected(), 'group-row': row.getIsGrouped() })}
            part=${row.getIsGrouped() ? 'body-tr tr group-tr' : 'body-tr tr'}
            @click=${host.allowRowClick && !row.getIsGrouped() ? (evt: MouseEvent) => dispatchRowClick(host, evt, row.index, row.original) : nothing}>
            ${row.getVisibleCells().map(cell => renderBodyCell(context, cell, row.id, groupStartColumnIds))}
          </tr>
          ${row.getIsExpanded() && !row.getIsGrouped()
            ? html`
                <tr role="row" part="body-tr tr">
                  <td role=${getCellRole(host.cellSelection)} colspan=${row.getAllCells().length}>
                    <div class="expanded-content">
                      <slot name=${`expanded:row-${row.id}`}></slot>
                    </div>
                  </td>
                </tr>
              `
            : nothing}
        `;
      }
    )}
  </tbody>`;
}

// TODO: how to handle expanded content in virtualized rows?
function renderVirtualizedTableBody<TData extends Row>(context: BodyContext<TData>, virtualizer: RowVirtualizer): TemplateResult {
  const { host, table } = context;
  const rows = table.getRowModel().rows;
  if (virtualizer.options.count !== rows.length) {
    virtualizer.setOptions({ ...virtualizer.options, count: rows.length });
  }
  const virtualItems = virtualizer.getVirtualItems();
  const totalHeight = virtualizer.getTotalSize();
  const groupStartColumnIds = getGroupStartColumnIds(table);

  return html`<tbody
    role="rowgroup"
    class="virtualized-tbody"
    style=${styleMap({
      position: 'relative',
      height: `${totalHeight}px`
    })}>
    ${repeat(
      virtualItems,
      item => item.key,
      item => {
        const row = rows[item.index];
        const { name, nameId } = getRowMeta(context, row);
        return html`
          <tr
            role="row"
            id=${nameId}
            aria-label=${name}
            data-index="${item.index}"
            class=${classMap({
              selected: row.getIsSelected(),
              'group-row': row.getIsGrouped(),
              'virtualized-tr': true
            })}
            part=${row.getIsGrouped() ? 'body-tr tr group-tr' : 'body-tr tr'}
            style=${styleMap({
              position: 'absolute',
              transform: `translateY(${item.start}px)`,
              width: '100%',
              height: `${item.size}px`
            })}
            @click=${host.allowRowClick && !row.getIsGrouped() ? (evt: MouseEvent) => dispatchRowClick(host, evt, row.index, row.original) : nothing}>
            ${repeat(
              row.getVisibleCells(),
              cell => cell.id,
              cell => renderBodyCell(context, cell, row.id, groupStartColumnIds)
            )}
          </tr>
        `;
      }
    )}
  </tbody>`;
}
