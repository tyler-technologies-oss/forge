import { describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import { settle } from '../../testing/settle.js';
import type { AnyToolDefinition, AssistantResponse, ChatMessage, MessageItem, ToolCall } from '../types/index.js';
import {
  AiMessageThreadComponent,
  AiMessageThreadComponentTagName,
  type ForgeAiMessageThreadCopyEventData,
  type ForgeAiMessageThreadEditEventData,
  type ForgeAiMessageThreadResendEventData,
  type ForgeAiMessageThreadThumbsEventData
} from './ai-message-thread.js';

const TAG = 'forge-ai-message-thread';

function message(overrides: Partial<ChatMessage> = {}): ChatMessage {
  return { id: 'm1', role: 'user', content: 'Hello', timestamp: 1_700_000_000_000, status: 'complete', ...overrides };
}

function msgItem(overrides: Partial<ChatMessage> = {}): MessageItem {
  return { type: 'message', data: message(overrides) };
}

function assistantItem(overrides: Partial<AssistantResponse> = {}): MessageItem {
  return {
    type: 'assistant',
    data: { id: 'r1', children: [{ type: 'text', messageId: 'am1', content: 'Hi there', status: 'complete' }], status: 'complete', timestamp: 2, ...overrides }
  };
}

function toolItem(overrides: Partial<ToolCall> = {}): MessageItem {
  return { type: 'toolCall', data: { id: 'tc1', messageId: 'm1', name: 'search', args: {}, status: 'complete', type: 'client', ...overrides } };
}

interface Options {
  tools?: Map<string, AnyToolDefinition>;
  reactions?: boolean;
  thinking?: boolean;
  debug?: boolean;
  autoScroll?: string;
}

function createElement(items: MessageItem[] = [], opts: Options = {}): Promise<AiMessageThreadComponent> {
  return renderFixture<AiMessageThreadComponent>(
    html`<div style="height: 300px; width: 400px">
      <forge-ai-message-thread
        .messageItems=${items}
        .tools=${opts.tools}
        ?enable-reactions=${!!opts.reactions}
        ?show-thinking=${!!opts.thinking}
        ?debug-mode=${!!opts.debug}
        auto-scroll=${opts.autoScroll ?? 'off'}></forge-ai-message-thread>
    </div>`,
    TAG
  );
}

function container(el: AiMessageThreadComponent): HTMLElement {
  return el.shadowRoot!.querySelector<HTMLElement>('.message-thread')!;
}

function scrollButton(el: AiMessageThreadComponent): HTMLButtonElement | null {
  return el.shadowRoot!.querySelector<HTMLButtonElement>('#scroll-to-bottom-btn');
}

function manyUserItems(count: number): MessageItem[] {
  return Array.from({ length: count }, (_, i) => msgItem({ id: `m${i}`, content: `Message ${i}` }));
}

const SMOOTH_SCROLL_TIMEOUT = 5000;

const frame = (): Promise<void> => new Promise(resolve => requestAnimationFrame(() => resolve()));

describe('AiMessageThreadComponent', () => {
  it('should be registered under the forge-ai-message-thread tag', async () => {
    const el = await createElement();

    expect(AiMessageThreadComponentTagName).toBe(TAG);
    expect(customElements.get(TAG)).toBe(AiMessageThreadComponent);
    expect(el).toBeInstanceOf(AiMessageThreadComponent);
  });

  it('should contain shadow root', async () => {
    const el = await createElement();

    expect(el.shadowRoot).toBeTruthy();
  });

  describe('defaults and attributes', () => {
    it('should have the expected defaults', async () => {
      const el = await renderFixture<AiMessageThreadComponent>(html`<forge-ai-message-thread></forge-ai-message-thread>`, TAG);

      expect(el.messageItems).toEqual([]);
      expect(el.tools).toBeUndefined();
      expect(el.enableReactions).toBe(false);
      expect(el.showThinking).toBe(false);
      expect(el.debugMode).toBe(false);
      expect(el.autoScroll).toBe('on');
    });

    it('should read properties from attributes', async () => {
      const el = await createElement([], { reactions: true, thinking: true, debug: true, autoScroll: 'off' });

      expect(el.enableReactions).toBe(true);
      expect(el.showThinking).toBe(true);
      expect(el.debugMode).toBe(true);
      expect(el.autoScroll).toBe('off');
    });
  });

  describe('empty state', () => {
    it('should render the empty state with default content when there are no messages', async () => {
      const el = await createElement();

      const empty = el.shadowRoot!.querySelector('forge-ai-empty-state');

      expect(empty).toBeTruthy();
      expect(el.shadowRoot!.querySelector('slot[name="empty-state-heading"]')!.textContent).toContain('How can I help you today?');
    });

    it('should project the empty state slots', async () => {
      const el = await renderFixture<AiMessageThreadComponent>(
        html`<forge-ai-message-thread>
          <span slot="empty-state-icon">I</span>
          <span slot="empty-state-heading">H</span>
          <span slot="empty-state-message">M</span>
          <span slot="empty-state-actions">A</span>
        </forge-ai-message-thread>`,
        TAG
      );

      for (const [name, text] of [
        ['empty-state-icon', 'I'],
        ['empty-state-heading', 'H'],
        ['empty-state-message', 'M'],
        ['empty-state-actions', 'A']
      ]) {
        const slot = el.shadowRoot!.querySelector<HTMLSlotElement>(`slot[name="${name}"]`)!;
        expect(slot.assignedElements().map(n => n.textContent)).toEqual([text]);
      }
    });

    it('should remove the empty state once there are messages', async () => {
      const el = await createElement();

      el.messageItems = [msgItem()];
      await el.updateComplete;

      expect(el.shadowRoot!.querySelector('forge-ai-empty-state')).toBeNull();
    });
  });

  describe('message rendering', () => {
    it('should render user messages with markdown and metadata', async () => {
      const el = await createElement([msgItem({ id: 'u1', content: '**Hi**' })]);

      const user = el.shadowRoot!.querySelector<HTMLElement & { messageId: string; timestamp: number; content: string }>('forge-ai-user-message')!;

      expect(user.messageId).toBe('u1');
      expect(user.timestamp).toBe(1_700_000_000_000);
      expect(user.content).toBe('**Hi**');
      expect(user.querySelector('strong')!.textContent).toBe('Hi');
    });

    it('should not repair incomplete markdown links in user messages', async () => {
      const el = await createElement([msgItem({ content: 'see [text](' })]);

      expect(el.shadowRoot!.querySelector('forge-ai-user-message')!.textContent).toContain('[text](');
    });

    it('should mark user messages as streaming while thinking', async () => {
      const el = await createElement([msgItem()], { thinking: true });

      expect(el.shadowRoot!.querySelector<HTMLElement & { streaming: boolean }>('forge-ai-user-message')!.streaming).toBe(true);
    });

    it('should render system messages as client messages with their properties', async () => {
      const actions = [{ id: 'a', label: 'Retry', onClick: vi.fn() }];
      const el = await createElement([msgItem({ id: 's1', role: 'system', kind: 'warning', header: 'Heads up', content: 'Careful', actions })]);

      const client = el.shadowRoot!.querySelector<HTMLElement & { kind: string; header: string; content: string; actions: unknown }>(
        'forge-ai-client-message'
      )!;

      expect(client.kind).toBe('warning');
      expect(client.header).toBe('Heads up');
      expect(client.content).toBe('Careful');
      expect(client.actions).toBe(actions);
    });

    it('should default system message kind to text and actions to empty', async () => {
      const el = await createElement([msgItem({ role: 'system', content: 'Note' })]);

      const client = el.shadowRoot!.querySelector<HTMLElement & { kind: string; actions: unknown[] }>('forge-ai-client-message')!;

      expect(client.kind).toBe('text');
      expect(client.actions).toEqual([]);
    });

    it('should render assistant-role messages as response messages with markdown', async () => {
      const el = await createElement([msgItem({ id: 'a1', role: 'assistant', content: 'Answer **bold**' })]);

      const response = el.shadowRoot!.querySelector('forge-ai-response-message')!;

      expect(response.querySelector('strong')!.textContent).toBe('bold');
    });

    it('should skip assistant-role messages with blank content', async () => {
      const el = await createElement([msgItem({ role: 'assistant', content: '   ' })]);

      expect(el.shadowRoot!.querySelector('forge-ai-response-message')).toBeNull();
    });

    it('should render errored assistant messages in an error message with a title', async () => {
      const el = await createElement([msgItem({ role: 'assistant', status: 'error', content: 'Boom' })]);

      const error = el.shadowRoot!.querySelector('forge-ai-error-message')!;

      expect(error.querySelector('[slot="title"]')!.textContent).toBe('Error');
      expect(error.textContent).toContain('Boom');
    });

    it('should not render tool-role messages', async () => {
      const el = await createElement([msgItem({ role: 'tool', content: 'result' })]);

      expect(el.shadowRoot!.querySelector('.message-thread-content')!.querySelectorAll('forge-ai-user-message, forge-ai-response-message')).toHaveLength(0);
      expect(el.shadowRoot!.querySelector('forge-ai-empty-state')).toBeNull();
    });

    it('should treat non-string content as empty', async () => {
      const el = await createElement([msgItem({ role: 'assistant', content: undefined as unknown as string })]);

      expect(el.shadowRoot!.querySelector('forge-ai-response-message')).toBeNull();
    });

    it('should render assistant responses and forward props', async () => {
      const tools = new Map<string, AnyToolDefinition>([['search', { name: 'search' }]]);
      const el = await createElement([assistantItem()], { tools, reactions: true, debug: true });

      const response = el.shadowRoot!.querySelector<HTMLElement & { tools: unknown; enableReactions: boolean; debugMode: boolean }>(
        'forge-ai-assistant-response'
      )!;

      expect(response.tools).toBe(tools);
      expect(response.enableReactions).toBe(true);
      expect(response.debugMode).toBe(true);
    });

    it('should preserve the order of mixed items', async () => {
      const el = await createElement([msgItem({ id: 'u1' }), assistantItem(), msgItem({ id: 's1', role: 'system', content: 'sys' })]);

      const tags = Array.from(el.shadowRoot!.querySelector('.message-thread-content')!.children).map(c => c.tagName.toLowerCase());

      expect(tags).toEqual(['forge-ai-user-message', 'forge-ai-assistant-response', 'forge-ai-client-message']);
    });
  });

  describe('tool call items', () => {
    it('should render tool calls whose tool defines a renderer', async () => {
      const tools = new Map<string, AnyToolDefinition>([['search', { name: 'search', renderer: { elementTag: 'x-search' } }]]);
      const el = await createElement([toolItem()], { tools });

      const call = el.shadowRoot!.querySelector<HTMLElement & { toolCall: ToolCall; toolDefinition: unknown }>('forge-ai-tool-call')!;

      expect(call.toolCall.id).toBe('tc1');
      expect(call.toolDefinition).toBe(tools.get('search'));
    });

    it('should skip tool calls whose tool has no renderer', async () => {
      const tools = new Map<string, AnyToolDefinition>([['search', { name: 'search' }]]);
      const el = await createElement([toolItem()], { tools });

      expect(el.shadowRoot!.querySelector('forge-ai-tool-call')).toBeNull();
    });

    it('should skip tool calls when no tools are provided', async () => {
      const el = await createElement([toolItem()]);

      expect(el.shadowRoot!.querySelector('forge-ai-tool-call')).toBeNull();
    });
  });

  describe('thinking indicator', () => {
    it('should not render by default', async () => {
      const el = await createElement([msgItem()]);

      expect(el.shadowRoot!.querySelector('.thinking-indicator')).toBeNull();
    });

    it('should render after the last user message while thinking', async () => {
      const el = await createElement([msgItem()], { thinking: true });

      const indicator = el.shadowRoot!.querySelector('.thinking-indicator forge-ai-thinking-indicator')!;

      expect(indicator.hasAttribute('show-text')).toBe(true);
    });

    it('should render with the empty state while thinking and no messages exist', async () => {
      const el = await createElement([], { thinking: true });

      expect(el.shadowRoot!.querySelector('.thinking-indicator')).toBeTruthy();
    });

    it('should defer to the assistant response once one is the last item', async () => {
      const el = await createElement([msgItem(), assistantItem({ status: 'streaming', children: [] })], { thinking: true });

      expect(el.shadowRoot!.querySelector('.thinking-indicator')).toBeNull();
      expect(el.shadowRoot!.querySelector<HTMLElement & { showThinking: boolean }>('forge-ai-assistant-response')!.showThinking).toBe(true);
    });

    it('should only show thinking on the last assistant response', async () => {
      const el = await createElement([assistantItem({ id: 'r1' }), msgItem({ id: 'u2' }), assistantItem({ id: 'r2' })], { thinking: true });

      const responses = Array.from(el.shadowRoot!.querySelectorAll<HTMLElement & { showThinking: boolean }>('forge-ai-assistant-response'));

      expect(responses.map(r => r.showThinking)).toEqual([false, true]);
    });
  });

  describe('events', () => {
    function assistantEl(el: AiMessageThreadComponent): HTMLElement {
      return el.shadowRoot!.querySelector<HTMLElement>('forge-ai-assistant-response')!;
    }

    it('should re-dispatch copy with the response id as a bubbling composed event', async () => {
      const el = await createElement([assistantItem({ id: 'r9' })]);
      const listener = vi.fn<(evt: CustomEvent<ForgeAiMessageThreadCopyEventData>) => void>();
      document.body.addEventListener('forge-ai-message-thread-copy', listener);

      assistantEl(el).dispatchEvent(new CustomEvent('forge-ai-assistant-response-copy', { detail: { responseId: 'r9' } }));
      document.body.removeEventListener('forge-ai-message-thread-copy', listener);

      expect(listener).toHaveBeenCalledOnce();
      expect(listener.mock.calls[0][0].detail).toEqual({ messageId: 'r9' });
      expect(listener.mock.calls[0][0].bubbles).toBe(true);
      expect(listener.mock.calls[0][0].composed).toBe(true);
    });

    it('should re-dispatch resend with the response id', async () => {
      const el = await createElement([assistantItem()]);
      const listener = vi.fn<(evt: CustomEvent<ForgeAiMessageThreadResendEventData>) => void>();
      el.addEventListener('forge-ai-message-thread-resend', listener);

      assistantEl(el).dispatchEvent(new CustomEvent('forge-ai-assistant-response-resend', { detail: { responseId: 'r1' } }));

      expect(listener.mock.calls[0][0].detail).toEqual({ messageId: 'r1' });
    });

    it('should re-dispatch thumbs up with optional feedback', async () => {
      const el = await createElement([assistantItem()]);
      const listener = vi.fn<(evt: CustomEvent<ForgeAiMessageThreadThumbsEventData>) => void>();
      el.addEventListener('forge-ai-message-thread-thumbs-up', listener);

      assistantEl(el).dispatchEvent(new CustomEvent('forge-ai-assistant-response-thumbs-up', { detail: { responseId: 'r1' } }));

      expect(listener.mock.calls[0][0].detail).toEqual({ messageId: 'r1', feedback: undefined });
    });

    it('should re-dispatch thumbs down with feedback text', async () => {
      const el = await createElement([assistantItem()]);
      const listener = vi.fn<(evt: CustomEvent<ForgeAiMessageThreadThumbsEventData>) => void>();
      el.addEventListener('forge-ai-message-thread-thumbs-down', listener);

      assistantEl(el).dispatchEvent(new CustomEvent('forge-ai-assistant-response-thumbs-down', { detail: { responseId: 'r1', feedback: 'nope' } }));

      expect(listener.mock.calls[0][0].detail).toEqual({ messageId: 'r1', feedback: 'nope' });
    });

    it('should re-dispatch user copy with the message id', async () => {
      const el = await createElement([msgItem({ id: 'u7' })]);
      const listener = vi.fn<(evt: CustomEvent<ForgeAiMessageThreadCopyEventData>) => void>();
      el.addEventListener('forge-ai-message-thread-user-copy', listener);

      el.shadowRoot!.querySelector('forge-ai-user-message')!.dispatchEvent(new CustomEvent('forge-ai-user-message-copy', { detail: { messageId: 'u7' } }));

      expect(listener.mock.calls[0][0].detail).toEqual({ messageId: 'u7' });
    });

    it('should re-dispatch user resend with the message id', async () => {
      const el = await createElement([msgItem({ id: 'u7' })]);
      const listener = vi.fn<(evt: CustomEvent<ForgeAiMessageThreadResendEventData>) => void>();
      el.addEventListener('forge-ai-message-thread-user-resend', listener);

      el.shadowRoot!.querySelector('forge-ai-user-message')!.dispatchEvent(new CustomEvent('forge-ai-user-message-resend', { detail: { messageId: 'u7' } }));

      expect(listener.mock.calls[0][0].detail).toEqual({ messageId: 'u7' });
    });

    it('should re-dispatch user edit with the message id and content', async () => {
      const el = await createElement([msgItem({ id: 'u7' })]);
      const listener = vi.fn<(evt: CustomEvent<ForgeAiMessageThreadEditEventData>) => void>();
      el.addEventListener('forge-ai-message-thread-user-edit', listener);

      el.shadowRoot!.querySelector('forge-ai-user-message')!.dispatchEvent(
        new CustomEvent('forge-ai-user-message-edit', { detail: { messageId: 'u7', content: 'new' } })
      );

      expect(listener.mock.calls[0][0].detail).toEqual({ messageId: 'u7', content: 'new' });
    });

    it('should drive a copy event end to end from the user toolbar', async () => {
      const el = await createElement([msgItem({ id: 'u7' })]);
      const listener = vi.fn<(evt: CustomEvent<ForgeAiMessageThreadCopyEventData>) => void>();
      el.addEventListener('forge-ai-message-thread-user-copy', listener);
      const user = el.shadowRoot!.querySelector<HTMLElement & { updateComplete: Promise<unknown> }>('forge-ai-user-message')!;
      await user.updateComplete;
      const toolbar = user.shadowRoot!.querySelector<HTMLElement & { updateComplete: Promise<unknown> }>('forge-ai-user-message-toolbar')!;
      await toolbar.updateComplete;

      toolbar.shadowRoot!.querySelector<HTMLButtonElement>('#copy-btn')!.click();

      expect(listener.mock.calls[0][0].detail).toEqual({ messageId: 'u7' });
    });
  });

  describe('scrolling', () => {
    it('should not render the scroll to bottom button without messages', async () => {
      const el = await createElement();

      expect(scrollButton(el)).toBeNull();
    });

    it('should render a labelled, tooltipped scroll button when messages exist', async () => {
      const el = await createElement([msgItem()]);

      expect(scrollButton(el)!.getAttribute('aria-label')).toBe('Scroll to bottom');
      expect(el.shadowRoot!.querySelector('forge-ai-tooltip[for="scroll-to-bottom-btn"]')).toBeTruthy();
    });

    it('should hide the scroll button while at the bottom', async () => {
      const el = await createElement([msgItem()]);

      expect(scrollButton(el)!.classList.contains('scroll-to-bottom-button--hidden')).toBe(true);
    });

    it('should show the scroll button after scrolling away from the bottom', async () => {
      const el = await createElement(manyUserItems(40));
      await settle(el);

      container(el).scrollTop = 0;
      container(el).dispatchEvent(new Event('scroll'));
      await el.updateComplete;

      expect(scrollButton(el)!.classList.contains('scroll-to-bottom-button--hidden')).toBe(false);
    });

    it('should scroll to the bottom and hide the button when the button is clicked', async () => {
      const el = await createElement(manyUserItems(40));
      await settle(el);
      container(el).scrollTop = 0;
      container(el).dispatchEvent(new Event('scroll'));
      await el.updateComplete;

      scrollButton(el)!.click();
      await vi.waitFor(() => {
        const c = container(el);
        expect(c.scrollTop + c.clientHeight).toBeGreaterThanOrEqual(c.scrollHeight - 2);
      }, SMOOTH_SCROLL_TIMEOUT);
      await el.updateComplete;

      expect(scrollButton(el)!.classList.contains('scroll-to-bottom-button--hidden')).toBe(true);
    });

    it('should scroll to the bottom when scrollToBottom is forced', async () => {
      const el = await createElement(manyUserItems(40));
      await settle(el);
      container(el).scrollTop = 0;
      container(el).dispatchEvent(new Event('scroll'));
      await el.updateComplete;

      el.scrollToBottom({ force: true, behavior: 'instant' });

      expect(container(el).scrollTop).toBeGreaterThan(0);
    });

    it('should not scroll without force when the user has scrolled away', async () => {
      const el = await createElement(manyUserItems(40));
      await settle(el);
      container(el).scrollTop = 0;
      container(el).dispatchEvent(new Event('scroll'));
      await el.updateComplete;

      el.scrollToBottom({ behavior: 'instant' });

      expect(container(el).scrollTop).toBe(0);
    });

    it('should scroll to the bottom without force when already near the bottom', async () => {
      const el = await createElement(manyUserItems(40));
      await settle(el);
      const c = container(el);
      c.scrollTop = c.scrollHeight - c.clientHeight - 50;
      c.dispatchEvent(new Event('scroll'));
      await el.updateComplete;

      el.scrollToBottom({ behavior: 'instant' });

      expect(c.scrollTop + c.clientHeight).toBeGreaterThanOrEqual(c.scrollHeight - 2);
    });

    it('should auto-scroll to the bottom when messages are added and auto-scroll is on', async () => {
      const el = await createElement([], { autoScroll: 'on' });
      await settle(el);

      el.messageItems = manyUserItems(40);
      await el.updateComplete;

      await vi.waitFor(() => {
        const c = container(el);
        expect(c.scrollTop + c.clientHeight).toBeGreaterThanOrEqual(c.scrollHeight - 2);
      }, SMOOTH_SCROLL_TIMEOUT);
    });

    it('should scroll to the bottom when thinking is toggled on with auto-scroll on', async () => {
      const el = await createElement([], { autoScroll: 'on' });
      await settle(el);
      el.messageItems = manyUserItems(40);
      await el.updateComplete;
      await vi.waitFor(() => {
        const c = container(el);
        expect(c.scrollHeight).toBeGreaterThan(c.clientHeight);
        expect(c.scrollTop + c.clientHeight).toBeGreaterThanOrEqual(c.scrollHeight - 2);
      }, SMOOTH_SCROLL_TIMEOUT);

      el.showThinking = true;
      await el.updateComplete;

      await vi.waitFor(() => {
        const c = container(el);
        expect(el.shadowRoot!.querySelector('.thinking-indicator')).toBeTruthy();
        expect(c.scrollTop + c.clientHeight).toBeGreaterThanOrEqual(c.scrollHeight - 2);
      }, SMOOTH_SCROLL_TIMEOUT);
    });

    it('should not auto-scroll when auto-scroll is off', async () => {
      const el = await createElement([], { autoScroll: 'off' });

      el.messageItems = manyUserItems(40);
      await settle(el);
      await frame();

      expect(container(el).scrollTop).toBe(0);
    });

    it('should update scroll state when content resizes', async () => {
      const el = await createElement(manyUserItems(40));
      await settle(el);
      container(el).scrollTop = 0;
      container(el).dispatchEvent(new Event('scroll'));
      await el.updateComplete;
      expect(scrollButton(el)!.classList.contains('scroll-to-bottom-button--hidden')).toBe(false);

      el.parentElement!.style.height = '4000px';
      await vi.waitFor(() => {
        expect(scrollButton(el)!.classList.contains('scroll-to-bottom-button--hidden')).toBe(true);
      });
    });
  });

  describe('lifecycle', () => {
    it('should keep tracking resizes after being disconnected and reconnected', async () => {
      const el = await createElement(manyUserItems(40));
      await settle(el);
      const parent = el.parentElement!;
      el.remove();
      parent.append(el);
      await settle(el);
      container(el).scrollTop = 0;
      container(el).dispatchEvent(new Event('scroll'));
      await el.updateComplete;
      expect(scrollButton(el)!.classList.contains('scroll-to-bottom-button--hidden')).toBe(false);

      parent.style.height = '4000px';

      await vi.waitFor(() => {
        expect(scrollButton(el)!.classList.contains('scroll-to-bottom-button--hidden')).toBe(true);
      });
    });

    it('should not register another host controller when reconnected', async () => {
      const el = await createElement([msgItem({ content: 'Persist' })]);
      const addController = vi.spyOn(el, 'addController');
      const parent = el.parentElement!;

      el.remove();
      parent.append(el);
      await el.updateComplete;

      expect(addController).not.toHaveBeenCalled();
    });

    it('should keep rendering after being disconnected and reconnected', async () => {
      const el = await createElement([msgItem({ content: 'Persist' })]);
      const parent = el.parentElement!;

      el.remove();
      parent.append(el);
      await el.updateComplete;

      expect(el.shadowRoot!.querySelector('forge-ai-user-message')!.textContent).toContain('Persist');
    });
  });
});

describe('AiMessageThreadComponent markdown streaming', () => {
  const CONTENT = 'Cost<Budget Review Q3';

  async function renderedText(item: MessageItem): Promise<string> {
    const el = await createElement([item]);
    return container(el).textContent?.replace(/\s+/g, ' ') ?? '';
  }

  [
    ['a complete assistant message', { role: 'assistant', status: 'complete' }],
    ['an error message', { role: 'assistant', status: 'error' }],
    ['a user message', { role: 'user' }]
  ].forEach(([label, overrides]) => {
    it(`should keep text after a "<" in ${label}`, async () => {
      expect(await renderedText(msgItem({ content: CONTENT, ...(overrides as Partial<ChatMessage>) }))).toContain(CONTENT);
    });
  });

  ['streaming', 'pending'].forEach(status => {
    it(`should repair partial markup in a ${status} assistant message`, async () => {
      const rendered = await renderedText(msgItem({ role: 'assistant', content: CONTENT, status: status as ChatMessage['status'] }));

      expect(rendered).toContain('Cost');
      expect(rendered).not.toContain(CONTENT);
    });
  });
});
