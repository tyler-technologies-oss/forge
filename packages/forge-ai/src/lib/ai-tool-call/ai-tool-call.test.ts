import { describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { ContextProvider } from '@lit/context';
import { renderFixture } from '../../testing/fixture.js';
import type { AnyToolDefinition, IToolRenderer, ToolCall, ToolRenderFunction } from '../types/index.js';
import { AiToolCallComponent, AiToolCallComponentTagName } from './ai-tool-call.js';
import { createToolRenderer } from './create-tool-renderer.js';
import { toolCanvasHostContext, type ForgeAiCanvasOpenRequestEventData, type ToolCanvasHostState } from './tool-canvas.js';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-test-tool-renderer': TestToolRendererElement;
  }
}

const TAG = 'forge-ai-tool-call';
const RENDERER_TAG = 'forge-ai-test-tool-renderer';

class TestToolRendererElement extends HTMLElement implements IToolRenderer {
  public toolCall!: ToolCall;
}
customElements.define(RENDERER_TAG, TestToolRendererElement);

function createToolCall(overrides: Partial<ToolCall> = {}): ToolCall {
  return { id: 'call-1', messageId: 'msg-1', name: 'report', args: {}, status: 'complete', type: 'client', ...overrides };
}

function createElement(toolCall: ToolCall, toolDefinition?: AnyToolDefinition): Promise<AiToolCallComponent> {
  return renderFixture<AiToolCallComponent>(html`<forge-ai-tool-call .toolCall=${toolCall} .toolDefinition=${toolDefinition}></forge-ai-tool-call>`, TAG);
}

describe('AiToolCallComponent', () => {
  it('should be registered under the forge-ai-tool-call tag', async () => {
    const el = await createElement(createToolCall());

    expect(AiToolCallComponentTagName).toBe(TAG);
    expect(el.tagName.toLowerCase()).toBe(TAG);
    expect(el).toBeInstanceOf(AiToolCallComponent);
    expect(customElements.get(TAG)).toBe(AiToolCallComponent);
  });

  it('should contain shadow root', async () => {
    const el = await createElement(createToolCall());

    expect(el.shadowRoot).toBeTruthy();
  });

  it('should render nothing without a tool definition', async () => {
    const el = await createElement(createToolCall());

    expect(el.shadowRoot!.childElementCount).toBe(0);
  });

  it('should render nothing while the call has not completed', async () => {
    const el = await createElement(createToolCall({ status: 'executing' }), { name: 'report', renderer: { elementTag: RENDERER_TAG } });

    expect(el.shadowRoot?.querySelector(RENDERER_TAG)).toBeNull();
  });

  it('should render the element renderer with the tool call once complete', async () => {
    const toolCall = createToolCall();
    const el = await createElement(toolCall, { name: 'report', renderer: createToolRenderer({ elementTag: RENDERER_TAG }) });

    const rendered = el.shadowRoot?.querySelector<TestToolRendererElement>(RENDERER_TAG);

    expect(rendered).toBeTruthy();
    expect(rendered?.toolCall).toBe(toolCall);
  });

  it('should render the element renderer while executing when the tool opts into renderOnStart', async () => {
    const el = await createElement(createToolCall({ status: 'executing' }), { name: 'report', renderOnStart: true, renderer: { elementTag: RENDERER_TAG } });

    expect(el.shadowRoot?.querySelector(RENDERER_TAG)).toBeTruthy();
  });

  it('should update the mounted element renderer in place when the tool call changes', async () => {
    const definition: AnyToolDefinition = { name: 'report', renderOnStart: true, renderer: { elementTag: RENDERER_TAG } };
    const el = await createElement(createToolCall({ status: 'executing' }), definition);
    const rendered = el.shadowRoot?.querySelector<TestToolRendererElement>(RENDERER_TAG);
    const next = createToolCall({ status: 'complete' });

    el.toolCall = next;
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector(RENDERER_TAG)).toBe(rendered);
    expect(rendered?.toolCall).toBe(next);
  });

  it('should render the output of a render-function renderer with the tool call and context', async () => {
    const toolCall = createToolCall();
    const render = vi.fn<ToolRenderFunction>(() => {
      const node = document.createElement('p');
      node.textContent = 'rendered';
      return node;
    });
    const el = await createElement(toolCall, { name: 'report', renderer: createToolRenderer({ render }) });

    expect(el.shadowRoot?.querySelector('p')?.textContent).toBe('rendered');
    expect(render).toHaveBeenCalledOnce();
    const [calledWith, context] = render.mock.calls[0];
    expect(calledWith).toBe(toolCall);
    expect(context?.presentation).toBe('inline');
    expect(context?.canvas.available).toBe(false);
  });

  it('should request a thread scroll when a renderer is mounted', async () => {
    const scrollSpy = vi.fn();
    const container = document.createElement('div');
    container.addEventListener('forge-ai-message-thread-scroll-request', scrollSpy);
    document.body.append(container);
    const el = document.createElement(TAG);
    el.toolCall = createToolCall();
    el.toolDefinition = { name: 'report', renderer: { elementTag: RENDERER_TAG } };
    container.append(el);
    await el.updateComplete;

    expect(scrollSpy).toHaveBeenCalledOnce();
  });
});

