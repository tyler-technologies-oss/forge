import { coerceBoolean, coerceNumber, CustomElement, FoundationProperty } from '@tylertech/forge-core';
import { tylIconArrowDownward } from '@tylertech/tyler-icons/standard';
import { ExpansionPanelComponent } from '../expansion-panel';
import { CheckboxComponent } from '../checkbox';
import { TableAdapter } from './table-adapter';
import { TABLE_CONSTANTS } from './table-constants';
import { TableFoundation } from './table-foundation';
import { IconRegistry, IconComponent } from '../icon';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import {
  IColumnConfiguration,
  TableLayoutType,
  TableViewTemplate,
  TableRowCreatedCallback,
  TableCellCreatedCallback,
  TableHeaderSelectAllTemplate,
  CellAlign,
  ITableRowClickEventData,
  ITableSelectDoubleEventData,
  ITableSelectEventData,
  ITableSelectAllEventData,
  ITableColumnResizeEventData,
  ITableSortEventData,
  ITableSortMultipleEventData,
  ITableFilterEventData,
  TableSelectTooltipCallback
} from './types';

export interface ITableComponent extends IBaseComponent {
  data: any[];
  columnConfigurations: IColumnConfiguration[];
  select: boolean;
  multiselect: boolean;
  selectKey: string | string[];
  dense: boolean;
  roomy: boolean;
  filter: boolean;
  fixedHeaders: boolean;
  layoutType: TableLayoutType;
  wrapContent: boolean;
  resizable: boolean;
  minResizeWidth: number;
  allowRowClick: boolean;
  multiColumnSort: boolean;
  selectCheckboxAlignment: `${CellAlign}`;
  tooltipSelect: string | TableSelectTooltipCallback;
  tooltipSelectAll: string;
  rowCreated: TableRowCreatedCallback;
  cellCreated: TableCellCreatedCallback;
  hideColumn(columnIndex: number): void;
  showColumn(columnIndex: number): void;
  isColumnHidden(columnIndex: number): boolean;
  getSelectedRows(): any[];
  selectRowsByIndex(indexes: number | number[], preserveExisting?: boolean): void;
  deselectRowsByIndex(indexes: number | number[]): void;
  selectRow(data: any): void;
  selectRows(data: any[], preserveExisting?: boolean): void;
  deselectRow(data: any): void;
  deselectRows(data: any[]): void;
  clearSelections(): void;
  render(): void;
  expandRow(rowIndex: number, template: TableViewTemplate): Promise<void>;
  collapseRow(rowIndex: number): Promise<void>;
  isRowExpanded(rowIndex: number): boolean;
  isRowSelected(rowData: { [key: string]: any }): boolean;
  selectAllTemplate: TableHeaderSelectAllTemplate;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-table': ITableComponent;
  }

  interface HTMLElementEventMap {
    'forge-table-row-click': CustomEvent<ITableRowClickEventData>;
    'forge-table-select': CustomEvent<ITableSelectEventData>;
    'forge-table-select-double': CustomEvent<ITableSelectDoubleEventData>;
    'forge-table-select-all': CustomEvent<ITableSelectAllEventData>;
    'forge-table-sort': CustomEvent<ITableSortEventData | ITableSortMultipleEventData>;
    'forge-table-filter': CustomEvent<ITableFilterEventData>;
    'forge-table-initialized': CustomEvent<void>;
    'forge-table-column-resize': CustomEvent<ITableColumnResizeEventData>;
  }
}

/**
 * The custom element class behind the `<forge-table>` component.
 * 
 * @tag forge-table
 */
@CustomElement({
  name: TABLE_CONSTANTS.elementName,
  dependencies: [
    ExpansionPanelComponent,
    IconComponent,
    CheckboxComponent
  ]
})
export class TableComponent extends BaseComponent implements ITableComponent {
  public static get observedAttributes(): string[] {
    return [
      TABLE_CONSTANTS.attributes.SELECT,
      TABLE_CONSTANTS.attributes.MULTISELECT,
      TABLE_CONSTANTS.attributes.SELECT_KEY,
      TABLE_CONSTANTS.attributes.DENSE,
      TABLE_CONSTANTS.attributes.ROOMY,
      TABLE_CONSTANTS.attributes.FILTER,
      TABLE_CONSTANTS.attributes.FIXED_HEADERS,
      TABLE_CONSTANTS.attributes.LAYOUT_TYPE,
      TABLE_CONSTANTS.attributes.WRAP_CONTENT,
      TABLE_CONSTANTS.attributes.RESIZABLE,
      TABLE_CONSTANTS.attributes.MIN_RESIZE_WIDTH,
      TABLE_CONSTANTS.attributes.ALLOW_ROW_CLICK,
      TABLE_CONSTANTS.attributes.MULTI_COLUMN_SORT,
      TABLE_CONSTANTS.attributes.SELECT_CHECKBOX_ALIGNMENT,
      TABLE_CONSTANTS.attributes.TOOLTIP_SELECT,
      TABLE_CONSTANTS.attributes.TOOLTIP_SELECT_ALL
    ];
  }

