import { constructAggregationFn } from '@tanstack/lit-table';
import type { ColumnFiltersState, SortingState, ColumnVisibilityState } from '@tanstack/lit-table';
import { CurrencyFormatter, DataSource, NumberFormatter } from '@tylertech/forge-core';
import { html } from 'lit';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { userEvent } from 'vitest/browser';
import './data-table.js';
import type { ColumnDef, DataTableElement } from './data-table.js';
import { actionCell, badgeCell, createExpanderColumn, meterCell, ratingCell } from './data-table.js';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
    }
  }
}

if (!globalThis.process) {
  globalThis.process = { env: { NODE_ENV: 'production' } } as NodeJS.Process;
}

interface TestData {
  id: number;
  name: string;
  age: number;
  email: string;
}

const TEST_DATA: TestData[] = [
  { id: 1, name: 'Alice', age: 30, email: 'alice@example.com' },
  { id: 2, name: 'Bob', age: 25, email: 'bob@example.com' },
  { id: 3, name: 'Charlie', age: 35, email: 'charlie@example.com' }
];

const TEST_COLUMNS: ColumnDef<TestData>[] = [
  { id: 'id', header: 'ID', property: 'id' },
  { id: 'name', header: 'Name', property: 'name' },
  { id: 'age', header: 'Age', property: 'age' },
  { id: 'email', header: 'Email', property: 'email' }
];

async function settle(element: DataTableElement<TestData>): Promise<void> {
  await element.updateComplete;
  await new Promise(resolve => setTimeout(resolve));
  await element.updateComplete;
}

function createDeferred<T>(): { promise: Promise<T>; resolve: (value: T) => void } {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>(res => (resolve = res));
  return { promise, resolve };
}

class DataTableHarness {
  constructor(public element: DataTableElement<TestData>) {}

  public async setData(data: TestData[]): Promise<void> {
    this.element.dataSource = new DataSource<TestData>(() => data);
    await settle(this.element);
  }

  public get shadowRoot(): ShadowRoot {
    return this.element.shadowRoot as ShadowRoot;
  }

  public get tableElement(): HTMLTableElement | null {
    return this.shadowRoot.querySelector('table');
  }

  public get theadElement(): HTMLTableSectionElement | null {
    return this.shadowRoot.querySelector('thead');
  }

  public get tbodyElement(): HTMLTableSectionElement | null {
    return this.shadowRoot.querySelector('tbody');
  }

  public get tfootElement(): HTMLTableSectionElement | null {
    return this.shadowRoot.querySelector('tfoot');
  }

  public get headerRows(): HTMLTableRowElement[] {
    return Array.from(this.shadowRoot.querySelectorAll('thead tr'));
  }

  public get headerCells(): HTMLTableCellElement[] {
    return Array.from(this.shadowRoot.querySelectorAll('thead th'));
  }

  public get bodyRows(): HTMLTableRowElement[] {
    return Array.from(this.shadowRoot.querySelectorAll('tbody tr'));
  }

  public get bodyCells(): HTMLTableCellElement[] {
    return Array.from(this.shadowRoot.querySelectorAll('tbody td'));
  }

  public get footerCells(): HTMLTableCellElement[] {
    return Array.from(this.shadowRoot.querySelectorAll('tfoot th'));
  }

  public get resizers(): HTMLElement[] {
    return Array.from(this.shadowRoot.querySelectorAll('.resizer'));
  }

  public get filterInputs(): HTMLInputElement[] {
    return Array.from(this.shadowRoot.querySelectorAll('.filter-container input'));
  }

  public get selectColumnCheckboxes(): HTMLElement[] {
    return Array.from(this.shadowRoot.querySelectorAll('.select-column forge-checkbox'));
  }

  public get columnVisibilityPopover(): HTMLElement | null {
    return this.shadowRoot.querySelector('#column-visibility-popover');
  }

  public getHeaderCellByIndex(index: number): HTMLTableCellElement | undefined {
    return this.headerCells[index];
  }

  public getHeaderCellById(columnId: string): HTMLTableCellElement | null {
    return this.shadowRoot.querySelector(`thead th[data-column-id="${columnId}"]`);
  }

  public getBodyRowByIndex(index: number): HTMLTableRowElement | undefined {
    return this.bodyRows[index];
  }

  public getBodyCellByRowAndColumn(rowIndex: number, colIndex: number): HTMLTableCellElement | undefined {
    const row = this.getBodyRowByIndex(rowIndex);
    if (!row) {
      return undefined;
    }
    return row.querySelectorAll('td')[colIndex];
  }

  public async clickHeaderCell(index: number): Promise<void> {
    const cell = this.getHeaderCellByIndex(index);
    if (cell) {
      const cellContent = cell.querySelector('.cell-content');
      const target = cellContent || cell;
      const event = new MouseEvent('click', { bubbles: true, composed: true });
      target.dispatchEvent(event);
      await this.element.updateComplete;
    }
  }

  public async clickHeaderCellWithModifier(index: number, key: 'shift' | 'ctrl' | 'meta' | 'alt'): Promise<void> {
    const cell = this.getHeaderCellByIndex(index);
    if (cell) {
      const cellContent = cell.querySelector('.cell-content');
      const target = cellContent || cell;
      const event = new MouseEvent('click', {
        bubbles: true,
        composed: true,
        shiftKey: key === 'shift',
        ctrlKey: key === 'ctrl',
        metaKey: key === 'meta',
        altKey: key === 'alt'
      });
      target.dispatchEvent(event);
    }
  }

  public async contextMenuHeaderCell(index: number): Promise<void> {
    const cell = this.getHeaderCellByIndex(index);
    if (cell) {
      const event = new MouseEvent('contextmenu', {
        bubbles: true,
        composed: true
      });
      cell.dispatchEvent(event);
    }
  }

  public async clickBodyRow(index: number): Promise<void> {
    const row = this.getBodyRowByIndex(index);
    if (row) {
      await userEvent.click(row);
    }
  }

  public async clickBodyCell(rowIndex: number, colIndex: number): Promise<void> {
    const cell = this.getBodyCellByRowAndColumn(rowIndex, colIndex);
    if (cell) {
      await userEvent.click(cell);
    }
  }

  public async typeIntoFilter(index: number, value: string): Promise<void> {
    const input = this.filterInputs[index];
    if (input) {
      (input as HTMLInputElement).value = value;
      input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
      await this.element.updateComplete;
    }
  }

  public getSortIconForColumn(columnId: string): SVGElement | null {
    const cell = this.getHeaderCellById(columnId);
    return cell?.querySelector('.sort-icon') || null;
  }

  public getSortIndexForColumn(columnId: string): HTMLElement | null {
    const cell = this.getHeaderCellById(columnId);
    return cell?.querySelector('.sort-index') || null;
  }

  public hasCustomState(state: string): boolean {
    return this.element.matches(`:state(${state})`);
  }

  public async clickRowCheckbox(rowIndex: number): Promise<void> {
    const row = this.getBodyRowByIndex(rowIndex);
    const checkbox = row?.querySelector('forge-checkbox') as HTMLElement;
    if (checkbox) {
      checkbox.click();
      await this.element.updateComplete;
    }
  }

  public async clickHeaderCheckbox(): Promise<void> {
    const headerCheckbox = this.shadowRoot.querySelector('thead forge-checkbox') as HTMLElement;
    if (headerCheckbox) {
      headerCheckbox.click();
      await this.element.updateComplete;
    }
  }
}

async function chooseMenuAction(harness: DataTableHarness, columnId: string, label: string): Promise<void> {
  const menu = harness.getHeaderCellById(columnId)?.querySelector('forge-data-table-column-menu');
  (menu?.shadowRoot?.querySelector('forge-icon-button') as HTMLElement).click();
  const item = await vi.waitFor(() => {
    const match = [...document.querySelectorAll('forge-list-item')].find(i => i.textContent?.trim() === label);
    expect(match).toBeTruthy();
    return match as HTMLElement;
  });
  await userEvent.click(item.querySelector('button') as HTMLElement);
  await settle(harness.element);
}

async function createFixture(
  options: {
    data?: TestData[];
    dataSource?: DataSource<TestData>;
    columns?: ColumnDef<TestData>[];
    [key: string]: any;
  } = {}
): Promise<DataTableHarness> {
  const { data = TEST_DATA, dataSource = new DataSource<TestData>(() => data), columns = TEST_COLUMNS, ...props } = options;

  const screen = render(html`
    <forge-data-table
      .dataSource=${dataSource}
      .columns=${columns}
      .resizable=${props.resizable ?? false}
      .sortable=${props.sortable ?? false}
      .multiSort=${props.multiSort ?? true}
      .maxMultiSortColCount=${props.maxMultiSortColCount}
      .multiSortRemove=${props.multiSortRemove ?? true}
      .multiSortKey=${props.multiSortKey ?? 'shift'}
      .filterable=${props.filterable ?? false}
      .manualSort=${props.manualSort ?? false}
      .manualFilter=${props.manualFilter ?? false}
      .striped=${props.striped ?? false}
      .hover=${props.hover ?? false}
      .compact=${props.compact ?? false}
      .bordered=${props.bordered ?? false}
      .rowSelection=${props.rowSelection ?? 'off'}
      .reorderable=${props.reorderable ?? false}
      .allowRowClick=${props.allowRowClick ?? false}
      .expandable=${props.expandable ?? false}
      .virtualized=${props.virtualized ?? false}
      .fixedHeaders=${props.fixedHeaders ?? false}
      .columnVisibility=${props.columnVisibility ?? {}}
      .columnOrder=${props.columnOrder ?? []}></forge-data-table>
  `);

  const el = screen.container.querySelector('forge-data-table') as DataTableElement<TestData>;
  await settle(el);
  return new DataTableHarness(el);
}

