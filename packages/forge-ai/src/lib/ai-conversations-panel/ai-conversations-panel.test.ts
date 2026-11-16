import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { renderFixture } from '../../testing/fixture.js';
import { settle } from '../../testing/settle.js';
import type { Thread } from '../types/index.js';
import {
  AiConversationsPanelComponent,
  AiConversationsPanelComponentTagName,
  type ForgeAiConversationsPanelDeleteEventData,
  type ForgeAiConversationsPanelLoadMoreEventData,
  type ForgeAiConversationsPanelRenameEventData,
  type ForgeAiConversationsPanelSearchEventData,
  type ForgeAiConversationsPanelSelectEventData
} from './index.js';

const TAG = 'forge-ai-conversations-panel';

function makeThreads(): Thread[] {
  return [
    { id: '1', title: 'Alpha plan', createdAt: '2024-01-01T00:00:00Z' },
    { id: '2', title: 'Beta report', createdAt: '2024-01-02T00:00:00Z' },
    { id: '3', title: 'Gamma alpha', createdAt: '2024-01-03T00:00:00Z' }
  ];
}

function createElement(
  template = html`<forge-ai-conversations-panel .threads=${makeThreads()}></forge-ai-conversations-panel>`
): Promise<AiConversationsPanelComponent> {
  return renderFixture<AiConversationsPanelComponent>(template, TAG);
}

function root(el: AiConversationsPanelComponent): ShadowRoot {
  return el.shadowRoot!;
}

function threadButtons(el: AiConversationsPanelComponent): HTMLButtonElement[] {
  return Array.from(root(el).querySelectorAll<HTMLButtonElement>('.thread-list-container .forge-list-item > button'));
}

function titles(el: AiConversationsPanelComponent): string[] {
  return threadButtons(el).map(b => b.textContent!.trim());
}

function actionButton(el: AiConversationsPanelComponent, label: string): HTMLButtonElement {
  return Array.from(root(el).querySelectorAll<HTMLButtonElement>('.chat-actions-list button')).find(b => b.textContent!.includes(label))!;
}

function buttonByText(scope: ParentNode, text: string): HTMLButtonElement {
  return Array.from(scope.querySelectorAll<HTMLButtonElement>('button')).find(b => b.textContent!.trim() === text)!;
}

function searchInput(el: AiConversationsPanelComponent): HTMLInputElement {
  return root(el).querySelector<HTMLInputElement>('#search-input-search')!;
}

async function openSearch(el: AiConversationsPanelComponent): Promise<void> {
  actionButton(el, 'Search chats').click();
  await el.updateComplete;
}

function typeSearch(el: AiConversationsPanelComponent, value: string): void {
  const input = searchInput(el);
  input.value = value;
  input.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
}

function actionsMenu(el: AiConversationsPanelComponent, index = 0): HTMLElement {
  return root(el).querySelectorAll<HTMLElement>('forge-ai-thread-actions-menu')[index];
}

function fireMenu(menu: HTMLElement, name: 'rename' | 'delete-click' | 'open' | 'close', id: string): void {
  menu.dispatchEvent(new CustomEvent(`forge-ai-thread-actions-menu-${name}`, { detail: { id }, bubbles: true, composed: true }));
}

function saveEvent(id: string, oldTitle: string, newTitle: string): CustomEvent {
  return new CustomEvent('forge-ai-edit-thread-save', { detail: { id, oldTitle, newTitle }, bubbles: true, composed: true });
}

function triggerScroll(container: HTMLElement, scrollTop: number): void {
  Object.defineProperty(container, 'scrollHeight', { value: 1000, configurable: true });
  Object.defineProperty(container, 'clientHeight', { value: 200, configurable: true });
  Object.defineProperty(container, 'scrollTop', { value: scrollTop, configurable: true });
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
  try {
    container.dispatchEvent(new Event('scroll'));
    vi.advanceTimersByTime(150);
  } finally {
    vi.useRealTimers();
  }
}

