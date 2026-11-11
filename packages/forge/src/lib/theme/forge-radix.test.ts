import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import forgeRadixStyles from '../forge-radix.scss?inline';
import type { IconButtonComponent } from '../icon-button/icon-button.js';

import '../icon-button/icon-button.js';
import '../badge/badge.js';
import '../banner/banner.js';
import '../inline-message/inline-message.js';

describe('Radix theme', () => {
  let style: HTMLStyleElement;

  beforeAll(() => {
    style = document.createElement('style');
    style.textContent = forgeRadixStyles;
    document.head.append(style);
  });

  afterAll(() => {
    style.remove();
  });

  describe('outlined icon button', () => {
    it('should use medium emphasis text for the icon color', async () => {
      const iconButton = await createIconButton('<forge-icon-button variant="outlined"></forge-icon-button>');
      expect(getIconColor(iconButton)).toBe(getThemeColor('text-medium'));
    });

    it('should use the theme container color for the icon color when themed', async () => {
      const iconButton = await createIconButton('<forge-icon-button variant="outlined" theme="error"></forge-icon-button>');
      expect(getIconColor(iconButton)).toBe(getThemeColor('on-error-container-minimum'));
    });

    it('should not change the icon color of the filled variant', async () => {
      const iconButton = await createIconButton('<forge-icon-button variant="filled"></forge-icon-button>');
      expect(getIconColor(iconButton)).not.toBe(getThemeColor('text-medium'));
    });

    it('should not change the icon color when disabled', async () => {
      const iconButton = await createIconButton('<forge-icon-button variant="outlined" disabled></forge-icon-button>');
      expect(getIconColor(iconButton)).not.toBe(getThemeColor('text-medium'));
    });

    it('should not change the icon color when toggled on', async () => {
      const iconButton = await createIconButton('<forge-icon-button variant="outlined" toggle></forge-icon-button>');
      iconButton.on = true;
      await iconButton.updateComplete;
      expect(getIconColor(iconButton)).not.toBe(getThemeColor('text-medium'));
    });
  });
});

