import type { Cell, Column, RowData } from '@tanstack/lit-table';
import type { Formatter } from '@tylertech/forge-core';
import type { DataTableFeatures } from './table-features.js';

export type ColumnAlign = 'start' | 'center' | 'end';

export type FilterType = 'text' | 'number' | 'range' | 'select' | 'date' | 'date-range' | 'time';

export interface ColumnDefMeta {
  filterVariant?: FilterType;
  cellSlot?: boolean;
  stopRowClickPropagation?: boolean;
  reorderable?: boolean;
  align?: ColumnAlign;
  formatAttribute?: string;
}

export type Row = RowData;

export type RowSelectionType = 'off' | 'single' | 'multiple';

export type FooterCallback<TData extends Row = Row> = (props: { property: string; data: TData[] }) => string;

export type CustomFormatter<TData extends Row = Row, TResult = unknown> = (row: TData, index: number) => TResult;

export type TemplateFn<TData extends Row = Row, TValue = unknown> = (props: {
  row: TData;
  column: Column<DataTableFeatures, TData>;
  cell: Cell<DataTableFeatures, TData, TValue>;
}) => string | HTMLElement;

export interface ColumnDef<TData extends Row = Row> {
  id?: string;
  header?: string;
  footer?: string | FooterCallback<TData>;
  property?: string & keyof TData;
  hidden?: boolean;
  hideable?: boolean;
  resizable?: boolean;
  reorderable?: boolean;
  width?: number;
  format?: Formatter<unknown, unknown> | CustomFormatter<TData>;
  template?: string | TemplateFn;
  useTemplateSlot?: boolean;
  filterType?: FilterType;
  stopRowClickPropagation?: boolean;
  columns?: ColumnDef<TData>[];
  align?: ColumnAlign;
}
