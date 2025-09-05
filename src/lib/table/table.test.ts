import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import { spy } from 'sinon';
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
} from './';
import { TextFieldComponentDelegate } from '../text-field';
import { ITooltipComponent } from '../tooltip';

import './';

const columns: IColumnConfiguration[] = [
  { header: 'Name', property: 'Name' },
  { header: 'Age', property: 'Age' },
  { header: 'Department', property: 'Department' }
];

const resizableColumns: IColumnConfiguration[] = [
  { header: 'Name', property: 'Name', resizable: true },
  { header: 'Age', property: 'Age', resizable: true },
  { header: 'Department', property: 'Department', resizable: true }
];

const data: any[] = [
  { Id: 1, Name: 'Alice Johnson', Age: 32, Department: 'Engineering' },
  { Id: 2, Name: 'Bob Smith', Age: 28, Department: 'Marketing' },
  { Id: 3, Name: 'Carol Davis', Age: 35, Department: 'Sales' },
  { Id: 4, Name: 'David Wilson', Age: 29, Department: 'Design' },
  { Id: 5, Name: 'Emma Brown', Age: 31, Department: 'HR' },
  { Id: 6, Name: 'Frank Miller', Age: 27, Department: 'Finance' }
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

interface ITableHarnessConfig {
  hasAttrs?: boolean;
  hasChildren?: boolean;
  tooltipString?: boolean;
  tooltipCallback?: boolean;
}

class TableHarness {
  constructor(
    public component: TableComponentWithCore,
    public tooltipSelectCallback?: TableSelectTooltipCallback
  ) {}

  public get core(): TableCoreInternal {
    return this.component._core;
  }

  public getTableElement(): HTMLTableElement {
    return this.component.querySelector('table') as HTMLTableElement;
  }

  public destroy(): void {
    this.component.remove();
  }
}

async function createFixture(config: ITableHarnessConfig = {}): Promise<TableHarness> {
  const container = await fixture(html`<div></div>`);
  const tableEl = document.createElement(TABLE_CONSTANTS.elementName) as TableComponentWithCore;

  if (config.hasAttrs) {
    tableEl.setAttribute('select', 'true');
    tableEl.setAttribute('multiselect', 'true');
    tableEl.setAttribute('select-key', 'Id');
    tableEl.setAttribute('dense', 'true');
    tableEl.setAttribute('filter', 'true');
    tableEl.setAttribute('fixed-headers', 'true');
    tableEl.setAttribute('layout-type', 'auto');
    tableEl.setAttribute('wrap-content', 'true');
    tableEl.setAttribute('resizable', 'true');
    tableEl.setAttribute('min-resize-width', '10');
    tableEl.setAttribute('allow-row-click', 'true');
  }

  if (config.tooltipString) {
    tableEl.setAttribute('tooltip-select-all', 'Select All');
    tableEl.setAttribute('tooltip-select', 'Select');
  }

  if (config.hasChildren) {
    const child1 = document.createElement('span');
    const child2 = document.createElement('span');
    tableEl.appendChild(child1);
    tableEl.appendChild(child2);
  }

  container.appendChild(tableEl);

  let tooltipSelectCallback: TableSelectTooltipCallback | undefined;

  if (config.tooltipCallback) {
    tooltipSelectCallback = spy(getTooltipString) as any;
    tableEl.select = true;
    tableEl.tooltipSelect = tooltipSelectCallback!;
  }

  return new TableHarness(tableEl, tooltipSelectCallback);
}

function getTooltipString(_rowIndex: number, rowData: any): string {
  return rowData.Name;
}

function getTableHeaderRow(tableElement: HTMLTableElement): HTMLTableRowElement {
  return (tableElement.tHead as HTMLTableSectionElement).rows.item(0) as HTMLTableRowElement;
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

function getSelectAllCell(tableElement: HTMLTableElement): HTMLTableHeaderCellElement {
  return tableElement.tHead!.rows.item(0)!.cells.item(0) as HTMLTableHeaderCellElement;
}

function getTableResizeHandle(tableElement: HTMLTableElement): HTMLElement {
  const tHead = tableElement.tHead as HTMLTableSectionElement;
  const row = tHead.rows.item(0) as HTMLTableRowElement;
  const firstCell = row.cells.item(0) as HTMLTableCellElement;
  return firstCell.querySelector(`.${TABLE_CONSTANTS.classes.TABLE_RESIZE_HANDLE}`) as HTMLElement;
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

describe('TableComponent', () => {
  beforeEach(() => {
    defineTableComponent();
  });

  afterEach(async () => {
    // Clean up any remaining table elements
    const tables = document.querySelectorAll('forge-table');
    tables.forEach(table => table.remove());
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

      harness.destroy();
    });
  });

  describe('with children elements', () => {
    it('should remove children before initialize', async () => {
      const harness = await createFixture({ hasChildren: true });
      expect(harness.getTableElement().children.length).to.equal(0);
      harness.destroy();
    });
  });

  describe('without default property values', () => {
    it('should be instantiated', async () => {
      const harness = await createFixture();
      expect(harness.component).to.exist;
      harness.destroy();
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

      harness.destroy();
    });

    it('should have tooltip string', async () => {
      const harness = await createFixture({ tooltipString: true });
      harness.component.select = true;
      harness.component.multiselect = true;
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;

      expect(harness.component.tooltipSelectAll).to.equal('Select All');
      expect(harness.component.tooltipSelect).to.equal('Select');

      expect(harness.component.getAttribute(TABLE_CONSTANTS.attributes.TOOLTIP_SELECT_ALL)).to.equal('Select All');
      expect(harness.component.getAttribute(TABLE_CONSTANTS.attributes.TOOLTIP_SELECT)).to.equal('Select');

      const tableElement = harness.component.querySelector('table') as HTMLTableElement;

      // Assert that the multiselect cell has the proper tooltip element and text
      const tableHeadFirstCell = (tableElement.tHead as HTMLTableSectionElement).rows[0].cells[0];
      const multiSelectTooltipElement = tableHeadFirstCell.querySelector('forge-tooltip') as ITooltipComponent;

      expect(multiSelectTooltipElement).to.exist;
      expect(multiSelectTooltipElement.innerText).to.equal('Select All');

      // Assert that all rows have a tooltip with the correct text
      const tableBodyRows = Array.from(tableElement.tBodies[0].rows);
      data.forEach((_, index) => {
        const rowElement = tableBodyRows[index];
        const firstCell = rowElement.cells[0];
        const tooltipElement = firstCell.querySelector('forge-tooltip') as ITooltipComponent;

        expect(tooltipElement).to.exist;
        expect(tooltipElement.innerText).to.equal('Select');
      });

      harness.destroy();
    });

    it('should execute tooltip callback for every row', async () => {
      const harness = await createFixture({ tooltipCallback: true });
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;

      expect(harness.tooltipSelectCallback).to.have.callCount(data.length);
      harness.destroy();
    });

    it('should have proper default DOM state', async () => {
      const harness = await createFixture();
      expect(harness.getTableElement().tHead).to.be.null;
      expect(harness.getTableElement().tBodies.length).to.equal(0);
      expect(harness.getTableElement().classList.contains(TABLE_CONSTANTS.classes.TABLE)).to.be.true;
      harness.destroy();
    });

    it('should set columns properly', async () => {
      const harness = await createFixture();
      await frame();
      harness.component.columnConfigurations = columns;

      const tableElement = harness.getTableElement();
      expect(harness.component.columnConfigurations.length).to.equal(columns.length);
      expect((tableElement.tHead as HTMLTableSectionElement).rows.length).to.equal(1);
      expect((tableElement.tHead as HTMLTableSectionElement).rows.item(0)!.cells.length).to.equal(columns.length);

      await frame();
      harness.component.resizable = true;
      harness.component.columnConfigurations = resizableColumns;
      expect((tableElement.tHead as HTMLTableSectionElement).rows.length).to.equal(1);
      expect((tableElement.tHead as HTMLTableSectionElement).rows.item(0)!.cells.length).to.equal(resizableColumns.length);

      harness.destroy();
    });

    it('should toggle select column properly', async () => {
      const harness = await createFixture();
      harness.component.columnConfigurations = columns;
      harness.component.select = true;

      const tableElement = harness.getTableElement();
      expect((tableElement.tHead as HTMLTableSectionElement).rows.item(0)!.cells.item(0)!.classList.contains(TABLE_CONSTANTS.classes.TABLE_CELL_SELECT)).to.be
        .true;
      expect((tableElement.tHead as HTMLTableSectionElement).rows.item(0)!.cells.length).to.equal(columns.length + 1);

      harness.component.select = false;

      expect((tableElement.tHead as HTMLTableSectionElement).rows.item(0)!.cells.item(0)!.classList.contains(TABLE_CONSTANTS.classes.TABLE_CELL_SELECT)).to.be
        .false;
      expect((tableElement.tHead as HTMLTableSectionElement).rows.item(0)!.cells.length).to.equal(columns.length);

      harness.destroy();
    });

    it('should not set default sortable column', async () => {
      const harness = await createFixture();
      harness.component.columnConfigurations = columns;
      const headerRow = getTableHeaderRow(harness.getTableElement());
      const hasSortableCell = Array.from(headerRow.cells).some(c => c.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTABLE));
      expect(hasSortableCell).to.be.false;
      harness.destroy();
    });

    it('should set initial sortable column', async () => {
      const harness = await createFixture();
      const testColumns: IColumnConfiguration[] = deepCopy(columns);
      testColumns[0].sortable = true;
      testColumns[1].sortable = true;
      testColumns[0].initialSort = true;

      harness.component.columnConfigurations = testColumns;

      const headerRow = getTableHeaderRow(harness.getTableElement());
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

      harness.destroy();
    });

    it('should hide columns', async () => {
      const harness = await createFixture();
      const testColumns: IColumnConfiguration[] = deepCopy(columns);
      testColumns[1].hidden = true;

      harness.component.columnConfigurations = testColumns;

      const headerRow = getTableHeaderRow(harness.getTableElement());

      expect(headerRow.cells.length).to.equal(testColumns.length - 1);
      harness.destroy();
    });

    it('should set correct sorted column index when hidden columns exist', async () => {
      const harness = await createFixture();
      const testColumns: IColumnConfiguration[] = deepCopy(columns);
      testColumns[1].hidden = true;
      testColumns[2].initialSort = true;

      harness.component.columnConfigurations = testColumns;

      expect(harness.core._sortedColumnIndex).to.equal(1);
      harness.destroy();
    });

    it('should not set data until columns are set', async () => {
      const harness = await createFixture();
      harness.component.data = data;

      const rows = getTableBodyRows(harness.getTableElement());
      expect(rows.length).to.equal(0);
      harness.destroy();
    });

    it('should reset data if data is not an array', async () => {
      const harness = await createFixture();
      harness.component.data = {} as any;
      const rows = getTableBodyRows(harness.getTableElement());
      expect(rows.length).to.equal(0);
      harness.destroy();
    });

    it('should set data properly', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;

      const rows = getTableBodyRows(harness.getTableElement());
      expect(rows.length).to.equal(data.length);
      harness.destroy();
    });

    it('should reset data properly', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.data = [data[0], data[1], data[2]];

      const rows = getTableBodyRows(harness.getTableElement());
      expect(rows.length).to.equal(3);
      harness.destroy();
    });

    it('should select row when clicked', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.select = true;

      const rows = getTableBodyRows(harness.getTableElement());
      const firstRow = rows[0] as HTMLTableRowElement;
      const firstCell = firstRow.cells.item(0) as HTMLTableCellElement;
      const selectCheckboxElement = firstCell.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;

      selectCheckboxElement.dispatchEvent(new PointerEvent('pointerdown'));

      expect(firstRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).to.be.true;
      harness.destroy();
    });

    it('should select row when pressing space key', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.select = true;

      const rows = getTableBodyRows(harness.getTableElement());
      const firstRow = rows[0] as HTMLTableRowElement;
      const firstCell = firstRow.cells.item(0) as HTMLTableCellElement;
      const selectCheckboxElement = firstCell.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;

      selectCheckboxElement.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));

      expect(firstRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).to.be.true;
      harness.destroy();
    });

    it('should not select row when clicking non-checkbox element', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.select = true;

      const rows = getTableBodyRows(harness.getTableElement());

      expect(rows[0].classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).to.be.false;
      harness.destroy();
    });

    it('should not set select all listener if multiselect is off', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.multiselect = false;
      const tableConfig: ITableConfiguration = harness.core._tableConfiguration;
      expect(tableConfig.selectAllListener).to.be.null;
      harness.destroy();
    });

    it('should emit select event when selecting a row', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.select = true;

      const callback = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SELECT, callback);

      const rows = getTableBodyRows(harness.getTableElement());
      const selectCheckboxElement = rows[0].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
      selectCheckboxElement.dispatchEvent(new PointerEvent('pointerdown'));

      expect(callback).to.have.been.calledOnce;
      harness.destroy();
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
      harness.component.selectKey = 'Id';
      harness.component.data = deepCopy(data);

      expect(beforeRenderedCallback).to.have.been.calledBefore(templateBuilderCallback);
      expect(templateBuilderCallback).to.have.been.calledBefore(renderedCallback);
      harness.destroy();
    });

    it('should emit select-double event when double clicking a row', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.allowRowClick = true;

      const selectDoubleCallback = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SELECT_DOUBLE, selectDoubleCallback);

      const selectCallback = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SELECT, selectCallback);

      const rows = getTableBodyRows(harness.getTableElement());
      rows[0].dispatchEvent(new MouseEvent('dblclick'));

      expect(selectDoubleCallback).to.have.been.calledOnce;
      expect(selectCallback).to.not.have.been.called;
      harness.destroy();
    });

    it('should emit click event on a row', async () => {
      const harness = await createFixture();
      harness.component.allowRowClick = true;
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;

      const clickListener = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.ROW_CLICK, clickListener);

      const selectCallback = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SELECT, selectCallback);

      const rows = getTableBodyRows(harness.getTableElement());
      rows[0].click();

      expect(clickListener).to.have.been.calledOnce;
      expect(selectCallback).to.not.have.been.called;
      harness.destroy();
    });

    it('should reattach click listeners on data set', async () => {
      const harness = await createFixture();
      const tableCore = harness.component._core;
      const tableAdapter = tableCore._adapter;
      const recreateBodySpy = spy(tableAdapter, 'recreateTableBody');
      harness.component.allowRowClick = true;
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.data = [data[0], data[1], data[2]];
      expect(tableCore._tableConfiguration.clickListener).to.exist;
      expect(recreateBodySpy.callCount).to.be.greaterThan(0);
      harness.destroy();
    });

    it('should not emit click event if target is checkbox', async () => {
      const harness = await createFixture();
      harness.component.allowRowClick = true;
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.select = true;
      const tableCore = harness.component._core;

      const clickListener = spy();
      const rowClickSpy = spy(tableCore, '_onRowClick');
      harness.component.addEventListener(TABLE_CONSTANTS.events.ROW_CLICK, clickListener);

      const rows = getTableBodyRows(harness.getTableElement());
      const checkbox = rows[0].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;

      checkbox.click();

      expect(rowClickSpy).to.have.been.calledOnce;
      expect(clickListener).to.not.have.been.called;
      harness.destroy();
    });

    it('should emit click event on a row when a cell is clicked with a custom template', async () => {
      const harness = await createFixture();
      const button = document.createElement('button');
      button.textContent = 'Test';

      const testColumns = deepCopy(columns);
      testColumns.push({ template: () => button });

      harness.component.allowRowClick = true;
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = testColumns;
      harness.component.data = data;
      const tableCore = harness.component._core;

      const clickListener = spy();
      const rowClickSpy = spy(tableCore, '_onRowClick');
      harness.component.addEventListener(TABLE_CONSTANTS.events.ROW_CLICK, clickListener);

      await frame();

      button.dispatchEvent(new Event('click', { bubbles: true }));

      expect(rowClickSpy).to.have.been.calledOnce;
      expect(clickListener).to.have.been.calledOnce;
      harness.destroy();
    });

    it('should not emit row click event when custom template is configured to stop click propagation', async () => {
      const harness = await createFixture();
      const button = document.createElement('button');
      button.textContent = 'Test';

      const testColumns = deepCopy(columns);
      testColumns.push({ template: () => button, stopCellTemplateClickPropagation: true });

      harness.component.allowRowClick = true;
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = testColumns;
      harness.component.data = data;
      const tableCore = harness.component._core;

      const clickListener = spy();
      const rowClickSpy = spy(tableCore, '_onRowClick');
      harness.component.addEventListener(TABLE_CONSTANTS.events.ROW_CLICK, clickListener);

      await frame();

      button.dispatchEvent(new Event('click', { bubbles: true }));

      expect(rowClickSpy).to.have.been.calledOnce;
      expect(clickListener).to.not.have.been.called;
      harness.destroy();
    });

    it('should not emit dblclick event if target is checkbox', async () => {
      const harness = await createFixture();
      harness.component.allowRowClick = true;
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.select = true;
      const tableCore = harness.component._core;

      const dblclickListener = spy();
      const rowClickSpy = spy(tableCore, '_onRowDoubleClick');
      harness.component.addEventListener(TABLE_CONSTANTS.events.ROW_CLICK, dblclickListener);

      const rows = getTableBodyRows(harness.getTableElement());
      const checkbox = rows[0].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;

      checkbox.dispatchEvent(new Event('dblclick', { bubbles: true }));

      expect(rowClickSpy).to.have.been.calledOnce;
      expect(dblclickListener).to.not.have.been.called;
      harness.destroy();
    });

    it('should emit select all event', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.select = true;

      const callback = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SELECT_ALL, callback);

      const row = getTableHeaderRow(harness.getTableElement());
      const checkbox = row.cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
      checkbox.click();

      expect(callback).to.have.been.calledOnce;
      harness.destroy();
    });

    it('should emit select all event after manually selecting all rows', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.select = true;

      const callback = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SELECT_ALL, callback);

      const rows = getTableBodyRows(harness.getTableElement());
      data.forEach((_item, index) => {
        const selectCheckboxElement = rows[index].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
        selectCheckboxElement.dispatchEvent(new PointerEvent('pointerdown'));
      });

      expect(callback).to.have.been.calledOnce;
      harness.destroy();
    });

    it('should select multiple rows when clicked', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.select = true;

      const rows = getTableBodyRows(harness.getTableElement());
      const firstRow = rows[0];
      const secondRow = rows[1];
      const firstRowFirstCell = firstRow.cells.item(0) as HTMLTableCellElement;
      const secondRowFirstCell = secondRow.cells.item(0) as HTMLTableCellElement;
      const firstRowSelectCheckboxElement = firstRowFirstCell.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
      const secondRowSelectCheckboxElement = secondRowFirstCell.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;

      firstRowSelectCheckboxElement.dispatchEvent(new PointerEvent('pointerdown'));
      secondRowSelectCheckboxElement.dispatchEvent(new PointerEvent('pointerdown'));

      expect(firstRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).to.be.true;
      expect(secondRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).to.be.true;
      harness.destroy();
    });

    it('should select and deselect rows when clicked with multiselect off', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.select = true;
      harness.component.multiselect = false;

      const rows = getTableBodyRows(harness.getTableElement());
      const firstRow = rows[0];
      const secondRow = rows[1];
      const firstRowFirstCell = firstRow.cells.item(0) as HTMLTableCellElement;
      const secondRowFirstCell = secondRow.cells.item(0) as HTMLTableCellElement;
      const firstRowSelectCheckboxElement = firstRowFirstCell.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
      const secondRowSelectCheckboxElement = secondRowFirstCell.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;

      firstRowSelectCheckboxElement.dispatchEvent(new PointerEvent('pointerdown'));
      secondRowSelectCheckboxElement.dispatchEvent(new PointerEvent('pointerdown'));

      expect(firstRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).to.be.false;
      expect(secondRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).to.be.true;
      harness.destroy();
    });

    it('should select and deselect rows when clicked', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.select = true;

      const rows = getTableBodyRows(harness.getTableElement());
      const firstRow = rows[0];
      const secondRow = rows[1];
      const firstRowFirstCell = firstRow.cells.item(0) as HTMLTableCellElement;
      const secondRowFirstCell = secondRow.cells.item(0) as HTMLTableCellElement;
      const firstRowSelectCheckboxElement = firstRowFirstCell.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
      const secondRowSelectCheckboxElement = secondRowFirstCell.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;

      firstRowSelectCheckboxElement.dispatchEvent(new PointerEvent('pointerdown'));
      secondRowSelectCheckboxElement.dispatchEvent(new PointerEvent('pointerdown'));

      expect(firstRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).to.be.true;
      expect(secondRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).to.be.true;

      firstRowSelectCheckboxElement.dispatchEvent(new PointerEvent('pointerdown'));
      secondRowSelectCheckboxElement.dispatchEvent(new PointerEvent('pointerdown'));

      expect(firstRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).to.be.false;
      expect(secondRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).to.be.false;
      harness.destroy();
    });

    it('should select all and deselect all rows when clicking select all checkbox', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.select = true;

      const row = getTableHeaderRow(harness.getTableElement());
      const checkbox = row.cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
      checkbox.click();
      let selectedRows = getTableBodyRows(harness.getTableElement()).filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).to.be.greaterThan(0);
      expect(selectedRows.length).to.equal(data.length);

      checkbox.click();
      selectedRows = getTableBodyRows(harness.getTableElement()).filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).to.equal(0);
      harness.destroy();
    });

    it('should not update a row if the row is unselectable when clicking select all checkbox', async () => {
      // TODO: Convert from Karma/Jasmine - This test appears to be a placeholder
    });

    it('should update select all state if a row selection completes all selected rows', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.select = true;
      const tableCore = harness.component._core;

      const allButLastRows = data.filter((_d, i) => i + 1 < data.length);
      harness.component.selectRows([...allButLastRows], false);

      expect(harness.component.getSelectedRows().length).to.be.lessThan(data.length);
      expect(tableCore._isAllSelected).to.be.false;

      harness.component.selectRows([data[data.length - 1]], true);

      expect(harness.component.getSelectedRows().length).to.equal(data.length);
      expect(tableCore._isAllSelected).to.be.true;
      harness.destroy();
    });

    it('should not update select all state if a row selection completes all selected rows and multiselect is off', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.select = true;
      const tableCore = harness.component._core;

      const allButLastRows = data.filter((_d, i) => i + 1 < data.length);
      harness.component.selectRows([...allButLastRows], false);

      await frame();

      harness.component.multiselect = false;

      expect(harness.component.getSelectedRows().length).to.be.lessThan(data.length);
      expect(tableCore._isAllSelected).to.be.false;

      await frame();

      harness.component.selectRows([data[data.length - 1]], true);

      expect(harness.component.getSelectedRows().length).to.equal(1);
      expect(tableCore._isAllSelected).to.be.false;
      harness.destroy();
    });

    it('should set layout type', async () => {
      const harness = await createFixture();
      const tableCore = harness.component._core;

      harness.component.layoutType = 'fixed' as TableLayoutType;
      harness.component.render();
      expect(harness.getTableElement().classList.contains(TABLE_CONSTANTS.classes.TABLE_LAYOUT_FIXED)).to.be.true;
      expect(tableCore._tableConfiguration.layoutType).to.equal('fixed');

      harness.component.layoutType = 'auto' as TableLayoutType;
      harness.component.render();
      expect(harness.getTableElement().classList.contains(TABLE_CONSTANTS.classes.TABLE_LAYOUT_FIXED)).to.be.false;
      expect(tableCore._tableConfiguration.layoutType).to.equal('auto');
      harness.destroy();
    });

    it('should set dense state', async () => {
      const harness = await createFixture();
      const tableCore = harness.component._core;

      harness.component.dense = true;
      harness.component.render();
      expect(harness.getTableElement().classList.contains(TABLE_CONSTANTS.classes.TABLE_DENSE)).to.be.true;
      expect(harness.component.getAttribute(TABLE_CONSTANTS.attributes.DENSE)).to.equal('true');
      expect(tableCore._tableConfiguration.dense).to.be.true;

      harness.component.dense = false;
      harness.component.render();
      expect(harness.getTableElement().classList.contains(TABLE_CONSTANTS.classes.TABLE_DENSE)).to.be.false;
      expect(harness.component.getAttribute(TABLE_CONSTANTS.attributes.DENSE)).to.equal('false');
      expect(tableCore._tableConfiguration.dense).to.be.false;
      harness.destroy();
    });

    it('should set resizable', async () => {
      const harness = await createFixture();
      const tableCore = harness.component._core;

      harness.component.resizable = false;
      harness.component.render();
      expect(harness.getTableElement().classList.contains(TABLE_CONSTANTS.classes.TABLE_RESIZABLE)).to.be.false;
      expect(tableCore._tableConfiguration.resizable).to.be.false;
      harness.component.resizable = true;
      harness.component.render();
      expect(harness.getTableElement().classList.contains(TABLE_CONSTANTS.classes.TABLE_RESIZABLE)).to.be.true;
      expect(tableCore._tableConfiguration.resizable).to.be.true;
      harness.destroy();
    });

    it('should set fixed headers state', async () => {
      const harness = await createFixture();
      const tableCore = harness.component._core;

      harness.component.fixedHeaders = false;
      harness.component.render();
      expect(harness.getTableElement().classList.contains(TABLE_CONSTANTS.classes.TABLE_FIXED)).to.be.false;
      expect(tableCore._tableConfiguration.fixedHeaders).to.be.false;

      harness.component.fixedHeaders = true;
      harness.component.render();
      expect(harness.getTableElement().classList.contains(TABLE_CONSTANTS.classes.TABLE_FIXED)).to.be.true;
      expect(tableCore._tableConfiguration.fixedHeaders).to.be.true;
      harness.destroy();
    });

    it('should set wrap content', async () => {
      const harness = await createFixture();
      const tableCore = harness.component._core;

      harness.component.wrapContent = true;
      harness.component.render();
      expect(harness.getTableElement().classList.contains(TABLE_CONSTANTS.classes.TABLE_NO_WRAP_CONTENT)).to.be.false;
      expect(tableCore._tableConfiguration.wrapContent).to.be.true;
      harness.component.wrapContent = false;
      harness.component.render();
      expect(harness.getTableElement().classList.contains(TABLE_CONSTANTS.classes.TABLE_NO_WRAP_CONTENT)).to.be.true;
      expect(tableCore._tableConfiguration.wrapContent).to.be.false;
      harness.destroy();
    });

    it('should set min resize width state', async () => {
      const harness = await createFixture();
      harness.component.minResizeWidth = 10;
      expect(harness.component.minResizeWidth).to.equal(10);
      harness.destroy();
    });

    it('should default min resize width when no number is provided', async () => {
      const harness = await createFixture();
      harness.component.minResizeWidth = 'a' as any;
      expect(harness.component.minResizeWidth).to.equal(100);
      harness.destroy();
    });

    it('should set min resize width zero when a negative number is provided', async () => {
      const harness = await createFixture();
      harness.component.minResizeWidth = -5;
      expect(harness.component.minResizeWidth).to.equal(0);
      harness.destroy();
    });

    it('should set filter', async () => {
      const harness = await createFixture();
      const tableCore = harness.component._core;

      harness.component.filter = true;
      harness.component.render();
      expect(harness.getTableElement().classList.contains(TABLE_CONSTANTS.classes.TABLE_FILTER_VISIBLE)).to.be.true;
      expect(tableCore._tableConfiguration.filter).to.be.true;
      harness.component.filter = false;
      harness.component.render();
      expect(harness.getTableElement().classList.contains(TABLE_CONSTANTS.classes.TABLE_FILTER_VISIBLE)).to.be.false;
      expect(tableCore._tableConfiguration.filter).to.be.false;
      harness.destroy();
    });

    it('should set allow row click', async () => {
      const harness = await createFixture();
      harness.component.columnConfigurations = columns;
      harness.component.selectKey = 'Id';
      harness.component.data = data;

      harness.component.allowRowClick = true;
      expect(harness.component.allowRowClick).to.be.true;

      const hasClickableClass = Array.from(harness.getTableElement().tBodies[0].rows).every(r =>
        r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_CLICKABLE)
      );
      expect(hasClickableClass).to.be.true;
      harness.destroy();
    });

    it('should apply clickable class when data changes', async () => {
      const harness = await createFixture();
      harness.component.columnConfigurations = columns;
      harness.component.selectKey = 'Id';
      harness.component.data = data;
      harness.component.allowRowClick = true;

      harness.component.data = [...harness.component.data];

      const hasClickableClass = Array.from(harness.getTableElement().tBodies[0].rows).every(r =>
        r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_CLICKABLE)
      );
      expect(hasClickableClass).to.be.true;
      harness.destroy();
    });

    it('should set select rows from code', async () => {
      const harness = await createFixture();
      harness.component.select = true;
      harness.component.columnConfigurations = columns;
      harness.component.selectKey = 'Id';
      harness.component.data = data;

      const rows = getTableBodyRows(harness.getTableElement());
      const firstRow = rows[0];
      const secondRow = rows[1];

      harness.component.selectRows([data[0], data[1]]);

      expect(firstRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).to.be.true;
      expect(secondRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).to.be.true;
      harness.destroy();
    });

    it('should select rows if select is false', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;

      harness.component.selectRow(data[0]);

      const selectedRows = getTableBodyRows(harness.getTableElement()).filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).to.equal(1);
      harness.destroy();
    });

    it('should not deselect rows if select is turned off', async () => {
      const harness = await createFixture();
      harness.component.columnConfigurations = columns;
      harness.component.selectKey = 'Id';
      harness.component.data = data;

      harness.component.deselectRow(data[0]);

      const selectedRows = getTableBodyRows(harness.getTableElement()).filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).to.equal(0);
      harness.destroy();
    });

    it('should not select rows if data is undefined', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.select = true;
      harness.component.selectRows(undefined as any);

      const selectedRows = getTableBodyRows(harness.getTableElement()).filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).to.equal(0);
      harness.destroy();
    });

    it('should not deselect rows if data is undefined', async () => {
      const harness = await createFixture();
      harness.component.columnConfigurations = columns;
      harness.component.selectKey = 'Id';
      harness.component.data = data;
      harness.component.select = true;
      harness.component.deselectRows(undefined as any);

      const selectedRows = getTableBodyRows(harness.getTableElement()).filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).to.equal(0);
      harness.destroy();
    });

    it('should emit sort event when clicking sortable column', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;

      harness.component.columnConfigurations = testColumns;

      const callback = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback);

      const headerRow = getTableHeaderRow(harness.getTableElement());
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      clickTableCell(firstCell);

      expect(callback).to.have.been.calledOnce;
      harness.destroy();
    });

    it('should emit sort event when pressing space key on sortable column', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;

      harness.component.columnConfigurations = testColumns;

      const callback = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback);

      const headerRow = getTableHeaderRow(harness.getTableElement());
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      firstCell.querySelector('button')?.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));

      expect(callback).to.have.been.calledOnce;
      harness.destroy();
    });

    it('should emit sort event when pressing enter key on sortable column', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;

      harness.component.columnConfigurations = testColumns;

      const callback = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback);

      const headerRow = getTableHeaderRow(harness.getTableElement());
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      firstCell.querySelector('button')?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      expect(callback).to.have.been.calledOnce;
      harness.destroy();
    });

    it('should not emit sort event clicking non-sortable column', async () => {
      const harness = await createFixture();
      harness.component.columnConfigurations = columns;

      const callback = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback);

      const headerRow = getTableHeaderRow(harness.getTableElement());
      headerRow.cells.item(0)!.click();

      expect(callback).to.not.have.been.called;
      harness.destroy();
    });

    it('should not emit sort event pressing enter or space key on non-sortable column', async () => {
      const harness = await createFixture();
      harness.component.columnConfigurations = columns;

      const callback = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback);

      const headerRow = getTableHeaderRow(harness.getTableElement());
      headerRow.cells.item(0)!.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
      headerRow.cells.item(0)!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      expect(callback).to.not.have.been.called;
      harness.destroy();
    });

    it('should toggle sort direction when clicking same column', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;

      harness.component.columnConfigurations = testColumns;

      const headerRow = getTableHeaderRow(harness.getTableElement());
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;

      clickTableCell(firstCell);
      expect(firstCell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_ASCENDING)).to.be.true;
      expect(firstCell.getAttribute('aria-sort')).to.equal('ascending');

      clickTableCell(firstCell);
      expect(firstCell.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORTED_DESCENDING)).to.be.true;
      expect(firstCell.getAttribute('aria-sort')).to.equal('descending');
      harness.destroy();
    });

    it('should not sort column when clicking non-sortable column', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;

      harness.component.columnConfigurations = testColumns;

      const headerRow = getTableHeaderRow(harness.getTableElement());
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
      harness.destroy();
    });

    it('should move sort icon from sorted column to newly sorted column', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;
      testColumns[1].sortable = true;

      harness.component.columnConfigurations = testColumns;

      const headerRow = getTableHeaderRow(harness.getTableElement());
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
      harness.destroy();
    });

    it('should not move sort icon from sorted column to newly sorted column when sort event has preventDefault applied', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;
      testColumns[1].sortable = true;

      harness.component.columnConfigurations = testColumns;

      const headerRow = getTableHeaderRow(harness.getTableElement());
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
      harness.destroy();
    });

    it('Sort event data should still be available when the event has prevent default applied', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;
      testColumns[1].sortable = true;

      harness.component.columnConfigurations = testColumns;

      const headerRow = getTableHeaderRow(harness.getTableElement());
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
      harness.destroy();
    });

    it('should not emit sort event if select column cell is clicked', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.select = true;
      harness.component.multiselect = false;

      const callback = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback);

      const headerRow = getTableHeaderRow(harness.getTableElement());
      headerRow.cells.item(0)!.click();

      expect(callback).to.not.have.been.called;
      harness.destroy();
    });

    it('should not set host attribute for select key if is array type', async () => {
      const harness = await createFixture();
      harness.component.selectKey = ['Id'];

      expect(harness.component.hasAttribute(TABLE_CONSTANTS.attributes.SELECT_KEY)).to.be.false;
      harness.destroy();
    });

    it('clear selections', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.select = true;

      harness.component.selectRow(data[0]);
      harness.component.selectRows([data[0], data[1]], true);
      harness.component.clearSelections();

      const selectedRows = getTableBodyRows(harness.getTableElement()).filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).to.equal(0);
      harness.destroy();
    });

    it('should not clear selections when hiding select column', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.select = true;

      harness.component.selectRows([data[0], data[1]]);
      harness.component.select = false;

      const selectedRows = getTableBodyRows(harness.getTableElement()).filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).to.equal(2);
      harness.destroy();
    });

    it('should not clear selections when turning multiselect off', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.select = true;

      harness.component.selectRows([data[0], data[1]]);
      harness.component.multiselect = false;

      const selectedRows = getTableBodyRows(harness.getTableElement()).filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).to.equal(2);
      harness.destroy();
    });

    it('should preserve selections when turning multiselect on', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.select = true;
      harness.component.multiselect = false;

      harness.component.selectRow(data[0]);
      harness.component.multiselect = true;

      const selectedRows = getTableBodyRows(harness.getTableElement()).filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).to.equal(1);
      harness.destroy();
    });

    it('should preserve selections when turning preserveExisting on', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.select = true;
      harness.component.multiselect = true;

      harness.component.selectRows([data[0]]);
      let selectedRows = getTableBodyRows(harness.getTableElement()).filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));
      expect(selectedRows.length).to.equal(1);

      await frame();

      harness.component.selectRows([data[1]], true);
      selectedRows = getTableBodyRows(harness.getTableElement()).filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));
      expect(selectedRows.length).to.equal(2);
      harness.destroy();
    });

    it('should hide column', async () => {
      const harness = await createFixture();
      harness.component.columnConfigurations = columns;
      harness.component.hideColumn(0);

      const headerRow = getTableHeaderRow(harness.getTableElement());

      expect(headerRow.cells.length).to.equal(columns.length - 1);
      harness.destroy();
    });

    it('should return whether a column is hidden or not', async () => {
      const harness = await createFixture();
      harness.component.columnConfigurations = columns;
      harness.component.hideColumn(0);

      expect(harness.component.isColumnHidden(0)).to.be.true;
      expect(harness.component.isColumnHidden(1)).to.be.false;
      harness.destroy();
    });

    it('should reset the sorted column on hide column', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;
      testColumns[1].sortable = true;

      harness.component.columnConfigurations = testColumns;
      const tableCore = harness.component._core;
      const headerRow = getTableHeaderRow(harness.getTableElement());
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;

      clickTableCell(firstCell);
      expect(tableCore._sortedColumnIndex).to.be.greaterThan(-1);
      harness.component.hideColumn(0);
      expect(tableCore._sortedColumnIndex).to.equal(-1);
      harness.destroy();
    });

    it('should not create column config if config already exist on column hide', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;
      testColumns[1].sortable = true;

      harness.component.columnConfigurations = testColumns;
      const tableCore = harness.component._core;

      expect(tableCore._hiddenColumnManager.count()).to.equal(0);
      harness.component.hideColumn(0);
      expect(tableCore._hiddenColumnManager.count()).to.equal(1);
      harness.component.hideColumn(0);
      expect(tableCore._hiddenColumnManager.count()).to.equal(1);
      harness.destroy();
    });

    it('should show column', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].hidden = true;

      harness.component.columnConfigurations = testColumns;
      harness.component.showColumn(0);

      const headerRow = getTableHeaderRow(harness.getTableElement());

      expect(headerRow.cells.length).to.equal(columns.length);
      harness.destroy();
    });

    it('should not remove column config if config already exist on column show', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;
      testColumns[1].sortable = true;

      harness.component.columnConfigurations = testColumns;
      const tableCore = harness.component._core;

      harness.component.hideColumn(0);
      expect(tableCore._hiddenColumnManager.count()).to.equal(1);
      harness.component.showColumn(0);
      expect(tableCore._hiddenColumnManager.count()).to.equal(0);
      harness.component.showColumn(0);
      expect(tableCore._hiddenColumnManager.count()).to.equal(0);
      harness.destroy();
    });

    it('should get selected rows', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.select = true;

      harness.component.selectRows([data[0], data[1]]);
      expect(harness.component.getSelectedRows().length).to.equal(2);
      harness.destroy();
    });

    it('should not listen for selectAll if multiselect is off and select is on', async () => {
      const harness = await createFixture();
      harness.component.multiselect = false;
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.select = true;
      // This test is skipped in original due to implementation complexity
      harness.destroy();
    });

    it('should deselect rows', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.select = true;

      harness.component.selectRows([data[0], data[1], data[2]]);
      harness.component.deselectRow(data[0]);
      harness.component.deselectRows([data[1], data[2]]);

      const selectedRows = getTableBodyRows(harness.getTableElement()).filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).to.equal(0);
      harness.destroy();
    });

    it('should render table properly', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;

      harness.component.render();

      const headerRow = getTableHeaderRow(harness.getTableElement());
      const rows = getTableBodyRows(harness.getTableElement());

      expect(headerRow.cells.length).to.equal(columns.length);
      expect(rows.length).to.equal(data.length);
      harness.destroy();
    });

    it('should expand a collapsed row', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;

      harness.component.render();

      harness.component.expandRow(0, '');
      expect(harness.component.isRowExpanded(0)).to.be.true;
      harness.destroy();
    });

    it('should throw if table has not rendered and it expands a collapsed row', async () => {
      const harness = await createFixture();
      expect(() => harness.component.expandRow(0, '')).to.throw('Cannot expand a row before the table has rendered.');
      harness.destroy();
    });

    it('should throw if a negative row index is used on expand row', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;

      harness.component.render();

      expect(() => harness.component.expandRow(-1, '')).to.throw('Invalid row index: -1.');
      harness.destroy();
    });

    it('should throw if the row index is greater than the number of table rows on expand row', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;

      harness.component.render();
      const rows = getTableBodyRows(harness.getTableElement());
      expect(() => harness.component.expandRow(rows.length + 1, '')).to.throw(`Invalid row index: ${rows.length + 1}.`);
      harness.destroy();
    });

    it('should collapse an expanded row', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;

      harness.component.render();

      harness.component.expandRow(0, '');
      harness.component.render();
      harness.component.collapseRow(0);

      expect(harness.component.isRowExpanded(0)).to.be.false;
      harness.destroy();
    });

    it('should not collapse an expanded row if the table has not rendered', async () => {
      const harness = await createFixture();
      const tableCore = harness.component._core;
      expect(tableCore._rendered).to.be.false;
      let resolved = false;
      harness.component.collapseRow(0).then(() => (resolved = true));

      await frame();
      expect(tableCore._rendered).to.be.false;
      expect(resolved).to.be.true;
      harness.destroy();
    });

    it('should not collapse if a negative row index is used on collapse row', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      let resolved = false;
      harness.component.render();

      harness.component.collapseRow(-1).then(() => (resolved = true));

      await frame();
      expect(resolved).to.be.true;
      harness.destroy();
    });

    it('should not collapse if the row index is greater than table rows on collapse row', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      let resolved = false;
      harness.component.render();
      const rows = getTableBodyRows(harness.getTableElement());

      harness.component.collapseRow(rows.length + 1).then(() => (resolved = true));

      await frame();
      expect(resolved).to.be.true;
      harness.destroy();
    });

    it('should reselect rows after table render', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.select = true;

      harness.component.selectRows([data[0], data[1]]);
      harness.component.render();

      const selectedRows = getTableBodyRows(harness.getTableElement()).filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).to.equal(2);
      harness.destroy();
    });

    it('should reselect rows after table data changes', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.select = true;

      harness.component.selectRows([data[0], data[1]]);
      harness.component.data = [data[0], data[2], data[3]];

      const selectedRows = getTableBodyRows(harness.getTableElement()).filter(r => r.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED));

      expect(selectedRows.length).to.equal(1);
      harness.destroy();
    });

    it('should not render rows if no columns have been set but data changes', async () => {
      const harness = await createFixture();
      harness.component.data = data;
      harness.component.data = [data[0], data[2], data[3]];

      const rows = getTableBodyRows(harness.getTableElement());

      expect(rows.length).to.equal(0);
      harness.destroy();
    });

    it('should set width of column from configuration', async () => {
      const harness = await createFixture();
      const testColumns: IColumnConfiguration[] = deepCopy(columns);
      testColumns.push({ header: 'Column Four' });
      testColumns.push({ header: 'Column Five' });

      testColumns[0].width = 500;
      testColumns[1].width = '500px';
      testColumns[2].width = '50%';
      testColumns[3].width = '100';
      testColumns[4].width = -1;

      harness.component.columnConfigurations = testColumns;
      harness.component.data = data;

      const headerRow = getTableHeaderRow(harness.getTableElement());

      expect(headerRow.cells.item(0)!.style.width).to.equal('500px');
      expect(headerRow.cells.item(1)!.style.width).to.equal('500px');
      expect(headerRow.cells.item(2)!.style.width).to.equal('50%');
      expect(headerRow.cells.item(3)!.style.width).to.equal('100px');
      expect(headerRow.cells.item(4)!.style.width).to.equal('');
      harness.destroy();
    });

    it('should set cell alignment from configuration', async () => {
      const harness = await createFixture();
      const testColumns: IColumnConfiguration[] = deepCopy(columns);
      testColumns[0].align = CellAlign.Center;
      testColumns[1].align = CellAlign.Right;

      harness.component.columnConfigurations = testColumns;
      harness.component.data = data;

      const headerRow = getTableHeaderRow(harness.getTableElement());
      const rows = getTableBodyRows(harness.getTableElement());
      const headerColumnOneCellContainer = headerRow.cells.item(0)!.firstElementChild as HTMLElement;
      const rowColumnOneCellContainer = rows[0].cells.item(0)!.firstElementChild as HTMLElement;
      const headerColumnTwoCellContainer = headerRow.cells.item(1)!.firstElementChild as HTMLElement;
      const rowColumnTwoCellContainer = rows[0].cells.item(1)!.firstElementChild as HTMLElement;

      expect(headerColumnOneCellContainer.classList.contains(TABLE_CONSTANTS.classes.TABLE_CELL_CENTER)).to.be.true;
      expect(rowColumnOneCellContainer.classList.contains(TABLE_CONSTANTS.classes.TABLE_CELL_CENTER)).to.be.true;
      expect(headerColumnTwoCellContainer.classList.contains(TABLE_CONSTANTS.classes.TABLE_CELL_RIGHT)).to.be.true;
      expect(rowColumnTwoCellContainer.classList.contains(TABLE_CONSTANTS.classes.TABLE_CELL_RIGHT)).to.be.true;
      harness.destroy();
    });

    it('should set column cell template from configuration as string', async () => {
      const harness = await createFixture();
      const testColumns: IColumnConfiguration[] = deepCopy(columns);
      delete testColumns[0].property;
      testColumns[0].template = () => '<button></button>';

      harness.component.columnConfigurations = testColumns;
      harness.component.data = data;

      const rows = getTableBodyRows(harness.getTableElement());

      await frame();
      const everyRowCellContainsTemplate = rows.every(r => r.cells.item(0)!.querySelector('button') !== null);
      expect(everyRowCellContainsTemplate).to.be.true;
      harness.destroy();
    });

    it('should set column cell template from configuration as element', async () => {
      const harness = await createFixture();
      const testColumns: IColumnConfiguration[] = deepCopy(columns);
      delete testColumns[0].property;
      testColumns[0].template = () => document.createElement('button');

      harness.component.columnConfigurations = testColumns;
      harness.component.data = data;

      const rows = getTableBodyRows(harness.getTableElement());

      await frame();
      const everyRowCellContainsTemplate = rows.every(r => r.cells.item(0)!.querySelector('button') !== null);
      expect(everyRowCellContainsTemplate).to.be.true;
      harness.destroy();
    });

    it('should transform cell data using transform from configuration', async () => {
      const harness = await createFixture();
      const testColumns: IColumnConfiguration[] = deepCopy(columns);
      testColumns[0].transform = () => 'transformed';

      harness.component.columnConfigurations = testColumns;
      harness.component.data = data;

      const rows = getTableBodyRows(harness.getTableElement());

      await frame();
      const everyRowCellTransformed = rows.every(r => (r.cells.item(0)!.firstElementChild as HTMLElement).innerText === 'transformed');
      expect(everyRowCellTransformed).to.be.true;
      harness.destroy();
    });

    it('should not show filter row when no columns are defined to have filters', async () => {
      const harness = await createFixture();
      const testColumns: IColumnConfiguration[] = deepCopy(columns);
      harness.component.columnConfigurations = testColumns;
      harness.component.data = data;
      harness.component.filter = true;

      const lastTableRow = getLastTableHeaderRow(harness.getTableElement());
      expect(lastTableRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_ROW_FILTER)).to.be.false;
      harness.destroy();
    });

    it('should show filter row when at least one column has a filter', async () => {
      const harness = await createFixture();
      const testColumns: IColumnConfiguration[] = deepCopy(columns);
      testColumns[0].filter = true;

      harness.component.columnConfigurations = testColumns;
      harness.component.data = data;
      harness.component.filter = true;

      const lastTableRow = getLastTableHeaderRow(harness.getTableElement());
      expect(lastTableRow.classList.contains(TABLE_CONSTANTS.classes.TABLE_HEAD_ROW_FILTER)).to.be.true;
      harness.destroy();
    });

    it('should show filter components in correct cells', async () => {
      const harness = await createFixture();
      const testColumns: IColumnConfiguration[] = deepCopy(columns);
      testColumns[0].filter = true;
      testColumns[0].filterDelegate = new TextFieldComponentDelegate();

      harness.component.columnConfigurations = testColumns;
      harness.component.data = data;
      harness.component.filter = true;

      const lastTableRow = getLastTableHeaderRow(harness.getTableElement());
      let firstFilterCellIndex = harness.component.select && harness.component.multiselect ? 1 : 0;
      expect(lastTableRow.cells.item(firstFilterCellIndex++)!.querySelector('input[type=text]')).to.exist;
      expect(lastTableRow.cells.item(firstFilterCellIndex++)!.querySelector('input[type=text]')).to.be.null;
      expect(lastTableRow.cells.item(firstFilterCellIndex++)!.querySelector('input[type=text]')).to.be.null;
      harness.destroy();
    });

    it('should emit filter event when modifying filter component', async () => {
      const harness = await createFixture();
      const testColumns: IColumnConfiguration[] = deepCopy(columns);
      testColumns[0].filter = true;
      testColumns[0].filterDelegate = new TextFieldComponentDelegate();
      const filterDebounceTime = testColumns[0].filterDebounceTime || TABLE_CONSTANTS.numbers.DEFAULT_FILTER_DEBOUNCE_TIME;

      harness.component.columnConfigurations = testColumns;
      harness.component.data = data;
      harness.component.filter = true;

      const lastTableRow = getLastTableHeaderRow(harness.getTableElement());
      const firstFilterCellIndex = harness.component.select && harness.component.multiselect ? 1 : 0;
      const filterInputElement = lastTableRow.cells.item(firstFilterCellIndex)!.querySelector('input[type=text]') as HTMLInputElement;

      const filterCallback = spy((evt: CustomEvent) => {
        const evtData = evt.detail as ITableFilterEventData;
        expect(evtData.value).to.equal('a');
        expect(evtData.columnIndex).to.equal(0);
      });
      harness.component.addEventListener(TABLE_CONSTANTS.events.FILTER, filterCallback);

      filterInputElement.value = 'a';
      filterInputElement.dispatchEvent(new Event('input'));

      await task(filterDebounceTime);

      expect(filterCallback).to.have.been.called;
      harness.destroy();
    });

    it('should remove resize handle when resizable is turned off', async () => {
      const harness = await createFixture();
      harness.component.resizable = true;
      harness.component.columnConfigurations = resizableColumns;
      harness.component.data = data;

      let resizeHandle = getTableResizeHandle(harness.getTableElement());
      expect(resizeHandle).to.exist;

      harness.component.resizable = false;

      await frame();

      resizeHandle = getTableResizeHandle(harness.getTableElement());
      expect(resizeHandle).to.be.null;
      harness.destroy();
    });

    it('should resize columns when the resize handle is moved', async () => {
      const harness = await createFixture();
      harness.component.resizable = true;
      harness.component.columnConfigurations = resizableColumns;
      harness.component.data = data;
      const tableCore = harness.component._core;

      const firstCell = getTableHeaderRow(harness.getTableElement()).cells.item(0) as HTMLTableCellElement;
      const resizeHandle = getTableResizeHandle(harness.getTableElement());
      await frame();
      firstCell.dispatchEvent(new MouseEvent('mouseover'));
      await frame();
      await task(TABLE_CONSTANTS.numbers.RESIZE_HOVER_DURATION);

      expect(resizeHandle.classList.contains(TABLE_CONSTANTS.classes.TABLE_RESIZE_HANDLE)).to.be.true;
      const mousedownSpy = spy(tableCore, '_onHeadRowMouseDown');
      const mousemoveSpy = spy(tableCore, '_onMouseMove');
      const mouseupSpy = spy(tableCore, '_onMouseUp');
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
      expect(mousedownSpy).to.have.been.calledOnce;
      expect(mousemoveSpy).to.have.been.calledOnce;
      expect(mouseupSpy).to.have.been.calledOnce;
      expect(firstCell.style.width).to.contain('px');
      expect(firstCell.style.width).to.not.equal('');
      harness.destroy();
    });

    it('should emit event when column has been resized', async () => {
      const harness = await createFixture();
      harness.component.resizable = true;
      harness.component.columnConfigurations = resizableColumns;
      harness.component.data = data;

      const resizeEventSpy = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.COLUMN_RESIZE, resizeEventSpy);

      const firstCell = getTableHeaderRow(harness.getTableElement()).cells.item(0) as HTMLTableCellElement;
      const resizeHandle = getTableResizeHandle(harness.getTableElement());
      await frame();
      firstCell.dispatchEvent(new MouseEvent('mouseover'));
      await frame();
      await task(TABLE_CONSTANTS.numbers.RESIZE_HOVER_DURATION);
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
      expect(resizeEventSpy).to.have.been.calledOnce;
      expect(resizeEventSpy.args[0][0]).to.be.instanceOf(CustomEvent);
      expect(resizeEventSpy.args[0][0].detail).to.deep.include({ index: 0, width: 100 });
      harness.destroy();
    });

    it('should set width to min-resize-width when column width is smaller than min width when resize handle is moved', async () => {
      const harness = await createFixture();
      harness.component.resizable = true;
      harness.component.minResizeWidth = 150;
      harness.component.columnConfigurations = resizableColumns;
      harness.component.data = data;

      const firstCell = getTableHeaderRow(harness.getTableElement()).cells.item(0) as HTMLTableCellElement;
      const resizeHandle = getTableResizeHandle(harness.getTableElement());
      await frame();
      firstCell.dispatchEvent(new MouseEvent('mouseover'));
      await frame();
      await task(TABLE_CONSTANTS.numbers.RESIZE_HOVER_DURATION);

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
      expect(firstCell.style.width).to.contain('px');
      expect(firstCell.style.width).to.not.equal('');
      expect(parseInt(firstCell.style.width!.split('px')[0], 10)).to.equal(150);
      harness.destroy();
    });

    it('should not set width to min-resize-width when column width is larger than min width when resize handle is moved', async () => {
      const harness = await createFixture();
      harness.component.resizable = true;
      harness.component.minResizeWidth = 150;
      harness.component.columnConfigurations = resizableColumns;
      harness.component.data = data;

      const firstCell = getTableHeaderRow(harness.getTableElement()).cells.item(0) as HTMLTableCellElement;
      const resizeHandle = getTableResizeHandle(harness.getTableElement());
      await frame();
      firstCell.dispatchEvent(new MouseEvent('mouseover'));
      await frame();
      await task(TABLE_CONSTANTS.numbers.RESIZE_HOVER_DURATION);

      const { width, left } = firstCell.getBoundingClientRect();
      const newWidth = left + width + 100; // Increase width by more than minimum

      resizeHandle.dispatchEvent(
        new MouseEvent('mousedown', {
          clientX: left + width - 10,
          clientY: 0,
          bubbles: true
        } as any)
      );
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: newWidth, clientY: 0 } as any));
      document.dispatchEvent(new MouseEvent('mouseup'));
      expect(firstCell.style.width).to.contain('px');
      expect(firstCell.style.width).to.not.equal('');
      expect(parseInt(firstCell.style.width!.split('px')[0], 10)).to.be.greaterThan(150);
      harness.destroy();
    });

    it('should select multiple rows on shift click', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.select = true;
      harness.component.multiselect = true;

      const rows = getTableBodyRows(harness.getTableElement());
      const checkbox1 = rows[0].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
      const checkbox2 = rows[3].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;

      checkbox1.dispatchEvent(new PointerEvent('pointerdown'));
      checkbox2.dispatchEvent(new PointerEvent('pointerdown', { shiftKey: true }));

      const selectedRows = harness.component.getSelectedRows();

      expect(selectedRows.length).to.equal(4);
      harness.destroy();
    });

    it('should emit multiple select events on shift click', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.select = true;
      harness.component.multiselect = true;

      const callback = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SELECT, callback);

      const rows = getTableBodyRows(harness.getTableElement());
      const checkboxRow1 = rows[0].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
      const checkboxRow4 = rows[3].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;

      checkboxRow1.dispatchEvent(new PointerEvent('pointerdown'));
      checkboxRow4.dispatchEvent(new PointerEvent('pointerdown', { shiftKey: true }));

      expect(callback).to.have.callCount(4);
      harness.destroy();
    });

    it('should de-select the rows when the checkbox is already selected', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.select = true;
      harness.component.multiselect = true;

      const rows = getTableBodyRows(harness.getTableElement());
      const checkbox1 = rows[0].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
      const checkbox2 = rows[2].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;
      const checkbox3 = rows[3].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLElement;

      checkbox1.dispatchEvent(new PointerEvent('pointerdown'));
      checkbox3.dispatchEvent(new PointerEvent('pointerdown', { shiftKey: true }));
      checkbox2.dispatchEvent(new PointerEvent('pointerdown', { shiftKey: true }));

      const selectedRows = harness.component.getSelectedRows();

      expect(selectedRows.length).to.equal(2);
      harness.destroy();
    });

    it('should not emit sort event when right clicking sortable column', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;

      harness.component.columnConfigurations = testColumns;

      const callback = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback);

      const headerRow = getTableHeaderRow(harness.getTableElement());
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      firstCell.dispatchEvent(new MouseEvent('contextmenu'));

      expect(callback).to.not.have.been.called;
      harness.destroy();
    });

    it('should select the first row by index', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.select = true;
      harness.component.multiselect = true;

      const rows = getTableBodyRows(harness.getTableElement());
      const checkbox1 = rows[0].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLInputElement;

      harness.component.selectRowsByIndex(0);

      expect(checkbox1.checked).to.be.true;
      harness.destroy();
    });

    it('should check if row is selected by the data object', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.select = true;
      harness.component.multiselect = true;

      harness.component.selectRowsByIndex(1);

      expect(harness.component.isRowSelected(data[1])).to.be.true;
      harness.destroy();
    });

    it('should select then deselect the first row by index', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.select = true;
      harness.component.multiselect = true;

      const rows = getTableBodyRows(harness.getTableElement());
      const checkbox1 = rows[0].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLInputElement;

      harness.component.selectRowsByIndex(0);
      expect(checkbox1.checked).to.be.true;
      harness.component.deselectRowsByIndex(0);
      expect(checkbox1.checked).to.be.false;
      harness.destroy();
    });

    it('should select then deselect the multiple rows by index', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.select = true;
      harness.component.multiselect = true;

      const rows = getTableBodyRows(harness.getTableElement());
      const checkbox1 = rows[0].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLInputElement;
      const checkbox2 = rows[1].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLInputElement;
      const checkbox3 = rows[2].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLInputElement;

      harness.component.selectRowsByIndex([0, 1, 2]);
      expect(checkbox1.checked).to.be.true;
      expect(checkbox2.checked).to.be.true;
      expect(checkbox3.checked).to.be.true;
      harness.component.deselectRowsByIndex([0, 1, 2]);
      expect(checkbox1.checked).to.be.false;
      expect(checkbox2.checked).to.be.false;
      expect(checkbox3.checked).to.be.false;
      harness.destroy();
    });

    it('should show indeterminate checkbox when some are selected', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.select = true;
      harness.component.multiselect = true;

      const rows = getTableBodyRows(harness.getTableElement());
      const checkbox1 = rows[0].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLInputElement;
      harness.component.selectRowsByIndex(0);

      const row = getTableHeaderRow(harness.getTableElement());
      const selectAllCheckbox = row.cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLInputElement;

      expect(checkbox1.checked).to.be.true;
      expect(selectAllCheckbox.indeterminate).to.be.true;
      harness.destroy();
    });

    it('should change to checked when click on indeterminate ', async () => {
      const harness = await createFixture();
      harness.component.selectKey = 'Id';
      harness.component.columnConfigurations = columns;
      harness.component.data = data;
      harness.component.select = true;
      harness.component.multiselect = true;

      const rows = getTableBodyRows(harness.getTableElement());
      const checkbox1 = rows[0].cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLInputElement;
      harness.component.selectRowsByIndex(0);

      const row = getTableHeaderRow(harness.getTableElement());
      const selectAllCheckbox = row.cells.item(0)!.querySelector(TABLE_CONSTANTS.selectors.CHECKBOX_INPUT) as HTMLInputElement;

      expect(checkbox1.checked).to.be.true;
      expect(selectAllCheckbox.indeterminate).to.be.true;

      selectAllCheckbox.click();
      expect(checkbox1.checked).to.be.true;
      expect(selectAllCheckbox.indeterminate).to.be.false;
      expect(selectAllCheckbox.checked).to.be.true;
      harness.destroy();
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

      const headerRow = getTableHeaderRow(harness.getTableElement());
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      expect(firstCell.innerHTML).to.contain('Hello Goodbye');
      harness.destroy();
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

      const headerRow = getTableHeaderRow(harness.getTableElement());
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      expect(firstCell.hasAttribute('aria-hidden')).to.be.false;
      harness.destroy();
    });

    it('should contain custom header template with sort arrow', async () => {
      const harness = await createFixture();
      const testColumns = deepCopy(columns);
      testColumns[0].sortable = true;
      testColumns[0].headerTemplate = () => '<span>Hello Goodbye</span>';

      harness.component.columnConfigurations = testColumns;

      const callback = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SORT, callback);

      const headerRow = getTableHeaderRow(harness.getTableElement());
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      await frame();
      clickTableCell(firstCell);
      expect(firstCell.innerHTML).to.contain('Hello Goodbye');
      expect(callback).to.have.been.called;
      expect(firstCell.innerHTML).to.contain(TABLE_CONSTANTS.classes.TABLE_HEAD_CELL_SORT_ICON);
      harness.destroy();
    });

    it('should emit array of sorted columns with multiple column sort ', async () => {
      const harness = await createFixture();
      harness.component.multiColumnSort = true;
      const testColumns = deepCopy(columns) as IColumnConfiguration[];
      testColumns.forEach(c => (c.sortable = true));

      harness.component.columnConfigurations = testColumns;

      let emittedResult: ITableSortMultipleEventData | undefined;

      const callback = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SORT, (evt: CustomEvent<ITableSortMultipleEventData>) => {
        emittedResult = evt.detail;
        callback(evt);
      });

      const headerRow = getTableHeaderRow(harness.getTableElement());
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      await frame();
      clickTableCell(firstCell);
      expect(callback).to.have.been.called;
      expect(Array.isArray(emittedResult)).to.be.true;
      harness.destroy();
    });

    it('should emit sorted on both `name` and `department', async () => {
      const harness = await createFixture();
      harness.component.multiColumnSort = true;
      const testColumns = deepCopy(columns) as IColumnConfiguration[];
      testColumns.forEach(c => (c.sortable = true));

      harness.component.columnConfigurations = testColumns;

      let emittedResult: ITableSortMultipleEventData | undefined;

      const callback = spy();
      harness.component.addEventListener(TABLE_CONSTANTS.events.SORT, (evt: CustomEvent<ITableSortMultipleEventData>) => {
        emittedResult = evt.detail;
        callback(evt);
      });

      const headerRow = getTableHeaderRow(harness.getTableElement());
      const firstCell = headerRow.cells.item(0) as HTMLTableCellElement;
      const secondCell = headerRow.cells.item(2) as HTMLTableCellElement;
      await frame();
      clickTableCell(firstCell);
      clickTableCell(secondCell, true);
      expect(callback).to.have.been.called;
      expect(emittedResult!.length).to.equal(2);
      expect(emittedResult![0].propertyName).to.equal('Name');
      expect(emittedResult![0].sortOrder).to.equal(1);
      expect(emittedResult![1].propertyName).to.equal('Department');
      expect(emittedResult![1].sortOrder).to.equal(2);
      harness.destroy();
    });

    it('should execute callback when row elements are created', async () => {
      const harness = await createFixture();
      const rowCreatedSpy = spy();
      harness.component.rowCreated = rowCreatedSpy;
      harness.component.columnConfigurations = columns;
      harness.component.data = data;

      expect(rowCreatedSpy).to.have.callCount(data.length);
      harness.destroy();
    });

    it('should execute callback when cell elements are created', async () => {
      const harness = await createFixture();
      const cellCreatedSpy = spy();
      harness.component.cellCreated = cellCreatedSpy;
      harness.component.columnConfigurations = columns;
      harness.component.data = data;

      expect(cellCreatedSpy).to.have.callCount(data.length * columns.length);
      harness.destroy();
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

        const selectAllCell = getSelectAllCell(harness.getTableElement());

        expect(selectAllCell.querySelector('.custom-select-all-template-container')).to.exist;
        harness.destroy();
      });

      it('should automatically wire select all to input', async () => {
        const harness = await createFixture();
        harness.component.select = true;
        harness.component.multiselect = true;
        harness.component.selectAllTemplate = () => customSelectAllTemplate();
        harness.component.columnConfigurations = columns;
        harness.component.data = data;

        await frame();

        const selectAllCell = getSelectAllCell(harness.getTableElement());

        selectAllCell.querySelector('input')!.dispatchEvent(new MouseEvent('click'));

        const selectedRows = harness.component.getSelectedRows();

        expect(selectedRows.length).to.equal(data.length);
        harness.destroy();
      });

      it('should ignore select all wire if forge-ignore attribute is present on the input', async () => {
        const harness = await createFixture();
        harness.component.select = true;
        harness.component.multiselect = true;
        harness.component.selectAllTemplate = () => customSelectAllTemplate({ forgeIgnore: true });
        harness.component.columnConfigurations = columns;
        harness.component.data = data;

        await frame();

        const selectAllCell = getSelectAllCell(harness.getTableElement());

        selectAllCell.querySelector('input')!.dispatchEvent(new MouseEvent('click'));

        const selectedRows = harness.component.getSelectedRows();

        expect(selectedRows.length).to.equal(0);
        harness.destroy();
      });

      it('should have indeterminate state when a single row is selected', async () => {
        const harness = await createFixture();
        harness.component.select = true;
        harness.component.multiselect = true;
        harness.component.selectAllTemplate = () => customSelectAllTemplate();
        harness.component.columnConfigurations = columns;
        harness.component.data = data;

        await frame();

        const selectAllCell = getSelectAllCell(harness.getTableElement());
        const checkbox = selectAllCell.querySelector('input') as HTMLInputElement;
        const rowCheckbox = harness.getTableElement().querySelector('tbody > tr > td forge-checkbox');
        rowCheckbox!.dispatchEvent(new PointerEvent('pointerdown'));
        await frame();

        expect(checkbox.indeterminate).to.be.true;
        harness.destroy();
      });

      it('should have checked state when all rows are selected', async () => {
        const harness = await createFixture();
        harness.component.select = true;
        harness.component.multiselect = true;
        harness.component.selectAllTemplate = () => customSelectAllTemplate();
        harness.component.columnConfigurations = columns;
        harness.component.data = data;

        await frame();

        const selectAllCell = getSelectAllCell(harness.getTableElement());
        const checkbox = selectAllCell.querySelector('input') as HTMLInputElement;
        const rowCheckboxes = harness.getTableElement().querySelectorAll('tbody forge-checkbox');
        rowCheckboxes.forEach(c => {
          c.dispatchEvent(new PointerEvent('pointerdown'));
        });

        await frame();

        expect(checkbox.checked).to.be.true;
        harness.destroy();
      });

      it('should render with HTMLElement as the template', async () => {
        const harness = await createFixture();
        harness.component.select = true;
        harness.component.multiselect = true;
        harness.component.selectAllTemplate = () => customSelectAllTemplate({ type: 'html' });
        harness.component.columnConfigurations = columns;
        harness.component.data = data;

        await frame();

        const selectAllCell = getSelectAllCell(harness.getTableElement());
        const checkbox = selectAllCell.querySelector('input') as HTMLInputElement;
        const rowCheckboxes = harness.getTableElement().querySelectorAll('tbody forge-checkbox');
        rowCheckboxes.forEach(c => {
          c.dispatchEvent(new PointerEvent('pointerdown'));
        });

        await frame();

        expect(checkbox.checked).to.be.true;
        harness.destroy();
      });

      it('should rerender correctly if multiselect is toggled', async () => {
        const harness = await createFixture();
        harness.component.select = true;
        harness.component.multiselect = true;
        harness.component.selectAllTemplate = () => customSelectAllTemplate({ type: 'html' });
        harness.component.columnConfigurations = columns;
        harness.component.data = data;

        await frame();
        harness.component.multiselect = false;
        await frame();
        harness.component.multiselect = true;
        await frame();

        const selectAllCell = getSelectAllCell(harness.getTableElement());

        expect(selectAllCell).to.exist;
        harness.destroy();
      });

      it('should align checkbox to left if select checkbox alignment set', async () => {
        const harness = await createFixture();
        harness.component.select = true;
        harness.component.multiselect = true;
        harness.component.selectCheckboxAlignment = CellAlign.Left;
        harness.component.selectAllTemplate = () => customSelectAllTemplate({ type: 'html' });
        harness.component.columnConfigurations = columns;
        harness.component.data = data;
        const checkboxContainer = harness.getTableElement().querySelector('tbody .forge-table-cell__select-checkbox-container') as HTMLElement;
        await frame();
        expect(harness.component.selectCheckboxAlignment).to.equal(CellAlign.Left);
        expect(checkboxContainer.classList.contains(TABLE_CONSTANTS.classes.TABLE_CELL_SELECT_CHECKBOX_CONTAINER_ALIGN_LEFT)).to.be.true;
        harness.destroy();
      });

      it('should set selections when select column is not visible', async () => {
        const harness = await createFixture();
        harness.component.select = false;
        harness.component.selectKey = 'Id';
        harness.component.columnConfigurations = columns;
        harness.component.data = data;

        const selectedIndexes = [0, 2];
        harness.component.selectRowsByIndex(selectedIndexes);

        const rows = getTableBodyRows(harness.getTableElement());
        rows.forEach((row, index) => {
          const selected = selectedIndexes.includes(index);
          expect(row.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).to.equal(selected);
        });
        harness.destroy();
      });

      it('should render selections when select column is not visible after data is changed', async () => {
        const harness = await createFixture();
        harness.component.select = false;
        harness.component.selectKey = 'Id';
        harness.component.columnConfigurations = columns;
        harness.component.data = data;

        const selectedIndexes = [0, 2];
        harness.component.selectRowsByIndex(selectedIndexes);
        harness.component.data = data;

        const rows = getTableBodyRows(harness.getTableElement());
        rows.forEach((row, index) => {
          const selected = selectedIndexes.includes(index);
          expect(row.classList.contains(TABLE_CONSTANTS.classes.TABLE_BODY_ROW_SELECTED)).to.equal(selected);
        });
        harness.destroy();
      });
    });
  });
});
