import { describe, expect, it } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../../testing/fixture.js';
import { settle } from '../../../testing/settle.js';
import type { ForgeAiOverlayComponent } from './overlay.js';
import type { AiReasoningHeaderComponent } from '../../ai-reasoning-header/index.js';

import './overlay.js';
import '../../ai-reasoning-header/ai-reasoning-header.js';

describe('ForgeAiOverlayComponent', () => {
  it('should stay open when a slotted descendant dispatches a bubbling toggle event', async () => {
    const el = await renderFixture<ForgeAiOverlayComponent>(
      html`<forge-ai-overlay open dismiss-mode="manual"
        ><forge-ai-reasoning-header><span slot="title">Title</span></forge-ai-reasoning-header></forge-ai-overlay
      >`,
      'forge-ai-overlay'
    );
    await settle(el);
    expect(el.open).toBe(true);

    const header = el.querySelector<AiReasoningHeaderComponent>('forge-ai-reasoning-header')!;
    header.shadowRoot!.querySelector<HTMLButtonElement>('button')!.click();
    await settle(el);

    expect(header.expanded).toBe(true);
    expect(el.open).toBe(true);
  });

  it('should stay open when a slotted descendant dispatches a plain toggle CustomEvent', async () => {
    const el = await renderFixture<ForgeAiOverlayComponent>(
      html`<forge-ai-overlay open dismiss-mode="manual"><div id="child"></div></forge-ai-overlay>`,
      'forge-ai-overlay'
    );
    await settle(el);

    el.querySelector('#child')!.dispatchEvent(new CustomEvent('toggle', { bubbles: true, composed: true }));
    await settle(el);

    expect(el.open).toBe(true);
  });
});
