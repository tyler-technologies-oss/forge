import { createTable, getCoreRowModel, getSortedRowModel, type ColumnDef, type Table, type TableState } from '@tanstack/lit-table';
import { html } from 'lit';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { userEvent } from 'vitest/browser';
import './column-menu.js';
import type { ColumnMenuElement } from './column-menu.js';
import type { ColumnMenuAction } from './types.js';

interface TestData {
  id: number;
  name: string;
  age: number;
}

const COLUMNS: ColumnDef<TestData>[] = [
  { id: 'id', header: 'ID', accessorKey: 'id' },
  { id: 'name', header: 'Name', accessorKey: 'name' },
  { id: 'age', header: 'Age', accessorKey: 'age', enableHiding: false }
];

const DATA: TestData[] = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 }
];

function createTestTable(options: { enableSorting?: boolean; enableColumnResizing?: boolean; columns?: ColumnDef<TestData>[] } = {}): Table<TestData> {
  const baseOptions = {
    data: DATA,
    columns: options.columns ?? COLUMNS,
    enableSorting: options.enableSorting ?? true,
    enableColumnResizing: options.enableColumnResizing ?? true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    renderFallbackValue: null,
    onStateChange: () => {}
  };
  const table = createTable<TestData>({ ...baseOptions, state: {} });
  let state: TableState = { ...table.initialState };
  table.setOptions(prev => ({
    ...prev,
    state,
    onStateChange: updater => {
      state = typeof updater === 'function' ? updater(state) : updater;
      table.setOptions(current => ({ ...current, state }));
    }
  }));
  return table;
}

async function renderMenu(table: Table<TestData>, columnId: string, reorderable = true): Promise<ColumnMenuElement<TestData>> {
  const screen = await render(
    html`<forge-data-table-column-menu .table=${table} .column=${table.getColumn(columnId)} .reorderable=${reorderable}></forge-data-table-column-menu>`
  );
  const element = screen.container.querySelector('forge-data-table-column-menu') as ColumnMenuElement<TestData>;
  await element.updateComplete;
  return element;
}

async function openMenu(element: ColumnMenuElement<TestData>): Promise<HTMLElement[]> {
  const button = element.shadowRoot?.querySelector('forge-icon-button') as HTMLElement;
  await userEvent.click(button);
  const getItems = (): HTMLElement[] => Array.from(document.querySelectorAll('forge-list-item'));
  await vi.waitFor(() => expect(getItems().length).toBeGreaterThan(0));
  return getItems();
}

function getLabels(items: HTMLElement[]): Array<string | undefined> {
  return items.map(i => i.textContent?.trim());
}

function getItem(items: HTMLElement[], label: string): HTMLElement {
  const item = items.find(i => i.textContent?.trim() === label);
  if (!item) {
    throw new Error(`No menu item labelled "${label}"`);
  }
  return item;
}

async function choose(items: HTMLElement[], label: string): Promise<void> {
  await userEvent.click(getItem(items, label).querySelector('button') as HTMLElement);
}

function isDisabled(items: HTMLElement[], label: string): boolean {
  return getItem(items, label).querySelector('button')?.hasAttribute('disabled') ?? false;
}

