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
  headerColumn?: boolean;
  align?: ColumnAlign;
  formatAttribute?: string;
  aggregated?: boolean;
  aggregate?: ColumnAggregation<any>;
  aggregateFormatter?: Formatter<unknown, unknown>;
  canEdit?: CellEditablePredicate;
  enableCellSelection?: boolean | EnableCellSelectionFn<any, any>;
  onCellRender?: CellRenderFn<any, any>;
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

export interface GlobalFilterFnChangeEventDetail<TData extends Row = Row> {
  /**
   * The filter function now used by the global filter, or `undefined` when the table's `filter` has none and the default applies.
   */
  filterFn: ColumnFilterFn<TData> | undefined;
  index: number;
}

export type FooterCallback<TData extends Row = Row> = (props: { property: string; data: TData[]; aggregate?: unknown }) => string;

export type CustomFormatter<TData extends Row = Row, TResult = unknown> = (row: TData, index: number) => TResult;

export type TemplateFn<TData extends Row = Row, TValue = unknown> = (props: {
  row: TData;
  column: Column<DataTableFeatures, TData>;
  cell: Cell<DataTableFeatures, TData, TValue>;
}) => string | HTMLElement;

/**
 * Called after a body cell renders, with the props of a `TemplateFn` plus the cell's `<td>` as `element`, to modify the cell's DOM in
 * place. It runs after every render of the table, so it must be idempotent. It is not called for group rows or the selection,
 * expander and groups columns.
 */
export type CellRenderFn<TData extends Row = Row, TValue = unknown> = (props: Parameters<TemplateFn<TData, TValue>>[0] & { element: HTMLElement }) => void;

export type EnableCellSelectionFn<TData extends Row = Row, TValue = unknown> = (cell: Cell<DataTableFeatures, TData, TValue>) => boolean;

export interface ColumnDef<TData extends Row = Row> {
  id?: string;
  header?: string;
  footer?: string | FooterCallback<TData>;
  aggregate?: ColumnAggregation<TData>;
  groupable?: boolean;
  /**
   * Whether the column takes part in global filtering (`DataTableElement.globalFilter()`). Set it to `false` to leave the column out. By default a column
   * takes part when its first non-empty value is a string or a number; `true` also includes a column with other values, such as an array.
   */
  canGlobalFilter?: boolean;
  property?: string & keyof TData;
  hidden?: boolean;
  hideable?: boolean;
  resizable?: boolean;
  reorderable?: boolean;
  renamable?: boolean;
  /**
   * Renders the column's body cells as row headers (`<th scope="row">`) that name their row, instead of data cells.
   */
  headerColumn?: boolean;
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
  /**
   * Renders an input in the column's cells. A function decides per row, from the row's data, whether its cell is editable.
   */
  editable?: boolean | ((row: TData) => boolean);
  enableCellSelection?: boolean | EnableCellSelectionFn<TData>;
  /**
   * Called after each of the column's body cells renders, to modify the cell's DOM in place. Takes precedence over the table's `onCellRender`.
   */
  onCellRender?: CellRenderFn<TData>;
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
  filter?: ColumnFilterOption<TData> | ColumnFilterOption<TData>[];
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
  paginate?: boolean;
  stickyHeader?: boolean;
  stickyFooter?: boolean;
  getRowName?: (row: TData, index: number) => string;
  getSubRows?: (row: TData, index: number) => ReadonlyArray<TData> | undefined;
  getRowHasDetail?: (row: TData, index: number) => boolean;
  getRowDetail?: (row: TData, index: number) => HTMLElement;
  getSelectionClipboardValue?: (data: unknown[][][]) => string;
  onCellRender?: CellRenderFn<any, any>;
}
