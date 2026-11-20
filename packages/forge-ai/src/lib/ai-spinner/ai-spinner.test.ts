import { describe, expect, it } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import type { AiSpinnerComponent, SpinnerSize } from './ai-spinner.js';

import './ai-spinner.js';

describe('AiSpinnerComponent', () => {
  it('should register the custom element and render a shadow root', async () => {
    const el = await renderFixture<AiSpinnerComponent>(html`<forge-ai-spinner></forge-ai-spinner>`, 'forge-ai-spinner');

    expect(customElements.get('forge-ai-spinner')).toBeDefined();
    expect(el.shadowRoot).toBeTruthy();
  });

  it('should default size to medium', async () => {
    const el = await renderFixture<AiSpinnerComponent>(html`<forge-ai-spinner></forge-ai-spinner>`, 'forge-ai-spinner');

    expect(el.size).toBe('medium');
    expect(el.shadowRoot!.querySelector('.spinner')!.classList.contains('spinner--medium')).toBe(true);
  });

  it.each<[SpinnerSize, number]>([
    ['extra-small', 16],
    ['small', 24],
    ['medium', 32],
    ['large', 48]
  ])('should render a %s spinner at %ipx when size is set by attribute', async (size, px) => {
    const el = await renderFixture<AiSpinnerComponent>(html`<forge-ai-spinner size=${size}></forge-ai-spinner>`, 'forge-ai-spinner');

    expect(el.size).toBe(size);
    const rect = el.shadowRoot!.querySelector('.spinner')!.getBoundingClientRect();
    expect(rect.width).toBe(px);
    expect(rect.height).toBe(px);
  });

  it('should update the rendered size when the property changes', async () => {
    const el = await renderFixture<AiSpinnerComponent>(html`<forge-ai-spinner></forge-ai-spinner>`, 'forge-ai-spinner');

    el.size = 'large';
    await el.updateComplete;

    const spinner = el.shadowRoot!.querySelector('.spinner')!;
    expect(spinner.classList.contains('spinner--large')).toBe(true);
    expect(spinner.classList.contains('spinner--medium')).toBe(false);
  });

  it('should hide the decorative svg from assistive technology', async () => {
    const el = await renderFixture<AiSpinnerComponent>(html`<forge-ai-spinner></forge-ai-spinner>`, 'forge-ai-spinner');

    expect(el.shadowRoot!.querySelector('svg')!.getAttribute('aria-hidden')).toBe('true');
  });
});
