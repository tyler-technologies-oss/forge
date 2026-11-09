import { afterEach, describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../../testing/fixture.js';
import type { ToolCall } from '../../types/index.js';
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
});
