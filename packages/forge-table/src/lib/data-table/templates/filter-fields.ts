import type { Column } from '@tanstack/lit-table';
import { applyNumberMask } from '@tylertech/forge-core';
import { html, nothing, TemplateResult } from 'lit';
import { keyed } from 'lit/directives/keyed.js';
import { ref } from 'lit/directives/ref.js';
import { getColumnDataType } from '../columns/data-type.js';
import { resolveFilterField, type ResolvedFilterField } from '../features/filter-field.js';
import type { ColumnFilterFnController } from '../features/filter-fn.js';
import { getColumnHeaderTextId } from '../features/row-meta.js';
import type { DataTableFeatures } from '../table-features.js';
import type { DataType, ResolvedColumnFilter, Row } from '../types.js';
import { renderFilterFnMenu } from './filter-fn-menu.js';

const maskedInputs = new WeakSet<HTMLInputElement>();

const applyNumberFilterMask = (input?: Element): void => {
  if (!(input instanceof HTMLInputElement) || maskedInputs.has(input)) {
    return;
  }
  maskedInputs.add(input);
  applyNumberMask(input);
};

const getSizeStyle = (size?: string): string | typeof nothing => (size ? `min-inline-size: ${size}` : nothing);

const getLabelledBy = (fieldId: string, columnId: string): string => `${fieldId} ${getColumnHeaderTextId(columnId)}`;

export function renderFilterContainer<TData extends Row>(column: Column<DataTableFeatures, TData>, filterFn: ColumnFilterFnController<TData>): TemplateResult {
  const hasMenu = filterFn.getFilters(column).length > 1;
  return html`<div class=${hasMenu ? 'filter-container has-filter-fn-menu' : 'filter-container'}>
    ${renderFilterField(column, filterFn.getActiveFilter(column))}${renderFilterFnMenu(column, filterFn)}
  </div>`;
}

export function renderFilterField<TData extends Row>(column: Column<DataTableFeatures, TData>, filter?: ResolvedColumnFilter<TData>): TemplateResult {
  const field = resolveFilterField(column, filter);
  const dataType = getColumnDataType(column);
  switch (field.type) {
    case 'select':
      return renderSelectField(column, field);
    case 'range':
      return renderRangeField(column, dataType, field.size);
    default:
      return renderValueInput(column, dataType, {
        id: `filter-field-${column.id}`,
        label: 'Filter',
        size: field.size,
        value: column.getFilterValue(),
        onValue: value => column.setFilterValue(value)
      });
  }
}

interface ValueInputOptions {
  id: string;
  label: string;
  size?: string;
  value: unknown;
  onValue: (value: unknown) => void;
}

function renderValueInput<TData extends Row>(
  column: Column<DataTableFeatures, TData>,
  dataType: DataType | undefined,
  options: ValueInputOptions
): TemplateResult {
  const { id, label, size, value, onValue } = options;
  if (dataType === 'date') {
    return html`<forge-date-picker
      @forge-date-picker-change=${(evt: CustomEvent<Date | null>) => onValue(evt.detail ?? undefined)}
      .value=${(value as Date) ?? null}>
      <forge-text-field class="filter-field" density="extra-small" style=${getSizeStyle(size)}>
        <input id=${id} name="filter-${column.id}" type="text" aria-label=${label} aria-labelledby=${getLabelledBy(id, column.id)} />
      </forge-text-field>
    </forge-date-picker>`;
  }

  const isNumber = dataType === 'number';
  return html`
    <forge-text-field class="filter-field" density="extra-small" style=${getSizeStyle(size)}>
      <input
        id=${id}
        name="filter-${column.id}"
        aria-label=${label}
        aria-labelledby=${getLabelledBy(id, column.id)}
        .type=${dataType === 'time' ? 'time' : 'text'}
        inputmode=${isNumber ? 'decimal' : nothing}
        .value=${(value as string) ?? ''}
        ${isNumber ? ref(applyNumberFilterMask) : nothing}
        @input=${(evt: InputEvent) => onValue((evt.target as HTMLInputElement).value || undefined)} />
    </forge-text-field>
  `;
}

function renderRangeField<TData extends Row>(column: Column<DataTableFeatures, TData>, dataType: DataType | undefined, size?: string): TemplateResult {
  const filterValue = column.getFilterValue();
  const bounds = Array.isArray(filterValue) ? filterValue : [];
  const setBound = (index: number, value: unknown): void => {
    const next = [bounds[0], bounds[1]];
    next[index] = value;
    column.setFilterValue(next.every(bound => bound === undefined) ? undefined : next);
  };

  return html`<div class="range-filter-container">
    ${renderValueInput(column, dataType, {
      id: `filter-min-${column.id}`,
      label: 'Filter minimum',
      size,
      value: bounds[0],
      onValue: value => setBound(0, value)
    })}
    <span aria-hidden="true">-</span>
    ${renderValueInput(column, dataType, {
      id: `filter-max-${column.id}`,
      label: 'Filter maximum',
      size,
      value: bounds[1],
      onValue: value => setBound(1, value)
    })}
  </div>`;
}

function renderSelectField<TData extends Row>(column: Column<DataTableFeatures, TData>, { options, multiple, size }: ResolvedFilterField): TemplateResult {
  const id = `filter-field-${column.id}`;
  const filterValue = column.getFilterValue();
  const value = multiple ? (Array.isArray(filterValue) ? filterValue : []) : (filterValue ?? '');
  const onChange = (evt: Event): void => {
    const selected = (evt.target as HTMLSelectElement & { value: unknown }).value;
    const isEmpty = multiple ? !Array.isArray(selected) || !selected.length : selected === '' || selected === null || selected === undefined;
    column.setFilterValue(isEmpty ? undefined : selected);
  };

  return html`${keyed(
    multiple,
    html`<forge-select
      class="filter-field"
      density="extra-small"
      style=${getSizeStyle(size)}
      id=${id}
      aria-label="Filter"
      aria-labelledby=${getLabelledBy(id, column.id)}
      ?multiple=${multiple}
      .value=${value}
      @change=${onChange}>
      ${multiple ? nothing : html`<forge-option value=""></forge-option>`}
      ${options.map(option => html`<forge-option .value=${option.value}>${option.label}</forge-option>`)}
    </forge-select>`
  )}`;
}
