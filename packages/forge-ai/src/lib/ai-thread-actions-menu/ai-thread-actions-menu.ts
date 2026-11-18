import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';

import type { Thread } from '../types/index.js';
import type { DropdownMenuDensity } from '../ai-dropdown-menu/index.js';
import '../ai-dropdown-menu/ai-dropdown-menu.js';
import '../ai-dropdown-menu/ai-dropdown-menu-item.js';

import styles from './ai-thread-actions-menu.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-thread-actions-menu': AiThreadActionsMenuComponent;
  }

  interface HTMLElementEventMap {
    'forge-ai-thread-actions-menu-rename': CustomEvent<ForgeAiThreadActionsMenuRenameEventData>;
    'forge-ai-thread-actions-menu-delete-click': CustomEvent<ForgeAiThreadActionsMenuDeleteClickEventData>;
    'forge-ai-thread-actions-menu-open': CustomEvent<ForgeAiThreadActionsMenuOpenEventData>;
    'forge-ai-thread-actions-menu-close': CustomEvent<void>;
  }
}

export interface ForgeAiThreadActionsMenuRenameEventData {
  id: string;
}

export interface ForgeAiThreadActionsMenuDeleteClickEventData {
  id: string;
}

export interface ForgeAiThreadActionsMenuOpenEventData {
  id: string;
}

export const AiThreadActionsMenuComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-thread-actions-menu';

/**
 * @tag forge-ai-thread-actions-menu
 *
 * @slot trigger-icon - Slot for custom trigger icon (default: three-dot menu icon)
 *
 * @event {CustomEvent<ForgeAiThreadActionsMenuRenameEventData>} forge-ai-thread-actions-menu-rename - Fired when rename menu item is clicked.
 * @event {CustomEvent<ForgeAiThreadActionsMenuDeleteClickEventData>} forge-ai-thread-actions-menu-delete-click - Fired when delete menu item is clicked. Parent should show confirmation modal.
 * @event {CustomEvent<ForgeAiThreadActionsMenuOpenEventData>} forge-ai-thread-actions-menu-open - Fired when the dropdown menu is opened.
 * @event {CustomEvent<void>} forge-ai-thread-actions-menu-close - Fired when the dropdown menu is closed.
 *
 * @description A reusable three-dot actions menu for thread items with rename and delete actions.
 * Emits events for all actions. Parent components handle confirmation modals.
 */
@customElement(AiThreadActionsMenuComponentTagName)
export class AiThreadActionsMenuComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  @property({ type: Object })
  public thread!: Thread;

  @property({ type: Boolean, attribute: 'show-rename' })
  public showRename = false;

  @property({ type: Boolean, attribute: 'show-delete' })
  public showDelete = false;

  /**
   * The density of the trigger button
   */
  @property()
  public density: DropdownMenuDensity = 'small';

  #handleMenuOpen(): void {
    const event = new CustomEvent<ForgeAiThreadActionsMenuOpenEventData>('forge-ai-thread-actions-menu-open', {
      detail: { id: this.thread.id },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  #handleMenuClose(): void {
    const event = new CustomEvent('forge-ai-thread-actions-menu-close', {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  #handleMenuKeyDown(evt: KeyboardEvent): void {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  }

  #handleMenuSelect(evt: Event): void {
    evt.stopPropagation();
  }

  #handleRenameClick(): void {
    const event = new CustomEvent<ForgeAiThreadActionsMenuRenameEventData>('forge-ai-thread-actions-menu-rename', {
      detail: { id: this.thread.id },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  #handleDeleteClick(): void {
    const event = new CustomEvent<ForgeAiThreadActionsMenuDeleteClickEventData>('forge-ai-thread-actions-menu-delete-click', {
      detail: { id: this.thread.id },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  public override render(): TemplateResult {
    return html`
      <forge-ai-dropdown-menu
        variant="icon-button-squared"
        density=${this.density}
        selection-mode="none"
        popover-placement="bottom-start"
        trigger-label="More actions for ${this.thread.title}"
        @keydown=${this.#handleMenuKeyDown}
        @forge-ai-dropdown-menu-open=${this.#handleMenuOpen}
        @forge-ai-dropdown-menu-close=${this.#handleMenuClose}
        @click=${this.#handleMenuSelect}>
        <slot name="trigger-icon" slot="trigger-content">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" class="forge-icon">
            <path
              d="M12 16a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2" />
          </svg>
        </slot>

        ${when(
          this.showRename,
          () => html`
            <forge-ai-dropdown-menu-item value="rename" @click=${this.#handleRenameClick}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" slot="start" class="forge-icon" aria-hidden="true">
                <path
                  d="m14.06 9 .94.94L5.92 19H5v-.92zm3.6-6c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94z" />
              </svg>
              <span>Rename</span>
            </forge-ai-dropdown-menu-item>
          `
        )}
        ${when(
          this.showDelete,
          () => html`
            <forge-ai-dropdown-menu-item value="delete" @click=${this.#handleDeleteClick}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" slot="start" class="forge-icon" aria-hidden="true">
                <path d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3zM7 6h10v13H7zm2 2v9h2V8zm4 0v9h2V8z" />
              </svg>
              <span>Delete</span>
            </forge-ai-dropdown-menu-item>
          `
        )}
      </forge-ai-dropdown-menu>
    `;
  }
}
