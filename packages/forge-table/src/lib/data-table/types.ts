import type { Cell, Column, RowData as TanstackRowData } from '@tanstack/lit-table';

declare module '@tanstack/lit-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends TanstackRowData, TValue> extends ColumnDefMeta {}
}

export type FilterType = 'text' | 'number' | 'range' | 'select' | 'date' | 'date-range' | 'time';

interface ColumnDefMeta {
  filterVariant?: FilterType;
  cellSlot?: boolean;
  stopRowClickPropagation?: boolean;
  reorderable?: boolean;
}

export type Row = unknown | object | unknown[];

export type RowSelectionType = 'off' | 'single' | 'multiple';

export type FooterCallback<TData extends Row = unknown> = (props: { property: string; data: TData[] }) => string;

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
  transform?: (row: TData, index: number) => unknown;
  template?: string | (<TValue>(props: { row: Row; column: Column<TData>; cell: Cell<TData, TValue> }) => string | HTMLElement);
  useTemplateSlot?: boolean;
  filterType?: FilterType;
  stopRowClickPropagation?: boolean;
  columns?: ColumnDef<TData>[];
}