describe('ColumnMenu', () => {
  it('should render an icon button with an accessible label', async () => {
    const element = await renderMenu(createTestTable(), 'name');

    const button = element.shadowRoot?.querySelector('forge-icon-button');
    expect(button?.getAttribute('aria-label')).toBe('Column options');
  });

  it('should list all column actions when opened', async () => {
    const element = await renderMenu(createTestTable(), 'name');

    const items = await openMenu(element);

    expect(items.map(i => i.textContent?.trim())).toEqual(['Move left', 'Move right', 'Sort ascending', 'Sort descending', 'Hide', 'Pin', 'Maximize']);
  });

  it('should sort the column ascending when sort ascending is chosen', async () => {
    const table = createTestTable();
    const element = await renderMenu(table, 'age');

    await choose(await openMenu(element), 'Sort ascending');

    expect(table.getState().sorting).toEqual([{ id: 'age', desc: false }]);
  });

  it('should sort the column descending when sort descending is chosen', async () => {
    const table = createTestTable();
    const element = await renderMenu(table, 'age');

    await choose(await openMenu(element), 'Sort descending');

    expect(table.getState().sorting).toEqual([{ id: 'age', desc: true }]);
  });

  it('should omit sort actions when the table does not allow sorting', async () => {
    const element = await renderMenu(createTestTable({ enableSorting: false }), 'name');

    expect(getLabels(await openMenu(element))).toEqual(['Move left', 'Move right', 'Hide', 'Pin', 'Maximize']);
  });

  it('should omit sort actions when the column does not allow sorting', async () => {
    const columns = COLUMNS.map(column => (column.id === 'name' ? { ...column, enableSorting: false } : column));
    const element = await renderMenu(createTestTable({ columns }), 'name');

    expect(getLabels(await openMenu(element))).toEqual(['Move left', 'Move right', 'Hide', 'Pin', 'Maximize']);
  });

  it('should omit move actions when the table does not allow reordering', async () => {
    const element = await renderMenu(createTestTable(), 'name', false);

    expect(getLabels(await openMenu(element))).toEqual(['Sort ascending', 'Sort descending', 'Hide', 'Pin', 'Maximize']);
  });

  it('should omit the maximize action when the table does not allow resizing', async () => {
    const element = await renderMenu(createTestTable({ enableColumnResizing: false }), 'name');

    expect(getLabels(await openMenu(element))).toEqual(['Move left', 'Move right', 'Sort ascending', 'Sort descending', 'Hide', 'Pin']);
  });

  it('should reflect option changes made after the menu was first opened', async () => {
    const table = createTestTable();
    const element = await renderMenu(table, 'name');
    await openMenu(element);
    await userEvent.keyboard('{Escape}');
    await vi.waitFor(() => expect(document.querySelectorAll('forge-list-item')).toHaveLength(0));

    element.reorderable = false;
    table.setOptions(prev => ({ ...prev, enableSorting: false, enableColumnResizing: false }));
    await element.updateComplete;

    expect(getLabels(await openMenu(element))).toEqual(['Hide', 'Pin']);
  });

  it('should hide the column when hide is chosen', async () => {
    const table = createTestTable();
    const element = await renderMenu(table, 'name');

    await choose(await openMenu(element), 'Hide');

    expect(table.getState().columnVisibility).toEqual({ name: false });
  });

  it('should disable hide when the column cannot be hidden', async () => {
    const element = await renderMenu(createTestTable(), 'age');

    expect(isDisabled(await openMenu(element), 'Hide')).toBe(true);
  });

  it('should move the column left when move left is chosen', async () => {
    const table = createTestTable();
    const element = await renderMenu(table, 'name');

    await choose(await openMenu(element), 'Move left');

    expect(table.getAllLeafColumns().map(c => c.id)).toEqual(['name', 'id', 'age']);
  });

  it('should move the column right when move right is chosen', async () => {
    const table = createTestTable();
    const element = await renderMenu(table, 'name');

    await choose(await openMenu(element), 'Move right');

    expect(table.getAllLeafColumns().map(c => c.id)).toEqual(['id', 'age', 'name']);
  });

  it('should disable move left for the first column', async () => {
    const element = await renderMenu(createTestTable(), 'id');

    expect(isDisabled(await openMenu(element), 'Move left')).toBe(true);
  });

  it('should disable move right for the last column', async () => {
    const element = await renderMenu(createTestTable(), 'age');

    expect(isDisabled(await openMenu(element), 'Move right')).toBe(true);
  });

  it.each<[string, ColumnMenuAction]>([
    ['Pin', 'pin'],
    ['Maximize', 'maximize']
  ])('should dispatch an action event without changing the table when %s is chosen', async (label, action) => {
    const table = createTestTable();
    const element = await renderMenu(table, 'name');
    const listener = vi.fn();
    element.addEventListener('forge-data-table-column-menu-action', listener);

    await choose(await openMenu(element), label);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener.mock.calls[0][0].detail).toEqual({ columnId: 'name', action });
    expect(table.getState().columnPinning).toEqual({ left: [], right: [] });
  });

  it('should dispatch an action event for actions applied to the table', async () => {
    const element = await renderMenu(createTestTable(), 'name');
    const listener = vi.fn();
    element.addEventListener('forge-data-table-column-menu-action', listener);

    await choose(await openMenu(element), 'Sort ascending');

    expect(listener.mock.calls[0][0].detail).toEqual({ columnId: 'name', action: 'sort-ascending' });
  });

  it('should offer unpin when the column is pinned', async () => {
    const table = createTestTable();
    table.getColumn('name')?.pin('left');
    const element = await renderMenu(table, 'name');

    const items = await openMenu(element);

    expect(items.map(i => i.textContent?.trim())).toContain('Unpin');
  });
});
