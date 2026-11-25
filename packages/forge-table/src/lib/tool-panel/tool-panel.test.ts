import { DataSource } from '@tylertech/forge-core';
import type { TabComponent, TreeItemComponent } from '@tylertech/forge';
import { html } from 'lit';
import { describe, expect, it } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-lit';
import '../data-table/data-table.js';
import type { ColumnDef, DataTableElement } from '../data-table/data-table.js';
import './tool-panel.js';
import type { ToolPanelElement } from './tool-panel.js';

interface TestData {
  id: number;
  name: string;
  email: string;
  city: string;
}

const TEST_DATA: TestData[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', city: 'Austin' },
  { id: 2, name: 'Bob', email: 'bob@example.com', city: 'Boston' }
];

const TEST_COLUMNS: ColumnDef<TestData>[] = [
  { id: 'id', header: 'ID', property: 'id' },
  { id: 'name', header: 'Name', property: 'name' }
];

const GROUPED_COLUMNS: ColumnDef<TestData>[] = [
  { id: 'id', header: 'ID', property: 'id' },
  {
    id: 'contact',
    header: 'Contact',
    columns: [
      { id: 'name', header: 'Name', property: 'name' },
      { id: 'email', header: 'Email', property: 'email' }
    ]
  },
  { id: 'city', header: 'City', property: 'city' }
];

interface Fixture {
  toolPanel: ToolPanelElement;
  table: DataTableElement<TestData>;
}

async function createFixture(options: { tableId?: string; columns?: ColumnDef<TestData>[] } = {}): Promise<Fixture> {
  const { tableId, columns = TEST_COLUMNS } = options;
  const screen = await render(html`
    <forge-data-table-tool-panel table=${tableId ?? ''}></forge-data-table-tool-panel>
    <forge-data-table id="people" .columns=${columns} .dataSource=${new DataSource<TestData>(() => TEST_DATA)}></forge-data-table>
  `);
  const toolPanel = screen.container.querySelector('forge-data-table-tool-panel') as ToolPanelElement;
  const table = screen.container.querySelector('forge-data-table') as DataTableElement<TestData>;
  await table.updateComplete;
  await toolPanel.updateComplete;
  return { toolPanel, table };
}

function getTabs(toolPanel: ToolPanelElement): TabComponent[] {
  return Array.from(toolPanel.shadowRoot?.querySelectorAll<TabComponent>('forge-tab') ?? []);
}

function getItems(toolPanel: ToolPanelElement): TreeItemComponent[] {
  return Array.from(toolPanel.shadowRoot?.querySelectorAll<TreeItemComponent>('forge-tree-item') ?? []);
}

function getItem(toolPanel: ToolPanelElement, id: string): TreeItemComponent {
  return getItems(toolPanel).find(item => item.value === id) as TreeItemComponent;
}

function getLabels(toolPanel: ToolPanelElement): string[] {
  return getItems(toolPanel).map(
    item =>
      Array.from(item.childNodes)
        .find(node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim())
        ?.textContent?.trim() ?? ''
  );
}

function getChildIds(parent: Element): string[] {
  return Array.from(parent.children)
    .filter((child): child is TreeItemComponent => child.localName === 'forge-tree-item')
    .map(child => child.value as string);
}

function getHeaderIds(table: DataTableElement<TestData>): string[] {
  const rows = table.shadowRoot?.querySelectorAll('thead tr') ?? [];
  const cells = rows[rows.length - 1]?.querySelectorAll<HTMLElement>('th[data-column-id]') ?? [];
  return Array.from(cells).map(th => th.dataset.columnId as string);
}

async function toggle(toolPanel: ToolPanelElement, item: TreeItemComponent): Promise<void> {
  item.shadowRoot?.querySelector<HTMLElement>('.header')?.click();
  await toolPanel.updateComplete;
  await item.updateComplete;
}

async function moveWithKeyboard(toolPanel: ToolPanelElement, item: TreeItemComponent, key: 'ArrowUp' | 'ArrowDown'): Promise<void> {
  item.focus();
  await userEvent.keyboard(`{Alt>}{${key}}{/Alt}`);
  await toolPanel.updateComplete;
}

const frame = (): Promise<void> => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));

