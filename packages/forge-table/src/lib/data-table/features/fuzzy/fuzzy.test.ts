import { DataSource } from '@tylertech/forge-core';
import { html } from 'lit';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-lit';
import '../../data-table.js';
import type { ColumnDef, DataTableElement } from '../../data-table.js';
import { registerFilterFns } from '../../data-table.js';
import { fuzzyFilter, fuzzySort } from './index.js';

interface Person {
  name: string;
}

const PEOPLE: Person[] = [{ name: 'Alice' }, { name: 'Amal' }, { name: 'Bob' }, { name: 'Charlie' }, { name: 'Malik' }];

const settle = async (element: DataTableElement<Person>): Promise<void> => {
  await element.updateComplete;
  await new Promise(resolve => setTimeout(resolve));
  await element.updateComplete;
};

const createFixture = async (columns: ColumnDef<Person>[]): Promise<DataTableElement<Person>> => {
  const screen = render(html`
    <forge-data-table .dataSource=${new DataSource<Person>(() => PEOPLE)} .columns=${columns} .filterable=${true} .sortable=${true}></forge-data-table>
  `);
  const element = screen.container.querySelector('forge-data-table') as DataTableElement<Person>;
  await settle(element);
  return element;
};

const filterBy = async (element: DataTableElement<Person>, value: string): Promise<void> => {
  const input = element.shadowRoot?.querySelector('.filter-container input') as HTMLInputElement;
  input.value = value;
  input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
  await settle(element);
};

const sortAscending = async (element: DataTableElement<Person>): Promise<void> => {
  const content = element.shadowRoot?.querySelector('thead th .cell-content') as HTMLElement;
  content.click();
  await settle(element);
};

const getNames = (element: DataTableElement<Person>): string[] =>
  Array.from(element.shadowRoot?.querySelectorAll('tbody:not(.empty-tbody) tr td') ?? []).map(cell => cell.textContent?.trim() ?? '');

describe('Fuzzy filtering', () => {
  describe('fuzzyFilter', () => {
    it('should keep rows that match the filter text approximately', async () => {
      const element = await createFixture([{ id: 'name', header: 'Name', property: 'name', filter: fuzzyFilter }]);

      await filterBy(element, 'ace');

      expect(getNames(element)).toEqual(['Alice']);
    });

    it('should match regardless of case', async () => {
      const element = await createFixture([{ id: 'name', header: 'Name', property: 'name', filter: fuzzyFilter }]);

      await filterBy(element, 'BOB');

      expect(getNames(element)).toEqual(['Bob']);
    });

    it('should show every row when the filter text is cleared', async () => {
      const element = await createFixture([{ id: 'name', header: 'Name', property: 'name', filter: fuzzyFilter }]);

      await filterBy(element, 'ace');
      await filterBy(element, '');

      expect(getNames(element)).toHaveLength(PEOPLE.length);
    });

    it('should filter when registered by name', async () => {
      registerFilterFns({ fuzzy: fuzzyFilter });
      const element = await createFixture([{ id: 'name', header: 'Name', property: 'name', filter: 'fuzzy' }]);

      await filterBy(element, 'ace');

      expect(getNames(element)).toEqual(['Alice']);
    });
  });

  describe('fuzzySort', () => {
    it('should sort the best matches first when the column is filtered', async () => {
      const element = await createFixture([{ id: 'name', header: 'Name', property: 'name', filter: fuzzyFilter, sortFn: fuzzySort }]);

      await filterBy(element, 'mal');
      await sortAscending(element);

      expect(getNames(element)).toEqual(['Malik', 'Amal']);
    });

    it('should sort alphanumerically when the column is not filtered', async () => {
      const element = await createFixture([{ id: 'name', header: 'Name', property: 'name', filter: fuzzyFilter, sortFn: fuzzySort }]);

      await sortAscending(element);

      expect(getNames(element)).toEqual(['Alice', 'Amal', 'Bob', 'Charlie', 'Malik']);
    });

    it('should not sort by match rank without the sort function', async () => {
      const element = await createFixture([{ id: 'name', header: 'Name', property: 'name', filter: fuzzyFilter }]);

      await filterBy(element, 'mal');
      await sortAscending(element);

      expect(getNames(element)).toEqual(['Amal', 'Malik']);
    });
  });
});
