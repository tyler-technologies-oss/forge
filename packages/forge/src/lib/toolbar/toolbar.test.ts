import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { TOOLBAR_CONSTANTS } from './toolbar-constants.js';

import './toolbar.js';

const TRANSPARENT = 'rgba(0, 0, 0, 0)';

const getRootElement = (el: HTMLElement): HTMLElement => el.shadowRoot!.querySelector('.forge-toolbar') as HTMLElement;

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

  it('should not apply a backdrop filter by default', async () => {
    const screen = render(html`<forge-toolbar></forge-toolbar>`);
    const el = screen.container.querySelector('forge-toolbar')!;
    await el.updateComplete;

    expect(getComputedStyle(getRootElement(el)).backdropFilter).toBe('none');
  });

  it('should apply the backdrop filter when the token is set', async () => {
    const screen = render(html`<forge-toolbar style="--forge-toolbar-backdrop-filter: blur(4px)"></forge-toolbar>`);
    const el = screen.container.querySelector('forge-toolbar')!;
    await el.updateComplete;

    expect(getComputedStyle(getRootElement(el)).backdropFilter).toBe('blur(4px)');
  });

  it('should have an opaque background by default', async () => {
    const screen = render(html`<forge-toolbar></forge-toolbar>`);
    const el = screen.container.querySelector('forge-toolbar')!;
    await el.updateComplete;

    expect(getComputedStyle(getRootElement(el)).backgroundColor).not.toBe(TRANSPARENT);
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
