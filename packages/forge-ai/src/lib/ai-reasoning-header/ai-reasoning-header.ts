import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import styles from './ai-reasoning-header.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-reasoning-header': AiReasoningHeaderComponent;
  }
}

export const AiReasoningHeaderComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-reasoning-header';

/**
 * @tag forge-ai-reasoning-header
 *
 * @slot title - Content for the header when in regular (non-reasoning) state
 * @slot reasoning-title - Content for the header when in reasoning state
 *
 * @event {CustomEvent<{ expanded: boolean }>} toggle - Fired when the header is clicked and the expanded state changes
 */
@customElement(AiReasoningHeaderComponentTagName)
export class AiReasoningHeaderComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  /** Whether the header is expanded */
  @property({ type: Boolean, reflect: true })
  public expanded = false;

  /** Whether this is a reasoning header */
  @property({ type: Boolean, reflect: true })
  public reasoning = false;

  private _handleClick(): void {
    this.expanded = !this.expanded;

    // Dispatch custom event for parent components
    this.dispatchEvent(
      new CustomEvent('toggle', {
        detail: { expanded: this.expanded },
        bubbles: true,
        composed: true
      })
    );
  }

  public override render(): TemplateResult {
    return html`
      <button class="button-header" type="button" @click=${this._handleClick} aria-expanded=${this.expanded} aria-controls="content">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="forge-icon" aria-hidden="true">
          <path
            d="M3.5 19A1.5 1.5 0 0 1 5 20.5 1.5 1.5 0 0 1 3.5 22 1.5 1.5 0 0 1 2 20.5 1.5 1.5 0 0 1 3.5 19m5-3a2.5 2.5 0 0 1 2.5 2.5A2.5 2.5 0 0 1 8.5 21 2.5 2.5 0 0 1 6 18.5 2.5 2.5 0 0 1 8.5 16m6-1c-1.19 0-2.27-.5-3-1.35-.73.85-1.81 1.35-3 1.35-1.96 0-3.59-1.41-3.93-3.26A4.02 4.02 0 0 1 2 8a4 4 0 0 1 4-4l.77.07C7.5 3.41 8.45 3 9.5 3c1.19 0 2.27.5 3 1.35.73-.85 1.81-1.35 3-1.35 1.96 0 3.59 1.41 3.93 3.26A4.02 4.02 0 0 1 22 10a4 4 0 0 1-4 4l-.77-.07c-.73.66-1.68 1.07-2.73 1.07M6 6a2 2 0 0 0-2 2 2 2 0 0 0 2 2c.33 0 .64-.08.92-.22A2 2 0 0 0 6.5 11a2 2 0 0 0 2 2c.6 0 1.14-.27 1.5-.69l1.47-1.68L13 12.34c.38.4.91.66 1.5.66 1 0 1.83-.74 2-1.7.34.43.89.7 1.5.7a2 2 0 0 0 2-2 2 2 0 0 0-2-2c-.33 0-.64.08-.92.22A2 2 0 0 0 17.5 7a2 2 0 0 0-2-2c-.59 0-1.12.26-1.5.66l-1.53 1.71L11 5.69c-.36-.42-.9-.69-1.5-.69-1 0-1.83.74-2 1.7C7.16 6.27 6.61 6 6 6m2.5 11.5a1 1 0 0 0-1 1 1 1 0 0 0 1 1 1 1 0 0 0 1-1 1 1 0 0 0-1-1" />
        </svg>
        <span class="button-header-text"> ${this.reasoning ? html`<slot name="reasoning-title"></slot>` : html`<slot name="title"></slot>`} </span>
        ${this.expanded
          ? html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="forge-icon" aria-hidden="true">
              <path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
            </svg>`
          : html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="forge-icon" aria-hidden="true">
              <path d="M7.41 8.58 12 13.17l4.59-4.59L18 10l-6 6-6-6z" />
            </svg>`}
      </button>
    `;
  }
}
