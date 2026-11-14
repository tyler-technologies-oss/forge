import type { Table } from '@tanstack/lit-table';
import type { DataTableFeatures } from '../table-features.js';
import type { Row } from '../types.js';
import { getCsvColumns, getHeaderText, stringifyValue } from './csv-export.js';

const HTML_ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const HTML_SPECIAL_CHARS = /[&<>"']/g;

const PRINT_STYLES = `
  body { font: 12px/1.4 system-ui, sans-serif; color: #000; margin: 0; }
  h1 { font-size: 16px; margin: 0 0 12px; }
  table { width: 100%; border-collapse: collapse; }
  th, td { border: 1px solid #999; padding: 4px 8px; text-align: start; vertical-align: top; }
  th { background: #eee; }
  thead { display: table-header-group; }
  tr { break-inside: avoid; }
  .align-center { text-align: center; }
  .align-end { text-align: end; }
`;

/**
 * Builds a printable HTML document from the table's current state: a header row followed by one row per sorted and filtered table row.
 *
 * It is a static copy of the data rather than the live table, because the live table only renders the rows that are scrolled into view.
 * Columns, values and header text are the same as the CSV export, and cell alignment follows `ColumnDef.align`.
 */
export function buildPrintDocument<TData extends Row>(table: Table<DataTableFeatures, TData>, title = ''): string {
  const columns = getCsvColumns(table);
  const alignClass = (align?: string): string => (align === 'center' || align === 'end' ? ` class="align-${align}"` : '');

  const headerCells = columns.map(column => `<th scope="col"${alignClass(column.columnDef.meta?.align)}>${escapeHtml(getHeaderText(column))}</th>`);
  const bodyRows = table.getRowModel().rows.map(row => {
    const cells = columns.map(column => `<td${alignClass(column.columnDef.meta?.align)}>${escapeHtml(stringifyValue(row.getValue(column.id)))}</td>`);
    return `<tr>${cells.join('')}</tr>`;
  });

  return [
    '<!DOCTYPE html>',
    `<html><head><meta charset="utf-8"><title>${escapeHtml(title)}</title><style>${PRINT_STYLES}</style></head><body>`,
    title ? `<h1>${escapeHtml(title)}</h1>` : '',
    `<table><thead><tr>${headerCells.join('')}</tr></thead><tbody>${bodyRows.join('')}</tbody></table>`,
    '</body></html>'
  ].join('');
}

/**
 * Opens the browser's print dialog for an HTML document.
 *
 * The document is loaded into a hidden iframe so that the host page's styles and layout do not affect the printout.
 * The iframe is removed once printing finishes.
 */
export function printDocument(html: string): void {
  const frame = document.createElement('iframe');
  frame.setAttribute('aria-hidden', 'true');
  frame.style.cssText = 'position:fixed;inset-block-end:0;inset-inline-end:0;width:0;height:0;border:0;';
  frame.addEventListener(
    'load',
    () => {
      const frameWindow = frame.contentWindow;
      if (!frameWindow) {
        frame.remove();
        return;
      }
      frameWindow.addEventListener('afterprint', () => frame.remove(), { once: true });
      frameWindow.focus();
      frameWindow.print();
    },
    { once: true }
  );
  frame.srcdoc = html;
  document.body.append(frame);
}

function escapeHtml(text: string): string {
  return text.replace(HTML_SPECIAL_CHARS, char => HTML_ESCAPES[char]);
}
