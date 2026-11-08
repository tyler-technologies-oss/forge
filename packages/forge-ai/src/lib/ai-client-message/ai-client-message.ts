import { LitElement, TemplateResult, html, nothing, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import type { ClientMessageAction, ClientMessageKind } from '../types/index.js';

import styles from './ai-client-message.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-client-message': AiClientMessageComponent;
  }
}

export const AiClientMessageComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-client-message';

const KIND_ICON_PATHS: Record<Exclude<ClientMessageKind, 'text'>, string> = {
  info: 'M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8',
  warning: 'M12 2 1 21h22zm0 3.99L19.53 19H4.47zM11 10v4h2v-4zm0 6v2h2v-2z',
  error: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 15h-2v-2h2zm0-4h-2V7h2z',
  success: 'M21 7 9 19l-5.5-5.5 1.41-1.41L9 16.17 19.59 5.59z'
};

/**
 * @tag forge-ai-client-message
 *
 * @summary Renders a client-only status message (never sent to the agent adapter) as
 * either plain system-message text or a Forge inline-message banner, depending on `kind`.
 *
 * @description
 * Used internally by `forge-ai-message-thread` to render client-only messages. Not intended to be
 * used standalone outside a message thread, but exported for direct Storybook/testing use.
 */
@customElement(AiClientMessageComponentTagName)
export class AiClientMessageComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  @property({ type: String, reflect: true })
  public kind: ClientMessageKind = 'text';

  @property({ type: String })
  public header?: string;

  @property({ type: String })
  public content = '';

  @property({ attribute: false })
  public actions: ClientMessageAction[] = [];

  get #icon(): TemplateResult | typeof nothing {
    if (this.kind === 'text') {
      return nothing;
    }

    return html`
      <svg
        class="forge-inline-message__icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height="24"
        width="24"
        fill="currentColor"
        aria-hidden="true">
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="${KIND_ICON_PATHS[this.kind]}" />
      </svg>
    `;
  }

  get #actions(): TemplateResult | typeof nothing {
    return when(
      this.actions.length > 0,
      () => html`
        <div class="client-message__actions">
          ${this.actions.map(
            action =>
              html`<button type="button" class="forge-button forge-button--outlined forge-button--dense" @click=${() => action.onClick()}>
                ${action.label}
              </button>`
          )}
        </div>
      `
    );
  }

  public override render(): TemplateResult {
    if (this.kind === 'text') {
      return html`
        <div class="client-message--text">
          <span>${this.content}</span>
          ${this.#actions}
        </div>
      `;
    }

    return html`
      <div class="forge-inline-message">
        ${this.#icon} ${when(this.header, () => html`<div class="forge-inline-message__title">${this.header}</div>`)}
        <div class="forge-inline-message__content">
          <span>${this.content}</span>
          ${this.#actions}
        </div>
      </div>
    `;
  }
}
