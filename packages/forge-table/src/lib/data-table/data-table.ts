import {
  CellSelectionRange,
  CellSelectionState,
  ColumnFiltersState,
  ColumnOrderState,
  ColumnPinningState,
  ColumnVisibilityState,
  GroupingState,
  LitTable,
  PaginationState,
  RowSelectionState,
  SelectCellRangeOptions,
  SortingState,
  TableController,
  ColumnDef as TanstackColumnDef,
  Updater
} from '@tanstack/lit-table';
import type { DataSource } from '@tylertech/forge-core';
import { html, LitElement, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
  applyColumnHeaders,
  getAllColumnIds,
  getAllLeafColumns,
  mapColumns,
  prependGroupsColumn,
  prependSelectColumn,
  resolveColumnId
} from './columns/column-utils.js';
import { COLUMNS_CHANGE_EVENT, DATA_TABLE_DEF_KEYS, DEFAULT_COLUMN_WIDTH, FETCH_SKIP, FETCH_TAKE, GROUPS_COLUMN_ID, SELECT_COLUMN_ID } from './constants.js';
import { ColumnReorderController } from './controllers/column-reorder-controller.js';
import { ColumnVisibilityController } from './controllers/column-visibility-controller.js';
import { CellRenderController } from './features/cell-render.js';
import { CellSlotController } from './features/cell-slot.js';
import { CellSelectionController } from './features/cell-selection.js';
import { getColumnPinningState, pinSelectColumn } from './features/column-pinning.js';
import { ColumnRenameController } from './features/column-rename.js';
import { DEFAULT_PAGINATION, PaginationController } from './features/pagination.js';
import { RowClickController } from './features/row-click.js';
import { getAriaRowCount, getRowIndexing } from './features/row-indexing.js';
import { ColumnFilterFnController } from './features/filter-fn.js';
import { GlobalFilter } from './features/global-filter.js';
import { getColumnSizeStyles } from './features/column-sizing.js';
import { buildCsv, buildSelectionCsv, DEFAULT_CSV_FILENAME, downloadCsv } from './features/csv-export.js';
import { HostSemantics } from './features/host-semantics.js';
import { buildPrintDocument, printDocument } from './features/print.js';
import { canExpandRow, ExpandedSlotController, prependExpanderColumn } from './features/expander.js';
import { getGroupedColumnOrder } from './features/row-grouping.js';
import { isMultiSortEvent } from './features/sorting.js';
import { RowVirtualization } from './features/virtualization.js';
import { dataTableFeatures, type DataTableFeatures } from './table-features.js';
import { renderBody } from './templates/body.js';
import { renderColumnGroup } from './templates/column-group.js';
import { renderTableFooter } from './templates/footer.js';
import { renderTableHeader } from './templates/header.js';
import { renderPaginator } from './templates/paginator.js';
import type {
  CellRenderFn,
  ColumnDef,
  ColumnFilterOption,
  DataTableDef,
  EnableCellSelectionFn,
  FilterFnChangeEventDetail,
  GlobalFilterFnChangeEventDetail,
  MultiSortKey,
  ResolvedColumnFilter,
  Row,
  RowSelectionType
} from './types.js';

import '@tylertech/forge/checkbox';
import '@tylertech/forge/date-picker';
import '@tylertech/forge/icon-button';
import '@tylertech/forge/list';
import '@tylertech/forge/popover';
import '@tylertech/forge/text-field';
import '@tylertech/forge/tooltip';
import '../column-menu/column-menu.js';

import styles from './data-table.scss';

