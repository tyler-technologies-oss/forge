import { describe, expect, it } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../../testing/fixture.js';
import type { ThoughtBaseComponent } from '../thought-base/thought-base.js';
import { ThoughtDetailComponent, ThoughtDetailComponentTagName } from './thought-detail.js';

const TAG = 'forge-ai-thought-detail';

describe('ThoughtDetailComponent', () => {
  it('should be registered under the forge-ai-thought-detail tag', async () => {
    const el = await renderFixture<ThoughtDetailComponent>(html`<forge-ai-thought-detail></forge-ai-thought-detail>`, TAG);

    expect(ThoughtDetailComponentTagName).toBe(TAG);
    expect(customElements.get(TAG)).toBe(ThoughtDetailComponent);
    expect(el).toBeInstanceOf(ThoughtDetailComponent);
  });

  it('should contain shadow root', async () => {
    const el = await renderFixture<ThoughtDetailComponent>(html`<forge-ai-thought-detail></forge-ai-thought-detail>`, TAG);

    expect(el.shadowRoot).toBeTruthy();
  });

  it('should render inside a thought base with a decorative icon', async () => {
    const el = await renderFixture<ThoughtDetailComponent>(html`<forge-ai-thought-detail></forge-ai-thought-detail>`, TAG);

    const base = el.shadowRoot!.querySelector<ThoughtBaseComponent>('forge-ai-thought-base')!;
    const icon = base.querySelector('svg[slot="icon"]')!;

    expect(base).toBeTruthy();
    expect(icon.getAttribute('aria-hidden')).toBe('true');
  });

  it('should forward title slot content', async () => {
    const el = await renderFixture<ThoughtDetailComponent>(html`<forge-ai-thought-detail><span slot="title">Title</span></forge-ai-thought-detail>`, TAG);

    const titleSlot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="title"]')!;

    expect(titleSlot.assignedElements().map(n => n.textContent)).toEqual(['Title']);
  });

  it('should forward default slot content', async () => {
    const el = await renderFixture<ThoughtDetailComponent>(html`<forge-ai-thought-detail><p>Detail</p></forge-ai-thought-detail>`, TAG);

    const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot:not([name])')!;

    expect(slot.assignedElements().map(n => n.textContent)).toEqual(['Detail']);
  });
});
