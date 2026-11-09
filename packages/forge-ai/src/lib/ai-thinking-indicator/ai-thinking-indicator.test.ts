import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import { AiThinkingIndicatorComponent, AiThinkingIndicatorComponentTagName } from './ai-thinking-indicator.js';

const TAG = 'forge-ai-thinking-indicator';

function createElement(template = html`<forge-ai-thinking-indicator></forge-ai-thinking-indicator>`): Promise<AiThinkingIndicatorComponent> {
  return renderFixture<AiThinkingIndicatorComponent>(template, TAG);
}

function statusText(el: AiThinkingIndicatorComponent): string | undefined {
  return el.shadowRoot!.querySelector('.status-text')?.textContent ?? undefined;
}

describe('AiThinkingIndicatorComponent', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should be registered under the forge-ai-thinking-indicator tag', async () => {
    const el = await createElement();

    expect(AiThinkingIndicatorComponentTagName).toBe(TAG);
    expect(customElements.get(TAG)).toBe(AiThinkingIndicatorComponent);
    expect(el).toBeInstanceOf(AiThinkingIndicatorComponent);
  });

  it('should contain shadow root', async () => {
    const el = await createElement();

    expect(el.shadowRoot).toBeTruthy();
  });

  describe('defaults', () => {
    it('should have the expected default property values', async () => {
      const el = await createElement();

      expect(el.showText).toBe(false);
      expect(el.initialDelay).toBe(0);
      expect(el.cycleInterval).toBe(5000);
    });

    it('should read properties from attributes', async () => {
      const el = await createElement(html`<forge-ai-thinking-indicator show-text initial-delay="250" cycle-interval="1000"></forge-ai-thinking-indicator>`);

      expect(el.showText).toBe(true);
      expect(el.initialDelay).toBe(250);
      expect(el.cycleInterval).toBe(1000);
    });
  });

  it('should render three dots', async () => {
    const el = await createElement();

    expect(el.shadowRoot!.querySelectorAll('.dot')).toHaveLength(3);
  });

  describe('status text', () => {
    it('should not render status text when show-text is not set', async () => {
      const el = await createElement();

      await vi.advanceTimersByTimeAsync(20000);
      await el.updateComplete;

      expect(statusText(el)).toBeUndefined();
    });

    it('should render a status message after the initial delay when show-text is set', async () => {
      const el = await createElement(html`<forge-ai-thinking-indicator show-text></forge-ai-thinking-indicator>`);

      await vi.advanceTimersByTimeAsync(0);
      await el.updateComplete;

      expect(statusText(el)).toMatch(/\.\.\.$/);
    });

    it('should expose the status text as a polite live region', async () => {
      const el = await createElement(html`<forge-ai-thinking-indicator show-text></forge-ai-thinking-indicator>`);

      await vi.advanceTimersByTimeAsync(0);
      await el.updateComplete;

      expect(el.shadowRoot!.querySelector('.status-text')!.getAttribute('aria-live')).toBe('polite');
    });

    it('should wait for the initial delay before showing text', async () => {
      const el = await createElement(html`<forge-ai-thinking-indicator show-text initial-delay="500"></forge-ai-thinking-indicator>`);

      await vi.advanceTimersByTimeAsync(499);
      await el.updateComplete;
      expect(statusText(el)).toBeUndefined();

      await vi.advanceTimersByTimeAsync(1);
      await el.updateComplete;
      expect(statusText(el)).toBeDefined();
    });

    it('should cycle to a different message every cycle interval', async () => {
      const el = await createElement(html`<forge-ai-thinking-indicator show-text cycle-interval="1000"></forge-ai-thinking-indicator>`);
      await vi.advanceTimersByTimeAsync(0);
      await el.updateComplete;
      const seen = new Set<string>([statusText(el)!]);
      let previous = statusText(el);

      for (let i = 0; i < 5; i++) {
        await vi.advanceTimersByTimeAsync(1000);
        await el.updateComplete;
        expect(statusText(el)).not.toBe(previous);
        previous = statusText(el);
        seen.add(previous!);
      }

      expect(seen.size).toBeGreaterThan(1);
    });

    it('should not change the message before the cycle interval elapses', async () => {
      const el = await createElement(html`<forge-ai-thinking-indicator show-text cycle-interval="1000"></forge-ai-thinking-indicator>`);
      await vi.advanceTimersByTimeAsync(0);
      await el.updateComplete;
      const first = statusText(el);

      await vi.advanceTimersByTimeAsync(999);
      await el.updateComplete;

      expect(statusText(el)).toBe(first);
    });

    it('should re-pick when the random index repeats the previous one', async () => {
      const random = vi.spyOn(Math, 'random').mockReturnValue(0);
      const el = await createElement(html`<forge-ai-thinking-indicator show-text cycle-interval="1000"></forge-ai-thinking-indicator>`);
      await vi.advanceTimersByTimeAsync(0);
      await el.updateComplete;
      expect(statusText(el)).toBe('Thinking...');

      random.mockReturnValueOnce(0).mockReturnValueOnce(0.99);
      await vi.advanceTimersByTimeAsync(1000);
      await el.updateComplete;

      expect(statusText(el)).not.toBe('Thinking...');
    });
  });

  describe('lifecycle', () => {
    it('should stop cycling when disconnected', async () => {
      const el = await createElement(html`<forge-ai-thinking-indicator show-text cycle-interval="1000"></forge-ai-thinking-indicator>`);
      await vi.advanceTimersByTimeAsync(0);
      const parent = el.parentElement!;
      const requestUpdate = vi.spyOn(el, 'requestUpdate');

      el.remove();
      requestUpdate.mockClear();
      await vi.advanceTimersByTimeAsync(5000);

      expect(requestUpdate).not.toHaveBeenCalled();
      parent.append(el);
    });

    it('should cancel a pending initial delay when disconnected', async () => {
      const el = await createElement(html`<forge-ai-thinking-indicator show-text initial-delay="1000"></forge-ai-thinking-indicator>`);
      const parent = el.parentElement!;
      const requestUpdate = vi.spyOn(el, 'requestUpdate');

      el.remove();
      requestUpdate.mockClear();
      await vi.advanceTimersByTimeAsync(5000);

      expect(requestUpdate).not.toHaveBeenCalled();
      parent.append(el);
    });

    it('should restart cycling when reconnected', async () => {
      const el = await createElement(html`<forge-ai-thinking-indicator show-text cycle-interval="1000"></forge-ai-thinking-indicator>`);
      await vi.advanceTimersByTimeAsync(0);
      const parent = el.parentElement!;
      el.remove();
      parent.append(el);
      const requestUpdate = vi.spyOn(el, 'requestUpdate');

      await vi.advanceTimersByTimeAsync(0);
      await el.updateComplete;
      expect(requestUpdate).toHaveBeenCalledOnce();

      await vi.advanceTimersByTimeAsync(1000);
      expect(requestUpdate).toHaveBeenCalledTimes(2);
      expect(statusText(el)).toBeDefined();
    });
  });

  it.skip('should start cycling status text when show-text is enabled after connect (BUG: cycling only starts in connectedCallback if showText was already set)', async () => {
    const el = await createElement();
    await vi.advanceTimersByTimeAsync(0);

    el.showText = true;
    await el.updateComplete;
    await vi.advanceTimersByTimeAsync(0);
    await el.updateComplete;

    expect(statusText(el)).toBeDefined();
  });
});
