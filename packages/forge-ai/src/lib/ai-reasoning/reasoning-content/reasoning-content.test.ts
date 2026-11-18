import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { ReasoningContentComponent, ReasoningContentComponentTagName } from './reasoning-content.js';

const TAG = 'forge-ai-reasoning-content';

async function createElement(text: string): Promise<ReasoningContentComponent> {
  const el = render(html`<forge-ai-reasoning-content>${text}</forge-ai-reasoning-content>`).container.querySelector<ReasoningContentComponent>(TAG)!;
  await el.updateComplete;
  return el;
}

function displayed(el: ReasoningContentComponent): string {
  return el.shadowRoot!.querySelector('.animated-text')?.textContent ?? '';
}

describe('ReasoningContentComponent', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be registered under the forge-ai-reasoning-content tag', async () => {
    const el = await createElement('abc');

    expect(ReasoningContentComponentTagName).toBe(TAG);
    expect(customElements.get(TAG)).toBe(ReasoningContentComponent);
    expect(el).toBeInstanceOf(ReasoningContentComponent);
  });

  it('should contain shadow root', async () => {
    const el = await createElement('abc');

    expect(el.shadowRoot).toBeTruthy();
  });

  it('should start typing the slotted text as soon as it is slotted', async () => {
    const el = await createElement('hello');
    await vi.advanceTimersByTimeAsync(0);
    await el.updateComplete;

    expect(displayed(el)).toBe('h');
  });

  it('should type out the slotted text character by character', async () => {
    const el = await createElement('hello');
    await vi.advanceTimersByTimeAsync(0);

    await vi.advanceTimersByTimeAsync(20);
    await el.updateComplete;

    expect(displayed(el)).toBe('hel');
  });

  it('should display the full text once the animation completes', async () => {
    const el = await createElement('hello');

    await vi.advanceTimersByTimeAsync(1000);
    await el.updateComplete;

    expect(displayed(el)).toBe('hello');
  });

  it('should trim surrounding whitespace from the slotted text', async () => {
    const el = await createElement('   hi   ');

    await vi.advanceTimersByTimeAsync(1000);
    await el.updateComplete;

    expect(displayed(el)).toBe('hi');
  });

  it('should keep the slot and not animate when there is no text', async () => {
    const el = await createElement('   ');

    await vi.advanceTimersByTimeAsync(1000);
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector('.animated-text')).toBeNull();
    expect(el.shadowRoot!.querySelector('slot')).toBeTruthy();
  });
});
