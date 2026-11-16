import { describe, expect, it } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import type { AiIconComponent } from './ai-icon.js';

import './ai-icon.js';

describe('AiIconComponent', () => {
  function fillOf(el: AiIconComponent): string {
    return getComputedStyle(el.shadowRoot!.querySelector('svg')!).fill;
  }

  it('should use --forge-ai-icon-color for the fill', async () => {
    const el = await renderFixture<AiIconComponent>(html`<forge-ai-icon style="--forge-ai-icon-color: rgb(1, 2, 3)"></forge-ai-icon>`, 'forge-ai-icon');

    expect(fillOf(el)).toBe('rgb(1, 2, 3)');
  });

  it('should fall back to the deprecated --forge-ai-chatbot-icon-color', async () => {
    const el = await renderFixture<AiIconComponent>(html`<forge-ai-icon style="--forge-ai-chatbot-icon-color: rgb(4, 5, 6)"></forge-ai-icon>`, 'forge-ai-icon');

    expect(fillOf(el)).toBe('rgb(4, 5, 6)');
  });

  it('should prefer --forge-ai-icon-color over the deprecated property', async () => {
    const el = await renderFixture<AiIconComponent>(
      html`<forge-ai-icon style="--forge-ai-icon-color: rgb(1, 2, 3); --forge-ai-chatbot-icon-color: rgb(4, 5, 6)"></forge-ai-icon>`,
      'forge-ai-icon'
    );

    expect(fillOf(el)).toBe('rgb(1, 2, 3)');
  });

  it('should register the custom element and render a shadow root', async () => {
    const el = await renderFixture<AiIconComponent>(html`<forge-ai-icon></forge-ai-icon>`, 'forge-ai-icon');

    expect(customElements.get('forge-ai-icon')).toBeDefined();
    expect(el.shadowRoot).toBeTruthy();
  });

  it('should default outline to false and render a bare svg without a gradient container', async () => {
    const el = await renderFixture<AiIconComponent>(html`<forge-ai-icon></forge-ai-icon>`, 'forge-ai-icon');

    expect(el.outline).toBe(false);
    expect(el.shadowRoot!.querySelector('svg')).toBeTruthy();
    expect(el.shadowRoot!.querySelector('forge-ai-gradient-container')).toBeNull();
    expect(el.matches(':state(outline)')).toBe(false);
  });

  it('should wrap the svg in a high gradient container when outline is set', async () => {
    const el = await renderFixture<AiIconComponent>(html`<forge-ai-icon outline></forge-ai-icon>`, 'forge-ai-icon');

    const container = el.shadowRoot!.querySelector<HTMLElement & { variant: string }>('forge-ai-gradient-container')!;
    expect(el.outline).toBe(true);
    expect(container.variant).toBe('high');
    expect(container.querySelector('svg')).toBeTruthy();
    expect(el.matches(':state(outline)')).toBe(true);
  });

  it('should not reflect outline to an attribute when set as a property', async () => {
    const el = await renderFixture<AiIconComponent>(html`<forge-ai-icon></forge-ai-icon>`, 'forge-ai-icon');

    el.outline = true;
    await el.updateComplete;

    expect(el.hasAttribute('outline')).toBe(false);
    expect(el.shadowRoot!.querySelector('forge-ai-gradient-container')).toBeTruthy();
  });

  it('should toggle between outlined and plain rendering when outline changes', async () => {
    const el = await renderFixture<AiIconComponent>(html`<forge-ai-icon outline></forge-ai-icon>`, 'forge-ai-icon');

    el.outline = false;
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector('forge-ai-gradient-container')).toBeNull();
    expect(el.matches(':state(outline)')).toBe(false);
  });

  it('should hide the decorative svg from assistive technology', async () => {
    const el = await renderFixture<AiIconComponent>(html`<forge-ai-icon></forge-ai-icon>`, 'forge-ai-icon');

    expect(el.shadowRoot!.querySelector('svg')!.getAttribute('aria-hidden')).toBe('true');
  });

  it('should keep its exposed state when re-rendered without a property change', async () => {
    const el = await renderFixture<AiIconComponent>(html`<forge-ai-icon outline></forge-ai-icon>`, 'forge-ai-icon');

    el.requestUpdate();
    await el.updateComplete;

    expect(el.matches(':state(outline)')).toBe(true);
  });
});
