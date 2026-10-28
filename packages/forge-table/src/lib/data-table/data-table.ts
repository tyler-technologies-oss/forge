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
import { ifDefined } from 'lit/directives/if-defined.js';
import { svg } from 'lit/static-html.js';
import { createRef, ref } from 'lit/directives/ref.js';
import type { DataSource } from '@tylertech/forge-core';
import type { IPopoverToggleEventData, PopoverComponent } from '@tylertech/forge/popover';
import { lightDomRender } from './directives/light-dom-render.js';
import { ColumnReorderController } from './controllers/column-reorder-controller.js';
import { ColumnVisibilityController } from './controllers/column-visibility-controller.js';
import { canColumnBeReordered, getAllColumnIds, getAllLeafColumns, mapColumns, prependSelectColumn, resolveColumnId } from './columns/column-utils.js';
import { COMPACT_ROW_HEIGHT, DEFAULT_COLUMN_WIDTH, DEFAULT_ROW_HEIGHT, FETCH_SKIP, FETCH_TAKE, SELECT_COLUMN_ID, VIRTUALIZER_OVERSCAN } from './constants.js';
import { renderFilterField } from './templates/filter-fields.js';
import type { ColumnDef, Row, RowSelectionType } from './types.js';
import { toggleState } from '@tylertech/forge';

import '@tylertech/forge/checkbox';
import '@tylertech/forge/date-picker';
import '@tylertech/forge/list';
import '@tylertech/forge/popover';
import '@tylertech/forge/tooltip';
import '../column-menu/column-menu.js';

import styles from './data-table.scss';

export { createExpanderColumn, type ExpanderColumnOptions } from './features/expander.js';
export type { ColumnDef, FilterType, FooterCallback, Row, RowSelectionType } from './types.js';

/**
 * @tag forge-data-table
 */
