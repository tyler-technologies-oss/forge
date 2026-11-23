import { LitElement, PropertyValues, TemplateResult, html, nothing, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { IToolRenderer, ToolCall } from '../../types/index.js';
import type {
  AiClarificationAnswer,
  AiClarificationQuestion,
  AiClarificationStatus,
  AiClarificationStepperSubmitEventData
} from '../../ai-clarification-stepper/index.js';
import { type ClarificationResult, resolveClarification, watchClarification } from './pending-clarifications.js';
import { type ClarificationStepperData, sanitizeQuestions } from './questions.js';

import '../../ai-clarification-stepper/ai-clarification-stepper.js';

import styles from './ai-clarification-stepper.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-tool-clarification-stepper': ClarificationStepperToolElement;
  }
}

/**
 * Clarification stepper tool renderer. Maps an `askClarification` tool call onto the presentational
 * `forge-ai-clarification-stepper` primitive, so the primitive stays unaware of tool calls.
 *
 * The tool's handler is waiting for the person, so submitting the stepper settles it, which releases the agent's
 * turn. Once the call completes, the stepper becomes a read-only record of the answers that were delivered.
 *
 * @tag forge-ai-tool-clarification-stepper
 */
@customElement('forge-ai-tool-clarification-stepper')
export class ClarificationStepperToolElement extends LitElement implements IToolRenderer<ClarificationStepperData, ClarificationResult> {
  public static styles = unsafeCSS(styles);

  /**
   * Tool call data containing the agent-provided questions and, once it completes, the delivered answers.
   */
  @property({ attribute: false })
  public toolCall!: ToolCall<ClarificationStepperData, ClarificationResult>;

  /** Whether the person has submitted from this element, which is the time between submitting and the call completing. */
  @state()
  private _submitted = false;

  #questions: AiClarificationQuestion[] = [];
  #questionsKey = '';
  #release?: () => void;

  public override connectedCallback(): void {
    super.connectedCallback();
    this.#watch();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#release?.();
    this.#release = undefined;
  }

  /**
   * The host assigns `toolCall` again on every update, and the stepper resets whenever it receives a new `questions`
   * array. The sanitized questions are therefore rebuilt only when the agent's arguments actually differ, so a
   * person's selections survive unrelated updates to the tool call.
   */
  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (!changedProperties.has('toolCall')) {
      return;
    }

    const raw = this.toolCall?.args?.questions;
    const key = JSON.stringify(raw ?? null);
    if (key !== this.#questionsKey) {
      this.#questionsKey = key;
      this.#questions = sanitizeQuestions(raw);
    }

    this.#watch();
  }

  /**
   * Tells the pending request that something is showing it. The call's id can arrive after the element connects, so
   * this runs on connect and again whenever the tool call is assigned.
   */
  #watch(): void {
    if (this.#release || !this.isConnected || !this.toolCall?.id) {
      return;
    }

    this.#release = watchClarification(this.toolCall.id);
  }

  #handleSubmit(evt: CustomEvent<AiClarificationStepperSubmitEventData>): void {
    if (this._submitted || this.toolCall.status === 'complete') {
      return;
    }

    this._submitted = true;
    resolveClarification({ toolCallId: this.toolCall.id, answers: evt.detail.answers });
  }

  /** The answers the agent received, which are what the finished stepper records. */
  get #deliveredAnswers(): AiClarificationAnswer[] {
    const answers = this.toolCall.result?.answers;
    return Array.isArray(answers) ? answers : [];
  }

  get #status(): AiClarificationStatus {
    if (this.toolCall.status === 'complete') {
      return 'sent';
    }

    return this._submitted ? 'sending' : 'editing';
  }

  public override render(): TemplateResult | typeof nothing {
    // The tool shows its renderer from the start, since the call stays `executing` for as long as it waits for the
    // person. Until the arguments are complete there are no final questions to show, and one that failed has nothing
    // to answer.
    const status = this.toolCall?.status;
    if (!this.toolCall || status === 'pending' || status === 'parsing' || status === 'error') {
      return nothing;
    }

    return html`
      <forge-ai-clarification-stepper
        .questions=${this.#questions}
        .answers=${this.#deliveredAnswers}
        .status=${this.#status}
        @forge-ai-clarification-stepper-submit=${this.#handleSubmit}></forge-ai-clarification-stepper>
    `;
  }
}
