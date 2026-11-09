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
});
