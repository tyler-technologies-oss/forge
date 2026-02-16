import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html, nothing } from 'lit';
import { task, frame } from '../core/utils/utils.js';
import {
  CellAlign,
  defineTableComponent,
  IColumnConfiguration,
  ITableAdapter,
  ITableComponent,
  ITableCore,
  ITableConfiguration,
  ITableFilterEventData,
  SortDirection,
  TableLayoutType,
  TABLE_CONSTANTS,
  ITableSortMultipleEventData,
  TableSelectTooltipCallback
} from './index.js';
import { TextFieldComponentDelegate } from '../text-field/index.js';
import type { ITooltipComponent } from '../tooltip/index.js';

import './table.js';

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

type TableCoreInternal = ITableCore & {
  _sortedColumnIndex: number;
  _isAllSelected: boolean;
  _adapter: ITableAdapter;
  _tableConfiguration: ITableConfiguration;
  _onHeadRowMouseDown(event: MouseEvent): void;
  _onMouseUp(event: MouseEvent): void;
  _onMouseMove(event: MouseEvent): void;
  _onRowClick(event: MouseEvent): void;
  _onRowDoubleClick(event: MouseEvent): void;
  _hiddenColumnManager: any;
  _rendered: boolean;
};

type TableComponentWithCore = ITableComponent & { _core: TableCoreInternal };

