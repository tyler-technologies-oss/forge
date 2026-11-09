import { describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { renderFixture } from '../../testing/fixture.js';
import { settle } from '../../testing/settle.js';
import { AiConfirmationPromptComponent, AiConfirmationPromptComponentTagName } from './ai-confirmation-prompt.js';
import { AiConfirmationPromptComponent as ExportedComponent } from './index.js';

const TAG = 'forge-ai-confirmation-prompt';

function createElement(template = html`<forge-ai-confirmation-prompt text="Proceed?"></forge-ai-confirmation-prompt>`): Promise<AiConfirmationPromptComponent> {
  return renderFixture<AiConfirmationPromptComponent>(template, TAG);
}

function getButton(el: AiConfirmationPromptComponent, name: 'Confirm' | 'Deny'): HTMLButtonElement {
  return el.shadowRoot!.querySelector<HTMLButtonElement>(`button[aria-label="${name}"]`)!;
}

describe('AiConfirmationPromptComponent', () => {
  describe('registration', () => {
    it('should be registered under the forge-ai-confirmation-prompt tag', async () => {
      const el = await createElement();

      expect(AiConfirmationPromptComponentTagName).toBe(TAG);
      expect(customElements.get(TAG)).toBe(AiConfirmationPromptComponent);
      expect(ExportedComponent).toBe(AiConfirmationPromptComponent);
      expect(el).toBeInstanceOf(AiConfirmationPromptComponent);
    });

    it('should render a shadow root', async () => {
      const el = await createElement();

      expect(el.shadowRoot).toBeTruthy();
    });
  });

  describe('properties', () => {
    it('should have the expected defaults', async () => {
      const el = await createElement(html`<forge-ai-confirmation-prompt></forge-ai-confirmation-prompt>`);

      expect(el.text).toBe('');
      expect(el.confirmText).toBe('Confirm');
      expect(el.denyText).toBe('Deny');
      expect(el.disabled).toBe(false);
      expect(el.autoFocus).toBe(true);
      expect(el.layout).toBe('horizontal');
    });

    it('should render the text', async () => {
      const el = await createElement();

      expect(el.shadowRoot!.querySelector('#confirmation-text')!.textContent!.trim()).toBe('Proceed?');
    });

    it('should update the rendered text when text changes', async () => {
      const el = await createElement();

      el.text = 'Are you sure?';
      await el.updateComplete;

      expect(el.shadowRoot!.querySelector('#confirmation-text')!.textContent!.trim()).toBe('Are you sure?');
    });

    it('should read the confirm-text and deny-text attributes', async () => {
      const el = await createElement(html`<forge-ai-confirmation-prompt confirm-text="Yes" deny-text="No"></forge-ai-confirmation-prompt>`);

      expect(el.confirmText).toBe('Yes');
      expect(el.denyText).toBe('No');
      expect(getButton(el, 'Confirm').textContent!.trim()).toBe('Yes');
      expect(getButton(el, 'Deny').textContent!.trim()).toBe('No');
    });

    it('should read the layout attribute and apply it to the container', async () => {
      const el = await createElement(html`<forge-ai-confirmation-prompt layout="vertical"></forge-ai-confirmation-prompt>`);

      expect(el.layout).toBe('vertical');
      expect(el.shadowRoot!.querySelector('[role="alertdialog"]')!.classList.contains('container--vertical')).toBe(true);
    });

    it('should apply the horizontal layout by default', async () => {
      const el = await createElement();

      expect(el.shadowRoot!.querySelector('[role="alertdialog"]')!.classList.contains('container--horizontal')).toBe(true);
    });

    it('should disable both buttons when disabled', async () => {
      const el = await createElement(html`<forge-ai-confirmation-prompt disabled></forge-ai-confirmation-prompt>`);

      expect(el.disabled).toBe(true);
      expect(getButton(el, 'Confirm').disabled).toBe(true);
      expect(getButton(el, 'Deny').disabled).toBe(true);
    });

    it('should enable both buttons when disabled is cleared', async () => {
      const el = await createElement(html`<forge-ai-confirmation-prompt disabled></forge-ai-confirmation-prompt>`);

      el.disabled = false;
      await el.updateComplete;

      expect(getButton(el, 'Confirm').disabled).toBe(false);
      expect(getButton(el, 'Deny').disabled).toBe(false);
    });
  });

  describe('events', () => {
    it('should dispatch a bubbling, composed confirm event when the confirm button is clicked', async () => {
      const el = await createElement();
      const listener = vi.fn<(event: Event) => void>();
      el.addEventListener('forge-ai-confirmation-prompt-confirm', listener);

      await userEvent.click(getButton(el, 'Confirm'));

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener.mock.calls[0][0].bubbles).toBe(true);
      expect(listener.mock.calls[0][0].composed).toBe(true);
    });

    it('should dispatch a bubbling, composed deny event when the deny button is clicked', async () => {
      const el = await createElement();
      const listener = vi.fn<(event: Event) => void>();
      el.addEventListener('forge-ai-confirmation-prompt-deny', listener);

      await userEvent.click(getButton(el, 'Deny'));

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener.mock.calls[0][0].bubbles).toBe(true);
      expect(listener.mock.calls[0][0].composed).toBe(true);
    });

    it('should not dispatch confirm or deny when disabled', async () => {
      const el = await createElement(html`<forge-ai-confirmation-prompt disabled></forge-ai-confirmation-prompt>`);
      const confirm = vi.fn();
      const deny = vi.fn();
      el.addEventListener('forge-ai-confirmation-prompt-confirm', confirm);
      el.addEventListener('forge-ai-confirmation-prompt-deny', deny);

      getButton(el, 'Confirm').click();
      getButton(el, 'Deny').click();

      expect(confirm).not.toHaveBeenCalled();
      expect(deny).not.toHaveBeenCalled();
    });

    it('should dispatch deny when the backdrop is clicked', async () => {
      const el = await createElement();
      const listener = vi.fn();
      el.addEventListener('forge-ai-confirmation-prompt-deny', listener);

      el.shadowRoot!.querySelector<HTMLElement>('.backdrop')!.click();

      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('should not dispatch deny when the dialog content is clicked', async () => {
      const el = await createElement();
      const listener = vi.fn();
      el.addEventListener('forge-ai-confirmation-prompt-deny', listener);

      el.shadowRoot!.querySelector<HTMLElement>('#confirmation-text')!.click();

      expect(listener).not.toHaveBeenCalled();
    });
  });

  describe('keyboard', () => {
    it('should dispatch deny when Escape is pressed', async () => {
      const el = await createElement();
      const listener = vi.fn();
      el.addEventListener('forge-ai-confirmation-prompt-deny', listener);

      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true, cancelable: true }));

      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('should prevent default and stop propagation of the Escape key', async () => {
      const el = await createElement();
      const parentListener = vi.fn();
      document.body.addEventListener('keydown', parentListener);
      const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true, cancelable: true });

      el.dispatchEvent(event);
      document.body.removeEventListener('keydown', parentListener);

      expect(event.defaultPrevented).toBe(true);
      expect(parentListener).not.toHaveBeenCalled();
    });

    it('should ignore other keys', async () => {
      const el = await createElement();
      const listener = vi.fn();
      el.addEventListener('forge-ai-confirmation-prompt-deny', listener);

      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true, cancelable: true }));

      expect(listener).not.toHaveBeenCalled();
    });

    it('should stop handling Escape after being disconnected', async () => {
      const el = await createElement();
      const listener = vi.fn();
      el.addEventListener('forge-ai-confirmation-prompt-deny', listener);

      el.remove();
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true, cancelable: true }));

      expect(listener).not.toHaveBeenCalled();
    });

    it('should mark the backdrop as handling escape', async () => {
      const el = await createElement();

      expect(el.shadowRoot!.querySelector('.backdrop')!.hasAttribute('data-handles-escape')).toBe(true);
    });
  });

  describe('focus', () => {
    it('should focus the deny button on first render when auto-focus is enabled', async () => {
      const el = await createElement();

      await vi.waitFor(() => expect(el.shadowRoot!.activeElement).toBe(getButton(el, 'Deny')));
    });

    it('should not focus the deny button when auto-focus is disabled', async () => {
      const el = await createElement(html`<forge-ai-confirmation-prompt .autoFocus=${false}></forge-ai-confirmation-prompt>`);
      await settle(el);

      expect(el.shadowRoot!.activeElement).toBeNull();
    });
  });

  describe('accessibility', () => {
    it('should render an alertdialog labelled by the text', async () => {
      const el = await createElement();
      const dialog = el.shadowRoot!.querySelector('[role="alertdialog"]')!;

      expect(dialog.getAttribute('aria-modal')).toBe('true');
      expect(dialog.getAttribute('aria-labelledby')).toBe('confirmation-text');
      expect(el.shadowRoot!.getElementById('confirmation-text')).toBeTruthy();
    });

    it('should label the buttons independent of custom text', async () => {
      const el = await createElement(html`<forge-ai-confirmation-prompt confirm-text="Yes" deny-text="No"></forge-ai-confirmation-prompt>`);

      expect(getButton(el, 'Confirm')).toBeTruthy();
      expect(getButton(el, 'Deny')).toBeTruthy();
    });
  });
});
