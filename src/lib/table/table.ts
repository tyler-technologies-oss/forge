import { coerceBoolean, coerceNumber, customElement, coreProperty } from '@tylertech/forge-core';
import { tylIconArrowDownward } from '@tylertech/tyler-icons/standard';
import { ExpansionPanelComponent } from '../expansion-panel';
import { CheckboxComponent } from '../checkbox';
import { TableAdapter } from './table-adapter';
import { TABLE_CONSTANTS } from './table-constants';
import { TableCore } from './table-core';
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
import { TooltipComponent } from '../tooltip';

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
 * @tag forge-table
 * 
 * @dependency forge-expansion-panel
 * @dependency forge-icon
 * @dependency forge-checkbox
 * @dependency forge-tooltip
 * 
 * @event {CustomEvent<ITableRowClickEventData>} forge-table-row-click - Dispatched when a row is clicked. Only applies when `allow-row-click` is specified.
 * @event {CustomEvent<ITableSelectEventData>} forge-table-select - Dispatched when a row is selected. Only applies when `select` is specified.
 * @event {CustomEvent<ITableSelectDoubleEventData>} forge-table-select-double - Dispatched when a row is double-clicked. Only applies when `select` is specified.
 * @event {CustomEvent<ITableSelectAllEventData>} forge-table-select-all - Dispatched when the select all checkbox is toggled. Only applies when `select` and `multiselect` is specified.
 * @event {CustomEvent<ITableSortEventData | ITableSortMultipleEventData>} forge-table-sort - Dispatched when a column is sorted.
 * @event {CustomEvent<ITableFilterEventData>} forge-table-filter - Dispatched when a column is filtered. Only applies when `filter` is specified.
 * @event {CustomEvent<void>} forge-table-initialized - Dispatched when the table is initialized in the DOM for the first time.
 * @event {CustomEvent<ITableColumnResizeEventData>} forge-table-column-resize - Dispatched when a column is resized.
 */
