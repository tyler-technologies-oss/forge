import type { Column, ColumnDef as TanstackColumnDef, Table } from '@tanstack/lit-table';
import { html } from 'lit';
import { DEFAULT_COLUMN_WIDTH, SELECT_COLUMN_ID, SELECT_COLUMN_WIDTH } from '../constants.js';
import type { ColumnDef, CustomFormatter, FooterCallback, Row, RowSelectionType } from '../types.js';
import { Formatter } from '@tylertech/forge-core';
import { getFormatterAttribute } from './formatter-attributes.js';
import type { DataTableFeatures } from '../table-features.js';

export interface LeafColumn<TData extends Row> {
  column: ColumnDef<TData>;
  indexPath: number[];
}

export function resolveColumnId<TData extends Row>(column: ColumnDef<TData>, indexPath: number | number[]): string {
  if (column.id) {
    return column.id;
  }

  if (column.property) {
    return column.property.toString();
  }

  if (typeof column.header === 'string' && column.header.length > 0) {
    return column.header.toLowerCase().replace(/\s+/g, '-');
  }

  const pathStr = Array.isArray(indexPath) ? indexPath.join('-') : indexPath;
  return `column-${pathStr}`;
}

export function hasChildColumns<TData extends Row>(column: ColumnDef<TData> | undefined): boolean {
  return Array.isArray(column?.columns) && column.columns.length > 0;
}

export function mapColumns<TData extends Row>(columns: ColumnDef<TData>[], parentIndices: number[] = []): TanstackColumnDef<DataTableFeatures, TData>[] {
  return columns.map((column, index) => {
    const indexPath = [...parentIndices, index];
    const columnId = resolveColumnId(column, indexPath);
    const isParent = hasChildColumns(column);

    const baseColumn = {
      id: columnId,
      header: column.header,
      footer:
        typeof column.footer === 'function'
          ? (context: { column: Column<DataTableFeatures, TData>; table: Table<DataTableFeatures, TData> }) => {
              const propertyId = (column.property ?? context.column.id) as string;
              const filteredData = context.table.getFilteredRowModel().rows.map(r => r.original);
              return (column.footer as FooterCallback<TData>)({ property: propertyId, data: filteredData });
            }
          : column.footer,
      enableHiding: column.hideable ?? true,
      size: column.width ?? DEFAULT_COLUMN_WIDTH,
      meta: {
        cellSlot: column.useTemplateSlot,
        filterVariant: column.filterType,
        stopRowClickPropagation: column.stopRowClickPropagation,
        reorderable: column.reorderable,
        align: column.align,
        formatAttribute: getFormatterAttribute(column.format)
      }
    };

    if (isParent && column.columns) {
      const hasHeader = typeof column.header === 'string' && column.header.length > 0;
      return {
        ...baseColumn,
        columns: mapColumns(column.columns, indexPath),
        enableResizing: hasHeader ? (column.resizable ?? true) : false,
        enableSorting: false,
        enableColumnFilter: false
      } satisfies TanstackColumnDef<DataTableFeatures, TData>;
    } else {
      const leafColumn = {
        ...baseColumn,
        accessorKey: column.property,
        accessorFn:
          column.format instanceof Formatter
            ? (row: TData) => (column.format as Formatter<unknown, unknown>).format(row[column.property as keyof TData])
            : column.format
              ? (row: TData, i: number = 0) => (column.format as CustomFormatter<TData>)(row, i)
              : undefined,
        enableResizing: column.resizable ?? true,
        ...(typeof column.template === 'function' && { cell: column.template })
      } satisfies TanstackColumnDef<DataTableFeatures, TData>;

      return leafColumn;
    }
  });
}

export function getAllLeafColumns<TData extends Row>(columns: ColumnDef<TData>[], parentIndices: number[] = []): LeafColumn<TData>[] {
  return columns.flatMap((column, index) => {
    const indexPath = [...parentIndices, index];
    if (hasChildColumns(column) && column.columns) {
      return getAllLeafColumns(column.columns, indexPath);
    }
    return [{ column, indexPath }];
  });
}

export function getAllColumnIds<TData extends Row>(columns: ColumnDef<TData>[], parentIndices: number[] = []): string[] {
  return columns.flatMap((column, index) => {
    const indexPath = [...parentIndices, index];
    const columnId = resolveColumnId(column, indexPath);
    const isParent = hasChildColumns(column);

    if (isParent && column.columns) {
      const hasHeader = typeof column.header === 'string' && column.header.length > 0;
      if (hasHeader) {
        return [columnId, ...getAllColumnIds(column.columns, indexPath)];
      } else {
        return getAllColumnIds(column.columns, indexPath);
      }
    }
    return [columnId];
  });
}

export function prependSelectColumn<TData extends Row>(
  columns: TanstackColumnDef<DataTableFeatures, TData>[],
  rowSelection: RowSelectionType
): TanstackColumnDef<DataTableFeatures, TData>[] {
  if (columns.some(column => column.id === SELECT_COLUMN_ID)) {
    return [...columns];
  }

  const selectColumn: TanstackColumnDef<DataTableFeatures, TData> = {
    id: SELECT_COLUMN_ID,
    size: SELECT_COLUMN_WIDTH,
    enableResizing: false,
    enableColumnFilter: false,
    enableSorting: false,
    enableHiding: false,
    header:
      rowSelection === 'multiple'
        ? ({ table }) =>
            html`<forge-checkbox
                @change="${table.getToggleAllRowsSelectedHandler()}"
                .checked="${table.getIsAllRowsSelected()}"
                .indeterminate="${table.getIsSomeRowsSelected()}"></forge-checkbox>
              <forge-tooltip>Toggle all rows</forge-tooltip>`
        : undefined,
    cell: ({ row }) => html`
      <forge-checkbox
        @change="${row.getToggleSelectedHandler()}"
        .checked="${row.getIsSelected()}"
        ?disabled="${!row.getCanSelect()}"
        .indeterminate="${row.getIsSomeSelected()}"></forge-checkbox>
      <forge-tooltip>Select row</forge-tooltip>
    `
  };

  return [selectColumn, ...columns];
}

export function canColumnBeReordered<TData extends Row>(column: Column<DataTableFeatures, TData>): boolean {
  if (column.columnDef.id === SELECT_COLUMN_ID) {
    return false;
  }
  return column.columnDef.meta?.reorderable ?? true;
}
