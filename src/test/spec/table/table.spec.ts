import { removeElement } from '@tylertech/forge-core';
import { deepCopy, doubleClick, tick, timer } from '@tylertech/forge-testing';
import {
  CellAlign,
  defineTableComponent,
  IColumnConfiguration,
  ITableAdapter,
  ITableComponent,
  ITableFoundation,
  ITableConfiguration,
  ITableFilterEventData,
  SortDirection,
  TableFoundation,
  TableLayoutType,
  TABLE_CONSTANTS,
  ITableSortMultipleEventData,
  TableSelectTooltipCallback
} from '@tylertech/forge/table';
import { TextFieldComponentDelegate } from '@tylertech/forge/text-field';
import { ITooltipComponent } from '@tylertech/forge';

const columns: IColumnConfiguration[] = [
  { header: 'Name', property: 'Name' },
  { header: 'Age', property: 'Age' },
  { header: 'Position', property: 'Position' }
];

const resizableColumns: IColumnConfiguration[] = [
  { header: 'Name', property: 'Name', resizable: true },
  { header: 'Age', property: 'Age', resizable: true },
  { header: 'Position', property: 'Position', resizable: true }
];

const data: any[] = [
  { Id: 1, Name: 'Tom Brady', Age: 40, Position: 'QB' },
  { Id: 2, Name: 'Julian Edelman', Age: 31, Position: 'WR' },
  { Id: 3, Name: 'Rob Gronkowski', Age: 28, Position: 'TE' },
  { Id: 4, Name: 'Brandin Cooks', Age: 24, Position: 'WR' },
  { Id: 5, Name: 'James White', Age: 25, Position: 'RB' },
  { Id: 6, Name: 'Danny Amendola', Age: 32, Position: 'WR' }
];

interface ITestContext {
  context: ITestTableContext;
}

interface ITestTableContext {
  component: ITableComponent;
  foundation: ITableFoundation;
  getTableElement(): HTMLTableElement;
  destroy(): void;
  tooltipSelectCallback?: TableSelectTooltipCallback;
}

