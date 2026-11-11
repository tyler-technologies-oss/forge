import { LitElement, TemplateResult, html, nothing, unsafeCSS, type PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { when } from 'lit/directives/when.js';
import type { MessageItem, AnyToolDefinition, ToolCall, AssistantResponse } from '../types/index.js';
import { MarkdownStreamController } from '../utils/markdown-stream-controller.js';
import type { ForgeAiAssistantResponseFeedbackEventData } from '../ai-assistant-response/index.js';
import type { FeatureToggle } from '../types/index.js';

import '../ai-assistant-response/index.js';
import '../ai-client-message/index.js';
import '../ai-empty-state/index.js';
import '../ai-error-message/index.js';
import '../ai-response-message/index.js';
import '../ai-thinking-indicator/index.js';
import '../ai-user-message/index.js';
import '../ai-tool-call/ai-tool-call.js';
import '../core/tooltip/tooltip.js';

import styles from './ai-message-thread.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-message-thread': AiMessageThreadComponent;
  }

  interface HTMLElementEventMap {
    'forge-ai-message-thread-copy': CustomEvent<ForgeAiMessageThreadCopyEventData>;
    'forge-ai-message-thread-resend': CustomEvent<ForgeAiMessageThreadResendEventData>;
    'forge-ai-message-thread-thumbs-up': CustomEvent<ForgeAiMessageThreadThumbsEventData>;
    'forge-ai-message-thread-thumbs-down': CustomEvent<ForgeAiMessageThreadThumbsEventData>;
    'forge-ai-message-thread-user-copy': CustomEvent<ForgeAiMessageThreadCopyEventData>;
    'forge-ai-message-thread-user-resend': CustomEvent<ForgeAiMessageThreadResendEventData>;
    'forge-ai-message-thread-user-edit': CustomEvent<ForgeAiMessageThreadEditEventData>;
  }
}

export interface ForgeAiMessageThreadCopyEventData {
  messageId: string;
}

export interface ForgeAiMessageThreadResendEventData {
  messageId: string;
}

export interface ForgeAiMessageThreadThumbsEventData {
  messageId: string;
  feedback?: string;
}

export interface ForgeAiMessageThreadEditEventData {
  messageId: string;
  content: string;
}

export const AiMessageThreadComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-message-thread';

const SCROLL_THRESHOLD = 100;

/**
 * @tag forge-ai-message-thread
 *
 * @summary A primitive component for rendering a thread of chat messages, including user, assistant, system, and tool call messages.
 *
 * @description
 * The AI Message Thread component displays a chronological list of messages with support for markdown rendering,
 * tool calls, empty states, and thinking indicators. It handles its own scrolling behavior with auto-scroll support.
 *
 * @slot empty-state-icon - Slot for custom empty state icon
 * @slot empty-state-heading - Slot for custom empty state heading content
 * @slot empty-state-message - Slot for custom empty state message content
 * @slot empty-state-actions - Slot for custom empty state actions (e.g., suggestions)
 *
 * @cssproperty --forge-ai-message-thread-content-max-width - Controls the max-width of the message content area while keeping the scroll container full width.
 *
 * @event {CustomEvent<ForgeAiMessageThreadCopyEventData>} forge-ai-message-thread-copy - Fired when user clicks copy on a message
 * @event {CustomEvent<ForgeAiMessageThreadResendEventData>} forge-ai-message-thread-resend - Fired when user clicks resend on a message
 * @event {CustomEvent<ForgeAiMessageThreadThumbsEventData>} forge-ai-message-thread-thumbs-up - Fired when user gives thumbs up
 * @event {CustomEvent<ForgeAiMessageThreadThumbsEventData>} forge-ai-message-thread-thumbs-down - Fired when user gives thumbs down
 * @event {CustomEvent<ForgeAiMessageThreadCopyEventData>} forge-ai-message-thread-user-copy - Fired when user clicks copy on a user message
 * @event {CustomEvent<ForgeAiMessageThreadResendEventData>} forge-ai-message-thread-user-resend - Fired when user clicks resend on a user message
 * @event {CustomEvent<ForgeAiMessageThreadEditEventData>} forge-ai-message-thread-user-edit - Fired when user edits a user message
 */
