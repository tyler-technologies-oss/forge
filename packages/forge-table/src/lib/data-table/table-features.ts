/* eslint-disable camelcase -- TanStack exports its built-in sort functions with underscores */
import {
  cellSelectionFeature,
  columnFilteringFeature,
  columnGroupingFeature,
  columnOrderingFeature,
  columnPinningFeature,
  columnResizingFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  createExpandedRowModel,
  createFilteredRowModel,
  createGroupedRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  metaHelper,
  rowAggregationFeature,
  rowExpandingFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_datetime,
  sortFn_text,
  tableFeatures
} from '@tanstack/lit-table';
import { dataTableAggregationFns } from './features/aggregation.js';
import { dataTableFilterFns } from './features/filter-fn.js';
import type { ColumnDefMeta } from './types.js';

export const dataTableFeatures = tableFeatures({
  cellSelectionFeature,
  columnFilteringFeature,
  columnGroupingFeature,
  columnOrderingFeature,
  columnPinningFeature,
  columnSizingFeature,
  columnResizingFeature,
  columnVisibilityFeature,
  rowAggregationFeature,
  rowExpandingFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  expandedRowModel: createExpandedRowModel(),
  filteredRowModel: createFilteredRowModel(),
  groupedRowModel: createGroupedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  aggregationFns: dataTableAggregationFns,
  filterFns: dataTableFilterFns,
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    datetime: sortFn_datetime,
    text: sortFn_text
  },
  columnMeta: metaHelper<ColumnDefMeta>()
});

export type DataTableFeatures = typeof dataTableFeatures;
