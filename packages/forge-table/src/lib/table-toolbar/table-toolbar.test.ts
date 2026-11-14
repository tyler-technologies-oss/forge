import { DataSource } from '@tylertech/forge-core';
import { html } from 'lit';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { userEvent } from 'vitest/browser';
import '../data-table/data-table.js';
import type { ColumnDef, DataTableElement } from '../data-table/data-table.js';
import './table-toolbar.js';
import type { TableToolbarElement } from './table-toolbar.js';

interface TestData {
  id: number;
  name: string;
  age: number;
}

const TEST_DATA: TestData[] = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 },
  { id: 3, name: 'Charlie', age: 35 }
];

const TEST_COLUMNS: ColumnDef<TestData>[] = [
  { id: 'id', header: 'ID', property: 'id' },
  { id: 'name', header: 'Name', property: 'name' },
  { id: 'age', header: 'Age', property: 'age' }
];

interface Fixture {
  toolbar: TableToolbarElement;
  table: DataTableElement<TestData>;
}

async function createFixture(options: { features?: string; withTable?: boolean } = {}): Promise<Fixture> {
  const { features, withTable = true } = options;
  const screen = await render(html`
    <forge-data-table-toolbar features=${features ?? ''}>
      <span slot="title">People</span>
    </forge-data-table-toolbar>
    <forge-data-table .columns=${TEST_COLUMNS} .dataSource=${new DataSource<TestData>(() => TEST_DATA)}></forge-data-table>
  `);
  const toolbar = screen.container.querySelector('forge-data-table-toolbar') as TableToolbarElement;
  const table = screen.container.querySelector('forge-data-table') as DataTableElement<TestData>;
  await table.updateComplete;
  await vi.waitFor(() => expect(table.shadowRoot?.querySelectorAll('tbody tr').length).toBe(TEST_DATA.length));
  if (withTable) {
    toolbar.tableElement = table;
  }
  await toolbar.updateComplete;
  return { toolbar, table };
}

function getButtons(toolbar: TableToolbarElement): HTMLElement[] {
  return Array.from(toolbar.shadowRoot?.querySelectorAll<HTMLElement>('forge-icon-button') ?? []);
}

function getTooltipLabels(toolbar: TableToolbarElement): (string | undefined)[] {
  return Array.from(toolbar.shadowRoot?.querySelectorAll('forge-tooltip') ?? []).map(tooltip => tooltip.textContent?.trim());
}

function getColumnsMenu(toolbar: TableToolbarElement): HTMLElement & { open: boolean } {
  return toolbar.shadowRoot?.querySelector('forge-dropdown-menu') as HTMLElement & { open: boolean };
}

function getShowAllItem(toolbar: TableToolbarElement): HTMLElement & { disabled: boolean } {
  return getColumnsMenu(toolbar).querySelector('forge-dropdown-menu-item') as HTMLElement & { disabled: boolean };
}

function getColumnItems(toolbar: TableToolbarElement): (HTMLElement & { checked: boolean })[] {
  return Array.from(getColumnsMenu(toolbar).querySelectorAll<HTMLElement & { checked: boolean }>('forge-dropdown-menu-item-checkbox'));
}

