import { describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { renderFixture } from '../../testing/fixture.js';
import type { AiDisclaimerComponent } from './ai-disclaimer.js';

import './ai-disclaimer.js';

function buttons(el: AiDisclaimerComponent): { agree: HTMLButtonElement; disagree: HTMLButtonElement } {
  return {
    agree: el.shadowRoot!.querySelector<HTMLButtonElement>('.agree-button')!,
    disagree: el.shadowRoot!.querySelector<HTMLButtonElement>('.disagree-button')!
  };
}

describe('AiDisclaimerComponent', () => {
  it('should register the custom element and render a shadow root', async () => {
    const el = await renderFixture<AiDisclaimerComponent>(html`<forge-ai-disclaimer></forge-ai-disclaimer>`, 'forge-ai-disclaimer');

    expect(customElements.get('forge-ai-disclaimer')).toBeDefined();
    expect(el.shadowRoot).toBeTruthy();
  });

  it('should show default Agree and Disagree labels', async () => {
    const el = await renderFixture<AiDisclaimerComponent>(html`<forge-ai-disclaimer></forge-ai-disclaimer>`, 'forge-ai-disclaimer');

    const { agree, disagree } = buttons(el);
    expect(agree.textContent!.trim()).toBe('Agree');
    expect(disagree.textContent!.trim()).toBe('Disagree');
  });

  it('should replace button labels with slotted text', async () => {
    const el = await renderFixture<AiDisclaimerComponent>(
      html`<forge-ai-disclaimer><span slot="agree-button-text">Accept</span><span slot="disagree-button-text">Decline</span></forge-ai-disclaimer>`,
      'forge-ai-disclaimer'
    );

    const agreeSlot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="agree-button-text"]')!;
    const disagreeSlot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="disagree-button-text"]')!;
    expect(agreeSlot.assignedElements()[0].textContent).toBe('Accept');
    expect(disagreeSlot.assignedElements()[0].textContent).toBe('Decline');
  });

  it('should project default and icon slot content', async () => {
    const el = await renderFixture<AiDisclaimerComponent>(
      html`<forge-ai-disclaimer
        ><svg slot="icon"></svg>
        <p id="body">Terms</p></forge-ai-disclaimer
      >`,
      'forge-ai-disclaimer'
    );

    expect(el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="icon"]')!.assignedElements()).toEqual([el.querySelector('svg')]);
    expect(el.shadowRoot!.querySelector<HTMLSlotElement>('slot:not([name])')!.assignedElements()).toEqual([el.querySelector('#body')]);
  });

  it('should dispatch forge-ai-disclaimer-agree when Agree is clicked', async () => {
    const el = await renderFixture<AiDisclaimerComponent>(html`<forge-ai-disclaimer></forge-ai-disclaimer>`, 'forge-ai-disclaimer');
    const agree = vi.fn<(evt: CustomEvent<void>) => void>();
    const disagree = vi.fn();
    el.addEventListener('forge-ai-disclaimer-agree', agree);
    el.addEventListener('forge-ai-disclaimer-disagree', disagree);

    await userEvent.click(buttons(el).agree);

    expect(agree).toHaveBeenCalledOnce();
    expect(disagree).not.toHaveBeenCalled();
    expect(agree.mock.calls[0][0].bubbles).toBe(true);
    expect(agree.mock.calls[0][0].composed).toBe(true);
  });

  it('should dispatch forge-ai-disclaimer-disagree when Disagree is clicked', async () => {
    const el = await renderFixture<AiDisclaimerComponent>(html`<forge-ai-disclaimer></forge-ai-disclaimer>`, 'forge-ai-disclaimer');
    const agree = vi.fn();
    const disagree = vi.fn<(evt: CustomEvent<void>) => void>();
    el.addEventListener('forge-ai-disclaimer-agree', agree);
    el.addEventListener('forge-ai-disclaimer-disagree', disagree);

    await userEvent.click(buttons(el).disagree);

    expect(disagree).toHaveBeenCalledOnce();
    expect(agree).not.toHaveBeenCalled();
    expect(disagree.mock.calls[0][0].bubbles).toBe(true);
    expect(disagree.mock.calls[0][0].composed).toBe(true);
  });

  it('should bubble the agree event to ancestors', async () => {
    const el = await renderFixture<AiDisclaimerComponent>(html`<forge-ai-disclaimer></forge-ai-disclaimer>`, 'forge-ai-disclaimer');
    const onDocument = vi.fn();
    document.addEventListener('forge-ai-disclaimer-agree', onDocument);

    buttons(el).agree.click();

    document.removeEventListener('forge-ai-disclaimer-agree', onDocument);
    expect(onDocument).toHaveBeenCalledOnce();
  });

  it('should activate Agree from the keyboard', async () => {
    const el = await renderFixture<AiDisclaimerComponent>(html`<forge-ai-disclaimer></forge-ai-disclaimer>`, 'forge-ai-disclaimer');
    const agree = vi.fn();
    el.addEventListener('forge-ai-disclaimer-agree', agree);

    buttons(el).agree.focus();
    await userEvent.keyboard('{Enter}');

    expect(agree).toHaveBeenCalledOnce();
  });
});
