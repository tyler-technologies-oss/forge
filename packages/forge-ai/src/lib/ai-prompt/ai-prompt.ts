import { LitElement, PropertyValues, TemplateResult, html, unsafeCSS, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { toggleState } from '../utils/dom.js';
import type { SlashCommand, ForgeAiSlashCommandMenuSelectEventData, ContextItem } from '../types/index.js';

import styles from './ai-prompt.scss?inline';

import '../ai-slash-command-menu/ai-slash-command-menu.js';
import '../core/tooltip/tooltip.js';
import '../ai-context-items/index.js';

const MAX_HISTORY_SIZE = 50;

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-prompt': AiPromptComponent;
  }

  interface HTMLElementEventMap {
    'forge-ai-prompt-send': CustomEvent<ForgeAiPromptSendEventData>;
    'forge-ai-prompt-cancel': CustomEvent<void>;
    'forge-ai-prompt-attachment': CustomEvent<ForgeAiPromptAttachmentEventData>;
    'forge-ai-prompt-stop': CustomEvent<void>;
    'forge-ai-prompt-debug-toggle': CustomEvent<void>;
    'forge-ai-prompt-command': CustomEvent<ForgeAiPromptCommandEventData>;
    'forge-ai-prompt-context-remove': CustomEvent<ForgeAiPromptContextRemoveEventData>;
  }
}

export interface ForgeAiPromptSendEventData {
  value: string;
  time: string;
  date: Date;
}

export interface ForgeAiPromptAttachmentEventData {
  files: File[];
}

export interface ForgeAiPromptCommandEventData {
  commandId: string;
  group: string;
  timestamp: Date;
}

export interface ForgeAiPromptContextRemoveEventData {
  id: string;
  item: ContextItem;
}

export type AiPromptVariant = 'stacked' | 'inline';

export const AiPromptComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-prompt';

/**
 * @tag forge-ai-prompt
 *
 * @slot actions - Slot for action components that are hidden in inline mode (voice input, file picker, model selectors, web search, etc.)
 *
 * @state inline - The prompt is in inline layout mode with actions hidden.
 * @state stacked - The prompt is in stacked layout mode with actions displayed below the input.
 *
 * @event {CustomEvent<ForgeAiPromptSendEventData>} forge-ai-prompt-send - Fired when the send button is clicked or Enter is pressed (without Shift). Cancelable - if cancelled, running state is not set and input is not cleared.
 * @event {CustomEvent<void>} forge-ai-prompt-cancel - Fired when the Escape key is pressed (if cancelOnEscape is true).
 * @event {CustomEvent<ForgeAiPromptAttachmentEventData>} forge-ai-prompt-attachment - Fired when files are pasted into the textarea.
 * @event {CustomEvent<void>} forge-ai-prompt-stop - Fired when the stop button is clicked. Cancelable - if cancelled, running state remains true.
 * @event {CustomEvent<void>} forge-ai-prompt-debug-toggle - Fired when the debug icon button is clicked.
 * @event {CustomEvent<ForgeAiPromptCommandEventData>} forge-ai-prompt-command - Fired when a slash command is selected.
 * @event {CustomEvent<ForgeAiPromptContextRemoveEventData>} forge-ai-prompt-context-remove - Fired when a context item is removed.
 */
