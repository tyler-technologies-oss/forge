import { IconRegistry } from '@tylertech/forge';
import { tylIconFilterList, tylIconSearch } from '@tylertech/tyler-icons';
import { html, LitElement, nothing, type PropertyValues, type TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { GLOBAL_FILTER_EVENT, GLOBAL_FILTER_FN_CHANGE_EVENT } from '../data-table/constants.js';
import type { DataTableElement } from '../data-table/data-table.js';
import { getFilterLabel, resolveColumnFilters } from '../data-table/features/filter-fn.js';
import type { ResolvedColumnFilter } from '../data-table/types.js';
import { TABLE_SEARCH_TAG_NAME } from './constants.js';

import '@tylertech/forge/dropdown-menu';
import '@tylertech/forge/dropdown-menu/dropdown-menu-item-radio';
import '@tylertech/forge/icon';
import '@tylertech/forge/icon-button';
import '@tylertech/forge/text-field';

import styles from './table-search.scss';

/**
 * A search field for a `forge-data-table`.
 *
 * Connect a data table by setting `table` to its id, or by assigning the element to `tableElement`. Entering text in the field calls
 * the table's `globalFilter()` with the text, and the field follows the table when its global filter changes some other way, such as
 * the empty state's clear filters button.
 *
 * When the table's `filter` has more than one function, a button at the end of the field opens a menu to choose between them, like the filter
 * function menu of a column.
 *
 * @tag forge-data-table-search
 */
@customElement(TABLE_SEARCH_TAG_NAME)
export class TableSearchElement extends LitElement {
  static {
    IconRegistry.define([tylIconFilterList, tylIconSearch]);
  }

  public static override styles = unsafeCSS(styles);

  /**
   * The id of the data table that the search field filters. The table is looked up in the same root as the search field and assigned to `tableElement`.
   */
  @property()
  public table: string | undefined;

  /**
   * The data table that the search field filters. Set by `table`, or assign it directly.
   */
  @property({ attribute: false })
  public tableElement: DataTableElement<any> | null = null;

  @query('input')
  private readonly _input!: HTMLInputElement;

  #observedTable: DataTableElement<any> | undefined;

  public override connectedCallback(): void {
    super.connectedCallback();
    this.#observe(this.tableElement);
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#observe(null);
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (!this.isConnected) {
      return;
    }
    const elementAssigned = changedProperties.has('tableElement') && this.tableElement !== null;
    if (changedProperties.has('table') && !elementAssigned) {
      this.tableElement = this.#findTable();
    }
    if (this.tableElement !== this.#observedTable) {
      this.#observe(this.tableElement);
    }
  }

  public override render(): TemplateResult {
    const { tableElement: table } = this;
    const filters = resolveColumnFilters(table?.filter);
    const hasMenu = !!table && filters.length > 1;
    return html`
      <forge-text-field show-clear>
        <forge-icon slot="start" name="search"></forge-icon>
        <input type="text" aria-label="Search" placeholder="Search" @input=${this.#onInput} />
        ${hasMenu
          ? html`
              <forge-icon-button slot="end" class="filter-fn-button" id="filter-fn-button" aria-label="Search type" dense shape="squared">
                <forge-icon name="filter_list"></forge-icon>
              </forge-icon-button>
            `
          : nothing}
      </forge-text-field>
      ${hasMenu ? this.#renderFilterMenu(table, filters) : nothing}
    `;
  }

  #renderFilterMenu(table: DataTableElement<any>, filters: ResolvedColumnFilter<any>[]): TemplateResult {
    const activeIndex = table.globalFilterFnIndex;
    return html`
      <forge-dropdown-menu class="filter-fn-menu" trigger="filter-fn-button" dense>
        ${filters.map(
          (filter, index) => html`
            <forge-dropdown-menu-item-radio name="filter-fn" ?checked=${index === activeIndex} @click=${() => table.setGlobalFilterFn(index)}>
              ${getFilterLabel(filter, index)}
            </forge-dropdown-menu-item-radio>
          `
        )}
      </forge-dropdown-menu>
    `;
  }

  #findTable(): DataTableElement<any> | null {
    if (!this.table) {
      return null;
    }
    const root = this.getRootNode() as Document | ShadowRoot;
    return (root.getElementById?.(this.table) as DataTableElement<any> | null) ?? null;
  }

  #observe(table: DataTableElement<any> | null): void {
    this.#observedTable?.removeEventListener(GLOBAL_FILTER_EVENT, this.#onTableGlobalFilter);
    this.#observedTable?.removeEventListener(GLOBAL_FILTER_FN_CHANGE_EVENT, this.#onTableFilterFnChange);
    this.#observedTable = table ?? undefined;
    table?.addEventListener(GLOBAL_FILTER_EVENT, this.#onTableGlobalFilter);
    table?.addEventListener(GLOBAL_FILTER_FN_CHANGE_EVENT, this.#onTableFilterFnChange);
  }

  #onTableFilterFnChange = (): void => this.requestUpdate();

  #onTableGlobalFilter = (evt: Event): void => {
    const { detail } = evt as CustomEvent<string>;
    if (this._input && this._input.value !== detail) {
      this._input.value = detail;
    }
  };

  #onInput = (evt: InputEvent): void => {
    this.tableElement?.globalFilter((evt.target as HTMLInputElement).value);
  };
}

declare global {
  interface HTMLElementTagNameMap {
    [TABLE_SEARCH_TAG_NAME]: TableSearchElement;
  }
}
