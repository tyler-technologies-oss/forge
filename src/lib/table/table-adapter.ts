import { addClass, removeAllChildren, removeClass } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../core/adapters/base-adapter';
import { ITableComponent } from './table';
import { TABLE_CONSTANTS } from './table-constants';
import { TableUtils } from './table-utils';
import { CellAlign, ITableConfiguration, SortDirection, TableHeaderSelectAllTemplate, TableViewTemplate, TableSelectTooltipCallback } from './types';
import { TableRow } from './table-row';

export interface ITableAdapter extends IBaseAdapter {
  initialize: () => void;
  getTableElement: () => HTMLTableElement;
  createTable: (configuration: ITableConfiguration) => void;
  recreateTableBody: (configuration: ITableConfiguration) => void;
  setSelectedRows: (tableElement: HTMLTableElement, key: string[], data: any[], selectedRows: any[], preserveExisting?: boolean) => void;
  clearSelectedRows: (tableElement: HTMLTableElement) => void;
  updateSelectedState: (rowElement: HTMLTableRowElement, isSelected: boolean) => void;
  updateSelectAllState: (tableElement: HTMLTableElement, isAllSelected: boolean, isIndeterminate?: boolean) => void;
  setSortedColumn: (tableElement: HTMLTableElement, columnIndex: number, sortDirection: SortDirection) => void;
  removeColumnSort: (tableElement: HTMLTableElement, columnIndex: number) => void;
  setSortDirection: (tableElement: HTMLTableElement, columnIndex: number, sortDirection: SortDirection) => void;
  setSelectColumnVisibility: (tableElement: HTMLTableElement, isVisible: boolean, selectListener: (evt: Event) => void, selectAllListener?: (evt: Event) => void, selectAllTemplate?: TableHeaderSelectAllTemplate | null, selectCheckboxAlignment?: CellAlign, data?: TableRow[], tooltipSelect?: string | TableSelectTooltipCallback, tooltipSelectAll?: string) => void;
  setDense: (tableElement: HTMLTableElement, isDense: boolean) => void;
  setRoomy(tableElement: HTMLTableElement, isRoomy: boolean): void;
  setResizable: (configuration: ITableConfiguration) => void;
  setSelectAllVisibility: (tableElement: HTMLTableElement, isVisible: boolean, listener: ((evt: Event) => void) | null, selectAllTemplate: TableHeaderSelectAllTemplate | null, selectCheckboxAlignment?: CellAlign, tooltipSelectAll?: string) => void;
  setFilterRow: (configuration: ITableConfiguration) => void;
  expandRow(configuration: ITableConfiguration, rowIndex: number, template: TableViewTemplate): Promise<void>;
  collapseRow(configuration: ITableConfiguration, rowIndex: number): Promise<void>;
  isRowExpanded(configuration: ITableConfiguration, rowIndex: number): boolean;
  setFixedHeaders(configuration: ITableConfiguration): void;
  setTableLayoutType(configuration: ITableConfiguration): void;
  setWrapContentState(configuration: ITableConfiguration): void;
  addDocumentListener(type: string, listener: (evt: MouseEvent) => void): void;
  removeDocumentListener(type: string, listener: (evt: MouseEvent) => void): void;
  normalizeColumnWidths(configuration: ITableConfiguration): void;
  setResizeColumnVisibility(configuration: ITableConfiguration, columnIndex: number, isVisible: boolean): void;
  addTableClass(classes: string | string[]): void;
  removeTableClass(classes: string | string[]): void;
  setRowClickListeners(tableElement: HTMLTableElement, allowClick: boolean, clickListener: (evt: Event) => void, doubleClickListener: (evt: Event) => void): void;
  setRowClickAttributes(tableElement: HTMLTableElement, allowClick: boolean): void;
}

/**
 * Provides facilities for interacting with the internal DOM of `TableComponent`.
 */
export class TableAdapter extends BaseAdapter<ITableComponent> implements ITableAdapter {
  private _tableElement: HTMLTableElement;

  constructor(component: ITableComponent) {
    super(component);
  }

  public initialize(): void {
    if (!this._tableElement) {
      this._tableElement = document.createElement('table');
      this._tableElement.classList.add(TABLE_CONSTANTS.classes.TABLE);

      if (this._component.children.length) {
        removeAllChildren(this._component);
      }

      this._component.appendChild(this._tableElement);
    }
  }

  public getTableElement(): HTMLTableElement {
    if (!this._tableElement) {
      this.initialize();
    }
    return this._tableElement;
  }

  public createTable(configuration: ITableConfiguration): void {
    return TableUtils.createTable(configuration);
  }

  public recreateTableBody(configuration: ITableConfiguration): void {
    TableUtils.recreateTableBody(configuration);
  }

  public setSelectedRows(tableElement: HTMLTableElement, key: string[], data: any[], selectedRows: any[], preserveExisting: boolean = false): void {
    TableUtils.setSelectedRows(tableElement, key, data, selectedRows, preserveExisting);
  }

  public clearSelectedRows(tableElement: HTMLTableElement): void {
    TableUtils.clearSelectedRows(tableElement);
  }

