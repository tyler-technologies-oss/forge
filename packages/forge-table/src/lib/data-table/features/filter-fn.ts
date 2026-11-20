/* eslint-disable camelcase -- TanStack exports its built-in filter functions with underscores */
import type { Column, ColumnDef as TanstackColumnDef, FilterFn } from '@tanstack/lit-table';
import { filterFn_includesString } from '@tanstack/lit-table';
import type { DataTableElement } from '../data-table.js';
import { FILTER_FN_CHANGE_EVENT } from '../constants.js';
import { getFilterFieldShape, resolveFilterField } from './filter-field.js';
import type { DataTableFeatures } from '../table-features.js';
import type { ColumnFilter, ColumnFilterOption, FilterFieldConfig, FilterFnChangeEventDetail, ResolvedColumnFilter, Row } from '../types.js';

type RegisteredFilterFn = FilterFn<any, any>;

type FilterFnWithField = FilterFn<any, any> & { field?: FilterFieldConfig };

const FILTER_FN_NAME_LABELS: Readonly<Record<string, string>> = {
  includesString: 'Contains',
  arrIncludes: 'Contains',
  equalsString: 'Equals',
  weakEquals: 'Equals',
  arrIncludesAll: 'Contains all',
  arrIncludesSome: 'Contains some',
  arrHas: 'Has',
  inNumberRange: 'In range',
  inDateRange: 'In range'
};

/**
 * The filter functions the table can look up by name: for a `ColumnDef.filterFn` given as a string, for TanStack's `'auto'`
 * resolution (columns without a `filterFn`) and for the labels of the filter function menu.
 *
 * Only `includesString`, the default text filter, is registered up front. Everything else is opt-in through
 * `registerFilterFns`, so filter functions that are never imported are left out of a consumer's bundle.
 */
export const dataTableFilterFns: Record<string, RegisteredFilterFn> = {
  includesString: filterFn_includesString
};

/**
 * Registers filter functions by name. Register before setting `columns` so that names used in `ColumnDef.filterFn` resolve.
 *
 * The name labels the function in the filter function menu unless its `ColumnFilter` has a `label`. Names of some built-in
 * functions have a fixed label (`includesString` and `arrIncludes` are shown as "Contains"), others are the name as words
 * (`startsWith` is shown as "Starts with").
 */
export function registerFilterFns(filterFns: Record<string, RegisteredFilterFn>): void {
  Object.assign(dataTableFilterFns, filterFns);
}

/**
 * Returns a copy of a filter function with the `field` that filters with it unless a `ColumnFilter` sets another. The original is not
 * changed. The built-in functions exported by this package use it, which is how they are told apart from custom ones.
 */
/* @__NO_SIDE_EFFECTS__ */
export function withDefaultField<TFilterFn extends FilterFn<any, any>>(
  filterFn: TFilterFn,
  field: FilterFieldConfig
): TFilterFn & { field: FilterFieldConfig } {
  const copy = (...args: Parameters<FilterFn<any, any>>): boolean => filterFn(...args);
  return Object.assign(copy, filterFn, { field }) as TFilterFn & { field: FilterFieldConfig };
}

const mergeFilterField = (defaults?: FilterFieldConfig, field?: FilterFieldConfig): FilterFieldConfig | undefined => {
  if (!defaults || !field) {
    return field ?? defaults;
  }
  return (field.type ?? defaults.type) === defaults.type ? { ...defaults, ...field } : field;
};

const isColumnFilter = <TData extends Row>(option: ColumnFilterOption<TData>): option is ColumnFilter<TData> => typeof option === 'object';

/**
 * Resolves `ColumnDef.filter` to a list of filters. Filter functions given by a name that is not registered are dropped, and a filter's
 * `field` is merged over the default one of its (built-in) function, unless it sets another `type`.
 */
export function resolveColumnFilters<TData extends Row>(option?: ColumnFilterOption<TData> | ColumnFilterOption<TData>[]): ResolvedColumnFilter<TData>[] {
  if (option === undefined) {
    return [];
  }

  const options = Array.isArray(option) ? option : [option];
  return options.flatMap(item => {
    const filter: ColumnFilter<TData> = isColumnFilter(item) ? item : { filterFn: item };
    const filterFn = (typeof filter.filterFn === 'string' ? dataTableFilterFns[filter.filterFn] : filter.filterFn) as FilterFnWithField | undefined;
    return filterFn ? [{ ...filter, filterFn, field: mergeFilterField(filterFn.field, filter.field) }] : [];
  });
}

