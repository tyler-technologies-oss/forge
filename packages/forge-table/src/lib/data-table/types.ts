import type { Cell, Column, RowData as TanstackRowData } from '@tanstack/lit-table';
import type { Formatter } from '@tylertech/forge-core';

declare module '@tanstack/lit-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends TanstackRowData, TValue> extends ColumnDefMeta {}
}

export type ColumnAlign = 'start' | 'center' | 'end';

export type FilterType = 'text' | 'number' | 'range' | 'select' | 'date' | 'date-range' | 'time';

interface ColumnDefMeta {
  filterVariant?: FilterType;
  cellSlot?: boolean;
  stopRowClickPropagation?: boolean;
  reorderable?: boolean;
  align?: ColumnAlign;
  formatAttribute?: string;
}

export type Row = unknown | object | unknown[];

export type RowSelectionType = 'off' | 'single' | 'multiple';

export type FooterCallback<TData extends Row = unknown> = (props: { property: string; data: TData[] }) => string;

export type CustomFormatter<TData extends Row = unknown, TResult = unknown> = (row: TData, index: number) => TResult;

export interface ColumnDef<TData extends Row = unknown> {
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
  template?: string | (<TValue>(props: { row: Row; column: Column<TData>; cell: Cell<TData, TValue> }) => string | HTMLElement);
  useTemplateSlot?: boolean;
  filterType?: FilterType;
  stopRowClickPropagation?: boolean;
  columns?: ColumnDef<TData>[];
  align?: ColumnAlign;
}
