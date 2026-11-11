import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import type { Thread } from '../types/index.js';

export type EditThreadDensity = 'small' | 'medium';

import styles from './ai-edit-thread.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-edit-thread': AiEditThreadComponent;
  }

  interface HTMLElementEventMap {
    'forge-ai-edit-thread-save': CustomEvent<ForgeAiEditThreadSaveEventData>;
    'forge-ai-edit-thread-cancel': CustomEvent<void>;
  }
}

export interface ForgeAiEditThreadSaveEventData {
  id: string;
  oldTitle: string;
  newTitle: string;
}

export const AiEditThreadComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-edit-thread';

/**
 * @tag forge-ai-edit-thread
 *
 * @event {CustomEvent<ForgeAiEditThreadSaveEventData>} forge-ai-edit-thread-save - Fired when save button is clicked or Enter is pressed.
 * @event {CustomEvent<void>} forge-ai-edit-thread-cancel - Fired when cancel button is clicked, Escape is pressed, or focus leaves the component.
 *
 * @description An inline edit field for renaming thread titles. Handles keyboard shortcuts and focus management.
 */
@customElement(AiEditThreadComponentTagName)
export class AiEditThreadComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  @property({ type: Object })
  public thread!: Thread;

  @property({ type: String })
  public value = '';

  /**
   * The density of the cancel/save buttons
   */
  @property()
  public density: EditThreadDensity = 'small';

  @query('.edit-input')
  private _inputElement?: HTMLInputElement;

  public override firstUpdated(): void {
    if (this._inputElement) {
      this._inputElement.focus();
      this._inputElement.select();
      this._inputElement.scrollLeft = 0;
    }
  }

  #handleKeyDown(evt: KeyboardEvent): void {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      this.#handleSave();
    } else if (evt.key === 'Escape') {
      evt.stopPropagation();
      this.#handleCancel();
    }
  }

  #handleFocusOut(evt: FocusEvent): void {
    const relatedTarget = evt.relatedTarget as HTMLElement;
    if (relatedTarget?.closest('.edit-thread-field')) {
      return;
    }
    this.#handleCancel();
  }

  #handleSave(): void {
    const input = this._inputElement;
    if (!input) {
      return;
    }

    const newTitle = input.value.trim();

    if (newTitle && newTitle !== this.thread.title) {
      const event = new CustomEvent<ForgeAiEditThreadSaveEventData>('forge-ai-edit-thread-save', {
        detail: {
          id: this.thread.id,
          oldTitle: this.thread.title,
          newTitle
        },
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(event);
    } else {
      this.#handleCancel();
    }
  }

  #handleCancel(): void {
    const event = new CustomEvent('forge-ai-edit-thread-cancel', {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  get #buttonClasses(): Record<string, boolean> {
    return {
      'forge-icon-button': true,
      'forge-icon-button--squared': true,
      'forge-icon-button--small': this.density === 'small'
    };
  }

  public override render(): TemplateResult {
    return html`
      <div class="edit-thread-field" @focusout=${this.#handleFocusOut}>
        <div class="forge-field">
          <input type="text" class="edit-input" data-handles-escape .value=${this.value} @keydown=${this.#handleKeyDown} />
        </div>
        <div class="edit-thread-actions">
          <button class=${classMap(this.#buttonClasses)} @click=${this.#handleCancel} aria-label="Cancel">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="forge-icon" aria-hidden="true">
              <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
          <button class=${classMap(this.#buttonClasses)} @click=${this.#handleSave} aria-label="Save">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="forge-icon" aria-hidden="true">
              <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </button>
        </div>
      </div>
    `;
  }
}