  private _foundation: TableFoundation;

  constructor() {
    super();
    IconRegistry.define(tylIconArrowDownward);
    this._foundation = new TableFoundation(new TableAdapter(this));
  }

  public initializedCallback(): void {
    this._foundation.initialize();
  }

  public connectedCallback(): void {
    this._foundation.connect();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case TABLE_CONSTANTS.attributes.SELECT:
        this.select = coerceBoolean(newValue);
        break;
      case TABLE_CONSTANTS.attributes.MULTISELECT:
        this.multiselect = coerceBoolean(newValue);
        break;
      case TABLE_CONSTANTS.attributes.SELECT_KEY:
        this.selectKey = newValue;
        break;
      case TABLE_CONSTANTS.attributes.DENSE:
        this.dense = coerceBoolean(newValue);
        break;
      case TABLE_CONSTANTS.attributes.ROOMY:
        this.roomy = coerceBoolean(newValue);
        break;
      case TABLE_CONSTANTS.attributes.FILTER:
        this.filter = coerceBoolean(newValue);
        break;
      case TABLE_CONSTANTS.attributes.FIXED_HEADERS:
        this.fixedHeaders = coerceBoolean(newValue);
        break;
      case TABLE_CONSTANTS.attributes.LAYOUT_TYPE:
        this.layoutType = newValue as TableLayoutType;
        break;
      case TABLE_CONSTANTS.attributes.WRAP_CONTENT:
        this.wrapContent = coerceBoolean(newValue);
        break;
      case TABLE_CONSTANTS.attributes.RESIZABLE:
        this.resizable = coerceBoolean(newValue);
        break;
      case TABLE_CONSTANTS.attributes.MIN_RESIZE_WIDTH:
        this.minResizeWidth = coerceNumber(newValue);
        break;
      case TABLE_CONSTANTS.attributes.ALLOW_ROW_CLICK:
        this.allowRowClick = coerceBoolean(newValue);
        break;
      case TABLE_CONSTANTS.attributes.MULTI_COLUMN_SORT:
        this.multiColumnSort = coerceBoolean(newValue);
        break;
      case TABLE_CONSTANTS.attributes.SELECT_CHECKBOX_ALIGNMENT:
        this.selectCheckboxAlignment = (this.getAttribute(TABLE_CONSTANTS.attributes.SELECT_CHECKBOX_ALIGNMENT) || CellAlign.Center) as CellAlign;
        break;
      case TABLE_CONSTANTS.attributes.TOOLTIP_SELECT:
        this.tooltipSelect = newValue;
        break;
      case TABLE_CONSTANTS.attributes.TOOLTIP_SELECT_ALL:
        this.tooltipSelectAll = newValue;
        break;
    }
  }

  /**
   * Hides a column from the table.
   * @param columnIndex The index of the column to hide.
   */
  public hideColumn(columnIndex: number): void {
    this._foundation.hideColumn(columnIndex);
  }

  /**
   * Shows a hidden column in th table.
   * @param columnIndex The index of the column to show.
   */
  public showColumn(columnIndex: number): void {
    this._foundation.showColumn(columnIndex);
  }

  /**
   * Determines if a column at the given index is hidden or not.
   * @param {number} columnIndex The index of the column.
   * @returns {boolean} `true` if the column is hidden, `false` otherwise.
   */
  public isColumnHidden(columnIndex: number): boolean {
    return this._foundation.isColumnHidden(columnIndex);
  }

  /** Returns the selected row instances. */
  public getSelectedRows(): any[] {
    return this._foundation.getSelectedRows();
  }

  /**
   * Selects a row in the table. Only applicable if `select` is true.
   * @param data The row data behind the row that should be selected.
   */
  public selectRow(data: any): void {
    this._foundation.selectRows([data], false);
  }

  /**
   * Selects one or more rows in the table. Only applicable if `select` is true.
   * @param data The row data begind the rows that should be selected.
   * @param [preserveExisting=false] Should existing row selections be preserved or cleared.
   */
  public selectRows(data: any[], preserveExisting: boolean = false): void {
    this._foundation.selectRows(data, !preserveExisting);
  }

  /**
   * Deselects a single row in the table.
   * @param data The data behind the row that should be deselected.
   */
  public deselectRow(data: any): void {
    this._foundation.deselectRows([data]);
  }

  /**
   * Deselects one or more rows in the table.
   * @param data The data behind the rows that should be deselected.
   */
  public deselectRows(data: any[]): void {
    this._foundation.deselectRows(data);
  }

  /**
   * Clears all selected table rows.
   */
  public clearSelections(): void {
    this._foundation.clearSelections();
  }

  /**
   * Forces the table to re-render based on its current configuration.
   */
  public render(): void {
    this._foundation.render();
  }

  /**
   * Expands a collapsed row.
   * @param rowIndex The index of the row to expand.
   */
  public expandRow(rowIndex: any, template: TableViewTemplate): Promise<void> {
    return this._foundation.expandRow(rowIndex, template);
  }

  /**
   * Collapses an expanded row.
   * @param rowIndex The index of the row to expand.
   */
  public collapseRow(rowIndex: number): Promise<void> {
    return this._foundation.collapseRow(rowIndex);
  }

  /**
   * Checks if a row is expanded or not.
   * @param rowIndex The row index to check.
   */
  public isRowExpanded(rowIndex: number): boolean {
    return this._foundation.isRowExpanded(rowIndex);
  }

  /**
   * Selects a rows by an index or array of indexes.
   * @param indexes The row index/indexes to select.
   */
  public selectRowsByIndex(indexes: number | number[], preserveExisting?: boolean): void {
    if (typeof indexes === 'number') {
      this._foundation.selectRowsByIndex([indexes], preserveExisting);
    } else if (Array.isArray(indexes)) {
      this._foundation.selectRowsByIndex(indexes, preserveExisting);
    }
  }

  /**
   * Deselects a rows by an index or array of indexes.
   * @param indexes The row index/indexes to deselect
   */
  public deselectRowsByIndex(indexes: number | number[]): void {
    if (typeof indexes === 'number') {
      this._foundation.deselectRowsByIndex([indexes]);
    } else if (Array.isArray(indexes)) {
      this._foundation.deselectRowsByIndex(indexes);
    }
  }

  /**
   * Checks if a row is selected or not.
   * @param rowData The row object data to check.
   */
  public isRowSelected(rowData: { [key: string]: any }): boolean {
    return this._foundation.isRowSelected(rowData);
  }

  /** The data to be display in the table body. */
  @FoundationProperty()
  public declare data: any[];

  /** The column configuration options. */
  @FoundationProperty()
  public declare columnConfigurations: IColumnConfiguration[];

  /** Controls the visibility of the select column. */
  @FoundationProperty()
  public declare select: boolean;

  /** Controls the visibility of the select all checkbox (only applied when `select` is `true`). */
  @FoundationProperty()
  public declare multiselect: boolean;

  /** The row key for matching data to selections. */
  @FoundationProperty()
  public declare selectKey: string | string[];

  @FoundationProperty()
  public declare tooltipSelect: string | TableSelectTooltipCallback;

  @FoundationProperty()
  public declare tooltipSelectAll: string;

  /** Controls whether the table is dense or not. False by default. */
  @FoundationProperty()
  public declare dense: boolean;

  /** Controls whether the table is roomy or not. False by default. */
  @FoundationProperty()
  public declare roomy: boolean;

  /** Controls whether the table filters are visible or not. */
  @FoundationProperty()
  public declare filter: boolean;

  /** Controls whether the table applies fixed headers when in scroll containers. */
  @FoundationProperty()
  public declare fixedHeaders: boolean;

  /** Controls the table layout algorithm. */
  @FoundationProperty()
  public declare layoutType: TableLayoutType;

  /** Controls whether the content in each cell wraps or not (true by default). */
  @FoundationProperty()
  public declare wrapContent: boolean;

  /** Controls whether the columns are resizable or not. */
  @FoundationProperty()
  public declare resizable: boolean;

  /** Gets/sets the minimum width that a column can be resized to by the user dragging the resize handle. */
  @FoundationProperty()
  public declare minResizeWidth: number;

  /** Gets/sets whether the rows respond to (and emit) row click events. */
  @FoundationProperty()
  public declare allowRowClick: boolean;

  @FoundationProperty()
  public declare multiColumnSort: boolean;

  @FoundationProperty()
  public declare rowCreated: TableRowCreatedCallback;

  @FoundationProperty()
  public declare cellCreated: TableCellCreatedCallback;

  @FoundationProperty()
  public declare selectAllTemplate: TableHeaderSelectAllTemplate;

  @FoundationProperty()
  public declare selectCheckboxAlignment: `${CellAlign}`;
}
