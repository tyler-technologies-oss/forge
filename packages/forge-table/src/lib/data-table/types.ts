import type { AggregationFnDef, Cell, Column, ColumnOrderState, ColumnVisibilityState, RowData } from '@tanstack/lit-table';
import type { DataSource, Formatter } from '@tylertech/forge-core';
import type { BuiltInColumnAggregation } from './features/aggregation.js';
import type { DataTableFeatures } from './table-features.js';
import type { CellEditablePredicate } from './templates/input-cell.js';

export type ColumnAlign = 'start' | 'center' | 'end';

export type ColumnPin = 'start' | 'end';

export type FilterType = 'text' | 'number' | 'range' | 'select' | 'date' | 'date-range' | 'time';

export interface ColumnDefMeta {
  filterVariant?: FilterType;
  cellSlot?: boolean;
  stopRowClickPropagation?: boolean;
  reorderable?: boolean;
  renamable?: boolean;
  align?: ColumnAlign;
  formatAttribute?: string;
  aggregated?: boolean;
  aggregate?: ColumnAggregation<any>;
  aggregateFormatter?: Formatter<unknown, unknown>;
  canEdit?: CellEditablePredicate;
  enableCellSelection?: boolean | EnableCellSelectionFn<any, any>;
}

export type Row = RowData;

export type RowSelectionType = 'off' | 'single' | 'multiple';

export type ColumnAggregation<TData extends Row = Row> = BuiltInColumnAggregation | AggregationFnDef<DataTableFeatures, TData>;

export type FooterCallback<TData extends Row = Row> = (props: { property: string; data: TData[]; aggregate?: unknown }) => string;

export type CustomFormatter<TData extends Row = Row, TResult = unknown> = (row: TData, index: number) => TResult;

export type TemplateFn<TData extends Row = Row, TValue = unknown> = (props: {
  row: TData;
  column: Column<DataTableFeatures, TData>;
  cell: Cell<DataTableFeatures, TData, TValue>;
}) => string | HTMLElement;

export type EnableCellSelectionFn<TData extends Row = Row, TValue = unknown> = (cell: Cell<DataTableFeatures, TData, TValue>) => boolean;

export interface ColumnDef<TData extends Row = Row> {
  id?: string;
  header?: string;
  footer?: string | FooterCallback<TData>;
  aggregate?: ColumnAggregation<TData>;
  groupable?: boolean;
  property?: string & keyof TData;
  hidden?: boolean;
  hideable?: boolean;
  resizable?: boolean;
  reorderable?: boolean;
  renamable?: boolean;
  width?: number;
  format?: Formatter<unknown, unknown> | CustomFormatter<TData>;
  template?: string | TemplateFn;
  useTemplateSlot?: boolean;
  filterType?: FilterType;
  stopRowClickPropagation?: boolean;
  columns?: ColumnDef<TData>[];
  align?: ColumnAlign;
  pin?: ColumnPin;
  editable?: boolean;
  enableCellSelection?: boolean | EnableCellSelectionFn<TData>;
}

export type MultiSortKey = 'shift' | 'ctrl' | 'meta' | 'alt';

/**
 * The complete configuration of a data table. Every field mirrors the property of the same name on the element.
 */
export interface DataTableDef<TData extends Row = Row> {
  dataSource?: DataSource<TData>;
  columns?: ColumnDef<any>[];
  columnVisibility?: ColumnVisibilityState;
  columnOrder?: ColumnOrderState;
  resizable?: boolean;
  sortable?: boolean;
  multiSort?: boolean;
  maxMultiSortColCount?: number;
  multiSortRemove?: boolean;
  multiSortKey?: MultiSortKey;
  filterable?: boolean;
  manualSort?: boolean;
  manualFilter?: boolean;
  striped?: boolean;
  hover?: boolean;
  compact?: boolean;
  bordered?: boolean;
  rowSelection?: RowSelectionType;
  cellSelection?: boolean;
  enableCellSelection?: boolean | EnableCellSelectionFn<any, any>;
  reorderable?: boolean;
  allowRowClick?: boolean;
  expandable?: boolean;
  groupable?: boolean;
  grouping?: string[];
  singleGroupColumn?: boolean;
  virtualized?: boolean;
  stickyHeader?: boolean;
  stickyFooter?: boolean;
  getRowName?: (row: TData, index: number) => string;
  getSelectionClipboardValue?: (data: unknown[][][]) => string;
}
