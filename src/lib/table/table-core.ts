import { createPredicate, getEventPath, isNumber, isObject, ItemManager, matchesPredicate } from '@tylertech/forge-core';
import { MultiSortManager } from './multi-sort-manager';
import { ITableAdapter } from './table-adapter';
import { TABLE_CONSTANTS } from './table-constants';
import { TableRow } from './table-row';
import { TableUtils } from './table-utils';
import {
  IColumnConfiguration,
  ITableConfiguration,
  ITableFilterEventData,
  ITableResizeEventDescriptor,
  ITableRowClickEventData,
  ITableSelectAllEventData,
  ITableSelectDoubleEventData,
  ITableSelectEventData,
  ITableSortEventData,
  SortDirection,
  TableFilterListener,
  TableLayoutType,
  TableViewTemplate,
  ITableColumnResizeEventData,
  ISortedItem,
  TableRowCreatedCallback,
  TableCellCreatedCallback,
  ITableSortMultipleEventData,
  TableHeaderSelectAllTemplate,
  CellAlign,
  TableSelectTooltipCallback
} from './types';

export interface ITableCore {
  data: any[];
  columnConfigurations: IColumnConfiguration[];
  dense: boolean;
  select: boolean;
  multiselect: boolean;
  selectKey: string | string[];
  fixedHeaders: boolean;
  layoutType: TableLayoutType;
  wrapContent: boolean;
  resizable: boolean;
  minResizeWidth: number;
  allowRowClick: boolean;
  multiColumnSort: boolean;
  rowCreated: TableRowCreatedCallback;
  cellCreated: TableCellCreatedCallback;
  initialize(): void;
  initialize(): void;
  hideColumn(columnIndex: number): void;
  showColumn(columnIndex: number): void;
  isColumnHidden(columnIndex: number): boolean;
  getSelectedRows(): any[];
  selectRows(data: any[], clearCurrentSelections: boolean): void;
  deselectRows(data: any[]): void;
  clearSelections(): void;
  render(): void;
  expandRow(rowIndex: number, template: TableViewTemplate): Promise<void>;
  collapseRow(rowIndex: number): Promise<void>;
  isRowExpanded(rowIndex: number): boolean;
  isRowSelected(rowData: { [key: string]: any }): boolean;
  selectRowsByIndex(indexes: number | number[], preserveExisting?: boolean): void;
  deselectRowsByIndex(indexes: number[]): void;
  selectAllTemplate: TableHeaderSelectAllTemplate;
  selectCheckboxAlignment: CellAlign;
  tooltipSelect: string | TableSelectTooltipCallback;
  tooltipSelectAll: string;
}

interface IRowSelectedDescriptor {
  rowElement: HTMLTableRowElement;
  index: number;
  data: any;
}

export class TableCore implements ITableCore {
  // Backing model values
  private _tableRows: TableRow[] = [];
  private _data: any[] = [];
  private _columnConfigurations: IColumnConfiguration[] = [];
  private _select = false;
  private _multiselect = true;
  private _selectKey: string[];
  private _originalSelectKey: string | string[];
  private _dense = false;
  private _roomy = false;
  private _filter = false;
  private _fixedHeaders = false;
  private _layoutType: TableLayoutType = TABLE_CONSTANTS.strings.DEFAULT_LAYOUT_TYPE as TableLayoutType;
  private _wrapContent = true;
  private _resizable = false;
  private _minResizeWidth = TABLE_CONSTANTS.numbers.MIN_RESIZE_WIDTH;
  private _multiColumnSort = false;
  private _selectCheckboxAlignment: CellAlign = CellAlign.Center;
  private _tooltipSelect: string | TableSelectTooltipCallback;
  private _tooltipSelectAll: string;
  private _rowCreatedCallback: TableRowCreatedCallback;
  private _cellCreatedCallback: TableCellCreatedCallback;
  private _selectAllTemplate: TableHeaderSelectAllTemplate;

  // Listeners
  private _rowClickListener: (evt: MouseEvent) => void;
  private _rowDoubleClickListener: (evt: Event) => void;
  private _selectRowListener: (evt: Event) => void;
  private _selectAllListener: (evt: Event) => void;
  private _sortableHeadCellKeydownListener: EventListener;
  private _headRowMouseDownListener: (evt: MouseEvent) => void;
  private _headRowContextMenuListener: (evt: MouseEvent) => void;
  private _documentMouseMoveListener: (evt: MouseEvent) => void;
  private _documentMouseUpListener: (evt: MouseEvent) => void;
  private _filterListener: TableFilterListener;

  // State variables
  private _isAllSelected = false;
  private _sortedColumnIndex = -1;
  private _sortDirection: SortDirection | undefined;
  private _rendered = false;
  private _resizeDescriptor: ITableResizeEventDescriptor | undefined;
  private _headCellMouseDownIndex: number | undefined;
  private _allowRowClick = false;
  private _previouslyClickedRow: IRowSelectedDescriptor | undefined;
  private _multiSortManager = new MultiSortManager();

  // Helpers
  private _selectionManager: ItemManager<any>;
  private _hiddenColumnManager: ItemManager<IColumnConfiguration>;

  constructor(private _adapter: ITableAdapter) {
    // Create all listeners
    this._rowClickListener = evt => this._onRowClick(evt);
    this._rowDoubleClickListener = evt => this._onRowDoubleClick(evt);
    this._selectRowListener = evt => this._onRowSelected(evt);
    this._selectAllListener = evt => this._onSelectAll(evt);
    this._sortableHeadCellKeydownListener = (evt: KeyboardEvent) => this._onSortableHeadCellKeydown(evt);
    this._headRowMouseDownListener = evt => this._onHeadRowMouseDown(evt);
    this._headRowContextMenuListener = evt => this._onHeadRowContextMenu(evt);
    this._documentMouseMoveListener = evt => this._onMouseMove(evt);
    this._documentMouseUpListener = evt => this._onMouseUp(evt);
    this._filterListener = (value: any, columnIndex: number) => this._onFilter(value, columnIndex);

    // Create helpers
    this._selectionManager = new ItemManager<any>(this._selectKey);
    this._hiddenColumnManager = new ItemManager<IColumnConfiguration>();
  }

