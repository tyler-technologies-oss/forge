import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import styles from './ai-response-message.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-response-message': AiResponseMessageComponent;
  }
}

export const AiResponseMessageComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-response-message';

/**
 * @tag forge-ai-response-message
 *
 * @summary A simple wrapper component for rendering assistant response message content.
 */
@customElement(AiResponseMessageComponentTagName)
export class AiResponseMessageComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  public override render(): TemplateResult {
    return html`<span><slot></slot></span>`;
  }
}
