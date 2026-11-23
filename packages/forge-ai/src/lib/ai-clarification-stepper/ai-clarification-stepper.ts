import { LitElement, PropertyValues, TemplateResult, html, nothing, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';

import { generateUniqueId } from '../utils/dom.js';
import styles from './ai-clarification-stepper.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-clarification-stepper': AiClarificationStepperComponent;
  }

  interface HTMLElementEventMap {
    'forge-ai-clarification-stepper-submit': CustomEvent<AiClarificationStepperSubmitEventData>;
  }
}

export const AiClarificationStepperComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-clarification-stepper';

/** Selection index that represents the free-text "Something else" option. */
const CUSTOM_INDEX = -1;

export interface AiClarificationOption {
  /** Text shown for the option. */
  label: string;
  /** Value reported in the submit event when this option is chosen. */
  value: string;
  /** Marks the option as the agent's recommended answer. It is preselected and labeled. */
  recommended?: boolean;
}

export interface AiClarificationQuestion {
  /** Unique identifier for the question, reported back with its answer. */
  id: string;
  /** The question the agent needs settled. */
  question: string;
  /** The answers to choose from. Expected to be 2-4 options with exactly one recommended. */
  options: AiClarificationOption[];
  /** Whether to offer a "Something else" option, an editable text field for a typed answer. Defaults to `true`. */
  allowCustom?: boolean;
}

export interface AiClarificationAnswer {
  questionId: string;
  /** The chosen option's `value`, or the typed text when `custom` is `true`. */
  value: string;
  /** The chosen option's `label`, or the typed text when `custom` is `true`. */
  label: string;
  /** Whether the person typed their own answer instead of picking an option. */
  custom: boolean;
}

export interface AiClarificationStepperSubmitEventData {
  answers: AiClarificationAnswer[];
}

/**
 * Where the stepper is in its life. It is `editing` until the answers are submitted, `sending` while the host
 * delivers them, and `sent` once they are delivered, when it becomes a read-only record of the turn.
 */
export type AiClarificationStatus = 'editing' | 'sending' | 'sent';

/**
 * The recommended answer to each question, or its first option where none is marked. This is what "Choose
 * recommended for all" submits, and what a host can fall back on when a question goes unanswered.
 */
export function recommendedAnswers(questions: AiClarificationQuestion[]): AiClarificationAnswer[] {
  return questions.map(question => {
    const option = question.options.find(candidate => candidate.recommended) ?? question.options[0];
    return { questionId: question.id, value: option.value, label: option.label, custom: false };
  });
}

/**
 * @tag forge-ai-clarification-stepper
 *
 * @summary Inline stepper an agent uses to have a person settle a few interpretive choices before it continues.
 *
 * @description
 * Walks one question per step, with a "Step N of M" counter beside the question. Every question has a recommended
 * option that is shown first and preselected, and unless a question opts out, a "Something else" option that is
 * itself an editable text field for a typed answer. "Choose recommended for all" accepts every recommended answer
 * at once. The final step's forward action submits the full set of answers.
 *
 * This is content in the conversation rather than an overlay: it does not trap focus and does not respond
 * to Escape.
 *
 * @property {AiClarificationQuestion[]} questions - The questions to step through
 * @property {AiClarificationAnswer[]} answers - The submitted answers, shown against their questions once `status` is `sent`
 * @property {AiClarificationStatus} status - `editing` until submitted, `sending` while the answers are delivered, then `sent`
 *
 * @cssproperty --forge-ai-clarification-stepper-marker-background - The resting background of each number square.
 *
 * @event {CustomEvent<AiClarificationStepperSubmitEventData>} forge-ai-clarification-stepper-submit - Fired
 * with every answer when the person finishes the last step or runs with "Choose recommended for all".
 */