  /** Called when the component is connected to the DOM. */
  public initialize(): void {
    this._adapter.initialize();
    this._adapter.setHostAttribute(TABLE_CONSTANTS.attributes.SELECT, this._select.toString());
    this._adapter.setHostAttribute(TABLE_CONSTANTS.attributes.MULTISELECT, this._multiselect.toString());
    this._adapter.setHostAttribute(TABLE_CONSTANTS.attributes.DENSE, this._dense.toString());
    this._adapter.setHostAttribute(TABLE_CONSTANTS.attributes.ROOMY, this._roomy.toString());
    this._adapter.setHostAttribute(TABLE_CONSTANTS.attributes.FILTER, this._filter.toString());
    this._adapter.emitHostEvent(TABLE_CONSTANTS.events.INITIALIZED, undefined, false);
  }

  public destroy(): void {
    this._resizeDescriptor = undefined;
    this._adapter.removeDocumentListener('mousemove', this._documentMouseMoveListener);
    this._adapter.removeDocumentListener('mouseup', this._documentMouseUpListener);
  }

  /** The data to be displayed in the table body. */
  public set data(value: any[]) {
    if (Array.isArray(value) && value.length > 0) {
      if (isObject(value[0])) {
        this._data = value.map(v => ({ ...v }));
      } else {
        this._data = [...value];
      }
    } else {
      this._data = [];
    }

    this._tableRows = this._data.map(data => new TableRow(data, this._selectionManager.exists(data)));

    this._renderBody();
  }
  public get data(): any[] {
    return this._data.map(o => ({ ...o })); // Shallow clone
  }

  /** The column configuration options. */
  public set columnConfigurations(value: IColumnConfiguration[]) {
    // Intentional shallow copy of member properties. These member objects have properties that are references to functions.
    this._columnConfigurations = value.map(cc => ({ ...cc }));

    // Update hidden column manager
    this._hiddenColumnManager.clear();
    this._columnConfigurations.forEach(cc => {
      if (cc.hidden) {
        this._hiddenColumnManager.add(cc);
      }
    });

    this._refreshTableSort(); // Must be called after updating the hidden columns
    this.render();
  }
  public get columnConfigurations(): IColumnConfiguration[] {
    // Intentional shallow copy of member properties. These member objects have properties that are references to functions.
    return this._columnConfigurations.map(cc => ({ ...cc }));
  }

  /** Gets the visible column configurations. */
  private get _visibleColumnConfigurations(): IColumnConfiguration[] {
    return this._columnConfigurations.filter(cc => !this._hiddenColumnManager.exists(cc));
  }

  /** Gets the table configuration. */
  private get _tableConfiguration(): ITableConfiguration {
    return {
      tableElement: this._adapter.getTableElement(),
      columnConfigurations: this._visibleColumnConfigurations,
      data: this._tableRows,
      clickListener: this._allowRowClick ? this._rowClickListener : null,
      doubleClickListener: this._allowRowClick ? this._rowDoubleClickListener : null,
      selectListener: this._select ? this._selectRowListener : null,
      selectAllListener: this._multiselect ? this._selectAllListener : null,
      sortableHeadCellKeydownListener: this._sortableHeadCellKeydownListener,
      headRowMouseDownListener: this._headRowMouseDownListener,
      headRowContextMenuListener: this._headRowContextMenuListener,
      filterListener: this._filter ? this._filterListener : null,
      sortDirection: this._sortDirection,
      sortedColumn: this._sortedColumnIndex,
      multiColumnSort: this._multiColumnSort,
      filter: this._filter,
      wrapContent: this._wrapContent,
      fixedHeaders: this._fixedHeaders,
      layoutType: this._layoutType,
      dense: this._dense,
      resizable: this._resizable,
      rowCreatedCallback: this._rowCreatedCallback,
      cellCreatedCallback: this._cellCreatedCallback,
      selectAllTemplate: this._selectAllTemplate,
      selectCheckboxAlignment: this._selectCheckboxAlignment,
      tooltipSelect: this._tooltipSelect,
      tooltipSelectAll: this._tooltipSelectAll
    };
  }

  /** Controls the visibility of the select column. */
  public set select(value: boolean) {
    if (this._select !== value) {
      this._select = value;

      // Now we can add/remove the column
      this._adapter.setSelectColumnVisibility(
        this._adapter.getTableElement(),
        this._dense,
        this._select,
        this._selectRowListener,
        this._multiselect ? this._selectAllListener : undefined,
        this._multiselect ? this._selectAllTemplate : null,
        this._selectCheckboxAlignment,
        this._tableRows,
        this._tooltipSelect,
        this._tooltipSelectAll
      );

      this._updateSelections(true);

      // Update the attribute on the host element
      if (this._select) {
        this._adapter.setHostAttribute(TABLE_CONSTANTS.attributes.SELECT, this._select.toString());
      } else {
        this._adapter.removeHostAttribute(TABLE_CONSTANTS.attributes.SELECT);
      }
    }
  }
  public get select(): boolean {
    return this._select;
  }