describe('TableComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineTableComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  describe('with default property values', function(this: ITestContext) {
    it('should load with attribute values default in properly', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const tableFoundation = this.context.component['_foundation'];

      expect(this.context.component.select).toBe(true, 'Expected select to be on');
      expect(this.context.component.multiselect).toBe(true, 'Expected multiselect to be on');
      expect(this.context.component.selectKey).toEqual(['Id'], 'Expected selectKey to be set');
      expect(this.context.component.dense).toBe(true, 'Expected dense mode to be on');
      expect(this.context.component.filter).toBe(true, 'Expected filter mode to be on');
      expect(this.context.component.fixedHeaders).toBe(true, 'Expected fixedHeaders to be on');
      expect(this.context.component.layoutType).toBe('auto', 'Expected layoutType to be auto');
      expect(this.context.component.wrapContent).toBe(true, 'Expected wrapContent to be on');
      expect(this.context.component.resizable).toBe(true, 'Expected resizable to be on');
      expect(this.context.component.minResizeWidth).toBe(10, 'Expected minResizeWidth to be 10');
      expect(this.context.component.allowRowClick).toBe(true, 'Expected allowRowClick to be on');

      expect(tableFoundation['select']).toBe(true);
      expect(tableFoundation['multiselect']).toBe(true);
      expect(tableFoundation['selectKey']).toEqual(['Id']);
      expect(tableFoundation['dense']).toBe(true);
      expect(tableFoundation['filter']).toBe(true);
      expect(tableFoundation['fixedHeaders']).toBe(true);
      expect(tableFoundation['layoutType']).toBe('auto');
      expect(tableFoundation['wrapContent']).toBe(true);
      expect(tableFoundation['resizable']).toBe(true);
      expect(tableFoundation['minResizeWidth']).toBe(10);
      expect(tableFoundation['allowRowClick']).toBe(true);

      expect(this.context.component.getAttribute(TABLE_CONSTANTS.attributes.SELECT)).toBe('true');
      expect(this.context.component.getAttribute(TABLE_CONSTANTS.attributes.MULTISELECT)).toBe('true');
      expect(this.context.component.getAttribute(TABLE_CONSTANTS.attributes.SELECT_KEY)).toBe('Id');
      expect(this.context.component.getAttribute(TABLE_CONSTANTS.attributes.DENSE)).toBe('true');
      expect(this.context.component.getAttribute(TABLE_CONSTANTS.attributes.FILTER)).toBe('true');
      expect(this.context.component.getAttribute(TABLE_CONSTANTS.attributes.FIXED_HEADERS)).toBe('true');
      expect(this.context.component.getAttribute(TABLE_CONSTANTS.attributes.LAYOUT_TYPE)).toBe('auto');
      expect(this.context.component.getAttribute(TABLE_CONSTANTS.attributes.WRAP_CONTENT)).toBe('true');
      expect(this.context.component.getAttribute(TABLE_CONSTANTS.attributes.RESIZABLE)).toBe('true');
      expect(this.context.component.getAttribute(TABLE_CONSTANTS.attributes.MIN_RESIZE_WIDTH)).toBe('10');
      expect(this.context.component.getAttribute(TABLE_CONSTANTS.attributes.ALLOW_ROW_CLICK)).toBe('true');
    });
  });

  describe('with children elements', function(this: ITestContext) {
    it('should remove children before initialize', function(this: ITestContext) {
      this.context = setupTestContext(false, true);
      expect(this.context.getTableElement().children.length).toBe(0, 'Expected table to have no children');
    });
  });

  describe('without default property values', function(this: ITestContext) {
    it('should be instantiated', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component).toBeDefined();
    });

    it('should have proper default values', function(this: ITestContext) {
      this.context = setupTestContext();
      const tableFoundation = this.context.component['_foundation'];

      expect(this.context.component.data).toEqual([], 'Expected data to be empty');
      expect(this.context.component.columnConfigurations).toEqual([], 'Expect column configurations to be empty');
      expect(this.context.component.select).toBe(false, 'Expected select to be on by default');
      expect(this.context.component.multiselect).toBe(true, 'Expected multiselect to be on by default');
      expect(this.context.component.selectKey).toBeUndefined('Expected selectKey to be undefined');
      expect(this.context.component.tooltipSelect).toBeUndefined('Expected tooltipSelect to be undefined');
      expect(this.context.component.tooltipSelectAll).toBeUndefined('Expected tooltipSelectAll to be undefined');
      expect(this.context.component.dense).toBe(false, 'Expected dense to be false');
      expect(this.context.component.filter).toBe(false, 'Expected filter mode to be on');
      expect(this.context.component.fixedHeaders).toBe(false, 'Expected fixedHeaders to be on');
      expect(this.context.component.layoutType).toBe('auto', 'Expected layoutType to be auto');
      expect(this.context.component.wrapContent).toBe(true, 'Expected wrapContent to be on');
      expect(this.context.component.resizable).toBe(false, 'Expected resizable to be on');
      expect(this.context.component.minResizeWidth).toBe(100, 'Expected minResizeWidth to be 10');
      expect(this.context.component.allowRowClick).toBe(false, 'Expected allowRowClick to be on');

      expect(tableFoundation['data']).toEqual([]);
      expect(tableFoundation['columnConfigurations']).toEqual([]);
      expect(tableFoundation['select']).toBe(false);
      expect(tableFoundation['multiselect']).toBe(true);
      expect(tableFoundation['selectKey']).toBeUndefined();
      expect(tableFoundation['tooltipSelect']).toBeUndefined();
      expect(tableFoundation['tooltipSelectAll']).toBeUndefined();
      expect(tableFoundation['dense']).toBe(false);
      expect(tableFoundation['filter']).toBe(false);
      expect(tableFoundation['fixedHeaders']).toBe(false);
      expect(tableFoundation['layoutType']).toBe('auto');
      expect(tableFoundation['wrapContent']).toBe(true);
      expect(tableFoundation['resizable']).toBe(false);
    });
    
    it('should have tooltip string', function(this: ITestContext) {
      this.context = setupTooltipTestContextWithString();
      this.context.component.select = true;
      this.context.component.multiselect = true;
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;

      expect(this.context.component.tooltipSelectAll).toEqual('Select All', 'Expected tooltipSelectAll to be set');
      expect(this.context.component.tooltipSelect).toEqual('Select', 'Expected tooltipSelect to be set');

      expect(this.context.component.getAttribute(TABLE_CONSTANTS.attributes.TOOLTIP_SELECT_ALL)).toBe('Select All');
      expect(this.context.component.getAttribute(TABLE_CONSTANTS.attributes.TOOLTIP_SELECT)).toBe('Select');

      const tableElement = this.context.component.querySelector('table') as HTMLTableElement;

      // Assert that the multiselect cell has the proper tooltip element and text
      const tableHeadFirstCell = (tableElement.tHead as HTMLTableSectionElement).rows[0].cells[0];
      const multiSelectTooltipElement = tableHeadFirstCell.querySelector('forge-tooltip') as ITooltipComponent;
      
      expect(multiSelectTooltipElement).toBeTruthy();
      expect(multiSelectTooltipElement.innerText).toBe('Select All');

      // Assert that all rows have a tooltip with the correct text
      const tableBodyRows = Array.from(tableElement.tBodies[0].rows);
      data.forEach((_, index) => {
        const rowElement = tableBodyRows[index];
        const firstCell = rowElement.cells[0];
        const tooltipElement = firstCell.querySelector('forge-tooltip') as ITooltipComponent;

        expect(tooltipElement).toBeTruthy();
        expect(tooltipElement.innerText).toBe('Select');
      });
    });

    it('should execute tooltip callback for every row', function(this: ITestContext) {
      this.context = setupTooltipTestContextWithCallback();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      
      expect(this.context.tooltipSelectCallback).toHaveBeenCalledTimes(data.length);
    });

    it('should have proper default DOM state', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.getTableElement().tHead).toBeNull('Expected to have no thead');
      expect(this.context.getTableElement().tBodies.length).toBe(0, 'Expected to have 0 tbodies');
      expect(this.context.getTableElement().classList.contains(TABLE_CONSTANTS.classes.TABLE)).toBe(true, 'Expected to have the default table class');
    });

    it('should set columns properly', async function(this: ITestContext) {
      this.context = setupTestContext();
      await tick();
      this.context.component.columnConfigurations = columns;

      const tableElement = this.context.getTableElement();
      expect(this.context.component.columnConfigurations.length).toBe(columns.length);
      expect((tableElement.tHead as HTMLTableSectionElement).rows.length)!.toBe(1);
      expect((tableElement.tHead as HTMLTableSectionElement).rows.item(0)!.cells.length).toBe(columns.length);
      await tick();
      this.context.component.resizable = true;
      this.context.component.columnConfigurations = resizableColumns;
      expect((tableElement.tHead as HTMLTableSectionElement).rows.length)!.toBe(1);
      expect((tableElement.tHead as HTMLTableSectionElement).rows.item(0)!.cells.length).toBe(resizableColumns.length);
    });

    it('should toggle select column properly', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.columnConfigurations = columns;
      this.context.component.select = true;
      
      const tableElement = this.context.getTableElement();
      expect((tableElement.tHead as HTMLTableSectionElement).rows.item(0)!.cells.item(0)!.classList.contains(TABLE_CONSTANTS.classes.TABLE_CELL_SELECT)).toBe(true);
      expect((tableElement.tHead as HTMLTableSectionElement).rows.item(0)!.cells.length).toBe(columns.length + 1);

      this.context.component.select = false;

      expect((tableElement.tHead as HTMLTableSectionElement).rows.item(0)!.cells.item(0)!.classList.contains(TABLE_CONSTANTS.classes.TABLE_CELL_SELECT)).toBe(false);
      expect((tableElement.tHead as HTMLTableSectionElement).rows.item(0)!.cells.length).toBe(columns.length);
    });

    it('should not set default sortable column', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.columnConfigurations = columns;
      const headerRow = getTableHeaderRow(this.context.getTableElement());
      const hasSortableCell = Array.from(headerRow.cells).some(c => c.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTABLE));
      expect(hasSortableCell).toBe(false);
    });

    it('should set initial sortable column', function(this: ITestContext) {
      this.context = setupTestContext();
      const testColumns: IColumnConfiguration[] = deepCopy(columns);
      testColumns[0].sortable = true;
      testColumns[1].sortable = true;
      testColumns[0].initialSort = true;

      this.context.component.columnConfigurations = testColumns;

      const headerRow = getTableHeaderRow(this.context.getTableElement());
      const firstCell = headerRow.cells.item(0) as HTMLTableHeaderCellElement;
      const secondCell = headerRow.cells.item(1) as HTMLTableHeaderCellElement;
      const activelySortedCells = Array.from(headerRow.cells).filter(
        c => c.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_DESCENDING) || c.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_ASCENDING)
      );
      const sortIconElement = firstCell.querySelector(`.${TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ICON}`);

      expect(firstCell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTABLE)).toBe(true, 'Expected sortable class on first cell');
      expect(secondCell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTABLE)).toBe(true, 'Expected sortable class on second cell');
      expect(firstCell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_DESCENDING)).toBe(true, 'Expected sort ascending class on first cell');
      expect(activelySortedCells.length).toBe(1, 'Expected only 1 actively sorted column');
      expect(sortIconElement).toBeDefined();
      expect((<HTMLElement>sortIconElement).classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ICON_ACTIVE)).toBe(true);
    });

    it('should hide columns', function(this: ITestContext) {
      this.context = setupTestContext();
      const testColumns: IColumnConfiguration[] = deepCopy(columns);
      testColumns[1].hidden = true;

      this.context.component.columnConfigurations = testColumns;

      const headerRow = getTableHeaderRow(this.context.getTableElement());

      expect(headerRow.cells.length).toBe(testColumns.length - 1);
    });

    it('should set correct sorted column index when hidden columns exist', function(this: ITestContext) {
      this.context = setupTestContext();
      const testColumns: IColumnConfiguration[] = deepCopy(columns);
      testColumns[1].hidden = true;
      testColumns[2].initialSort = true;

      this.context.component.columnConfigurations = testColumns;

      expect(this.context.foundation['_sortedColumnIndex']).withContext('sorted column index should account for hidden columns').toBe(1);
    });

    it('should not set data until columns are set', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;

      const rows = getTableBodyRows(this.context.getTableElement());
      expect(rows.length).toBe(0);
    });

    it('should reset data if data is not an array', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = {} as any;
      const rows = getTableBodyRows(this.context.getTableElement());
      expect(rows.length).toBe(0);
    });

    it('should set data properly', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;

      const rows = getTableBodyRows(this.context.getTableElement());
      expect(rows.length).toBe(data.length, 'Expected number of rows to match the length of the data');
    });

    it('should reset data properly', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      this.context.component.data = [data[0], data[1], data[2]];

      const rows = getTableBodyRows(this.context.getTableElement());
      expect(rows.length).toBe(3, 'Expected number of rows to match the length of the data');
    });

    it('should select row when clicked', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      this.context.component.select = true;
      this.context.component.selectKey = 'Id';

      const rows = getTableBodyRows(this.context.getTableElement());
      const firstRow = rows[0] as HTMLTableRowElement;
      const firstCell = firstRow.cells.item(0) as HTMLTableCellElement;
      const selectCheckboxElement = firstCell.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;

      selectCheckboxElement.click();

      expect(firstRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).toBe(true, 'Expected clicked row to have selected class');
    });

    it('should not select row when clicking non-checkbox element', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      this.context.component.select = true;
      this.context.component.selectKey = 'Id';

      const rows = getTableBodyRows(this.context.getTableElement());

      expect(rows[0].classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).toBe(false, 'Expected clicked row to not have selected class applied');
    });

    it('should not set select all listener if multiselect is off', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      this.context.component.multiselect = false;
      const tableFoundation = this.context.component['_foundation'];
      const tableConfig: ITableConfiguration = tableFoundation['_tableConfiguration'];
      expect(tableConfig.selectAllListener).toBeNull();
    });

    it('should emit select event when selecting a row', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      this.context.component.select = true;

      const callback = jasmine.createSpy('callback');
      this.context.component.addEventListener(TABLE_CONSTANTS.events.SELECT, callback);

      const rows = getTableBodyRows(this.context.getTableElement());
      const selectCheckboxElement = rows[0].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
      selectCheckboxElement.click();

      expect(callback).toHaveBeenCalled();
    });

    it('should emit select-double event when double clicking a row', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      this.context.component.allowRowClick = true;

      const selectDoubleCallback = jasmine.createSpy('callback');
      this.context.component.addEventListener(TABLE_CONSTANTS.events.SELECT_DOUBLE, selectDoubleCallback);

      const selectCallback = jasmine.createSpy('callback');
      this.context.component.addEventListener(TABLE_CONSTANTS.events.SELECT, selectCallback);

      const rows = getTableBodyRows(this.context.getTableElement());
      doubleClick(rows[0]);

      expect(selectDoubleCallback).toHaveBeenCalled();
      expect(selectCallback).not.toHaveBeenCalled();
    });

    it('should emit click event on a row', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.allowRowClick = true;
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;

      const clickListener = jasmine.createSpy('callback');
      this.context.component.addEventListener(TABLE_CONSTANTS.events.ROW_CLICK, clickListener);

      const selectCallback = jasmine.createSpy('callback');
      this.context.component.addEventListener(TABLE_CONSTANTS.events.SELECT, selectCallback);

      const rows = getTableBodyRows(this.context.getTableElement());
      rows[0].click();

      expect(clickListener).toHaveBeenCalledTimes(1);
      expect(selectCallback).not.toHaveBeenCalled();
    });

    it('should reattach click listeners on data set', function(this: ITestContext) {
      this.context = setupTestContext();
      const tableFoundation: TableFoundation = this.context.component['_foundation'];
      const tableAdapter: ITableAdapter = tableFoundation['_adapter'];
      const recreateBodySpy = spyOn(tableAdapter, 'recreateTableBody');
      this.context.component.allowRowClick = true;
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      this.context.component.data = this.context.component.data = [data[0], data[1], data[2]];
      expect(tableFoundation['_tableConfiguration'].clickListener).toBeDefined();
      expect(recreateBodySpy.calls.count()).toBeGreaterThan(0);
    });

    it('should not emit click event if target is checkbox', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.allowRowClick = true;
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      this.context.component.select = true;
      const tableFoundation = this.context.component['_foundation'];

      const clickListener = jasmine.createSpy('callback');
      const rowClickSpy = spyOn(tableFoundation, '_onRowClick').and.callThrough();
      this.context.component.addEventListener(TABLE_CONSTANTS.events.ROW_CLICK, clickListener);

      const rows = getTableBodyRows(this.context.getTableElement());
      const checkbox = rows[0].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;

      checkbox.click();

      expect(rowClickSpy).toHaveBeenCalledTimes(1);
      expect(clickListener).not.toHaveBeenCalled();
    });

    it('should emit click event on a row when a cell is clicked with a custom template', async function(this: ITestContext) {
      this.context = setupTestContext();
      const button = document.createElement('button');
      button.textContent = 'Test';

      columns.push({ template: () => button });

      this.context.component.allowRowClick = true;
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      const tableFoundation = this.context.component['_foundation'];

      const clickListener = jasmine.createSpy('callback');
      const rowClickSpy = spyOn(tableFoundation, '_onRowClick').and.callThrough();
      this.context.component.addEventListener(TABLE_CONSTANTS.events.ROW_CLICK, clickListener);

      await tick();

      button.dispatchEvent(new Event('click', { bubbles: true }));

      expect(rowClickSpy).toHaveBeenCalledTimes(1);
      expect(clickListener).toHaveBeenCalled();
    });

    it('should not emit row click event when custom template is configured to stop click propagation', async function(this: ITestContext) {
      this.context = setupTestContext();
      const button = document.createElement('button');
      button.textContent = 'Test';

      columns.push({ template: () => button, stopCellTemplateClickPropagation: true });

      this.context.component.allowRowClick = true;
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      const tableFoundation = this.context.component['_foundation'];

      const clickListener = jasmine.createSpy('callback');
      const rowClickSpy = spyOn(tableFoundation, '_onRowClick').and.callThrough();
      this.context.component.addEventListener(TABLE_CONSTANTS.events.ROW_CLICK, clickListener);

      await tick();

      button.dispatchEvent(new Event('click', { bubbles: true }));

      expect(rowClickSpy).toHaveBeenCalledTimes(1);
      expect(clickListener).not.toHaveBeenCalled();
    });

    it('should not emit dblclick event if target is checkbox', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.allowRowClick = true;
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      this.context.component.select = true;
      const tableFoundation = this.context.component['_foundation'];

      const dblclickListener = jasmine.createSpy('callback');
      const rowClickSpy = spyOn(tableFoundation, '_onRowDoubleClick').and.callThrough();
      this.context.component.addEventListener(TABLE_CONSTANTS.events.ROW_CLICK, dblclickListener);

      const rows = getTableBodyRows(this.context.getTableElement());
      const checkbox = rows[0].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;

      checkbox.dispatchEvent(new Event('dblclick', { bubbles: true }));

      expect(rowClickSpy).toHaveBeenCalledTimes(1);
      expect(dblclickListener).not.toHaveBeenCalled();
    });

    it('should emit select all event', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      this.context.component.select = true;

      const callback = jasmine.createSpy('callback');
      this.context.component.addEventListener(TABLE_CONSTANTS.events.SELECT_ALL, callback);

      const row = getTableHeaderRow(this.context.getTableElement());
      const checkbox = row.cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
      checkbox.click();

      expect(callback).toHaveBeenCalled();
    });

    it('should emit select all event after manually selecting all rows', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      this.context.component.select = true;

      const callback = jasmine.createSpy('callback');
      this.context.component.addEventListener(TABLE_CONSTANTS.events.SELECT_ALL, callback);

      const rows = getTableBodyRows(this.context.getTableElement());
      data.forEach((item, index) => {
        const selectCheckboxElement = rows[index].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
        selectCheckboxElement.click();
      });

      expect(callback).toHaveBeenCalled();
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should select multiple rows when clicked', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      this.context.component.select = true;

      const rows = getTableBodyRows(this.context.getTableElement());
      const firstRow = rows[0];
      const secondRow = rows[1];
      const firstRowfirstCell = firstRow.cells.item(0) as HTMLTableCellElement;
      const secondRowfirstCell = secondRow.cells.item(0) as HTMLTableCellElement;
      const firstRowSelectCheckboxElement = firstRowfirstCell.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
      const secondRowSelectCheckboxElement = secondRowfirstCell.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;

      firstRowSelectCheckboxElement.click();
      secondRowSelectCheckboxElement.click();

      expect(firstRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).toBe(true, 'Expected first clicked row to have selected class');

      expect(secondRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).toBe(true, 'Expected second clicked row to have selected class');
    });

    it('should select and deselect rows when clicked with multiselect off', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      this.context.component.select = true;
      this.context.component.multiselect = false;
      this.context.component.selectKey = 'Id';

      const rows = getTableBodyRows(this.context.getTableElement());
      const firstRow = rows[0];
      const secondRow = rows[1];
      const firstRowfirstCell = firstRow.cells.item(0) as HTMLTableCellElement;
      const secondRowfirstCell = secondRow.cells.item(0) as HTMLTableCellElement;
      const firstRowSelectCheckboxElement = firstRowfirstCell.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
      const secondRowSelectCheckboxElement = secondRowfirstCell.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;

      firstRowSelectCheckboxElement.click();
      secondRowSelectCheckboxElement.click();

      expect(firstRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).toBe(false, 'Expected first clicked row to have selected class');

      expect(secondRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).toBe(true, 'Expected second clicked row to have selected class');
    });

    it('should select and deselect rows when clicked', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      this.context.component.select = true;
      this.context.component.selectKey = 'Id';

      const rows = getTableBodyRows(this.context.getTableElement());
      const firstRow = rows[0];
      const secondRow = rows[1];
      const firstRowfirstCell = firstRow.cells.item(0) as HTMLTableCellElement;
      const secondRowfirstCell = secondRow.cells.item(0) as HTMLTableCellElement;
      const firstRowSelectCheckboxElement = firstRowfirstCell.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
      const secondRowSelectCheckboxElement = secondRowfirstCell.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;

      firstRowSelectCheckboxElement.click();
      secondRowSelectCheckboxElement.click();

      expect(firstRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).toBe(true, 'Expected first clicked row to have selected class');

      expect(secondRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).toBe(true, 'Expected second clicked row to have selected class');

      firstRowSelectCheckboxElement.click();
      secondRowSelectCheckboxElement.click();

      expect(firstRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).toBe(false, 'Expected first clicked row to have selected class');

      expect(secondRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).toBe(false, 'Expected second clicked row to have selected class');
    });

    it('should select all and deselect all rows when clicking select all checkbox', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      this.context.component.select = true;
      this.context.component.selectKey = 'Id';

      const row = getTableHeaderRow(this.context.getTableElement());
      const checkbox = row.cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
      checkbox.click();
      let selectedRows = getTableBodyRows(this.context.getTableElement()).filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).toBeGreaterThan(0);
      expect(selectedRows.length).toBe(data.length);

      checkbox.click();
      selectedRows = getTableBodyRows(this.context.getTableElement()).filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).toEqual(0);
      expect(selectedRows.length).toBe(0);
    });

    it('should not update a row if the row is unselectable when clicking select all checkbox');

    it('should update select all state if a row selection completes all selected rows', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      this.context.component.select = true;
      this.context.component.selectKey = 'Id';
      const tableFoundation = this.context.component['_foundation'];

      const allButLastRows = data.filter((d, i) => i + 1 < data.length);
      this.context.component.selectRows([...allButLastRows], false);

      expect(this.context.component.getSelectedRows().length).toBeLessThan(data.length, `Expected selected rows to be ${data.length - 1}`);
      expect(tableFoundation['_isAllSelected']).toBe(false);

      this.context.component.selectRows([data[data.length - 1]], true);

      expect(this.context.component.getSelectedRows().length).toEqual(data.length, `Expected selected rows to be ${data.length}`);
      expect(tableFoundation['_isAllSelected']).toBe(true);
    });

    it('should not update select all state if a row selection completes all selected rows and multiselect is off', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      this.context.component.select = true;
      this.context.component.selectKey = 'Id';
      const tableFoundation = this.context.component['_foundation'];

      const allButLastRows = data.filter((d, i) => i + 1 < data.length);
      this.context.component.selectRows([...allButLastRows], false);

      await tick();

      this.context.component.multiselect = false;

      expect(this.context.component.getSelectedRows().length).toBeLessThan(data.length, `Expected selected rows to be ${data.length - 1}`);
      expect(tableFoundation['_isAllSelected']).toBe(false);

      await tick();

      this.context.component.selectRows([data[data.length - 1]], true);

      expect(this.context.component.getSelectedRows().length).toEqual(1, `Expected selected rows to be 1`);
      expect(tableFoundation['_isAllSelected']).toBe(false);
    });

    it('should set layout type', function(this: ITestContext) {
      this.context = setupTestContext();
      const tableFoundation: TableFoundation = this.context.component['_foundation'];

      this.context.component.layoutType = 'fixed' as TableLayoutType;
      this.context.component.render();
      expect(this.context.getTableElement().classList.contains(TABLE_CONSTANTS.classes.TABLE_LAYOUT_FIXED)).toBe(true, 'Expected table should have the layout fixed class');
      expect(tableFoundation['_tableConfiguration'].layoutType).toBe('fixed', 'Expected table config layoutType should be fixed');

      this.context.component.layoutType = 'auto' as TableLayoutType;
      this.context.component.render();
      expect(this.context.getTableElement().classList.contains(TABLE_CONSTANTS.classes.TABLE_LAYOUT_FIXED)).toBe(false, 'Expected table should not have the layout fixed class');
      expect(tableFoundation['_tableConfiguration'].layoutType).toBe('auto', 'Expected table config layoutType should be auto');
    });
 
    it('should set dense state', function(this: ITestContext) {
      this.context = setupTestContext();
      const tableFoundation: TableFoundation = this.context.component['_foundation'];
      
      this.context.component.dense = true;
      this.context.component.render();
      expect(this.context.getTableElement().classList.contains(TABLE_CONSTANTS.classes.TABLE_DENSE)).toBe(true);
      expect(this.context.component.getAttribute(TABLE_CONSTANTS.attributes.DENSE)).toBe('true');
      expect(tableFoundation['_tableConfiguration'].dense).toBe(true, 'Expected table config dense should be true');

      this.context.component.dense = false;
      this.context.component.render();
      expect(this.context.getTableElement().classList.contains(TABLE_CONSTANTS.classes.TABLE_DENSE)).toBe(false);
      expect(this.context.component.getAttribute(TABLE_CONSTANTS.attributes.DENSE)).toBe('false');
      expect(tableFoundation['_tableConfiguration'].dense).toBe(false, 'Expected table config dense should be false');
    });

    it('should set resizable', function(this: ITestContext) {
      this.context = setupTestContext();
      const tableFoundation: TableFoundation = this.context.component['_foundation'];

      this.context.component.resizable = false;
      this.context.component.render();
      expect(this.context.getTableElement().classList.contains(TABLE_CONSTANTS.classes.TABLE_RESIZABLE)).toBe(false);
      expect(tableFoundation['_tableConfiguration'].resizable).toBe(false, 'Expected table config resizable should be false');
      this.context.component.resizable = true;
      this.context.component.render();
      expect(this.context.getTableElement().classList.contains(TABLE_CONSTANTS.classes.TABLE_RESIZABLE)).toBe(true);
      expect(tableFoundation['_tableConfiguration'].resizable).toBe(true, 'Expected table config resizable should be true');
    });

    it('should set fixed headers state', function(this: ITestContext) {
      this.context = setupTestContext();
      const tableFoundation: TableFoundation = this.context.component['_foundation'];   
    
      this.context.component.fixedHeaders = false;
      this.context.component.render();
      expect(this.context.getTableElement().classList.contains(TABLE_CONSTANTS.classes.TABLE_FIXED)).toBe(false);
      expect(tableFoundation['_tableConfiguration'].fixedHeaders).toBe(false, 'Expected table config fixedHeaders should be false');

      this.context.component.fixedHeaders = true;
      this.context.component.render();
      expect(this.context.getTableElement().classList.contains(TABLE_CONSTANTS.classes.TABLE_FIXED)).toBe(true);
      expect(tableFoundation['_tableConfiguration'].fixedHeaders).toBe(true, 'Expected table config fixedHeaders should be true');
    });

    it('should set wrap content', function(this: ITestContext) {
      this.context = setupTestContext();
      const tableFoundation: TableFoundation = this.context.component['_foundation'];

      this.context.component.wrapContent = true;
      this.context.component.render();
      expect(this.context.getTableElement().classList.contains(TABLE_CONSTANTS.classes.TABLE_NO_WRAP_CONTENT)).toBe(false);
      expect(tableFoundation['_tableConfiguration'].wrapContent).toBe(true, 'Expected table config fixedHeaders should be true');
      this.context.component.wrapContent = false;
      this.context.component.render();
      expect(this.context.getTableElement().classList.contains(TABLE_CONSTANTS.classes.TABLE_NO_WRAP_CONTENT)).toBe(true);
      expect(tableFoundation['_tableConfiguration'].wrapContent).toBe(false, 'Expected table config fixedHeaders should be false');
    });

    it('should set min resize width state', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.minResizeWidth = 10;
      expect(this.context.component.minResizeWidth).toBe(10, 'Expected minResizeWidth to be 10');
    });

    it('should default min resize width when no number is provided', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.minResizeWidth = 'a' as any;
      expect(this.context.component.minResizeWidth).toBe(100, 'Expected minResizeWidth to be 100');
    });

    it('should set min resize width zero when a negative number is provided', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.minResizeWidth = -5;
      expect(this.context.component.minResizeWidth).toBe(0, 'Expected minResizeWidth to be 0');
    });

    it('should set filter', function(this: ITestContext) {
      this.context = setupTestContext();
      const tableFoundation: TableFoundation = this.context.component['_foundation'];

      this.context.component.filter = true;
      this.context.component.render();
      expect(this.context.getTableElement().classList.contains(TABLE_CONSTANTS.classes.TABLE_FILTER_VISIBLE)).toBe(true);
      expect(tableFoundation['_tableConfiguration'].filter).toBe(true, 'Expected table config filter should be true');
      this.context.component.filter = false;
      this.context.component.render();
      expect(this.context.getTableElement().classList.contains(TABLE_CONSTANTS.classes.TABLE_FILTER_VISIBLE)).toBe(false);
      expect(tableFoundation['_tableConfiguration'].filter).toBe(false, 'Expected table config filter should be false');
    });

    it('should set allow row click', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.allowRowClick = false;
      expect(this.context.component.allowRowClick).toBe(false, 'Expected allow row click to be false');
      this.context.component.allowRowClick = true;
      expect(this.context.component.allowRowClick).toBe(true, 'Expected allow row click to be true');
    });

    it('should set select rows from code', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.select = true;
      this.context.component.columnConfigurations = columns;
      this.context.component.data = data;
      this.context.component.selectKey = 'Id';

      const rows = getTableBodyRows(this.context.getTableElement());
      const firstRow = rows[0];
      const secondRow = rows[1];

      this.context.component.selectRows([data[0], data[1]]);

      expect(firstRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).toBe(true, 'Expected first clicked row to have selected class');
      expect(secondRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).toBe(true, 'Expected second clicked row to have selected class');
    });

    it('should select rows if select is false', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.selectKey = 'Id';
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;

      this.context.component.selectRow(data[0]);

      const selectedRows = getTableBodyRows(this.context.getTableElement()).filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).toBe(1);
    });

    it('should not deselect rows if select is turned off', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;

      this.context.component.deselectRow(data[0]);

      const selectedRows = getTableBodyRows(this.context.getTableElement()).filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).toBe(0);
    });

    it('should not select rows if data is undefined', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.selectKey = 'Id';
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      this.context.component.select = true;
      this.context.component.selectRows(undefined as any);

      const selectedRows = getTableBodyRows(this.context.getTableElement()).filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).toBe(0);
    });

    it('should not deselect rows if data is undefined', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      this.context.component.select = true;
      this.context.component.deselectRows(undefined as any);

      const selectedRows = getTableBodyRows(this.context.getTableElement()).filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).toBe(0);
    });

    it('should emit sort event when clicking sortable column', async function(this: ITestContext) {
      this.context = setupTestContext();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;

      this.context.component.columnConfigurations = testColumns;

      const callback = jasmine.createSpy('callback');
      this.context.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback);

      const headerRow = getTableHeaderRow(this.context.getTableElement());
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      clickTableCell(firstCell);

      expect(callback).toHaveBeenCalled();
    });

    it('should not emit sort event clicking non-sortable column', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.columnConfigurations = columns;

      const callback = jasmine.createSpy('callback');
      this.context.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback);

      const headerRow = getTableHeaderRow(this.context.getTableElement());
      headerRow.cells.item(0)!.click();

      expect(callback).not.toHaveBeenCalled();
    });

    it('should toggle sort direction when clicking same column', function(this: ITestContext) {
      this.context = setupTestContext();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;

      this.context.component.columnConfigurations = testColumns;

      const headerRow = getTableHeaderRow(this.context.getTableElement());
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;

      clickTableCell(firstCell);
      expect(firstCell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_ASCENDING)).toBe(true);

      clickTableCell(firstCell);
      expect(firstCell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_DESCENDING)).toBe(true);
    });

    it('should not sort column when clicking non-sortable column', function(this: ITestContext) {
      this.context = setupTestContext();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;

      this.context.component.columnConfigurations = testColumns;

      const headerRow = getTableHeaderRow(this.context.getTableElement());
      const secondCell = headerRow.cells.item(1) as HTMLTableCellElement;
      const sortIconElement = secondCell.querySelector(`.${TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ICON}`);

      const callback = jasmine.createSpy('callback');
      this.context.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback);

      secondCell.click();

      const hasSortClass =
        secondCell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_DESCENDING) || secondCell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_ASCENDING);

      expect(callback).not.toHaveBeenCalled();
      expect(hasSortClass).toBe(false);
      expect(sortIconElement).toBeNull();
    });

    it('should move sort icon from sorted column to newly sorted column', function(this: ITestContext) {
      this.context = setupTestContext();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;
      testColumns[1].sortable = true;

      this.context.component.columnConfigurations = testColumns;

      const headerRow = getTableHeaderRow(this.context.getTableElement());
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      const secondCell = headerRow.cells.item(1) as HTMLTableCellElement;

      clickTableCell(firstCell);
      clickTableCell(secondCell);

      const firstCellSortIcon = firstCell.querySelector(`.${TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ICON}`) as HTMLElement;
      const secondCellSortIcon = secondCell.querySelector(`.${TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ICON}`) as HTMLElement;

      expect(firstCell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_ASCENDING)).toBe(false);
      expect(secondCell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_ASCENDING)).toBe(true);
      expect(firstCellSortIcon.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ICON_ACTIVE)).toBe(false);
      expect(secondCellSortIcon.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ICON_ACTIVE)).toBe(true);
    });

    it('should not move sort icon from sorted column to newly sorted column when sort event has preventDefault applied', function(this: ITestContext) {
      this.context = setupTestContext();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;
      testColumns[1].sortable = true;

      this.context.component.columnConfigurations = testColumns;

      const headerRow = getTableHeaderRow(this.context.getTableElement());
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      const secondCell = headerRow.cells.item(1) as HTMLTableCellElement;

      clickTableCell(firstCell);

      this.context.component.addEventListener('forge-table-sort', evt => {
        evt.preventDefault();
      });

      clickTableCell(secondCell);

      const firstCellSortIcon = firstCell.querySelector(`.${TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ICON}`) as HTMLElement;
      const secondCellSortIcon = secondCell.querySelector(`.${TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ICON}`) as HTMLElement;

      expect(firstCell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_ASCENDING)).toBe(true, 'First column should have descending sort class');
      expect(secondCell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_ASCENDING)).toBe(false, 'Second column should not have descending sort class');
      expect(secondCell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_DESCENDING)).toBe(false, 'Second column should not have ascending sort class');
      expect(firstCellSortIcon.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ICON_ACTIVE)).toBe(true, 'First column should have active sort icon');
      expect(secondCellSortIcon.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ICON_ACTIVE)).toBe(false, 'Second column should not have active sort icon');
    });

    it('Sort event data should still be available when the event has prevent default applied', function(this: ITestContext) {
      this.context = setupTestContext();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;
      testColumns[1].sortable = true;

      this.context.component.columnConfigurations = testColumns;

      const headerRow = getTableHeaderRow(this.context.getTableElement());
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      const secondCell = headerRow.cells.item(1) as HTMLTableCellElement;

      clickTableCell(firstCell);

      let direction = '';
      let columnIndex = -1;
      this.context.component.addEventListener('forge-table-sort', (evt: CustomEvent) => {
        evt.preventDefault();
        direction = evt.detail.direction;
        columnIndex = evt.detail.columnIndex;
      });

      clickTableCell(secondCell);

      expect(direction).toBe(SortDirection.Ascending, 'Sort direction should be ascending');
      expect(columnIndex).toBe(1, 'Column index should be 1, the second column');
    });

    it('should not emit sort event if select column cell is clicked', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      this.context.component.select = true;
      this.context.component.multiselect = false;
      this.context.component.selectKey = 'Id';

      const callback = jasmine.createSpy('callback');
      this.context.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback);

      const headerRow = getTableHeaderRow(this.context.getTableElement());
      headerRow.cells.item(0)!.click();

      expect(callback).not.toHaveBeenCalled();
    });

    it('should not set host attribute for select key if is array type', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.selectKey = ['Id'];

      expect(this.context.component.hasAttribute(TABLE_CONSTANTS.attributes.SELECT_KEY)).toBe(false);
    });

    it('clear selections', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      this.context.component.select = true;
      this.context.component.selectKey = 'Id';

      this.context.component.selectRow(data[0]);
      this.context.component.selectRows([data[0], data[1]], true);
      this.context.component.clearSelections();

      const selectedRows = getTableBodyRows(this.context.getTableElement()).filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).toBe(0);
    });

    it('should not clear selections when hiding select column', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      this.context.component.select = true;
      this.context.component.selectKey = 'Id';

      this.context.component.selectRows([data[0], data[1]]);
      this.context.component.select = false;

      const selectedRows = getTableBodyRows(this.context.getTableElement()).filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).toBe(2);
    });

    it('should not clear selections when turning multiselect off', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      this.context.component.select = true;
      this.context.component.selectKey = 'Id';

      this.context.component.selectRows([data[0], data[1]]);
      this.context.component.multiselect = false;

      const selectedRows = getTableBodyRows(this.context.getTableElement()).filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).toBe(2);
    });

    it('should preserve selections when turning multiselect on', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      this.context.component.select = true;
      this.context.component.selectKey = 'Id';
      this.context.component.multiselect = false;

      this.context.component.selectRow(data[0]);
      this.context.component.multiselect = true;

      const selectedRows = getTableBodyRows(this.context.getTableElement()).filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).toBe(1);
    });

    it('should preserve selections when turning preserveExisting on', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      this.context.component.select = true;
      this.context.component.selectKey = 'Id';
      this.context.component.multiselect = true;

      this.context.component.selectRows([data[0]]);
      let selectedRows = getTableBodyRows(this.context.getTableElement()).filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));
      expect(selectedRows.length).toBe(1, 'Expected selected row count to be 1');

      await tick();

      this.context.component.selectRows([data[1]], true);
      selectedRows = getTableBodyRows(this.context.getTableElement()).filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));
      expect(selectedRows.length).toBe(2, 'Expected selected row count to increase to 2');
    });

    it('should hide column', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.columnConfigurations = columns;
      this.context.component.hideColumn(0);

      const headerRow = getTableHeaderRow(this.context.getTableElement());

      expect(headerRow.cells.length).toBe(columns.length - 1);
    });

    it('should return whether a column is hidden or not', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.columnConfigurations = columns;
      this.context.component.hideColumn(0);
    
      expect(this.context.component.isColumnHidden(0)).toBeTrue();
      expect(this.context.component.isColumnHidden(1)).toBeFalse();
    });

    it('should reset the sorted column on hide column', function(this: ITestContext) {
      this.context = setupTestContext();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;
      testColumns[1].sortable = true;

      this.context.component.columnConfigurations = testColumns;
      const tableFoundation = this.context.component['_foundation'];
      const headerRow = getTableHeaderRow(this.context.getTableElement());
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;

      clickTableCell(firstCell);
      expect(tableFoundation['_sortedColumnIndex']).toBeGreaterThan(-1);
      this.context.component.hideColumn(0);
      expect(tableFoundation['_sortedColumnIndex']).toBe(-1);
    });

    it('should not create column config if config alreaady exist on column hide', function(this: ITestContext) {
      this.context = setupTestContext();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;
      testColumns[1].sortable = true;

      this.context.component.columnConfigurations = testColumns;
      const tableFoundation = this.context.component['_foundation'];

      expect(tableFoundation['_hiddenColumnManager'].count()).toEqual(0);
      this.context.component.hideColumn(0);
      expect(tableFoundation['_hiddenColumnManager'].count()).toEqual(1);
      this.context.component.hideColumn(0);
      expect(tableFoundation['_hiddenColumnManager'].count()).toEqual(1);
    });

    it('should show column', function(this: ITestContext) {
      this.context = setupTestContext();
      const testColumns = deepCopy(columns);
      testColumns[0].hidden = true;

      this.context.component.columnConfigurations = testColumns;
      this.context.component.showColumn(0);

      const headerRow = getTableHeaderRow(this.context.getTableElement());

      expect(headerRow.cells.length).toBe(columns.length);
    });

    it('should not remove column config if config already exist on column show', function(this: ITestContext) {
      this.context = setupTestContext();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;
      testColumns[1].sortable = true;

      this.context.component.columnConfigurations = testColumns;
      const tableFoundation = this.context.component['_foundation'];

      this.context.component.hideColumn(0);
      expect(tableFoundation['_hiddenColumnManager'].count()).toEqual(1);
      this.context.component.showColumn(0);
      expect(tableFoundation['_hiddenColumnManager'].count()).toEqual(0);
      this.context.component.showColumn(0);
      expect(tableFoundation['_hiddenColumnManager'].count()).toEqual(0);
    });

    it('should get selected rows', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      this.context.component.select = true;
      this.context.component.selectKey = 'Id';

      this.context.component.selectRows([data[0], data[1]]);
      expect(this.context.component.getSelectedRows().length).toBe(2);
    });

    xit('should not listen for selectAll if multiselect is off and select is on', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.multiselect = false;
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      this.context.component.select = true;
      this.context.component.selectKey = 'Id';
      // let tableFoundation = this.context.component['_foundation'];
      // let tableAdapter = tableFoundation['_adapter'] as TableAdapter;

      // await tick();

      // (derek.moss): not sure how to capture the undefined selectAllListener
      // const setSelectColumnVisibilitySpy = spyOn(tableAdapter, 'setSelectColumnVisibility');
      // console.log(setSelectColumnVisibilitySpy);
    });

    it('should deselect rows', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      this.context.component.select = true;
      this.context.component.selectKey = 'Id';

      this.context.component.selectRows([data[0], data[1], data[2]]);
      this.context.component.deselectRow(data[0]);
      this.context.component.deselectRows([data[1], data[2]]);

      const selectedRows = getTableBodyRows(this.context.getTableElement()).filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).toBe(0);
    });

    it('should render table properly', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;

      this.context.component.render();

      const headerRow = getTableHeaderRow(this.context.getTableElement());
      const rows = getTableBodyRows(this.context.getTableElement());

      expect(headerRow.cells.length).toBe(columns.length, 'Expected header row to be unchanged after render');
      expect(rows.length).toBe(data.length, 'Expected table rows to be unchanged after render');
    });

    it('should expand a collapsed row', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;

      this.context.component.render();

      this.context.component.expandRow(0, '');
      expect(this.context.component.isRowExpanded(0)).toBe(true, 'Expected row 0 to be expanded');
    });

    it('should throw if table has not rendered and it expands a collapsed row', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(() => this.context.component.expandRow(0, '')).toThrowError('Cannot expand a row before the table has rendered.');
    });

    it('should throw if a negative row index is used on expand row', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;

      this.context.component.render();

      expect(() => this.context.component.expandRow(-1, '')).toThrowError(`Invalid row index: -1.`);
    });

    it('should throw if the row index is greater than the number of table rows on expand row', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;

      this.context.component.render();
      const rows = getTableBodyRows(this.context.getTableElement());
      expect(() => this.context.component.expandRow(rows.length + 1, '')).toThrowError(`Invalid row index: ${rows.length + 1}.`);
    });

    it('should collapse an expanded row', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;

      this.context.component.render();

      this.context.component.expandRow(0, '');

      this.context.component.render();

      this.context.component.collapseRow(0);

      expect(this.context.component.isRowExpanded(0)).toBe(false, 'Expected row 0 to be collapsed');
    });

    it('should not collapse an expanded row if the table has not rendered', async function(this: ITestContext) {
      this.context = setupTestContext();
      const tableFoundation = this.context.component['_foundation'];
      expect(tableFoundation['_rendered']).toBe(false);
      let resolved = false;
      this.context.component.collapseRow(0).then(() => (resolved = true));

      await tick();
      expect(tableFoundation['_rendered']).toBe(false);
      expect(resolved).toBe(true);
    });

    it('should not collapse if a negative row index is used on collapse row', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      let resolved = false;
      this.context.component.render();

      this.context.component.collapseRow(-1).then(() => (resolved = true));

      await tick();
      expect(resolved).toBe(true);
    });

    it('should not collapse if the row index is greater than table rows on collapse row', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      let resolved = false;
      this.context.component.render();
      const rows = getTableBodyRows(this.context.getTableElement());

      this.context.component.collapseRow(rows.length + 1).then(() => (resolved = true));

      await tick();
      expect(resolved).toBe(true);
    });

    it('should reselect rows after table render', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      this.context.component.select = true;
      this.context.component.selectKey = 'Id';

      this.context.component.selectRows([data[0], data[1]]);
      this.context.component.render();

      const selectedRows = getTableBodyRows(this.context.getTableElement()).filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).toBe(2);
    });

    it('should reselect rows after table data changes', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      this.context.component.select = true;
      this.context.component.selectKey = 'Id';

      this.context.component.selectRows([data[0], data[1]]);
      this.context.component.data = [data[0], data[2], data[3]];

      const selectedRows = getTableBodyRows(this.context.getTableElement()).filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).toBe(1);
    });

    it('should not render rows if no columns have been set but data changes', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.data = [data[0], data[2], data[3]];

      const rows = getTableBodyRows(this.context.getTableElement());

      expect(rows.length).toBe(0);
    });

    it('should set width of column from configuration', function(this: ITestContext) {
      this.context = setupTestContext();
      const testColumns = deepCopy(columns);
      testColumns.push({ header: 'Column Four' });
      testColumns.push({ header: 'Column Five' });

      testColumns[0].width = 500;
      testColumns[1].width = '500px';
      testColumns[2].width = '50%';
      testColumns[3].width = '100';
      testColumns[4].width = -1;

      this.context.component.data = data;
      this.context.component.columnConfigurations = testColumns;

      const headerRow = getTableHeaderRow(this.context.getTableElement());

      expect(headerRow.cells.item(0)!.style.width).toBe('500px');
      expect(headerRow.cells.item(1)!.style.width).toBe('500px');
      expect(headerRow.cells.item(2)!.style.width).toBe('50%');
      expect(headerRow.cells.item(3)!.style.width).toBe('100px');
      expect(headerRow.cells.item(4)!.style.width).toBe('');
    });

    it('should set cell alignment from configuration', function(this: ITestContext) {
      this.context = setupTestContext();
      const testColumns = deepCopy(columns);
      testColumns[0].align = CellAlign.Center;
      testColumns[1].align = CellAlign.Right;

      this.context.component.data = data;
      this.context.component.columnConfigurations = testColumns;

      const headerRow = getTableHeaderRow(this.context.getTableElement());
      const rows = getTableBodyRows(this.context.getTableElement());
      const headerColumnOneCellContainer = headerRow.cells.item(0)!.firstElementChild as HTMLElement;
      const rowColumnOneCellContainer = rows[0].cells.item(0)!.firstElementChild as HTMLElement;
      const headerColumnTwoCellContainer = headerRow.cells.item(1)!.firstElementChild as HTMLElement;
      const rowColumnTwoCellContainer = rows[0].cells.item(1)!.firstElementChild as HTMLElement;

      expect(headerColumnOneCellContainer.classList.contains(TABLE_CONSTANTS.classes.TABLE_CELL_CENTER)).toBe(true);
      expect(rowColumnOneCellContainer.classList.contains(TABLE_CONSTANTS.classes.TABLE_CELL_CENTER)).toBe(true);

      expect(headerColumnTwoCellContainer.classList.contains(TABLE_CONSTANTS.classes.TABLE_CELL_RIGHT)).toBe(true);
      expect(rowColumnTwoCellContainer.classList.contains(TABLE_CONSTANTS.classes.TABLE_CELL_RIGHT)).toBe(true);
    });

    it('should set column cell template from configuration as string', async function(this: ITestContext) {
      this.context = setupTestContext();
      const testColumns = deepCopy(columns);
      delete testColumns[0].property;
      testColumns[0].template = () => '<button></button>';

      this.context.component.data = data;
      this.context.component.columnConfigurations = testColumns;

      const rows = getTableBodyRows(this.context.getTableElement());

      await tick();
      const everyRowCellContainsTemplate = rows.every(r => r.cells.item(0)!.querySelector('button') !== null);
      expect(everyRowCellContainsTemplate).toBe(true);
    });

    it('should set column cell template from configuration as element', async function(this: ITestContext) {
      this.context = setupTestContext();
      const testColumns = deepCopy(columns);
      delete testColumns[0].property;
      testColumns[0].template = () => document.createElement('button');

      this.context.component.data = data;
      this.context.component.columnConfigurations = testColumns;

      const rows = getTableBodyRows(this.context.getTableElement());

      await tick();
      const everyRowCellContainsTemplate = rows.every(r => r.cells.item(0)!.querySelector('button') !== null);
      expect(everyRowCellContainsTemplate).toBe(true);
    });

    it('should transform cell data using transform from configuration', async function(this: ITestContext) {
      this.context = setupTestContext();
      const testColumns: IColumnConfiguration[] = deepCopy(columns);
      testColumns[0].transform = (value: string) => 'transformed';

      this.context.component.data = data;
      this.context.component.columnConfigurations = testColumns;

      const rows = getTableBodyRows(this.context.getTableElement());

      await tick();
      const everyRowCellUppercase = rows.every((r, index) => (r.cells.item(0)!.firstElementChild as HTMLElement).innerText === 'transformed');
      expect(everyRowCellUppercase).toBe(true);
    });

    it('should not show filter row when no columns are defined to have filters', function(this: ITestContext) {
      this.context = setupTestContext();
      const testColumns: IColumnConfiguration[] = deepCopy(columns);
      this.context.component.data = data;
      this.context.component.columnConfigurations = testColumns;
      this.context.component.filter = true;

      const lastTableRow = getLastTableHeaderRow(this.context.getTableElement());
      expect(lastTableRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_ROW_FILTER)).toBe(false);
    });

    it('should show filter row when at least one column has a filter', function(this: ITestContext) {
      this.context = setupTestContext();
      const testColumns: IColumnConfiguration[] = deepCopy(columns);
      testColumns[0].filter = true;

      this.context.component.data = data;
      this.context.component.columnConfigurations = testColumns;
      this.context.component.filter = true;

      const lastTableRow = getLastTableHeaderRow(this.context.getTableElement());
      expect(lastTableRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_ROW_FILTER)).toBe(true);
    });

    it('should show filter components in correct cells', function(this: ITestContext) {
      this.context = setupTestContext();
      const testColumns: IColumnConfiguration[] = deepCopy(columns);
      testColumns[0].filter = true;
      testColumns[0].filterDelegate = new TextFieldComponentDelegate();

      this.context.component.data = data;
      this.context.component.columnConfigurations = testColumns;
      this.context.component.filter = true;

      const lastTableRow = getLastTableHeaderRow(this.context.getTableElement());
      let firstFilterCellIndex = this.context.component.select && this.context.component.multiselect ? 1 : 0;
      expect(lastTableRow.cells.item(firstFilterCellIndex++)!.querySelector('input[type=text]')).not.toBeNull();
      expect(lastTableRow.cells.item(firstFilterCellIndex++)!.querySelector('input[type=text]')).toBeNull();
      expect(lastTableRow.cells.item(firstFilterCellIndex++)!.querySelector('input[type=text]')).toBeNull();
    });

    it('should emit filter event when modifying filter component', async function(this: ITestContext) {
      this.context = setupTestContext();
      const testColumns: IColumnConfiguration[] = deepCopy(columns);
      testColumns[0].filter = true;
      testColumns[0].filterDelegate = new TextFieldComponentDelegate();
      const filterDebounceTime = testColumns[0].filterDebounceTime || TABLE_CONSTANTS.numbers.DEFAULT_FILTER_DEBOUNCE_TIME;

      this.context.component.data = data;
      this.context.component.columnConfigurations = testColumns;
      this.context.component.filter = true;

      const lastTableRow = getLastTableHeaderRow(this.context.getTableElement());
      const firstFilterCellIndex = this.context.component.select && this.context.component.multiselect ? 1 : 0;
      const filterInputElement = lastTableRow.cells.item(firstFilterCellIndex)!.querySelector('input[type=text]') as HTMLInputElement;

      const filterCallback = jasmine.createSpy('callback').and.callFake((evt: CustomEvent) => {
        const evtData = evt.detail as ITableFilterEventData;
        expect(evtData.value).toBe('a', 'Expected filter value to be provided.');
        expect(evtData.columnIndex).toBe(0, 'Expected correct column index to be provided.');
      });
      this.context.component.addEventListener(TABLE_CONSTANTS.events.FILTER, filterCallback);

      filterInputElement.value = 'a';
      filterInputElement.dispatchEvent(new Event('input'));

      await timer(filterDebounceTime);

      expect(filterCallback).toHaveBeenCalled();
    });

    it('should remove resize handle when resizable is turned off', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.resizable = true;
      this.context.component.columnConfigurations = resizableColumns;
      this.context.component.data = data;
      const tableFoundation = this.context.component['_foundation'];

      const firstCell = getTableHeaderRow(this.context.getTableElement()).cells.item(0) as HTMLTableCellElement;
      let resizeHandle = getTableResizeHandle(this.context.getTableElement());
      expect(resizeHandle).toBeDefined();

      this.context.component.resizable = false;

      await tick();

      resizeHandle = getTableResizeHandle(this.context.getTableElement());
      expect(resizeHandle).toBeNull();
    });

    it('should resize columns when the resize handle is moved', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.resizable = true;
      this.context.component.columnConfigurations = resizableColumns;
      this.context.component.data = data;
      const tableFoundation = this.context.component['_foundation'];

      const firstCell = getTableHeaderRow(this.context.getTableElement()).cells.item(0) as HTMLTableCellElement;
      const resizeHandle = getTableResizeHandle(this.context.getTableElement());
      await tick();
      firstCell.dispatchEvent(new MouseEvent('mouseover'));
      await tick();
      await timer(TABLE_CONSTANTS.numbers.RESIZE_HOVER_DURATION);

      expect(resizeHandle.classList.contains(TABLE_CONSTANTS.classes.TABLE_RESIZE_HANDLE)).toBe(true, 'Expected table resize handle to have css class');
      const mousedownSpy = spyOn(tableFoundation, '_onHeadRowMouseDown').and.callThrough();
      const mousemoveSpy = spyOn(tableFoundation, '_onMouseMove').and.callThrough();
      const mouseupSpy = spyOn(tableFoundation, '_onMouseUp').and.callThrough();
      resizeHandle.dispatchEvent(
        new MouseEvent('mousedown', {
          clientX: firstCell.clientWidth,
          clientY: 0,
          layerX: 4,
          layerY: 4,
          bubbles: true
        } as any)
      );
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 25, clientY: 0 } as any));
      document.dispatchEvent(new MouseEvent('mouseup'));
      expect(mousedownSpy).toHaveBeenCalledTimes(1);
      expect(mousemoveSpy).toHaveBeenCalledTimes(1);
      expect(mouseupSpy).toHaveBeenCalledTimes(1);
      expect(firstCell.style.width).toContain('px');
      expect(firstCell.style.width).not.toBe('');
    });

    it('should emit event when column has been resized', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.resizable = true;
      this.context.component.columnConfigurations = resizableColumns;
      this.context.component.data = data;

      const resizeEventSpy = jasmine.createSpy('resize event spy');
      this.context.component.addEventListener(TABLE_CONSTANTS.events.COLUMN_RESIZE, resizeEventSpy);

      const firstCell = getTableHeaderRow(this.context.getTableElement()).cells.item(0) as HTMLTableCellElement;
      const resizeHandle = getTableResizeHandle(this.context.getTableElement());
      await tick();
      firstCell.dispatchEvent(new MouseEvent('mouseover'));
      await tick();
      await timer(TABLE_CONSTANTS.numbers.RESIZE_HOVER_DURATION);
      resizeHandle.dispatchEvent(
        new MouseEvent('mousedown', {
          clientX: firstCell.clientWidth,
          clientY: 0,
          layerX: 4,
          layerY: 4,
          bubbles: true
        } as any)
      );
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 25, clientY: 0 } as any));
      document.dispatchEvent(new MouseEvent('mouseup'));
      expect(resizeEventSpy).toHaveBeenCalledTimes(1);
      expect(resizeEventSpy).toHaveBeenCalledWith(jasmine.any(CustomEvent));
      expect(resizeEventSpy).toHaveBeenCalledWith(jasmine.objectContaining({ detail: { index: 0, width: 100 } }));
    });

    it('should set width to min-resize-width when column width is smaller than min width when resize handle is moved', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.resizable = true;
      this.context.component.minResizeWidth = 150;
      this.context.component.columnConfigurations = resizableColumns;
      this.context.component.data = data;

      const firstCell = getTableHeaderRow(this.context.getTableElement()).cells.item(0) as HTMLTableCellElement;
      const resizeHandle = getTableResizeHandle(this.context.getTableElement());
      await tick();
      firstCell.dispatchEvent(new MouseEvent('mouseover'));
      await tick();
      await timer(TABLE_CONSTANTS.numbers.RESIZE_HOVER_DURATION);

      resizeHandle.dispatchEvent(
        new MouseEvent('mousedown', {
          clientX: firstCell.clientWidth,
          clientY: 0,
          layerX: 4,
          layerY: 4,
          bubbles: true
        } as any)
      );
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: -(firstCell.clientWidth - 100), clientY: 0 } as any));
      document.dispatchEvent(new MouseEvent('mouseup'));
      expect(firstCell.style.width).toContain('px');
      expect(firstCell.style.width).not.toBe('');
      expect(parseInt(firstCell.style.width!.split('px')[0], 10)).toEqual(150);
    });

    it('should not set width to min-resize-width when column width is larger than min width when resize handle is moved', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.resizable = true;
      this.context.component.minResizeWidth = 150;
      this.context.component.columnConfigurations = resizableColumns;
      this.context.component.data = data;

      const firstCell = getTableHeaderRow(this.context.getTableElement()).cells.item(0) as HTMLTableCellElement;
      const resizeHandle = getTableResizeHandle(this.context.getTableElement());
      await tick();
      firstCell.dispatchEvent(new MouseEvent('mouseover'));
      await tick();
      await timer(TABLE_CONSTANTS.numbers.RESIZE_HOVER_DURATION);

      const { width, left } = firstCell.getBoundingClientRect();
      const newWidth = left + width - 14;

      resizeHandle.dispatchEvent(
        new MouseEvent('mousedown', {
          clientX: left + width - 4,
          clientY: 0,
          bubbles: true
        } as any)
      );
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: newWidth, clientY: 0 } as any));
      document.dispatchEvent(new MouseEvent('mouseup'));
      expect(firstCell.style.width).toContain('px');
      expect(firstCell.style.width).not.toBe('');
      expect(parseInt(firstCell.style.width!.split('px')[0], 10)).toBeGreaterThan(150);
    });

    it('should select multiple rows on shift click', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      this.context.component.select = true;
      this.context.component.selectKey = 'Id';
      this.context.component.multiselect = true;

      const rows = getTableBodyRows(this.context.getTableElement());
      const checkbox1 = rows[0].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
      const checkbox2 = rows[3].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;

      checkbox1.dispatchEvent(new MouseEvent('click'));
      checkbox2.dispatchEvent(new MouseEvent('click', { shiftKey: true }));

      const selectedRows = this.context.component.getSelectedRows();

      expect(selectedRows.length).toBe(4);
    });

    it('should emit multiple select events on shift click', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      this.context.component.select = true;
      this.context.component.selectKey = 'Id';
      this.context.component.multiselect = true;

      const callback = jasmine.createSpy('callback');
      this.context.component.addEventListener(TABLE_CONSTANTS.events.SELECT, callback);

      const rows = getTableBodyRows(this.context.getTableElement());
      const checkboxRow1 = rows[0].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
      const checkboxRow4 = rows[3].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;

      checkboxRow1.dispatchEvent(new MouseEvent('click'));
      checkboxRow4.dispatchEvent(new MouseEvent('click', { shiftKey: true }));

      expect(callback).toHaveBeenCalledTimes(4);
    });

    it('should de-select the rows when the checkbox is already selected', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      this.context.component.select = true;
      this.context.component.selectKey = 'Id';
      this.context.component.multiselect = true;

      const rows = getTableBodyRows(this.context.getTableElement());
      const checkbox1 = rows[0].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
      const checkbox2 = rows[2].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
      const checkbox3 = rows[3].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;

      checkbox1.dispatchEvent(new MouseEvent('click'));
      checkbox3.dispatchEvent(new MouseEvent('click', { shiftKey: true }));
      checkbox2.dispatchEvent(new MouseEvent('click', { shiftKey: true }));

      const selectedRows = this.context.component.getSelectedRows();

      expect(selectedRows.length).toBe(2);
    });

    it('should not emit sort event when right clicking sortable column', async function(this: ITestContext) {
      this.context = setupTestContext();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;

      this.context.component.columnConfigurations = testColumns;

      const callback = jasmine.createSpy('callback');
      this.context.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback);

      const headerRow = getTableHeaderRow(this.context.getTableElement());
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      firstCell.dispatchEvent(new MouseEvent('contextmenu'));

      expect(callback).not.toHaveBeenCalled();
    });

    it('should select the first row by index', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      this.context.component.select = true;
      this.context.component.selectKey = 'Id';
      this.context.component.multiselect = true;

      const rows = getTableBodyRows(this.context.getTableElement());
      const checkbox1 = rows[0].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLInputElement;

      this.context.component.selectRowsByIndex(0);

      expect(checkbox1.checked).toBe(true);
    });

    it('should check if row is selected by the data object', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      this.context.component.select = true;
      this.context.component.selectKey = 'Id';
      this.context.component.multiselect = true;

      const rows = getTableBodyRows(this.context.getTableElement());
      const checkbox1 = rows[0].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLInputElement;
      const checkbox2 = rows[1].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLInputElement;

      this.context.component.selectRowsByIndex(1);

      expect(this.context.component.isRowSelected(data[1])).toBe(true);
    });

    it('should select then deselect the first row by index', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      this.context.component.select = true;
      this.context.component.selectKey = 'Id';
      this.context.component.multiselect = true;

      const rows = getTableBodyRows(this.context.getTableElement());
      const checkbox1 = rows[0].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLInputElement;

      this.context.component.selectRowsByIndex(0);
      expect(checkbox1.checked).toBe(true);
      this.context.component.deselectRowsByIndex(0);
      expect(checkbox1.checked).toBe(false);
    });

    it('should select then deselect the multiple rows by index', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      this.context.component.select = true;
      this.context.component.selectKey = 'Id';
      this.context.component.multiselect = true;

      const rows = getTableBodyRows(this.context.getTableElement());
      const checkbox1 = rows[0].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLInputElement;
      const checkbox2 = rows[1].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLInputElement;
      const checkbox3 = rows[2].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLInputElement;

      this.context.component.selectRowsByIndex([0, 1, 2]);
      expect(checkbox1.checked).toBe(true);
      expect(checkbox2.checked).toBe(true);
      expect(checkbox3.checked).toBe(true);
      this.context.component.deselectRowsByIndex([0, 1, 2]);
      expect(checkbox1.checked).toBe(false);
      expect(checkbox2.checked).toBe(false);
      expect(checkbox3.checked).toBe(false);
    });

    it('should show indeterminate checkbox when some are selected', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      this.context.component.select = true;
      this.context.component.selectKey = 'Id';
      this.context.component.multiselect = true;

      const rows = getTableBodyRows(this.context.getTableElement());
      const checkbox1 = rows[0].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLInputElement;
      this.context.component.selectRowsByIndex(0);

      const row = getTableHeaderRow(this.context.getTableElement());
      const selectAllCheckbox = row.cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLInputElement;

      expect(checkbox1.checked).toBe(true);
      expect(selectAllCheckbox.indeterminate).toBe(true, 'selecting a checkbox did not correctly set the indeterminate value on the checkbox');
    });

    it('should change to checked when click on indeterminate ', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;
      this.context.component.select = true;
      this.context.component.selectKey = 'Id';
      this.context.component.multiselect = true;

      const rows = getTableBodyRows(this.context.getTableElement());
      const checkbox1 = rows[0].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLInputElement;
      this.context.component.selectRowsByIndex(0);

      const row = getTableHeaderRow(this.context.getTableElement());
      const selectAllCheckbox = row.cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLInputElement;

      expect(checkbox1.checked).toBe(true);
      expect(selectAllCheckbox.indeterminate).toBe(true, 'selecting a checkbox did not correctly set the indeterminate value on the checkbox');

      selectAllCheckbox.click();
      expect(checkbox1.checked).toBe(true);
      expect(selectAllCheckbox.indeterminate).toBe(false, 'selecting all did not change to checked correctly');
      expect(selectAllCheckbox.checked).toBe(true);
    });

    it('should contain custom header template', async function(this: ITestContext) {
      this.context = setupTestContext();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;
      testColumns[0].headerTemplate = () => '<span>Hello Goodbye</span>';

      this.context.component.columnConfigurations = testColumns;
      await tick();

      const callback = jasmine.createSpy('callback');
      this.context.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback);

      const headerRow = getTableHeaderRow(this.context.getTableElement());
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      expect(firstCell.innerHTML).toContain('Hello Goodbye');
    });

    it('should contain custom header template with sort arrow', async function(this: ITestContext) {
      this.context = setupTestContext();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;
      testColumns[0].headerTemplate = () => '<span>Hello Goodbye</span>';

      this.context.component.columnConfigurations = testColumns;

      const callback = jasmine.createSpy('callback');
      this.context.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback);

      const headerRow = getTableHeaderRow(this.context.getTableElement());
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      await tick();
      clickTableCell(firstCell);
      expect(firstCell.innerHTML).toContain('Hello Goodbye');
      expect(callback).toHaveBeenCalled();
      expect(firstCell.innerHTML).toContain(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ICON);
    });

    it('should emit array of sorted columns with multiple column sort ', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.multiColumnSort = true;
      const testColumns = deepCopy(columns) as IColumnConfiguration[];
      testColumns.forEach(c => (c.sortable = true));

      this.context.component.columnConfigurations = testColumns;

      let emitedResult: ITableSortMultipleEventData | undefined;

      const callback = jasmine.createSpy('callback');
      this.context.component.addEventListener(TABLE_CONSTANTS.events.SORT, (evt: CustomEvent<ITableSortMultipleEventData>) => {
        emitedResult = evt.detail;
        callback(evt);
      });

      const headerRow = getTableHeaderRow(this.context.getTableElement());
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      await tick();
      clickTableCell(firstCell);
      expect(callback).toHaveBeenCalled();
      expect(Array.isArray(emitedResult)).toBe(true, 'did not properly emit an array of sort rules');
    });

    it('should emit sorted on both `name` and `position', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.multiColumnSort = true;
      const testColumns = deepCopy(columns) as IColumnConfiguration[];
      testColumns.forEach(c => (c.sortable = true));

      this.context.component.columnConfigurations = testColumns;

      let emitedResult: ITableSortMultipleEventData | undefined;

      const callback = jasmine.createSpy('callback');
      this.context.component.addEventListener(TABLE_CONSTANTS.events.SORT, (evt: CustomEvent<ITableSortMultipleEventData>) => {
        emitedResult = evt.detail;
        callback(evt);
      });

      const headerRow = getTableHeaderRow(this.context.getTableElement());
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      const secondCell = headerRow.cells.item(2) as HTMLTableCellElement;
      await tick();
      clickTableCell(firstCell);
      clickTableCell(secondCell, true);
      expect(callback).toHaveBeenCalled();
      expect(emitedResult!.length).toBe(2, 'should have added a second sort column');
      expect(emitedResult![0].propertyName).toBe('Name');
      expect(emitedResult![0].sortOrder).toBe(1);
      expect(emitedResult![1].propertyName).toBe('Position');
      expect(emitedResult![1].sortOrder).toBe(2);
    });

    it('should execute callback when row elements are created', async function(this: ITestContext) {
      this.context = setupTestContext();
      const rowCreatedSpy = jasmine.createSpy('rowCreatedSpy');
      this.context.component.rowCreated = rowCreatedSpy;
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;

      expect(rowCreatedSpy).toHaveBeenCalledTimes(data.length);
    });

    it('should execute callback when cell elements are created', async function(this: ITestContext) {
      this.context = setupTestContext();
      const cellCreatedSpy = jasmine.createSpy('cellCreatedSpy');
      this.context.component.cellCreated = cellCreatedSpy;
      this.context.component.data = data;
      this.context.component.columnConfigurations = columns;

      expect(cellCreatedSpy).toHaveBeenCalledTimes(data.length * columns.length);
    });

    describe('select all template', function(this: ITestContext) {
      it('should render the template', async function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.select = true;
        this.context.component.multiselect = true;
        this.context.component.selectAllTemplate = () => customSelectAllTemplate();

        const testColumns = deepCopy(columns) as IColumnConfiguration[];
        this.context.component.columnConfigurations = testColumns;
        await tick();

        const header = getTableHeaderRow(this.context.getTableElement());
        const selectAllCell = getSelectAllCell(this.context.getTableElement());

        expect(selectAllCell.querySelector('.custom-select-all-template-container')).not.toBeUndefined();
      });

      it('should automagically wire select all to input', async function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.select = true;
        this.context.component.multiselect = true;
        this.context.component.selectAllTemplate = () => customSelectAllTemplate();
        this.context.component.data = data;

        const testColumns = deepCopy(columns) as IColumnConfiguration[];
        this.context.component.columnConfigurations = testColumns;
        await tick();

        const selectAllCell = getSelectAllCell(this.context.getTableElement());

        selectAllCell.querySelector('input')!.dispatchEvent(new MouseEvent('click'));

        const selectedRows = this.context.component.getSelectedRows();

        expect(selectedRows.length).toBe(data.length);
      });

      it('should ignore select all wire if forge-ignore attribute is present on the input', async function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.select = true;
        this.context.component.multiselect = true;
        this.context.component.selectAllTemplate = () => customSelectAllTemplate({ forgeIgnore: true });
        this.context.component.data = data;

        const testColumns = deepCopy(columns) as IColumnConfiguration[];
        this.context.component.columnConfigurations = testColumns;
        await tick();

        const selectAllCell = getSelectAllCell(this.context.getTableElement());

        selectAllCell.querySelector('input')!.dispatchEvent(new MouseEvent('click'));

        const selectedRows = this.context.component.getSelectedRows();

        expect(selectedRows.length).toBe(0);
      });

      it('should have indeterminate state when a single row is selected', async function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.select = true;
        this.context.component.multiselect = true;
        this.context.component.selectAllTemplate = () => customSelectAllTemplate();
        this.context.component.data = data;

        const testColumns = deepCopy(columns) as IColumnConfiguration[];
        this.context.component.columnConfigurations = testColumns;
        await tick();

        const selectAllCell = getSelectAllCell(this.context.getTableElement());
        const checkbox = selectAllCell.querySelector('input') as HTMLInputElement;
        const rowCheckbox = this.context.getTableElement().querySelector('tbody > tr > td input');
        rowCheckbox!.dispatchEvent(new MouseEvent('click'));
        // this.context.component.selectRows([data[1]], true);
        await tick();

        expect(checkbox.indeterminate).toBe(true);
      });

      it('should have checked state when all rows are selected', async function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.select = true;
        this.context.component.multiselect = true;
        this.context.component.selectAllTemplate = () => customSelectAllTemplate();
        this.context.component.data = data;

        const testColumns = deepCopy(columns) as IColumnConfiguration[];
        this.context.component.columnConfigurations = testColumns;
        await tick();

        const selectAllCell = getSelectAllCell(this.context.getTableElement());
        const checkbox = selectAllCell.querySelector('input') as HTMLInputElement;
        const rowCheckboxs = this.context.getTableElement().querySelectorAll('tbody input');
        rowCheckboxs.forEach(c => {
          c.dispatchEvent(new MouseEvent('click'));
        });

        await tick();

        expect(checkbox.checked).toBe(true);
      });

      it('should render with HTMLElement as the template', async function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.select = true;
        this.context.component.multiselect = true;
        this.context.component.selectAllTemplate = () => customSelectAllTemplate({ type: 'html' });
        this.context.component.data = data;

        const testColumns = deepCopy(columns) as IColumnConfiguration[];
        this.context.component.columnConfigurations = testColumns;
        await tick();

        const selectAllCell = getSelectAllCell(this.context.getTableElement());
        const checkbox = selectAllCell.querySelector('input') as HTMLInputElement;
        const rowCheckboxs = this.context.getTableElement().querySelectorAll('tbody input');
        rowCheckboxs.forEach(c => {
          c.dispatchEvent(new MouseEvent('click'));
        });

        await tick();

        expect(checkbox.checked).toBe(true);
      });

      it('should rerender correctly if multiselect is toggled', async function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.select = true;
        this.context.component.multiselect = true;
        this.context.component.selectAllTemplate = () => customSelectAllTemplate({ type: 'html' });
        this.context.component.data = data;

        const testColumns = deepCopy(columns) as IColumnConfiguration[];
        this.context.component.columnConfigurations = testColumns;

        await tick();
        this.context.component.multiselect = false;
        await tick();
        this.context.component.multiselect = true;
        await tick();

        const selectAllCell = getSelectAllCell(this.context.getTableElement());

        expect(selectAllCell).toBeTruthy();
      });

      it('should align checkbox to left if select checkbox alignment set', async function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.select = true;
        this.context.component.multiselect = true;
        this.context.component.selectCheckboxAlignment = CellAlign.Left;
        this.context.component.selectAllTemplate = () => customSelectAllTemplate({ type: 'html' });
        this.context.component.data = data;

        const testColumns = deepCopy(columns) as IColumnConfiguration[];
        this.context.component.columnConfigurations = testColumns;
        const checkboxContainer = this.context.getTableElement().querySelector('tbody .forge-table-cell__select-checkbox-container') as HTMLElement;
        await tick();
        expect(this.context.component.selectCheckboxAlignment).toBe(CellAlign.Left);
        expect(checkboxContainer.classList.contains(TABLE_CONSTANTS.classes.TABLE_CELL_SELECT_CHECKBOX_CONTAINER_ALIGN_LEFT)).toBeTrue();
      });

      it('should set selections when select column is not visible', function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.data = data;
        this.context.component.columnConfigurations = columns;
        this.context.component.select = false;
        this.context.component.selectKey = 'Id';

        const selectedIndexes = [0, 2];
        this.context.component.selectRowsByIndex(selectedIndexes);

        const rows = getTableBodyRows(this.context.getTableElement());
        rows.forEach((row, index) => {
          const selected = selectedIndexes.includes(index);
          expect(row.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).toBe(selected, `Expected row ${index} to be ${selected ? 'selected' : 'deselected'}`);
        });
      });

      it('should render selections when select column is not visible after data is changed', function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.data = data;
        this.context.component.columnConfigurations = columns;
        this.context.component.select = false;
        this.context.component.selectKey = 'Id';

        const selectedIndexes = [0, 2];
        this.context.component.selectRowsByIndex(selectedIndexes);
        this.context.component.data = data;

        const rows = getTableBodyRows(this.context.getTableElement());
        rows.forEach((row, index) => {
          const selected = selectedIndexes.includes(index);
          expect(row.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).toBe(selected, `Expected row ${index} to be ${selected ? 'selected' : 'deselected'}`);
        });
      });
    });
  });
});