export { registerFilterFns } from './features/filter-fn.js';
export { actionCell, type ActionButtonConfig } from './templates/action-cell.js';
export { ratingCell, type RatingOptions } from './templates/rating-cell.js';
export { linkCell, type LinkCellOptions, type LinkCellType } from './templates/link-cell.js';
export { badgeCell, type BadgeCellConfig, type BadgeCellFn, type BadgeCellOptions } from './templates/badge-cell.js';
export { meterCell, type MeterCellOptions } from './templates/meter-cell.js';
export type { CellSelectionRange, CellSelectionState, SelectCellRangeOptions } from '@tanstack/lit-table';
export type {
  CellRenderFn,
  ColumnAggregation,
  ColumnDef,
  DataTableDef,
  EnableCellSelectionFn,
  ColumnFilter,
  ColumnFilterFn,
  ColumnFilterOption,
  DataType,
  FilterFieldConfig,
  FilterFieldOption,
  FilterFieldType,
  FilterFnChangeEventDetail,
  FooterCallback,
  GlobalFilterFnChangeEventDetail,
  MultiSortKey,
  Row,
  RowSelectionType,
  TemplateFn
} from './types.js';

/**
 * @tag forge-data-table
 */
@customElement('forge-data-table')
export class DataTableElement<TData extends Row = Row> extends LitElement {
  public static override styles = unsafeCSS(styles);

  /**
   * The whole table configuration as one object.
   *
   * Reading it returns the current value of every configuration property. Setting it assigns each field it contains to the property of the
   * same name, and leaves the others as they are, so it can be combined with setting individual properties or attributes. A field set to
   * `undefined` is ignored, except `dataSource` and `maxMultiSortColCount`, where `undefined` clears the value.
   */
  public get config(): DataTableDef<TData> {
    return Object.fromEntries(Object.keys(DATA_TABLE_DEF_KEYS).map(key => [key, this[key as keyof DataTableDef]]));
  }

  public set config(def: DataTableDef<TData>) {
    const entries = (Object.keys(DATA_TABLE_DEF_KEYS) as (keyof DataTableDef)[]).filter(
      key => key in def && (def[key] !== undefined || DATA_TABLE_DEF_KEYS[key])
    );
    Object.assign(this, Object.fromEntries(entries.map(key => [key, def[key]])));
  }

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
  public columnVisibility: ColumnVisibilityState = {};

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
  public multiSortKey: MultiSortKey = 'shift';

  /**
   * Whether the columns in the table can be filtered.
   */
  @property({ type: Boolean })
  public filterable = false;

  /**
   * The filter functions that `globalFilter()` matches its text with, in the same form as `ColumnDef.filter`: a filter function, the name it was
   * registered under, a `ColumnFilter` with a `label`, or a list of them. A `field` is ignored.
   *
   * The first function is the default. With more than one, `forge-data-table-search` shows a menu to choose between them (labelled like the column
   * filter function menu), and `setGlobalFilterFn()` chooses one in code. Setting the property resets the choice to the first. Without it, the table
   * matches case-insensitively with TanStack's `includesString`.
   *
   * The built-in functions and `fuzzyFilter` (from `@tylertech/forge-table/data-table/features/fuzzy`) work as they do for a column; each runs against every
   * column the global filter searches, and a row is kept when one of them passes.
   */
  @property({ attribute: false })
  public filter: ColumnFilterOption<TData> | ColumnFilterOption<TData>[] | undefined;

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
   * Allow individual cells to be selected, either one at a time or as ranges.
   *
   * Click a cell to select it, hold Shift while clicking or dragging to select a range, and hold Ctrl or Cmd to add or remove ranges.
   * The arrow keys move the selection, Shift+arrow keys extend it, Ctrl/Cmd+A selects every cell, and Escape clears it.
   * Cells in the row selection column and in columns that are editable or set `stopRowClickPropagation` cannot be selected,
   * unless the column sets its own `enableCellSelection`.
   */
  @property({ type: Boolean, attribute: 'cell-selection' })
  public cellSelection = false;

  /**
   * Controls which cells can be selected while `cellSelection` is on. Pass `false` to make every cell unselectable, or a function
   * that receives each cell and returns whether it can be selected.
   *
   * A column's `enableCellSelection` takes precedence over this value for that column's cells.
   */
  @property({ attribute: false })
  public enableCellSelection: boolean | EnableCellSelectionFn<any, any> = true;

  /**
   * Allow columns to be reordered.
   */
  @property({ type: Boolean })
  public reorderable = false;

