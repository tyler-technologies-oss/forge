import type { Column, Table } from '@tanstack/lit-table';
import type { DataTableFeatures } from '../table-features.js';
import type { Row } from '../types.js';

export function getColumnSizeVarName(columnId: string): string {
  const sanitizedId = columnId.replace(/[^a-zA-Z0-9_-]/g, '-');
  const hasValidChar = /[a-zA-Z0-9]/.test(sanitizedId);
  return `--forge-data-table-column-${hasValidChar ? sanitizedId : 'column'}-size`;
}

export function getColumnSizeStyles<TData extends Row>(table: Table<DataTableFeatures, TData>, resizable: boolean): Record<string, string> {
  if (!resizable) {
    return {};
  }

  const colStyles: Record<string, string> = {};
  table.getFlatHeaders().forEach(header => {
    if (!header.column.getCanResize()) {
      return;
    }
    colStyles[getColumnSizeVarName(header.column.id)] = `${header.getSize()}px`;
  });

  return colStyles;
}

export function getColumnWidthStyle<TData extends Row>(column: Column<DataTableFeatures, TData>, resizable: boolean): string | null {
  if (resizable && column.getCanResize()) {
    return `var(${getColumnSizeVarName(column.id)})`;
  }

  return column.table.getIsSomeColumnsPinned() ? `${column.getSize()}px` : null;
}
