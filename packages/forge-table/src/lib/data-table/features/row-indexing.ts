import type { Table } from '@tanstack/lit-table';
import type { DataTableElement } from '../data-table.js';
import type { DataTableFeatures } from '../table-features.js';
import type { Row } from '../types.js';
import { DEFAULT_PAGINATION } from './pagination.js';

/**
 * Describes where the rendered rows sit in the whole table, for the `aria-rowindex` of each row and the `aria-rowcount` of the host.
 */
export interface RowIndexing {
  headerRowCount: number;
  bodyRowCount: number;
  footerRowCount: number;
  bodyOffset: number;
}

export function hasTableFooter<TData extends Row>(table: Table<DataTableFeatures, TData>): boolean {
  return table
    .getFooterGroups()
    .flatMap(footerGroup => footerGroup.headers.flatMap(header => header.column.columnDef.footer))
    .some(footer => footer !== undefined);
}

/**
 * Returns the row indexing, or `undefined` when every row is in the DOM (the table is neither `virtualized` nor paginated) or there are no
 * body rows, in which case assistive technology derives the positions from the DOM. Detail rows are not counted.
 */
export function getRowIndexing<TData extends Row>(host: DataTableElement<TData>, table: Table<DataTableFeatures, TData>): RowIndexing | undefined {
  if (!host.virtualized && !host.paginate) {
    return undefined;
  }

  const renderedRowCount = table.getRowModel().rows.length;
  if (!renderedRowCount) {
    return undefined;
  }

  const { pageIndex, pageSize } = table.options.state?.pagination ?? DEFAULT_PAGINATION;
  return {
    headerRowCount: table.getHeaderGroups().length,
    bodyRowCount: host.paginate ? table.getRowCount() : renderedRowCount,
    footerRowCount: hasTableFooter(table) ? table.getFooterGroups().length : 0,
    bodyOffset: host.paginate ? pageIndex * pageSize : 0
  };
}

export const getAriaRowCount = ({ headerRowCount, bodyRowCount, footerRowCount }: RowIndexing): number => headerRowCount + bodyRowCount + footerRowCount;

export const getHeaderRowIndex = (indexing: RowIndexing | undefined, headerRowPosition: number): number | undefined =>
  indexing ? headerRowPosition + 1 : undefined;

export const getBodyRowIndex = (indexing: RowIndexing | undefined, bodyRowPosition: number): number | undefined =>
  indexing ? indexing.headerRowCount + indexing.bodyOffset + bodyRowPosition + 1 : undefined;

export const getFooterRowIndex = (indexing: RowIndexing | undefined, footerRowPosition: number): number | undefined =>
  indexing ? indexing.headerRowCount + indexing.bodyRowCount + footerRowPosition + 1 : undefined;
