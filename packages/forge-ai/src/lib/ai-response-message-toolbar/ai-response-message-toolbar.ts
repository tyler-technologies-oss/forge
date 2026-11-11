import { LitElement, TemplateResult, html, unsafeCSS, type PropertyValues } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import type { ForgeAiPopoverComponent } from '../core/popover/popover.js';
import type { FeedbackType } from '../types/index.js';

import '../core/tooltip/tooltip.js';
import '../core/popover/popover.js';

import styles from './ai-response-message-toolbar.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-response-message-toolbar': AiResponseMessageToolbarComponent;
  }

  interface HTMLElementEventMap {
    'forge-ai-response-message-toolbar-action': CustomEvent<ForgeAiResponseMessageToolbarActionEventData>;
    'forge-ai-response-message-toolbar-feedback': CustomEvent<ForgeAiResponseMessageToolbarFeedbackEventData>;
  }
}

export interface ForgeAiResponseMessageToolbarActionEventData {
  action: AiResponseMessageToolbarAction;
}

export interface ForgeAiResponseMessageToolbarFeedbackEventData {
  action: 'positive' | 'negative';
  feedback?: string;
}

export type AiResponseMessageToolbarAction = 'resend' | 'copy' | 'thumbs-up' | 'thumbs-down';

export const AiResponseMessageToolbarComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-response-message-toolbar';

/**
 * @tag forge-ai-response-message-toolbar
 *
 * @event {CustomEvent<ForgeAiResponseMessageToolbarActionEventData>} forge-ai-response-message-toolbar-action - Fired when an action button is clicked. The detail contains the action type.
 * @event {CustomEvent<ForgeAiResponseMessageToolbarFeedbackEventData>} forge-ai-response-message-toolbar-feedback - Fired when feedback is submitted. The detail contains the action and optional feedback text.
 */