describe('Radix legacy themes', () => {
  let style: HTMLStyleElement;

  beforeAll(() => {
    style = document.createElement('style');
    style.textContent = forgeRadixStyles;
    document.head.append(style);
  });

  afterAll(() => {
    style.remove();
  });

  describe('badge', () => {
    it('should render the neutral colors when unthemed', async () => {
      const badge = await createElement('<forge-badge>1</forge-badge>');
      expect(getInnerStyle(badge, '.forge-badge').backgroundColor).toBe(getThemeColor('bg-neutral-default'));
      expect(getInnerStyle(badge, '.forge-badge').color).toBe(getThemeColor('text-medium'));
    });

    for (const theme of ['primary', 'secondary', 'tertiary', 'info-secondary']) {
      it(`should render the neutral colors when the theme is ${theme}`, async () => {
        const badge = await createElement(`<forge-badge theme="${theme}">1</forge-badge>`);
        expect(getInnerStyle(badge, '.forge-badge').backgroundColor).toBe(getThemeColor('bg-neutral-default'));
      });
    }

    for (const [theme, role] of [
      ['info', 'info'],
      ['info-primary', 'info'],
      ['success', 'success'],
      ['warning', 'warning'],
      ['error', 'error'],
      ['danger', 'error']
    ]) {
      it(`should render the ${role} colors when the theme is ${theme}`, async () => {
        const badge = await createElement(`<forge-badge theme="${theme}">1</forge-badge>`);
        expect(getInnerStyle(badge, '.forge-badge').backgroundColor).toBe(getThemeColor(`bg-${role}-default`));
        expect(getInnerStyle(badge, '.forge-badge').color).toBe(getThemeColor(`on-${role}-container-low`));
      });
    }

    it('should keep the strong colors when the badge is strong', async () => {
      const badge = await createElement('<forge-badge strong theme="success">1</forge-badge>');
      expect(getInnerStyle(badge, '.forge-badge').backgroundColor).toBe(getThemeColor('success'));
      expect(getInnerStyle(badge, '.forge-badge').color).toBe(getThemeColor('on-success'));
    });

    it('should keep the strong colors when the badge is strong and unthemed', async () => {
      const badge = await createElement('<forge-badge strong>1</forge-badge>');
      expect(getInnerStyle(badge, '.forge-badge').backgroundColor).toBe(getThemeColor('secondary'));
    });
  });

  describe('banner', () => {
    it('should render the info colors when unthemed', async () => {
      const banner = await createElement('<forge-banner>Message</forge-banner>');
      expect(getInnerStyle(banner, '.forge-banner').backgroundColor).toBe(getThemeColor('bg-info-default'));
      expect(getInnerStyle(banner, '.forge-banner').color).toBe(getThemeColor('on-info-container-low'));
    });

    it('should render the info colors when the theme is info', async () => {
      const banner = await createElement('<forge-banner theme="info">Message</forge-banner>');
      expect(getInnerStyle(banner, '.forge-banner').backgroundColor).toBe(getThemeColor('bg-info-default'));
    });

    for (const theme of ['primary', 'secondary', 'tertiary', 'info-secondary']) {
      it(`should render the neutral colors when the theme is ${theme}`, async () => {
        const banner = await createElement(`<forge-banner theme="${theme}">Message</forge-banner>`);
        expect(getInnerStyle(banner, '.forge-banner').backgroundColor).toBe(getThemeColor('bg-neutral-default'));
        expect(getInnerStyle(banner, '.forge-banner').color).toBe(getThemeColor('text-high'));
      });
    }

    for (const [theme, role] of [
      ['success', 'success'],
      ['warning', 'warning'],
      ['error', 'error'],
      ['danger', 'error']
    ]) {
      it(`should render the ${role} colors when the theme is ${theme}`, async () => {
        const banner = await createElement(`<forge-banner theme="${theme}">Message</forge-banner>`);
        expect(getInnerStyle(banner, '.forge-banner').backgroundColor).toBe(getThemeColor(`bg-${role}-default`));
        expect(getInnerStyle(banner, '.forge-banner').color).toBe(getThemeColor(`on-${role}-container-low`));
      });
    }
  });

  describe('inline message', () => {
    it('should render the info colors when unthemed', async () => {
      const message = await createElement('<forge-inline-message>Message</forge-inline-message>');
      expect(getInnerStyle(message, '.forge-inline-message').backgroundColor).toBe(getThemeColor('bg-info-default'));
    });

    it('should render the info colors when the theme is info', async () => {
      const message = await createElement('<forge-inline-message theme="info">Message</forge-inline-message>');
      expect(getInnerStyle(message, '.forge-inline-message').backgroundColor).toBe(getThemeColor('bg-info-default'));
    });

    for (const theme of ['primary', 'secondary', 'tertiary', 'info-secondary']) {
      it(`should render the neutral colors when the theme is ${theme}`, async () => {
        const message = await createElement(`<forge-inline-message theme="${theme}">Message</forge-inline-message>`);
        expect(getInnerStyle(message, '.forge-inline-message').backgroundColor).toBe(getThemeColor('bg-neutral-default'));
      });
    }

    for (const [theme, role] of [
      ['success', 'success'],
      ['warning', 'warning'],
      ['error', 'error'],
      ['danger', 'error']
    ]) {
      it(`should render the ${role} colors when the theme is ${theme}`, async () => {
        const message = await createElement(`<forge-inline-message theme="${theme}">Message</forge-inline-message>`);
        expect(getInnerStyle(message, '.forge-inline-message').backgroundColor).toBe(getThemeColor(`bg-${role}-default`));
      });
    }
  });
});

async function createElement(markup: string): Promise<HTMLElement> {
  const container = document.createElement('div');
  container.innerHTML = markup;
  render(html`${container}`);
  const element = container.firstElementChild as HTMLElement & { updateComplete?: Promise<unknown> };
  await element.updateComplete;
  return element;
}

function getInnerStyle(element: HTMLElement, selector: string): CSSStyleDeclaration {
  return getComputedStyle(element.shadowRoot?.querySelector(selector) as HTMLElement);
}

async function createIconButton(markup: string): Promise<IconButtonComponent> {
  const container = document.createElement('div');
  container.innerHTML = markup;
  render(html`${container}`);
  const iconButton = container.firstElementChild as IconButtonComponent;
  await iconButton.updateComplete;
  return iconButton;
}

function getIconColor(iconButton: IconButtonComponent): string {
  const root = iconButton.shadowRoot?.querySelector('[part=root]') as HTMLElement;
  return getComputedStyle(root).color;
}

function getThemeColor(token: string): string {
  const probe = document.createElement('span');
  probe.style.color = `var(--forge-theme-${token})`;
  document.body.append(probe);
  const { color } = getComputedStyle(probe);
  probe.remove();
  return color;
}