function setupTestContext(hasAttrs = false, hasChildren = false): ITestTableContext {
  const fixture = document.createElement('div');
  fixture.id = 'table-test-fixture';
  const component = document.createElement(TABLE_CONSTANTS.elementName) as ITableComponent;
  if (hasAttrs) {
    component.setAttribute('select', 'true');
    component.setAttribute('multiselect', 'true');
    component.setAttribute('select-key', 'Id');
    component.setAttribute('tooltip-select', 'Select');
    component.setAttribute('tooltip-select-all', 'Select All');
    component.setAttribute('dense', 'true');
    component.setAttribute('filter', 'true');
    component.setAttribute('fixed-headers', 'true');
    component.setAttribute('layout-type', 'auto');
    component.setAttribute('wrap-content', 'true');
    component.setAttribute('resizable', 'true');
    component.setAttribute('min-resize-width', '10');
    component.setAttribute('allow-row-click', 'true');
  }
  if (hasChildren) {
    const child1 = document.createElement('span');
    const child2 = document.createElement('span');
    component.appendChild(child1);
    component.appendChild(child2);
  }
  fixture.appendChild(component);
  document.body.appendChild(fixture);
  return {
    component,
    foundation: component['_foundation'] as ITableFoundation,
    getTableElement: () => component.querySelector('table') as HTMLTableElement,
    destroy: () => removeElement(fixture)
  };
}

