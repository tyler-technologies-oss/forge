import type { Column, ColumnDef as TanstackColumnDef, Table } from '@tanstack/lit-table';
import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { DEFAULT_COLUMN_WIDTH, GROUPS_COLUMN_HEADER, GROUPS_COLUMN_ID, GROUPS_COLUMN_WIDTH, SELECT_COLUMN_ID, SELECT_COLUMN_WIDTH } from '../constants.js';
import type { ColumnDef, CustomFormatter, Row, RowSelectionType } from '../types.js';
import { Formatter } from '@tylertech/forge-core';
import { getFormatterAttribute } from './formatter-attributes.js';
import type { DataTableFeatures } from '../table-features.js';
import { createAggregationFn, formatAggregationValue } from '../features/aggregation.js';
import { resolveColumnFilters } from '../features/filter-fn.js';
import { getCellLabelledBy } from '../features/row-meta.js';
import { createCellEditablePredicate, inputCell } from '../templates/input-cell.js';

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

interface FooterContext<TData extends Row> {
  column: Column<DataTableFeatures, TData>;
  table: Table<DataTableFeatures, TData>;
}

function getRawValueReader<TData extends Row>(column: ColumnDef<TData>): ((row: TData) => unknown) | undefined {
  return column.format instanceof Formatter && column.property ? row => row[column.property as keyof TData] : undefined;
}

function mapFooter<TData extends Row>(column: ColumnDef<TData>): TanstackColumnDef<DataTableFeatures, TData>['footer'] {
  const { footer, aggregate } = column;
  if (typeof footer === 'string' || (typeof footer !== 'function' && !aggregate)) {
    return footer;
  }

  return ({ column: tableColumn, table }: FooterContext<TData>) => {
    const value = aggregate ? tableColumn.getAggregationValue() : undefined;
    if (typeof footer !== 'function') {
      return formatAggregationValue(value, aggregate, column.format instanceof Formatter ? column.format : undefined);
    }

    const propertyId = (column.property ?? tableColumn.id) as string;
    const data = table.getFilteredRowModel().rows.map(row => row.original);
    return footer({ property: propertyId, data, aggregate: value });
  };
}

function getStaticCellSelection<TData extends Row>({ enableCellSelection, stopRowClickPropagation, editable }: ColumnDef<TData>): false | undefined {
  if (enableCellSelection === undefined) {
    return stopRowClickPropagation || editable ? false : undefined;
  }
  return enableCellSelection === false ? false : undefined;
}

export function mapColumns<TData extends Row>(columns: ColumnDef<TData>[], parentIndices: number[] = []): TanstackColumnDef<DataTableFeatures, TData>[] {
  return columns.map((column, index) => {
    const indexPath = [...parentIndices, index];
    const columnId = resolveColumnId(column, indexPath);
    const isParent = hasChildColumns(column);
    const filters = resolveColumnFilters(column.filter);

    const baseColumn = {
      id: columnId,
      header: column.header,
      footer: mapFooter(column),
      enableHiding: column.hideable ?? true,
      enableGrouping: column.groupable,
      enableCellSelection: getStaticCellSelection(column),
      size: column.width ?? DEFAULT_COLUMN_WIDTH,
      meta: {
        cellSlot: column.useTemplateSlot,
        dataType: column.dataType,
        filters: filters.length ? filters : undefined,
        stopRowClickPropagation: column.stopRowClickPropagation,
        reorderable: column.reorderable,
        renamable: column.renamable,
        align: column.align,
        formatAttribute: getFormatterAttribute(column.format),
        aggregated: !!column.aggregate && typeof column.footer !== 'string',
        aggregate: column.aggregate,
        aggregateFormatter: column.format instanceof Formatter ? column.format : undefined,
        canEdit: createCellEditablePredicate(column),
        enableCellSelection: column.enableCellSelection
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
        ...(filters.length > 0 && { filterFn: filters[0].filterFn }),
        ...(column.sortFn && { sortFn: column.sortFn }),
        ...(column.aggregate && { aggregationFn: createAggregationFn(column.aggregate, getRawValueReader(column)) }),
        ...(column.editable
          ? { cell: inputCell(typeof column.template === 'function' ? column.template : undefined) }
          : typeof column.template === 'function' && { cell: column.template })
      };

      return leafColumn as TanstackColumnDef<DataTableFeatures, TData>;
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

export function applyColumnHeaders<TData extends Row>(
  columns: TanstackColumnDef<DataTableFeatures, TData>[],
  headers: Readonly<Record<string, string>>
): TanstackColumnDef<DataTableFeatures, TData>[] {
  if (!Object.keys(headers).length) {
    return [...columns];
  }

  return columns.map(column => {
    const header = column.id ? headers[column.id] : undefined;
    const withHeader = header === undefined ? column : { ...column, header };
    const children = 'columns' in withHeader ? withHeader.columns : undefined;
    return children ? { ...withHeader, columns: applyColumnHeaders([...children], headers) } : withHeader;
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
    enableCellSelection: false,
    header:
      rowSelection === 'multiple'
        ? ({ table }) =>
            html`<forge-checkbox
                @change="${table.getToggleAllRowsSelectedHandler()}"
                .checked="${table.getIsAllRowsSelected()}"
                .indeterminate="${table.getIsSomeRowsSelected()}"></forge-checkbox>
              <forge-tooltip>Toggle all rows</forge-tooltip>`
        : undefined,
    cell: ({ row, cell }) => html`
      <forge-checkbox
        aria-labelledby="${ifDefined(getCellLabelledBy(cell))}"
        @change="${row.getToggleSelectedHandler()}"
        .checked="${row.getIsSelected()}"
        ?disabled="${!row.getCanSelect()}"
        .indeterminate="${row.getIsSomeSelected()}"></forge-checkbox>
      <forge-tooltip>Select row</forge-tooltip>
    `
  };

  return [selectColumn, ...columns];
}

/**
 * Prepends the column that shows the groups when `singleGroupColumn` is set. Its cells are empty in data rows, because a group row shows its label there.
 */
export function prependGroupsColumn<TData extends Row>(columns: TanstackColumnDef<DataTableFeatures, TData>[]): TanstackColumnDef<DataTableFeatures, TData>[] {
  if (columns.some(column => column.id === GROUPS_COLUMN_ID)) {
    return [...columns];
  }

  const groupsColumn: TanstackColumnDef<DataTableFeatures, TData> = {
    id: GROUPS_COLUMN_ID,
    header: GROUPS_COLUMN_HEADER,
    size: GROUPS_COLUMN_WIDTH,
    enableColumnFilter: false,
    enableSorting: false,
    enableHiding: false,
    enableGrouping: false,
    enableCellSelection: false,
    cell: () => nothing
  };

  return [groupsColumn, ...columns];
}

export function canColumnBeReordered<TData extends Row>(column: Column<DataTableFeatures, TData>): boolean {
  if (column.columnDef.id === SELECT_COLUMN_ID || column.columnDef.id === GROUPS_COLUMN_ID) {
    return false;
  }
  return column.columnDef.meta?.reorderable ?? true;
}

export function getGroupStartColumnIds<TData extends Row>(table: Table<DataTableFeatures, TData>): ReadonlySet<string> {
  const groupStartColumnIds = new Set<string>();
  table.getVisibleLeafColumns().forEach((column, index, columns) => {
    if (index > 0 && column.parent?.id !== columns[index - 1].parent?.id) {
      groupStartColumnIds.add(column.id);
    }
  });
  return groupStartColumnIds;
}
