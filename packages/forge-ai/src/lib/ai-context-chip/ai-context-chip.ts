import { LitElement, PropertyValues, TemplateResult, html, nothing, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';

import '../core/tooltip/tooltip.js';
import '../ai-spinner';
import styles from './ai-context-chip.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-context-chip': AiContextChipComponent;
  }

  interface HTMLElementEventMap {
    'forge-ai-context-chip-remove': CustomEvent<ForgeAiContextChipRemoveEventData>;
  }
}

export interface ForgeAiContextChipRemoveEventData {
  id: string;
  item: import('../types/index.js').ContextItem;
}

export const AiContextChipComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-context-chip';

/**
 * @tag forge-ai-context-chip
 *
 * @summary Displays context information as a removable chip.
 *
 * @description
 * A component for displaying context metadata in AI chat interfaces. Shows context information
 * with optional icon, label text, and tooltip on overflow.
 *
 * @event {CustomEvent<ForgeAiContextChipRemoveEventData>} forge-ai-context-chip-remove - Fired when the remove button is clicked
 *
 * @cssproperty --forge-ai-context-chip-background - Background color of the chip
 * @cssproperty --forge-ai-context-chip-border-color - Border color of the chip
 * @cssproperty --forge-ai-context-chip-padding - Padding inside the chip
 * @cssproperty --forge-ai-context-chip-gap - Gap between elements
 */
@customElement(AiContextChipComponentTagName)
export class AiContextChipComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  @property()
  public id = '';

  @property()
  public label = '';

  @property({ type: Boolean })
  public removable = true;

  @property()
  public sublabel?: string;

  @property({ type: Boolean })
  public loading = false;

  @property()
  public type?: 'file' | 'context';

  @state() private _isLabelOverflowing = false;

  get #chipId(): string {
    return `context-chip-${this.id}`;
  }

  #checkLabelOverflow(): void {
    requestAnimationFrame(() => {
      const labelElement = this.shadowRoot?.querySelector('.context-content') as HTMLElement;
      if (labelElement) {
        const isOverflowing = labelElement.scrollWidth > labelElement.offsetWidth;
        if (this._isLabelOverflowing !== isOverflowing) {
          this._isLabelOverflowing = isOverflowing;
        }
      }
    });
  }

  // eslint-disable-next-line @tylertech-eslint/require-private-modifier
  protected override firstUpdated(): void {
    this.#checkLabelOverflow();
  }

  // eslint-disable-next-line @tylertech-eslint/require-private-modifier
  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (changedProperties.has('label')) {
      this.#checkLabelOverflow();
    }
  }

  #handleRemove(): void {
    this.dispatchEvent(
      new CustomEvent<ForgeAiContextChipRemoveEventData>('forge-ai-context-chip-remove', {
        detail: {
          id: this.id,
          item: {
            id: this.id,
            label: this.label,
            removable: this.removable,
            sublabel: this.sublabel,
            loading: this.loading,
            type: this.type
          }
        },
        bubbles: true,
        composed: true
      })
    );
  }

  readonly #contextIcon = html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M11 2v2.07A8 8 0 0 0 4.07 11H2v2h2.07A8 8 0 0 0 11 19.93V22h2v-2.07A8 8 0 0 0 19.93 13H22v-2h-2.07A8 8 0 0 0 13 4.07V2m-2 4.08V8h2V6.09c2.5.41 4.5 2.41 4.92 4.91H16v2h1.91c-.41 2.5-2.41 4.5-4.91 4.92V16h-2v1.91C8.5 17.5 6.5 15.5 6.08 13H8v-2H6.09C6.5 8.5 8.5 6.5 11 6.08M12 11a1 1 0 0 0-1 1 1 1 0 0 0 1 1 1 1 0 0 0 1-1 1 1 0 0 0-1-1" />
  </svg>`;

  readonly #fileIcon = html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m9 16v-2H6v2zm3-4v-2H6v2z" />
  </svg>`;

  get #iconContent(): TemplateResult {
    return this.type === 'file' ? this.#fileIcon : this.#contextIcon;
  }

  get #removeButton(): TemplateResult | typeof nothing {
    if (!this.removable) {
      return nothing;
    }

    return html`
      <button
        type="button"
        class="remove-button forge-icon-button forge-icon-button--small forge-icon-button--squared"
        @click=${this.#handleRemove}
        aria-label="Remove ${this.label}">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M12.854 3.146a.5.5 0 0 1 0 .708L8.707 8l4.147 4.146a.5.5 0 0 1-.708.708L8 8.707l-4.146 4.147a.5.5 0 0 1-.708-.708L7.293 8 3.146 3.854a.5.5 0 1 1 .708-.708L8 7.293l4.146-4.147a.5.5 0 0 1 .708 0z"
            fill="currentColor" />
        </svg>
      </button>
    `;
  }

  readonly #loadingIndicator = html`
    <div class="loading-indicator" role="status" aria-label="Loading">
      <forge-ai-spinner size="extra-small"></forge-ai-spinner>
    </div>
  `;

  public override render(): TemplateResult {
    return html`
      <div id=${this.#chipId} class="context-chip ${this.loading ? 'loading' : ''}" role="group" aria-label="Context: ${this.label}" aria-busy=${this.loading}>
        <div class="context-icon">${this.#iconContent}</div>
        <div class="context-content">${this.label}</div>
        ${when(
          this.loading,
          () => this.#loadingIndicator,
          () => when(this.sublabel, () => html`<span class="context-sublabel">${this.sublabel}</span>`)
        )}
        ${this.#removeButton}
      </div>
      ${when(this._isLabelOverflowing, () => html`<forge-ai-tooltip for=${this.#chipId} placement="top">${this.label}</forge-ai-tooltip>`)}
    `;
  }
}
