import { describe, expect, it } from 'vitest';
import { html } from 'lit';
import { page } from 'vitest/browser';
import { renderFixture } from '../../testing/fixture.js';
import type { AiDialogComponent } from './ai-dialog.js';
import type { AiReasoningHeaderComponent } from '../ai-reasoning-header/index.js';

import './ai-dialog.js';
import '../ai-reasoning-header/ai-reasoning-header.js';

const nextFrames = (): Promise<void> => new Promise(resolve => setTimeout(resolve, 50));

describe('AiDialogComponent', () => {
  it('should label the drag handle without referencing a chatbot', async () => {
    await page.viewport(1280, 800);
    const el = await renderFixture<AiDialogComponent>(html`<forge-ai-dialog></forge-ai-dialog>`, 'forge-ai-dialog');

    expect(el.isFullscreen).toBe(false);
    expect(el.shadowRoot!.querySelector('#drag-handle')!.getAttribute('aria-label')).toBe('Move dialog');
  });

  it('should stay open when a slotted descendant dispatches a bubbling toggle event', async () => {
    await page.viewport(1280, 800);
    const el = await renderFixture<AiDialogComponent>(
      html`<forge-ai-dialog open
        ><forge-ai-reasoning-header><span slot="title">Title</span></forge-ai-reasoning-header></forge-ai-dialog
      >`,
      'forge-ai-dialog'
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
    await page.viewport(1280, 800);
    const el = await renderFixture<AiDialogComponent>(html`<forge-ai-dialog open><div id="child"></div></forge-ai-dialog>`, 'forge-ai-dialog');
    await nextFrames();

    el.querySelector('#child')!.dispatchEvent(new CustomEvent('toggle', { bubbles: true, composed: true }));
    await nextFrames();

    expect(el.open).toBe(true);
  });
});
