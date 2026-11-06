import type { Column } from '@tanstack/lit-table';
import { html, TemplateResult } from 'lit';
import type { DataTableFeatures } from '../table-features.js';
import type { Row } from '../types.js';

export function renderFilterField<TData extends Row>(column: Column<DataTableFeatures, TData>): TemplateResult {
  switch (column.columnDef.meta?.filterVariant) {
    case 'select':
      return renderSelectFilter(column);
    case 'range':
      return renderRangeFilter(column);
    case 'date':
      return renderDateFilter(column);
    default:
      return renderTextFilter(column);
  }
}

function renderSelectFilter<TData extends Row>(column: Column<DataTableFeatures, TData>): TemplateResult {
  return html`<forge-select
    density="small"
    .value=${column.getFilterValue() ?? ''}
    @change=${(evt: Event) => column.setFilterValue((evt.target as HTMLSelectElement).value)}>
    <forge-option value="">All</forge-option>
    <forge-option value="1">One</forge-option>
    <forge-option value="2">Two</forge-option>
  </forge-select>`;
}

function renderRangeFilter<TData extends Row>(column: Column<DataTableFeatures, TData>): TemplateResult {
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

function renderDateFilter<TData extends Row>(column: Column<DataTableFeatures, TData>): TemplateResult {
  return html` <forge-date-picker
    @forge-date-picker-change=${(evt: CustomEvent<Date>) => column.setFilterValue(evt.detail)}
    .value=${column.getFilterValue() as any}>
    <forge-text-field density="small">
      <input name="filter-${column.id}" type="text" />
    </forge-text-field>
  </forge-date-picker>`;
}

function renderTextFilter<TData extends Row>(column: Column<DataTableFeatures, TData>): TemplateResult {
  return html` <forge-text-field density="small">
    <input
      name="filter-${column.id}"
      .type=${column.columnDef.meta?.filterVariant ?? 'text'}
      .value=${(column.getFilterValue() as string) ?? ''}
      @input=${(evt: InputEvent) => {
        const value = (evt.target as HTMLInputElement).value;
        column.setFilterValue(value || undefined);
      }} />
  </forge-text-field>`;
}