describe('TableComponent', () => {
  beforeAll(() => {
    defineTableComponent();
  });

  describe('with default property values', () => {
    it('should load with attribute values default in properly', async () => {
      const harness = await createFixture({ hasAttrs: true });

      expect(harness.component.select).toBe(true);
      expect(harness.component.multiselect).toBe(true);
      expect(harness.component.selectKey).toEqual(['Id']);
      expect(harness.component.dense).toBe(true);
      expect(harness.component.filter).toBe(true);
      expect(harness.component.fixedHeaders).toBe(true);
      expect(harness.component.layoutType).toBe('auto');
      expect(harness.component.wrapContent).toBe(true);
      expect(harness.component.resizable).toBe(true);
      expect(harness.component.minResizeWidth).toBe(10);
      expect(harness.component.allowRowClick).toBe(true);

      expect(harness.component.getAttribute(TABLE_CONSTANTS.attributes.SELECT)).toBe('true');
      expect(harness.component.getAttribute(TABLE_CONSTANTS.attributes.MULTISELECT)).toBe('true');
      expect(harness.component.getAttribute(TABLE_CONSTANTS.attributes.SELECT_KEY)).toBe('Id');
      expect(harness.component.getAttribute(TABLE_CONSTANTS.attributes.DENSE)).toBe('true');
      expect(harness.component.getAttribute(TABLE_CONSTANTS.attributes.FILTER)).toBe('true');
      expect(harness.component.getAttribute(TABLE_CONSTANTS.attributes.FIXED_HEADERS)).toBe('true');
      expect(harness.component.getAttribute(TABLE_CONSTANTS.attributes.LAYOUT_TYPE)).toBe('auto');
      expect(harness.component.getAttribute(TABLE_CONSTANTS.attributes.WRAP_CONTENT)).toBe('true');
      expect(harness.component.getAttribute(TABLE_CONSTANTS.attributes.RESIZABLE)).toBe('true');
      expect(harness.component.getAttribute(TABLE_CONSTANTS.attributes.MIN_RESIZE_WIDTH)).toBe('10');
      expect(harness.component.getAttribute(TABLE_CONSTANTS.attributes.ALLOW_ROW_CLICK)).toBe('true');
    });
  });

  describe('with children elements', () => {
    it('should remove children before initialize', async () => {
      const harness = await createFixture({ hasChildren: true });
      expect(harness.tableElement.children.length).toBe(0);
    });
  });

  describe('without default property values', () => {
    it('should be instantiated', async () => {
      const harness = await createFixture();
      expect(harness.component).toBeTruthy();
    });

    it('should have proper default values', async () => {
      const harness = await createFixture();

      expect(harness.component.data).toEqual([]);
      expect(harness.component.columnConfigurations).toEqual([]);
      expect(harness.component.select).toBe(false);
      expect(harness.component.multiselect).toBe(true);
      expect(harness.component.selectKey).toBeUndefined();
      expect(harness.component.tooltipSelect).toBeUndefined();
      expect(harness.component.tooltipSelectAll).toBeUndefined();
      expect(harness.component.dense).toBe(false);
      expect(harness.component.filter).toBe(false);
      expect(harness.component.fixedHeaders).toBe(false);
      expect(harness.component.layoutType).toBe('auto');
      expect(harness.component.wrapContent).toBe(true);
      expect(harness.component.resizable).toBe(false);
      expect(harness.component.minResizeWidth).toBe(100);
      expect(harness.component.allowRowClick).toBe(false);
    });

    it('should have tooltip string', async () => {
      const harness = await createFixture({ tooltipSelect: 'Select', tooltipSelectAll: 'Select All' });
      harness.component.select = true;
      harness.component.multiselect = true;
      harness.component.data = data;
      harness.component.columnConfigurations = columns;

      expect(harness.component.tooltipSelectAll).toBe('Select All');
      expect(harness.component.tooltipSelect).toBe('Select');

      expect(harness.component.getAttribute(TABLE_CONSTANTS.attributes.TOOLTIP_SELECT_ALL)).toBe('Select All');
      expect(harness.component.getAttribute(TABLE_CONSTANTS.attributes.TOOLTIP_SELECT)).toBe('Select');

      const tableHeadFirstCell = harness.tableElement.tHead!.rows[0].cells[0];
      const multiSelectTooltipElement = tableHeadFirstCell.querySelector('forge-tooltip') as ITooltipComponent;

      expect(multiSelectTooltipElement).toBeTruthy();
      expect(multiSelectTooltipElement.innerText).toBe('Select All');

      const tableBodyRows = Array.from(harness.tableElement.tBodies[0].rows);
      data.forEach((_, index) => {
        const rowElement = tableBodyRows[index];
        const firstCell = rowElement.cells[0];
        const tooltipElement = firstCell.querySelector('forge-tooltip') as ITooltipComponent;

        expect(tooltipElement).toBeTruthy();
        expect(tooltipElement.innerText).toBe('Select');
      });
    });

    it('should execute tooltip callback for every row', async () => {
      const tooltipSelectCallback = vi.fn(getTooltipString);
      const harness = await createFixture();
      harness.component.select = true;
      harness.component.tooltipSelect = tooltipSelectCallback as any;
      harness.component.columnConfigurations = columns;
      harness.component.data = data;

      expect(tooltipSelectCallback).toHaveBeenCalledTimes(data.length);
    });

    it('should have proper default DOM state', async () => {
      const harness = await createFixture();
      expect(harness.tableElement.tHead).toBeNull();
      expect(harness.tableElement.tBodies.length).toBe(0);
      expect(harness.tableElement.classList.contains(TABLE_CONSTANTS.classes.TABLE)).toBe(true);
    });

    it('should set columns properly', async () => {
      const harness = await createFixture();
      await frame();
      harness.component.columnConfigurations = columns;

      expect(harness.component.columnConfigurations.length).toBe(columns.length);
      expect(harness.tableElement.tHead!.rows.length).toBe(1);
      expect(harness.tableElement.tHead!.rows.item(0)!.cells.length).toBe(columns.length);

      await frame();
      harness.component.resizable = true;
      harness.component.columnConfigurations = resizableColumns;
      expect(harness.tableElement.tHead!.rows.length).toBe(1);
      expect(harness.tableElement.tHead!.rows.item(0)!.cells.length).toBe(resizableColumns.length);
    });

    it('should toggle select column properly', async () => {
      const harness = await createFixture();
      harness.component.columnConfigurations = columns;
      harness.component.select = true;

      expect(harness.tableElement.tHead!.rows.item(0)!.cells.item(0)!.classList.contains(TABLE_CONSTANTS.classes.TABLE_CELL_SELECT)).toBe(true);
      expect(harness.tableElement.tHead!.rows.item(0)!.cells.length).toBe(columns.length + 1);

      harness.component.select = false;

      expect(harness.tableElement.tHead!.rows.item(0)!.cells.item(0)!.classList.contains(TABLE_CONSTANTS.classes.TABLE_CELL_SELECT)).toBe(false);
      expect(harness.tableElement.tHead!.rows.item(0)!.cells.length).toBe(columns.length);
    });

    it('should not set default sortable column', async () => {
      const harness = await createFixture();
      harness.component.columnConfigurations = columns;
      const headerRow = harness.getTableHeaderRow();
      const hasSortableCell = Array.from(headerRow.cells).some(c => c.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTABLE));
      expect(hasSortableCell).toBe(false);
    });

    it('should set initial sortable column', async () => {
      const harness = await createFixture();
      const testColumns: IColumnConfiguration[] = deepCopy(columns);
      testColumns[0].sortable = true;
      testColumns[1].sortable = true;
      testColumns[0].initialSort = true;

      harness.component.columnConfigurations = testColumns;

      const headerRow = harness.getTableHeaderRow();
      const firstCell = headerRow.cells.item(0) as HTMLTableHeaderCellElement;
      const secondCell = headerRow.cells.item(1) as HTMLTableHeaderCellElement;
      const activelySortedCells = Array.from(headerRow.cells).filter(
        c =>
          c.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_DESCENDING) ||
          c.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_ASCENDING)
      );
      const sortIconElement = firstCell.querySelector(`.${TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ICON}`);

      expect(firstCell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTABLE)).toBe(true);
      expect(secondCell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTABLE)).toBe(true);
      expect(firstCell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_DESCENDING)).toBe(true);
      expect(firstCell.getAttribute('aria-sort')).toBe('descending');
      expect(secondCell.hasAttribute('aria-sort')).toBe(false);
      expect(activelySortedCells.length).toBe(1);
      expect(sortIconElement).toBeTruthy();
      expect((sortIconElement as HTMLElement).classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ICON_ACTIVE)).toBe(true);
    });

    it('should hide columns', async () => {
      const harness = await createFixture();
      const testColumns: IColumnConfiguration[] = deepCopy(columns);
      testColumns[1].hidden = true;

      harness.component.columnConfigurations = testColumns;

      const headerRow = harness.getTableHeaderRow();

      expect(headerRow.cells.length).toBe(testColumns.length - 1);
    });

    it('should set correct sorted column index when hidden columns exist', async () => {
      const harness = await createFixture();
      const testColumns: IColumnConfiguration[] = deepCopy(columns);
      testColumns[1].hidden = true;
      testColumns[2].initialSort = true;

      harness.component.columnConfigurations = testColumns;

      expect(harness.core._sortedColumnIndex).toBe(1);
    });

    it('should not set data until columns are set', async () => {
      const harness = await createFixture();
      harness.component.data = data;

      const rows = harness.getTableBodyRows();
      expect(rows.length).toBe(0);
    });

    it('should reset data if data is not an array', async () => {
      const harness = await createFixture();
      harness.component.data = {} as any;
      const rows = harness.getTableBodyRows();
      expect(rows.length).toBe(0);
    });

    it('should set data properly', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;

      const rows = harness.getTableBodyRows();
      expect(rows.length).toBe(data.length);
    });

    it('should reset data properly', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.data = [data[0], data[1], data[2]];

      const rows = harness.getTableBodyRows();
      expect(rows.length).toBe(3);
    });

    it('should select row when clicked', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.selectKey = 'Id';

      const rows = harness.getTableBodyRows();
      const firstRow = rows[0] as HTMLTableRowElement;
      const firstCell = firstRow.cells.item(0) as HTMLTableCellElement;
      const selectCheckboxElement = firstCell.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;

      selectCheckboxElement.dispatchEvent(new PointerEvent('pointerdown'));

      expect(firstRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).toBe(true);
    });

    it('should select row when pressing space key', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.selectKey = 'Id';

      const rows = harness.getTableBodyRows();
      const firstRow = rows[0] as HTMLTableRowElement;
      const firstCell = firstRow.cells.item(0) as HTMLTableCellElement;
      const selectCheckboxElement = firstCell.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;

      selectCheckboxElement.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));

      expect(firstRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).toBe(true);
    });

    it('should not select row when clicking non-checkbox element', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.selectKey = 'Id';

      const rows = harness.getTableBodyRows();

      expect(rows[0].classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).toBe(false);
    });

    it('should not set select all listener if multiselect is off', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.multiselect = false;
      const tableConfig: ITableConfiguration = harness.core._tableConfiguration;
      expect(tableConfig.selectAllListener).toBeNull();
    });

    it('should emit select event when selecting a row', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;

      const callback = vi.fn();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SELECT, callback);

      const rows = harness.getTableBodyRows();
      const selectCheckboxElement = rows[0].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
      selectCheckboxElement.dispatchEvent(new PointerEvent('pointerdown'));

      expect(callback).toHaveBeenCalledOnce();
    });

    it('should emit body rendered events in order when table body renders', async () => {
      const harness = await createFixture();

      const templateBuilderCallback = vi.fn();
      const beforeRenderedCallback = vi.fn();
      const renderedCallback = vi.fn();

      const tableColumns: IColumnConfiguration[] = deepCopy(columns);
      tableColumns[0].template = templateBuilderCallback;
      harness.component.columnConfigurations = tableColumns;
      harness.component.addEventListener(TABLE_CONSTANTS.events.BEFORE_BODY_RENDERED, beforeRenderedCallback);
      harness.component.addEventListener(TABLE_CONSTANTS.events.BODY_RENDERED, renderedCallback);
      harness.component.data = deepCopy(data);

      // Check call order
      const beforeRenderedCallOrder = beforeRenderedCallback.mock.invocationCallOrder[0];
      const templateBuilderCallOrder = templateBuilderCallback.mock.invocationCallOrder[0];
      const renderedCallOrder = renderedCallback.mock.invocationCallOrder[0];

      expect(beforeRenderedCallOrder).toBeLessThan(templateBuilderCallOrder);
      expect(templateBuilderCallOrder).toBeLessThan(renderedCallOrder);
    });

    it('should emit select-double event when double clicking a row', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.allowRowClick = true;

      const selectDoubleCallback = vi.fn();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SELECT_DOUBLE, selectDoubleCallback);

      const selectCallback = vi.fn();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SELECT, selectCallback);

      const rows = harness.getTableBodyRows();
      rows[0].dispatchEvent(new MouseEvent('dblclick'));

      expect(selectDoubleCallback).toHaveBeenCalledOnce();
      expect(selectCallback).not.toHaveBeenCalled();
    });

    it('should emit click event on a row', async () => {
      const harness = await createFixture();
      harness.component.allowRowClick = true;
      harness.component.data = data;
      harness.component.columnConfigurations = columns;

      const clickListener = vi.fn();
      harness.component.addEventListener(TABLE_CONSTANTS.events.ROW_CLICK, clickListener);

      const selectCallback = vi.fn();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SELECT, selectCallback);

      const rows = harness.getTableBodyRows();
      rows[0].click();

      expect(clickListener).toHaveBeenCalledOnce();
      expect(selectCallback).not.toHaveBeenCalled();
    });

    it('should reattach click listeners on data set', async () => {
      const harness = await createFixture();
      harness.component.allowRowClick = true;
      harness.component.data = data;
      harness.component.columnConfigurations = columns;

      const clickListener = vi.fn();
      harness.component.addEventListener(TABLE_CONSTANTS.events.ROW_CLICK, clickListener);

      harness.component.data = [data[0], data[1]];

      const rows = harness.getTableBodyRows();
      rows[0].click();

      expect(clickListener).toHaveBeenCalledOnce();
    });

    it('should not emit click event if target is checkbox', async () => {
      const harness = await createFixture();
      harness.component.allowRowClick = true;
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.selectKey = 'Id';

      const clickListener = vi.fn();
      harness.component.addEventListener(TABLE_CONSTANTS.events.ROW_CLICK, clickListener);

      const rows = harness.getTableBodyRows();
      const selectCheckbox = rows[0].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
      selectCheckbox.click();

      expect(clickListener).not.toHaveBeenCalled();
    });

    it('should emit click event on a row when a cell is clicked with a custom template', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      delete testColumns[0].property;
      testColumns[0].template = () => '<button>Test</button>';

      harness.component.allowRowClick = true;
      harness.component.data = data;
      harness.component.columnConfigurations = testColumns;

      const clickListener = vi.fn();
      harness.component.addEventListener(TABLE_CONSTANTS.events.ROW_CLICK, clickListener);

      await frame();

      const rows = harness.getTableBodyRows();
      const button = rows[0].cells.item(0)!.querySelector('button') as HTMLButtonElement;
      button.click();

      expect(clickListener).toHaveBeenCalledOnce();
    });

    it('should not emit row click event when custom template is configured to stop click propagation', async () => {
      const harness = await createFixture();
      const button = document.createElement('button');
      button.textContent = 'Test';

      const testColumns = deepCopy(columns);
      testColumns.push({ template: () => button, stopCellTemplateClickPropagation: true });

      harness.component.allowRowClick = true;
      harness.component.data = data;
      harness.component.columnConfigurations = testColumns;

      const clickListener = vi.fn();
      harness.component.addEventListener(TABLE_CONSTANTS.events.ROW_CLICK, clickListener);

      await frame();

      button.dispatchEvent(new Event('click', { bubbles: true }));

      expect(clickListener).not.toHaveBeenCalled();
    });

    it('should not emit dblclick event if target is checkbox', async () => {
      const harness = await createFixture();
      harness.component.allowRowClick = true;
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.selectKey = 'Id';

      const dblclickListener = vi.fn();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SELECT_DOUBLE, dblclickListener);

      const rows = harness.getTableBodyRows();
      const selectCheckbox = rows[0].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
      selectCheckbox.dispatchEvent(new MouseEvent('dblclick'));

      expect(dblclickListener).not.toHaveBeenCalled();
    });

    it('should emit select all event', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;

      const callback = vi.fn();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SELECT_ALL, callback);

      const row = harness.getTableHeaderRow();
      const checkbox = row.cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
      checkbox.click();

      expect(callback).toHaveBeenCalledOnce();
    });

    it('should emit select all event after manually selecting all rows', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;

      const callback = vi.fn();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SELECT_ALL, callback);

      const rows = harness.getTableBodyRows();
      data.forEach((item, index) => {
        const selectCheckboxElement = rows[index].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
        selectCheckboxElement.dispatchEvent(new PointerEvent('pointerdown'));
      });

      expect(callback).toHaveBeenCalledOnce();
    });

    it('should select multiple rows when clicked', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;

      const rows = harness.getTableBodyRows();
      const firstRow = rows[0];
      const secondRow = rows[1];
      const firstRowfirstCell = firstRow.cells.item(0) as HTMLTableCellElement;
      const secondRowfirstCell = secondRow.cells.item(0) as HTMLTableCellElement;
      const firstRowSelectCheckboxElement = firstRowfirstCell.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
      const secondRowSelectCheckboxElement = secondRowfirstCell.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;

      firstRowSelectCheckboxElement.dispatchEvent(new PointerEvent('pointerdown'));
      secondRowSelectCheckboxElement.dispatchEvent(new PointerEvent('pointerdown'));

      expect(firstRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).toBe(true);
      expect(secondRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).toBe(true);
    });

    it('should select and deselect rows when clicked with multiselect off', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.multiselect = false;
      harness.component.selectKey = 'Id';

      const rows = harness.getTableBodyRows();
      const firstRow = rows[0];
      const secondRow = rows[1];
      const firstRowfirstCell = firstRow.cells.item(0) as HTMLTableCellElement;
      const secondRowfirstCell = secondRow.cells.item(0) as HTMLTableCellElement;
      const firstRowSelectCheckboxElement = firstRowfirstCell.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
      const secondRowSelectCheckboxElement = secondRowfirstCell.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;

      firstRowSelectCheckboxElement.dispatchEvent(new PointerEvent('pointerdown'));
      secondRowSelectCheckboxElement.dispatchEvent(new PointerEvent('pointerdown'));

      expect(firstRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).toBe(false);
      expect(secondRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).toBe(true);
    });

    it('should select and deselect rows when clicked', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.selectKey = 'Id';

      const rows = harness.getTableBodyRows();
      const firstRow = rows[0];
      const secondRow = rows[1];
      const firstRowfirstCell = firstRow.cells.item(0) as HTMLTableCellElement;
      const secondRowfirstCell = secondRow.cells.item(0) as HTMLTableCellElement;
      const firstRowSelectCheckboxElement = firstRowfirstCell.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
      const secondRowSelectCheckboxElement = secondRowfirstCell.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;

      firstRowSelectCheckboxElement.dispatchEvent(new PointerEvent('pointerdown'));
      secondRowSelectCheckboxElement.dispatchEvent(new PointerEvent('pointerdown'));

      expect(firstRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).toBe(true);
      expect(secondRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).toBe(true);

      firstRowSelectCheckboxElement.dispatchEvent(new PointerEvent('pointerdown'));
      secondRowSelectCheckboxElement.dispatchEvent(new PointerEvent('pointerdown'));

      expect(firstRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).toBe(false);
      expect(secondRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).toBe(false);
    });

    it('should select all and deselect all rows when clicking select all checkbox', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.selectKey = 'Id';

      const row = harness.getTableHeaderRow();
      const checkbox = row.cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
      checkbox.click();
      let selectedRows = harness.getTableBodyRows().filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).toBeGreaterThan(0);
      expect(selectedRows.length).toBe(data.length);

      checkbox.click();
      selectedRows = harness.getTableBodyRows().filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).toBe(0);
    });

    it.skip('should not update a row if the row is unselectable when clicking select all checkbox', async () => {
      const harness = await createFixture();
      const testData = deepCopy(data);
      testData[0].disabled = true;

      harness.component.data = testData;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.selectKey = 'Id';

      const row = harness.getTableHeaderRow();
      const checkbox = row.cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
      checkbox.click();

      const rows = harness.getTableBodyRows();
      const selectedRows = rows.filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).toBe(data.length - 1);
    });

    it('should not emit sort event when right clicking sortable column', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;

      harness.component.columnConfigurations = testColumns;

      const callback = vi.fn();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback);

      const headerRow = harness.getTableHeaderRow();
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      const button = firstCell.querySelector('button') as HTMLButtonElement;
      button.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, button: 2 }));
      button.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, button: 2 }));

      expect(callback).not.toHaveBeenCalled();
    });

    it('should update select all state if a row selection completes all selected rows', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.selectKey = 'Id';

      const allButLastRows = data.filter((d, i) => i + 1 < data.length);
      harness.component.selectRows([...allButLastRows], false);

      expect(harness.component.getSelectedRows().length).toBeLessThan(data.length);
      expect(harness.core._isAllSelected).toBe(false);

      harness.component.selectRows([data[data.length - 1]], true);

      expect(harness.component.getSelectedRows().length).toBe(data.length);
      expect(harness.core._isAllSelected).toBe(true);
    });

    it('should not update select all state if a row selection completes all selected rows and multiselect is off', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.selectKey = 'Id';

      const allButLastRows = data.filter((d, i) => i + 1 < data.length);
      harness.component.selectRows([...allButLastRows], false);

      await frame();

      expect(harness.component.getSelectedRows().length).toBeLessThan(data.length);
      expect(harness.core._isAllSelected).toBe(false);

      harness.component.multiselect = false;

      await frame();

      harness.component.selectRows([data[data.length - 1]], true);

      expect(harness.component.getSelectedRows().length).toBe(1);
      expect(harness.core._isAllSelected).toBe(false);
    });

    it('should set layout type', async () => {
      const harness = await createFixture();

      harness.component.layoutType = 'fixed' as TableLayoutType;
      harness.component.render();
      expect(harness.tableElement.classList.contains(TABLE_CONSTANTS.classes.TABLE_LAYOUT_FIXED)).toBe(true);
      expect(harness.core._tableConfiguration.layoutType).toBe('fixed');

      harness.component.layoutType = 'auto' as TableLayoutType;
      harness.component.render();
      expect(harness.tableElement.classList.contains(TABLE_CONSTANTS.classes.TABLE_LAYOUT_FIXED)).toBe(false);
      expect(harness.core._tableConfiguration.layoutType).toBe('auto');
    });

    it('should set dense state', async () => {
      const harness = await createFixture();

      harness.component.dense = true;
      harness.component.render();
      expect(harness.tableElement.classList.contains(TABLE_CONSTANTS.classes.TABLE_DENSE)).toBe(true);
      expect(harness.component.getAttribute(TABLE_CONSTANTS.attributes.DENSE)).toBe('true');
      expect(harness.core._tableConfiguration.dense).toBe(true);

      harness.component.dense = false;
      harness.component.render();
      expect(harness.tableElement.classList.contains(TABLE_CONSTANTS.classes.TABLE_DENSE)).toBe(false);
      expect(harness.component.getAttribute(TABLE_CONSTANTS.attributes.DENSE)).toBe('false');
      expect(harness.core._tableConfiguration.dense).toBe(false);
    });

    it('should set resizable', async () => {
      const harness = await createFixture();

      harness.component.resizable = false;
      harness.component.render();
      expect(harness.tableElement.classList.contains(TABLE_CONSTANTS.classes.TABLE_RESIZABLE)).toBe(false);
      expect(harness.core._tableConfiguration.resizable).toBe(false);

      harness.component.resizable = true;
      harness.component.render();
      expect(harness.tableElement.classList.contains(TABLE_CONSTANTS.classes.TABLE_RESIZABLE)).toBe(true);
      expect(harness.core._tableConfiguration.resizable).toBe(true);
    });

    it('should set fixed headers state', async () => {
      const harness = await createFixture();

      harness.component.fixedHeaders = false;
      harness.component.render();
      expect(harness.tableElement.classList.contains(TABLE_CONSTANTS.classes.TABLE_FIXED)).toBe(false);
      expect(harness.core._tableConfiguration.fixedHeaders).toBe(false);

      harness.component.fixedHeaders = true;
      harness.component.render();
      expect(harness.tableElement.classList.contains(TABLE_CONSTANTS.classes.TABLE_FIXED)).toBe(true);
      expect(harness.core._tableConfiguration.fixedHeaders).toBe(true);
    });

    it('should set wrap content', async () => {
      const harness = await createFixture();

      harness.component.wrapContent = true;
      harness.component.render();
      expect(harness.tableElement.classList.contains(TABLE_CONSTANTS.classes.TABLE_NO_WRAP_CONTENT)).toBe(false);
      expect(harness.core._tableConfiguration.wrapContent).toBe(true);

      harness.component.wrapContent = false;
      harness.component.render();
      expect(harness.tableElement.classList.contains(TABLE_CONSTANTS.classes.TABLE_NO_WRAP_CONTENT)).toBe(true);
      expect(harness.core._tableConfiguration.wrapContent).toBe(false);
    });

    it('should set min resize width state', async () => {
      const harness = await createFixture();
      harness.component.minResizeWidth = 10;
      expect(harness.component.minResizeWidth).toBe(10);
    });

    it('should default min resize width when no number is provided', async () => {
      const harness = await createFixture();
      harness.component.minResizeWidth = 'a' as any;
      expect(harness.component.minResizeWidth).toBe(100);
    });

    it('should set min resize width zero when a negative number is provided', async () => {
      const harness = await createFixture();
      harness.component.minResizeWidth = -5;
      expect(harness.component.minResizeWidth).toBe(0);
    });

    it('should set filter', async () => {
      const harness = await createFixture();

      harness.component.filter = true;
      harness.component.render();
      expect(harness.tableElement.classList.contains(TABLE_CONSTANTS.classes.TABLE_FILTER_VISIBLE)).toBe(true);
      expect(harness.core._tableConfiguration.filter).toBe(true);

      harness.component.filter = false;
      harness.component.render();
      expect(harness.tableElement.classList.contains(TABLE_CONSTANTS.classes.TABLE_FILTER_VISIBLE)).toBe(false);
      expect(harness.core._tableConfiguration.filter).toBe(false);
    });

    it('should set allow row click', async () => {
      const harness = await createFixture();
      harness.component.columnConfigurations = columns;
      harness.component.data = data;

      harness.component.allowRowClick = true;
      expect(harness.component.allowRowClick).toBe(true);

      const rows = harness.getTableBodyRows();
      const hasClickableClass = rows.every(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_CLICKABLE));
      expect(hasClickableClass).toBe(true);
    });

    it('should apply clickable class when data changes', async () => {
      const harness = await createFixture();
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.allowRowClick = true;

      harness.component.data = [...harness.component.data];

      const rows = harness.getTableBodyRows();
      const hasClickableClass = rows.every(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_CLICKABLE));
      expect(hasClickableClass).toBe(true);
    });

    it('should set select rows from code', async () => {
      const harness = await createFixture();
      harness.component.select = true;
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.selectKey = 'Id';

      const rows = harness.getTableBodyRows();
      const firstRow = rows[0];
      const secondRow = rows[1];

      harness.component.selectRows([data[0], data[1]]);

      expect(firstRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).toBe(true);
      expect(secondRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).toBe(true);
    });

    it('should select rows if select is false', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.data = data;
      harness.component.columnConfigurations = columns;

      harness.component.selectRow(data[0]);

      const selectedRows = harness.getTableBodyRows().filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).toBe(1);
    });

    it('should not deselect rows if select is turned off', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;

      harness.component.deselectRow(data[0]);

      const selectedRows = harness.getTableBodyRows().filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).toBe(0);
    });

    it('should not select rows if data is undefined', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.selectRows(undefined as any);

      const selectedRows = harness.getTableBodyRows().filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).toBe(0);
    });

    it('should not deselect rows if data is undefined', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.deselectRows(undefined as any);

      const selectedRows = harness.getTableBodyRows().filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).toBe(0);
    });

    it('should emit sort event when clicking sortable column', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;

      harness.component.columnConfigurations = testColumns;

      const callback = vi.fn();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback);

      const headerRow = harness.getTableHeaderRow();
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      clickTableCell(firstCell);

      expect(callback).toHaveBeenCalledOnce();
    });

    it('should emit sort event when pressing space key on sortable column', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;

      harness.component.columnConfigurations = testColumns;

      const callback = vi.fn();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback);

      const headerRow = harness.getTableHeaderRow();
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      firstCell.querySelector('button')?.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));

      expect(callback).toHaveBeenCalledOnce();
    });

    it('should emit sort event when pressing enter key on sortable column', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;

      harness.component.columnConfigurations = testColumns;

      const callback = vi.fn();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback);

      const headerRow = harness.getTableHeaderRow();
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      firstCell.querySelector('button')?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      expect(callback).toHaveBeenCalledOnce();
    });

    it('should not emit sort event clicking non-sortable column', async () => {
      const harness = await createFixture();
      harness.component.columnConfigurations = columns;

      const callback = vi.fn();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback);

      const headerRow = harness.getTableHeaderRow();
      headerRow.cells.item(0)!.click();

      expect(callback).not.toHaveBeenCalled();
    });

    it('should not emit sort event pressing enter or space key on non-sortable column', async () => {
      const harness = await createFixture();
      harness.component.columnConfigurations = columns;

      const callback = vi.fn();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback);

      const headerRow = harness.getTableHeaderRow();
      headerRow.cells.item(0)!.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
      headerRow.cells.item(0)!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      expect(callback).not.toHaveBeenCalled();
    });

    it('should toggle sort direction when clicking same column', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;

      harness.component.columnConfigurations = testColumns;

      const headerRow = harness.getTableHeaderRow();
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;

      clickTableCell(firstCell);
      expect(firstCell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_ASCENDING)).toBe(true);
      expect(firstCell.getAttribute('aria-sort')).toBe('ascending');

      clickTableCell(firstCell);
      expect(firstCell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_DESCENDING)).toBe(true);
      expect(firstCell.getAttribute('aria-sort')).toBe('descending');
    });

    it('should not sort column when clicking non-sortable column', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;

      harness.component.columnConfigurations = testColumns;

      const headerRow = harness.getTableHeaderRow();
      const secondCell = headerRow.cells.item(1) as HTMLTableCellElement;
      const sortIconElement = secondCell.querySelector(`.${TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ICON}`);

      const callback = vi.fn();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback);

      secondCell.click();

      const hasSortClass =
        secondCell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_DESCENDING) ||
        secondCell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_ASCENDING);

      expect(callback).not.toHaveBeenCalled();
      expect(hasSortClass).toBe(false);
      expect(secondCell.hasAttribute('aria-sort')).toBe(false);
      expect(sortIconElement).toBeNull();
    });

    it('should move sort icon from sorted column to newly sorted column', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;
      testColumns[1].sortable = true;

      harness.component.columnConfigurations = testColumns;

      const headerRow = harness.getTableHeaderRow();
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      const secondCell = headerRow.cells.item(1) as HTMLTableCellElement;

      clickTableCell(firstCell);
      clickTableCell(secondCell);

      const firstCellSortIcon = firstCell.querySelector(`.${TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ICON}`) as HTMLElement;
      const secondCellSortIcon = secondCell.querySelector(`.${TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ICON}`) as HTMLElement;

      expect(firstCell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_ASCENDING)).toBe(false);
      expect(firstCell.hasAttribute('aria-sort')).toBe(false);
      expect(secondCell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_ASCENDING)).toBe(true);
      expect(secondCell.getAttribute('aria-sort')).toBe('ascending');
      expect(firstCellSortIcon.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ICON_ACTIVE)).toBe(false);
      expect(secondCellSortIcon.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ICON_ACTIVE)).toBe(true);
    });

    it('should not move sort icon from sorted column to newly sorted column when sort event has preventDefault applied', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;
      testColumns[1].sortable = true;

      harness.component.columnConfigurations = testColumns;

      const headerRow = harness.getTableHeaderRow();
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      const secondCell = headerRow.cells.item(1) as HTMLTableCellElement;

      clickTableCell(firstCell);

      harness.component.addEventListener('forge-table-sort', evt => {
        evt.preventDefault();
      });

      clickTableCell(secondCell);

      const firstCellSortIcon = firstCell.querySelector(`.${TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ICON}`) as HTMLElement;
      const secondCellSortIcon = secondCell.querySelector(`.${TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ICON}`) as HTMLElement;

      expect(firstCell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_ASCENDING)).toBe(true);
      expect(firstCell.getAttribute('aria-sort')).toBe('ascending');
      expect(secondCell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_ASCENDING)).toBe(false);
      expect(secondCell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_DESCENDING)).toBe(false);
      expect(secondCell.hasAttribute('aria-sort')).toBe(false);
      expect(firstCellSortIcon.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ICON_ACTIVE)).toBe(true);
      expect(secondCellSortIcon.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ICON_ACTIVE)).toBe(false);
    });

    it('Sort event data should still be available when the event has prevent default applied', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;
      testColumns[1].sortable = true;

      harness.component.columnConfigurations = testColumns;

      const headerRow = harness.getTableHeaderRow();
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      const secondCell = headerRow.cells.item(1) as HTMLTableCellElement;

      clickTableCell(firstCell);

      let direction = '';
      let columnIndex = -1;
      harness.component.addEventListener('forge-table-sort', (evt: CustomEvent) => {
        evt.preventDefault();
        direction = evt.detail.direction;
        columnIndex = evt.detail.columnIndex;
      });

      clickTableCell(secondCell);

      expect(direction).toBe(SortDirection.Ascending);
      expect(columnIndex).toBe(1);
    });

    it('should not emit sort event if select column cell is clicked', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.multiselect = false;
      harness.component.selectKey = 'Id';

      const callback = vi.fn();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback);

      const headerRow = harness.getTableHeaderRow();
      headerRow.cells.item(0)!.click();

      expect(callback).not.toHaveBeenCalled();
    });

    it('should not set host attribute for select key if is array type', async () => {
      const harness = await createFixture();
      harness.component.selectKey = ['Id'];

      expect(harness.component.hasAttribute(TABLE_CONSTANTS.attributes.SELECT_KEY)).toBe(false);
    });

    it('clear selections', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.selectKey = 'Id';

      harness.component.selectRow(data[0]);
      harness.component.selectRows([data[0], data[1]], true);
      harness.component.clearSelections();

      const selectedRows = harness.getTableBodyRows().filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).toBe(0);
    });

    it('should not clear selections when hiding select column', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.selectKey = 'Id';

      harness.component.selectRows([data[0], data[1]]);
      harness.component.select = false;

      const selectedRows = harness.getTableBodyRows().filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).toBe(2);
    });

    it('should not clear selections when turning multiselect off', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.selectKey = 'Id';

      harness.component.selectRows([data[0], data[1]]);
      harness.component.multiselect = false;

      const selectedRows = harness.getTableBodyRows().filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).toBe(2);
    });

    it('should preserve selections when turning multiselect on', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.selectKey = 'Id';
      harness.component.multiselect = false;

      harness.component.selectRow(data[0]);
      harness.component.multiselect = true;

      const selectedRows = harness.getTableBodyRows().filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).toBe(1);
    });

    it('should preserve selections when turning preserveExisting on', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.selectKey = 'Id';
      harness.component.multiselect = true;

      harness.component.selectRows([data[0]]);
      let selectedRows = harness.getTableBodyRows().filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));
      expect(selectedRows.length).toBe(1);

      await frame();

      harness.component.selectRows([data[1]], true);
      selectedRows = harness.getTableBodyRows().filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));
      expect(selectedRows.length).toBe(2);
    });

    it('should hide column', async () => {
      const harness = await createFixture();
      harness.component.columnConfigurations = columns;
      harness.component.hideColumn(0);

      const headerRow = harness.getTableHeaderRow();

      expect(headerRow.cells.length).toBe(columns.length - 1);
    });

    it('should return whether a column is hidden or not', async () => {
      const harness = await createFixture();
      harness.component.columnConfigurations = columns;
      harness.component.hideColumn(0);

      expect(harness.component.isColumnHidden(0)).toBe(true);
      expect(harness.component.isColumnHidden(1)).toBe(false);
    });

    it('should reset the sorted column on hide column', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;
      testColumns[1].sortable = true;

      harness.component.columnConfigurations = testColumns;
      const headerRow = harness.getTableHeaderRow();
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;

      clickTableCell(firstCell);
      expect(harness.core._sortedColumnIndex).toBeGreaterThan(-1);
      harness.component.hideColumn(0);
      expect(harness.core._sortedColumnIndex).toBe(-1);
    });

    it('should not create column config if config already exist on column hide', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;
      testColumns[1].sortable = true;

      harness.component.columnConfigurations = testColumns;

      expect(harness.core._hiddenColumnManager.count()).toBe(0);
      harness.component.hideColumn(0);
      expect(harness.core._hiddenColumnManager.count()).toBe(1);
      harness.component.hideColumn(0);
      expect(harness.core._hiddenColumnManager.count()).toBe(1);
    });

    it('should show column', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].hidden = true;

      harness.component.columnConfigurations = testColumns;
      harness.component.showColumn(0);

      const headerRow = harness.getTableHeaderRow();

      expect(headerRow.cells.length).toBe(columns.length);
    });

    it('should not remove column config if config already exist on column show', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;
      testColumns[1].sortable = true;

      harness.component.columnConfigurations = testColumns;

      harness.component.hideColumn(0);
      expect(harness.core._hiddenColumnManager.count()).toBe(1);
      harness.component.showColumn(0);
      expect(harness.core._hiddenColumnManager.count()).toBe(0);
      harness.component.showColumn(0);
      expect(harness.core._hiddenColumnManager.count()).toBe(0);
    });

    it('should get selected rows', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.selectKey = 'Id';

      harness.component.selectRows([data[0], data[1]]);
      expect(harness.component.getSelectedRows().length).toBe(2);
    });

    it('should deselect rows', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.selectKey = 'Id';

      harness.component.selectRows([data[0], data[1], data[2]]);
      harness.component.deselectRow(data[0]);
      harness.component.deselectRows([data[1], data[2]]);

      const selectedRows = harness.getTableBodyRows().filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).toBe(0);
    });

    it('should render table properly', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;

      harness.component.render();

      const headerRow = harness.getTableHeaderRow();
      const rows = harness.getTableBodyRows();

      expect(headerRow.cells.length).toBe(columns.length);
      expect(rows.length).toBe(data.length);
    });

    it('should expand a collapsed row', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;

      harness.component.render();

      harness.component.expandRow(0, '');
      expect(harness.component.isRowExpanded(0)).toBe(true);
    });

    it('should throw if table has not rendered and it expands a collapsed row', async () => {
      const harness = await createFixture();
      expect(() => harness.component.expandRow(0, '')).toThrow('Cannot expand a row before the table has rendered.');
    });

    it('should throw if a negative row index is used on expand row', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;

      harness.component.render();

      expect(() => harness.component.expandRow(-1, '')).toThrow('Invalid row index: -1.');
    });

    it('should throw if the row index is greater than the number of table rows on expand row', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;

      harness.component.render();
      const rows = harness.getTableBodyRows();
      expect(() => harness.component.expandRow(rows.length + 1, '')).toThrow(`Invalid row index: ${rows.length + 1}.`);
    });

    it('should collapse an expanded row', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;

      harness.component.render();

      harness.component.expandRow(0, '');

      harness.component.render();

      harness.component.collapseRow(0);

      expect(harness.component.isRowExpanded(0)).toBe(false);
    });

    it('should not collapse an expanded row if the table has not rendered', async () => {
      const harness = await createFixture();
      expect(harness.core._rendered).toBe(false);
      let resolved = false;
      harness.component.collapseRow(0).then(() => (resolved = true));

      await frame();
      expect(harness.core._rendered).toBe(false);
      expect(resolved).toBe(true);
    });

    it('should not collapse if a negative row index is used on collapse row', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      let resolved = false;
      harness.component.render();

      harness.component.collapseRow(-1).then(() => (resolved = true));

      await frame();
      expect(resolved).toBe(true);
    });

    it('should not collapse if the row index is greater than table rows on collapse row', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      let resolved = false;
      harness.component.render();
      const rows = harness.getTableBodyRows();

      harness.component.collapseRow(rows.length + 1).then(() => (resolved = true));

      await frame();
      expect(resolved).toBe(true);
    });

    it('should reselect rows after table render', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.selectKey = 'Id';

      harness.component.selectRows([data[0], data[1]]);
      harness.component.render();

      const selectedRows = harness.getTableBodyRows().filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).toBe(2);
    });

    it('should reselect rows after table data changes', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.selectKey = 'Id';

      harness.component.selectRows([data[0], data[1]]);
      harness.component.data = [data[0], data[2], data[3]];

      const selectedRows = harness.getTableBodyRows().filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).toBe(1);
    });

    it('should not render rows if no columns have been set but data changes', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.data = [data[0], data[2], data[3]];

      const rows = harness.getTableBodyRows();

      expect(rows.length).toBe(0);
    });

    it('should set width of column from configuration', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns.push({ header: 'Column Four' });
      testColumns.push({ header: 'Column Five' });

      testColumns[0].width = 500;
      testColumns[1].width = '500px';
      testColumns[2].width = '50%';
      testColumns[3].width = '100';
      testColumns[4].width = -1;

      harness.component.data = data;
      harness.component.columnConfigurations = testColumns;

      const headerRow = harness.getTableHeaderRow();

      expect(headerRow.cells.item(0)!.style.width).toBe('500px');
      expect(headerRow.cells.item(1)!.style.width).toBe('500px');
      expect(headerRow.cells.item(2)!.style.width).toBe('50%');
      expect(headerRow.cells.item(3)!.style.width).toBe('100px');
      expect(headerRow.cells.item(4)!.style.width).toBe('');
    });

    it('should set cell alignment from configuration', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].align = CellAlign.Center;
      testColumns[1].align = CellAlign.Right;

      harness.component.data = data;
      harness.component.columnConfigurations = testColumns;

      const headerRow = harness.getTableHeaderRow();
      const rows = harness.getTableBodyRows();
      const headerColumnOneCellContainer = headerRow.cells.item(0)!.firstElementChild as HTMLElement;
      const rowColumnOneCellContainer = rows[0].cells.item(0)!.firstElementChild as HTMLElement;
      const headerColumnTwoCellContainer = headerRow.cells.item(1)!.firstElementChild as HTMLElement;
      const rowColumnTwoCellContainer = rows[0].cells.item(1)!.firstElementChild as HTMLElement;

      expect(headerColumnOneCellContainer.classList.contains(TABLE_CONSTANTS.classes.TABLE_CELL_CENTER)).toBe(true);
      expect(rowColumnOneCellContainer.classList.contains(TABLE_CONSTANTS.classes.TABLE_CELL_CENTER)).toBe(true);

      expect(headerColumnTwoCellContainer.classList.contains(TABLE_CONSTANTS.classes.TABLE_CELL_RIGHT)).toBe(true);
      expect(rowColumnTwoCellContainer.classList.contains(TABLE_CONSTANTS.classes.TABLE_CELL_RIGHT)).toBe(true);
    });

    it('should set column cell template from configuration as string', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      delete testColumns[0].property;
      testColumns[0].template = () => '<button></button>';

      harness.component.data = data;
      harness.component.columnConfigurations = testColumns;

      const rows = harness.getTableBodyRows();

      await frame();
      const everyRowCellContainsTemplate = rows.every(r => r.cells.item(0)!.querySelector('button') !== null);
      expect(everyRowCellContainsTemplate).toBe(true);
    });

    it('should set column cell template from configuration as element', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      delete testColumns[0].property;
      testColumns[0].template = () => document.createElement('button');

      harness.component.data = data;
      harness.component.columnConfigurations = testColumns;

      const rows = harness.getTableBodyRows();

      await frame();
      const everyRowCellContainsTemplate = rows.every(r => r.cells.item(0)!.querySelector('button') !== null);
      expect(everyRowCellContainsTemplate).toBe(true);
    });

    it('should transform cell data using transform from configuration', async () => {
      const harness = await createFixture();
      const testColumns: IColumnConfiguration[] = deepCopy(columns);
      testColumns[0].transform = (value: string) => 'transformed';

      harness.component.data = data;
      harness.component.columnConfigurations = testColumns;

      const rows = harness.getTableBodyRows();

      await frame();
      const everyRowCellUppercase = rows.every((r, index) => (r.cells.item(0)!.firstElementChild as HTMLElement).innerText === 'transformed');
      expect(everyRowCellUppercase).toBe(true);
    });

    it('should not show filter row when no columns are defined to have filters', async () => {
      const harness = await createFixture();
      const testColumns: IColumnConfiguration[] = deepCopy(columns);
      harness.component.data = data;
      harness.component.columnConfigurations = testColumns;
      harness.component.filter = true;

      const lastTableRow = getLastTableHeaderRow(harness.tableElement);
      expect(lastTableRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_ROW_FILTER)).toBe(false);
    });

    it('should show filter row when at least one column has a filter', async () => {
      const harness = await createFixture();
      const testColumns: IColumnConfiguration[] = deepCopy(columns);
      testColumns[0].filter = true;

      harness.component.data = data;
      harness.component.columnConfigurations = testColumns;
      harness.component.filter = true;

      const lastTableRow = getLastTableHeaderRow(harness.tableElement);
      expect(lastTableRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_ROW_FILTER)).toBe(true);
    });

    it('should show filter components in correct cells', async () => {
      const harness = await createFixture();
      const testColumns: IColumnConfiguration[] = deepCopy(columns);
      testColumns[0].filter = true;
      testColumns[0].filterDelegate = new TextFieldComponentDelegate();

      harness.component.data = data;
      harness.component.columnConfigurations = testColumns;
      harness.component.filter = true;

      const lastTableRow = getLastTableHeaderRow(harness.tableElement);
      let firstFilterCellIndex = harness.component.select && harness.component.multiselect ? 1 : 0;
      expect(lastTableRow.cells.item(firstFilterCellIndex++)!.querySelector('input[type=text]')).toBeTruthy();
      expect(lastTableRow.cells.item(firstFilterCellIndex++)!.querySelector('input[type=text]')).toBeNull();
      expect(lastTableRow.cells.item(firstFilterCellIndex++)!.querySelector('input[type=text]')).toBeNull();
    });

    it('should emit filter event when modifying filter component', async () => {
      const harness = await createFixture();
      const testColumns: IColumnConfiguration[] = deepCopy(columns);
      testColumns[0].filter = true;
      testColumns[0].filterDelegate = new TextFieldComponentDelegate();
      const filterDebounceTime = testColumns[0].filterDebounceTime || TABLE_CONSTANTS.numbers.DEFAULT_FILTER_DEBOUNCE_TIME;

      harness.component.data = data;
      harness.component.columnConfigurations = testColumns;
      harness.component.filter = true;

      const lastTableRow = getLastTableHeaderRow(harness.tableElement);
      const firstFilterCellIndex = harness.component.select && harness.component.multiselect ? 1 : 0;
      const filterInputElement = lastTableRow.cells.item(firstFilterCellIndex)!.querySelector('input[type=text]') as HTMLInputElement;

      const filterCallback = vi.fn((evt: CustomEvent) => {
        const evtData = evt.detail as ITableFilterEventData;
        expect(evtData.value).toBe('a');
        expect(evtData.columnIndex).toBe(0);
      });
      harness.component.addEventListener(TABLE_CONSTANTS.events.FILTER, filterCallback as any);

      filterInputElement.value = 'a';
      filterInputElement.dispatchEvent(new Event('input'));

      await task(filterDebounceTime);

      expect(filterCallback).toHaveBeenCalledOnce();
    });

    it('should remove resize handle when resizable is turned off', async () => {
      const harness = await createFixture();
      harness.component.resizable = true;
      harness.component.columnConfigurations = resizableColumns;

      harness.component.resizable = false;
      const firstCell = harness.getTableHeaderRow().cells.item(0) as HTMLTableHeaderCellElement;
      const resizeHandle = firstCell.querySelector(`.${TABLE_CONSTANTS.classes.TABLE_RESIZE_HANDLE}`);

      expect(resizeHandle).toBeNull();
    });

    it('should resize columns when the resize handle is moved', async () => {
      const harness = await createFixture();
      harness.component.resizable = true;
      harness.component.columnConfigurations = resizableColumns;

      const firstCell = harness.getTableHeaderRow().cells.item(0) as HTMLTableHeaderCellElement;
      const originalWidth = firstCell.offsetWidth;
      const resizeHandle = getTableResizeHandle(harness.tableElement);

      resizeHandle.dispatchEvent(new MouseEvent('mousedown', { clientX: firstCell.offsetWidth, clientY: 0, bubbles: true }));
      harness.core._onMouseMove(new MouseEvent('mousemove', { clientX: originalWidth + 100, clientY: 0, bubbles: true }));
      harness.core._onMouseUp(new MouseEvent('mouseup', { clientX: originalWidth + 100, clientY: 0, bubbles: true }));

      expect(firstCell.style.width).toBe(`${originalWidth + 100}px`);
    });

    it('should emit event when column has been resized', async () => {
      const harness = await createFixture();
      harness.component.resizable = true;
      harness.component.columnConfigurations = resizableColumns;

      const resizeCallback = vi.fn();
      harness.component.addEventListener(TABLE_CONSTANTS.events.COLUMN_RESIZE, resizeCallback);

      const firstCell = harness.getTableHeaderRow().cells.item(0) as HTMLTableHeaderCellElement;
      const originalWidth = firstCell.offsetWidth;
      const resizeHandle = getTableResizeHandle(harness.tableElement);

      resizeHandle.dispatchEvent(new MouseEvent('mousedown', { clientX: firstCell.offsetWidth, clientY: 0, bubbles: true }));
      harness.core._onMouseMove(new MouseEvent('mousemove', { clientX: originalWidth + 100, clientY: 0, bubbles: true }));
      harness.core._onMouseUp(new MouseEvent('mouseup', { clientX: originalWidth + 100, clientY: 0, bubbles: true }));

      expect(resizeCallback).toHaveBeenCalledOnce();
    });

    it('should set width to min-resize-width when column width is smaller than min width when resize handle is moved', async () => {
      const harness = await createFixture();
      harness.component.resizable = true;
      harness.component.minResizeWidth = 100;
      harness.component.columnConfigurations = resizableColumns;

      const firstCell = harness.getTableHeaderRow().cells.item(0) as HTMLTableHeaderCellElement;
      const resizeHandle = getTableResizeHandle(harness.tableElement);

      resizeHandle.dispatchEvent(new MouseEvent('mousedown', { clientX: firstCell.offsetWidth, clientY: 0, bubbles: true }));
      harness.core._onMouseMove(new MouseEvent('mousemove', { clientX: 50, clientY: 0, bubbles: true }));
      harness.core._onMouseUp(new MouseEvent('mouseup', { clientX: 50, clientY: 0, bubbles: true }));

      expect(firstCell.style.width).toBe('100px');
    });

    it('should not set width to min-resize-width when column width is larger than min width when resize handle is moved', async () => {
      const harness = await createFixture();
      harness.component.resizable = true;
      harness.component.minResizeWidth = 10;
      harness.component.columnConfigurations = resizableColumns;

      const firstCell = harness.getTableHeaderRow().cells.item(0) as HTMLTableHeaderCellElement;
      const originalWidth = firstCell.offsetWidth;
      const resizeHandle = getTableResizeHandle(harness.tableElement);

      resizeHandle.dispatchEvent(new MouseEvent('mousedown', { clientX: firstCell.offsetWidth, clientY: 0, bubbles: true }));
      harness.core._onMouseMove(new MouseEvent('mousemove', { clientX: originalWidth - 10, clientY: 0, bubbles: true }));
      harness.core._onMouseUp(new MouseEvent('mouseup', { clientX: originalWidth - 10, clientY: 0, bubbles: true }));

      expect(parseInt(firstCell.style.width, 10)).toBeGreaterThan(10);
    });

    it('should select multiple rows on shift click', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.selectKey = 'Id';
      harness.component.multiselect = true;

      const rows = harness.getTableBodyRows();
      const checkbox1 = rows[0].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
      const checkbox2 = rows[3].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;

      checkbox1.dispatchEvent(new PointerEvent('pointerdown'));
      checkbox2.dispatchEvent(new PointerEvent('pointerdown', { shiftKey: true }));

      const selectedRows = harness.component.getSelectedRows();
      expect(selectedRows.length).toBe(4);
    });

    it('should emit multiple select events on shift click', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.selectKey = 'Id';
      harness.component.multiselect = true;

      const callback = vi.fn();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SELECT, callback);

      const rows = harness.getTableBodyRows();
      const checkbox1 = rows[0].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
      const checkbox2 = rows[3].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;

      checkbox1.dispatchEvent(new PointerEvent('pointerdown'));
      checkbox2.dispatchEvent(new PointerEvent('pointerdown', { shiftKey: true }));

      expect(callback).toHaveBeenCalledTimes(4);
    });

    it('should de-select the rows when the checkbox is already selected', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.selectKey = 'Id';
      harness.component.multiselect = true;

      const rows = harness.getTableBodyRows();
      const checkbox1 = rows[0].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
      const checkbox2 = rows[3].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;

      checkbox1.dispatchEvent(new PointerEvent('pointerdown'));
      checkbox2.dispatchEvent(new PointerEvent('pointerdown', { shiftKey: true }));
      checkbox1.dispatchEvent(new PointerEvent('pointerdown'));
      checkbox2.dispatchEvent(new PointerEvent('pointerdown', { shiftKey: true }));

      const selectedRows = harness.getTableBodyRows().filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));
      expect(selectedRows.length).toBe(0);
    });

    it('should not emit sort event when right clicking sortable column (duplicate)', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;

      harness.component.columnConfigurations = testColumns;

      const callback = vi.fn();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback);

      const headerRow = harness.getTableHeaderRow();
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      const button = firstCell.querySelector('button') as HTMLButtonElement;
      button.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, button: 2 }));
      button.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, button: 2 }));

      expect(callback).not.toHaveBeenCalled();
    });

    it('should select the first row by index', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.selectKey = 'Id';
      harness.component.multiselect = true;

      harness.component.selectRowsByIndex(0);

      const rows = harness.getTableBodyRows();
      expect(rows[0].classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).toBe(true);
    });

    it('should check if row is selected by the data object', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.selectKey = 'Id';

      harness.component.selectRow(data[0]);

      expect(harness.component.isRowSelected(data[0])).toBe(true);
    });

    it('should select then deselect the first row by index', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.selectKey = 'Id';

      harness.component.selectRowsByIndex(0);
      harness.component.deselectRowsByIndex(0);

      const rows = harness.getTableBodyRows();
      expect(rows[0].classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).toBe(false);
    });

    it('should select then deselect the multiple rows by index', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.selectKey = 'Id';

      harness.component.selectRowsByIndex([0, 1]);
      harness.component.deselectRowsByIndex([0, 1]);

      const rows = harness.getTableBodyRows();
      expect(rows[0].classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).toBe(false);
      expect(rows[1].classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).toBe(false);
    });

    it('should show indeterminate checkbox when some are selected', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.multiselect = true;
      harness.component.selectKey = 'Id';

      harness.component.selectRowsByIndex(0);

      const headerRow = harness.getTableHeaderRow();
      const selectAllCheckbox = headerRow.cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLInputElement;

      expect(selectAllCheckbox.indeterminate).toBe(true);
    });

    it('should change to checked when click on indeterminate', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.multiselect = true;
      harness.component.selectKey = 'Id';

      harness.component.selectRowsByIndex(0);

      const headerRow = harness.getTableHeaderRow();
      const selectAllCheckbox = headerRow.cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLInputElement;

      expect(selectAllCheckbox.indeterminate).toBe(true);

      selectAllCheckbox.click();

      expect(selectAllCheckbox.indeterminate).toBe(false);
      expect(selectAllCheckbox.checked).toBe(true);
    });

    it('should contain custom header template', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;
      testColumns[0].headerTemplate = () => '<span>Hello Goodbye</span>';

      harness.component.columnConfigurations = testColumns;
      await frame();

      const callback = vi.fn();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback);

      const headerRow = harness.getTableHeaderRow();
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      expect(firstCell.innerHTML).toContain('Hello Goodbye');
    });

    it('should contain custom header template without a aria-hidden attribute', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;
      testColumns[0].headerTemplate = () => '<span>Hello Goodbye</span>';

      harness.component.columnConfigurations = testColumns;
      await frame();

      const callback = vi.fn();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback);

      const headerRow = harness.getTableHeaderRow();
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      expect(firstCell.hasAttribute('aria-hidden')).toBe(false);
    });

    it('should contain custom header template with sort arrow', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;
      testColumns[0].headerTemplate = () => '<span>Hello Goodbye</span>';

      harness.component.columnConfigurations = testColumns;

      const callback = vi.fn();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback);

      const headerRow = harness.getTableHeaderRow();
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      await frame();
      clickTableCell(firstCell);
      expect(firstCell.innerHTML).toContain('Hello Goodbye');
      expect(callback).toHaveBeenCalled();
      expect(firstCell.innerHTML).toContain(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ICON);
    });

    it('should emit array of sorted columns with multiple column sort', async () => {
      const harness = await createFixture();
      harness.component.multiColumnSort = true;
      const testColumns = deepCopy(columns) as IColumnConfiguration[];
      testColumns.forEach(c => (c.sortable = true));

      harness.component.columnConfigurations = testColumns;

      let emitedResult: ITableSortMultipleEventData | undefined;

      const callback = vi.fn((evt: CustomEvent<ITableSortMultipleEventData>) => {
        emitedResult = evt.detail;
      });
      harness.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback as any);

      const headerRow = harness.getTableHeaderRow();
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      await frame();
      clickTableCell(firstCell);
      expect(callback).toHaveBeenCalled();
      expect(Array.isArray(emitedResult)).toBe(true);
    });

    it('should emit sorted on both `name` and `position`', async () => {
      const harness = await createFixture();
      harness.component.multiColumnSort = true;
      const testColumns = deepCopy(columns) as IColumnConfiguration[];
      testColumns.forEach(c => (c.sortable = true));

      harness.component.columnConfigurations = testColumns;

      let emitedResult: ITableSortMultipleEventData | undefined;

      const callback = vi.fn((evt: CustomEvent<ITableSortMultipleEventData>) => {
        emitedResult = evt.detail;
      });
      harness.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback as any);

      const headerRow = harness.getTableHeaderRow();
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      const secondCell = headerRow.cells.item(2) as HTMLTableCellElement;
      await frame();
      clickTableCell(firstCell);
      clickTableCell(secondCell, true);
      expect(callback).toHaveBeenCalled();
      expect(emitedResult!.length).toBe(2);
      expect(emitedResult![0].propertyName).toBe('Name');
      expect(emitedResult![0].sortOrder).toBe(1);
      expect(emitedResult![1].propertyName).toBe('Position');
      expect(emitedResult![1].sortOrder).toBe(2);
    });

    it('should execute callback when row elements are created', async () => {
      const harness = await createFixture();
      const rowCreatedSpy = vi.fn();
      harness.component.rowCreated = rowCreatedSpy as any;
      harness.component.data = data;
      harness.component.columnConfigurations = columns;

      expect(rowCreatedSpy).toHaveBeenCalledTimes(data.length);
    });

    it('should execute callback when cell elements are created', async () => {
      const harness = await createFixture();
      const cellCreatedSpy = vi.fn();
      harness.component.cellCreated = cellCreatedSpy as any;
      harness.component.data = data;
      harness.component.columnConfigurations = columns;

      expect(cellCreatedSpy).toHaveBeenCalledTimes(data.length * columns.length);
    });

    describe('select all template', () => {
      it('should render the template', async () => {
        const harness = await createFixture();
        harness.component.select = true;
        harness.component.multiselect = true;
        harness.component.selectAllTemplate = () => customSelectAllTemplate();

        const testColumns = deepCopy(columns) as IColumnConfiguration[];
        harness.component.columnConfigurations = testColumns;
        await frame();

        const selectAllCell = getSelectAllCell(harness.tableElement);

        expect(selectAllCell.querySelector('.custom-select-all-template-container')).toBeTruthy();
      });

      it('should automagically wire select all to input', async () => {
        const harness = await createFixture();
        harness.component.select = true;
        harness.component.multiselect = true;
        harness.component.selectAllTemplate = () => customSelectAllTemplate();
        harness.component.data = data;

        const testColumns = deepCopy(columns) as IColumnConfiguration[];
        harness.component.columnConfigurations = testColumns;
        await frame();

        const selectAllCell = getSelectAllCell(harness.tableElement);

        selectAllCell.querySelector('input')!.dispatchEvent(new MouseEvent('click'));

        const selectedRows = harness.component.getSelectedRows();

        expect(selectedRows.length).toBe(data.length);
      });

      it('should ignore select all wire if forge-ignore attribute is present on the input', async () => {
        const harness = await createFixture();
        harness.component.select = true;
        harness.component.multiselect = true;
        harness.component.selectAllTemplate = () => customSelectAllTemplate({ forgeIgnore: true });
        harness.component.data = data;

        const testColumns = deepCopy(columns) as IColumnConfiguration[];
        harness.component.columnConfigurations = testColumns;
        await frame();

        const selectAllCell = getSelectAllCell(harness.tableElement);

        selectAllCell.querySelector('input')!.dispatchEvent(new MouseEvent('click'));

        const selectedRows = harness.component.getSelectedRows();

        expect(selectedRows.length).toBe(0);
      });

      it('should have indeterminate state when a single row is selected', async () => {
        const harness = await createFixture();
        harness.component.select = true;
        harness.component.multiselect = true;
        harness.component.selectAllTemplate = () => customSelectAllTemplate();
        harness.component.data = data;

        const testColumns = deepCopy(columns) as IColumnConfiguration[];
        harness.component.columnConfigurations = testColumns;
        await frame();

        const selectAllCell = getSelectAllCell(harness.tableElement);
        const checkbox = selectAllCell.querySelector('input') as HTMLInputElement;
        const rowCheckbox = harness.tableElement.querySelector('tbody > tr > td forge-checkbox');
        rowCheckbox!.dispatchEvent(new PointerEvent('pointerdown'));
        await frame();

        expect(checkbox.indeterminate).toBe(true);
      });

      it('should have checked state when all rows are selected', async () => {
        const harness = await createFixture();
        harness.component.select = true;
        harness.component.multiselect = true;
        harness.component.selectAllTemplate = () => customSelectAllTemplate();
        harness.component.data = data;

        const testColumns = deepCopy(columns) as IColumnConfiguration[];
        harness.component.columnConfigurations = testColumns;
        await frame();

        const selectAllCell = getSelectAllCell(harness.tableElement);
        const checkbox = selectAllCell.querySelector('input') as HTMLInputElement;
        const rowCheckboxes = harness.tableElement.querySelectorAll('tbody forge-checkbox');
        rowCheckboxes.forEach(c => {
          c.dispatchEvent(new PointerEvent('pointerdown'));
        });

        await frame();

        expect(checkbox.checked).toBe(true);
      });

      it('should render with HTMLElement as the template', async () => {
        const harness = await createFixture();
        harness.component.select = true;
        harness.component.multiselect = true;
        harness.component.selectAllTemplate = () => customSelectAllTemplate({ type: 'html' });
        harness.component.data = data;

        const testColumns = deepCopy(columns) as IColumnConfiguration[];
        harness.component.columnConfigurations = testColumns;
        await frame();

        const selectAllCell = getSelectAllCell(harness.tableElement);
        const checkbox = selectAllCell.querySelector('input') as HTMLInputElement;
        const rowCheckboxes = harness.tableElement.querySelectorAll('tbody forge-checkbox');
        rowCheckboxes.forEach(c => {
          c.dispatchEvent(new PointerEvent('pointerdown'));
        });

        await frame();

        expect(checkbox.checked).toBe(true);
      });

      it('should rerender correctly if multiselect is toggled', async () => {
        const harness = await createFixture();
        harness.component.select = true;
        harness.component.multiselect = true;
        harness.component.selectAllTemplate = () => customSelectAllTemplate({ type: 'html' });
        harness.component.data = data;

        const testColumns = deepCopy(columns) as IColumnConfiguration[];
        harness.component.columnConfigurations = testColumns;

        await frame();
        harness.component.multiselect = false;
        await frame();
        harness.component.multiselect = true;
        await frame();

        const selectAllCell = getSelectAllCell(harness.tableElement);

        expect(selectAllCell).toBeTruthy();
      });

      it('should align checkbox to left if select checkbox alignment set', async () => {
        const harness = await createFixture();
        harness.component.select = true;
        harness.component.multiselect = true;
        harness.component.selectCheckboxAlignment = CellAlign.Left;
        harness.component.selectAllTemplate = () => customSelectAllTemplate({ type: 'html' });
        harness.component.data = data;

        const testColumns = deepCopy(columns) as IColumnConfiguration[];
        harness.component.columnConfigurations = testColumns;
        const checkboxContainer = harness.tableElement.querySelector('tbody .forge-table-cell__select-checkbox-container') as HTMLElement;
        await frame();
        expect(harness.component.selectCheckboxAlignment).toBe(CellAlign.Left);
        expect(checkboxContainer.classList.contains(TABLE_CONSTANTS.classes.TABLE_CELL_SELECT_CHECKBOX_CONTAINER_ALIGN_LEFT)).toBe(true);
      });

      it('should set selections when select column is not visible', async () => {
        const harness = await createFixture();
        harness.component.data = data;
        harness.component.columnConfigurations = columns;
        harness.component.select = false;
        harness.component.selectKey = 'Id';

        const selectedIndexes = [0, 2];
        harness.component.selectRowsByIndex(selectedIndexes);

        const rows = harness.getTableBodyRows();
        rows.forEach((row, index) => {
          const selected = selectedIndexes.includes(index);
          expect(row.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).toBe(selected);
        });
      });

      it('should render selections when select column is not visible after data is changed', async () => {
        const harness = await createFixture();
        harness.component.data = data;
        harness.component.columnConfigurations = columns;
        harness.component.select = false;
        harness.component.selectKey = 'Id';

        const selectedIndexes = [0, 2];
        harness.component.selectRowsByIndex(selectedIndexes);
        harness.component.data = data;

        const rows = harness.getTableBodyRows();
        rows.forEach((row, index) => {
          const selected = selectedIndexes.includes(index);
          expect(row.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).toBe(selected);
        });
      });
    });
  });
});

