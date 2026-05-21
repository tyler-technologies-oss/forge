import {
  Column,
  ColumnDef as TanstackColumnDef,
  ColumnFiltersState,
  ColumnOrderState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  TableController,
  Updater,
  VisibilityState,
  RowData as TanstackRowData,
  Cell,
  Table
} from '@tanstack/lit-table';
import { VirtualizerController } from '@tanstack/lit-virtual';
import { html, LitElement, nothing, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { guard } from 'lit/directives/guard.js';
import { styleMap } from 'lit/directives/style-map.js';
import { svg } from 'lit/static-html.js';
import { createRef, ref } from 'lit/directives/ref.js';
import type { IPopoverToggleEventData, PopoverComponent } from '../popover/index.js';
import { lightDomRender } from './directives/light-dom-render.js';
import { ColumnReorderController } from './controllers/column-reorder-controller.js';
import { ColumnVisibilityController } from './controllers/column-visibility-controller.js';
import { toggleState } from '../core/utils/utils.js';

import '../checkbox/checkbox.js';
import '../date-picker/date-picker.js';
import '../list/list/list.js';
import '../popover/popover.js';
import '../tooltip/tooltip.js';

import styles from './data-table.scss';

export { createExpanderColumn, type ExpanderColumnOptions } from './features/expander.js';

declare global {
  interface HTMLElementTagNameMap {
    'forge-data-table': DataTableElement<unknown>;
  }

  interface HTMLElementEventMap {
    'forge-data-table-sort': CustomEvent<SortingState>;
    'forge-data-table-filter': CustomEvent<ColumnFiltersState>;
    'forge-data-table-row-select': CustomEvent<Record<string, boolean>>;
    'forge-data-table-column-visibility': CustomEvent<VisibilityState>;
    'forge-data-table-column-order': CustomEvent<ColumnOrderState>;
    'forge-data-table-row-click': CustomEvent<{ data: unknown; index: number }>;
  }
}

declare module '@tanstack/lit-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends TanstackRowData, TValue> extends ColumnDefMeta {}
}

export type FilterType = 'text' | 'number' | 'range' | 'select' | 'date' | 'date-range' | 'time';

interface ColumnDefMeta {
  filterVariant?: FilterType;
  cellSlot?: boolean;
  stopRowClickPropagation?: boolean;
  reorderable?: boolean;
}

export type Row = unknown | object | unknown[];

export type RowSelectionType = 'off' | 'single' | 'multiple';

export type FooterCallback<TData extends Row = unknown> = (props: { property: string; data: TData[] }) => string;

export interface ColumnDef<TData extends Row = unknown> {
  id?: string;
  header?: string;
  footer?: string | FooterCallback<TData>;
  property?: string & keyof TData;
  hidden?: boolean;
  hideable?: boolean;
  resizable?: boolean;
  reorderable?: boolean;
  width?: number;
  transform?: (row: TData, index: number) => unknown;
  template?: string | (<TValue>(props: { row: Row; column: Column<TData>; cell: Cell<TData, TValue> }) => string | HTMLElement);
  useTemplateSlot?: boolean;
  filterType?: FilterType;
  stopRowClickPropagation?: boolean;
  columns?: ColumnDef<TData>[];
}

const SELECT_COLUMN_ID = 'SELECT_COLUMN_ID';

const DEFAULT_COLUMN_WIDTH = 172;

/**
 * @tag forge-data-table
 */
@customElement('forge-data-table')
export class DataTableElement<TData extends Row = unknown> extends LitElement {
  private _tableController = new TableController<TData>(this);
  private _tableContainerRef = createRef<HTMLElement>();
  private _columnReorderController: ColumnReorderController<TData> | null = null;
  private _columnVisibilityController = new ColumnVisibilityController<TData>(this, {
    selectColumnId: SELECT_COLUMN_ID,
    resolveColumnId: (column, index) => this._resolveColumnId(column, index),
    onVisibilityChange: nextState => this._emitColumnVisibilityChange(nextState)
  });
  @query('#column-visibility-popover')
  private _columnVisibilityPopover?: PopoverComponent;
  #internals: ElementInternals;

  public static override styles = unsafeCSS(styles);

  /**
   * The data to display in the table.
   */
  @property({ type: Array })
  public data: TData[] = [];

  /**
   * The columns to display in the table.
   */
  @property({ type: Array })
  public columns: ColumnDef<TData>[] = [];

  /**
   * The current visibility state of the columns.
   */
  @property({ type: Object })
  public columnVisibility: VisibilityState = {};

  /**
   * The current order of the columns.
   */
  @property({ type: Array })
  public columnOrder: ColumnOrderState = [];

  /**
   * Whether the columns in the table can be resized.
   */
  @property({ type: Boolean })
  public resizable = false;

  /**
   * Whether the columns in the table can be sorted.
   */
  @property({ type: Boolean })
  public sortable = false;

