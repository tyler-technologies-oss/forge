import { TableController, type ColumnDef, type Table } from '@tanstack/lit-table';
import { html, type ReactiveControllerHost } from 'lit';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { userEvent } from 'vitest/browser';
import './column-menu.js';
import type { ColumnMenuElement } from './column-menu.js';
import { dataTableFeatures, type DataTableFeatures } from '../data-table/table-features.js';

interface TestData {
  id: number;
  name: string;
  age: number;
}

const COLUMNS: ColumnDef<DataTableFeatures, TestData>[] = [
  { id: 'id', header: 'ID', accessorKey: 'id' },
  { id: 'name', header: 'Name', accessorKey: 'name' },
  { id: 'age', header: 'Age', accessorKey: 'age', enableHiding: false }
];

const RENAMABLE_COLUMNS: ColumnDef<DataTableFeatures, TestData>[] = COLUMNS.map(column => ({ ...column, meta: { renamable: true } }));

const DATA: TestData[] = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 }
];

function createTestTable(
  options: { enableSorting?: boolean; enableColumnResizing?: boolean; enableGrouping?: boolean; columns?: ColumnDef<DataTableFeatures, TestData>[] } = {}
): Table<DataTableFeatures, TestData> {
  const host: ReactiveControllerHost = {
    addController: () => {},
    removeController: () => {},
    requestUpdate: () => {},
    updateComplete: Promise.resolve(true)
  };
  return new TableController<DataTableFeatures, TestData>(host).table({
    features: dataTableFeatures,
    data: DATA,
    columns: options.columns ?? COLUMNS,
    enableSorting: options.enableSorting ?? true,
    enableColumnResizing: options.enableColumnResizing ?? true,
    enableGrouping: options.enableGrouping ?? false
  });
}

async function renderMenu(table: Table<DataTableFeatures, TestData>, columnId: string, reorderable = true): Promise<ColumnMenuElement<TestData>> {
  const screen = await render(
    html`<forge-data-table-column-menu .table=${table} .column=${table.getColumn(columnId)} .reorderable=${reorderable}></forge-data-table-column-menu>`
  );
  const element = screen.container.querySelector('forge-data-table-column-menu') as ColumnMenuElement<TestData>;
  await element.updateComplete;
  return element;
}

type MenuItem = HTMLElement & { disabled: boolean; open?: boolean; checked?: boolean };

const ITEM_SELECTOR = ':is(forge-dropdown-menu-item, forge-dropdown-menu-item-checkbox, forge-dropdown-menu-item-radio)';

function getMenu(element: ColumnMenuElement<TestData>): HTMLElement & { open: boolean } {
  return element.shadowRoot?.querySelector('forge-dropdown-menu') as HTMLElement & { open: boolean };
}

function getItemLabel(item: HTMLElement): string | undefined {
  return item.querySelector(':scope > span')?.textContent?.trim();
}

function getTopLevelItems(element: ColumnMenuElement<TestData>): MenuItem[] {
  return Array.from(getMenu(element).querySelectorAll<MenuItem>(`:scope > ${ITEM_SELECTOR}`));
}

function getSubmenuItems(parent: HTMLElement): MenuItem[] {
  return Array.from(parent.querySelectorAll<MenuItem>(`:scope > ${ITEM_SELECTOR}`));
}

function getLabels(items: HTMLElement[]): Array<string | undefined> {
  return items.map(getItemLabel);
}

function getItem(items: HTMLElement[], label: string): MenuItem {
  const item = items.find(i => getItemLabel(i) === label);
  if (!item) {
    throw new Error(`No menu item labelled "${label}"`);
  }
  return item as MenuItem;
}

async function openMenu(element: ColumnMenuElement<TestData>): Promise<MenuItem[]> {
  const button = element.shadowRoot?.querySelector('forge-icon-button') as HTMLElement;
  await userEvent.click(button);
  await vi.waitFor(() => expect(getMenu(element).open).toBe(true));
  return getTopLevelItems(element);
}

