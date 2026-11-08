import { LitElement, TemplateResult, html, nothing, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import styles from './ai-thinking-indicator.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-thinking-indicator': AiThinkingIndicatorComponent;
  }
}

export const AiThinkingIndicatorComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-thinking-indicator';

const STATUS_MESSAGES = [
  'Thinking...',
  'Processing...',
  'Reviewing...',
  'Considering...',
  'Evaluating...',
  'Analyzing...',
  'Assessing...',
  'Auditing...',
  'Deliberating...',
  'Adjudicating...',
  'Cogitating...',
  'Ruminating...',
  'Percolating...',
  'Marshaling...',
  'Collating...',
  'Parsing...',
  'Distilling...',
  'Forging...',
  'Refining...',
  'Reconciling...',
  'Finalizing...',
  'Validating...',
  'Verifying...',
  'Contemplating...',
  'Pondering...',
  'Weighing...',
  'Scrutinizing...',
  'Examining...',
  'Investigating...',
  'Deducing...',
  'Inferring...',
  'Reasoning...',
  'Synthesizing...',
  'Formulating...',
  'Compiling...',
  'Consulting...',
  'Cross-referencing...',
  'Interpreting...',
  'Untangling...',
  'Sifting...',
  'Triangulating...'
];

/**
 * @tag forge-ai-thinking-indicator
 *
 * @summary A thinking indicator component that displays three animated dots to show that the system is processing or awaiting a response.
 *
 * @description
 * The AI Thinking Indicator component provides a visual cue that the system is working on a response.
 * It displays three dots that animate in sequence from left to right, then bounce in a wave pattern,
 * creating an engaging loading animation perfect for chat interfaces. Displays cycling status text.
 */
@customElement(AiThinkingIndicatorComponentTagName)
export class AiThinkingIndicatorComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  @property({ type: Boolean, attribute: 'show-text' })
  public showText = false;

  @property({ type: Number, attribute: 'initial-delay' })
  public initialDelay = 0;

  @property({ type: Number, attribute: 'cycle-interval' })
  public cycleInterval = 5000;

  #currentMessage = '';
  #lastMessageIndex = -1;
  #cycleInterval?: number;
  #initialDelayTimeout?: number;

  readonly #dotsTemplate = html`
    <div class="dot dot-1"></div>
    <div class="dot dot-2"></div>
    <div class="dot dot-3"></div>
  `;

  public override connectedCallback(): void {
    super.connectedCallback();
    this.#startCycling();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#stopCycling();
  }

  #startCycling(): void {
    this.#initialDelayTimeout = window.setTimeout(() => {
      if (this.showText) {
        this.#getNextMessage();
        this.#cycleInterval = window.setInterval(() => {
          this.#getNextMessage();
        }, this.cycleInterval);
      }
    }, this.initialDelay);
  }

  #stopCycling(): void {
    if (this.#initialDelayTimeout) {
      clearTimeout(this.#initialDelayTimeout);
      this.#initialDelayTimeout = undefined;
    }
    if (this.#cycleInterval) {
      clearInterval(this.#cycleInterval);
      this.#cycleInterval = undefined;
    }
    this.#currentMessage = '';
    this.#lastMessageIndex = -1;
  }

  #getNextMessage(): void {
    let nextIndex: number;
    do {
      nextIndex = Math.floor(Math.random() * STATUS_MESSAGES.length);
    } while (nextIndex === this.#lastMessageIndex && STATUS_MESSAGES.length > 1);

    this.#lastMessageIndex = nextIndex;
    this.#currentMessage = STATUS_MESSAGES[nextIndex];
    this.requestUpdate();
  }

  get #statusText(): TemplateResult | typeof nothing {
    if (!this.showText || !this.#currentMessage) {
      return nothing;
    }

    return html`<div class="status-text" aria-live="polite">${this.#currentMessage}</div>`;
  }

  public override render(): TemplateResult {
    return html`
      <div class="thinking-indicator">
        <div class="dots-container">${this.#dotsTemplate}</div>
        ${this.#statusText}
      </div>
    `;
  }
}
