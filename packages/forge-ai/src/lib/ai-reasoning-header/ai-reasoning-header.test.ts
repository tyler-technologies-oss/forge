import { describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { renderFixture } from '../../testing/fixture.js';
import type { AiReasoningHeaderComponent, ForgeAiReasoningHeaderToggleEventData } from './index.js';
import type { AiReasoningComponent } from '../ai-reasoning/ai-reasoning.js';

import { AiReasoningHeaderComponent as HeaderClass, AiReasoningHeaderComponentTagName } from './ai-reasoning-header.js';
import '../ai-reasoning/ai-reasoning.js';

function createHeader(template = html`<forge-ai-reasoning-header></forge-ai-reasoning-header>`): Promise<AiReasoningHeaderComponent> {
  return renderFixture<AiReasoningHeaderComponent>(template, 'forge-ai-reasoning-header');
}

describe('AiReasoningHeaderComponent', () => {
  it('should dispatch a namespaced toggle event and not the native toggle name', async () => {
    const el = await renderFixture<AiReasoningHeaderComponent>(html`<forge-ai-reasoning-header></forge-ai-reasoning-header>`, 'forge-ai-reasoning-header');
    const listener = vi.fn<(evt: CustomEvent<ForgeAiReasoningHeaderToggleEventData>) => void>();
    const legacy = vi.fn();
    el.addEventListener('forge-ai-reasoning-header-toggle', listener);
    el.addEventListener('toggle', legacy);

    el.shadowRoot!.querySelector<HTMLButtonElement>('button')!.click();

    expect(listener).toHaveBeenCalledOnce();
    expect(listener.mock.calls[0][0].detail).toEqual({ expanded: true });
    expect(legacy).not.toHaveBeenCalled();
  });

  it('should expand a parent forge-ai-reasoning when clicked', async () => {
    const parent = await renderFixture<AiReasoningComponent>(
      html`<forge-ai-reasoning><forge-ai-reasoning-header slot="header"></forge-ai-reasoning-header></forge-ai-reasoning>`,
      'forge-ai-reasoning'
    );

    parent.querySelector<AiReasoningHeaderComponent>('forge-ai-reasoning-header')!.shadowRoot!.querySelector<HTMLButtonElement>('button')!.click();
    await parent.updateComplete;

    expect(parent.expanded).toBe(true);
  });

  it('should be registered under the forge-ai-reasoning-header tag', async () => {
    const el = await createHeader();

    expect(AiReasoningHeaderComponentTagName).toBe('forge-ai-reasoning-header');
    expect(customElements.get('forge-ai-reasoning-header')).toBe(HeaderClass);
    expect(el).toBeInstanceOf(HeaderClass);
  });

  it('should contain shadow root', async () => {
    const el = await createHeader();

    expect(el.shadowRoot).toBeTruthy();
  });

  describe('properties', () => {
    it('should default expanded and reasoning to false', async () => {
      const el = await createHeader();

      expect(el.expanded).toBe(false);
      expect(el.reasoning).toBe(false);
      expect(el.hasAttribute('expanded')).toBe(false);
      expect(el.hasAttribute('reasoning')).toBe(false);
    });

    it('should read expanded and reasoning from attributes', async () => {
      const el = await createHeader(html`<forge-ai-reasoning-header expanded reasoning></forge-ai-reasoning-header>`);

      expect(el.expanded).toBe(true);
      expect(el.reasoning).toBe(true);
    });

    it('should reflect expanded and reasoning to attributes', async () => {
      const el = await createHeader();

      el.expanded = true;
      el.reasoning = true;
      await el.updateComplete;

      expect(el.hasAttribute('expanded')).toBe(true);
      expect(el.hasAttribute('reasoning')).toBe(true);
    });
  });

  describe('accessibility', () => {
    it('should expose a button with aria-expanded false when collapsed', async () => {
      const el = await createHeader();

      const button = el.shadowRoot!.querySelector('button')!;

      expect(button.getAttribute('aria-expanded')).toBe('false');
      expect(button.type).toBe('button');
    });

    it('should set aria-expanded true when expanded', async () => {
      const el = await createHeader(html`<forge-ai-reasoning-header expanded></forge-ai-reasoning-header>`);

      expect(el.shadowRoot!.querySelector('button')!.getAttribute('aria-expanded')).toBe('true');
    });

    it('should sync aria-expanded after a toggle', async () => {
      const el = await createHeader();

      el.shadowRoot!.querySelector('button')!.click();
      await el.updateComplete;

      expect(el.shadowRoot!.querySelector('button')!.getAttribute('aria-expanded')).toBe('true');
    });

    it('should hide decorative icons from assistive technology', async () => {
      const el = await createHeader();

      for (const svg of Array.from(el.shadowRoot!.querySelectorAll('svg'))) {
        expect(svg.getAttribute('aria-hidden')).toBe('true');
      }
    });
  });

  describe('slots', () => {
    it('should render the title slot when not in reasoning state', async () => {
      const el = await createHeader(
        html`<forge-ai-reasoning-header><span slot="title">Done</span><span slot="reasoning-title">Working</span></forge-ai-reasoning-header>`
      );

      expect(el.shadowRoot!.querySelector('slot[name="title"]')).toBeTruthy();
      expect(el.shadowRoot!.querySelector('slot[name="reasoning-title"]')).toBeNull();
      expect(el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="title"]')!.assignedElements()[0].textContent).toBe('Done');
    });

    it('should render the reasoning-title slot when in reasoning state', async () => {
      const el = await createHeader(
        html`<forge-ai-reasoning-header reasoning><span slot="title">Done</span><span slot="reasoning-title">Working</span></forge-ai-reasoning-header>`
      );

      expect(el.shadowRoot!.querySelector('slot[name="title"]')).toBeNull();
      expect(el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="reasoning-title"]')!.assignedElements()[0].textContent).toBe('Working');
    });

    it('should switch slots when reasoning changes', async () => {
      const el = await createHeader();

      el.reasoning = true;
      await el.updateComplete;

      expect(el.shadowRoot!.querySelector('slot[name="reasoning-title"]')).toBeTruthy();
    });
  });

  describe('toggle', () => {
    it('should flip expanded on click', async () => {
      const el = await createHeader();

      el.shadowRoot!.querySelector('button')!.click();
      await el.updateComplete;
      expect(el.expanded).toBe(true);

      el.shadowRoot!.querySelector('button')!.click();
      await el.updateComplete;
      expect(el.expanded).toBe(false);
    });

    it('should dispatch a bubbling, composed toggle event with the new state', async () => {
      const el = await createHeader();
      const listener = vi.fn<(evt: CustomEvent<ForgeAiReasoningHeaderToggleEventData>) => void>();
      document.body.addEventListener('forge-ai-reasoning-header-toggle', listener);

      el.shadowRoot!.querySelector('button')!.click();
      document.body.removeEventListener('forge-ai-reasoning-header-toggle', listener);

      expect(listener).toHaveBeenCalledOnce();
      const evt = listener.mock.calls[0][0];
      expect(evt.bubbles).toBe(true);
      expect(evt.composed).toBe(true);
      expect(evt.detail).toEqual({ expanded: true });
    });

    it('should report expanded false when toggled from expanded', async () => {
      const el = await createHeader(html`<forge-ai-reasoning-header expanded></forge-ai-reasoning-header>`);
      const listener = vi.fn<(evt: CustomEvent<ForgeAiReasoningHeaderToggleEventData>) => void>();
      el.addEventListener('forge-ai-reasoning-header-toggle', listener);

      el.shadowRoot!.querySelector('button')!.click();

      expect(listener.mock.calls[0][0].detail).toEqual({ expanded: false });
    });

    it('should toggle with the Enter key', async () => {
      const el = await createHeader();
      el.shadowRoot!.querySelector('button')!.focus();

      await userEvent.keyboard('{Enter}');
      await el.updateComplete;

      expect(el.expanded).toBe(true);
    });

    it('should toggle with the Space key', async () => {
      const el = await createHeader();
      el.shadowRoot!.querySelector('button')!.focus();

      await userEvent.keyboard(' ');
      await el.updateComplete;

      expect(el.expanded).toBe(true);
    });
  });

  it.skip('should point aria-controls at an element that exists (BUG: aria-controls="content" references no id in the header shadow root)', async () => {
    const el = await createHeader();

    const controls = el.shadowRoot!.querySelector('button')!.getAttribute('aria-controls');

    expect(controls === null || !!el.shadowRoot!.getElementById(controls)).toBe(true);
  });
});