  /** Controls the visibility of the select all checkbox. */
  public set multiselect(value: boolean) {
    if (this._multiselect !== value) {
      this._multiselect = value;

      if (this._select) {
        this._adapter.setSelectAllVisibility(
          this._adapter.getTableElement(),
          this._dense,
          this._multiselect,
          this._multiselect ? this._selectAllListener : null,
          this._multiselect ? this.selectAllTemplate : null,
          this._selectCheckboxAlignment,
          this._tooltipSelectAll
        );
        this._updateSelections(true);
      }

      this._adapter.setHostAttribute(TABLE_CONSTANTS.attributes.MULTISELECT, this._multiselect.toString());
    }
  }
  public get multiselect(): boolean {
    return this._multiselect;
  }

  /** The row key for matching data to selections. */
  public get selectKey(): string | string[] {
    if (Array.isArray(this._selectKey)) {
      return [...this._selectKey];
    }
    return this._selectKey;
  }
  public set selectKey(value: string | string[]) {
    if (this._originalSelectKey === value) {
      return;
    }

    if (Array.isArray(value)) {
      this._originalSelectKey = [...value];
      this._selectKey = [...value];
    } else {
      this._originalSelectKey = value;
      this._selectKey = [value];
    }

    this._selectionManager.setKey(this._selectKey);
    this._updateSelections(false);
  }

  /** Controls whether the table is dense or not. False by default. */
  public get dense(): boolean {
    return this._dense;
  }
  public set dense(value: boolean) {
    if (this._dense !== value) {
      this._dense = value;
      this._adapter.setDense(this._adapter.getTableElement(), this._dense);
      this._adapter.setHostAttribute(TABLE_CONSTANTS.attributes.DENSE, this._dense.toString());
    }
  }

  public get roomy(): boolean {
    return this._roomy;
  }

  public set roomy(value: boolean) {
    if (value !== this._roomy) {
      this._roomy = value;
      this._applyRoomy();
    }
  }

  /** Controls whether the table filters are visible or not. */
  public set filter(value: boolean) {
    if (this._filter !== value) {
      this._filter = value;
      this._adapter.setFilterRow(this._tableConfiguration);
      this._adapter.setHostAttribute(TABLE_CONSTANTS.attributes.FILTER, this._filter.toString());
    }
  }
  public get filter(): boolean {
    return this._filter;
  }

  /** Controls whether the table has fixed headers or not. */
  public set fixedHeaders(value: boolean) {
    if (this._fixedHeaders !== value) {
      this._fixedHeaders = value;
      this._adapter.setFixedHeaders(this._tableConfiguration);
    }
  }
  public get fixedHeaders(): boolean {
    return this._fixedHeaders;
  }

  /** Controls the table layout algorithm */
  public get layoutType(): TableLayoutType {
    return this._layoutType;
  }
  public set layoutType(value: TableLayoutType) {
    if (this._layoutType !== value) {
      this._layoutType = value;
      this._adapter.setTableLayoutType(this._tableConfiguration);
    }
  }

  /** Controls whether the content in each cell wraps or not */
  public get wrapContent(): boolean {
    return this._wrapContent;
  }
  public set wrapContent(value: boolean) {
    if (this._wrapContent !== value) {
      this._wrapContent = value;
      this._adapter.setWrapContentState(this._tableConfiguration);
    }
  }

  /** Controls whether the columns are resizable or not. */
  public get resizable(): boolean {
    return this._resizable;
  }
  public set resizable(value: boolean) {
    if (this._resizable !== value) {
      this._resizable = value;
      this._adapter.setResizable(this._tableConfiguration);
    }
  }

  /** Gets/sets the minimum width that a column can be resized to by the user dragging the resize handle. */
  public get minResizeWidth(): number {
    return this._minResizeWidth;
  }
  public set minResizeWidth(value: number) {
    if (this._minResizeWidth !== value) {
      this._minResizeWidth = value;
      if (!isNumber(this._minResizeWidth)) {
        this._minResizeWidth = TABLE_CONSTANTS.numbers.MIN_RESIZE_WIDTH;
      } else if (this._minResizeWidth < 0) {
        this._minResizeWidth = 0;
      }
    }
  }

  /** Gets/sets whether the rows respond to click events or not. */
  public get allowRowClick(): boolean {
    return this._allowRowClick;
  }
  public set allowRowClick(value: boolean) {
    if (this._allowRowClick !== value) {
      this._allowRowClick = value;
      if (this._rendered) {
        this._adapter.setRowClickListeners(this._adapter.getTableElement(), this._allowRowClick, this._rowClickListener, this._rowDoubleClickListener);
        this._adapter.setRowClickAttributes(this._adapter.getTableElement(), this._allowRowClick);
      }
    }
  }

  /** Gets/sets whether the table can sort multiple columns. */
  public get multiColumnSort(): boolean {
    return this._multiColumnSort;
  }
  public set multiColumnSort(value: boolean) {
    if (value !== this._multiColumnSort) {
      this._multiColumnSort = value;
      this._refreshTableSort();
      this.render();
    }
  }

  public get selectCheckboxAlignment(): CellAlign {
    return this._selectCheckboxAlignment;
  }
  public set selectCheckboxAlignment(value: CellAlign) {
    if (value !== this._selectCheckboxAlignment) {
      this._selectCheckboxAlignment = value;
      this._adapter.setHostAttribute(TABLE_CONSTANTS.attributes.SELECT_CHECKBOX_ALIGNMENT, value);
      this.render();
    }
  }

  public get tooltipSelect(): string | TableSelectTooltipCallback {
    return this._tooltipSelect;
  }
  public set tooltipSelect(value: string | TableSelectTooltipCallback) {
    if (value !== this._tooltipSelect) {
      this._tooltipSelect = value;

      if (typeof value === 'string') {
        this._adapter.setHostAttribute(TABLE_CONSTANTS.attributes.TOOLTIP_SELECT, value);
      }

      this.render();
    }
  }

