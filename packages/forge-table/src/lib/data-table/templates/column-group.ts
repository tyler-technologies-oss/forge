import type { Table } from '@tanstack/lit-table';
import { html, nothing, TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { getColumnWidthStyle } from '../features/column-sizing.js';
import type { DataTableFeatures } from '../table-features.js';
import type { Row } from '../types.js';

export function renderColumnGroup<TData extends Row>(table: Table<DataTableFeatures, TData>, resizable: boolean): TemplateResult | typeof nothing {
  if (!table.getIsSomeColumnsPinned()) {
    return nothing;
  }

  return html`<colgroup>
    ${[...table.getStartVisibleLeafColumns(), ...table.getCenterVisibleLeafColumns(), ...table.getEndVisibleLeafColumns()].map(
      column => html`<col style=${styleMap({ width: getColumnWidthStyle(column, resizable) })} />`
    )}
  </colgroup>`;
}
