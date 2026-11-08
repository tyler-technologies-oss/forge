import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import styles from './ai-confirmation-prompt.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-confirmation-prompt': AiConfirmationPromptComponent;
  }

  interface HTMLElementEventMap {
    'forge-ai-confirmation-prompt-confirm': CustomEvent<void>;
    'forge-ai-confirmation-prompt-deny': CustomEvent<void>;
  }
}

export const AiConfirmationPromptComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-confirmation-prompt';

/**
 * @tag forge-ai-confirmation-prompt
 *
 * @summary Displays a confirmation UI for requiring human approval.
 *
 * @event {CustomEvent<void>} forge-ai-confirmation-prompt-confirm - Fired when user confirms the prompt
 * @event {CustomEvent<void>} forge-ai-confirmation-prompt-deny - Fired when user denies the prompt
 */
@customElement(AiConfirmationPromptComponentTagName)
export class AiConfirmationPromptComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  @property()
  public text = '';

  @property({ attribute: 'confirm-text' })
  public confirmText = 'Confirm';

  @property({ attribute: 'deny-text' })
  public denyText = 'Deny';

  @property({ type: Boolean })
  public disabled = false;

  @property({ type: Boolean, attribute: 'auto-focus' })
  public autoFocus = true;

  @property()
  public layout: 'horizontal' | 'vertical' = 'horizontal';

  @query('.deny-button')
  private _denyButton!: HTMLButtonElement;

  public override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('keydown', this.#handleKeyDown);
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.#handleKeyDown);
  }

  public override firstUpdated(): void {
    if (this.autoFocus) {
      this.updateComplete.then(() => {
        window.requestAnimationFrame(() => {
          this._denyButton?.focus();
        });
      });
    }
  }

  #handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      event.preventDefault();
      this.#handleDeny();
    }
  };

  #handleBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.#handleDeny();
    }
  }

  #handleConfirm(): void {
    const event = new CustomEvent('forge-ai-confirmation-prompt-confirm', {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  #handleDeny(): void {
    const event = new CustomEvent('forge-ai-confirmation-prompt-deny', {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  public override render(): TemplateResult {
    const containerClass = `container container--${this.layout}`;
    return html`
      <div class="backdrop" @click=${this.#handleBackdropClick} data-handles-escape>
        <div class=${containerClass} role="alertdialog" aria-labelledby="confirmation-text" aria-modal="true">
          <div id="confirmation-text" class="text">${this.text}</div>
          <div class="actions">
            <button class="deny-button forge-button forge-button--outlined" ?disabled=${this.disabled} aria-label="Deny" @click=${this.#handleDeny}>
              ${this.denyText}
            </button>
            <button class="confirm-button forge-button forge-button--filled" ?disabled=${this.disabled} aria-label="Confirm" @click=${this.#handleConfirm}>
              ${this.confirmText}
            </button>
          </div>
        </div>
      </div>
    `;
  }
}
