import { describe, expect, it } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import type { AiReasoningHeaderComponent } from '../ai-reasoning-header/ai-reasoning-header.js';
import { AiReasoningComponent, AiReasoningComponentTagName } from './ai-reasoning.js';

import '../ai-reasoning-header/ai-reasoning-header.js';

const TAG = 'forge-ai-reasoning';

function createElement(template = html`<forge-ai-reasoning></forge-ai-reasoning>`): Promise<AiReasoningComponent> {
  return renderFixture<AiReasoningComponent>(template, TAG);
}

function headerButton(el: AiReasoningComponent): HTMLButtonElement {
  return el.querySelector<AiReasoningHeaderComponent>('forge-ai-reasoning-header')!.shadowRoot!.querySelector<HTMLButtonElement>('button')!;
}

describe('AiReasoningComponent', () => {
  it('should be registered under the forge-ai-reasoning tag', async () => {
    const el = await createElement();

    expect(AiReasoningComponentTagName).toBe(TAG);
    expect(customElements.get(TAG)).toBe(AiReasoningComponent);
    expect(el).toBeInstanceOf(AiReasoningComponent);
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
      const el = await createElement(html`<forge-ai-reasoning expanded></forge-ai-reasoning>`);

      expect(el.expanded).toBe(true);
    });

    it('should reflect expanded to the attribute', async () => {
      const el = await createElement();

      el.expanded = true;
      await el.updateComplete;

      expect(el.hasAttribute('expanded')).toBe(true);

      el.expanded = false;
      await el.updateComplete;

      expect(el.hasAttribute('expanded')).toBe(false);
    });
  });

  describe('content region', () => {
    it('should mark the content region expanded only when expanded', async () => {
      const el = await createElement();
      const region = el.shadowRoot!.querySelector('.reasoning')!;
      expect(region.classList.contains('expanded')).toBe(false);

      el.expanded = true;
      await el.updateComplete;

      expect(region.classList.contains('expanded')).toBe(true);
    });
  });

  describe('slots', () => {
    it('should project the header slot', async () => {
      const el = await createElement(html`<forge-ai-reasoning><span slot="header">Head</span></forge-ai-reasoning>`);

      const assigned = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="header"]')!.assignedElements();

      expect(assigned).toHaveLength(1);
      expect(assigned[0].textContent).toBe('Head');
    });

    it('should project default slot content', async () => {
      const el = await createElement(html`<forge-ai-reasoning><p>Body</p></forge-ai-reasoning>`);

      const assigned = el.shadowRoot!.querySelector<HTMLSlotElement>('slot:not([name])')!.assignedElements();

      expect(assigned).toHaveLength(1);
      expect(assigned[0].textContent).toBe('Body');
    });
  });

  describe('header toggle', () => {
    it('should expand when the slotted header is clicked', async () => {
      const el = await createElement(html`<forge-ai-reasoning><forge-ai-reasoning-header slot="header"></forge-ai-reasoning-header></forge-ai-reasoning>`);

      headerButton(el).click();
      await el.updateComplete;

      expect(el.expanded).toBe(true);
    });

    it('should collapse when the slotted header is clicked while expanded', async () => {
      const el = await createElement(
        html`<forge-ai-reasoning expanded><forge-ai-reasoning-header slot="header" expanded></forge-ai-reasoning-header></forge-ai-reasoning>`
      );

      headerButton(el).click();
      await el.updateComplete;

      expect(el.expanded).toBe(false);
    });

    it('should follow the header state across repeated toggles', async () => {
      const el = await createElement(html`<forge-ai-reasoning><forge-ai-reasoning-header slot="header"></forge-ai-reasoning-header></forge-ai-reasoning>`);

      headerButton(el).click();
      await el.updateComplete;
      headerButton(el).click();
      await el.updateComplete;

      expect(el.expanded).toBe(false);
    });
  });
});
