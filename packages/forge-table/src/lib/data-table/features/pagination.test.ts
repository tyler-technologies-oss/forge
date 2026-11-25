import { DataSource } from '@tylertech/forge-core';
import type { IPaginatorChangeEventData, IPaginatorComponent } from '@tylertech/forge';
import { html } from 'lit';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-lit';
import '../data-table.js';
import type { ColumnDef, DataTableElement } from '../data-table.js';

import '@tylertech/forge/paginator';

interface TestRow {
  id: number;
  name: string;
}

interface GroupedRow extends TestRow {
  group: string;
}

const COLUMNS: ColumnDef<TestRow>[] = [
  { id: 'id', header: 'ID', property: 'id' },
  { id: 'name', header: 'Name', property: 'name' }
];

const createRows = (count: number, prefix = 'Row'): TestRow[] => Array.from({ length: count }, (_, i) => ({ id: i + 1, name: `${prefix} ${i + 1}` }));

async function settle(element: DataTableElement<TestRow>): Promise<void> {
  await element.updateComplete;
  await new Promise(resolve => setTimeout(resolve));
  await element.updateComplete;
}

interface FixtureOptions {
  rows?: TestRow[];
  paginate?: boolean;
  paginator?: boolean;
  pageSize?: number;
  compact?: boolean;
}

class PaginationHarness {
  constructor(public readonly element: DataTableElement<TestRow>) {}

  public get paginator(): IPaginatorComponent {
    return this.element.querySelector('forge-paginator') as IPaginatorComponent;
  }

  public get names(): string[] {
    const cells = this.element.shadowRoot?.querySelectorAll('tbody:not(.empty-tbody) tr td:nth-child(2)') ?? [];
    return Array.from(cells, cell => cell.textContent?.trim() ?? '');
  }

  public get height(): number {
    return (this.element.shadowRoot?.querySelector('.table-container') as HTMLElement).getBoundingClientRect().height;
  }

  public get filler(): Element | null {
    return this.element.shadowRoot?.querySelector('.page-filler-tbody') ?? null;
  }

  public async setRows(rows: TestRow[]): Promise<void> {
    this.element.dataSource = new DataSource<TestRow>(() => rows);
    await settle(this.element);
  }

  public async goToNextPage(): Promise<void> {
    this.paginator.goToNextPage();
    await settle(this.element);
  }
}

async function createFixture({
  rows = createRows(5),
  paginate = true,
  paginator = true,
  pageSize = 2,
  compact = false
}: FixtureOptions = {}): Promise<PaginationHarness> {
  const screen = render(html`
    <forge-data-table .dataSource=${new DataSource<TestRow>(() => rows)} .columns=${COLUMNS} .paginate=${paginate} .compact=${compact}>
      ${paginator ? html`<forge-paginator slot="paginator" page-size=${pageSize}></forge-paginator>` : null}
    </forge-data-table>
  `);
  const element = screen.container.querySelector('forge-data-table') as DataTableElement<TestRow>;
  await settle(element);
  return new PaginationHarness(element);
}

