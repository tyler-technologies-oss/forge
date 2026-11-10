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
  { id: 'id', header: 'ID', property: 'id', hideable: false },
  { id: 'name', header: 'Name', property: 'name' },
  { id: 'age', header: 'Age', property: 'age' }
];

interface Fixture {
  toolbar: TableToolbarElement;
  table: DataTableElement<TestData>;
}

async function createFixture(options: { rowSelection?: 'off' | 'single' | 'multiple'; withTable?: boolean } = {}): Promise<Fixture> {
  const { rowSelection = 'multiple', withTable = true } = options;
  const screen = await render(html`
    <forge-data-table-toolbar>
      <span slot="start">People</span>
      <forge-icon-button slot="selection-actions" aria-label="Delete selected"></forge-icon-button>
      <forge-icon-button slot="end" aria-label="Export"></forge-icon-button>
    </forge-data-table-toolbar>
    <forge-data-table .columns=${TEST_COLUMNS} .dataSource=${new DataSource<TestData>(() => TEST_DATA)} row-selection=${rowSelection}></forge-data-table>
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

async function openColumnsMenu(toolbar: TableToolbarElement): Promise<HTMLElement[]> {
  await userEvent.click(toolbar.shadowRoot?.querySelector('#columns-button') as HTMLElement);
  const getCheckboxes = (): HTMLElement[] => Array.from(toolbar.shadowRoot?.querySelectorAll<HTMLElement>('.column-list forge-checkbox') ?? []);
  await vi.waitFor(() => expect(getCheckboxes().length).toBeGreaterThan(0));
  return getCheckboxes();
}

function getSelectionSummary(toolbar: TableToolbarElement): string | undefined {
  return toolbar.shadowRoot?.querySelector('.selection-summary')?.textContent?.trim();
}

async function selectRow(table: DataTableElement<TestData>, index: number): Promise<void> {
  const checkbox = table.shadowRoot?.querySelectorAll('tbody forge-checkbox')[index] as HTMLElement;
  checkbox.click();
  await table.updateComplete;
}

describe('TableToolbar', () => {
  describe('table association', () => {
    it('should connect to the data table with the id given by table', async () => {
      const { toolbar, table } = await createFixture({ withTable: false });
      table.id = 'people';

      toolbar.table = 'people';
      await toolbar.updateComplete;

      expect(toolbar.tableElement).toBe(table);
      await selectRow(table, 0);
      await vi.waitFor(() => expect(getSelectionSummary(toolbar)).toBe('1 selected'));
    });

    it('should connect to the data table with the id given by the table attribute', async () => {
      const { toolbar, table } = await createFixture({ withTable: false });
      table.id = 'people';

      toolbar.setAttribute('table', 'people');
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

  it('should render the start and end slots', async () => {
    const { toolbar } = await createFixture();

    expect(toolbar.querySelector('[slot="start"]')?.textContent).toBe('People');
    expect(toolbar.shadowRoot?.querySelector('slot[name="start"]')).not.toBeNull();
    expect(toolbar.shadowRoot?.querySelector('slot[name="end"]')).not.toBeNull();
  });

  it('should render an accessible columns button', async () => {
    const { toolbar } = await createFixture();

    expect(toolbar.shadowRoot?.querySelector('#columns-button')?.getAttribute('aria-label')).toBe('Columns');
  });

  it('should use a custom label for the columns button', async () => {
    const { toolbar } = await createFixture();

    toolbar.columnsButtonLabel = 'Show columns';
    await toolbar.updateComplete;

    expect(toolbar.shadowRoot?.querySelector('#columns-button')?.getAttribute('aria-label')).toBe('Show columns');
  });

  it('should not render the columns button when hide-columns-button is set', async () => {
    const { toolbar } = await createFixture();

    toolbar.hideColumnsButton = true;
    await toolbar.updateComplete;

    expect(toolbar.shadowRoot?.querySelector('#columns-button')).toBeNull();
  });

  describe('column visibility', () => {
    it('should list the hideable columns when the menu is opened', async () => {
      const { toolbar } = await createFixture();

      const checkboxes = await openColumnsMenu(toolbar);

      expect(checkboxes.map(c => c.textContent?.trim())).toEqual(['Name', 'Age']);
      expect(checkboxes.every(c => (c as HTMLInputElement & { checked: boolean }).checked)).toBe(true);
    });

    it('should list no columns when no table is connected', async () => {
      const { toolbar } = await createFixture({ withTable: false });

      await userEvent.click(toolbar.shadowRoot?.querySelector('#columns-button') as HTMLElement);

      expect(toolbar.shadowRoot?.querySelectorAll('.column-list forge-checkbox').length).toBe(0);
    });

    it('should hide the column when its checkbox is cleared', async () => {
      const { toolbar, table } = await createFixture();
      const checkboxes = await openColumnsMenu(toolbar);

      checkboxes[0].click();

      await vi.waitFor(() => expect(table.columnVisibility.name).toBe(false));
    });

    it('should show the column again when its checkbox is checked', async () => {
      const { toolbar, table } = await createFixture();
      const checkboxes = await openColumnsMenu(toolbar);

      checkboxes[0].click();
      await vi.waitFor(() => expect(table.columnVisibility.name).toBe(false));
      checkboxes[0].click();

      await vi.waitFor(() => expect(table.columnVisibility.name).toBe(true));
    });

    it('should reflect columns hidden elsewhere when the menu is opened', async () => {
      const { toolbar, table } = await createFixture();
      table.hideColumn('age');
      await table.updateComplete;

      const checkboxes = await openColumnsMenu(toolbar);

      expect((checkboxes[1] as HTMLInputElement & { checked: boolean }).checked).toBe(false);
    });
  });

  describe('row selection', () => {
    it('should not show the selection summary when no rows are selected', async () => {
      const { toolbar } = await createFixture();

      expect(getSelectionSummary(toolbar)).toBeUndefined();
    });

    it('should show the number of selected rows', async () => {
      const { toolbar, table } = await createFixture();

      await selectRow(table, 0);
      await selectRow(table, 2);

      await vi.waitFor(() => expect(getSelectionSummary(toolbar)).toBe('2 selected'));
    });

    it('should show the selection actions only while rows are selected', async () => {
      const { toolbar, table } = await createFixture();
      expect(toolbar.shadowRoot?.querySelector('slot[name="selection-actions"]')).toBeNull();

      await selectRow(table, 0);

      await vi.waitFor(() => expect(toolbar.shadowRoot?.querySelector('slot[name="selection-actions"]')).not.toBeNull());
    });

    it('should hide the selection summary when the selection is cleared', async () => {
      const { toolbar, table } = await createFixture();
      await selectRow(table, 0);
      await vi.waitFor(() => expect(getSelectionSummary(toolbar)).toBe('1 selected'));

      await selectRow(table, 0);

      await vi.waitFor(() => expect(getSelectionSummary(toolbar)).toBeUndefined());
    });

    it('should stop tracking the previous table when a different table is connected', async () => {
      const { toolbar, table } = await createFixture();
      await selectRow(table, 0);
      await vi.waitFor(() => expect(getSelectionSummary(toolbar)).toBe('1 selected'));

      toolbar.tableElement = null;
      await toolbar.updateComplete;
      await selectRow(table, 1);

      expect(getSelectionSummary(toolbar)).toBeUndefined();
    });
  });

  it('should be accessible', async () => {
    const { toolbar } = await createFixture();

    await expect(toolbar).toBeAccessible();
  });
});
