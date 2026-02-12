import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import type { IOpenIconComponent } from './open-icon.js';
import { OPEN_ICON_CONSTANTS } from './open-icon-constants.js';

import './open-icon.js';

describe('Open icon', () => {
  it('should use shadow DOM', async () => {
    const screen = render(html`<forge-open-icon></forge-open-icon>`);
    const el = screen.container.querySelector('forge-open-icon') as IOpenIconComponent;

    expect(el.shadowRoot).not.toBeNull();
  });

  it('should be accessible', async () => {
    const screen = render(html`<forge-open-icon></forge-open-icon>`);
    const el = screen.container.querySelector('forge-open-icon') as IOpenIconComponent;

    await expect(el).toBeAccessible();
  });

  it('should have correct default values', async () => {
    const screen = render(html`<forge-open-icon></forge-open-icon>`);
    const el = screen.container.querySelector('forge-open-icon') as IOpenIconComponent;

    expect(el.orientation).toBe('vertical');
    expect(el.open).toBe(false);
  });

  describe('open', () => {
    it('should set open attribute when property is set', async () => {
      const screen = render(html`<forge-open-icon></forge-open-icon>`);
      const el = screen.container.querySelector('forge-open-icon') as IOpenIconComponent;

      el.open = true;

      expect(el.open).toBe(true);
      expect(el.hasAttribute(OPEN_ICON_CONSTANTS.attributes.OPEN)).toBe(true);
    });

    it('should set open when attribute is set by default', async () => {
      const screen = render(html`<forge-open-icon open></forge-open-icon>`);
      const el = screen.container.querySelector('forge-open-icon') as IOpenIconComponent;

      expect(el.open).toBe(true);
      expect(el.hasAttribute(OPEN_ICON_CONSTANTS.attributes.OPEN)).toBe(true);
    });

    it('should set open when attribute is set dynamically', async () => {
      const screen = render(html`<forge-open-icon></forge-open-icon>`);
      const el = screen.container.querySelector('forge-open-icon') as IOpenIconComponent;

      el.setAttribute(OPEN_ICON_CONSTANTS.attributes.OPEN, '');

      expect(el.open).toBe(true);
      expect(el.hasAttribute(OPEN_ICON_CONSTANTS.attributes.OPEN)).toBe(true);
    });

    it('should not be open when open attribute is removed', async () => {
      const screen = render(html`<forge-open-icon open></forge-open-icon>`);
      const el = screen.container.querySelector('forge-open-icon') as IOpenIconComponent;

      expect(el.open).toBe(true);
      expect(el.hasAttribute(OPEN_ICON_CONSTANTS.attributes.OPEN)).toBe(true);

      el.removeAttribute(OPEN_ICON_CONSTANTS.attributes.OPEN);

      expect(el.open).toBe(false);
      expect(el.hasAttribute(OPEN_ICON_CONSTANTS.attributes.OPEN)).toBe(false);
    });

    it('should toggle open attribute when open property is toggled', async () => {
      const screen = render(html`<forge-open-icon></forge-open-icon>`);
      const el = screen.container.querySelector('forge-open-icon') as IOpenIconComponent;

      expect(el.open).toBe(false);
      expect(el.hasAttribute(OPEN_ICON_CONSTANTS.attributes.OPEN)).toBe(false);

      el.open = true;

      expect(el.open).toBe(true);
      expect(el.hasAttribute(OPEN_ICON_CONSTANTS.attributes.OPEN)).toBe(true);

      el.open = false;

      expect(el.open).toBe(false);
      expect(el.hasAttribute(OPEN_ICON_CONSTANTS.attributes.OPEN)).toBe(false);
    });
  });

  describe('orientation', () => {
    it('should set orientation attribute when property is set', async () => {
      const screen = render(html`<forge-open-icon></forge-open-icon>`);
      const el = screen.container.querySelector('forge-open-icon') as IOpenIconComponent;

      el.orientation = 'horizontal';

      expect(el.orientation).toBe('horizontal');
      expect(el.getAttribute(OPEN_ICON_CONSTANTS.attributes.ORIENTATION)).toBe('horizontal');
    });

    it('should set orientation when attribute is set by default', async () => {
      const screen = render(html`<forge-open-icon orientation="horizontal"></forge-open-icon>`);
      const el = screen.container.querySelector('forge-open-icon') as IOpenIconComponent;

      expect(el.orientation).toBe('horizontal');
      expect(el.getAttribute(OPEN_ICON_CONSTANTS.attributes.ORIENTATION)).toBe('horizontal');
    });

    it('should set orientation when attribute is set dynamically', async () => {
      const screen = render(html`<forge-open-icon></forge-open-icon>`);
      const el = screen.container.querySelector('forge-open-icon') as IOpenIconComponent;

      el.setAttribute(OPEN_ICON_CONSTANTS.attributes.ORIENTATION, 'horizontal');

      expect(el.orientation).toBe('horizontal');
      expect(el.getAttribute(OPEN_ICON_CONSTANTS.attributes.ORIENTATION)).toBe('horizontal');
    });
  });

  describe('rotation', () => {
    it('should set rotation attribute when property is set', async () => {
      const screen = render(html`<forge-open-icon></forge-open-icon>`);
      const el = screen.container.querySelector('forge-open-icon') as IOpenIconComponent;

      el.rotation = 'half';

      expect(el.rotation).toBe('half');
      expect(el.getAttribute(OPEN_ICON_CONSTANTS.attributes.ROTATION)).toBe('half');
    });

    it('should set rotation when attribute is set by default', async () => {
      const screen = render(html`<forge-open-icon rotation="half"></forge-open-icon>`);
      const el = screen.container.querySelector('forge-open-icon') as IOpenIconComponent;

      expect(el.rotation).toBe('half');
      expect(el.getAttribute(OPEN_ICON_CONSTANTS.attributes.ROTATION)).toBe('half');
    });

    it('should set rotation when attribute is set dynamically', async () => {
      const screen = render(html`<forge-open-icon></forge-open-icon>`);
      const el = screen.container.querySelector('forge-open-icon') as IOpenIconComponent;

      el.setAttribute(OPEN_ICON_CONSTANTS.attributes.ROTATION, 'half');

      expect(el.rotation).toBe('half');
      expect(el.getAttribute(OPEN_ICON_CONSTANTS.attributes.ROTATION)).toBe('half');
    });
  });
});
