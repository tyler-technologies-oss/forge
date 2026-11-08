import { LitElement, PropertyValues, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { generateUniqueId, toggleState } from '../utils/dom.js';
import '../core/tooltip/tooltip.js';

import styles from './ai-copy-button.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-copy-button': AiCopyButtonComponent;
  }
}

export const AiCopyButtonComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-copy-button';

const COPY_TIMEOUT = 3000;

export interface ForgeAiCopyButtonCopyEventData {
  value: string;
  success: boolean;
}

/**
 * @tag forge-ai-copy-button
 *
 * @summary A button that copies text to clipboard with tooltip
 */
@customElement(AiCopyButtonComponentTagName)
export class AiCopyButtonComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  /**
   * Text to copy to clipboard
   */
  @property({ type: String })
  public value = '';

  /**
   * Whether the button is disabled
   */
  @property({ type: Boolean })
  public disabled = false;

  #internals: ElementInternals;
  #buttonId = generateUniqueId('copy-button');
  #copied = false;
  #copiedTimeout?: number;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('disabled')) {
      toggleState(this.#internals, 'disabled', this.disabled);
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.#copiedTimeout) {
      clearTimeout(this.#copiedTimeout);
    }
  }

  readonly #copyIcon = html`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 21H8V7h11m0-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2m-3-4H4a2 2 0 0 0-2 2v14h2V3h12z" />
    </svg>
  `;

  readonly #checkIcon = html`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 7 9 19l-5.5-5.5 1.41-1.41L9 16.17 19.59 5.59z" />
    </svg>
  `;

  get #currentIcon(): TemplateResult {
    return this.#copied ? this.#checkIcon : this.#copyIcon;
  }

  get #tooltipText(): string {
    return this.#copied ? 'Copied!' : 'Copy';
  }

  async #handleCopy(): Promise<void> {
    if (!this.value || this.disabled || this.#copied) {
      return;
    }

    try {
      await navigator.clipboard.writeText(this.value);

      this.#copied = true;
      this.requestUpdate();

      this.#copiedTimeout = window.setTimeout(() => {
        this.#copied = false;
        this.requestUpdate();
      }, COPY_TIMEOUT);
    } catch (err) {
      console.error(`Failed to copy: ${err}`);
    }
  }

  public override render(): TemplateResult {
    return html`
      <button id=${this.#buttonId} class="forge-icon-button forge-icon-button--medium" @click=${this.#handleCopy} aria-label=${this.#tooltipText}>
        ${this.#currentIcon}
      </button>
      <forge-ai-tooltip for=${this.#buttonId} placement="bottom">${this.#tooltipText}</forge-ai-tooltip>
    `;
  }
}
