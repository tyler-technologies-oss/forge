import { describe, it, expect, vi, afterEach } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import type { IToastComponent } from './toast.js';
import { ToastComponent } from './toast.js';
import { TOAST_CONSTANTS } from './toast-constants.js';
import { task } from '../core/utils/utils.js';
import type { IOverlayComponent } from '../overlay/index.js';
import type { IIconComponent } from '../icon/index.js';

import './toast.js';

// Animation duration (400ms) used for open/close transitions
const TOAST_ANIMATION_DURATION = 400;

describe('Toast', () => {
  it('should have shadow root', async () => {
    const screen = render(html`<forge-toast>Test</forge-toast>`);
    const el = screen.container.querySelector('forge-toast') as IToastComponent;

    expect(el.shadowRoot).not.toBeNull();
  });

  it('should have correct default state', async () => {
    const screen = render(html`<forge-toast>Test</forge-toast>`);
    const el = screen.container.querySelector('forge-toast') as IToastComponent;

    expect(el.open).toBe(false);
    expect(el.duration).toBe(TOAST_CONSTANTS.defaults.DURATION);
    expect(el.placement).toBe(TOAST_CONSTANTS.defaults.PLACEMENT);
    expect(el.actionText).toBeUndefined();
    expect(el.dismissible).toBe(false);
    expect(el.dismissLabel).toBeUndefined();
    expect(el.theme).toBe(TOAST_CONSTANTS.defaults.THEME);
  });

  describe('accessibility', () => {
    it('should be accessible when closed', async () => {
      const screen = render(html`<forge-toast>Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;

      expect(el.open).toBe(false);
      await expect(el).toBeAccessible();
    });

    it('should be accessible when open', async () => {
      const screen = render(html`<forge-toast open>Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;

      expect(el.open).toBe(true);
      expect(el.getAttribute('role')).toBe('alert');
      expect(el.getAttribute('aria-live')).toBe('assertive');
      expect(el.getAttribute('aria-atomic')).toBe('true');
      await expect(el).toBeAccessible();
    });

    it('should allow for custom role', async () => {
      const screen = render(html`<forge-toast role="presentation">Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;

      expect(el.getAttribute('role')).toBe('presentation');
      expect(el.hasAttribute('aria-live')).toBe(false);
      expect(el.hasAttribute('aria-atomic')).toBe(false);
      await expect(el).toBeAccessible();
    });

    it('should not set ARIA attributes if aria-hidden="true"', async () => {
      const screen = render(html`<forge-toast aria-hidden="true">Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;

      expect(el.hasAttribute('role')).toBe(false);
      expect(el.hasAttribute('aria-live')).toBe(false);
      expect(el.hasAttribute('aria-atomic')).toBe(false);
      await expect(el).toBeAccessible();
    });
  });

  describe('open/close', () => {
    it('should show toast when open property is set', async () => {
      const screen = render(html`<forge-toast>Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;

      el.open = true;

      expect(el.open).toBe(true);
      expect(el.hasAttribute(TOAST_CONSTANTS.attributes.OPEN)).toBe(true);
    });

    it('should open by default when open attribute is set', async () => {
      const screen = render(html`<forge-toast open>Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;

      expect(el.open).toBe(true);
      expect(el.hasAttribute(TOAST_CONSTANTS.attributes.OPEN)).toBe(true);
      expect(getOverlay(el).open).toBe(true);
    });

    it('should hide toast when open property is set to false', async () => {
      const screen = render(html`<forge-toast open>Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;

      expect(el.open).toBe(true);

      el.open = false;
      await task(TOAST_ANIMATION_DURATION);

      expect(el.open).toBe(false);
      expect(el.hasAttribute(TOAST_CONSTANTS.attributes.OPEN)).toBe(false);
      expect(getOverlay(el).open).toBe(false);
    });

    it('should not dispatch close event when open set via property', async () => {
      const screen = render(html`<forge-toast open>Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;
      const closeSpy = vi.fn();
      el.addEventListener(TOAST_CONSTANTS.events.CLOSE, closeSpy);

      expect(el.open).toBe(true);

      el.open = false;
      await task(TOAST_ANIMATION_DURATION);

      expect(el.open).toBe(false);
      expect(closeSpy).not.toHaveBeenCalled();
    });

    it('should automatically hide after default duration elapses', async () => {
      const screen = render(html`<forge-toast open>Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;
      const closeSpy = vi.fn();
      el.addEventListener(TOAST_CONSTANTS.events.CLOSE, closeSpy);

      expect(el.open).toBe(true);

      await task(TOAST_ANIMATION_DURATION + TOAST_CONSTANTS.defaults.DURATION);

      expect(el.open).toBe(false);
      expect(el.hasAttribute(TOAST_CONSTANTS.attributes.OPEN)).toBe(false);
      expect(getOverlay(el).open).toBe(false);
    });

    it('should hide after custom duration', async () => {
      const screen = render(html`<forge-toast open duration="500">Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;

      expect(el.open).toBe(true);

      await task(TOAST_ANIMATION_DURATION + 500);

      expect(el.open).toBe(false);
      expect(el.hasAttribute(TOAST_CONSTANTS.attributes.OPEN)).toBe(false);
    });

    it('should not hide automatically if duration is set to 0', async () => {
      const screen = render(html`<forge-toast open duration="0">Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;
      const closeSpy = vi.fn();
      el.addEventListener(TOAST_CONSTANTS.events.CLOSE, closeSpy);

      expect(el.open).toBe(true);

      await task(TOAST_ANIMATION_DURATION + 100);

      expect(el.open).toBe(true);
      expect(closeSpy).not.toHaveBeenCalled();
    });

    it('should clear existing timeout when duration is set to 0', async () => {
      const screen = render(html`<forge-toast open>Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;

      expect(el.open).toBe(true);

      el.duration = 0;
      await task(TOAST_ANIMATION_DURATION + 100);

      expect(el.open).toBe(true);
    });

    it('should reset duration timeout if set while open', async () => {
      const screen = render(html`<forge-toast open>Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;

      expect(el.open).toBe(true);

      el.duration = 500;
      await task(TOAST_ANIMATION_DURATION + 500);

      expect(el.open).toBe(false);
    });

    it('should set duration to default if null/undefined is provided', async () => {
      const screen = render(html`<forge-toast open>Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;
      const closeSpy = vi.fn();
      el.addEventListener(TOAST_CONSTANTS.events.CLOSE, closeSpy);

      expect(el.open).toBe(true);

      el.duration = undefined as any;
      expect(el.duration).toBe(TOAST_CONSTANTS.defaults.DURATION);

      await task(TOAST_ANIMATION_DURATION + TOAST_CONSTANTS.defaults.DURATION + 999);

      expect(el.open).toBe(false);
      expect(el.hasAttribute(TOAST_CONSTANTS.attributes.OPEN)).toBe(false);
      expect(getOverlay(el).open).toBe(false);
    });

    it('should show when show() method is called', async () => {
      const screen = render(html`<forge-toast>Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;

      el.show();

      expect(el.open).toBe(true);
      expect(el.hasAttribute(TOAST_CONSTANTS.attributes.OPEN)).toBe(true);
    });

    it('should hide when hide() method is called', async () => {
      const screen = render(html`<forge-toast open>Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;

      expect(el.open).toBe(true);

      el.hide();
      await task(TOAST_ANIMATION_DURATION);

      expect(el.open).toBe(false);
      expect(el.hasAttribute(TOAST_CONSTANTS.attributes.OPEN)).toBe(false);
    });
  });

  describe('dismissible', () => {
    it('should not show close button if not dismissible', async () => {
      const screen = render(html`<forge-toast open>Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;

      expect(el.open).toBe(true);
      expect(el.hasAttribute(TOAST_CONSTANTS.attributes.DISMISSIBLE)).toBe(false);
      expect(getComputedStyle(getCloseButton(el)).display).toBe('none');
    });

    it('should show close button when dismissible', async () => {
      const screen = render(html`<forge-toast open dismissible>Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;

      expect(el.open).toBe(true);
      expect(el.hasAttribute(TOAST_CONSTANTS.attributes.DISMISSIBLE)).toBe(true);
      expect(getComputedStyle(getCloseButton(el)).display).not.toBe('none');
    });

    it('should close when close button is clicked', async () => {
      const screen = render(html`<forge-toast open dismissible>Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;

      expect(el.open).toBe(true);

      getCloseButton(el).click();
      await task(TOAST_ANIMATION_DURATION);

      expect(el.open).toBe(false);
      expect(el.hasAttribute(TOAST_CONSTANTS.attributes.OPEN)).toBe(false);
    });

    it('should dispatch close event when close button is clicked', async () => {
      const screen = render(html`<forge-toast open dismissible>Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;
      const closeSpy = vi.fn();
      el.addEventListener(TOAST_CONSTANTS.events.CLOSE, closeSpy);

      getCloseButton(el).click();
      await task(TOAST_ANIMATION_DURATION);

      expect(closeSpy).toHaveBeenCalledOnce();
    });

    it('should have default dismiss label', async () => {
      const screen = render(html`<forge-toast open dismissible>Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;

      expect(getCloseButton(el).getAttribute('aria-label')).toBe('Dismiss');
    });

    it('should have custom dismiss label', async () => {
      const screen = render(html`<forge-toast open dismissible dismiss-label="Close">Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;

      expect(el.dismissLabel).toBe('Close');
      expect(getCloseButton(el).getAttribute('aria-label')).toBe('Close');
    });

    it('should set dismiss label dynamically while open', async () => {
      const screen = render(html`<forge-toast open dismissible>Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;

      expect(getCloseButton(el).getAttribute('aria-label')).toBe('Dismiss');

      el.dismissLabel = 'Close';
      await frame();

      expect(el.dismissLabel).toBe('Close');
      expect(getCloseButton(el).getAttribute('aria-label')).toBe('Close');
    });

    it('should hide close button dynamically while open if not dismissible', async () => {
      const screen = render(html`<forge-toast open dismissible>Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;
      const closeSpy = vi.fn();
      el.addEventListener(TOAST_CONSTANTS.events.CLOSE, closeSpy);

      expect(getCloseButton(el).hidden).toBe(false);

      el.dismissible = false;
      await frame();

      getCloseButton(el).click();
      await task(TOAST_ANIMATION_DURATION);

      expect(el.open).toBe(true);
      expect(closeSpy).not.toHaveBeenCalled();
    });
  });

  describe('action button', () => {
    it('should not show action button if action text is not set', async () => {
      const screen = render(html`<forge-toast open>Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;

      expect(el.open).toBe(true);
      expect(el.hasAttribute(TOAST_CONSTANTS.attributes.ACTION_TEXT)).toBe(false);
      expect(getActionButton(el).hidden).toBe(true);
    });

    it('should show action button when action text is set', async () => {
      const screen = render(html`<forge-toast open action-text="Action">Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;

      expect(el.open).toBe(true);
      expect(el.hasAttribute(TOAST_CONSTANTS.attributes.ACTION_TEXT)).toBe(true);
      expect(getActionButton(el).hidden).toBe(false);
    });

    it('should dispatch action event when action button is clicked', async () => {
      const screen = render(html`<forge-toast open action-text="Action">Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;
      const actionSpy = vi.fn();
      el.addEventListener(TOAST_CONSTANTS.events.ACTION, actionSpy);

      getActionButton(el).click();

      expect(actionSpy).toHaveBeenCalledOnce();
    });

    it('should not hide when action button is clicked', async () => {
      const screen = render(html`<forge-toast open action-text="Action">Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;

      expect(el.open).toBe(true);

      getActionButton(el).click();
      await task(TOAST_ANIMATION_DURATION);

      expect(el.open).toBe(true);
    });

    it('should hide action button dynamically while open if action text is removed', async () => {
      const screen = render(html`<forge-toast open action-text="Action">Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;

      expect(el.open).toBe(true);
      expect(getActionButton(el).hidden).toBe(false);

      el.actionText = '';
      await frame();

      expect(getActionButton(el).hidden).toBe(true);
    });
  });

  describe('placement', () => {
    it('should set placement', async () => {
      const screen = render(html`<forge-toast placement="top">Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;

      expect(el.placement).toBe('top');
      expect(el.getAttribute(TOAST_CONSTANTS.attributes.PLACEMENT)).toBe('top');
    });

    it('should set placement to default if null/undefined is provided', async () => {
      const screen = render(html`<forge-toast placement="top">Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;

      el.placement = undefined as any;
      await frame();

      expect(el.placement).toBe(TOAST_CONSTANTS.defaults.PLACEMENT);
      expect(el.getAttribute(TOAST_CONSTANTS.attributes.PLACEMENT)).toBe(TOAST_CONSTANTS.defaults.PLACEMENT);
    });
  });

  describe('theme', () => {
    it('should set theme', async () => {
      const screen = render(html`<forge-toast theme="success">Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;

      expect(el.theme).toBe('success');
      expect(el.getAttribute(TOAST_CONSTANTS.attributes.THEME)).toBe('success');
    });

    it('should set theme to default if null/undefined is provided', async () => {
      const screen = render(html`<forge-toast theme="success">Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;

      el.theme = undefined as any;
      await frame();

      expect(el.theme).toBe(TOAST_CONSTANTS.defaults.THEME);
      expect(el.getAttribute(TOAST_CONSTANTS.attributes.THEME)).toBe(TOAST_CONSTANTS.defaults.THEME);
    });
  });

  describe('timer pause/resume', () => {
    it('should pause timer on pointer hover', async () => {
      const screen = render(html`<forge-toast open duration="500">Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;

      expect(el.open).toBe(true);

      await task(250);
      el.dispatchEvent(new PointerEvent('pointerenter', { bubbles: true }));
      await task(500);

      expect(el.open).toBe(true);

      el.dispatchEvent(new PointerEvent('pointerleave', { bubbles: true }));
      await task(500 + TOAST_ANIMATION_DURATION);

      expect(el.open).toBe(false);
    });

    it('should pause timer on focus', async () => {
      const screen = render(html`<forge-toast open duration="500">Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;

      expect(el.open).toBe(true);

      await task(250);
      el.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      await task(500);

      expect(el.open).toBe(true);

      el.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
      await task(500 + TOAST_ANIMATION_DURATION);

      expect(el.open).toBe(false);
    });

    it('should pause timer when pointer hover or focus is active', async () => {
      const screen = render(html`<forge-toast open duration="500">Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;

      expect(el.open).toBe(true);

      await task(250);
      el.dispatchEvent(new PointerEvent('pointerenter', { bubbles: true }));
      await task(100);
      el.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      await task(500);

      expect(el.open).toBe(true);

      el.dispatchEvent(new PointerEvent('pointerleave', { bubbles: true }));
      await task(100);

      expect(el.open).toBe(true);

      el.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
      await task(500 + TOAST_ANIMATION_DURATION);

      expect(el.open).toBe(false);
    });

    it('should reset timer to full duration after pointer hover ends', async () => {
      const screen = render(html`<forge-toast open duration="1000">Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;

      expect(el.open).toBe(true);

      await task(700);
      el.dispatchEvent(new PointerEvent('pointerenter', { bubbles: true }));
      await task(1000);

      expect(el.open).toBe(true);

      el.dispatchEvent(new PointerEvent('pointerleave', { bubbles: true }));
      await task(1000 + TOAST_ANIMATION_DURATION);

      expect(el.open).toBe(false);
    });

    it('should not auto-dismiss if duration is 0 even with pointer hover/focus events', async () => {
      const screen = render(html`<forge-toast open duration="0">Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;

      expect(el.open).toBe(true);

      el.dispatchEvent(new PointerEvent('pointerenter', { bubbles: true }));
      await task(100);
      el.dispatchEvent(new PointerEvent('pointerleave', { bubbles: true }));
      await task(100);

      expect(el.open).toBe(true);
    });
  });

  describe('keyboard dismissal', () => {
    it('should dismiss toast on Escape key', async () => {
      const screen = render(html`<forge-toast open>Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;
      const closeSpy = vi.fn();
      el.addEventListener(TOAST_CONSTANTS.events.CLOSE, closeSpy);

      expect(el.open).toBe(true);

      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true });
      el.dispatchEvent(escapeEvent);
      await task(TOAST_ANIMATION_DURATION);

      expect(el.open).toBe(false);
      expect(closeSpy).toHaveBeenCalledOnce();
      expect(escapeEvent.defaultPrevented).toBe(false);
    });

    it('should not dismiss on other keys', async () => {
      const screen = render(html`<forge-toast open>Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;
      const closeSpy = vi.fn();
      el.addEventListener(TOAST_CONSTANTS.events.CLOSE, closeSpy);

      expect(el.open).toBe(true);

      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      await task(TOAST_ANIMATION_DURATION);

      expect(el.open).toBe(true);
      expect(closeSpy).not.toHaveBeenCalled();
    });

    it('should stop propagation of Escape key event', async () => {
      const screen = render(html`<forge-toast open>Test</forge-toast>`);
      const el = screen.container.querySelector('forge-toast') as IToastComponent;
      const parentSpy = vi.fn();
      document.addEventListener('keydown', parentSpy);

      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true });
      el.dispatchEvent(escapeEvent);
      await task(10);

      expect(parentSpy).not.toHaveBeenCalled();
      document.removeEventListener('keydown', parentSpy);
    });
  });

  describe('static present()', () => {
    afterEach(() => {
      const toasts = document.querySelectorAll('forge-toast');
      toasts.forEach(toast => toast.remove());
    });

    it('should show toast dynamically', async () => {
      const toast = ToastComponent.present({ message: 'Test' });

      expect(toast.isConnected).toBe(true);
      expect(toast.open).toBe(true);
      expect(toast.hasAttribute(TOAST_CONSTANTS.attributes.OPEN)).toBe(true);
      expect(toast.textContent).toBe('Test');
    });

    it('should set action text', async () => {
      const toast = ToastComponent.present({ message: 'Test', actionText: 'Action' });

      expect(toast.actionText).toBe('Action');
      expect(getActionButton(toast).hidden).toBe(false);
    });

    it('should set duration', async () => {
      const toast = ToastComponent.present({ message: 'Test', duration: 500 });

      expect(toast.open).toBe(true);

      await task(TOAST_ANIMATION_DURATION + 500);

      expect(toast.open).toBe(false);
      expect(toast.hasAttribute(TOAST_CONSTANTS.attributes.OPEN)).toBe(false);
    });

    it('should set placement', async () => {
      const toast = ToastComponent.present({ message: 'Test', placement: 'top' });

      expect(toast.placement).toBe('top');
      expect(toast.getAttribute(TOAST_CONSTANTS.attributes.PLACEMENT)).toBe('top');
    });

    it('should set dismissible', async () => {
      const toast = ToastComponent.present({ message: 'Test', dismissible: true });

      expect(toast.dismissible).toBe(true);
      expect(toast.hasAttribute(TOAST_CONSTANTS.attributes.DISMISSIBLE)).toBe(true);
    });

    it('should set theme', async () => {
      const toast = ToastComponent.present({ message: 'Test', theme: 'success' });

      expect(toast.theme).toBe('success');
      expect(toast.getAttribute(TOAST_CONSTANTS.attributes.THEME)).toBe('success');
    });

    it('should set icon', async () => {
      const toast = ToastComponent.present({ message: 'Test', icon: { name: 'info' } });

      const iconEl = toast.querySelector('forge-icon') as IIconComponent;
      expect(iconEl).toBeTruthy();
      expect(iconEl.slot).toBe('icon');
      expect(iconEl.name).toBe('info');
    });

    it('should add css class', async () => {
      const toast = ToastComponent.present({ message: 'Test', className: 'custom-class' });

      expect(toast.classList.contains('custom-class')).toBe(true);
    });

    it('should add multiple css classes', async () => {
      const toast = ToastComponent.present({ message: 'Test', className: ['class1', 'class2'] });

      expect(toast.classList.contains('class1')).toBe(true);
      expect(toast.classList.contains('class2')).toBe(true);
    });

    it('should append element', async () => {
      const element = document.createElement('div');
      element.id = 'custom-toast-content';
      element.textContent = 'Test';
      const toast = ToastComponent.present({ element });

      expect(toast.querySelector('#custom-toast-content')).toBe(element);
    });
  });

  function getOverlay(el: IToastComponent): IOverlayComponent {
    return el.shadowRoot?.querySelector('forge-overlay') as IOverlayComponent;
  }

  function getCloseButton(el: IToastComponent): HTMLButtonElement {
    return el.shadowRoot?.querySelector(TOAST_CONSTANTS.selectors.CLOSE_BUTTON) as HTMLButtonElement;
  }

  function getActionButton(el: IToastComponent): HTMLButtonElement {
    return el.shadowRoot?.querySelector(TOAST_CONSTANTS.selectors.ACTION_BUTTON) as HTMLButtonElement;
  }
});

async function frame(): Promise<void> {
  return new Promise(resolve => requestAnimationFrame(() => resolve()));
}