  public updateSelectedState(rowElement: HTMLTableRowElement, isSelected: boolean): void {
    TableUtils.updateSelectedState(rowElement, isSelected);
  }

  public updateSelectAllState(tableElement: HTMLTableElement, isAllSelected: boolean, isIndeterminate?: boolean): void {
    TableUtils.updateSelectAllState(tableElement, isAllSelected, isIndeterminate);
  }

  public setSortedColumn(tableElement: HTMLTableElement, columnIndex: number, sortDirection: SortDirection): void {
    TableUtils.setSortedColumn(tableElement, columnIndex, sortDirection);
  }

  public removeColumnSort(tableElement: HTMLTableElement, columnIndex: number): void {
    TableUtils.removeColumnSort(tableElement, columnIndex);
  }

  public setSortDirection(tableElement: HTMLTableElement, columnIndex: number, sortDirection: SortDirection): void {
    TableUtils.setSortDirection(tableElement, columnIndex, sortDirection);
  }

  public setSelectColumnVisibility(
    tableElement: HTMLTableElement,
    isVisible: boolean,
    selectListener: (evt: Event) => void,
    selectAllListener?: (evt: Event) => void,
    selectAllTemplate?: TableHeaderSelectAllTemplate | null,
    selectCheckboxAlignment?: CellAlign,
    data?: TableRow[],
    tooltipSelect?: string | TableSelectTooltipCallback,
    tooltipSelectAll?: string): void {
    TableUtils.setSelectColumnVisibility(
      tableElement,
      isVisible,
      selectListener,
      selectAllListener || null,
      selectAllTemplate || null,
      selectCheckboxAlignment || null,
      data || [],
      tooltipSelect || null,
      tooltipSelectAll || null);
  }

  public setDense(tableElement: HTMLTableElement, isDense: boolean): void {
    TableUtils.setDenseState(tableElement, isDense);
  }

  public setRoomy(tableElement: HTMLTableElement, isRoomy: boolean): void {
    TableUtils.setRoomyState(tableElement, isRoomy);
  }

  public setResizable(configuration: ITableConfiguration): void {
    TableUtils.setResizable(configuration);
  }

  public setSelectAllVisibility(
    tableElement: HTMLTableElement,
    isVisible: boolean,
    listener: ((evt: Event) => void) | null,
    selectAllTemplate: TableHeaderSelectAllTemplate | null,
    selectCheckboxAlignment?: CellAlign,
    tooltipSelectAll: string | null = null): void {
    TableUtils.setSelectAllVisibility(
      tableElement,
      isVisible,
      listener,
      selectAllTemplate,
      selectCheckboxAlignment || null,
      tooltipSelectAll || null);
  }

  public setFilterRow(configuration: ITableConfiguration): void {
    TableUtils.setFilterRow(configuration);
  }

  public expandRow(configuration: ITableConfiguration, rowIndex: number, template: TableViewTemplate): Promise<void> {
    return TableUtils.expandRow(configuration, rowIndex, template);
  }

  public collapseRow(configuration: ITableConfiguration, rowIndex: number): Promise<void> {
    return TableUtils.collapseRow(configuration, rowIndex);
  }

  public isRowExpanded(configuration: ITableConfiguration, rowIndex: number): boolean {
    return TableUtils.isRowExpanded(configuration, rowIndex);
  }

  public setFixedHeaders(configuration: ITableConfiguration): void {
    TableUtils.setFixedHeaders(configuration);
  }

  public setTableLayoutType(configuration: ITableConfiguration): void {
    TableUtils.setLayoutType(configuration);
  }

  public setWrapContentState(configuration: ITableConfiguration): void {
    TableUtils.setWrapContentState(configuration.tableElement, configuration.wrapContent);
  }

  public addDocumentListener(type: string, listener: (evt: MouseEvent) => void): void {
    TableUtils.getOwnerDocument(this._component).addEventListener(type, listener);
  }

  public removeDocumentListener(type: string, listener: (evt: MouseEvent) => void): void {
    TableUtils.getOwnerDocument(this._component).removeEventListener(type, listener);
  }

  public normalizeColumnWidths(configuration: ITableConfiguration): void {
    TableUtils.normalizeColumnWidths(configuration);
  }

  public setResizeColumnVisibility(configuration: ITableConfiguration, columnIndex: number, isVisible: boolean): void {
    TableUtils.setColumnResizeIndicatorVisibility(configuration, columnIndex, isVisible);
  }

  public addTableClass(classes: string | string[]): void {
    addClass(classes, this._tableElement);
  }

  public removeTableClass(classes: string | string[]): void {
    removeClass(classes, this._tableElement);
  }

  public setRowClickListeners(tableElement: HTMLTableElement, allowClick: boolean, clickListener: (evt: Event) => void, doubleClickListener: (evt: Event) => void): void {
    TableUtils.setRowClickListeners(tableElement, allowClick, clickListener, doubleClickListener);
  }

  public setRowClickAttributes(tableElement: HTMLTableElement, allowClick: boolean): void {
    TableUtils.setRowClickAttributes(tableElement, allowClick);
  }
}
