import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import { AiCopyButtonComponent, AiCopyButtonComponentTagName } from './ai-copy-button.js';

const TAG = 'forge-ai-copy-button';

let writeText: ReturnType<typeof vi.fn>;

function createElement(template = html`<forge-ai-copy-button value="hello"></forge-ai-copy-button>`): Promise<AiCopyButtonComponent> {
  return renderFixture<AiCopyButtonComponent>(template, TAG);
}

function button(el: AiCopyButtonComponent): HTMLButtonElement {
  return el.shadowRoot!.querySelector<HTMLButtonElement>('button')!;
}

async function clickAndFlush(el: AiCopyButtonComponent): Promise<void> {
  button(el).click();
  await vi.advanceTimersByTimeAsync(0);
  await el.updateComplete;
}

describe('AiCopyButtonComponent', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    writeText = vi.fn().mockResolvedValue(undefined);
    vi.spyOn(navigator.clipboard, 'writeText').mockImplementation(writeText as unknown as typeof navigator.clipboard.writeText);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should be registered under the forge-ai-copy-button tag', async () => {
    const el = await createElement();

    expect(AiCopyButtonComponentTagName).toBe(TAG);
    expect(customElements.get(TAG)).toBe(AiCopyButtonComponent);
    expect(el).toBeInstanceOf(AiCopyButtonComponent);
  });

  it('should contain shadow root', async () => {
    const el = await createElement();

    expect(el.shadowRoot).toBeTruthy();
  });

  describe('properties', () => {
    it('should have the expected defaults', async () => {
      const el = await createElement(html`<forge-ai-copy-button></forge-ai-copy-button>`);

      expect(el.value).toBe('');
      expect(el.disabled).toBe(false);
    });

    it('should read value and disabled from attributes', async () => {
      const el = await createElement(html`<forge-ai-copy-button value="abc" disabled></forge-ai-copy-button>`);

      expect(el.value).toBe('abc');
      expect(el.disabled).toBe(true);
    });

    it('should toggle the disabled custom state when disabled changes', async () => {
      const el = await createElement();
      expect(el.matches(':state(disabled)')).toBe(false);

      el.disabled = true;
      await el.updateComplete;
      expect(el.matches(':state(disabled)')).toBe(true);

      el.disabled = false;
      await el.updateComplete;
      expect(el.matches(':state(disabled)')).toBe(false);
    });
  });

  describe('rendering and accessibility', () => {
    it('should render a button labelled Copy with a tooltip', async () => {
      const el = await createElement();

      expect(button(el).getAttribute('aria-label')).toBe('Copy');
      expect(el.shadowRoot!.querySelector('forge-ai-tooltip')!.textContent!.trim()).toBe('Copy');
    });

    it('should associate the tooltip with the button', async () => {
      const el = await createElement();

      expect(el.shadowRoot!.querySelector('forge-ai-tooltip')!.getAttribute('for')).toBe(button(el).id);
    });

    it('should hide the decorative icon from assistive technology', async () => {
      const el = await createElement();

      expect(el.shadowRoot!.querySelector('svg')!.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('copy', () => {
    it('should write the value to the clipboard on click', async () => {
      const el = await createElement();

      await clickAndFlush(el);

      expect(writeText).toHaveBeenCalledExactlyOnceWith('hello');
    });

    it('should show Copied! feedback after a successful copy', async () => {
      const el = await createElement();

      await clickAndFlush(el);

      expect(button(el).getAttribute('aria-label')).toBe('Copied!');
      expect(el.shadowRoot!.querySelector('forge-ai-tooltip')!.textContent!.trim()).toBe('Copied!');
    });

    it('should restore the Copy label after the timeout', async () => {
      const el = await createElement();
      await clickAndFlush(el);

      await vi.advanceTimersByTimeAsync(3000);
      await el.updateComplete;

      expect(button(el).getAttribute('aria-label')).toBe('Copy');
    });

    it('should keep the Copied! label until the timeout elapses', async () => {
      const el = await createElement();
      await clickAndFlush(el);

      await vi.advanceTimersByTimeAsync(2999);
      await el.updateComplete;

      expect(button(el).getAttribute('aria-label')).toBe('Copied!');
    });

    it('should ignore clicks while in the copied state', async () => {
      const el = await createElement();
      await clickAndFlush(el);

      await clickAndFlush(el);

      expect(writeText).toHaveBeenCalledOnce();
    });

    it('should allow copying again after the copied state resets', async () => {
      const el = await createElement();
      await clickAndFlush(el);
      await vi.advanceTimersByTimeAsync(3000);
      await el.updateComplete;

      await clickAndFlush(el);

      expect(writeText).toHaveBeenCalledTimes(2);
    });

    it('should not copy when the value is empty', async () => {
      const el = await createElement(html`<forge-ai-copy-button></forge-ai-copy-button>`);

      await clickAndFlush(el);

      expect(writeText).not.toHaveBeenCalled();
    });

    it('should not copy when disabled', async () => {
      const el = await createElement(html`<forge-ai-copy-button value="hello" disabled></forge-ai-copy-button>`);

      await clickAndFlush(el);

      expect(writeText).not.toHaveBeenCalled();
    });

    it('should copy the updated value after the property changes', async () => {
      const el = await createElement();
      el.value = 'changed';
      await el.updateComplete;

      await clickAndFlush(el);

      expect(writeText).toHaveBeenCalledWith('changed');
    });

    it('should log an error and stay in the Copy state when the clipboard write fails', async () => {
      writeText.mockRejectedValueOnce(new Error('denied'));
      const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);
      const el = await createElement();

      await clickAndFlush(el);

      expect(error).toHaveBeenCalledOnce();
      expect(button(el).getAttribute('aria-label')).toBe('Copy');
    });

    it('should clear the pending reset timer when disconnected', async () => {
      const el = await createElement();
      await clickAndFlush(el);
      const requestUpdate = vi.spyOn(el, 'requestUpdate');
      const parent = el.parentElement!;

      el.remove();
      requestUpdate.mockClear();
      await vi.advanceTimersByTimeAsync(5000);

      expect(requestUpdate).not.toHaveBeenCalled();
      parent.append(el);
    });
  });

  it('should expose the disabled state on the inner button', async () => {
    const el = await createElement(html`<forge-ai-copy-button value="hello" disabled></forge-ai-copy-button>`);

    const inner = button(el);

    expect(inner.disabled || inner.getAttribute('aria-disabled') === 'true').toBe(true);
  });

  it('should render the Copy label and icon after reconnecting during the Copied! window', async () => {
    const el = await createElement();
    await clickAndFlush(el);
    expect(button(el).getAttribute('aria-label')).toBe('Copied!');
    const parent = el.parentElement!;

    el.remove();
    parent.append(el);
    await el.updateComplete;

    expect(button(el).getAttribute('aria-label')).toBe('Copy');
    expect(el.shadowRoot!.querySelector('forge-ai-tooltip')!.textContent!.trim()).toBe('Copy');
    expect(el.shadowRoot!.querySelector('svg path')!.getAttribute('d')).toContain('M19 21H8V7h11');
  });

  it('should accept clicks again after disconnecting and reconnecting during the Copied! window', async () => {
    const el = await createElement();
    await clickAndFlush(el);
    const parent = el.parentElement!;

    el.remove();
    parent.append(el);
    await el.updateComplete;
    await clickAndFlush(el);

    expect(writeText).toHaveBeenCalledTimes(2);
  });
});