describe('AiToolCallComponent with a canvas host', () => {
  interface CanvasHost {
    host: HTMLElement;
    provider: ContextProvider<typeof toolCanvasHostContext>;
    openRequests: ForgeAiCanvasOpenRequestEventData[];
    closeRequests: { toolCallId: string }[];
  }

  function createHost(state: ToolCanvasHostState): CanvasHost {
    const host = document.createElement('div');
    const provider = new ContextProvider(host, { context: toolCanvasHostContext, initialValue: state });
    const openRequests: ForgeAiCanvasOpenRequestEventData[] = [];
    const closeRequests: { toolCallId: string }[] = [];
    host.addEventListener('forge-ai-canvas-open-request', evt => {
      openRequests.push(evt.detail);
      evt.detail.handled = true;
    });
    host.addEventListener('forge-ai-canvas-close-request', evt => {
      closeRequests.push(evt.detail);
      evt.detail.handled = true;
    });
    document.body.append(host);
    return { host, provider, openRequests, closeRequests };
  }

  async function mount(host: HTMLElement, toolCall: ToolCall, toolDefinition: AnyToolDefinition): Promise<AiToolCallComponent> {
    const el = document.createElement(TAG);
    el.toolCall = toolCall;
    el.toolDefinition = toolDefinition;
    host.append(el);
    await el.updateComplete;
    return el;
  }

  function getCard(el: AiToolCallComponent): HTMLElement | null {
    return el.shadowRoot!.querySelector<HTMLElement>('forge-ai-artifact-card');
  }

  async function clickCard(el: AiToolCallComponent): Promise<void> {
    const card = getCard(el) as HTMLElement & { updateComplete: Promise<boolean> };
    await card.updateComplete;
    card.shadowRoot!.querySelector<HTMLButtonElement>('.artifact-card')!.click();
  }

  it('should give canvas-enabled tools the inline-expandable presentation and an available canvas', async () => {
    const { host } = createHost({ presentation: 'inline-expandable' });
    const render = vi.fn<ToolRenderFunction>(() => document.createElement('p'));

    await mount(host, createToolCall(), { name: 'report', renderer: { render }, canvas: {} });

    const context = render.mock.calls[0][1];
    expect(context?.presentation).toBe('inline-expandable');
    expect(context?.canvas.available).toBe(true);
    expect(context?.canvas.isOpen).toBe(false);
  });

  it('should keep tools without a canvas config inline even when the host offers a canvas', async () => {
    const { host } = createHost({ presentation: 'inline-expandable' });
    const render = vi.fn<ToolRenderFunction>(() => document.createElement('p'));

    await mount(host, createToolCall(), { name: 'report', renderer: { render } });

    const context = render.mock.calls[0][1];
    expect(context?.presentation).toBe('inline');
    expect(context?.canvas.available).toBe(false);
  });

  it('should render an artifact card instead of the renderer for inline "card"', async () => {
    const { host } = createHost({ presentation: 'inline-expandable' });
    const definition: AnyToolDefinition = {
      name: 'report',
      displayName: 'Report',
      renderer: { elementTag: RENDERER_TAG },
      canvas: { inline: 'card', subtitle: '12 rows' }
    };

    const el = await mount(host, createToolCall(), definition);

    const card = getCard(el) as HTMLElement & { titleText: string; subtitleText: string };
    expect(card).toBeTruthy();
    expect(card.getAttribute('title-text')).toBe('Report');
    expect(card.getAttribute('asset-id')).toBe('call-1');
    expect(card.subtitleText).toBe('12 rows');
    expect(el.shadowRoot!.querySelector(RENDERER_TAG)).toBeNull();
  });

  it('should render the renderer for "card-while-open" until the tool call is open in the canvas', async () => {
    const { host, provider } = createHost({ presentation: 'inline-expandable' });
    const definition: AnyToolDefinition = { name: 'report', renderer: { elementTag: RENDERER_TAG }, canvas: { inline: 'card-while-open' } };

    const el = await mount(host, createToolCall(), definition);

    expect(getCard(el)).toBeNull();
    expect(el.shadowRoot!.querySelector(RENDERER_TAG)).toBeTruthy();

    provider.setValue({ presentation: 'inline-expandable', openToolCallId: 'call-1' });
    await el.updateComplete;

    expect(getCard(el)).toBeTruthy();
    expect(getCard(el)!.hasAttribute('active')).toBe(true);
    expect(el.shadowRoot!.querySelector(RENDERER_TAG)).toBeNull();
  });

  it('should not render a card when the host does not offer a canvas', async () => {
    const { host } = createHost({ presentation: 'inline' });

    const el = await mount(host, createToolCall(), { name: 'report', renderer: { elementTag: RENDERER_TAG }, canvas: { inline: 'card' } });

    expect(getCard(el)).toBeNull();
    expect(el.shadowRoot!.querySelector(RENDERER_TAG)).toBeTruthy();
  });

  it('should request the canvas to open when the card is clicked', async () => {
    const { host, openRequests, closeRequests } = createHost({ presentation: 'inline-expandable' });
    const el = await mount(host, createToolCall(), {
      name: 'report',
      displayName: 'Report',
      renderer: { elementTag: RENDERER_TAG },
      canvas: { inline: 'card' }
    });

    await clickCard(el);

    expect(openRequests).toHaveLength(1);
    expect(openRequests[0]).toMatchObject({ toolCallId: 'call-1', toolName: 'report' });
    expect(closeRequests).toHaveLength(0);
  });

  it('should request the canvas to close when the card of the open tool call is clicked', async () => {
    const { host, openRequests, closeRequests } = createHost({ presentation: 'inline-expandable', openToolCallId: 'call-1' });
    const el = await mount(host, createToolCall(), { name: 'report', renderer: { elementTag: RENDERER_TAG }, canvas: { inline: 'card' } });

    await clickCard(el);

    expect(closeRequests).toEqual([{ toolCallId: 'call-1', handled: true }]);
    expect(openRequests).toHaveLength(0);
  });

  it('should re-run a render-function renderer with fresh canvas controls when the canvas state changes', async () => {
    const { host, provider } = createHost({ presentation: 'inline-expandable' });
    const render = vi.fn<ToolRenderFunction>(() => document.createElement('p'));
    const el = await mount(host, createToolCall(), { name: 'report', renderer: { render }, canvas: {} });
    expect(render).toHaveBeenCalledTimes(1);

    provider.setValue({ presentation: 'inline-expandable', openToolCallId: 'call-1' });
    await el.updateComplete;

    expect(render).toHaveBeenCalledTimes(2);
    expect(render.mock.calls[0][1]?.canvas.isOpen).toBe(false);
    expect(render.mock.calls[1][1]?.canvas.isOpen).toBe(true);
    expect(el.shadowRoot!.querySelectorAll('p')).toHaveLength(1);
  });

  it('should not re-run a render-function renderer when the canvas state is unchanged', async () => {
    const { host, provider } = createHost({ presentation: 'inline-expandable' });
    const render = vi.fn<ToolRenderFunction>(() => document.createElement('p'));
    const el = await mount(host, createToolCall(), { name: 'report', renderer: { render }, canvas: {} });

    provider.setValue({ presentation: 'inline-expandable' });
    await el.updateComplete;

    expect(render).toHaveBeenCalledTimes(1);
  });
});
