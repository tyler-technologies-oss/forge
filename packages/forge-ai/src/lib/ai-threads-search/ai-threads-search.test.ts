import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { renderFixture } from '../../testing/fixture.js';
import { settle } from '../../testing/settle.js';
import type { Thread } from '../types/index.js';
import {
  AiThreadsSearchComponent,
  AiThreadsSearchComponentTagName,
  type ForgeAiThreadsSearchDeleteConfirmEventData,
  type ForgeAiThreadsSearchDeleteEventData,
  type ForgeAiThreadsSearchLoadMoreEventData,
  type ForgeAiThreadsSearchQueryEventData,
  type ForgeAiThreadsSearchRenameEventData,
  type ForgeAiThreadsSearchSelectEventData
} from './index.js';

const TAG = 'forge-ai-threads-search';
const now = Date.now();
const iso = (offsetMs: number): string => new Date(now - offsetMs).toISOString();

function makeThreads(): Thread[] {
  return [
    { id: '1', title: 'Alpha plan', createdAt: iso(30_000) },
    { id: '2', title: 'Beta report', createdAt: iso(2 * 3_600_000) },
    { id: '3', title: 'Gamma alpha', createdAt: iso(30 * 3_600_000) }
  ];
}

function createElement(template = html`<forge-ai-threads-search .threads=${makeThreads()}></forge-ai-threads-search>`): Promise<AiThreadsSearchComponent> {
  return renderFixture<AiThreadsSearchComponent>(template, TAG);
}

function root(el: AiThreadsSearchComponent): ShadowRoot {
  return el.shadowRoot!;
}

function rows(el: AiThreadsSearchComponent): HTMLElement[] {
  return Array.from(root(el).querySelectorAll<HTMLElement>('.forge-list-item'));
}

function rowTitles(el: AiThreadsSearchComponent): string[] {
  return rows(el).map(row => row.querySelector('button')!.textContent!.trim());
}

function buttonByText(scope: ParentNode, text: string): HTMLButtonElement {
  return Array.from(scope.querySelectorAll<HTMLButtonElement>('button')).find(b => b.textContent!.trim() === text)!;
}

function searchInput(el: AiThreadsSearchComponent): HTMLInputElement {
  return root(el).querySelector<HTMLInputElement>('#threads-search-input')!;
}

function typeSearch(el: AiThreadsSearchComponent, value: string): void {
  const input = searchInput(el);
  input.value = value;
  input.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
}

function actionsMenu(el: AiThreadsSearchComponent, index = 0): HTMLElement {
  return root(el).querySelectorAll<HTMLElement>('forge-ai-thread-actions-menu')[index];
}

function fireMenu(menu: HTMLElement, name: 'rename' | 'delete-click' | 'open' | 'close', id: string): void {
  menu.dispatchEvent(new CustomEvent(`forge-ai-thread-actions-menu-${name}`, { detail: { id }, bubbles: true, composed: true }));
}

function setScrollMetrics(container: HTMLElement, metrics: { scrollHeight: number; clientHeight: number }): void {
  Object.defineProperty(container, 'scrollHeight', { value: metrics.scrollHeight, configurable: true });
  Object.defineProperty(container, 'clientHeight', { value: metrics.clientHeight, configurable: true });
}