function setupTooltipTestContextWithString(): ITestTableContext {
  const fixture = document.createElement('div');
  fixture.id = 'table-test-fixture';
  const component = document.createElement(TABLE_CONSTANTS.elementName) as ITableComponent;

  component.setAttribute('tooltip-select-all', 'Select All');
  component.setAttribute('tooltip-select', 'Select');

  fixture.appendChild(component);
  document.body.appendChild(fixture);
  return {
    component,
    foundation: component['_foundation'] as ITableFoundation,
    getTableElement: () => component.querySelector('table') as HTMLTableElement,
    destroy: () => removeElement(fixture)
  };
}

function setupTooltipTestContextWithCallback(): ITestTableContext {
  const fixture = document.createElement('div');
  fixture.id = 'table-test-fixture';
  const component = document.createElement(TABLE_CONSTANTS.elementName) as ITableComponent;

  component.select = true;
  const tooltipSelectCallback = jasmine.createSpy('tooltip select callback', getTooltipString).and.callThrough();
  component.tooltipSelect = tooltipSelectCallback;

  fixture.appendChild(component);
  document.body.appendChild(fixture);
  return {
    component,
    foundation: component['_foundation'] as ITableFoundation,
    getTableElement: () => component.querySelector('table') as HTMLTableElement,
    destroy: () => removeElement(fixture),
    tooltipSelectCallback
  };
}

