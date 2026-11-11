import { describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import { settle } from '../../testing/settle.js';
import type { AiChatInterfaceComponent } from './ai-chat-interface.js';

import './ai-chat-interface.js';

function slotNamed(el: AiChatInterfaceComponent, name?: string): HTMLSlotElement {
  return el.shadowRoot!.querySelector<HTMLSlotElement>(name ? `slot[name="${name}"]` : 'slot:not([name])')!;
}

describe('AiChatInterfaceComponent', () => {
  it('should register the custom element and render a shadow root', async () => {
    const el = await renderFixture<AiChatInterfaceComponent>(html`<forge-ai-chat-interface></forge-ai-chat-interface>`, 'forge-ai-chat-interface');

    expect(customElements.get('forge-ai-chat-interface')).toBeDefined();
    expect(el.shadowRoot).toBeTruthy();
  });

  it('should project content into each named slot and the default slot', async () => {
    const el = await renderFixture<AiChatInterfaceComponent>(
      html`<forge-ai-chat-interface>
        <div slot="header" id="header"></div>
        <div id="message"></div>
        <div slot="suggestions" id="suggestions"></div>
        <div slot="attachments" id="attachments"></div>
        <div slot="prompt" id="prompt"></div>
        <div slot="disclaimer" id="disclaimer"></div>
      </forge-ai-chat-interface>`,
      'forge-ai-chat-interface'
    );

    expect(slotNamed(el, 'header').assignedElements()).toEqual([el.querySelector('#header')]);
    expect(slotNamed(el).assignedElements()).toEqual([el.querySelector('#message')]);
    expect(slotNamed(el, 'suggestions').assignedElements()).toEqual([el.querySelector('#suggestions')]);
    expect(slotNamed(el, 'attachments').assignedElements()).toEqual([el.querySelector('#attachments')]);
    expect(slotNamed(el, 'prompt').assignedElements()).toEqual([el.querySelector('#prompt')]);
    expect(slotNamed(el, 'disclaimer').assignedElements()).toEqual([el.querySelector('#disclaimer')]);
  });

  it('should expose the messages container as the "messages" part', async () => {
    const el = await renderFixture<AiChatInterfaceComponent>(html`<forge-ai-chat-interface></forge-ai-chat-interface>`, 'forge-ai-chat-interface');

    expect(el.shadowRoot!.querySelector('[part="messages"]')).toBeTruthy();
    expect(el.shadowRoot!.querySelector('[part="messages"] slot:not([name])')).toBeTruthy();
  });

  it('should not wrap the suggestions slot when nothing is slotted', async () => {
    const el = await renderFixture<AiChatInterfaceComponent>(html`<forge-ai-chat-interface></forge-ai-chat-interface>`, 'forge-ai-chat-interface');

    expect(el.shadowRoot!.querySelector('.suggestions-container')).toBeNull();
    expect(el.shadowRoot!.querySelector('.attachments-container')).toBeNull();
  });

  it('should wrap the suggestions slot once suggestions are slotted', async () => {
    const el = await renderFixture<AiChatInterfaceComponent>(html`<forge-ai-chat-interface></forge-ai-chat-interface>`, 'forge-ai-chat-interface');

    const suggestions = document.createElement('div');
    suggestions.slot = 'suggestions';
    el.append(suggestions);
    await settle(el);

    expect(el.shadowRoot!.querySelector('.suggestions-container slot[name="suggestions"]')).toBeTruthy();
    expect(slotNamed(el, 'suggestions').assignedElements()).toEqual([suggestions]);
  });

  it('should wrap the attachments slot once attachments are slotted', async () => {
    const el = await renderFixture<AiChatInterfaceComponent>(html`<forge-ai-chat-interface></forge-ai-chat-interface>`, 'forge-ai-chat-interface');

    const attachments = document.createElement('div');
    attachments.slot = 'attachments';
    el.append(attachments);
    await settle(el);

    expect(el.shadowRoot!.querySelector('.attachments-container slot[name="attachments"]')).toBeTruthy();
  });

  it('should remove the suggestions wrapper when the slotted content is removed', async () => {
    const el = await renderFixture<AiChatInterfaceComponent>(
      html`<forge-ai-chat-interface><div slot="suggestions" id="s"></div></forge-ai-chat-interface>`,
      'forge-ai-chat-interface'
    );
    await settle(el);
    expect(el.shadowRoot!.querySelector('.suggestions-container')).toBeTruthy();

    el.querySelector('#s')!.remove();
    await settle(el);

    expect(el.shadowRoot!.querySelector('.suggestions-container')).toBeNull();
  });

  it('should scroll the messages container to the bottom smoothly in scrollToBottom', async () => {
    const el = await renderFixture<AiChatInterfaceComponent>(
      html`<forge-ai-chat-interface style="display: block; height: 300px"><div id="tall" style="height: 3000px">Tall</div></forge-ai-chat-interface>`,
      'forge-ai-chat-interface'
    );
    const container = el.shadowRoot!.querySelector<HTMLElement>('.messages-container')!;
    const scrollTo = vi.spyOn(container, 'scrollTo').mockImplementation(() => {});

    el.scrollToBottom();

    expect(container.scrollHeight).toBeGreaterThan(300);
    expect(scrollTo).toHaveBeenCalledWith({ top: container.scrollHeight, behavior: 'smooth' });
    expect(scrollTo.mock.calls[0][0]).toMatchObject({ top: expect.any(Number) });
    expect((scrollTo.mock.calls[0][0] as ScrollToOptions).top).toBeGreaterThan(0);
  });
});
