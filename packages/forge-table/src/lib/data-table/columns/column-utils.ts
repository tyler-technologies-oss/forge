import type { Column, ColumnDef as TanstackColumnDef, Table } from '@tanstack/lit-table';
import { html } from 'lit';
import { DEFAULT_COLUMN_WIDTH, SELECT_COLUMN_ID } from '../constants.js';
import type { ColumnDef, FooterCallback, Row, RowSelectionType } from '../types.js';

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

export function mapColumns<TData extends Row>(columns: ColumnDef<TData>[], parentIndices: number[] = []): TanstackColumnDef<TData>[] {
  return columns.map((column, index) => {
    const indexPath = [...parentIndices, index];
    const columnId = resolveColumnId(column, indexPath);
    const isParent = hasChildColumns(column);

    const baseColumn = {
      id: columnId,
      header: column.header,
      footer:
        typeof column.footer === 'function'
          ? (context: { column: Column<TData>; table: Table<TData> }) => {
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
        reorderable: column.reorderable
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
      } as TanstackColumnDef<TData>;
    } else {
      const leafColumn = {
        ...baseColumn,
        accessorKey: column.property,
        accessorFn: column.transform,
        enableResizing: column.resizable ?? true,
        ...(typeof column.template === 'function' && { cell: column.template })
      };

      return leafColumn as TanstackColumnDef<TData>;
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

export function prependSelectColumn<TData extends Row>(columns: TanstackColumnDef<TData>[], rowSelection: RowSelectionType): TanstackColumnDef<TData>[] {
  if (columns.some(column => column.id === SELECT_COLUMN_ID)) {
    return [...columns];
  }

  const selectColumn: TanstackColumnDef<TData> = {
    id: SELECT_COLUMN_ID,
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

export function canColumnBeReordered<TData extends Row>(column: Column<TData>): boolean {
  if (column.columnDef.id === SELECT_COLUMN_ID) {
    return false;
  }
  return column.columnDef.meta?.reorderable ?? true;
}
