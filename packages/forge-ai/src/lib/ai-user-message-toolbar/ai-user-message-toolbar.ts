import { LitElement, TemplateResult, html, nothing, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '../core/tooltip/tooltip.js';

import styles from './ai-user-message-toolbar.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-user-message-toolbar': AiUserMessageToolbarComponent;
  }

  interface HTMLElementEventMap {
    'forge-ai-user-message-toolbar-copy': CustomEvent<void>;
    'forge-ai-user-message-toolbar-resend': CustomEvent<void>;
    'forge-ai-user-message-toolbar-edit': CustomEvent<void>;
  }
}

export const AiUserMessageToolbarComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-user-message-toolbar';

/**
 * @tag forge-ai-user-message-toolbar
 *
 * @summary Toolbar for user message actions including copy, resend, and edit.
 *
 * @event {CustomEvent<void>} forge-ai-user-message-toolbar-copy - Fired when copy button is clicked
 * @event {CustomEvent<void>} forge-ai-user-message-toolbar-resend - Fired when resend button is clicked
 * @event {CustomEvent<void>} forge-ai-user-message-toolbar-edit - Fired when edit button is clicked
 */
@customElement(AiUserMessageToolbarComponentTagName)
export class AiUserMessageToolbarComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  @property({ attribute: false })
  public timestamp!: number;

  @property({ type: Boolean })
  public streaming = false;

  readonly #resendIcon = html`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M17.65 6.35A7.96 7.96 0 0 0 12 4a8 8 0 0 0-8 8 8 8 0 0 0 8 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18a6 6 0 0 1-6-6 6 6 0 0 1 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4z" />
    </svg>
  `;

  readonly #copyIcon = html`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 21H8V7h11m0-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2m-3-4H4a2 2 0 0 0-2 2v14h2V3h12z" />
    </svg>
  `;

  readonly #editIcon = html`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83 3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z" />
    </svg>
  `;

  get #formattedTime(): string {
    if (!this.timestamp) {
      return '';
    }
    return new Date(this.timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  get #formattedFullDate(): string {
    if (!this.timestamp) {
      return '';
    }
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(this.timestamp);
  }

  #handleCopy(): void {
    this.dispatchEvent(
      new CustomEvent('forge-ai-user-message-toolbar-copy', {
        bubbles: true,
        composed: true
      })
    );
  }

  #handleResend(): void {
    this.dispatchEvent(
      new CustomEvent('forge-ai-user-message-toolbar-resend', {
        bubbles: true,
        composed: true
      })
    );
  }

  #handleEdit(): void {
    this.dispatchEvent(
      new CustomEvent('forge-ai-user-message-toolbar-edit', {
        bubbles: true,
        composed: true
      })
    );
  }

  get #timestampTemplate(): TemplateResult | typeof nothing {
    if (!this.timestamp) {
      return nothing;
    }

    return html`
      <span id="timestamp" class="timestamp">${this.#formattedTime}</span>
      <forge-ai-tooltip for="timestamp" placement="bottom">${this.#formattedFullDate}</forge-ai-tooltip>
    `;
  }

  get #actionButtons(): TemplateResult | typeof nothing {
    if (this.streaming) {
      return nothing;
    }

    return html`
      <button id="resend-btn" aria-label="Resend message" class="forge-icon-button forge-icon-button--small" @click=${this.#handleResend}>
        ${this.#resendIcon}
      </button>
      <forge-ai-tooltip for="resend-btn" placement="bottom">Resend</forge-ai-tooltip>

      <button id="edit-btn" aria-label="Edit message" class="forge-icon-button forge-icon-button--small" @click=${this.#handleEdit}>${this.#editIcon}</button>
      <forge-ai-tooltip for="edit-btn" placement="bottom">Edit</forge-ai-tooltip>
    `;
  }

  readonly #copyButton = html`
    <button id="copy-btn" aria-label="Copy message" class="forge-icon-button forge-icon-button--small" @click=${this.#handleCopy}>${this.#copyIcon}</button>
    <forge-ai-tooltip for="copy-btn" placement="bottom">Copy</forge-ai-tooltip>
  `;

  public override render(): TemplateResult {
    return html` <div class="user-message-toolbar">${this.#timestampTemplate} ${this.#actionButtons} ${this.#copyButton}</div> `;
  }
}
