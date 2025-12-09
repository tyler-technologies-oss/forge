import { expect } from '@esm-bundle/chai';
import { spy } from 'sinon';
import { fixture, html } from '@open-wc/testing';
import { task, frame } from '../core/utils/utils';
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
} from './index';
import { TextFieldComponentDelegate } from '../text-field';
import { ITooltipComponent } from '../tooltip';

import './table';

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
  before(() => {
    defineTableComponent();
  });

  describe('with default property values', () => {
    it('should load with attribute values default in properly', async () => {
      const harness = await createFixture({ hasAttrs: true });

      expect(harness.component.select).to.be.true;
      expect(harness.component.multiselect).to.be.true;
      expect(harness.component.selectKey).to.deep.equal(['Id']);
      expect(harness.component.dense).to.be.true;
      expect(harness.component.filter).to.be.true;
      expect(harness.component.fixedHeaders).to.be.true;
      expect(harness.component.layoutType).to.equal('auto');
      expect(harness.component.wrapContent).to.be.true;
      expect(harness.component.resizable).to.be.true;
      expect(harness.component.minResizeWidth).to.equal(10);
      expect(harness.component.allowRowClick).to.be.true;

      expect(harness.component.getAttribute(TABLE_CONSTANTS.attributes.SELECT)).to.equal('true');
      expect(harness.component.getAttribute(TABLE_CONSTANTS.attributes.MULTISELECT)).to.equal('true');
      expect(harness.component.getAttribute(TABLE_CONSTANTS.attributes.SELECT_KEY)).to.equal('Id');
      expect(harness.component.getAttribute(TABLE_CONSTANTS.attributes.DENSE)).to.equal('true');
      expect(harness.component.getAttribute(TABLE_CONSTANTS.attributes.FILTER)).to.equal('true');
      expect(harness.component.getAttribute(TABLE_CONSTANTS.attributes.FIXED_HEADERS)).to.equal('true');
      expect(harness.component.getAttribute(TABLE_CONSTANTS.attributes.LAYOUT_TYPE)).to.equal('auto');
      expect(harness.component.getAttribute(TABLE_CONSTANTS.attributes.WRAP_CONTENT)).to.equal('true');
      expect(harness.component.getAttribute(TABLE_CONSTANTS.attributes.RESIZABLE)).to.equal('true');
      expect(harness.component.getAttribute(TABLE_CONSTANTS.attributes.MIN_RESIZE_WIDTH)).to.equal('10');
      expect(harness.component.getAttribute(TABLE_CONSTANTS.attributes.ALLOW_ROW_CLICK)).to.equal('true');

      await harness.destroy();
    });
  });

  describe('with children elements', () => {
    it('should remove children before initialize', async () => {
      const harness = await createFixture({ hasChildren: true });
      expect(harness.tableElement.children.length).to.equal(0);
      await harness.destroy();
    });
  });

  describe('without default property values', () => {
    it('should be instantiated', async () => {
      const harness = await createFixture();
      expect(harness.component).to.exist;
      await harness.destroy();
    });

    it('should have proper default values', async () => {
      const harness = await createFixture();

      expect(harness.component.data).to.deep.equal([]);
      expect(harness.component.columnConfigurations).to.deep.equal([]);
      expect(harness.component.select).to.be.false;
      expect(harness.component.multiselect).to.be.true;
      expect(harness.component.selectKey).to.be.undefined;
      expect(harness.component.tooltipSelect).to.be.undefined;
      expect(harness.component.tooltipSelectAll).to.be.undefined;
      expect(harness.component.dense).to.be.false;
      expect(harness.component.filter).to.be.false;
      expect(harness.component.fixedHeaders).to.be.false;
      expect(harness.component.layoutType).to.equal('auto');
      expect(harness.component.wrapContent).to.be.true;
      expect(harness.component.resizable).to.be.false;
      expect(harness.component.minResizeWidth).to.equal(100);
      expect(harness.component.allowRowClick).to.be.false;

      await harness.destroy();
    });

    it('should have tooltip string', async () => {
      const harness = await createFixture({ tooltipSelect: 'Select', tooltipSelectAll: 'Select All' });
      harness.component.select = true;
      harness.component.multiselect = true;
      harness.component.data = data;
      harness.component.columnConfigurations = columns;

      expect(harness.component.tooltipSelectAll).to.equal('Select All');
      expect(harness.component.tooltipSelect).to.equal('Select');

      expect(harness.component.getAttribute(TABLE_CONSTANTS.attributes.TOOLTIP_SELECT_ALL)).to.equal('Select All');
      expect(harness.component.getAttribute(TABLE_CONSTANTS.attributes.TOOLTIP_SELECT)).to.equal('Select');

      const tableHeadFirstCell = harness.tableElement.tHead!.rows[0].cells[0];
      const multiSelectTooltipElement = tableHeadFirstCell.querySelector('forge-tooltip') as ITooltipComponent;

      expect(multiSelectTooltipElement).to.exist;
      expect(multiSelectTooltipElement.innerText).to.equal('Select All');

      const tableBodyRows = Array.from(harness.tableElement.tBodies[0].rows);
      data.forEach((_, index) => {
        const rowElement = tableBodyRows[index];
        const firstCell = rowElement.cells[0];
        const tooltipElement = firstCell.querySelector('forge-tooltip') as ITooltipComponent;

        expect(tooltipElement).to.exist;
        expect(tooltipElement.innerText).to.equal('Select');
      });

      await harness.destroy();
    });

    it('should execute tooltip callback for every row', async () => {
      const tooltipSelectCallback = spy(getTooltipString);
      const harness = await createFixture();
      harness.component.select = true;
      harness.component.tooltipSelect = tooltipSelectCallback as any;
      harness.component.columnConfigurations = columns;
      harness.component.data = data;

      expect(tooltipSelectCallback.callCount).to.equal(data.length);

      await harness.destroy();
    });

    it('should have proper default DOM state', async () => {
      const harness = await createFixture();
      expect(harness.tableElement.tHead).to.be.null;
      expect(harness.tableElement.tBodies.length).to.equal(0);
      expect(harness.tableElement.classList.contains(TABLE_CONSTANTS.classes.TABLE)).to.be.true;
      await harness.destroy();
    });

    it('should set columns properly', async () => {
      const harness = await createFixture();
      await frame();
      harness.component.columnConfigurations = columns;

      expect(harness.component.columnConfigurations.length).to.equal(columns.length);
      expect(harness.tableElement.tHead!.rows.length).to.equal(1);
      expect(harness.tableElement.tHead!.rows.item(0)!.cells.length).to.equal(columns.length);

      await frame();
      harness.component.resizable = true;
      harness.component.columnConfigurations = resizableColumns;
      expect(harness.tableElement.tHead!.rows.length).to.equal(1);
      expect(harness.tableElement.tHead!.rows.item(0)!.cells.length).to.equal(resizableColumns.length);

      await harness.destroy();
    });

    it('should toggle select column properly', async () => {
      const harness = await createFixture();
      harness.component.columnConfigurations = columns;
      harness.component.select = true;

      expect(harness.tableElement.tHead!.rows.item(0)!.cells.item(0)!.classList.contains(TABLE_CONSTANTS.classes.TABLE_CELL_SELECT)).to.be.true;
      expect(harness.tableElement.tHead!.rows.item(0)!.cells.length).to.equal(columns.length + 1);

      harness.component.select = false;

      expect(harness.tableElement.tHead!.rows.item(0)!.cells.item(0)!.classList.contains(TABLE_CONSTANTS.classes.TABLE_CELL_SELECT)).to.be.false;
      expect(harness.tableElement.tHead!.rows.item(0)!.cells.length).to.equal(columns.length);

      await harness.destroy();
    });

    it('should not set default sortable column', async () => {
      const harness = await createFixture();
      harness.component.columnConfigurations = columns;
      const headerRow = harness.getTableHeaderRow();
      const hasSortableCell = Array.from(headerRow.cells).some(c => c.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTABLE));
      expect(hasSortableCell).to.be.false;
      await harness.destroy();
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

      expect(firstCell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTABLE)).to.be.true;
      expect(secondCell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTABLE)).to.be.true;
      expect(firstCell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_DESCENDING)).to.be.true;
      expect(firstCell.getAttribute('aria-sort')).to.equal('descending');
      expect(secondCell.hasAttribute('aria-sort')).to.be.false;
      expect(activelySortedCells.length).to.equal(1);
      expect(sortIconElement).to.exist;
      expect((sortIconElement as HTMLElement).classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ICON_ACTIVE)).to.be.true;

      await harness.destroy();
    });

    it('should hide columns', async () => {
      const harness = await createFixture();
      const testColumns: IColumnConfiguration[] = deepCopy(columns);
      testColumns[1].hidden = true;

      harness.component.columnConfigurations = testColumns;

      const headerRow = harness.getTableHeaderRow();

      expect(headerRow.cells.length).to.equal(testColumns.length - 1);

      await harness.destroy();
    });

    it('should set correct sorted column index when hidden columns exist', async () => {
      const harness = await createFixture();
      const testColumns: IColumnConfiguration[] = deepCopy(columns);
      testColumns[1].hidden = true;
      testColumns[2].initialSort = true;

      harness.component.columnConfigurations = testColumns;

      expect(harness.core._sortedColumnIndex).to.equal(1);

      await harness.destroy();
    });

    it('should not set data until columns are set', async () => {
      const harness = await createFixture();
      harness.component.data = data;

      const rows = harness.getTableBodyRows();
      expect(rows.length).to.equal(0);

      await harness.destroy();
    });

    it('should reset data if data is not an array', async () => {
      const harness = await createFixture();
      harness.component.data = {} as any;
      const rows = harness.getTableBodyRows();
      expect(rows.length).to.equal(0);

      await harness.destroy();
    });

    it('should set data properly', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;

      const rows = harness.getTableBodyRows();
      expect(rows.length).to.equal(data.length);

      await harness.destroy();
    });

    it('should reset data properly', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.data = [data[0], data[1], data[2]];

      const rows = harness.getTableBodyRows();
      expect(rows.length).to.equal(3);

      await harness.destroy();
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

      expect(firstRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).to.be.true;

      await harness.destroy();
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

      expect(firstRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).to.be.true;

      await harness.destroy();
    });

    it('should not select row when clicking non-checkbox element', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.selectKey = 'Id';

      const rows = harness.getTableBodyRows();

      expect(rows[0].classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).to.be.false;

      await harness.destroy();
    });

    it('should not set select all listener if multiselect is off', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.multiselect = false;
      const tableConfig: ITableConfiguration = harness.core._tableConfiguration;
      expect(tableConfig.selectAllListener).to.be.null;

      await harness.destroy();
    });

    it('should emit select event when selecting a row', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;

      const callback = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SELECT, callback);

      const rows = harness.getTableBodyRows();
      const selectCheckboxElement = rows[0].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
      selectCheckboxElement.dispatchEvent(new PointerEvent('pointerdown'));

      expect(callback).to.have.been.calledOnce;

      await harness.destroy();
    });

    it('should emit body rendered events in order when table body renders', async () => {
      const harness = await createFixture();

      const templateBuilderCallback = spy();
      const beforeRenderedCallback = spy();
      const renderedCallback = spy();

      const tableColumns: IColumnConfiguration[] = deepCopy(columns);
      tableColumns[0].template = templateBuilderCallback;
      harness.component.columnConfigurations = tableColumns;
      harness.component.addEventListener(TABLE_CONSTANTS.events.BEFORE_BODY_RENDERED, beforeRenderedCallback);
      harness.component.addEventListener(TABLE_CONSTANTS.events.BODY_RENDERED, renderedCallback);
      harness.component.data = deepCopy(data);

      expect(beforeRenderedCallback).to.have.been.calledBefore(templateBuilderCallback);
      expect(templateBuilderCallback).to.have.been.calledBefore(renderedCallback);

      await harness.destroy();
    });

    it('should emit select-double event when double clicking a row', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.allowRowClick = true;

      const selectDoubleCallback = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SELECT_DOUBLE, selectDoubleCallback);

      const selectCallback = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SELECT, selectCallback);

      const rows = harness.getTableBodyRows();
      rows[0].dispatchEvent(new MouseEvent('dblclick'));

      expect(selectDoubleCallback).to.have.been.calledOnce;
      expect(selectCallback).to.not.have.been.called;

      await harness.destroy();
    });

    it('should emit click event on a row', async () => {
      const harness = await createFixture();
      harness.component.allowRowClick = true;
      harness.component.data = data;
      harness.component.columnConfigurations = columns;

      const clickListener = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.ROW_CLICK, clickListener);

      const selectCallback = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SELECT, selectCallback);

      const rows = harness.getTableBodyRows();
      rows[0].click();

      expect(clickListener).to.have.been.calledOnce;
      expect(selectCallback).to.not.have.been.called;

      await harness.destroy();
    });

    it('should reattach click listeners on data set', async () => {
      const harness = await createFixture();
      harness.component.allowRowClick = true;
      harness.component.data = data;
      harness.component.columnConfigurations = columns;

      const clickListener = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.ROW_CLICK, clickListener);

      harness.component.data = [data[0], data[1]];

      const rows = harness.getTableBodyRows();
      rows[0].click();

      expect(clickListener).to.have.been.calledOnce;

      await harness.destroy();
    });

    it('should not emit click event if target is checkbox', async () => {
      const harness = await createFixture();
      harness.component.allowRowClick = true;
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.selectKey = 'Id';

      const clickListener = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.ROW_CLICK, clickListener);

      const rows = harness.getTableBodyRows();
      const selectCheckbox = rows[0].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
      selectCheckbox.click();

      expect(clickListener).to.not.have.been.called;

      await harness.destroy();
    });

    it('should emit click event on a row when a cell is clicked with a custom template', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      delete testColumns[0].property;
      testColumns[0].template = () => '<button>Test</button>';

      harness.component.allowRowClick = true;
      harness.component.data = data;
      harness.component.columnConfigurations = testColumns;

      const clickListener = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.ROW_CLICK, clickListener);

      await frame();

      const rows = harness.getTableBodyRows();
      const button = rows[0].cells.item(0)!.querySelector('button') as HTMLButtonElement;
      button.click();

      expect(clickListener).to.have.been.calledOnce;

      await harness.destroy();
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

      const clickListener = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.ROW_CLICK, clickListener);

      await frame();

      button.dispatchEvent(new Event('click', { bubbles: true }));

      expect(clickListener).to.not.have.been.called;

      await harness.destroy();
    });

    it('should not emit dblclick event if target is checkbox', async () => {
      const harness = await createFixture();
      harness.component.allowRowClick = true;
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.selectKey = 'Id';

      const dblclickListener = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SELECT_DOUBLE, dblclickListener);

      const rows = harness.getTableBodyRows();
      const selectCheckbox = rows[0].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
      selectCheckbox.dispatchEvent(new MouseEvent('dblclick'));

      expect(dblclickListener).to.not.have.been.called;

      await harness.destroy();
    });

    it('should emit select all event', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;

      const callback = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SELECT_ALL, callback);

      const row = harness.getTableHeaderRow();
      const checkbox = row.cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
      checkbox.click();

      expect(callback).to.have.been.calledOnce;

      await harness.destroy();
    });

    it('should emit select all event after manually selecting all rows', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;

      const callback = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SELECT_ALL, callback);

      const rows = harness.getTableBodyRows();
      data.forEach((item, index) => {
        const selectCheckboxElement = rows[index].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
        selectCheckboxElement.dispatchEvent(new PointerEvent('pointerdown'));
      });

      expect(callback).to.have.been.calledOnce;

      await harness.destroy();
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

      expect(firstRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).to.be.true;
      expect(secondRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).to.be.true;

      await harness.destroy();
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

      expect(firstRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).to.be.false;
      expect(secondRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).to.be.true;

      await harness.destroy();
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

      expect(firstRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).to.be.true;
      expect(secondRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).to.be.true;

      firstRowSelectCheckboxElement.dispatchEvent(new PointerEvent('pointerdown'));
      secondRowSelectCheckboxElement.dispatchEvent(new PointerEvent('pointerdown'));

      expect(firstRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).to.be.false;
      expect(secondRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).to.be.false;

      await harness.destroy();
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

      expect(selectedRows.length).to.be.greaterThan(0);
      expect(selectedRows.length).to.equal(data.length);

      checkbox.click();
      selectedRows = harness.getTableBodyRows().filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).to.equal(0);

      await harness.destroy();
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

      expect(selectedRows.length).to.equal(data.length - 1);

      await harness.destroy();
    });

    it('should not emit sort event when right clicking sortable column', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;

      harness.component.columnConfigurations = testColumns;

      const callback = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback);

      const headerRow = harness.getTableHeaderRow();
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      const button = firstCell.querySelector('button') as HTMLButtonElement;
      button.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, button: 2 }));
      button.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, button: 2 }));

      expect(callback).to.not.have.been.called;

      await harness.destroy();
    });

    it('should update select all state if a row selection completes all selected rows', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.selectKey = 'Id';

      const allButLastRows = data.filter((d, i) => i + 1 < data.length);
      harness.component.selectRows([...allButLastRows], false);

      expect(harness.component.getSelectedRows().length).to.be.lessThan(data.length);
      expect(harness.core._isAllSelected).to.be.false;

      harness.component.selectRows([data[data.length - 1]], true);

      expect(harness.component.getSelectedRows().length).to.equal(data.length);
      expect(harness.core._isAllSelected).to.be.true;

      await harness.destroy();
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

      expect(harness.component.getSelectedRows().length).to.be.lessThan(data.length);
      expect(harness.core._isAllSelected).to.be.false;

      harness.component.multiselect = false;

      await frame();

      harness.component.selectRows([data[data.length - 1]], true);

      expect(harness.component.getSelectedRows().length).to.equal(1);
      expect(harness.core._isAllSelected).to.be.false;

      await harness.destroy();
    });

    it('should set layout type', async () => {
      const harness = await createFixture();

      harness.component.layoutType = 'fixed' as TableLayoutType;
      harness.component.render();
      expect(harness.tableElement.classList.contains(TABLE_CONSTANTS.classes.TABLE_LAYOUT_FIXED)).to.be.true;
      expect(harness.core._tableConfiguration.layoutType).to.equal('fixed');

      harness.component.layoutType = 'auto' as TableLayoutType;
      harness.component.render();
      expect(harness.tableElement.classList.contains(TABLE_CONSTANTS.classes.TABLE_LAYOUT_FIXED)).to.be.false;
      expect(harness.core._tableConfiguration.layoutType).to.equal('auto');

      await harness.destroy();
    });

    it('should set dense state', async () => {
      const harness = await createFixture();

      harness.component.dense = true;
      harness.component.render();
      expect(harness.tableElement.classList.contains(TABLE_CONSTANTS.classes.TABLE_DENSE)).to.be.true;
      expect(harness.component.getAttribute(TABLE_CONSTANTS.attributes.DENSE)).to.equal('true');
      expect(harness.core._tableConfiguration.dense).to.be.true;

      harness.component.dense = false;
      harness.component.render();
      expect(harness.tableElement.classList.contains(TABLE_CONSTANTS.classes.TABLE_DENSE)).to.be.false;
      expect(harness.component.getAttribute(TABLE_CONSTANTS.attributes.DENSE)).to.equal('false');
      expect(harness.core._tableConfiguration.dense).to.be.false;

      await harness.destroy();
    });

    it('should set resizable', async () => {
      const harness = await createFixture();

      harness.component.resizable = false;
      harness.component.render();
      expect(harness.tableElement.classList.contains(TABLE_CONSTANTS.classes.TABLE_RESIZABLE)).to.be.false;
      expect(harness.core._tableConfiguration.resizable).to.be.false;

      harness.component.resizable = true;
      harness.component.render();
      expect(harness.tableElement.classList.contains(TABLE_CONSTANTS.classes.TABLE_RESIZABLE)).to.be.true;
      expect(harness.core._tableConfiguration.resizable).to.be.true;

      await harness.destroy();
    });

    it('should set fixed headers state', async () => {
      const harness = await createFixture();

      harness.component.fixedHeaders = false;
      harness.component.render();
      expect(harness.tableElement.classList.contains(TABLE_CONSTANTS.classes.TABLE_FIXED)).to.be.false;
      expect(harness.core._tableConfiguration.fixedHeaders).to.be.false;

      harness.component.fixedHeaders = true;
      harness.component.render();
      expect(harness.tableElement.classList.contains(TABLE_CONSTANTS.classes.TABLE_FIXED)).to.be.true;
      expect(harness.core._tableConfiguration.fixedHeaders).to.be.true;

      await harness.destroy();
    });

    it('should set wrap content', async () => {
      const harness = await createFixture();

      harness.component.wrapContent = true;
      harness.component.render();
      expect(harness.tableElement.classList.contains(TABLE_CONSTANTS.classes.TABLE_NO_WRAP_CONTENT)).to.be.false;
      expect(harness.core._tableConfiguration.wrapContent).to.be.true;

      harness.component.wrapContent = false;
      harness.component.render();
      expect(harness.tableElement.classList.contains(TABLE_CONSTANTS.classes.TABLE_NO_WRAP_CONTENT)).to.be.true;
      expect(harness.core._tableConfiguration.wrapContent).to.be.false;

      await harness.destroy();
    });

    it('should set min resize width state', async () => {
      const harness = await createFixture();
      harness.component.minResizeWidth = 10;
      expect(harness.component.minResizeWidth).to.equal(10);
      await harness.destroy();
    });

    it('should default min resize width when no number is provided', async () => {
      const harness = await createFixture();
      harness.component.minResizeWidth = 'a' as any;
      expect(harness.component.minResizeWidth).to.equal(100);
      await harness.destroy();
    });

    it('should set min resize width zero when a negative number is provided', async () => {
      const harness = await createFixture();
      harness.component.minResizeWidth = -5;
      expect(harness.component.minResizeWidth).to.equal(0);
      await harness.destroy();
    });

    it('should set filter', async () => {
      const harness = await createFixture();

      harness.component.filter = true;
      harness.component.render();
      expect(harness.tableElement.classList.contains(TABLE_CONSTANTS.classes.TABLE_FILTER_VISIBLE)).to.be.true;
      expect(harness.core._tableConfiguration.filter).to.be.true;

      harness.component.filter = false;
      harness.component.render();
      expect(harness.tableElement.classList.contains(TABLE_CONSTANTS.classes.TABLE_FILTER_VISIBLE)).to.be.false;
      expect(harness.core._tableConfiguration.filter).to.be.false;

      await harness.destroy();
    });

    it('should set allow row click', async () => {
      const harness = await createFixture();
      harness.component.columnConfigurations = columns;
      harness.component.data = data;

      harness.component.allowRowClick = true;
      expect(harness.component.allowRowClick).to.be.true;

      const rows = harness.getTableBodyRows();
      const hasClickableClass = rows.every(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_CLICKABLE));
      expect(hasClickableClass).to.be.true;

      await harness.destroy();
    });

    it('should apply clickable class when data changes', async () => {
      const harness = await createFixture();
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.allowRowClick = true;

      harness.component.data = [...harness.component.data];

      const rows = harness.getTableBodyRows();
      const hasClickableClass = rows.every(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_CLICKABLE));
      expect(hasClickableClass).to.be.true;

      await harness.destroy();
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

      expect(firstRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).to.be.true;
      expect(secondRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).to.be.true;

      await harness.destroy();
    });

    it('should select rows if select is false', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.data = data;
      harness.component.columnConfigurations = columns;

      harness.component.selectRow(data[0]);

      const selectedRows = harness.getTableBodyRows().filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).to.equal(1);

      await harness.destroy();
    });

    it('should not deselect rows if select is turned off', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;

      harness.component.deselectRow(data[0]);

      const selectedRows = harness.getTableBodyRows().filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).to.equal(0);

      await harness.destroy();
    });

    it('should not select rows if data is undefined', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.selectRows(undefined as any);

      const selectedRows = harness.getTableBodyRows().filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).to.equal(0);

      await harness.destroy();
    });

    it('should not deselect rows if data is undefined', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.deselectRows(undefined as any);

      const selectedRows = harness.getTableBodyRows().filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).to.equal(0);

      await harness.destroy();
    });

    it('should emit sort event when clicking sortable column', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;

      harness.component.columnConfigurations = testColumns;

      const callback = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback);

      const headerRow = harness.getTableHeaderRow();
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      clickTableCell(firstCell);

      expect(callback).to.have.been.calledOnce;

      await harness.destroy();
    });

    it('should emit sort event when pressing space key on sortable column', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;

      harness.component.columnConfigurations = testColumns;

      const callback = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback);

      const headerRow = harness.getTableHeaderRow();
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      firstCell.querySelector('button')?.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));

      expect(callback).to.have.been.calledOnce;

      await harness.destroy();
    });

    it('should emit sort event when pressing enter key on sortable column', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;

      harness.component.columnConfigurations = testColumns;

      const callback = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback);

      const headerRow = harness.getTableHeaderRow();
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      firstCell.querySelector('button')?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      expect(callback).to.have.been.calledOnce;

      await harness.destroy();
    });

    it('should not emit sort event clicking non-sortable column', async () => {
      const harness = await createFixture();
      harness.component.columnConfigurations = columns;

      const callback = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback);

      const headerRow = harness.getTableHeaderRow();
      headerRow.cells.item(0)!.click();

      expect(callback).to.not.have.been.called;

      await harness.destroy();
    });

    it('should not emit sort event pressing enter or space key on non-sortable column', async () => {
      const harness = await createFixture();
      harness.component.columnConfigurations = columns;

      const callback = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback);

      const headerRow = harness.getTableHeaderRow();
      headerRow.cells.item(0)!.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
      headerRow.cells.item(0)!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      expect(callback).to.not.have.been.called;

      await harness.destroy();
    });

    it('should toggle sort direction when clicking same column', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;

      harness.component.columnConfigurations = testColumns;

      const headerRow = harness.getTableHeaderRow();
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;

      clickTableCell(firstCell);
      expect(firstCell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_ASCENDING)).to.be.true;
      expect(firstCell.getAttribute('aria-sort')).to.equal('ascending');

      clickTableCell(firstCell);
      expect(firstCell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_DESCENDING)).to.be.true;
      expect(firstCell.getAttribute('aria-sort')).to.equal('descending');

      await harness.destroy();
    });

    it('should not sort column when clicking non-sortable column', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;

      harness.component.columnConfigurations = testColumns;

      const headerRow = harness.getTableHeaderRow();
      const secondCell = headerRow.cells.item(1) as HTMLTableCellElement;
      const sortIconElement = secondCell.querySelector(`.${TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ICON}`);

      const callback = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback);

      secondCell.click();

      const hasSortClass =
        secondCell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_DESCENDING) ||
        secondCell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_ASCENDING);

      expect(callback).to.not.have.been.called;
      expect(hasSortClass).to.be.false;
      expect(secondCell.hasAttribute('aria-sort')).to.be.false;
      expect(sortIconElement).to.be.null;

      await harness.destroy();
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

      expect(firstCell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_ASCENDING)).to.be.false;
      expect(firstCell.hasAttribute('aria-sort')).to.be.false;
      expect(secondCell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_ASCENDING)).to.be.true;
      expect(secondCell.getAttribute('aria-sort')).to.equal('ascending');
      expect(firstCellSortIcon.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ICON_ACTIVE)).to.be.false;
      expect(secondCellSortIcon.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ICON_ACTIVE)).to.be.true;

      await harness.destroy();
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

      expect(firstCell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_ASCENDING)).to.be.true;
      expect(firstCell.getAttribute('aria-sort')).to.equal('ascending');
      expect(secondCell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_ASCENDING)).to.be.false;
      expect(secondCell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_DESCENDING)).to.be.false;
      expect(secondCell.hasAttribute('aria-sort')).to.be.false;
      expect(firstCellSortIcon.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ICON_ACTIVE)).to.be.true;
      expect(secondCellSortIcon.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ICON_ACTIVE)).to.be.false;

      await harness.destroy();
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

      expect(direction).to.equal(SortDirection.Ascending);
      expect(columnIndex).to.equal(1);

      await harness.destroy();
    });

    it('should not emit sort event if select column cell is clicked', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.multiselect = false;
      harness.component.selectKey = 'Id';

      const callback = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback);

      const headerRow = harness.getTableHeaderRow();
      headerRow.cells.item(0)!.click();

      expect(callback).to.not.have.been.called;

      await harness.destroy();
    });

    it('should not set host attribute for select key if is array type', async () => {
      const harness = await createFixture();
      harness.component.selectKey = ['Id'];

      expect(harness.component.hasAttribute(TABLE_CONSTANTS.attributes.SELECT_KEY)).to.be.false;

      await harness.destroy();
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

      expect(selectedRows.length).to.equal(0);

      await harness.destroy();
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

      expect(selectedRows.length).to.equal(2);

      await harness.destroy();
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

      expect(selectedRows.length).to.equal(2);

      await harness.destroy();
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

      expect(selectedRows.length).to.equal(1);

      await harness.destroy();
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
      expect(selectedRows.length).to.equal(1);

      await frame();

      harness.component.selectRows([data[1]], true);
      selectedRows = harness.getTableBodyRows().filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));
      expect(selectedRows.length).to.equal(2);

      await harness.destroy();
    });

    it('should hide column', async () => {
      const harness = await createFixture();
      harness.component.columnConfigurations = columns;
      harness.component.hideColumn(0);

      const headerRow = harness.getTableHeaderRow();

      expect(headerRow.cells.length).to.equal(columns.length - 1);

      await harness.destroy();
    });

    it('should return whether a column is hidden or not', async () => {
      const harness = await createFixture();
      harness.component.columnConfigurations = columns;
      harness.component.hideColumn(0);

      expect(harness.component.isColumnHidden(0)).to.be.true;
      expect(harness.component.isColumnHidden(1)).to.be.false;

      await harness.destroy();
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
      expect(harness.core._sortedColumnIndex).to.be.greaterThan(-1);
      harness.component.hideColumn(0);
      expect(harness.core._sortedColumnIndex).to.equal(-1);

      await harness.destroy();
    });

    it('should not create column config if config alreaady exist on column hide', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;
      testColumns[1].sortable = true;

      harness.component.columnConfigurations = testColumns;

      expect(harness.core._hiddenColumnManager.count()).to.equal(0);
      harness.component.hideColumn(0);
      expect(harness.core._hiddenColumnManager.count()).to.equal(1);
      harness.component.hideColumn(0);
      expect(harness.core._hiddenColumnManager.count()).to.equal(1);

      await harness.destroy();
    });

    it('should show column', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].hidden = true;

      harness.component.columnConfigurations = testColumns;
      harness.component.showColumn(0);

      const headerRow = harness.getTableHeaderRow();

      expect(headerRow.cells.length).to.equal(columns.length);

      await harness.destroy();
    });

    it('should not remove column config if config already exist on column show', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;
      testColumns[1].sortable = true;

      harness.component.columnConfigurations = testColumns;

      harness.component.hideColumn(0);
      expect(harness.core._hiddenColumnManager.count()).to.equal(1);
      harness.component.showColumn(0);
      expect(harness.core._hiddenColumnManager.count()).to.equal(0);
      harness.component.showColumn(0);
      expect(harness.core._hiddenColumnManager.count()).to.equal(0);

      await harness.destroy();
    });

    it('should get selected rows', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.selectKey = 'Id';

      harness.component.selectRows([data[0], data[1]]);
      expect(harness.component.getSelectedRows().length).to.equal(2);

      await harness.destroy();
    });

    xit('should not listen for selectAll if multiselect is off and select is on', async () => {
      // Test disabled - unclear how to test undefined listener
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

      expect(selectedRows.length).to.equal(0);

      await harness.destroy();
    });

    it('should render table properly', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;

      harness.component.render();

      const headerRow = harness.getTableHeaderRow();
      const rows = harness.getTableBodyRows();

      expect(headerRow.cells.length).to.equal(columns.length);
      expect(rows.length).to.equal(data.length);

      await harness.destroy();
    });

    it('should expand a collapsed row', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;

      harness.component.render();

      harness.component.expandRow(0, '');
      expect(harness.component.isRowExpanded(0)).to.be.true;

      await harness.destroy();
    });

    it('should throw if table has not rendered and it expands a collapsed row', async () => {
      const harness = await createFixture();
      expect(() => harness.component.expandRow(0, '')).to.throw('Cannot expand a row before the table has rendered.');

      await harness.destroy();
    });

    it('should throw if a negative row index is used on expand row', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;

      harness.component.render();

      expect(() => harness.component.expandRow(-1, '')).to.throw('Invalid row index: -1.');

      await harness.destroy();
    });

    it('should throw if the row index is greater than the number of table rows on expand row', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;

      harness.component.render();
      const rows = harness.getTableBodyRows();
      expect(() => harness.component.expandRow(rows.length + 1, '')).to.throw(`Invalid row index: ${rows.length + 1}.`);

      await harness.destroy();
    });

    it('should collapse an expanded row', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;

      harness.component.render();

      harness.component.expandRow(0, '');

      harness.component.render();

      harness.component.collapseRow(0);

      expect(harness.component.isRowExpanded(0)).to.be.false;

      await harness.destroy();
    });

    it('should not collapse an expanded row if the table has not rendered', async () => {
      const harness = await createFixture();
      expect(harness.core._rendered).to.be.false;
      let resolved = false;
      harness.component.collapseRow(0).then(() => (resolved = true));

      await frame();
      expect(harness.core._rendered).to.be.false;
      expect(resolved).to.be.true;

      await harness.destroy();
    });

    it('should not collapse if a negative row index is used on collapse row', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      let resolved = false;
      harness.component.render();

      harness.component.collapseRow(-1).then(() => (resolved = true));

      await frame();
      expect(resolved).to.be.true;

      await harness.destroy();
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
      expect(resolved).to.be.true;

      await harness.destroy();
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

      expect(selectedRows.length).to.equal(2);

      await harness.destroy();
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

      expect(selectedRows.length).to.equal(1);

      await harness.destroy();
    });

    it('should not render rows if no columns have been set but data changes', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.data = [data[0], data[2], data[3]];

      const rows = harness.getTableBodyRows();

      expect(rows.length).to.equal(0);

      await harness.destroy();
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

      expect(headerRow.cells.item(0)!.style.width).to.equal('500px');
      expect(headerRow.cells.item(1)!.style.width).to.equal('500px');
      expect(headerRow.cells.item(2)!.style.width).to.equal('50%');
      expect(headerRow.cells.item(3)!.style.width).to.equal('100px');
      expect(headerRow.cells.item(4)!.style.width).to.equal('');

      await harness.destroy();
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

      expect(headerColumnOneCellContainer.classList.contains(TABLE_CONSTANTS.classes.TABLE_CELL_CENTER)).to.be.true;
      expect(rowColumnOneCellContainer.classList.contains(TABLE_CONSTANTS.classes.TABLE_CELL_CENTER)).to.be.true;

      expect(headerColumnTwoCellContainer.classList.contains(TABLE_CONSTANTS.classes.TABLE_CELL_RIGHT)).to.be.true;
      expect(rowColumnTwoCellContainer.classList.contains(TABLE_CONSTANTS.classes.TABLE_CELL_RIGHT)).to.be.true;

      await harness.destroy();
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
      expect(everyRowCellContainsTemplate).to.be.true;

      await harness.destroy();
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
      expect(everyRowCellContainsTemplate).to.be.true;

      await harness.destroy();
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
      expect(everyRowCellUppercase).to.be.true;

      await harness.destroy();
    });

    it('should not show filter row when no columns are defined to have filters', async () => {
      const harness = await createFixture();
      const testColumns: IColumnConfiguration[] = deepCopy(columns);
      harness.component.data = data;
      harness.component.columnConfigurations = testColumns;
      harness.component.filter = true;

      const lastTableRow = getLastTableHeaderRow(harness.tableElement);
      expect(lastTableRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_ROW_FILTER)).to.be.false;

      await harness.destroy();
    });

    it('should show filter row when at least one column has a filter', async () => {
      const harness = await createFixture();
      const testColumns: IColumnConfiguration[] = deepCopy(columns);
      testColumns[0].filter = true;

      harness.component.data = data;
      harness.component.columnConfigurations = testColumns;
      harness.component.filter = true;

      const lastTableRow = getLastTableHeaderRow(harness.tableElement);
      expect(lastTableRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_ROW_FILTER)).to.be.true;

      await harness.destroy();
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
      expect(lastTableRow.cells.item(firstFilterCellIndex++)!.querySelector('input[type=text]')).to.exist;
      expect(lastTableRow.cells.item(firstFilterCellIndex++)!.querySelector('input[type=text]')).to.be.null;
      expect(lastTableRow.cells.item(firstFilterCellIndex++)!.querySelector('input[type=text]')).to.be.null;

      await harness.destroy();
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

      const filterCallback = spy((evt: CustomEvent) => {
        const evtData = evt.detail as ITableFilterEventData;
        expect(evtData.value).to.equal('a');
        expect(evtData.columnIndex).to.equal(0);
      });
      harness.component.addEventListener(TABLE_CONSTANTS.events.FILTER, filterCallback as any);

      filterInputElement.value = 'a';
      filterInputElement.dispatchEvent(new Event('input'));

      await task(filterDebounceTime);

      expect(filterCallback).to.have.been.calledOnce;

      await harness.destroy();
    });

    it('should remove resize handle when resizable is turned off', async () => {
      const harness = await createFixture();
      harness.component.resizable = true;
      harness.component.columnConfigurations = resizableColumns;

      harness.component.resizable = false;
      const firstCell = harness.getTableHeaderRow().cells.item(0) as HTMLTableHeaderCellElement;
      const resizeHandle = firstCell.querySelector(`.${TABLE_CONSTANTS.classes.TABLE_RESIZE_HANDLE}`);

      expect(resizeHandle).to.be.null;

      await harness.destroy();
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

      expect(firstCell.style.width).to.equal(`${originalWidth + 100}px`);

      await harness.destroy();
    });

    it('should emit event when column has been resized', async () => {
      const harness = await createFixture();
      harness.component.resizable = true;
      harness.component.columnConfigurations = resizableColumns;

      const resizeCallback = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.COLUMN_RESIZE, resizeCallback);

      const firstCell = harness.getTableHeaderRow().cells.item(0) as HTMLTableHeaderCellElement;
      const originalWidth = firstCell.offsetWidth;
      const resizeHandle = getTableResizeHandle(harness.tableElement);

      resizeHandle.dispatchEvent(new MouseEvent('mousedown', { clientX: firstCell.offsetWidth, clientY: 0, bubbles: true }));
      harness.core._onMouseMove(new MouseEvent('mousemove', { clientX: originalWidth + 100, clientY: 0, bubbles: true }));
      harness.core._onMouseUp(new MouseEvent('mouseup', { clientX: originalWidth + 100, clientY: 0, bubbles: true }));

      expect(resizeCallback).to.have.been.calledOnce;

      await harness.destroy();
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

      expect(firstCell.style.width).to.equal('100px');

      await harness.destroy();
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

      expect(parseInt(firstCell.style.width, 10)).to.be.greaterThan(10);

      await harness.destroy();
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
      expect(selectedRows.length).to.equal(4);

      await harness.destroy();
    });

    it('should emit multiple select events on shift click', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.selectKey = 'Id';
      harness.component.multiselect = true;

      const callback = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SELECT, callback);

      const rows = harness.getTableBodyRows();
      const checkbox1 = rows[0].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
      const checkbox2 = rows[3].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;

      checkbox1.dispatchEvent(new PointerEvent('pointerdown'));
      checkbox2.dispatchEvent(new PointerEvent('pointerdown', { shiftKey: true }));

      expect(callback.callCount).to.equal(4);

      await harness.destroy();
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
      expect(selectedRows.length).to.equal(0);

      await harness.destroy();
    });

    it('should not emit sort event when right clicking sortable column', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;

      harness.component.columnConfigurations = testColumns;

      const callback = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback);

      const headerRow = harness.getTableHeaderRow();
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      const button = firstCell.querySelector('button') as HTMLButtonElement;
      button.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, button: 2 }));
      button.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, button: 2 }));

      expect(callback).to.not.have.been.called;

      await harness.destroy();
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
      expect(rows[0].classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).to.be.true;

      await harness.destroy();
    });

    it('should check if row is selected by the data object', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.columnConfigurations = columns;
      harness.component.select = true;
      harness.component.selectKey = 'Id';

      harness.component.selectRow(data[0]);

      expect(harness.component.isRowSelected(data[0])).to.be.true;

      await harness.destroy();
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
      expect(rows[0].classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).to.be.false;

      await harness.destroy();
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
      expect(rows[0].classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).to.be.false;
      expect(rows[1].classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).to.be.false;

      await harness.destroy();
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

      expect(selectAllCheckbox.indeterminate).to.be.true;

      await harness.destroy();
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

      expect(selectAllCheckbox.indeterminate).to.be.true;

      selectAllCheckbox.click();

      expect(selectAllCheckbox.indeterminate).to.be.false;
      expect(selectAllCheckbox.checked).to.be.true;

      await harness.destroy();
    });

    it('should contain custom header template', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;
      testColumns[0].headerTemplate = () => '<span>Hello Goodbye</span>';

      harness.component.columnConfigurations = testColumns;
      await frame();

      const callback = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback);

      const headerRow = harness.getTableHeaderRow();
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      expect(firstCell.innerHTML).to.contain('Hello Goodbye');

      await harness.destroy();
    });

    it('should contain custom header template without a aria-hidden attribute', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;
      testColumns[0].headerTemplate = () => '<span>Hello Goodbye</span>';

      harness.component.columnConfigurations = testColumns;
      await frame();

      const callback = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback);

      const headerRow = harness.getTableHeaderRow();
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      expect(firstCell.hasAttribute('aria-hidden')).to.be.false;

      await harness.destroy();
    });

    it('should contain custom header template with sort arrow', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;
      testColumns[0].headerTemplate = () => '<span>Hello Goodbye</span>';

      harness.component.columnConfigurations = testColumns;

      const callback = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback);

      const headerRow = harness.getTableHeaderRow();
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      await frame();
      clickTableCell(firstCell);
      expect(firstCell.innerHTML).to.contain('Hello Goodbye');
      expect(callback).to.have.been.called;
      expect(firstCell.innerHTML).to.contain(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ICON);

      await harness.destroy();
    });

    it('should emit array of sorted columns with multiple column sort', async () => {
      const harness = await createFixture();
      harness.component.multiColumnSort = true;
      const testColumns = deepCopy(columns) as IColumnConfiguration[];
      testColumns.forEach(c => (c.sortable = true));

      harness.component.columnConfigurations = testColumns;

      let emitedResult: ITableSortMultipleEventData | undefined;

      const callback = spy((evt: CustomEvent<ITableSortMultipleEventData>) => {
        emitedResult = evt.detail;
      });
      harness.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback as any);

      const headerRow = harness.getTableHeaderRow();
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      await frame();
      clickTableCell(firstCell);
      expect(callback).to.have.been.called;
      expect(Array.isArray(emitedResult)).to.be.true;

      await harness.destroy();
    });

    it('should emit sorted on both `name` and `position', async () => {
      const harness = await createFixture();
      harness.component.multiColumnSort = true;
      const testColumns = deepCopy(columns) as IColumnConfiguration[];
      testColumns.forEach(c => (c.sortable = true));

      harness.component.columnConfigurations = testColumns;

      let emitedResult: ITableSortMultipleEventData | undefined;

      const callback = spy((evt: CustomEvent<ITableSortMultipleEventData>) => {
        emitedResult = evt.detail;
      });
      harness.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback as any);

      const headerRow = harness.getTableHeaderRow();
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      const secondCell = headerRow.cells.item(2) as HTMLTableCellElement;
      await frame();
      clickTableCell(firstCell);
      clickTableCell(secondCell, true);
      expect(callback).to.have.been.called;
      expect(emitedResult!.length).to.equal(2);
      expect(emitedResult![0].propertyName).to.equal('Name');
      expect(emitedResult![0].sortOrder).to.equal(1);
      expect(emitedResult![1].propertyName).to.equal('Position');
      expect(emitedResult![1].sortOrder).to.equal(2);

      await harness.destroy();
    });

    it('should execute callback when row elements are created', async () => {
      const harness = await createFixture();
      const rowCreatedSpy = spy();
      harness.component.rowCreated = rowCreatedSpy as any;
      harness.component.data = data;
      harness.component.columnConfigurations = columns;

      expect(rowCreatedSpy).to.have.callCount(data.length);

      await harness.destroy();
    });

    it('should execute callback when cell elements are created', async () => {
      const harness = await createFixture();
      const cellCreatedSpy = spy();
      harness.component.cellCreated = cellCreatedSpy as any;
      harness.component.data = data;
      harness.component.columnConfigurations = columns;

      expect(cellCreatedSpy).to.have.callCount(data.length * columns.length);

      await harness.destroy();
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

        expect(selectAllCell.querySelector('.custom-select-all-template-container')).to.exist;

        await harness.destroy();
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

        expect(selectedRows.length).to.equal(data.length);

        await harness.destroy();
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

        expect(selectedRows.length).to.equal(0);

        await harness.destroy();
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

        expect(checkbox.indeterminate).to.be.true;

        await harness.destroy();
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

        expect(checkbox.checked).to.be.true;

        await harness.destroy();
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

        expect(checkbox.checked).to.be.true;

        await harness.destroy();
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

        expect(selectAllCell).to.exist;

        await harness.destroy();
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
        expect(harness.component.selectCheckboxAlignment).to.equal(CellAlign.Left);
        expect(checkboxContainer.classList.contains(TABLE_CONSTANTS.classes.TABLE_CELL_SELECT_CHECKBOX_CONTAINER_ALIGN_LEFT)).to.be.true;

        await harness.destroy();
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
          expect(row.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).to.equal(selected);
        });

        await harness.destroy();
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
          expect(row.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).to.equal(selected);
        });

        await harness.destroy();
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

  public async destroy(): Promise<void> {
    this.container.remove();
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

  let template;

  if (hasAttrs) {
    if (hasChildren) {
      template = html`
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
      `;
    } else {
      template = html`
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
      `;
    }
  } else if (tooltipSelect || tooltipSelectAll) {
    template = html` <forge-table tooltip-select=${tooltipSelect || ''} tooltip-select-all=${tooltipSelectAll || ''}> </forge-table> `;
  } else if (hasChildren) {
    template = html`
      <forge-table>
        <span></span>
        <span></span>
      </forge-table>
    `;
  } else {
    template = html`<forge-table></forge-table>`;
  }

  const container = await fixture<HTMLElement>(template);
  const component = container as unknown as TableComponentWithCore;

  return new TableHarness(component, container);
}
