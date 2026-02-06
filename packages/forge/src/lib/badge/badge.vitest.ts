import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import type { IBadgeComponent } from './badge';
import type { BadgeTheme } from './badge-constants';

import './badge';

describe('Badge', () => {
  it('should contain shadow root', async () => {
    const screen = render(html`<forge-badge>Test</forge-badge>`);
    const el = screen.container.querySelector('forge-badge') as IBadgeComponent;

    expect(el.shadowRoot).not.toBeNull();
  });

  it('should be accessible', async () => {
    const screen = render(html`<forge-badge>Test</forge-badge>`);
    const el = screen.container.querySelector('forge-badge') as IBadgeComponent;

    await expect(el).toBeAccessible();
  });

  it('should be accessible in all theme colors', async () => {
    const screen = render(html`<forge-badge>Test</forge-badge>`);
    const el = screen.container.querySelector('forge-badge') as IBadgeComponent;

    const themes: BadgeTheme[] = ['primary', 'secondary', 'tertiary', 'success', 'error', 'warning', 'info', 'info-secondary'];
    for (const theme of themes) {
      el.theme = theme;
      await el.updateComplete;
      await expect(el).toBeAccessible();
    }
  });

  it('should set theme attribute when theme property is set', async () => {
    const screen = render(html`<forge-badge></forge-badge>`);
    const el = screen.container.querySelector('forge-badge') as IBadgeComponent;
    el.theme = 'error';
    await el.updateComplete;

    expect(el.getAttribute('theme')).toBe('error');
  });

  it('should set theme property when theme attribute is set', async () => {
    const screen = render(html`<forge-badge theme="error"></forge-badge>`);
    const el = screen.container.querySelector('forge-badge') as IBadgeComponent;

    expect(el.theme).toBe('error');
  });

  it('should get default theme when no theme attribute is set', async () => {
    const screen = render(html`<forge-badge></forge-badge>`);
    const el = screen.container.querySelector('forge-badge') as IBadgeComponent;

    expect(el.theme).toBe('default');
  });

  it('should set dot attribute when dot property is set', async () => {
    const screen = render(html`<forge-badge></forge-badge>`);
    const el = screen.container.querySelector('forge-badge') as IBadgeComponent;
    el.dot = true;
    await el.updateComplete;

    expect(el.hasAttribute('dot')).toBe(true);
    expect(el.matches(':state(dot)')).toBe(true);
  });

  it('should set dot property when dot attribute is set', async () => {
    const screen = render(html`<forge-badge dot></forge-badge>`);
    const el = screen.container.querySelector('forge-badge') as IBadgeComponent;
    await el.updateComplete;

    expect(el.dot).toBe(true);
    expect(el.matches(':state(dot)')).toBe(true);
  });

  it('should set strong attribute when strong property is set', async () => {
    const screen = render(html`<forge-badge></forge-badge>`);
    const el = screen.container.querySelector('forge-badge') as IBadgeComponent;
    el.strong = true;
    await el.updateComplete;

    expect(el.hasAttribute('strong')).toBe(true);
    expect(el.matches(':state(strong)')).toBe(true);
  });

  it('should set strong property when strong attribute is set', async () => {
    const screen = render(html`<forge-badge strong></forge-badge>`);
    const el = screen.container.querySelector('forge-badge') as IBadgeComponent;
    await el.updateComplete;

    expect(el.strong).toBe(true);
    expect(el.matches(':state(strong)')).toBe(true);
  });

  it('should set hide attribute when hide property is set', async () => {
    const screen = render(html`<forge-badge></forge-badge>`);
    const el = screen.container.querySelector('forge-badge') as IBadgeComponent;
    el.hide = true;
    await el.updateComplete;

    expect(el.hasAttribute('hide')).toBe(true);
    expect(el.matches(':state(hide)')).toBe(true);
  });

  it('should set hide property when hide attribute is set', async () => {
    const screen = render(html`<forge-badge hide></forge-badge>`);
    const el = screen.container.querySelector('forge-badge') as IBadgeComponent;
    await el.updateComplete;

    expect(el.hide).toBe(true);
    expect(el.matches(':state(hide)')).toBe(true);
  });

  it('should set transform when hide attribute is set', async () => {
    const screen = render(html`<forge-badge hide></forge-badge>`);
    const el = screen.container.querySelector('forge-badge') as IBadgeComponent;
    await el.updateComplete;
    const rootEl = el.shadowRoot?.querySelector('.forge-badge') as HTMLElement;

    expect(getComputedStyle(rootEl).transform).toBe('matrix(0, 0, 0, 0, 0, 0)');
  });
});
