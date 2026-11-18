import { describe, expect, it } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import type { AiReasoningHeaderComponent } from '../ai-reasoning-header/ai-reasoning-header.js';
import { AiChainOfThoughtComponent, AiChainOfThoughtComponentTagName } from './ai-chain-of-thought.js';

import '../ai-reasoning-header/ai-reasoning-header.js';

const TAG = 'forge-ai-chain-of-thought';

function createElement(template = html`<forge-ai-chain-of-thought></forge-ai-chain-of-thought>`): Promise<AiChainOfThoughtComponent> {
  return renderFixture<AiChainOfThoughtComponent>(template, TAG);
}

function content(el: AiChainOfThoughtComponent): HTMLElement {
  return el.shadowRoot!.querySelector<HTMLElement>('#chain-content')!;
}

describe('AiChainOfThoughtComponent', () => {
  it('should be registered under the forge-ai-chain-of-thought tag', async () => {
    const el = await createElement();

    expect(AiChainOfThoughtComponentTagName).toBe(TAG);
    expect(customElements.get(TAG)).toBe(AiChainOfThoughtComponent);
    expect(el).toBeInstanceOf(AiChainOfThoughtComponent);
  });

  it('should contain shadow root', async () => {
    const el = await createElement();

    expect(el.shadowRoot).toBeTruthy();
  });

  describe('expanded', () => {
    it('should default to collapsed', async () => {
      const el = await createElement();

      expect(el.expanded).toBe(false);
      expect(el.hasAttribute('expanded')).toBe(false);
    });

    it('should read expanded from the attribute', async () => {
      const el = await createElement(html`<forge-ai-chain-of-thought expanded></forge-ai-chain-of-thought>`);

      expect(el.expanded).toBe(true);
    });

    it('should reflect expanded to the attribute', async () => {
      const el = await createElement();

      el.expanded = true;
      await el.updateComplete;

      expect(el.hasAttribute('expanded')).toBe(true);
    });

    it('should hide the content region from assistive technology when collapsed', async () => {
      const el = await createElement();

      expect(content(el).getAttribute('aria-hidden')).toBe('true');
    });

    it('should expose the content region to assistive technology when expanded', async () => {
      const el = await createElement(html`<forge-ai-chain-of-thought expanded></forge-ai-chain-of-thought>`);

      expect(content(el).getAttribute('aria-hidden')).toBe('false');
    });

    it('should update aria-hidden when expanded changes', async () => {
      const el = await createElement();

      el.expanded = true;
      await el.updateComplete;

      expect(content(el).getAttribute('aria-hidden')).toBe('false');
    });

    it('should mark the panel open only when expanded', async () => {
      const el = await createElement();
      const panel = el.shadowRoot!.querySelector('.thought-content-container')!;
      expect(panel.classList.contains('forge-expansion-panel--open')).toBe(false);

      el.expanded = true;
      await el.updateComplete;

      expect(panel.classList.contains('forge-expansion-panel--open')).toBe(true);
    });
  });

  describe('slots', () => {
    it('should project the heading slot', async () => {
      const el = await createElement(html`<forge-ai-chain-of-thought><span slot="heading">Heading</span></forge-ai-chain-of-thought>`);

      const assigned = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="heading"]')!.assignedElements();

      expect(assigned).toHaveLength(1);
      expect(assigned[0].textContent).toBe('Heading');
    });

    it('should project default slot content inside the content region', async () => {
      const el = await createElement(html`<forge-ai-chain-of-thought><p>Step</p></forge-ai-chain-of-thought>`);

      const slot = content(el).querySelector<HTMLSlotElement>('slot')!;

      expect(slot.assignedElements().map(n => n.textContent)).toEqual(['Step']);
    });
  });

  describe('header toggle', () => {
    it('should expand when the slotted header is clicked', async () => {
      const el = await createElement(
        html`<forge-ai-chain-of-thought><forge-ai-reasoning-header slot="heading"></forge-ai-reasoning-header></forge-ai-chain-of-thought>`
      );

      el.querySelector<AiReasoningHeaderComponent>('forge-ai-reasoning-header')!.shadowRoot!.querySelector('button')!.click();
      await el.updateComplete;

      expect(el.expanded).toBe(true);
    });

    it('should collapse when the header toggles back', async () => {
      const el = await createElement(
        html`<forge-ai-chain-of-thought expanded><forge-ai-reasoning-header slot="heading" expanded></forge-ai-reasoning-header></forge-ai-chain-of-thought>`
      );

      el.querySelector<AiReasoningHeaderComponent>('forge-ai-reasoning-header')!.shadowRoot!.querySelector('button')!.click();
      await el.updateComplete;

      expect(el.expanded).toBe(false);
    });
  });
});