@customElement(AiMessageThreadComponentTagName)
export class AiMessageThreadComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  @property({ attribute: false })
  public messageItems: MessageItem[] = [];

  @property({ attribute: false })
  public tools?: Map<string, AnyToolDefinition>;

  @property({ type: Boolean, attribute: 'enable-reactions' })
  public enableReactions = false;

  @property({ type: Boolean, attribute: 'show-thinking' })
  public showThinking = false;

  @property({ type: Boolean, attribute: 'debug-mode' })
  public debugMode = false;

  @property({ attribute: 'auto-scroll' })
  public autoScroll: FeatureToggle = 'on';

  @query('.message-thread')
  private _messageThreadContainer!: HTMLElement;

  readonly #markdownController = new MarkdownStreamController(this);
  readonly #resizeObserver = new ResizeObserver(() => this.#checkScrollState());
  #canAutoScroll = true;

  public override connectedCallback(): void {
    super.connectedCallback();
    if (this.hasUpdated) {
      this.#resizeObserver.observe(this._messageThreadContainer);
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#resizeObserver.disconnect();
  }

  public override firstUpdated(): void {
    this.#resizeObserver.observe(this._messageThreadContainer);
  }

  public override updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);

    if (this.autoScroll === 'on' && (changedProperties.has('messageItems') || changedProperties.has('showThinking'))) {
      this.#scheduleScroll();
    }
  }

  async #scheduleScroll(): Promise<void> {
    await this.updateComplete;
    await new Promise(requestAnimationFrame);
    this.scrollToBottom();
  }

  #checkScrollState(): void {
    const container = this._messageThreadContainer;
    if (!container) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = container;
    const canAutoScroll = scrollTop + clientHeight >= scrollHeight - SCROLL_THRESHOLD;
    if (canAutoScroll !== this.#canAutoScroll) {
      this.#canAutoScroll = canAutoScroll;
      this.requestUpdate();
    }
  }

  #handleScroll = (): void => {
    this.#checkScrollState();
  };

  public scrollToBottom({ force = false, behavior = 'smooth' }: { force?: boolean; behavior?: ScrollBehavior } = {}): void {
    if (!force && !this.#canAutoScroll) {
      return;
    }

    const container = this._messageThreadContainer;
    container.scrollTo({
      top: container.scrollHeight,
      behavior
    });
  }

  #handleScrollToBottomClick = (): void => {
    this.scrollToBottom({ force: true, behavior: 'smooth' });
  };

  get #scrollToBottomButton(): TemplateResult | typeof nothing {
    if (!this.messageItems.length) {
      return nothing;
    }
    const hiddenClass = this.#canAutoScroll ? ' scroll-to-bottom-button--hidden' : '';
    return html`
      <button
        id="scroll-to-bottom-btn"
        class=${`forge-fab scroll-to-bottom-button${hiddenClass}`}
        aria-label="Scroll to bottom"
        @click=${this.#handleScrollToBottomClick}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7.03 13.92h4V5l2.01-.03v8.95h3.99l-5 5Z" />
        </svg>
      </button>
      <forge-ai-tooltip for="scroll-to-bottom-btn" placement="top">Scroll to bottom</forge-ai-tooltip>
    `;
  }

  #handleCopy(messageId: string): void {
    this.#dispatchEvent({
      type: 'forge-ai-message-thread-copy',
      detail: { messageId }
    });
  }

  #handleResend(messageId: string): void {
    this.#dispatchEvent({
      type: 'forge-ai-message-thread-resend',
      detail: { messageId }
    });
  }

  #handleThumbsUp(messageId: string, feedback?: string): void {
    const detail: ForgeAiMessageThreadThumbsEventData = { messageId, feedback };
    this.#dispatchEvent({ type: 'forge-ai-message-thread-thumbs-up', detail });
  }

  #handleThumbsDown(messageId: string, feedback?: string): void {
    const detail: ForgeAiMessageThreadThumbsEventData = { messageId, feedback };
    this.#dispatchEvent({ type: 'forge-ai-message-thread-thumbs-down', detail });
  }

  #handleUserCopy(messageId: string): void {
    this.#dispatchEvent({
      type: 'forge-ai-message-thread-user-copy',
      detail: { messageId }
    });
  }

  #handleUserResend(messageId: string): void {
    this.#dispatchEvent({
      type: 'forge-ai-message-thread-user-resend',
      detail: { messageId }
    });
  }

  #handleUserEdit(messageId: string, content: string): void {
    this.#dispatchEvent({
      type: 'forge-ai-message-thread-user-edit',
      detail: { messageId, content }
    });
  }

  #renderToolCall(toolCall: ToolCall): TemplateResult {
    const toolDefinition = this.tools?.get(toolCall.name);
    return html`<forge-ai-tool-call .toolCall=${toolCall} .toolDefinition=${toolDefinition}></forge-ai-tool-call>`;
  }

  get #activeResponse(): AssistantResponse | undefined {
    const lastItem = this.messageItems[this.messageItems.length - 1];
    return lastItem?.type === 'assistant' ? lastItem.data : undefined;
  }

  #renderAssistantResponse(response: AssistantResponse): TemplateResult {
    return html`
      <forge-ai-assistant-response
        .response=${response}
        .tools=${this.tools}
        ?enable-reactions=${this.enableReactions}
        ?debug-mode=${this.debugMode}
        ?show-thinking=${this.showThinking && response === this.#activeResponse}
        @forge-ai-assistant-response-copy=${(e: CustomEvent<{ responseId: string }>) => this.#handleCopy(e.detail.responseId)}
        @forge-ai-assistant-response-resend=${(e: CustomEvent<{ responseId: string }>) => this.#handleResend(e.detail.responseId)}
        @forge-ai-assistant-response-thumbs-up=${(e: CustomEvent<ForgeAiAssistantResponseFeedbackEventData>) =>
          this.#handleThumbsUp(e.detail.responseId, e.detail.feedback)}
        @forge-ai-assistant-response-thumbs-down=${(e: CustomEvent<ForgeAiAssistantResponseFeedbackEventData>) =>
          this.#handleThumbsDown(e.detail.responseId, e.detail.feedback)}>
      </forge-ai-assistant-response>
    `;
  }

  get #emptyState(): TemplateResult | typeof nothing {
    if (this.messageItems.length) {
      return nothing;
    }

    return html`
      <forge-ai-empty-state>
        <slot name="empty-state-icon" slot="icon"></slot>
        <slot name="empty-state-heading" slot="heading">
          <span>How can I help you today?</span>
        </slot>
        <slot name="empty-state-message" slot="body"> Start a conversation by asking a question or describing what you'd like help with. </slot>
        <slot name="empty-state-actions" slot="actions"></slot>
      </forge-ai-empty-state>
    `;
  }

  get #thinkingIndicator(): TemplateResult | typeof nothing {
    if (!this.showThinking) {
      return nothing;
    }

    // Once an assistant response exists, it renders the indicator inline so it aligns
    // with the response's streaming text and tool calls.
    if (this.#activeResponse) {
      return nothing;
    }

    return html`<div class="thinking-indicator">
      <forge-ai-thinking-indicator class="status-indicator" show-text></forge-ai-thinking-indicator>
    </div>`;
  }

  get #messages(): (TemplateResult | typeof nothing)[] {
    const itemsToRender = this.messageItems.filter(item => {
      if (item.type === 'assistant') {
        return true;
      }
      if (item.type === 'toolCall') {
        const toolDef = this.tools?.get(item.data.name);
        return !!toolDef?.renderer;
      }
      if (item.type === 'message') {
        return item.data.role !== 'tool';
      }
      return false;
    });

    return itemsToRender.map(item => {
      if (item.type === 'assistant') {
        return this.#renderAssistantResponse(item.data);
      }

      if (item.type === 'toolCall') {
        return this.#renderToolCall(item.data);
      }

      const msg = item.data;
      const content = typeof msg.content === 'string' ? msg.content : '';
      if (msg.role === 'user') {
        const renderedHtml = this.#markdownController.getCachedHtml(msg.id, content, { streaming: false });
        return html`
          <forge-ai-user-message
            message-id=${msg.id}
            .timestamp=${msg.timestamp}
            .content=${content}
            ?streaming=${this.showThinking}
            @forge-ai-user-message-copy=${(e: CustomEvent<{ messageId: string }>) => this.#handleUserCopy(e.detail.messageId)}
            @forge-ai-user-message-resend=${(e: CustomEvent<{ messageId: string }>) => this.#handleUserResend(e.detail.messageId)}
            @forge-ai-user-message-edit=${(e: CustomEvent<{ messageId: string; content: string }>) =>
              this.#handleUserEdit(e.detail.messageId, e.detail.content)}>
            ${unsafeHTML(renderedHtml)}
          </forge-ai-user-message>
        `;
      } else if (msg.role === 'system') {
        return html`
          <forge-ai-client-message kind=${msg.kind ?? 'text'} .header=${msg.header} .content=${content} .actions=${msg.actions ?? []}>
          </forge-ai-client-message>
        `;
      } else if (msg.status === 'error') {
        const renderedHtml = this.#markdownController.getCachedHtml(msg.id, content, { streaming: false });
        return html`
          <forge-ai-error-message>
            <span slot="title">Error</span>
            ${unsafeHTML(renderedHtml)}
          </forge-ai-error-message>
        `;
      } else {
        return when(content.trim().length, () => {
          const streaming = msg.status === 'streaming' || msg.status === 'pending';
          const renderedHtml = this.#markdownController.getCachedHtml(msg.id, content, { streaming });
          return html`<forge-ai-response-message>${unsafeHTML(renderedHtml)}</forge-ai-response-message>`;
        });
      }
    });
  }

  public override render(): TemplateResult {
    return html`
      <div class="message-thread" @scroll=${this.autoScroll ? this.#handleScroll : undefined}>
        ${this.#scrollToBottomButton}
        <div class="message-thread-content">${this.#emptyState} ${this.#messages} ${this.#thinkingIndicator}</div>
      </div>
    `;
  }

  #dispatchEvent(config: { type: keyof HTMLElementEventMap; detail?: unknown }): CustomEvent {
    const event = new CustomEvent(config.type, {
      detail: config.detail,
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
    return event;
  }
}
