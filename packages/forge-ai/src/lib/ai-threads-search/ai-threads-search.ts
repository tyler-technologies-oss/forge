import { LitElement, TemplateResult, html, nothing, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';

import { formatRelativeTime } from '../utils/format.js';
import { DeleteThreadController } from '../utils/delete-thread-controller.js';
import { InfiniteScrollController } from '../utils/infinite-scroll-controller.js';
import '../ai-thread-actions-menu/index.js';
import '../ai-edit-thread/index.js';
import '../ai-error-message/index.js';
import '../ai-spinner/index.js';
import '../ai-modal/ai-modal.js';

import type { Thread } from '../types/index.js';

import styles from './ai-threads-search.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-threads-search': AiThreadsSearchComponent;
  }

  interface HTMLElementEventMap {
    'forge-ai-threads-search-query': CustomEvent<ForgeAiThreadsSearchQueryEventData>;
    'forge-ai-threads-search-load-more': CustomEvent<ForgeAiThreadsSearchLoadMoreEventData>;
    'forge-ai-threads-search-select': CustomEvent<ForgeAiThreadsSearchSelectEventData>;
    'forge-ai-threads-search-new-chat': CustomEvent;
    'forge-ai-threads-search-rename': CustomEvent<ForgeAiThreadsSearchRenameEventData>;
    'forge-ai-threads-search-delete': CustomEvent<ForgeAiThreadsSearchDeleteEventData>;
    'forge-ai-threads-search-delete-confirm': CustomEvent<ForgeAiThreadsSearchDeleteConfirmEventData>;
    'forge-ai-threads-search-back': CustomEvent<void>;
    'forge-ai-threads-search-retry': CustomEvent<void>;
  }
}

export interface ForgeAiThreadsSearchQueryEventData {
  query: string;
  setResults: (results: Thread[]) => void;
}

export interface ForgeAiThreadsSearchLoadMoreEventData {
  query: string;
  appendResults: (results: Thread[]) => void;
}

export interface ForgeAiThreadsSearchSelectEventData {
  id: string;
  title: string;
}

export interface ForgeAiThreadsSearchRenameEventData {
  id: string;
  oldTitle: string;
  newTitle: string;
  onSuccess: () => void;
  onError: (error?: string) => void;
}

export interface ForgeAiThreadsSearchDeleteEventData {
  id: string;
  thread: Thread;
  onSuccess: () => void;
  onError: (error?: string) => void;
}

export interface ForgeAiThreadsSearchDeleteConfirmEventData {
  thread: Thread;
}

export const AiThreadsSearchComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-threads-search';

/**
 * @tag forge-ai-threads-search
 *
 * @slot header-actions - Slot for a persistent action pinned to the top-right of the header, alongside the "New chat" button (e.g. a "View all" button).
 *
 * @event {CustomEvent<ForgeAiThreadsSearchQueryEventData>} forge-ai-threads-search-query - Fired when search query changes (debounced).
 * @event {CustomEvent<ForgeAiThreadsSearchLoadMoreEventData>} forge-ai-threads-search-load-more - Fired when the user scrolls near the bottom or clicks "Load more" for pagination.
 * @event {CustomEvent<ForgeAiThreadsSearchSelectEventData>} forge-ai-threads-search-select - Fired when a thread is selected.
 * @event {CustomEvent} forge-ai-threads-search-new-chat - Fired when new chat button clicked.
 * @event {CustomEvent<ForgeAiThreadsSearchRenameEventData>} forge-ai-threads-search-rename - Fired when thread renamed. Cancelable - if prevented, call onSuccess() to commit or onError() to revert.
 * @event {CustomEvent<ForgeAiThreadsSearchDeleteEventData>} forge-ai-threads-search-delete - Fired when thread delete confirmed. Cancelable - if prevented, call onSuccess() to commit deletion or onError() to revert.
 * @event {CustomEvent<ForgeAiThreadsSearchDeleteConfirmEventData>} forge-ai-threads-search-delete-confirm - Fired before showing the built-in delete confirmation. Cancelable - if prevented, this component shows no confirmation UI; the host must show its own and call confirmThreadDelete() once accepted.
 * @event {CustomEvent<void>} forge-ai-threads-search-back - Fired when the back button (shown via showBackButton) is clicked.
 * @event {CustomEvent<void>} forge-ai-threads-search-retry - Fired when the retry button in the error state is clicked. The host should re-request the threads and clear errorMessage once the load succeeds.
 *
 * @description A standalone search component for conversations/threads. Supports both local and external/async search patterns via event callbacks.
 * Optional rename and delete actions can be enabled via properties.
 */
