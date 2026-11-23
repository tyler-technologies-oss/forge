import type { AggregationFnDef, Cell, Column, ColumnOrderState, ColumnVisibilityState, FilterFn, RowData, SortFn } from '@tanstack/lit-table';
import type { DataSource, Formatter } from '@tylertech/forge-core';
import type { BuiltInColumnAggregation } from './features/aggregation.js';
import type { DataTableFeatures } from './table-features.js';
import type { CellEditablePredicate } from './templates/input-cell.js';

export type ColumnAlign = 'start' | 'center' | 'end';

export type ColumnPin = 'start' | 'end';

export type DataType = 'string' | 'number' | 'date' | 'time' | 'boolean' | 'array';

export interface ColumnDefMeta {
  dataType?: DataType;
  filters?: ResolvedColumnFilter<any>[];
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

export type FilterFieldType = 'text' | 'select' | 'range';

export interface FilterFieldOption {
  value: unknown;
  label: string;
}

/**
 * The field a filter function renders in the column header. `text` and `range` render inputs that follow the column's `dataType`
 * (text, number mask, date picker or time input). A `range` field produces a `[min, max]` filter value, and a `multiple` `select`
 * an array of the chosen option values.
 */
export interface FilterFieldConfig {
  /**
   * The kind of field. When omitted, it is the default of the filter function (`range` for `between`, a `multiple` `select` for
   * `arrIncludes`, ...), else `text`. Inputs follow the column's `dataType`.
   */
  type?: FilterFieldType;
  /**
   * The options of a `select` field. Without any, they are the distinct values of the column (the items of array values).
   */
  options?: FilterFieldOption[];
  /**
   * Whether a `select` field allows choosing more than one option.
   */
  multiple?: boolean;
  /**
   * The inline size of the field as any CSS size value, such as `120px` or `10rem`.
   */
  size?: string;
}

/**
 * A TanStack filter function: a built-in `filterFn_*` or a custom one that follows the same API.
 */
export type ColumnFilterFn<TData extends Row = Row> = FilterFn<DataTableFeatures, TData>;

/**
 * A way to filter a column. A `label` names it in the filter function menu; without one, the name its function was registered
 * under is used. A `field` configures the field that filters with it. Its `type` can be left out to use the default of the filter function (the built-in
 * range and array functions exported by this package have their own), else `text`.
 */
export interface ColumnFilter<TData extends Row = Row> {
  /**
   * The filter function, or the name it was registered under with `registerFilterFns`.
   */
  filterFn: ColumnFilterFn<TData> | string;
  label?: string;
  field?: FilterFieldConfig;
}

/**
 * A `ColumnFilter`, or just its filter function (or the registered name of one), in which case the label and field are inferred.
 */
export type ColumnFilterOption<TData extends Row = Row> = ColumnFilter<TData> | ColumnFilterFn<TData> | string;

/**
 * A TanStack sort function: a built-in `sortFn_*` or a custom one that follows the same API.
 */
export type ColumnSortFn<TData extends Row = Row> = SortFn<DataTableFeatures, TData>;

export type ResolvedColumnFilter<TData extends Row = Row> = ColumnFilter<TData> & { filterFn: ColumnFilterFn<TData> };

export interface FilterFnChangeEventDetail<TData extends Row = Row> {
  columnId: string;
  filterFn: ColumnFilterFn<TData>;
  index: number;
}

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
  dataType?: DataType;
  filter?: ColumnFilterOption<TData> | ColumnFilterOption<TData>[];
  /**
   * The function that sorts the column, instead of the one TanStack picks from its values. Passed straight to TanStack, so it needs no registration.
   */
  sortFn?: ColumnSortFn<TData>;
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