@customElement(AiResponseMessageToolbarComponentTagName)
export class AiResponseMessageToolbarComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  @property({ type: Boolean, attribute: 'enable-reactions' })
  public enableReactions = false;

  @property({ attribute: 'feedback-type' })
  public feedbackType?: FeedbackType;

  @property({ attribute: 'feedback-reason' })
  public feedbackReason?: string;

  @state()
  private _thumbsUpActive = false;

  @state()
  private _thumbsDownActive = false;

  @state()
  private _popoverOpen = false;

  @query('#thumbs-down-btn')
  private _thumbsDownButton!: HTMLButtonElement;

  @query('forge-ai-popover')
  private _thumbsDownPopover!: ForgeAiPopoverComponent;

  @query('textarea')
  private _thumbsDownFeedbackTextarea?: HTMLTextAreaElement;

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('feedbackType') && this.feedbackType) {
      this._thumbsUpActive = this.feedbackType === 'positive';
      this._thumbsDownActive = this.feedbackType === 'negative';
    }
  }

  #emitActionEvent(action: AiResponseMessageToolbarAction): void {
    const event = new CustomEvent<ForgeAiResponseMessageToolbarActionEventData>('forge-ai-response-message-toolbar-action', {
      detail: { action }
    });
    this.dispatchEvent(event);
  }

  #emitFeedbackEvent(action: 'positive' | 'negative', feedback?: string): void {
    const event = new CustomEvent<ForgeAiResponseMessageToolbarFeedbackEventData>('forge-ai-response-message-toolbar-feedback', {
      detail: { action, feedback }
    });
    this.dispatchEvent(event);
  }

  #handleThumbsUp(): void {
    this._thumbsUpActive = true;
    this._thumbsDownActive = false;
    if (this._thumbsDownPopover) {
      this._thumbsDownPopover.open = false;
    }
    this.#emitFeedbackEvent('positive');
  }

  async #handleThumbsDown(): Promise<void> {
    if (this._thumbsDownPopover) {
      const willOpen = !this._thumbsDownPopover.open;
      if (willOpen) {
        await this.updateComplete;
        this._thumbsDownPopover.anchor = this._thumbsDownButton;
      }
      this._thumbsDownPopover.open = willOpen;

      if (this._thumbsDownFeedbackTextarea && !willOpen) {
        this._thumbsDownFeedbackTextarea.value = '';
      }
    }
    this._thumbsUpActive = false;
  }

  #handleFeedbackSubmit(): void {
    const feedbackText = this._thumbsDownFeedbackTextarea?.value || '';
    this.#emitFeedbackEvent('negative', feedbackText);
    this._thumbsDownActive = true;
    if (this._thumbsDownPopover) {
      this._thumbsDownPopover.open = false;
    }
  }

  #handleFeedbackCancel(): void {
    if (this._thumbsDownPopover) {
      this._thumbsDownPopover.open = false;
    }
  }

  #handlePopoverToggle(evt: CustomEvent): void {
    this._popoverOpen = evt.detail.open;
  }

  get #resendButtonTemplate(): TemplateResult {
    return html`
      <button id="resend-btn" aria-label="Resend" class="forge-icon-button forge-icon-button--small" @click=${() => this.#emitActionEvent('resend')}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M17.65 6.35A7.96 7.96 0 0 0 12 4a8 8 0 0 0-8 8 8 8 0 0 0 8 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18a6 6 0 0 1-6-6 6 6 0 0 1 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4z" />
        </svg>
      </button>
      <forge-ai-tooltip for="resend-btn" placement="bottom">Resend</forge-ai-tooltip>
    `;
  }

  get #copyButtonTemplate(): TemplateResult {
    return html`
      <button id="copy-btn" aria-label="Copy content" class="forge-icon-button forge-icon-button--small" @click=${() => this.#emitActionEvent('copy')}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 21H8V7h11m0-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2m-3-4H4a2 2 0 0 0-2 2v14h2V3h12z" />
        </svg>
      </button>
      <forge-ai-tooltip for="copy-btn" placement="bottom">Copy</forge-ai-tooltip>
    `;
  }

  get #thumbsUpButtonTemplate(): TemplateResult {
    return html`
      <button
        id="thumbs-up-btn"
        aria-label="Good response"
        class="forge-icon-button forge-icon-button--small ${this._thumbsUpActive ? 'is-active-positive' : ''}"
        @click=${this.#handleThumbsUp}>
        ${this._thumbsUpActive
          ? html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M23 10a2 2 0 0 0-2-2h-6.32l.96-4.57c.02-.1.03-.21.03-.32 0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.58C7.22 7.95 7 8.45 7 9v10a2 2 0 0 0 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73zM1 21h4V9H1z" />
            </svg>`
          : html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M5 9v12H1V9zm4 12a2 2 0 0 1-2-2V9c0-.55.22-1.05.59-1.41L14.17 1l1.06 1.06c.27.27.44.64.44 1.05l-.03.32L14.69 8H21a2 2 0 0 1 2 2v2c0 .26-.05.5-.14.73l-3.02 7.05C19.54 20.5 18.83 21 18 21zm0-2h9.03L21 12v-2h-8.79l1.13-5.32L9 9.03z" />
            </svg>`}
      </button>
      <forge-ai-tooltip for="thumbs-up-btn" placement="bottom">Good response</forge-ai-tooltip>
    `;
  }

  get #thumbsDownButtonTemplate(): TemplateResult {
    return html`
      <button
        id="thumbs-down-btn"
        aria-label="Bad response"
        class="forge-icon-button forge-icon-button--small ${this._thumbsDownActive || this._popoverOpen ? 'is-active-negative' : ''}"
        @click=${this.#handleThumbsDown}>
        ${this._thumbsDownActive || this._popoverOpen
          ? html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M19 15h4V3h-4m-4 0H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2a2 2 0 0 0 2 2h6.31l-.95 4.57c-.02.1-.03.2-.03.31 0 .42.17.79.44 1.06L9.83 23l6.58-6.59c.37-.36.59-.86.59-1.41V5a2 2 0 0 0-2-2" />
            </svg>`
          : html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M19 15V3h4v12zM15 3a2 2 0 0 1 2 2v10c0 .55-.22 1.05-.59 1.41L9.83 23l-1.06-1.06c-.27-.27-.44-.64-.44-1.06l.03-.31.95-4.57H3a2 2 0 0 1-2-2v-2c0-.26.05-.5.14-.73l3.02-7.05C4.46 3.5 5.17 3 6 3zm0 2H5.97L3 12v2h8.78l-1.13 5.32L15 14.97z" />
            </svg>`}
      </button>
      <forge-ai-tooltip for="thumbs-down-btn" placement="bottom">Bad response</forge-ai-tooltip>
      <forge-ai-popover
        .anchor=${this._thumbsDownButton ?? null}
        placement="bottom"
        .shift=${true}
        flip
        arrow
        @forge-ai-popover-toggle=${this.#handlePopoverToggle}>
        ${this.#feedbackFormTemplate}
      </forge-ai-popover>
    `;
  }

  get #feedbackFormTemplate(): TemplateResult {
    return html`
      <div class="popover-content">
        <div class="popover-header">Leave feedback for this response</div>
        <div class="forge-field">
          <textarea placeholder="Enter your feedback..." .value=${this.feedbackReason ?? ''}></textarea>
        </div>
        <div class="popover-actions">
          <button class="forge-button forge-button--outlined" @click=${this.#handleFeedbackCancel}>Cancel</button>
          <button class="forge-button forge-button--filled" @click=${this.#handleFeedbackSubmit}>Submit</button>
        </div>
      </div>
    `;
  }

  public override render(): TemplateResult {
    return html`
      <div class="response-message-toolbar">
        ${this.#resendButtonTemplate} ${this.#copyButtonTemplate}
        ${when(this.enableReactions, () => html`${this.#thumbsUpButtonTemplate} ${this.#thumbsDownButtonTemplate}`)}
      </div>
    `;
  }
}
