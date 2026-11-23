/* eslint-disable camelcase -- TanStack exports its built-in sort functions with underscores */
import { compareItems, rankItem } from '@tanstack/match-sorter-utils';
import type { RankingInfo } from '@tanstack/match-sorter-utils';
import { sortFn_alphanumeric } from '@tanstack/lit-table';
import type { FilterFn, SortFn } from '@tanstack/lit-table';

/**
 * The filter meta that `fuzzyFilter` stores on a row, read from `row.columnFiltersMeta[columnId]`.
 */
export interface FuzzyFilterMeta {
  itemRank?: RankingInfo;
}

/**
 * A fuzzy match filter function, for `ColumnDef.filter`. It ranks the value of the cell against the filter text with
 * `@tanstack/match-sorter-utils` and keeps the row when it passes, storing the rank in the row's filter meta for `fuzzySort`.
 */
export const fuzzyFilter: FilterFn<any, any> = (row, columnId, filterValue, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), filterValue);
  addMeta?.({ itemRank } satisfies FuzzyFilterMeta);
  return itemRank.passed;
};

/**
 * Sorts a column by the rank `fuzzyFilter` gave its rows, best match first, for `ColumnDef.sortFn`. Rows without a rank, or equal ranks, are
 * sorted alphanumerically.
 */
export const fuzzySort: SortFn<any, any> = (rowA, rowB, columnId) => {
  const rankA = (rowA.columnFiltersMeta[columnId] as FuzzyFilterMeta | undefined)?.itemRank;
  const rankB = (rowB.columnFiltersMeta[columnId] as FuzzyFilterMeta | undefined)?.itemRank;
  const direction = rankA && rankB ? compareItems(rankA, rankB) : 0;
  return direction === 0 ? sortFn_alphanumeric(rowA, rowB, columnId) : direction;
};
