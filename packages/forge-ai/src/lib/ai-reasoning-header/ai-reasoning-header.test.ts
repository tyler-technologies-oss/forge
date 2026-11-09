import { describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import type { AiReasoningHeaderComponent, ForgeAiReasoningHeaderToggleEventData } from './index.js';
import type { AiReasoningComponent } from '../ai-reasoning/ai-reasoning.js';

import './ai-reasoning-header.js';
import '../ai-reasoning/ai-reasoning.js';

describe('AiReasoningHeaderComponent', () => {
  it('should dispatch a namespaced toggle event and not the native toggle name', async () => {
    const el = await renderFixture<AiReasoningHeaderComponent>(html`<forge-ai-reasoning-header></forge-ai-reasoning-header>`, 'forge-ai-reasoning-header');
    const listener = vi.fn<(evt: CustomEvent<ForgeAiReasoningHeaderToggleEventData>) => void>();
    const legacy = vi.fn();
    el.addEventListener('forge-ai-reasoning-header-toggle', listener);
    el.addEventListener('toggle', legacy);

    el.shadowRoot!.querySelector<HTMLButtonElement>('button')!.click();

    expect(listener).toHaveBeenCalledOnce();
    expect(listener.mock.calls[0][0].detail).toEqual({ expanded: true });
    expect(legacy).not.toHaveBeenCalled();
  });

  it('should expand a parent forge-ai-reasoning when clicked', async () => {
    const parent = await renderFixture<AiReasoningComponent>(
      html`<forge-ai-reasoning><forge-ai-reasoning-header slot="header"></forge-ai-reasoning-header></forge-ai-reasoning>`,
      'forge-ai-reasoning'
    );

    parent.querySelector<AiReasoningHeaderComponent>('forge-ai-reasoning-header')!.shadowRoot!.querySelector<HTMLButtonElement>('button')!.click();
    await parent.updateComplete;

    expect(parent.expanded).toBe(true);
  });
});