@customElement(AiThreadsSearchComponentTagName)
export class AiThreadsSearchComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  @property({ type: Array })
  public threads: Thread[] = [];

  /**
   * The title text shown in the header.
   */
  @property({ type: String, attribute: 'header-title' })
  public headerTitle = 'All chats';

  /**
   * Whether to show the "New chat" button in the header.
   */
  @property({ type: Boolean, attribute: 'show-new-chat-button' })
  public showNewChatButton = true;

  /**
   * Whether to show a back button before the header title.
   */
  @property({ type: Boolean, attribute: 'show-back-button' })
  public showBackButton = false;

  /**
   * Whether to show the search field.
   */
  @property({ type: Boolean, attribute: 'show-search' })
  public showSearch = true;

  /**
   * Total number of threads available. When set to a positive number and fewer threads
   * are loaded than the total, infinite scroll is enabled. Leave at 0 (default) to disable
   * infinite scroll entirely. Useful when all data is loaded upfront.
   */
  @property({ type: Number, attribute: 'total-chats' })
  public totalChats = 0;

  /**
   * Placeholder text for the search input. The input's aria-label is "Search" - avoid reusing
   * that word here so screen readers don't announce the same word twice.
   */
  @property({ type: String })
  public placeholder = 'Find a chat';

  /**
   * Message describing a failed thread load. When no threads are loaded, an error banner with a
   * retry button replaces the empty state. When threads are already on screen the list stays visible
   * and the message shows as a compact single line with a retry - at the bottom of the list if a page
   * was in flight, otherwise above it. The host owns this value and should clear it once a load succeeds.
   */
  @property({ type: String, attribute: 'error-message' })
  public errorMessage?: string;

  @property({ type: Boolean, attribute: 'show-thread-rename' })
  public showThreadRename = false;

  @property({ type: Boolean, attribute: 'show-thread-delete' })
  public showThreadDelete = false;

  /**
   * The id of the currently selected/active thread, highlighted in the list.
   */
  @property({ type: String, attribute: 'selected-thread-id' })
  public selectedThreadId: string | null = null;

  @query('.results-container')
  private _resultsContainer!: HTMLElement;

  @query('#threads-search-input')
  private _searchInput?: HTMLInputElement;

  @state() private _searchQuery = '';
  @state() private _isSearching = false;
  @state() private _searchResults: Thread[] = [];
  @state() private _editingThreadId: string | null = null;
  @state() private _hiddenThreadIds: Set<string> = new Set();
  @state() private _openMenuThreadId: string | null = null;

  private _searchTimeout?: number;
  #focusRowIndexAfterLoad: number | null = null;

  #deleteThreadController = new DeleteThreadController(this, {
    onConfirm: thread => this.#confirmDelete(thread)
  });

  #infiniteScrollController = new InfiniteScrollController(this, {
    onLoadMore: () => this.#loadMore()
  });

  get #shouldEnablePagination(): boolean {
    if (this.totalChats <= 0) {
      return false;
    }
    const displayedCount = this.#displayedThreads.length;
    return displayedCount < this.totalChats;
  }

  public override firstUpdated(): void {
    if (this.#shouldEnablePagination && this._resultsContainer) {
      this.#infiniteScrollController.attach(this._resultsContainer);
    }
  }

  public override updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('threads') || changedProperties.has('totalChats')) {
      this.#infiniteScrollController.reset();

      if (this.#shouldEnablePagination) {
        if (this._resultsContainer) {
          this.#infiniteScrollController.attach(this._resultsContainer);
        }
      } else {
        this.#infiniteScrollController.detach();
      }
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    clearTimeout(this._searchTimeout);
  }

  #handleSearchInput(e: InputEvent): void {
    const input = e.target as HTMLInputElement;
    this._searchQuery = input.value;

    clearTimeout(this._searchTimeout);
    this._searchTimeout = window.setTimeout(() => {
      this.#performSearch();
    }, 300);
  }

  #performSearch(): void {
    const searchQuery = this._searchQuery.trim();
    this.#focusRowIndexAfterLoad = null;
    this.#infiniteScrollController.reset();

    const searchEvent = new CustomEvent<ForgeAiThreadsSearchQueryEventData>('forge-ai-threads-search-query', {
      detail: {
        query: searchQuery,
        setResults: (results: Thread[]) => {
          this._searchResults = results;
          this._isSearching = false;
        }
      },
      bubbles: true,
      composed: true,
      cancelable: true
    });

    this.dispatchEvent(searchEvent);

    if (searchEvent.defaultPrevented) {
      this._isSearching = true;
    } else {
      this._searchResults = this.threads.filter(thread => thread.title.toLowerCase().includes(searchQuery.toLowerCase()));
      this.#infiniteScrollController.setHasMore(false);
    }
  }

  #handleLoadMoreClick(): void {
    if (this.#infiniteScrollController.isLoadingMore) {
      return;
    }
    this.#focusRowIndexAfterLoad = this.#displayedThreads.length;
    this.#infiniteScrollController.setLoadingState(true);
    this.#loadMore();
  }

  #focusRow(index: number): void {
    const rows = this.shadowRoot?.querySelectorAll<HTMLElement>('.forge-list-item > button') ?? [];
    rows[index]?.focus();
  }

  #loadMore(): void {
    const loadMoreEvent = new CustomEvent<ForgeAiThreadsSearchLoadMoreEventData>('forge-ai-threads-search-load-more', {
      detail: {
        query: this._searchQuery,
        appendResults: (results: Thread[]) => {
          const focusRowIndex = this.#focusRowIndexAfterLoad;
          this.#focusRowIndexAfterLoad = null;

          if (results.length === 0) {
            this.#infiniteScrollController.setHasMore(false);
          } else {
            if (this._searchQuery) {
              this._searchResults = [...this._searchResults, ...results];
            } else {
              this.threads = [...this.threads, ...results];
            }
            if (focusRowIndex !== null) {
              void this.updateComplete.then(() => this.#focusRow(focusRowIndex));
            }
          }
          this.#infiniteScrollController.setLoadingState(false);
        }
      },
      bubbles: true,
      composed: true
    });

    this.dispatchEvent(loadMoreEvent);
  }

  #handleThreadSelect(thread: Thread): void {
    const event = new CustomEvent<ForgeAiThreadsSearchSelectEventData>('forge-ai-threads-search-select', {
      detail: { id: thread.id, title: thread.title },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  #handleNewChatClick(): void {
    const event = new CustomEvent('forge-ai-threads-search-new-chat', {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  #handleBackClick(): void {
    const event = new CustomEvent<void>('forge-ai-threads-search-back', {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  #handleRetryClick(): void {
    if (this._searchQuery.trim()) {
      this.#performSearch();
      return;
    }

    const event = new CustomEvent<void>('forge-ai-threads-search-retry', {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  #handleMenuRename(e: CustomEvent): void {
    this._editingThreadId = e.detail.id;
    this._openMenuThreadId = null;
  }

  #handleMenuOpen(e: CustomEvent): void {
    this._openMenuThreadId = e.detail.id;
  }

  #handleMenuClose(): void {
    this._openMenuThreadId = null;
  }

  #handleMenuDeleteClick(e: CustomEvent): void {
    const { id } = e.detail;
    const thread = this.#displayedThreads.find(t => t.id === id);
    if (!thread) {
      return;
    }

    const event = new CustomEvent<ForgeAiThreadsSearchDeleteConfirmEventData>('forge-ai-threads-search-delete-confirm', {
      detail: { thread },
      bubbles: true,
      composed: true,
      cancelable: true
    });

    const dispatched = this.dispatchEvent(event);
    if (dispatched) {
      this.#deleteThreadController.show(thread);
    }
  }

  #confirmDelete(thread: Thread): void {
    const onSuccess = (): void => {
      this._hiddenThreadIds.add(thread.id);
      this.requestUpdate();
    };

    const onError = (error?: string): void => {
      this._hiddenThreadIds.delete(thread.id);
      this.requestUpdate();
      if (error) {
        console.error('Delete failed:', error);
      }
    };

    const event = new CustomEvent<ForgeAiThreadsSearchDeleteEventData>('forge-ai-threads-search-delete', {
      detail: { id: thread.id, thread, onSuccess, onError },
      bubbles: true,
      composed: true,
      cancelable: true
    });

    const dispatched = this.dispatchEvent(event);
    if (dispatched) {
      this._hiddenThreadIds.add(thread.id);
      this.requestUpdate();
    }
  }

  /**
   * Completes a delete that a host intercepted via `forge-ai-threads-search-delete-confirm`
   * (calling preventDefault() to show its own confirmation instead of this component's
   * built-in one). Call once the host's own confirmation has been accepted.
   */
  public confirmThreadDelete(thread: Thread): void {
    this.#confirmDelete(thread);
  }

  #handleEditSave(e: CustomEvent): void {
    const { id, oldTitle, newTitle } = e.detail;
    const thread = this.#displayedThreads.find(t => t.id === id);
    if (!thread) {
      return;
    }

    const onSuccess = (): void => {
      thread.title = newTitle;
      this.requestUpdate();
    };

    const onError = (error?: string): void => {
      thread.title = oldTitle;
      this.requestUpdate();
      if (error) {
        console.error('Rename failed:', error);
      }
    };

    const event = new CustomEvent<ForgeAiThreadsSearchRenameEventData>('forge-ai-threads-search-rename', {
      detail: { id, oldTitle, newTitle, onSuccess, onError },
      bubbles: true,
      composed: true,
      cancelable: true
    });

    const dispatched = this.dispatchEvent(event);
    if (dispatched) {
      thread.title = newTitle;
      this.requestUpdate();
    }

    this._editingThreadId = null;
  }

  #handleEditCancel(): void {
    this._editingThreadId = null;
  }

  #handleClearSearch(): void {
    this.resetSearch();
    this._searchInput?.focus();
  }

  /**
   * Discards the current query and its results so the list shows every loaded chat again.
   * Dispatches no search event and moves no focus, so a host may call it on a surface that is
   * currently hidden (e.g. a popover that stays mounted between opens).
   */
  public resetSearch(): void {
    clearTimeout(this._searchTimeout);
    this._searchQuery = '';
    this._searchResults = [];
    this._isSearching = false;
    this.#focusRowIndexAfterLoad = null;
    this.#infiniteScrollController.reset();
  }

  /**
   * Moves focus into the component: the search input when shown, otherwise the first chat in
   * the list, otherwise the first header button.
   */
  public override focus(): void {
    const target =
      this._searchInput ?? this.shadowRoot?.querySelector<HTMLElement>('.forge-list-item > button') ?? this.shadowRoot?.querySelector<HTMLElement>('button');
    target?.focus();
  }

  get #displayedThreads(): Thread[] {
    const threads = this._searchQuery ? this._searchResults : this.threads;
    return threads.filter(thread => !this._hiddenThreadIds.has(thread.id));
  }

  get #header(): TemplateResult {
    return html`
      <div class="header">
        <div class="header-start">
          ${when(
            this.showBackButton,
            () => html`
              <button class="back-button forge-icon-button forge-icon-button--medium" @click=${this.#handleBackClick} aria-label="Back">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z" />
                </svg>
              </button>
            `
          )}
          <div class="header-title">
            <span class="title">${this.headerTitle}</span>
          </div>
        </div>
        <div class="header-end">
          ${when(
            this.showNewChatButton,
            () => html`
              <button class="forge-button new-chat-button" @click=${this.#handleNewChatClick}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="forge-icon" aria-hidden="true">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
                New chat
              </button>
            `
          )}
          <slot name="header-actions"></slot>
        </div>
      </div>
    `;
  }

  get #searchField(): TemplateResult {
    return html`
      <div class="forge-field forge-field--small search-field">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="forge-icon" aria-hidden="true">
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14" />
        </svg>
        <input
          id="threads-search-input"
          type="text"
          autocomplete="off"
          aria-label="Search"
          placeholder=${this.placeholder}
          .value=${this._searchQuery}
          @input=${this.#handleSearchInput} />
        ${when(this._isSearching, () => html`<forge-ai-spinner size="extra-small"></forge-ai-spinner>`)}
        ${when(
          this._searchQuery.length,
          () => html`
            <button class="forge-icon-button forge-icon-button--small" type="button" aria-label="Clear search" @click=${this.#handleClearSearch}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="forge-icon" aria-hidden="true">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
          `
        )}
      </div>
    `;
  }

  #renderThreadItem(thread: Thread): TemplateResult {
    const isEditing = this._editingThreadId === thread.id;
    const hasOpenMenu = this._openMenuThreadId === thread.id;
    const isSelected = this.selectedThreadId === thread.id;

    return html`
      <li class="forge-list-item ${isSelected ? 'forge-list-item--selected' : ''} ${hasOpenMenu ? 'forge-list-item--menu-open' : ''}" role="listitem">
        ${when(
          isEditing,
          () => html`
            <forge-ai-edit-thread
              .thread=${thread}
              .value=${thread.title}
              @forge-ai-edit-thread-save=${this.#handleEditSave}
              @forge-ai-edit-thread-cancel=${this.#handleEditCancel}>
            </forge-ai-edit-thread>
          `,
          () => html`
            <button type="button" aria-current=${isSelected ? 'true' : nothing} @click=${() => this.#handleThreadSelect(thread)}>${thread.title}</button>
            <span class="thread-time">${formatRelativeTime(thread.createdAt)}</span>
            ${when(
              this.showThreadRename || this.showThreadDelete,
              () => html`
                <div class="thread-item-actions">
                  <forge-ai-thread-actions-menu
                    .thread=${thread}
                    ?show-rename=${this.showThreadRename}
                    ?show-delete=${this.showThreadDelete}
                    @forge-ai-thread-actions-menu-rename=${this.#handleMenuRename}
                    @forge-ai-thread-actions-menu-delete-click=${this.#handleMenuDeleteClick}
                    @forge-ai-thread-actions-menu-open=${this.#handleMenuOpen}
                    @forge-ai-thread-actions-menu-close=${this.#handleMenuClose}>
                  </forge-ai-thread-actions-menu>
                </div>
              `
            )}
          `
        )}
      </li>
    `;
  }

  get #errorState(): TemplateResult {
    return html`
      <div class="error-state">
        <forge-ai-error-message density="small">
          <span slot="title">Error</span>
          <p class="error-state__message">${this.errorMessage}</p>
          <button class="forge-button forge-button--outlined forge-button--dense error-state__retry" type="button" @click=${this.#handleRetryClick}>
            Retry
          </button>
        </forge-ai-error-message>
      </div>
    `;
  }

  /** The single-line variant, used when threads are already on screen and the list stays visible. */
  get #compactError(): TemplateResult {
    return html`
      <forge-ai-error-message class="compact-error" density="small">
        <div class="compact-error__body">
          <span>${this.errorMessage}</span>
          <button class="forge-button forge-button--outlined forge-button--dense compact-error__retry" type="button" @click=${this.#handleRetryClick}>
            Retry
          </button>
        </div>
      </forge-ai-error-message>
    `;
  }

  /**
   * A failure that arrives while a page is in flight is a pagination failure, so it reads at the
   * bottom of the list where the load-more spinner would have been. Any other failure - a rejected
   * thread selection, for instance - is not tied to the end of the list, so it sits above it.
   */
  get #errorPlacement(): 'above-list' | 'list-footer' | 'none' {
    // With no threads on screen the full banner replaces the empty state instead.
    if (!this.errorMessage || this.#displayedThreads.length === 0) {
      return 'none';
    }

    return this.#infiniteScrollController.isLoadingMore ? 'list-footer' : 'above-list';
  }

  get #emptyState(): TemplateResult {
    const message = this._searchQuery.trim() ? 'No chats found' : 'No chats yet';
    return html`
      <div class="empty-state">
        <p>${message}</p>
      </div>
    `;
  }

  get #listFooter(): TemplateResult | typeof nothing {
    if (this.#errorPlacement === 'list-footer') {
      return this.#compactError;
    }

    if (this.#infiniteScrollController.isLoadingMore) {
      return html`
        <div class="loading-more-indicator">
          <forge-ai-spinner></forge-ai-spinner>
        </div>
      `;
    }

    // A tall viewport may fit the whole first page so scrolling never requests the next one,
    // and keyboard users need an explicit paging action.
    if (this.#shouldEnablePagination && this.#infiniteScrollController.hasMoreResults) {
      return html`
        <div class="loading-more-indicator">
          <button type="button" class="forge-button forge-button--dense load-more-button" @click=${this.#handleLoadMoreClick}>Load more</button>
        </div>
      `;
    }

    return nothing;
  }

  get #resultsList(): TemplateResult {
    const displayThreads = this.#displayedThreads;

    if (displayThreads.length === 0) {
      return html`<div class="results-container">${this.errorMessage ? this.#errorState : this.#emptyState}</div>`;
    }

    return html`
      <div class="results-container">
        <ul class="forge-list forge-list--dense forge-list--navlist" role="list">
          ${displayThreads.map(thread => this.#renderThreadItem(thread))}
        </ul>
        ${this.#listFooter}
      </div>
    `;
  }

  public override render(): TemplateResult {
    return html`
      <div class="threads-search-container">
        ${this.#header} ${when(this.showSearch, () => this.#searchField)} ${when(this.#errorPlacement === 'above-list', () => this.#compactError)}
        ${this.#resultsList}
      </div>
      ${this.#deleteThreadController.template}
    `;
  }
}
