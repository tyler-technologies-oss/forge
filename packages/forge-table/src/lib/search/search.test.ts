import { DataSource } from '@tylertech/forge-core';
import { html } from 'lit';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { userEvent } from 'vitest/browser';
import '../data-table/data-table.js';
import { fuzzyFilter } from '../data-table/features/fuzzy/index.js';
import { filterFn_includesString as includesString } from '../data-table/features/filter-fns.js';
import type { ColumnDef, DataTableElement } from '../data-table/data-table.js';
import './search.js';
import type { SearchElement } from './search.js';

interface TestData {
  id: number;
  name: string;
}

const TEST_DATA: TestData[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

const TEST_COLUMNS: ColumnDef<TestData>[] = [
  { id: 'id', header: 'ID', property: 'id' },
  { id: 'name', header: 'Name', property: 'name' }
];

interface Fixture {
  search: SearchElement;
  table: DataTableElement<TestData>;
  input: HTMLInputElement;
}

async function createFixture(options: { withTable?: boolean } = {}): Promise<Fixture> {
  const { withTable = true } = options;
  const screen = await render(html`
    <forge-data-table-search></forge-data-table-search>
    <forge-data-table id="people" .columns=${TEST_COLUMNS} .dataSource=${new DataSource<TestData>(() => TEST_DATA)}></forge-data-table>
  `);
  const search = screen.container.querySelector('forge-data-table-search') as SearchElement;
  const table = screen.container.querySelector('forge-data-table') as DataTableElement<TestData>;
  await table.updateComplete;
  if (withTable) {
    search.tableElement = table;
  }
  await search.updateComplete;
  const input = search.shadowRoot?.querySelector('input') as HTMLInputElement;
  return { search, table, input };
}

describe('SearchElement', () => {
  it('should render a text field with a labelled input', async () => {
    const { search, input } = await createFixture();

    expect(search.shadowRoot?.querySelector('forge-text-field')).toBeTruthy();
    expect(input.getAttribute('aria-label')).toBe('Search');
  });

  describe('table association', () => {
    it('should connect to the data table with the id given by table', async () => {
      const { search, table } = await createFixture({ withTable: false });

      search.table = 'people';
      await search.updateComplete;

      expect(search.tableElement).toBe(table);
    });

    it('should connect to the data table with the id given by the table attribute', async () => {
      const { search, table } = await createFixture({ withTable: false });

      search.setAttribute('table', 'people');
      await search.updateComplete;

      expect(search.tableElement).toBe(table);
    });

    it('should keep an assigned table element when table is also set', async () => {
      const { search, table } = await createFixture({ withTable: false });

      search.tableElement = table;
      search.table = 'missing';
      await search.updateComplete;

      expect(search.tableElement).toBe(table);
    });

    it('should not connect to a table when the id matches nothing', async () => {
      const { search } = await createFixture({ withTable: false });

      search.table = 'missing';
      await search.updateComplete;

      expect(search.tableElement).toBeNull();
    });
  });

  describe('filter function menu', () => {
    const getButton = (search: SearchElement): HTMLElement | null => search.shadowRoot?.querySelector('.filter-fn-button') ?? null;
    const getItems = (search: SearchElement): (HTMLElement & { checked: boolean })[] =>
      Array.from(search.shadowRoot?.querySelectorAll<HTMLElement & { checked: boolean }>('forge-dropdown-menu-item-radio') ?? []);

    it('should not render a menu when the table has no filter functions', async () => {
      const { search } = await createFixture();

      expect(getButton(search)).toBeNull();
      expect(getItems(search).length).toBe(0);
    });

    it('should not render a menu when the table has one filter function', async () => {
      const { search, table } = await createFixture();

      table.filter = includesString;
      await table.updateComplete;
      await search.updateComplete;

      expect(getButton(search)).toBeNull();
    });

    it('should render a radio item for each filter function when the table has more than one', async () => {
      const { search, table } = await createFixture();

      table.filter = [includesString, { filterFn: fuzzyFilter, label: 'Fuzzy' }];
      await table.updateComplete;
      await search.updateComplete;

      expect(getButton(search)).toBeTruthy();
      expect(getItems(search).map(item => item.textContent?.trim())).toEqual(['Contains', 'Fuzzy']);
      expect(getItems(search).map(item => item.checked)).toEqual([true, false]);
    });

    it('should choose the filter function of the item that is clicked', async () => {
      const { search, table } = await createFixture();
      table.filter = [includesString, { filterFn: fuzzyFilter, label: 'Fuzzy' }];
      await table.updateComplete;
      await search.updateComplete;

      getItems(search)[1].click();
      await search.updateComplete;

      expect(table.globalFilterFnIndex).toBe(1);
      expect(getItems(search).map(item => item.checked)).toEqual([false, true]);
    });

    it('should search with the chosen filter function', async () => {
      const { search, table, input } = await createFixture();
      table.filter = [includesString, { filterFn: fuzzyFilter, label: 'Fuzzy' }];
      await table.updateComplete;
      await search.updateComplete;
      getItems(search)[1].click();
      await userEvent.click(input);

      await userEvent.keyboard('alce');

      await vi.waitFor(() => expect(table.shadowRoot?.querySelectorAll('tbody tr').length).toBe(1));
    });

    it('should show the function chosen on the table', async () => {
      const { search, table } = await createFixture();
      table.filter = [includesString, { filterFn: fuzzyFilter, label: 'Fuzzy' }];
      await table.updateComplete;
      await search.updateComplete;

      table.setGlobalFilterFn(1);
      await search.updateComplete;

      expect(getItems(search).map(item => item.checked)).toEqual([false, true]);
    });
  });

  describe('searching', () => {
    it('should call globalFilter on the table with the entered text', async () => {
      const { table, input } = await createFixture();
      const globalFilter = vi.spyOn(table, 'globalFilter');

      await userEvent.click(input);
      await userEvent.keyboard('Ali');

      expect(globalFilter).toHaveBeenCalledTimes(3);
      expect(globalFilter).toHaveBeenLastCalledWith('Ali');
    });

    it('should call globalFilter with an empty string when the text is cleared', async () => {
      const { table, input } = await createFixture();
      await userEvent.click(input);
      await userEvent.keyboard('A');
      const globalFilter = vi.spyOn(table, 'globalFilter');

      await userEvent.keyboard('{Backspace}');

      expect(globalFilter).toHaveBeenCalledWith('');
    });

    it('should call globalFilter on the table found by id', async () => {
      const { search, table, input } = await createFixture({ withTable: false });
      search.table = 'people';
      await search.updateComplete;
      const globalFilter = vi.spyOn(table, 'globalFilter');

      await userEvent.click(input);
      await userEvent.keyboard('B');

      expect(globalFilter).toHaveBeenCalledWith('B');
    });

    it('should filter the table rows as text is entered', async () => {
      const { table, input } = await createFixture();
      await vi.waitFor(() => expect(table.shadowRoot?.querySelectorAll('tbody tr').length).toBe(TEST_DATA.length));

      await userEvent.click(input);
      await userEvent.keyboard('bob');

      await vi.waitFor(() => expect(table.shadowRoot?.querySelectorAll('tbody tr').length).toBe(1));
    });

    it('should clear the field when the table clears its global filter', async () => {
      const { table, input } = await createFixture();
      await userEvent.click(input);
      await userEvent.keyboard('zzz');

      table.globalFilter('');

      expect(input.value).toBe('');
    });

    it('should show text set on the table in the field', async () => {
      const { table, input } = await createFixture();

      table.globalFilter('bob');

      expect(input.value).toBe('bob');
    });

    it('should stop following a table it is no longer connected to', async () => {
      const { search, table, input } = await createFixture();
      search.tableElement = null;
      await search.updateComplete;

      table.globalFilter('bob');

      expect(input.value).toBe('');
    });

    it('should not throw when no table is connected', async () => {
      const { input } = await createFixture({ withTable: false });

      await userEvent.click(input);

      await expect(userEvent.keyboard('A')).resolves.not.toThrow();
    });
  });
});
