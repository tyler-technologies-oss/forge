import { describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { html } from 'lit';
import { renderFixture } from '../../../testing/fixture.js';
import { PromptButtonComponent, PromptButtonComponentTagName } from '../index.js';

describe('PromptButtonComponent', () => {
  it('should be registered under the forge-ai- prefixed tag', async () => {
    const el = await renderFixture<PromptButtonComponent>(html`<forge-ai-prompt-button>Label</forge-ai-prompt-button>`, 'forge-ai-prompt-button');

    expect(PromptButtonComponentTagName).toBe('forge-ai-prompt-button');
    expect(customElements.get('forge-ai-prompt-button')).toBe(PromptButtonComponent);
    expect(customElements.get('forge-prompt-button')).toBeUndefined();
    expect(el.shadowRoot).toBeTruthy();
  });

  it('should default disabled to false and enable the inner button', async () => {
    const el = await renderFixture<PromptButtonComponent>(html`<forge-ai-prompt-button>Label</forge-ai-prompt-button>`, 'forge-ai-prompt-button');

    expect(el.disabled).toBe(false);
    expect(el.shadowRoot!.querySelector('button')!.disabled).toBe(false);
  });

  it('should disable the inner button when the disabled attribute is set', async () => {
    const el = await renderFixture<PromptButtonComponent>(html`<forge-ai-prompt-button disabled>Label</forge-ai-prompt-button>`, 'forge-ai-prompt-button');

    expect(el.disabled).toBe(true);
    expect(el.shadowRoot!.querySelector('button')!.disabled).toBe(true);
  });

  it('should reflect disabled to the attribute and update the inner button', async () => {
    const el = await renderFixture<PromptButtonComponent>(html`<forge-ai-prompt-button>Label</forge-ai-prompt-button>`, 'forge-ai-prompt-button');

    el.disabled = true;
    await el.updateComplete;
    expect(el.hasAttribute('disabled')).toBe(true);
    expect(el.shadowRoot!.querySelector('button')!.disabled).toBe(true);

    el.disabled = false;
    await el.updateComplete;
    expect(el.hasAttribute('disabled')).toBe(false);
    expect(el.shadowRoot!.querySelector('button')!.disabled).toBe(false);
  });

  it('should project default, leading, and trailing slot content', async () => {
    const el = await renderFixture<PromptButtonComponent>(
      html`<forge-ai-prompt-button><span slot="leading" id="l"></span>Label<span slot="trailing" id="t"></span></forge-ai-prompt-button>`,
      'forge-ai-prompt-button'
    );
    const root = el.shadowRoot!;

    expect(root.querySelector<HTMLSlotElement>('slot[name="leading"]')!.assignedElements()).toEqual([el.querySelector('#l')]);
    expect(root.querySelector<HTMLSlotElement>('slot[name="trailing"]')!.assignedElements()).toEqual([el.querySelector('#t')]);
    expect(root.querySelector<HTMLSlotElement>('slot:not([name])')!.assignedNodes()[0].textContent).toBe('Label');
  });

  it('should dispatch click events from the host when clicked', async () => {
    const el = await renderFixture<PromptButtonComponent>(html`<forge-ai-prompt-button>Label</forge-ai-prompt-button>`, 'forge-ai-prompt-button');
    const listener = vi.fn();
    el.addEventListener('click', listener);

    await userEvent.click(el);

    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('should not dispatch click events when disabled', async () => {
    const el = await renderFixture<PromptButtonComponent>(html`<forge-ai-prompt-button disabled>Label</forge-ai-prompt-button>`, 'forge-ai-prompt-button');
    const listener = vi.fn();
    el.addEventListener('click', listener);

    el.shadowRoot!.querySelector('button')!.click();

    expect(listener).not.toHaveBeenCalled();
  });
});