  /**
   * Allow rows to be clicked.
   *
   * Only rows that contain an element with a `forge-default-action` attribute, can be selected, or can be expanded are clickable. Clicking one dispatches
   * `forge-data-table-row-click`, then clicks the `forge-default-action` element if there is one, otherwise toggles the row selection if it can be selected,
   * otherwise toggles the expansion. Other rows get no clickable styles and no event.
   */
  @property({ type: Boolean, attribute: 'allow-row-click' })
  public allowRowClick = false;

  /**
   * Allow rows to be expanded.
   */
  @property({ type: Boolean })
  public expandable = false;

  /**
   * Allow rows to be grouped by column.
   *
   * Adds a "Group" action to each column menu. A column opts out with `groupable: false`. Setting `grouping` groups the rows whether or not this is set.
   */
  @property({ type: Boolean })
  public groupable = false;

  /**
   * The ids of the columns to group the rows by, outermost group first.
   *
   * Each group is a row that can be expanded and collapsed. It shows the grouped value and the number of rows, and
   * the aggregate of each column that sets `aggregate`. Groups are collapsed until they are expanded. Users change this through
   * the column menu when `groupable` is set, which dispatches `forge-data-table-grouping`.
   */
  @property({ type: Array })
  public grouping: string[] = [];

  /**
   * Show the grouped columns in a single column labelled "Groups" instead of in their own columns.
   *
   * The grouped columns are removed from the table while the rows are grouped, and each group row shows its label, row count and
   * expand toggle in the "Groups" column, indented by its depth. The column is not shown while nothing is grouped.
   */
  @property({ type: Boolean, attribute: 'single-group-column' })
  public singleGroupColumn = false;

  /**
   * Enable virtualization for rows in the table.
   */
  @property({ type: Boolean })
  public virtualized = false;

  /**
   * Show the rows one page at a time.
   *
   * Place a `forge-paginator` in the `paginator` slot to let users change the page and the page size. The table adopts the paginator's `page-size`
   * when it first finds it and starts on the first page, then keeps its `total`, `page-index` and `page-size` in sync with the table. Pages are made from the
   * sorted, filtered and grouped rows, and the page resets to the first when those change. Without a paginator the table shows the first page of
   * 25 rows.
   */
  @property({ type: Boolean })
  public paginate = false;

  /**
   * Keep the header row stuck to the top while scrolling through the table.
   */
  @property({ type: Boolean, attribute: 'sticky-header' })
  public stickyHeader = false;

  /**
   * Keep the footer row stuck to the bottom while scrolling through the table.
   */
  @property({ type: Boolean, attribute: 'sticky-footer' })
  public stickyFooter = false;

  /**
   * Returns the accessible name for a given row.
   */
  @property({ attribute: false })
  public getRowName: (row: TData, index: number) => string = (_, index) => `Row ${index + 1}`;

  /**
   * Returns the child rows of a given row, or `undefined` when it has none.
   *
   * The table builds its row hierarchy from the result, which TanStack exposes as each row's `subRows`.
   */
  @property({ attribute: false })
  public getSubRows: ((row: TData, index: number) => ReadonlyArray<TData> | undefined) | undefined;

  /**
   * Returns whether a given row has a detail row.
   *
   * A row with content in its `expanded:row-<id>` slot has one regardless.
   */
  @property({ attribute: false })
  public getRowHasDetail: ((row: TData, index: number) => boolean) | undefined;

  /**
   * Returns the detail element for a given row.
   *
   * When not set, the detail of a row that has one (see `getRowHasDetail`) is the content in its `expanded:row-<id>` slot.
   */
  @property({ attribute: false })
  public getRowDetail: ((row: TData, index: number) => HTMLElement) | undefined;

  /**
   * Converts the selected cells to the text that Ctrl/Cmd+C copies to the clipboard while `cellSelection` is on.
   *
   * Receives the same grids as `getSelectedCellRangesData()` (`[region][row][column]`) and returns the clipboard text. The default writes
   * the cells as CSV, with the rows of each region one after another.
   */
  @property({ attribute: false })
  public getSelectionClipboardValue: (data: unknown[][][]) => string = buildSelectionCsv;