  public get tooltipSelectAll(): string {
    return this._tooltipSelectAll;
  }
  public set tooltipSelectAll(value: string) {
    if (value !== this._tooltipSelectAll) {
      this._tooltipSelectAll = value;
      this._adapter.setHostAttribute(TABLE_CONSTANTS.attributes.TOOLTIP_SELECT_ALL, value);
      this.render();
    }
  }

  public get selectAllTemplate(): TableHeaderSelectAllTemplate {
    return this._selectAllTemplate;
  }

  public set selectAllTemplate(value: TableHeaderSelectAllTemplate) {
    if (value !== this._selectAllTemplate) {
      this._selectAllTemplate = value;
      this.render();
    }
  }

  public get rowCreated(): TableRowCreatedCallback {
    return this._rowCreatedCallback;
  }
  public set rowCreated(value: TableRowCreatedCallback) {
    this._rowCreatedCallback = value;
  }

  public get cellCreated(): TableCellCreatedCallback {
    return this._cellCreatedCallback;
  }
  public set cellCreated(value: TableCellCreatedCallback) {
    this._cellCreatedCallback = value;
  }

  public isRowSelected(rowData: { [key: string]: any }): boolean {
    const predicate = createPredicate(Array.isArray(this._selectKey) ? this._selectKey : [this._selectKey], rowData);
    return this.selectKey ? !!this._selectionManager.getItems().find(item => matchesPredicate(item, predicate)) : this._selectionManager.exists(rowData);
  }

  /** Returns the selected row instances. */
  public getSelectedRows(): any[] {
    return this._selectionManager.getItems();
  }

  /**
   * Sets the selected items in the table.
   * @param {any[]} data The data to select.
   * @param {boolean} clearCurrentSelections True to clear the current selections before setting the new selections.
   */
  public selectRows(data: any[], clearCurrentSelections: boolean): void {
    if (!this._selectKey) {
      throw new Error('You must set a selectKey to select rows.');
    }

    if (!this._multiselect || clearCurrentSelections) {
      this.clearSelections();
    }

    if (data && data.length) {
      this._selectionManager.add(data);
      this._updateSelections(!clearCurrentSelections);
    }
  }

  /**
   * Deselects rows from in the table data.
   * @param {any[]} data The array of items to deselect.
   */
  public deselectRows(data: any[]): void {
    if (data && data.length) {
      this._selectionManager.remove(data);
      this._updateSelections(false);
    }
  }

  /**
   * Clears all selections from the table.
   */
  public clearSelections(): void {
    const tableElement = this._adapter.getTableElement();

    this._selectionManager.clear();
    this._tableRows.forEach(tableRow => (tableRow.selected = false));
    this._isAllSelected = false;

    this._adapter.clearSelectedRows(tableElement);

    if (this._select && this._multiselect) {
      this._adapter.updateSelectAllState(tableElement, false);
    }
  }

  /**
   * Hides a table column.
   * @param {number} columnIndex The index of the column to hide.
   */
  public hideColumn(columnIndex: number): void {
    const columnConfig = this._columnConfigurations[columnIndex];

    if (this._sortedColumnIndex === columnIndex) {
      this._sortedColumnIndex = -1;
    }

    if (!this._hiddenColumnManager.exists(columnConfig)) {
      this._hiddenColumnManager.add(columnConfig);
      this.render();
    }
  }

  /**
   * Shows a column that is currently hidden.
   * @param {number} columnIndex The index of the column to show.
   */
  public showColumn(columnIndex: number): void {
    const columnConfig = this._columnConfigurations[columnIndex];
    if (this._hiddenColumnManager.exists(columnConfig)) {
      this._hiddenColumnManager.remove(columnConfig);
      this.render();
    }
  }

  /**
   * Determines if a column at the given index is hidden or not.
   * @param {number} columnIndex The index of the column.
   * @returns {boolean} `true` if the column is hidden, `false` otherwise.
   */
  public isColumnHidden(columnIndex: number): boolean {
    const columnConfig = this._columnConfigurations[columnIndex];
    return !!columnConfig && this._hiddenColumnManager.exists(columnConfig);
  }

  /**
   * Creates and renders the table with the current column configuration and data.
   */
  public render(): void {
    this._adapter.emitHostEvent(TABLE_CONSTANTS.events.BEFORE_BODY_RENDERED, undefined, false);
    this._adapter.createTable(this._tableConfiguration);
    this._renderSelections();
    this._rendered = true;
    this._adapter.emitHostEvent(TABLE_CONSTANTS.events.BODY_RENDERED, undefined, false);
  }

  /**
   * Renders the table body only.
   */
  private _renderBody(): void {
    if (!this._rendered) {
      return;
    }
    this._adapter.emitHostEvent(TABLE_CONSTANTS.events.BEFORE_BODY_RENDERED, undefined, false);
    this._adapter.recreateTableBody(this._tableConfiguration);
    this._renderSelections();
    this._adapter.emitHostEvent(TABLE_CONSTANTS.events.BODY_RENDERED, undefined, false);
  }

  private _renderSelections(): void {
    if (this.select) {
      this._isAllSelected = this._getSelectAllState();

      if (this._multiselect) {
        this._adapter.updateSelectAllState(this._adapter.getTableElement(), this._isAllSelected, this._isIndeterminate(this._isAllSelected));
      }
    }

    const selections = this._selectionManager.getItems();
    if (selections.length) {
      this._adapter.setSelectedRows(this._adapter.getTableElement(), this._selectKey, this._data, selections, false);
    }
  }

  /**
   * Expands a collapsed row.
   * @param rowIndex The index of the row to expand.
   */
  public expandRow(rowIndex: number, template: TableViewTemplate): Promise<void> {
    if (!this._rendered) {
      throw new Error('Cannot expand a row before the table has rendered.');
    }

    if (rowIndex < 0 || rowIndex > this._tableRows.length) {
      throw new Error(`Invalid row index: ${rowIndex}.`);
    }

    return this._adapter.expandRow(this._tableConfiguration, rowIndex, template);
  }