@customElement(AiPromptComponentTagName)
export class AiPromptComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  /** Placeholder text for the textarea field */
  @property()
  public placeholder = 'Ask a question...';

  /** Current value of the textarea field */
  @property()
  public value = '';

  /** Layout variant for the prompt component */
  @property({ type: String, attribute: 'variant' })
  public variant: AiPromptVariant = 'stacked';

  /** Whether the send button is disabled */
  @property({ type: Boolean, attribute: 'send-disabled' })
  public sendDisabled = false;

  /** Whether to autofocus the textarea field when the component renders */
  @property({ type: Boolean })
  public autofocus = false;

  /** Whether the textarea field is disabled */
  @property({ type: Boolean, attribute: 'input-disabled' })
  public inputDisabled = false;

  /** Whether to dispatch escape events when Escape key is pressed */
  @property({ type: Boolean, attribute: 'cancel-on-escape' })
  public cancelOnEscape = true;

  /** Whether the component is in running state (shows stop button instead of send button) */
  @property({ type: Boolean })
  public running = false;

  /** Whether debug mode is active (shows debug icon button) */
  @property({ type: Boolean, attribute: 'debug-mode' })
  public debugMode = false;

  /** Available slash commands */
  @property({ type: Array, attribute: false })
  public slashCommands: SlashCommand[] = [];

  /** Context items to display above the input */
  @property({ attribute: false })
  public contextItems: ContextItem[] = [];

  @state()
  private _slashMenuOpen = false;

  @state()
  private _slashMenuQuery = '';

  @query('#chat-input')
  private _inputElement!: HTMLTextAreaElement;

  @query('forge-ai-slash-command-menu')
  private _slashMenuElement!: HTMLElement & { handleKeyDown(event: KeyboardEvent): boolean };

  readonly #internals: ElementInternals;
  #messageHistory: string[] = [];
  #historyIndex = -1;
  #draftMessage = '';

  constructor() {
    super();
    this.#internals = this.attachInternals();
    this.#setCssState();
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('variant')) {
      this.#setCssState();
    }
  }

  public override firstUpdated(): void {
    if (this.autofocus) {
      this.focus();
    }
  }

  #setCssState(): void {
    toggleState(this.#internals, 'inline', this.variant === 'inline');
    toggleState(this.#internals, 'stacked', this.variant === 'stacked');
  }

  /**
   * Adds a message to the input history for up/down arrow navigation.
   * Use this when sending messages externally (e.g., from suggestions).
   */
  public addToHistory(message: string): void {
    const trimmed = message?.trim();
    if (!trimmed) {
      return;
    }

    if (this.#messageHistory[this.#messageHistory.length - 1] === trimmed) {
      this.#resetHistoryNavigation();
      return;
    }

    this.#messageHistory.push(trimmed);
    if (this.#messageHistory.length > MAX_HISTORY_SIZE) {
      this.#messageHistory.shift();
    }
    this.#resetHistoryNavigation();
  }

  /**
   * Replaces the entire message history with the provided messages.
   * Use this when restoring thread state from persistence.
   */
  public setHistory(messages: string[]): void {
    this.#messageHistory = messages
      .map(msg => msg?.trim())
      .filter(msg => msg.length > 0)
      .slice(-MAX_HISTORY_SIZE);
    this.#resetHistoryNavigation();
  }

  /**
   * Returns a copy of the current message history.
   */
  public getHistory(): string[] {
    return [...this.#messageHistory];
  }

  #resetHistoryNavigation(): void {
    this.#historyIndex = -1;
    this.#draftMessage = '';
  }

  #isCursorOnFirstLine(): boolean {
    const cursorPos = this._inputElement?.selectionStart ?? 0;
    const textBeforeCursor = this.value.substring(0, cursorPos);
    return !textBeforeCursor.includes('\n');
  }

  #isCursorOnLastLine(): boolean {
    const cursorPos = this._inputElement?.selectionStart ?? 0;
    const textAfterCursor = this.value.substring(cursorPos);
    return !textAfterCursor.includes('\n');
  }

  #isCursorAtStart(): boolean {
    return (this._inputElement?.selectionStart ?? 0) === 0;
  }

  #isCursorAtEnd(): boolean {
    return (this._inputElement?.selectionStart ?? 0) === this.value.length;
  }

  #moveCursorToStart(): void {
    this._inputElement?.setSelectionRange(0, 0);
  }

  #moveCursorToEnd(): void {
    const len = this.value.length;
    this._inputElement?.setSelectionRange(len, len);
  }

  #navigateHistory(direction: number): boolean {
    if (this.#messageHistory.length === 0) {
      return false;
    }
    if (direction > 0 && this.#historyIndex === -1) {
      return false;
    }

    if (direction < 0) {
      if (this.#historyIndex === -1) {
        this.#draftMessage = this.value;
        this.#historyIndex = this.#messageHistory.length - 1;
      } else if (this.#historyIndex > 0) {
        this.#historyIndex--;
      } else {
        return false;
      }
    } else {
      const newIndex = this.#historyIndex + 1;
      if (newIndex >= this.#messageHistory.length) {
        this.#historyIndex = -1;
        this.value = this.#draftMessage;
        if (this._inputElement) {
          this._inputElement.value = this.#draftMessage;
        }
        return true;
      }
      this.#historyIndex = newIndex;
    }

    this.value = this.#messageHistory[this.#historyIndex];
    if (this._inputElement) {
      this._inputElement.value = this.#messageHistory[this.#historyIndex];
    }
    return true;
  }

  readonly #actionsStartSlot = html`<slot name="actions-start"></slot>`;
  readonly #actionsEndSlot = html`<slot name="actions-end"></slot>`;

  get #shouldShowStopButton(): boolean {
    return this.running && !this.value.trim();
  }

  get #actions(): TemplateResult {
    return html`
      <div class="actions">
        <div class="actions-start-container">${this.#actionsStartSlot}</div>
        <div class="actions-end-container">${this.#actionsEndSlot} ${this.#sendButton}</div>
      </div>
      ${when(this.slashCommands.length, () => html`<div class="vertical-divider"></div>`)}
    `;
  }

  private _handleSend(): void {
    if (this.sendDisabled || this.inputDisabled || !this.value.trim()) {
      return;
    }

    const messageValue = this.value;
    const now = new Date();
    const event = new CustomEvent<ForgeAiPromptSendEventData>('forge-ai-prompt-send', {
      detail: {
        value: messageValue,
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: now
      },
      bubbles: true,
      composed: true,
      cancelable: true
    });
    this.dispatchEvent(event);

    if (!event.defaultPrevented) {
      this.addToHistory(messageValue);
      this.value = '';
      this._slashMenuOpen = false;
      this._slashMenuQuery = '';
    }
  }

  private _handleInput(event: InputEvent): void {
    this.value = (event.target as HTMLTextAreaElement).value;

    if (this.#historyIndex !== -1) {
      this.#draftMessage = this.value;
      this.#historyIndex = -1;
    }

    if (this.slashCommands.length === 0) {
      return;
    }

    if (this.value === '/') {
      this._slashMenuQuery = '';
      this._slashMenuOpen = true;
    } else if (this.value.startsWith('/') && this._slashMenuOpen) {
      this._slashMenuQuery = this.value.slice(1);
    } else if (this._slashMenuOpen) {
      this._slashMenuOpen = false;
      this._slashMenuQuery = '';
    }
  }

  private _handleKeyDown(event: KeyboardEvent): void {
    if (this._slashMenuOpen && this._slashMenuElement) {
      const handled = this._slashMenuElement.handleKeyDown(event);
      if (handled) {
        return;
      }
    }

    const hasModifier = event.shiftKey || event.ctrlKey || event.metaKey;

    // Check for history navigation (two-step: move to boundary first, then navigate)
    if (!hasModifier) {
      if (event.key === 'ArrowUp' && this.#isCursorOnFirstLine()) {
        if (this.#isCursorAtStart()) {
          if (this.#navigateHistory(-1)) {
            this.#moveCursorToStart();
            event.preventDefault();
            return;
          }
        } else {
          this.#moveCursorToStart();
          event.preventDefault();
          return;
        }
      } else if (event.key === 'ArrowDown' && this.#isCursorOnLastLine()) {
        if (this.#isCursorAtEnd()) {
          if (this.#navigateHistory(1)) {
            event.preventDefault();
            return;
          }
        } else {
          this.#moveCursorToEnd();
          event.preventDefault();
          return;
        }
      }
    }

    if (event.key === 'Enter' && !event.shiftKey) {
      if (event.isComposing) {
        return;
      }

      event.preventDefault();

      if (this._slashMenuOpen) {
        this._slashMenuOpen = false;
        this._slashMenuQuery = '';
        this._handleSend();
        return;
      }

      if (!this._slashMenuOpen) {
        this._handleSend();
      }
    } else if (event.key === 'Escape') {
      if (this._slashMenuOpen) {
        event.preventDefault();
        this._slashMenuOpen = false;
        this._slashMenuQuery = '';
      } else if (this.cancelOnEscape) {
        event.preventDefault();
        this._handleEscape();
      }
    }
  }

  private _handleStop(): void {
    const event = new CustomEvent<void>('forge-ai-prompt-stop', {
      bubbles: true,
      composed: true,
      cancelable: true
    });
    this.dispatchEvent(event);
  }

  private _handleEscape(): void {
    const event = new CustomEvent<void>('forge-ai-prompt-cancel', {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  private _handleDebugToggle(): void {
    const event = new CustomEvent<void>('forge-ai-prompt-debug-toggle', {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  private _handlePaste(event: ClipboardEvent): void {
    const files = Array.from(event.clipboardData?.files || []);

    if (files.length > 0) {
      event.preventDefault();

      const attachmentEvent = new CustomEvent<ForgeAiPromptAttachmentEventData>('forge-ai-prompt-attachment', {
        detail: { files },
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(attachmentEvent);
    }
  }

  #handleSlashCommandSelect(event: CustomEvent<ForgeAiSlashCommandMenuSelectEventData>): void {
    const { command } = event.detail;

    this.dispatchEvent(
      new CustomEvent('forge-ai-prompt-command', {
        detail: {
          commandId: command.id,
          group: command.group,
          timestamp: new Date()
        },
        bubbles: true,
        composed: true
      })
    );

    this.value = '';
    if (this._inputElement) {
      this._inputElement.value = '';
    }
    this._slashMenuOpen = false;
    this._slashMenuQuery = '';
  }

  #handleSlashCommandClose(): void {
    this._slashMenuOpen = false;
    this._slashMenuQuery = '';
  }

  #handleContextItemRemove(evt: CustomEvent<ForgeAiPromptContextRemoveEventData>): void {
    this.dispatchEvent(
      new CustomEvent('forge-ai-prompt-context-remove', {
        detail: { id: evt.detail.id, item: evt.detail.item },
        bubbles: true,
        composed: true
      })
    );
  }

  get #contextItemsTemplate(): TemplateResult | typeof nothing {
    if (this.contextItems.length === 0) {
      return nothing;
    }

    return html`
      <forge-ai-context-items .items=${this.contextItems} @forge-ai-context-items-remove=${this.#handleContextItemRemove}> </forge-ai-context-items>
    `;
  }

  get #textArea(): TemplateResult {
    return html` <textarea
      id="chat-input"
      rows="1"
      .value=${this.value}
      placeholder=${this.placeholder}
      ?disabled=${this.inputDisabled}
      @input=${this._handleInput}
      @keydown=${this._handleKeyDown}
      @paste=${this._handlePaste}></textarea>`;
  }

  get #sendButton(): TemplateResult {
    return html`
      <button
        id="send-btn"
        aria-label=${this.#shouldShowStopButton ? 'Stop' : 'Send message'}
        class="forge-icon-button forge-icon-button--medium send-button"
        ?disabled=${this.sendDisabled || this.inputDisabled}
        @click=${this.#shouldShowStopButton ? this._handleStop : this._handleSend}>
        ${this.#shouldShowStopButton
          ? html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18 18H6V6h12z" />
            </svg>`
          : html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
              <path d="m2 21 21-9L2 3v7l15 2-15 2z" />
            </svg>`}
        <forge-ai-tooltip for="send-btn" placement="top">${this.#shouldShowStopButton ? 'Stop' : 'Send'}</forge-ai-tooltip>
      </button>
    `;
  }

  get #debugButton(): TemplateResult {
    return html`
      <button
        id="debug-btn"
        aria-label="Exit debug mode"
        class="forge-icon-button forge-icon-button--small forge-icon-button--tonal ai-icon-button debug-button"
        @click=${this._handleDebugToggle}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M20 8h-2.81a5.985 5.985 0 0 0-1.82-1.96L17 4.41 15.59 3l-2.17 2.17a6.002 6.002 0 0 0-2.83 0L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z" />
        </svg>
        <forge-ai-tooltip for="debug-btn" placement="top">Exit debug mode</forge-ai-tooltip>
      </button>
    `;
  }

  get #slashCommandMenu(): TemplateResult | typeof nothing {
    return when(
      this.slashCommands.length,
      () => html`
        <forge-ai-slash-command-menu
          .commands=${this.slashCommands}
          .filterQuery=${this._slashMenuQuery}
          .open=${this._slashMenuOpen}
          .anchor=${this._inputElement}
          .widthReference=${this as HTMLElement}
          @forge-ai-slash-command-menu-select=${this.#handleSlashCommandSelect}
          @forge-ai-slash-command-menu-close=${this.#handleSlashCommandClose}>
        </forge-ai-slash-command-menu>
      `
    );
  }

  /**
   * Closes the slash command menu
   */
  public closeSlashMenu(): void {
    this._slashMenuOpen = false;
    this._slashMenuQuery = '';
  }

  /**
   * Focuses the textarea element
   */
  public override focus(): void {
    this._inputElement?.focus();
  }

  public override render(): TemplateResult {
    return html`
      ${when(
        this.variant === 'stacked',
        () => html`
          <div class="input-container">
            <div class="forge-card">
              ${this.#contextItemsTemplate}
              <div class="forge-field">${this.#textArea} ${when(this.debugMode, () => html` ${this.#debugButton} `)}</div>
              ${this.#actions}
            </div>
          </div>
          ${this.#slashCommandMenu}
        `
      )}
      ${when(
        this.variant === 'inline',
        () => html`
          <div class="input-container">
            <div class="forge-card">
              ${this.#contextItemsTemplate}
              <div class="forge-field">
                ${this.#actionsStartSlot} ${this.#textArea} ${when(this.debugMode, () => html` ${this.#debugButton} `)}
                <div class="actions-end-container">${this.#actionsEndSlot} ${this.#sendButton}</div>
              </div>
            </div>
          </div>
          ${this.#slashCommandMenu}
        `
      )}
    `;
  }
}