  /**
   * Called after each body cell renders, to modify the cell's DOM in place.
   *
   * Receives the same props as a column `template` plus `element`, the cell's `<td>`, and returns nothing. It runs after every render of the table, so
   * it must be idempotent. It is not called for group rows or the selection, expander and groups columns. A column's own `onCellRender` takes
   * precedence over this one for that column's cells.
   */
  @property({ attribute: false })
  public onCellRender: CellRenderFn<TData> | undefined;

  @state() private _data: TData[] = [];
  @state() private _columns: TanstackColumnDef<DataTableFeatures, TData>[] = [];
  @state() private _tableColumns: TanstackColumnDef<DataTableFeatures, TData>[] = [];
  @state() private _sorting: SortingState = [];
  @state() private _columnFilters: ColumnFiltersState = [];
  @state() private _columnPinning: ColumnPinningState = { start: [], end: [] };
  @state() private _rowSelection: RowSelectionState = {};
  @state() private _pagination: PaginationState = { ...DEFAULT_PAGINATION };

  #tableController = new TableController<DataTableFeatures, TData>(this);
  #table: LitTable<DataTableFeatures, TData> | null = null;
  #tableContainerRef = createRef<HTMLElement>();
  #columnReorderController: ColumnReorderController<TData> | null = null;
  #appliedColumnHeaders: Record<string, string> = {};
  #appliedFilterFns: Readonly<Record<string, number>> = {};
  #appliedGlobalFilter: ResolvedColumnFilter<TData> | undefined;
  readonly #hostSemantics: HostSemantics;
  readonly #virtualization = new RowVirtualization<TData>(this, () => this.#tableContainerRef.value);
  readonly #columnVisibilityController = new ColumnVisibilityController<TData>(this, {
    selectColumnId: SELECT_COLUMN_ID,
    onVisibilityChange: nextState => this.#emitColumnVisibilityChange(nextState)
  });
  readonly #columnRename = new ColumnRenameController<TData>(this, {
    getTable: () => this.#table,
    getSorting: () => this._sorting,
    setSorting: sorting => this.#onSort(sorting)
  });
  readonly #columnFilterFn = new ColumnFilterFnController<TData>(this, {
    refilter: () => this.#onFilter(filters => [...filters])
  });
  readonly #globalFiltering = new GlobalFilter<TData>(this);
  readonly #cellRender = new CellRenderController<TData>(this);
  readonly #cellSlot = new CellSlotController(this);
  readonly #pagination = new PaginationController<TData>(this, {
    getTable: () => this.#table,
    getPagination: () => this._pagination,
    setPagination: pagination => this.#onPagination(pagination)
  });
  readonly #cellSelection = new CellSelectionController<TData>(this, {
    getTable: () => this.#table,
    getScrollElement: () => this.#tableContainerRef.value,
    scrollToRow: rowIndex => this.#virtualization.scrollToRow(rowIndex)
  });

  constructor() {
    super();
    this.#hostSemantics = new HostSemantics(this, this.attachInternals());
    new RowClickController<TData>(this);
    new ExpandedSlotController(this);
  }

  public updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('columns')) {
      this.dispatchEvent(new CustomEvent(COLUMNS_CHANGE_EVENT, { bubbles: true, composed: true }));
    }
  }

  public willUpdate(changedProperties: PropertyValues<this>): void {
    this.#hostSemantics.updateStates(changedProperties);

    if (!this.hasUpdated || changedProperties.has('cellSelection')) {
      this.#hostSemantics.updateRole();
    }

    if (changedProperties.has('columns')) {
      this.#handleColumnsChange();
    }

    if (changedProperties.has('cellSelection') && !this.cellSelection) {
      this.#cellSelection.reset();
    }

    if (changedProperties.has('filter')) {
      this.#globalFiltering.setFilters(this.filter);
    }

    this.#checkRecreateTableController(changedProperties);

    if (changedProperties.has('reorderable') || changedProperties.has('rowSelection') || changedProperties.has('columns')) {
      this.#setReorderable();
    }

    if (
      changedProperties.has('columns') ||
      changedProperties.has('rowSelection') ||
      changedProperties.has('singleGroupColumn') ||
      changedProperties.has('expandable')
    ) {
      this.#updateColumnPinning();
    }

    if (
      changedProperties.has('columns') ||
      changedProperties.has('rowSelection') ||
      changedProperties.has('singleGroupColumn') ||
      changedProperties.has('expandable') ||
      this.#columnRename.headers !== this.#appliedColumnHeaders ||
      this.#columnFilterFn.selection !== this.#appliedFilterFns
    ) {
      this.#updateRenderColumns();
    }

    if (changedProperties.has('getSubRows') && this.hasUpdated) {
      this._data = [...this._data];
    }

    if (changedProperties.has('dataSource')) {
      this.#loadData();
    }

    if (changedProperties.has('virtualized') || changedProperties.has('_data' as never)) {
      this.#virtualization.sync(this._data.length);
    }
  }

  public render(): TemplateResult {
    const table = this.#tableController.table({
      features: dataTableFeatures,
      defaultColumn: {
        size: DEFAULT_COLUMN_WIDTH
      },
      columns: this._tableColumns,
      data: this._data,
      getSubRows: this.getSubRows,
      columnResizeMode: 'onChange',
      enableColumnResizing: this.resizable,
      enableSorting: this.sortable,
      enableMultiSort: this.sortable && this.multiSort,
      maxMultiSortColCount: this.maxMultiSortColCount,
      enableMultiRemove: this.multiSortRemove,
      enableSortingRemoval: this.multiSortRemove,
      isMultiSortEvent: evt => isMultiSortEvent(this.multiSortKey, evt),
      manualSorting: this.manualSort,
      onSortingChange: updaterOrValue => this.#onSort(updaterOrValue),
      enableColumnFilters: this.filterable,
      manualFiltering: this.manualFilter,
      onColumnFiltersChange: updaterOrValue => this.#onFilter(updaterOrValue),
      globalFilterFn: this.#globalFiltering.activeFilter?.filterFn ?? 'auto',
      onGlobalFilterChange: updaterOrValue => this.#globalFiltering.set(updaterOrValue),
      enableRowSelection: this.rowSelection !== 'off',
      enableMultiRowSelection: this.rowSelection === 'multiple',
      onRowSelectionChange: updaterOrValue => this.#onRowSelect(updaterOrValue),
      manualPagination: !this.paginate,
      onPaginationChange: updaterOrValue => this.#onPagination(updaterOrValue),
      enableCellSelection: this.cellSelection && (cell => this.#cellSelection.canSelect(cell)),
      onCellSelectionChange: updaterOrValue => this.#cellSelection.onSelectionChange(updaterOrValue),
      onColumnVisibilityChange: updaterOrValue => this.#onColumnVisibilityChange(updaterOrValue),
      onColumnOrderChange: updaterOrValue => this.#onColumnOrderChange(updaterOrValue),
      onColumnPinningChange: updaterOrValue => this.#onColumnPinningChange(updaterOrValue),
      enableGrouping: this.groupable,
      groupedColumnMode: this.singleGroupColumn ? 'remove' : false,
      onGroupingChange: updaterOrValue => this.#onGroupingChange(updaterOrValue),
      getRowCanExpand: row => canExpandRow(this, row),
      state: {
        sorting: this._sorting,
        columnFilters: this._columnFilters,
        globalFilter: this.#globalFiltering.value,
        columnVisibility: this.singleGroupColumn ? { ...this.columnVisibility, [GROUPS_COLUMN_ID]: this.grouping.length > 0 } : this.columnVisibility,
        columnOrder: getGroupedColumnOrder(this.columnOrder, this.grouping, this.rowSelection !== 'off', this.singleGroupColumn, this.expandable),
        columnPinning: this._columnPinning,
        grouping: this.grouping,
        rowSelection: this._rowSelection,
        pagination: this._pagination,
        cellSelection: this.#cellSelection.state
      }
    });
    this.#table = table;
    this.#cellSelection.updateTabStop(table);
    const rowIndexing = getRowIndexing(this, table);
    this.#hostSemantics.updateRowCount(rowIndexing && getAriaRowCount(rowIndexing));

    return html`
      <div class="table-container" ${ref(this.#tableContainerRef)}>
        <table
          class=${classMap({
            'allow-row-click': this.allowRowClick,
            bordered: this.bordered,
            'cell-selection': this.cellSelection,
            compact: this.compact,
            filterable: this.filterable,
            hover: this.hover,
            'has-pinned-columns': table.getIsSomeColumnsPinned(),
            resizable: this.resizable,
            'row-selection': this.rowSelection !== 'off',
            'sticky-footer': this.stickyFooter,
            'sticky-header': this.stickyHeader,
            striped: this.striped,
            virtualized: this.virtualized
          })}
          role="presentation"
          style=${styleMap(getColumnSizeStyles(table, this.resizable))}>
          ${renderColumnGroup(table, this.resizable)}
          <thead role="rowgroup">
            ${renderTableHeader({
              host: this,
              table,
              sorting: this._sorting,
              rename: this.#columnRename,
              filterFn: this.#columnFilterFn,
              reorder: this.#columnReorderController,
              rowIndexing
            })}
          </thead>
          ${renderBody({
            host: this,
            table,
            filtered: this._columnFilters.length > 0 || this.#globalFiltering.active,
            cellSelection: this.#cellSelection,
            cellRender: this.#cellRender,
            cellSlot: this.#cellSlot,
            virtualization: this.#virtualization,
            pagination: this.#pagination,
            rowIndexing
          })}
          ${renderTableFooter(table, this.resizable, rowIndexing)}
        </table>
      </div>
      ${renderPaginator(this, this.#pagination)}
    `;
  }

  #handleColumnsChange(): void {
    this._columns = mapColumns<TData>(this.columns);

    getAllLeafColumns(this.columns).forEach(({ column, indexPath }) => {
      if (!column.useTemplateSlot) {
        const columnId = resolveColumnId(column, indexPath);
        this.querySelectorAll(`:scope > [data-custom-cell][slot^="col-${CSS.escape(columnId)}:"]`).forEach(el => el.remove());
      }
    });

    const derivedVisibility = this.#columnVisibilityController.deriveVisibilityState();
    if (derivedVisibility) {
      this.#columnVisibilityController.setVisibilityState(derivedVisibility, { notifyHost: false });
    }

    this.#columnRename.reset();
    this.#columnFilterFn.reset();
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
      changedProperties.has('cellSelection') ||
      changedProperties.has('enableCellSelection') ||
      changedProperties.has('expandable') ||
      changedProperties.has('groupable') ||
      changedProperties.has('singleGroupColumn') ||
      changedProperties.has('stickyHeader') ||
      changedProperties.has('stickyFooter') ||
      changedProperties.has('virtualized') ||
      changedProperties.has('paginate') ||
      this.#globalFiltering.activeFilter !== this.#appliedGlobalFilter;

    if (needsRecreation) {
      this.#appliedGlobalFilter = this.#globalFiltering.activeFilter;
      this.removeController(this.#tableController);
      this.#tableController = new TableController<DataTableFeatures, TData>(this);

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

  #updateColumnPinning(): void {
    this._columnPinning = getColumnPinningState(this.columns, this.rowSelection !== 'off', this.singleGroupColumn, this.expandable);
  }

  #updateRenderColumns(): void {
    this.#appliedColumnHeaders = this.#columnRename.headers;
    this.#appliedFilterFns = this.#columnFilterFn.selection;
    const renamed = this.#columnFilterFn.apply(applyColumnHeaders(this._columns, this.#appliedColumnHeaders));
    const grouped = this.singleGroupColumn ? prependGroupsColumn(renamed) : renamed;
    const columns = this.expandable ? prependExpanderColumn(grouped) : grouped;
    this._tableColumns = this.rowSelection === 'off' ? columns : prependSelectColumn(columns, this.rowSelection);
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

  #onSort(updaterOrValue: Updater<SortingState>): void {
    this._sorting = typeof updaterOrValue === 'function' ? updaterOrValue(this._sorting) : updaterOrValue;
    if (this.manualSort) {
      this.dispatchEvent(new CustomEvent('forge-data-table-sort', { detail: this._sorting, bubbles: true, composed: true }));
    }
  }

  #onGroupingChange(updaterOrValue: Updater<GroupingState>): void {
    this.grouping = typeof updaterOrValue === 'function' ? updaterOrValue(this.grouping) : updaterOrValue;
    this.dispatchEvent(new CustomEvent('forge-data-table-grouping', { detail: this.grouping, bubbles: true, composed: true }));
  }

  #onFilter(updaterOrValue: Updater<ColumnFiltersState>): void {
    this._columnFilters = typeof updaterOrValue === 'function' ? updaterOrValue(this._columnFilters) : updaterOrValue;
    if (this.manualFilter) {
      this.dispatchEvent(new CustomEvent('forge-data-table-filter', { detail: this._columnFilters, bubbles: true, composed: true }));
    }
  }

  #onPagination(updaterOrValue: Updater<PaginationState>): void {
    this._pagination = typeof updaterOrValue === 'function' ? updaterOrValue(this._pagination) : updaterOrValue;
  }

  #onRowSelect(updaterOrValue: Updater<RowSelectionState>): void {
    this._rowSelection = typeof updaterOrValue === 'function' ? updaterOrValue(this._rowSelection) : updaterOrValue;
    this.dispatchEvent(new CustomEvent('forge-data-table-row-select', { detail: this._rowSelection, bubbles: true, composed: true }));
  }

  #onColumnVisibilityChange(updaterOrValue: Updater<ColumnVisibilityState>): void {
    const nextState = typeof updaterOrValue === 'function' ? updaterOrValue(this.columnVisibility) : updaterOrValue;
    this.#columnVisibilityController.setVisibilityState(nextState);
  }

  #onColumnPinningChange(updaterOrValue: Updater<ColumnPinningState>): void {
    const nextState = typeof updaterOrValue === 'function' ? updaterOrValue(this._columnPinning) : updaterOrValue;
    this._columnPinning = pinSelectColumn(nextState, this.rowSelection !== 'off', this.singleGroupColumn, this.expandable);
  }

  #emitColumnVisibilityChange(nextState: ColumnVisibilityState): void {
    this.dispatchEvent(new CustomEvent('forge-data-table-column-visibility', { detail: nextState, bubbles: true, composed: true }));
  }

  #onColumnOrderChange(updaterOrValue: Updater<ColumnOrderState>): void {
    this.columnOrder = typeof updaterOrValue === 'function' ? updaterOrValue(this.columnOrder) : updaterOrValue;
    this.dispatchEvent(new CustomEvent('forge-data-table-column-order', { detail: this.columnOrder, bubbles: true, composed: true }));
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
   * Sets the order of the columns, by ID. Emits `forge-data-table-column-order`.
   *
   * Works whether or not `reorderable` is on. Setting `columns` resets the order.
   * @param {string[]} columnOrder - The IDs of the columns, in display order.
   */
  public setColumnOrder(columnOrder: ColumnOrderState): void {
    this.#onColumnOrderChange(columnOrder);
  }

  /**
   * Toggles the visibility of a column by ID.
   * @param {string} columnId - The ID of the column to toggle.
   */
  public toggleColumnVisibility(columnId: string): void {
    this.#columnVisibilityController.toggleColumnVisibility(columnId);
  }

  /**
   * Selects a rectangle of cells, given by its two corners as row and column ids.
   *
   * By default the range replaces the current selection. Pass `{ mode: 'include' }` to add it alongside the existing ranges, or
   * `{ mode: 'exclude' }` to subtract it from them. Emits `forge-data-table-cell-select`.
   *
   * Does nothing unless `cellSelection` is on and the table has rendered. Ids are not validated, and the selection is cleared when the
   * rows change, so call this after the rows have loaded.
   * @param {CellSelectionRange} range - The corners of the range: `anchorRowId`, `anchorColumnId`, `focusRowId` and `focusColumnId`.
   * @param {SelectCellRangeOptions} options - How the range combines with the current selection.
   */
  public selectCellRange(range: CellSelectionRange, options?: SelectCellRangeOptions): void {
    if (!this.#table || !this.cellSelection) {
      return;
    }
    this.#table.selectCellRange(range, options);
  }

  /**
   * Returns the values of the selected cells, one entry per selected region.
   *
   * Each region is a row-major grid indexed as `[regionIndex][rowIndex][columnIndex]`, in the order the rows and columns are currently
   * displayed (so it follows sorting, filtering, column order and pinning). Values are the cells' accessor values, so a column with
   * a `format` yields its formatted text. Overlapping ranges are merged into disjoint regions and excluded cells are left out.
   *
   * Reflects the latest selection even when called straight after it changes, such as from a `forge-data-table-cell-select` listener.
   * Returns an empty array when nothing is selected, `cellSelection` is off or the table has not rendered.
   */
  public getSelectedCellRangesData(): unknown[][][] {
    // The table only sees the new selection after a render, so finish a pending one first
    if (this.hasUpdated && this.isUpdatePending) {
      void this.performUpdate();
    }
    return this.#table?.getSelectedCellRangesData() ?? [];
  }

  /**
   * Downloads the table's data as a CSV file.
   *
   * The file contains the visible columns and the rows as currently displayed, so it reflects the column order, hidden columns,
   * column renames, sorting and filtering.
   * @param {string} filename - The name of the downloaded file.
   */
  public exportToCsv(filename = DEFAULT_CSV_FILENAME): void {
    if (!this.#table) {
      return;
    }
    downloadCsv(buildCsv(this.#table), filename);
  }

  /**
   * Opens the browser's print dialog for the table's data.
   *
   * The printout contains the visible columns and every row as currently displayed (not only the rows scrolled into view), so it reflects
   * the column order, hidden columns, column renames, sorting and filtering.
   * @param {string} title - An optional heading printed above the table, also used as the document title.
   */
  public print(title = ''): void {
    if (!this.#table) {
      return;
    }
    printDocument(buildPrintDocument(this.#table, title));
  }

  /**
   * The index, in `filter`, of the function the global filter matches with. `0` when `filter` has no functions.
   */
  public get globalFilterFnIndex(): number {
    return this.#globalFiltering.activeIndex;
  }

  /**
   * Chooses which of the functions in `filter` the global filter matches with, and filters the rows again with it. Does nothing when `filter` has
   * no function at `index`. Emits `forge-data-table-global-filter-fn-change`.
   * @param {number} index - The position of the function in `filter`.
   */
  public setGlobalFilterFn(index: number): void {
    this.#globalFiltering.select(index);
  }

  /**
   * Filters the table's rows by text matched against the text and number columns (case-insensitively, unless `filter` sets another function). A row is kept
   * when any of those columns matches, and the filter combines with the column filters.
   *
   * Pass an empty string to remove the filter. Works whether or not `filterable` is on, and before the table has rendered. Emits
   * `forge-data-table-global-filter` when the text changes. With `manualFilter` the rows are not filtered; use the event to filter them.
   * @param {string} value - The text to filter by.
   */
  public globalFilter(value: string): void {
    this.#globalFiltering.set(value);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-data-table': DataTableElement<any>;
  }

  interface HTMLElementEventMap {
    'forge-data-table-sort': CustomEvent<SortingState>;
    'forge-data-table-filter': CustomEvent<ColumnFiltersState>;
    'forge-data-table-global-filter': CustomEvent<string>;
    'forge-data-table-global-filter-fn-change': CustomEvent<GlobalFilterFnChangeEventDetail<any>>;
    'forge-data-table-filter-fn-change': CustomEvent<FilterFnChangeEventDetail<any>>;
    'forge-data-table-row-select': CustomEvent<RowSelectionState>;
    'forge-data-table-cell-select': CustomEvent<CellSelectionState>;
    'forge-data-table-column-visibility': CustomEvent<ColumnVisibilityState>;
    'forge-data-table-column-order': CustomEvent<ColumnOrderState>;
    'forge-data-table-columns-change': CustomEvent<void>;
    'forge-data-table-column-rename': CustomEvent<{ columnId: string; header: string }>;
    'forge-data-table-row-click': CustomEvent<{ data: unknown; index: number }>;
  }
}
