import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { getShadowElement } from '@tylertech/forge-core';
import type { AppLauncherLinkComponent } from './app-launcher-link.js';

import './app-launcher-link.js';

describe('AppLauncherLink', () => {
  it('should contain shadow root', async () => {
    const element = await createFixture();
    expect(element.shadowRoot).not.toBeNull();
  });

  it('should render a list item with a leading icon', async () => {
    const element = await createFixture();
    expect(getShadowElement(element, 'forge-list-item')).toBeTruthy();
    expect(getShadowElement(element, 'forge-icon[name="open_in_new"]')).toBeTruthy();
  });

  it('should render slotted link content', async () => {
    const element = await createFixture(html`<forge-app-launcher-link><a href="#">Documentation</a></forge-app-launcher-link>`);
    const slot = getShadowElement(element, 'slot') as HTMLSlotElement;
    const assigned = slot.assignedElements();
    expect(assigned).toHaveLength(1);
    expect(assigned[0].tagName).toBe('A');
  });
});

async function createFixture(template: ReturnType<typeof html> = html`<forge-app-launcher-link></forge-app-launcher-link>`): Promise<AppLauncherLinkComponent> {
  const screen = render(template);
  const element = screen.container.querySelector('forge-app-launcher-link') as AppLauncherLinkComponent;
  await element.updateComplete;
  return element;
}
