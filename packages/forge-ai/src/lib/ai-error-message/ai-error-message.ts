import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property, queryAssignedNodes } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import styles from './ai-error-message.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-error-message': AiErrorMessageComponent;
  }
}

export type ErrorMessageDensity = 'medium' | 'small';

export const AiErrorMessageComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-error-message';

/**
 * @tag forge-ai-error-message
 *
 * @summary Displays error messages using Forge inline message banner style.
 *
 * @property {ErrorMessageDensity} density - The density of the banner. `'small'` tightens the padding, gap, and icon for use in compact surfaces like lists and panels (default: 'medium')
 *
 * @slot title - The error title text. When empty the banner collapses to a single row alongside the icon.
 * @slot - The error message content
 */
@customElement(AiErrorMessageComponentTagName)
export class AiErrorMessageComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  @property({ type: String, reflect: true })
  public density: ErrorMessageDensity = 'medium';

  @queryAssignedNodes({ slot: 'title', flatten: true })
  private _titleNodes!: Node[];

  #handleTitleSlotChange(): void {
    this.requestUpdate();
  }

  get #title(): TemplateResult {
    const classes = classMap({
      'forge-inline-message__title': true,
      'forge-inline-message__title--empty': this._titleNodes.length === 0
    });

    return html`
      <div class=${classes}>
        <slot name="title" @slotchange=${this.#handleTitleSlotChange}></slot>
      </div>
    `;
  }

  public override render(): TemplateResult {
    return html`
      <div class="forge-inline-message">
        <svg
          class="forge-inline-message__icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          height="24"
          width="24"
          fill="currentColor"
          aria-hidden="true">
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 15h-2v-2h2zm0-4h-2V7h2z" />
        </svg>
        ${this.#title}
        <div class="forge-inline-message__content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
