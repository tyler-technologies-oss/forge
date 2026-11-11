import { describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { renderFixture } from '../../testing/fixture.js';
import type { ContextItem, SlashCommand } from '../types/index.js';
import {
  AiPromptComponent,
  AiPromptComponentTagName,
  type ForgeAiPromptAttachmentEventData,
  type ForgeAiPromptCommandEventData,
  type ForgeAiPromptContextRemoveEventData,
  type ForgeAiPromptSendEventData
} from './index.js';

import './ai-prompt.js';

function getTextarea(el: AiPromptComponent): HTMLTextAreaElement {
  return el.shadowRoot!.querySelector<HTMLTextAreaElement>('#chat-input')!;
}

const commands: SlashCommand[] = [
  { id: 'clear', name: 'clear', group: 'Conversation' },
  { id: 'export', name: 'export', group: 'Conversation' },
  { id: 'info', name: 'info', group: 'Help' }
];

function createElement(template = html`<forge-ai-prompt></forge-ai-prompt>`): Promise<AiPromptComponent> {
  return renderFixture<AiPromptComponent>(template, 'forge-ai-prompt');
}

function getSendButton(el: AiPromptComponent): HTMLButtonElement {
  return el.shadowRoot!.querySelector<HTMLButtonElement>('#send-btn')!;
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

  describe('registration', () => {
    it('should be registered under the forge-ai-prompt tag', async () => {
      const el = await createElement();

      expect(AiPromptComponentTagName).toBe('forge-ai-prompt');
      expect(customElements.get('forge-ai-prompt')).toBe(AiPromptComponent);
      expect(el).toBeInstanceOf(AiPromptComponent);
      expect(el.shadowRoot).toBeTruthy();
    });
  });

  describe('properties', () => {
    it('should have the expected defaults', async () => {
      const el = await createElement();

      expect(el.placeholder).toBe('Ask a question...');
      expect(el.value).toBe('');
      expect(el.variant).toBe('stacked');
      expect(el.sendDisabled).toBe(false);
      expect(el.autofocus).toBe(false);
      expect(el.inputDisabled).toBe(false);
      expect(el.cancelOnEscape).toBe(true);
      expect(el.running).toBe(false);
      expect(el.debugMode).toBe(false);
      expect(el.slashCommands).toEqual([]);
      expect(el.contextItems).toEqual([]);
    });

    it('should render the placeholder', async () => {
      const el = await createElement(html`<forge-ai-prompt placeholder="Say something"></forge-ai-prompt>`);

      expect(el.placeholder).toBe('Say something');
      expect(getTextarea(el).placeholder).toBe('Say something');
    });

    it('should render the value in the textarea and update when value changes', async () => {
      const el = await createElement(html`<forge-ai-prompt value="hello"></forge-ai-prompt>`);
      expect(getTextarea(el).value).toBe('hello');

      el.value = 'changed';
      await el.updateComplete;

      expect(getTextarea(el).value).toBe('changed');
    });

    it('should disable the textarea and send button when input-disabled', async () => {
      const el = await createElement(html`<forge-ai-prompt input-disabled></forge-ai-prompt>`);

      expect(el.inputDisabled).toBe(true);
      expect(getTextarea(el).disabled).toBe(true);
      expect(getSendButton(el).disabled).toBe(true);
    });

    it('should disable only the send button when send-disabled', async () => {
      const el = await createElement(html`<forge-ai-prompt send-disabled></forge-ai-prompt>`);

      expect(el.sendDisabled).toBe(true);
      expect(getTextarea(el).disabled).toBe(false);
      expect(getSendButton(el).disabled).toBe(true);
    });

    it('should read the cancel-on-escape attribute', async () => {
      const el = await createElement(html`<forge-ai-prompt .cancelOnEscape=${false}></forge-ai-prompt>`);

      expect(el.cancelOnEscape).toBe(false);
    });

    it('should read the debug-mode attribute', async () => {
      const el = await createElement(html`<forge-ai-prompt debug-mode></forge-ai-prompt>`);

      expect(el.debugMode).toBe(true);
    });

    it('should focus the textarea on first render when autofocus is set', async () => {
      const el = await createElement(html`<forge-ai-prompt .autofocus=${true}></forge-ai-prompt>`);

      expect(el.shadowRoot!.activeElement).toBe(getTextarea(el));
    });

    it('should not focus the textarea on first render by default', async () => {
      const el = await createElement();

      expect(el.shadowRoot!.activeElement).toBeNull();
    });
  });

  describe('variant', () => {
    it('should expose the stacked custom state by default', async () => {
      const el = await createElement();

      expect(el.matches(':state(stacked)')).toBe(true);
      expect(el.matches(':state(inline)')).toBe(false);
    });

    it('should expose the inline custom state when variant is inline', async () => {
      const el = await createElement(html`<forge-ai-prompt variant="inline"></forge-ai-prompt>`);

      expect(el.variant).toBe('inline');
      expect(el.matches(':state(inline)')).toBe(true);
      expect(el.matches(':state(stacked)')).toBe(false);
    });

    it('should update custom state when variant changes', async () => {
      const el = await createElement();

      el.variant = 'inline';
      await el.updateComplete;

      expect(el.matches(':state(inline)')).toBe(true);
      expect(el.matches(':state(stacked)')).toBe(false);
    });

    it('should render the actions container only in the stacked variant', async () => {
      const stacked = await createElement();
      const inline = await createElement(html`<forge-ai-prompt variant="inline"></forge-ai-prompt>`);

      expect(stacked.shadowRoot!.querySelector('.actions')).toBeTruthy();
      expect(inline.shadowRoot!.querySelector('.actions')).toBeNull();
    });

    it('should project actions-start and actions-end slots in the stacked variant', async () => {
      const el = await createElement(
        html`<forge-ai-prompt><button slot="actions-start" id="s"></button><button slot="actions-end" id="e"></button></forge-ai-prompt>`
      );

      expect(el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="actions-start"]')!.assignedElements()).toEqual([el.querySelector('#s')]);
      expect(el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="actions-end"]')!.assignedElements()).toEqual([el.querySelector('#e')]);
    });

    it('should project actions-start and actions-end slots in the inline variant', async () => {
      const el = await createElement(
        html`<forge-ai-prompt variant="inline"><button slot="actions-start" id="s"></button><button slot="actions-end" id="e"></button></forge-ai-prompt>`
      );

      expect(el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="actions-start"]')!.assignedElements()).toEqual([el.querySelector('#s')]);
      expect(el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="actions-end"]')!.assignedElements()).toEqual([el.querySelector('#e')]);
    });

    it('should render a divider in the stacked variant only when slash commands exist', async () => {
      const without = await createElement();
      const withCommands = await createElement(html`<forge-ai-prompt .slashCommands=${commands}></forge-ai-prompt>`);

      expect(without.shadowRoot!.querySelector('.vertical-divider')).toBeNull();
      expect(withCommands.shadowRoot!.querySelector('.vertical-divider')).toBeTruthy();
    });
  });

  describe('send', () => {
    it('should dispatch a send event with the value when the send button is clicked', async () => {
      const el = await createElement(html`<forge-ai-prompt value="hello"></forge-ai-prompt>`);
      const listener = vi.fn<(event: CustomEvent<ForgeAiPromptSendEventData>) => void>();
      el.addEventListener('forge-ai-prompt-send', listener);

      await userEvent.click(getSendButton(el));

      expect(listener).toHaveBeenCalledTimes(1);
      const event = listener.mock.calls[0][0];
      expect(event.detail.value).toBe('hello');
      expect(event.detail.date).toBeInstanceOf(Date);
      expect(typeof event.detail.time).toBe('string');
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
      expect(event.cancelable).toBe(true);
    });

    it('should clear the value after sending', async () => {
      const el = await createElement(html`<forge-ai-prompt value="hello"></forge-ai-prompt>`);

      getSendButton(el).click();
      await el.updateComplete;

      expect(el.value).toBe('');
      expect(getTextarea(el).value).toBe('');
    });

    it('should send when Enter is pressed', async () => {
      const el = await createElement();
      const listener = vi.fn<(event: CustomEvent<ForgeAiPromptSendEventData>) => void>();
      el.addEventListener('forge-ai-prompt-send', listener);

      await userEvent.type(getTextarea(el), 'typed{Enter}');

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener.mock.calls[0][0].detail.value).toBe('typed');
    });

    it('should not send when Shift+Enter is pressed', async () => {
      const el = await createElement();
      const listener = vi.fn();
      el.addEventListener('forge-ai-prompt-send', listener);

      await userEvent.type(getTextarea(el), 'line');
      await userEvent.keyboard('{Shift>}{Enter}{/Shift}');

      expect(listener).not.toHaveBeenCalled();
    });

    it('should not send while an IME composition is active', async () => {
      const el = await createElement(html`<forge-ai-prompt value="hello"></forge-ai-prompt>`);
      const listener = vi.fn();
      el.addEventListener('forge-ai-prompt-send', listener);

      getTextarea(el).dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', isComposing: true, bubbles: true, composed: true, cancelable: true }));

      expect(listener).not.toHaveBeenCalled();
    });

    it('should not send an empty or whitespace-only value', async () => {
      const el = await createElement(html`<forge-ai-prompt value="   "></forge-ai-prompt>`);
      const listener = vi.fn();
      el.addEventListener('forge-ai-prompt-send', listener);

      getSendButton(el).click();
      getTextarea(el).dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true, cancelable: true }));

      expect(listener).not.toHaveBeenCalled();
    });

    it('should not send when send-disabled', async () => {
      const el = await createElement(html`<forge-ai-prompt value="hello" send-disabled></forge-ai-prompt>`);
      const listener = vi.fn();
      el.addEventListener('forge-ai-prompt-send', listener);

      getTextarea(el).dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true, cancelable: true }));

      expect(listener).not.toHaveBeenCalled();
    });

    it('should not send when input-disabled', async () => {
      const el = await createElement(html`<forge-ai-prompt value="hello" input-disabled></forge-ai-prompt>`);
      const listener = vi.fn();
      el.addEventListener('forge-ai-prompt-send', listener);

      getTextarea(el).dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true, cancelable: true }));

      expect(listener).not.toHaveBeenCalled();
    });

    it('should keep the value when the send event is cancelled', async () => {
      const el = await createElement(html`<forge-ai-prompt value="keep me"></forge-ai-prompt>`);
      el.addEventListener('forge-ai-prompt-send', e => e.preventDefault());

      getSendButton(el).click();
      await el.updateComplete;

      expect(el.value).toBe('keep me');
      expect(el.getHistory()).toEqual([]);
    });

    it('should record the sent message in history', async () => {
      const el = await createElement(html`<forge-ai-prompt value="first"></forge-ai-prompt>`);

      getSendButton(el).click();

      expect(el.getHistory()).toEqual(['first']);
    });

    it('should prevent the default Enter behavior', async () => {
      const el = await createElement();
      const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true, cancelable: true });

      getTextarea(el).dispatchEvent(event);

      expect(event.defaultPrevented).toBe(true);
    });
  });

  describe('stop button', () => {
    it('should show a stop button when running with an empty value', async () => {
      const el = await createElement(html`<forge-ai-prompt running></forge-ai-prompt>`);

      expect(getSendButton(el).getAttribute('aria-label')).toBe('Stop');
      expect(el.shadowRoot!.querySelector('forge-ai-tooltip')!.textContent!.trim()).toBe('Stop');
    });

    it('should show the send button when running with a value', async () => {
      const el = await createElement(html`<forge-ai-prompt running value="x"></forge-ai-prompt>`);

      expect(getSendButton(el).getAttribute('aria-label')).toBe('Send message');
    });

    it('should show the send button when not running', async () => {
      const el = await createElement();

      expect(getSendButton(el).getAttribute('aria-label')).toBe('Send message');
      expect(el.shadowRoot!.querySelector('forge-ai-tooltip')!.textContent!.trim()).toBe('Send');
    });

    it('should dispatch a cancelable stop event when the stop button is clicked', async () => {
      const el = await createElement(html`<forge-ai-prompt running></forge-ai-prompt>`);
      const listener = vi.fn<(event: Event) => void>();
      el.addEventListener('forge-ai-prompt-stop', listener);

      await userEvent.click(getSendButton(el));

      expect(listener).toHaveBeenCalledTimes(1);
      const event = listener.mock.calls[0][0];
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
      expect(event.cancelable).toBe(true);
    });

    it('should not dispatch send when the stop button is clicked', async () => {
      const el = await createElement(html`<forge-ai-prompt running></forge-ai-prompt>`);
      const listener = vi.fn();
      el.addEventListener('forge-ai-prompt-send', listener);

      getSendButton(el).click();

      expect(listener).not.toHaveBeenCalled();
    });

    it('should switch back to the send button when text is typed', async () => {
      const el = await createElement(html`<forge-ai-prompt running></forge-ai-prompt>`);

      await userEvent.type(getTextarea(el), 'a');
      await el.updateComplete;

      expect(getSendButton(el).getAttribute('aria-label')).toBe('Send message');
    });
  });

  describe('escape', () => {
    it('should dispatch a cancel event when Escape is pressed', async () => {
      const el = await createElement();
      const listener = vi.fn<(event: Event) => void>();
      el.addEventListener('forge-ai-prompt-cancel', listener);
      const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true, cancelable: true });

      getTextarea(el).dispatchEvent(event);

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener.mock.calls[0][0].bubbles).toBe(true);
      expect(listener.mock.calls[0][0].composed).toBe(true);
      expect(event.defaultPrevented).toBe(true);
    });

    it('should not dispatch cancel when cancelOnEscape is false', async () => {
      const el = await createElement(html`<forge-ai-prompt .cancelOnEscape=${false}></forge-ai-prompt>`);
      const listener = vi.fn();
      el.addEventListener('forge-ai-prompt-cancel', listener);

      getTextarea(el).dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true, cancelable: true }));

      expect(listener).not.toHaveBeenCalled();
    });
  });

  describe('debug mode', () => {
    it('should not render the debug button by default', async () => {
      const el = await createElement();

      expect(el.shadowRoot!.querySelector('#debug-btn')).toBeNull();
    });

    it('should render the debug button when debugMode is set', async () => {
      const el = await createElement(html`<forge-ai-prompt debug-mode></forge-ai-prompt>`);

      expect(el.shadowRoot!.querySelector('#debug-btn')!.getAttribute('aria-label')).toBe('Exit debug mode');
    });

    it('should render the debug button in the inline variant', async () => {
      const el = await createElement(html`<forge-ai-prompt variant="inline" debug-mode></forge-ai-prompt>`);

      expect(el.shadowRoot!.querySelector('#debug-btn')).toBeTruthy();
    });

    it('should dispatch a debug-toggle event when the debug button is clicked', async () => {
      const el = await createElement(html`<forge-ai-prompt debug-mode></forge-ai-prompt>`);
      const listener = vi.fn<(event: Event) => void>();
      el.addEventListener('forge-ai-prompt-debug-toggle', listener);

      await userEvent.click(el.shadowRoot!.querySelector<HTMLButtonElement>('#debug-btn')!);

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener.mock.calls[0][0].bubbles).toBe(true);
      expect(listener.mock.calls[0][0].composed).toBe(true);
    });
  });

  describe('paste', () => {
    it('should dispatch an attachment event with the pasted files', async () => {
      const el = await createElement();
      const listener = vi.fn<(event: CustomEvent<ForgeAiPromptAttachmentEventData>) => void>();
      el.addEventListener('forge-ai-prompt-attachment', listener);
      const file = new File(['x'], 'pic.png', { type: 'image/png' });
      const clipboardData = new DataTransfer();
      clipboardData.items.add(file);
      const event = new ClipboardEvent('paste', { clipboardData, bubbles: true, composed: true, cancelable: true });

      getTextarea(el).dispatchEvent(event);

      expect(event.defaultPrevented).toBe(true);
      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener.mock.calls[0][0].detail.files).toEqual([file]);
      expect(listener.mock.calls[0][0].bubbles).toBe(true);
      expect(listener.mock.calls[0][0].composed).toBe(true);
    });

    it('should leave plain text paste alone', async () => {
      const el = await createElement();
      const listener = vi.fn();
      el.addEventListener('forge-ai-prompt-attachment', listener);
      const clipboardData = new DataTransfer();
      clipboardData.setData('text/plain', 'just text');
      const event = new ClipboardEvent('paste', { clipboardData, bubbles: true, composed: true, cancelable: true });

      getTextarea(el).dispatchEvent(event);

      expect(event.defaultPrevented).toBe(false);
      expect(listener).not.toHaveBeenCalled();
    });
  });

  describe('context items', () => {
    const items: ContextItem[] = [
      { id: 'a', label: 'Alpha' },
      { id: 'b', label: 'Beta', type: 'file' }
    ];

    it('should not render context items when empty', async () => {
      const el = await createElement();

      expect(el.shadowRoot!.querySelector('forge-ai-context-items')).toBeNull();
    });

    it('should render context items in the stacked variant', async () => {
      const el = await createElement(html`<forge-ai-prompt .contextItems=${items}></forge-ai-prompt>`);

      const contextItems = el.shadowRoot!.querySelector<HTMLElement & { items: ContextItem[] }>('forge-ai-context-items')!;
      expect(contextItems.items).toEqual(items);
    });

    it('should render context items in the inline variant', async () => {
      const el = await createElement(html`<forge-ai-prompt variant="inline" .contextItems=${items}></forge-ai-prompt>`);

      expect(el.shadowRoot!.querySelector('forge-ai-context-items')).toBeTruthy();
    });

    it('should re-dispatch context item removal', async () => {
      const el = await createElement(html`<forge-ai-prompt .contextItems=${items}></forge-ai-prompt>`);
      const listener = vi.fn<(event: CustomEvent<ForgeAiPromptContextRemoveEventData>) => void>();
      el.addEventListener('forge-ai-prompt-context-remove', listener);
      const contextItems = el.shadowRoot!.querySelector('forge-ai-context-items')!;
      await (contextItems as unknown as { updateComplete: Promise<unknown> }).updateComplete;
      const chip = contextItems.shadowRoot!.querySelector('forge-ai-context-chip')!;

      chip.shadowRoot!.querySelector<HTMLButtonElement>('button')!.click();

      expect(listener).toHaveBeenCalledTimes(1);
      const event = listener.mock.calls[0][0];
      expect(event.detail.id).toBe('a');
      expect(event.detail.item).toMatchObject({ id: 'a', label: 'Alpha' });
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
    });
  });

  describe('history', () => {
    it('should add trimmed messages to history', async () => {
      const el = await createElement();

      el.addToHistory('  hello  ');

      expect(el.getHistory()).toEqual(['hello']);
    });

    it('should ignore empty messages', async () => {
      const el = await createElement();

      el.addToHistory('   ');
      el.addToHistory('');

      expect(el.getHistory()).toEqual([]);
    });

    it('should not add consecutive duplicate messages', async () => {
      const el = await createElement();

      el.addToHistory('same');
      el.addToHistory('same');

      expect(el.getHistory()).toEqual(['same']);
    });

    it('should cap history at 50 entries, dropping the oldest', async () => {
      const el = await createElement();

      for (let i = 0; i < 55; i++) {
        el.addToHistory(`msg ${i}`);
      }

      const history = el.getHistory();
      expect(history).toHaveLength(50);
      expect(history[0]).toBe('msg 5');
      expect(history[49]).toBe('msg 54');
    });

    it('should replace history with setHistory, trimming and filtering empty entries', async () => {
      const el = await createElement();
      el.addToHistory('old');

      el.setHistory(['  a  ', '', '   ', 'b']);

      expect(el.getHistory()).toEqual(['a', 'b']);
    });

    it('should keep only the last 50 entries with setHistory', async () => {
      const el = await createElement();

      el.setHistory(Array.from({ length: 60 }, (_, i) => `m${i}`));

      const history = el.getHistory();
      expect(history).toHaveLength(50);
      expect(history[0]).toBe('m10');
    });

    it('should return a copy from getHistory', async () => {
      const el = await createElement();
      el.addToHistory('a');

      el.getHistory().push('mutated');

      expect(el.getHistory()).toEqual(['a']);
    });

    it('should recall the latest message with ArrowUp when the cursor is at the start', async () => {
      const el = await createElement();
      el.setHistory(['one', 'two']);
      const textarea = getTextarea(el);
      textarea.focus();

      await userEvent.keyboard('{ArrowUp}');
      await el.updateComplete;

      expect(el.value).toBe('two');
      expect(textarea.value).toBe('two');
    });

    it('should walk back through older messages with repeated ArrowUp', async () => {
      const el = await createElement();
      el.setHistory(['one', 'two']);
      getTextarea(el).focus();

      await userEvent.keyboard('{ArrowUp}{ArrowUp}');
      await el.updateComplete;

      expect(el.value).toBe('one');
    });

    it('should stay on the oldest message when ArrowUp is pressed past the start of history', async () => {
      const el = await createElement();
      el.setHistory(['only']);
      getTextarea(el).focus();

      await userEvent.keyboard('{ArrowUp}{ArrowUp}{ArrowUp}{ArrowUp}');
      await el.updateComplete;

      expect(el.value).toBe('only');
    });

    it('should return to the draft with ArrowDown after navigating history', async () => {
      const el = await createElement();
      el.setHistory(['one', 'two']);
      const textarea = getTextarea(el);
      await userEvent.type(textarea, 'draft');
      await userEvent.keyboard('{Home}{ArrowUp}');
      await el.updateComplete;
      expect(el.value).toBe('two');

      await userEvent.keyboard('{End}{ArrowDown}');
      await el.updateComplete;

      expect(el.value).toBe('draft');
    });

    it('should move to older then newer entries with ArrowDown', async () => {
      const el = await createElement();
      el.setHistory(['one', 'two']);
      getTextarea(el).focus();
      await userEvent.keyboard('{ArrowUp}{ArrowUp}');
      await el.updateComplete;
      expect(el.value).toBe('one');

      await userEvent.keyboard('{End}{ArrowDown}');
      await el.updateComplete;

      expect(el.value).toBe('two');
    });

    it('should do nothing on ArrowUp when history is empty', async () => {
      const el = await createElement();
      getTextarea(el).focus();

      await userEvent.keyboard('{ArrowUp}{ArrowUp}');

      expect(el.value).toBe('');
    });

    it('should do nothing on ArrowDown when not navigating history', async () => {
      const el = await createElement();
      el.setHistory(['one']);
      await userEvent.type(getTextarea(el), 'abc');

      await userEvent.keyboard('{ArrowDown}{ArrowDown}');

      expect(el.value).toBe('abc');
    });

    it('should not navigate history when a modifier key is held', async () => {
      const el = await createElement();
      el.setHistory(['one']);
      getTextarea(el).focus();

      await userEvent.keyboard('{Shift>}{ArrowUp}{ArrowUp}{/Shift}');

      expect(el.value).toBe('');
    });

    it('should not navigate history from a later line in multi-line text', async () => {
      const el = await createElement(html`<forge-ai-prompt .value=${'line one\nline two'}></forge-ai-prompt>`);
      el.setHistory(['one']);
      const textarea = getTextarea(el);
      textarea.focus();
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);

      await userEvent.keyboard('{ArrowUp}{ArrowUp}');

      expect(el.value).toBe('line one\nline two');
    });

    it('should reset navigation when the user types after recalling a message', async () => {
      const el = await createElement();
      el.setHistory(['one', 'two']);
      getTextarea(el).focus();
      await userEvent.keyboard('{ArrowUp}');
      await userEvent.keyboard('X');
      await el.updateComplete;
      expect(el.value).toBe('Xtwo');

      await userEvent.keyboard('{ArrowDown}{ArrowDown}');

      expect(el.value).toBe('Xtwo');
    });
  });

  describe('slash commands', () => {
    function getMenu(el: AiPromptComponent): HTMLElement | null {
      return el.shadowRoot!.querySelector('forge-ai-slash-command-menu');
    }

    it('should not render the slash command menu without commands', async () => {
      const el = await createElement();

      expect(getMenu(el)).toBeNull();
    });

    it('should render the slash command menu closed when commands exist', async () => {
      const el = await createElement(html`<forge-ai-prompt .slashCommands=${commands}></forge-ai-prompt>`);

      expect(getMenu(el)).toBeTruthy();
      expect((getMenu(el) as unknown as { open: boolean }).open).toBe(false);
    });

    it('should open the menu when "/" is typed', async () => {
      const el = await createElement(html`<forge-ai-prompt .slashCommands=${commands}></forge-ai-prompt>`);

      await userEvent.type(getTextarea(el), '/');
      await el.updateComplete;

      expect((getMenu(el) as unknown as { open: boolean }).open).toBe(true);
    });

    it('should filter the menu using the text after the slash', async () => {
      const el = await createElement(html`<forge-ai-prompt .slashCommands=${commands}></forge-ai-prompt>`);

      await userEvent.type(getTextarea(el), '/cl');
      await el.updateComplete;

      expect((getMenu(el) as unknown as { filterQuery: string }).filterQuery).toBe('cl');
    });

    it('should close the menu when the text no longer starts with a slash', async () => {
      const el = await createElement(html`<forge-ai-prompt .slashCommands=${commands}></forge-ai-prompt>`);
      const textarea = getTextarea(el);
      await userEvent.type(textarea, '/');
      await el.updateComplete;

      await userEvent.keyboard('{Backspace}a');
      await el.updateComplete;

      expect((getMenu(el) as unknown as { open: boolean }).open).toBe(false);
    });

    it('should close the menu when Escape is pressed without cancelling the prompt', async () => {
      const el = await createElement(html`<forge-ai-prompt .slashCommands=${commands}></forge-ai-prompt>`);
      const cancel = vi.fn();
      el.addEventListener('forge-ai-prompt-cancel', cancel);
      await userEvent.type(getTextarea(el), '/');
      await el.updateComplete;

      getTextarea(el).dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true, cancelable: true }));
      await el.updateComplete;

      expect((getMenu(el) as unknown as { open: boolean }).open).toBe(false);
      expect(cancel).not.toHaveBeenCalled();
    });

    it('should close the menu when closeSlashMenu is called', async () => {
      const el = await createElement(html`<forge-ai-prompt .slashCommands=${commands}></forge-ai-prompt>`);
      await userEvent.type(getTextarea(el), '/');
      await el.updateComplete;

      el.closeSlashMenu();
      await el.updateComplete;

      expect((getMenu(el) as unknown as { open: boolean }).open).toBe(false);
    });

    it('should dispatch a command event and clear the input when a command is selected', async () => {
      const el = await createElement(html`<forge-ai-prompt .slashCommands=${commands}></forge-ai-prompt>`);
      const listener = vi.fn<(event: CustomEvent<ForgeAiPromptCommandEventData>) => void>();
      el.addEventListener('forge-ai-prompt-command', listener);
      await userEvent.type(getTextarea(el), '/');
      await el.updateComplete;

      getMenu(el)!.dispatchEvent(
        new CustomEvent('forge-ai-slash-command-menu-select', { detail: { command: commands[1], index: 1 }, bubbles: true, composed: true })
      );
      await el.updateComplete;

      expect(listener).toHaveBeenCalledTimes(1);
      const event = listener.mock.calls[0][0];
      expect(event.detail.commandId).toBe('export');
      expect(event.detail.group).toBe('Conversation');
      expect(event.detail.timestamp).toBeInstanceOf(Date);
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
      expect(el.value).toBe('');
      expect(getTextarea(el).value).toBe('');
      expect((getMenu(el) as unknown as { open: boolean }).open).toBe(false);
    });

    it('should close the menu when the menu requests close', async () => {
      const el = await createElement(html`<forge-ai-prompt .slashCommands=${commands}></forge-ai-prompt>`);
      await userEvent.type(getTextarea(el), '/');
      await el.updateComplete;

      getMenu(el)!.dispatchEvent(new CustomEvent('forge-ai-slash-command-menu-close', { bubbles: true, composed: true }));
      await el.updateComplete;

      expect((getMenu(el) as unknown as { open: boolean }).open).toBe(false);
    });

    it('should send and close the menu when Enter is pressed with the menu open and no matching command', async () => {
      const el = await createElement(html`<forge-ai-prompt .slashCommands=${commands}></forge-ai-prompt>`);
      const listener = vi.fn();
      el.addEventListener('forge-ai-prompt-send', listener);
      await userEvent.type(getTextarea(el), '/zzz');
      await el.updateComplete;

      await userEvent.keyboard('{Enter}');
      await el.updateComplete;

      expect(listener).toHaveBeenCalledTimes(1);
      expect((getMenu(el) as unknown as { open: boolean }).open).toBe(false);
    });

    it('should close the menu after sending', async () => {
      const el = await createElement(html`<forge-ai-prompt .slashCommands=${commands}></forge-ai-prompt>`);
      await userEvent.type(getTextarea(el), '/');
      await el.updateComplete;

      getSendButton(el).click();
      await el.updateComplete;

      expect((getMenu(el) as unknown as { open: boolean }).open).toBe(false);
    });
  });

  describe('focus', () => {
    it('should focus the textarea when focus() is called', async () => {
      const el = await createElement();

      el.focus();

      expect(el.shadowRoot!.activeElement).toBe(getTextarea(el));
    });
  });
});