  /**
   * Whether the columns in the table can be filtered.
   */
  @property({ type: Boolean })
  public filterable = false;

  /**
   * Controls whether the table is sorted manually or automatically.
   */
  @property({ type: Boolean, attribute: 'manual-sort' })
  public manualSort = false;

  /**
   * Controls whether the table is filtered manually or automatically.
   */
  @property({ type: Boolean, attribute: 'manual-filter' })
  public manualFilter = false;

  /**
   * Use alternate row styling.
   */
  @property({ type: Boolean })
  public striped = false;

  /**
   * Use hover styling when hovering over rows with the pointer.
   */
  @property({ type: Boolean })
  public hover = false;

  /**
   * Use compact row and cell styling.
   */
  @property({ type: Boolean })
  public compact = false;

  /**
   * Use bordered styling around rows and cells.
   */
  @property({ type: Boolean })
  public bordered = false;

  /**
   * Allow rows to be selected.
   */
  @property({ attribute: 'row-selection' })
  public rowSelection: RowSelectionType = 'off';

  /**
   * Allow columns to be reordered.
   */
  @property({ type: Boolean })
  public reorderable = false;

  /**
   * Allow rows to be clicked.
   */
  @property({ type: Boolean, attribute: 'allow-row-click' })
  public allowRowClick = false;

  /**
   * Allow rows to be expanded.
   */
  @property({ type: Boolean })
  public expandable = false;

  /**
   * Enable virtualization for rows in the table.
   */
  @property({ type: Boolean })
  public virtualized = false;

  /**
   * Keep headers fixed at the top while scrolling through the table.
   */
  @property({ type: Boolean, attribute: 'fixed-headers' })
  public fixedHeaders = false;

