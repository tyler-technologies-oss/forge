import { DataSource } from '@tylertech/forge-core';
import { html } from 'lit';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-lit';
import '../data-table/data-table.js';
import type { ColumnDef, DataTableElement } from '../data-table/data-table.js';
import './tool-panel.js';
import type { ToolPanelElement } from './tool-panel.js';

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
  toolPanel: ToolPanelElement;
  table: DataTableElement<TestData>;
}

async function createFixture(options: { tableId?: string } = {}): Promise<Fixture> {
  const { tableId } = options;
  const screen = await render(html`
    <forge-data-table-tool-panel table=${tableId ?? ''}></forge-data-table-tool-panel>
    <forge-data-table id="people" .columns=${TEST_COLUMNS} .dataSource=${new DataSource<TestData>(() => TEST_DATA)}></forge-data-table>
  `);
  const toolPanel = screen.container.querySelector('forge-data-table-tool-panel') as ToolPanelElement;
  const table = screen.container.querySelector('forge-data-table') as DataTableElement<TestData>;
  await table.updateComplete;
  await toolPanel.updateComplete;
  return { toolPanel, table };
}

function getButtons(toolPanel: ToolPanelElement): HTMLElement[] {
  return Array.from(toolPanel.shadowRoot?.querySelectorAll<HTMLElement>('forge-icon-button') ?? []);
}

describe('ToolPanelElement', () => {
  it('should render a card', async () => {
    const { toolPanel } = await createFixture();

    expect(toolPanel.shadowRoot?.querySelector('forge-card')).toBeTruthy();
  });

  it('should render a columns button and a filters button inside the card', async () => {
    const { toolPanel } = await createFixture();

    const buttons = getButtons(toolPanel);
    const tooltips = Array.from(toolPanel.shadowRoot?.querySelectorAll('forge-tooltip') ?? []).map(tooltip => tooltip.textContent?.trim());

    expect(buttons.length).toBe(2);
    expect(buttons.every(button => button.closest('forge-card'))).toBe(true);
    expect(tooltips).toEqual(['Columns', 'Filters']);
    expect(buttons.map(button => button.querySelector('forge-icon')?.name)).toEqual(['view_column', 'filter_list']);
  });

  it('should align the buttons vertically', async () => {
    const { toolPanel } = await createFixture();

    const [columns, filters] = getButtons(toolPanel).map(button => button.getBoundingClientRect());

    expect(columns.left).toBe(filters.left);
    expect(columns.bottom).toBeLessThanOrEqual(filters.top);
  });

  describe('table association', () => {
    it('should connect to the data table with the id given by table', async () => {
      const { toolPanel, table } = await createFixture({ tableId: 'people' });

      expect(toolPanel.tableElement).toBe(table);
    });

    it('should not connect to a table when no element has the id', async () => {
      const { toolPanel } = await createFixture({ tableId: 'missing' });

      expect(toolPanel.tableElement).toBeNull();
    });

    it('should connect to the data table assigned to tableElement', async () => {
      const { toolPanel, table } = await createFixture();

      toolPanel.tableElement = table;
      await toolPanel.updateComplete;

      expect(toolPanel.tableElement).toBe(table);
    });

    it('should keep an assigned tableElement when table is set at the same time', async () => {
      const { toolPanel, table } = await createFixture();

      toolPanel.table = 'missing';
      toolPanel.tableElement = table;
      await toolPanel.updateComplete;

      expect(toolPanel.tableElement).toBe(table);
    });
  });

  it('should be accessible', async () => {
    const { toolPanel } = await createFixture();

    await expect(toolPanel).toBeAccessible();
  });
});
