import { describe, expect, it } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import { AiResponseMessageComponent, AiResponseMessageComponentTagName } from './ai-response-message.js';

const TAG = 'forge-ai-response-message';

describe('AiResponseMessageComponent', () => {
  it('should be registered under the forge-ai-response-message tag', async () => {
    const el = await renderFixture<AiResponseMessageComponent>(html`<forge-ai-response-message></forge-ai-response-message>`, TAG);

    expect(AiResponseMessageComponentTagName).toBe(TAG);
    expect(customElements.get(TAG)).toBe(AiResponseMessageComponent);
    expect(el).toBeInstanceOf(AiResponseMessageComponent);
  });

  it('should contain shadow root', async () => {
    const el = await renderFixture<AiResponseMessageComponent>(html`<forge-ai-response-message></forge-ai-response-message>`, TAG);

    expect(el.shadowRoot).toBeTruthy();
  });

  it('should project default slot content', async () => {
    const el = await renderFixture<AiResponseMessageComponent>(html`<forge-ai-response-message><p>Hello world</p></forge-ai-response-message>`, TAG);

    const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot')!;
    const assigned = slot.assignedElements();

    expect(assigned).toHaveLength(1);
    expect(assigned[0].textContent).toBe('Hello world');
  });

  it('should render with no slotted content', async () => {
    const el = await renderFixture<AiResponseMessageComponent>(html`<forge-ai-response-message></forge-ai-response-message>`, TAG);

    expect(el.shadowRoot!.querySelector<HTMLSlotElement>('slot')!.assignedNodes()).toHaveLength(0);
  });
});