describe('DataTable', () => {
  describe('Basic Rendering', () => {
    it('should render with shadow root', async () => {
      const harness = await createFixture();

      expect(harness.shadowRoot).toBeDefined();
    });

    it('should render table element', async () => {
      const harness = await createFixture();

      expect(harness.tableElement).not.toBeNull();
      expect(harness.tableElement?.tagName).toBe('TABLE');
    });

    it('should render header with column headers', async () => {
      const harness = await createFixture();

      expect(harness.theadElement).not.toBeNull();
      expect(harness.headerCells.length).toBe(TEST_COLUMNS.length);
      expect(harness.headerCells[0].textContent?.trim()).toBe('ID');
      expect(harness.headerCells[1].textContent?.trim()).toBe('Name');
      expect(harness.headerCells[2].textContent?.trim()).toBe('Age');
      expect(harness.headerCells[3].textContent?.trim()).toBe('Email');
    });

    it('should render body with data rows', async () => {
      const harness = await createFixture();

      expect(harness.tbodyElement).not.toBeNull();
      expect(harness.bodyRows.length).toBeGreaterThan(0);
    });

    it('should render correct number of rows', async () => {
      const harness = await createFixture();

      expect(harness.bodyRows.length).toBe(TEST_DATA.length);
    });

    it('should render correct cell content', async () => {
      const harness = await createFixture();

      const firstRow = harness.getBodyRowByIndex(0);
      const cells = firstRow?.querySelectorAll('td');
      expect(cells?.[0].textContent?.trim()).toBe('1');
      expect(cells?.[1].textContent?.trim()).toBe('Alice');
      expect(cells?.[2].textContent?.trim()).toBe('30');
      expect(cells?.[3].textContent?.trim()).toBe('alice@example.com');
    });

    it('should render empty table when no data provided', async () => {
      const harness = await createFixture({ data: [] });

      expect(harness.bodyRows.length).toBe(0);
    });

    it('should update when data changes', async () => {
      const harness = await createFixture();

      expect(harness.bodyRows.length).toBe(3);

      const newData = [...TEST_DATA, { id: 4, name: 'David', age: 40, email: 'david@example.com' }];
      await harness.setData(newData);

      expect(harness.bodyRows.length).toBe(4);
    });

    it('should update when columns change', async () => {
      const harness = await createFixture();

      expect(harness.headerCells.length).toBe(4);

      const newColumns = TEST_COLUMNS.slice(0, 2);
      harness.element.columns = newColumns;
      await harness.element.updateComplete;

      expect(harness.headerCells.length).toBe(2);
    });

    it('should be accessible', async () => {
      const harness = await createFixture({ data: TEST_DATA, columns: TEST_COLUMNS });

      await expect(harness.element).toBeAccessible();
    });
  });

  describe('Column Definitions', () => {
    it('should use column id when provided', async () => {
      const columns: ColumnDef<TestData>[] = [{ id: 'custom-id', header: 'Test', property: 'name' }];
      const harness = await createFixture({ columns });

      const headerCell = harness.getHeaderCellById('custom-id');
      expect(headerCell).not.toBeNull();
    });

    it('should use property as id when no id provided', async () => {
      const columns: ColumnDef<TestData>[] = [{ header: 'Name', property: 'name' }];
      const harness = await createFixture({ columns });

      const headerCell = harness.getHeaderCellById('name');
      expect(headerCell).not.toBeNull();
    });

    it('should derive id from header when no id or property', async () => {
      const columns: ColumnDef<TestData>[] = [{ header: 'User Name' }];
      const harness = await createFixture({ columns });

      const headerCell = harness.getHeaderCellById('user-name');
      expect(headerCell).not.toBeNull();
    });

    it('should use index-based id when no id, property, or header', async () => {
      const columns: ColumnDef<TestData>[] = [{}];
      const harness = await createFixture({ columns });

      const headerCell = harness.getHeaderCellById('column-0');
      expect(headerCell).not.toBeNull();
    });

    it('should render nested/grouped columns', async () => {
      const columns: ColumnDef<TestData>[] = [
        {
          id: 'group',
          header: 'Group',
          columns: [
            { id: 'child1', header: 'Child 1', property: 'name' },
            { id: 'child2', header: 'Child 2', property: 'age' }
          ]
        }
      ];
      const harness = await createFixture({ columns });

      expect(harness.headerRows.length).toBe(2);
      const groupHeader = harness.getHeaderCellById('group');
      const child1Header = harness.getHeaderCellById('child1');
      const child2Header = harness.getHeaderCellById('child2');
      expect(groupHeader).not.toBeNull();
      expect(child1Header).not.toBeNull();
      expect(child2Header).not.toBeNull();
    });

    it('should not render a bottom border on grouping column headers', async () => {
      const columns: ColumnDef<TestData>[] = [
        { id: 'id', header: 'ID', property: 'id' },
        {
          id: 'group',
          header: 'Group',
          columns: [
            { id: 'child1', header: 'Child 1', property: 'name' },
            { id: 'child2', header: 'Child 2', property: 'age' }
          ]
        }
      ];
      const harness = await createFixture({ columns });

      const [groupRowCells, leafRowCells] = harness.headerRows.map(row => Array.from(row.querySelectorAll('th')));
      groupRowCells.forEach(cell => expect(getComputedStyle(cell).borderBottomStyle).toBe('none'));
      leafRowCells.forEach(cell => expect(getComputedStyle(cell).borderBottomStyle).toBe('solid'));
    });

    it('should render vertical borders separating groups of columns', async () => {
      const columns: ColumnDef<TestData>[] = [
        { id: 'id', header: 'ID', property: 'id' },
        {
          id: 'group1',
          header: 'Group 1',
          columns: [
            { id: 'child1', header: 'Child 1', property: 'name' },
            { id: 'child2', header: 'Child 2', property: 'age' }
          ]
        },
        {
          id: 'group2',
          header: 'Group 2',
          columns: [{ id: 'child3', header: 'Child 3', property: 'email' }]
        }
      ];
      const harness = await createFixture({ columns });

      const hasStartBorder = (cell: HTMLTableCellElement | null | undefined): boolean => !!cell && getComputedStyle(cell).borderInlineStartStyle === 'solid';
      expect(hasStartBorder(harness.getHeaderCellById('group1'))).toBe(true);
      expect(hasStartBorder(harness.getHeaderCellById('group2'))).toBe(true);
      expect(hasStartBorder(harness.getHeaderCellById('child1'))).toBe(true);
      expect(hasStartBorder(harness.getHeaderCellById('child3'))).toBe(true);
      expect(hasStartBorder(harness.getHeaderCellById('child2'))).toBe(false);
      expect(hasStartBorder(harness.getHeaderCellById('id'))).toBe(false);
      expect(harness.bodyCells.slice(0, 4).map(hasStartBorder)).toEqual([false, true, false, true]);
    });

    it('should not render vertical group borders when columns are not grouped', async () => {
      const harness = await createFixture();

      harness.headerCells.concat(harness.bodyCells).forEach(cell => expect(getComputedStyle(cell).borderInlineStartStyle).toBe('none'));
    });

    it('should handle column with format function', async () => {
      const columns: ColumnDef<TestData>[] = [
        {
          id: 'transformed',
          header: 'Upper Name',
          format: row => (row.name as string).toUpperCase()
        }
      ];
      const harness = await createFixture({ columns });

      const cell = harness.getBodyCellByRowAndColumn(0, 0);
      expect(cell?.textContent?.trim()).toBe('ALICE');
    });

    it('should handle column with template slot', async () => {
      const columns: ColumnDef<TestData>[] = [
        {
          id: 'slotted',
          header: 'Custom',
          property: 'name',
          useTemplateSlot: true
        }
      ];
      const harness = await createFixture({ columns });

      const cell = harness.getBodyCellByRowAndColumn(0, 0);
      const slot = cell?.querySelector('slot');
      expect(slot).not.toBeNull();
      expect(slot?.getAttribute('name')).toMatch(/^col-slotted:row-/);
    });

    describe('Badge Cell', () => {
      it('should render a badge with the cell value when no options callback is provided', async () => {
        const columns: ColumnDef<TestData>[] = [{ header: 'Name', property: 'name', template: badgeCell() }];
        const harness = await createFixture({ columns });

        const badges = harness.getBodyCellByRowAndColumn(0, 0)?.querySelectorAll('.forge-badge');
        expect(badges).toHaveLength(1);
        expect(badges?.[0].textContent).toBe('Alice');
      });

      it('should render a badge with the theme, strong and icon from a single config', async () => {
        const template = badgeCell({ badges: ({ cell }) => ({ text: `${cell.getValue()}!`, theme: 'success', strong: true, icon: 'check' }) });
        const columns: ColumnDef<TestData>[] = [{ header: 'Name', property: 'name', template }];
        const harness = await createFixture({ columns });

        const badge = harness.getBodyCellByRowAndColumn(0, 0)?.querySelector('.forge-badge');
        expect(badge?.textContent).toBe('Alice!');
        expect(badge?.classList.contains('forge-badge--success')).toBe(true);
        expect(badge?.classList.contains('forge-badge--strong')).toBe(true);
        expect(badge?.querySelector('forge-icon')?.getAttribute('name')).toBe('check');
      });

      it('should render one badge per config when an array is returned', async () => {
        const template = badgeCell({ badges: ({ row }) => [{ text: row.original.name }, { text: `${row.original.age}`, theme: 'warning' }] });
        const columns: ColumnDef<TestData>[] = [{ header: 'Name', property: 'name', template }];
        const harness = await createFixture({ columns });

        const badges = harness.getBodyCellByRowAndColumn(0, 0)?.querySelectorAll('.forge-badge');
        expect(Array.from(badges ?? []).map(badge => badge.textContent)).toEqual(['Alice', '30']);
        expect(badges?.[1].classList.contains('forge-badge--warning')).toBe(true);
      });
    });

    describe('Meter Cell', () => {
      it('should render a tooltip anchored to the meter that contains the value', async () => {
        const columns: ColumnDef<TestData>[] = [{ header: 'Age', property: 'age', template: meterCell({ min: 0, max: 50 }) }];
        const harness = await createFixture({ columns });

        const cell = harness.getBodyCellByRowAndColumn(0, 0);
        const tooltip = cell?.querySelector('forge-tooltip');
        expect(tooltip?.textContent).toBe('30 out of 50');
        expect(tooltip?.anchorElement).toBe(cell?.querySelector('forge-meter'));
      });

      it('should show the percentage in the tooltip when the value mode is percentage', async () => {
        const columns: ColumnDef<TestData>[] = [{ header: 'Age', property: 'age', template: meterCell({ min: 0, max: 40, valueMode: 'percentage' }) }];
        const harness = await createFixture({ columns });

        expect(harness.getBodyCellByRowAndColumn(0, 0)?.querySelector('forge-tooltip')?.textContent).toBe('75%');
      });

      it('should label the meter with the column header', async () => {
        const columns: ColumnDef<TestData>[] = [{ header: 'Age', property: 'age', template: meterCell({ min: 0, max: 50 }) }];
        const harness = await createFixture({ columns });

        expect(harness.getBodyCellByRowAndColumn(0, 0)?.querySelector('forge-meter')?.getAttribute('aria-label')).toBe('Age');
      });
    });

    describe('Rating Cell', () => {
      it('should expose the value as a meter with ARIA value attributes', async () => {
        const columns: ColumnDef<TestData>[] = [{ header: 'Age', property: 'age', template: ratingCell({ min: 0, max: 50 }) }];
        const harness = await createFixture({ columns });

        const meter = harness.getBodyCellByRowAndColumn(0, 0)?.querySelector('[role="meter"]');
        expect(meter?.getAttribute('aria-label')).toBe('Age');
        expect(meter?.getAttribute('aria-valuemin')).toBe('0');
        expect(meter?.getAttribute('aria-valuemax')).toBe('50');
        expect(meter?.getAttribute('aria-valuenow')).toBe('30');
        expect(meter?.getAttribute('aria-valuetext')).toBe('30 out of 50');
      });

      it('should clamp aria-valuenow to the range when the value is out of bounds', async () => {
        const columns: ColumnDef<TestData>[] = [{ header: 'Age', property: 'age', template: ratingCell({ min: 0, max: 20 }) }];
        const harness = await createFixture({ columns });

        const meter = harness.getBodyCellByRowAndColumn(0, 0)?.querySelector('[role="meter"]');
        expect(meter?.getAttribute('aria-valuenow')).toBe('20');
      });

      it('should render a tooltip anchored to the meter that contains the value', async () => {
        const columns: ColumnDef<TestData>[] = [{ header: 'Age', property: 'age', template: ratingCell({ min: 0, max: 50 }) }];
        const harness = await createFixture({ columns });

        const cell = harness.getBodyCellByRowAndColumn(0, 0);
        const tooltip = cell?.querySelector('forge-tooltip');
        expect(tooltip?.textContent).toBe('30 out of 50');
        expect(tooltip?.anchorElement).toBe(cell?.querySelector('[role="meter"]'));
      });
    });

    it('should handle column width', async () => {
      const columns: ColumnDef<TestData>[] = [{ id: 'custom', header: 'Test', property: 'name', width: 250 }];
      const harness = await createFixture({ columns, resizable: true });

      const table = harness.tableElement;
      const computedStyle = window.getComputedStyle(table!);
      const colSizeVar = computedStyle.getPropertyValue('--forge-data-table-column-custom-size');
      expect(colSizeVar.trim()).toBe('250px');
    });

    it('should apply default column width', async () => {
      const columns: ColumnDef<TestData>[] = [{ id: 'default', header: 'Test', property: 'name' }];
      const harness = await createFixture({ columns, resizable: true });

      const table = harness.tableElement;
      const computedStyle = window.getComputedStyle(table!);
      const colSizeVar = computedStyle.getPropertyValue('--forge-data-table-column-default-size');
      expect(colSizeVar.trim()).toBe('172px');
    });
  });

  describe('Column Alignment', () => {
    it.each(['start', 'center', 'end'] as const)('should align body cell text to %s when align is set', async align => {
      const columns: ColumnDef<TestData>[] = [{ header: 'Name', property: 'name', footer: 'Total', align }];
      const harness = await createFixture({ columns });

      expect(getComputedStyle(harness.bodyCells[0]).textAlign).toBe(align);
    });

    it.each([
      ['start', 'flex-start'],
      ['center', 'center'],
      ['end', 'flex-end']
    ] as const)('should justify cell content to %s when align is set', async (align, justifyContent) => {
      const columns: ColumnDef<TestData>[] = [
        { header: 'Actions', id: 'actions', align, template: actionCell([{ text: 'Edit', icon: 'edit', onClick: () => undefined }]) }
      ];
      const harness = await createFixture({ columns });

      const cellContent = harness.bodyCells[0].querySelector('.cell-content') as HTMLElement;
      expect(getComputedStyle(cellContent).justifyContent).toBe(justifyContent);
    });

    it('should not align header or footer cell text when align is set', async () => {
      const columns: ColumnDef<TestData>[] = [{ header: 'Name', property: 'name', footer: 'Total', align: 'end' }];
      const harness = await createFixture({ columns });

      expect(getComputedStyle(harness.headerCells[0]).textAlign).not.toBe('end');
      expect(getComputedStyle(harness.footerCells[0]).textAlign).not.toBe('end');
    });

    it('should not align cell text when align is not set', async () => {
      const columns: ColumnDef<TestData>[] = [{ header: 'Name', property: 'name' }];
      const harness = await createFixture({ columns });

      expect(getComputedStyle(harness.bodyCells[0]).textAlign).toBe('start');
    });

    it.each([
      ['NumberFormatter', () => new NumberFormatter()],
      ['CurrencyFormatter', () => new CurrencyFormatter()]
    ])('should align body cell text to end when a %s is used and align is not set', async (_name, createFormatter) => {
      const columns: ColumnDef<TestData>[] = [{ header: 'ID', property: 'id', format: createFormatter() }];
      const harness = await createFixture({ columns });

      expect(getComputedStyle(harness.bodyCells[0]).textAlign).toBe('end');
    });

    it.each([
      ['NumberFormatter', () => new NumberFormatter(), 'data-number-format'],
      ['CurrencyFormatter', () => new CurrencyFormatter(), 'data-currency-format']
    ])('should set the format attribute on body cells when a %s is used', async (_name, createFormatter, attribute) => {
      const columns: ColumnDef<TestData>[] = [{ header: 'ID', property: 'id', format: createFormatter() }];
      const harness = await createFixture({ columns });

      expect(harness.bodyCells[0].hasAttribute(attribute)).toBe(true);
      expect(harness.headerCells[0].hasAttribute(attribute)).toBe(false);
    });

    it('should not set align when a formatter is used', async () => {
      const columns: ColumnDef<TestData>[] = [{ header: 'ID', property: 'id', format: new NumberFormatter() }];
      const harness = await createFixture({ columns });

      expect(harness.bodyCells[0].hasAttribute('data-align')).toBe(false);
    });

    it('should prefer align over the formatter default when both are set', async () => {
      const columns: ColumnDef<TestData>[] = [{ header: 'ID', property: 'id', format: new NumberFormatter(), align: 'start' }];
      const harness = await createFixture({ columns });

      expect(getComputedStyle(harness.bodyCells[0]).textAlign).toBe('start');
    });

    it('should not align body cell text for a custom format function', async () => {
      const columns: ColumnDef<TestData>[] = [{ header: 'ID', property: 'id', format: row => `#${row.id}` }];
      const harness = await createFixture({ columns });

      expect(getComputedStyle(harness.bodyCells[0]).textAlign).toBe('start');
    });

    it('should align only the columns that set align', async () => {
      const columns: ColumnDef<TestData>[] = [
        { header: 'ID', property: 'id', align: 'end' },
        { header: 'Name', property: 'name' }
      ];
      const harness = await createFixture({ columns });

      const [idCell, nameCell] = harness.getBodyRowByIndex(0)?.querySelectorAll('td') ?? [];
      expect(getComputedStyle(idCell).textAlign).toBe('end');
      expect(getComputedStyle(nameCell).textAlign).not.toBe('end');
    });
  });

  describe('Column Visibility', () => {
    it('should hide column by default when hidden is true', async () => {
      const columns: ColumnDef<TestData>[] = [
        { id: 'id', header: 'ID', property: 'id' },
        { id: 'name', header: 'Name', property: 'name', hidden: true }
      ];
      const harness = await createFixture({ columns });

      expect(harness.headerCells.length).toBe(1);
      expect(harness.getHeaderCellById('name')).toBeNull();
    });

    it('should hide column via hideColumn method', async () => {
      const harness = await createFixture();

      expect(harness.headerCells.length).toBe(4);

      harness.element.hideColumn('name');
      await harness.element.updateComplete;

      expect(harness.headerCells.length).toBe(3);
      expect(harness.getHeaderCellById('name')).toBeNull();
    });

    it('should show column via showColumn method', async () => {
      const columns: ColumnDef<TestData>[] = [
        { id: 'id', header: 'ID', property: 'id' },
        { id: 'name', header: 'Name', property: 'name', hidden: true }
      ];
      const harness = await createFixture({ columns });

      expect(harness.getHeaderCellById('name')).toBeNull();

      harness.element.showColumn('name');
      await harness.element.updateComplete;

      expect(harness.getHeaderCellById('name')).not.toBeNull();
    });

    it('should toggle column visibility via toggleColumnVisibility method', async () => {
      const harness = await createFixture();

      expect(harness.getHeaderCellById('name')).not.toBeNull();

      harness.element.toggleColumnVisibility('name');
      await harness.element.updateComplete;

      expect(harness.getHeaderCellById('name')).toBeNull();

      harness.element.toggleColumnVisibility('name');
      await harness.element.updateComplete;

      expect(harness.getHeaderCellById('name')).not.toBeNull();
    });

    it('should emit column visibility event when visibility changes', async () => {
      const harness = await createFixture();
      const events: ColumnVisibilityState[] = [];
      harness.element.addEventListener('forge-data-table-column-visibility', (evt: Event) => events.push((evt as CustomEvent<ColumnVisibilityState>).detail));

      harness.element.hideColumn('name');
      await harness.element.updateComplete;

      expect(events.length).toBe(1);
      expect(events[0].name).toBe(false);
    });

    it('should update columnVisibility property when visibility changes', async () => {
      const harness = await createFixture();

      harness.element.hideColumn('name');
      await harness.element.updateComplete;

      expect(harness.element.columnVisibility.name).toBe(false);
    });

    it('should respect hideable: false on column', async () => {
      const columns: ColumnDef<TestData>[] = [
        { id: 'id', header: 'ID', property: 'id', hideable: false },
        { id: 'name', header: 'Name', property: 'name' }
      ];
      const harness = await createFixture({ columns });

      harness.element.hideColumn('id');
      await harness.element.updateComplete;

      expect(harness.getHeaderCellById('id')).not.toBeNull();
    });

    it('should open column visibility popover on context menu', async () => {
      const harness = await createFixture();

      await harness.contextMenuHeaderCell(1);
      await harness.element.updateComplete;

      const popover = harness.columnVisibilityPopover as any;
      expect(popover).not.toBeNull();
      expect(popover.open).toBe(true);
    });

    it('should show only hideable columns in visibility menu', async () => {
      const columns: ColumnDef<TestData>[] = [
        { id: 'id', header: 'ID', property: 'id', hideable: false },
        { id: 'name', header: 'Name', property: 'name' },
        { id: 'age', header: 'Age', property: 'age' }
      ];
      const harness = await createFixture({ columns });

      await harness.contextMenuHeaderCell(1);
      await harness.element.updateComplete;

      const popover = harness.columnVisibilityPopover!;
      const listItems = popover.querySelectorAll('forge-list-item:not([disabled])');
      expect(listItems.length).toBe(2);
    });

    it('should toggle column visibility from menu', async () => {
      const harness = await createFixture();

      await harness.contextMenuHeaderCell(1);
      await harness.element.updateComplete;

      const popover = harness.columnVisibilityPopover!;
      const listItem = popover.querySelector('forge-list-item[value="name"]') as HTMLElement;
      listItem.click();
      await harness.element.updateComplete;

      expect(harness.element.columnVisibility.name).toBe(false);
    });

    it('should close visibility menu after selection', async () => {
      const harness = await createFixture();

      await harness.contextMenuHeaderCell(1);
      await harness.element.updateComplete;

      const popover = harness.columnVisibilityPopover as any;
      expect(popover.open).toBe(true);

      const listItem = popover.querySelector('forge-list-item[value="name"]') as HTMLElement;
      listItem.click();
      await harness.element.updateComplete;

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(popover.open).toBe(false);
    });

    it('should not show select column in visibility menu', async () => {
      const harness = await createFixture({ rowSelection: 'single' });

      await harness.contextMenuHeaderCell(1);
      await harness.element.updateComplete;

      const popover = harness.columnVisibilityPopover!;
      const selectItem = popover.querySelector('forge-list-item[value="SELECT_COLUMN_ID"]');
      expect(selectItem).toBeNull();
    });
  });

  describe('Column Ordering', () => {
    it('should initialize column order when reorderable is true', async () => {
      const harness = await createFixture({ reorderable: true });

      expect(harness.element.columnOrder.length).toBe(TEST_COLUMNS.length);
      expect(harness.element.columnOrder).toEqual(['id', 'name', 'age', 'email']);
    });

    it('should emit column order event when order changes', async () => {
      const harness = await createFixture({ reorderable: true });
      const events: string[][] = [];
      harness.element.addEventListener('forge-data-table-column-order', (evt: Event) => events.push((evt as CustomEvent<string[]>).detail));

      const nameHeader = harness.getHeaderCellById('name');
      const idHeader = harness.getHeaderCellById('id');
      const nameContainer = nameHeader?.querySelector('.cell-container') as HTMLElement;
      const idHeaderElement = idHeader as HTMLElement;

      const dragStartEvent = new DragEvent('dragstart', {
        bubbles: true,
        composed: true,
        dataTransfer: new DataTransfer()
      });
      nameContainer.dispatchEvent(dragStartEvent);

      const dragOverEvent = new DragEvent('dragover', {
        bubbles: true,
        composed: true,
        dataTransfer: new DataTransfer()
      });
      idHeaderElement.dispatchEvent(dragOverEvent);

      const dropEvent = new DragEvent('drop', {
        bubbles: true,
        composed: true,
        dataTransfer: new DataTransfer()
      });
      idHeaderElement.dispatchEvent(dropEvent);

      await harness.element.updateComplete;

      expect(events.length).toBeGreaterThan(0);
    });

    it('should update columnOrder property when order changes', async () => {
      const harness = await createFixture({ reorderable: true });

      const originalOrder = [...harness.element.columnOrder];
      expect(originalOrder).toEqual(['id', 'name', 'age', 'email']);

      harness.element.columnOrder = ['name', 'id', 'age', 'email'];
      await harness.element.updateComplete;

      expect(harness.element.columnOrder).toEqual(['name', 'id', 'age', 'email']);
    });

    it('should allow dragging column headers when reorderable', async () => {
      const harness = await createFixture({ reorderable: true });

      const headerCells = harness.headerCells;
      headerCells.forEach(cell => {
        const container = cell.querySelector('.cell-container');
        expect(container?.getAttribute('draggable')).toBe('true');
      });
    });

    it('should reorder columns on drag and drop', async () => {
      const harness = await createFixture({ reorderable: true });

      const nameHeader = harness.getHeaderCellById('name');
      const idHeader = harness.getHeaderCellById('id');

      const nameContainer = nameHeader?.querySelector('.cell-container') as HTMLElement;
      const idHeaderElement = idHeader as HTMLElement;

      const dragStartEvent = new DragEvent('dragstart', {
        bubbles: true,
        composed: true,
        dataTransfer: new DataTransfer()
      });
      nameContainer.dispatchEvent(dragStartEvent);

      const dragOverEvent = new DragEvent('dragover', {
        bubbles: true,
        composed: true,
        dataTransfer: new DataTransfer()
      });
      idHeaderElement.dispatchEvent(dragOverEvent);

      const dropEvent = new DragEvent('drop', {
        bubbles: true,
        composed: true,
        dataTransfer: new DataTransfer()
      });
      idHeaderElement.dispatchEvent(dropEvent);

      const dragEndEvent = new DragEvent('dragend', {
        bubbles: true,
        composed: true
      });
      nameContainer.dispatchEvent(dragEndEvent);

      await harness.element.updateComplete;

      const newOrder = harness.element.columnOrder;
      const nameIndex = newOrder.indexOf('name');
      const idIndex = newOrder.indexOf('id');
      expect(nameIndex).toBeLessThan(idIndex);
    });

    it('should not allow dragging select column', async () => {
      const harness = await createFixture({ reorderable: true, rowSelection: 'single' });

      const selectHeader = harness.shadowRoot.querySelector('thead th.select-column');
      const container = selectHeader?.querySelector('.cell-container');
      expect(container?.getAttribute('draggable')).toBe('false');
    });

    it('should respect reorderable: false on column', async () => {
      const columns: ColumnDef<TestData>[] = [
        { id: 'id', header: 'ID', property: 'id', reorderable: false },
        { id: 'name', header: 'Name', property: 'name' }
      ];
      const harness = await createFixture({ columns, reorderable: true });

      const idHeader = harness.getHeaderCellById('id');
      const nameHeader = harness.getHeaderCellById('name');
      const idContainer = idHeader?.querySelector('.cell-container');
      const nameContainer = nameHeader?.querySelector('.cell-container');

      expect(idContainer?.getAttribute('draggable')).toBe('false');
      expect(nameContainer?.getAttribute('draggable')).toBe('true');
    });

    it('should clear column order when reorderable changes to false', async () => {
      const harness = await createFixture({ reorderable: true });

      expect(harness.element.columnOrder.length).toBeGreaterThan(0);

      harness.element.reorderable = false;
      await harness.element.updateComplete;

      expect(harness.element.columnOrder.length).toBe(0);
    });

    it('should include select column in order when row selection enabled', async () => {
      const harness = await createFixture({ reorderable: true, rowSelection: 'single' });

      expect(harness.element.columnOrder).toContain('SELECT_COLUMN_ID');
      expect(harness.element.columnOrder.length).toBe(TEST_COLUMNS.length + 1);
    });
  });

  describe('Column Resizing', () => {
    it('should show resizers when resizable is true', async () => {
      const harness = await createFixture({ resizable: true });

      expect(harness.resizers.length).toBeGreaterThan(0);
    });

    it('should not show resizers when resizable is false', async () => {
      const harness = await createFixture({ resizable: false });

      expect(harness.resizers.length).toBe(0);
    });

    it('should respect resizable: false on column', async () => {
      const columns: ColumnDef<TestData>[] = [
        { id: 'id', header: 'ID', property: 'id', resizable: false },
        { id: 'name', header: 'Name', property: 'name' }
      ];
      const harness = await createFixture({ columns, resizable: true });

      const idHeader = harness.getHeaderCellById('id');
      const nameHeader = harness.getHeaderCellById('name');
      const idResizer = idHeader?.querySelector('.resizer');
      const nameResizer = nameHeader?.querySelector('.resizer');

      expect(idResizer).toBeNull();
      expect(nameResizer).not.toBeNull();
    });

    it('should apply resizing class when mousedown on resizer', async () => {
      const harness = await createFixture({ resizable: true });

      const resizer = harness.resizers[0];
      expect(resizer).not.toBeNull();
      expect(resizer.classList.contains('resizing')).toBe(false);

      const mouseDownEvent = new MouseEvent('mousedown', { bubbles: true, composed: true });
      resizer.dispatchEvent(mouseDownEvent);
      await harness.element.updateComplete;

      expect(resizer.classList.contains('resizing')).toBe(true);
    });

    it('should apply column size CSS variables', async () => {
      const columns: ColumnDef<TestData>[] = [
        { id: 'id', header: 'ID', property: 'id', width: 100 },
        { id: 'name', header: 'Name', property: 'name', width: 200 }
      ];
      const harness = await createFixture({ columns, resizable: true });

      const table = harness.tableElement;
      const computedStyle = window.getComputedStyle(table!);
      const idSizeVar = computedStyle.getPropertyValue('--forge-data-table-column-id-size');
      const nameSizeVar = computedStyle.getPropertyValue('--forge-data-table-column-name-size');

      expect(idSizeVar.trim()).toBe('100px');
      expect(nameSizeVar.trim()).toBe('200px');
    });
  });

  describe('Column Pinning', () => {
    const getHeaderIds = (harness: DataTableHarness): (string | null)[] => harness.headerCells.map(cell => cell.getAttribute('data-column-id'));
    const getInset = (cell: Element | null | undefined, property: 'insetInlineStart' | 'insetInlineEnd'): string => getComputedStyle(cell as Element)[property];

    const PINNED_COLUMNS: ColumnDef<TestData>[] = [
      { id: 'id', header: 'ID', property: 'id', width: 100 },
      { id: 'name', header: 'Name', property: 'name', width: 150, pin: 'start' },
      { id: 'age', header: 'Age', property: 'age', width: 80, pin: 'start' },
      { id: 'email', header: 'Email', property: 'email', width: 120, pin: 'end' }
    ];

    it('should not make any column sticky when no column is pinned', async () => {
      const harness = await createFixture();

      expect(harness.tableElement?.querySelector('colgroup')).toBeNull();
      expect(harness.headerCells.every(cell => getComputedStyle(cell).position !== 'sticky')).toBe(true);
    });

    it('should render start pinned columns first and end pinned columns last', async () => {
      const harness = await createFixture({ columns: PINNED_COLUMNS });

      expect(getHeaderIds(harness)).toEqual(['name', 'age', 'id', 'email']);
      expect(harness.getBodyRowByIndex(0)?.querySelectorAll('td')[0].id).toBe('name');
      expect(harness.getBodyRowByIndex(0)?.querySelectorAll('td')[3].id).toBe('email');
    });

    it('should make pinned header and body cells sticky', async () => {
      const harness = await createFixture({ columns: PINNED_COLUMNS });

      const stickyCells = [...harness.headerCells, ...harness.bodyCells].filter(cell => getComputedStyle(cell).position === 'sticky');

      expect(stickyCells.length).toBe((harness.bodyRows.length + 1) * 3);
      expect(stickyCells.some(cell => cell.getAttribute('data-column-id') === 'id' || cell.id === 'id')).toBe(false);
    });

    it('should offset pinned columns by the widths of the pinned columns before them', async () => {
      const harness = await createFixture({ columns: PINNED_COLUMNS });

      expect(getInset(harness.getHeaderCellById('name'), 'insetInlineStart')).toBe('0px');
      expect(getInset(harness.getHeaderCellById('age'), 'insetInlineStart')).toBe('150px');
      expect(getInset(harness.getHeaderCellById('email'), 'insetInlineEnd')).toBe('0px');
      expect(getInset(harness.getBodyCellByRowAndColumn(0, 1), 'insetInlineStart')).toBe('150px');
    });

    it('should apply the column width to pinned columns so that offsets match the rendered layout', async () => {
      const harness = await createFixture({ columns: PINNED_COLUMNS });

      expect(harness.getHeaderCellById('name')?.getBoundingClientRect().width).toBe(150);
      expect(harness.getHeaderCellById('age')?.getBoundingClientRect().width).toBe(80);
    });

    it('should ignore hidden columns when calculating offsets', async () => {
      const harness = await createFixture({ columns: PINNED_COLUMNS, columnVisibility: { name: false } });

      expect(getHeaderIds(harness)).toEqual(['age', 'id', 'email']);
      expect(getInset(harness.getHeaderCellById('age'), 'insetInlineStart')).toBe('0px');
    });

    it('should mark only the pinned column next to the scrollable columns as the edge', async () => {
      const harness = await createFixture({ columns: PINNED_COLUMNS });

      expect(harness.getHeaderCellById('name')?.classList.contains('pinned-edge')).toBe(false);
      expect(harness.getHeaderCellById('age')?.classList.contains('pinned-edge')).toBe(true);
      expect(harness.getHeaderCellById('id')?.classList.contains('pinned-edge')).toBe(false);
      expect(harness.getHeaderCellById('email')?.classList.contains('pinned-edge')).toBe(true);
    });

    it('should pin the child columns of a pinned column group', async () => {
      const columns: ColumnDef<TestData>[] = [
        { id: 'id', header: 'ID', property: 'id' },
        {
          id: 'person',
          header: 'Person',
          pin: 'end',
          columns: [
            { id: 'name', header: 'Name', property: 'name', width: 100 },
            { id: 'age', header: 'Age', property: 'age', width: 60, pin: 'start' }
          ]
        },
        { id: 'email', header: 'Email', property: 'email' }
      ];
      const harness = await createFixture({ columns });

      const bodyIds = [...(harness.getBodyRowByIndex(0)?.querySelectorAll('td') ?? [])].map(cell => cell.id);

      expect(bodyIds).toEqual(['age', 'id', 'email', 'name']);
    });

    it('should pin the row selection column ahead of start pinned columns', async () => {
      const harness = await createFixture({ columns: PINNED_COLUMNS, rowSelection: 'multiple' });

      expect(getHeaderIds(harness)[0]).toBe('SELECT_COLUMN_ID');
      expect(getInset(harness.getHeaderCellById('SELECT_COLUMN_ID'), 'insetInlineStart')).toBe('0px');
      expect(getInset(harness.getHeaderCellById('name'), 'insetInlineStart')).toBe('40px');
    });

    it('should pin and unpin a column from its column menu', async () => {
      const harness = await createFixture({ columns: TEST_COLUMNS });

      await chooseMenuAction(harness, 'email', 'Pin');
      expect(getHeaderIds(harness)).toEqual(['email', 'id', 'name', 'age']);

      await chooseMenuAction(harness, 'email', 'Unpin');
      expect(getHeaderIds(harness)).toEqual(['id', 'name', 'age', 'email']);
    });

    it('should keep the row selection column first when a column is pinned from the menu', async () => {
      const harness = await createFixture({ columns: TEST_COLUMNS, rowSelection: 'multiple' });

      await chooseMenuAction(harness, 'email', 'Pin');

      expect(getHeaderIds(harness).slice(0, 2)).toEqual(['SELECT_COLUMN_ID', 'email']);
    });

    it('should pin footer cells', async () => {
      const columns: ColumnDef<TestData>[] = PINNED_COLUMNS.map(column => ({ ...column, footer: column.header }));
      const harness = await createFixture({ columns });

      const pinnedFooterCells = harness.footerCells.filter(cell => getComputedStyle(cell).position === 'sticky');

      expect(pinnedFooterCells.length).toBe(3);
    });

    it('should update pinned columns when the columns change', async () => {
      const harness = await createFixture({ columns: PINNED_COLUMNS });

      harness.element.columns = TEST_COLUMNS;
      await settle(harness.element);

      expect(getHeaderIds(harness)).toEqual(['id', 'name', 'age', 'email']);
      expect(harness.tableElement?.querySelector('colgroup')).toBeNull();
    });
  });

  describe('Column Renaming', () => {
    const RENAMABLE_COLUMNS: ColumnDef<TestData>[] = TEST_COLUMNS.map(column => ({ ...column, renamable: true }));

    const getHeaderText = (harness: DataTableHarness, columnId: string): string | undefined =>
      harness.getHeaderCellById(columnId)?.querySelector('.cell-text')?.textContent?.trim();

    const getRenameInput = (harness: DataTableHarness, columnId: string): HTMLInputElement | null =>
      harness.getHeaderCellById(columnId)?.querySelector<HTMLInputElement>('.rename-input') ?? null;

    const doubleClickHeaderText = async (harness: DataTableHarness, columnId: string): Promise<void> => {
      const target = harness.getHeaderCellById(columnId)?.querySelector('.cell-text') as HTMLElement;
      const init = { bubbles: true, composed: true };
      target.dispatchEvent(new MouseEvent('click', { ...init, detail: 1 }));
      target.dispatchEvent(new MouseEvent('click', { ...init, detail: 2 }));
      target.dispatchEvent(new MouseEvent('dblclick', { ...init, detail: 2 }));
      await settle(harness.element);
    };

    const startRename = async (harness: DataTableHarness, columnId: string): Promise<HTMLInputElement> => {
      await chooseMenuAction(harness, columnId, 'Rename');
      return vi.waitFor(() => {
        const input = getRenameInput(harness, columnId);
        expect(input).toBeTruthy();
        return input as HTMLInputElement;
      });
    };

    it('should only offer a rename action for renamable columns', async () => {
      const columns: ColumnDef<TestData>[] = TEST_COLUMNS.map(column => ({ ...column, renamable: column.id === 'name' }));
      const harness = await createFixture({ columns });
      const getMenuLabels = async (columnId: string): Promise<Array<string | undefined>> => {
        const menu = harness.getHeaderCellById(columnId)?.querySelector('forge-data-table-column-menu') as HTMLElement;
        (menu.shadowRoot?.querySelector('forge-icon-button') as HTMLElement).click();
        await vi.waitFor(() => expect(document.querySelectorAll('forge-list-item').length).toBeGreaterThan(0));
        const labels = [...document.querySelectorAll('forge-list-item')].map(item => item.textContent?.trim());
        await userEvent.keyboard('{Escape}');
        await vi.waitFor(() => expect(document.querySelectorAll('forge-list-item').length).toBe(0));
        return labels;
      };

      expect(await getMenuLabels('id')).not.toContain('Rename');
      expect(await getMenuLabels('name')).toContain('Rename');
    });

    it('should show an input with the current header when rename is chosen', async () => {
      const harness = await createFixture({ columns: RENAMABLE_COLUMNS });

      const input = await startRename(harness, 'name');

      expect(input.value).toBe('Name');
      await vi.waitFor(() => expect(harness.shadowRoot.activeElement).toBe(input));
    });

    it('should size the input to fit the whole name without scrolling', async () => {
      const columns: ColumnDef<TestData>[] = [
        { id: 'name', header: 'A fairly long column name', property: 'name', width: 60, renamable: true },
        { id: 'age', header: 'Age', property: 'age' }
      ];
      const harness = await createFixture({ columns });

      const input = await startRename(harness, 'name');
      expect(input.scrollWidth).toBeLessThanOrEqual(input.clientWidth);

      await userEvent.fill(input, 'An even longer name than the one before it');
      expect(input.scrollWidth).toBeLessThanOrEqual(input.clientWidth);
    });

    it('should begin editing the name when the header text is double clicked', async () => {
      const harness = await createFixture({ columns: RENAMABLE_COLUMNS });

      await doubleClickHeaderText(harness, 'name');

      const input = await vi.waitFor(() => {
        const match = getRenameInput(harness, 'name');
        expect(match).toBeTruthy();
        return match as HTMLInputElement;
      });
      expect(input.value).toBe('Name');
      await vi.waitFor(() => expect(harness.shadowRoot.activeElement).toBe(input));
    });

    it('should leave sorting unchanged when the header text is double clicked', async () => {
      const harness = await createFixture({ columns: RENAMABLE_COLUMNS, sortable: true });

      await doubleClickHeaderText(harness, 'name');

      expect(getRenameInput(harness, 'name')).toBeTruthy();
      expect(harness.getHeaderCellById('name')?.classList.contains('sort-asc')).toBe(false);
      expect(harness.getHeaderCellById('name')?.classList.contains('sort-desc')).toBe(false);
    });

    it('should keep an existing sort when the header text is double clicked', async () => {
      const harness = await createFixture({ columns: RENAMABLE_COLUMNS, sortable: true });
      await harness.clickHeaderCell(1);
      expect(harness.getHeaderCellById('name')?.classList.contains('sort-asc')).toBe(true);

      await doubleClickHeaderText(harness, 'name');

      expect(getRenameInput(harness, 'name')).toBeTruthy();
      expect(harness.getHeaderCellById('name')?.classList.contains('sort-asc')).toBe(true);
    });

    it('should not begin editing when a header that is not renamable is double clicked', async () => {
      const harness = await createFixture({ columns: TEST_COLUMNS });

      await doubleClickHeaderText(harness, 'name');

      expect(getRenameInput(harness, 'name')).toBeNull();
    });

    it('should rename the column when Enter is pressed', async () => {
      const harness = await createFixture({ columns: RENAMABLE_COLUMNS });
      const listener = vi.fn();
      harness.element.addEventListener('forge-data-table-column-rename', listener);

      const input = await startRename(harness, 'name');
      await userEvent.fill(input, 'Full name');
      await userEvent.keyboard('{Enter}');
      await settle(harness.element);

      expect(getRenameInput(harness, 'name')).toBeNull();
      expect(getHeaderText(harness, 'name')).toBe('Full name');
      expect(listener).toHaveBeenCalledOnce();
      expect(listener.mock.calls[0][0].detail).toEqual({ columnId: 'name', header: 'Full name' });
    });

    it('should return focus to the column menu after renaming', async () => {
      const harness = await createFixture({ columns: RENAMABLE_COLUMNS });

      const input = await startRename(harness, 'name');
      await userEvent.fill(input, 'Full name');
      await userEvent.keyboard('{Enter}');
      await settle(harness.element);

      const menu = harness.getHeaderCellById('name')?.querySelector('forge-data-table-column-menu');
      await vi.waitFor(() => expect(harness.shadowRoot.activeElement).toBe(menu));
    });

    it('should rename the column when the input loses focus', async () => {
      const harness = await createFixture({ columns: RENAMABLE_COLUMNS });

      const input = await startRename(harness, 'name');
      await userEvent.fill(input, 'Full name');
      input.blur();
      await settle(harness.element);

      expect(getHeaderText(harness, 'name')).toBe('Full name');
    });

    it('should keep the original header when Escape is pressed', async () => {
      const harness = await createFixture({ columns: RENAMABLE_COLUMNS });
      const listener = vi.fn();
      harness.element.addEventListener('forge-data-table-column-rename', listener);

      const input = await startRename(harness, 'name');
      await userEvent.fill(input, 'Full name');
      await userEvent.keyboard('{Escape}');
      await settle(harness.element);

      expect(getRenameInput(harness, 'name')).toBeNull();
      expect(getHeaderText(harness, 'name')).toBe('Name');
      expect(listener).not.toHaveBeenCalled();
    });

    it('should keep the original header when the new name is blank', async () => {
      const harness = await createFixture({ columns: RENAMABLE_COLUMNS });
      const listener = vi.fn();
      harness.element.addEventListener('forge-data-table-column-rename', listener);

      const input = await startRename(harness, 'name');
      await userEvent.fill(input, '   ');
      await userEvent.keyboard('{Enter}');
      await settle(harness.element);

      expect(getHeaderText(harness, 'name')).toBe('Name');
      expect(listener).not.toHaveBeenCalled();
    });

    it('should not sort the column when clicking the rename input', async () => {
      const harness = await createFixture({ columns: RENAMABLE_COLUMNS, sortable: true });

      const input = await startRename(harness, 'name');
      await userEvent.click(input);
      await settle(harness.element);

      expect(harness.getHeaderCellById('name')?.classList.contains('sort-asc')).toBe(false);
      expect(getRenameInput(harness, 'name')).toBe(input);
    });

    it('should discard renames when the columns change', async () => {
      const harness = await createFixture({ columns: RENAMABLE_COLUMNS });

      const input = await startRename(harness, 'name');
      await userEvent.fill(input, 'Full name');
      await userEvent.keyboard('{Enter}');
      await settle(harness.element);

      harness.element.columns = [...TEST_COLUMNS];
      await settle(harness.element);

      expect(getHeaderText(harness, 'name')).toBe('Name');
    });
  });

  describe('Sorting', () => {
    describe('Single Column Sorting', () => {
      it('should enable sorting when sortable is true', async () => {
        const harness = await createFixture({ sortable: true });

        await harness.clickHeaderCell(1);

        const headerCell = harness.getHeaderCellById('name');
        expect(headerCell?.classList.contains('sort-asc') || headerCell?.classList.contains('sort-desc')).toBe(true);
      });

      it('should sort ascending on first click', async () => {
        const harness = await createFixture({ sortable: true });

        await harness.clickHeaderCell(1);

        const headerCell = harness.getHeaderCellById('name');
        expect(headerCell?.classList.contains('sort-asc')).toBe(true);
      });

      it('should sort descending on second click', async () => {
        const harness = await createFixture({ sortable: true });

        await harness.clickHeaderCell(1);
        await harness.clickHeaderCell(1);

        const headerCell = harness.getHeaderCellById('name');
        expect(headerCell?.classList.contains('sort-desc')).toBe(true);
      });

      it('should clear sort on third click', async () => {
        const harness = await createFixture({ sortable: true });

        await harness.clickHeaderCell(1);
        await harness.clickHeaderCell(1);
        await harness.clickHeaderCell(1);

        const headerCell = harness.getHeaderCellById('name');
        expect(headerCell?.classList.contains('sort-asc')).toBe(false);
        expect(headerCell?.classList.contains('sort-desc')).toBe(false);
      });

      it('should show sort icon when sorted', async () => {
        const harness = await createFixture({ sortable: true });

        await harness.clickHeaderCell(1);

        const sortIcon = harness.getSortIconForColumn('name');
        expect(sortIcon).not.toBeNull();
      });

      it('should apply sort-asc class when sorted ascending', async () => {
        const harness = await createFixture({ sortable: true });

        await harness.clickHeaderCell(1);
        await harness.element.updateComplete;

        const headerCell = harness.getHeaderCellById('name');
        expect(headerCell?.classList.contains('sort-asc')).toBe(true);
        expect(headerCell?.classList.contains('sort-desc')).toBe(false);
      });

      it('should apply sort-desc class when sorted descending', async () => {
        const harness = await createFixture({ sortable: true });

        await harness.clickHeaderCell(1);
        await harness.element.updateComplete;
        await harness.clickHeaderCell(1);
        await harness.element.updateComplete;

        const headerCell = harness.getHeaderCellById('name');
        expect(headerCell?.classList.contains('sort-asc')).toBe(false);
        expect(headerCell?.classList.contains('sort-desc')).toBe(true);
      });

      it('should emit sort event when manual sort is true', async () => {
        const harness = await createFixture({ sortable: true, manualSort: true });
        const events: SortingState[] = [];
        harness.element.addEventListener('forge-data-table-sort', (evt: Event) => events.push((evt as CustomEvent<SortingState>).detail));

        await harness.clickHeaderCell(1);

        expect(events.length).toBe(1);
        expect(events[0][0].id).toBe('name');
      });

      it('should not auto-sort data when manual sort is true', async () => {
        const harness = await createFixture({ sortable: true, manualSort: true });

        const firstCellBefore = harness.getBodyCellByRowAndColumn(0, 1);
        const firstNameBefore = firstCellBefore?.textContent?.trim();

        await harness.clickHeaderCell(1);

        const firstCellAfter = harness.getBodyCellByRowAndColumn(0, 1);
        const firstNameAfter = firstCellAfter?.textContent?.trim();

        expect(firstNameAfter).toBe(firstNameBefore);
      });

      it('should auto-sort data when manual sort is false', async () => {
        const harness = await createFixture({ sortable: true, manualSort: false });

        await harness.clickHeaderCell(1);

        const firstCell = harness.getBodyCellByRowAndColumn(0, 1);
        expect(firstCell?.textContent?.trim()).toBe('Alice');
      });
    });

    describe('Multi-Column Sorting', () => {
      it('should enable multi-sort when multiSort is true', async () => {
        const harness = await createFixture({ sortable: true, multiSort: true, multiSortKey: 'shift' });

        await harness.clickHeaderCell(1);
        await harness.element.updateComplete;
        await harness.clickHeaderCellWithModifier(2, 'shift');
        await harness.element.updateComplete;

        expect(harness.getSortIconForColumn('name')).not.toBeNull();
        expect(harness.getSortIconForColumn('age')).not.toBeNull();
      });

      it('should add to sort when modifier key pressed', async () => {
        const harness = await createFixture({ sortable: true, multiSort: true, multiSortKey: 'shift' });

        await harness.clickHeaderCell(1);
        await harness.clickHeaderCellWithModifier(2, 'shift');

        expect(harness.getSortIconForColumn('name')).not.toBeNull();
        expect(harness.getSortIconForColumn('age')).not.toBeNull();
      });

      it('should respect multiSortKey setting (shift)', async () => {
        const harness = await createFixture({ sortable: true, multiSort: true, multiSortKey: 'shift' });

        await harness.clickHeaderCell(1);
        await harness.clickHeaderCellWithModifier(2, 'shift');

        const sortIndex = harness.getSortIndexForColumn('age');
        expect(sortIndex).not.toBeNull();
      });

      it('should respect multiSortKey setting (ctrl)', async () => {
        const harness = await createFixture({ sortable: true, multiSort: true, multiSortKey: 'ctrl' });

        await harness.clickHeaderCell(1);
        await harness.clickHeaderCellWithModifier(2, 'ctrl');

        const sortIndex = harness.getSortIndexForColumn('age');
        expect(sortIndex).not.toBeNull();
      });

      it('should respect multiSortKey setting (meta)', async () => {
        const harness = await createFixture({ sortable: true, multiSort: true, multiSortKey: 'meta' });

        await harness.clickHeaderCell(1);
        await harness.clickHeaderCellWithModifier(2, 'meta');

        const sortIndex = harness.getSortIndexForColumn('age');
        expect(sortIndex).not.toBeNull();
      });

      it('should respect multiSortKey setting (alt)', async () => {
        const harness = await createFixture({ sortable: true, multiSort: true, multiSortKey: 'alt' });

        await harness.clickHeaderCell(1);
        await harness.clickHeaderCellWithModifier(2, 'alt');

        const sortIndex = harness.getSortIndexForColumn('age');
        expect(sortIndex).not.toBeNull();
      });

      it('should show sort index when multiple columns sorted', async () => {
        const harness = await createFixture({ sortable: true, multiSort: true });

        await harness.clickHeaderCell(1);
        await harness.clickHeaderCellWithModifier(2, 'shift');

        const sortIndex1 = harness.getSortIndexForColumn('name');
        const sortIndex2 = harness.getSortIndexForColumn('age');
        expect(sortIndex1?.textContent?.trim()).toBe('1');
        expect(sortIndex2?.textContent?.trim()).toBe('2');
      });

      it('should not show sort index when only one column sorted', async () => {
        const harness = await createFixture({ sortable: true, multiSort: true });

        await harness.clickHeaderCell(1);

        const sortIndex = harness.getSortIndexForColumn('name');
        expect(sortIndex).toBeNull();
      });

      it('should respect maxMultiSortColCount', async () => {
        const harness = await createFixture({ sortable: true, multiSort: true, maxMultiSortColCount: 2 });

        await harness.clickHeaderCell(0);
        await harness.clickHeaderCellWithModifier(1, 'shift');
        await harness.clickHeaderCellWithModifier(2, 'shift');

        const idHeader = harness.getHeaderCellById('id');
        expect(idHeader?.classList.contains('sort-asc')).toBe(false);
      });

      it('should remove from multi-sort when multiSortRemove is true', async () => {
        const harness = await createFixture({ sortable: true, multiSort: true, multiSortRemove: true });

        await harness.clickHeaderCell(1);
        await harness.element.updateComplete;
        await harness.clickHeaderCellWithModifier(2, 'shift');
        await harness.element.updateComplete;

        expect(harness.getSortIconForColumn('name')).not.toBeNull();
        expect(harness.getSortIconForColumn('age')).not.toBeNull();

        await harness.clickHeaderCell(1);
        await harness.element.updateComplete;
        await harness.clickHeaderCell(1);
        await harness.element.updateComplete;
        await harness.clickHeaderCell(1);
        await harness.element.updateComplete;

        const nameIcon = harness.getSortIconForColumn('name');
        expect(nameIcon).toBeNull();
      });

      it('should not remove from multi-sort when multiSortRemove is false', async () => {
        const harness = await createFixture({ sortable: true, multiSort: true, multiSortRemove: false });

        await harness.clickHeaderCell(1);
        await harness.clickHeaderCellWithModifier(2, 'shift');

        expect(harness.getSortIconForColumn('name')).not.toBeNull();
        expect(harness.getSortIconForColumn('age')).not.toBeNull();

        await harness.clickHeaderCell(1);
        await harness.clickHeaderCell(1);
        await harness.clickHeaderCell(1);

        expect(harness.getSortIconForColumn('name')).not.toBeNull();
      });

      it('should disable multi-sort when multiSort is false', async () => {
        const harness = await createFixture({ sortable: true, multiSort: false });

        await harness.clickHeaderCell(1);
        await harness.element.updateComplete;
        await harness.clickHeaderCellWithModifier(2, 'shift');
        await harness.element.updateComplete;

        expect(harness.getSortIconForColumn('name')).toBeNull();
        expect(harness.getSortIconForColumn('age')).not.toBeNull();
      });
    });
  });

  describe('Filtering', () => {
    it('should show filter inputs when filterable is true', async () => {
      const harness = await createFixture({ filterable: true });

      expect(harness.filterInputs.length).toBeGreaterThan(0);
    });

    it('should not show filter inputs when filterable is false', async () => {
      const harness = await createFixture({ filterable: false });

      expect(harness.filterInputs.length).toBe(0);
    });

    it('should filter data when typing in text filter', async () => {
      const harness = await createFixture({ filterable: true, manualFilter: false });

      await harness.typeIntoFilter(1, 'Alice');

      expect(harness.bodyRows.length).toBe(1);
      const firstCell = harness.getBodyCellByRowAndColumn(0, 1);
      expect(firstCell?.textContent?.trim()).toBe('Alice');
    });

    it('should emit filter event when manual filter is true', async () => {
      const harness = await createFixture({ filterable: true, manualFilter: true });
      const events: ColumnFiltersState[] = [];
      harness.element.addEventListener('forge-data-table-filter', (evt: Event) => events.push((evt as CustomEvent<ColumnFiltersState>).detail));

      await harness.typeIntoFilter(1, 'Alice');

      expect(events.length).toBeGreaterThan(0);
    });

    it('should not auto-filter data when manual filter is true', async () => {
      const harness = await createFixture({ filterable: true, manualFilter: true });

      await harness.typeIntoFilter(1, 'Alice');

      expect(harness.bodyRows.length).toBe(3);
    });

    it('should auto-filter data when manual filter is false', async () => {
      const harness = await createFixture({ filterable: true, manualFilter: false });

      await harness.typeIntoFilter(1, 'Bob');

      expect(harness.bodyRows.length).toBe(1);
    });

    it('should render text filter by default', async () => {
      const harness = await createFixture({ filterable: true });

      const input = harness.filterInputs[0];
      expect(input.type).toBe('text');
    });

    it('should render number filter when filterType is number', async () => {
      const columns: ColumnDef<TestData>[] = [{ id: 'age', header: 'Age', property: 'age', filterType: 'number' }];
      const harness = await createFixture({ columns, filterable: true });

      const input = harness.filterInputs[0];
      expect(input.type).toBe('number');
    });

    it('should render range filter when filterType is range', async () => {
      const columns: ColumnDef<TestData>[] = [{ id: 'age', header: 'Age', property: 'age', filterType: 'range' }];
      const harness = await createFixture({ columns, filterable: true });

      const rangeContainer = harness.shadowRoot.querySelector('.range-filter-container');
      expect(rangeContainer).not.toBeNull();
      const inputs = rangeContainer?.querySelectorAll('input');
      expect(inputs?.length).toBe(2);
    });

    it('should render select filter when filterType is select', async () => {
      const columns: ColumnDef<TestData>[] = [{ id: 'name', header: 'Name', property: 'name', filterType: 'select' }];
      const harness = await createFixture({ columns, filterable: true });

      const select = harness.shadowRoot.querySelector('forge-select');
      expect(select).not.toBeNull();
    });

    it('should render date filter when filterType is date', async () => {
      const columns: ColumnDef<TestData>[] = [{ id: 'name', header: 'Name', property: 'name', filterType: 'date' }];
      const harness = await createFixture({ columns, filterable: true });

      const datePicker = harness.shadowRoot.querySelector('forge-date-picker');
      expect(datePicker).not.toBeNull();
    });

    it('should filter by multiple columns simultaneously', async () => {
      const harness = await createFixture({ filterable: true, manualFilter: false });

      await harness.typeIntoFilter(1, 'Alice');
      await harness.element.updateComplete;

      expect(harness.bodyRows.length).toBeGreaterThan(0);

      await harness.typeIntoFilter(2, '30');
      await harness.element.updateComplete;

      expect(harness.bodyRows.length).toBeGreaterThan(0);
      if (harness.bodyRows.length > 0) {
        const firstCell = harness.getBodyCellByRowAndColumn(0, 1);
        expect(firstCell?.textContent?.trim()).toBe('Alice');
      }
    });

    it('should clear filter when input is cleared', async () => {
      const harness = await createFixture({ filterable: true, manualFilter: false });

      await harness.typeIntoFilter(1, 'Alice');
      expect(harness.bodyRows.length).toBe(1);

      await harness.typeIntoFilter(1, '');

      expect(harness.bodyRows.length).toBe(3);
    });
  });

  describe('Row Selection', () => {
    describe('Selection Off', () => {
      it('should not show select column when rowSelection is off', async () => {
        const harness = await createFixture({ rowSelection: 'off' });

        expect(harness.selectColumnCheckboxes.length).toBe(0);
      });

      it('should not select rows when rowSelection is off', async () => {
        const harness = await createFixture({ rowSelection: 'off' });

        await harness.clickBodyRow(0);

        expect(harness.bodyRows[0].classList.contains('selected')).toBe(false);
      });
    });

    describe('Single Selection', () => {
      it('should show select column when rowSelection is single', async () => {
        const harness = await createFixture({ rowSelection: 'single' });

        expect(harness.selectColumnCheckboxes.length).toBeGreaterThan(0);
      });

      it('should not show header checkbox when rowSelection is single', async () => {
        const harness = await createFixture({ rowSelection: 'single' });

        const headerCheckbox = harness.shadowRoot.querySelector('thead forge-checkbox');
        expect(headerCheckbox).toBeNull();
      });

      it('should select single row', async () => {
        const harness = await createFixture({ rowSelection: 'single' });

        await harness.clickRowCheckbox(0);

        expect(harness.bodyRows[0].classList.contains('selected')).toBe(true);
      });

      it('should deselect previous row when selecting new row', async () => {
        const harness = await createFixture({ rowSelection: 'single' });

        await harness.clickRowCheckbox(0);
        expect(harness.bodyRows[0].classList.contains('selected')).toBe(true);

        await harness.clickRowCheckbox(1);
        expect(harness.bodyRows[0].classList.contains('selected')).toBe(false);
        expect(harness.bodyRows[1].classList.contains('selected')).toBe(true);
      });

      it('should emit row select event', async () => {
        const harness = await createFixture({ rowSelection: 'single' });
        const events: Record<string, boolean>[] = [];
        harness.element.addEventListener('forge-data-table-row-select', (evt: Event) => events.push((evt as CustomEvent<Record<string, boolean>>).detail));

        await harness.clickRowCheckbox(0);

        expect(events.length).toBe(1);
        expect(events[0]['0']).toBe(true);
      });

      it('should apply selected class to selected row', async () => {
        const harness = await createFixture({ rowSelection: 'single' });

        await harness.clickRowCheckbox(1);

        expect(harness.bodyRows[1].classList.contains('selected')).toBe(true);
      });
    });

    describe('Multiple Selection', () => {
      it('should show select column when rowSelection is multiple', async () => {
        const harness = await createFixture({ rowSelection: 'multiple' });

        expect(harness.selectColumnCheckboxes.length).toBeGreaterThan(0);
      });

      it('should show header checkbox when rowSelection is multiple', async () => {
        const harness = await createFixture({ rowSelection: 'multiple' });

        const headerCheckbox = harness.shadowRoot.querySelector('thead forge-checkbox');
        expect(headerCheckbox).not.toBeNull();
      });

      it('should select multiple rows', async () => {
        const harness = await createFixture({ rowSelection: 'multiple' });

        await harness.clickRowCheckbox(0);
        await harness.clickRowCheckbox(1);

        expect(harness.bodyRows[0].classList.contains('selected')).toBe(true);
        expect(harness.bodyRows[1].classList.contains('selected')).toBe(true);
      });

      it('should toggle row selection', async () => {
        const harness = await createFixture({ rowSelection: 'multiple' });

        await harness.clickRowCheckbox(0);
        expect(harness.bodyRows[0].classList.contains('selected')).toBe(true);

        await harness.clickRowCheckbox(0);
        expect(harness.bodyRows[0].classList.contains('selected')).toBe(false);
      });

      it('should select all rows when header checkbox clicked', async () => {
        const harness = await createFixture({ rowSelection: 'multiple' });

        await harness.clickHeaderCheckbox();

        expect(harness.bodyRows[0].classList.contains('selected')).toBe(true);
        expect(harness.bodyRows[1].classList.contains('selected')).toBe(true);
        expect(harness.bodyRows[2].classList.contains('selected')).toBe(true);
      });

      it('should deselect all rows when header checkbox clicked again', async () => {
        const harness = await createFixture({ rowSelection: 'multiple' });

        await harness.clickHeaderCheckbox();
        await harness.clickHeaderCheckbox();

        expect(harness.bodyRows[0].classList.contains('selected')).toBe(false);
        expect(harness.bodyRows[1].classList.contains('selected')).toBe(false);
        expect(harness.bodyRows[2].classList.contains('selected')).toBe(false);
      });

      it('should show indeterminate state when some rows selected', async () => {
        const harness = await createFixture({ rowSelection: 'multiple' });

        await harness.clickRowCheckbox(0);

        const headerCheckbox = harness.shadowRoot.querySelector('thead forge-checkbox') as any;
        expect(headerCheckbox.indeterminate).toBe(true);
      });

      it('should emit row select event with all selections', async () => {
        const harness = await createFixture({ rowSelection: 'multiple' });
        const events: Record<string, boolean>[] = [];
        harness.element.addEventListener('forge-data-table-row-select', (evt: Event) => events.push((evt as CustomEvent<Record<string, boolean>>).detail));

        await harness.clickRowCheckbox(0);
        await harness.clickRowCheckbox(1);

        expect(events.length).toBe(2);
        expect(events[1]['0']).toBe(true);
        expect(events[1]['1']).toBe(true);
      });

      it('should apply selected class to all selected rows', async () => {
        const harness = await createFixture({ rowSelection: 'multiple' });

        await harness.clickHeaderCheckbox();

        harness.bodyRows.forEach(row => {
          expect(row.classList.contains('selected')).toBe(true);
        });
      });
    });

    describe('Selection Mode Changes', () => {
      it('should add select column when changing from off to single', async () => {
        const harness = await createFixture({ rowSelection: 'off' });

        expect(harness.selectColumnCheckboxes.length).toBe(0);

        harness.element.rowSelection = 'single';
        await harness.element.updateComplete;

        expect(harness.selectColumnCheckboxes.length).toBeGreaterThan(0);
      });

      it('should add select column when changing from off to multiple', async () => {
        const harness = await createFixture({ rowSelection: 'off' });

        expect(harness.selectColumnCheckboxes.length).toBe(0);

        harness.element.rowSelection = 'multiple';
        await harness.element.updateComplete;

        expect(harness.selectColumnCheckboxes.length).toBeGreaterThan(0);
      });

      it('should remove select column when changing from single to off', async () => {
        const harness = await createFixture({ rowSelection: 'single' });

        expect(harness.selectColumnCheckboxes.length).toBeGreaterThan(0);

        harness.element.rowSelection = 'off';
        await harness.element.updateComplete;

        expect(harness.selectColumnCheckboxes.length).toBe(0);
      });

      it('should remove select column when changing from multiple to off', async () => {
        const harness = await createFixture({ rowSelection: 'multiple' });

        expect(harness.selectColumnCheckboxes.length).toBeGreaterThan(0);

        harness.element.rowSelection = 'off';
        await harness.element.updateComplete;

        expect(harness.selectColumnCheckboxes.length).toBe(0);
      });

      it('should update header checkbox when changing from single to multiple', async () => {
        const harness = await createFixture({ rowSelection: 'single' });

        expect(harness.shadowRoot.querySelector('thead forge-checkbox')).toBeNull();

        harness.element.rowSelection = 'multiple';
        await harness.element.updateComplete;

        expect(harness.shadowRoot.querySelector('thead forge-checkbox')).not.toBeNull();
      });

      it('should remove header checkbox when changing from multiple to single', async () => {
        const harness = await createFixture({ rowSelection: 'multiple' });

        expect(harness.shadowRoot.querySelector('thead forge-checkbox')).not.toBeNull();

        harness.element.rowSelection = 'single';
        await harness.element.updateComplete;

        expect(harness.shadowRoot.querySelector('thead forge-checkbox')).toBeNull();
      });

      it('should clear selection when changing from multiple to single', async () => {
        const harness = await createFixture({ rowSelection: 'multiple' });

        await harness.clickRowCheckbox(0);
        await harness.clickRowCheckbox(1);
        expect(harness.bodyRows[0].classList.contains('selected')).toBe(true);
        expect(harness.bodyRows[1].classList.contains('selected')).toBe(true);

        harness.element.rowSelection = 'single';
        await harness.element.updateComplete;

        const rowsStillSelected = harness.bodyRows.filter(row => row.classList.contains('selected'));
        expect(rowsStillSelected.length).toBeLessThanOrEqual(1);
      });
    });
  });

  describe('Row Interactions', () => {
    it('should emit row click event when allowRowClick is true', async () => {
      const harness = await createFixture({ allowRowClick: true });
      const events: { data: unknown; index: number }[] = [];
      harness.element.addEventListener('forge-data-table-row-click', (evt: Event) =>
        events.push((evt as CustomEvent<{ data: unknown; index: number }>).detail)
      );

      await harness.clickBodyRow(0);

      expect(events.length).toBe(1);
    });

    it('should not emit row click event when allowRowClick is false', async () => {
      const harness = await createFixture({ allowRowClick: false });
      const events: { data: unknown; index: number }[] = [];
      harness.element.addEventListener('forge-data-table-row-click', (evt: Event) =>
        events.push((evt as CustomEvent<{ data: unknown; index: number }>).detail)
      );

      await harness.clickBodyRow(0);

      expect(events.length).toBe(0);
    });

    it('should include row data in click event', async () => {
      const harness = await createFixture({ allowRowClick: true });
      const events: { data: unknown; index: number }[] = [];
      harness.element.addEventListener('forge-data-table-row-click', (evt: Event) =>
        events.push((evt as CustomEvent<{ data: unknown; index: number }>).detail)
      );

      await harness.clickBodyRow(0);

      expect(events[0].data).toEqual(TEST_DATA[0]);
    });

    it('should include row index in click event', async () => {
      const harness = await createFixture({ allowRowClick: true });
      const events: { data: unknown; index: number }[] = [];
      harness.element.addEventListener('forge-data-table-row-click', (evt: Event) =>
        events.push((evt as CustomEvent<{ data: unknown; index: number }>).detail)
      );

      await harness.clickBodyRow(1);

      expect(events[0].index).toBe(1);
    });

    it('should not emit click when clicking select column', async () => {
      const harness = await createFixture({ allowRowClick: true, rowSelection: 'single' });
      const events: { data: unknown; index: number }[] = [];
      harness.element.addEventListener('forge-data-table-row-click', (evt: Event) =>
        events.push((evt as CustomEvent<{ data: unknown; index: number }>).detail)
      );

      await harness.clickRowCheckbox(0);

      expect(events.length).toBe(0);
    });

    it('should not emit click when clicking cell with stopRowClickPropagation', async () => {
      const columns: ColumnDef<TestData>[] = [
        { id: 'id', header: 'ID', property: 'id', stopRowClickPropagation: true },
        { id: 'name', header: 'Name', property: 'name' }
      ];
      const harness = await createFixture({ columns, allowRowClick: true });
      const events: { data: unknown; index: number }[] = [];
      harness.element.addEventListener('forge-data-table-row-click', (evt: Event) =>
        events.push((evt as CustomEvent<{ data: unknown; index: number }>).detail)
      );

      await harness.clickBodyCell(0, 0);

      expect(events.length).toBe(0);
    });

    it('should stop row click propagation on checkbox cell', async () => {
      const harness = await createFixture({ allowRowClick: true, rowSelection: 'single' });
      const events: { data: unknown; index: number }[] = [];
      harness.element.addEventListener('forge-data-table-row-click', (evt: Event) =>
        events.push((evt as CustomEvent<{ data: unknown; index: number }>).detail)
      );

      const selectCell = harness.getBodyCellByRowAndColumn(0, 0);
      await userEvent.click(selectCell!);

      expect(events.length).toBe(0);
    });
  });

  describe('Expandable Rows', () => {
    it('should render expander column when expandable is true', async () => {
      const columns: ColumnDef<TestData>[] = [
        createExpanderColumn(),
        { id: 'name', header: 'Name', property: 'name' },
        { id: 'age', header: 'Age', property: 'age' }
      ];
      const harness = await createFixture({ columns, expandable: true });

      const expanderCell = harness.shadowRoot.querySelector('td[id="expander"]');
      expect(expanderCell).not.toBeNull();

      const iconButton = expanderCell?.querySelector('forge-icon-button');
      expect(iconButton).not.toBeNull();
    });

    it('should expand row when expander clicked', async () => {
      const columns: ColumnDef<TestData>[] = [createExpanderColumn(), { id: 'name', header: 'Name', property: 'name' }];
      const harness = await createFixture({ columns, expandable: true });

      const firstRow = harness.getBodyRowByIndex(0);
      const expanderCell = firstRow?.querySelector('td[id="expander"]');
      const iconButton = expanderCell?.querySelector('forge-icon-button') as HTMLElement;

      iconButton.click();
      await harness.element.updateComplete;

      const expandedRows = harness.shadowRoot.querySelectorAll('.expanded-content');
      expect(expandedRows.length).toBeGreaterThan(0);
    });

    it('should collapse row when expander clicked again', async () => {
      const columns: ColumnDef<TestData>[] = [createExpanderColumn(), { id: 'name', header: 'Name', property: 'name' }];
      const harness = await createFixture({ columns, expandable: true });

      const firstRow = harness.getBodyRowByIndex(0);
      const expanderCell = firstRow?.querySelector('td[id="expander"]');
      const iconButton = expanderCell?.querySelector('forge-icon-button') as HTMLElement;

      iconButton.click();
      await harness.element.updateComplete;

      let expandedRows = harness.shadowRoot.querySelectorAll('.expanded-content');
      expect(expandedRows.length).toBeGreaterThan(0);

      iconButton.click();
      await harness.element.updateComplete;

      expandedRows = harness.shadowRoot.querySelectorAll('.expanded-content');
      expect(expandedRows.length).toBe(0);
    });

    it('should show expanded content slot', async () => {
      const columns: ColumnDef<TestData>[] = [createExpanderColumn(), { id: 'name', header: 'Name', property: 'name' }];
      const harness = await createFixture({ columns, expandable: true });

      const firstRow = harness.getBodyRowByIndex(0);
      const expanderCell = firstRow?.querySelector('td[id="expander"]');
      const iconButton = expanderCell?.querySelector('forge-icon-button') as HTMLElement;

      iconButton.click();
      await harness.element.updateComplete;

      const expandedContent = harness.shadowRoot.querySelector('.expanded-content');
      expect(expandedContent).not.toBeNull();

      const slot = expandedContent?.querySelector('slot');
      expect(slot).not.toBeNull();
      expect(slot?.getAttribute('name')).toMatch(/^expanded:row-/);
    });

    it('should render expanded row with full colspan', async () => {
      const columns: ColumnDef<TestData>[] = [
        createExpanderColumn(),
        { id: 'name', header: 'Name', property: 'name' },
        { id: 'age', header: 'Age', property: 'age' }
      ];
      const harness = await createFixture({ columns, expandable: true });

      const firstRow = harness.getBodyRowByIndex(0);
      const expanderCell = firstRow?.querySelector('td[id="expander"]');
      const iconButton = expanderCell?.querySelector('forge-icon-button') as HTMLElement;

      iconButton.click();
      await harness.element.updateComplete;

      const expandedRow = harness.shadowRoot.querySelector('tr:has(.expanded-content)');
      const expandedCell = expandedRow?.querySelector('td');

      expect(expandedCell?.getAttribute('colspan')).toBe('3');
    });
  });

  describe('Virtualization', () => {
    it('should create virtualizer when virtualized is true', async () => {
      const largeData = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        name: `User ${i}`,
        age: 20 + (i % 50),
        email: `user${i}@example.com`
      }));
      const harness = await createFixture({ data: largeData, virtualized: true });

      expect(harness.tbodyElement?.classList.contains('virtualized-tbody')).toBe(true);
    });

    it('should not create virtualizer when virtualized is false', async () => {
      const harness = await createFixture({ virtualized: false });

      expect(harness.tbodyElement?.classList.contains('virtualized-tbody')).toBe(false);
      expect(harness.tbodyElement?.classList.contains('standard-tbody')).toBe(true);
    });

    it('should render only visible rows', async () => {
      const largeData = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        name: `User ${i}`,
        age: 20 + (i % 50),
        email: `user${i}@example.com`
      }));
      const harness = await createFixture({ data: largeData, virtualized: true });

      expect(harness.bodyRows.length).toBeLessThan(largeData.length);
    });

    it('should update virtualizer when data changes', async () => {
      const initialData = Array.from({ length: 10 }, (_, i) => ({
        id: i,
        name: `User ${i}`,
        age: 20 + i,
        email: `user${i}@example.com`
      }));
      const harness = await createFixture({ data: initialData, virtualized: true });

      const initialRowCount = harness.bodyRows.length;

      const newData = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        name: `User ${i}`,
        age: 20 + i,
        email: `user${i}@example.com`
      }));
      await harness.setData(newData);

      const newRowCount = harness.bodyRows.length;
      expect(newRowCount).toBeGreaterThanOrEqual(initialRowCount);
    });

    it('should use compact row height when compact is true', async () => {
      const largeData = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        name: `User ${i}`,
        age: 20 + i,
        email: `user${i}@example.com`
      }));
      const harness = await createFixture({ data: largeData, virtualized: true, compact: true });

      const virtualizedRow = harness.shadowRoot.querySelector('tr.virtualized-tr') as HTMLElement;
      expect(virtualizedRow).not.toBeNull();

      const height = virtualizedRow.style.height;
      expect(height).toBe('32px');
    });

    it('should use default row height when compact is false', async () => {
      const largeData = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        name: `User ${i}`,
        age: 20 + i,
        email: `user${i}@example.com`
      }));
      const harness = await createFixture({ data: largeData, virtualized: true, compact: false });

      const virtualizedRow = harness.shadowRoot.querySelector('tr.virtualized-tr') as HTMLElement;
      expect(virtualizedRow).not.toBeNull();

      const height = virtualizedRow.style.height;
      expect(height).toBe('48px');
    });

    it('should position rows absolutely with transform', async () => {
      const largeData = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        name: `User ${i}`,
        age: 20 + i,
        email: `user${i}@example.com`
      }));
      const harness = await createFixture({ data: largeData, virtualized: true });

      const virtualizedRow = harness.shadowRoot.querySelector('tr.virtualized-tr') as HTMLElement;
      expect(virtualizedRow).not.toBeNull();
      expect(virtualizedRow.style.position).toBe('absolute');
      expect(virtualizedRow.style.transform).toMatch(/translateY\(/);
    });

    it('should set tbody height to total size', async () => {
      const largeData = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        name: `User ${i}`,
        age: 20 + i,
        email: `user${i}@example.com`
      }));
      const harness = await createFixture({ data: largeData, virtualized: true });

      const tbody = harness.tbodyElement;
      const computedStyle = window.getComputedStyle(tbody!);
      const height = parseInt(computedStyle.height, 10);

      expect(height).toBeGreaterThan(1000);
    });

    it('should cleanup virtualizer when virtualized changes to false', async () => {
      const largeData = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        name: `User ${i}`,
        age: 20 + i,
        email: `user${i}@example.com`
      }));
      const harness = await createFixture({ data: largeData, virtualized: true });

      expect(harness.tbodyElement?.classList.contains('virtualized-tbody')).toBe(true);

      harness.element.virtualized = false;
      await harness.element.updateComplete;

      expect(harness.tbodyElement?.classList.contains('virtualized-tbody')).toBe(false);
      expect(harness.tbodyElement?.classList.contains('standard-tbody')).toBe(true);
    });
  });

  describe('Footer', () => {
    it('should not render footer when no columns have footer', async () => {
      const harness = await createFixture();

      expect(harness.tfootElement).toBeNull();
    });

    it('should render footer when columns have footer', async () => {
      const columns: ColumnDef<TestData>[] = [
        { id: 'id', header: 'ID', property: 'id', footer: 'Total' },
        { id: 'name', header: 'Name', property: 'name' }
      ];
      const harness = await createFixture({ columns });

      expect(harness.tfootElement).not.toBeNull();
      expect(harness.footerCells.length).toBeGreaterThan(0);
    });

    it('should render static footer text', async () => {
      const columns: ColumnDef<TestData>[] = [
        { id: 'id', header: 'ID', property: 'id', footer: 'Total Rows' },
        { id: 'name', header: 'Name', property: 'name' }
      ];
      const harness = await createFixture({ columns });

      const footerCell = harness.footerCells[0];
      expect(footerCell.textContent?.trim()).toBe('Total Rows');
    });

    it('should render dynamic footer from callback', async () => {
      const columns: ColumnDef<TestData>[] = [
        { id: 'id', header: 'ID', property: 'id', footer: ({ data }) => `Count: ${data.length}` },
        { id: 'name', header: 'Name', property: 'name' }
      ];
      const harness = await createFixture({ columns });

      const footerCell = harness.footerCells[0];
      expect(footerCell.textContent?.trim()).toBe('Count: 3');
    });

    it('should pass filtered data to footer callback', async () => {
      const columns: ColumnDef<TestData>[] = [
        { id: 'name', header: 'Name', property: 'name' },
        { id: 'age', header: 'Age', property: 'age', footer: ({ data }) => `Avg: ${(data.reduce((sum, d) => sum + d.age, 0) / data.length).toFixed(0)}` }
      ];
      const harness = await createFixture({ columns, filterable: true, manualFilter: false });

      await harness.typeIntoFilter(0, 'Alice');

      const footerCell = harness.footerCells[1];
      expect(footerCell.textContent?.trim()).toBe('Avg: 30');
    });

    it('should update footer when data changes', async () => {
      const columns: ColumnDef<TestData>[] = [{ id: 'id', header: 'ID', property: 'id', footer: ({ data }) => `Total: ${data.length}` }];
      const harness = await createFixture({ columns });

      expect(harness.footerCells[0].textContent?.trim()).toBe('Total: 3');

      await harness.setData([TEST_DATA[0]]);

      expect(harness.footerCells[0].textContent?.trim()).toBe('Total: 1');
    });

    it('should render the aggregated value in the footer when a column has an aggregate', async () => {
      const columns: ColumnDef<TestData>[] = [{ id: 'age', header: 'Age', property: 'age', aggregate: 'sum' }];
      const harness = await createFixture({ columns });

      expect(harness.footerCells[0].textContent?.trim()).toBe('90');
    });

    it('should render a range in the footer when the aggregate is extent', async () => {
      const columns: ColumnDef<TestData>[] = [{ id: 'age', header: 'Age', property: 'age', aggregate: 'extent' }];
      const harness = await createFixture({ columns });

      expect(harness.footerCells[0].textContent?.trim()).toBe('25 – 35');
    });

    it('should aggregate with a custom aggregation function', async () => {
      const aggregate = constructAggregationFn({ aggregate: ({ rows }) => `${rows.length} people` });
      const columns: ColumnDef<TestData>[] = [{ id: 'name', header: 'Name', property: 'name', aggregate }];
      const harness = await createFixture({ columns });

      expect(harness.footerCells[0].textContent?.trim()).toBe('3 people');
    });

    it('should aggregate only the filtered rows', async () => {
      const columns: ColumnDef<TestData>[] = [
        { id: 'name', header: 'Name', property: 'name' },
        { id: 'age', header: 'Age', property: 'age', aggregate: 'mean' }
      ];
      const harness = await createFixture({ columns, filterable: true, manualFilter: false });

      await harness.typeIntoFilter(0, 'Alice');

      expect(harness.footerCells[1].textContent?.trim()).toBe('30');
    });

    it('should update the aggregated value when data changes', async () => {
      const columns: ColumnDef<TestData>[] = [{ id: 'age', header: 'Age', property: 'age', aggregate: 'sum' }];
      const harness = await createFixture({ columns });

      await harness.setData([TEST_DATA[0]]);

      expect(harness.footerCells[0].textContent?.trim()).toBe('30');
    });

    it('should aggregate the raw property value when the column has a formatter', async () => {
      const columns: ColumnDef<TestData>[] = [{ id: 'age', header: 'Age', property: 'age', format: new NumberFormatter(), aggregate: 'sum' }];
      const harness = await createFixture({ columns });

      expect(harness.footerCells[0].textContent?.trim()).toBe('90');
    });

    it('should apply the column formatter to the aggregated value', async () => {
      const columns: ColumnDef<TestData>[] = [{ id: 'age', header: 'Age', property: 'age', format: new CurrencyFormatter(), aggregate: 'sum' }];
      const harness = await createFixture({ columns });

      expect(harness.footerCells[0].textContent?.trim()).toBe(new CurrencyFormatter().format(90));
    });

    it('should apply the column formatter to each end of an extent range', async () => {
      const columns: ColumnDef<TestData>[] = [{ id: 'age', header: 'Age', property: 'age', format: new CurrencyFormatter(), aggregate: 'extent' }];
      const harness = await createFixture({ columns });

      const formatter = new CurrencyFormatter();
      expect(harness.footerCells[0].textContent?.trim()).toBe(`${formatter.format(25)} – ${formatter.format(35)}`);
    });

    it('should not apply the column formatter to a count', async () => {
      const columns: ColumnDef<TestData>[] = [{ id: 'age', header: 'Age', property: 'age', format: new CurrencyFormatter(), aggregate: 'count' }];
      const harness = await createFixture({ columns });

      expect(harness.footerCells[0].textContent?.trim()).toBe('3');
    });

    it.each([
      ['NumberFormatter', () => new NumberFormatter()],
      ['CurrencyFormatter', () => new CurrencyFormatter()]
    ])('should align the aggregated footer cell to end when a %s is used', async (_name, createFormatter) => {
      const columns: ColumnDef<TestData>[] = [{ header: 'Age', property: 'age', format: createFormatter(), aggregate: 'sum' }];
      const harness = await createFixture({ columns });

      expect(getComputedStyle(harness.footerCells[0]).textAlign).toBe('end');
    });

    it('should align the aggregated footer cell when align is set', async () => {
      const columns: ColumnDef<TestData>[] = [{ header: 'Age', property: 'age', aggregate: 'sum', align: 'center' }];
      const harness = await createFixture({ columns });

      expect(getComputedStyle(harness.footerCells[0]).textAlign).toBe('center');
    });

    it('should not align a static footer cell when align is set', async () => {
      const columns: ColumnDef<TestData>[] = [{ header: 'Age', property: 'age', footer: 'Total', aggregate: 'sum', align: 'end' }];
      const harness = await createFixture({ columns });

      expect(getComputedStyle(harness.footerCells[0]).textAlign).not.toBe('end');
    });

    it('should prefer a static footer over the aggregated value', async () => {
      const columns: ColumnDef<TestData>[] = [{ id: 'age', header: 'Age', property: 'age', footer: 'Total', aggregate: 'sum' }];
      const harness = await createFixture({ columns });

      expect(harness.footerCells[0].textContent?.trim()).toBe('Total');
    });

    it('should pass the aggregated value to the footer callback', async () => {
      const columns: ColumnDef<TestData>[] = [
        { id: 'age', header: 'Age', property: 'age', aggregate: 'sum', footer: ({ aggregate }) => `Total: ${aggregate}` }
      ];
      const harness = await createFixture({ columns });

      expect(harness.footerCells[0].textContent?.trim()).toBe('Total: 90');
    });

    it('should apply correct colspan to footer cells', async () => {
      const columns: ColumnDef<TestData>[] = [
        {
          id: 'group',
          header: 'Group',
          footer: 'Group Footer',
          columns: [
            { id: 'child1', header: 'Child 1', property: 'name' },
            { id: 'child2', header: 'Child 2', property: 'age' }
          ]
        }
      ];
      const harness = await createFixture({ columns });

      const footerCells = harness.shadowRoot.querySelectorAll('tfoot th');
      expect(footerCells.length).toBeGreaterThan(0);
      const parentFooterCell = Array.from(footerCells).find(cell => cell.textContent?.includes('Group Footer'));
      expect(parentFooterCell?.getAttribute('colspan')).toBe('2');
    });
  });

  describe('Editable Columns', () => {
    it('should render an input with the cell value when the column is editable', async () => {
      const columns: ColumnDef<TestData>[] = [{ header: 'Name', property: 'name', editable: true }];
      const harness = await createFixture({ columns });

      const inputs = harness.shadowRoot.querySelectorAll<HTMLInputElement>('tbody td input');
      expect(Array.from(inputs).map(input => input.value)).toEqual(['Alice', 'Bob', 'Charlie']);
    });

    it('should label the input with the column header', async () => {
      const columns: ColumnDef<TestData>[] = [{ header: 'Name', property: 'name', editable: true }];
      const harness = await createFixture({ columns });

      expect(harness.shadowRoot.querySelector('tbody td input')?.getAttribute('aria-label')).toBe('Name');
    });

    it('should not render an input when the column is not editable', async () => {
      const columns: ColumnDef<TestData>[] = [{ header: 'Name', property: 'name', editable: false }];
      const harness = await createFixture({ columns });

      expect(harness.shadowRoot.querySelector('tbody td input')).toBeNull();
      expect(harness.bodyCells[0].textContent?.trim()).toBe('Alice');
    });

    it('should render an input only in rows where the editable function returns true', async () => {
      const columns: ColumnDef<TestData>[] = [{ header: 'Name', property: 'name', editable: row => row.age > 28 }];
      const harness = await createFixture({ columns });

      const hasInput = harness.bodyCells.map(cell => !!cell.querySelector('input'));
      expect(hasInput).toEqual([true, false, true]);
    });

    it('should cover the entire cell with the input', async () => {
      const columns: ColumnDef<TestData>[] = [{ header: 'Name', property: 'name', editable: true }];
      const harness = await createFixture({ columns });

      const cell = harness.bodyCells[0].getBoundingClientRect();
      const input = harness.shadowRoot.querySelector('tbody td input') as HTMLInputElement;
      const inputRect = input.getBoundingClientRect();

      expect(inputRect.left).toBeCloseTo(cell.left, 0);
      expect(inputRect.top).toBeCloseTo(cell.top, 0);
      expect(inputRect.width).toBeCloseTo(cell.width, 0);
      expect(inputRect.height).toBeCloseTo(cell.height - 1, 0);
    });

    it('should show the focus indicator only when the input is focused', async () => {
      const columns: ColumnDef<TestData>[] = [{ header: 'Name', property: 'name', editable: true }];
      const harness = await createFixture({ columns });
      const input = harness.shadowRoot.querySelector('tbody td input') as HTMLInputElement;
      const wrapper = input.parentElement as HTMLElement;

      expect(getComputedStyle(wrapper, '::after').display).not.toBe('block');

      await userEvent.click(input);

      expect(getComputedStyle(wrapper, '::after').display).toBe('block');
    });
  });

  describe('Styling Options', () => {
    it('should apply striped custom state when striped is true', async () => {
      const harness = await createFixture({ striped: true });

      expect(harness.hasCustomState('striped')).toBe(true);
    });

    it('should apply hover custom state when hover is true', async () => {
      const harness = await createFixture({ hover: true });

      expect(harness.hasCustomState('hover')).toBe(true);
    });

    it('should apply compact custom state when compact is true', async () => {
      const harness = await createFixture({ compact: true });

      expect(harness.hasCustomState('compact')).toBe(true);
    });

    it('should apply bordered custom state when bordered is true', async () => {
      const harness = await createFixture({ bordered: true });

      expect(harness.hasCustomState('bordered')).toBe(true);
    });

    it('should apply fixed-headers custom state when fixedHeaders is true', async () => {
      const harness = await createFixture({ fixedHeaders: true });

      expect(harness.hasCustomState('fixed-headers')).toBe(true);
    });

    it('should apply resizable custom state when resizable is true', async () => {
      const harness = await createFixture({ resizable: true });

      expect(harness.hasCustomState('resizable')).toBe(true);
    });

    it('should apply filterable custom state when filterable is true', async () => {
      const harness = await createFixture({ filterable: true });

      expect(harness.hasCustomState('filterable')).toBe(true);
    });

    it('should apply row-selection custom state when rowSelection is not off', async () => {
      const harness = await createFixture({ rowSelection: 'single' });

      expect(harness.hasCustomState('row-selection')).toBe(true);
    });

    it('should apply allow-row-click custom state when allowRowClick is true', async () => {
      const harness = await createFixture({ allowRowClick: true });

      expect(harness.hasCustomState('allow-row-click')).toBe(true);
    });

    it('should apply virtualized custom state when virtualized is true', async () => {
      const harness = await createFixture({ virtualized: true });

      expect(harness.hasCustomState('virtualized')).toBe(true);
    });

    it('should update custom states when properties change', async () => {
      const harness = await createFixture({ striped: false });

      expect(harness.hasCustomState('striped')).toBe(false);

      harness.element.striped = true;
      await harness.element.updateComplete;

      expect(harness.hasCustomState('striped')).toBe(true);
    });
  });

  describe('Data Source', () => {
    it('should call fetch on the data source when rendered', async () => {
      const fetcher = vi.fn(() => TEST_DATA);
      await createFixture({ dataSource: new DataSource<TestData>(fetcher) });

      expect(fetcher).toHaveBeenCalledTimes(1);
      expect(fetcher).toHaveBeenCalledWith(0, expect.any(Number));
    });

    it('should render the rows returned by fetch', async () => {
      const harness = await createFixture({ dataSource: new DataSource<TestData>(() => [TEST_DATA[1]]) });

      expect(harness.bodyRows.length).toBe(1);
      expect(harness.getBodyRowByIndex(0)?.querySelectorAll('td')[1].textContent?.trim()).toBe('Bob');
    });

    it('should render no rows until an asynchronous fetch resolves', async () => {
      const deferred = createDeferred<TestData[]>();
      const harness = await createFixture({ dataSource: new DataSource<TestData>(() => deferred.promise) });

      expect(harness.bodyRows.length).toBe(0);

      deferred.resolve(TEST_DATA);
      await settle(harness.element);

      expect(harness.bodyRows.length).toBe(TEST_DATA.length);
    });

    it('should fetch from the new data source when the data source changes', async () => {
      const fetcher = vi.fn(() => [TEST_DATA[0]]);
      const harness = await createFixture();

      harness.element.dataSource = new DataSource<TestData>(fetcher);
      await settle(harness.element);

      expect(fetcher).toHaveBeenCalledTimes(1);
      expect(harness.bodyRows.length).toBe(1);
    });

    it('should clear the rows when the data source is removed', async () => {
      const harness = await createFixture();

      expect(harness.bodyRows.length).toBe(TEST_DATA.length);

      harness.element.dataSource = undefined;
      await settle(harness.element);

      expect(harness.bodyRows.length).toBe(0);
    });

    it('should ignore the result of a replaced data source when its fetch resolves late', async () => {
      const deferred = createDeferred<TestData[]>();
      const harness = await createFixture({ dataSource: new DataSource<TestData>(() => deferred.promise) });

      await harness.setData([TEST_DATA[0]]);
      deferred.resolve(TEST_DATA);
      await settle(harness.element);

      expect(harness.bodyRows.length).toBe(1);
    });

    it('should virtualize the rows returned by fetch', async () => {
      const largeData = Array.from({ length: 100 }, (_, i) => ({ id: i, name: `User ${i}`, age: 20 + i, email: `user${i}@example.com` }));
      const harness = await createFixture({ dataSource: new DataSource<TestData>(() => largeData), virtualized: true });

      expect(harness.bodyRows.length).toBeGreaterThan(0);
      expect(harness.bodyRows.length).toBeLessThan(largeData.length);
    });
  });

  describe('Dynamic Property Changes', () => {
    it('should handle data changes', async () => {
      const harness = await createFixture();

      expect(harness.bodyRows.length).toBe(3);

      await harness.setData([TEST_DATA[0]]);

      expect(harness.bodyRows.length).toBe(1);
    });

    it('should handle columns changes', async () => {
      const harness = await createFixture();

      expect(harness.headerCells.length).toBe(4);

      harness.element.columns = [TEST_COLUMNS[0]];
      await harness.element.updateComplete;

      expect(harness.headerCells.length).toBe(1);
    });

    it('should handle sortable toggle', async () => {
      const harness = await createFixture({ sortable: false });

      expect(harness.element.sortable).toBe(false);

      harness.element.sortable = true;
      await harness.element.updateComplete;

      expect(harness.element.sortable).toBe(true);
    });

    it('should handle filterable toggle', async () => {
      const harness = await createFixture({ filterable: false });

      expect(harness.filterInputs.length).toBe(0);

      harness.element.filterable = true;
      await harness.element.updateComplete;

      expect(harness.filterInputs.length).toBeGreaterThan(0);
    });

    it('should handle resizable toggle', async () => {
      const harness = await createFixture({ resizable: false });

      expect(harness.resizers.length).toBe(0);

      harness.element.resizable = true;
      await harness.element.updateComplete;

      expect(harness.resizers.length).toBeGreaterThan(0);
    });

    it('should handle rowSelection changes', async () => {
      const harness = await createFixture({ rowSelection: 'off' });

      expect(harness.selectColumnCheckboxes.length).toBe(0);

      harness.element.rowSelection = 'single';
      await harness.element.updateComplete;

      expect(harness.selectColumnCheckboxes.length).toBeGreaterThan(0);
    });

    it('should handle reorderable toggle', async () => {
      const harness = await createFixture({ reorderable: false });

      expect(harness.element.columnOrder.length).toBe(0);

      harness.element.reorderable = true;
      await harness.element.updateComplete;

      expect(harness.element.columnOrder.length).toBeGreaterThan(0);
    });

    it('should handle virtualized toggle', async () => {
      const harness = await createFixture({ virtualized: false });

      expect(harness.tbodyElement?.classList.contains('virtualized-tbody')).toBe(false);

      harness.element.virtualized = true;
      await harness.element.updateComplete;

      expect(harness.tbodyElement?.classList.contains('virtualized-tbody')).toBe(true);
    });

    it('should handle multiple property changes simultaneously', async () => {
      const harness = await createFixture();

      harness.element.striped = true;
      harness.element.hover = true;
      harness.element.bordered = true;
      await harness.element.updateComplete;

      expect(harness.hasCustomState('striped')).toBe(true);
      expect(harness.hasCustomState('hover')).toBe(true);
      expect(harness.hasCustomState('bordered')).toBe(true);
    });

    it('should recreate table controller when key properties change', async () => {
      const harness = await createFixture({ sortable: false });

      harness.element.sortable = true;
      await harness.element.updateComplete;

      expect(harness.element.sortable).toBe(true);
      await harness.clickHeaderCell(1);
      await harness.element.updateComplete;

      const headerCell = harness.getHeaderCellById('name');
      expect(headerCell?.classList.contains('sort-asc') || headerCell?.classList.contains('sort-desc')).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty data array', async () => {
      const harness = await createFixture({ data: [] });

      expect(harness.bodyRows.length).toBe(0);
      expect(harness.tableElement).not.toBeNull();
    });

    it('should handle empty columns array', async () => {
      const harness = await createFixture({ columns: [] });

      expect(harness.headerCells.length).toBe(0);
      expect(harness.tableElement).not.toBeNull();
    });

    it('should handle single row', async () => {
      const harness = await createFixture({ data: [TEST_DATA[0]] });

      expect(harness.bodyRows.length).toBe(1);
    });

    it('should handle single column', async () => {
      const harness = await createFixture({ columns: [TEST_COLUMNS[0]] });

      expect(harness.headerCells.length).toBe(1);
    });

    it('should handle very large datasets', async () => {
      const largeData = Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        name: `User ${i}`,
        age: 20 + (i % 50),
        email: `user${i}@example.com`
      }));
      const harness = await createFixture({ data: largeData, virtualized: true });

      expect(harness.tableElement).not.toBeNull();
      expect(harness.tbodyElement?.classList.contains('virtualized-tbody')).toBe(true);
    });

    it('should handle column with no header', async () => {
      const columns: ColumnDef<TestData>[] = [{ property: 'name' }];
      const harness = await createFixture({ columns });

      expect(harness.headerCells.length).toBe(1);
    });

    it('should handle column with no property or accessor', async () => {
      const columns: ColumnDef<TestData>[] = [{ header: 'Test' }];
      const harness = await createFixture({ columns });

      expect(harness.headerCells.length).toBe(1);
    });

    it('should handle malformed column definitions gracefully', async () => {
      const columns: ColumnDef<TestData>[] = [{}, { header: '' }, { id: '' }];
      const harness = await createFixture({ columns });

      expect(harness.tableElement).not.toBeNull();
      expect(harness.headerCells.length).toBe(3);
    });
  });
});