async function waitForMenuClosed(element: ColumnMenuElement<TestData>): Promise<void> {
  const overlay = getMenu(element).shadowRoot?.querySelector('forge-popover')?.shadowRoot?.querySelector('forge-overlay');
  await vi.waitFor(() => expect(overlay?.shadowRoot?.querySelector('[popover]')?.matches(':popover-open') ?? false).toBe(false));
}

async function closeMenu(element: ColumnMenuElement<TestData>): Promise<void> {
  await vi.waitFor(async () => {
    await userEvent.keyboard('{Escape}');
    expect(getMenu(element).open).toBe(false);
  });
  await waitForMenuClosed(element);
}

async function openSubmenu(element: ColumnMenuElement<TestData>, parentLabel: string): Promise<MenuItem[]> {
  const parent = getItem(await openMenu(element), parentLabel);
  await userEvent.click(parent);
  await vi.waitFor(() => expect(parent.open).toBe(true));
  return getSubmenuItems(parent);
}

async function choose(element: ColumnMenuElement<TestData>, label: string): Promise<void> {
  await userEvent.click(getItem(await openMenu(element), label));
}

async function chooseInSubmenu(element: ColumnMenuElement<TestData>, parentLabel: string, label: string): Promise<void> {
  await userEvent.click(getItem(await openSubmenu(element, parentLabel), label));
}

