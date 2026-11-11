import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import forgeRadixStyles from '../forge-radix.scss?inline';
import type { IconButtonComponent } from '../icon-button/icon-button.js';

import '../icon-button/icon-button.js';

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