describe('DataTable pagination', () => {
  it('should show every row when paginate is false', async () => {
    const harness = await createFixture({ paginate: false });

    expect(harness.names).toEqual(['Row 1', 'Row 2', 'Row 3', 'Row 4', 'Row 5']);
  });

  it('should not render the paginator slot when paginate is false', async () => {
    const harness = await createFixture({ paginate: false });

    expect(harness.element.shadowRoot?.querySelector('slot[name="paginator"]')).toBeNull();
  });

  it('should render the paginator slot when paginate is true', async () => {
    const harness = await createFixture();

    expect(harness.element.shadowRoot?.querySelector('slot[name="paginator"]')).not.toBeNull();
  });

  it('should show only the first page of rows when paginate is true', async () => {
    const harness = await createFixture();

    expect(harness.names).toEqual(['Row 1', 'Row 2']);
  });

  it('should use the page size of the paginator when it is provided', async () => {
    const harness = await createFixture({ pageSize: 3 });

    expect(harness.names).toEqual(['Row 1', 'Row 2', 'Row 3']);
  });

  it('should set the total of the paginator to the number of rows', async () => {
    const harness = await createFixture();

    expect(harness.paginator.total).toBe(5);
  });

  it('should show the next page of rows when the paginator goes to the next page', async () => {
    const harness = await createFixture();

    await harness.goToNextPage();

    expect(harness.names).toEqual(['Row 3', 'Row 4']);
    expect(harness.paginator.pageIndex).toBe(1);
  });

  it('should show a partial last page', async () => {
    const harness = await createFixture();

    await harness.goToNextPage();
    await harness.goToNextPage();

    expect(harness.names).toEqual(['Row 5']);
    expect(harness.paginator.canGoToNextPage()).toBe(false);
  });

  it('should show the previous page of rows when the paginator goes to the previous page', async () => {
    const harness = await createFixture();
    await harness.goToNextPage();

    harness.paginator.goToPreviousPage();
    await settle(harness.element);

    expect(harness.names).toEqual(['Row 1', 'Row 2']);
  });

  it('should show the first page of the new size when the page size changes', async () => {
    const harness = await createFixture();
    await harness.goToNextPage();

    harness.paginator.dispatchEvent(
      new CustomEvent<IPaginatorChangeEventData>('forge-paginator-change', {
        detail: { type: 'page-size', pageIndex: 0, pageSize: 4, offset: 0 },
        bubbles: true,
        cancelable: true
      })
    );
    await settle(harness.element);

    expect(harness.names).toEqual(['Row 1', 'Row 2', 'Row 3', 'Row 4']);
    expect(harness.paginator.pageSize).toBe(4);
    expect(harness.paginator.pageIndex).toBe(0);
  });

  it('should go back to the first page when the data source changes', async () => {
    const harness = await createFixture();
    await harness.goToNextPage();

    await harness.setRows(createRows(6, 'New'));

    expect(harness.names).toEqual(['New 1', 'New 2']);
    expect(harness.paginator.pageIndex).toBe(0);
    expect(harness.paginator.total).toBe(6);
  });

  it('should update the total of the paginator when the data source changes', async () => {
    const harness = await createFixture();

    await harness.setRows(createRows(9));

    expect(harness.paginator.total).toBe(9);
  });

  it('should adopt a paginator that is added after the table has rendered', async () => {
    const harness = await createFixture({ paginator: false });
    expect(harness.names).toHaveLength(5);

    const paginator = document.createElement('forge-paginator');
    paginator.slot = 'paginator';
    paginator.pageSize = 3;
    harness.element.append(paginator);
    await settle(harness.element);

    expect(harness.names).toEqual(['Row 1', 'Row 2', 'Row 3']);
    expect(paginator.total).toBe(5);
  });

  it('should count the rows of an expanded group toward the page and keep the page when a group is expanded', async () => {
    const rows = Array.from({ length: 8 }, (_, i) => ({ id: i + 1, name: `Row ${i + 1}`, group: `Group ${Math.floor(i / 2) + 1}` }));
    const columns: ColumnDef<GroupedRow>[] = [
      { id: 'id', header: 'ID', property: 'id' },
      { id: 'name', header: 'Name', property: 'name' },
      { id: 'group', header: 'Group', property: 'group' }
    ];
    const screen = render(html`
      <forge-data-table .dataSource=${new DataSource(() => rows)} .columns=${columns} .grouping=${['group']} paginate>
        <forge-paginator slot="paginator" page-size="2"></forge-paginator>
      </forge-data-table>
    `);
    const element = screen.container.querySelector('forge-data-table') as DataTableElement<TestRow>;
    await settle(element);
    const paginator = element.querySelector('forge-paginator') as IPaginatorComponent;
    const bodyRows = (): Element[] => Array.from(element.shadowRoot?.querySelectorAll('tbody tr') ?? []);

    expect(bodyRows()).toHaveLength(2);
    expect(paginator.total).toBe(4);

    paginator.goToNextPage();
    await settle(element);
    (element.shadowRoot?.querySelector('tbody tr .group-toggle') as HTMLElement).click();
    await settle(element);

    expect(paginator.pageIndex).toBe(1);
    expect(paginator.total).toBe(6);
    expect(bodyRows().map(row => row.textContent?.replace(/\s+/g, ' ').trim())).toEqual(['Group 3 (2)', '5 Row 5']);
  });

  describe('page padding', () => {
    it('should keep the height of the table on a page with fewer rows than the page size', async () => {
      const harness = await createFixture({ rows: createRows(5), pageSize: 3 });
      const fullPageHeight = harness.height;

      await harness.goToNextPage();

      expect(harness.names).toEqual(['Row 4', 'Row 5']);
      expect(harness.height).toBe(fullPageHeight);
    });

    it('should keep the height of the table on a partial page when compact', async () => {
      const harness = await createFixture({ rows: createRows(5), pageSize: 4, compact: true });
      const fullPageHeight = harness.height;

      await harness.goToNextPage();

      expect(harness.names).toEqual(['Row 5']);
      expect(harness.height).toBe(fullPageHeight);
    });

    it('should pad a single page that has fewer rows than the page size', async () => {
      const harness = await createFixture({ rows: createRows(2), pageSize: 5 });
      const fullPage = await createFixture({ rows: createRows(5), pageSize: 5 });

      expect(harness.height).toBe(fullPage.height);
    });

    it('should not render padding on a full page', async () => {
      const harness = await createFixture();

      expect(harness.filler).toBeNull();
    });

    it('should not render padding when paginate is false', async () => {
      const harness = await createFixture({ paginate: false, rows: createRows(1) });

      expect(harness.filler).toBeNull();
    });

    it('should hide the padding from assistive technology', async () => {
      const harness = await createFixture({ rows: createRows(1) });

      expect(harness.filler?.getAttribute('aria-hidden')).toBe('true');
    });

    it('should remove the padding when paginate is turned off', async () => {
      const harness = await createFixture({ rows: createRows(1) });
      expect(harness.filler).not.toBeNull();

      harness.element.paginate = false;
      await settle(harness.element);

      expect(harness.filler).toBeNull();
    });
  });

  it('should show every row again when paginate is turned off', async () => {
    const harness = await createFixture();

    harness.element.paginate = false;
    await settle(harness.element);

    expect(harness.names).toHaveLength(5);
  });

  it('should paginate when set through the config object', async () => {
    const harness = await createFixture({ paginate: false });

    harness.element.config = { paginate: true };
    await settle(harness.element);

    expect(harness.element.config.paginate).toBe(true);
    expect(harness.names).toEqual(['Row 1', 'Row 2']);
  });
});
