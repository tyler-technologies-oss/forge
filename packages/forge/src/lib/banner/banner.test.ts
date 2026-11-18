import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import type { IBannerComponent } from './banner.js';
import { BannerTheme, BannerVariant, BANNER_CONSTANTS } from './banner-constants.js';
import { frame, task } from '../core/utils/utils.js';

import './banner.js';

// Dismiss animation duration (200ms from duration-short4 token) + buffer for transitionend event
const DISMISS_ANIMATION_TIMEOUT = 500;

const THEME_TOKENS = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'error', 'info', 'surface'].flatMap(role => [
  `${role}-container`,
  `${role}-container-low`,
  `${role}-container-minimum`,
  `on-${role}-container`,
  `on-${role}-container-low`,
  'text-high'
]);
const TOKEN_COLORS = Object.fromEntries(
  THEME_TOKENS.map((name, index) => [`--forge-theme-${name}`, `rgb(${(index * 7) % 250}, ${(index * 11 + 5) % 250}, ${(index * 13 + 9) % 250})`])
);
const TOKEN_STYLE = Object.entries(TOKEN_COLORS)
  .map(([name, color]) => `${name}: ${color}`)
  .join('; ');

const resolveColor = (token: string): string => {
  const probe = document.createElement('div');
  probe.style.color = TOKEN_COLORS[token];
  document.body.append(probe);
  const color = getComputedStyle(probe).color;
  probe.remove();
  return color;
};

const getRoot = (el: IBannerComponent): HTMLElement => el.shadowRoot?.querySelector('.forge-banner') as HTMLElement;