// Helper functions
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

function getSelectAllCell(tableElement: HTMLTableElement): HTMLTableCellElement {
  return tableElement.tHead!.rows.item(0)!.cells.item(0) as HTMLTableCellElement;
}

function clickTableCell(el: HTMLElement, withCtrlKey?: boolean): void {
  el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, ctrlKey: withCtrlKey }));
  el.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, ctrlKey: withCtrlKey }));
}

function customSelectAllTemplate(options?: { forgeIgnore?: boolean; type?: 'html' | 'string' }): Promise<string | HTMLElement> {
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

function deepCopy(obj: any): any {
  return JSON.parse(JSON.stringify(obj));
}

function getTooltipString(rowIndex: number, rowData: any): string {
  return rowData.Name;
}

// Harness class
class TableHarness {
  constructor(
    public component: TableComponentWithCore,
    public container: HTMLElement
  ) {}

  public get core(): TableCoreInternal {
    return this.component._core;
  }

  public get tableElement(): HTMLTableElement {
    return this.component.querySelector('table') as HTMLTableElement;
  }

  public getTableHeaderRow(): HTMLTableRowElement {
    return getTableHeaderRow(this.tableElement);
  }

  public getTableBodyRows(): HTMLTableRowElement[] {
    return getTableBodyRows(this.tableElement);
  }
}

// Fixture creation functions
interface ITableFixtureConfig {
  hasAttrs?: boolean;
  hasChildren?: boolean;
  tooltipSelect?: string | TableSelectTooltipCallback;
  tooltipSelectAll?: string;
}

async function createFixture(config: ITableFixtureConfig = {}): Promise<TableHarness> {
  const { hasAttrs = false, hasChildren = false, tooltipSelect, tooltipSelectAll } = config;

  let screen;

  if (hasAttrs) {
    if (hasChildren) {
      screen = render(html`
        <forge-table
          select="true"
          multiselect="true"
          select-key="Id"
          tooltip-select="Select"
          tooltip-select-all="Select All"
          dense="true"
          filter="true"
          fixed-headers="true"
          layout-type="auto"
          wrap-content="true"
          resizable="true"
          min-resize-width="10"
          allow-row-click="true">
          <span></span>
          <span></span>
        </forge-table>
      `);
    } else {
      screen = render(html`
        <forge-table
          select="true"
          multiselect="true"
          select-key="Id"
          tooltip-select="Select"
          tooltip-select-all="Select All"
          dense="true"
          filter="true"
          fixed-headers="true"
          layout-type="auto"
          wrap-content="true"
          resizable="true"
          min-resize-width="10"
          allow-row-click="true">
        </forge-table>
      `);
    }
  } else if (tooltipSelect || tooltipSelectAll) {
    screen = render(html`<forge-table tooltip-select=${tooltipSelect || nothing} tooltip-select-all=${tooltipSelectAll || nothing}></forge-table>`);
  } else if (hasChildren) {
    screen = render(html`
      <forge-table>
        <span></span>
        <span></span>
      </forge-table>
    `);
  } else {
    screen = render(html`<forge-table></forge-table>`);
  }

  const component = screen.container.querySelector('forge-table') as unknown as TableComponentWithCore;

  return new TableHarness(component, screen.container);
}
