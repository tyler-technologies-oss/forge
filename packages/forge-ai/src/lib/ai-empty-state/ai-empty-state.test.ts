import { describe, expect, it } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import type { AiEmptyStateComponent } from './ai-empty-state.js';

import './ai-empty-state.js';

function slotNamed(el: AiEmptyStateComponent, name: string): HTMLSlotElement {
  return el.shadowRoot!.querySelector<HTMLSlotElement>(`slot[name="${name}"]`)!;
}

describe('AiEmptyStateComponent', () => {
  it('should register the custom element and render a shadow root', async () => {
    const el = await renderFixture<AiEmptyStateComponent>(html`<forge-ai-empty-state></forge-ai-empty-state>`, 'forge-ai-empty-state');

    expect(customElements.get('forge-ai-empty-state')).toBeDefined();
    expect(el.shadowRoot).toBeTruthy();
  });

  it('should show the default welcome message when no body is slotted', async () => {
    const el = await renderFixture<AiEmptyStateComponent>(html`<forge-ai-empty-state></forge-ai-empty-state>`, 'forge-ai-empty-state');

    const body = slotNamed(el, 'body');
    expect(body.assignedNodes()).toHaveLength(0);
    expect(body.textContent).toContain('Welcome to AI Assistant!');
  });

  it('should replace the default message with slotted body content', async () => {
    const el = await renderFixture<AiEmptyStateComponent>(html`<forge-ai-empty-state><p slot="body">Custom</p></forge-ai-empty-state>`, 'forge-ai-empty-state');

    expect(slotNamed(el, 'body').assignedElements()).toEqual([el.querySelector('p[slot="body"]')]);
  });

  it('should project icon, heading, and actions into their slots', async () => {
    const el = await renderFixture<AiEmptyStateComponent>(
      html`<forge-ai-empty-state>
        <svg slot="icon"></svg>
        <h2 slot="heading">Hello</h2>
        <button slot="actions">Go</button>
      </forge-ai-empty-state>`,
      'forge-ai-empty-state'
    );

    expect(slotNamed(el, 'icon').assignedElements()).toEqual([el.querySelector('svg')]);
    expect(slotNamed(el, 'heading').assignedElements()).toEqual([el.querySelector('h2')]);
    expect(slotNamed(el, 'actions').assignedElements()).toEqual([el.querySelector('button')]);
  });
});
