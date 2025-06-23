import {
  addClass,
  createPredicate,
  debounce,
  findWhere,
  getPropertyValue,
  isDefined,
  isFunction,
  isNumber,
  isObject,
  isString,
  removeAllChildren,
  removeClass,
  removeElement,
  replaceElement,
  safeCssWidth,
  toggleClass
} from '@tylertech/forge-core';
import { CHECKBOX_CONSTANTS, ICheckboxComponent } from '../checkbox';
import { EXPANSION_PANEL_CONSTANTS, IExpansionPanelComponent } from '../expansion-panel';
import { ITooltipComponent } from '../tooltip';
import { TABLE_CONSTANTS } from './table-constants';
import { TableRow } from './table-row';
import {
  CellAlign,
  IColumnConfiguration,
  IColumnData,
  ITableConfiguration,
  SortDirection,
  TableFilterDelegateFactory,
  TableFilterListener,
  TableHeaderSelectAllTemplate,
  TableViewTemplate,
  TableSelectTooltipCallback,
  ITableTemplateBuilderResult,
  TableViewTemplateBuilder
} from './types';
import { ICON_CONSTANTS, IIconComponent } from '../icon';
import { FormFieldComponentDelegate, IFormFieldComponentDelegate } from '../core/delegates/form-field-component-delegate';
import { BaseComponentDelegate, IBaseComponentDelegate } from '../core';

function isTemplateResultObject(val: any): val is ITableTemplateBuilderResult {
  return val && typeof val === 'object' && 'content' in val;
}

/**
 * Provides facilities for creating and manipulating a table component.
 */
export class TableUtils {
  /**
   * Creates a table using the provided configuration.
   * @param {ITableConfiguration} configuration The table configuration.
   */
  public static createTable(configuration: ITableConfiguration): void {
    // Reset the table back to its original unpopulated state
    TableUtils._resetTable(configuration.tableElement);

    // Create the header and body rows
    const thead = TableUtils._createTableHead(configuration);
    const tbody = TableUtils._createTableBody(configuration);

    // If we are allowing click events on the table rows then attach the row click listeners and attributes
    if (configuration.clickListener) {
      TableUtils._attachRowClickListeners(tbody, configuration.clickListener, configuration.doubleClickListener);
      TableUtils._addRowClickAttributes(tbody);
    }

    // Set the fixed state
    if (configuration.fixedHeaders) {
      TableUtils.setFixedHeaders(configuration);
    }

    // Set the resizable state
    if (configuration.resizable) {
      TableUtils.setResizable(configuration);
    }

    // Set the dense state
    if (configuration.dense) {
      TableUtils.setDenseState(configuration.tableElement, configuration.dense);
    }

    // Set the wrap state
    if (configuration.wrapContent) {
      TableUtils.setWrapContentState(configuration.tableElement, configuration.wrapContent);
    }

    // Add the select column
    if (configuration.selectListener) {
      TableUtils._addSelectColumn(
        thead,
        tbody,
        configuration.selectListener,
        configuration.selectAllListener,
        configuration.selectAllTemplate,
        configuration.selectCheckboxAlignment,
        configuration.data,
        configuration.tooltipSelect,
        configuration.tooltipSelectAll
      );
    }

    if (configuration.resizable || configuration.columnConfigurations.some(c => !!c.sortable)) {
      TableUtils._attachHeadRowMouseDownListener(thead, configuration.headRowMouseDownListener);
      if (TableUtils._isMac()) {
        TableUtils._attachHeadRowContextMenuListener(thead, configuration.headRowContextMenuListener);
      }
    }

    TableUtils.setLayoutType(configuration);
    TableUtils._setTableHead(configuration.tableElement, thead);

    // Add the filter row (must come after adding the select column and table head)
    if (configuration.filter) {
      TableUtils.setFilterRow(configuration);
    }

    TableUtils._setTableBody(configuration.tableElement, tbody);
  }

  private static _setTableHead(tableElement: HTMLTableElement, thead: HTMLTableSectionElement): void {
    if (tableElement.tHead) {
      replaceElement(thead, tableElement.tHead);
    } else {
      tableElement.appendChild(thead);
    }
  }

  private static _setTableBody(tableElement: HTMLTableElement, tbody: HTMLTableSectionElement): void {
    if (tableElement.tBodies.length) {
      replaceElement(tbody, tableElement.tBodies[0]);
    } else {
      tableElement.appendChild(tbody);
    }
  }

  /**
   * Destroys and recreates the table body section only.
   * @param {ITableConfiguration} configuration The table configuration.
   */
  public static recreateTableBody(configuration: ITableConfiguration): void {
    // Create the table body
    const tbody = TableUtils._createTableBody(configuration);

    // If we are allowing click events on the table rows then attach the row click listeners
    if (configuration.clickListener) {
      TableUtils._attachRowClickListeners(tbody, configuration.clickListener, configuration.doubleClickListener);
      TableUtils._addRowClickAttributes(tbody);
    }

    // Add the select column if necessary
    if (configuration.selectListener) {
      TableUtils._createBodySelectColumn(
        tbody,
        configuration.selectCheckboxAlignment,
        configuration.data,
        configuration.tooltipSelect,
        configuration.tooltipSelectAll
      );
      TableUtils._attachRowSelectListeners(tbody, configuration.selectListener);
    }

    TableUtils._setTableBody(configuration.tableElement, tbody);
  }

  /**
   * Removes all DOM nodes from the table.
   * @param {HTMLTableElement} tableElement The table element to remove all children from.
   */
  private static _resetTable(tableElement: HTMLTableElement): void {
    removeAllChildren(tableElement);
  }

  /**
   * Creates a `forge-tooltip` for multi sort column headers
   */
  private static _createMultisortTooltip(): ITooltipComponent {
    const tooltip = document.createElement('forge-tooltip');
    tooltip.textContent = 'Ctrl + click to sort multiple columns';
    tooltip.placement = 'bottom';
    tooltip.delay = 0;
    return tooltip;
  }

