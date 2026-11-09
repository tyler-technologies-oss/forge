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
});