describe('Banner', () => {
  it('should contain shadow root', async () => {
    const screen = render(html`<forge-banner>Test</forge-banner>`);
    const el = screen.container.querySelector('forge-banner') as IBannerComponent;
    expect(el.shadowRoot).not.toBeNull();
  });

  it('should add and remove class when icon slot is populated', async () => {
    const screen = render(html`<forge-banner><span slot="icon">icon</span>Test</forge-banner>`);
    const el = screen.container.querySelector('forge-banner') as IBannerComponent;
    const iconEl = el.querySelector('[slot=icon]') as HTMLSpanElement;
    const rootEl = el.shadowRoot?.querySelector('.forge-banner');

    expect(rootEl?.classList.contains(BANNER_CONSTANTS.classes.HAS_ICON)).toBe(true);

    iconEl.remove();
    await frame();
    expect(rootEl?.classList.contains(BANNER_CONSTANTS.classes.HAS_ICON)).toBe(false);

    el.appendChild(iconEl);
    await frame();
    expect(rootEl?.classList.contains(BANNER_CONSTANTS.classes.HAS_ICON)).toBe(true);
  });

  it('should add and remove class when button slot is populated', async () => {
    const screen = render(html`<forge-banner><button slot="button">button</button>Test</forge-banner>`);
    const el = screen.container.querySelector('forge-banner') as IBannerComponent;
    const buttonEl = el.querySelector('[slot=button]') as HTMLButtonElement;
    const rootEl = el.shadowRoot?.querySelector('.forge-banner');

    expect(rootEl?.classList.contains(BANNER_CONSTANTS.classes.HAS_BUTTON)).toBe(true);

    buttonEl.remove();
    await frame();
    expect(rootEl?.classList.contains(BANNER_CONSTANTS.classes.HAS_BUTTON)).toBe(false);

    el.appendChild(buttonEl);
    await frame();
    expect(rootEl?.classList.contains(BANNER_CONSTANTS.classes.HAS_BUTTON)).toBe(true);
  });

  describe('accessibility', () => {
    it('should be accessible', async () => {
      const screen = render(html`<forge-banner>Test</forge-banner>`);
      const el = screen.container.querySelector('forge-banner') as IBannerComponent;
      await frame();
      await expect(el).toBeAccessible();
    });

    it('should be accessible in all theme colors', async () => {
      const screen = render(html`<forge-banner>Test</forge-banner>`);
      const el = screen.container.querySelector('forge-banner') as IBannerComponent;

      const themes: BannerTheme[] = ['primary', 'secondary', 'tertiary', 'success', 'error', 'warning', 'info', 'info-secondary'];
      for (const theme of themes) {
        el.theme = theme;
        await frame();
        await expect(el).toBeAccessible();
      }
    });
  });

  describe('dismissed', () => {
    it('should set dismissed attribute when dismissed property is set', async () => {
      const screen = render(html`<forge-banner></forge-banner>`);
      const el = screen.container.querySelector('forge-banner') as IBannerComponent;
      el.dismissed = true;
      await frame();
      await task(DISMISS_ANIMATION_TIMEOUT);

      expect(el.hasAttribute(BANNER_CONSTANTS.attributes.DISMISSED)).toBe(true);
      expect(el.offsetHeight).toBe(0);
    });

    it('should set dismissed property when dismissed attribute is set', async () => {
      const screen = render(html`<forge-banner dismissed></forge-banner>`);
      const el = screen.container.querySelector('forge-banner') as IBannerComponent;

      expect(el.dismissed).toBe(true);
      expect(el.offsetHeight).toBe(0);
    });

    it('should set inert attribute when dismissed', async () => {
      const screen = render(html`<forge-banner></forge-banner>`);
      const el = screen.container.querySelector('forge-banner') as IBannerComponent;
      const rootEl = el.shadowRoot?.querySelector('.forge-banner') as HTMLElement;
      el.dismissed = true;

      expect(rootEl.hasAttribute('inert')).toBe(true);
    });
  });

  describe('dismissible/persistent', () => {
    it('should be dismissible (not persistent) by default', async () => {
      const screen = render(html`<forge-banner></forge-banner>`);
      const el = screen.container.querySelector('forge-banner') as IBannerComponent;

      const dismissButton = el.shadowRoot?.querySelector(BANNER_CONSTANTS.selectors.DISMISS_BUTTON);
      expect(el.persistent).toBe(false);
      expect(dismissButton).not.toBeNull();
    });

    it('should hide dismiss button when persistent', async () => {
      const screen = render(html`<forge-banner></forge-banner>`);
      const el = screen.container.querySelector('forge-banner') as IBannerComponent;
      el.persistent = true;

      const dismissButton = el.shadowRoot?.querySelector(BANNER_CONSTANTS.selectors.DISMISS_BUTTON) as HTMLElement;
      expect(dismissButton.hidden).toBe(true);
    });

    it('should dispatch dismissed event after toggling persistent', async () => {
      const screen = render(html`<forge-banner></forge-banner>`);
      const el = screen.container.querySelector('forge-banner') as IBannerComponent;

      await frame();

      const dismissButton = el.shadowRoot?.querySelector(BANNER_CONSTANTS.selectors.DISMISS_BUTTON) as HTMLButtonElement;

      const dismissSpy = vi.fn();
      el.addEventListener(BANNER_CONSTANTS.events.DISMISSED, dismissSpy);

      el.persistent = true;
      dismissButton.click();
      await task(DISMISS_ANIMATION_TIMEOUT);

      expect(dismissButton.hidden).toBe(true);
      expect(dismissSpy).not.toHaveBeenCalled();

      el.persistent = false;
      dismissButton.click();
      await task(DISMISS_ANIMATION_TIMEOUT);

      expect(dismissButton.hidden).toBe(false);
      expect(dismissSpy).toHaveBeenCalledOnce();
    });

    it('should dispatch dismissed event when dismiss button is clicked', async () => {
      const screen = render(html`<forge-banner></forge-banner>`);
      const el = screen.container.querySelector('forge-banner') as IBannerComponent;
      const dismissButton = el.shadowRoot?.querySelector(BANNER_CONSTANTS.selectors.DISMISS_BUTTON) as HTMLButtonElement;

      const beforeDismissSpy = vi.fn();
      const dismissSpy = vi.fn();

      el.addEventListener(BANNER_CONSTANTS.events.BEFORE_DISMISS, beforeDismissSpy);
      el.addEventListener(BANNER_CONSTANTS.events.DISMISSED, dismissSpy);

      await frame();
      dismissButton.click();

      expect(beforeDismissSpy).toHaveBeenCalledOnce();

      await task(DISMISS_ANIMATION_TIMEOUT);

      expect(el.dismissed).toBe(true);
      expect(beforeDismissSpy).toHaveBeenCalledOnce();
      expect(dismissSpy).toHaveBeenCalledOnce();
    });

    it('should not dismiss when before dismiss event is prevented', async () => {
      const screen = render(html`<forge-banner></forge-banner>`);
      const el = screen.container.querySelector('forge-banner') as IBannerComponent;
      const dismissButton = el.shadowRoot?.querySelector(BANNER_CONSTANTS.selectors.DISMISS_BUTTON) as HTMLButtonElement;

      el.addEventListener(BANNER_CONSTANTS.events.BEFORE_DISMISS, (evt: Event) => evt.preventDefault());

      const dismissSpy = vi.fn();
      el.addEventListener(BANNER_CONSTANTS.events.DISMISSED, dismissSpy);

      dismissButton.click();

      expect(el.dismissed).toBe(false);
      expect(dismissSpy).not.toHaveBeenCalled();
    });

    it('should not dispatch dismissed event when persistent', async () => {
      const screen = render(html`<forge-banner persistent></forge-banner>`);
      const el = screen.container.querySelector('forge-banner') as IBannerComponent;
      const dismissButton = el.shadowRoot?.querySelector(BANNER_CONSTANTS.selectors.DISMISS_BUTTON) as HTMLButtonElement;

      expect(dismissButton.hidden).toBe(true);

      const dismissSpy = vi.fn();
      el.addEventListener(BANNER_CONSTANTS.events.DISMISSED, dismissSpy);

      dismissButton.click();

      expect(dismissSpy).not.toHaveBeenCalled();
    });

    it('should dispatch dismissed event after animation is complete when dismiss button is clicked', async () => {
      const screen = render(html`<forge-banner></forge-banner>`);
      const el = screen.container.querySelector('forge-banner') as IBannerComponent;

      await frame();

      const dismissSpy = vi.fn();
      el.addEventListener(BANNER_CONSTANTS.events.DISMISSED, dismissSpy);

      const dismissButton = el.shadowRoot?.querySelector(BANNER_CONSTANTS.selectors.DISMISS_BUTTON) as HTMLButtonElement;
      dismissButton.click();

      expect(dismissSpy).not.toHaveBeenCalled();

      await task(DISMISS_ANIMATION_TIMEOUT);

      expect(dismissSpy).toHaveBeenCalledOnce();
    });

    it('should not dispatch dismissed event when dismiss button is clicked and before dismiss event is prevented', async () => {
      const screen = render(html`<forge-banner></forge-banner>`);
      const el = screen.container.querySelector('forge-banner') as IBannerComponent;
      const dismissButton = el.shadowRoot?.querySelector(BANNER_CONSTANTS.selectors.DISMISS_BUTTON) as HTMLButtonElement;

      const beforeDismissSpy = vi.fn(evt => evt.preventDefault());
      el.addEventListener(BANNER_CONSTANTS.events.BEFORE_DISMISS, beforeDismissSpy);

      const dismissSpy = vi.fn();
      el.addEventListener(BANNER_CONSTANTS.events.DISMISSED, dismissSpy);

      await frame();
      dismissButton.click();

      expect(beforeDismissSpy).toHaveBeenCalledOnce();

      await task(DISMISS_ANIMATION_TIMEOUT);

      expect(dismissSpy).not.toHaveBeenCalled();
    });

    it('should not dispatch events if dismiss button is clicked while already dismissed', async () => {
      const screen = render(html`<forge-banner dismissed></forge-banner>`);
      const el = screen.container.querySelector('forge-banner') as IBannerComponent;
      const dismissButton = el.shadowRoot?.querySelector(BANNER_CONSTANTS.selectors.DISMISS_BUTTON) as HTMLButtonElement;
      const beforeDismissSpy = vi.fn();
      const dismissSpy = vi.fn();

      el.addEventListener(BANNER_CONSTANTS.events.BEFORE_DISMISS, beforeDismissSpy);
      el.addEventListener(BANNER_CONSTANTS.events.DISMISSED, dismissSpy);

      await frame();
      dismissButton.click();

      await task(DISMISS_ANIMATION_TIMEOUT);

      expect(beforeDismissSpy).not.toHaveBeenCalled();
      expect(dismissSpy).not.toHaveBeenCalled();
    });

    it('should not dispatch events if dismiss button is clicked while persistent', async () => {
      const screen = render(html`<forge-banner persistent></forge-banner>`);
      const el = screen.container.querySelector('forge-banner') as IBannerComponent;
      const dismissButton = el.shadowRoot?.querySelector(BANNER_CONSTANTS.selectors.DISMISS_BUTTON) as HTMLButtonElement;
      const beforeDismissSpy = vi.fn();
      const dismissSpy = vi.fn();

      el.addEventListener(BANNER_CONSTANTS.events.BEFORE_DISMISS, beforeDismissSpy);
      el.addEventListener(BANNER_CONSTANTS.events.DISMISSED, dismissSpy);

      await frame();
      dismissButton.click();

      await task(DISMISS_ANIMATION_TIMEOUT);

      expect(beforeDismissSpy).not.toHaveBeenCalled();
      expect(dismissSpy).not.toHaveBeenCalled();
    });
  });

  describe('theme', () => {
    it('should set theme attribute when theme property is set', async () => {
      const screen = render(html`<forge-banner></forge-banner>`);
      const el = screen.container.querySelector('forge-banner') as IBannerComponent;
      el.theme = 'error';
      expect(el.getAttribute(BANNER_CONSTANTS.attributes.THEME)).toBe('error');
    });

    it('should set theme property when theme attribute is set', async () => {
      const screen = render(html`<forge-banner theme="error"></forge-banner>`);
      const el = screen.container.querySelector('forge-banner') as IBannerComponent;
      expect(el.theme).toBe('error');
    });

    it('should use default theme when set to null', async () => {
      const screen = render(html`<forge-banner theme="error"></forge-banner>`);
      const el = screen.container.querySelector('forge-banner') as IBannerComponent;

      expect(el.theme).toBe('error');

      el.theme = null as any;

      expect(el.theme).toBe(BANNER_CONSTANTS.defaults.THEME);
    });
  });

  describe('theme colors', () => {
    const expectedBackgrounds: Array<[BannerTheme, string]> = [
      ['info', '--forge-theme-info-container'],
      ['primary', '--forge-theme-primary-container'],
      ['secondary', '--forge-theme-secondary-container'],
      ['tertiary', '--forge-theme-tertiary-container'],
      ['success', '--forge-theme-success-container'],
      ['warning', '--forge-theme-warning-container'],
      ['error', '--forge-theme-error-container'],
      ['danger', '--forge-theme-error-container'],
      ['critical', '--forge-theme-error-container'],
      ['info-secondary', '--forge-theme-surface-container'],
      ['default', '--forge-theme-surface-container']
    ];

    for (const [theme, token] of expectedBackgrounds) {
      it(`should render the ${theme} theme with the ${token} background`, async () => {
        const screen = render(html`<forge-banner style=${TOKEN_STYLE} theme=${theme}>Test</forge-banner>`);
        const el = screen.container.querySelector('forge-banner') as IBannerComponent;
        await frame();
        expect(getComputedStyle(getRoot(el)).backgroundColor).toBe(resolveColor(token));
      });
    }

    it('should render the unthemed banner as info', async () => {
      const screen = render(html`<forge-banner style=${TOKEN_STYLE}>Test</forge-banner>`);
      const el = screen.container.querySelector('forge-banner') as IBannerComponent;
      await frame();
      expect(el.theme).toBe('info');
      expect(getComputedStyle(getRoot(el)).backgroundColor).toBe(resolveColor('--forge-theme-info-container'));
    });

    it('should render the unthemed banner text color as text-high', async () => {
      const screen = render(html`<forge-banner style=${TOKEN_STYLE}>Test</forge-banner>`);
      const el = screen.container.querySelector('forge-banner') as IBannerComponent;
      await frame();
      expect(getComputedStyle(getRoot(el)).color).toBe(resolveColor('--forge-theme-text-high'));
    });
  });

  describe('variant', () => {
    it('should be tonal by default', async () => {
      const screen = render(html`<forge-banner></forge-banner>`);
      const el = screen.container.querySelector('forge-banner') as IBannerComponent;
      expect(el.variant).toBe('tonal');
      expect(BANNER_CONSTANTS.defaults.VARIANT).toBe('tonal');
    });

    it('should set variant attribute when variant property is set', async () => {
      const screen = render(html`<forge-banner></forge-banner>`);
      const el = screen.container.querySelector('forge-banner') as IBannerComponent;
      el.variant = 'outlined';
      expect(el.getAttribute(BANNER_CONSTANTS.attributes.VARIANT)).toBe('outlined');
    });

    it('should set variant property when variant attribute is set', async () => {
      const screen = render(html`<forge-banner variant="outlined"></forge-banner>`);
      const el = screen.container.querySelector('forge-banner') as IBannerComponent;
      expect(el.variant).toBe('outlined');
    });

    it('should use the default variant when set to null', async () => {
      const screen = render(html`<forge-banner variant="outlined"></forge-banner>`);
      const el = screen.container.querySelector('forge-banner') as IBannerComponent;
      el.variant = null as unknown as BannerVariant;
      expect(el.variant).toBe('tonal');
    });

    it('should draw an inset border ring and use the outlined background when outlined', async () => {
      const screen = render(html`<forge-banner style=${TOKEN_STYLE} variant="outlined">Test</forge-banner>`);
      const el = screen.container.querySelector('forge-banner') as IBannerComponent;
      await frame();
      const styles = getComputedStyle(getRoot(el));
      expect(styles.boxShadow).toContain('inset');
      expect(styles.backgroundColor).toBe(resolveColor('--forge-theme-info-container-minimum'));
    });

    it('should not draw a border ring when tonal', async () => {
      const screen = render(html`<forge-banner>Test</forge-banner>`);
      const el = screen.container.querySelector('forge-banner') as IBannerComponent;
      await frame();
      expect(getComputedStyle(getRoot(el)).boxShadow).toBe('none');
    });

    it('should be accessible when outlined in all themes', async () => {
      const screen = render(html`<forge-banner variant="outlined">Test</forge-banner>`);
      const el = screen.container.querySelector('forge-banner') as IBannerComponent;
      for (const theme of ['default', 'info', 'success', 'warning', 'error', 'critical'] as BannerTheme[]) {
        el.theme = theme;
        await frame();
        await expect(el).toBeAccessible();
      }
    });
  });

  describe('geometry properties', () => {
    it('should not set a minimum height or border radius by default', async () => {
      const screen = render(html`<forge-banner>Test</forge-banner>`);
      const el = screen.container.querySelector('forge-banner') as IBannerComponent;
      await frame();
      const styles = getComputedStyle(getRoot(el));
      expect(styles.minHeight).toBe('0px');
      expect(styles.borderRadius).toBe('0px');
    });

    it('should apply the min-height property', async () => {
      const screen = render(html`<forge-banner style="--forge-banner-min-height: 56px">Test</forge-banner>`);
      const el = screen.container.querySelector('forge-banner') as IBannerComponent;
      await frame();
      expect(getComputedStyle(getRoot(el)).minHeight).toBe('56px');
    });

    it('should collapse below the minimum height when dismissed', async () => {
      const screen = render(html`<forge-banner style="--forge-banner-min-height: 56px" dismissed>Test</forge-banner>`);
      const el = screen.container.querySelector('forge-banner') as IBannerComponent;
      await frame();
      expect(getComputedStyle(getRoot(el)).minHeight).toBe('0px');
    });

    it('should use the inline padding for the dismissible end padding by default', async () => {
      const screen = render(html`<forge-banner>Test</forge-banner>`);
      const el = screen.container.querySelector('forge-banner') as IBannerComponent;
      await frame();
      const inner = el.shadowRoot?.querySelector('.inner') as HTMLElement;
      const styles = getComputedStyle(inner);
      expect(styles.paddingInlineEnd).toBe(styles.paddingInlineStart);
    });

    it('should apply the dismissible padding property only when the dismiss button is visible', async () => {
      const screen = render(html`<forge-banner style="--forge-banner-dismissible-padding-inline-end: 4px">Test</forge-banner>`);
      const el = screen.container.querySelector('forge-banner') as IBannerComponent;
      await frame();
      const inner = el.shadowRoot?.querySelector('.inner') as HTMLElement;
      expect(getComputedStyle(inner).paddingInlineEnd).toBe('4px');

      el.persistent = true;
      await frame();
      expect(getComputedStyle(inner).paddingInlineEnd).toBe(getComputedStyle(inner).paddingInlineStart);
    });
  });

  describe('deprecated', () => {
    it('should proxy deprecated can-dismiss attribute to persistent property', async () => {
      const screen = render(html`<forge-banner can-dismiss="false"></forge-banner>`);
      const el = screen.container.querySelector('forge-banner') as IBannerComponent;
      expect(el.persistent).toBe(true);

      el.setAttribute('can-dismiss', '');
      expect(el.persistent).toBe(false);
    });

    it('should proxy deprecated canDismiss property to persistent property', async () => {
      const screen = render(html`<forge-banner></forge-banner>`);
      const el = screen.container.querySelector('forge-banner') as IBannerComponent;

      el.canDismiss = false;
      expect(el.canDismiss).toBe(false);
      expect(el.persistent).toBe(true);

      el.canDismiss = true;
      expect(el.canDismiss).toBe(true);
      expect(el.persistent).toBe(false);
    });
  });
});
