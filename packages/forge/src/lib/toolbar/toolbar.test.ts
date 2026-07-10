import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { TOOLBAR_CONSTANTS } from './toolbar-constants.js';

import './toolbar.js';

describe('Toolbar', () => {
  it('should initialize', async () => {
    const screen = render(html`<forge-toolbar></forge-toolbar>`);
    const el = screen.container.querySelector('forge-toolbar')!;

    expect(el.shadowRoot).not.toBeNull();
  });

  it('should should be accessible', async () => {
    const screen = render(html`<forge-toolbar></forge-toolbar>`);
    const el = screen.container.querySelector('forge-toolbar')!;

    await expect(el).toBeAccessible();
  });

  it('should update the inverted attribute when the property is set ', async () => {
    const screen = render(html`<forge-toolbar></forge-toolbar>`);
    const el = screen.container.querySelector('forge-toolbar')!;
    el.inverted = true;
    await el.updateComplete;

    expect(el.hasAttribute(TOOLBAR_CONSTANTS.attributes.INVERTED)).toBe(true);
  });

  it('content should project into the before start slot', async () => {
    const screen = render(html`<forge-toolbar><div slot="before-start">text content</div></forge-toolbar>`);
    const el = screen.container.querySelector('forge-toolbar')!;
    await el.updateComplete;
    const beforeStartSlot = el.shadowRoot!.querySelector('slot[name=before-start]') as HTMLSlotElement;

    expect(beforeStartSlot.assignedNodes().length).toBe(1);
  });

  it('content should project into the start slot', async () => {
    const screen = render(html`<forge-toolbar><div slot="start">text content</div></forge-toolbar>`);
    const el = screen.container.querySelector('forge-toolbar')!;
    await el.updateComplete;
    const startSlot = el.shadowRoot!.querySelector('slot[name=start]') as HTMLSlotElement;

    expect(startSlot.assignedNodes().length).toBe(1);
  });

  it('content should project into the center slot', async () => {
    const screen = render(html`<forge-toolbar><div slot="center">text content</div></forge-toolbar>`);
    const el = screen.container.querySelector('forge-toolbar')!;
    await el.updateComplete;
    const centerSlot = el.shadowRoot!.querySelector('slot[name=center]') as HTMLSlotElement;

    expect(centerSlot.assignedNodes().length).toBe(1);
  });

  it('content should project into the end slot', async () => {
    const screen = render(html`<forge-toolbar><div slot="end">text content</div></forge-toolbar>`);
    const el = screen.container.querySelector('forge-toolbar')!;
    await el.updateComplete;
    const endSlot = el.shadowRoot!.querySelector('slot[name=end]') as HTMLSlotElement;

    expect(endSlot.assignedNodes().length).toBe(1);
  });

  it('content should project into the after-end slot', async () => {
    const screen = render(html`<forge-toolbar><div slot="after-end">text content</div></forge-toolbar>`);
    const el = screen.container.querySelector('forge-toolbar')!;
    await el.updateComplete;
    const afterEndSlot = el.shadowRoot!.querySelector('slot[name=after-end]') as HTMLSlotElement;

    expect(afterEndSlot.assignedNodes().length).toBe(1);
  });

  it('should set default inverted property when no attributes are applied', async () => {
    const screen = render(html`<forge-toolbar></forge-toolbar>`);
    const el = screen.container.querySelector('forge-toolbar')!;

    expect(el.inverted).toBe(false);
  });
});
