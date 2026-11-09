import { describe, expect, it } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import type { AiButtonComponent } from './ai-button.js';
import type { AiGradientContainerComponent } from '../ai-gradient-container/ai-gradient-container.js';

import './ai-button.js';

describe('AiButtonComponent', () => {
  it('should register the custom element and render a shadow root with a button', async () => {
    const el = await renderFixture<AiButtonComponent>(html`<forge-ai-button>Ask</forge-ai-button>`, 'forge-ai-button');

    expect(customElements.get('forge-ai-button')).toBeDefined();
    expect(el.shadowRoot!.querySelector('button')).toBeTruthy();
  });

  it('should default disabled to false and enable the inner button', async () => {
    const el = await renderFixture<AiButtonComponent>(html`<forge-ai-button>Ask</forge-ai-button>`, 'forge-ai-button');

    expect(el.disabled).toBe(false);
    expect(el.hasAttribute('disabled')).toBe(false);
    expect(el.shadowRoot!.querySelector('button')!.disabled).toBe(false);
    expect(el.matches(':state(disabled)')).toBe(false);
  });

  it('should disable the inner button and expose the disabled state when the attribute is set', async () => {
    const el = await renderFixture<AiButtonComponent>(html`<forge-ai-button disabled>Ask</forge-ai-button>`, 'forge-ai-button');

    expect(el.disabled).toBe(true);
    expect(el.shadowRoot!.querySelector('button')!.disabled).toBe(true);
    expect(el.matches(':state(disabled)')).toBe(true);
  });

  it('should reflect disabled to the attribute and update the inner button when toggled', async () => {
    const el = await renderFixture<AiButtonComponent>(html`<forge-ai-button>Ask</forge-ai-button>`, 'forge-ai-button');

    el.disabled = true;
    await el.updateComplete;
    expect(el.hasAttribute('disabled')).toBe(true);
    expect(el.shadowRoot!.querySelector('button')!.disabled).toBe(true);
    expect(el.matches(':state(disabled)')).toBe(true);

    el.disabled = false;
    await el.updateComplete;
    expect(el.hasAttribute('disabled')).toBe(false);
    expect(el.shadowRoot!.querySelector('button')!.disabled).toBe(false);
    expect(el.matches(':state(disabled)')).toBe(false);
  });

  it('should use the high gradient variant when enabled and the disabled variant when disabled', async () => {
    const el = await renderFixture<AiButtonComponent>(html`<forge-ai-button>Ask</forge-ai-button>`, 'forge-ai-button');
    const container = el.shadowRoot!.querySelector<AiGradientContainerComponent>('forge-ai-gradient-container')!;
    expect(container.variant).toBe('high');

    el.disabled = true;
    await el.updateComplete;

    expect(container.variant).toBe('disabled');
  });

  it('should project default and end slot content', async () => {
    const el = await renderFixture<AiButtonComponent>(html`<forge-ai-button>Ask<span slot="end" id="end">E</span></forge-ai-button>`, 'forge-ai-button');

    const defaultSlot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot:not([name])')!;
    const endSlot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="end"]')!;
    expect(defaultSlot.assignedNodes().map(n => n.textContent)).toEqual(['Ask']);
    expect(endSlot.assignedElements()).toEqual([el.querySelector('#end')]);
  });

  it('should render the AI icon inside the button', async () => {
    const el = await renderFixture<AiButtonComponent>(html`<forge-ai-button>Ask</forge-ai-button>`, 'forge-ai-button');

    expect(el.shadowRoot!.querySelector('button forge-ai-icon')).toBeTruthy();
  });

  it('should keep its exposed state when re-rendered without a property change', async () => {
    const el = await renderFixture<AiButtonComponent>(html`<forge-ai-button disabled></forge-ai-button>`, 'forge-ai-button');

    el.requestUpdate();
    await el.updateComplete;

    expect(el.matches(':state(disabled)')).toBe(true);
  });
});
