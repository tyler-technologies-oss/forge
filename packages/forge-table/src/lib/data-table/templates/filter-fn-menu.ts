import '@tylertech/forge/dropdown-menu';
import '@tylertech/forge/dropdown-menu/dropdown-menu-item-radio';
import '@tylertech/forge/icon';
import '@tylertech/forge/icon-button';
import '@tylertech/forge/open-icon';
import type { Column } from '@tanstack/lit-table';
import { IconRegistry } from '@tylertech/forge';
import { tylIconFilterList } from '@tylertech/tyler-icons';
import { html, nothing, TemplateResult } from 'lit';
import type { ColumnFilterFnController } from '../features/filter-fn.js';
import { getFilterLabel } from '../features/filter-fn.js';
import { getColumnHeaderTextId } from '../features/row-meta.js';
import type { DataTableFeatures } from '../table-features.js';
import type { Row } from '../types.js';

IconRegistry.define(tylIconFilterList);

/**
 * A menu button for choosing between the filter functions of a column. Renders nothing unless the column has more than one.
 */
export function renderFilterFnMenu<TData extends Row>(
  column: Column<DataTableFeatures, TData>,
  controller: ColumnFilterFnController<TData>
): TemplateResult | typeof nothing {
  const filters = controller.getFilters(column);
  if (filters.length < 2) {
    return nothing;
  }

  const buttonId = `filter-fn-button-${column.id}`;
  const activeIndex = controller.getActiveIndex(column);
  return html`
    <forge-icon-button
      class="filter-fn-button"
      id=${buttonId}
      aria-label="Filter type"
      aria-labelledby="${buttonId} ${getColumnHeaderTextId(column.id)}"
      dense
      shape="squared">
      <forge-open-icon name="filter_list"></forge-open-icon>
    </forge-icon-button>
    <forge-dropdown-menu class="filter-fn-menu" trigger=${buttonId} dense>
      ${filters.map(
        (filter, index) => html`
          <forge-dropdown-menu-item-radio name="filter-fn-${column.id}" ?checked=${index === activeIndex} @click=${() => controller.select(column, index)}>
            ${getFilterLabel(filter, index)}
          </forge-dropdown-menu-item-radio>
        `
      )}
    </forge-dropdown-menu>
  `;
}
