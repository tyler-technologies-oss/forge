import { html, nothing, TemplateResult } from 'lit';
import { PAGINATOR_SLOT_NAME } from '../constants.js';
import type { DataTableElement } from '../data-table.js';
import type { PaginationController } from '../features/pagination.js';
import type { Row } from '../types.js';

export function renderPaginator<TData extends Row>(host: DataTableElement<TData>, pagination: PaginationController<TData>): TemplateResult | typeof nothing {
  if (!host.paginate) {
    return nothing;
  }

  return html`
    <div class="paginator" part="paginator">
      <slot name=${PAGINATOR_SLOT_NAME} @slotchange=${pagination.handleSlotChange} @forge-paginator-change=${pagination.handleChange}></slot>
    </div>
  `;
}
