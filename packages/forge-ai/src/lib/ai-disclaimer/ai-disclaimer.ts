import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import styles from './ai-disclaimer.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-disclaimer': AiDisclaimerComponent;
  }

  interface HTMLElementEventMap {
    'forge-ai-disclaimer-agree': CustomEvent<void>;
    'forge-ai-disclaimer-disagree': CustomEvent<void>;
  }
}

export const AiDisclaimerComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-disclaimer';

/**
 * @tag forge-ai-disclaimer
 *
 * @summary Disclaimer overlay requiring user acknowledgment
 *
 * @slot icon - Optional icon at top
 * @slot - Default slot for scrollable disclaimer content
 * @slot disagree-button-text - Text for Disagree button (default: "Disagree")
 * @slot agree-button-text - Text for Agree button (default: "Agree")
 *
 * @event {CustomEvent<void>} forge-ai-disclaimer-agree - Fired when Agree button is clicked
 * @event {CustomEvent<void>} forge-ai-disclaimer-disagree - Fired when Disagree button is clicked
 */
@customElement(AiDisclaimerComponentTagName)
export class AiDisclaimerComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  #handleAgree(): void {
    this.dispatchEvent(
      new CustomEvent('forge-ai-disclaimer-agree', {
        bubbles: true,
        composed: true
      })
    );
  }

  #handleDisagree(): void {
    this.dispatchEvent(
      new CustomEvent('forge-ai-disclaimer-disagree', {
        bubbles: true,
        composed: true
      })
    );
  }

  public override render(): TemplateResult {
    return html`
      <div class="disclaimer-container">
        <div class="disclaimer-content">
          <div class="disclaimer-icon">
            <slot name="icon"></slot>
          </div>
          <slot></slot>
        </div>
        <div class="disclaimer-footer">
          <button class="disagree-button forge-button forge-button--outlined" @click=${this.#handleDisagree}>
            <slot name="disagree-button-text">Disagree</slot>
          </button>
          <button class="agree-button forge-button forge-button--raised" @click=${this.#handleAgree}>
            <slot name="agree-button-text">Agree</slot>
          </button>
        </div>
      </div>
    `;
  }
}
