import { describe, expect, it } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../../testing/fixture.js';
import { ThoughtBaseComponent, ThoughtBaseComponentTagName } from './thought-base.js';

const TAG = 'forge-ai-thought-base';

function assigned(el: ThoughtBaseComponent, selector: string): Element[] {
  return el.shadowRoot!.querySelector<HTMLSlotElement>(selector)!.assignedElements();
}

describe('ThoughtBaseComponent', () => {
  it('should be registered under the forge-ai-thought-base tag', async () => {
    const el = await renderFixture<ThoughtBaseComponent>(html`<forge-ai-thought-base></forge-ai-thought-base>`, TAG);

    expect(ThoughtBaseComponentTagName).toBe(TAG);
    expect(customElements.get(TAG)).toBe(ThoughtBaseComponent);
    expect(el).toBeInstanceOf(ThoughtBaseComponent);
  });

  it('should contain shadow root', async () => {
    const el = await renderFixture<ThoughtBaseComponent>(html`<forge-ai-thought-base></forge-ai-thought-base>`, TAG);

    expect(el.shadowRoot).toBeTruthy();
  });

  it('should have an undefined step by default', async () => {
    const el = await renderFixture<ThoughtBaseComponent>(html`<forge-ai-thought-base></forge-ai-thought-base>`, TAG);

    expect(el.step).toBeUndefined();
  });

  it('should read step as a number from the attribute', async () => {
    const el = await renderFixture<ThoughtBaseComponent>(html`<forge-ai-thought-base step="3"></forge-ai-thought-base>`, TAG);

    expect(el.step).toBe(3);
  });

  it('should project icon, title, and default slots', async () => {
    const el = await renderFixture<ThoughtBaseComponent>(
      html`<forge-ai-thought-base
        ><span slot="icon">I</span><span slot="title">T</span>
        <p>Body</p></forge-ai-thought-base
      >`,
      TAG
    );

    expect(assigned(el, 'slot[name="icon"]').map(n => n.textContent)).toEqual(['I']);
    expect(assigned(el, 'slot[name="title"]').map(n => n.textContent)).toEqual(['T']);
    expect(assigned(el, 'slot:not([name])').map(n => n.textContent)).toEqual(['Body']);
  });
});
