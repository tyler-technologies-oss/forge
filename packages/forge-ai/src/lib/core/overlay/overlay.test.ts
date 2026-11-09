import { describe, expect, it } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../../testing/fixture.js';
import type { ForgeAiOverlayComponent } from './overlay.js';
import type { AiReasoningHeaderComponent } from '../../ai-reasoning-header/index.js';

import './overlay.js';
import '../../ai-reasoning-header/ai-reasoning-header.js';

const nextFrames = (): Promise<void> => new Promise(resolve => setTimeout(resolve, 50));

describe('ForgeAiOverlayComponent', () => {
  it('should stay open when a slotted descendant dispatches a bubbling toggle event', async () => {
    const el = await renderFixture<ForgeAiOverlayComponent>(
      html`<forge-ai-overlay open dismiss-mode="manual"
        ><forge-ai-reasoning-header><span slot="title">Title</span></forge-ai-reasoning-header></forge-ai-overlay
      >`,
      'forge-ai-overlay'
    );
    await nextFrames();
    expect(el.open).toBe(true);

    const header = el.querySelector<AiReasoningHeaderComponent>('forge-ai-reasoning-header')!;
    header.shadowRoot!.querySelector<HTMLButtonElement>('button')!.click();
    await nextFrames();

    expect(header.expanded).toBe(true);
    expect(el.open).toBe(true);
  });

  it('should stay open when a slotted descendant dispatches a plain toggle CustomEvent', async () => {
    const el = await renderFixture<ForgeAiOverlayComponent>(
      html`<forge-ai-overlay open dismiss-mode="manual"><div id="child"></div></forge-ai-overlay>`,
      'forge-ai-overlay'
    );
    await nextFrames();

    el.querySelector('#child')!.dispatchEvent(new CustomEvent('toggle', { bubbles: true, composed: true }));
    await nextFrames();

    expect(el.open).toBe(true);
  });
});