@customElement(AiClarificationStepperComponentTagName)
export class AiClarificationStepperComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  /** The questions to step through, one per step. */
  @property({ attribute: false })
  public questions: AiClarificationQuestion[] = [];

  /**
   * The answers that were submitted, shown against their questions once `status` is `sent`. The host sets this
   * from the delivered result, so a finished stepper can be shown again from history.
   */
  @property({ attribute: false })
  public answers: AiClarificationAnswer[] = [];

  /**
   * Where the stepper is in its life. While `sending` every control is disabled; once `sent` the stepper is
   * terminal and shows only the submitted `answers`. It is a record of a turn in the conversation, not a form to
   * revisit.
   */
  @property({ reflect: true })
  public status: AiClarificationStatus = 'editing';

  @state()
  private _stepIndex = 0;

  @state()
  private _selections: Record<string, number> = {};

  @state()
  private _customText: Record<string, string> = {};

  /** Whether "Choose recommended for all" is selected, which makes the forward action submit every recommended answer. */
  @state()
  private _autoAll = false;

  readonly #uid = generateUniqueId('clarification');
  #pendingFocus: 'question' | 'custom' | null = null;

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('questions')) {
      this.#reset();
    }
  }

  public override updated(): void {
    if (!this.#pendingFocus) {
      return;
    }

    const selector = this.#pendingFocus === 'custom' ? '.custom-input' : '.question';
    this.#pendingFocus = null;
    this.shadowRoot?.querySelector<HTMLElement>(selector)?.focus();
  }

  #reset(): void {
    this._stepIndex = 0;
    this._autoAll = false;
    this._customText = {};
    this._selections = Object.fromEntries(
      this.questions.map(question => [
        question.id,
        Math.max(
          0,
          question.options.findIndex(option => option.recommended)
        )
      ])
    );
  }

  /** Everything is disabled once the answers have been submitted, whether they are still being delivered or not. */
  get #isLocked(): boolean {
    return this.status !== 'editing';
  }

  get #currentQuestion(): AiClarificationQuestion | undefined {
    return this.questions[this._stepIndex];
  }

  get #isFirstStep(): boolean {
    return this._stepIndex === 0;
  }

  get #isLastStep(): boolean {
    return this._stepIndex === this.questions.length - 1;
  }

  /** Whether any question has a recommended option, which is what makes "Choose recommended for all" meaningful. */
  get #hasRecommended(): boolean {
    return this.questions.some(question => question.options.some(option => option.recommended));
  }

  /**
   * Options paired with their original index, recommended first. Selections are keyed by the original
   * index so reordering for display never changes which option an answer refers to.
   */
  #orderedOptions(question: AiClarificationQuestion): { option: AiClarificationOption; index: number }[] {
    const entries = question.options.map((option, index) => ({ option, index }));
    return [...entries.filter(entry => entry.option.recommended), ...entries.filter(entry => !entry.option.recommended)];
  }

  #isCustom(question: AiClarificationQuestion): boolean {
    return this._selections[question.id] === CUSTOM_INDEX;
  }

  #customValue(question: AiClarificationQuestion): string {
    return (this._customText[question.id] ?? '').trim();
  }

  /** A blank typed answer is never valid, so the forward action stays disabled until text is entered. */
  #isAnswered(question: AiClarificationQuestion): boolean {
    return this._autoAll || !this.#isCustom(question) || this.#customValue(question).length > 0;
  }

  /** The answer that is submitted for a question: the recommended one for every question while "Choose recommended for all" is on. */
  #answerFor(question: AiClarificationQuestion): AiClarificationAnswer {
    return this._autoAll ? this.#recommendedAnswerFor(question) : this.#pickedAnswerFor(question);
  }

  /** The person's own pick for a question, ignoring "Choose recommended for all". */
  #pickedAnswerFor(question: AiClarificationQuestion): AiClarificationAnswer {
    if (this.#isCustom(question)) {
      const text = this.#customValue(question);
      return { questionId: question.id, value: text, label: text, custom: true };
    }

    const option = question.options[this._selections[question.id]];
    return { questionId: question.id, value: option.value, label: option.label, custom: false };
  }

  #recommendedAnswerFor(question: AiClarificationQuestion): AiClarificationAnswer {
    return recommendedAnswers([question])[0];
  }

  #submit(answers: AiClarificationAnswer[]): void {
    this.dispatchEvent(
      new CustomEvent<AiClarificationStepperSubmitEventData>('forge-ai-clarification-stepper-submit', {
        detail: { answers },
        bubbles: true,
        composed: true
      })
    );
  }

  #goTo(index: number): void {
    this.#pendingFocus = 'question';
    this._stepIndex = index;
  }

  #handleNext(): void {
    if (this.#isLocked) {
      return;
    }

    if (this.#isLastStep || this._autoAll) {
      this.#submit(this.questions.map(question => this.#answerFor(question)));
      return;
    }

    this.#goTo(this._stepIndex + 1);
  }

  #handleBack(): void {
    this.#goTo(this._stepIndex - 1);
  }

  #handleOptionChange(question: AiClarificationQuestion, index: number): void {
    this._autoAll = false;
    this._selections = { ...this._selections, [question.id]: index };
  }

  #handleAutoChange(): void {
    this._autoAll = true;
  }

  /**
   * A pointer click on the "Something else" radio moves focus into its text field. Keyboard selection
   * (arrow keys, Space) reports a click with no detail and is left alone so arrow navigation keeps working.
   */
  #handleCustomRadioClick(evt: MouseEvent): void {
    if (evt.detail > 0) {
      this.#pendingFocus = 'custom';
    }
  }

  /** Focusing the text field is an intent to type a custom answer, so it selects "Something else". */
  #handleCustomFocus(question: AiClarificationQuestion): void {
    if (!this._autoAll && this.#isCustom(question)) {
      return;
    }

    this.#handleOptionChange(question, CUSTOM_INDEX);
  }

  #handleCustomInput(question: AiClarificationQuestion, evt: Event): void {
    this._customText = { ...this._customText, [question.id]: (evt.target as HTMLInputElement).value };
  }

  /** Enter advances to the next step but never submits, so a fast typist cannot skip the remaining questions. */
  #handleCustomKeydown(question: AiClarificationQuestion, evt: KeyboardEvent): void {
    if (evt.key !== 'Enter' || evt.isComposing) {
      return;
    }

    evt.preventDefault();
    if (!this.#isLastStep && this.#isAnswered(question)) {
      this.#handleNext();
    }
  }

  /** Forge's separator line, set above and below "Choose recommended for all". Decorative, so hidden from assistive technology. */
  readonly #divider = html`<hr class="forge-divider" aria-hidden="true" />`;

  /**
   * The numbered marker every option leads with, in the style of a `forge-stepper` step. The native radio is
   * kept, invisibly, on top of the number so selection, arrow keys and screen readers behave as a radio group
   * while the number is what the person sees. The number is decorative: the radio carries the semantics.
   *
   * A chosen "Something else" option shows a pencil in place of its number, since its row is where the
   * person types.
   */
  #renderMarker(config: { radio: TemplateResult; position: number; showEditIcon?: boolean }): TemplateResult {
    const { radio, position, showEditIcon = false } = config;
    return html`
      <span class="option-marker">
        ${radio}
        <span class="option-index" aria-hidden="true">${showEditIcon ? this.#editIcon : position}</span>
      </span>
    `;
  }

  /** The pencil used for rename in `forge-ai-thread-actions-menu`. */
  readonly #editIcon = html`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="forge-icon" aria-hidden="true">
      <path
        d="m14.06 9 .94.94L5.92 19H5v-.92zm3.6-6c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94z" />
    </svg>
  `;

  #renderOption(config: { question: AiClarificationQuestion; option: AiClarificationOption; index: number; position: number }): TemplateResult {
    const { question, option, index, position } = config;
    const radio = html`
      <input
        type="radio"
        name="${this.#uid}-${question.id}"
        ?disabled=${this.#isLocked}
        .checked=${!this._autoAll && this._selections[question.id] === index}
        @change=${() => this.#handleOptionChange(question, index)} />
    `;

    return html`
      <label class="option">
        ${this.#renderMarker({ radio, position })}
        <span class="option-label">${option.label}</span>
        ${when(option.recommended, () => html`<span class="option-recommended">· Recommended</span>`)}
      </label>
    `;
  }

  /**
   * The "Something else" row is an editable text field rather than a label. Typing in it, or focusing it,
   * selects the option, so there is no separate field to reveal.
   */
  #renderCustomOption(config: { question: AiClarificationQuestion; position: number }): TemplateResult {
    const { question, position } = config;
    const selected = !this._autoAll && this.#isCustom(question);
    const radio = html`
      <input
        type="radio"
        name="${this.#uid}-${question.id}"
        aria-label="Something else"
        ?disabled=${this.#isLocked}
        .checked=${selected}
        @click=${this.#handleCustomRadioClick}
        @change=${() => this.#handleOptionChange(question, CUSTOM_INDEX)} />
    `;

    return html`
      <div class="option option--custom">
        ${this.#renderMarker({ radio, position, showEditIcon: selected })}
        <div class="forge-field forge-field--plain custom-field">
          <input
            class="custom-input"
            type="text"
            placeholder="Something else"
            aria-label="Something else: ${question.question}"
            ?disabled=${this.#isLocked}
            .value=${this._customText[question.id] ?? ''}
            @focus=${() => this.#handleCustomFocus(question)}
            @input=${(evt: Event) => this.#handleCustomInput(question, evt)}
            @keydown=${(evt: KeyboardEvent) => this.#handleCustomKeydown(question, evt)} />
        </div>
      </div>
    `;
  }

  /** Sits at the very bottom of the options and answers every remaining question with its recommended option. */
  #renderAutoOption(config: { question: AiClarificationQuestion; position: number }): TemplateResult {
    const { question, position } = config;
    const radio = html`
      <input type="radio" name="${this.#uid}-${question.id}" ?disabled=${this.#isLocked} .checked=${this._autoAll} @change=${this.#handleAutoChange} />
    `;

    return html`
      ${this.#divider}
      <label class="option option--auto">
        ${this.#renderMarker({ radio, position })}
        <span class="option-label">Choose recommended for all</span>
        <span class="auto-badge forge-badge">Auto</span>
      </label>
      ${this.#divider}
    `;
  }

  /**
   * The answers chosen in the previous steps, in step order, shown above the buttons. The current step's own
   * selection is left out, and so is "Choose recommended for all", which is not an answer to an earlier step.
   * There is nothing to show on the first step.
   */
  get #summary(): TemplateResult | typeof nothing {
    // A previous step always has an answer: "Next" is disabled while a typed answer is empty.
    const labels = this.questions.slice(0, this._stepIndex).map(question => this.#pickedAnswerFor(question).label);

    return labels.length > 0 ? html`<p class="summary">${labels.join(' • ')}</p>` : nothing;
  }

  #renderActions(question: AiClarificationQuestion): TemplateResult {
    return html`
      <div class="actions">
        ${when(
          !this.#isFirstStep,
          () => html` <button type="button" class="back-button forge-button" ?disabled=${this.#isLocked} @click=${this.#handleBack}>Back</button> `
        )}
        <button
          type="button"
          class="next-button forge-button forge-button--tonal"
          ?disabled=${this.#isLocked || !this.#isAnswered(question)}
          @click=${this.#handleNext}>
          ${this.#isLastStep || this._autoAll ? 'Run' : 'Next'}
        </button>
      </div>
    `;
  }

  /**
   * The terminal state: each submitted answer set against its question, with nothing to operate. A set of answers
   * with no matching question still shows its answer, so a record is never silently shorter than what was sent.
   */
  get #record(): TemplateResult | typeof nothing {
    if (this.answers.length === 0) {
      return nothing;
    }

    return html`
      <div class="stepper stepper--sent">
        <dl class="record">
          ${this.answers.map(answer => {
            const question = this.questions.find(candidate => candidate.id === answer.questionId)?.question;
            return html`
              <div class="record-item">
                ${when(question, () => html`<dt class="record-question">${question}</dt>`)}
                <dd class="record-answer">${answer.label}</dd>
              </div>
            `;
          })}
        </dl>
      </div>
    `;
  }

  public override render(): TemplateResult | typeof nothing {
    if (this.status === 'sent') {
      return this.#record;
    }

    const question = this.#currentQuestion;
    if (!question) {
      return nothing;
    }

    const counterId = `${this.#uid}-counter`;
    const questionId = `${this.#uid}-question`;
    const hasCustom = question.allowCustom ?? true;
    const customPosition = question.options.length + 1;
    const autoPosition = customPosition + (hasCustom ? 1 : 0);

    return html`
      <div class="stepper">
        <div class="header">
          <h3 id=${questionId} class="question" tabindex="-1" aria-describedby=${counterId}>${question.question}</h3>
          <p id=${counterId} class="counter">Step ${this._stepIndex + 1} of ${this.questions.length}</p>
        </div>
        <div class="options" role="radiogroup" aria-labelledby=${questionId}>
          ${this.#orderedOptions(question).map(({ option, index }, order) => this.#renderOption({ question, option, index, position: order + 1 }))}
          ${when(hasCustom, () => this.#renderCustomOption({ question, position: customPosition }))}
          ${when(this.#hasRecommended, () => this.#renderAutoOption({ question, position: autoPosition }))}
        </div>
        ${this.#summary} ${this.#renderActions(question)}
      </div>
    `;
  }
}