  /**
   * Creates the table header section by adding a row for the column headers based on column configuration.
   * @param columnDataMap The column based data map.
   * @param tableElement The table element.
   */
  private static _createTableHead(tableConfiguration: ITableConfiguration): HTMLTableSectionElement {
    const thead = document.createElement('thead');

    // Create the table head row for our column headers with required class
    const tr = thead.insertRow();
    addClass([TABLE_CONSTANTS.classes.TABLE_ROW, TABLE_CONSTANTS.classes.TABLE_HEAD_ROW], tr);

    // We use this to determine if the initial sort column has already been set during the loop.
    // We set the initial sort to the first column that requests it.
    let setInitialSort = false;

    // Create a header cell for each column in our column data map
    for (let i = 0; i < tableConfiguration.columnConfigurations.length; i++) {
      const columnConfig = tableConfiguration.columnConfigurations[i];

      // Create the th element with required classes
      const th = document.createElement('th');
      th.scope = 'col';
      addClass([TABLE_CONSTANTS.classes.TABLE_CELL, TABLE_CONSTANTS.classes.TABLE_HEAD_CELL], th);

      // We wrap the header text in a div for ease of alignment
      let cellContainer: HTMLElement;
      if (columnConfig.sortable) {
        cellContainer = document.createElement('button');
        (cellContainer as HTMLButtonElement).type = 'button';
        cellContainer.addEventListener('keydown', tableConfiguration.sortableHeadCellKeydownListener);
      } else {
        cellContainer = document.createElement('div');
      }
      cellContainer.classList.add(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_CONTAINER);

      // Add tooltip for multisort
      if (tableConfiguration.multiColumnSort) {
        const tooltip = TableUtils._createMultisortTooltip();
        cellContainer.appendChild(tooltip);
      }

      // Set the cell alignment from config
      if (columnConfig.align) {
        TableUtils._setCellAlignmentClass(cellContainer, columnConfig.align);
      }

      // Check if width was specified
      if (isDefined(columnConfig.width)) {
        const width = safeCssWidth(columnConfig.width as string | number);
        if (width) {
          th.style.width = width;
        }
      }

      // Check if the resizable column handle should be appended
      if (tableConfiguration.resizable && columnConfig.resizable !== false) {
        const resizeHandle = document.createElement('div');
        resizeHandle.classList.add(TABLE_CONSTANTS.classes.TABLE_RESIZE_HANDLE);
        th.appendChild(resizeHandle);
      }

      // Check if we were provided any inline style declarations and apply to th AND wrapper content div
      if (isDefined(columnConfig.headerCellStyle) && isObject(columnConfig.headerCellStyle)) {
        Object.assign(th.style, columnConfig.headerCellStyle);
        Object.assign(cellContainer.style, columnConfig.headerCellStyle);
      }

      // Add the sort icon if this column is sortable
      if (columnConfig.sortable) {
        th.classList.add(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTABLE);
        const sortOrderElement = document.createElement('span');
        addClass([TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ORDER_HIDDEN, TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ORDER], sortOrderElement);

        const iconElement = document.createElement(ICON_CONSTANTS.elementName) as IIconComponent;
        iconElement.name = TABLE_CONSTANTS.icons.SORT_DOWN;
        addClass([TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ICON], iconElement);
        // Ignore the initial sort when multi column sort is enabled
        if (tableConfiguration.multiColumnSort) {
          if (typeof columnConfig.initialSort === 'object' && columnConfig.initialSort.sortOrder) {
            sortOrderElement.textContent = columnConfig.initialSort.sortOrder.toString();

            if (tableConfiguration.columnConfigurations.filter(c => typeof c.initialSort === 'object').length > 1) {
              removeClass(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ORDER_HIDDEN, sortOrderElement);
            }

            th.classList.add(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_DESCENDING);
            iconElement.classList.add(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ICON_ACTIVE);
            TableUtils._setColumnSortDirection(th, columnConfig.initialSort.direction);
          }
        } else {
          if (tableConfiguration.sortedColumn === i && !setInitialSort && !tableConfiguration.multiColumnSort) {
            th.classList.add(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_DESCENDING);
            iconElement.classList.add(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ICON_ACTIVE);
            TableUtils._setColumnSortDirection(th, tableConfiguration.sortDirection);
            setInitialSort = true;
          }
        }

        cellContainer.appendChild(iconElement);
        cellContainer.appendChild(sortOrderElement);
      }

      if (typeof columnConfig.headerTemplate === 'function') {
        Promise.resolve(columnConfig.headerTemplate(i, cellContainer, columnConfig)).then(element => {
          if (element) {
            const node = document.createElement('div');
            addClass(TABLE_CONSTANTS.classes.TABLE_CELL_CONTAINER, node);
            if (typeof element === 'string') {
              node.innerHTML = element;
            } else {
              TableUtils._prepend(element, node);
            }
            node.setAttribute(TABLE_CONSTANTS.attributes.CUSTOM_CELL_TEMPLATE, '');
            TableUtils._prepend(node, cellContainer);
          }
        });
      } else {
        const span = document.createElement('span');
        span.classList.add(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_TEXT);
        span.textContent = columnConfig.header && typeof columnConfig.header === 'string' ? columnConfig.header.trim() : '';
        if (span.textContent.trim().length === 0) {
          th.setAttribute('aria-hidden', 'true');
        }
        TableUtils._prepend(span, cellContainer);
      }

      th.appendChild(cellContainer);
      tr.appendChild(th);
    }

    return thead;
  }

  /**
   * Sets the sort direction on the table to the provided column.
   * @param tableElement
   * @param columnIndex
   * @param sortDirection
   */
  public static setSortDirection(tableElement: HTMLTableElement, columnIndex: number, sortDirection: SortDirection): void {
    const cell = TableUtils._getHeaderCellByIndex(tableElement, columnIndex);
    tableElement.querySelectorAll('th[aria-sort]').forEach(th => th.removeAttribute('aria-sort'));
    TableUtils._setColumnSortDirection(cell, sortDirection);
  }

  /**
   * Sets the sort direction on the provided table header cell element.
   * @param thElement
   * @param sortDirection
   */
  private static _setColumnSortDirection(thElement: HTMLTableCellElement, sortDirection: SortDirection | undefined): void {
    if (thElement.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_ASCENDING)) {
      thElement.classList.remove(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_ASCENDING);
    }

