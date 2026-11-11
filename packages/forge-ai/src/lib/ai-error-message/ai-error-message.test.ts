import { describe, expect, it } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import { AiErrorMessageComponent, AiErrorMessageComponentTagName } from './ai-error-message.js';

const TAG = 'forge-ai-error-message';

function createElement(template = html`<forge-ai-error-message></forge-ai-error-message>`): Promise<AiErrorMessageComponent> {
  return renderFixture<AiErrorMessageComponent>(template, TAG);
}

function titleWrapper(el: AiErrorMessageComponent): HTMLElement {
  return el.shadowRoot!.querySelector<HTMLElement>('slot[name="title"]')!.parentElement as HTMLElement;
}

describe('AiErrorMessageComponent', () => {
  it('should be registered under the forge-ai-error-message tag', async () => {
    const el = await createElement();

    expect(AiErrorMessageComponentTagName).toBe(TAG);
    expect(customElements.get(TAG)).toBe(AiErrorMessageComponent);
    expect(el).toBeInstanceOf(AiErrorMessageComponent);
  });

  it('should contain shadow root', async () => {
    const el = await createElement();

    expect(el.shadowRoot).toBeTruthy();
  });

  describe('density', () => {
    it('should default to medium', async () => {
      const el = await createElement();

      expect(el.density).toBe('medium');
    });

    it('should reflect density to the attribute', async () => {
      const el = await createElement();

      el.density = 'small';
      await el.updateComplete;

      expect(el.getAttribute('density')).toBe('small');
    });

    it('should read density from the attribute', async () => {
      const el = await createElement(html`<forge-ai-error-message density="small"></forge-ai-error-message>`);

      expect(el.density).toBe('small');
    });
  });

  describe('slots', () => {
    it('should project default slot content', async () => {
      const el = await createElement(html`<forge-ai-error-message>Something failed</forge-ai-error-message>`);

      const assigned = el.shadowRoot!.querySelector<HTMLSlotElement>('slot:not([name])')!.assignedNodes();

      expect(assigned.map(n => n.textContent).join('')).toBe('Something failed');
    });

    it('should project title slot content', async () => {
      const el = await createElement(html`<forge-ai-error-message><span slot="title">Error</span>Details</forge-ai-error-message>`);

      const assigned = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="title"]')!.assignedElements();

      expect(assigned).toHaveLength(1);
      expect(assigned[0].textContent).toBe('Error');
    });

    it('should mark the title region empty when no title is slotted', async () => {
      const el = await createElement(html`<forge-ai-error-message>Details</forge-ai-error-message>`);
      await el.updateComplete;

      expect(titleWrapper(el).classList.contains('forge-inline-message__title--empty')).toBe(true);
    });

    it('should not mark the title region empty when a title is slotted', async () => {
      const el = await createElement(html`<forge-ai-error-message><span slot="title">Error</span>Details</forge-ai-error-message>`);
      await el.updateComplete;

      expect(titleWrapper(el).classList.contains('forge-inline-message__title--empty')).toBe(false);
    });

    it('should update the empty title state when a title is added after render', async () => {
      const el = await createElement(html`<forge-ai-error-message>Details</forge-ai-error-message>`);
      await el.updateComplete;
      expect(titleWrapper(el).classList.contains('forge-inline-message__title--empty')).toBe(true);

      const title = document.createElement('span');
      title.slot = 'title';
      title.textContent = 'Error';
      el.append(title);
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      await el.updateComplete;

      expect(titleWrapper(el).classList.contains('forge-inline-message__title--empty')).toBe(false);
    });
  });

  it('should hide the decorative icon from assistive technology', async () => {
    const el = await createElement();

    expect(el.shadowRoot!.querySelector('svg')!.getAttribute('aria-hidden')).toBe('true');
  });
});
