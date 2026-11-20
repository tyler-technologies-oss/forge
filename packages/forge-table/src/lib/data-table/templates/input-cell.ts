import type { Cell, CellContext } from '@tanstack/lit-table';
import { html, type TemplateResult } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { getCellLabelledBy } from '../features/row-meta.js';
import type { DataTableFeatures } from '../table-features.js';
import type { ColumnDef, Row, TemplateFn } from '../types.js';

type AnyCell = Cell<DataTableFeatures, any, unknown>;

export type CellEditablePredicate = (cell: AnyCell) => boolean;

/**
 * Resolves the `editable` option of a column definition into a predicate that can be evaluated for a cell.
 *
 * Returns `undefined` when the column is never editable.
 */
export function createCellEditablePredicate<TData extends Row>(column: ColumnDef<TData>): CellEditablePredicate | undefined {
  const { editable } = column;
  return editable ? () => true : undefined;
}

export function isCellEditable(cell: AnyCell): boolean {
  return cell.column.columnDef.meta?.canEdit?.(cell) ?? false;
}

/**
 * Creates a column `cell` renderer that renders an input covering the whole cell when the cell is editable.
 *
 * Cells that are not editable are rendered with the `fallback` template, or as their plain value.
 *
 * @example
 * ```ts
 * { header: 'Name', property: 'name', cell: inputCell() }
 * ```
 */
export function inputCell(fallback?: TemplateFn) {
  return (props: CellContext<DataTableFeatures, any, unknown>): string | HTMLElement | TemplateResult => {
    const { cell } = props;
    if (isCellEditable(cell)) {
      return renderInput(cell);
    }
    return fallback ? fallback(props as unknown as Parameters<TemplateFn>[0]) : String(cell.renderValue() ?? '');
  };
}

function renderInput(cell: AnyCell): TemplateResult {
  const { header } = cell.column.columnDef;
  const value = cell.getValue();
  return html`
    <div class="input-cell">
      <input
        type="text"
        class="input-cell-input"
        aria-label=${ifDefined(typeof header === 'string' ? header : undefined)}
        aria-labelledby=${ifDefined(getCellLabelledBy(cell))}
        .value=${value == null ? '' : String(value)} />
    </div>
  `;
}
