import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import styles from './ai-empty-state.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-empty-state': AiEmptyStateComponent;
  }
}

export const AiEmptyStateComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-empty-state';

/**
 * @tag forge-ai-empty-state
 *
 * @slot - The welcome message content (overrides the default message).
 * @slot icon - The icon/graphic to display.
 * @slot heading - The custom heading/title to display.
 * @slot body - The custom body message content.
 * @slot actions - The actions or suggestions to display below the message.
 */
@customElement(AiEmptyStateComponentTagName)
export class AiEmptyStateComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  public override render(): TemplateResult {
    return html` <div class="empty-state-container">
      <slot name="icon"></slot>
      <div class="heading-message-container">
        <div class="heading">
          <slot name="heading"></slot>
        </div>
        <div class="message">
          <slot name="body"> Welcome to AI Assistant! Start a conversation by asking a question or describing what you'd like help with. </slot>
        </div>
      </div>
      <slot name="actions"></slot>
    </div>`;
  }
}