/**
 * The text shown for a filter in the filter function menu: its `label`, else the label of its function's registered name, else
 * that name as words, else its position.
 */
export function getFilterLabel(filter: ResolvedColumnFilter<any>, index: number): string {
  if (filter.label) {
    return filter.label;
  }

  const name = Object.keys(dataTableFilterFns).find(key => dataTableFilterFns[key] === filter.filterFn);
  if (!name) {
    return `Filter ${index + 1}`;
  }

  const nameLabel = FILTER_FN_NAME_LABELS[name];
  if (nameLabel) {
    return nameLabel;
  }

  const words = name.replace(/([a-z\d])([A-Z])/g, '$1 $2').toLowerCase();
  return `${words.charAt(0).toUpperCase()}${words.slice(1)}`;
}

export interface ColumnFilterFnControllerOptions {
  /**
   * Called when the filter function of a filtered column changes, to filter the rows again. TanStack skips state writes that
   * are structurally equal, so it cannot be done by writing the column's filter value back.
   */
  refilter: () => void;
}

/**
 * Owns which of a column's filters is active, for columns with more than one `ColumnDef.filter`.
 *
 * TanStack reads one `filterFn` per column, so the choice is applied over the mapped columns (`apply`, like the column renames)
 * and `columns` is never mutated. The first function is the default, and the choices reset when `columns` is set. Choosing a function whose field produces a different
 * filter value (text, range, single or multiple select) clears the column's filter value instead of filtering with a value of the wrong shape.
 */
export class ColumnFilterFnController<TData extends Row> {
  readonly #host: DataTableElement<TData>;
  readonly #options: ColumnFilterFnControllerOptions;
  #selection: Readonly<Record<string, number>> = {};

  constructor(host: DataTableElement<TData>, options: ColumnFilterFnControllerOptions) {
    this.#host = host;
    this.#options = options;
  }

  /**
   * The chosen filter function index by column id. It is replaced, never mutated, when a choice changes.
   */
  public get selection(): Readonly<Record<string, number>> {
    return this.#selection;
  }

  public getFilters(column: Column<DataTableFeatures, TData>): ResolvedColumnFilter<TData>[] {
    return column.columnDef.meta?.filters ?? [];
  }

  /**
   * The filter the column filters with: the chosen one of its `filter` list, or `undefined` for columns without one.
   */
  public getActiveFilter(column: Column<DataTableFeatures, TData>): ResolvedColumnFilter<TData> | undefined {
    return this.getFilters(column)[this.getActiveIndex(column)];
  }

  public getActiveIndex(column: Column<DataTableFeatures, TData>): number {
    return this.#selection[column.id] ?? 0;
  }

  public reset(): void {
    if (Object.keys(this.#selection).length) {
      this.#selection = {};
      this.#host.requestUpdate();
    }
  }

  /**
   * Makes the filter function at `index` the column's active one and filters again with it when the column has a filter value.
   */
  public select(column: Column<DataTableFeatures, TData>, index: number): void {
    const filter = this.getFilters(column)[index];
    if (!filter || index === this.getActiveIndex(column)) {
      return;
    }

    const previousShape = getFilterFieldShape(resolveFilterField(column, this.getActiveFilter(column)));
    this.#selection = { ...this.#selection, [column.id]: index };
    const detail: FilterFnChangeEventDetail<TData> = { columnId: column.id, filterFn: filter.filterFn, index };
    this.#host.dispatchEvent(new CustomEvent(FILTER_FN_CHANGE_EVENT, { detail, bubbles: true, composed: true }));

    if (column.getIsFiltered()) {
      if (previousShape === getFilterFieldShape(resolveFilterField(column, filter))) {
        this.#options.refilter();
      } else {
        column.setFilterValue(undefined);
      }
    }
    this.#host.requestUpdate();
  }

  /**
   * Sets the active filter's function on every column that has a choice. Returns `columns` itself when nothing was chosen.
   */
  public apply(columns: TanstackColumnDef<DataTableFeatures, TData>[]): TanstackColumnDef<DataTableFeatures, TData>[] {
    if (!Object.keys(this.#selection).length) {
      return columns;
    }

    return columns.map(column => {
      const children = 'columns' in column ? column.columns : undefined;
      const withChildren = children ? { ...column, columns: this.apply([...children]) } : column;
      const index = column.id ? this.#selection[column.id] : undefined;
      const filterFn = index === undefined ? undefined : column.meta?.filters?.[index]?.filterFn;
      return filterFn ? { ...withChildren, filterFn } : withChildren;
    });
  }
}
