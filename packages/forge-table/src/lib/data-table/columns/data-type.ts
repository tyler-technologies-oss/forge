import type { Column } from '@tanstack/lit-table';
import type { DataTableFeatures } from '../table-features.js';
import type { DataType, Row } from '../types.js';

const isDefined = (value: unknown): boolean => value !== null && value !== undefined && value !== '';

function inferValueType(value: unknown): DataType | undefined {
  if (typeof value === 'number' || typeof value === 'bigint') {
    return 'number';
  }
  if (typeof value === 'boolean') {
    return 'boolean';
  }
  if (typeof value === 'string') {
    return 'string';
  }
  if (value instanceof Date) {
    return 'date';
  }
  if (Array.isArray(value)) {
    return 'array';
  }
  return undefined;
}

/**
 * The raw values of a column in its unfiltered rows. Empty for columns without a `property`.
 */
export function getColumnValues<TData extends Row>(column: Column<DataTableFeatures, TData>): unknown[] {
  const { accessorKey } = column.columnDef as { accessorKey?: string };
  if (!accessorKey) {
    return [];
  }
  return column.table.getCoreRowModel().rows.map(row => (row.original as Record<string, unknown>)[accessorKey]);
}

/**
 * Resolves the data type of a column: the one set on its definition, else the type of the first value in the column's
 * unfiltered rows. Returns `undefined` when the column has no property or no values to infer from.
 */
export function getColumnDataType<TData extends Row>(column: Column<DataTableFeatures, TData>): DataType | undefined {
  const { meta } = column.columnDef as { meta?: { dataType?: DataType } };
  return meta?.dataType ?? inferValueType(getColumnValues(column).find(isDefined));
}
