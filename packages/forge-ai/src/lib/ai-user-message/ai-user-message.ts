import { LitElement, TemplateResult, html, nothing, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import '../ai-user-message-toolbar/index.js';

import styles from './ai-user-message.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-user-message': AiUserMessageComponent;
  }

  interface HTMLElementEventMap {
    'forge-ai-user-message-copy': CustomEvent<ForgeAiUserMessageCopyEventData>;
    'forge-ai-user-message-resend': CustomEvent<ForgeAiUserMessageResendEventData>;
    'forge-ai-user-message-edit': CustomEvent<ForgeAiUserMessageEditEventData>;
  }
}

export interface ForgeAiUserMessageCopyEventData {
  messageId: string;
}

export interface ForgeAiUserMessageResendEventData {
  messageId: string;
}

export interface ForgeAiUserMessageEditEventData {
  messageId: string;
  content: string;
}

export const AiUserMessageComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-user-message';

/**
 * @tag forge-ai-user-message
 *
 * @event {CustomEvent<ForgeAiUserMessageCopyEventData>} forge-ai-user-message-copy - Fired when user clicks copy button
 * @event {CustomEvent<ForgeAiUserMessageResendEventData>} forge-ai-user-message-resend - Fired when user clicks resend button
 * @event {CustomEvent<ForgeAiUserMessageEditEventData>} forge-ai-user-message-edit - Fired when user saves edited message
 */
@customElement(AiUserMessageComponentTagName)
export class AiUserMessageComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  @property({ attribute: false })
  public timestamp?: number;

  @property({ attribute: 'message-id' })
  public messageId?: string;

  @property({ type: Boolean })
  public streaming = false;

  @property({ attribute: false })
  public content?: string;

  @state()
  private _editing = false;

  @state()
  private _editContent = '';

  readonly #messageContainer = html`
    <div class="ai-message-container">
      <span>
        <slot></slot>
      </span>
    </div>
  `;

  get #isSaveDisabled(): boolean {
    const trimmed = this._editContent.trim();
    return !trimmed || trimmed === this.content?.trim();
  }

  get #editContainer(): TemplateResult {
    return html`
      <div class="edit-container">
        <textarea class="edit-textarea" .value=${this._editContent} @input=${this.#handleEditInput}></textarea>
        <div class="edit-footer">
          <button class="forge-button forge-button--outlined" @click=${this.#handleCancel}>Cancel</button>
          <button class="forge-button forge-button--raised" ?disabled=${this.#isSaveDisabled} @click=${this.#handleSave}>Save</button>
        </div>
      </div>
    `;
  }

  get #toolbar(): TemplateResult | typeof nothing {
    if (!this.messageId || this._editing || !this.timestamp) {
      return nothing;
    }

    return html`
      <div class="toolbar-container">
        <forge-ai-user-message-toolbar
          .timestamp=${this.timestamp}
          ?streaming=${this.streaming}
          @forge-ai-user-message-toolbar-copy=${this.#handleToolbarCopy}
          @forge-ai-user-message-toolbar-resend=${this.#handleToolbarResend}
          @forge-ai-user-message-toolbar-edit=${this.#handleToolbarEdit}>
        </forge-ai-user-message-toolbar>
      </div>
    `;
  }

  #handleToolbarCopy(): void {
    this.dispatchEvent(
      new CustomEvent('forge-ai-user-message-copy', {
        detail: { messageId: this.messageId },
        bubbles: true,
        composed: true
      })
    );
  }

  #handleToolbarResend(): void {
    this.dispatchEvent(
      new CustomEvent('forge-ai-user-message-resend', {
        detail: { messageId: this.messageId },
        bubbles: true,
        composed: true
      })
    );
  }

  #handleToolbarEdit(): void {
    this._editContent = this.content ?? '';
    this._editing = true;
  }

  #handleEditInput(evt: Event): void {
    this._editContent = (evt.target as HTMLTextAreaElement).value;
  }

  #handleCancel(): void {
    this._editing = false;
    this._editContent = '';
  }

  #handleSave(): void {
    if (this.#isSaveDisabled) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent('forge-ai-user-message-edit', {
        detail: { messageId: this.messageId, content: this._editContent.trim() },
        bubbles: true,
        composed: true
      })
    );

    this._editing = false;
    this._editContent = '';
  }

  public override render(): TemplateResult {
    return html` <div class="grid-container">${this._editing ? this.#editContainer : this.#messageContainer} ${this.#toolbar}</div> `;
  }
}
