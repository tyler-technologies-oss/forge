import type { Column, Table } from '@tanstack/lit-table';
import type { DataTableFeatures } from '../table-features.js';
import type { Row } from '../types.js';

const CSV_DELIMITER = ',';
const CSV_LINE_BREAK = '\r\n';
const CSV_MIME_TYPE = 'text/csv;charset=utf-8';
const UTF8_BOM = '\uFEFF';
const FIELD_NEEDS_QUOTES = /[",\r\n]/;

export const DEFAULT_CSV_FILENAME = 'data-table.csv';

/**
 * The columns that appear in the export, in the order they are displayed: visible data columns with pinned columns first and last.
 *
 * Display columns without an accessor (row selection, expander, action buttons) hold no data, so they are left out.
 */
export function getCsvColumns<TData extends Row>(table: Table<DataTableFeatures, TData>): Column<DataTableFeatures, TData>[] {
  return [...table.getStartVisibleLeafColumns(), ...table.getCenterVisibleLeafColumns(), ...table.getEndVisibleLeafColumns()].filter(
    column => !!column.accessorFn
  );
}

/**
 * Builds a CSV document from the table's current state: a header row followed by one row per sorted and filtered table row.
 *
 * Values are the columns' accessor values, so a column with a `format` exports its formatted text, while custom cell templates are ignored.
 */
export function buildCsv<TData extends Row>(table: Table<DataTableFeatures, TData>): string {
  const columns = getCsvColumns(table);
  const header = columns.map(column => getHeaderText(column));
  const rows = table.getRowModel().rows.map(row => columns.map(column => row.getValue(column.id)));
  return [header, ...rows].map(fields => fields.map(escapeField).join(CSV_DELIMITER)).join(CSV_LINE_BREAK);
}

/**
 * Downloads CSV text as a file. A byte order mark is added so spreadsheet apps read the file as UTF-8.
 */
export function downloadCsv(csv: string, filename = DEFAULT_CSV_FILENAME): void {
  const url = URL.createObjectURL(new Blob([UTF8_BOM, csv], { type: CSV_MIME_TYPE }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function getHeaderText<TData extends Row>(column: Column<DataTableFeatures, TData>): string {
  const { header } = column.columnDef;
  return typeof header === 'string' ? header : column.id;
}

export function stringifyValue(value: unknown): string {
  if (value === null || value === undefined) {
    return '';
  }

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? '' : value.toISOString();
  }

  return typeof value === 'object' ? JSON.stringify(value) : String(value);
}

function escapeField(value: unknown): string {
  const text = stringifyValue(value);
  return FIELD_NEEDS_QUOTES.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}
