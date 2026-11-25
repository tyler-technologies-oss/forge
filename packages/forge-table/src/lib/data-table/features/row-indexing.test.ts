import { DataSource } from '@tylertech/forge-core';
import { html } from 'lit';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import '../data-table.js';
import type { ColumnDef, DataTableElement } from '../data-table.js';

interface TestRow {
  id: number;
  name: string;
}

const ROW_HEIGHT = 48;
const CONTAINER_HEIGHT = 300;
const SCROLLED_ROW_COUNT = 50;

const createRows = (count: number): TestRow[] => Array.from({ length: count }, (_, i) => ({ id: i + 1, name: `Row ${i + 1}` }));

const COLUMNS: ColumnDef<TestRow>[] = [
  { id: 'id', header: 'ID', property: 'id' },
  { id: 'name', header: 'Name', property: 'name' }
];

const COLUMNS_WITH_FOOTER: ColumnDef<TestRow>[] = [
  { id: 'id', header: 'ID', property: 'id', footer: 'Total' },
  { id: 'name', header: 'Name', property: 'name' }
];

async function settle(element: DataTableElement<TestRow>): Promise<void> {
  await element.updateComplete;
  await new Promise(resolve => setTimeout(resolve));
  await element.updateComplete;
}

interface FixtureOptions {
  rows?: TestRow[];
  columns?: ColumnDef<TestRow>[];
  virtualized?: boolean;
  paginate?: boolean;
  pageSize?: number;
  cellSelection?: boolean;
}

class RowIndexingHarness {
  constructor(
    public readonly element: DataTableElement<TestRow>,
    private readonly _internals: () => ElementInternals | undefined
  ) {}

  public get ariaRowCount(): string | null | undefined {
    return this._internals()?.ariaRowCount;
  }

  public get tableContainer(): HTMLElement {
    return this.element.shadowRoot?.querySelector('.table-container') as HTMLElement;
  }

  public get headerRowIndexes(): (string | null)[] {
    return Array.from(this.element.shadowRoot?.querySelectorAll('thead tr') ?? [], row => row.getAttribute('aria-rowindex'));
  }

  public get bodyRows(): HTMLTableRowElement[] {
    return Array.from(this.element.shadowRoot?.querySelectorAll('tbody:not(.empty-tbody):not(.page-filler-tbody) tr') ?? []);
  }

  public get bodyRowIndexes(): (string | null)[] {
    return this.bodyRows.map(row => row.getAttribute('aria-rowindex'));
  }

  public get footerRowIndexes(): (string | null)[] {
    return Array.from(this.element.shadowRoot?.querySelectorAll('tfoot tr') ?? [], row => row.getAttribute('aria-rowindex'));
  }

  public getBodyRowByDataIndex(dataIndex: number): HTMLTableRowElement | null {
    return this.element.shadowRoot?.querySelector(`tbody tr[data-index="${dataIndex}"]`) ?? null;
  }

  public async scrollToRow(rowPosition: number): Promise<void> {
    this.tableContainer.scrollTop = rowPosition * ROW_HEIGHT;
    await vi.waitFor(() => expect(this.getBodyRowByDataIndex(rowPosition)).not.toBeNull());
  }

  public async goToNextPage(): Promise<void> {
    const paginator = this.element.querySelector('forge-paginator') as HTMLElement & { goToNextPage(): void };
    paginator.goToNextPage();
    await settle(this.element);
  }
}

let capturedInternals: ElementInternals | undefined;

async function createFixture({
  rows = createRows(100),
  columns = COLUMNS,
  virtualized = false,
  paginate = false,
  pageSize = 2,
  cellSelection = false
}: FixtureOptions = {}): Promise<RowIndexingHarness> {
  const screen = render(html`
    <forge-data-table
      .dataSource=${new DataSource<TestRow>(() => rows)}
      .columns=${columns}
      .virtualized=${virtualized}
      .paginate=${paginate}
      .cellSelection=${cellSelection}>
      ${paginate ? html`<forge-paginator slot="paginator" page-size=${pageSize}></forge-paginator>` : null}
    </forge-data-table>
  `);
  const element = screen.container.querySelector('forge-data-table') as DataTableElement<TestRow>;
  await settle(element);
  if (virtualized) {
    (element.shadowRoot?.querySelector('.table-container') as HTMLElement).style.height = `${CONTAINER_HEIGHT}px`;
    await settle(element);
  }
  return new RowIndexingHarness(element, () => capturedInternals);
}

