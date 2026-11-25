import { DataSource } from '@tylertech/forge-core';
import { html } from 'lit';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { getTableAccessibility } from '../../testing/accessibility.js';
import '../data-table/data-table.js';
import type { ColumnDef, DataTableElement } from '../data-table/data-table.js';
import './caption.js';
import type { CaptionElement } from './caption.js';

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
  caption: CaptionElement;
  table: DataTableElement<TestData>;
  container: HTMLElement;
}

async function createFixture(captionAttributes = 'table="people"'): Promise<Fixture> {
  const markup = `<forge-data-table-caption ${captionAttributes}>Names are sorted alphabetically.</forge-data-table-caption>`;
  const screen = await render(html`
    <div id="caption-host"></div>
    <forge-data-table id="people" .columns=${TEST_COLUMNS} .dataSource=${new DataSource<TestData>(() => TEST_DATA)}></forge-data-table>
  `);
  const container = screen.container as HTMLElement;
  const host = container.querySelector('#caption-host') as HTMLElement;
  host.innerHTML = markup;
  const caption = host.querySelector('forge-data-table-caption') as CaptionElement;
  const table = container.querySelector('forge-data-table') as DataTableElement<TestData>;
  await table.updateComplete;
  await caption.updateComplete;
  await table.updateComplete;
  return { caption, table, container };
}

describe('CaptionElement', () => {
  it('should render slotted content', async () => {
    const { caption } = await createFixture();

    const slot = caption.shadowRoot?.querySelector('slot');

    expect(slot?.assignedNodes().map(node => node.textContent)).toEqual(['Names are sorted alphabetically.']);
  });

  it('should describe the table with the matching id', async () => {
    const { caption, table } = await createFixture();

    expect(caption.tableElement).toBe(table);
    expect(table.ariaDescribedByElements).toEqual([caption]);
  });

  it('should describe the table that is assigned to tableElement', async () => {
    const { caption, table } = await createFixture('');

    caption.tableElement = table;
    await caption.updateComplete;

    expect(table.ariaDescribedByElements).toEqual([caption]);
  });

  it('should not describe any table when the id does not match', async () => {
    const { caption, table } = await createFixture('table="missing"');

    expect(caption.tableElement).toBeNull();
    expect(table.ariaDescribedByElements).toBeNull();
  });

  it('should expose the caption as the accessible description of the table', async () => {
    const { table } = await createFixture();
    await vi.waitFor(() => expect(table.shadowRoot?.querySelectorAll('tbody tr').length).toBe(TEST_DATA.length));

    await vi.waitFor(async () => expect((await getTableAccessibility()).description).toBe('Names are sorted alphabetically.'));
  });

  it('should stop describing the table when it is removed from the document', async () => {
    const { caption, table } = await createFixture();

    caption.remove();

    expect(table.ariaDescribedByElements).toBeNull();
  });

  it('should describe the table again when it is reconnected', async () => {
    const { caption, table, container } = await createFixture();
    const host = caption.parentElement as HTMLElement;

    caption.remove();
    host.append(caption);
    await caption.updateComplete;

    expect(table.ariaDescribedByElements).toEqual([caption]);
    expect(container.contains(caption)).toBe(true);
  });

  it('should move to another table when the table id changes', async () => {
    const { caption, table, container } = await createFixture();
    const other = document.createElement('forge-data-table') as DataTableElement<TestData>;
    other.id = 'other';
    container.append(other);

    caption.table = 'other';
    await caption.updateComplete;

    expect(table.ariaDescribedByElements).toBeNull();
    expect(other.ariaDescribedByElements).toEqual([caption]);
  });

  it('should stop describing the table when the table id is cleared', async () => {
    const { caption, table } = await createFixture();

    caption.table = undefined;
    await caption.updateComplete;

    expect(table.ariaDescribedByElements).toBeNull();
  });

  it('should keep other captions when one caption is removed', async () => {
    const { caption, table, container } = await createFixture();
    const second = document.createElement('forge-data-table-caption') as CaptionElement;
    second.table = 'people';
    container.append(second);
    await second.updateComplete;

    expect(table.ariaDescribedByElements).toEqual([caption, second]);

    caption.remove();

    expect(table.ariaDescribedByElements).toEqual([second]);
  });
});
