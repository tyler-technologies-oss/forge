import { describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import { settle } from '../../testing/settle.js';
import type { ForgeAiPopoverComponent } from '../core/popover/popover.js';
import {
  AiResponseMessageToolbarComponent,
  AiResponseMessageToolbarComponentTagName,
  type ForgeAiResponseMessageToolbarActionEventData,
  type ForgeAiResponseMessageToolbarFeedbackEventData
} from './ai-response-message-toolbar.js';

const TAG = 'forge-ai-response-message-toolbar';

function createElement(template = html`<forge-ai-response-message-toolbar></forge-ai-response-message-toolbar>`): Promise<AiResponseMessageToolbarComponent> {
  return renderFixture<AiResponseMessageToolbarComponent>(template, TAG);
}

function btn(el: AiResponseMessageToolbarComponent, id: string): HTMLButtonElement | null {
  return el.shadowRoot!.querySelector<HTMLButtonElement>(`#${id}`);
}

function popover(el: AiResponseMessageToolbarComponent): ForgeAiPopoverComponent {
  return el.shadowRoot!.querySelector<ForgeAiPopoverComponent>('forge-ai-popover')!;
}

function popoverButton(el: AiResponseMessageToolbarComponent, label: string): HTMLButtonElement {
  return Array.from(el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.popover-actions button')).find(b => b.textContent!.trim() === label)!;
}

async function openFeedback(el: AiResponseMessageToolbarComponent): Promise<void> {
  btn(el, 'thumbs-down-btn')!.click();
  await settle(el);
}

describe('AiResponseMessageToolbarComponent', () => {
  it('should be registered under the forge-ai-response-message-toolbar tag', async () => {
    const el = await createElement();

    expect(AiResponseMessageToolbarComponentTagName).toBe(TAG);
    expect(customElements.get(TAG)).toBe(AiResponseMessageToolbarComponent);
    expect(el).toBeInstanceOf(AiResponseMessageToolbarComponent);
  });

  it('should contain shadow root', async () => {
    const el = await createElement();

    expect(el.shadowRoot).toBeTruthy();
  });

  describe('defaults and attributes', () => {
    it('should have the expected defaults', async () => {
      const el = await createElement();

      expect(el.enableReactions).toBe(false);
      expect(el.feedbackType).toBeUndefined();
      expect(el.feedbackReason).toBeUndefined();
    });

    it('should read properties from attributes', async () => {
      const el = await createElement(
        html`<forge-ai-response-message-toolbar enable-reactions feedback-type="negative" feedback-reason="meh"></forge-ai-response-message-toolbar>`
      );

      expect(el.enableReactions).toBe(true);
      expect(el.feedbackType).toBe('negative');
      expect(el.feedbackReason).toBe('meh');
    });
  });

  describe('buttons', () => {
    it('should render resend and copy buttons with accessible labels', async () => {
      const el = await createElement();

      expect(btn(el, 'resend-btn')!.getAttribute('aria-label')).toBe('Resend');
      expect(btn(el, 'copy-btn')!.getAttribute('aria-label')).toBe('Copy content');
    });

    it('should not render reaction buttons by default', async () => {
      const el = await createElement();

      expect(btn(el, 'thumbs-up-btn')).toBeNull();
      expect(btn(el, 'thumbs-down-btn')).toBeNull();
      expect(el.shadowRoot!.querySelector('forge-ai-popover')).toBeNull();
    });

    it('should render reaction buttons when reactions are enabled', async () => {
      const el = await createElement(html`<forge-ai-response-message-toolbar enable-reactions></forge-ai-response-message-toolbar>`);

      expect(btn(el, 'thumbs-up-btn')!.getAttribute('aria-label')).toBe('Good response');
      expect(btn(el, 'thumbs-down-btn')!.getAttribute('aria-label')).toBe('Bad response');
    });

    it('should hide decorative icons from assistive technology', async () => {
      const el = await createElement(html`<forge-ai-response-message-toolbar enable-reactions></forge-ai-response-message-toolbar>`);

      for (const svg of Array.from(el.shadowRoot!.querySelectorAll('svg'))) {
        expect(svg.getAttribute('aria-hidden')).toBe('true');
      }
    });

    it('should provide a tooltip for each button', async () => {
      const el = await createElement(html`<forge-ai-response-message-toolbar enable-reactions></forge-ai-response-message-toolbar>`);

      const texts = Array.from(el.shadowRoot!.querySelectorAll('forge-ai-tooltip')).map(t => t.textContent!.trim());

      expect(texts).toEqual(['Resend', 'Copy', 'Good response', 'Bad response']);
    });
  });

  describe('action events', () => {
    it.each(['resend', 'copy'] as const)('should dispatch an action event for %s', async action => {
      const el = await createElement();
      const listener = vi.fn<(evt: CustomEvent<ForgeAiResponseMessageToolbarActionEventData>) => void>();
      el.addEventListener('forge-ai-response-message-toolbar-action', listener);

      btn(el, `${action}-btn`)!.click();

      expect(listener).toHaveBeenCalledOnce();
      expect(listener.mock.calls[0][0].detail).toEqual({ action });
    });

    it('should dispatch action events that do not bubble', async () => {
      const el = await createElement();
      const listener = vi.fn();
      document.body.addEventListener('forge-ai-response-message-toolbar-action', listener);

      btn(el, 'copy-btn')!.click();
      document.body.removeEventListener('forge-ai-response-message-toolbar-action', listener);

      expect(listener).not.toHaveBeenCalled();
    });
  });

  describe('thumbs up', () => {
    it('should dispatch a positive feedback event without feedback text', async () => {
      const el = await createElement(html`<forge-ai-response-message-toolbar enable-reactions></forge-ai-response-message-toolbar>`);
      const listener = vi.fn<(evt: CustomEvent<ForgeAiResponseMessageToolbarFeedbackEventData>) => void>();
      el.addEventListener('forge-ai-response-message-toolbar-feedback', listener);

      btn(el, 'thumbs-up-btn')!.click();

      expect(listener).toHaveBeenCalledOnce();
      expect(listener.mock.calls[0][0].detail).toEqual({ action: 'positive', feedback: undefined });
    });

    it('should mark the thumbs up button active after clicking', async () => {
      const el = await createElement(html`<forge-ai-response-message-toolbar enable-reactions></forge-ai-response-message-toolbar>`);
      expect(btn(el, 'thumbs-up-btn')!.classList.contains('is-active-positive')).toBe(false);

      btn(el, 'thumbs-up-btn')!.click();
      await el.updateComplete;

      expect(btn(el, 'thumbs-up-btn')!.classList.contains('is-active-positive')).toBe(true);
    });

    it('should show the positive state when feedback-type is positive', async () => {
      const el = await createElement(html`<forge-ai-response-message-toolbar enable-reactions feedback-type="positive"></forge-ai-response-message-toolbar>`);

      expect(btn(el, 'thumbs-up-btn')!.classList.contains('is-active-positive')).toBe(true);
      expect(btn(el, 'thumbs-down-btn')!.classList.contains('is-active-negative')).toBe(false);
    });

    it('should show the negative state when feedback-type is negative', async () => {
      const el = await createElement(html`<forge-ai-response-message-toolbar enable-reactions feedback-type="negative"></forge-ai-response-message-toolbar>`);

      expect(btn(el, 'thumbs-up-btn')!.classList.contains('is-active-positive')).toBe(false);
      expect(btn(el, 'thumbs-down-btn')!.classList.contains('is-active-negative')).toBe(true);
    });

    it('should update the active state when feedbackType changes', async () => {
      const el = await createElement(html`<forge-ai-response-message-toolbar enable-reactions feedback-type="positive"></forge-ai-response-message-toolbar>`);

      el.feedbackType = 'negative';
      await el.updateComplete;

      expect(btn(el, 'thumbs-up-btn')!.classList.contains('is-active-positive')).toBe(false);
      expect(btn(el, 'thumbs-down-btn')!.classList.contains('is-active-negative')).toBe(true);
    });
  });

  describe('thumbs down feedback popover', () => {
    it('should open the feedback popover when thumbs down is clicked', async () => {
      const el = await createElement(html`<forge-ai-response-message-toolbar enable-reactions></forge-ai-response-message-toolbar>`);

      await openFeedback(el);

      expect(popover(el).open).toBe(true);
      expect(popover(el).anchor).toBe(btn(el, 'thumbs-down-btn'));
    });

    it('should mark thumbs down active while the popover is open', async () => {
      const el = await createElement(html`<forge-ai-response-message-toolbar enable-reactions></forge-ai-response-message-toolbar>`);

      await openFeedback(el);

      expect(btn(el, 'thumbs-down-btn')!.classList.contains('is-active-negative')).toBe(true);
    });

    it('should close the popover when thumbs down is clicked again', async () => {
      const el = await createElement(html`<forge-ai-response-message-toolbar enable-reactions></forge-ai-response-message-toolbar>`);
      await openFeedback(el);

      btn(el, 'thumbs-down-btn')!.click();
      await settle(el);

      expect(popover(el).open).toBe(false);
    });

    it('should clear a positive reaction when thumbs down is clicked', async () => {
      const el = await createElement(html`<forge-ai-response-message-toolbar enable-reactions feedback-type="positive"></forge-ai-response-message-toolbar>`);

      await openFeedback(el);

      expect(btn(el, 'thumbs-up-btn')!.classList.contains('is-active-positive')).toBe(false);
    });

    it('should render the feedback form with the current feedback reason', async () => {
      const el = await createElement(html`<forge-ai-response-message-toolbar enable-reactions feedback-reason="too long"></forge-ai-response-message-toolbar>`);

      expect(el.shadowRoot!.querySelector('textarea')!.value).toBe('too long');
    });

    it('should clear the feedback text after closing and reopening the popover', async () => {
      const el = await createElement(html`<forge-ai-response-message-toolbar enable-reactions></forge-ai-response-message-toolbar>`);
      await openFeedback(el);
      el.shadowRoot!.querySelector('textarea')!.value = 'draft';

      btn(el, 'thumbs-down-btn')!.click();
      await settle(el);
      await openFeedback(el);

      expect(el.shadowRoot!.querySelector('textarea')!.value).toBe('');
    });

    it('should dispatch a negative feedback event with the entered text on submit', async () => {
      const el = await createElement(html`<forge-ai-response-message-toolbar enable-reactions></forge-ai-response-message-toolbar>`);
      const listener = vi.fn<(evt: CustomEvent<ForgeAiResponseMessageToolbarFeedbackEventData>) => void>();
      el.addEventListener('forge-ai-response-message-toolbar-feedback', listener);
      await openFeedback(el);
      el.shadowRoot!.querySelector('textarea')!.value = 'Not helpful';

      popoverButton(el, 'Submit').click();
      await settle(el);

      expect(listener).toHaveBeenCalledOnce();
      expect(listener.mock.calls[0][0].detail).toEqual({ action: 'negative', feedback: 'Not helpful' });
      expect(popover(el).open).toBe(false);
    });

    it('should dispatch an empty feedback string when submitted without text', async () => {
      const el = await createElement(html`<forge-ai-response-message-toolbar enable-reactions></forge-ai-response-message-toolbar>`);
      const listener = vi.fn<(evt: CustomEvent<ForgeAiResponseMessageToolbarFeedbackEventData>) => void>();
      el.addEventListener('forge-ai-response-message-toolbar-feedback', listener);
      await openFeedback(el);

      popoverButton(el, 'Submit').click();

      expect(listener.mock.calls[0][0].detail).toEqual({ action: 'negative', feedback: '' });
    });

    it('should keep thumbs down active after submitting', async () => {
      const el = await createElement(html`<forge-ai-response-message-toolbar enable-reactions></forge-ai-response-message-toolbar>`);
      await openFeedback(el);

      popoverButton(el, 'Submit').click();
      await settle(el);

      expect(btn(el, 'thumbs-down-btn')!.classList.contains('is-active-negative')).toBe(true);
    });

    it('should close the popover without dispatching feedback on cancel', async () => {
      const el = await createElement(html`<forge-ai-response-message-toolbar enable-reactions></forge-ai-response-message-toolbar>`);
      const listener = vi.fn();
      el.addEventListener('forge-ai-response-message-toolbar-feedback', listener);
      await openFeedback(el);

      popoverButton(el, 'Cancel').click();
      await settle(el);

      expect(listener).not.toHaveBeenCalled();
      expect(popover(el).open).toBe(false);
    });

    it('should close the popover when thumbs up is clicked', async () => {
      const el = await createElement(html`<forge-ai-response-message-toolbar enable-reactions></forge-ai-response-message-toolbar>`);
      await openFeedback(el);

      btn(el, 'thumbs-up-btn')!.click();
      await settle(el);

      expect(popover(el).open).toBe(false);
    });
  });
});