    if (thElement.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_DESCENDING)) {
      thElement.classList.remove(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_DESCENDING);
    }

    if (!sortDirection || sortDirection === SortDirection.Descending) {
      thElement.setAttribute('aria-sort', 'descending');
      thElement.classList.add(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_DESCENDING);
    } else {
      thElement.setAttribute('aria-sort', 'ascending');
      thElement.classList.add(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_ASCENDING);
    }
  }

  /**
   * Creates the table body section by adding rows/cells for our data/column configuration.
   * @param columnDataMap The column based data map.
   * @param tableElement The table element.
   */
  private static _createTableBody(configuration: ITableConfiguration): HTMLTableSectionElement {
    const tbody = document.createElement('tbody');
    const rowData: any[][] = TableUtils._getOrderedRowData(configuration.columnConfigurations, configuration.data);

    // Create the rows
    rowData.forEach((cellData, rowIndex) => {
      const tr = tbody.insertRow();
      addClass([TABLE_CONSTANTS.classes.TABLE_ROW, TABLE_CONSTANTS.classes.TABLE_BODY_ROW], tr);

      // Create the row data cells
      TableUtils._populateRowCells(configuration, tr, cellData, rowIndex);

      // Check if we need to call the row created callback to give consumers a chance to modify the new row element
      if (typeof configuration.rowCreatedCallback === 'function') {
        configuration.rowCreatedCallback(tr, rowIndex, { ...configuration.data[rowIndex].data });
      }
    });

    return tbody;
  }

  /**
   * Populates a table row element with provided data.
   * @param configuration
   * @param tr
   * @param cellData
   * @param rowIndex
   */
  private static _populateRowCells(configuration: ITableConfiguration, tr: HTMLTableRowElement, cellData: any, rowIndex: number): void {
    for (let i = 0; i < cellData.length; i++) {
      // Find the configuration for this column
      const columnConfig = configuration.columnConfigurations[i];

      // Create the row data cell with required classes
      const td = tr.insertCell();
      addClass([TABLE_CONSTANTS.classes.TABLE_CELL, TABLE_CONSTANTS.classes.TABLE_BODY_CELL], td);

      // Check if width was specified
      if (isDefined(columnConfig.width)) {
        const width = safeCssWidth(columnConfig.width as string | number);
        if (width) {
          td.style.width = width;
        }
      }

      // We wrap the value in a div to allow for flex styling
      const div = document.createElement('div');
      div.classList.add(TABLE_CONSTANTS.classes.TABLE_CELL_CONTAINER);

      // Check if we were provided any inline style declarations and apply to BOTH td and content wrapper div
      if (isDefined(columnConfig.cellStyle) && isObject(columnConfig.cellStyle)) {
        Object.assign(td.style, columnConfig.cellStyle);
        Object.assign(div.style, columnConfig.cellStyle);
      }

      // Add the cell content. If there is a template function, then use that.
      // Otherwise use the property to go get the value from the row data...
      if (columnConfig.template && typeof columnConfig.template === 'function') {
        const rowData = configuration.data[rowIndex] ? configuration.data[rowIndex].data : undefined;
        Promise.resolve(columnConfig.template(rowIndex, div, rowData, i)).then(result => {
          const config = isTemplateResultObject(result)
            ? result
            : ({
                content: result,
                stopClickPropagation: columnConfig.stopCellTemplateClickPropagation
              } as ITableTemplateBuilderResult);

          if (!config.content) {
            return;
          }

          if (typeof config.content === 'string') {
            div.innerHTML = config.content;
          } else {
            div.appendChild(config.content);
          }

          div.setAttribute(TABLE_CONSTANTS.attributes.CUSTOM_CELL_TEMPLATE, '');

          if (config.stopClickPropagation) {
            div.setAttribute(TABLE_CONSTANTS.attributes.CUSTOM_CELL_TEMPLATE_STOP_PROPAGATION, '');
          }
        });
      } else if (columnConfig.property) {
        // Place the text content in a span
        const span = document.createElement('span');
        span.classList.add(TABLE_CONSTANTS.classes.TABLE_CELL_CONTAINER_TEXT);
        div.appendChild(span);

        if (columnConfig.transform && typeof columnConfig.transform === 'function') {
          Promise.resolve(columnConfig.transform(cellData[i])).then(value => (span.textContent = value));
        } else {
          if (cellData[i] == null) {
            span.textContent = '';
          } else {
            span.textContent = cellData[i].toString();
          }
        }
      }

      // Set the cell alignment from config
      if (columnConfig.align) {
        TableUtils._setCellAlignmentClass(div, columnConfig.align);
      }

      td.appendChild(div);

      // Check for column span
      if (isDefined(columnConfig.columnSpan)) {
        if (columnConfig.columnSpan === 'all') {
          td.colSpan = cellData.length - i;
          break;
        } else if (typeof columnConfig.columnSpan === 'number' && columnConfig.columnSpan > 0) {
          let colspan = columnConfig.columnSpan;
          if (columnConfig.columnSpan > cellData.length - i) {
            colspan = cellData.length;
          }
          td.colSpan = colspan;
          i = i + (colspan - 1);
        }
      }

      // Check if we need to call the cell created callback to give consumers a chance to modify the new cell element
      if (typeof configuration.cellCreatedCallback === 'function') {
        configuration.cellCreatedCallback(td, rowIndex, i);
      }
    }
  }

  /**
   * Sets the proper alignment class on the provided element.
   * @param el The element to add the class to.
   * @param align The alignment value.
   */
  private static _setCellAlignmentClass(el: HTMLElement, align: CellAlign): void {
    switch (align) {
      case CellAlign.Center:
        el.classList.add(TABLE_CONSTANTS.classes.TABLE_CELL_CENTER);
        break;
      case CellAlign.Right:
        el.classList.add(TABLE_CONSTANTS.classes.TABLE_CELL_RIGHT);
        break;
    }
  }

  /**
   * Returns all non-expanded rows in a tbody.
   * @param rows All rows in the tbody.
   */
  private static _getNonExpandedRows(rows: HTMLCollectionOf<HTMLTableRowElement>): HTMLTableRowElement[] {
    return Array.from(rows).filter(row => !row.classList.contains(TABLE_CONSTANTS.classes.TABLE_ROW_EXPANDABLE_CONTENT));
  }

  /**
   * Returns all expanded rows in a tbody.
   * @param rows All rows in the tbody.
   */
  private static _getExpandedRows(rows: HTMLCollectionOf<HTMLTableRowElement>): HTMLTableRowElement[] {
    return Array.from(rows).filter(row => row.classList.contains(TABLE_CONSTANTS.classes.TABLE_ROW_EXPANDABLE_CONTENT));
  }

  /**
   * Creates the column data map which organizes the data by column.
   * @param {IColumnConfiguration[]} columnConfigurations The column configurations.
   * @param {IColumnData[]} data The row data.
   */
  private static _createColumnDataMap(columnConfigurations: IColumnConfiguration[], data: TableRow[]): IColumnData[] {
    return columnConfigurations.map(columnConfig => ({
      config: columnConfig,
      data: data.map(item => {
        if (columnConfig.property) {
          const value = getPropertyValue(item.data, columnConfig.property);
          return isDefined(value) ? value : null;
        }
        return null;
      })
    }));
  }

  /**
   * Returns the row data in a column ordered fashion.
   * @param columnConfigurations
   * @param data
   */
  private static _getOrderedRowData(columnConfigurations: IColumnConfiguration[], data: any[]): any[] {
    const columnDataMap = TableUtils._createColumnDataMap(columnConfigurations, data);
    const rowData: any[][] = [];

    for (const columnData of columnDataMap) {
      for (let j = 0; j < columnData.data.length; j++) {
        if (!rowData[j]) {
          rowData[j] = [];
        }
        rowData[j].push(columnData.data[j]);
      }
    }

    return rowData;
  }

  /**
   * Attaches a click listener to each row in the table.
   * @param tbodyElement
   * @param listener
   */
  private static _attachRowClickListeners(
    tbodyElement: HTMLTableSectionElement,
    clickListener: (evt: Event) => void,
    doubleClickListener: ((evt: Event) => void) | null
  ): void {
    const nonExpandedRows = TableUtils._getNonExpandedRows(tbodyElement.rows);
    nonExpandedRows.forEach(row => {
      row.addEventListener('click', clickListener);
      if (doubleClickListener) {
        row.addEventListener('dblclick', doubleClickListener);
      }
    });
  }

  /**
   * Sets attributes for each row in the table.
   * @param tbodyElement
   * @param clickListener
   */
  private static _addRowClickAttributes(tbodyElement: HTMLTableSectionElement): void {
    const nonExpandedRows = TableUtils._getNonExpandedRows(tbodyElement.rows);
    nonExpandedRows.forEach(row => {
      row.classList.add(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_CLICKABLE);
    });
  }

  /**
   * Removes attributes for each row in the table.
   * @param tbodyElement
   * @param clickListener
   */
  private static _removeRowClickAttributes(tbodyElement: HTMLTableSectionElement): void {
    const nonExpandedRows = TableUtils._getNonExpandedRows(tbodyElement.rows);
    nonExpandedRows.forEach(row => {
      row.classList.remove(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_CLICKABLE);
    });
  }

  /**
   * Attaches a click listener to each row checkbox in the table for handling selections.
   * @param tbodyElement
   * @param listener
   */
  private static _attachRowSelectListeners(tbodyElement: HTMLTableSectionElement, clickListener: (evt: Event) => void): void {
    const nonExpandedRows = TableUtils._getNonExpandedRows(tbodyElement.rows);
    nonExpandedRows.forEach(row => TableUtils._attachRowSelectListener(row, clickListener));
  }

  private static _attachRowSelectListener(row: HTMLTableRowElement, listener: (evt: Event) => void): void {
    const checkboxElement = TableUtils._getCheckboxElement(row);
    checkboxElement?.addEventListener('change', listener);
    checkboxElement?.addEventListener('keydown', listener);
    checkboxElement?.addEventListener('pointerdown', listener);
  }

  /**
   * Removes the select listeners from every table row.
   * @param tbodyElement The table body element.
   * @param listener The click listener.
   */
  private static _detachRowSelectListeners(tbodyElement: HTMLTableSectionElement, listener: (evt: Event) => void): void {
    Array.from(tbodyElement.rows).forEach(row => {
      const checkboxElement = TableUtils._getCheckboxElement(row);
      checkboxElement?.removeEventListener('change', listener);
      checkboxElement?.removeEventListener('keydown', listener);
      checkboxElement?.removeEventListener('pointerdown', listener);
    });
  }

  /**
   * Removes the click listeners from every table row.
   * @param tbodyElement The table body element.
   * @param listener The click listener.
   */
  private static _detachRowClickListeners(
    tbodyElement: HTMLTableSectionElement,
    clickListener: (evt: Event) => void,
    doubleClickListener: (evt: Event) => void
  ): void {
    Array.from(tbodyElement.rows).forEach(row => {
      row.removeEventListener('click', clickListener);
      row.removeEventListener('dblclick', doubleClickListener);
    });
  }

  /**
   * Attaches a click listener to the last table header row select all cell.
   */
  private static _attachSelectAllListener(theadElement: HTMLTableSectionElement, listener: (evt: Event) => void): void {
    const lastTheadRow = theadElement.rows[theadElement.rows.length - 1];
    const checkboxElement = TableUtils._getCheckboxElement(lastTheadRow);

    if (!checkboxElement) {
      throw new Error('Checkbox element not found.');
    }

    checkboxElement.addEventListener('change', listener);
  }

  /**
   * Attaches a click listener to the last table header row select all cell.
   */
  private static _tryAttachSelectAllTemplateListener(theadElement: HTMLTableSectionElement, listener: (evt: Event) => void): void {
    const lastTheadRow = theadElement.rows[theadElement.rows.length - 1];
    const checkboxElement = TableUtils._tryGetSelectAllCheckboxElement(lastTheadRow);

    if (checkboxElement) {
      checkboxElement.addEventListener('change', listener);
    }
  }

  /**
   * Removes the select all click listener.
   * @param theadElement The table head element.
   * @param listener The click listener.
   */
  private static _detachSelectAllListener(theadElement: HTMLTableSectionElement, listener: (evt: Event) => void): void {
    const lastTheadRow = theadElement.rows[theadElement.rows.length - 1];
    const checkboxElement = TableUtils._tryGetSelectAllCheckboxElement(lastTheadRow);

    if (!checkboxElement) {
      return;
    }

    checkboxElement.removeEventListener('change', listener);
  }

  /**
   * Attaches a click listener to the first row of the table header to handle mouse events.
   * @param theadElement
   * @param listener
   */
  private static _attachHeadRowMouseDownListener(theadElement: HTMLTableSectionElement, listener: (evt: Event) => void): void {
    const firstRow = theadElement.rows[0];

    if (!firstRow) {
      throw new Error('Missing table header row. Unable to attach sort listener.');
    }

    firstRow.addEventListener('mousedown', listener);
  }

  /**
   * Attaches a click listener to the first row of the table header to handle context menu events.
   * @param theadElement
   * @param listener
   */
  private static _attachHeadRowContextMenuListener(theadElement: HTMLTableSectionElement, listener: (evt: Event) => void): void {
    const firstRow = theadElement.rows[0];

    if (!firstRow) {
      throw new Error('Missing table header row. Unable to attach sort listener.');
    }

    firstRow.addEventListener('contextmenu', listener);
  }

  /**
   * Creates the select column as the first column in the table.
   * @param theadElement
   * @param tbodyElement
   */
  private static _createSelectColumn(
    theadElement: HTMLTableSectionElement,
    tbodyElement: HTMLTableSectionElement,
    showSelectAll: boolean,
    selectAllTemplate: TableHeaderSelectAllTemplate | null,
    registerListener: () => void,
    selectCheckboxAlignment: CellAlign | null,
    data: TableRow[],
    tooltipSelect: string | TableSelectTooltipCallback | null,
    tooltipSelectAll: string | null
  ): void {
    if (theadElement) {
      TableUtils._createHeadSelectColumn(theadElement, showSelectAll, selectAllTemplate, registerListener, selectCheckboxAlignment, tooltipSelectAll);
    }

    if (tbodyElement) {
      TableUtils._createBodySelectColumn(tbodyElement, selectCheckboxAlignment, data, tooltipSelect, tooltipSelectAll);
    }
  }

  /**
   * Creates the select column in the table head.
   * @param {HTMLTableSectionElement} theadElement The table head element.
   * @param {boolean} showSelectAll Whether to show the select all checkbox or not.
   */
  private static _createHeadSelectColumn(
    theadElement: HTMLTableSectionElement,
    showSelectAll: boolean,
    selectAllTemplate: TableHeaderSelectAllTemplate | null,
    registerListener: () => void,
    selectCheckboxAlignment: CellAlign | null,
    tooltipSelectAll: string | null
  ): void {
    Array.from(theadElement.rows).forEach(row => {
      const th = document.createElement('th');
      addClass([TABLE_CONSTANTS.classes.TABLE_CELL, TABLE_CONSTANTS.classes.TABLE_HEAD_CELL], th);
      row.insertBefore(th, row.cells.item(0));
    });

    if (showSelectAll) {
      const lastRowFirstCell = theadElement.rows.item(theadElement.rows.length - 1)?.cells.item(0) as HTMLTableHeaderCellElement;
      lastRowFirstCell.classList.add(TABLE_CONSTANTS.classes.TABLE_CELL_SELECT);

      if (typeof selectAllTemplate === 'function') {
        TableUtils._renderSelectAllTemplate(selectAllTemplate, theadElement).then(() => {
          if (typeof registerListener === 'function') {
            registerListener();
          }
        });
      } else {
        lastRowFirstCell?.appendChild(TableUtils._createCheckboxElement(true, selectCheckboxAlignment, null, null, null, tooltipSelectAll));
      }
    }
  }

  /**
   * Creates the select column in the table body.
   * @param {HTMLTableSectionElement} tbodyElement The table body element.
   */
  private static _createBodySelectColumn(
    tbodyElement: HTMLTableSectionElement,
    selectCheckboxAlignment: CellAlign | null,
    data: TableRow[],
    tooltipSelect: string | TableSelectTooltipCallback | null,
    tooltipSelectAll: string | null
  ): void {
    const nonExpandedRows = TableUtils._getNonExpandedRows(tbodyElement.rows);
    nonExpandedRows.forEach((row, rowIndex) =>
      TableUtils._addRowSelectColumn(row, selectCheckboxAlignment, rowIndex, data[rowIndex], tooltipSelect, tooltipSelectAll)
    );

    // Update the colspan on the expanded rows
    if (tbodyElement.rows.length) {
      const firstRow = tbodyElement.rows.item(0);
      if (firstRow) {
        TableUtils._updateExpandedRowColspan(tbodyElement.rows, firstRow.cells.length);
      }
    }
  }

  private static _addRowSelectColumn(
    row: HTMLTableRowElement,
    selectCheckboxAlignment: CellAlign | null,
    rowIndex: number,
    rowData: TableRow,
    tooltipSelect: string | TableSelectTooltipCallback | null,
    tooltipSelectAll: string | null
  ): void {
    const td = row.insertCell(0);
    addClass([TABLE_CONSTANTS.classes.TABLE_CELL, TABLE_CONSTANTS.classes.TABLE_BODY_CELL, TABLE_CONSTANTS.classes.TABLE_CELL_SELECT], td);

    td.appendChild(TableUtils._createCheckboxElement(false, selectCheckboxAlignment, rowIndex, rowData, tooltipSelect, tooltipSelectAll));
  }

  /**
   * Removes the first cell (select cell) in every row in the table head and table body elements.
   * @param {HTMLTableSectionElement} theadElement The table head element.
   * @param {HTMLTableSectionElement} tbodyElement The table body element.
   */
  private static _destroySelectColumn(theadElement: HTMLTableSectionElement, tbodyElement: HTMLTableSectionElement): void {
    const nonExpandedRows = TableUtils._getNonExpandedRows(tbodyElement.rows);
    Array.from(theadElement.rows).forEach(row => row.removeChild(row.cells.item(0) as HTMLTableHeaderCellElement));
    Array.from(nonExpandedRows).forEach(row => row.removeChild(row.cells.item(0) as HTMLTableHeaderCellElement));

    // Update the colspan on the expanded rows
    if (tbodyElement.rows.length) {
      const firstRow = tbodyElement.rows.item(0);
      if (firstRow) {
        TableUtils._updateExpandedRowColspan(tbodyElement.rows, firstRow.cells.length);
      }
    }
  }

  /**
   * Determines if the table has the select column being rendered currently.
   */
  private static _hasSelectColumn(theadElement: HTMLTableSectionElement, tbodyElement: HTMLTableSectionElement): boolean {
    const tableRows = [...Array.from(theadElement.rows), ...Array.from(tbodyElement.rows)];
    return tableRows.some(row => {
      const firstCell = row.cells.item(0) as HTMLTableCellElement;
      return firstCell.classList.contains(TABLE_CONSTANTS.classes.TABLE_CELL_SELECT);
    });
  }

  /**
   * Creates a checkbox element for the select column.
   */
  private static _createCheckboxElement(
    isHeader: boolean,
    alignment: CellAlign | null,
    rowIndex: number | null,
    rowData: TableRow | null,
    tooltipSelect: string | TableSelectTooltipCallback | null,
    tooltipSelectAll: string | null
  ): HTMLElement {
    const checkboxContainer = document.createElement('div');
    checkboxContainer.classList.add(TABLE_CONSTANTS.classes.TABLE_CELL_SELECT_CHECKBOX_CONTAINER);
    if (alignment) {
      switch (alignment) {
        case CellAlign.Center:
          checkboxContainer.classList.add(TABLE_CONSTANTS.classes.TABLE_CELL_SELECT_CHECKBOX_CONTAINER_ALIGN_CENTER);
          break;
        case CellAlign.Left:
          checkboxContainer.classList.add(TABLE_CONSTANTS.classes.TABLE_CELL_SELECT_CHECKBOX_CONTAINER_ALIGN_LEFT);
          break;
        case CellAlign.Right:
          checkboxContainer.classList.add(TABLE_CONSTANTS.classes.TABLE_CELL_SELECT_CHECKBOX_CONTAINER_ALIGN_RIGHT);
          break;
      }
    }

    const checkboxElement = document.createElement(CHECKBOX_CONSTANTS.elementName) as ICheckboxComponent;
    checkboxElement.setAttribute(TABLE_CONSTANTS.attributes.SELECT_CHECKBOX, '');
    checkboxContainer.appendChild(checkboxElement);

    const tooltipFactory = (text: string): ITooltipComponent => {
      const tooltipEl = document.createElement('forge-tooltip');
      tooltipEl.placement = 'left';
      tooltipEl.type = 'label';
      tooltipEl.textContent = text;
      return tooltipEl;
    };

    if (isHeader) {
      const hasTooltipText = typeof tooltipSelectAll === 'string' && tooltipSelectAll.length;
      if (hasTooltipText) {
        const headerTooltipEl = tooltipFactory(tooltipSelectAll);
        checkboxContainer.appendChild(headerTooltipEl);
      } else {
        checkboxElement.setAttribute('aria-label', 'Select all rows');
      }
    } else {
      let tooltipText = tooltipSelect ? tooltipSelect : '';
      if (rowData && typeof tooltipSelect === 'function') {
        tooltipText = tooltipSelect.call(null, rowIndex, rowData.data);
      }

      if (typeof tooltipText === 'string' && tooltipText.length) {
        const rowTooltipEl = tooltipFactory(tooltipText);
        checkboxContainer.appendChild(rowTooltipEl);
      } else {
        checkboxElement.setAttribute('aria-label', 'Select row');
      }
    }

    return checkboxContainer;
  }

  /**
   * Retrieves the checkbox element from the given table row. Used in select mode only.
   * @param rowElement
   */
  private static _getCheckboxElement(rowElement: HTMLTableRowElement): HTMLInputElement | null {
    const selectCell = rowElement.querySelector(`.${TABLE_CONSTANTS.classes.TABLE_CELL_SELECT}`);
    if (!selectCell) {
      return null;
    }
    return selectCell.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLInputElement;
  }

  /**
   * Retrieves the select all checkbox element from the given table row. Used in select mode only.
   * @param rowElement
   */
  private static _tryGetSelectAllCheckboxElement(rowElement: HTMLTableRowElement): HTMLInputElement | null {
    const selectAllCell = rowElement.querySelector(`.${TABLE_CONSTANTS.classes.TABLE_CELL_SELECT}`);
    if (!selectAllCell) {
      return null;
    }
    return (
      (selectAllCell.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLInputElement) ||
      (selectAllCell.querySelector(TABLE_CONSTANTS.selectors.SELECT_ALL_TEMPLATE_CHECKBOX_INPUT) as HTMLInputElement)
    );
  }

  /**
   * Sets the checked state of the select checkbox.
   * @param checkboxElement
   * @param isSelected
   */
  private static _setSelectedCheckboxState(checkboxElement: HTMLInputElement, isSelected: boolean): void {
    if (checkboxElement) {
      checkboxElement.checked = isSelected;
    }
  }

  /**
   * Sets the indeterminate state of the select checkbox.
   * @param checkboxElement
   * @param isIndeterminate
   */
  private static _setIndeterminateCheckboxState(checkboxElement: HTMLInputElement, isIndeterminate: boolean): void {
    if (checkboxElement) {
      checkboxElement.indeterminate = isIndeterminate;
    }
  }

  /**
   * Updates the selected state on the provided table row element.
   * @param rowElement
   * @param isSelected
   */
  private static _setRowSelectedState(rowElement: HTMLTableRowElement, isSelected: boolean): void {
    if (isSelected) {
      if (!rowElement.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)) {
        rowElement.classList.add(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED);
      }
    } else {
      rowElement.classList.remove(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED);
    }
  }

  /**
   * Resets the colspan on all expanded rows to the proper value.
   */
  private static _updateExpandedRowColspan(rows: HTMLCollectionOf<HTMLTableRowElement>, cellCount: number): void {
    const expandedRows = TableUtils._getExpandedRows(rows);
    expandedRows.forEach(row => {
      const cell = row.cells.item(0);
      if (cell) {
        cell.colSpan = cellCount;
      }
    });
  }

  /**
   * Updates the state of a table row element to be selected or not.
   * @param {HTMLTableRowElement} rowElement The row element.
   * @param {boolean} isSelected Whether the row is selected or not.
   */
  public static updateSelectedState(rowElement: HTMLTableRowElement, isSelected: boolean): void {
    TableUtils._setRowSelectedState(rowElement, isSelected);
    const selectCheckbox = TableUtils._getCheckboxElement(rowElement);
    if (selectCheckbox) {
      TableUtils._setSelectedCheckboxState(selectCheckbox, isSelected);
    }
  }

  /**
   * Get a row from the first table body by index.
   */
  public static getRowByIndex(tableElement: HTMLTableElement, index: number): HTMLTableRowElement {
    return TableUtils._getNonExpandedRows(tableElement.tBodies[0].rows)[index] as HTMLTableRowElement;
  }

  /**
   * Updates the state of the select all checkbox.
   * @param {HTMLTableElement} tableElement The table element.
   * @param {boolean} isAllSelected Whether the checkboxes should be checked or not.
   */
  public static updateSelectAllState(tableElement: HTMLTableElement, isAllSelected: boolean, isIndeterminate?: boolean): void {
    if (!tableElement.tHead) {
      return;
    }

    const lastTheadRow = tableElement.tHead.rows[tableElement.tHead.rows.length - 1];
    const selectAllCheckboxElement = TableUtils._tryGetSelectAllCheckboxElement(lastTheadRow);

    if (selectAllCheckboxElement) {
      TableUtils._setSelectedCheckboxState(selectAllCheckboxElement, isAllSelected);
      TableUtils._setIndeterminateCheckboxState(selectAllCheckboxElement, !!isIndeterminate);
    }
  }

  /**
   * Sets the selected rows in the table.
   * @param tableElement
   * @param key
   * @param data
   * @param selectedRows
   * @param preserveExisting
   */
  public static setSelectedRows(tableElement: HTMLTableElement, key: string[], data: any[], selectedRows: any[], preserveExisting: boolean = false): void {
    if (!tableElement.tBodies.length) {
      return;
    }

    if (!preserveExisting) {
      TableUtils.clearSelectedRows(tableElement);
    }

    const rows = tableElement.tBodies[0].rows;
    let selectedRowCount = 0;

    if (selectedRows.length) {
      Array.from(rows).forEach((row, index) => {
        const rowData = data[index];
        const existingSelection = findWhere(selectedRows, createPredicate(key, rowData));
        if (existingSelection) {
          TableUtils._setRowSelectedState(row, true);
          const selectCheckbox = TableUtils._getCheckboxElement(row);
          if (selectCheckbox) {
            TableUtils._setSelectedCheckboxState(selectCheckbox, true);
          }
          selectedRowCount++;
        }
      });
    }

    TableUtils.updateSelectAllState(tableElement, selectedRowCount > 0 && rows.length === selectedRowCount);
  }

  /**
   * Clears all selected rows in the table.
   * @param tableElement
   */
  public static clearSelectedRows(tableElement: HTMLTableElement): void {
    if (!tableElement.tBodies.length) {
      return;
    }
    const nonExpandedRows = TableUtils._getNonExpandedRows(tableElement.tBodies[0].rows);
    nonExpandedRows.forEach(row => {
      TableUtils._setRowSelectedState(row, false);
      const selectCheckbox = TableUtils._getCheckboxElement(row);
      if (selectCheckbox) {
        TableUtils._setSelectedCheckboxState(selectCheckbox, false);
      }
    });
  }

  /**
   * Sets the sorted column in the table.
   * @param tableElement
   * @param columnIndex
   * @param sortDirection
   */
  public static setSortedColumn(tableElement: HTMLTableElement, columnIndex: number, sortDirection: SortDirection): void {
    const cell = TableUtils._getHeaderCellByIndex(tableElement, columnIndex);

    // Set the active class on the icon
    const iconElement = TableUtils._getSortIconElementFromHeaderCell(cell);
    iconElement.classList.add(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ICON_ACTIVE);

    // Set the sort direction on the header cell
    TableUtils._setColumnSortDirection(cell, sortDirection);
  }

  /**
   * Sets the sorted column in the table.
   * @param tableElement
   * @param columnIndex
   * @param sortOrder
   */
  public static setMultiSortColumnSortNumber(
    tableElement: HTMLTableElement,
    hasMultipleColumnsSorted: boolean,
    columnIndex: number,
    sortOrder: number | null
  ): void {
    const cell = TableUtils._getHeaderCellByIndex(tableElement, columnIndex);

    const cellContainer = cell.querySelector(`.${TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_CONTAINER}`) as HTMLElement;
    const sortOrderElement = cellContainer.querySelector(`.${TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ORDER}`) as HTMLElement;

    if (sortOrderElement) {
      toggleClass(sortOrderElement, typeof sortOrder !== 'number' || !hasMultipleColumnsSorted, TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ORDER_HIDDEN);
      if (sortOrder) {
        sortOrderElement.textContent = sortOrder.toString();
      }
    }
  }

  /**
   * Removes the sorted column in the table.
   * @param tableElement
   * @param columnIndex
   */
  public static removeColumnSort(tableElement: HTMLTableElement, columnIndex: number): void {
    const cell = TableUtils._getHeaderCellByIndex(tableElement, columnIndex);

    cell.removeAttribute('aria-sort');

    // Remove any existing sort direction classes from the existing th element
    if (cell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_ASCENDING)) {
      cell.classList.remove(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_ASCENDING);
    }
    if (cell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_DESCENDING)) {
      cell.classList.remove(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_DESCENDING);
    }

    // Remove the active class from the existing active sorted icon element
    const existingIconElement = TableUtils._getSortIconElementFromHeaderCell(cell);
    if (existingIconElement && existingIconElement.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ICON_ACTIVE)) {
      existingIconElement.classList.remove(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ICON_ACTIVE);
    }
  }

  /**
   * Retrieves a header cell from the table based on index.
   * @param {HTMLTableElement} tableElement The table element.
   * @param {number} index The column index.
   */
  private static _getHeaderCellByIndex(tableElement: HTMLTableElement, index: number): HTMLTableHeaderCellElement {
    if (!tableElement.tHead) {
      throw new Error('Table head element cannot be null.');
    }

    const headerRow = tableElement.tHead.rows.item(0) as HTMLTableRowElement;
    return headerRow.cells.item(index) as HTMLTableHeaderCellElement;
  }

  /**
   * Gets the sort icon element from the table cell that contains the select all checkbox.
   * @param {HTMLTableHeaderCellElement} cell The table header cell element.
   */
  private static _getSortIconElementFromHeaderCell(cell: HTMLTableHeaderCellElement): HTMLElement {
    return cell.querySelector(`.${TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ICON}`) as HTMLElement;
  }

  /**
   * Adds/removes the select column on the table.
   */
  public static setSelectColumnVisibility(
    tableElement: HTMLTableElement,
    isVisible: boolean,
    selectListener: ((evt: Event) => void) | null,
    selectAllListener: ((evt: Event) => void) | null,
    selectAllTemplate: TableHeaderSelectAllTemplate | null,
    selectCheckboxAlignment: CellAlign | null,
    data: TableRow[],
    tooltipSelect: string | TableSelectTooltipCallback | null,
    tooltipSelectAll: string | null
  ): void {
    const theadElement = tableElement.tHead;
    const tbodyElement = tableElement.tBodies[0];

    if (!theadElement || !tbodyElement) {
      return;
    }

    if (isVisible) {
      TableUtils._addSelectColumn(
        theadElement,
        tbodyElement,
        selectListener,
        selectAllListener,
        selectAllTemplate,
        selectCheckboxAlignment,
        data,
        tooltipSelect,
        tooltipSelectAll
      );
    } else if (TableUtils._hasSelectColumn(theadElement, tbodyElement)) {
      if (selectListener) {
        TableUtils._detachRowSelectListeners(tbodyElement, selectListener);
      }

      if (selectAllListener) {
        TableUtils._detachSelectAllListener(theadElement, selectAllListener);
      }

      TableUtils._destroySelectColumn(theadElement, tbodyElement);
    }
  }

  /**
   * Adds the select column to the thead/tbody elements and attaches the provided click listeners.
   * @param theadElement The table head element.
   * @param tbodyElement The table body element.
   * @param selectListener The row select listener.
   * @param selectAllListener The select all checkbox listener.
   */
  private static _addSelectColumn(
    theadElement: HTMLTableSectionElement,
    tbodyElement: HTMLTableSectionElement,
    selectListener: ((evt: Event) => void) | null,
    selectAllListener: ((evt: Event) => void) | null,
    selectAllTemplate: TableHeaderSelectAllTemplate | null,
    selectCheckboxAlignment: CellAlign | null,
    data: TableRow[],
    tooltipSelect: string | TableSelectTooltipCallback | null,
    tooltipSelectAll: string | null
  ): void {
    TableUtils._createSelectColumn(
      theadElement,
      tbodyElement,
      !!selectAllListener,
      selectAllTemplate,
      () => {
        if (selectAllListener) {
          TableUtils._tryAttachSelectAllTemplateListener(theadElement, selectAllListener);
        }
      },
      selectCheckboxAlignment,
      data,
      tooltipSelect,
      tooltipSelectAll
    );

    if (selectListener) {
      TableUtils._attachRowSelectListeners(tbodyElement, selectListener);
    }

    if (selectAllListener && !selectAllTemplate) {
      TableUtils._tryAttachSelectAllTemplateListener(theadElement, selectAllListener);
    }
  }

  /**
   * Adds/removes the dense class on the table.
   */
  public static setDenseState(tableElement: HTMLTableElement, isDense: boolean): void {
    if (tableElement.classList.contains(TABLE_CONSTANTS.classes.TABLE_DENSE)) {
      tableElement.classList.remove(TABLE_CONSTANTS.classes.TABLE_DENSE);
    }
    if (isDense) {
      tableElement.classList.add(TABLE_CONSTANTS.classes.TABLE_DENSE);
    }
  }

  /**
   * Adds/removes the roomy class on the table.
   */
  public static setRoomyState(tableElement: HTMLTableElement, isRoomy: boolean): void {
    if (tableElement.classList.contains(TABLE_CONSTANTS.classes.TABLE_ROOMY)) {
      tableElement.classList.remove(TABLE_CONSTANTS.classes.TABLE_ROOMY);
    }
    if (isRoomy) {
      tableElement.classList.add(TABLE_CONSTANTS.classes.TABLE_ROOMY);
    }
  }

  public static setResizable(configuration: ITableConfiguration): void {
    const thead = configuration.tableElement.tHead;
    if (configuration.resizable) {
      configuration.tableElement.classList.add(TABLE_CONSTANTS.classes.TABLE_RESIZABLE);
      TableUtils._addResizeHandles(thead, configuration);
    } else {
      configuration.tableElement.classList.remove(TABLE_CONSTANTS.classes.TABLE_RESIZABLE);
      TableUtils._removeResizeHandles(thead, configuration);
    }
  }

  private static _addResizeHandles(thead: HTMLTableSectionElement | null, configuration: ITableConfiguration): void {
    if (!thead) {
      return;
    }

    const firstRow = thead.rows.item(0);
    if (firstRow) {
      let cells = Array.from(firstRow.cells);

      // If the select column is on, we need to skip the first cell
      if (configuration.selectListener) {
        cells = cells.slice(1);
      }

      for (const cell of cells) {
        const index = cells.indexOf(cell);
        const columnConfig = configuration.columnConfigurations[index];
        if (columnConfig.resizable !== false) {
          const resizeHandle = document.createElement('div');
          resizeHandle.classList.add(TABLE_CONSTANTS.classes.TABLE_RESIZE_HANDLE);
          cell.appendChild(resizeHandle);
        }
      }
    }
  }

  private static _removeResizeHandles(thead: HTMLTableSectionElement | null, configuration: ITableConfiguration): void {
    if (!thead) {
      return;
    }
    const firstRow = thead.rows.item(0);
    if (firstRow) {
      let cells = Array.from(firstRow.cells);
      // If the select column is on, we need to skip the first cell
      if (configuration.selectListener) {
        cells = cells.slice(1);
      }
      for (const cell of cells) {
        const resizeHandle = document.querySelector(`.${TABLE_CONSTANTS.classes.TABLE_RESIZE_HANDLE}`);
        if (resizeHandle) {
          cell.removeChild(resizeHandle);
        }
      }
    }
  }

  /**
   * Adds/removes the wrap class on the table.
   */
  public static setWrapContentState(tableElement: HTMLTableElement, wrapContent: boolean): void {
    if (wrapContent) {
      tableElement.classList.remove(TABLE_CONSTANTS.classes.TABLE_NO_WRAP_CONTENT);
    } else {
      tableElement.classList.add(TABLE_CONSTANTS.classes.TABLE_NO_WRAP_CONTENT);
    }
  }

  /**
   *
   * @param {HTMLTableElement} tableElement The table element.
   * @param {boolean} isVisible Whether the select all option is visible or not.
   */
  public static setSelectAllVisibility(
    tableElement: HTMLTableElement,
    isVisible: boolean,
    listener: ((evt: Event) => void) | null,
    selectAllTemplate: TableHeaderSelectAllTemplate | null,
    selectCheckboxAlignment: CellAlign | null,
    tooltipSelectAll: string | null
  ): void {
    const theadElement = tableElement.tHead;

    if (!theadElement) {
      return;
    }

    if (!isVisible && listener) {
      TableUtils._detachSelectAllListener(theadElement, listener);
    }

    const lastTheadRow = theadElement.rows[theadElement.rows.length - 1];
    const selectAllCell = lastTheadRow.cells.item(0) as HTMLTableHeaderCellElement;

    if (isVisible) {
      // Only add the checkbox if it doesn't already exist
      if (!selectAllCell.childElementCount) {
        selectAllCell.classList.add(TABLE_CONSTANTS.classes.TABLE_CELL_SELECT);

        if (selectAllTemplate) {
          TableUtils._renderSelectAllTemplate(selectAllTemplate, theadElement).then(() => {
            if (listener) {
              TableUtils._tryAttachSelectAllTemplateListener(theadElement, listener);
            }
          });
        } else {
          selectAllCell.appendChild(TableUtils._createCheckboxElement(true, selectCheckboxAlignment || null, null, null, null, tooltipSelectAll));
        }

        if (listener && !selectAllTemplate) {
          TableUtils._attachSelectAllListener(theadElement, listener);
        }
      }
    } else {
      if (listener) {
        TableUtils._detachSelectAllListener(theadElement, listener);
      }
      removeAllChildren(selectAllCell);
    }
  }

  /**
   * Controls the visibility of the table filter row.
   * @param {ITableConfiguration} configuration The table configuration.
   */
  public static setFilterRow(configuration: ITableConfiguration): void {
    if (!configuration.tableElement.tHead) {
      return;
    }

    const filterRowElement = TableUtils._getFilterRowElement(configuration.tableElement.tHead);
    let selectAllCell: HTMLTableCellElement | undefined;

    // Toggle the filter visible class on the table element to control styles of rows/cells
    if (configuration.filter) {
      configuration.tableElement.classList.add(TABLE_CONSTANTS.classes.TABLE_FILTER_VISIBLE);
    } else {
      configuration.tableElement.classList.remove(TABLE_CONSTANTS.classes.TABLE_FILTER_VISIBLE);
    }

    if (configuration.filter && !filterRowElement) {
      // We can stop here if there are no filterable columns
      if (configuration.columnConfigurations.every(cc => !cc.filter)) {
        return;
      }

      // Gets the select all cell contents so it can be moved to the new filter row after creating the row element
      if (configuration.selectListener && configuration.selectAllListener) {
        const lastTheadRow = configuration.tableElement.tHead.rows[configuration.tableElement.tHead.rows.length - 1];
        selectAllCell = lastTheadRow.cells.item(0) as HTMLTableHeaderCellElement;
      }

      const rowElement = TableUtils._createFilterRowElement(configuration);

      // Move the select all cell to the new filter row
      if (rowElement && selectAllCell) {
        Array.from(selectAllCell.children).forEach(child => {
          rowElement.cells.item(0)?.appendChild(child);
        });
      }
    } else if (!configuration.filter && filterRowElement) {
      // Move the select all cell to the previous row
      if (configuration.selectListener && configuration.selectAllListener) {
        selectAllCell = filterRowElement.cells.item(0) as HTMLTableHeaderCellElement;

        const previousRowElementIndex = Array.from(configuration.tableElement.tHead.rows).indexOf(filterRowElement) - 1;
        const previousRowElement = configuration.tableElement.tHead.rows.item(previousRowElementIndex);

        if (previousRowElement) {
          Array.from(selectAllCell.children).forEach(child => {
            previousRowElement.cells.item(0)?.appendChild(child);
          });
        }
      }

      removeElement(filterRowElement);
    }
  }

  /**
   * Creates the table filter row element.
   * @param {ITableConfiguration} configuration The table configuration.
   */
  private static _createFilterRowElement(configuration: ITableConfiguration): HTMLTableRowElement {
    if (!configuration.tableElement.tHead) {
      throw new Error('Table head element cannot be null.');
    }

    const filterRow = configuration.tableElement.tHead.insertRow();
    addClass([TABLE_CONSTANTS.classes.TABLE_ROW, TABLE_CONSTANTS.classes.TABLE_HEAD_ROW_FILTER], filterRow);

    if (configuration.selectListener) {
      const th = document.createElement('th');
      addClass([TABLE_CONSTANTS.classes.TABLE_CELL, TABLE_CONSTANTS.classes.TABLE_HEAD_CELL], th);

      filterRow.insertBefore(th, filterRow.cells[0]);
      th.classList.add(TABLE_CONSTANTS.classes.TABLE_CELL_SELECT);
    }

    configuration.columnConfigurations.forEach((columnConfig, columnIndex) => {
      const th = document.createElement('th');
      addClass([TABLE_CONSTANTS.classes.TABLE_CELL, TABLE_CONSTANTS.classes.TABLE_HEAD_CELL], th);

      if (columnConfig.filter && isDefined(columnConfig.filterDelegate)) {
        const container = document.createElement('div');
        container.classList.add(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_CONTAINER);

        if (columnConfig.align) {
          TableUtils._setCellAlignmentClass(container, columnConfig.align);
        }

        const element = TableUtils._createFilterElement(columnConfig, columnIndex, configuration.filterListener as TableFilterListener);
        container.appendChild(element);
        th.appendChild(container);
      }

      filterRow.appendChild(th);
    });

    return filterRow;
  }

  /**
   * Creates the element that will be used as the filter for this column.
   * @param {IColumnConfiguration} columnConfig The column configuration.
   */
  private static _createFilterElement(columnConfig: IColumnConfiguration, columnIndex: number, filterListener: TableFilterListener): HTMLElement {
    let delegate: IFormFieldComponentDelegate<any> | IBaseComponentDelegate<HTMLElement>;

    if (isFunction(columnConfig.filterDelegate)) {
      delegate = (columnConfig.filterDelegate as TableFilterDelegateFactory)();
    } else if (columnConfig.filterDelegate instanceof FormFieldComponentDelegate || columnConfig.filterDelegate instanceof BaseComponentDelegate) {
      delegate = columnConfig.filterDelegate;
    } else {
      throw new Error('Invalid filter delegate.');
    }

    // If this is a FormFieldComponentDelegate then we can listen for when the value changes, otherwise we just render the custom delegate element
    if (!!filterListener && delegate instanceof FormFieldComponentDelegate && isFunction(delegate.onChange)) {
      if (!isDefined(columnConfig.filterDebounceTime) || isNumber(columnConfig.filterDebounceTime)) {
        const debounceTime = isDefined(columnConfig.filterDebounceTime)
          ? (columnConfig.filterDebounceTime as number)
          : TABLE_CONSTANTS.numbers.DEFAULT_FILTER_DEBOUNCE_TIME;
        delegate.onChange(debounce((value: any) => filterListener(value, columnIndex), debounceTime));
      } else {
        delegate.onChange((value: any) => filterListener(value, columnIndex));
      }
    }

    return delegate.element;
  }

  /**
   * Gets the filter row from the table head element rows, or undefined if not found.
   * @param {HTMLTableRowElement | undefined} tHeadElement The thead element.
   */
  private static _getFilterRowElement(tHeadElement: HTMLTableSectionElement | null): HTMLTableRowElement | undefined {
    if (!tHeadElement) {
      return;
    }
    return Array.from(tHeadElement.rows).find(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_ROW_FILTER));
  }

  /**
   * Expands a row by inserting a new row beneath it and displaying the provided template content.
   * @param configuration The table configuration.
   * @param rowIndex The index of the row to expand.
   * @param template The template for the expanded row content.
   */
  public static async expandRow(configuration: ITableConfiguration, rowIndex: number, template: TableViewTemplate): Promise<void> {
    const tbody = configuration.tableElement.tBodies[0];
    const nonExpandedRows = TableUtils._getNonExpandedRows(tbody.rows);
    const requestedRow = nonExpandedRows[rowIndex];
    requestedRow.classList.add(TABLE_CONSTANTS.classes.TABLE_ROW_EXPANDED);

    const actualRowIndex = Array.from(tbody.rows).indexOf(requestedRow);
    const expandedRow = tbody.insertRow(actualRowIndex + 1);
    addClass([TABLE_CONSTANTS.classes.TABLE_ROW, TABLE_CONSTANTS.classes.TABLE_BODY_ROW, TABLE_CONSTANTS.classes.TABLE_ROW_EXPANDABLE_CONTENT], expandedRow);

    const td = expandedRow.insertCell();
    td.setAttribute('colspan', requestedRow.cells.length.toString());
    td.classList.add(TABLE_CONSTANTS.classes.TABLE_ROW_EXPANDABLE_CONTENT_CELL);

    const contentDiv = document.createElement('div');

    const expansionPanel = document.createElement(EXPANSION_PANEL_CONSTANTS.elementName) as IExpansionPanelComponent;
    expansionPanel.appendChild(contentDiv);
    td.appendChild(expansionPanel);

    let content = template as string | HTMLElement | undefined;

    if (isFunction(template)) {
      const rowData = configuration.data[rowIndex] ? configuration.data[rowIndex].data : undefined;
      const templateValue = (template as TableViewTemplateBuilder)(rowIndex, contentDiv, rowData);
      try {
        const result = await Promise.resolve(templateValue);
        content = isTemplateResultObject(result) ? result.content : result;
      } catch (e) {
        console.error('Failed to load row template ' + e.message);
        content = '';
      }
    }

    if (content) {
      TableUtils._setRowTemplate(contentDiv, content);
    }

    window.requestAnimationFrame(() => (expansionPanel.open = true));
  }

  /**
   * Sets the template content in the table row element.
   * @param {HTMLElement} element The element to the append the template to.
   * @param {string | HTMLElement} template The template content.
   */
  private static _setRowTemplate(element: HTMLElement, template: string | HTMLElement): void {
    if (isString(template)) {
      element.innerHTML = template as string;
    } else {
      element.appendChild(template as HTMLElement);
    }
  }

  /**
   * Collapses an expanded table row.
   * @param configuration The table configuration.
   * @param rowIndex The index of the row to collapse.
   */
  public static collapseRow(configuration: ITableConfiguration, rowIndex: number): Promise<void> {
    if (!configuration.tableElement || !configuration.tableElement.tBodies.length || !configuration.tableElement.tBodies[0].rows.length) {
      return Promise.resolve();
    }

    const tbody = configuration.tableElement.tBodies[0];
    const nonExpandedRows = TableUtils._getNonExpandedRows(tbody.rows);
    const requestedRow = nonExpandedRows[rowIndex];
    const actualRowIndex = Array.from(tbody.rows).indexOf(requestedRow);

    if (requestedRow && requestedRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_ROW_EXPANDED)) {
      const expandableRow = tbody.rows[actualRowIndex + 1];
      const expansionPanel = expandableRow.querySelector(EXPANSION_PANEL_CONSTANTS.elementName) as IExpansionPanelComponent;
      if (expansionPanel && expansionPanel.open) {
        const promise = new Promise<void>(resolve => {
          expansionPanel.addEventListener(
            EXPANSION_PANEL_CONSTANTS.events.ANIMATION_COMPLETE,
            () => {
              requestedRow.classList.remove(TABLE_CONSTANTS.classes.TABLE_ROW_EXPANDED);
              removeElement(expandableRow);
              resolve();
            },
            { once: true }
          );
        });
        expansionPanel.open = false;
        return promise;
      }
    }

    return Promise.resolve();
  }

  /**
   * Checks if a row is expanded or not.
   * @param configuration The table configuration.
   * @param rowIndex The row index.
   * @returns {boolean}
   */
  public static isRowExpanded(configuration: ITableConfiguration, rowIndex: number): boolean {
    const tbody = configuration.tableElement.tBodies[0];
    const nonExpandedRows = TableUtils._getNonExpandedRows(tbody.rows);
    const requestedRow = nonExpandedRows[rowIndex];
    return requestedRow && requestedRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_ROW_EXPANDED);
  }

  /**
   * Sets the fixed class on the table element based on whether fixed headers were requested or not.
   * @param configuration The table configuration.
   */
  public static setFixedHeaders(configuration: ITableConfiguration): void {
    if (configuration.fixedHeaders) {
      configuration.tableElement.classList.add(TABLE_CONSTANTS.classes.TABLE_FIXED);
    } else {
      configuration.tableElement.classList.remove(TABLE_CONSTANTS.classes.TABLE_FIXED);
    }
  }

  /**
   * Sets the table layout algorithm.
   * @param configuration The table configuration.
   */
  public static setLayoutType(configuration: ITableConfiguration): void {
    if (configuration.layoutType === 'fixed') {
      configuration.tableElement.classList.add(TABLE_CONSTANTS.classes.TABLE_LAYOUT_FIXED);
    } else {
      configuration.tableElement.classList.remove(TABLE_CONSTANTS.classes.TABLE_LAYOUT_FIXED);
    }
  }

  /**
   * Ensures that any columns width styles are within the bounds of available space.
   * @param configuration The table configuration.
   */
  public static normalizeColumnWidths(configuration: ITableConfiguration): void {
    const tableElement = configuration.tableElement;
    if (tableElement.tHead && tableElement.tHead.rows.length) {
      const cells = Array.from(tableElement.tHead.rows[0].cells);
      for (const cell of cells) {
        const expectedWidth = getComputedStyle(cell).width;
        if (cell.style.width && cell.style.width !== expectedWidth) {
          cell.style.width = expectedWidth;
        }
      }
    }
  }

  /**
   * Toggles the visibility of the resize cell indicator for all table cells.
   * @param configuration The table configuration.
   * @param columnIndex The cell index of the column being resized.
   * @param isVisible Whether to show the indicator or not.
   */
  public static setColumnResizeIndicatorVisibility(configuration: ITableConfiguration, columnIndex: number, isVisible: boolean): void {
    const tableElement = configuration.tableElement;

    if (tableElement.tHead && tableElement.tHead.rows.length) {
      const rows = Array.from(tableElement.tHead.rows);
      for (const row of rows) {
        const cell = row.cells[columnIndex];
        if (cell) {
          if (isVisible) {
            cell.classList.add(TABLE_CONSTANTS.classes.TABLE_CELL_RESIZABLE);
          } else {
            cell.classList.remove(TABLE_CONSTANTS.classes.TABLE_CELL_RESIZABLE);
          }
        }
      }
    }

    if (tableElement.tBodies.length) {
      const rows = Array.from(tableElement.tBodies[0].rows);
      for (const row of rows) {
        const cell = row.cells[columnIndex];
        if (cell) {
          if (isVisible) {
            cell.classList.add(TABLE_CONSTANTS.classes.TABLE_CELL_RESIZABLE);
          } else {
            cell.classList.remove(TABLE_CONSTANTS.classes.TABLE_CELL_RESIZABLE);
          }
        }
      }
    }
  }

  public static setRowClickListeners(
    tableElement: HTMLTableElement,
    allowClick: boolean,
    clickListener: (evt: Event) => void,
    doubleClickListener: (evt: Event) => void
  ): void {
    const tbodyElement = tableElement.tBodies[0];

    if (!tbodyElement) {
      return;
    }

    if (allowClick) {
      TableUtils._attachRowClickListeners(tbodyElement, clickListener, doubleClickListener);
    } else {
      TableUtils._detachRowClickListeners(tbodyElement, clickListener, doubleClickListener);
    }
  }

  public static setRowClickAttributes(tableElement: HTMLTableElement, allowClick: boolean): void {
    const tbodyElement = tableElement.tBodies[0];

    if (!tbodyElement) {
      return;
    }

    if (allowClick) {
      TableUtils._addRowClickAttributes(tbodyElement);
    } else {
      TableUtils._removeRowClickAttributes(tbodyElement);
    }
  }

  public static getOwnerDocument(el: HTMLElement): Document {
    return el.ownerDocument || document;
  }

  private static _prepend(element: HTMLElement, target: HTMLElement): void {
    const elementToSetBefore = target.childNodes.item(0);

    if (elementToSetBefore) {
      target.insertBefore(element, elementToSetBefore);
    } else {
      target.appendChild(element);
    }
  }

  private static _isMac(): boolean {
    // Not checking for `MacIntel` because Apple Silicon
    return !!(navigator && navigator.platform && navigator.platform.substr(0, 3) === 'Mac');
  }

  private static _renderSelectAllTemplate(
    selectAllTemplate: TableHeaderSelectAllTemplate,
    theadElement: HTMLTableSectionElement
  ): Promise<string | HTMLElement | void> {
    return Promise.resolve(selectAllTemplate()).then(element => {
      const lastTheadRow = theadElement.rows.item(theadElement.rows.length - 1);

      if (!lastTheadRow) {
        return;
      }

      const targetElement = lastTheadRow.cells.item(0);

      if (element && targetElement) {
        if (typeof element === 'string') {
          targetElement.innerHTML = element;
        } else if (element instanceof HTMLElement) {
          targetElement.appendChild(element);
        }

        targetElement.setAttribute(TABLE_CONSTANTS.attributes.CUSTOM_CELL_TEMPLATE, '');
      }
    });
  }
}