@customElement('forge-data-table')
export class DataTableElement<TData extends Row = unknown> extends LitElement {
  #tableController = new TableController<TData>(this);
  #tableContainerRef = createRef<HTMLElement>();
  #columnReorderController: ColumnReorderController<TData> | null = null;
  #columnVisibilityController = new ColumnVisibilityController<TData>(this, {
    selectColumnId: SELECT_COLUMN_ID,
    onVisibilityChange: nextState => this.#emitColumnVisibilityChange(nextState)
  });
  @query('#column-visibility-popover')
  private _columnVisibilityPopover?: PopoverComponent;
  #internals: ElementInternals;
  #isDragging = false;

  public static override styles = unsafeCSS(styles);

  /**
   * The data source that supplies the rows to display in the table.
   *
   * The table calls `fetch()` on the data source whenever this property is set, and renders the rows it returns.
   */
  @property({ attribute: false })
  public dataSource: DataSource<TData> | undefined;

  /**
   * The columns to display in the table.
   */
  @property({ type: Array })
  public columns: ColumnDef<any>[] = [];

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
   * Enable multi-column sorting. When enabled, users can hold Shift while clicking column headers to sort by multiple columns.
   */
  @property({ type: Boolean, attribute: 'multi-sort' })
  public multiSort = true;

  /**
   * Maximum number of columns that can be sorted simultaneously. Set to undefined for no limit.
   */
  @property({ type: Number, attribute: 'max-multi-sort-col-count' })
  public maxMultiSortColCount: number | undefined = undefined;

  /**
   * Allow removing columns from multi-sort by clicking through the sort cycle.
   */
  @property({ type: Boolean, attribute: 'multi-sort-remove' })
  public multiSortRemove = true;

  /**
   * Modifier key required to trigger multi-column sorting.
   */
  @property({ attribute: 'multi-sort-key' })
  public multiSortKey: 'shift' | 'ctrl' | 'meta' | 'alt' = 'shift';

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

  @state() private _data: TData[] = [];
  @state() private _columns: TanstackColumnDef<TData>[] = [];
  @state() private _tableColumns: TanstackColumnDef<TData>[] = [];
  @state() private _sorting: SortingState = [];
  @state() private _columnFilters: ColumnFiltersState = [];
  @state() private _rowSelection: Record<string, boolean> = {};
  @state() private _virtualizerController: VirtualizerController<HTMLElement, HTMLElement> | null = null;
  @state() private _columnMenuAnchorId: string | null = null;
  @state() private _columnMenuOpen = false;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  #updateCustomStates(changedProperties: PropertyValues<this>): void {
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
  }

  #handleColumnsChange(): void {
    this._columns = mapColumns<TData>(this.columns);

    getAllLeafColumns(this.columns).forEach(({ column, indexPath }) => {
      if (!column.useTemplateSlot) {
        const columnId = resolveColumnId(column, indexPath);
        this.querySelectorAll(`[slot^="col-${columnId}:"]`).forEach(el => el.remove());
      }
    });

    const derivedVisibility = this.#columnVisibilityController.deriveVisibilityState();
    if (derivedVisibility) {
      this.#columnVisibilityController.setVisibilityState(derivedVisibility, { notifyHost: false });
    }

    this.#closeColumnMenu();
  }

  #checkRecreateTableController(changedProperties: PropertyValues<this>): boolean {
    const needsRecreation =
      changedProperties.has('columns') ||
      changedProperties.has('sortable') ||
      changedProperties.has('manualSort') ||
      changedProperties.has('multiSort') ||
      changedProperties.has('maxMultiSortColCount') ||
      changedProperties.has('multiSortRemove') ||
      changedProperties.has('multiSortKey') ||
      changedProperties.has('filterable') ||
      changedProperties.has('manualFilter') ||
      changedProperties.has('rowSelection') ||
      changedProperties.has('expandable') ||
      changedProperties.has('fixedHeaders') ||
      changedProperties.has('virtualized');

    if (needsRecreation) {
      this.removeController(this.#tableController);
      this.#tableController = new TableController<TData>(this);

      if (changedProperties.has('rowSelection')) {
        const oldValue = changedProperties.get('rowSelection');
        if (oldValue === 'multiple' && this.rowSelection === 'single') {
          const selectedKeys = Object.keys(this._rowSelection).filter(key => this._rowSelection[key]);
          if (selectedKeys.length > 1) {
            this._rowSelection = { [selectedKeys[0]]: true };
          }
        }
      }
    }

    return needsRecreation;
  }

  #loadData(): void {
    const { dataSource } = this;
    if (!dataSource) {
      this._data = [];
      return;
    }
    void this.#fetchData(dataSource);
  }

  async #fetchData(dataSource: DataSource<TData>): Promise<void> {
    const rows = await dataSource.fetch(FETCH_SKIP, FETCH_TAKE);
    if (dataSource === this.dataSource) {
      this._data = rows;
    }
  }

  #updateRenderColumns(): void {
    this._tableColumns = this.rowSelection === 'off' ? [...this._columns] : prependSelectColumn(this._columns, this.rowSelection);
  }

  // eslint-disable-next-line @tylertech-eslint/require-private-modifier
  protected willUpdate(changedProperties: PropertyValues<this>): void {
    this.#updateCustomStates(changedProperties);

    if (changedProperties.has('columns')) {
      this.#handleColumnsChange();
    }

    this.#checkRecreateTableController(changedProperties);

    if (changedProperties.has('reorderable') || changedProperties.has('rowSelection') || changedProperties.has('columns')) {
      this.#setReorderable();
    }

    if (changedProperties.has('columns') || changedProperties.has('rowSelection')) {
      this.#updateRenderColumns();
    }

    if (changedProperties.has('dataSource')) {
      this.#loadData();
    }

    if (changedProperties.has('virtualized') || changedProperties.has('_data' as never)) {
      this.#setVirtualized();
    }
  }

  // eslint-disable-next-line @tylertech-eslint/require-private-modifier
  protected override render(): TemplateResult {
    // Update the table controller with the current state
    const table = this.#tableController.table({
      defaultColumn: {
        size: DEFAULT_COLUMN_WIDTH
      },
      columns: this._tableColumns,
      data: this._data,
      columnResizeMode: 'onChange',
      enableColumnResizing: this.resizable,
      enableSorting: this.sortable,
      enableMultiSort: this.sortable && this.multiSort,
      maxMultiSortColCount: this.maxMultiSortColCount,
      enableMultiRemove: this.multiSortRemove,
      enableSortingRemoval: this.multiSortRemove,
      isMultiSortEvent: (e: unknown) => {
        const evt = e as MouseEvent | KeyboardEvent;
        switch (this.multiSortKey) {
          case 'shift':
            return evt.shiftKey;
          case 'ctrl':
            return evt.ctrlKey;
          case 'meta':
            return evt.metaKey;
          case 'alt':
            return evt.altKey;
          default:
            return false;
        }
      },
      manualSorting: this.manualSort,
      onSortingChange: updaterOrValue => this.#onSort(updaterOrValue),
      enableColumnFilters: this.filterable,
      manualFiltering: this.manualFilter,
      onColumnFiltersChange: updaterOrValue => this.#onFilter(updaterOrValue),
      enableRowSelection: this.rowSelection !== 'off',
      enableMultiRowSelection: this.rowSelection === 'multiple',
      onRowSelectionChange: updaterOrValue => this.#onRowSelect(updaterOrValue),
      onColumnVisibilityChange: updaterOrValue => this.#onColumnVisibilityChange(updaterOrValue),
      onColumnOrderChange: updaterOrValue => this.#onColumnOrderChange(updaterOrValue),
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
    const tableStyle = this.#getColumnSizeStyles(table);

    return html`
      <div class="table-container" ${ref(this.#tableContainerRef)}>
        <table
          class=${classMap({
            'allow-row-click': this.allowRowClick,
            bordered: this.bordered,
            compact: this.compact,
            filterable: this.filterable,
            'fixed-headers': this.fixedHeaders,
            hover: this.hover,
            resizable: this.resizable,
            'row-selection': this.rowSelection !== 'off',
            striped: this.striped,
            virtualized: this.virtualized
          })}
          style=${styleMap(tableStyle)}>
          <thead>
            ${this.#renderTableHeader(table)}
          </thead>
          ${this.virtualized && this._virtualizerController ? this.#renderVirtualizedTableBody(table) : this.#renderTableBody(table)}
          ${this.#renderTableFooter(table)}
        </table>
      </div>
      ${this.#renderColumnVisibilityPopover(table)}
    `;
  }

  #getGroupStartColumnIds(table: Table<TData>): ReadonlySet<string> {
    const groupStartColumnIds = new Set<string>();
    table.getVisibleLeafColumns().forEach((column, index, columns) => {
      if (index > 0 && column.parent?.id !== columns[index - 1].parent?.id) {
        groupStartColumnIds.add(column.id);
      }
    });
    return groupStartColumnIds;
  }

  #renderTableHeader(table: Table<TData>): TemplateResult {
    const headerGroups = table.getHeaderGroups();
    const groupStartColumnIds = this.#getGroupStartColumnIds(table);
    return html`${headerGroups.map(
      headerGroup => html`
        <tr part="head-tr tr">
          ${headerGroup.headers.map(header => {
            const isGroupHeader = headerGroup.depth < headerGroups.length - 1;
            const isGroupStart = groupStartColumnIds.has(header.getLeafHeaders()[0].column.id);
            const hasHeader = !!header.column.columnDef.header?.length;
            const isParent = (header.column.columns?.length ?? 0) > 0;
            const canAcceptDrop = this.reorderable && header.column.columnDef.id !== SELECT_COLUMN_ID && ((isParent && !header.isPlaceholder) || hasHeader);
            const canBeDragged = canAcceptDrop && hasHeader && !header.isPlaceholder && canColumnBeReordered(header.column);
            const headerId = this.#getColumnHeaderId(header.column.id);
            const canShowColumnMenu =
              header.column.columnDef.id !== SELECT_COLUMN_ID && header.column.getCanHide() && !header.isPlaceholder && !header.column.columns.length;
            return html`
              <th
                id=${headerId}
                part="head-cell cell"
                colspan=${ifDefined(header.colSpan > 1 ? header.colSpan : undefined)}
                style=${styleMap({ width: this.#getColumnWidthStyle(header.column) })}
                class=${classMap({
                  'sort-asc': header.column.getIsSorted() === 'asc',
                  'sort-desc': header.column.getIsSorted() === 'desc',
                  'select-column': this.rowSelection && header.column.columnDef.id === SELECT_COLUMN_ID,
                  'group-header': isGroupHeader,
                  'group-start': isGroupStart
                })}
                data-column-id=${header.column.id}
                @dragover=${canAcceptDrop ? (evt: DragEvent) => this.#columnReorderController?.onDragOver(evt, header.column) : nothing}
                @drop=${canAcceptDrop ? (evt: DragEvent) => this.#columnReorderController?.onDrop(evt, header.column) : nothing}
                @contextmenu=${canShowColumnMenu ? (evt: MouseEvent) => this.#onHeaderContextMenu(evt, header.column) : nothing}>
                <div
                  class="cell-container"
                  part="head-cell-container"
                  draggable=${canBeDragged ? 'true' : 'false'}
                  @dragstart=${canBeDragged ? (evt: DragEvent) => this.#onHeaderDragStart(evt, header.column) : nothing}
                  @dragend=${canBeDragged ? (evt: DragEvent) => this.#onHeaderDragEnd(evt) : nothing}
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
                        ? (evt: MouseEvent) => this.#onHeaderClick(evt, header.column)
                        : null}>
                    <span class="cell-text">${header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</span>
                    ${this.sortable && header.column.getIsSorted()
                      ? html`
                          ${this._sorting.length > 1 ? html`<span class="sort-index" part="sort-index">${header.column.getSortIndex() + 1}</span>` : nothing}
                          ${svg`<svg class="sort-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"/></svg>`}
                        `
                      : null}
                    <forge-data-table-column-menu .table=${table} .column=${header.column} .reorderable=${this.reorderable}></forge-data-table-column-menu>
                  </div>
                </div>
                ${this.filterable && header.column.getCanFilter() ? html`<div class="filter-container">${renderFilterField(header.column)}</div>` : nothing}
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

  #renderCell(cell: Cell<TData, unknown>, rowId: string, groupStartColumnIds: ReadonlySet<string>): TemplateResult {
    return html`
      <td
        part="body-cell cell"
        style=${styleMap({ width: this.#getColumnWidthStyle(cell.column) })}
        class=${classMap({
          'select-column': this.rowSelection && cell.column.columnDef.id === SELECT_COLUMN_ID,
          'group-start': groupStartColumnIds.has(cell.column.id)
        })}
        id=${cell.column.id}
        ?data-forge-stop-row-click-propagation=${cell.column.columnDef.meta?.stopRowClickPropagation || cell.column.columnDef.id === SELECT_COLUMN_ID}>
        <div class="cell-content" part="body-cell-content cell-content">
          ${cell.column.columnDef.meta?.cellSlot
            ? guard([cell.column], () => html`<slot ${lightDomRender(this, cell)} name=${`col-${cell.column.id}:row-${rowId}`}></slot>`)
            : flexRender(cell.column.columnDef.cell, cell.getContext())}
        </div>
      </td>
    `;
  }

  #renderTableBody(table: Table<TData>): TemplateResult {
    const groupStartColumnIds = this.#getGroupStartColumnIds(table);
    return html`<tbody class="standard-tbody">
      ${repeat(
        table.getRowModel().rows,
        row => row.id,
        row => html`
          <tr
            class=${classMap({ selected: row.getIsSelected() })}
            part="body-tr tr"
            @click=${this.allowRowClick ? (evt: MouseEvent) => this.#onRowClick(evt, row.index, row.original) : nothing}>
            ${row.getVisibleCells().map(cell => this.#renderCell(cell, row.id, groupStartColumnIds))}
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

  #renderTableFooter(table: Table<TData>): TemplateResult | typeof nothing {
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
                  colspan=${ifDefined(header.colSpan > 1 ? header.colSpan : undefined)}
                  style=${styleMap({ width: this.#getColumnWidthStyle(header.column) })}
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

  #renderColumnVisibilityPopover(table: Table<TData>): TemplateResult {
    const anchorId = this._columnMenuAnchorId ?? undefined;
    const items = table.getAllLeafColumns().filter(column => column.id !== SELECT_COLUMN_ID && column.getCanHide());

    return html`
      <forge-popover
        id="column-visibility-popover"
        anchor=${ifDefined(anchorId)}
        placement="bottom-start"
        position-strategy="fixed"
        trigger-type="manual"
        anchor-accessibility="none"
        .open=${this._columnMenuOpen}
        @forge-popover-toggle=${(evt: CustomEvent<IPopoverToggleEventData>) => this.#onColumnMenuToggle(evt)}>
        <forge-list role="menu">
          ${items.length
            ? items.map(column => this.#renderColumnVisibilityItem(column))
            : html`<forge-list-item disabled>No columns available</forge-list-item>`}
        </forge-list>
      </forge-popover>
    `;
  }

  #renderColumnVisibilityItem(column: Column<TData, unknown>): TemplateResult {
    const isVisible = column.getIsVisible();

    return html`
      <forge-list-item
        role="menuitemcheckbox"
        aria-checked=${isVisible ? 'true' : 'false'}
        value=${column.id}
        @click=${(evt: Event) => this.#onColumnMenuItemClick(evt, column)}>
        <forge-checkbox slot="start" .checked=${isVisible} @change=${(evt: Event) => this.#onColumnMenuCheckboxChange(evt, column)}></forge-checkbox>
        <span>${this.#getColumnMenuLabel(column)}</span>
      </forge-list-item>
    `;
  }

  #onHeaderDragStart(evt: DragEvent, column: Column<TData>): void {
    this.#isDragging = true;
    this.#columnReorderController?.onDragStart(evt, column);
  }

  #onHeaderDragEnd(evt: DragEvent): void {
    this.#isDragging = false;
    this.#columnReorderController?.onDragEnd(evt);
  }

  #onHeaderClick(evt: MouseEvent, column: Column<TData>): void {
    if (this.#isDragging) {
      this.#isDragging = false;
      return;
    }
    if (this.sortable && column.getCanSort()) {
      column.getToggleSortingHandler()?.(evt);
    }
  }

  async #onHeaderContextMenu(evt: MouseEvent, column: Column<TData, unknown>): Promise<void> {
    evt.preventDefault();

    const target = evt.currentTarget as HTMLElement | null;
    if (!target) {
      return;
    }

    this._columnMenuAnchorId = target.id || this.#getColumnHeaderId(column.id);
    this._columnMenuOpen = true;

    await this.updateComplete;
    if (this._columnVisibilityPopover) {
      this._columnVisibilityPopover.open = true;
    }
  }

  #onColumnMenuToggle(evt: CustomEvent<IPopoverToggleEventData>): void {
    const { newState } = evt.detail;

    if (newState === 'closed') {
      this.#closeColumnMenu();
      return;
    }

    if (newState === 'open') {
      this._columnMenuOpen = true;
    }
  }

  #onColumnMenuItemClick(evt: Event, column: Column<TData, unknown>): void {
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
    this.#toggleColumnVisibility(column);
  }

  #onColumnMenuCheckboxChange(evt: Event, column: Column<TData, unknown>): void {
    evt.stopPropagation();

    this.#toggleColumnVisibility(column);
  }

  #toggleColumnVisibility(column: Column<TData, unknown>): void {
    const columnId = column.id;
    if (!columnId) {
      return;
    }

    if (column.getIsVisible()) {
      this.hideColumn(columnId);
    } else {
      this.showColumn(columnId);
    }

    this.#closeColumnMenu();
  }

  #getColumnMenuLabel(column: Column<TData, unknown>): string {
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

  #getColumnHeaderId(columnId: string): string {
    return `column-header-${columnId}`;
  }

  #closeColumnMenu(): void {
    this._columnMenuOpen = false;
    this._columnMenuAnchorId = null;
  }

  #setReorderable(): void {
    if (!this.reorderable) {
      if (this.#columnReorderController) {
        this.removeController(this.#columnReorderController);
        this.#columnReorderController = null;
      }
      this.columnOrder = [];
      return;
    }

    if (!this.#columnReorderController) {
      this.#columnReorderController = new ColumnReorderController(this, {
        selectColumnId: SELECT_COLUMN_ID,
        onColumnOrderChange: updaterOrValue => this.#onColumnOrderChange(updaterOrValue)
      });
      this.addController(this.#columnReorderController);
    }

    this.columnOrder = getAllColumnIds(this.columns);

    if (this.rowSelection !== 'off') {
      const orderToUpdate = [...this.columnOrder];
      this.#columnReorderController.ensureSelectColumnOrder(orderToUpdate);
      this.columnOrder = orderToUpdate;
    }
  }

  #setVirtualized(): void {
    if (!this.virtualized) {
      if (this._virtualizerController) {
        this.removeController(this._virtualizerController);
        this._virtualizerController = null;
      }
      return;
    }

    if (!this._virtualizerController) {
      this._virtualizerController = new VirtualizerController(this, {
        getScrollElement: () => this.#tableContainerRef.value as HTMLElement,
        estimateSize: () => (this.compact ? COMPACT_ROW_HEIGHT : DEFAULT_ROW_HEIGHT),
        overscan: VIRTUALIZER_OVERSCAN,
        count: this._data.length
      });
      this.addController(this._virtualizerController);
      return;
    }

    const virtualizer = this._virtualizerController.getVirtualizer();
    virtualizer.setOptions({
      ...virtualizer.options,
      count: this._data.length
    });
  }

  #onSort(updaterOrValue: Updater<SortingState>): void {
    this._sorting = typeof updaterOrValue === 'function' ? updaterOrValue(this._sorting) : updaterOrValue;
    if (this.manualSort) {
      this.dispatchEvent(new CustomEvent('forge-data-table-sort', { detail: this._sorting, bubbles: true, composed: true }));
    }
  }

  #onFilter(updaterOrValue: Updater<ColumnFiltersState>): void {
    this._columnFilters = typeof updaterOrValue === 'function' ? updaterOrValue(this._columnFilters) : updaterOrValue;
    if (this.manualFilter) {
      this.dispatchEvent(new CustomEvent('forge-data-table-filter', { detail: this._columnFilters, bubbles: true, composed: true }));
    }
  }

  #onRowSelect(updaterOrValue: Updater<Record<string, boolean>>): void {
    this._rowSelection = typeof updaterOrValue === 'function' ? updaterOrValue(this._rowSelection) : updaterOrValue;
    this.dispatchEvent(new CustomEvent('forge-data-table-row-select', { detail: this._rowSelection, bubbles: true, composed: true }));
  }

  #onColumnVisibilityChange(updaterOrValue: Updater<VisibilityState>): void {
    const nextState = typeof updaterOrValue === 'function' ? updaterOrValue(this.columnVisibility) : updaterOrValue;
    this.#columnVisibilityController.setVisibilityState(nextState);
  }

  #emitColumnVisibilityChange(nextState: VisibilityState): void {
    this.dispatchEvent(new CustomEvent('forge-data-table-column-visibility', { detail: nextState, bubbles: true, composed: true }));
  }

  #onColumnOrderChange(updaterOrValue: Updater<ColumnOrderState>): void {
    this.columnOrder = typeof updaterOrValue === 'function' ? updaterOrValue(this.columnOrder) : updaterOrValue;
    this.dispatchEvent(new CustomEvent('forge-data-table-column-order', { detail: this.columnOrder, bubbles: true, composed: true }));
  }

  #onRowClick(evt: MouseEvent, index: number, data: TData): void {
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

  #renderVirtualizedTableBody(table: Table<TData>): TemplateResult {
    if (!this.#tableContainerRef || !this._virtualizerController) {
      return this.#renderTableBody(table);
    }

    const rows = table.getRowModel().rows;
    const virtualizer = this._virtualizerController.getVirtualizer();
    const virtualItems = virtualizer.getVirtualItems();
    const totalHeight = virtualizer.getTotalSize();
    const groupStartColumnIds = this.#getGroupStartColumnIds(table);

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
              @click=${this.allowRowClick ? (evt: MouseEvent) => this.#onRowClick(evt, row.index, row.original) : nothing}>
              ${repeat(
                row.getVisibleCells(),
                cell => cell.id,
                cell => this.#renderCell(cell, row.id, groupStartColumnIds)
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

  #getColumnSizeStyles(table: Table<TData>): Record<string, string> {
    if (!this.resizable) {
      return {};
    }

    const colStyles: Record<string, string> = {};
    table.getFlatHeaders().forEach(header => {
      if (!header.column.getCanResize()) {
        return;
      }
      colStyles[this.#getColumnSizeVarName(header.column.id)] = `${header.getSize()}px`;
    });

    return colStyles;
  }

  #getColumnWidthStyle(column: Column<TData, unknown>): string | null {
    if (!this.resizable || !column.getCanResize()) {
      return null;
    }

    return `var(${this.#getColumnSizeVarName(column.id)})`;
  }

  #getColumnSizeVarName(columnId: string): string {
    const sanitizedId = columnId.replace(/[^a-zA-Z0-9_-]/g, '-');
    const hasValidChar = /[a-zA-Z0-9]/.test(sanitizedId);
    return `--forge-data-table-column-${hasValidChar ? sanitizedId : 'column'}-size`;
  }

  /**
   * Hides a column by ID.
   * @param {string} columnId - The ID of the column to hide.
   */
  public hideColumn(columnId: string): void {
    this.#columnVisibilityController.hideColumn(columnId);
  }

  /**
   * Shows a previously hidden column by ID.
   * @param {string} columnId - The ID of the column to show.
   */
  public showColumn(columnId: string): void {
    this.#columnVisibilityController.showColumn(columnId);
  }

  /**
   * Toggles the visibility of a column by ID.
   * @param {string} columnId - The ID of the column to toggle.
   */
  public toggleColumnVisibility(columnId: string): void {
    this.#columnVisibilityController.toggleColumnVisibility(columnId);
  }
}

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
