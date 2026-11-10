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

  it('should be accessible', async () => {
    const { toolbar } = await createFixture({ features: 'export' });

    await expect(toolbar).toBeAccessible();
  });
});
