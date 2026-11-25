import type { Column } from '@tanstack/lit-table';
import { getColumnValues } from '../columns/data-type.js';
import type { DataTableFeatures } from '../table-features.js';
import type { FilterFieldOption, FilterFieldType, ResolvedColumnFilter, Row } from '../types.js';

export interface ResolvedFilterField {
  type: FilterFieldType;
  options: FilterFieldOption[];
  multiple: boolean;
  size?: string;
}

const isPresent = (value: unknown): boolean => value !== null && value !== undefined && value !== '';

function inferOptions<TData extends Row>(column: Column<DataTableFeatures, TData>): FilterFieldOption[] {
  const values = getColumnValues(column).flatMap(value => (Array.isArray(value) ? value : [value]));
  return [...new Set(values.filter(isPresent))].map(value => ({ value, label: String(value) }));
}

/**
 * The field a filter renders: its `field` configuration, else a `text` field. A `select` without `options` gets the
 * distinct values of the column.
 */
export function resolveFilterField<TData extends Row>(column: Column<DataTableFeatures, TData>, filter?: ResolvedColumnFilter<TData>): ResolvedFilterField {
  const { type = 'text', options, multiple, size } = filter?.field ?? {};
  if (type !== 'select') {
    return { type, options: [], multiple: false, size };
  }
  return { type, options: options ?? inferOptions(column), multiple: !!multiple, size };
}

/**
 * Identifies the shape of the filter value a field produces, so that a value is only kept between fields that produce the same one.
 */
export function getFilterFieldShape({ type, multiple }: ResolvedFilterField): string {
  return multiple ? `${type}-multiple` : type;
}
