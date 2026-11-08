import { LitElement, TemplateResult, html, unsafeCSS, nothing } from 'lit';
import { customElement, queryAssignedNodes } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import '../ai-gradient-container/ai-gradient-container';

import styles from './ai-chat-interface.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-chat-interface': AiChatInterfaceComponent;
  }
}

export const AiChatInterfaceComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-chat-interface';

/**
 * @tag forge-ai-chat-interface
 *
 * @slot - Default slot for messages
 * @slot header - Slot for AI chat header component
 * @slot suggestions - Slot for AI suggestions component
 * @slot attachments - Slot for file attachments component
 * @slot prompt - Slot for AI prompt component
 */
@customElement(AiChatInterfaceComponentTagName)
export class AiChatInterfaceComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  @queryAssignedNodes({ slot: 'suggestions', flatten: true })
  private _slottedSuggestionsNodes!: Node[];

  @queryAssignedNodes({ slot: 'attachments', flatten: true })
  private _slottedAttachmentsNodes!: Node[];

  readonly #headerSlot = html`<slot name="header" @slotchange=${this.#handleSlotChange}></slot>`;

  readonly #attachmentsSlot = html`<slot name="attachments" @slotchange=${this.#handleSlotChange}></slot>`;

  readonly #suggestionsSlot = html`<slot name="suggestions" @slotchange=${this.#handleSlotChange}></slot>`;

  get #suggestions(): TemplateResult | typeof nothing {
    const hasSuggestions = this._slottedSuggestionsNodes.length > 0;
    return when(
      hasSuggestions,
      () => html`<div class="suggestions-container">${this.#suggestionsSlot}</div>`,
      () => this.#suggestionsSlot
    );
  }

  get #attachments(): TemplateResult | typeof nothing {
    const hasAttachments = this._slottedAttachmentsNodes.length > 0;
    return when(
      hasAttachments,
      () => html`<div class="attachments-container">${this.#attachmentsSlot}</div>`,
      () => html`${this.#attachmentsSlot}`
    );
  }

  readonly #promptSlot = html`<slot name="prompt" @slotchange=${this.#handleSlotChange}></slot>`;

  get #prompt(): TemplateResult {
    return this.#promptSlot;
  }

  get #messagesContainer(): TemplateResult {
    return html`
      <div class="messages-container" part="messages">
        <slot @slotchange=${this.#handleSlotChange}></slot>
      </div>
    `;
  }

  #handleSlotChange(evt: Event): void {
    const slotName = (evt.target as HTMLSlotElement).name;

    if (['header', 'suggestions', 'prompt', 'attachments'].includes(slotName)) {
      this.requestUpdate();
    }
  }

  public scrollToBottom(): void {
    const container = this.shadowRoot?.querySelector('.messages-container');
    container?.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth'
    });
  }

  public override render(): TemplateResult {
    return html`
      <div class="ai-chat-interface">
        ${this.#headerSlot} ${this.#messagesContainer} ${this.#suggestions} ${this.#attachments}
        <div class="prompt-container">
          ${this.#prompt}
          <slot name="disclaimer"></slot>
        </div>
      </div>
    `;
  }
}