describe('TableToolbar', () => {
  describe('table association', () => {
    it('should connect to the data table with the id given by table', async () => {
      const { toolbar, table } = await createFixture({ withTable: false });
      table.id = 'people';

      toolbar.table = 'people';
      await toolbar.updateComplete;

      expect(toolbar.tableElement).toBe(table);
    });

    it('should connect to the data table with the id given by the table attribute', async () => {
      const { toolbar, table } = await createFixture({ withTable: false });
      table.id = 'people';

      toolbar.setAttribute('table', 'people');
      await toolbar.updateComplete;

      expect(toolbar.tableElement).toBe(table);
    });

    it('should connect to the data table when table is set in the markup before the first update', async () => {
      const screen = await render(html`
        <forge-data-table-toolbar table="people"></forge-data-table-toolbar>
        <forge-data-table id="people" .columns=${TEST_COLUMNS}></forge-data-table>
      `);
      const toolbar = screen.container.querySelector('forge-data-table-toolbar') as TableToolbarElement;
      const table = screen.container.querySelector('forge-data-table') as DataTableElement<TestData>;
      await toolbar.updateComplete;

      expect(toolbar.tableElement).toBe(table);
    });

    it('should clear tableElement when no element has the id', async () => {
      const { toolbar } = await createFixture();

      toolbar.table = 'missing';
      await toolbar.updateComplete;

      expect(toolbar.tableElement).toBeNull();
    });
  });

  describe('layout', () => {
    it('should render the title slot', async () => {
      const { toolbar } = await createFixture();

      expect(toolbar.querySelector('[slot="title"]')?.textContent).toBe('People');
      expect(toolbar.shadowRoot?.querySelector('slot[name="title"]')).not.toBeNull();
    });
  });

  describe('features', () => {
    it('should not render any buttons when no features are set', async () => {
      const { toolbar } = await createFixture();

      expect(getButtons(toolbar)).toHaveLength(0);
    });

    it('should render a button for each feature in the features attribute', async () => {
      const { toolbar } = await createFixture({ features: 'columns, export, search' });

      expect(getButtons(toolbar)).toHaveLength(3);
      expect(getTooltipLabels(toolbar)).toEqual(['Columns', 'Export', 'Search']);
    });

    it('should render a button for each feature in the features property', async () => {
      const { toolbar } = await createFixture();

      toolbar.features = ['print', 'reload'];
      await toolbar.updateComplete;

      expect(getTooltipLabels(toolbar)).toEqual(['Print', 'Reload']);
    });
  });

  describe('columns', () => {
    it('should render the menu while the columns button is present, even when it is closed', async () => {
      const { toolbar } = await createFixture({ features: 'columns' });

      expect(getColumnsMenu(toolbar)).not.toBeNull();
      expect(getColumnsMenu(toolbar).open).toBe(false);
    });

    it('should not render a menu when the columns button is not present', async () => {
      const { toolbar } = await createFixture({ features: 'export' });

      expect(toolbar.shadowRoot?.querySelector('forge-dropdown-menu')).toBeNull();
    });

    it('should keep the same menu element when the menu is opened and closed', async () => {
      const { toolbar } = await createFixture({ features: 'columns' });
      const menu = getColumnsMenu(toolbar);

      await userEvent.click(getButtons(toolbar)[0]);
      await vi.waitFor(() => expect(menu.open).toBe(true));
      await userEvent.keyboard('{Escape}');
      await vi.waitFor(() => expect(menu.open).toBe(false));

      expect(getColumnsMenu(toolbar)).toBe(menu);
    });

    it('should open the menu when the columns button is clicked', async () => {
      const { toolbar } = await createFixture({ features: 'columns' });

      await userEvent.click(getButtons(toolbar)[0]);

      await vi.waitFor(() => expect(getColumnsMenu(toolbar).open).toBe(true));
    });

    it('should list every column with visible columns checked', async () => {
      const { toolbar, table } = await createFixture({ features: 'columns' });
      table.hideColumn('age');
      await toolbar.updateComplete;

      const items = getColumnItems(toolbar);

      expect(items.map(item => item.textContent?.trim())).toEqual(['ID', 'Name', 'Age']);
      expect(items.map(item => item.checked)).toEqual([true, true, false]);
    });

    it('should render a show all item followed by a divider before the column items', async () => {
      const { toolbar } = await createFixture({ features: 'columns' });

      const [first, second, third] = Array.from(getColumnsMenu(toolbar).children);

      expect(first.tagName.toLowerCase()).toBe('forge-dropdown-menu-item');
      expect(first.textContent?.trim()).toBe('Show all');
      expect(second.tagName.toLowerCase()).toBe('forge-divider');
      expect(third.tagName.toLowerCase()).toBe('forge-dropdown-menu-item-checkbox');
    });

    it('should show every hidden column when the show all item is clicked', async () => {
      const { toolbar, table } = await createFixture({ features: 'columns' });
      table.hideColumn('id');
      table.hideColumn('age');
      await toolbar.updateComplete;
      await userEvent.click(getButtons(toolbar)[0]);
      await vi.waitFor(() => expect(getColumnsMenu(toolbar).open).toBe(true));

      await userEvent.click(getShowAllItem(toolbar));
      await toolbar.updateComplete;

      expect(table.columnVisibility['id']).not.toBe(false);
      expect(table.columnVisibility['age']).not.toBe(false);
      expect(getColumnItems(toolbar).map(item => item.checked)).toEqual([true, true, true]);
    });

    it('should disable the show all item when every column is visible', async () => {
      const { toolbar, table } = await createFixture({ features: 'columns' });
      expect(getShowAllItem(toolbar).disabled).toBe(true);

      table.hideColumn('name');
      await toolbar.updateComplete;

      expect(getShowAllItem(toolbar).disabled).toBe(false);
    });

    it('should hide a column when its item is unchecked', async () => {
      const { toolbar, table } = await createFixture({ features: 'columns' });
      await userEvent.click(getButtons(toolbar)[0]);
      await vi.waitFor(() => expect(getColumnsMenu(toolbar).open).toBe(true));

      await userEvent.click(getColumnItems(toolbar)[1]);

      expect(table.columnVisibility['name']).toBe(false);
    });

    it('should show a hidden column when its item is checked', async () => {
      const { toolbar, table } = await createFixture({ features: 'columns' });
      table.hideColumn('name');
      await toolbar.updateComplete;
      await userEvent.click(getButtons(toolbar)[0]);
      await vi.waitFor(() => expect(getColumnsMenu(toolbar).open).toBe(true));

      await userEvent.click(getColumnItems(toolbar)[1]);

      expect(table.columnVisibility['name']).not.toBe(false);
    });

    it('should keep the menu open when a column item is toggled', async () => {
      const { toolbar } = await createFixture({ features: 'columns' });
      await userEvent.click(getButtons(toolbar)[0]);
      await vi.waitFor(() => expect(getColumnsMenu(toolbar).open).toBe(true));

      await userEvent.click(getColumnItems(toolbar)[0]);

      expect(getColumnsMenu(toolbar).open).toBe(true);
    });

    it('should update the checked items when column visibility changes elsewhere', async () => {
      const { toolbar, table } = await createFixture({ features: 'columns' });

      table.hideColumn('id');
      await toolbar.updateComplete;

      expect(getColumnItems(toolbar)[0].checked).toBe(false);
    });

    it('should not throw when the columns button is clicked without a connected table', async () => {
      const { toolbar } = await createFixture({ features: 'columns', withTable: false });

      await expect(userEvent.click(getButtons(toolbar)[0])).resolves.not.toThrow();
      expect(getColumnItems(toolbar)).toHaveLength(0);
    });
  });

  describe('export', () => {
    it('should export the connected table to CSV when the export button is clicked', async () => {
      const { toolbar, table } = await createFixture({ features: 'export' });
      const exportToCsv = vi.spyOn(table, 'exportToCsv').mockImplementation(() => undefined);

      await userEvent.click(getButtons(toolbar)[0]);

      expect(exportToCsv).toHaveBeenCalledOnce();
    });

    it('should not throw when the export button is clicked without a connected table', async () => {
      const { toolbar } = await createFixture({ features: 'export', withTable: false });

      await expect(userEvent.click(getButtons(toolbar)[0])).resolves.not.toThrow();
    });

    it('should not export when a different feature button is clicked', async () => {
      const { toolbar, table } = await createFixture({ features: 'search,export' });
      const exportToCsv = vi.spyOn(table, 'exportToCsv').mockImplementation(() => undefined);

      await userEvent.click(getButtons(toolbar)[0]);

      expect(exportToCsv).not.toHaveBeenCalled();
    });
  });

  describe('print', () => {
    it('should print the connected table when the print button is clicked', async () => {
      const { toolbar, table } = await createFixture({ features: 'print' });
      const print = vi.spyOn(table, 'print').mockImplementation(() => undefined);

      await userEvent.click(getButtons(toolbar)[0]);

      expect(print).toHaveBeenCalledOnce();
    });

    it('should not throw when the print button is clicked without a connected table', async () => {
      const { toolbar } = await createFixture({ features: 'print', withTable: false });

      await expect(userEvent.click(getButtons(toolbar)[0])).resolves.not.toThrow();
    });

    it('should not print when a different feature button is clicked', async () => {
      const { toolbar, table } = await createFixture({ features: 'search,print' });
      const print = vi.spyOn(table, 'print').mockImplementation(() => undefined);

      await userEvent.click(getButtons(toolbar)[0]);

      expect(print).not.toHaveBeenCalled();
    });

    it('should not export when the print button is clicked', async () => {
      const { toolbar, table } = await createFixture({ features: 'print' });
      vi.spyOn(table, 'print').mockImplementation(() => undefined);
      const exportToCsv = vi.spyOn(table, 'exportToCsv').mockImplementation(() => undefined);

      await userEvent.click(getButtons(toolbar)[0]);

      expect(exportToCsv).not.toHaveBeenCalled();
    });
  });

  describe('select', () => {
    it('should turn on row selection when the select button is clicked and selection is off', async () => {
      const { toolbar, table } = await createFixture({ features: 'select' });

      await userEvent.click(getButtons(toolbar)[0]);

      expect(table.rowSelection).toBe('multiple');
    });

    it('should turn off row selection when the select button is clicked and selection is on', async () => {
      const { toolbar, table } = await createFixture({ features: 'select' });
      await userEvent.click(getButtons(toolbar)[0]);
      await userEvent.click(getButtons(toolbar)[0]);

      expect(table.rowSelection).toBe('off');
    });

    it('should show the select button as on when row selection is enabled', async () => {
      const { toolbar, table } = await createFixture({ features: 'select' });

      await userEvent.click(getButtons(toolbar)[0]);
      await toolbar.updateComplete;
      expect((getButtons(toolbar)[0] as HTMLElement & { on: boolean }).on).toBe(true);

      await userEvent.click(getButtons(toolbar)[0]);
      await toolbar.updateComplete;
      expect((getButtons(toolbar)[0] as HTMLElement & { on: boolean }).on).toBe(false);
      expect(table.rowSelection).toBe('off');
    });

    it('should not throw when the select button is clicked without a connected table', async () => {
      const { toolbar } = await createFixture({ features: 'select', withTable: false });

      await expect(userEvent.click(getButtons(toolbar)[0])).resolves.not.toThrow();
    });
  });

  describe('filter', () => {
    it('should turn on column filtering when the filter button is clicked and filtering is off', async () => {
      const { toolbar, table } = await createFixture({ features: 'filter' });

      await userEvent.click(getButtons(toolbar)[0]);

      expect(table.filterable).toBe(true);
    });

    it('should turn off column filtering when the filter button is clicked and filtering is on', async () => {
      const { toolbar, table } = await createFixture({ features: 'filter' });
      await userEvent.click(getButtons(toolbar)[0]);
      await userEvent.click(getButtons(toolbar)[0]);

      expect(table.filterable).toBe(false);
    });

    it('should show the filter button as on when column filtering is enabled', async () => {
      const { toolbar } = await createFixture({ features: 'filter' });

      await userEvent.click(getButtons(toolbar)[0]);
      await toolbar.updateComplete;
      expect((getButtons(toolbar)[0] as HTMLElement & { on: boolean }).on).toBe(true);

      await userEvent.click(getButtons(toolbar)[0]);
      await toolbar.updateComplete;
      expect((getButtons(toolbar)[0] as HTMLElement & { on: boolean }).on).toBe(false);
    });

    it('should not change row selection when the filter button is clicked', async () => {
      const { toolbar, table } = await createFixture({ features: 'filter' });

      await userEvent.click(getButtons(toolbar)[0]);

      expect(table.rowSelection).toBe('off');
    });

    it('should not throw when the filter button is clicked without a connected table', async () => {
      const { toolbar } = await createFixture({ features: 'filter', withTable: false });

      await expect(userEvent.click(getButtons(toolbar)[0])).resolves.not.toThrow();
    });
  });

  it('should be accessible', async () => {
    const { toolbar } = await createFixture({ features: 'export' });

    await expect(toolbar).toBeAccessible();
  });
});