  @state() private _columns: TanstackColumnDef<TData>[] = [];
  @state() private _renderColumns: TanstackColumnDef<TData>[] = [];
  @state() private _sorting: SortingState = [];
  @state() private _columnFilters: ColumnFiltersState = [];
  @state() private _rowSelection: Record<string, boolean> = {};
  @state() private _virtualizerController: VirtualizerController<HTMLElement, HTMLElement> | null = null;
  @state() private _columnMenuAnchorId: string | null = null;
  @state() private _columnMenuOpen = false;
  private _isDragging = false;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  // eslint-disable-next-line @tylertech-eslint/require-private-modifier
  protected willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('resizable')) {
      toggleState(this.#internals, 'resizable', this.resizable);
    }
    if (changedProperties.has('filterable')) {
      toggleState(this.#internals, 'filterable', this.filterable);
    }
    if (changedProperties.has('rowSelection')) {
      toggleState(this.#internals, 'row-selection', this.rowSelection !== 'off');
    }
    if (changedProperties.has('hover')) {
      toggleState(this.#internals, 'hover', this.hover);
    }
    if (changedProperties.has('striped')) {
      toggleState(this.#internals, 'striped', this.striped);
    }
    if (changedProperties.has('bordered')) {
      toggleState(this.#internals, 'bordered', this.bordered);
    }
    if (changedProperties.has('compact')) {
      toggleState(this.#internals, 'compact', this.compact);
    }
    if (changedProperties.has('allowRowClick')) {
      toggleState(this.#internals, 'allow-row-click', this.allowRowClick);
    }
    if (changedProperties.has('fixedHeaders')) {
      toggleState(this.#internals, 'fixed-headers', this.fixedHeaders);
    }
    if (changedProperties.has('virtualized')) {
      toggleState(this.#internals, 'virtualized', this.virtualized);
    }

    // We need to map the columns to the table-core format when the columns property changes
    if (changedProperties.has('columns')) {
      this._mapColumnState();

      // Check to see if any columns are using slotted cell rendering and remove any light DOM content
      // that was previously rendered for those columns if a column is no longer using slotted cells.
      this._getAllLeafColumns(this.columns, []).forEach(({ column, indexPath }) => {
        if (!column.useTemplateSlot) {
          const columnId = this._resolveColumnId(column, indexPath);
          this.querySelectorAll(`[slot^="col-${columnId}:"]`).forEach(el => el.remove());
        }
      });

      const derivedVisibility = this._columnVisibilityController.deriveVisibilityState();
      if (derivedVisibility) {
        this._columnVisibilityController.setVisibilityState(derivedVisibility, { notifyHost: false });
      }

      this._closeColumnMenu();
    }

    // We need to recreate the table controller when certain properties change to ensure the
    // internal TanStack table state reflects the new component state.
    if (
      changedProperties.has('columns') ||
      changedProperties.has('sortable') ||
      changedProperties.has('manualSort') ||
      changedProperties.has('filterable') ||
      changedProperties.has('manualFilter') ||
      changedProperties.has('rowSelection') ||
      changedProperties.has('expandable') ||
      changedProperties.has('fixedHeaders') ||
      changedProperties.has('virtualized')
    ) {
      this.removeController(this._tableController);
      this._tableController = new TableController<TData>(this);
    }

    // We need to update the column order when the reorderable, rowSelection, or columns properties change
    if (changedProperties.has('reorderable') || changedProperties.has('rowSelection') || changedProperties.has('columns')) {
      this._setReorderable();
    }

    // Derive render columns when columns or row selection changes
    if (changedProperties.has('columns') || changedProperties.has('rowSelection')) {
      this._renderColumns = [...this._columns];
      if (this.rowSelection !== 'off') {
        this._appendSelectColumn(this._renderColumns);
      }
    }

    // Handle virtualization changes
    if (changedProperties.has('virtualized') || changedProperties.has('data')) {
      this._setVirtualized();
    }
  }

  // eslint-disable-next-line @tylertech-eslint/require-private-modifier
  protected override render(): TemplateResult {
    // Update the table controller with the current state
    const table = this._tableController.table({
      defaultColumn: {
        size: DEFAULT_COLUMN_WIDTH
      },
      columns: this._renderColumns,
      data: this.data,
      columnResizeMode: 'onChange',
      enableSorting: this.sortable,
      manualSorting: this.manualSort,
      onSortingChange: updaterOrValue => this._onSort(updaterOrValue),
      enableColumnFilters: this.filterable,
      manualFiltering: this.manualFilter,
      onColumnFiltersChange: updaterOrValue => this._onFilter(updaterOrValue),
      enableRowSelection: this.rowSelection !== 'off',
      enableMultiRowSelection: this.rowSelection === 'multiple',
      onRowSelectionChange: updaterOrValue => this._onRowSelect(updaterOrValue),
      onColumnVisibilityChange: updaterOrValue => this._onColumnVisibilityChange(updaterOrValue),
      onColumnOrderChange: updaterOrValue => this.onColumnOrderChange(updaterOrValue),
      getRowCanExpand: () => this.expandable,
      state: {
        sorting: this._sorting,
        columnFilters: this._columnFilters,
        columnVisibility: this.columnVisibility,
        columnOrder: this.columnOrder,
        rowSelection: this._rowSelection
      },
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel()
    });
    const tableStyle = this._getColumnSizeStyles(table);

    return html`
      <div class="table-container" ${ref(this._tableContainerRef)}>
        <table
          class=${classMap({
            'fixed-headers': this.fixedHeaders
          })}
          style=${styleMap(tableStyle)}>
          <thead>
            ${this._renderTableHeader(table)}
          </thead>
          ${this.virtualized && this._virtualizerController ? this._renderVirtualizedTableBody(table) : this._renderTableBody(table)}
          ${this._renderTableFooter(table)}
        </table>
      </div>
      ${this._renderColumnVisibilityPopover(table)}
    `;
  }

  private _renderTableHeader(table: Table<TData>): TemplateResult {
    return html`${table.getHeaderGroups().map(
      headerGroup => html`
        <tr part="head-tr tr">
          ${headerGroup.headers.map(header => {
            const hasHeader = !!header.column.columnDef.header?.length;
            const isParent = (header.column.columns?.length ?? 0) > 0;
            const canAcceptDrop = this.reorderable && header.column.columnDef.id !== SELECT_COLUMN_ID && ((isParent && !header.isPlaceholder) || hasHeader);
            const canBeDragged = canAcceptDrop && hasHeader && !header.isPlaceholder && this._canColumnBeReordered(header.column);
            const headerId = this._getColumnHeaderId(header.column.id);
            const canShowColumnMenu =
              header.column.columnDef.id !== SELECT_COLUMN_ID && header.column.getCanHide() && !header.isPlaceholder && !header.column.columns.length;
            return html`
              <th
                id=${headerId}
                part="head-cell cell"
                colspan=${header.colSpan > 1 ? String(header.colSpan) : (nothing as any)}
                style=${styleMap({ width: this._getColumnWidthStyle(header.column) })}
                class=${classMap({
                  'sort-asc': header.column.getIsSorted() === 'asc',
                  'sort-desc': header.column.getIsSorted() === 'desc',
                  'select-column': this.rowSelection && header.column.columnDef.id === SELECT_COLUMN_ID
                })}
                data-column-id=${header.column.id}
                @dragover=${canAcceptDrop ? (evt: DragEvent) => this._columnReorderController?.onDragOver(evt, header.column) : nothing}
                @drop=${canAcceptDrop ? (evt: DragEvent) => this._columnReorderController?.onDrop(evt, header.column) : nothing}
                @contextmenu=${canShowColumnMenu ? (evt: MouseEvent) => this._onHeaderContextMenu(evt, header.column) : nothing}>
                <div
                  class="cell-container"
                  part="head-cell-container"
                  draggable=${canBeDragged ? 'true' : 'false'}
                  @dragstart=${canBeDragged ? (evt: DragEvent) => this._onHeaderDragStart(evt, header.column) : nothing}
                  @dragend=${canBeDragged ? (evt: DragEvent) => this._onHeaderDragEnd(evt) : nothing}
                  style=${styleMap({
                    cursor: this.sortable && header.column.getCanSort() ? 'default' : canBeDragged ? 'grab' : 'default',
                    userSelect: canBeDragged ? 'none' : null
                  })}>
                  <div
                    part="head-cell-content cell-content"
                    class="cell-content"
                    @click=${this.sortable && !canBeDragged
                      ? header.column.getToggleSortingHandler()
                      : canBeDragged
                        ? (evt: MouseEvent) => this._onHeaderClick(evt, header.column)
                        : null}>
                    ${header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    ${this.sortable && header.column.getIsSorted()
                      ? svg`<svg class="sort-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"/></svg>`
                      : null}
                  </div>
                </div>
                ${this.filterable && header.column.getCanFilter() ? html`<div class="filter-container">${this._getFilterField(header.column)}</div>` : nothing}
                ${this.resizable && header.column.getCanResize() && !header.isPlaceholder
                  ? html`<div
                @doubleclick=${() => header.column.resetSize()}
                @mousedown=${header.getResizeHandler()}
                @touchstart=${header.getResizeHandler()}
                class=${classMap({ resizer: true, [table.options.columnResizeDirection ?? 'ltr']: true, resizing: header.column.getIsResizing() })}
              </div>`
                  : nothing}
              </th>
            `;
          })}
        </tr>
      `
    )}`;
  }

  private _renderTableBody(table: Table<TData>): TemplateResult {
    return html`<tbody class="standard-tbody">
      ${repeat(
        table.getRowModel().rows,
        row => row.id,
        row => html`
          <tr
            class=${classMap({ selected: row.getIsSelected() })}
            part="body-tr tr"
            @click=${this.allowRowClick ? (evt: MouseEvent) => this._onRowClick(evt, row.index, row.original) : nothing}>
            ${row.getVisibleCells().map(
              cell => html`
                <td
                  part="body-cell cell"
                  style=${styleMap({ width: this._getColumnWidthStyle(cell.column) })}
                  class=${classMap({
                    'select-column': this.rowSelection && cell.column.columnDef.id === SELECT_COLUMN_ID
                  })}
                  id=${cell.column.id}
                  ?data-forge-stop-row-click-propagation=${cell.column.columnDef.meta?.stopRowClickPropagation ||
                  cell.column.columnDef.id === SELECT_COLUMN_ID}>
                  <div class="cell-content" part="body-cell-content cell-content">
                    ${cell.column.columnDef.meta?.cellSlot
                      ? guard([cell.column], () => html`<slot ${lightDomRender(this, cell)} name=${`col-${cell.column.id}:row-${row.id}`}></slot>`)
                      : flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </td>
              `
            )}
          </tr>
          ${row.getIsExpanded()
            ? html`
                <tr part="body-tr tr">
                  <td colspan=${row.getAllCells().length}>
                    <div class="expanded-content">
                      <slot name=${`expanded:row-${row.id}`}></slot>
                    </div>
                  </td>
                </tr>
              `
            : nothing}
        `
      )}
    </tbody>`;
  }

  private _renderTableFooter(table: Table<TData>): TemplateResult | typeof nothing {
    const hasFooterGroups = table
      .getFooterGroups()
      .flatMap(footerGroup => footerGroup.headers.flatMap(header => header.column.columnDef.footer))
      .some(footer => footer !== undefined);

    if (!hasFooterGroups) {
      return nothing;
    }

    return html`<tfoot>
      ${table.getFooterGroups().map(
        footerGroup => html`
          <tr part="tfoot-tr tr">
            ${footerGroup.headers.map(
              header => html`
                <th
                  part="tfoot-cell cell"
                  colspan=${header.colSpan > 1 ? header.colSpan : (nothing as any)}
                  style=${styleMap({ width: this._getColumnWidthStyle(header.column) })}
                  class=${classMap({ 'empty-footer': header.column.columnDef.footer === undefined })}>
                  <div class="cell-content" part="footer-cell-content cell-content">${flexRender(header.column.columnDef.footer, header.getContext())}</div>
                </th>
              `
            )}
          </tr>
        `
      )}
    </tfoot>`;
  }

  private _renderColumnVisibilityPopover(table: Table<TData>): TemplateResult {
    const anchorId = this._columnMenuAnchorId ?? undefined;
    const items = table.getAllLeafColumns().filter(column => column.id !== SELECT_COLUMN_ID && column.getCanHide());

    return html`
      <forge-popover
        id="column-visibility-popover"
        anchor=${anchorId ? anchorId : (nothing as any)}
        placement="bottom-start"
        position-strategy="fixed"
        trigger-type="manual"
        .open=${this._columnMenuOpen}
        @forge-popover-toggle=${(evt: CustomEvent<IPopoverToggleEventData>) => this._onColumnMenuToggle(evt)}>
        <forge-list role="menu">
          ${items.length
            ? items.map(column => this._renderColumnVisibilityItem(column))
            : html`<forge-list-item disabled>No columns available</forge-list-item>`}
        </forge-list>
      </forge-popover>
    `;
  }

  private _renderColumnVisibilityItem(column: Column<TData, unknown>): TemplateResult {
    const isVisible = column.getIsVisible();

    return html`
      <forge-list-item
        role="menuitemcheckbox"
        aria-checked=${isVisible ? 'true' : 'false'}
        value=${column.id}
        @click=${(evt: Event) => this._onColumnMenuItemClick(evt, column)}>
        <forge-checkbox slot="start" .checked=${isVisible} @change=${(evt: Event) => this._onColumnMenuCheckboxChange(evt, column)}></forge-checkbox>
        <span>${this._getColumnMenuLabel(column)}</span>
      </forge-list-item>
    `;
  }

  private _mapColumnState(): void {
    this._columns = this._mapColumnsRecursive(this.columns, []);
  }

  #hasChildColumns(column: ColumnDef<TData>): boolean {
    return Array.isArray(column.columns) && column.columns.length > 0;
  }

  private _mapColumnsRecursive(columns: ColumnDef<TData>[], parentIndices: number[]): TanstackColumnDef<TData>[] {
    return columns.map((column, index) => {
      const indexPath = [...parentIndices, index];
      const columnId = this._resolveColumnId(column, indexPath);
      const isParent = this.#hasChildColumns(column);

      const baseColumn = {
        id: columnId,
        header: column.header,
        footer:
          typeof column.footer === 'function'
            ? (context: { column: Column<TData>; table: Table<TData> }) => {
                const propertyId = (column.property ?? context.column.id) as string;
                const filteredData = context.table.getFilteredRowModel().rows.map(r => r.original);
                return (column.footer as FooterCallback<TData>)({ property: propertyId, data: filteredData });
              }
            : column.footer,
        enableHiding: column.hideable ?? true,
        size: column.width ?? DEFAULT_COLUMN_WIDTH,
        meta: {
          cellSlot: column.useTemplateSlot,
          filterVariant: column.filterType,
          stopRowClickPropagation: column.stopRowClickPropagation,
          reorderable: column.reorderable
        }
      };

      if (isParent && column.columns) {
        const hasHeader = typeof column.header === 'string' && column.header.length > 0;
        return {
          ...baseColumn,
          columns: this._mapColumnsRecursive(column.columns, indexPath),
          enableResizing: hasHeader ? (column.resizable ?? true) : false,
          enableSorting: false,
          enableColumnFilter: false
        } as TanstackColumnDef<TData>;
      } else {
        const leafColumn = {
          ...baseColumn,
          accessorKey: column.property,
          accessorFn: column.transform,
          enableResizing: column.resizable ?? true,
          ...(typeof column.template === 'function' && { cell: column.template })
        };

        return leafColumn as TanstackColumnDef<TData>;
      }
    });
  }

  private _getAllLeafColumns(columns: ColumnDef<TData>[], parentIndices: number[]): Array<{ column: ColumnDef<TData>; indexPath: number[] }> {
    return columns.flatMap((column, index) => {
      const indexPath = [...parentIndices, index];
      if (this.#hasChildColumns(column) && column.columns) {
        return this._getAllLeafColumns(column.columns, indexPath);
      }
      return [{ column, indexPath }];
    });
  }

  private _getAllColumnIds(columns: ColumnDef<TData>[], parentIndices: number[]): string[] {
    return columns.flatMap((column, index) => {
      const indexPath = [...parentIndices, index];
      const columnId = this._resolveColumnId(column, indexPath);
      const isParent = this.#hasChildColumns(column);

      if (isParent && column.columns) {
        const hasHeader = typeof column.header === 'string' && column.header.length > 0;
        if (hasHeader) {
          return [columnId, ...this._getAllColumnIds(column.columns, indexPath)];
        } else {
          return this._getAllColumnIds(column.columns, indexPath);
        }
      }
      return [columnId];
    });
  }

  private _onHeaderDragStart(evt: DragEvent, column: Column<TData>): void {
    this._isDragging = true;
    this._columnReorderController?.onDragStart(evt, column);
  }

  private _onHeaderDragEnd(evt: DragEvent): void {
    this._isDragging = false;
    this._columnReorderController?.onDragEnd(evt);
  }

  private _onHeaderClick(evt: MouseEvent, column: Column<TData>): void {
    if (this._isDragging) {
      this._isDragging = false;
      return;
    }
    if (this.sortable && column.getCanSort()) {
      column.getToggleSortingHandler()?.(evt);
    }
  }

  private async _onHeaderContextMenu(evt: MouseEvent, column: Column<TData, unknown>): Promise<void> {
    evt.preventDefault();

    const target = evt.currentTarget as HTMLElement | null;
    if (!target) {
      return;
    }

    this._columnMenuAnchorId = target.id || this._getColumnHeaderId(column.id);
    this._columnMenuOpen = true;

    await this.updateComplete;
    if (this._columnVisibilityPopover) {
      this._columnVisibilityPopover.open = true;
    }
  }

  private _onColumnMenuToggle(evt: CustomEvent<IPopoverToggleEventData>): void {
    const { newState } = evt.detail;
    if (newState === 'closed') {
      this._closeColumnMenu();
    } else if (newState === 'open') {
      this._columnMenuOpen = true;
    }
  }

  private _onColumnMenuItemClick(evt: Event, column: Column<TData, unknown>): void {
    const path = evt.composedPath();
    const interactedWithCheckbox = path.some(target => {
      if (!(target as HTMLElement)?.tagName) {
        return false;
      }
      const tagName = (target as HTMLElement).tagName.toUpperCase();
      return tagName === 'FORGE-CHECKBOX' || tagName === 'INPUT';
    });

    if (interactedWithCheckbox) {
      return;
    }

    evt.preventDefault();
    this._toggleColumnVisibility(column);
  }

  private _onColumnMenuCheckboxChange(evt: Event, column: Column<TData, unknown>): void {
    evt.stopPropagation();

    this._toggleColumnVisibility(column);
  }

  private _toggleColumnVisibility(column: Column<TData, unknown>): void {
    const columnId = column.id;
    if (!columnId) {
      return;
    }

    if (column.getIsVisible()) {
      this.hideColumn(columnId);
    } else {
      this.showColumn(columnId);
    }
  }

  private _getColumnMenuLabel(column: Column<TData, unknown>): string {
    const header = column.columnDef.header;

    if (typeof header === 'string' || typeof header === 'number') {
      return String(header);
    }

    if ('accessorKey' in column.columnDef) {
      const accessorKey = column.columnDef.accessorKey;
      if (typeof accessorKey === 'string') {
        return accessorKey;
      }
    }

    return column.id;
  }

  private _getColumnHeaderId(columnId: string): string {
    return `column-header-${columnId}`;
  }

  private _closeColumnMenu(): void {
    this._columnMenuOpen = false;
    this._columnMenuAnchorId = null;
    if (this._columnVisibilityPopover) {
      this._columnVisibilityPopover.open = false;
    }
  }

  private _appendSelectColumn(columns: TanstackColumnDef<TData>[]): void {
    if (columns.some(column => column.id === SELECT_COLUMN_ID)) {
      return;
    }

    columns.unshift({
      id: SELECT_COLUMN_ID,
      enableResizing: false,
      enableColumnFilter: false,
      enableSorting: false,
      enableHiding: false,
      header:
        this.rowSelection === 'multiple'
          ? ({ table }) =>
              html`<forge-checkbox
                  @change="${table.getToggleAllRowsSelectedHandler()}"
                  .checked="${table.getIsAllRowsSelected()}"
                  .indeterminate="${table.getIsSomeRowsSelected()}"></forge-checkbox>
                <forge-tooltip>Toggle all rows</forge-tooltip>`
          : undefined,
      cell: ({ row }) => html`
        <forge-checkbox
          @change="${row.getToggleSelectedHandler()}"
          .checked="${row.getIsSelected()}"
          ?disabled="${!row.getCanSelect()}"
          .indeterminate="${row.getIsSomeSelected()}"></forge-checkbox>
        <forge-tooltip>Select row</forge-tooltip>
      `
    });
  }

  private _setReorderable(): void {
    if (this.reorderable) {
      this._columnReorderController = new ColumnReorderController(this, {
        selectColumnId: SELECT_COLUMN_ID,
        onColumnOrderChange: updaterOrValue => this.onColumnOrderChange(updaterOrValue),
        resolveColumnId: (column, indexPath) => this._resolveColumnId(column, indexPath)
      });
      this.addController(this._columnReorderController);

      const columns = this._getAllColumnIds(this.columns, []);
      this.columnOrder = columns;

      if (this.rowSelection !== 'off') {
        const orderToUpdate = [...this.columnOrder];
        this._columnReorderController.ensureSelectColumnOrder(orderToUpdate);
        this.columnOrder = orderToUpdate;
      }
    } else {
      if (this._columnReorderController) {
        this.removeController(this._columnReorderController);
      }
      this.columnOrder = [];
    }
  }

  private _setVirtualized(): void {
    if (!this.virtualized) {
      if (this._virtualizerController) {
        this.removeController(this._virtualizerController);
        this._virtualizerController = null;
      }
      return;
    }

    if (!this._virtualizerController) {
      this._virtualizerController = new VirtualizerController(this, {
        getScrollElement: () => this._tableContainerRef.value as HTMLElement,
        // TODO: use getComputedStyle?
        estimateSize: () => (this.compact ? 32 : 48),
        overscan: 5,
        count: this.data.length
      });
      this.addController(this._virtualizerController);
      return;
    }

    const virtualizer = this._virtualizerController.getVirtualizer();
    virtualizer.setOptions({
      ...virtualizer.options,
      count: this.data.length
    });
  }

  private _onSort(updaterOrValue: Updater<SortingState>): void {
    this._sorting = typeof updaterOrValue === 'function' ? updaterOrValue(this._sorting) : updaterOrValue;
    if (this.manualSort) {
      this.dispatchEvent(new CustomEvent('forge-data-table-sort', { detail: this._sorting, bubbles: true, composed: true }));
    }
  }

  private _onFilter(updaterOrValue: Updater<ColumnFiltersState>): void {
    this._columnFilters = typeof updaterOrValue === 'function' ? updaterOrValue(this._columnFilters) : updaterOrValue;
    if (this.manualFilter) {
      this.dispatchEvent(new CustomEvent('forge-data-table-filter', { detail: this._columnFilters, bubbles: true, composed: true }));
    }
  }

  private _onRowSelect(updaterOrValue: Updater<Record<string, boolean>>): void {
    this._rowSelection = typeof updaterOrValue === 'function' ? updaterOrValue(this._rowSelection) : updaterOrValue;
    this.dispatchEvent(new CustomEvent('forge-data-table-row-select', { detail: this._rowSelection, bubbles: true, composed: true }));
  }

  private _onColumnVisibilityChange(updaterOrValue: Updater<VisibilityState>): void {
    const nextState = typeof updaterOrValue === 'function' ? updaterOrValue(this.columnVisibility) : updaterOrValue;
    this._columnVisibilityController.setVisibilityState(nextState);
  }

  private _emitColumnVisibilityChange(nextState: VisibilityState): void {
    this.dispatchEvent(new CustomEvent('forge-data-table-column-visibility', { detail: nextState, bubbles: true, composed: true }));
  }

  public onColumnOrderChange(updaterOrValue: Updater<ColumnOrderState>): void {
    this.columnOrder = typeof updaterOrValue === 'function' ? updaterOrValue(this.columnOrder) : updaterOrValue;
    this.dispatchEvent(new CustomEvent('forge-data-table-column-order', { detail: this.columnOrder, bubbles: true, composed: true }));
  }

  private _onRowClick(evt: MouseEvent, index: number, data: TData): void {
    const isProtectedCell = evt
      .composedPath()
      .filter(el => (el as Node).nodeType === Node.ELEMENT_NODE)
      .some(el => (el as Element).matches(`:where([id="${SELECT_COLUMN_ID}"],[data-forge-stop-row-click-propagation])`));
    if (isProtectedCell) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent('forge-data-table-row-click', {
        detail: { data, index },
        bubbles: true,
        composed: true
      })
    );
  }

  private _getFilterField(column: Column<TData, unknown>): TemplateResult {
    switch (column.columnDef.meta?.filterVariant) {
      case 'select':
        return this._getSelectFilter(column);
      case 'range':
        return this._getRangeFilter(column);
      case 'date':
        return this._getDateFilter(column);
      default:
        return this._getTextFilter(column);
    }
  }

  private _getSelectFilter(column: Column<TData, unknown>): TemplateResult {
    return html`<forge-select
      density="small"
      .value=${column.getFilterValue() ?? ''}
      @change=${(evt: Event) => column.setFilterValue((evt.target as HTMLSelectElement).value)}>
      <forge-option value="">All</forge-option>
      <forge-option value="1">One</forge-option>
      <forge-option value="2">Two</forge-option>
    </forge-select>`;
  }

  private _getRangeFilter(column: Column<TData, unknown>): TemplateResult {
    return html` <div class="range-filter-container">
      <forge-text-field density="small">
        <input
          type="number"
          name="filter-${column.id}"
          value=${(column.getFilterValue() as [number, number])?.[0] ?? ''}
          @input=${(evt: InputEvent) =>
            column.setFilterValue((old: [number, number]) => [parseInt((evt.target as HTMLInputElement).value, 10), old?.[1] ?? 0])} />
      </forge-text-field>
      <forge-text-field density="small">
        <input
          type="number"
          name="filter-${column.id}"
          value=${(column.getFilterValue() as [number, number])?.[1] ?? ''}
          @input=${(evt: InputEvent) =>
            column.setFilterValue((old: [number, number]) => [old?.[0] ?? 0, parseInt((evt.target as HTMLInputElement).value, 10)])} />
      </forge-text-field>
    </div>`;
  }

  private _getDateFilter(column: Column<TData, unknown>): TemplateResult {
    return html` <forge-date-picker
      @forge-date-picker-change=${(evt: CustomEvent<Date>) => column.setFilterValue(evt.detail)}
      .value=${column.getFilterValue() as any}>
      <forge-text-field density="small">
        <input name="filter-${column.id}" type="text" />
      </forge-text-field>
    </forge-date-picker>`;
  }

  private _getTextFilter(column: Column<TData, unknown>): TemplateResult {
    return html` <forge-text-field density="small">
      <input
        name="filter-${column.id}"
        .type=${column.columnDef.meta?.filterVariant ?? 'text'}
        .value=${(column.getFilterValue() as string) ?? ''}
        @input=${(evt: InputEvent) => column.setFilterValue((evt.target as HTMLInputElement).value)} />
    </forge-text-field>`;
  }

  private _renderVirtualizedTableBody(table: Table<TData>): TemplateResult {
    if (!this._tableContainerRef || !this._virtualizerController) {
      return this._renderTableBody(table);
    }

    const rows = table.getRowModel().rows;
    const virtualizer = this._virtualizerController.getVirtualizer();
    const virtualItems = virtualizer.getVirtualItems();
    const totalHeight = virtualizer.getTotalSize();

    return html`<tbody
      class="virtualized-tbody"
      style=${styleMap({
        position: 'relative',
        height: `${totalHeight}px`
      })}>
      ${repeat(
        virtualItems,
        item => item.key,
        item => {
          const row = rows[item.index];
          return html`
            <tr
              data-index="${item.index}"
              class=${classMap({
                selected: row.getIsSelected(),
                'virtualized-tr': true
              })}
              part="body-tr tr"
              style=${styleMap({
                position: 'absolute',
                transform: `translateY(${item.start}px)`,
                width: '100%',
                height: `${item.size}px`
              })}
              @click=${this.allowRowClick ? (evt: MouseEvent) => this._onRowClick(evt, row.index, row.original) : nothing}>
              ${repeat(
                row.getVisibleCells(),
                cell => cell.id,
                cell => html`
                  <td
                    part="body-cell cell"
                    style=${styleMap({ width: this._getColumnWidthStyle(cell.column) })}
                    class=${classMap({
                      'select-column': this.rowSelection && cell.column.columnDef.id === SELECT_COLUMN_ID
                    })}
                    id=${cell.column.id}
                    ?data-forge-stop-row-click-propagation=${cell.column.columnDef.meta?.stopRowClickPropagation ||
                    cell.column.columnDef.id === SELECT_COLUMN_ID}>
                    <div class="cell-content" part="body-cell-content cell-content">
                      ${cell.column.columnDef.meta?.cellSlot
                        ? guard([cell.column], () => html`<slot ${lightDomRender(this, cell)} name=${`col-${cell.column.id}:row-${row.id}`}></slot>`)
                        : flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                  </td>
                `
              )}
            </tr>
            ${
              // TODO: how to handle expanded content in virtualized rows?
              /*row.getIsExpanded()
            ? html`
                <tr part="body-tr tr">
                  <td colspan=${row.getAllCells().length}>
                    <div class="expanded-content">
                      <slot name=${`expanded:row-${row.id}`}></slot>
                    </div>
                  </td>
                </tr>
              `
            : */ nothing
            }
          `;
        }
      )}
    </tbody>`;
  }

  private _getColumnSizeStyles(table: Table<TData>): Record<string, string> {
    if (!this.resizable) {
      return {};
    }

    const colStyles: Record<string, string> = {};
    table.getFlatHeaders().forEach(header => {
      if (!header.column.getCanResize()) {
        return;
      }
      colStyles[this._getColumnSizeVarName(header.column.id)] = `${header.getSize()}px`;
    });

    return colStyles;
  }

  private _getColumnWidthStyle(column: Column<TData, unknown>): string | null {
    if (!this.resizable || !column.getCanResize()) {
      return null;
    }

    return `var(${this._getColumnSizeVarName(column.id)})`;
  }

  private _getColumnSizeVarName(columnId: string): string {
    const sanitizedId = columnId.replace(/[^a-zA-Z0-9_-]/g, '-');
    const hasValidChar = /[a-zA-Z0-9]/.test(sanitizedId);
    return `--forge-data-table-column-${hasValidChar ? sanitizedId : 'column'}-size`;
  }

  public hideColumn(columnId: string): void {
    this._columnVisibilityController.hideColumn(columnId);
  }

  public showColumn(columnId: string): void {
    this._columnVisibilityController.showColumn(columnId);
  }

  public toggleColumnVisibility(columnId: string): void {
    this._columnVisibilityController.toggleColumnVisibility(columnId);
  }

  private _resolveColumnId(column: ColumnDef<TData>, indexPath: number | number[]): string {
    if (column.id) {
      return column.id;
    }

    if (column.property) {
      return column.property.toString();
    }

    if (typeof column.header === 'string' && column.header.length > 0) {
      return column.header.toLowerCase().replace(/\s+/g, '-');
    }

    const pathStr = Array.isArray(indexPath) ? indexPath.join('-') : indexPath;
    return `column-${pathStr}`;
  }

  private _canColumnBeReordered(column: Column<TData>): boolean {
    if (column.columnDef.id === SELECT_COLUMN_ID) {
      return false;
    }
    return column.columnDef.meta?.reorderable ?? true;
  }
}
