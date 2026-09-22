import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { getShadowElement } from '@tylertech/forge-core';
import type { FooterItemComponent } from './footer-item.js';

import './footer-item.js';

describe('FooterItem', () => {
  it('should contain shadow root', async () => {
    const element = await createFixture();
    expect(element.shadowRoot).not.toBeNull();
  });

  it('should have role="listitem" attribute', async () => {
    const element = await createFixture();
    expect(element.getAttribute('role')).toBe('listitem');
  });

  it('should set role during connectedCallback', async () => {
    const el = document.createElement('forge-footer-item') as FooterItemComponent;
    expect(el.getAttribute('role')).toBeNull();

    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getAttribute('role')).toBe('listitem');
    el.remove();
  });

  it('should be accessible', async () => {
    const screen = render(html`
      <div role="list">
        <forge-footer-item><a href="#">Link</a></forge-footer-item>
      </div>
    `);
    const footerItem = screen.container.querySelector('forge-footer-item') as FooterItemComponent;
    await footerItem.updateComplete;
    await expect(footerItem).toBeAccessible();
  });

  it('should render slot for content', async () => {
    const element = await createFixture(html`<forge-footer-item><span>Test Content</span></forge-footer-item>`);
    expect(getShadowElement(element, 'slot')).toBeTruthy();
  });

  it('should render wrapper div with footer-item class', async () => {
    const element = await createFixture();
    const wrapper = getShadowElement(element, '.footer-item');
    expect(wrapper).toBeTruthy();
    expect(wrapper.tagName).toBe('DIV');
  });

  it('should display slotted content correctly', async () => {
    const element = await createFixture(html`<forge-footer-item><a href="#">Link Text</a></forge-footer-item>`);
    const slot = getShadowElement(element, 'slot') as HTMLSlotElement;
    const assigned = slot.assignedElements();
    expect(assigned).toHaveLength(1);
    expect(assigned[0].tagName).toBe('A');
  });

  it('should expose root part', async () => {
    const element = await createFixture();
    const root = element.shadowRoot!.querySelector('[part="root"]');
    expect(root).toBeTruthy();
    expect(root?.classList.contains('footer-item')).toBe(true);
  });
});

async function createFixture(template: ReturnType<typeof html> = html`<forge-footer-item></forge-footer-item>`): Promise<FooterItemComponent> {
  const screen = render(template);
  const element = screen.container.querySelector('forge-footer-item') as FooterItemComponent;
  await element.updateComplete;
  return element;
}
