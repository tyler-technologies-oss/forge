import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import type { IBannerComponent } from './banner.js';
import { BannerTheme, BANNER_CONSTANTS } from './banner-constants.js';
import { frame, task } from '../core/utils/utils.js';

import './banner.js';

// Dismiss animation duration (200ms from duration-short4 token) + buffer for transitionend event
const DISMISS_ANIMATION_TIMEOUT = 500;

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
