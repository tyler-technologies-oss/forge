import { describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { renderFixture } from '../../testing/fixture.js';
import type { Thread } from '../types/index.js';
import { AiEditThreadComponent, AiEditThreadComponentTagName, type ForgeAiEditThreadSaveEventData } from './index.js';

const TAG = 'forge-ai-edit-thread';

const thread: Thread = { id: 't1', title: 'Original title', createdAt: '2024-01-01T00:00:00Z' };

function createElement(value = thread.title, density: 'small' | 'medium' = 'small'): Promise<AiEditThreadComponent> {
  return renderFixture<AiEditThreadComponent>(html`<forge-ai-edit-thread .thread=${thread} .value=${value} .density=${density}></forge-ai-edit-thread>`, TAG);
}

function getInput(el: AiEditThreadComponent): HTMLInputElement {
  return el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
}

function getButton(el: AiEditThreadComponent, label: 'Save' | 'Cancel'): HTMLButtonElement {
  return el.shadowRoot!.querySelector<HTMLButtonElement>(`button[aria-label="${label}"]`)!;
}

describe('AiEditThreadComponent', () => {
  describe('registration', () => {
    it('should be registered under the forge-ai-edit-thread tag', async () => {
      const el = await createElement();

      expect(AiEditThreadComponentTagName).toBe(TAG);
      expect(customElements.get(TAG)).toBe(AiEditThreadComponent);
      expect(el).toBeInstanceOf(AiEditThreadComponent);
    });

    it('should render a shadow root', async () => {
      const el = await createElement();

      expect(el.shadowRoot).toBeTruthy();
    });
  });

  describe('properties', () => {
    it('should default value to an empty string and density to small', async () => {
      const el = await renderFixture<AiEditThreadComponent>(html`<forge-ai-edit-thread .thread=${thread}></forge-ai-edit-thread>`, TAG);

      expect(el.value).toBe('');
      expect(el.density).toBe('small');
    });

    it('should render the value in the input', async () => {
      const el = await createElement('Custom');

      expect(getInput(el).value).toBe('Custom');
    });

    it('should update the input when value changes', async () => {
      const el = await createElement();

      el.value = 'Changed';
      await el.updateComplete;

      expect(getInput(el).value).toBe('Changed');
    });

    it('should apply the small button class by default', async () => {
      const el = await createElement();

      expect(getButton(el, 'Save').classList.contains('forge-icon-button--small')).toBe(true);
      expect(getButton(el, 'Cancel').classList.contains('forge-icon-button--small')).toBe(true);
    });

    it('should omit the small button class when density is medium', async () => {
      const el = await createElement(thread.title, 'medium');

      expect(el.density).toBe('medium');
      expect(getButton(el, 'Save').classList.contains('forge-icon-button--small')).toBe(false);
      expect(getButton(el, 'Cancel').classList.contains('forge-icon-button--small')).toBe(false);
    });

    it('should read the density attribute', async () => {
      const el = await renderFixture<AiEditThreadComponent>(html`<forge-ai-edit-thread density="medium" .thread=${thread}></forge-ai-edit-thread>`, TAG);

      expect(el.density).toBe('medium');
    });
  });

  describe('focus', () => {
    it('should focus the input and select its text on first render', async () => {
      const el = await createElement();

      await vi.waitFor(() => expect(el.shadowRoot!.activeElement).toBe(getInput(el)));
      const input = getInput(el);
      expect(input.selectionStart).toBe(0);
      expect(input.selectionEnd).toBe(input.value.length);
    });
  });

  describe('save', () => {
    it('should dispatch a save event with old and new titles when Save is clicked', async () => {
      const el = await createElement();
      const listener = vi.fn<(event: CustomEvent<ForgeAiEditThreadSaveEventData>) => void>();
      el.addEventListener('forge-ai-edit-thread-save', listener);
      getInput(el).value = 'New title';

      await userEvent.click(getButton(el, 'Save'));

      expect(listener).toHaveBeenCalledTimes(1);
      const event = listener.mock.calls[0][0];
      expect(event.detail).toEqual({ id: 't1', oldTitle: 'Original title', newTitle: 'New title' });
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
    });

    it('should dispatch a save event when Enter is pressed', async () => {
      const el = await createElement();
      const listener = vi.fn<(event: CustomEvent<ForgeAiEditThreadSaveEventData>) => void>();
      el.addEventListener('forge-ai-edit-thread-save', listener);
      const input = getInput(el);
      input.value = 'Via enter';

      const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true, cancelable: true });
      input.dispatchEvent(event);

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener.mock.calls[0][0].detail.newTitle).toBe('Via enter');
      expect(event.defaultPrevented).toBe(true);
    });

    it('should trim the new title', async () => {
      const el = await createElement();
      const listener = vi.fn<(event: CustomEvent<ForgeAiEditThreadSaveEventData>) => void>();
      el.addEventListener('forge-ai-edit-thread-save', listener);
      getInput(el).value = '   Padded   ';

      getButton(el, 'Save').click();

      expect(listener.mock.calls[0][0].detail.newTitle).toBe('Padded');
    });

    it('should dispatch cancel instead of save when the title is unchanged', async () => {
      const el = await createElement();
      const save = vi.fn();
      const cancel = vi.fn();
      el.addEventListener('forge-ai-edit-thread-save', save);
      el.addEventListener('forge-ai-edit-thread-cancel', cancel);

      getButton(el, 'Save').click();

      expect(save).not.toHaveBeenCalled();
      expect(cancel).toHaveBeenCalledTimes(1);
    });

    it('should dispatch cancel instead of save when the title is only whitespace', async () => {
      const el = await createElement();
      const save = vi.fn();
      const cancel = vi.fn();
      el.addEventListener('forge-ai-edit-thread-save', save);
      el.addEventListener('forge-ai-edit-thread-cancel', cancel);
      getInput(el).value = '    ';

      getButton(el, 'Save').click();

      expect(save).not.toHaveBeenCalled();
      expect(cancel).toHaveBeenCalledTimes(1);
    });
  });

  describe('cancel', () => {
    it('should dispatch a bubbling composed cancel event when Cancel is clicked', async () => {
      const el = await createElement();
      const listener = vi.fn<(event: Event) => void>();
      el.addEventListener('forge-ai-edit-thread-cancel', listener);

      await userEvent.click(getButton(el, 'Cancel'));

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener.mock.calls[0][0].bubbles).toBe(true);
      expect(listener.mock.calls[0][0].composed).toBe(true);
    });

    it('should dispatch cancel and stop propagation when Escape is pressed', async () => {
      const el = await createElement();
      const cancel = vi.fn();
      const outer = vi.fn();
      el.addEventListener('forge-ai-edit-thread-cancel', cancel);
      document.body.addEventListener('keydown', outer);

      getInput(el).dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true, cancelable: true }));
      document.body.removeEventListener('keydown', outer);

      expect(cancel).toHaveBeenCalledTimes(1);
      expect(outer).not.toHaveBeenCalled();
    });

    it('should mark the input as handling escape', async () => {
      const el = await createElement();

      expect(getInput(el).hasAttribute('data-handles-escape')).toBe(true);
    });

    it('should ignore other keys', async () => {
      const el = await createElement();
      const save = vi.fn();
      const cancel = vi.fn();
      el.addEventListener('forge-ai-edit-thread-save', save);
      el.addEventListener('forge-ai-edit-thread-cancel', cancel);

      getInput(el).dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true, composed: true }));

      expect(save).not.toHaveBeenCalled();
      expect(cancel).not.toHaveBeenCalled();
    });

    it('should dispatch cancel when focus leaves the component', async () => {
      const el = await createElement();
      const listener = vi.fn();
      el.addEventListener('forge-ai-edit-thread-cancel', listener);
      const outside = document.createElement('button');
      document.body.append(outside);
      await vi.waitFor(() => expect(el.shadowRoot!.activeElement).toBe(getInput(el)));

      outside.focus();
      outside.remove();

      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('should not dispatch cancel when focus moves between controls inside the component', async () => {
      const el = await createElement();
      const listener = vi.fn();
      el.addEventListener('forge-ai-edit-thread-cancel', listener);
      await vi.waitFor(() => expect(el.shadowRoot!.activeElement).toBe(getInput(el)));

      getButton(el, 'Save').focus();

      expect(listener).not.toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('should label the Save and Cancel buttons', async () => {
      const el = await createElement();

      expect(getButton(el, 'Save')).toBeTruthy();
      expect(getButton(el, 'Cancel')).toBeTruthy();
    });
  });
});