function getTooltipString(rowIndex: number, rowData: any): string {
  return rowData.Name;
}

function getTableHeaderRow(tableElement: HTMLTableElement): HTMLTableRowElement {
  return (tableElement.tHead as HTMLTableSectionElement).rows.item(0) as HTMLTableRowElement;
}

function getTableResizeHandle(tableElement: HTMLTableElement): HTMLElement {
  const tHead = tableElement.tHead as HTMLTableSectionElement;
  const row = tHead.rows.item(0) as HTMLTableRowElement;
  const firstCell = row.cells.item(0) as HTMLTableCellElement;
  return firstCell.querySelector(`.${TABLE_CONSTANTS.classes.TABLE_RESIZE_HANDLE}`) as HTMLElement;
}

function getLastTableHeaderRow(tableElement: HTMLTableElement): HTMLTableRowElement {
  const tHead = tableElement.tHead as HTMLTableSectionElement;
  return tHead.rows.item(tHead.rows.length - 1) as HTMLTableRowElement;
}

function getTableBodyRows(tableElement: HTMLTableElement): HTMLTableRowElement[] {
  if (!tableElement.tBodies.length) {
    return [];
  }
  return Array.from(tableElement.tBodies.item(0)!.rows);
}

function getSelectAllCell(tableElement: HTMLTableElement) {
  return tableElement.tHead!.rows.item(0)!.cells.item(0) as HTMLTableHeaderCellElement;
}

function clickTableCell(el: HTMLElement, withCtrlKey?: boolean): void {
  el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, ctrlKey: withCtrlKey }));
  el.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, ctrlKey: withCtrlKey }));
}

function customSelectAllTemplate(options?: { forgeIgnore?: boolean, type?: 'html' | 'string' }): Promise<string | HTMLElement> {
  return new Promise(resolve => {
    const htmlString = `
      <div class="custom-select-all-template-container">
       <input type="checkbox" ${options && options.forgeIgnore ? 'forge-ignore' : ''}/>
       <button></button>
      </div>
    `;

    const template = document.createElement('div');
    template.innerHTML = htmlString;

    if (options && options.type) {
      switch (options.type) {
        case 'string':
          resolve(template.innerHTML);
          break;
        case 'html':
          resolve(template);
          break;
      }
    } else {
      resolve(htmlString);
    }
  });
}
