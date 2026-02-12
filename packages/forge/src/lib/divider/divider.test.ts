import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import type { IDividerComponent } from './divider.js';
import { DIVIDER_CONSTANTS } from './divider-constants.js';

import './divider.js';

describe('Divider', () => {
  it('should initialize', async () => {
    const screen = render(html`<forge-divider></forge-divider>`);
    const el = screen.container.querySelector('forge-divider') as IDividerComponent;
    expect(el.shadowRoot).not.toBeNull();
  });

  it('should should be accessible', async () => {
    const screen = render(html`<forge-divider></forge-divider>`);
    const el = screen.container.querySelector('forge-divider') as IDividerComponent;
    await expect(el).toBeAccessible();
  });

  it('should set vertical property when setting vertical attribute', async () => {
    const screen = render(html`<forge-divider></forge-divider>`);
    const el = screen.container.querySelector('forge-divider') as IDividerComponent;
    expect(el.vertical).toBe(false);
    el.setAttribute(DIVIDER_CONSTANTS.attributes.VERTICAL, '');
    expect(el.vertical).toBe(true);
  });

  it('should set vertical property when removing vertical attribute', async () => {
    const screen = render(html`<forge-divider vertical></forge-divider>`);
    const el = screen.container.querySelector('forge-divider') as IDividerComponent;
    expect(el.vertical).toBe(true);
    el.removeAttribute(DIVIDER_CONSTANTS.attributes.VERTICAL);
    expect(el.vertical).toBe(false);
  });

  it('should set vertical attribute when setting vertical property', async () => {
    const screen = render(html`<forge-divider></forge-divider>`);
    const el = screen.container.querySelector('forge-divider') as IDividerComponent;
    expect(el.hasAttribute(DIVIDER_CONSTANTS.attributes.VERTICAL)).toBe(false);
    el.vertical = true;
    expect(el.hasAttribute(DIVIDER_CONSTANTS.attributes.VERTICAL)).toBe(true);
  });
});
