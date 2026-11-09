import { describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { renderFixture } from '../../testing/fixture.js';
import type { AiPromptComponent } from './ai-prompt.js';

import './ai-prompt.js';

function getTextarea(el: AiPromptComponent): HTMLTextAreaElement {
  return el.shadowRoot!.querySelector<HTMLTextAreaElement>('#chat-input')!;
}

describe('AiPromptComponent', () => {
  describe('input event', () => {
    it('should dispatch exactly one host input event for a native composed input event', async () => {
      const el = await renderFixture<AiPromptComponent>(html`<forge-ai-prompt></forge-ai-prompt>`, 'forge-ai-prompt');
      const listener = vi.fn<(event: Event) => void>();
      el.addEventListener('input', listener);

      const textarea = getTextarea(el);
      textarea.value = 'a';
      textarea.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true, inputType: 'insertText', data: 'a' }));

      expect(listener).toHaveBeenCalledTimes(1);
      const event = listener.mock.calls[0][0];
      expect(event.target).toBe(el);
      expect(event.composed).toBe(true);
      expect(event).toBeInstanceOf(InputEvent);
    });

    it('should dispatch exactly one host input event per keystroke when slash commands are configured', async () => {
      const el = await renderFixture<AiPromptComponent>(
        html`<forge-ai-prompt .slashCommands=${[{ name: 'help', description: 'Help' }]}></forge-ai-prompt>`,
        'forge-ai-prompt'
      );
      const listener = vi.fn();
      el.addEventListener('input', listener);

      const textarea = getTextarea(el);
      textarea.value = 'a';
      textarea.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true, inputType: 'insertText', data: 'a' }));

      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('should dispatch one host input event per typed character', async () => {
      const el = await renderFixture<AiPromptComponent>(html`<forge-ai-prompt></forge-ai-prompt>`, 'forge-ai-prompt');
      const listener = vi.fn();
      el.addEventListener('input', listener);

      await userEvent.type(getTextarea(el), 'abc');

      expect(listener).toHaveBeenCalledTimes(3);
    });

    it('should have the updated value when the host input event is observed', async () => {
      const el = await renderFixture<AiPromptComponent>(html`<forge-ai-prompt></forge-ai-prompt>`, 'forge-ai-prompt');
      const values: string[] = [];
      el.addEventListener('input', () => values.push(el.value));

      await userEvent.type(getTextarea(el), 'hi');

      expect(values).toEqual(['h', 'hi']);
    });
  });
});
