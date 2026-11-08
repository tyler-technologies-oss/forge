import { LitElement, TemplateResult, html, nothing, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { IToolRenderer, ToolCall } from '../../types/index.js';
import { buildCSVContent, downloadCSV, sanitizeFilename } from '../../utils/csv-utils.js';
import { renderInlineMarkdown } from '../../utils/markdown.js';

import '../../ai-artifact/ai-artifact.js';
import '../../ai-empty-state/ai-empty-state.js';
import '../ai-paginator/ai-paginator.js';
import '../../core/tooltip/tooltip.js';

import styles from './ai-data-table.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-tool-data-table': DataTableToolElement;
  }
}

interface TableData {
  title?: string;
  headers: string[];
  rows: (string | number)[][];
  maxNumberOfRows?: number;
}

const DEFAULT_MAX_ROWS = 10;
const MIN_ROWS_FOR_FILTER = 5;

/**
 * Data table component tool renderer for displaying tabular data with pagination and filtering.
 *
 * @tag forge-ai-tool-data-table
 * @internal
 */
@customElement('forge-ai-tool-data-table')
export class DataTableToolElement extends LitElement implements IToolRenderer<TableData> {
  public static styles = unsafeCSS(styles);

  /**
   * Tool call data containing table configuration and data
   */
  @property({ attribute: false })
  public toolCall!: ToolCall<TableData>;

  /** Current page number for pagination */
  @state()
  private _currentPage = 1;

  /** Current filter value for searching table data */
  @state()
  private _filterValue = '';

