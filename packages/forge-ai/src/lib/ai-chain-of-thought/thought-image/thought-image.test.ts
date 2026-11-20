import { describe, expect, it } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../../testing/fixture.js';
import type { ThoughtBaseComponent } from '../thought-base/thought-base.js';
import { ThoughtImageComponent, ThoughtImageComponentTagName } from './thought-image.js';

const TAG = 'forge-ai-thought-image';

describe('ThoughtImageComponent', () => {
  it('should be registered under the forge-ai-thought-image tag', async () => {
    const el = await renderFixture<ThoughtImageComponent>(html`<forge-ai-thought-image></forge-ai-thought-image>`, TAG);

    expect(ThoughtImageComponentTagName).toBe(TAG);
    expect(customElements.get(TAG)).toBe(ThoughtImageComponent);
    expect(el).toBeInstanceOf(ThoughtImageComponent);
  });

  it('should contain shadow root', async () => {
    const el = await renderFixture<ThoughtImageComponent>(html`<forge-ai-thought-image></forge-ai-thought-image>`, TAG);

    expect(el.shadowRoot).toBeTruthy();
  });

  it('should have an undefined step by default and not pass one to the base', async () => {
    const el = await renderFixture<ThoughtImageComponent>(html`<forge-ai-thought-image></forge-ai-thought-image>`, TAG);

    expect(el.step).toBeUndefined();
    expect(el.shadowRoot!.querySelector<ThoughtBaseComponent>('forge-ai-thought-base')!.step).toBeUndefined();
  });

  it('should read step from the attribute and forward it to the base', async () => {
    const el = await renderFixture<ThoughtImageComponent>(html`<forge-ai-thought-image step="2"></forge-ai-thought-image>`, TAG);
    const base = el.shadowRoot!.querySelector<ThoughtBaseComponent>('forge-ai-thought-base')!;
    await base.updateComplete;

    expect(el.step).toBe(2);
    expect(base.step).toBe(2);
  });

  it('should forward the step when it changes', async () => {
    const el = await renderFixture<ThoughtImageComponent>(html`<forge-ai-thought-image step="2"></forge-ai-thought-image>`, TAG);

    el.step = 5;
    await el.updateComplete;
    const base = el.shadowRoot!.querySelector<ThoughtBaseComponent>('forge-ai-thought-base')!;
    await base.updateComplete;

    expect(base.step).toBe(5);
  });

  it('should render a decorative icon', async () => {
    const el = await renderFixture<ThoughtImageComponent>(html`<forge-ai-thought-image></forge-ai-thought-image>`, TAG);

    expect(el.shadowRoot!.querySelector('svg[slot="icon"]')!.getAttribute('aria-hidden')).toBe('true');
  });

  it('should forward title slot content', async () => {
    const el = await renderFixture<ThoughtImageComponent>(html`<forge-ai-thought-image><span slot="title">Title</span></forge-ai-thought-image>`, TAG);

    const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="title"]')!;

    expect(slot.assignedElements().map(n => n.textContent)).toEqual(['Title']);
  });

  it('should project image slot content', async () => {
    const el = await renderFixture<ThoughtImageComponent>(html`<forge-ai-thought-image><img slot="image" alt="x" /></forge-ai-thought-image>`, TAG);

    const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="image"]')!;

    expect(slot.assignedElements()).toHaveLength(1);
    expect(slot.assignedElements()[0].tagName).toBe('IMG');
  });
});