  /**
   * Collapses an expanded row.
   * @param rowIndex The index of the row to expand.
   */
  public collapseRow(rowIndex: number): Promise<void> {
    if (!this._rendered) {
      return Promise.resolve();
    }

    if (rowIndex < 0 || rowIndex > this._tableRows.length) {
      return Promise.resolve();
    }

    return this._adapter.collapseRow(this._tableConfiguration, rowIndex);
  }

  /**
   * Check if a row is expanded or not.
   * @param rowIndex The row index to check.
   */
  public isRowExpanded(rowIndex: number): boolean {
    return this._adapter.isRowExpanded(this._tableConfiguration, rowIndex);
  }

  /**
   * Selects the rows by the index or indexes.
   * @param indexes The row indexes to select
   * @param preserveExisting Whether or not the existing selections should be preserved
   */
  public selectRowsByIndex(indexes: number[], preserveExisting?: boolean): void {
    const rowsToSelect = indexes.map(i => this._data[i]).filter(obj => !!obj);
    this.selectRows(rowsToSelect, !preserveExisting);
  }

  /**
   * Selects the rows by the index or indexes.
   * @param indexes The row indexes to deselect
   */
  public deselectRowsByIndex(indexes: number[]): void {
    const rowsToDeselect = indexes.map(i => this._data[i]).filter(obj => !!obj);
    this.deselectRows(rowsToDeselect);
  }

  /**
   * Determines if every row is selected or not.
   */
  private _getSelectAllState(): boolean {
    return this._tableRows.length > 0 && this._tableRows.every(tr => tr.selected);
  }

  /**
   * Updates the internal selection state as well as UI state.
   * @param {boolean} preserveExisting Should existing selections be preserved when updating selection state.
   */
  private _updateSelections(preserveExisting: boolean): void {
    this._tableRows.forEach(tableRow => (tableRow.selected = this._selectionManager.exists(tableRow.data)));
    const isAllSelected = this._getSelectAllState();

    this._adapter.setSelectedRows(this._adapter.getTableElement(), this._selectKey, this._data, this._selectionManager.getItems(), preserveExisting);

    if (isAllSelected !== this._isAllSelected || this._isIndeterminate(isAllSelected)) {
      this._isAllSelected = isAllSelected;

      if (this._multiselect) {
        this._adapter.updateSelectAllState(this._adapter.getTableElement(), this._isAllSelected, this._isIndeterminate(this._isAllSelected));
      }
    }
  }

  /** Handles a row being single clicked. */
  private _onRowClick(evt: MouseEvent): void {
    evt.stopImmediatePropagation();

    // Ignore if the element being clicked is the checkbox element
    if ((evt.target as HTMLElement).matches(`[${TABLE_CONSTANTS.attributes.SELECT_CHECKBOX}]`)) {
      return;
    }

    const composedPath = getEventPath(evt);
    const composedElements = composedPath.filter(node => node.nodeType === 1);
    const customCellTemplateElement = composedElements.find(el => el.hasAttribute(TABLE_CONSTANTS.attributes.CUSTOM_CELL_TEMPLATE));
    const stopClickPropagation =
      customCellTemplateElement && customCellTemplateElement.hasAttribute(TABLE_CONSTANTS.attributes.CUSTOM_CELL_TEMPLATE_STOP_PROPAGATION);
    if (stopClickPropagation) {
      return; // We ignore click events that bubble from custom templates if they were configured to stop propagation
    }

    const { index, data } = this._getSelectedRowFromEvent(evt);
    const evtData: ITableRowClickEventData = { index, data };
    this._adapter.emitHostEvent(TABLE_CONSTANTS.events.ROW_CLICK, evtData, true, false);
  }

  /** Handles a row being double clicked. */
  private _onRowDoubleClick(evt: Event): void {
    evt.stopPropagation();

    // Ignore if the element being clicked is the checkbox element
    if ((evt.target as HTMLElement).matches(`[${TABLE_CONSTANTS.attributes.SELECT_CHECKBOX}]`)) {
      return;
    }

    const rowSelectedInfo = this._getSelectedRowFromEvent(evt);
    const detail: ITableSelectDoubleEventData = {
      index: rowSelectedInfo.index,
      data: rowSelectedInfo.data
    };
    this._adapter.emitHostEvent(TABLE_CONSTANTS.events.SELECT_DOUBLE, detail, true, false);
  }

