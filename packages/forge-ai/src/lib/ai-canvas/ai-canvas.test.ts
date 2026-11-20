import { describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { renderFixture } from '../../testing/fixture.js';
import type { AiCanvasComponent } from './ai-canvas.js';

import './ai-canvas.js';

function closeButton(el: AiCanvasComponent): HTMLButtonElement {
  return el.shadowRoot!.querySelector<HTMLButtonElement>('#close-button')!;
}

describe('AiCanvasComponent', () => {
  it('should register the custom element and render a shadow root', async () => {
    const el = await renderFixture<AiCanvasComponent>(html`<forge-ai-canvas></forge-ai-canvas>`, 'forge-ai-canvas');

    expect(customElements.get('forge-ai-canvas')).toBeDefined();
    expect(el.shadowRoot).toBeTruthy();
  });

  it('should have the expected property defaults', async () => {
    const el = await renderFixture<AiCanvasComponent>(html`<forge-ai-canvas></forge-ai-canvas>`, 'forge-ai-canvas');

    expect(el.titleText).toBe('');
    expect(el.headingLevel).toBe(2);
    expect(el.closeLabel).toBe('Close canvas');
  });

  describe('title', () => {
    it('should render the title text in a level 2 heading by default', async () => {
      const el = await renderFixture<AiCanvasComponent>(html`<forge-ai-canvas title-text="Report"></forge-ai-canvas>`, 'forge-ai-canvas');

      const heading = el.shadowRoot!.querySelector('h2')!;
      expect(el.titleText).toBe('Report');
      expect(heading.textContent).toBe('Report');
    });

    it.each([1, 3, 4, 5, 6] as const)('should render an h%i when heading-level is %i', async level => {
      const el = await renderFixture<AiCanvasComponent>(html`<forge-ai-canvas title-text="T" heading-level=${level}></forge-ai-canvas>`, 'forge-ai-canvas');

      expect(el.headingLevel).toBe(level);
      expect(el.shadowRoot!.querySelector(`h${level}`)!.textContent).toBe('T');
      expect(el.shadowRoot!.querySelector('h2')).toBeNull();
    });

    it('should update the heading when titleText and headingLevel change', async () => {
      const el = await renderFixture<AiCanvasComponent>(html`<forge-ai-canvas title-text="A"></forge-ai-canvas>`, 'forge-ai-canvas');

      el.titleText = 'B';
      el.headingLevel = 3;
      await el.updateComplete;

      expect(el.shadowRoot!.querySelector('h3')!.textContent).toBe('B');
      expect(el.shadowRoot!.querySelector('h2')).toBeNull();
    });

    it('should replace the default heading with slotted title content', async () => {
      const el = await renderFixture<AiCanvasComponent>(
        html`<forge-ai-canvas title-text="Fallback"><span slot="title" id="custom">Custom</span></forge-ai-canvas>`,
        'forge-ai-canvas'
      );

      const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="title"]')!;
      expect(slot.assignedElements()).toEqual([el.querySelector('#custom')]);
    });
  });

  describe('accessibility', () => {
    it('should label the canvas region with titleText', async () => {
      const el = await renderFixture<AiCanvasComponent>(html`<forge-ai-canvas title-text="Report"></forge-ai-canvas>`, 'forge-ai-canvas');

      const region = el.shadowRoot!.querySelector('[role="region"]')!;
      expect(region.getAttribute('aria-label')).toBe('Report');
    });

    it('should omit aria-label when titleText is empty', async () => {
      const el = await renderFixture<AiCanvasComponent>(html`<forge-ai-canvas></forge-ai-canvas>`, 'forge-ai-canvas');

      expect(el.shadowRoot!.querySelector('[role="region"]')!.hasAttribute('aria-label')).toBe(false);
    });

    it('should label the close button with closeLabel and show it in a tooltip', async () => {
      const el = await renderFixture<AiCanvasComponent>(html`<forge-ai-canvas close-label="Dismiss"></forge-ai-canvas>`, 'forge-ai-canvas');

      expect(closeButton(el).getAttribute('aria-label')).toBe('Dismiss');
      expect(el.shadowRoot!.querySelector('forge-ai-tooltip')!.textContent).toBe('Dismiss');
    });

    it('should mark the close icon as decorative', async () => {
      const el = await renderFixture<AiCanvasComponent>(html`<forge-ai-canvas></forge-ai-canvas>`, 'forge-ai-canvas');

      expect(closeButton(el).querySelector('svg')!.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('close event', () => {
    it('should dispatch a bubbling, composed forge-ai-canvas-close event when the close button is clicked', async () => {
      const el = await renderFixture<AiCanvasComponent>(html`<forge-ai-canvas></forge-ai-canvas>`, 'forge-ai-canvas');
      const listener = vi.fn<(evt: CustomEvent<void>) => void>();
      el.addEventListener('forge-ai-canvas-close', listener);

      await userEvent.click(closeButton(el));

      expect(listener).toHaveBeenCalledOnce();
      expect(listener.mock.calls[0][0].bubbles).toBe(true);
      expect(listener.mock.calls[0][0].composed).toBe(true);
    });

    it('should dispatch the close event from the keyboard', async () => {
      const el = await renderFixture<AiCanvasComponent>(html`<forge-ai-canvas></forge-ai-canvas>`, 'forge-ai-canvas');
      const listener = vi.fn();
      el.addEventListener('forge-ai-canvas-close', listener);

      closeButton(el).focus();
      await userEvent.keyboard('{Enter}');

      expect(listener).toHaveBeenCalledOnce();
    });
  });

  describe('focus', () => {
    it('should move focus to the close button when focus() is called', async () => {
      const el = await renderFixture<AiCanvasComponent>(html`<forge-ai-canvas></forge-ai-canvas>`, 'forge-ai-canvas');

      el.focus();

      expect(el.shadowRoot!.activeElement).toBe(closeButton(el));
    });
  });

  describe('slots', () => {
    it('should project actions before the close button and body content into the default slot', async () => {
      const el = await renderFixture<AiCanvasComponent>(
        html`<forge-ai-canvas
          ><button slot="actions" id="action">Do</button>
          <p id="body">Body</p></forge-ai-canvas
        >`,
        'forge-ai-canvas'
      );

      const actionsSlot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="actions"]')!;
      const bodySlot = el.shadowRoot!.querySelector<HTMLSlotElement>('.body slot')!;
      expect(actionsSlot.assignedElements()).toEqual([el.querySelector('#action')]);
      expect(bodySlot.assignedElements()).toEqual([el.querySelector('#body')]);
      const headerEnd = Array.from(actionsSlot.parentElement!.children);
      expect(headerEnd.indexOf(actionsSlot)).toBeLessThan(headerEnd.indexOf(closeButton(el)));
    });
  });
});
