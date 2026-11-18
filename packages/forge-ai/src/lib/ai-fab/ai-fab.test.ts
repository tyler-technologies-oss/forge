import { describe, expect, it } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import type { AiFabComponent } from './ai-fab.js';

import './ai-fab.js';

describe('AiFabComponent', () => {
  it('should use a neutral default accessible label', async () => {
    const el = await renderFixture<AiFabComponent>(html`<forge-ai-fab></forge-ai-fab>`, 'forge-ai-fab');

    expect(el.label).toBe('Open AI assistant');
    expect(el.shadowRoot!.querySelector('button')!.getAttribute('aria-label')).toBe('Open AI assistant');
  });

  it('should use a custom label when provided', async () => {
    const el = await renderFixture<AiFabComponent>(html`<forge-ai-fab label="Ask"></forge-ai-fab>`, 'forge-ai-fab');

    expect(el.shadowRoot!.querySelector('button')!.getAttribute('aria-label')).toBe('Ask');
  });

  it('should register the custom element and render a shadow root', async () => {
    const el = await renderFixture<AiFabComponent>(html`<forge-ai-fab></forge-ai-fab>`, 'forge-ai-fab');

    expect(customElements.get('forge-ai-fab')).toBeDefined();
    expect(el.shadowRoot).toBeTruthy();
  });

  it('should default disabled and extended to false', async () => {
    const el = await renderFixture<AiFabComponent>(html`<forge-ai-fab></forge-ai-fab>`, 'forge-ai-fab');

    expect(el.disabled).toBe(false);
    expect(el.extended).toBe(false);
    expect(el.shadowRoot!.querySelector('button')!.disabled).toBe(false);
    expect(el.matches(':state(disabled)')).toBe(false);
    expect(el.matches(':state(extended)')).toBe(false);
  });

  it('should disable the inner button, expose the state, and use the disabled gradient when disabled', async () => {
    const el = await renderFixture<AiFabComponent>(html`<forge-ai-fab disabled></forge-ai-fab>`, 'forge-ai-fab');

    expect(el.shadowRoot!.querySelector('button')!.disabled).toBe(true);
    expect(el.matches(':state(disabled)')).toBe(true);
    expect(el.shadowRoot!.querySelector<HTMLElement & { variant: string }>('forge-ai-gradient-container')!.variant).toBe('disabled');
  });

  it('should reflect disabled and extended to attributes when set as properties', async () => {
    const el = await renderFixture<AiFabComponent>(html`<forge-ai-fab></forge-ai-fab>`, 'forge-ai-fab');

    el.disabled = true;
    el.extended = true;
    await el.updateComplete;

    expect(el.hasAttribute('disabled')).toBe(true);
    expect(el.hasAttribute('extended')).toBe(true);
    expect(el.matches(':state(disabled)')).toBe(true);
    expect(el.matches(':state(extended)')).toBe(true);
  });

  it('should use the high gradient variant when enabled', async () => {
    const el = await renderFixture<AiFabComponent>(html`<forge-ai-fab></forge-ai-fab>`, 'forge-ai-fab');

    expect(el.shadowRoot!.querySelector<HTMLElement & { variant: string }>('forge-ai-gradient-container')!.variant).toBe('high');
  });

  it('should not render the default slot until extended', async () => {
    const el = await renderFixture<AiFabComponent>(html`<forge-ai-fab>Ask AI</forge-ai-fab>`, 'forge-ai-fab');
    expect(el.shadowRoot!.querySelector('slot:not([name])')).toBeNull();

    el.extended = true;
    await el.updateComplete;

    const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot:not([name])')!;
    expect(slot.assignedNodes().map(n => n.textContent)).toEqual(['Ask AI']);
  });

  it('should apply the extended button classes only when extended', async () => {
    const el = await renderFixture<AiFabComponent>(html`<forge-ai-fab extended>Ask</forge-ai-fab>`, 'forge-ai-fab');
    const button = el.shadowRoot!.querySelector('button')!;
    expect(button.classList.contains('forge-fab--extended')).toBe(true);

    el.extended = false;
    await el.updateComplete;

    expect(button.classList.contains('forge-fab--extended')).toBe(false);
  });

  it('should render the default AI icon as fallback for the icon slot', async () => {
    const el = await renderFixture<AiFabComponent>(html`<forge-ai-fab></forge-ai-fab>`, 'forge-ai-fab');

    const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="icon"]')!;
    expect(slot.assignedNodes()).toHaveLength(0);
    expect(slot.querySelector('forge-ai-icon')).toBeTruthy();
  });

  it('should project a custom icon into the icon slot', async () => {
    const el = await renderFixture<AiFabComponent>(html`<forge-ai-fab><svg slot="icon"></svg></forge-ai-fab>`, 'forge-ai-fab');

    const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="icon"]')!;
    expect(slot.assignedElements()).toEqual([el.querySelector('svg')]);
  });

  it('should update the accessible label when label changes', async () => {
    const el = await renderFixture<AiFabComponent>(html`<forge-ai-fab></forge-ai-fab>`, 'forge-ai-fab');

    el.label = 'Help';
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector('button')!.getAttribute('aria-label')).toBe('Help');
  });

  it('should not fire click listeners from the inner button when disabled', async () => {
    const el = await renderFixture<AiFabComponent>(html`<forge-ai-fab disabled></forge-ai-fab>`, 'forge-ai-fab');
    let clicks = 0;
    el.addEventListener('click', () => clicks++);

    el.shadowRoot!.querySelector('button')!.click();

    expect(clicks).toBe(0);
  });
});
