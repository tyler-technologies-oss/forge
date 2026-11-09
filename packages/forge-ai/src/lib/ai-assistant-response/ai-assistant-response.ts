import { LitElement, TemplateResult, html, unsafeCSS, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { AssistantResponse, ToolCall, AnyToolDefinition, ResponseItem } from '../types/index.js';
import { MarkdownStreamController } from '../utils/markdown-stream-controller.js';
import type { ForgeAiResponseMessageToolbarFeedbackEventData } from '../ai-response-message-toolbar/index.js';

import '../ai-response-message-toolbar/index.js';
import '../ai-tool-call/ai-tool-call.js';
import '../ai-tool-call-indicator/index.js';
import '../ai-thinking-indicator/index.js';

import styles from './ai-assistant-response.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-assistant-response': AiAssistantResponseComponent;
  }

  interface HTMLElementEventMap {
    'forge-ai-assistant-response-copy': CustomEvent<{ responseId: string }>;
    'forge-ai-assistant-response-resend': CustomEvent<{ responseId: string }>;
    'forge-ai-assistant-response-thumbs-up': CustomEvent<ForgeAiAssistantResponseFeedbackEventData>;
    'forge-ai-assistant-response-thumbs-down': CustomEvent<ForgeAiAssistantResponseFeedbackEventData>;
  }
}

export interface ForgeAiAssistantResponseFeedbackEventData {
  responseId: string;
  feedback?: string;
}

export const AiAssistantResponseComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-assistant-response';

/**
 * @tag forge-ai-assistant-response
 *
 * @summary Renders a complete assistant response with interleaved text chunks and tool calls.
 *
 * @event {CustomEvent<{ responseId: string }>} forge-ai-assistant-response-copy - Fired when copy action is clicked
 * @event {CustomEvent<{ responseId: string }>} forge-ai-assistant-response-resend - Fired when resend action is clicked
 * @event {CustomEvent<ForgeAiAssistantResponseFeedbackEventData>} forge-ai-assistant-response-thumbs-up - Fired when thumbs up is clicked
 * @event {CustomEvent<ForgeAiAssistantResponseFeedbackEventData>} forge-ai-assistant-response-thumbs-down - Fired when thumbs down is clicked
 */
