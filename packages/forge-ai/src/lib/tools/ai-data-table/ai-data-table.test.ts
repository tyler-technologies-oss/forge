import { afterEach, describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../../testing/fixture.js';
import type { ToolCall } from '../../types/index.js';
import { userEvent } from 'vitest/browser';
import type { AiPaginator } from '../ai-paginator/ai-paginator.js';
import type { DataTableToolElement } from './ai-data-table.js';

import './ai-data-table.js';

function createToolCall(args: Record<string, unknown>): ToolCall {
  return { id: 'tc-1', messageId: 'msg-1', name: 'displayDataTable', args, status: 'complete', type: 'client' };
}

function createRows(count: number): string[][] {
  return Array.from({ length: count }, (_, i) => [`row-${i + 1}`]);
}

async function renderTable(args: Record<string, unknown>): Promise<DataTableToolElement> {
  return renderFixture<DataTableToolElement>(
    html`<forge-ai-tool-data-table .toolCall=${createToolCall(args)}></forge-ai-tool-data-table>`,
    'forge-ai-tool-data-table'
  );
}

describe('DataTableToolElement', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should advance rows when the paginator fires its page-change event', async () => {
    const el = await renderTable({ headers: ['Name'], rows: createRows(12), maxNumberOfRows: 5 });
    const firstCells = (): string[] => Array.from(el.shadowRoot!.querySelectorAll('tbody td'), td => td.textContent!.trim());
    expect(firstCells()).toEqual(['row-1', 'row-2', 'row-3', 'row-4', 'row-5']);

    const paginator = el.shadowRoot!.querySelector<AiPaginator>('forge-ai-paginator')!;
    paginator.shadowRoot!.querySelector<HTMLButtonElement>('#next-btn')!.click();
    await el.updateComplete;

    expect(firstCells()).toEqual(['row-6', 'row-7', 'row-8', 'row-9', 'row-10']);
  });

  it('should fall back to a neutral CSV filename when the table has no title', async () => {
    const el = await renderTable({ headers: ['Name'], rows: createRows(2) });
    const downloads: string[] = [];
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
      downloads.push(this.download);
    });

    el.shadowRoot!.querySelector<HTMLButtonElement>('#export-button')!.click();

    expect(downloads).toEqual(['data-table.csv']);
  });

  const cellsOf = (el: DataTableToolElement): string[] => Array.from(el.shadowRoot!.querySelectorAll('tbody td'), td => td.textContent!.trim());
  const filterOf = (el: DataTableToolElement): HTMLInputElement | null => el.shadowRoot!.querySelector<HTMLInputElement>('#data-table-filter-input');
  const paginatorOf = (el: DataTableToolElement): AiPaginator | null => el.shadowRoot!.querySelector<AiPaginator>('forge-ai-paginator');
  const exportOf = (el: DataTableToolElement): HTMLButtonElement | null => el.shadowRoot!.querySelector<HTMLButtonElement>('#export-button');

  async function typeFilter(el: DataTableToolElement, value: string): Promise<void> {
    const input = filterOf(el)!;
    input.value = value;
    input.dispatchEvent(new InputEvent('input', { bubbles: true }));
    await el.updateComplete;
  }

  it('should register the custom element and render a shadow root', async () => {
    const el = await renderTable({ headers: ['Name'], rows: createRows(1) });

    expect(customElements.get('forge-ai-tool-data-table')).toBeDefined();
    expect(el.shadowRoot).toBeTruthy();
  });

  describe('missing data', () => {
    it.each([
      ['no headers', { rows: [['a']] }],
      ['no rows', { headers: ['A'] }],
      ['empty args', {}]
    ])('should show a fallback message when the tool call has %s', async (_name, args) => {
      const el = await renderTable(args);

      expect(el.shadowRoot!.querySelector('forge-ai-artifact p')!.textContent).toBe('No table data available');
      expect(el.shadowRoot!.querySelector('table')).toBeNull();
    });

    it('should show a fallback message when args is null', async () => {
      const el = await renderFixture<DataTableToolElement>(
        html`<forge-ai-tool-data-table .toolCall=${{ ...createToolCall({}), args: null }}></forge-ai-tool-data-table>`,
        'forge-ai-tool-data-table'
      );

      expect(el.shadowRoot!.querySelector('forge-ai-artifact p')!.textContent).toBe('No table data available');
    });
  });

  describe('table rendering', () => {
    it('should render headers and rows', async () => {
      const el = await renderTable({
        headers: ['Name', 'Age'],
        rows: [
          ['Ann', 30],
          ['Bob', 25]
        ]
      });

      expect(Array.from(el.shadowRoot!.querySelectorAll('th'), th => th.textContent!.trim())).toEqual(['Name', 'Age']);
      expect(cellsOf(el)).toEqual(['Ann', '30', 'Bob', '25']);
    });

    it('should render a title heading and use it as the table label', async () => {
      const el = await renderTable({ title: 'Sales', headers: ['A'], rows: createRows(1) });

      expect(el.shadowRoot!.querySelector('h2.title')!.textContent).toBe('Sales');
      expect(el.shadowRoot!.querySelector('table')!.getAttribute('aria-label')).toBe('Sales');
      expect(el.shadowRoot!.querySelector('[data-scroll-region="table"]')!.getAttribute('aria-label')).toBe('Tabular data: Sales');
    });

    it('should use default labels and no heading when there is no title', async () => {
      const el = await renderTable({ headers: ['A'], rows: createRows(1) });

      expect(el.shadowRoot!.querySelector('h2')).toBeNull();
      expect(el.shadowRoot!.querySelector('table')!.getAttribute('aria-label')).toBe('Data table');
      expect(el.shadowRoot!.querySelector('[data-scroll-region="table"]')!.getAttribute('aria-label')).toBe('Tabular data: Table');
    });

    it('should make the scroll region keyboard focusable', async () => {
      const el = await renderTable({ headers: ['A'], rows: createRows(1) });

      const region = el.shadowRoot!.querySelector('[data-scroll-region="table"]')!;
      expect(region.getAttribute('role')).toBe('group');
      expect(region.getAttribute('tabindex')).toBe('0');
    });

    it('should render inline markdown in cells and sanitize unsafe markup', async () => {
      const el = await renderTable({ headers: ['A'], rows: [['**bold**'], ['<script>window.__xss = 1</script>safe']] });

      expect(el.shadowRoot!.querySelector('tbody td strong')!.textContent).toBe('bold');
      expect(el.shadowRoot!.querySelector('tbody script')).toBeNull();
    });

    it('should render an empty body for zero rows', async () => {
      const el = await renderTable({ headers: ['A'], rows: [] });

      expect(el.shadowRoot!.querySelectorAll('tbody tr')).toHaveLength(0);
      expect(el.shadowRoot!.querySelector('th')).toBeTruthy();
    });

    it('should update when the tool call changes', async () => {
      const el = await renderTable({ headers: ['A'], rows: [['one']] });

      el.toolCall = createToolCall({ headers: ['A'], rows: [['two']] }) as unknown as typeof el.toolCall;
      await el.updateComplete;

      expect(cellsOf(el)).toEqual(['two']);
    });
  });

  describe('filter', () => {
    it('should hide the filter when there are 5 or fewer rows', async () => {
      const el = await renderTable({ headers: ['A'], rows: createRows(5) });

      expect(filterOf(el)).toBeNull();
    });

    it('should show a labelled filter when there are more than 5 rows', async () => {
      const el = await renderTable({ headers: ['A'], rows: createRows(6) });

      expect(filterOf(el)).toBeTruthy();
      expect(el.shadowRoot!.querySelector('label[for="data-table-filter-input"]')!.textContent).toBe('Filter table data');
    });

    it('should filter rows case-insensitively across all cells', async () => {
      const el = await renderTable({
        headers: ['A', 'B'],
        rows: [...createRows(6).map(r => [r[0], 'x']), ['needle', 'Haystack']]
      });

      await typeFilter(el, 'HAYSTACK');

      expect(cellsOf(el)).toEqual(['needle', 'Haystack']);
    });

    it('should filter using real typing', async () => {
      const el = await renderTable({ headers: ['A'], rows: createRows(12) });

      await userEvent.type(filterOf(el)!, 'row-12');
      await el.updateComplete;

      expect(cellsOf(el)).toEqual(['row-12']);
    });

    it('should show everything again when the filter is whitespace', async () => {
      const el = await renderTable({ headers: ['A'], rows: createRows(7) });

      await typeFilter(el, '   ');

      expect(cellsOf(el)).toHaveLength(7);
    });

    it('should show an empty state with the query when nothing matches', async () => {
      const el = await renderTable({ headers: ['A'], rows: createRows(7) });

      await typeFilter(el, 'zzz');

      expect(el.shadowRoot!.querySelector('forge-ai-empty-state')).toBeTruthy();
      expect(el.shadowRoot!.querySelector('h3[slot="heading"]')!.textContent).toBe('No results found');
      expect(el.shadowRoot!.querySelector('p[slot="body"]')!.textContent).toContain('"zzz"');
      expect(el.shadowRoot!.querySelector('table')).toBeNull();
    });

    it('should return to the table when the filter is cleared', async () => {
      const el = await renderTable({ headers: ['A'], rows: createRows(7) });
      await typeFilter(el, 'zzz');

      await typeFilter(el, '');

      expect(el.shadowRoot!.querySelector('forge-ai-empty-state')).toBeNull();
      expect(cellsOf(el)).toHaveLength(7);
    });

    it('should reset to the first page when the filter changes', async () => {
      const el = await renderTable({ headers: ['A'], rows: createRows(30), maxNumberOfRows: 5 });
      paginatorOf(el)!.shadowRoot!.querySelector<HTMLButtonElement>('#next-btn')!.click();
      await el.updateComplete;
      expect(paginatorOf(el)!.currentPage).toBe(2);

      await typeFilter(el, 'row-1');

      expect(paginatorOf(el)!.currentPage).toBe(1);
    });
  });

  describe('pagination', () => {
    it('should default to 10 rows per page', async () => {
      const el = await renderTable({ headers: ['A'], rows: createRows(25) });

      expect(cellsOf(el)).toHaveLength(10);
      expect(paginatorOf(el)!.totalPages).toBe(3);
    });

    it('should not show a paginator when rows fit on one page', async () => {
      const el = await renderTable({ headers: ['A'], rows: createRows(10) });

      expect(paginatorOf(el)).toBeNull();
    });

    it('should honor maxNumberOfRows for the page size and total pages', async () => {
      const el = await renderTable({ headers: ['A'], rows: createRows(12), maxNumberOfRows: 5 });

      expect(paginatorOf(el)!.totalPages).toBe(3);
      expect(paginatorOf(el)!.currentPage).toBe(1);
    });

    it('should show the last partial page', async () => {
      const el = await renderTable({ headers: ['A'], rows: createRows(12), maxNumberOfRows: 5 });
      const next = paginatorOf(el)!.shadowRoot!.querySelector<HTMLButtonElement>('#next-btn')!;

      next.click();
      await el.updateComplete;
      next.click();
      await el.updateComplete;

      expect(cellsOf(el)).toEqual(['row-11', 'row-12']);
    });

    it('should paginate the filtered rows', async () => {
      const el = await renderTable({ headers: ['A'], rows: createRows(30), maxNumberOfRows: 5 });

      await typeFilter(el, 'row-2');

      expect(paginatorOf(el)!.totalPages).toBe(3);
    });

    it('should hide the paginator when the filter leaves one page of rows', async () => {
      const el = await renderTable({ headers: ['A'], rows: createRows(30), maxNumberOfRows: 5 });

      await typeFilter(el, 'row-30');

      expect(paginatorOf(el)).toBeNull();
      expect(cellsOf(el)).toEqual(['row-30']);
    });
  });

  describe('export', () => {
    it('should show the export button with an accessible label when there is data', async () => {
      const el = await renderTable({ headers: ['A'], rows: createRows(2) });

      expect(exportOf(el)!.getAttribute('aria-label')).toBe('Download table as CSV');
      expect(el.shadowRoot!.querySelector('forge-ai-tooltip[for="export-button"]')!.textContent).toBe('Download CSV');
    });

    it('should hide the export button and actions when there are no rows and no filter', async () => {
      const el = await renderTable({ headers: ['A'], rows: [] });

      expect(exportOf(el)).toBeNull();
      expect(el.shadowRoot!.querySelector('.actions')).toBeNull();
    });

    it('should hide the export button when there are no headers', async () => {
      const el = await renderTable({ headers: [], rows: createRows(2) });

      expect(exportOf(el)).toBeNull();
    });

    it('should export all rows with the sanitized title as the filename', async () => {
      const el = await renderTable({
        title: 'Q1 Sales Report',
        headers: ['Name', 'Value'],
        rows: [
          ['a,b', 1],
          ['=x', 2]
        ]
      });
      const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
      const createUrl = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:x');
      vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});

      exportOf(el)!.click();

      expect(click).toHaveBeenCalledOnce();
      expect(await (createUrl.mock.calls[0][0] as Blob).text()).toBe('Name,Value\r\n"a,b",1\r\n\'=x,2');
    });

    it('should export unfiltered, unpaginated data', async () => {
      const el = await renderTable({ headers: ['A'], rows: createRows(30), maxNumberOfRows: 5 });
      await typeFilter(el, 'row-1');
      vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
      const createUrl = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:x');
      vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});

      exportOf(el)!.click();

      const csv = await (createUrl.mock.calls[0][0] as Blob).text();
      expect(csv.split('\r\n')).toHaveLength(31);
    });

    it('should use the sanitized title for the download filename', async () => {
      const el = await renderTable({ title: 'My Table!', headers: ['A'], rows: createRows(1) });
      const downloads: string[] = [];
      vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
        downloads.push(this.download);
      });

      exportOf(el)!.click();

      expect(downloads).toEqual(['My-Table.csv']);
    });
  });
});