describe('ToolPanelElement', () => {
  it('should render a card', async () => {
    const { toolPanel } = await createFixture();

    expect(toolPanel.shadowRoot?.querySelector('forge-card')).toBeTruthy();
  });

  it('should render a vertical tab bar with a columns tab and a filters tab inside the card', async () => {
    const { toolPanel } = await createFixture();

    const tabBar = toolPanel.shadowRoot?.querySelector('forge-tab-bar') as HTMLElement & { vertical: boolean };
    const tabs = getTabs(toolPanel);
    const tooltips = Array.from(toolPanel.shadowRoot?.querySelectorAll('forge-tooltip') ?? []).map(tooltip => tooltip.textContent?.trim());

    expect(tabBar.closest('forge-card')).toBeTruthy();
    expect(tabBar.vertical).toBe(true);
    expect(tabs.map(tab => tab.name)).toEqual(['columns', 'filters']);
    expect(tabs.map(tab => tab.getAttribute('aria-label'))).toEqual(['Columns', 'Filters']);
    expect(tooltips).toEqual(['Columns', 'Filters']);
    expect(tabs.map(tab => tab.querySelector('forge-icon')?.name)).toEqual(['view_column', 'filter_list']);
  });

  it('should stack the tabs vertically', async () => {
    const { toolPanel } = await createFixture();

    const [columns, filters] = getTabs(toolPanel).map(tab => tab.getBoundingClientRect());

    expect(columns.left).toBe(filters.left);
    expect(columns.bottom).toBeLessThanOrEqual(filters.top);
  });

  it('should make the columns tab active at first', async () => {
    const { toolPanel } = await createFixture();

    const [columns, filters] = getTabs(toolPanel);

    expect(columns.active).toBe(true);
    expect(filters.active).toBe(false);
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

  describe('column tree', () => {
    it('should render a tree of the table columns in a tab panel to the left of the tabs', async () => {
      const { toolPanel } = await createFixture({ tableId: 'people' });

      const panel = toolPanel.shadowRoot?.querySelector('forge-tab-panel') as HTMLElement;
      const tree = panel.querySelector('forge-tree') as HTMLElement;
      const [firstTab] = getTabs(toolPanel);

      expect(panel.getAttribute('for')).toBe(firstTab.id);
      expect(getLabels(toolPanel)).toEqual(['ID', 'Name']);
      expect(tree.getBoundingClientRect().right).toBeLessThanOrEqual(firstTab.getBoundingClientRect().left);
    });

    it('should show the tree only while the columns tab is active', async () => {
      const { toolPanel } = await createFixture({ tableId: 'people' });
      const [columns, filters] = getTabs(toolPanel);
      const tree = toolPanel.shadowRoot?.querySelector('forge-tree') as HTMLElement;

      expect(tree.getBoundingClientRect().width).toBeGreaterThan(0);

      filters.click();
      await frame();

      expect(tree.getBoundingClientRect().width).toBe(0);

      columns.click();
      await frame();

      expect(tree.getBoundingClientRect().width).toBeGreaterThan(0);
    });

    it('should not render a tree when no table is connected', async () => {
      const { toolPanel } = await createFixture();

      expect(toolPanel.shadowRoot?.querySelector('forge-tree')).toBeNull();
    });

    it('should nest the columns of a column group under it', async () => {
      const { toolPanel } = await createFixture({ tableId: 'people', columns: GROUPED_COLUMNS });

      const group = getItem(toolPanel, 'contact');

      expect(getLabels(toolPanel)).toEqual(['ID', 'Contact', 'Name', 'Email', 'City']);
      expect(getChildIds(group)).toEqual(['name', 'email']);
      expect(getItem(toolPanel, 'name').level).toBe(group.level + 1);
      expect(getItem(toolPanel, 'id').level).toBe(group.level);
    });

    it('should list the columns of a group without a header at the level of the group', async () => {
      const columns: ColumnDef<TestData>[] = [{ id: 'id', header: 'ID', property: 'id' }, { columns: [{ id: 'name', header: 'Name', property: 'name' }] }];
      const { toolPanel } = await createFixture({ tableId: 'people', columns });

      expect(getItems(toolPanel).map(item => item.level)).toEqual([0, 0]);
    });

    it('should remove the width of the leaf spacer when there are no column groups', async () => {
      const { toolPanel } = await createFixture({ tableId: 'people' });

      const spacer = getItem(toolPanel, 'id').shadowRoot?.querySelector<HTMLElement>('.leaf-spacer') as HTMLElement;

      expect(spacer.getBoundingClientRect().width).toBe(0);
    });

    it('should keep the width of the leaf spacer when there are column groups', async () => {
      const { toolPanel } = await createFixture({ tableId: 'people', columns: GROUPED_COLUMNS });

      const spacer = getItem(toolPanel, 'id').shadowRoot?.querySelector<HTMLElement>('.leaf-spacer') as HTMLElement;

      expect(spacer.getBoundingClientRect().width).toBeGreaterThan(0);
    });

    it('should follow the order of the table columns', async () => {
      const { toolPanel, table } = await createFixture({ tableId: 'people', columns: GROUPED_COLUMNS });

      table.setColumnOrder(['city', 'contact', 'email', 'name', 'id']);
      await toolPanel.updateComplete;

      expect(getItems(toolPanel).map(item => item.value)).toEqual(['city', 'contact', 'email', 'name', 'id']);
    });

    it('should rebuild the tree when the table columns change', async () => {
      const { toolPanel, table } = await createFixture({ tableId: 'people' });

      table.columns = GROUPED_COLUMNS;
      await table.updateComplete;
      await toolPanel.updateComplete;

      expect(getLabels(toolPanel)).toEqual(['ID', 'Contact', 'Name', 'Email', 'City']);
    });

    describe('visibility', () => {
      it('should check the columns that are visible and uncheck the hidden ones', async () => {
        const { toolPanel, table } = await createFixture({ tableId: 'people' });

        table.hideColumn('name');
        await toolPanel.updateComplete;

        expect(getItem(toolPanel, 'id').selected).toBe(true);
        expect(getItem(toolPanel, 'name').selected).toBe(false);

        table.showColumn('name');
        await toolPanel.updateComplete;

        expect(getItem(toolPanel, 'name').selected).toBe(true);
      });

      it('should hide and show a column when its item is unchecked and checked', async () => {
        const { toolPanel, table } = await createFixture({ tableId: 'people' });

        await toggle(toolPanel, getItem(toolPanel, 'name'));
        await table.updateComplete;

        expect(table.columnVisibility['name']).toBe(false);
        expect(getHeaderIds(table)).toEqual(['id']);

        await toggle(toolPanel, getItem(toolPanel, 'name'));
        await table.updateComplete;

        expect(table.columnVisibility['name']).toBe(true);
        expect(getHeaderIds(table)).toEqual(['id', 'name']);
      });

      it('should hide all the columns of a group when the group is unchecked', async () => {
        const { toolPanel, table } = await createFixture({ tableId: 'people', columns: GROUPED_COLUMNS });

        await toggle(toolPanel, getItem(toolPanel, 'contact'));
        await table.updateComplete;

        expect(table.columnVisibility['name']).toBe(false);
        expect(table.columnVisibility['email']).toBe(false);
        expect(table.columnVisibility['id']).not.toBe(false);
        expect(getItem(toolPanel, 'name').selected).toBe(false);
        expect(getItem(toolPanel, 'email').selected).toBe(false);
        expect(getHeaderIds(table)).toEqual(['id', 'city']);
      });

      it('should show all the columns of a group when the group is checked', async () => {
        const { toolPanel, table } = await createFixture({ tableId: 'people', columns: GROUPED_COLUMNS });
        table.hideColumn('contact');
        await toolPanel.updateComplete;

        await toggle(toolPanel, getItem(toolPanel, 'contact'));
        await table.updateComplete;

        expect(table.columnVisibility['name']).toBe(true);
        expect(table.columnVisibility['email']).toBe(true);
        expect(getHeaderIds(table)).toEqual(['id', 'name', 'email', 'city']);
      });

      it('should mark a group indeterminate when only some of its columns are visible', async () => {
        const { toolPanel } = await createFixture({ tableId: 'people', columns: GROUPED_COLUMNS });

        await toggle(toolPanel, getItem(toolPanel, 'email'));

        const group = getItem(toolPanel, 'contact');
        expect(group.indeterminate).toBe(true);
      });

      it('should not hide a column that is not hideable', async () => {
        const columns: ColumnDef<TestData>[] = [{ id: 'id', header: 'ID', property: 'id', hideable: false }, ...TEST_COLUMNS.slice(1)];
        const { toolPanel, table } = await createFixture({ tableId: 'people', columns });

        expect(getItem(toolPanel, 'id').disabled).toBe(true);

        await toggle(toolPanel, getItem(toolPanel, 'id'));

        expect(table.columnVisibility['id']).not.toBe(false);
        expect(getItem(toolPanel, 'id').selected).toBe(true);
      });

      it('should keep a column that is not hideable checked when its group is unchecked', async () => {
        const columns: ColumnDef<TestData>[] = [
          {
            id: 'contact',
            header: 'Contact',
            columns: [
              { id: 'name', header: 'Name', property: 'name', hideable: false },
              { id: 'email', header: 'Email', property: 'email' }
            ]
          }
        ];
        const { toolPanel, table } = await createFixture({ tableId: 'people', columns });

        await toggle(toolPanel, getItem(toolPanel, 'contact'));
        await table.updateComplete;

        expect(table.columnVisibility['email']).toBe(false);
        expect(table.columnVisibility['name']).not.toBe(false);
        expect(getItem(toolPanel, 'name').selected).toBe(true);
      });
    });

    describe('reordering', () => {
      it('should reorder the table columns when an item is moved', async () => {
        const { toolPanel, table } = await createFixture({ tableId: 'people', columns: GROUPED_COLUMNS });

        await moveWithKeyboard(toolPanel, getItem(toolPanel, 'id'), 'ArrowDown');
        await table.updateComplete;

        expect(table.columnOrder).toEqual(['contact', 'name', 'email', 'id', 'city']);
        expect(getHeaderIds(table)).toEqual(['name', 'email', 'id', 'city']);
        expect(getItems(toolPanel).map(item => item.value)).toEqual(['contact', 'name', 'email', 'id', 'city']);
      });

      it('should move a group together with its columns', async () => {
        const { toolPanel, table } = await createFixture({ tableId: 'people', columns: GROUPED_COLUMNS });

        await moveWithKeyboard(toolPanel, getItem(toolPanel, 'contact'), 'ArrowUp');

        expect(table.columnOrder).toEqual(['contact', 'name', 'email', 'id', 'city']);
      });

      it('should reorder the columns of a group within the group', async () => {
        const { toolPanel, table } = await createFixture({ tableId: 'people', columns: GROUPED_COLUMNS });

        await moveWithKeyboard(toolPanel, getItem(toolPanel, 'name'), 'ArrowDown');

        expect(table.columnOrder).toEqual(['id', 'contact', 'email', 'name', 'city']);
        expect(getChildIds(getItem(toolPanel, 'contact'))).toEqual(['email', 'name']);
      });

      it('should not move a column out of its group', async () => {
        const { toolPanel, table } = await createFixture({ tableId: 'people', columns: GROUPED_COLUMNS });

        await moveWithKeyboard(toolPanel, getItem(toolPanel, 'email'), 'ArrowDown');

        expect(table.columnOrder).toEqual([]);
        expect(getChildIds(getItem(toolPanel, 'contact'))).toEqual(['name', 'email']);
        expect(getItems(toolPanel).map(item => item.value)).toEqual(['id', 'contact', 'name', 'email', 'city']);
      });

      it('should emit the column order event', async () => {
        const { toolPanel, table } = await createFixture({ tableId: 'people' });
        const orders: string[][] = [];
        table.addEventListener('forge-data-table-column-order', evt => orders.push(evt.detail));

        await moveWithKeyboard(toolPanel, getItem(toolPanel, 'id'), 'ArrowDown');

        expect(orders).toEqual([['name', 'id']]);
      });

      it('should keep the select column first', async () => {
        const { toolPanel, table } = await createFixture({ tableId: 'people' });
        table.rowSelection = 'multiple';
        table.reorderable = true;
        await table.updateComplete;
        await toolPanel.updateComplete;

        await moveWithKeyboard(toolPanel, getItem(toolPanel, 'id'), 'ArrowDown');

        expect(table.columnOrder).toEqual(['SELECT_COLUMN_ID', 'name', 'id']);
      });

      it('should keep focus on the moved item', async () => {
        const { toolPanel } = await createFixture({ tableId: 'people' });
        const item = getItem(toolPanel, 'id');

        await moveWithKeyboard(toolPanel, item, 'ArrowDown');
        await item.updateComplete;

        expect(item.matches(':focus-within')).toBe(true);
      });
    });
  });

  it('should be accessible', async () => {
    const { toolPanel } = await createFixture();

    await expect(toolPanel).toBeAccessible();
  });

  it('should be accessible with a column tree', async () => {
    const { toolPanel } = await createFixture({ tableId: 'people', columns: GROUPED_COLUMNS });

    await expect(toolPanel).toBeAccessible();
  });
});