@customElement(AiAssistantResponseComponentTagName)
export class AiAssistantResponseComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  @property({ attribute: false })
  public response!: AssistantResponse;

  @property({ attribute: false })
  public tools?: Map<string, AnyToolDefinition>;

  @property({ type: Boolean, attribute: 'enable-reactions' })
  public enableReactions = false;

  @property({ type: Boolean, attribute: 'debug-mode' })
  public debugMode = false;

  @property({ type: Boolean, attribute: 'show-thinking' })
  public showThinking = false;

  #internals = this.attachInternals();
  readonly #markdownController = new MarkdownStreamController(this);

  public override willUpdate(): void {
    this.#updateEmptyState();
  }

  get #hasVisibleContent(): boolean {
    return this.response.children.some(child => {
      if (child.type === 'text') {
        const content = typeof child.content === 'string' ? child.content : '';
        return content.trim().length > 0;
      }
      return true;
    });
  }

  #updateEmptyState(): void {
    const isEmpty = !this.#hasVisibleContent && this.response.status !== 'complete' && !this.showThinking;
    if (isEmpty) {
      this.#internals.states.add('empty');
    } else {
      this.#internals.states.delete('empty');
    }
  }

  #renderTextChunk(child: ResponseItem & { type: 'text' }): TemplateResult | typeof nothing {
    const content = typeof child.content === 'string' ? child.content : '';
    if (!content.trim()) {
      return nothing;
    }
    const renderedHtml = this.#markdownController.getCachedHtml(child.messageId, content);
    return html`<div class="text-chunk">${unsafeHTML(renderedHtml)}</div>`;
  }

  #renderToolCall(toolCall: ToolCall): TemplateResult | typeof nothing {
    const toolDefinition = this.tools?.get(toolCall.name);

    if (!toolDefinition?.renderer) {
      return nothing;
    }

    return html`<forge-ai-tool-call .toolCall=${toolCall} .toolDefinition=${toolDefinition}></forge-ai-tool-call>`;
  }

  get #children(): (TemplateResult | typeof nothing)[] {
    const results: (TemplateResult | typeof nothing)[] = [];
    let toolBuffer: ToolCall[] = [];

    const flushIndicator = (): void => {
      if (toolBuffer.length === 0) {
        return;
      }

      const flushed = toolBuffer;
      toolBuffer = [];

      results.push(
        html`<forge-ai-tool-call-indicator .toolCalls=${flushed} .tools=${this.tools} ?debug-mode=${this.debugMode}></forge-ai-tool-call-indicator>`
      );

      for (const toolCall of flushed) {
        results.push(this.#renderToolCall(toolCall));
      }
    };

    for (const child of this.response.children) {
      if (child.type === 'text') {
        flushIndicator();
        results.push(this.#renderTextChunk(child));
      } else {
        toolBuffer.push(child.data);
      }
    }

    flushIndicator();
    return results;
  }

  #handleToolbarAction(event: CustomEvent<{ action: string }>): void {
    const action = event.detail.action;
    const eventType = `forge-ai-assistant-response-${action}`;
    const bubbleEvent = new CustomEvent(eventType, {
      detail: { responseId: this.response.id }
    });
    this.dispatchEvent(bubbleEvent);
  }

  #handleToolbarFeedback(event: CustomEvent<ForgeAiResponseMessageToolbarFeedbackEventData>): void {
    const { action, feedback } = event.detail;
    const eventType: keyof HTMLElementEventMap = action === 'positive' ? 'forge-ai-assistant-response-thumbs-up' : 'forge-ai-assistant-response-thumbs-down';
    const bubbleEvent = new CustomEvent<ForgeAiAssistantResponseFeedbackEventData>(eventType, {
      detail: { responseId: this.response.id, feedback }
    });
    this.dispatchEvent(bubbleEvent);
  }

  get #toolbar(): TemplateResult | typeof nothing {
    if (this.response.status !== 'complete') {
      return nothing;
    }

    const hasTextContent = this.response.children.some(child => {
      if (child.type !== 'text') {
        return false;
      }
      const content = typeof child.content === 'string' ? child.content : '';
      return content.trim().length > 0;
    });

    if (!hasTextContent) {
      return nothing;
    }

    return html`
      <div class="toolbar-container">
        <forge-ai-response-message-toolbar
          ?enable-reactions=${this.enableReactions}
          feedback-type=${ifDefined(this.response.feedback?.type)}
          feedback-reason=${ifDefined(this.response.feedback?.reason)}
          @forge-ai-response-message-toolbar-action=${this.#handleToolbarAction}
          @forge-ai-response-message-toolbar-feedback=${this.#handleToolbarFeedback}>
        </forge-ai-response-message-toolbar>
      </div>
    `;
  }

  get #thinkingIndicator(): TemplateResult | typeof nothing {
    if (!this.showThinking) {
      return nothing;
    }

    const lastChild = this.response.children[this.response.children.length - 1];

    // When the agent is thinking between steps the text child stays 'streaming' with stale
    // content, so skip the streaming-text hide and show the indicator to signal the gap.
    const isThinking = this.response.status === 'streaming' && this.response.isThinking === true;

    // Hide while text is actively streaming — the streaming text itself signals activity.
    if (!isThinking && lastChild?.type === 'text' && lastChild.status === 'streaming') {
      const content = typeof lastChild.content === 'string' ? lastChild.content : '';
      if (content.trim().length > 0) {
        return nothing;
      }
    }

    // Hide while a tool call is still genuinely unresolved — its own indicator (or renderer,
    // for renderOnStart tools) already shows activity, so a generic spinner would be redundant.
    // This is intentionally based on the tool call's real status, not on whether its renderer
    // has mounted: a renderOnStart tool awaiting user input should keep this hidden, while a
    // truly settled tool call should let the indicator reappear to signal a gap before the next step.
    const hasActiveToolCall = this.response.children.some(child => {
      if (child.type !== 'toolCall') {
        return false;
      }
      return child.data.status === 'parsing' || child.data.status === 'executing' || child.data.status === 'pending';
    });
    if (hasActiveToolCall) {
      return nothing;
    }

    return html`<div class="thinking-indicator">
      <forge-ai-thinking-indicator show-text></forge-ai-thinking-indicator>
    </div>`;
  }

  public override render(): TemplateResult {
    return html`
      <div class="assistant-response" ?data-complete=${this.response.status === 'complete'}>${this.#children} ${this.#thinkingIndicator} ${this.#toolbar}</div>
    `;
  }
}
