import { describe, expect, it } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../../testing/fixture.js';
import { RteToolButtonComponent } from '../core/rte-tool-button.js';

import '../core/rte-tool-button.js';

type IconButton = HTMLElement & { toggle: boolean; pressed: boolean };

describe('RTE Tool Button', () => {
  it('should render a toggle button by default', async () => {
    const { iconButton } = await createFixture(html`<forge-rte-tool-button label="Bold" active></forge-rte-tool-button>`);

    expect(iconButton.toggle).toBe(true);
    expect(iconButton.pressed).toBe(true);
  });

  it('should render an action button with no pressed state when no-toggle is set', async () => {
    const { iconButton } = await createFixture(html`<forge-rte-tool-button label="Undo" no-toggle active></forge-rte-tool-button>`);

    expect(iconButton.toggle).toBe(false);
    expect(iconButton.pressed).toBe(false);
  });

  it('should fire forge-rte-tool-toggle when clicked with no-toggle', async () => {
    const { el, iconButton } = await createFixture(html`<forge-rte-tool-button label="Undo" no-toggle></forge-rte-tool-button>`);
    const details: boolean[] = [];
    el.addEventListener('forge-rte-tool-toggle', evt => details.push(evt.detail));

    iconButton.click();

    expect(details).toEqual([false]);
  });

  it('should fire forge-rte-tool-toggle once per click in toggle mode', async () => {
    const { el, iconButton } = await createFixture(html`<forge-rte-tool-button label="Bold"></forge-rte-tool-button>`);
    const details: boolean[] = [];
    el.addEventListener('forge-rte-tool-toggle', evt => details.push(evt.detail));

    iconButton.click();
    // The icon button reports a toggle after its own async click handling, not synchronously.
    await new Promise(resolve => setTimeout(resolve));

    expect(details).toEqual([true]);
  });

  it('should move focus to its button when focused', async () => {
    const { el, iconButton } = await createFixture(html`<forge-rte-tool-button label="Bold"></forge-rte-tool-button>`);

    el.focus();

    expect(el.shadowRoot!.activeElement).toBe(iconButton);
  });
});

async function createFixture(template: ReturnType<typeof html>): Promise<{ el: RteToolButtonComponent; iconButton: IconButton }> {
  const el = await renderFixture<RteToolButtonComponent>(template, 'forge-rte-tool-button');
  await el.updateComplete;
  const iconButton = el.shadowRoot!.querySelector('forge-icon-button') as IconButton;
  return { el, iconButton };
}
