import type { CellSelectionDirection } from '@tanstack/lit-table';
import type { DataTableDef } from './types.js';

export const SELECT_COLUMN_ID = 'SELECT_COLUMN_ID';
export const EXPANDER_COLUMN_ID = 'EXPANDER_COLUMN_ID';
export const GROUPS_COLUMN_ID = 'GROUPS_COLUMN_ID';
export const GROUPS_COLUMN_HEADER = 'Groups';

export const DEFAULT_COLUMN_WIDTH = 172;
export const SELECT_COLUMN_WIDTH = 40;
export const EXPANDER_COLUMN_WIDTH = 48;
export const EXPANDED_SLOT_PREFIX = 'expanded:row-';
export const EXPANDER_COLUMN_LABEL = 'Toggle row expansion';
export const GROUPS_COLUMN_WIDTH = 240;
export const GROUP_INDENT_WIDTH = 24;
export const COMPACT_ROW_HEIGHT = 32;
export const DEFAULT_ROW_HEIGHT = 48;
export const VIRTUALIZER_OVERSCAN = 5;
export const FETCH_SKIP = 0;
export const FETCH_TAKE = Number.MAX_SAFE_INTEGER;
export const DEFAULT_PAGE_SIZE = 25;
export const PAGINATOR_SLOT_NAME = 'paginator';
export const PAGINATOR_SELECTOR = `:scope > forge-paginator[slot="${PAGINATOR_SLOT_NAME}"]`;

export const CELL_SELECTION_KEY_DIRECTIONS: Readonly<Record<string, CellSelectionDirection>> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right'
};

export const FILTER_FN_CHANGE_EVENT = 'forge-data-table-filter-fn-change';
export const GLOBAL_FILTER_EVENT = 'forge-data-table-global-filter';
export const GLOBAL_FILTER_FN_CHANGE_EVENT = 'forge-data-table-global-filter-fn-change';

export const AUTO_SCROLL_EDGE_SIZE = 32;
export const AUTO_SCROLL_MAX_SPEED = 24;

export const DATA_TABLE_DEF_KEYS = {
  dataSource: true,
  columns: false,
  columnVisibility: false,
  columnOrder: false,
  resizable: false,
  sortable: false,
  multiSort: false,
  maxMultiSortColCount: true,
  multiSortRemove: false,
  multiSortKey: false,
  filterable: false,
  filter: true,
  manualSort: false,
  manualFilter: false,
  striped: false,
  hover: false,
  compact: false,
  bordered: false,
  rowSelection: false,
  cellSelection: false,
  enableCellSelection: false,
  reorderable: false,
  allowRowClick: false,
  expandable: false,
  groupable: false,
  grouping: false,
  singleGroupColumn: false,
  virtualized: false,
  paginate: false,
  stickyHeader: false,
  stickyFooter: false,
  getRowName: false,
  getSubRows: true,
  getRowHasDetail: true,
  getRowDetail: true,
  getSelectionClipboardValue: false,
  onCellRender: true
} as const satisfies Record<keyof DataTableDef, boolean>;
