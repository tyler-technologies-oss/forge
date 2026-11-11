import type { CellSelectionDirection } from '@tanstack/lit-table';

export const SELECT_COLUMN_ID = 'SELECT_COLUMN_ID';

export const DEFAULT_COLUMN_WIDTH = 172;
export const SELECT_COLUMN_WIDTH = 40;
export const COMPACT_ROW_HEIGHT = 32;
export const DEFAULT_ROW_HEIGHT = 48;
export const VIRTUALIZER_OVERSCAN = 5;
export const FETCH_SKIP = 0;
export const FETCH_TAKE = Number.MAX_SAFE_INTEGER;

export const CELL_SELECTION_KEY_DIRECTIONS: Readonly<Record<string, CellSelectionDirection>> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right'
};

export const AUTO_SCROLL_EDGE_SIZE = 32;
export const AUTO_SCROLL_MAX_SPEED = 24;
