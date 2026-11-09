import { describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { renderFixture } from '../../testing/fixture.js';
import { AiUserMessageToolbarComponent, AiUserMessageToolbarComponentTagName } from './ai-user-message-toolbar.js';

const TAG = 'forge-ai-user-message-toolbar';
const TIMESTAMP = new Date(2024, 0, 15, 14, 30).getTime();

function createElement(
  template = html`<forge-ai-user-message-toolbar .timestamp=${TIMESTAMP}></forge-ai-user-message-toolbar>`
): Promise<AiUserMessageToolbarComponent> {
  return renderFixture<AiUserMessageToolbarComponent>(template, TAG);
}

function btn(el: AiUserMessageToolbarComponent, id: string): HTMLButtonElement | null {
  return el.shadowRoot!.querySelector<HTMLButtonElement>(`#${id}`);
}

describe('AiUserMessageToolbarComponent', () => {
  it('should be registered under the forge-ai-user-message-toolbar tag', async () => {
    const el = await createElement();

    expect(AiUserMessageToolbarComponentTagName).toBe(TAG);
    expect(customElements.get(TAG)).toBe(AiUserMessageToolbarComponent);
    expect(el).toBeInstanceOf(AiUserMessageToolbarComponent);
  });

  it('should contain shadow root', async () => {
    const el = await createElement();

    expect(el.shadowRoot).toBeTruthy();
  });

  it('should default streaming to false', async () => {
    const el = await createElement();

    expect(el.streaming).toBe(false);
  });

  it('should read streaming from the attribute', async () => {
    const el = await createElement(html`<forge-ai-user-message-toolbar .timestamp=${TIMESTAMP} streaming></forge-ai-user-message-toolbar>`);

    expect(el.streaming).toBe(true);
  });

  describe('timestamp', () => {
    it('should render the formatted time and a full-date tooltip', async () => {
      const el = await createElement();

      const time = el.shadowRoot!.querySelector('#timestamp')!;
      const tooltip = el.shadowRoot!.querySelector('forge-ai-tooltip[for="timestamp"]')!;

      expect(time.textContent).toBe(new Date(TIMESTAMP).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      expect(tooltip.textContent).toBe(
        new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(TIMESTAMP)
      );
    });

    it('should not render the timestamp when it is falsy', async () => {
      const el = await createElement(html`<forge-ai-user-message-toolbar .timestamp=${0}></forge-ai-user-message-toolbar>`);

      expect(el.shadowRoot!.querySelector('#timestamp')).toBeNull();
      expect(el.shadowRoot!.querySelector('forge-ai-tooltip[for="timestamp"]')).toBeNull();
    });
  });

  describe('action buttons', () => {
    it('should render resend, edit, and copy buttons with labels', async () => {
      const el = await createElement();

      expect(btn(el, 'resend-btn')!.getAttribute('aria-label')).toBe('Resend message');
      expect(btn(el, 'edit-btn')!.getAttribute('aria-label')).toBe('Edit message');
      expect(btn(el, 'copy-btn')!.getAttribute('aria-label')).toBe('Copy message');
    });

    it('should hide resend and edit buttons while streaming but keep copy', async () => {
      const el = await createElement(html`<forge-ai-user-message-toolbar .timestamp=${TIMESTAMP} streaming></forge-ai-user-message-toolbar>`);

      expect(btn(el, 'resend-btn')).toBeNull();
      expect(btn(el, 'edit-btn')).toBeNull();
      expect(btn(el, 'copy-btn')).toBeTruthy();
    });

    it('should restore resend and edit when streaming ends', async () => {
      const el = await createElement(html`<forge-ai-user-message-toolbar .timestamp=${TIMESTAMP} streaming></forge-ai-user-message-toolbar>`);

      el.streaming = false;
      await el.updateComplete;

      expect(btn(el, 'resend-btn')).toBeTruthy();
      expect(btn(el, 'edit-btn')).toBeTruthy();
    });

    it('should hide decorative icons from assistive technology', async () => {
      const el = await createElement();

      for (const svg of Array.from(el.shadowRoot!.querySelectorAll('svg'))) {
        expect(svg.getAttribute('aria-hidden')).toBe('true');
      }
    });

    it('should give each button a tooltip', async () => {
      const el = await createElement();

      expect(el.shadowRoot!.querySelector('forge-ai-tooltip[for="resend-btn"]')!.textContent).toBe('Resend');
      expect(el.shadowRoot!.querySelector('forge-ai-tooltip[for="edit-btn"]')!.textContent).toBe('Edit');
      expect(el.shadowRoot!.querySelector('forge-ai-tooltip[for="copy-btn"]')!.textContent).toBe('Copy');
    });
  });

  describe('events', () => {
    it.each([
      ['resend-btn', 'forge-ai-user-message-toolbar-resend'],
      ['edit-btn', 'forge-ai-user-message-toolbar-edit'],
      ['copy-btn', 'forge-ai-user-message-toolbar-copy']
    ] as const)('should dispatch a bubbling composed event when %s is clicked', async (id, eventName) => {
      const el = await createElement();
      const listener = vi.fn<(evt: CustomEvent<void>) => void>();
      document.body.addEventListener(eventName, listener);

      btn(el, id)!.click();
      document.body.removeEventListener(eventName, listener);

      expect(listener).toHaveBeenCalledOnce();
      expect(listener.mock.calls[0][0].bubbles).toBe(true);
      expect(listener.mock.calls[0][0].composed).toBe(true);
      expect(listener.mock.calls[0][0].detail).toBeNull();
    });

    it('should only dispatch the event for the clicked button', async () => {
      const el = await createElement();
      const copy = vi.fn();
      const edit = vi.fn();
      el.addEventListener('forge-ai-user-message-toolbar-copy', copy);
      el.addEventListener('forge-ai-user-message-toolbar-edit', edit);

      btn(el, 'copy-btn')!.click();

      expect(copy).toHaveBeenCalledOnce();
      expect(edit).not.toHaveBeenCalled();
    });

    it('should activate a button with the keyboard', async () => {
      const el = await createElement();
      const listener = vi.fn();
      el.addEventListener('forge-ai-user-message-toolbar-edit', listener);
      btn(el, 'edit-btn')!.focus();

      await userEvent.keyboard('{Enter}');

      expect(listener).toHaveBeenCalledOnce();
    });
  });
});