describe('AiConversationsPanelComponent', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('registration', () => {
    it('should be registered under the forge-ai-conversations-panel tag', async () => {
      const el = await createElement();

      expect(AiConversationsPanelComponentTagName).toBe(TAG);
      expect(customElements.get(TAG)).toBe(AiConversationsPanelComponent);
      expect(el).toBeInstanceOf(AiConversationsPanelComponent);
      expect(el.shadowRoot).toBeTruthy();
    });
  });

  describe('properties', () => {
    it('should have the expected defaults', async () => {
      const el = await createElement(html`<forge-ai-conversations-panel></forge-ai-conversations-panel>`);

      expect(el.threads).toEqual([]);
      expect(el.totalChats).toBe(0);
      expect(el.selectedThreadId).toBeNull();
      expect(el.showThreadRename).toBe(false);
      expect(el.showThreadDelete).toBe(false);
      expect(el.loading).toBe(false);
      expect(el.errorMessage).toBeUndefined();
    });

    it('should expose a labelled complementary landmark', async () => {
      const el = await createElement();
      const aside = root(el).querySelector('aside')!;

      expect(aside.getAttribute('role')).toBe('complementary');
      expect(aside.getAttribute('aria-label')).toBe('Conversation history');
    });

    it('should render the threads and the Recent chats label in the main view', async () => {
      const el = await createElement();

      expect(titles(el)).toEqual(['Alpha plan', 'Beta report', 'Gamma alpha']);
      expect(root(el).querySelector('.chats-label')!.textContent).toBe('Recent chats');
    });

    it('should re-render when threads change', async () => {
      const el = await createElement();

      el.threads = [{ id: '9', title: 'Nine', createdAt: '2024-01-01T00:00:00Z' }];
      await el.updateComplete;

      expect(titles(el)).toEqual(['Nine']);
    });

    it('should mark the selected thread', async () => {
      const el = await createElement(html`<forge-ai-conversations-panel .threads=${makeThreads()} selected-thread-id="2"></forge-ai-conversations-panel>`);

      const items = Array.from(root(el).querySelectorAll<HTMLElement>('.thread-list-container .forge-list-item'));
      expect(items[1].classList.contains('forge-list-item--selected')).toBe(true);
      expect(threadButtons(el)[1].getAttribute('aria-current')).toBe('true');
      expect(items[0].classList.contains('forge-list-item--selected')).toBe(false);
      expect(threadButtons(el)[0].hasAttribute('aria-current')).toBe(false);
    });

    it('should reflect loading to the attribute', async () => {
      const el = await createElement();

      el.loading = true;
      await el.updateComplete;

      expect(el.hasAttribute('loading')).toBe(true);
    });

    it('should show a loading spinner when loading with no threads', async () => {
      const el = await createElement(html`<forge-ai-conversations-panel loading></forge-ai-conversations-panel>`);

      expect(root(el).querySelector('.loading-indicator forge-ai-spinner')).toBeTruthy();
      expect(root(el).querySelector('.empty-state')).toBeNull();
    });

    it('should show the empty state instead of the spinner in the search view when loading with no results', async () => {
      const el = await createElement(html`<forge-ai-conversations-panel loading></forge-ai-conversations-panel>`);

      await openSearch(el);

      expect(root(el).querySelector('.empty-state')).toBeTruthy();
      expect(root(el).querySelector('.loading-indicator')).toBeNull();
    });

    it('should show the empty state when there are no threads', async () => {
      const el = await createElement(html`<forge-ai-conversations-panel></forge-ai-conversations-panel>`);

      expect(root(el).querySelector('.empty-state')!.textContent).toContain('No chats yet');
    });

    it('should show the actions menu only when rename or delete is enabled', async () => {
      const none = await createElement();
      const rename = await createElement(html`<forge-ai-conversations-panel .threads=${makeThreads()} show-thread-rename></forge-ai-conversations-panel>`);
      const del = await createElement(html`<forge-ai-conversations-panel .threads=${makeThreads()} show-thread-delete></forge-ai-conversations-panel>`);

      expect(root(none).querySelector('forge-ai-thread-actions-menu')).toBeNull();
      expect(actionsMenu(rename)).toBeTruthy();
      expect(actionsMenu(del)).toBeTruthy();
    });
  });

  describe('header events', () => {
    it('should dispatch close when the close button is clicked', async () => {
      const el = await createElement();
      const listener = vi.fn<(event: Event) => void>();
      el.addEventListener('forge-ai-conversations-panel-close', listener);

      await userEvent.click(root(el).querySelector<HTMLButtonElement>('button[aria-label="Close conversations panel"]')!);

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener.mock.calls[0][0].bubbles).toBe(true);
      expect(listener.mock.calls[0][0].composed).toBe(true);
    });

    it('should dispatch a cancelable new-chat event when New chat is clicked', async () => {
      const el = await createElement();
      const listener = vi.fn<(event: Event) => void>();
      el.addEventListener('forge-ai-conversations-panel-new-chat', listener);

      await userEvent.click(actionButton(el, 'New chat'));

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener.mock.calls[0][0].cancelable).toBe(true);
      expect(listener.mock.calls[0][0].bubbles).toBe(true);
      expect(listener.mock.calls[0][0].composed).toBe(true);
    });

    it('should dispatch select with id and title when a thread is clicked', async () => {
      const el = await createElement();
      const listener = vi.fn<(event: CustomEvent<ForgeAiConversationsPanelSelectEventData>) => void>();
      el.addEventListener('forge-ai-conversations-panel-select', listener);

      await userEvent.click(threadButtons(el)[2]);

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener.mock.calls[0][0].detail).toEqual({ id: '3', title: 'Gamma alpha' });
      expect(listener.mock.calls[0][0].bubbles).toBe(true);
      expect(listener.mock.calls[0][0].composed).toBe(true);
    });
  });

  describe('view switching', () => {
    it('should switch to the search view when Search chats is clicked', async () => {
      const el = await createElement();

      await openSearch(el);

      expect(searchInput(el)).toBeTruthy();
      expect(root(el).querySelector('.chat-actions-list')).toBeNull();
      expect(root(el).querySelector('.chats-label')).toBeNull();
      expect(root(el).querySelector('.header--search')).toBeTruthy();
      expect(titles(el)).toHaveLength(3);
    });

    it('should focus the search input when entering the search view', async () => {
      const el = await createElement();

      await openSearch(el);
      await settle(el);

      expect(root(el).activeElement).toBe(searchInput(el));
    });

    it('should return to the main view when Back is clicked', async () => {
      const el = await createElement();
      await openSearch(el);

      root(el).querySelector<HTMLButtonElement>('button[aria-label="Back to recent chats"]')!.click();
      await el.updateComplete;

      expect(searchInput(el)).toBeNull();
      expect(root(el).querySelector('.chat-actions-list')).toBeTruthy();
    });

    it('should dispatch close from the search view header', async () => {
      const el = await createElement();
      await openSearch(el);
      const listener = vi.fn();
      el.addEventListener('forge-ai-conversations-panel-close', listener);

      root(el).querySelector<HTMLButtonElement>('.header--search button[aria-label="Close conversations panel"]')!.click();

      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('should return to the main view with resetToMainView', async () => {
      const el = await createElement();
      await openSearch(el);

      el.resetToMainView();
      await el.updateComplete;

      expect(root(el).querySelector('.chat-actions-list')).toBeTruthy();
      expect(searchInput(el)).toBeNull();
    });

    it('should cancel an active rename with resetToMainView', async () => {
      const el = await createElement(html`<forge-ai-conversations-panel .threads=${makeThreads()} show-thread-rename></forge-ai-conversations-panel>`);
      fireMenu(actionsMenu(el), 'rename', '1');
      await el.updateComplete;
      expect(root(el).querySelector('forge-ai-edit-thread')).toBeTruthy();

      el.resetToMainView();
      await el.updateComplete;

      expect(root(el).querySelector('forge-ai-edit-thread')).toBeNull();
    });
  });

  describe('search', () => {
    beforeEach(() => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should not dispatch search until the debounce elapses', async () => {
      const el = await createElement();
      await openSearch(el);
      const listener = vi.fn();
      el.addEventListener('forge-ai-conversations-panel-search', listener);

      typeSearch(el, 'alpha');
      vi.advanceTimersByTime(299);
      expect(listener).not.toHaveBeenCalled();
      vi.advanceTimersByTime(1);

      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('should dispatch a cancelable search event with the query', async () => {
      const el = await createElement();
      await openSearch(el);
      const listener = vi.fn<(event: CustomEvent<ForgeAiConversationsPanelSearchEventData>) => void>();
      el.addEventListener('forge-ai-conversations-panel-search', listener);

      typeSearch(el, 'alpha');
      vi.advanceTimersByTime(300);

      const event = listener.mock.calls[0][0];
      expect(event.detail.query).toBe('alpha');
      expect(typeof event.detail.setResults).toBe('function');
      expect(event.cancelable).toBe(true);
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
    });

    it('should debounce successive input into one search event', async () => {
      const el = await createElement();
      await openSearch(el);
      const listener = vi.fn();
      el.addEventListener('forge-ai-conversations-panel-search', listener);

      typeSearch(el, 'a');
      vi.advanceTimersByTime(200);
      typeSearch(el, 'al');
      vi.advanceTimersByTime(300);

      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('should filter locally (case-insensitive) when the search event is not prevented', async () => {
      const el = await createElement();
      await openSearch(el);

      typeSearch(el, 'ALPHA');
      vi.advanceTimersByTime(300);
      await el.updateComplete;

      expect(titles(el)).toEqual(['Alpha plan', 'Gamma alpha']);
    });

    it('should show the no-results state when nothing matches', async () => {
      const el = await createElement();
      await openSearch(el);

      typeSearch(el, 'zzz');
      vi.advanceTimersByTime(300);
      await el.updateComplete;

      expect(root(el).querySelector('.empty-state')!.textContent).toContain('No chats found');
    });

    it('should show a spinner and use setResults when the search event is prevented', async () => {
      const el = await createElement();
      await openSearch(el);
      let setResults!: (results: Thread[]) => void;
      el.addEventListener('forge-ai-conversations-panel-search', e => {
        e.preventDefault();
        setResults = e.detail.setResults;
      });

      typeSearch(el, 'remote');
      vi.advanceTimersByTime(300);
      await el.updateComplete;
      expect(root(el).querySelector('.search-spinner')).toBeTruthy();

      setResults([{ id: 'r1', title: 'Remote hit', createdAt: '2024-01-01T00:00:00Z' }]);
      await el.updateComplete;

      expect(root(el).querySelector('.search-spinner')).toBeNull();
      expect(titles(el)).toEqual(['Remote hit']);
    });

    it('should restore all threads without searching when the query is cleared', async () => {
      const el = await createElement();
      await openSearch(el);
      typeSearch(el, 'alpha');
      vi.advanceTimersByTime(300);
      await el.updateComplete;
      const listener = vi.fn();
      el.addEventListener('forge-ai-conversations-panel-search', listener);

      typeSearch(el, '   ');
      vi.advanceTimersByTime(500);
      await el.updateComplete;

      expect(listener).not.toHaveBeenCalled();
      expect(titles(el)).toHaveLength(3);
    });

    it('should not search after being disconnected', async () => {
      const el = await createElement();
      await openSearch(el);
      const listener = vi.fn();
      el.addEventListener('forge-ai-conversations-panel-search', listener);

      typeSearch(el, 'alpha');
      el.remove();
      vi.advanceTimersByTime(500);

      expect(listener).not.toHaveBeenCalled();
    });

    it('should reset the search when going back to the main view', async () => {
      const el = await createElement();
      await openSearch(el);
      typeSearch(el, 'alpha');
      vi.advanceTimersByTime(300);
      await el.updateComplete;

      root(el).querySelector<HTMLButtonElement>('button[aria-label="Back to recent chats"]')!.click();
      await el.updateComplete;

      expect(titles(el)).toHaveLength(3);
    });
  });

  describe('error state', () => {
    it('should show a full error banner with retry when no threads are loaded', async () => {
      const el = await createElement(html`<forge-ai-conversations-panel error-message="Could not load"></forge-ai-conversations-panel>`);

      expect(el.errorMessage).toBe('Could not load');
      expect(root(el).querySelector('.error-state__message')!.textContent).toBe('Could not load');
      expect(root(el).querySelector('.empty-state')).toBeNull();
    });

    it('should prefer the error banner over the loading spinner', async () => {
      const el = await createElement(html`<forge-ai-conversations-panel loading error-message="Boom"></forge-ai-conversations-panel>`);

      expect(root(el).querySelector('.error-state')).toBeTruthy();
      expect(root(el).querySelector('.loading-indicator')).toBeNull();
    });

    it('should show a compact error above the list when threads are present', async () => {
      const el = await createElement(html`<forge-ai-conversations-panel .threads=${makeThreads()} error-message="Oops"></forge-ai-conversations-panel>`);

      const compact = root(el).querySelector('.compact-error')!;
      expect(compact.textContent).toContain('Oops');
      expect(root(el).querySelector('.error-state')).toBeNull();
      expect(titles(el)).toHaveLength(3);
      expect(root(el).querySelector('.thread-list-container')!.contains(compact)).toBe(false);
    });

    it('should dispatch retry from the error banner', async () => {
      const el = await createElement(html`<forge-ai-conversations-panel error-message="Could not load"></forge-ai-conversations-panel>`);
      const listener = vi.fn<(event: Event) => void>();
      el.addEventListener('forge-ai-conversations-panel-retry', listener);

      await userEvent.click(buttonByText(root(el), 'Retry'));

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener.mock.calls[0][0].bubbles).toBe(true);
      expect(listener.mock.calls[0][0].composed).toBe(true);
    });

    it('should dispatch retry from the compact error', async () => {
      const el = await createElement(html`<forge-ai-conversations-panel .threads=${makeThreads()} error-message="Oops"></forge-ai-conversations-panel>`);
      const listener = vi.fn();
      el.addEventListener('forge-ai-conversations-panel-retry', listener);

      buttonByText(root(el), 'Retry').click();

      expect(listener).toHaveBeenCalledTimes(1);
    });
  });

  describe('rename', () => {
    function createRenameElement(): Promise<AiConversationsPanelComponent> {
      return createElement(html`<forge-ai-conversations-panel .threads=${makeThreads()} show-thread-rename></forge-ai-conversations-panel>`);
    }

    async function startRename(el: AiConversationsPanelComponent, id = '1'): Promise<HTMLElement> {
      fireMenu(actionsMenu(el), 'rename', id);
      await el.updateComplete;
      return root(el).querySelector<HTMLElement>('forge-ai-edit-thread')!;
    }

    it('should show the inline editor with the current title', async () => {
      const el = await createRenameElement();

      const edit = await startRename(el);

      expect(edit).toBeTruthy();
      expect((edit as unknown as { value: string }).value).toBe('Alpha plan');
    });

    it('should hide the editor on cancel', async () => {
      const el = await createRenameElement();
      const edit = await startRename(el);

      edit.dispatchEvent(new CustomEvent('forge-ai-edit-thread-cancel', { bubbles: true, composed: true }));
      await el.updateComplete;

      expect(root(el).querySelector('forge-ai-edit-thread')).toBeNull();
    });

    it('should optimistically rename and dispatch a cancelable rename event', async () => {
      const el = await createRenameElement();
      const listener = vi.fn<(event: CustomEvent<ForgeAiConversationsPanelRenameEventData>) => void>();
      el.addEventListener('forge-ai-conversations-panel-rename', listener);
      const edit = await startRename(el);

      edit.dispatchEvent(saveEvent('1', 'Alpha plan', 'Renamed'));
      await el.updateComplete;

      const event = listener.mock.calls[0][0];
      expect(event.detail).toMatchObject({ id: '1', oldTitle: 'Alpha plan', newTitle: 'Renamed' });
      expect(event.cancelable).toBe(true);
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
      expect(titles(el)[0]).toBe('Renamed');
      expect(root(el).querySelector('forge-ai-edit-thread')).toBeNull();
    });

    it('should keep the old title until onSuccess when the rename event is prevented', async () => {
      const el = await createRenameElement();
      let detail!: ForgeAiConversationsPanelRenameEventData;
      el.addEventListener('forge-ai-conversations-panel-rename', e => {
        e.preventDefault();
        detail = e.detail;
      });
      const edit = await startRename(el);
      edit.dispatchEvent(saveEvent('1', 'Alpha plan', 'Renamed'));
      await el.updateComplete;
      expect(titles(el)[0]).toBe('Alpha plan');

      detail.onSuccess();
      await el.updateComplete;

      expect(titles(el)[0]).toBe('Renamed');
    });

    it('should revert the title and log when onError is called with a message', async () => {
      const el = await createRenameElement();
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
      let detail!: ForgeAiConversationsPanelRenameEventData;
      el.addEventListener('forge-ai-conversations-panel-rename', e => {
        detail = e.detail;
      });
      const edit = await startRename(el);
      edit.dispatchEvent(saveEvent('1', 'Alpha plan', 'Renamed'));
      await el.updateComplete;

      detail.onError('nope');
      await el.updateComplete;

      expect(titles(el)[0]).toBe('Alpha plan');
      expect(consoleError).toHaveBeenCalledWith('Rename failed:', 'nope');
      consoleError.mockRestore();
    });

    it('should revert quietly when onError is called without a message', async () => {
      const el = await createRenameElement();
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
      let detail!: ForgeAiConversationsPanelRenameEventData;
      el.addEventListener('forge-ai-conversations-panel-rename', e => {
        detail = e.detail;
      });
      const edit = await startRename(el);
      edit.dispatchEvent(saveEvent('1', 'Alpha plan', 'Renamed'));
      await el.updateComplete;

      detail.onError();
      await el.updateComplete;

      expect(titles(el)[0]).toBe('Alpha plan');
      expect(consoleError).not.toHaveBeenCalled();
      consoleError.mockRestore();
    });

    it('should ignore a save for an unknown thread', async () => {
      const el = await createRenameElement();
      const listener = vi.fn();
      el.addEventListener('forge-ai-conversations-panel-rename', listener);
      const edit = await startRename(el);

      edit.dispatchEvent(saveEvent('missing', 'x', 'y'));

      expect(listener).not.toHaveBeenCalled();
    });

    it('should add the menu-open class while a thread menu is open', async () => {
      const el = await createRenameElement();

      fireMenu(actionsMenu(el, 1), 'open', '2');
      await el.updateComplete;
      const items = Array.from(root(el).querySelectorAll<HTMLElement>('.thread-list-container .forge-list-item'));
      expect(items[1].classList.contains('forge-list-item--menu-open')).toBe(true);

      fireMenu(actionsMenu(el, 1), 'close', '2');
      await el.updateComplete;
      expect(items[1].classList.contains('forge-list-item--menu-open')).toBe(false);
    });
  });

  describe('delete', () => {
    function createDeleteElement(): Promise<AiConversationsPanelComponent> {
      return createElement(html`<forge-ai-conversations-panel .threads=${makeThreads()} show-thread-delete></forge-ai-conversations-panel>`);
    }

    function confirmButton(el: AiConversationsPanelComponent): HTMLButtonElement {
      return root(el).querySelector<HTMLButtonElement>('button[aria-label="Confirm deletion"]')!;
    }

    async function startDelete(el: AiConversationsPanelComponent, id = '1'): Promise<void> {
      fireMenu(actionsMenu(el), 'delete-click', id);
      await settle(el);
    }

    it('should show the built-in confirmation modal when delete is chosen', async () => {
      const el = await createDeleteElement();

      await startDelete(el);

      expect(root(el).querySelector('forge-ai-modal')).toBeTruthy();
      expect(root(el).querySelector('.delete-confirmation__text')!.textContent).toContain('Alpha plan');
    });

    it('should ignore delete for an unknown thread', async () => {
      const el = await createDeleteElement();

      await startDelete(el, 'missing');

      expect(root(el).querySelector('forge-ai-modal')).toBeNull();
    });

    it('should dispatch a cancelable delete event and optimistically hide the thread when confirmed', async () => {
      const el = await createDeleteElement();
      const listener = vi.fn<(event: CustomEvent<ForgeAiConversationsPanelDeleteEventData>) => void>();
      el.addEventListener('forge-ai-conversations-panel-delete', listener);
      await startDelete(el);

      confirmButton(el).click();
      await settle(el);

      const event = listener.mock.calls[0][0];
      expect(event.detail.id).toBe('1');
      expect(event.detail.thread.title).toBe('Alpha plan');
      expect(event.cancelable).toBe(true);
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
      expect(titles(el)).toEqual(['Beta report', 'Gamma alpha']);
      expect(root(el).querySelector('forge-ai-modal')).toBeNull();
    });

    it('should not dispatch delete when cancelled', async () => {
      const el = await createDeleteElement();
      const listener = vi.fn();
      el.addEventListener('forge-ai-conversations-panel-delete', listener);
      await startDelete(el);

      root(el).querySelector<HTMLButtonElement>('button[aria-label="Cancel deletion"]')!.click();
      await settle(el);

      expect(listener).not.toHaveBeenCalled();
      expect(titles(el)).toHaveLength(3);
    });

    it('should keep the thread until onSuccess when the delete event is prevented', async () => {
      const el = await createDeleteElement();
      let detail!: ForgeAiConversationsPanelDeleteEventData;
      el.addEventListener('forge-ai-conversations-panel-delete', e => {
        e.preventDefault();
        detail = e.detail;
      });
      await startDelete(el);
      confirmButton(el).click();
      await settle(el);
      expect(titles(el)).toHaveLength(3);

      detail.onSuccess();
      await el.updateComplete;

      expect(titles(el)).toEqual(['Beta report', 'Gamma alpha']);
    });

    it('should restore the thread and log when onError is called with a message', async () => {
      const el = await createDeleteElement();
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
      let detail!: ForgeAiConversationsPanelDeleteEventData;
      el.addEventListener('forge-ai-conversations-panel-delete', e => {
        detail = e.detail;
      });
      await startDelete(el);
      confirmButton(el).click();
      await settle(el);
      expect(titles(el)).toHaveLength(2);

      detail.onError('boom');
      await el.updateComplete;

      expect(titles(el)).toHaveLength(3);
      expect(consoleError).toHaveBeenCalledWith('Delete failed:', 'boom');
      consoleError.mockRestore();
    });

    it('should restore the thread quietly when onError is called without a message', async () => {
      const el = await createDeleteElement();
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
      let detail!: ForgeAiConversationsPanelDeleteEventData;
      el.addEventListener('forge-ai-conversations-panel-delete', e => {
        detail = e.detail;
      });
      await startDelete(el);
      confirmButton(el).click();
      await settle(el);

      detail.onError();
      await el.updateComplete;

      expect(titles(el)).toHaveLength(3);
      expect(consoleError).not.toHaveBeenCalled();
      consoleError.mockRestore();
    });
  });

  describe('pagination', () => {
    function createPagedElement(): Promise<AiConversationsPanelComponent> {
      return createElement(html`<forge-ai-conversations-panel .threads=${makeThreads()} total-chats="10"></forge-ai-conversations-panel>`);
    }

    it('should not request more on scroll when totalChats is not set', async () => {
      const el = await createElement();
      const listener = vi.fn();
      el.addEventListener('forge-ai-conversations-panel-load-more', listener);

      triggerScroll(root(el).querySelector<HTMLElement>('.thread-list-container')!, 790);

      expect(listener).not.toHaveBeenCalled();
    });

    it('should not request more on scroll when all chats are loaded', async () => {
      const el = await createElement(html`<forge-ai-conversations-panel .threads=${makeThreads()} total-chats="3"></forge-ai-conversations-panel>`);
      const listener = vi.fn();
      el.addEventListener('forge-ai-conversations-panel-load-more', listener);

      triggerScroll(root(el).querySelector<HTMLElement>('.thread-list-container')!, 790);

      expect(listener).not.toHaveBeenCalled();
    });

    it('should dispatch load-more with an empty query and append results when scrolled near the bottom', async () => {
      const el = await createPagedElement();
      const listener = vi.fn<(event: CustomEvent<ForgeAiConversationsPanelLoadMoreEventData>) => void>();
      el.addEventListener('forge-ai-conversations-panel-load-more', listener);

      triggerScroll(root(el).querySelector<HTMLElement>('.thread-list-container')!, 790);
      await el.updateComplete;

      expect(listener).toHaveBeenCalledTimes(1);
      const event = listener.mock.calls[0][0];
      expect(event.detail.query).toBe('');
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
      expect(root(el).querySelector('.loading-more-indicator forge-ai-spinner')).toBeTruthy();

      event.detail.appendResults([{ id: '4', title: 'Delta', createdAt: '2024-01-04T00:00:00Z' }]);
      await el.updateComplete;

      expect(titles(el)).toEqual(['Alpha plan', 'Beta report', 'Gamma alpha', 'Delta']);
      expect(root(el).querySelector('.loading-more-indicator')).toBeNull();
    });

    it('should stop requesting once appendResults is called with no results', async () => {
      const el = await createPagedElement();
      const listener = vi.fn<(event: CustomEvent<ForgeAiConversationsPanelLoadMoreEventData>) => void>();
      el.addEventListener('forge-ai-conversations-panel-load-more', listener);
      const container = root(el).querySelector<HTMLElement>('.thread-list-container')!;
      triggerScroll(container, 790);
      listener.mock.calls[0][0].detail.appendResults([]);
      await el.updateComplete;

      triggerScroll(container, 795);

      expect(listener).toHaveBeenCalledTimes(1);
      expect(root(el).querySelector('.loading-more-indicator')).toBeNull();
    });

    it('should send the query and append to search results when paginating in the search view', async () => {
      const el = await createPagedElement();
      await openSearch(el);
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      try {
        el.addEventListener('forge-ai-conversations-panel-search', e => {
          e.preventDefault();
          e.detail.setResults([{ id: 's1', title: 'Search hit', createdAt: '2024-01-01T00:00:00Z' }]);
        });
        typeSearch(el, 'hit');
        vi.advanceTimersByTime(300);
      } finally {
        vi.useRealTimers();
      }
      await el.updateComplete;
      const listener = vi.fn<(event: CustomEvent<ForgeAiConversationsPanelLoadMoreEventData>) => void>();
      el.addEventListener('forge-ai-conversations-panel-load-more', listener);

      triggerScroll(root(el).querySelector<HTMLElement>('.thread-list-container')!, 790);
      await el.updateComplete;

      expect(listener.mock.calls[0][0].detail.query).toBe('hit');
      listener.mock.calls[0][0].detail.appendResults([{ id: 's2', title: 'Another hit', createdAt: '2024-01-01T00:00:00Z' }]);
      await el.updateComplete;
      expect(titles(el)).toEqual(['Search hit', 'Another hit']);
    });

    it('should show a compact error in the list footer when a page load is in flight', async () => {
      const el = await createPagedElement();
      triggerScroll(root(el).querySelector<HTMLElement>('.thread-list-container')!, 790);
      await el.updateComplete;

      el.errorMessage = 'Page failed';
      await el.updateComplete;

      const compact = root(el).querySelector('.compact-error')!;
      expect(compact.textContent).toContain('Page failed');
      expect(root(el).querySelector('.thread-list-container')!.contains(compact)).toBe(true);
    });
  });
});
