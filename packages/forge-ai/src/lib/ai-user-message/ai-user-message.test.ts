import { describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { renderFixture } from '../../testing/fixture.js';
import type { AiUserMessageToolbarComponent } from '../ai-user-message-toolbar/ai-user-message-toolbar.js';
import {
  AiUserMessageComponent,
  AiUserMessageComponentTagName,
  type ForgeAiUserMessageCopyEventData,
  type ForgeAiUserMessageEditEventData,
  type ForgeAiUserMessageResendEventData
} from './ai-user-message.js';

const TAG = 'forge-ai-user-message';
const TIMESTAMP = 1_700_000_000_000;

function createElement(template?: unknown): Promise<AiUserMessageComponent> {
  return renderFixture<AiUserMessageComponent>(
    template ?? html`<forge-ai-user-message message-id="m1" .timestamp=${TIMESTAMP} .content=${'Hello'}>Hello</forge-ai-user-message>`,
    TAG
  );
}

function toolbar(el: AiUserMessageComponent): AiUserMessageToolbarComponent | null {
  return el.shadowRoot!.querySelector<AiUserMessageToolbarComponent>('forge-ai-user-message-toolbar');
}

async function toolbarButton(el: AiUserMessageComponent, id: string): Promise<HTMLButtonElement> {
  const tb = toolbar(el)!;
  await tb.updateComplete;
  return tb.shadowRoot!.querySelector<HTMLButtonElement>(`#${id}`)!;
}

async function startEditing(el: AiUserMessageComponent): Promise<HTMLTextAreaElement> {
  (await toolbarButton(el, 'edit-btn')).click();
  await el.updateComplete;
  return el.shadowRoot!.querySelector<HTMLTextAreaElement>('textarea')!;
}

function saveButton(el: AiUserMessageComponent): HTMLButtonElement {
  return Array.from(el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.edit-footer button')).find(b => b.textContent!.trim() === 'Save')!;
}

function cancelButton(el: AiUserMessageComponent): HTMLButtonElement {
  return Array.from(el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.edit-footer button')).find(b => b.textContent!.trim() === 'Cancel')!;
}

describe('AiUserMessageComponent', () => {
  it('should be registered under the forge-ai-user-message tag', async () => {
    const el = await createElement();

    expect(AiUserMessageComponentTagName).toBe(TAG);
    expect(customElements.get(TAG)).toBe(AiUserMessageComponent);
    expect(el).toBeInstanceOf(AiUserMessageComponent);
  });

  it('should contain shadow root', async () => {
    const el = await createElement();

    expect(el.shadowRoot).toBeTruthy();
  });

  describe('properties', () => {
    it('should have the expected defaults', async () => {
      const el = await createElement(html`<forge-ai-user-message></forge-ai-user-message>`);

      expect(el.timestamp).toBeUndefined();
      expect(el.messageId).toBeUndefined();
      expect(el.streaming).toBe(false);
      expect(el.content).toBeUndefined();
    });

    it('should read message-id and streaming from attributes', async () => {
      const el = await createElement(html`<forge-ai-user-message message-id="abc" streaming></forge-ai-user-message>`);

      expect(el.messageId).toBe('abc');
      expect(el.streaming).toBe(true);
    });
  });

  describe('slot', () => {
    it('should project default slot content', async () => {
      const el = await createElement(html`<forge-ai-user-message><p>Body</p></forge-ai-user-message>`);

      const assigned = el.shadowRoot!.querySelector<HTMLSlotElement>('slot')!.assignedElements();

      expect(assigned.map(n => n.textContent)).toEqual(['Body']);
    });
  });

  describe('toolbar visibility', () => {
    it('should render the toolbar when message-id and timestamp are present', async () => {
      const el = await createElement();

      expect(toolbar(el)).toBeTruthy();
    });

    it('should not render the toolbar without a message id', async () => {
      const el = await createElement(html`<forge-ai-user-message .timestamp=${TIMESTAMP}></forge-ai-user-message>`);

      expect(toolbar(el)).toBeNull();
    });

    it('should not render the toolbar without a timestamp', async () => {
      const el = await createElement(html`<forge-ai-user-message message-id="m1"></forge-ai-user-message>`);

      expect(toolbar(el)).toBeNull();
    });

    it('should pass the timestamp and streaming state to the toolbar', async () => {
      const el = await createElement(html`<forge-ai-user-message message-id="m1" .timestamp=${TIMESTAMP} streaming></forge-ai-user-message>`);

      expect(toolbar(el)!.timestamp).toBe(TIMESTAMP);
      expect(toolbar(el)!.streaming).toBe(true);
    });
  });

  describe('toolbar events', () => {
    it('should dispatch a copy event with the message id', async () => {
      const el = await createElement();
      const listener = vi.fn<(evt: CustomEvent<ForgeAiUserMessageCopyEventData>) => void>();
      document.body.addEventListener('forge-ai-user-message-copy', listener);

      (await toolbarButton(el, 'copy-btn')).click();
      document.body.removeEventListener('forge-ai-user-message-copy', listener);

      expect(listener).toHaveBeenCalledOnce();
      expect(listener.mock.calls[0][0].detail).toEqual({ messageId: 'm1' });
      expect(listener.mock.calls[0][0].bubbles).toBe(true);
      expect(listener.mock.calls[0][0].composed).toBe(true);
    });

    it('should dispatch a resend event with the message id', async () => {
      const el = await createElement();
      const listener = vi.fn<(evt: CustomEvent<ForgeAiUserMessageResendEventData>) => void>();
      document.body.addEventListener('forge-ai-user-message-resend', listener);

      (await toolbarButton(el, 'resend-btn')).click();
      document.body.removeEventListener('forge-ai-user-message-resend', listener);

      expect(listener).toHaveBeenCalledOnce();
      expect(listener.mock.calls[0][0].detail).toEqual({ messageId: 'm1' });
      expect(listener.mock.calls[0][0].bubbles).toBe(true);
      expect(listener.mock.calls[0][0].composed).toBe(true);
    });
  });

  describe('editing', () => {
    it('should switch to an edit form seeded with the content when edit is clicked', async () => {
      const el = await createElement();

      const textarea = await startEditing(el);

      expect(textarea).toBeTruthy();
      expect(textarea.value).toBe('Hello');
      expect(el.shadowRoot!.querySelector('slot')).toBeNull();
    });

    it('should hide the toolbar while editing', async () => {
      const el = await createElement();

      await startEditing(el);

      expect(toolbar(el)).toBeNull();
    });

    it('should seed an empty textarea when content is undefined', async () => {
      const el = await createElement(html`<forge-ai-user-message message-id="m1" .timestamp=${TIMESTAMP}></forge-ai-user-message>`);

      const textarea = await startEditing(el);

      expect(textarea.value).toBe('');
    });

    it('should disable Save until the content changes', async () => {
      const el = await createElement();
      await startEditing(el);

      expect(saveButton(el).disabled).toBe(true);
    });

    it('should disable Save when the edit is whitespace only', async () => {
      const el = await createElement();
      const textarea = await startEditing(el);

      textarea.value = '   ';
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      await el.updateComplete;

      expect(saveButton(el).disabled).toBe(true);
    });

    it('should disable Save when the edit only differs by surrounding whitespace', async () => {
      const el = await createElement();
      const textarea = await startEditing(el);

      textarea.value = '  Hello  ';
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      await el.updateComplete;

      expect(saveButton(el).disabled).toBe(true);
    });

    it('should disable Save when the original content has surrounding whitespace and the edit matches its trimmed form', async () => {
      const el = await createElement(
        html`<forge-ai-user-message message-id="m1" .timestamp=${TIMESTAMP} .content=${' Hello '}> Hello </forge-ai-user-message>`
      );
      const textarea = await startEditing(el);

      textarea.value = 'Hello';
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      await el.updateComplete;

      expect(saveButton(el).disabled).toBe(true);
    });

    it('should enable Save when the content is changed', async () => {
      const el = await createElement();
      const textarea = await startEditing(el);

      textarea.value = 'Hello there';
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      await el.updateComplete;

      expect(saveButton(el).disabled).toBe(false);
    });

    it('should accept typed input', async () => {
      const el = await createElement();
      const textarea = await startEditing(el);

      await userEvent.fill(textarea, 'Typed');
      await el.updateComplete;

      expect(saveButton(el).disabled).toBe(false);
    });

    it('should dispatch an edit event with the trimmed content on save and leave edit mode', async () => {
      const el = await createElement();
      const listener = vi.fn<(evt: CustomEvent<ForgeAiUserMessageEditEventData>) => void>();
      document.body.addEventListener('forge-ai-user-message-edit', listener);
      const textarea = await startEditing(el);
      textarea.value = '  New text  ';
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      await el.updateComplete;

      saveButton(el).click();
      await el.updateComplete;
      document.body.removeEventListener('forge-ai-user-message-edit', listener);

      expect(listener).toHaveBeenCalledOnce();
      expect(listener.mock.calls[0][0].detail).toEqual({ messageId: 'm1', content: 'New text' });
      expect(listener.mock.calls[0][0].bubbles).toBe(true);
      expect(listener.mock.calls[0][0].composed).toBe(true);
      expect(el.shadowRoot!.querySelector('textarea')).toBeNull();
      expect(toolbar(el)).toBeTruthy();
    });

    it('should not dispatch an edit event when saving unchanged content', async () => {
      const el = await createElement();
      const listener = vi.fn();
      el.addEventListener('forge-ai-user-message-edit', listener);
      await startEditing(el);

      saveButton(el).click();

      expect(listener).not.toHaveBeenCalled();
    });

    it('should leave edit mode without dispatching when cancelled', async () => {
      const el = await createElement();
      const listener = vi.fn();
      el.addEventListener('forge-ai-user-message-edit', listener);
      const textarea = await startEditing(el);
      textarea.value = 'Changed';
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      await el.updateComplete;

      cancelButton(el).click();
      await el.updateComplete;

      expect(listener).not.toHaveBeenCalled();
      expect(el.shadowRoot!.querySelector('textarea')).toBeNull();
      expect(toolbar(el)).toBeTruthy();
    });

    it('should reseed the textarea from content when editing again after a cancel', async () => {
      const el = await createElement();
      const textarea = await startEditing(el);
      textarea.value = 'Changed';
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      await el.updateComplete;
      cancelButton(el).click();
      await el.updateComplete;

      const next = await startEditing(el);

      expect(next.value).toBe('Hello');
    });
  });
});