  /**
   * Handles a row being selected/deselected.
   */
  private _onRowSelected(evt: Event): void {
    // We handle row selection manually with either a pointerdown or keydown event (space key), so we listen
    // for the change event as well to prevent checking the checkbox being checked by the time the event reaches us
    if (evt.type === 'change') {
      evt.preventDefault();
      return;
    }

    if (evt.type === 'keydown' && (evt as KeyboardEvent).key !== ' ') {
      return;
    }

    const rowSelectedInfo = this._getSelectedRowFromEvent(evt);

    // Deselect the previously selected row(s) when not in multiselect mode (only if it's different than the newly selected row)
    if (!this._multiselect) {
      const existingSelections = this._tableRows.filter(item => item.selected);
      existingSelections.forEach(selection => {
        if (!matchesPredicate(selection.data, createPredicate(this._selectKey, rowSelectedInfo.data))) {
          this.deselectRows([selection.data]);
        }
      });
    }

    // Determine what the new selected state should be for this row (opposite of current state)
    const isSelected = !this._selectionManager.exists(rowSelectedInfo.data);

    // Update the table row based on the new selected state
    this._adapter.updateSelectedState(rowSelectedInfo.rowElement, isSelected);

    // Update the selection manager
    if (isSelected) {
      this._selectionManager.add(rowSelectedInfo.data);
    } else {
      this._selectionManager.remove(rowSelectedInfo.data);
    }

    // Update the state for this row
    this._tableRows[rowSelectedInfo.index].selected = isSelected;

    // The indexes that we need to emit select events for
    let selectionIndexes = [rowSelectedInfo.index];
    let isAllSelected = false;

    // If we have multiselect on, then we need to update the select all state
    if (this._multiselect) {
      const shift = (evt as KeyboardEvent).shiftKey;

      if (shift && this._previouslyClickedRow) {
        document.getSelection()?.removeAllRanges();
        selectionIndexes = this._shiftSelectRows(rowSelectedInfo);
        if (selectionIndexes.includes(this._previouslyClickedRow.index)) {
          const idx = selectionIndexes.indexOf(this._previouslyClickedRow.index);
          selectionIndexes.splice(idx, 1);
        }
      }

      // Update the state of the select all checkbox
      isAllSelected = this._getSelectAllState();
      this._adapter.updateSelectAllState(this._adapter.getTableElement(), isAllSelected, this._isIndeterminate(isAllSelected));
    }

    // Emit a table row selection changed event
    for (const index of selectionIndexes) {
      const data = this._tableRows[index].data;
      const selected = this._selectionManager.exists(data);
      const detail: ITableSelectEventData = { selected, index, data };
      this._adapter.emitHostEvent(TABLE_CONSTANTS.events.SELECT, detail, true, false);
    }

    // If selecting/deselecting this row causes the select all state to be changed, then emit the select all changed event.
    if (this._isAllSelected !== isAllSelected) {
      this._isAllSelected = isAllSelected;
      const data: ITableSelectAllEventData = {
        status: this._isAllSelected,
        count: this._tableRows.filter(row => row.selected).length,
        data: [...this._data],
        targetType: 'row'
      };
      this._adapter.emitHostEvent(TABLE_CONSTANTS.events.SELECT_ALL, data, true, false);
    }

    this._previouslyClickedRow = { ...rowSelectedInfo };
  }

  /**
   * Determines which row was chosen from the given event.
   * @param {Event} evt The click event.
   */
  private _getSelectedRowFromEvent(evt: Event): IRowSelectedDescriptor {
    const composedPath = getEventPath(evt);
    const rowElement = composedPath.find(el => el.tagName === 'TR') as HTMLTableRowElement;
    // We need to get the index of the row element from its parent tbody in case the
    // element has been removed from the DOM (table re-rendered) between when this event
    // was dispatched and when this method is executed
    const tbody = rowElement.parentElement as HTMLTableSectionElement;
    const index = this._getNonExpandedRows(tbody).findIndex(el => el === rowElement);
    const data = this._tableRows[index].data;
    return { rowElement, index, data };
  }

  private _getNonExpandedRows(tbodyElement: HTMLTableSectionElement): HTMLTableRowElement[] {
    return Array.from(tbodyElement.rows).filter(row => !row.classList.contains(TABLE_CONSTANTS.classes.TABLE_ROW_EXPANDABLE_CONTENT));
  }

  /**
   * Handles the select all checkbox being checked/unchecked.
   */
  private _onSelectAll(evt: Event): void {
    evt.stopPropagation();

    // Toggle the status of our select all state
    this._isAllSelected = !this._isAllSelected;

    const tableElement = this._adapter.getTableElement();

    // Update the select all checkbox in the table based on the new state
    this._adapter.updateSelectAllState(tableElement, this._isAllSelected);

    // Select/deselect every row based on our new select all state
    this._tableRows.forEach((tableRow, index) => {
      // Update the state for each row
      tableRow.selected = this._isAllSelected;

      // Update the selection manager
      if (this._isAllSelected) {
        this._selectionManager.add(tableRow.data);
      } else {
        this._selectionManager.remove(tableRow.data);
      }

      // Update the table row selected state
      const rowElement = TableUtils.getRowByIndex(tableElement, index);
      if (rowElement) {
        this._adapter.updateSelectedState(rowElement, this._isAllSelected);
      }
    });

    // Emit the select all changed event
    const data: ITableSelectAllEventData = {
      status: this._isAllSelected,
      count: this._tableRows.filter(row => row.selected).length,
      data: [...this._data],
      targetType: 'select-all'
    };
    this._adapter.emitHostEvent(TABLE_CONSTANTS.events.SELECT_ALL, data, true, false);
  }

  private _onHeadRowContextMenu(evt: MouseEvent): void {
    // We only handle this event on MacOS due to the `ctrl+click` combination triggering the contextmenu event...
    // So we only detect that scenario here to still allow for the default context menu on Mac when right-clicking
    if (evt.ctrlKey) {
      evt.preventDefault();
    }
  }

  private _onHeadRowMouseDown(evt: MouseEvent): void {
    if (evt.button !== 0) {
      return;
    }

    const composedPath = getEventPath(evt);
    const target = evt.target as HTMLElement;

    // Find the row and cell elements that the event originated within
    const rowElement = composedPath.find(el => el.tagName === 'TR') as HTMLTableRowElement;
    const thElement = composedPath.find(el => el.tagName === 'TH') as HTMLTableCellElement;
    const cellIndex = Array.from(rowElement.cells).findIndex(c => c === thElement);
    this._headCellMouseDownIndex = cellIndex;

    if (target !== thElement && target.classList.contains(TABLE_CONSTANTS.classes.TABLE_RESIZE_HANDLE)) {
      this._resizeDescriptor = {
        element: thElement,
        startWidth: thElement.offsetWidth,
        startX: evt.pageX,
        width: thElement.offsetWidth,
        index: this._select ? cellIndex - 1 : cellIndex
      };
      this._adapter.addDocumentListener('mousemove', this._documentMouseMoveListener);
      this._adapter.setResizeColumnVisibility(this._tableConfiguration, cellIndex, true);
    }

    this._adapter.addDocumentListener('mouseup', this._documentMouseUpListener);
  }

