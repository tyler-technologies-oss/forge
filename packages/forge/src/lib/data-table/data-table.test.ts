import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import type { VisibilityState } from '@tanstack/lit-table';
import type { DataTableElement } from './data-table.js';

import './data-table.js';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
    }
  }
}

// TanStack Table Core uses process.env.NODE_ENV for development-mode debug logging.
// Vitest browser mode doesn't provide process.env by default, so we polyfill it here.
if (!globalThis.process) {
  globalThis.process = { env: { NODE_ENV: 'production' } } as NodeJS.Process;
}

describe('Data Table', () => {
  it('should contain shadow root', async () => {
    const screen = render(html`<forge-data-table></forge-data-table>`);
    const el = screen.container.querySelector('forge-data-table') as DataTableElement;

    await el.updateComplete;

    expect(el.shadowRoot).toBeTruthy();
    expect(el.shadowRoot?.childNodes.length).toBeGreaterThan(0);
  });

  it('should render virtualized rows when virtualized property is set', async () => {
    const testData = Array(100)
      .fill(0)
      .map((_, i) => ({ id: i, name: `Item ${i}` }));
    const testColumns = [
      { header: 'ID', property: 'id' },
      { header: 'Name', property: 'name' }
    ];

    const screen = render(html`
      <forge-data-table .data=${testData} .columns=${testColumns} ?virtualized=${true} style="display: block; height: 400px;"> </forge-data-table>
    `);
    const el = screen.container.querySelector('forge-data-table') as DataTableElement;

    expect(el.virtualized).toBe(true);

    await el.updateComplete;

    const tableContainer = el.shadowRoot?.querySelector('.table-container') as HTMLElement;
    expect(tableContainer).toBeTruthy();

    await new Promise(resolve => setTimeout(resolve, 100));
    await el.updateComplete;

    const tbody = el.shadowRoot?.querySelector('tbody');
    expect(tbody?.classList.contains('virtualized-tbody')).toBe(true);

    const rows = tbody?.querySelectorAll('tr[data-index]');
    expect(rows).toBeTruthy();
    expect(rows!.length).toBeGreaterThan(0);
    expect(rows!.length).toBeLessThanOrEqual(testData.length);
  });

  it('should hide columns that are flagged as hidden by default', async () => {
    const screen = render(html`
      <forge-data-table
        .data=${[{ id: 1, name: 'Alice' }]}
        .columns=${[
          { header: 'ID', property: 'id' },
          { header: 'Name', property: 'name', hidden: true }
        ]}>
      </forge-data-table>
    `);
    const el = screen.container.querySelector('forge-data-table') as DataTableElement;

    await el.updateComplete;

    const headerCells = Array.from(el.shadowRoot?.querySelectorAll('thead th') ?? []).map(cell => cell.textContent?.trim());

    expect(headerCells).not.toContain('Name');

    const firstRow = el.shadowRoot?.querySelector('tbody tr');
    const bodyCells = Array.from(firstRow?.querySelectorAll('td') ?? []);
    expect(bodyCells.length).toBe(1);
  });

  it('should emit column visibility events when using hide/show APIs', async () => {
    const screen = render(html`
      <forge-data-table
        .data=${[{ id: 1, name: 'Alice' }]}
        .columns=${[
          { header: 'ID', property: 'id' },
          { header: 'Name', property: 'name' }
        ]}>
      </forge-data-table>
    `);
    const el = screen.container.querySelector('forge-data-table') as DataTableElement;

    await el.updateComplete;

    const events: VisibilityState[] = [];
    el.addEventListener('forge-data-table-column-visibility', (evt: Event) => events.push((evt as CustomEvent<VisibilityState>).detail));

    el.hideColumn('name');
    await el.updateComplete;

    expect(events.length).toBe(1);
    expect(events[0].name).toBe(false);

    let headerCells = Array.from(el.shadowRoot?.querySelectorAll('thead th') ?? []).map(cell => cell.textContent?.trim());
    expect(headerCells).not.toContain('Name');

    el.showColumn('name');
    await el.updateComplete;

    expect(events.length).toBe(2);
    expect(events[1].name).toBe(true);

    headerCells = Array.from(el.shadowRoot?.querySelectorAll('thead th') ?? []).map(cell => cell.textContent?.trim());
    expect(headerCells).toContain('Name');
  });

  it('should not hide columns that are marked as non-hideable', async () => {
    const screen = render(html`
      <forge-data-table
        .data=${[{ id: 1, name: 'Alice' }]}
        .columns=${[
          { header: 'ID', property: 'id', hideable: false },
          { header: 'Name', property: 'name' }
        ]}>
      </forge-data-table>
    `);
    const el = screen.container.querySelector('forge-data-table') as DataTableElement;

    await el.updateComplete;

    const events: VisibilityState[] = [];
    el.addEventListener('forge-data-table-column-visibility', (evt: Event) => events.push((evt as CustomEvent<VisibilityState>).detail));

    el.hideColumn('id');
    await el.updateComplete;

    expect(events.length).toBe(0);

    const headerCells = Array.from(el.shadowRoot?.querySelectorAll('thead th') ?? []).map(cell => cell.textContent?.trim());
    expect(headerCells).toContain('ID');
  });

  it('should not open column visibility menu when header is clicked', async () => {
    const screen = render(html`
      <forge-data-table
        .data=${[{ id: 1, name: 'Alice' }]}
        .columns=${[
          { header: 'ID', property: 'id', hideable: false },
          { header: 'Name', property: 'name' }
        ]}>
      </forge-data-table>
    `);
    const el = screen.container.querySelector('forge-data-table') as DataTableElement;

    await el.updateComplete;

    const headerCell = el.shadowRoot?.querySelector('thead th[data-column-id="name"]') as HTMLElement;
    headerCell.click();

    await el.updateComplete;

    const popover = el.shadowRoot?.querySelector('#column-visibility-popover') as any;
    expect(popover).toBeTruthy();
    expect(popover.open).toBe(false);
  });

  it('should open column visibility menu when header is right-clicked', async () => {
    const screen = render(html`
      <forge-data-table
        .data=${[{ id: 1, name: 'Alice' }]}
        .columns=${[
          { header: 'ID', property: 'id', hideable: false },
          { header: 'Name', property: 'name' }
        ]}>
      </forge-data-table>
    `);
    const el = screen.container.querySelector('forge-data-table') as DataTableElement;

    await el.updateComplete;

    const headerCell = el.shadowRoot?.querySelector('thead th[data-column-id="name"]') as HTMLElement;
    headerCell.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, cancelable: true }));

    await el.updateComplete;

    const popover = el.shadowRoot?.querySelector('#column-visibility-popover') as any;
    expect(popover).toBeTruthy();
    expect(popover.open).toBe(true);

    const listItems = popover.querySelectorAll('forge-list-item');
    expect(listItems.length).toBe(1);
    expect(listItems[0].getAttribute('value')).toBe('name');
  });

  it('should toggle column visibility from the context menu', async () => {
    const screen = render(html`
      <forge-data-table
        .data=${[{ id: 1, name: 'Alice' }]}
        .columns=${[
          { header: 'ID', property: 'id' },
          { header: 'Name', property: 'name' }
        ]}>
      </forge-data-table>
    `);
    const el = screen.container.querySelector('forge-data-table') as DataTableElement;

    await el.updateComplete;

    const headerCell = el.shadowRoot?.querySelector('thead th[data-column-id="name"]') as HTMLElement;
    headerCell.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, cancelable: true }));

    await el.updateComplete;

    const popover = el.shadowRoot?.querySelector('#column-visibility-popover') as HTMLElement;
    const listItem = popover.querySelector('forge-list-item[value="name"]') as HTMLElement;
    listItem.click();

    await el.updateComplete;

    expect(el.columnVisibility.name).toBe(false);

    listItem.click();
    await el.updateComplete;

    expect(el.columnVisibility.name).toBe(true);
  });
});
