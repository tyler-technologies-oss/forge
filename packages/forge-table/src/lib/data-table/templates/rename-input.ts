import type { Column } from '@tanstack/lit-table';
import { html, TemplateResult } from 'lit';
import type { DataTableFeatures } from '../table-features.js';
import type { Row } from '../types.js';

export interface RenameInputConfig<TData extends Row> {
  onKeydown: (evt: KeyboardEvent, column: Column<DataTableFeatures, TData>) => void;
  onCommit: (column: Column<DataTableFeatures, TData>, value: string) => void;
}

export function renderRenameInput<TData extends Row>(
  column: Column<DataTableFeatures, TData>,
  { onKeydown, onCommit }: RenameInputConfig<TData>
): TemplateResult {
  const { header } = column.columnDef;
  const value = typeof header === 'string' ? header : column.id;
  return html`
    <span class="rename-field">
      <input
        type="text"
        class="rename-input"
        aria-label="Column name"
        .value=${value}
        size=${Math.max(value.length, 1)}
        @input=${(evt: InputEvent) => {
          const input = evt.currentTarget as HTMLInputElement;
          input.size = Math.max(input.value.length, 1);
        }}
        @click=${(evt: Event) => evt.stopPropagation()}
        @keydown=${(evt: KeyboardEvent) => onKeydown(evt, column)}
        @blur=${(evt: FocusEvent) => onCommit(column, (evt.currentTarget as HTMLInputElement).value)} />
    </span>
  `;
}