  private _onMouseMove(evt: MouseEvent): void {
    if (this._resizeDescriptor) {
      let newWidth = this._resizeDescriptor.startWidth + (evt.pageX - this._resizeDescriptor.startX);
      // Ensure that the user can't drag the column past the minimum column width
      if (newWidth < this._minResizeWidth) {
        newWidth = this._minResizeWidth;
      }
      this._resizeDescriptor.width = newWidth;
      this._resizeDescriptor.element.style.width = `${newWidth}px`;
      this._adapter.addTableClass(TABLE_CONSTANTS.classes.TABLE_RESIZING);
    }
  }

  private _onMouseUp(evt: MouseEvent): void {
    this._adapter.removeDocumentListener('mousemove', this._documentMouseMoveListener);
    this._adapter.removeDocumentListener('mouseup', this._documentMouseUpListener);
    this._adapter.removeTableClass(TABLE_CONSTANTS.classes.TABLE_RESIZING);

    if (this._headCellMouseDownIndex === undefined) {
      return;
    }

    if (this._resizeDescriptor) {
      this._adapter.normalizeColumnWidths(this._tableConfiguration);
      this._adapter.setResizeColumnVisibility(this._tableConfiguration, this._headCellMouseDownIndex, false);
      const resizeEventData: ITableColumnResizeEventData = {
        index: this._resizeDescriptor.index,
        width: this._resizeDescriptor.width
      };
      this._adapter.emitHostEvent(TABLE_CONSTANTS.events.COLUMN_RESIZE, resizeEventData);
      this._resizeDescriptor = undefined;
    } else if ((this._tableConfiguration.tableElement.tHead as HTMLTableSectionElement).contains(evt.target as HTMLElement)) {
      if (this._multiColumnSort) {
        this._onMultiSort(this._headCellMouseDownIndex, evt.ctrlKey);
      } else {
        this._onSort(this._headCellMouseDownIndex as number);
      }
    }

    this._headCellMouseDownIndex = undefined;
  }

  private _onSortableHeadCellKeydown(evt: KeyboardEvent): void {
    if (evt.key === ' ' || evt.key === 'Enter') {
      const composedPath = getEventPath(evt);
      const rowElement = composedPath.find(el => el.tagName === 'TR') as HTMLTableRowElement;
      const thElement = composedPath.find(el => el.tagName === 'TH') as HTMLTableCellElement;
      const cellIndex = Array.from(rowElement.cells).findIndex(c => c === thElement);
      this._onSort(cellIndex);
    }
  }

  /**
   * Called when a click event is triggered on the table header row.
   * We use this to capture all click events on the row, and determine which
   * header cell was clicked.
   */
  private _onSort(cellIndex: number): void {
    // Get the column index so we can access the config for that column (this depends on whether there is a select column or not)
    const columnIndex = this._select ? cellIndex - 1 : cellIndex;

    // Get the column config
    const columnConfig = columnIndex >= 0 ? this._visibleColumnConfigurations[columnIndex] : null;

    // If this column was not sortable, or was the select column then we just return
    if (!columnConfig || !columnConfig.sortable) {
      return;
    }

    // Always default to ascending sort on a newly sorted column
    let desiredSortDirection = SortDirection.Ascending;
    // Toggle the sort direction class
    const isTogglingSortOnSameColumn = columnIndex === this._sortedColumnIndex;
    const currentSortDirectionIsAscending = this._sortDirection === SortDirection.Ascending || this._sortDirection === undefined;
    const isUnsorting = isTogglingSortOnSameColumn && this._sortDirection === SortDirection.Descending;
    if (isTogglingSortOnSameColumn && currentSortDirectionIsAscending) {
      desiredSortDirection = SortDirection.Descending;
    }

    if (isUnsorting && !columnConfig.preventUnsort) {
      desiredSortDirection = SortDirection.Unset;
    }

    // Emit the sort event for this column
    const data: ITableSortEventData = {
      direction: desiredSortDirection,
      columnIndex
    };
    if (!this._adapter.emitHostEvent(TABLE_CONSTANTS.events.SORT, data, true, true)) {
      // If defaultPrevented is true, we emit the event without updating internal state.
      return;
    }

    if (isTogglingSortOnSameColumn && this._sortDirection === SortDirection.Descending && !columnConfig.preventUnsort) {
      this._adapter.removeColumnSort(this._adapter.getTableElement(), this._select ? this._sortedColumnIndex + 1 : this._sortedColumnIndex);
      this._sortedColumnIndex = -1;
      return;
    }

    // Update internal state
    this._sortDirection = desiredSortDirection;
    // Toggle the sort direction class
    if (columnIndex === this._sortedColumnIndex) {
      // Update the table with the new sort direction
      this._adapter.setSortDirection(this._adapter.getTableElement(), cellIndex, this._sortDirection);
    } else {
      // If we have a column this is currently sorted, remove the sort from that column
      if (this._sortedColumnIndex >= 0) {
        this._adapter.removeColumnSort(this._adapter.getTableElement(), this._select ? this._sortedColumnIndex + 1 : this._sortedColumnIndex);
      }

      // Set this column as the sorted column
      this._sortedColumnIndex = columnIndex;

      // Set the new sort direction on the newly sorted column
      this._adapter.setSortedColumn(this._adapter.getTableElement(), cellIndex, this._sortDirection);
    }
  }

