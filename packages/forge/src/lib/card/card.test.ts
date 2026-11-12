import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import type { ICardComponent } from './card.js';

import './card.js';
import '../toolbar/toolbar.js';

const RING_TEST_COLOR = 'rgb(1, 2, 3)';

describe('Card', () => {
  it('should instantiate component with shadow dom', async () => {
    const screen = render(html`<forge-card></forge-card>`);
    const el = screen.container.querySelector('forge-card') as ICardComponent;

    expect(el.shadowRoot).not.toBeNull();
  });

  it('should be accessible', async () => {
    const screen = render(html`<forge-card></forge-card>`);
    const el = screen.container.querySelector('forge-card') as ICardComponent;

    await expect(el).toBeAccessible();
  });

  it('should be outlined by default', async () => {
    const screen = render(html`<forge-card></forge-card>`);
    const el = screen.container.querySelector('forge-card') as ICardComponent;

    expect(el.raised).toBe(false);
    expect(el.hasAttribute('raised')).toBe(false);
    expect(el.matches(':state(raised)')).toBe(false);
  });

  it('should draw a hairline ring when raised', async () => {
    const screen = render(html`<forge-card raised style="--forge-card-raised-outline-color: ${RING_TEST_COLOR}"></forge-card>`);
    const el = screen.container.querySelector('forge-card') as ICardComponent;
    await el.updateComplete;
    const rootEl = el.shadowRoot?.querySelector('.forge-card') as HTMLElement;

    expect(getComputedStyle(rootEl).borderTopColor).toBe(RING_TEST_COLOR);
  });

  it('should not draw a hairline ring when not raised', async () => {
    const screen = render(html`<forge-card style="--forge-card-raised-outline-color: ${RING_TEST_COLOR}"></forge-card>`);
    const el = screen.container.querySelector('forge-card') as ICardComponent;
    await el.updateComplete;
    const rootEl = el.shadowRoot?.querySelector('.forge-card') as HTMLElement;

    expect(getComputedStyle(rootEl).borderTopColor).not.toBe(RING_TEST_COLOR);
  });

  it('should keep the same size when raised', async () => {
    const screen = render(html`<forge-card style="width: 120px">Some card content that wraps across lines</forge-card>`);
    const el = screen.container.querySelector('forge-card') as ICardComponent;
    await el.updateComplete;
    const { width, height } = el.getBoundingClientRect();

    el.raised = true;
    await el.updateComplete;
    const raisedRect = el.getBoundingClientRect();

    expect(raisedRect.width).toBe(width);
    expect(raisedRect.height).toBe(height);
  });

  it('should make slotted toolbars transparent', async () => {
    const screen = render(html`<forge-card><forge-toolbar></forge-toolbar></forge-card>`);
    const toolbar = screen.container.querySelector('forge-toolbar') as HTMLElement;
    await (toolbar as HTMLElement & { updateComplete: Promise<boolean> }).updateComplete;
    const toolbarRoot = toolbar.shadowRoot?.querySelector('.forge-toolbar') as HTMLElement;

    expect(getComputedStyle(toolbarRoot).backgroundColor).toBe('rgba(0, 0, 0, 0)');
  });

  it('should have padding by default', async () => {
    const screen = render(html`<forge-card></forge-card>`);
    const el = screen.container.querySelector('forge-card') as ICardComponent;
    await el.updateComplete;
    const rootEl = el.shadowRoot?.querySelector('.forge-card') as HTMLElement;

    expect(getComputedStyle(rootEl).padding).toBe('16px');
  });

  it('should set raised', async () => {
    const screen = render(html`<forge-card></forge-card>`);
    const el = screen.container.querySelector('forge-card') as ICardComponent;

    el.raised = true;
    await el.updateComplete;

    expect(el.raised).toBe(true);
    expect(el.hasAttribute('raised')).toBe(true);
    expect(el.matches(':state(raised)')).toBe(true);
  });

  it('should set raised by default via attribute', async () => {
    const screen = render(html`<forge-card raised></forge-card>`);
    const el = screen.container.querySelector('forge-card') as ICardComponent;
    await el.updateComplete;

    expect(el.raised).toBe(true);
    expect(el.hasAttribute('raised')).toBe(true);
    expect(el.matches(':state(raised)')).toBe(true);
  });

  it('should unset raised', async () => {
    const screen = render(html`<forge-card raised></forge-card>`);
    const el = screen.container.querySelector('forge-card') as ICardComponent;
    await el.updateComplete;

    expect(el.raised).toBe(true);

    el.raised = false;
    await el.updateComplete;

    expect(el.raised).toBe(false);
    expect(el.hasAttribute('raised')).toBe(false);
    expect(el.matches(':state(raised)')).toBe(false);
  });

  it('should project content into default slot', async () => {
    const screen = render(html`<forge-card><div>some content</div></forge-card>`);
    const el = screen.container.querySelector('forge-card') as ICardComponent;
    await el.updateComplete;
    const defaultSlot = el.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement;
    const nodes = defaultSlot.assignedNodes();

    expect(nodes.length).toBe(1);
    expect(nodes[0].textContent).toBe('some content');
  });

  it('should set padding via CSS variable', async () => {
    const screen = render(html`<forge-card></forge-card>`);
    const el = screen.container.querySelector('forge-card') as ICardComponent;
    await el.updateComplete;
    const rootEl = el.shadowRoot?.querySelector('.forge-card') as HTMLElement;

    expect(getComputedStyle(rootEl).padding).toBe('16px');

    el.style.setProperty('--forge-card-padding', '8px');

    expect(getComputedStyle(rootEl).padding).toBe('8px');
  });

  it('should remove padding when no-padding attribute is applied', async () => {
    const screen = render(html`<forge-card no-padding></forge-card>`);
    const el = screen.container.querySelector('forge-card') as ICardComponent;
    await el.updateComplete;
    const rootEl = el.shadowRoot?.querySelector('.forge-card') as HTMLElement;

    expect(getComputedStyle(rootEl).padding).toBe('0px');
  });
});
