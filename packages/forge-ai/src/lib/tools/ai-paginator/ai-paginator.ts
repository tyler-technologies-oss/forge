import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import styles from './ai-paginator.scss?inline';

import '../../core/tooltip/tooltip.js';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-paginator': AiPaginator;
  }
}

@customElement('forge-ai-paginator')
export class AiPaginator extends LitElement {
  public static styles = unsafeCSS(styles);

  @property({ type: Number, attribute: 'current-page' })
  public currentPage = 1;

  @property({ type: Number, attribute: 'total-pages' })
  public totalPages = 1;

  @property({ type: Boolean, reflect: true })
  public disabled = false;

  @state()
  private _isPreviousDisabled = true;

  @state()
  private _isNextDisabled = false;

  public override willUpdate(): void {
    this._isPreviousDisabled = this.disabled || this.currentPage <= 1;
    this._isNextDisabled = this.disabled || this.currentPage >= this.totalPages;
  }

  #handlePreviousClick(): void {
    if (this._isPreviousDisabled) {
      return;
    }

    const newPage = this.currentPage - 1;
    this.#dispatchPageChange(newPage);
  }

  #handleNextClick(): void {
    if (this._isNextDisabled) {
      return;
    }

    const newPage = this.currentPage + 1;
    this.#dispatchPageChange(newPage);
  }

  #dispatchPageChange(newPage: number): void {
    this.dispatchEvent(
      new CustomEvent('page-change', {
        detail: {
          currentPage: newPage,
          previousPage: this.currentPage
        },
        bubbles: true
      })
    );
  }

  public render(): TemplateResult {
    return html`
      <div class="paginator-container">
        <div class="paginator">
          <button
            id="prev-btn"
            aria-label="View previous page"
            class="forge-icon-button forge-icon-button--medium"
            ?disabled=${this._isPreviousDisabled}
            @click=${this.#handlePreviousClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15.41 16.58 10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
            </svg>
          </button>
          <forge-ai-tooltip for="prev-btn" placement="bottom">Previous</forge-ai-tooltip>
          <span class="label">${this.currentPage} of ${this.totalPages}</span>
          <button
            id="next-btn"
            aria-label="View next page"
            class="forge-icon-button forge-icon-button--medium"
            ?disabled=${this._isNextDisabled}
            @click=${this.#handleNextClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.59 16.58 13.17 12 8.59 7.41 10 6l6 6-6 6z" />
            </svg>
          </button>
          <forge-ai-tooltip for="next-btn" placement="bottom">Next</forge-ai-tooltip>
        </div>
      </div>
    `;
  }
}