describe('DataTable row indexing', () => {
  beforeEach(() => {
    capturedInternals = undefined;
    const attachInternals = HTMLElement.prototype.attachInternals;
    vi.spyOn(HTMLElement.prototype, 'attachInternals').mockImplementation(function (this: HTMLElement) {
      const internals = attachInternals.call(this);
      if (this.localName === 'forge-data-table') {
        capturedInternals = internals;
      }
      return internals;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should not set aria-rowcount or aria-rowindex when every row is rendered', async () => {
    const harness = await createFixture({ rows: createRows(5) });

    expect(harness.ariaRowCount).toBeNull();
    expect(harness.headerRowIndexes).toEqual([null]);
    expect(harness.bodyRowIndexes.every(index => index === null)).toBe(true);
  });

  describe('virtualized', () => {
    it('should set aria-rowcount to the header rows plus every row of the data', async () => {
      const harness = await createFixture({ virtualized: true });

      expect(harness.ariaRowCount).toBe('101');
    });

    it('should number the header row first and the rendered rows after it', async () => {
      const harness = await createFixture({ virtualized: true });

      expect(harness.headerRowIndexes).toEqual(['1']);
      expect(harness.bodyRowIndexes.slice(0, 3)).toEqual(['2', '3', '4']);
    });

    it('should number rows by their position in the whole table after scrolling', async () => {
      const harness = await createFixture({ virtualized: true });

      await harness.scrollToRow(SCROLLED_ROW_COUNT);

      const row = harness.getBodyRowByDataIndex(SCROLLED_ROW_COUNT) as HTMLTableRowElement;
      expect(row.getAttribute('aria-rowindex')).toBe(`${SCROLLED_ROW_COUNT + 2}`);
    });

    it('should count and number the footer row after the last body row', async () => {
      const harness = await createFixture({ virtualized: true, columns: COLUMNS_WITH_FOOTER });

      expect(harness.ariaRowCount).toBe('102');
      expect(harness.footerRowIndexes).toEqual(['102']);
    });

    it('should not set aria-rowcount when there are no rows', async () => {
      const harness = await createFixture({ virtualized: true, rows: [] });

      expect(harness.ariaRowCount).toBeNull();
    });

    it('should update aria-rowcount when the number of rows changes', async () => {
      const harness = await createFixture({ virtualized: true });

      harness.element.dataSource = new DataSource<TestRow>(() => createRows(20));
      await settle(harness.element);

      expect(harness.ariaRowCount).toBe('21');
    });

    it('should remove aria-rowcount and aria-rowindex when virtualized is turned off', async () => {
      const harness = await createFixture({ virtualized: true, rows: createRows(5) });

      harness.element.virtualized = false;
      await settle(harness.element);

      expect(harness.ariaRowCount).toBeNull();
      expect(harness.bodyRowIndexes.every(index => index === null)).toBe(true);
    });

    it('should keep the row that has focus rendered when it is scrolled out of view', async () => {
      const harness = await createFixture({ virtualized: true, cellSelection: true });
      const cell = harness.getBodyRowByDataIndex(0)?.querySelector('td[tabindex="0"]') as HTMLElement;
      cell.focus();
      await settle(harness.element);

      await harness.scrollToRow(SCROLLED_ROW_COUNT);

      const focusedRow = harness.getBodyRowByDataIndex(0);
      expect(focusedRow).not.toBeNull();
      expect(focusedRow?.contains(harness.element.shadowRoot?.activeElement ?? null)).toBe(true);
    });

    it('should stop rendering a row that is scrolled out of view when it does not have focus', async () => {
      const harness = await createFixture({ virtualized: true, cellSelection: true });

      await harness.scrollToRow(SCROLLED_ROW_COUNT);

      expect(harness.getBodyRowByDataIndex(0)).toBeNull();
    });
  });

  describe('paginated', () => {
    it('should set aria-rowcount to the header rows plus the rows of every page', async () => {
      const harness = await createFixture({ paginate: true, rows: createRows(5) });

      expect(harness.ariaRowCount).toBe('6');
    });

    it('should number the rows of the first page after the header row', async () => {
      const harness = await createFixture({ paginate: true, rows: createRows(5) });

      expect(harness.headerRowIndexes).toEqual(['1']);
      expect(harness.bodyRowIndexes).toEqual(['2', '3']);
    });

    it('should continue numbering on the next page', async () => {
      const harness = await createFixture({ paginate: true, rows: createRows(5) });

      await harness.goToNextPage();

      expect(harness.bodyRowIndexes).toEqual(['4', '5']);
    });

    it('should number a last page that has fewer rows than the page size', async () => {
      const harness = await createFixture({ paginate: true, rows: createRows(5) });

      await harness.goToNextPage();
      await harness.goToNextPage();

      expect(harness.bodyRowIndexes).toEqual(['6']);
    });

    it('should number the footer row after the rows of the last page', async () => {
      const harness = await createFixture({ paginate: true, rows: createRows(5), columns: COLUMNS_WITH_FOOTER });

      expect(harness.ariaRowCount).toBe('7');
      expect(harness.footerRowIndexes).toEqual(['7']);
    });
  });
});