  private _onMultiSort(cellIndex: number, ctrlKey: boolean): void {
    // Get the column index so we can access the config for that column (this depends on whether there is a select column or not)
    const columnIndex = this._select ? cellIndex - 1 : cellIndex;

    // Get the column config
    const columnConfig = columnIndex >= 0 ? this._visibleColumnConfigurations[columnIndex] : null;

    // If this column was not sortable, or was the select column then we just return
    if (!columnConfig || !columnConfig.sortable) {
      return;
    }

    const revertColumns = this._multiSortManager.sortedColumns;
    const sortColumn = this._multiSortManager.getSortColumn(columnIndex);

    if (sortColumn) {
      this._multiSortManager.updateSortColumn(sortColumn);
    } else if (ctrlKey) {
      this._multiSortManager.addSortColumn({
        direction: SortDirection.Descending,
        columnIndex,
        propertyName: columnConfig.property as string
      });
    } else {
      this._multiSortManager.clearMultiSort();
      this._multiSortManager.addSortColumn({
        direction: SortDirection.Descending,
        columnIndex,
        propertyName: columnConfig.property as string
      });
    }

    const data: ITableSortMultipleEventData = this._multiSortManager.sortedColumns.map(col => ({ ...col }));
    if (!this._adapter.emitHostEvent(TABLE_CONSTANTS.events.SORT, data, true, true)) {
      // If defaultPrevented is true, we emit the event without updating internal state.
      this._multiSortManager.setSortColumns(revertColumns);
      return;
    }
    const newSortedColumns = this._multiSortManager.sortedColumns;
    const hasMultipleColumnsSorted = newSortedColumns.length > 1;

    // clear any unsorted columns in the UI
    for (let virtualIndex = 0; virtualIndex < this._visibleColumnConfigurations.length; virtualIndex++) {
      // actualIndex takes into account if there is a select column, virtualIndex is 0 -> visible data columns length
      const actualIndex = this._select ? virtualIndex + 1 : virtualIndex;

      if (!this._multiSortManager.isSortColumn(virtualIndex)) {
        this._adapter.removeColumnSort(this._adapter.getTableElement(), actualIndex);
        TableUtils.setMultiSortColumnSortNumber(this._adapter.getTableElement(), hasMultipleColumnsSorted, actualIndex, null);
      } else {
        const column = this._multiSortManager.getSortColumn(virtualIndex);
        if (column) {
          this._adapter.setSortedColumn(this._adapter.getTableElement(), actualIndex, column.direction);
          TableUtils.setMultiSortColumnSortNumber(this._adapter.getTableElement(), hasMultipleColumnsSorted, actualIndex, column.sortOrder || null);
        }
      }
    }
  }

  /**
   * Handles filter events and emits the filter information event.
   * @param evt The event.
   */
  private _onFilter(value: any, columnIndex: number): void {
    const data: ITableFilterEventData = { value, columnIndex };
    this._adapter.emitHostEvent(TABLE_CONSTANTS.events.FILTER, data, true, false);
  }

  private _shiftSelectRows(selectedRow: IRowSelectedDescriptor): number[] {
    const indexes: number[] = [];

    if (this._previouslyClickedRow) {
      const prevIndex = this._previouslyClickedRow.index;
      const currIndex = selectedRow.index;
      let startIndex = currIndex >= prevIndex ? prevIndex : currIndex;
      let endIndex = currIndex >= prevIndex ? currIndex : prevIndex;
      endIndex += endIndex > startIndex ? 1 : 0;
      startIndex += startIndex > endIndex ? 1 : 0;

      let action = (data: any[]): void => this.selectRows(data, false);
      const existingSelection = this._tableRows.find(item => item.selected && item.data === selectedRow.data);
      const shouldDeselect = this._tableRows.find(item => item.data === this._previouslyClickedRow?.data && !item.selected);

      // If you are clicking a checkbox that is already selected, deselect all the rows
      if (!existingSelection || shouldDeselect) {
        action = (data: any[]) => this.deselectRows(data);
      }

      for (let i = startIndex; i < endIndex; i++) {
        indexes.push(i);
      }

      action(this.data.filter((v, i) => indexes.includes(i)));
    }

    return indexes;
  }

  private _isIndeterminate(isAllSelected: boolean): boolean {
    return !isAllSelected && this.getSelectedRows().length > 0 && this._data.length !== this.getSelectedRows().length;
  }

  private _applyRoomy(): void {
    this._adapter.setRoomy(this._adapter.getTableElement(), this._roomy);
    this._adapter.setHostAttribute(TABLE_CONSTANTS.attributes.ROOMY, this._roomy.toString());
  }

  private _refreshTableSort(): void {
    this._sortedColumnIndex = this._visibleColumnConfigurations.findIndex(c => c.initialSort);

    // We only update the sort direction if it was not already set
    if (this._sortedColumnIndex >= 0 && this._sortDirection === undefined) {
      const sortedColumn = this._visibleColumnConfigurations[this._sortedColumnIndex];
      if (sortedColumn.initialSort === true && sortedColumn.sortDirection) {
        this._sortDirection = sortedColumn.sortDirection;
      } else if (typeof sortedColumn.initialSort === 'object' && sortedColumn.initialSort.direction) {
        this._sortDirection = sortedColumn.initialSort.direction;
      }
    }

    if (this._multiColumnSort) {
      const sortedColumns: ISortedItem[] = [];
      this._visibleColumnConfigurations.forEach((col, index) => {
        if (typeof col.initialSort === 'object') {
          sortedColumns.push({
            columnIndex: index,
            direction: col.initialSort.direction,
            sortOrder: col.initialSort.sortOrder,
            propertyName: col.property as string
          });
        }
      });
      this._multiSortManager.setSortColumns(sortedColumns);
    }
  }
}
