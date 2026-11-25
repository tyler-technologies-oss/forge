import type { Updater } from '@tanstack/lit-table';
import type { ReactiveControllerHost } from 'lit';
import { GLOBAL_FILTER_EVENT, GLOBAL_FILTER_FN_CHANGE_EVENT } from '../constants.js';
import type { ColumnFilterOption, GlobalFilterFnChangeEventDetail, ResolvedColumnFilter, Row } from '../types.js';
import { resolveColumnFilters } from './filter-fn.js';

/**
 * Normalizes a global filter value from TanStack's untyped `globalFilter` state: only a non-empty string filters.
 */
export function normalizeGlobalFilter(value: unknown): string | undefined {
  return typeof value === 'string' && value !== '' ? value : undefined;
}

/**
 * The table's global filter: its text and the filter functions that match it against the columns.
 *
 * The text is handed to TanStack as `state.globalFilter` and written back through `onGlobalFilterChange`. Every change dispatches
 * `forge-data-table-global-filter` from the host with the text (`''` when cleared), so controls such as `forge-data-table-search` can follow changes
 * they did not make. With `manualFilter` TanStack does not filter, so the event is how the consumer learns the text.
 *
 * The functions come from the table's `filter` property and resolve like `ColumnDef.filter`. The first is the default, and the choice resets when
 * `filter` is set. Without any, TanStack's default (`includesString`) is used. TanStack does not filter again when only the function changes, so the
 * element recreates its table controller when `activeFilter` changes. Setting the list or choosing a function dispatches
 * `forge-data-table-global-filter-fn-change`.
 */
export class GlobalFilter<TData extends Row = Row> {
  readonly #host: ReactiveControllerHost & EventTarget;
  #value: string | undefined;
  #filters: ResolvedColumnFilter<TData>[] = [];
  #index = 0;

  constructor(host: ReactiveControllerHost & EventTarget) {
    this.#host = host;
  }

  /** The text the rows are filtered by, or `undefined` when there is none. */
  public get value(): string | undefined {
    return this.#value;
  }

  public get active(): boolean {
    return this.#value !== undefined;
  }

  /** The filters resolved from the table's `filter` property. */
  public get filters(): readonly ResolvedColumnFilter<TData>[] {
    return this.#filters;
  }

  public get activeIndex(): number {
    return this.#index;
  }

  /** The filter the rows are matched with, or `undefined` when `filter` has none and TanStack's default applies. It is a new object whenever `filter` is set. */
  public get activeFilter(): ResolvedColumnFilter<TData> | undefined {
    return this.#filters[this.#index];
  }

  public setFilters(option: ColumnFilterOption<TData> | ColumnFilterOption<TData>[] | undefined): void {
    this.#filters = resolveColumnFilters(option);
    this.#index = 0;
    this.#dispatchFnChange();
  }

  /** Makes the filter at `index` the active one. Ignores an index without a filter and the active one. */
  public select(index: number): void {
    if (!this.#filters[index] || index === this.#index) {
      return;
    }
    this.#index = index;
    this.#dispatchFnChange();
  }

  public set(updater: Updater<unknown>): void {
    const next = normalizeGlobalFilter(typeof updater === 'function' ? updater(this.#value) : updater);
    if (next === this.#value) {
      return;
    }
    this.#value = next;
    this.#host.requestUpdate();
    this.#host.dispatchEvent(new CustomEvent<string>(GLOBAL_FILTER_EVENT, { detail: next ?? '', bubbles: true, composed: true }));
  }

  public clear(): void {
    this.set(undefined);
  }

  #dispatchFnChange(): void {
    this.#host.requestUpdate();
    const detail: GlobalFilterFnChangeEventDetail<TData> = { filterFn: this.activeFilter?.filterFn, index: this.#index };
    this.#host.dispatchEvent(new CustomEvent(GLOBAL_FILTER_FN_CHANGE_EVENT, { detail, bubbles: true, composed: true }));
  }
}