@customElement({
  name: TABLE_CONSTANTS.elementName,
  dependencies: [
    ExpansionPanelComponent,
    IconComponent,
    CheckboxComponent,
    TooltipComponent
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

  private _core: TableCore;

  constructor() {
    super();
    IconRegistry.define(tylIconArrowDownward);
    this._core = new TableCore(new TableAdapter(this));
  }

  public initializedCallback(): void {
    this._core.initialize();
  }

  public connectedCallback(): void {
    this._core.connect();
  }

  public disconnectedCallback(): void {
    this._core.disconnect();
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
    this._core.hideColumn(columnIndex);
  }

  /**
   * Shows a hidden column in th table.
   * @param columnIndex The index of the column to show.
   */
  public showColumn(columnIndex: number): void {
    this._core.showColumn(columnIndex);
  }

  /**
   * Determines if a column at the given index is hidden or not.
   * @param {number} columnIndex The index of the column.
   * @returns {boolean} `true` if the column is hidden, `false` otherwise.
   */
  public isColumnHidden(columnIndex: number): boolean {
    return this._core.isColumnHidden(columnIndex);
  }

  /** Returns the selected row instances. */
  public getSelectedRows(): any[] {
    return this._core.getSelectedRows();
  }

  /**
   * Selects a row in the table. Only applicable if `select` is true.
   * @param data The row data behind the row that should be selected.
   */
  public selectRow(data: any): void {
    this._core.selectRows([data], false);
  }

  /**
   * Selects one or more rows in the table. Only applicable if `select` is true.
   * @param data The row data begind the rows that should be selected.
   * @param [preserveExisting=false] Should existing row selections be preserved or cleared.
   */
  public selectRows(data: any[], preserveExisting: boolean = false): void {
    this._core.selectRows(data, !preserveExisting);
  }

  /**
   * Deselects a single row in the table.
   * @param data The data behind the row that should be deselected.
   */
  public deselectRow(data: any): void {
    this._core.deselectRows([data]);
  }

  /**
   * Deselects one or more rows in the table.
   * @param data The data behind the rows that should be deselected.
   */
  public deselectRows(data: any[]): void {
    this._core.deselectRows(data);
  }

  /**
   * Clears all selected table rows.
   */
  public clearSelections(): void {
    this._core.clearSelections();
  }

  /**
   * Forces the table to re-render based on its current configuration.
   */
  public render(): void {
    this._core.render();
  }

  /**
   * Expands a collapsed row.
   * @param rowIndex The index of the row to expand.
   */
  public expandRow(rowIndex: any, template: TableViewTemplate): Promise<void> {
    return this._core.expandRow(rowIndex, template);
  }

  /**
   * Collapses an expanded row.
   * @param rowIndex The index of the row to expand.
   */
  public collapseRow(rowIndex: number): Promise<void> {
    return this._core.collapseRow(rowIndex);
  }

  /**
   * Checks if a row is expanded or not.
   * @param rowIndex The row index to check.
   */
  public isRowExpanded(rowIndex: number): boolean {
    return this._core.isRowExpanded(rowIndex);
  }

  /**
   * Selects a rows by an index or array of indexes.
   * @param indexes The row index/indexes to select.
   */
  public selectRowsByIndex(indexes: number | number[], preserveExisting?: boolean): void {
    if (typeof indexes === 'number') {
      this._core.selectRowsByIndex([indexes], preserveExisting);
    } else if (Array.isArray(indexes)) {
      this._core.selectRowsByIndex(indexes, preserveExisting);
    }
  }

  /**
   * Deselects a rows by an index or array of indexes.
   * @param indexes The row index/indexes to deselect
   */
  public deselectRowsByIndex(indexes: number | number[]): void {
    if (typeof indexes === 'number') {
      this._core.deselectRowsByIndex([indexes]);
    } else if (Array.isArray(indexes)) {
      this._core.deselectRowsByIndex(indexes);
    }
  }

  /**
   * Checks if a row is selected or not.
   * @param rowData The row object data to check.
   */
  public isRowSelected(rowData: { [key: string]: any }): boolean {
    return this._core.isRowSelected(rowData);
  }

  /**
   * The data to be display in the table body.
   * @default []
   */
  @coreProperty()
  public declare data: any[];

  /**
   * The column configuration options.
   * @default []
   */
  @coreProperty()
  public declare columnConfigurations: IColumnConfiguration[];

  /**
   * Controls the visibility of the select column.
   * @default true
   * @attribute
   */
  @coreProperty()
  public declare select: boolean;

  /**
   * Controls the visibility of the select all checkbox (only applied when `select` is `true`).
   * @default true
   * @attribute
   */
  @coreProperty()
  public declare multiselect: boolean;

  /**
   * The row key for matching data to selections.
   * @attribute select-key
   */
  @coreProperty()
  public declare selectKey: string | string[];

  /**
   * The tooltip to display when hovering over the select column.
   * @attribute tooltip-select
   */
  @coreProperty()
  public declare tooltipSelect: string | TableSelectTooltipCallback;

  /**
   * The tooltip to display when hovering over the select all checkbox.
   * @attribute tooltip-select-all
   */
  @coreProperty()
  public declare tooltipSelectAll: string;

  /**
   * Controls whether the table is dense or not.
   * @default false
   * @attribute
   */
  @coreProperty()
  public declare dense: boolean;

  /**
   * Controls whether the table is roomy or not.
   * @default false
   * @attribute
   */
  @coreProperty()
  public declare roomy: boolean;

  /**
   * Controls whether the table shows its column filter row.
   * @default false
   * @attribute
   */
  @coreProperty()
  public declare filter: boolean;

  /**
   * Controls whether the table applies fixed headers when in scroll containers.
   * @default false
   * @attribute fixed-headers
   */
  @coreProperty()
  public declare fixedHeaders: boolean;

  /**
   * Controls the table layout algorithm.
   * @default 'auto'
   * @attribute layout-type
   */
  @coreProperty()
  public declare layoutType: TableLayoutType;

  /**
   * Controls whether the content in each cell wraps or not (true by default).
   * @default true
   * @attribute wrap-content
   */
  @coreProperty()
  public declare wrapContent: boolean;

  /**
   * Controls whether the columns are resizable or not.
   * @default false
   * @attribute
   */
  @coreProperty()
  public declare resizable: boolean;

  /**
   * Gets/sets the minimum width that a column can be resized to by the user dragging the resize handle.
   * @default 100
   * @attribute min-resize-width
   */
  @coreProperty()
  public declare minResizeWidth: number;

  /**
   * Gets/sets whether the rows respond to (and emit) row click events.
   * @default false
   * @attribute allow-row-click
   */
  @coreProperty()
  public declare allowRowClick: boolean;

  /**
   * Gets/sets whether the table supports multi-column sorting.
   * @default false
   * @attribute multi-column-sort
   */
  @coreProperty()
  public declare multiColumnSort: boolean;

  /**
   * Callback for when a row is clicked. This allows for custom logic to run after each `<tr>` is created.
   */
  @coreProperty()
  public declare rowCreated: TableRowCreatedCallback;

  /**
   * Callback for when a cell is clicked. This allows for custom logic to run after each `<td>` is created.
   */
  @coreProperty()
  public declare cellCreated: TableCellCreatedCallback;

  /**
   * The template to use for the select all checkbox in the header.
   */
  @coreProperty()
  public declare selectAllTemplate: TableHeaderSelectAllTemplate;

  /**
   * Controls the alignment of the select checkbox.
   * @default "center"
   * @attribute select-checkbox-alignment
   */
  @coreProperty()
  public declare selectCheckboxAlignment: `${CellAlign}`;
}
