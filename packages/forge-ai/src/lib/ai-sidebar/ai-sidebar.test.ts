import { describe, expect, it } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import type { AiSidebarComponent } from './ai-sidebar.js';

import './ai-sidebar.js';

describe('AiSidebarComponent', () => {
  it('should label the resize handle without referencing a chatbot', async () => {
    const el = await renderFixture<AiSidebarComponent>(html`<forge-ai-sidebar open></forge-ai-sidebar>`, 'forge-ai-sidebar');

    const handle = el.shadowRoot!.querySelector('[role="slider"]')!;
    expect(handle.getAttribute('aria-label')).toBe('Resize sidebar, use left and right arrow keys');
  });
});
