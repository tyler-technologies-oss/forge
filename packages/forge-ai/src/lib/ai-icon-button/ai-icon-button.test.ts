import { describe, expect, it } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import type { AiIconButtonComponent } from './ai-icon-button.js';

import './ai-icon-button.js';

describe('AiIconButtonComponent', () => {
  it('should register the custom element and render a labelled button', async () => {
    const el = await renderFixture<AiIconButtonComponent>(html`<forge-ai-icon-button></forge-ai-icon-button>`, 'forge-ai-icon-button');

    const button = el.shadowRoot!.querySelector('button')!;
    expect(customElements.get('forge-ai-icon-button')).toBeDefined();
    expect(button.getAttribute('aria-label')).toBe('AI Icon Button');
    expect(button.querySelector('forge-ai-icon')).toBeTruthy();
  });

  it('should default disabled to false', async () => {
    const el = await renderFixture<AiIconButtonComponent>(html`<forge-ai-icon-button></forge-ai-icon-button>`, 'forge-ai-icon-button');

    expect(el.disabled).toBe(false);
    expect(el.hasAttribute('disabled')).toBe(false);
    expect(el.shadowRoot!.querySelector('button')!.disabled).toBe(false);
    expect(el.matches(':state(disabled)')).toBe(false);
  });

  it('should disable the inner button and expose the disabled state when the attribute is set', async () => {
    const el = await renderFixture<AiIconButtonComponent>(html`<forge-ai-icon-button disabled></forge-ai-icon-button>`, 'forge-ai-icon-button');

    expect(el.disabled).toBe(true);
    expect(el.shadowRoot!.querySelector('button')!.disabled).toBe(true);
    expect(el.matches(':state(disabled)')).toBe(true);
  });

  it('should reflect disabled and update the state when toggled', async () => {
    const el = await renderFixture<AiIconButtonComponent>(html`<forge-ai-icon-button></forge-ai-icon-button>`, 'forge-ai-icon-button');

    el.disabled = true;
    await el.updateComplete;
    expect(el.hasAttribute('disabled')).toBe(true);
    expect(el.matches(':state(disabled)')).toBe(true);

    el.disabled = false;
    await el.updateComplete;
    expect(el.hasAttribute('disabled')).toBe(false);
    expect(el.shadowRoot!.querySelector('button')!.disabled).toBe(false);
    expect(el.matches(':state(disabled)')).toBe(false);
  });

  it('should not dispatch click events from the inner button when disabled', async () => {
    const el = await renderFixture<AiIconButtonComponent>(html`<forge-ai-icon-button disabled></forge-ai-icon-button>`, 'forge-ai-icon-button');
    let clicks = 0;
    el.addEventListener('click', () => clicks++);

    el.shadowRoot!.querySelector('button')!.click();

    expect(clicks).toBe(0);
  });

  it('should keep its exposed state when re-rendered without a property change', async () => {
    const el = await renderFixture<AiIconButtonComponent>(html`<forge-ai-icon-button disabled></forge-ai-icon-button>`, 'forge-ai-icon-button');

    el.requestUpdate();
    await el.updateComplete;

    expect(el.matches(':state(disabled)')).toBe(true);
  });
});
