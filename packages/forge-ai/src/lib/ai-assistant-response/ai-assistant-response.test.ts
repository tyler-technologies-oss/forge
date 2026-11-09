import { describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import type { AnyToolDefinition, AssistantResponse, ResponseItem, ToolCall } from '../types/index.js';
import type { AiResponseMessageToolbarComponent } from '../ai-response-message-toolbar/ai-response-message-toolbar.js';
import { AiAssistantResponseComponent, AiAssistantResponseComponentTagName, type ForgeAiAssistantResponseFeedbackEventData } from './ai-assistant-response.js';

const TAG = 'forge-ai-assistant-response';

function text(content: string, status: 'streaming' | 'complete' = 'complete', messageId = 'm1'): ResponseItem {
  return { type: 'text', messageId, content, status };
}

function tool(overrides: Partial<ToolCall> = {}): ResponseItem {
  return { type: 'toolCall', data: { id: 'tc-1', messageId: 'm1', name: 'search', args: {}, status: 'complete', type: 'client', ...overrides } };
}

function response(overrides: Partial<AssistantResponse> = {}): AssistantResponse {
  return { id: 'r1', children: [text('Hello')], status: 'complete', timestamp: 1, ...overrides };
}

function toolsMap(...defs: AnyToolDefinition[]): Map<string, AnyToolDefinition> {
  return new Map(defs.map(d => [d.name, d]));
}

function createElement(
  res: AssistantResponse,
  extra: { tools?: Map<string, AnyToolDefinition>; reactions?: boolean; debug?: boolean; thinking?: boolean } = {}
): Promise<AiAssistantResponseComponent> {
  return renderFixture<AiAssistantResponseComponent>(
    html`<forge-ai-assistant-response
      .response=${res}
      .tools=${extra.tools}
      ?enable-reactions=${!!extra.reactions}
      ?debug-mode=${!!extra.debug}
      ?show-thinking=${!!extra.thinking}></forge-ai-assistant-response>`,
    TAG
  );
}

function toolbar(el: AiAssistantResponseComponent): AiResponseMessageToolbarComponent | null {
  return el.shadowRoot!.querySelector<AiResponseMessageToolbarComponent>('forge-ai-response-message-toolbar');
}

function fireToolbar(el: AiAssistantResponseComponent, type: string, detail: unknown): void {
  toolbar(el)!.dispatchEvent(new CustomEvent(type, { detail }));
}

describe('AiAssistantResponseComponent', () => {
  it('should be registered under the forge-ai-assistant-response tag', async () => {
    const el = await createElement(response());

    expect(AiAssistantResponseComponentTagName).toBe(TAG);
    expect(customElements.get(TAG)).toBe(AiAssistantResponseComponent);
    expect(el).toBeInstanceOf(AiAssistantResponseComponent);
  });

  it('should contain shadow root', async () => {
    const el = await createElement(response());

    expect(el.shadowRoot).toBeTruthy();
  });

  describe('properties', () => {
    it('should have the expected defaults', async () => {
      const el = await createElement(response());

      expect(el.tools).toBeUndefined();
      expect(el.enableReactions).toBe(false);
      expect(el.debugMode).toBe(false);
      expect(el.showThinking).toBe(false);
    });

    it('should read boolean properties from attributes', async () => {
      const el = await createElement(response(), { reactions: true, debug: true, thinking: true });

      expect(el.enableReactions).toBe(true);
      expect(el.debugMode).toBe(true);
      expect(el.showThinking).toBe(true);
    });
  });

  describe('text chunks', () => {
    it('should render markdown text as HTML', async () => {
      const el = await createElement(response({ children: [text('**bold** word')] }));

      expect(el.shadowRoot!.querySelector('.text-chunk strong')!.textContent).toBe('bold');
    });

    it('should render one chunk per text child in order', async () => {
      const el = await createElement(response({ children: [text('First', 'complete', 'a'), text('Second', 'complete', 'b')] }));

      const chunks = Array.from(el.shadowRoot!.querySelectorAll('.text-chunk')).map(c => c.textContent!.trim());

      expect(chunks).toEqual(['First', 'Second']);
    });

    it('should skip whitespace-only text chunks', async () => {
      const el = await createElement(response({ children: [text('   ')] }));

      expect(el.shadowRoot!.querySelectorAll('.text-chunk')).toHaveLength(0);
    });

    it('should sanitize unsafe markup in text', async () => {
      const el = await createElement(response({ children: [text('<script>window.__pwned = 1</script><b>ok</b>')] }));

      expect(el.shadowRoot!.querySelector('script')).toBeNull();
      expect(el.shadowRoot!.querySelector('.text-chunk b')!.textContent).toBe('ok');
    });

    it('should render updated content when the response changes', async () => {
      const el = await createElement(response({ status: 'streaming', children: [text('Hel', 'streaming')] }));

      el.response = response({ status: 'streaming', children: [text('Hello there', 'streaming')] });
      await el.updateComplete;

      expect(el.shadowRoot!.querySelector('.text-chunk')!.textContent!.trim()).toBe('Hello there');
    });
  });

  describe('data-complete', () => {
    it('should set data-complete when the response is complete', async () => {
      const el = await createElement(response());

      expect(el.shadowRoot!.querySelector('.assistant-response')!.hasAttribute('data-complete')).toBe(true);
    });

    it('should not set data-complete while streaming', async () => {
      const el = await createElement(response({ status: 'streaming' }));

      expect(el.shadowRoot!.querySelector('.assistant-response')!.hasAttribute('data-complete')).toBe(false);
    });
  });

  describe('empty state', () => {
    it('should add the empty custom state when streaming with no visible content', async () => {
      const el = await createElement(response({ status: 'streaming', children: [] }));

      expect(el.matches(':state(empty)')).toBe(true);
    });

    it('should add the empty custom state when the only text is whitespace', async () => {
      const el = await createElement(response({ status: 'streaming', children: [text('  ', 'streaming')] }));

      expect(el.matches(':state(empty)')).toBe(true);
    });

    it('should not be empty once text arrives', async () => {
      const el = await createElement(response({ status: 'streaming', children: [] }));

      el.response = response({ status: 'streaming', children: [text('Hi', 'streaming')] });
      await el.updateComplete;

      expect(el.matches(':state(empty)')).toBe(false);
    });

    it('should not be empty when a tool call is present', async () => {
      const el = await createElement(response({ status: 'streaming', children: [tool({ status: 'executing' })] }));

      expect(el.matches(':state(empty)')).toBe(false);
    });

    it('should not be empty when the response is complete', async () => {
      const el = await createElement(response({ status: 'complete', children: [] }));

      expect(el.matches(':state(empty)')).toBe(false);
    });

    it('should not be empty while showing the thinking indicator', async () => {
      const el = await createElement(response({ status: 'streaming', children: [] }), { thinking: true });

      expect(el.matches(':state(empty)')).toBe(false);
    });
  });

  describe('tool calls', () => {
    it('should group consecutive tool calls under a single indicator', async () => {
      const el = await createElement(response({ children: [tool({ id: 'a' }), tool({ id: 'b' })] }));

      const indicators = el.shadowRoot!.querySelectorAll('forge-ai-tool-call-indicator');

      expect(indicators).toHaveLength(1);
      expect((indicators[0] as unknown as { toolCalls: ToolCall[] }).toolCalls.map(t => t.id)).toEqual(['a', 'b']);
    });

    it('should render no indicator for a text-only response', async () => {
      const el = await createElement(response());

      expect(el.shadowRoot!.querySelectorAll('forge-ai-tool-call-indicator')).toHaveLength(0);
    });

    it('should render separate indicators for tool calls separated by text', async () => {
      const el = await createElement(response({ children: [tool({ id: 'a' }), text('Between'), tool({ id: 'b' })] }));

      expect(el.shadowRoot!.querySelectorAll('forge-ai-tool-call-indicator')).toHaveLength(2);
    });

    it('should place the indicator before the text that follows it', async () => {
      const el = await createElement(response({ children: [tool(), text('After')] }));

      const container = el.shadowRoot!.querySelector('.assistant-response')!;
      const children = Array.from(container.children);
      const indicator = children.findIndex(c => c.tagName.toLowerCase() === 'forge-ai-tool-call-indicator');
      const textChunk = children.findIndex(c => c.classList.contains('text-chunk'));

      expect(indicator).toBeGreaterThanOrEqual(0);
      expect(indicator).toBeLessThan(textChunk);
    });

    it('should forward debug mode and tools to the indicator', async () => {
      const tools = toolsMap({ name: 'search' });
      const el = await createElement(response({ children: [tool()] }), { tools, debug: true });

      const indicator = el.shadowRoot!.querySelector<HTMLElement & { tools: unknown; debugMode: boolean }>('forge-ai-tool-call-indicator')!;

      expect(indicator.debugMode).toBe(true);
      expect(indicator.tools).toBe(tools);
    });

    it('should render a tool call element only for tools that define a renderer', async () => {
      const tools = toolsMap({ name: 'search', renderer: { elementTag: 'x-search' } }, { name: 'plain' });
      const el = await createElement(response({ children: [tool({ id: 'a', name: 'search' }), tool({ id: 'b', name: 'plain' })] }), { tools });

      const calls = el.shadowRoot!.querySelectorAll<HTMLElement & { toolCall: ToolCall }>('forge-ai-tool-call');

      expect(calls).toHaveLength(1);
      expect(calls[0].toolCall.id).toBe('a');
    });

    it('should not render tool call elements when no tools are provided', async () => {
      const el = await createElement(response({ children: [tool()] }));

      expect(el.shadowRoot!.querySelectorAll('forge-ai-tool-call')).toHaveLength(0);
      expect(el.shadowRoot!.querySelectorAll('forge-ai-tool-call-indicator')).toHaveLength(1);
    });
  });

  describe('toolbar', () => {
    it('should render the toolbar for a complete response with text', async () => {
      const el = await createElement(response());

      expect(toolbar(el)).toBeTruthy();
    });

    it('should not render the toolbar while streaming', async () => {
      const el = await createElement(response({ status: 'streaming' }));

      expect(toolbar(el)).toBeNull();
    });

    it('should not render the toolbar for an errored response', async () => {
      const el = await createElement(response({ status: 'error' }));

      expect(toolbar(el)).toBeNull();
    });

    it('should not render the toolbar when there is no text content', async () => {
      const el = await createElement(response({ children: [tool()] }));

      expect(toolbar(el)).toBeNull();
    });

    it('should not render the toolbar when text is only whitespace', async () => {
      const el = await createElement(response({ children: [text('   ')] }));

      expect(toolbar(el)).toBeNull();
    });

    it('should forward enable-reactions and existing feedback to the toolbar', async () => {
      const el = await createElement(response({ feedback: { type: 'negative', reason: 'bad' } }), { reactions: true });

      expect(toolbar(el)!.enableReactions).toBe(true);
      expect(toolbar(el)!.feedbackType).toBe('negative');
      expect(toolbar(el)!.feedbackReason).toBe('bad');
    });

    it('should not set feedback attributes when the response has none', async () => {
      const el = await createElement(response());

      expect(toolbar(el)!.hasAttribute('feedback-type')).toBe(false);
      expect(toolbar(el)!.hasAttribute('feedback-reason')).toBe(false);
    });
  });

  describe('events', () => {
    it.each(['copy', 'resend'] as const)('should re-dispatch %s with the response id', async action => {
      const el = await createElement(response({ id: 'resp-9' }));
      const listener = vi.fn<(evt: CustomEvent<{ responseId: string }>) => void>();
      el.addEventListener(`forge-ai-assistant-response-${action}`, listener);

      fireToolbar(el, 'forge-ai-response-message-toolbar-action', { action });

      expect(listener).toHaveBeenCalledOnce();
      expect(listener.mock.calls[0][0].detail).toEqual({ responseId: 'resp-9' });
    });

    it('should dispatch thumbs-up for positive feedback', async () => {
      const el = await createElement(response({ id: 'resp-9' }), { reactions: true });
      const up = vi.fn<(evt: CustomEvent<ForgeAiAssistantResponseFeedbackEventData>) => void>();
      const down = vi.fn();
      el.addEventListener('forge-ai-assistant-response-thumbs-up', up);
      el.addEventListener('forge-ai-assistant-response-thumbs-down', down);

      fireToolbar(el, 'forge-ai-response-message-toolbar-feedback', { action: 'positive' });

      expect(up).toHaveBeenCalledOnce();
      expect(up.mock.calls[0][0].detail).toEqual({ responseId: 'resp-9', feedback: undefined });
      expect(down).not.toHaveBeenCalled();
    });

    it('should dispatch thumbs-down with feedback text for negative feedback', async () => {
      const el = await createElement(response({ id: 'resp-9' }), { reactions: true });
      const down = vi.fn<(evt: CustomEvent<ForgeAiAssistantResponseFeedbackEventData>) => void>();
      el.addEventListener('forge-ai-assistant-response-thumbs-down', down);

      fireToolbar(el, 'forge-ai-response-message-toolbar-feedback', { action: 'negative', feedback: 'wrong' });

      expect(down).toHaveBeenCalledOnce();
      expect(down.mock.calls[0][0].detail).toEqual({ responseId: 'resp-9', feedback: 'wrong' });
    });

    it('should re-dispatch events that do not bubble', async () => {
      const el = await createElement(response());
      const listener = vi.fn();
      document.body.addEventListener('forge-ai-assistant-response-copy', listener);

      fireToolbar(el, 'forge-ai-response-message-toolbar-action', { action: 'copy' });
      document.body.removeEventListener('forge-ai-assistant-response-copy', listener);

      expect(listener).not.toHaveBeenCalled();
    });

    it('should drive events end to end from a toolbar button click', async () => {
      const el = await createElement(response({ id: 'resp-1' }));
      const listener = vi.fn<(evt: CustomEvent<{ responseId: string }>) => void>();
      el.addEventListener('forge-ai-assistant-response-copy', listener);
      await toolbar(el)!.updateComplete;

      toolbar(el)!.shadowRoot!.querySelector<HTMLButtonElement>('#copy-btn')!.click();

      expect(listener.mock.calls[0][0].detail).toEqual({ responseId: 'resp-1' });
    });
  });

  describe('thinking indicator', () => {
    const indicator = (el: AiAssistantResponseComponent): Element | null => el.shadowRoot!.querySelector('forge-ai-thinking-indicator');

    it('should not render when show-thinking is off', async () => {
      const el = await createElement(response({ status: 'streaming', children: [] }));

      expect(indicator(el)).toBeNull();
    });

    it('should render when thinking with no content yet', async () => {
      const el = await createElement(response({ status: 'streaming', children: [] }), { thinking: true });

      expect(indicator(el)).toBeTruthy();
      expect(indicator(el)!.hasAttribute('show-text')).toBe(true);
    });

    it('should hide while text is actively streaming', async () => {
      const el = await createElement(response({ status: 'streaming', children: [text('Typing', 'streaming')] }), { thinking: true });

      expect(indicator(el)).toBeNull();
    });

    it('should show when the streaming text is blank', async () => {
      const el = await createElement(response({ status: 'streaming', children: [text('  ', 'streaming')] }), { thinking: true });

      expect(indicator(el)).toBeTruthy();
    });

    it('should show between steps when the response is flagged as thinking despite streaming text', async () => {
      const el = await createElement(response({ status: 'streaming', isThinking: true, children: [text('Stale', 'streaming')] }), { thinking: true });

      expect(indicator(el)).toBeTruthy();
    });

    it('should show after text has completed', async () => {
      const el = await createElement(response({ status: 'streaming', children: [text('Done', 'complete')] }), { thinking: true });

      expect(indicator(el)).toBeTruthy();
    });

    it.each(['pending', 'parsing', 'executing'] as const)('should hide while a tool call is %s', async status => {
      const el = await createElement(response({ status: 'streaming', children: [tool({ status })] }), { thinking: true });

      expect(indicator(el)).toBeNull();
    });

    it('should show once all tool calls are settled', async () => {
      const el = await createElement(response({ status: 'streaming', children: [tool({ status: 'complete' })] }), { thinking: true });

      expect(indicator(el)).toBeTruthy();
    });
  });
});
