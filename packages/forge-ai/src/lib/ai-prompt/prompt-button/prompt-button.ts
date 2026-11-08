import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import styles from './prompt-button.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-prompt-button': PromptButtonComponent;
  }
}

export const PromptButtonComponentTagName: keyof HTMLElementTagNameMap = 'forge-prompt-button';

/**
 * @tag forge-prompt-button
 */
@customElement(PromptButtonComponentTagName)
export class PromptButtonComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  /** Whether the button is disabled */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  public override render(): TemplateResult {
    return html`
      <button class="button-container forge-button" .disabled=${this.disabled}>
        <slot name="leading"></slot>
        <slot></slot>
        <slot name="trailing"></slot>
      </button>
    `;
  }
}
