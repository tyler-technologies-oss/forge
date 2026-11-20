import { describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import type { ClientMessageAction, ClientMessageKind } from '../types/index.js';
import { AiClientMessageComponent, AiClientMessageComponentTagName } from './ai-client-message.js';

const TAG = 'forge-ai-client-message';

function createElement(template = html`<forge-ai-client-message></forge-ai-client-message>`): Promise<AiClientMessageComponent> {
  return renderFixture<AiClientMessageComponent>(template, TAG);
}

function actionButtons(el: AiClientMessageComponent): HTMLButtonElement[] {
  return Array.from(el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.client-message__actions button'));
}

describe('AiClientMessageComponent', () => {
  it('should be registered under the forge-ai-client-message tag', async () => {
    const el = await createElement();

    expect(AiClientMessageComponentTagName).toBe(TAG);
    expect(customElements.get(TAG)).toBe(AiClientMessageComponent);
    expect(el).toBeInstanceOf(AiClientMessageComponent);
  });

  it('should contain shadow root', async () => {
    const el = await createElement();

    expect(el.shadowRoot).toBeTruthy();
  });

  describe('defaults', () => {
    it('should have the expected default property values', async () => {
      const el = await createElement();

      expect(el.kind).toBe('text');
      expect(el.header).toBeUndefined();
      expect(el.content).toBe('');
      expect(el.actions).toEqual([]);
    });

    it('should reflect the default kind to the attribute', async () => {
      const el = await createElement();

      expect(el.getAttribute('kind')).toBe('text');
    });

    it('should read kind, header, and content from attributes', async () => {
      const el = await createElement(html`<forge-ai-client-message kind="warning" header="Heads up" content="Careful"></forge-ai-client-message>`);

      expect(el.kind).toBe('warning');
      expect(el.header).toBe('Heads up');
      expect(el.content).toBe('Careful');
    });
  });

  describe('text kind', () => {
    it('should render plain content without a banner or icon', async () => {
      const el = await createElement(html`<forge-ai-client-message content="Session started"></forge-ai-client-message>`);

      expect(el.shadowRoot!.querySelector('.client-message--text span')!.textContent).toBe('Session started');
      expect(el.shadowRoot!.querySelector('.forge-inline-message')).toBeNull();
      expect(el.shadowRoot!.querySelector('svg')).toBeNull();
    });

    it('should not render the header', async () => {
      const el = await createElement(html`<forge-ai-client-message header="Title" content="Body"></forge-ai-client-message>`);

      expect(el.shadowRoot!.textContent).not.toContain('Title');
    });
  });

  describe.each<ClientMessageKind>(['info', 'warning', 'error', 'success'])('%s kind', kind => {
    it('should render an inline message banner with a decorative icon', async () => {
      const el = await createElement(html`<forge-ai-client-message kind=${kind} content="Body"></forge-ai-client-message>`);

      expect(el.shadowRoot!.querySelector('.forge-inline-message')).toBeTruthy();
      expect(el.shadowRoot!.querySelector('.client-message--text')).toBeNull();
      expect(el.shadowRoot!.querySelector('svg.forge-inline-message__icon')!.getAttribute('aria-hidden')).toBe('true');
      expect(el.shadowRoot!.querySelector('.forge-inline-message__content span')!.textContent).toBe('Body');
    });
  });

  it('should render a different icon per kind', async () => {
    const paths = new Set<string | null>();
    for (const kind of ['info', 'warning', 'error', 'success'] as const) {
      const el = await createElement(html`<forge-ai-client-message kind=${kind}></forge-ai-client-message>`);
      paths.add(el.shadowRoot!.querySelectorAll('path')[1].getAttribute('d'));
    }

    expect(paths.size).toBe(4);
  });

  describe('header', () => {
    it('should render the header title in banner kinds', async () => {
      const el = await createElement(html`<forge-ai-client-message kind="info" header="Notice" content="Body"></forge-ai-client-message>`);

      expect(el.shadowRoot!.querySelector('.forge-inline-message__title')!.textContent).toBe('Notice');
    });

    it('should omit the header title when not provided', async () => {
      const el = await createElement(html`<forge-ai-client-message kind="info" content="Body"></forge-ai-client-message>`);

      expect(el.shadowRoot!.querySelector('.forge-inline-message__title')).toBeNull();
    });
  });

  describe('actions', () => {
    const makeActions = (onClick = vi.fn()): ClientMessageAction[] => [
      { id: 'retry', label: 'Retry', onClick },
      { id: 'dismiss', label: 'Dismiss', onClick: vi.fn() }
    ];

    it('should not render the actions container when there are none', async () => {
      const el = await createElement(html`<forge-ai-client-message content="x"></forge-ai-client-message>`);

      expect(el.shadowRoot!.querySelector('.client-message__actions')).toBeNull();
    });

    it('should render an action button per action in the text kind', async () => {
      const el = await createElement(html`<forge-ai-client-message content="x" .actions=${makeActions()}></forge-ai-client-message>`);

      expect(actionButtons(el).map(b => b.textContent!.trim())).toEqual(['Retry', 'Dismiss']);
    });

    it('should render an action button per action in banner kinds', async () => {
      const el = await createElement(html`<forge-ai-client-message kind="error" content="x" .actions=${makeActions()}></forge-ai-client-message>`);

      expect(actionButtons(el).map(b => b.textContent!.trim())).toEqual(['Retry', 'Dismiss']);
    });

    it('should render action buttons as non-submitting buttons', async () => {
      const el = await createElement(html`<forge-ai-client-message content="x" .actions=${makeActions()}></forge-ai-client-message>`);

      for (const button of actionButtons(el)) {
        expect(button.type).toBe('button');
      }
    });

    it('should invoke the action callback when its button is clicked', async () => {
      const onClick = vi.fn();
      const el = await createElement(html`<forge-ai-client-message content="x" .actions=${makeActions(onClick)}></forge-ai-client-message>`);

      actionButtons(el)[0].click();

      expect(onClick).toHaveBeenCalledOnce();
    });

    it('should only invoke the callback of the clicked action', async () => {
      const first = vi.fn();
      const second = vi.fn();
      const actions: ClientMessageAction[] = [
        { id: 'a', label: 'A', onClick: first },
        { id: 'b', label: 'B', onClick: second }
      ];
      const el = await createElement(html`<forge-ai-client-message content="x" .actions=${actions}></forge-ai-client-message>`);

      actionButtons(el)[1].click();

      expect(first).not.toHaveBeenCalled();
      expect(second).toHaveBeenCalledOnce();
    });

    it('should remove the actions when the property is cleared', async () => {
      const el = await createElement(html`<forge-ai-client-message content="x" .actions=${makeActions()}></forge-ai-client-message>`);

      el.actions = [];
      await el.updateComplete;

      expect(actionButtons(el)).toHaveLength(0);
    });
  });

  it('should switch layout when kind changes', async () => {
    const el = await createElement(html`<forge-ai-client-message content="x"></forge-ai-client-message>`);

    el.kind = 'success';
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector('.forge-inline-message')).toBeTruthy();
    expect(el.getAttribute('kind')).toBe('success');
  });
});