describe('ColumnMenu', () => {
  it('should render an icon button with an accessible label', async () => {
    const element = await renderMenu(createTestTable(), 'name');

    const button = element.shadowRoot?.querySelector('forge-icon-button');
    expect(button?.getAttribute('aria-label')).toBe('Column options');
  });

  it('should focus the menu button when focused', async () => {
    const element = await renderMenu(createTestTable(), 'name');

    element.focus();

    expect(element.shadowRoot?.activeElement).toBe(element.shadowRoot?.querySelector('forge-icon-button'));
  });

  it('should list all column actions when opened', async () => {
    const element = await renderMenu(createTestTable(), 'name');

    expect(getLabels(await openMenu(element))).toEqual(['Move', 'Sort', 'Hide', 'Pin', 'Maximize']);
  });

  it('should list the move actions in the move submenu', async () => {
    const element = await renderMenu(createTestTable(), 'name');

    expect(getLabels(await openSubmenu(element, 'Move'))).toEqual(['Move left', 'Move right']);
  });

  it('should list the sort directions in the sort submenu', async () => {
    const element = await renderMenu(createTestTable(), 'name');

    expect(getLabels(await openSubmenu(element, 'Sort'))).toEqual(['Ascending', 'Descending', 'Unsort']);
  });

  it('should list the pin actions in the pin submenu', async () => {
    const element = await renderMenu(createTestTable(), 'name');

    expect(getLabels(await openSubmenu(element, 'Pin'))).toEqual(['Start', 'End', 'Unpin']);
  });

  it('should sort the column ascending when ascending is chosen', async () => {
    const table = createTestTable();
    const element = await renderMenu(table, 'age');

    await chooseInSubmenu(element, 'Sort', 'Ascending');

    expect(table.atoms.sorting.get()).toEqual([{ id: 'age', desc: false }]);
  });

  it('should sort the column descending when descending is chosen', async () => {
    const table = createTestTable();
    const element = await renderMenu(table, 'age');

    await chooseInSubmenu(element, 'Sort', 'Descending');

    expect(table.atoms.sorting.get()).toEqual([{ id: 'age', desc: true }]);
  });

  it('should not check a sort direction when the column is not sorted', async () => {
    const element = await renderMenu(createTestTable(), 'age');

    const items = await openSubmenu(element, 'Sort');

    expect(getItem(items, 'Ascending').checked).toBe(false);
    expect(getItem(items, 'Descending').checked).toBe(false);
  });

  it('should check ascending when the column is sorted ascending', async () => {
    const table = createTestTable();
    table.getColumn('age')?.toggleSorting(false);
    const element = await renderMenu(table, 'age');

    const items = await openSubmenu(element, 'Sort');

    expect(getItem(items, 'Ascending').checked).toBe(true);
    expect(getItem(items, 'Descending').checked).toBe(false);
  });

  it('should check descending when the column is sorted descending', async () => {
    const table = createTestTable();
    table.getColumn('age')?.toggleSorting(true);
    const element = await renderMenu(table, 'age');

    const items = await openSubmenu(element, 'Sort');

    expect(getItem(items, 'Ascending').checked).toBe(false);
    expect(getItem(items, 'Descending').checked).toBe(true);
  });

  it('should check the direction of its own column when other columns are sorted', async () => {
    const table = createTestTable();
    table.getColumn('name')?.toggleSorting(true);
    table.getColumn('age')?.toggleSorting(false, true);
    const element = await renderMenu(table, 'age');

    const items = await openSubmenu(element, 'Sort');

    expect(getItem(items, 'Ascending').checked).toBe(true);
    expect(getItem(items, 'Descending').checked).toBe(false);
  });

  it('should reflect sorting that changed while the menu was closed', async () => {
    const table = createTestTable();
    const element = await renderMenu(table, 'age');
    await openSubmenu(element, 'Sort');
    await closeMenu(element);

    table.getColumn('age')?.toggleSorting(true);
    const items = await openSubmenu(element, 'Sort');

    expect(getItem(items, 'Ascending').checked).toBe(false);
    expect(getItem(items, 'Descending').checked).toBe(true);
    expect(getItem(items, 'Unsort').disabled).toBe(false);
  });

  it('should check only the chosen direction when the direction is changed', async () => {
    const element = await renderMenu(createTestTable(), 'age');
    await chooseInSubmenu(element, 'Sort', 'Ascending');
    await waitForMenuClosed(element);

    await chooseInSubmenu(element, 'Sort', 'Descending');
    await waitForMenuClosed(element);
    const items = await openSubmenu(element, 'Sort');

    expect(getItem(items, 'Ascending').checked).toBe(false);
    expect(getItem(items, 'Descending').checked).toBe(true);
  });

  it('should uncheck the direction when the column is unsorted', async () => {
    const table = createTestTable();
    table.getColumn('age')?.toggleSorting(false);
    const element = await renderMenu(table, 'age');
    await chooseInSubmenu(element, 'Sort', 'Unsort');
    await waitForMenuClosed(element);

    const items = await openSubmenu(element, 'Sort');

    expect(getItem(items, 'Ascending').checked).toBe(false);
    expect(getItem(items, 'Descending').checked).toBe(false);
  });

  it('should clear the sorting of the column when unsort is chosen', async () => {
    const table = createTestTable();
    table.getColumn('age')?.toggleSorting(false);
    const element = await renderMenu(table, 'age');

    await chooseInSubmenu(element, 'Sort', 'Unsort');

    expect(table.atoms.sorting.get()).toEqual([]);
  });

  it('should only clear the sorting of its own column when unsort is chosen', async () => {
    const table = createTestTable();
    table.getColumn('age')?.toggleSorting(false);
    table.getColumn('name')?.toggleSorting(false, true);
    const element = await renderMenu(table, 'age');

    await chooseInSubmenu(element, 'Sort', 'Unsort');

    expect(table.atoms.sorting.get()).toEqual([{ id: 'name', desc: false }]);
  });

  it('should disable unsort when the column is not sorted', async () => {
    const element = await renderMenu(createTestTable(), 'age');

    expect(getItem(await openSubmenu(element, 'Sort'), 'Unsort').disabled).toBe(true);
  });

  it('should enable unsort when the column is sorted', async () => {
    const table = createTestTable();
    table.getColumn('age')?.toggleSorting(true);
    const element = await renderMenu(table, 'age');

    expect(getItem(await openSubmenu(element, 'Sort'), 'Unsort').disabled).toBe(false);
  });

  it('should list the group action when the table allows grouping', async () => {
    const element = await renderMenu(createTestTable({ enableGrouping: true }), 'name');

    expect(getLabels(await openMenu(element))).toEqual(['Move', 'Sort', 'Group', 'Hide', 'Pin', 'Maximize']);
  });

  it('should group the rows by the column when group is chosen', async () => {
    const table = createTestTable({ enableGrouping: true });
    const element = await renderMenu(table, 'name');

    await choose(element, 'Group');

    expect(table.atoms.grouping.get()).toEqual(['name']);
  });

  it('should check the group action when the column is grouped', async () => {
    const table = createTestTable({ enableGrouping: true });
    table.setGrouping(['name']);
    const element = await renderMenu(table, 'name');

    expect(getItem(await openMenu(element), 'Group').checked).toBe(true);
  });

  it('should remove the grouping when group is chosen for a grouped column', async () => {
    const table = createTestTable({ enableGrouping: true });
    table.setGrouping(['name']);
    const element = await renderMenu(table, 'name');

    await choose(element, 'Group');

    expect(table.atoms.grouping.get()).toEqual([]);
  });

  it('should omit the group action when the column does not allow grouping', async () => {
    const columns = COLUMNS.map(column => (column.id === 'name' ? { ...column, enableGrouping: false } : column));
    const element = await renderMenu(createTestTable({ columns, enableGrouping: true }), 'name');

    expect(getLabels(await openMenu(element))).not.toContain('Group');
  });

  it('should omit sort actions when the table does not allow sorting', async () => {
    const element = await renderMenu(createTestTable({ enableSorting: false }), 'name');

    expect(getLabels(await openMenu(element))).toEqual(['Move', 'Hide', 'Pin', 'Maximize']);
  });

  it('should omit sort actions when the column does not allow sorting', async () => {
    const columns = COLUMNS.map(column => (column.id === 'name' ? { ...column, enableSorting: false } : column));
    const element = await renderMenu(createTestTable({ columns }), 'name');

    expect(getLabels(await openMenu(element))).toEqual(['Move', 'Hide', 'Pin', 'Maximize']);
  });

  it('should omit move actions when the table does not allow reordering', async () => {
    const element = await renderMenu(createTestTable(), 'name', false);

    expect(getLabels(await openMenu(element))).toEqual(['Sort', 'Hide', 'Pin', 'Maximize']);
  });

  it('should offer the rename action before hide when the column is renamable', async () => {
    const element = await renderMenu(createTestTable({ columns: RENAMABLE_COLUMNS }), 'name');

    expect(getLabels(await openMenu(element))).toEqual(['Move', 'Sort', 'Rename', 'Hide', 'Pin', 'Maximize']);
  });

  it('should dispatch an action event without changing the table when Rename is chosen', async () => {
    const table = createTestTable({ columns: RENAMABLE_COLUMNS });
    const element = await renderMenu(table, 'name');
    const listener = vi.fn();
    element.addEventListener('forge-data-table-column-menu-action', listener);

    await choose(element, 'Rename');

    expect(listener).toHaveBeenCalledOnce();
    expect(listener.mock.calls[0][0].detail).toEqual({ columnId: 'name', action: 'rename' });
    expect(table.getColumn('name')?.columnDef.header).toBe('Name');
  });

  it('should omit the maximize action when the table does not allow resizing', async () => {
    const element = await renderMenu(createTestTable({ enableColumnResizing: false }), 'name');

    expect(getLabels(await openMenu(element))).toEqual(['Move', 'Sort', 'Hide', 'Pin']);
  });

  it('should dispatch an action event without changing the table when Maximize is chosen', async () => {
    const table = createTestTable();
    const element = await renderMenu(table, 'name');
    const listener = vi.fn();
    element.addEventListener('forge-data-table-column-menu-action', listener);

    await choose(element, 'Maximize');

    expect(listener).toHaveBeenCalledOnce();
    expect(listener.mock.calls[0][0].detail).toEqual({ columnId: 'name', action: 'maximize' });
    expect(table.atoms.columnPinning.get()).toEqual({ start: [], end: [] });
  });

  it('should reflect option changes made after the menu was first opened', async () => {
    const table = createTestTable();
    const element = await renderMenu(table, 'name');
    await openMenu(element);
    await userEvent.keyboard('{Escape}');
    await vi.waitFor(() => expect(getMenu(element).open).toBe(false));

    element.reorderable = false;
    table.setOptions(prev => ({ ...prev, enableSorting: false, enableColumnResizing: false }));
    await element.updateComplete;

    expect(getLabels(await openMenu(element))).toEqual(['Hide', 'Pin']);
  });

  it('should hide the column when hide is chosen', async () => {
    const table = createTestTable();
    const element = await renderMenu(table, 'name');

    await choose(element, 'Hide');

    expect(table.atoms.columnVisibility.get()).toEqual({ name: false });
  });

  it('should not offer hide when the column cannot be hidden', async () => {
    const element = await renderMenu(createTestTable(), 'age');

    expect(getLabels(await openMenu(element))).not.toContain('Hide');
  });

  it('should move the column left when move left is chosen', async () => {
    const table = createTestTable();
    const element = await renderMenu(table, 'name');

    await chooseInSubmenu(element, 'Move', 'Move left');

    expect(table.getAllLeafColumns().map(c => c.id)).toEqual(['name', 'id', 'age']);
  });

  it('should move the column right when move right is chosen', async () => {
    const table = createTestTable();
    const element = await renderMenu(table, 'name');

    await chooseInSubmenu(element, 'Move', 'Move right');

    expect(table.getAllLeafColumns().map(c => c.id)).toEqual(['id', 'age', 'name']);
  });

  it('should disable move left for the first column', async () => {
    const element = await renderMenu(createTestTable(), 'id');

    expect(getItem(await openSubmenu(element, 'Move'), 'Move left').disabled).toBe(true);
  });

  it('should disable move right for the last column', async () => {
    const element = await renderMenu(createTestTable(), 'age');

    expect(getItem(await openSubmenu(element, 'Move'), 'Move right').disabled).toBe(true);
  });

  it('should pin the column to the start when start is chosen', async () => {
    const table = createTestTable();
    const element = await renderMenu(table, 'name');

    await chooseInSubmenu(element, 'Pin', 'Start');

    expect(table.atoms.columnPinning.get()).toEqual({ start: ['name'], end: [] });
  });

  it('should pin the column to the end when end is chosen', async () => {
    const table = createTestTable();
    const element = await renderMenu(table, 'name');

    await chooseInSubmenu(element, 'Pin', 'End');

    expect(table.atoms.columnPinning.get()).toEqual({ start: [], end: ['name'] });
  });

  it('should check the pin position the column is pinned to', async () => {
    const table = createTestTable();
    table.getColumn('name')?.pin('end');
    const element = await renderMenu(table, 'name');

    const items = await openSubmenu(element, 'Pin');

    expect(getItem(items, 'Start').checked).toBe(false);
    expect(getItem(items, 'End').checked).toBe(true);
  });

  it('should unpin the column when unpin is chosen', async () => {
    const table = createTestTable();
    table.getColumn('name')?.pin('end');
    const element = await renderMenu(table, 'name');

    await chooseInSubmenu(element, 'Pin', 'Unpin');

    expect(table.atoms.columnPinning.get()).toEqual({ start: [], end: [] });
  });

  it('should disable unpin when the column is not pinned', async () => {
    const element = await renderMenu(createTestTable(), 'name');

    expect(getItem(await openSubmenu(element, 'Pin'), 'Unpin').disabled).toBe(true);
  });

  it('should enable unpin when the column is pinned', async () => {
    const table = createTestTable();
    table.getColumn('name')?.pin('start');
    const element = await renderMenu(table, 'name');

    expect(getItem(await openSubmenu(element, 'Pin'), 'Unpin').disabled).toBe(false);
  });

  it('should omit the pin action when the column cannot be pinned', async () => {
    const columns = COLUMNS.map(column => (column.id === 'name' ? { ...column, enablePinning: false } : column));
    const element = await renderMenu(createTestTable({ columns }), 'name');

    expect(getLabels(await openMenu(element))).not.toContain('Pin');
  });
});