describe('AiThreadsSearchComponent', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('registration', () => {
    it('should be registered under the forge-ai-threads-search tag', async () => {
      const el = await createElement();

      expect(AiThreadsSearchComponentTagName).toBe(TAG);
      expect(customElements.get(TAG)).toBe(AiThreadsSearchComponent);
      expect(el).toBeInstanceOf(AiThreadsSearchComponent);
      expect(el.shadowRoot).toBeTruthy();
    });
  });

  describe('properties', () => {
    it('should have the expected defaults', async () => {
      const el = await createElement(html`<forge-ai-threads-search></forge-ai-threads-search>`);

      expect(el.threads).toEqual([]);
      expect(el.headerTitle).toBe('All chats');
      expect(el.showNewChatButton).toBe(true);
      expect(el.showBackButton).toBe(false);
      expect(el.showSearch).toBe(true);
      expect(el.totalChats).toBe(0);
      expect(el.placeholder).toBe('Find a chat');
      expect(el.errorMessage).toBeUndefined();
      expect(el.showThreadRename).toBe(false);
      expect(el.showThreadDelete).toBe(false);
      expect(el.selectedThreadId).toBeNull();
    });

    it('should render the thread titles', async () => {
      const el = await createElement();

      expect(rowTitles(el)).toEqual(['Alpha plan', 'Beta report', 'Gamma alpha']);
    });

    it('should render relative times for each thread', async () => {
      const el = await createElement();

      const times = Array.from(root(el).querySelectorAll('.thread-time')).map(t => t.textContent);
      expect(times).toEqual(['Just now', '2h ago', 'Yesterday']);
    });

    it('should render the header title from the header-title attribute', async () => {
      const el = await createElement(html`<forge-ai-threads-search header-title="History"></forge-ai-threads-search>`);

      expect(el.headerTitle).toBe('History');
      expect(root(el).querySelector('.title')!.textContent).toBe('History');
    });

    it('should hide the new chat button when show-new-chat-button is false', async () => {
      const el = await createElement(html`<forge-ai-threads-search .showNewChatButton=${false}></forge-ai-threads-search>`);

      expect(root(el).querySelector('.new-chat-button')).toBeNull();
    });

    it('should show a back button when show-back-button is set', async () => {
      const el = await createElement(html`<forge-ai-threads-search show-back-button></forge-ai-threads-search>`);

      expect(el.showBackButton).toBe(true);
      expect(root(el).querySelector('button[aria-label="Back"]')).toBeTruthy();
    });

    it('should hide the back button by default', async () => {
      const el = await createElement();

      expect(root(el).querySelector('button[aria-label="Back"]')).toBeNull();
    });

    it('should hide the search field when showSearch is false', async () => {
      const el = await createElement(html`<forge-ai-threads-search .showSearch=${false}></forge-ai-threads-search>`);

      expect(searchInput(el)).toBeNull();
    });

    it('should render the search field with a label and the placeholder', async () => {
      const el = await createElement(html`<forge-ai-threads-search placeholder="Look up"></forge-ai-threads-search>`);

      expect(searchInput(el).getAttribute('aria-label')).toBe('Search');
      expect(searchInput(el).placeholder).toBe('Look up');
    });

    it('should mark the selected thread', async () => {
      const el = await createElement(html`<forge-ai-threads-search .threads=${makeThreads()} selected-thread-id="2"></forge-ai-threads-search>`);

      const [first, second] = rows(el);
      expect(second.classList.contains('forge-list-item--selected')).toBe(true);
      expect(second.querySelector('button')!.getAttribute('aria-current')).toBe('true');
      expect(first.classList.contains('forge-list-item--selected')).toBe(false);
      expect(first.querySelector('button')!.hasAttribute('aria-current')).toBe(false);
    });

    it('should project the header-actions slot', async () => {
      const el = await createElement(html`<forge-ai-threads-search><button slot="header-actions" id="va">View all</button></forge-ai-threads-search>`);

      const slot = root(el).querySelector<HTMLSlotElement>('slot[name="header-actions"]')!;
      expect(slot.assignedElements()).toEqual([el.querySelector('#va')]);
    });

    it('should show the empty state when there are no threads', async () => {
      const el = await createElement(html`<forge-ai-threads-search></forge-ai-threads-search>`);

      expect(root(el).querySelector('.empty-state')!.textContent).toContain('No chats yet');
    });

    it('should show the actions menu only when rename or delete is enabled', async () => {
      const none = await createElement();
      const rename = await createElement(html`<forge-ai-threads-search .threads=${makeThreads()} show-thread-rename></forge-ai-threads-search>`);
      const del = await createElement(html`<forge-ai-threads-search .threads=${makeThreads()} show-thread-delete></forge-ai-threads-search>`);

      expect(none.shadowRoot!.querySelector('forge-ai-thread-actions-menu')).toBeNull();
      expect(actionsMenu(rename)).toBeTruthy();
      expect(actionsMenu(del)).toBeTruthy();
    });
  });

  describe('events', () => {
    it('should dispatch select with id and title when a thread is clicked', async () => {
      const el = await createElement();
      const listener = vi.fn<(event: CustomEvent<ForgeAiThreadsSearchSelectEventData>) => void>();
      el.addEventListener('forge-ai-threads-search-select', listener);

      await userEvent.click(rows(el)[1].querySelector('button')!);

      expect(listener).toHaveBeenCalledTimes(1);
      const event = listener.mock.calls[0][0];
      expect(event.detail).toEqual({ id: '2', title: 'Beta report' });
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
    });

    it('should dispatch new-chat when the new chat button is clicked', async () => {
      const el = await createElement();
      const listener = vi.fn<(event: Event) => void>();
      el.addEventListener('forge-ai-threads-search-new-chat', listener);

      await userEvent.click(root(el).querySelector<HTMLButtonElement>('.new-chat-button')!);

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener.mock.calls[0][0].bubbles).toBe(true);
      expect(listener.mock.calls[0][0].composed).toBe(true);
    });

    it('should dispatch back when the back button is clicked', async () => {
      const el = await createElement(html`<forge-ai-threads-search show-back-button></forge-ai-threads-search>`);
      const listener = vi.fn();
      el.addEventListener('forge-ai-threads-search-back', listener);

      await userEvent.click(root(el).querySelector<HTMLButtonElement>('button[aria-label="Back"]')!);

      expect(listener).toHaveBeenCalledTimes(1);
    });
  });

  describe('search', () => {
    beforeEach(() => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should not search until the debounce elapses', async () => {
      const el = await createElement();
      const listener = vi.fn();
      el.addEventListener('forge-ai-threads-search-query', listener);

      typeSearch(el, 'alpha');
      vi.advanceTimersByTime(299);
      expect(listener).not.toHaveBeenCalled();
      vi.advanceTimersByTime(1);

      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('should dispatch a cancelable query event with the trimmed query', async () => {
      const el = await createElement();
      const listener = vi.fn<(event: CustomEvent<ForgeAiThreadsSearchQueryEventData>) => void>();
      el.addEventListener('forge-ai-threads-search-query', listener);

      typeSearch(el, '  alpha  ');
      vi.advanceTimersByTime(300);

      const event = listener.mock.calls[0][0];
      expect(event.detail.query).toBe('alpha');
      expect(typeof event.detail.setResults).toBe('function');
      expect(event.cancelable).toBe(true);
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
    });

    it('should debounce successive input into one query event', async () => {
      const el = await createElement();
      const listener = vi.fn();
      el.addEventListener('forge-ai-threads-search-query', listener);

      typeSearch(el, 'a');
      vi.advanceTimersByTime(200);
      typeSearch(el, 'al');
      vi.advanceTimersByTime(200);
      typeSearch(el, 'alp');
      vi.advanceTimersByTime(300);

      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('should filter locally (case-insensitive) when the query event is not prevented', async () => {
      const el = await createElement();

      typeSearch(el, 'ALPHA');
      vi.advanceTimersByTime(300);
      await el.updateComplete;

      expect(rowTitles(el)).toEqual(['Alpha plan', 'Gamma alpha']);
    });

    it('should show a no-results state when local filtering matches nothing', async () => {
      const el = await createElement();

      typeSearch(el, 'zzz');
      vi.advanceTimersByTime(300);
      await el.updateComplete;

      expect(root(el).querySelector('.empty-state')!.textContent).toContain('No chats found');
    });

    it('should show a spinner and wait for setResults when the query event is prevented', async () => {
      const el = await createElement();
      let setResults!: (results: Thread[]) => void;
      el.addEventListener('forge-ai-threads-search-query', e => {
        e.preventDefault();
        setResults = e.detail.setResults;
      });

      typeSearch(el, 'remote');
      vi.advanceTimersByTime(300);
      await el.updateComplete;
      expect(root(el).querySelector('forge-ai-spinner')).toBeTruthy();

      setResults([{ id: 'r1', title: 'Remote hit', createdAt: iso(1000) }]);
      await el.updateComplete;

      expect(root(el).querySelector('forge-ai-spinner')).toBeNull();
      expect(rowTitles(el)).toEqual(['Remote hit']);
    });

    it('should show a clear button once there is a query and clear the search when clicked', async () => {
      const el = await createElement();
      expect(root(el).querySelector('button[aria-label="Clear search"]')).toBeNull();
      typeSearch(el, 'alpha');
      vi.advanceTimersByTime(300);
      await el.updateComplete;

      root(el).querySelector<HTMLButtonElement>('button[aria-label="Clear search"]')!.click();
      await el.updateComplete;

      expect(searchInput(el).value).toBe('');
      expect(rowTitles(el)).toHaveLength(3);
      expect(root(el).querySelector('button[aria-label="Clear search"]')).toBeNull();
      expect(root(el).activeElement).toBe(searchInput(el));
    });

    it('should cancel a pending search when resetSearch is called', async () => {
      const el = await createElement();
      const listener = vi.fn();
      el.addEventListener('forge-ai-threads-search-query', listener);

      typeSearch(el, 'alpha');
      el.resetSearch();
      vi.advanceTimersByTime(500);
      await el.updateComplete;

      expect(listener).not.toHaveBeenCalled();
    });

    it('should show every loaded chat again after resetSearch without dispatching a query', async () => {
      const el = await createElement();
      const listener = vi.fn();
      typeSearch(el, 'alpha');
      vi.advanceTimersByTime(300);
      await el.updateComplete;
      el.addEventListener('forge-ai-threads-search-query', listener);

      el.resetSearch();
      await el.updateComplete;

      expect(rowTitles(el)).toHaveLength(3);
      expect(listener).not.toHaveBeenCalled();
    });

    it('should clear the searching spinner on resetSearch', async () => {
      const el = await createElement();
      el.addEventListener('forge-ai-threads-search-query', e => e.preventDefault());
      typeSearch(el, 'remote');
      vi.advanceTimersByTime(300);
      await el.updateComplete;

      el.resetSearch();
      await el.updateComplete;

      expect(root(el).querySelector('forge-ai-spinner')).toBeNull();
    });

    it('should not fire a search after being disconnected', async () => {
      const el = await createElement();
      const listener = vi.fn();
      el.addEventListener('forge-ai-threads-search-query', listener);

      typeSearch(el, 'alpha');
      el.remove();
      vi.advanceTimersByTime(500);

      expect(listener).not.toHaveBeenCalled();
    });
  });

  describe('focus()', () => {
    it('should focus the search input when search is shown', async () => {
      const el = await createElement();

      el.focus();

      expect(root(el).activeElement).toBe(searchInput(el));
    });

    it('should focus the first chat when search is hidden', async () => {
      const el = await createElement(html`<forge-ai-threads-search .threads=${makeThreads()} .showSearch=${false}></forge-ai-threads-search>`);

      el.focus();

      expect(root(el).activeElement).toBe(rows(el)[0].querySelector('button'));
    });

    it('should focus the first header button when there is no search and no chats', async () => {
      const el = await createElement(html`<forge-ai-threads-search .showSearch=${false}></forge-ai-threads-search>`);

      el.focus();

      expect(root(el).activeElement).toBe(root(el).querySelector('.new-chat-button'));
    });
  });

  describe('error state', () => {
    it('should show a full error banner with retry when no threads are loaded', async () => {
      const el = await createElement(html`<forge-ai-threads-search error-message="Could not load"></forge-ai-threads-search>`);

      expect(el.errorMessage).toBe('Could not load');
      expect(root(el).querySelector('.error-state__message')!.textContent).toBe('Could not load');
      expect(root(el).querySelector('.empty-state')).toBeNull();
      expect(buttonByText(root(el), 'Retry')).toBeTruthy();
      expect(root(el).querySelector('.compact-error')).toBeNull();
    });

    it('should show a compact error above the list when threads are present', async () => {
      const el = await createElement(html`<forge-ai-threads-search .threads=${makeThreads()} error-message="Oops"></forge-ai-threads-search>`);

      const compact = root(el).querySelector('.compact-error')!;
      expect(compact.textContent).toContain('Oops');
      expect(root(el).querySelector('.error-state')).toBeNull();
      expect(rowTitles(el)).toHaveLength(3);
      const container = root(el).querySelector('.threads-search-container')!;
      const children = Array.from(container.children);
      expect(children.indexOf(compact)).toBeLessThan(children.indexOf(root(el).querySelector('.results-container')!));
    });

    it('should dispatch retry when the retry button is clicked', async () => {
      const el = await createElement(html`<forge-ai-threads-search error-message="Could not load"></forge-ai-threads-search>`);
      const listener = vi.fn<(event: Event) => void>();
      el.addEventListener('forge-ai-threads-search-retry', listener);

      await userEvent.click(buttonByText(root(el), 'Retry'));

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener.mock.calls[0][0].bubbles).toBe(true);
      expect(listener.mock.calls[0][0].composed).toBe(true);
    });

    it('should re-run the search instead of dispatching retry when there is a query', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      try {
        const el = await createElement(html`<forge-ai-threads-search .threads=${makeThreads()} error-message="Failed"></forge-ai-threads-search>`);
        const retry = vi.fn();
        const query = vi.fn();
        el.addEventListener('forge-ai-threads-search-retry', retry);
        typeSearch(el, 'zzz');
        vi.advanceTimersByTime(300);
        await el.updateComplete;
        el.addEventListener('forge-ai-threads-search-query', query);

        buttonByText(root(el), 'Retry').click();

        expect(retry).not.toHaveBeenCalled();
        expect(query).toHaveBeenCalledTimes(1);
      } finally {
        vi.useRealTimers();
      }
    });

    it('should remove the error when errorMessage is cleared', async () => {
      const el = await createElement(html`<forge-ai-threads-search .threads=${makeThreads()} error-message="Oops"></forge-ai-threads-search>`);

      el.errorMessage = undefined;
      await el.updateComplete;

      expect(root(el).querySelector('.compact-error')).toBeNull();
    });
  });

  describe('rename', () => {
    async function startRename(el: AiThreadsSearchComponent, index = 0): Promise<HTMLElement> {
      const id = String(index + 1);
      fireMenu(actionsMenu(el, index), 'rename', id);
      await el.updateComplete;
      return root(el).querySelector<HTMLElement>('forge-ai-edit-thread')!;
    }

    function createRenameElement(): Promise<AiThreadsSearchComponent> {
      return createElement(html`<forge-ai-threads-search .threads=${makeThreads()} show-thread-rename></forge-ai-threads-search>`);
    }

    it('should show the inline editor when rename is chosen', async () => {
      const el = await createRenameElement();

      const edit = await startRename(el);

      expect(edit).toBeTruthy();
      expect(root(el).querySelectorAll('forge-ai-edit-thread')).toHaveLength(1);
      expect((edit as unknown as { value: string }).value).toBe('Alpha plan');
    });

    it('should hide the editor again on cancel', async () => {
      const el = await createRenameElement();
      const edit = await startRename(el);

      edit.dispatchEvent(new CustomEvent('forge-ai-edit-thread-cancel', { bubbles: true, composed: true }));
      await el.updateComplete;

      expect(root(el).querySelector('forge-ai-edit-thread')).toBeNull();
    });

    it('should optimistically rename and dispatch a cancelable rename event', async () => {
      const el = await createRenameElement();
      const listener = vi.fn<(event: CustomEvent<ForgeAiThreadsSearchRenameEventData>) => void>();
      el.addEventListener('forge-ai-threads-search-rename', listener);
      const edit = await startRename(el);

      edit.dispatchEvent(
        new CustomEvent('forge-ai-edit-thread-save', { detail: { id: '1', oldTitle: 'Alpha plan', newTitle: 'Renamed' }, bubbles: true, composed: true })
      );
      await el.updateComplete;

      const event = listener.mock.calls[0][0];
      expect(event.detail).toMatchObject({ id: '1', oldTitle: 'Alpha plan', newTitle: 'Renamed' });
      expect(event.cancelable).toBe(true);
      expect(rowTitles(el)[0]).toBe('Renamed');
      expect(root(el).querySelector('forge-ai-edit-thread')).toBeNull();
    });

    it('should leave the title unchanged until onSuccess when the rename event is prevented', async () => {
      const el = await createRenameElement();
      let detail!: ForgeAiThreadsSearchRenameEventData;
      el.addEventListener('forge-ai-threads-search-rename', e => {
        e.preventDefault();
        detail = e.detail;
      });
      const edit = await startRename(el);
      edit.dispatchEvent(
        new CustomEvent('forge-ai-edit-thread-save', { detail: { id: '1', oldTitle: 'Alpha plan', newTitle: 'Renamed' }, bubbles: true, composed: true })
      );
      await el.updateComplete;
      expect(rowTitles(el)[0]).toBe('Alpha plan');

      detail.onSuccess();
      await el.updateComplete;

      expect(rowTitles(el)[0]).toBe('Renamed');
    });

    it('should revert the title and log when onError is called with a message', async () => {
      const el = await createRenameElement();
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
      let detail!: ForgeAiThreadsSearchRenameEventData;
      el.addEventListener('forge-ai-threads-search-rename', e => {
        detail = e.detail;
      });
      const edit = await startRename(el);
      edit.dispatchEvent(
        new CustomEvent('forge-ai-edit-thread-save', { detail: { id: '1', oldTitle: 'Alpha plan', newTitle: 'Renamed' }, bubbles: true, composed: true })
      );
      await el.updateComplete;
      expect(rowTitles(el)[0]).toBe('Renamed');

      detail.onError('nope');
      await el.updateComplete;

      expect(rowTitles(el)[0]).toBe('Alpha plan');
      expect(consoleError).toHaveBeenCalledWith('Rename failed:', 'nope');
      consoleError.mockRestore();
    });

    it('should revert quietly when onError is called without a message', async () => {
      const el = await createRenameElement();
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
      let detail!: ForgeAiThreadsSearchRenameEventData;
      el.addEventListener('forge-ai-threads-search-rename', e => {
        detail = e.detail;
      });
      const edit = await startRename(el);
      edit.dispatchEvent(
        new CustomEvent('forge-ai-edit-thread-save', { detail: { id: '1', oldTitle: 'Alpha plan', newTitle: 'Renamed' }, bubbles: true, composed: true })
      );
      await el.updateComplete;

      detail.onError();
      await el.updateComplete;

      expect(consoleError).not.toHaveBeenCalled();
      expect(rowTitles(el)[0]).toBe('Alpha plan');
      consoleError.mockRestore();
    });

    it('should ignore a save for an unknown thread', async () => {
      const el = await createRenameElement();
      const listener = vi.fn();
      el.addEventListener('forge-ai-threads-search-rename', listener);
      const edit = await startRename(el);

      edit.dispatchEvent(
        new CustomEvent('forge-ai-edit-thread-save', { detail: { id: 'missing', oldTitle: 'x', newTitle: 'y' }, bubbles: true, composed: true })
      );

      expect(listener).not.toHaveBeenCalled();
    });

    it('should add the menu-open class while a thread menu is open', async () => {
      const el = await createRenameElement();

      fireMenu(actionsMenu(el, 1), 'open', '2');
      await el.updateComplete;
      expect(rows(el)[1].classList.contains('forge-list-item--menu-open')).toBe(true);
      expect(rows(el)[0].classList.contains('forge-list-item--menu-open')).toBe(false);

      fireMenu(actionsMenu(el, 1), 'close', '2');
      await el.updateComplete;
      expect(rows(el)[1].classList.contains('forge-list-item--menu-open')).toBe(false);
    });
  });

  describe('delete', () => {
    function createDeleteElement(): Promise<AiThreadsSearchComponent> {
      return createElement(html`<forge-ai-threads-search .threads=${makeThreads()} show-thread-delete></forge-ai-threads-search>`);
    }

    function confirmButton(el: AiThreadsSearchComponent): HTMLButtonElement {
      return root(el).querySelector<HTMLButtonElement>('button[aria-label="Confirm deletion"]')!;
    }

    it('should dispatch a cancelable delete-confirm event with the thread and show the built-in confirmation', async () => {
      const el = await createDeleteElement();
      const listener = vi.fn<(event: CustomEvent<ForgeAiThreadsSearchDeleteConfirmEventData>) => void>();
      el.addEventListener('forge-ai-threads-search-delete-confirm', listener);

      fireMenu(actionsMenu(el), 'delete-click', '1');
      await settle(el);

      const event = listener.mock.calls[0][0];
      expect(event.detail.thread.id).toBe('1');
      expect(event.cancelable).toBe(true);
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
      expect(root(el).querySelector('forge-ai-modal')).toBeTruthy();
      expect(root(el).querySelector('.delete-confirmation__text')!.textContent).toContain('Alpha plan');
    });

    it('should not show the built-in confirmation when delete-confirm is prevented', async () => {
      const el = await createDeleteElement();
      el.addEventListener('forge-ai-threads-search-delete-confirm', e => e.preventDefault());

      fireMenu(actionsMenu(el), 'delete-click', '1');
      await settle(el);

      expect(root(el).querySelector('forge-ai-modal')).toBeNull();
    });

    it('should ignore delete for an unknown thread', async () => {
      const el = await createDeleteElement();
      const listener = vi.fn();
      el.addEventListener('forge-ai-threads-search-delete-confirm', listener);

      fireMenu(actionsMenu(el), 'delete-click', 'missing');
      await settle(el);

      expect(listener).not.toHaveBeenCalled();
    });

    it('should dispatch a cancelable delete event and optimistically hide the thread when confirmed', async () => {
      const el = await createDeleteElement();
      const listener = vi.fn<(event: CustomEvent<ForgeAiThreadsSearchDeleteEventData>) => void>();
      el.addEventListener('forge-ai-threads-search-delete', listener);
      fireMenu(actionsMenu(el), 'delete-click', '1');
      await settle(el);

      confirmButton(el).click();
      await settle(el);

      const event = listener.mock.calls[0][0];
      expect(event.detail.id).toBe('1');
      expect(event.detail.thread.title).toBe('Alpha plan');
      expect(event.cancelable).toBe(true);
      expect(rowTitles(el)).toEqual(['Beta report', 'Gamma alpha']);
      expect(root(el).querySelector('forge-ai-modal')).toBeNull();
    });

    it('should not dispatch delete or hide the thread when cancelled', async () => {
      const el = await createDeleteElement();
      const listener = vi.fn();
      el.addEventListener('forge-ai-threads-search-delete', listener);
      fireMenu(actionsMenu(el), 'delete-click', '1');
      await settle(el);

      root(el).querySelector<HTMLButtonElement>('button[aria-label="Cancel deletion"]')!.click();
      await settle(el);

      expect(listener).not.toHaveBeenCalled();
      expect(rowTitles(el)).toHaveLength(3);
    });

    it('should keep the thread until onSuccess when the delete event is prevented', async () => {
      const el = await createDeleteElement();
      let detail!: ForgeAiThreadsSearchDeleteEventData;
      el.addEventListener('forge-ai-threads-search-delete', e => {
        e.preventDefault();
        detail = e.detail;
      });
      fireMenu(actionsMenu(el), 'delete-click', '1');
      await settle(el);
      confirmButton(el).click();
      await settle(el);
      expect(rowTitles(el)).toHaveLength(3);

      detail.onSuccess();
      await el.updateComplete;

      expect(rowTitles(el)).toEqual(['Beta report', 'Gamma alpha']);
    });

    it('should restore the thread and log when onError is called with a message', async () => {
      const el = await createDeleteElement();
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
      let detail!: ForgeAiThreadsSearchDeleteEventData;
      el.addEventListener('forge-ai-threads-search-delete', e => {
        detail = e.detail;
      });
      fireMenu(actionsMenu(el), 'delete-click', '1');
      await settle(el);
      confirmButton(el).click();
      await settle(el);
      expect(rowTitles(el)).toHaveLength(2);

      detail.onError('boom');
      await el.updateComplete;

      expect(rowTitles(el)).toHaveLength(3);
      expect(consoleError).toHaveBeenCalledWith('Delete failed:', 'boom');
      consoleError.mockRestore();
    });

    it('should restore the thread quietly when onError is called without a message', async () => {
      const el = await createDeleteElement();
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
      let detail!: ForgeAiThreadsSearchDeleteEventData;
      el.addEventListener('forge-ai-threads-search-delete', e => {
        detail = e.detail;
      });
      fireMenu(actionsMenu(el), 'delete-click', '1');
      await settle(el);
      confirmButton(el).click();
      await settle(el);

      detail.onError();
      await el.updateComplete;

      expect(rowTitles(el)).toHaveLength(3);
      expect(consoleError).not.toHaveBeenCalled();
      consoleError.mockRestore();
    });

    it('should complete a host-confirmed delete via confirmThreadDelete', async () => {
      const el = await createDeleteElement();
      const listener = vi.fn<(event: CustomEvent<ForgeAiThreadsSearchDeleteEventData>) => void>();
      el.addEventListener('forge-ai-threads-search-delete', listener);
      el.addEventListener('forge-ai-threads-search-delete-confirm', e => e.preventDefault());
      fireMenu(actionsMenu(el), 'delete-click', '2');
      await settle(el);

      el.confirmThreadDelete(el.threads[1]);
      await el.updateComplete;

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener.mock.calls[0][0].detail.id).toBe('2');
      expect(rowTitles(el)).toEqual(['Alpha plan', 'Gamma alpha']);
    });
  });

  describe('pagination', () => {
    it('should not show load more when totalChats is not set', async () => {
      const el = await createElement();

      expect(buttonByText(root(el), 'Load more')).toBeUndefined();
    });

    it('should not show load more when all chats are loaded', async () => {
      const el = await createElement(html`<forge-ai-threads-search .threads=${makeThreads()} total-chats="3"></forge-ai-threads-search>`);

      expect(buttonByText(root(el), 'Load more')).toBeUndefined();
    });

    it('should show a load more button when fewer chats are loaded than totalChats', async () => {
      const el = await createElement(html`<forge-ai-threads-search .threads=${makeThreads()} total-chats="10"></forge-ai-threads-search>`);

      expect(el.totalChats).toBe(10);
      expect(buttonByText(root(el), 'Load more').textContent).toBe('Load more');
    });

    it('should dispatch load-more with an empty query and append results when Load more is clicked', async () => {
      const el = await createElement(html`<forge-ai-threads-search .threads=${makeThreads()} total-chats="10"></forge-ai-threads-search>`);
      const listener = vi.fn<(event: CustomEvent<ForgeAiThreadsSearchLoadMoreEventData>) => void>();
      el.addEventListener('forge-ai-threads-search-load-more', listener);

      buttonByText(root(el), 'Load more').click();
      await el.updateComplete;

      const event = listener.mock.calls[0][0];
      expect(event.detail.query).toBe('');
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
      expect(root(el).querySelector('.loading-more-indicator forge-ai-spinner')).toBeTruthy();
      expect(buttonByText(root(el), 'Load more')).toBeUndefined();

      event.detail.appendResults([{ id: '4', title: 'Delta', createdAt: iso(1000) }]);
      await el.updateComplete;
      await el.updateComplete;

      expect(rowTitles(el)).toEqual(['Alpha plan', 'Beta report', 'Gamma alpha', 'Delta']);
      expect(root(el).querySelector('.loading-more-indicator forge-ai-spinner')).toBeNull();
    });

    it('should move focus to the first newly loaded row after clicking Load more', async () => {
      const el = await createElement(html`<forge-ai-threads-search .threads=${makeThreads()} total-chats="10"></forge-ai-threads-search>`);
      el.addEventListener('forge-ai-threads-search-load-more', e => {
        e.detail.appendResults([{ id: '4', title: 'Delta', createdAt: iso(1000) }]);
      });

      buttonByText(root(el), 'Load more').click();
      await settle(el);

      expect(root(el).activeElement).toBe(rows(el)[3].querySelector('button'));
    });

    it('should hide Load more when appendResults is called with no results', async () => {
      const el = await createElement(html`<forge-ai-threads-search .threads=${makeThreads()} total-chats="10"></forge-ai-threads-search>`);
      el.addEventListener('forge-ai-threads-search-load-more', e => e.detail.appendResults([]));

      buttonByText(root(el), 'Load more').click();
      await el.updateComplete;
      await el.updateComplete;

      expect(buttonByText(root(el), 'Load more')).toBeUndefined();
      expect(root(el).querySelector('.loading-more-indicator')).toBeNull();
    });

    it('should append to search results and send the query when searching', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      try {
        const el = await createElement(html`<forge-ai-threads-search .threads=${makeThreads()} total-chats="10"></forge-ai-threads-search>`);
        el.addEventListener('forge-ai-threads-search-query', e => {
          e.preventDefault();
          e.detail.setResults([{ id: 's1', title: 'Search hit', createdAt: iso(1000) }]);
        });
        typeSearch(el, 'hit');
        vi.advanceTimersByTime(300);
        await el.updateComplete;
        const listener = vi.fn<(event: CustomEvent<ForgeAiThreadsSearchLoadMoreEventData>) => void>();
        el.addEventListener('forge-ai-threads-search-load-more', listener);
        // searching a prevented query leaves infinite scroll reset, so Load more is available
        buttonByText(root(el), 'Load more').click();
        await el.updateComplete;

        expect(listener.mock.calls[0][0].detail.query).toBe('hit');
        listener.mock.calls[0][0].detail.appendResults([{ id: 's2', title: 'Another hit', createdAt: iso(1000) }]);
        await el.updateComplete;

        expect(rowTitles(el)).toEqual(['Search hit', 'Another hit']);
      } finally {
        vi.useRealTimers();
      }
    });

    it('should not offer more results after a client-side search even when totalChats exceeds the displayed count', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      try {
        const el = await createElement(html`<forge-ai-threads-search .threads=${makeThreads()} total-chats="10"></forge-ai-threads-search>`);
        const listener = vi.fn();
        el.addEventListener('forge-ai-threads-search-load-more', listener);

        typeSearch(el, 'alpha');
        vi.advanceTimersByTime(300);
        await el.updateComplete;

        expect(rowTitles(el)).toEqual(['Alpha plan', 'Gamma alpha']);
        expect(buttonByText(root(el), 'Load more')).toBeUndefined();
        const container = root(el).querySelector<HTMLElement>('.results-container')!;
        setScrollMetrics(container, { scrollHeight: 1000, clientHeight: 200 });
        Object.defineProperty(container, 'scrollTop', { value: 790, configurable: true });
        container.dispatchEvent(new Event('scroll'));
        vi.advanceTimersByTime(300);
        expect(listener).not.toHaveBeenCalled();
      } finally {
        vi.useRealTimers();
      }
    });

    it('should ignore a second Load more click while loading', async () => {
      const el = await createElement(html`<forge-ai-threads-search .threads=${makeThreads()} total-chats="10"></forge-ai-threads-search>`);
      const listener = vi.fn();
      el.addEventListener('forge-ai-threads-search-load-more', listener);
      const button = buttonByText(root(el), 'Load more');

      button.click();
      button.click();

      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('should request more results when scrolled near the bottom', async () => {
      const el = await createElement(
        html`<div style="height: 200px"><forge-ai-threads-search .threads=${makeThreads()} total-chats="10"></forge-ai-threads-search></div>`
      );
      const listener = vi.fn<(event: CustomEvent<ForgeAiThreadsSearchLoadMoreEventData>) => void>();
      el.addEventListener('forge-ai-threads-search-load-more', listener);
      const container = root(el).querySelector<HTMLElement>('.results-container')!;
      setScrollMetrics(container, { scrollHeight: 1000, clientHeight: 200 });
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      try {
        Object.defineProperty(container, 'scrollTop', { value: 790, configurable: true });
        container.dispatchEvent(new Event('scroll'));
        vi.advanceTimersByTime(150);
      } finally {
        vi.useRealTimers();
      }

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener.mock.calls[0][0].detail.query).toBe('');
    });

    it('should not request more on scroll when pagination is disabled', async () => {
      const el = await createElement();
      const listener = vi.fn();
      el.addEventListener('forge-ai-threads-search-load-more', listener);
      const container = root(el).querySelector<HTMLElement>('.results-container')!;
      setScrollMetrics(container, { scrollHeight: 1000, clientHeight: 200 });
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      try {
        Object.defineProperty(container, 'scrollTop', { value: 790, configurable: true });
        container.dispatchEvent(new Event('scroll'));
        vi.advanceTimersByTime(300);
      } finally {
        vi.useRealTimers();
      }

      expect(listener).not.toHaveBeenCalled();
    });

    it('should stop paginating once totalChats is satisfied', async () => {
      const el = await createElement(html`<forge-ai-threads-search .threads=${makeThreads()} total-chats="10"></forge-ai-threads-search>`);
      expect(buttonByText(root(el), 'Load more')).toBeTruthy();

      el.totalChats = 3;
      await el.updateComplete;

      expect(buttonByText(root(el), 'Load more')).toBeUndefined();
    });

    it('should show a compact error in the list footer when a page load is in flight', async () => {
      const el = await createElement(html`<forge-ai-threads-search .threads=${makeThreads()} total-chats="10"></forge-ai-threads-search>`);
      buttonByText(root(el), 'Load more').click();
      await el.updateComplete;

      el.errorMessage = 'Page failed';
      await el.updateComplete;

      const compact = root(el).querySelector('.compact-error')!;
      expect(compact.textContent).toContain('Page failed');
      expect(root(el).querySelector('.results-container')!.contains(compact)).toBe(true);
    });
  });
});