  get #tableData(): TableData | null {
    return this.toolCall.args;
  }

  get #maxNumberOfRows(): number {
    const data = this.#tableData;
    return data?.maxNumberOfRows || DEFAULT_MAX_ROWS;
  }

  get #totalRows(): number {
    const data = this.#tableData;
    return data?.rows?.length || 0;
  }

  get #filteredRows(): (string | number)[][] {
    const data = this.#tableData;
    if (!data || !data.rows) {
      return [];
    }

    if (!this._filterValue.trim()) {
      return data.rows;
    }

    return data.rows.filter(row => row.some(cell => String(cell).toLowerCase().includes(this._filterValue.toLowerCase())));
  }

  get #paginatedRows(): (string | number)[][] {
    const filteredRows = this.#filteredRows;
    if (!filteredRows.length || !this.#shouldShowPaginator) {
      return filteredRows;
    }

    const startIndex = (this._currentPage - 1) * this.#maxNumberOfRows;
    const endIndex = startIndex + this.#maxNumberOfRows;
    return filteredRows.slice(startIndex, endIndex);
  }

  get #totalPages(): number {
    const filteredRows = this.#filteredRows;
    if (!filteredRows.length) {
      return 1;
    }
    return Math.ceil(filteredRows.length / this.#maxNumberOfRows);
  }

  get #shouldShowFilter(): boolean {
    return this.#totalRows > MIN_ROWS_FOR_FILTER;
  }

  get #shouldShowPaginator(): boolean {
    const filteredRows = this.#filteredRows;
    return filteredRows.length > this.#maxNumberOfRows;
  }

  get #shouldShowEmptyState(): boolean {
    return this._filterValue.trim() !== '' && this.#filteredRows.length === 0;
  }

  #handlePageChange(event: CustomEvent): void {
    this._currentPage = event.detail.currentPage;
  }

  #handleFilterInput(event: InputEvent): void {
    this._filterValue = (event.target as HTMLInputElement).value;
    this._currentPage = 1;
  }

  #handleExport(): void {
    const data = this.#tableData;
    if (!data || !data.headers || !data.rows) {
      return;
    }

    const csvContent = buildCSVContent(data.headers, data.rows);
    const filename = sanitizeFilename(data.title || '', 'chatbot-data-table');
    downloadCSV(csvContent, filename);
  }

  get #exportButton(): TemplateResult | typeof nothing {
    const data = this.#tableData;
    if (!data || !data.headers?.length || !data.rows?.length) {
      return nothing;
    }

    return html`
      <div>
        <button
          type="button"
          id="export-button"
          class="forge-icon-button forge-icon-button--medium"
          @click=${this.#handleExport}
          aria-label="Download table as CSV">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="forge-icon" aria-hidden="true">
            <path d="M5 20h14v-2H5m14-9h-4V3H9v6H5l7 7z" />
          </svg>
        </button>
        <forge-ai-tooltip for="export-button" placement="bottom">Download CSV</forge-ai-tooltip>
      </div>
    `;
  }

  readonly #filterInputField = html`
    <label for="data-table-filter-input" class="sr-only">Filter table data</label>
    <div class="forge-field forge-field--small icon-field">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M10 18h4v-2h-4zM3 6v2h18V6zm3 7h12v-2H6z" />
      </svg>
      <input
        autocomplete="off"
        type="text"
        id="data-table-filter-input"
        placeholder="Filter data"
        .value=${this._filterValue}
        @input=${this.#handleFilterInput} />
    </div>
  `;

  get #actionButtons(): TemplateResult | typeof nothing {
    const showFilter = this.#shouldShowFilter;
    const showExport = this.#tableData?.headers?.length && this.#tableData?.rows?.length;

    if (!showFilter && !showExport) {
      return nothing;
    }

    return html` <div class="actions" slot="actions">${when(showFilter, () => this.#filterInputField)} ${this.#exportButton}</div> `;
  }

  get #emptyState(): TemplateResult {
    return html`
      <forge-ai-empty-state>
        <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="empty-state-icon" aria-hidden="true">
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14" />
        </svg>
        <h3 slot="heading">No results found</h3>
        <p slot="body">No data matches your filter "${this._filterValue}". Try adjusting your search terms.</p>
      </forge-ai-empty-state>
    `;
  }

  get #table(): TemplateResult {
    const data = this.#tableData;
    const ariaLabel = data?.title || 'Data table';

    return html`
      <table class="data-table" aria-label="${ariaLabel}">
        <thead class="table-head">
          <tr class="table-row">
            ${data?.headers.map(
              header => html`
                <th>
                  <div class="column-header">${header}</div>
                </th>
              `
            )}
          </tr>
        </thead>
        <tbody>
          ${this.#paginatedRows.map(
            row => html`
              <tr class="table-row">
                ${row.map(cell => html` <td>${unsafeHTML(renderInlineMarkdown(String(cell)))}</td> `)}
              </tr>
            `
          )}
        </tbody>
      </table>
    `;
  }

  get #tableContent(): TemplateResult | typeof nothing {
    if (this.#shouldShowEmptyState) {
      return this.#emptyState;
    }
    return html`
      <div class="table-container" data-scroll-region="table" role="group" tabindex="0" aria-label="Tabular data: ${this.#tableData?.title || 'Table'}">
        ${this.#table}
      </div>
    `;
  }

  get #header(): TemplateResult | typeof nothing {
    const data = this.#tableData;
    if (!data?.title) {
      return nothing;
    }
    return html`<h2 class="title" slot="start">${data.title}</h2>`;
  }

  get #pagination(): TemplateResult | typeof nothing {
    if (!this.#shouldShowPaginator) {
      return nothing;
    }
    return html`<forge-ai-paginator
      current-page="${this._currentPage}"
      total-pages="${this.#totalPages}"
      @page-change=${this.#handlePageChange}></forge-ai-paginator>`;
  }

  public override render(): TemplateResult {
    const data = this.#tableData;
    if (!data || !data.headers || !data.rows) {
      return html`<forge-ai-artifact><p class="body2">No table data available</p></forge-ai-artifact>`;
    }

    return html` <forge-ai-artifact class="artifact"> ${this.#header} ${this.#actionButtons} ${this.#tableContent} ${this.#pagination} </forge-ai-artifact> `;
  }
}
