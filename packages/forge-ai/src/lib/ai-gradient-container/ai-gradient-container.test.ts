import { describe, expect, it } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import type { AiGradientContainerComponent, AiGradientContainerVariant } from './ai-gradient-container.js';

import './ai-gradient-container.js';

describe('AiGradientContainerComponent', () => {
  it('should register the custom element and render a shadow root', async () => {
    const el = await renderFixture<AiGradientContainerComponent>(
      html`<forge-ai-gradient-container></forge-ai-gradient-container>`,
      'forge-ai-gradient-container'
    );

    expect(customElements.get('forge-ai-gradient-container')).toBeDefined();
    expect(el.shadowRoot).toBeTruthy();
  });

  it('should default variant to medium', async () => {
    const el = await renderFixture<AiGradientContainerComponent>(
      html`<forge-ai-gradient-container></forge-ai-gradient-container>`,
      'forge-ai-gradient-container'
    );

    expect(el.variant).toBe('medium');
    expect(el.matches(':state(medium)')).toBe(true);
  });

  it.each<AiGradientContainerVariant>(['low', 'medium', 'high', 'disabled'])(
    'should expose only the %s state when variant is set by attribute',
    async variant => {
      const el = await renderFixture<AiGradientContainerComponent>(
        html`<forge-ai-gradient-container variant=${variant}></forge-ai-gradient-container>`,
        'forge-ai-gradient-container'
      );

      expect(el.variant).toBe(variant);
      const states: AiGradientContainerVariant[] = ['low', 'medium', 'high', 'disabled'];
      for (const state of states) {
        expect(el.matches(`:state(${state})`)).toBe(state === variant);
      }
    }
  );

  it('should update the exposed state when variant changes', async () => {
    const el = await renderFixture<AiGradientContainerComponent>(
      html`<forge-ai-gradient-container variant="low"></forge-ai-gradient-container>`,
      'forge-ai-gradient-container'
    );

    el.variant = 'high';
    await el.updateComplete;

    expect(el.matches(':state(low)')).toBe(false);
    expect(el.matches(':state(high)')).toBe(true);
  });

  it('should project content into the default slot', async () => {
    const el = await renderFixture<AiGradientContainerComponent>(
      html`<forge-ai-gradient-container><span id="child">hi</span></forge-ai-gradient-container>`,
      'forge-ai-gradient-container'
    );

    const slot = el.shadowRoot!.querySelector('slot')!;
    expect(slot.assignedElements()).toEqual([el.querySelector('#child')]);
  });

  it('should keep its exposed state when re-rendered without a property change', async () => {
    const el = await renderFixture<AiGradientContainerComponent>(
      html`<forge-ai-gradient-container variant="low"></forge-ai-gradient-container>`,
      'forge-ai-gradient-container'
    );

    el.requestUpdate();
    await el.updateComplete;

    expect(el.matches(':state(low)')).toBe(true);
  });
});
