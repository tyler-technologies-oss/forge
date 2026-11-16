import { LitElement, html, nothing, unsafeCSS, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { ToolCall, AnyToolDefinition } from '../types/index.js';
import { isToolCallSettled } from '../ai-tool-call/utils.js';

import '../ai-spinner/ai-spinner.js';

import styles from './ai-tool-call-indicator.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-tool-call-indicator': AiToolCallIndicatorComponent;
  }
}

export const AiToolCallIndicatorComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-tool-call-indicator';

const MAX_DETAIL_LENGTH = 2000;

/**
 * @tag forge-ai-tool-call-indicator
 *
 * @summary Expandable timeline summarizing the tool calls made during an assistant response.
 *
 * @description
 * Collapsed, it shows an activity summary ("Running tools…" or "Used N tools · Xs"). When
 * expanded, it lists each tool call with its status. In debug mode the expanded view also
 * shows each tool's arguments and result.
 */
@customElement(AiToolCallIndicatorComponentTagName)
export class AiToolCallIndicatorComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  readonly #internals = this.attachInternals();

  @property({ attribute: false })
  public toolCalls: ToolCall[] = [];

  @property({ attribute: false })
  public tools?: Map<string, AnyToolDefinition>;

  @property({ type: Boolean, reflect: true, attribute: 'debug-mode' })
  public debugMode = false;

  @state()
  private _expanded = false;

  @state()
  private _expandedRows = new Set<string>();

  readonly #completeIcon = html`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="16" width="16" fill="currentColor" aria-hidden="true">
      <path d="M21 7 9 19l-5.5-5.5 1.41-1.41L9 16.17 19.59 5.59z" />
    </svg>
  `;

  readonly #summaryCompleteIcon = html`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="16" width="16" fill="currentColor" aria-hidden="true">
      <path
        d="M13 2.03v2.02c4.39.54 7.5 4.53 6.96 8.92-.46 3.64-3.32 6.53-6.96 6.96v2c5.5-.55 9.5-5.43 8.95-10.93-.45-4.75-4.22-8.5-8.95-8.97m-2 .03c-1.95.19-3.81.94-5.33 2.2L7.1 5.74c1.12-.9 2.47-1.48 3.9-1.68zM4.26 5.67A9.9 9.9 0 0 0 2.05 11h2c.19-1.42.75-2.77 1.64-3.9zM2.06 13c.2 1.96.97 3.81 2.21 5.33l1.42-1.43A8 8 0 0 1 4.06 13zm5.04 5.37-1.43 1.37A10 10 0 0 0 11 22v-2a8 8 0 0 1-3.9-1.63m9.72-3.18-4.11-4.11c.41-1.04.18-2.26-.68-3.11-.9-.91-2.25-1.09-3.34-.59l1.94 1.94-1.35 1.36-1.99-1.95c-.54 1.09-.29 2.44.59 3.35.86.86 2.08 1.08 3.12.68l4.11 4.1c.18.19.45.19.63 0l1.04-1.03c.22-.18.22-.5.04-.64" />
    </svg>
  `;

  readonly #errorIcon = html`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="16" width="16" fill="currentColor" aria-hidden="true">
      <path d="M12 2 1 21h22zm0 3.99L19.53 19H4.47zM11 10v4h2v-4zm0 6v2h2v-2z" />
    </svg>
  `;

  readonly #chevronIcon = html`
    <svg class="chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="20" width="20" fill="currentColor" aria-hidden="true">
      <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
    </svg>
  `;

  readonly #codeIcon = html`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="18" width="18" fill="currentColor" aria-hidden="true">
      <path d="M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6z" />
    </svg>
  `;

  get #count(): number {
    return this.toolCalls.length;
  }

  get #isRunning(): boolean {
    return this.toolCalls.some(tc => !isToolCallSettled(tc, this.tools?.get(tc.name)));
  }

  get #elapsedMs(): number | undefined {
    if (this.#isRunning) {
      return undefined;
    }
    const starts = this.toolCalls.map(tc => tc.startTimestamp ?? 0).filter(t => t > 0);
    const ends = this.toolCalls.map(tc => tc.endTimestamp ?? 0).filter(t => t > 0);
    if (!starts.length || !ends.length) {
      return undefined;
    }
    return Math.max(...ends) - Math.min(...starts);
  }

  get #formattedElapsed(): string {
    const ms = this.#elapsedMs ?? 0;
    if (ms < 1000) {
      return `${ms}ms`;
    }
    return `${Math.round(ms / 1000)}s`;
  }

  get #summaryLabel(): string {
    if (this.#isRunning) {
      return 'Running tools...';
    }
    const elapsed = this.#elapsedMs;
    const base = `Used ${this.#count} ${this.#count === 1 ? 'tool' : 'tools'}`;
    return elapsed === undefined ? base : `${base} · ${this.#formattedElapsed}`;
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('debugMode')) {
      this.#internals.states[this.debugMode ? 'add' : 'delete']('debug-mode');
    }
  }

  #toggle(): void {
    this._expanded = !this._expanded;
  }

  #toggleRow(id: string): void {
    const next = new Set(this._expandedRows);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    this._expandedRows = next;
  }

  #isRowExpanded(id: string): boolean {
    return this._expandedRows.has(id);
  }

  #hasDetail(toolCall: ToolCall): boolean {
    if (!this.debugMode) {
      return false;
    }
    const hasArgs = !!toolCall.args && Object.keys(toolCall.args).length > 0;
    const showResult = toolCall.status === 'complete' && toolCall.result !== undefined;
    const showError = toolCall.status === 'error';
    return hasArgs || showResult || showError;
  }

  #rowDuration(toolCall: ToolCall): string | undefined {
    const { startTimestamp, endTimestamp } = toolCall;
    if (!startTimestamp || !endTimestamp || endTimestamp < startTimestamp) {
      return undefined;
    }
    const ms = endTimestamp - startTimestamp;
    return ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(1)}s`;
  }

  #formatValue(value: unknown): string {
    let text: string;
    try {
      text = JSON.stringify(value, null, 2);
    } catch {
      text = String(value);
    }
    if (text === undefined) {
      text = String(value);
    }
    if (text.length > MAX_DETAIL_LENGTH) {
      return `${text.slice(0, MAX_DETAIL_LENGTH)}… (truncated)`;
    }
    return text;
  }

  #highlightJson(value: unknown): TemplateResult {
    const escaped = this.#formatValue(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const highlighted = escaped.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g, match => {
      let cls = 'token-number';
      if (/^"/.test(match)) {
        cls = /:$/.test(match) ? 'token-key' : 'token-string';
      } else if (/true|false/.test(match)) {
        cls = 'token-boolean';
      } else if (/null/.test(match)) {
        cls = 'token-null';
      }
      return `<span class="${cls}">${match}</span>`;
    });
    return html`${unsafeHTML(highlighted)}`;
  }

  #statusMarker(toolCall: ToolCall): TemplateResult {
    if (toolCall.status === 'error') {
      return html`<span class="row-marker row-marker--error">${this.#errorIcon}</span>`;
    }
    if (isToolCallSettled(toolCall, this.tools?.get(toolCall.name))) {
      return html`<span class="row-marker row-marker--complete">${this.#completeIcon}</span>`;
    }
    return html`<span class="row-marker"><forge-ai-spinner size="small"></forge-ai-spinner></span>`;
  }

  #detailPayload(toolCall: ToolCall): Record<string, unknown> {
    // prettier-ignore
    const payload: Record<string, unknown> = {
      'tool_name': toolCall.name,
      'tool_call_id': toolCall.id,
      'status': toolCall.status
    };
    const duration = this.#rowDuration(toolCall);
    if (duration) {
      payload.duration = duration;
    }
    if (toolCall.args && Object.keys(toolCall.args).length > 0) {
      payload.input = toolCall.args;
    }
    if (toolCall.result !== undefined) {
      payload.output = toolCall.result;
    }
    return payload;
  }

  #statusBadge(toolCall: ToolCall): TemplateResult | typeof nothing {
    const duration = this.#rowDuration(toolCall);
    if (!duration) {
      return nothing;
    }
    return html`<span class="code-card__status" data-status=${toolCall.status}>${duration}</span>`;
  }

  #renderCard(toolCall: ToolCall): TemplateResult {
    const expanded = this.#isRowExpanded(toolCall.id);
    const regionId = `detail-${toolCall.id}`;
    const name = this.tools?.get(toolCall.name)?.displayName ?? toolCall.name;

    return html`
      <div class="code-card">
        <button
          class="code-card__header row-button"
          type="button"
          aria-expanded=${expanded}
          aria-controls=${regionId}
          @click=${() => this.#toggleRow(toolCall.id)}>
          <span class="code-card__title">${this.#codeIcon}<span class="code-card__name">${name}</span></span>
          ${this.#statusBadge(toolCall)} ${this.#chevronIcon}
          <span class="focus-indicator"></span>
        </button>
        ${when(
          expanded,
          () => html`
            <div id=${regionId} class="code-card__body" role="region">
              <pre class="code-card__code">${this.#highlightJson(this.#detailPayload(toolCall))}</pre>
            </div>
          `
        )}
      </div>
    `;
  }

  #renderRow(toolCall: ToolCall): TemplateResult {
    if (this.#hasDetail(toolCall)) {
      return html`
        <div class="timeline-row" data-status=${toolCall.status}>
          <div class="row-header">${this.#statusMarker(toolCall)}${this.#renderCard(toolCall)}</div>
        </div>
      `;
    }

    const definition = this.tools?.get(toolCall.name);
    const name = definition?.displayName ?? toolCall.name;

    return html`
      <div class="timeline-row" data-status=${toolCall.status}>
        <div class="row-header">
          ${this.#statusMarker(toolCall)}
          <span class="row-label">
            <span class="row-name">${name}${this.#statusBadge(toolCall)}</span>
          </span>
        </div>
      </div>
    `;
  }

  get #timeline(): TemplateResult {
    return html`
      <div class="timeline ${this._expanded ? 'expanded' : ''}">
        <div class="timeline-content">${this.toolCalls.map(tc => this.#renderRow(tc))}</div>
      </div>
    `;
  }

  public override render(): TemplateResult | typeof nothing {
    if (!this.#count) {
      return nothing;
    }

    const icon = this.#isRunning
      ? html`<forge-ai-spinner size="small"></forge-ai-spinner>`
      : html`<span class="status-icon">${this.#summaryCompleteIcon}</span>`;

    return html`
      <button class="summary" type="button" aria-expanded=${this._expanded} @click=${this.#toggle}>
        ${icon}
        <span class="status-text">${this.#summaryLabel}</span>
        ${this.#chevronIcon}
        <span class="focus-indicator"></span>
      </button>
      ${this.#timeline}
    `;
  }
}
