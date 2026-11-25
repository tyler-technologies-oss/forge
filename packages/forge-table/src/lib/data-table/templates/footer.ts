import { FlexRender, type Table } from '@tanstack/lit-table';
import { html, nothing, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';
import { formatAttribute } from '../directives/format-attribute.js';
import { getColumnWidthStyle } from '../features/column-sizing.js';
import { getPinnedColumnClasses, getPinnedColumnStyle } from '../features/column-pinning.js';
import { getFooterRowIndex, hasTableFooter, type RowIndexing } from '../features/row-indexing.js';
import type { DataTableFeatures } from '../table-features.js';
import type { Row } from '../types.js';

export function renderTableFooter<TData extends Row>(
  table: Table<DataTableFeatures, TData>,
  resizable: boolean,
  rowIndexing?: RowIndexing
): TemplateResult | typeof nothing {
  if (!hasTableFooter(table)) {
    return nothing;
  }

  return html`<tfoot role="rowgroup">
    ${table.getFooterGroups().map(
      (footerGroup, footerRowPosition) => html`
        <tr role="row" part="tfoot-tr tr" aria-rowindex=${ifDefined(getFooterRowIndex(rowIndexing, footerRowPosition))}>
          ${footerGroup.headers.map(
            header => html`
              <th
                role="columnheader"
                part="tfoot-cell cell"
                colspan=${ifDefined(header.colSpan > 1 ? header.colSpan : undefined)}
                style=${styleMap({ width: getColumnWidthStyle(header.column, resizable), ...getPinnedColumnStyle(header.column) })}
                class=${classMap({ ...getPinnedColumnClasses(header.column), 'empty-footer': header.column.columnDef.footer === undefined })}
                data-align=${ifDefined(header.column.columnDef.meta?.aggregated ? header.column.columnDef.meta.align : undefined)}
                ${formatAttribute(header.column.columnDef.meta?.aggregated ? header.column.columnDef.meta.formatAttribute : undefined)}>
                <div class="cell-content" part="footer-cell-content cell-content">${FlexRender({ footer: header })}</div>
              </th>
            `
          )}
        </tr>
      `
    )}
  </tfoot>`;
}
