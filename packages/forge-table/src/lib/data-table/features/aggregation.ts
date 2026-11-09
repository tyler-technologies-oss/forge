/* eslint-disable camelcase -- TanStack exports its built-in aggregation functions with underscores */
import {
  aggregationFn_count,
  aggregationFn_extent,
  aggregationFn_first,
  aggregationFn_last,
  aggregationFn_max,
  aggregationFn_mean,
  aggregationFn_median,
  aggregationFn_min,
  aggregationFn_sum,
  aggregationFn_unique,
  aggregationFn_uniqueCount,
  constructAggregationFn
} from '@tanstack/lit-table';
import type { Formatter } from '@tylertech/forge-core';
import type { AggregationFnDef, Row as TanstackRow } from '@tanstack/lit-table';
import type { DataTableFeatures } from '../table-features.js';
import type { ColumnAggregation, Row } from '../types.js';

const RANGE_SEPARATOR = ' – ';
const LIST_SEPARATOR = ', ';
const UNIT_PRESERVING_AGGREGATIONS = new Set<string>(['sum', 'mean', 'median', 'min', 'max', 'extent', 'first', 'last', 'unique']);

/**
 * The built-in TanStack aggregation functions registered with the table, keyed by the names that `ColumnDef.aggregate` accepts.
 */
export const dataTableAggregationFns = {
  count: aggregationFn_count,
  extent: aggregationFn_extent,
  first: aggregationFn_first,
  last: aggregationFn_last,
  max: aggregationFn_max,
  mean: aggregationFn_mean,
  median: aggregationFn_median,
  min: aggregationFn_min,
  sum: aggregationFn_sum,
  unique: aggregationFn_unique,
  uniqueCount: aggregationFn_uniqueCount
};

export type BuiltInColumnAggregation = keyof typeof dataTableAggregationFns;

/**
 * Resolves a `ColumnDef.aggregate` option to a TanStack aggregation definition.
 *
 * When `getValue` is provided, the aggregation reads each row's value through it instead of the column's accessor. This
 * keeps columns with a `Formatter` aggregating the raw property rather than its formatted string.
 */
export function createAggregationFn<TData extends Row>(
  aggregate: ColumnAggregation<TData>,
  getValue?: (row: TData) => unknown
): AggregationFnDef<DataTableFeatures, TData> {
  const definition: AggregationFnDef<DataTableFeatures, TData> =
    typeof aggregate === 'string' ? (dataTableAggregationFns[aggregate] as AggregationFnDef) : aggregate;
  if (!getValue) {
    return definition;
  }

  const readValue = (row: TanstackRow<DataTableFeatures, TData>): unknown => getValue(row.original);
  return constructAggregationFn<DataTableFeatures, TData>({ aggregate: context => definition.aggregate({ ...context, getValue: readValue }) });
}

/**
 * Formats an aggregation result for display. The `extent` result is a `[min, max]` range, joined with an en dash; other lists
 * (`unique`) are joined with commas.
 *
 * The `formatter` is applied to each value, but only for aggregations whose result is still in the column's units. `count` and
 * `uniqueCount` are plain numbers, and a custom aggregation function's result is unknown.
 */
export function formatAggregationValue(value: unknown, aggregate?: unknown, formatter?: Formatter<unknown, unknown>): string {
  const itemFormatter = typeof aggregate === 'string' && UNIT_PRESERVING_AGGREGATIONS.has(aggregate) ? formatter : undefined;
  return formatValue(value, aggregate, itemFormatter);
}

function formatValue(value: unknown, aggregate: unknown, formatter?: Formatter<unknown, unknown>): string {
  if (value === null || value === undefined) {
    return '';
  }

  if (Array.isArray(value)) {
    return value
      .map(item => formatValue(item, aggregate, formatter))
      .filter(item => item.length > 0)
      .join(aggregate === 'extent' ? RANGE_SEPARATOR : LIST_SEPARATOR);
  }

  if ((typeof value === 'number' && Number.isNaN(value)) || (value instanceof Date && Number.isNaN(value.getTime()))) {
    return '';
  }

  if (formatter) {
    return String(formatter.format(value));
  }

  if (typeof value === 'number') {
    return value.toLocaleString();
  }

  return value instanceof Date ? value.toLocaleDateString() : String(value);
}
