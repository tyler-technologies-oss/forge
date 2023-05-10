import { BaseComponentDelegate, IBaseComponentDelegate, IBaseComponentDelegateOptions } from '../core';
import { IFormFieldComponentDelegate } from '../core/delegates/form-field-component-delegate';
import { TableRow } from './table-row';

export declare type TableViewTemplate = string | HTMLElement | TableViewTemplateBuilder;
export declare type TableViewTemplateBuilder<T = any> = (rowIndex: number, div: HTMLElement, rowData: T) => HTMLElement | string | ITableViewTemplateBuilderResult | undefined | Promise<HTMLElement | string | undefined | ITableViewTemplateBuilderResult>;
export declare type TableTemplateBuilder<T = any> = (rowIndex: number, div: HTMLElement, rowData: T, columnIndex: number) => HTMLElement | string | ITableTemplateBuilderResult | undefined | Promise<HTMLElement | string | undefined | ITableTemplateBuilderResult>;
export declare type TableHeaderTemplateBuilder = (rowIndex: number, div: HTMLElement, columConfig: IColumnConfiguration) => HTMLElement | string | Promise<HTMLElement | string>;
export declare type TableHeaderSelectAllTemplate = () => HTMLElement | string | Promise<HTMLElement | string>;
export declare type TableRowCreatedCallback = (rowElement: HTMLTableRowElement, rowIndex: number, rowData: any) => void;
export declare type TableSelectTooltipCallback = (rowIndex: number, rowData: any) => string;
export declare type TableCellCreatedCallback = (rowElement: HTMLTableCellElement, rowIndex: number, columnIndex: number) => void;

export interface IColumnData<T = any> {
  config: IColumnConfiguration;
  data: T[];
}

export interface ITableConfiguration {
  tableElement: HTMLTableElement;
  columnConfigurations: IColumnConfiguration[];
  data: TableRow[];
  sortedColumn: number;
  sortDirection: SortDirection | undefined;
  multiColumnSort: boolean;
  dense: boolean;
  filter: boolean;
  wrapContent: boolean;
  resizable: boolean;
  fixedHeaders: boolean;
  layoutType: TableLayoutType;
  selectCheckboxAlignment: CellAlign;
  tooltipSelect: string | TableSelectTooltipCallback;
  tooltipSelectAll: string;
  clickListener: ((evt: MouseEvent) => void) | null;
  doubleClickListener: ((evt: Event) => void) | null;
  selectListener: ((evt: Event) => void) | null;
  selectAllListener: ((evt: Event) => void) | null;
  headRowMouseDownListener: (evt: Event) => void;
  headRowContextMenuListener: (evt: Event) => void;
  filterListener: ((value: any, columnIndex: number) => void) | null;
  rowCreatedCallback: TableRowCreatedCallback;
  cellCreatedCallback: TableCellCreatedCallback;
  selectAllTemplate: TableHeaderSelectAllTemplate;
}

export interface IColumnConfiguration {
  property?: string;
  template?: TableTemplateBuilder;
  headerTemplate?: TableHeaderTemplateBuilder;
  header?: string;
  hidden?: boolean;
  sortable?: boolean;
  preventUnsort?: boolean;
  initialSort?: boolean | ISortedColumn;
  sortDirection?: SortDirection;
  align?: CellAlign;
  width?: string | number;
  transform?: (value: any) => any | Promise<any>;
  filter?: boolean;
  filterDelegate?: IFormFieldComponentDelegate<any> | BaseComponentDelegate<HTMLElement, IBaseComponentDelegateOptions> | TableFilterDelegateFactory;
  filterDebounceTime?: number;
  cellStyle?: Partial<CSSStyleDeclaration>;
  headerCellStyle?: Partial<CSSStyleDeclaration>;
  resizable?: boolean;
  columnSpan?: 'all' | number;
  stopCellTemplateClickPropagation?: boolean;
}

export interface ITableSelectEventData<T = any> {
  selected: boolean;
  index: number;
  data: T;
}

export interface ITableSelectAllEventData<T = any> {
  status: boolean;
  count: number;
  data: T[];
  targetType: 'row' | 'select-all';
}

export interface ITableRowClickEventData<T = any> {
  index: number;
  data: T;
}

export interface ITableSelectDoubleEventData<T = any> {
  index: number;
  data: T;
}

export interface ITableSortEventData {
  direction: SortDirection;
  columnIndex: number;
}

export type ITableSortMultipleEventData = ITableSortedMultipleEventDataItem[];
export interface ITableSortedMultipleEventDataItem extends ISortedItem {}

export interface ITableColumnResizeEventData {
  index: number;
  width: number;
}

export enum CellAlign {
  Left = 'left',
  Right = 'right',
  Center = 'center'
}

export enum SortDirection {
  Ascending = 'ASC',
  Descending = 'DESC',
  Unset = 'UNSET'
}

export interface ISortedItem {
  columnIndex: number;
  direction: SortDirection;
  propertyName: string;
  sortOrder?: number;
}

export interface ISortedColumn {
  direction: SortDirection;
  sortOrder?: number;
  propertyName: string;
}

export interface ISortedItemUpdate {
  columnIndex: number;
  direction: SortDirection;
  propertyName: string;
}

export interface ITableFilterOption<T = any> {
  display: string | ITableDateFilterLabel;
  value: T;
}

export interface ITableDateFilterLabel {
  from: string;
  to: string;
}

export enum TableFilterType {
  InputText = 'text',
  InputNumber = 'number',
  Select = 'select',
  SelectMultiple = 'select-multiple',
  Date = 'date',
  DateRange = 'date-range'
}

export type TableFilterListener<T = any> = (value: T, columnIndex: number) => void;
export type TableFilterDelegateFactory<T extends HTMLElement = any> = () => IFormFieldComponentDelegate<T> | IBaseComponentDelegate<HTMLElement>;
export type TableLayoutType = 'auto' | 'fixed';

export interface ITableFilterEventData<T = any> {
  value: T;
  columnIndex: number;
}

export interface ITableResizeEventDescriptor {
  element: HTMLTableHeaderCellElement;
  startWidth: number;
  startX: number;
  index: number;
  width: number;
}

export interface ITableTemplateBuilderResult {
  content: HTMLElement | string;
  stopClickPropagation?: boolean;
}

export interface ITableViewTemplateBuilderResult extends ITableTemplateBuilderResult {}
