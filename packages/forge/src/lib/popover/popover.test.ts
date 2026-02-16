import { describe, it, expect, vi, afterEach } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html, nothing } from 'lit';
import { userEvent, page } from 'vitest/browser';
import { frame, task } from '../core/utils/utils.js';
import {
  IPopoverToggleEventData,
  PopoverAnimationType,
  PopoverPreset,
  PopoverTriggerType,
  POPOVER_CONSTANTS,
  POPOVER_HOVER_TIMEOUT,
  PopoverAnchorAccessibility
} from './popover-constants.js';
import { LONGPRESS_TRIGGER_DELAY } from '../core/mixins/interactions/longpress/with-longpress-listener.js';
import type { IPopoverComponent } from './popover.js';
import type { IOverlayComponent } from '../overlay/overlay.js';
import { DismissibleStack } from '../core/utils/dismissible-stack.js';
import { OVERLAY_CONSTANTS } from '../overlay/index.js';
import { VirtualElement } from '../core/utils/position-utils.js';

import './popover.js';

// Exit animation duration (200ms) for popover dismiss animations
const EXIT_ANIMATION_DURATION = 200;

describe('Popover', () => {
  afterEach(async () => {
    await page.viewport(800, 600);
  });

  describe('defaults', () => {
    it('should have expected default values', async () => {
      const harness = await createFixture();

      expect(harness.popoverElement.open).toBe(false);
      expect(harness.popoverElement.persistent).toBe(false);
      expect(harness.popoverElement.arrow).toBe(false);
      expect(harness.popoverElement.animationType).toBe('zoom');
      expect(harness.popoverElement.triggerType).toBe('click');
      expect(harness.popoverElement.longpressDelay).toBe(LONGPRESS_TRIGGER_DELAY);
      expect(harness.popoverElement.persistentHover).toBe(false);
      expect(harness.popoverElement.hoverDelay).toBe(POPOVER_CONSTANTS.defaults.HOVER_DELAY);
      expect(harness.popoverElement.hoverDismissDelay).toBe(POPOVER_HOVER_TIMEOUT);
      expect(harness.popoverElement.preset).toBe(POPOVER_CONSTANTS.defaults.PRESET);
    });

    it('should provide internal overlay element reference', async () => {
      const harness = await createFixture();

      const shadowOverlay = harness.popoverElement.shadowRoot?.querySelector('forge-overlay') as IOverlayComponent;
      expect(harness.popoverElement.overlay).toBe(shadowOverlay);
    });

    it('should not be open by default', async () => {
      const harness = await createFixture();

      expect(harness.isOpen).toBe(false);
    });

    it('should open by default with open attribute', async () => {
      const harness = await createFixture({ open: true });

      expect(harness.isOpen).toBe(true);
    });
  });

  describe('animation type', () => {
    it('should have default fade + zoom animation type', async () => {
      const harness = await createFixture();

      expect(harness.popoverElement.animationType).toBe('zoom');
      expect(getComputedStyle(harness.surfaceElement).animationName).toBe('fadein, zoomin');
    });

    it('should set slide animation type', async () => {
      const harness = await createFixture({ animationType: 'slide' });

      expect(harness.popoverElement.animationType).toBe('slide');
      expect(getComputedStyle(harness.surfaceElement).animationName).toBe('fadein, slidein');
    });

    it('should set fade animation type', async () => {
      const harness = await createFixture({ animationType: 'fade' });

      expect(harness.popoverElement.animationType).toBe('fade');
      expect(getComputedStyle(harness.surfaceElement).animationName).toBe('fadein');
    });

    it('should set none animation type', async () => {
      const harness = await createFixture({ animationType: 'none' });

      expect(harness.popoverElement.animationType).toBe('none');
      expect(getComputedStyle(harness.surfaceElement).animationName).toBe('none');
    });

    it('should set preset via attribute', async () => {
      const harness = await createFixture({ preset: 'dropdown' });

      expect(harness.popoverElement.preset).toBe('dropdown');
      expect(harness.popoverElement.getAttribute(POPOVER_CONSTANTS.attributes.PRESET)).toBe('dropdown');
    });

    it('should set preset via property', async () => {
      const harness = await createFixture();

      expect(harness.popoverElement.hasAttribute(POPOVER_CONSTANTS.attributes.PRESET)).toBe(false);

      harness.popoverElement.preset = 'dropdown';

      expect(harness.popoverElement.preset).toBe('dropdown');
      expect(harness.popoverElement.getAttribute(POPOVER_CONSTANTS.attributes.PRESET)).toBe('dropdown');
    });

    it('should remove preset attribute when setting preset to default value', async () => {
      const harness = await createFixture({ preset: 'dropdown' });

      expect(harness.popoverElement.preset).toBe('dropdown');
      expect(harness.popoverElement.getAttribute(POPOVER_CONSTANTS.attributes.PRESET)).toBe('dropdown');

      harness.popoverElement.preset = 'popover';

      expect(harness.popoverElement.preset).toBe('popover');
      expect(harness.popoverElement.hasAttribute(POPOVER_CONSTANTS.attributes.PRESET)).toBe(false);
    });
  });

  describe('overlay aware', () => {
    it('should set inline', async () => {
      const harness = await createFixture();
      harness.popoverElement.inline = true;

      expect(harness.popoverElement.inline).toBe(true);
      expect(harness.popoverElement.overlay.inline).toBe(true);
    });

    it('should proxy placement', async () => {
      const harness = await createFixture();

      harness.popoverElement.placement = 'right';

      expect(harness.popoverElement.placement).toBe('right');
      expect(harness.popoverElement.overlay.placement).toBe('right');
      expect(harness.popoverElement.getAttribute(OVERLAY_CONSTANTS.attributes.PLACEMENT)).toBe('right');
    });

    it('should proxy position strategy', async () => {
      const harness = await createFixture();

      harness.popoverElement.positionStrategy = 'absolute';

      expect(harness.popoverElement.positionStrategy).toBe('absolute');
      expect(harness.popoverElement.overlay.positionStrategy).toBe('absolute');
      expect(harness.popoverElement.getAttribute(OVERLAY_CONSTANTS.attributes.POSITION_STRATEGY)).toBe('absolute');
    });

    it('should proxy offset', async () => {
      const harness = await createFixture();

      const offset = { mainAxis: 10 };
      harness.popoverElement.offset = offset;

      expect(harness.popoverElement.offset).toEqual(offset);
      expect(harness.popoverElement.overlay.offset).toEqual(offset);
      expect(harness.popoverElement.hasAttribute('offset')).toBe(false);
    });

    it('should proxy hide', async () => {
      const harness = await createFixture();

      harness.popoverElement.hide = 'anchor-hidden';

      expect(harness.popoverElement.hide).toBe('anchor-hidden');
      expect(harness.popoverElement.overlay.hide).toBe('anchor-hidden');
      expect(harness.popoverElement.getAttribute(OVERLAY_CONSTANTS.attributes.HIDE)).toBe('anchor-hidden');
    });

    it('should proxy persistent', async () => {
      const harness = await createFixture();

      harness.popoverElement.persistent = true;

      expect(harness.popoverElement.persistent).toBe(true);
      expect(harness.popoverElement.overlay.persistent).toBe(true);
      expect(harness.popoverElement.hasAttribute(OVERLAY_CONSTANTS.attributes.PERSISTENT)).toBe(true);
    });

    it('should proxy shift', async () => {
      const harness = await createFixture();

      harness.popoverElement.shift = 'never';

      expect(harness.popoverElement.shift).toBe('never');
      expect(harness.popoverElement.overlay.shift).toBe('never');
      expect(harness.popoverElement.getAttribute(OVERLAY_CONSTANTS.attributes.SHIFT)).toBe('never');
    });

    it('should proxy flip', async () => {
      const harness = await createFixture();

      harness.popoverElement.flip = 'main';

      expect(harness.popoverElement.flip).toBe('main');
      expect(harness.popoverElement.overlay.flip).toBe('main');
      expect(harness.popoverElement.getAttribute(OVERLAY_CONSTANTS.attributes.FLIP)).toBe('main');
    });

    it('should proxy boundary', async () => {
      const harness = await createFixture();

      const elId = 'some-element-id';
      harness.popoverElement.boundary = elId;

      expect(harness.popoverElement.boundary).toBe(elId);
      expect(harness.popoverElement.overlay.boundary).toBe(elId);
      expect(harness.popoverElement.getAttribute(OVERLAY_CONSTANTS.attributes.BOUNDARY)).toBe(elId);
    });

    it('should proxy boundary element', async () => {
      const harness = await createFixture();

      const boundaryEl = document.createElement('div');

      harness.popoverElement.boundaryElement = boundaryEl;

      expect(harness.popoverElement.boundaryElement).toBe(boundaryEl);
      expect(harness.popoverElement.overlay.boundaryElement).toBe(boundaryEl);
    });

    it('should proxy fallback placements', async () => {
      const harness = await createFixture();

      harness.popoverElement.fallbackPlacements = ['top', 'bottom'];

      expect(harness.popoverElement.fallbackPlacements).toEqual(['top', 'bottom']);
      expect(harness.popoverElement.overlay.fallbackPlacements).toEqual(['top', 'bottom']);
    });

    it('should proxy position() to overlay', async () => {
      const harness = await createFixture();

      const positionSpy = vi.spyOn(harness.popoverElement.overlay, 'position');

      harness.popoverElement.position();

      expect(positionSpy).toHaveBeenCalledOnce();
      positionSpy.mockRestore();
    });

    it('should proxy anchorElement', async () => {
      const harness = await createFixture();

      harness.popoverElement.anchorElement = harness.altTriggerElement;

      expect(harness.popoverElement.anchorElement).toBe(harness.altTriggerElement);
      expect(harness.popoverElement.overlay.anchorElement).toBe(harness.altTriggerElement);
    });

    it('should proxy anchor', async () => {
      const harness = await createFixture();

      harness.popoverElement.anchor = harness.altTriggerElement.id;

      expect(harness.popoverElement.anchor).toBe(harness.altTriggerElement.id);
      expect(harness.popoverElement.overlay.anchorElement).toBe(harness.altTriggerElement);
    });

    it('should proxy open', async () => {
      const harness = await createFixture();

      harness.popoverElement.open = true;

      expect(harness.popoverElement.open).toBe(true);
      expect(harness.popoverElement.overlay.open).toBe(true);
      expect(harness.popoverElement.hasAttribute(OVERLAY_CONSTANTS.attributes.OPEN)).toBe(true);
    });
  });

  describe('events', () => {
    it('should dispatch beforetoggle event when opening', async () => {
      const harness = await createFixture();

      const beforeToggleSpy = vi.fn();
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, beforeToggleSpy);

      await harness.clickTrigger();

      expect(beforeToggleSpy).toHaveBeenCalledOnce();
      expect(beforeToggleSpy.mock.calls[0][0].detail).toEqual({ oldState: 'closed', newState: 'open' });
    });

    it('should dispatch beforetoggle event when closing', async () => {
      const harness = await createFixture({ open: true });

      const beforeToggleSpy = vi.fn();
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, beforeToggleSpy);

      await harness.clickTrigger();

      expect(beforeToggleSpy).toHaveBeenCalledOnce();
      expect(beforeToggleSpy.mock.calls[0][0].detail).toEqual({ oldState: 'open', newState: 'closed' });
    });

    it('should dispatch toggle event when opening', async () => {
      const harness = await createFixture();

      const toggleSpy = vi.fn();
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.TOGGLE, toggleSpy);

      await harness.clickTrigger();

      expect(toggleSpy).toHaveBeenCalledOnce();
      expect(toggleSpy.mock.calls[0][0].detail).toEqual({ oldState: 'closed', newState: 'open' });
    });

    it('should dispatch toggle event when closing', async () => {
      const harness = await createFixture({ open: true });

      const toggleSpy = vi.fn();
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.TOGGLE, toggleSpy);

      await harness.clickTrigger();
      await harness.exitAnimation();

      expect(toggleSpy).toHaveBeenCalledOnce();
      expect(toggleSpy.mock.calls[0][0].detail).toEqual({ oldState: 'open', newState: 'closed' });
    });

    it('should cancel beforetoggle event when calling preventDefault to open', async () => {
      const harness = await createFixture();

      const beforeToggleSpy = vi.fn((evt: CustomEvent<IPopoverToggleEventData>) => evt.preventDefault());
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, beforeToggleSpy);

      await harness.clickTrigger();

      expect(harness.isOpen).toBe(false);
    });

    it('should cancel beforetoggle event when calling preventDefault to close', async () => {
      const harness = await createFixture({ open: true });

      const beforeToggleSpy = vi.fn((evt: CustomEvent<IPopoverToggleEventData>) => evt.preventDefault());
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, beforeToggleSpy);

      await harness.clickTrigger();

      expect(harness.isOpen).toBe(true);
    });

    it('should not cancel toggle event when calling preventDefault to open', async () => {
      const harness = await createFixture();

      const toggleSpy = vi.fn((evt: CustomEvent<IPopoverToggleEventData>) => evt.preventDefault());
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.TOGGLE, toggleSpy);

      await harness.clickTrigger();

      expect(harness.isOpen).toBe(true);
    });

    it('should not cancel toggle event when calling preventDefault to close', async () => {
      const harness = await createFixture({ open: true });

      const toggleSpy = vi.fn((evt: CustomEvent<IPopoverToggleEventData>) => evt.preventDefault());
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.TOGGLE, toggleSpy);

      await harness.clickTrigger();
      await harness.exitAnimation();

      expect(harness.isOpen).toBe(false);
    });

    it('should dispatch before toggle event before toggle event when opening', async () => {
      const harness = await createFixture();

      const callOrder: string[] = [];
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, () => callOrder.push('beforetoggle'));
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.TOGGLE, () => callOrder.push('toggle'));

      await harness.clickTrigger();

      expect(callOrder).toEqual(['beforetoggle', 'toggle']);
    });

    it('should not dispatch toggle event when before toggle event is cancelled when opening', async () => {
      const harness = await createFixture();

      const beforeToggleSpy = vi.fn((evt: CustomEvent<IPopoverToggleEventData>) => evt.preventDefault());
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, beforeToggleSpy);

      const toggleSpy = vi.fn();
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.TOGGLE, toggleSpy);

      await harness.clickTrigger();

      expect(toggleSpy).not.toHaveBeenCalled();
    });

    it('should dispatch toggle event when before toggle event is not cancelled when closing', async () => {
      const harness = await createFixture({ open: true });

      const beforeToggleSpy = vi.fn();
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, beforeToggleSpy);

      const toggleSpy = vi.fn();
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.TOGGLE, toggleSpy);

      await harness.clickTrigger();
      await harness.exitAnimation();

      expect(toggleSpy).toHaveBeenCalledOnce();
    });

    it('should not dispatch events when setting open property manually', async () => {
      const harness = await createFixture();

      const beforeToggleSpy = vi.fn();
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, beforeToggleSpy);

      const toggleSpy = vi.fn();
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.TOGGLE, toggleSpy);

      harness.popoverElement.open = true;
      harness.popoverElement.open = false;

      expect(beforeToggleSpy).not.toHaveBeenCalled();
      expect(toggleSpy).not.toHaveBeenCalled();
    });

    it('should not dispatch events when setting open attribute manually', async () => {
      const harness = await createFixture();

      const beforeToggleSpy = vi.fn();
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, beforeToggleSpy);

      const toggleSpy = vi.fn();
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.TOGGLE, toggleSpy);

      harness.popoverElement.setAttribute(POPOVER_CONSTANTS.attributes.OPEN, '');
      harness.popoverElement.removeAttribute(POPOVER_CONSTANTS.attributes.OPEN);

      expect(beforeToggleSpy).not.toHaveBeenCalled();
      expect(toggleSpy).not.toHaveBeenCalled();
    });
  });

  describe('anchor', () => {
    it('should anchor to the trigger button implicitly (previous element sibling)', async () => {
      const harness = await createFixture({ open: true });

      expect(harness.popoverElement.anchorElement).toBe(harness.popoverElement.previousElementSibling);
      expect(harness.popoverElement.previousElementSibling).toBe(harness.triggerElement);
    });

    it('should set the anchor element via IDREF', async () => {
      const harness = await createFixture({ open: true, anchor: 'alt-trigger' });

      expect(harness.popoverElement.anchorElement).toBe(harness.altTriggerElement);

      harness.popoverElement.anchor = harness.triggerElement.id;
      expect(harness.popoverElement.anchorElement).toBe(harness.triggerElement);
    });

    it('should set anchor to previous element sibling when anchor element is set to null', async () => {
      const harness = await createFixture({ open: true, anchor: 'alt-trigger' });

      expect(harness.popoverElement.anchorElement).toBe(harness.altTriggerElement);

      harness.popoverElement.anchor = null;
      expect(harness.popoverElement.anchorElement).toBe(harness.popoverElement.previousElementSibling);
    });

    it('should anchor to the trigger button explicitly', async () => {
      const harness = await createFixture({ open: true, anchor: 'alt-trigger' });

      expect(harness.popoverElement.overlay.anchorElement).toBe(harness.altTriggerElement);

      harness.popoverElement.anchorElement = harness.triggerElement;
      expect(harness.popoverElement.overlay.anchorElement).toBe(harness.triggerElement);
    });

    it('should not set anchor element if no anchor id is provided and there are no implicit siblings', async () => {
      const screen = render(html`<forge-popover></forge-popover>`);
      const el = screen.container.querySelector('forge-popover') as IPopoverComponent;

      expect(el.anchorElement).toBeNull();
    });
  });

  describe('click trigger type', () => {
    it('should open when clicking the trigger button by default', async () => {
      const harness = await createFixture();

      await harness.clickTrigger();

      expect(harness.isOpen).toBe(true);
    });

    it('should close when clicking the trigger button', async () => {
      const harness = await createFixture({ open: true });

      await harness.clickTrigger();
      await harness.exitAnimation();

      expect(harness.isOpen).toBe(false);
    });

    it('should open and close when clicking the trigger button', async () => {
      const harness = await createFixture();

      await harness.clickTrigger();
      expect(harness.isOpen).toBe(true);

      await harness.clickTrigger();
      await harness.exitAnimation();
      expect(harness.isOpen).toBe(false);
    });

    it('should not open when clicking the trigger button when disabled', async () => {
      const harness = await createFixture();

      harness.triggerElement.disabled = true;
      await userEvent.click(harness.triggerElement, { force: true });

      expect(harness.isOpen).toBe(false);
    });

    it('should not open when clicking the trigger button if before toggle event is cancelled', async () => {
      const harness = await createFixture();

      expect(harness.isOpen).toBe(false);

      const beforeToggleSpy = vi.fn((evt: CustomEvent<IPopoverToggleEventData>) => evt.preventDefault());
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, beforeToggleSpy);

      await harness.clickTrigger();

      expect(harness.isOpen).toBe(false);
    });

    it('should not close when clicking the trigger button if toggle event is cancelled', async () => {
      const harness = await createFixture({ open: true });

      expect(harness.isOpen).toBe(true);

      const toggleSpy = vi.fn((evt: CustomEvent<IPopoverToggleEventData>) => evt.preventDefault());
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, toggleSpy);

      await harness.clickTrigger();

      expect(harness.isOpen).toBe(true);
    });

    it('should set aria-expanded attribute', async () => {
      const harness = await createFixture();

      expect(harness.triggerElement.getAttribute('aria-expanded')).toBe('false');

      await harness.clickTrigger();

      expect(harness.triggerElement.getAttribute('aria-expanded')).toBe('true');

      await harness.clickTrigger();
      await harness.exitAnimation();

      expect(harness.triggerElement.getAttribute('aria-expanded')).toBe('false');
    });
  });

  describe('focus trigger type', () => {
    it('should open when focusing the trigger button', async () => {
      const harness = await createFixture({ triggerType: 'focus' });

      harness.focusTrigger();

      expect(harness.isOpen).toBe(true);
    });

    it('should open and close when focusing and blurring the trigger button', async () => {
      const harness = await createFixture({ triggerType: 'focus' });

      harness.focusTrigger();
      expect(harness.isOpen).toBe(true);

      harness.blurTrigger();
      await harness.exitAnimation();
      expect(harness.isOpen).toBe(false);
    });

    it('should not open when focusing the trigger if before toggle event is cancelled', async () => {
      const harness = await createFixture({ triggerType: 'focus' });

      expect(harness.isOpen).toBe(false);

      const beforeToggleSpy = vi.fn((evt: CustomEvent<IPopoverToggleEventData>) => evt.preventDefault());
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, beforeToggleSpy);

      harness.focusTrigger();

      expect(harness.isOpen).toBe(false);
    });

    it('should not close when blurring the trigger if toggle event is cancelled', async () => {
      const harness = await createFixture({ open: true, triggerType: 'focus' });

      expect(harness.isOpen).toBe(true);

      const toggleSpy = vi.fn((evt: CustomEvent<IPopoverToggleEventData>) => evt.preventDefault());
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, toggleSpy);

      harness.blurTrigger();

      expect(harness.isOpen).toBe(true);
    });

    it('should allow focusing element inside content without closing', async () => {
      const harness = await createFixture({ triggerType: 'focus' });

      harness.focusTrigger();
      expect(harness.isOpen).toBe(true);

      await userEvent.keyboard('{Tab}');

      expect(document.activeElement).toBe(harness.contentButton);
      expect(harness.isOpen).toBe(true);
    });

    it('should close when blurring element inside content to an element outside of content', async () => {
      const harness = await createFixture({ triggerType: 'focus' });

      harness.focusTrigger();
      expect(harness.isOpen).toBe(true);

      await userEvent.keyboard('{Tab}');
      expect(harness.isOpen).toBe(true);

      await userEvent.keyboard('{Tab}');
      await harness.exitAnimation();

      expect(document.activeElement).not.toBe(harness.triggerElement);
      expect(document.activeElement).not.toBe(harness.contentButton);
      expect(harness.isOpen).toBe(false);
    });

    it('should not close if tabbing from content to trigger', async () => {
      const harness = await createFixture({ triggerType: 'focus' });

      harness.focusTrigger();
      expect(harness.isOpen).toBe(true);

      await userEvent.keyboard('{Tab}');
      expect(harness.isOpen).toBe(true);

      await userEvent.keyboard('{Shift>}{Tab}{/Shift}');

      expect(document.activeElement).toBe(harness.triggerElement);
      expect(harness.isOpen).toBe(true);
    });
  });

  describe('hover trigger type', () => {
    it('should open when hovering the trigger button', async () => {
      const harness = await createFixture({ triggerType: 'hover' });

      expect(harness.isOpen).toBe(false);

      await harness.hoverTrigger();

      expect(harness.isOpen).toBe(true);
    });

    it('should open and close when hovering and unhovering the trigger button', async () => {
      const harness = await createFixture({ triggerType: 'hover' });

      await harness.hoverTrigger();
      expect(harness.isOpen).toBe(true);

      await harness.hoverOutside();
      await task(POPOVER_HOVER_TIMEOUT + EXIT_ANIMATION_DURATION);

      expect(harness.isOpen).toBe(false);
    });

    it('should not close after open when hovering and unhovering the trigger and popover before the hover timeout', async () => {
      const harness = await createFixture({ triggerType: 'hover' });

      expect(harness.isOpen).toBe(false);

      await harness.hoverTrigger();
      expect(harness.isOpen).toBe(true);

      await harness.hoverOutside();
      await task(POPOVER_HOVER_TIMEOUT / 4);
      await harness.hoverTrigger();
      await harness.hoverSurface();
      await task(POPOVER_HOVER_TIMEOUT + 100);

      expect(harness.isOpen).toBe(true);
    });

    it('should not open when hovering the trigger button if before toggle event is cancelled', async () => {
      const harness = await createFixture({ triggerType: 'hover' });

      expect(harness.isOpen).toBe(false);

      const beforeToggleSpy = vi.fn((evt: CustomEvent<IPopoverToggleEventData>) => evt.preventDefault());
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, beforeToggleSpy);

      await harness.hoverTrigger();

      expect(harness.isOpen).toBe(false);
    });

    it('should not close when unhovering the trigger button if toggle event is cancelled', async () => {
      const harness = await createFixture({ open: true, triggerType: 'hover' });

      expect(harness.isOpen).toBe(true);

      const toggleSpy = vi.fn((evt: CustomEvent<IPopoverToggleEventData>) => evt.preventDefault());
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, toggleSpy);

      await harness.hoverOutside();

      expect(harness.isOpen).toBe(true);
    });

    it('should close if unhovering the surface after the hover timeout', async () => {
      const harness = await createFixture({ triggerType: 'hover' });

      expect(harness.isOpen).toBe(false);

      await harness.hoverTrigger();
      expect(harness.isOpen).toBe(true);

      await harness.hoverSurface();
      await frame();
      await harness.hoverOutside();
      await task(POPOVER_HOVER_TIMEOUT + 100);
      await harness.exitAnimation();

      expect(harness.isOpen).toBe(false);
    });

    it('should use custom hover dismiss delay', async () => {
      const harness = await createFixture({ triggerType: 'hover' });

      const customDelay = 100;
      harness.popoverElement.hoverDismissDelay = customDelay;

      expect(harness.popoverElement.hoverDismissDelay).toBe(customDelay);
      expect(harness.isOpen).toBe(false);

      await harness.hoverTrigger();
      expect(harness.isOpen).toBe(true);

      await harness.hoverOutside();
      await task(customDelay + 100);
      await harness.exitAnimation();

      expect(harness.isOpen).toBe(false);
    });

    it('should open with a delay when hovering over the trigger button and a delay is set', async () => {
      const harness = await createFixture({ triggerType: 'hover', hoverDelay: 500 });

      expect(harness.isOpen).toBe(false);

      await harness.hoverTrigger();
      await task(harness.popoverElement.hoverDelay + 100);

      expect(harness.isOpen).toBe(true);
    });

    it('should set the default hoverDelay value if NaN', async () => {
      const harness = await createFixture({ triggerType: 'hover', hoverDelay: 'Testing' as any });

      expect(harness.popoverElement.hoverDelay).toBe(0);
    });

    it('should set the default hoverDelay value if the hoverDelay < 0', async () => {
      const harness = await createFixture({ triggerType: 'hover', hoverDelay: -400 });

      expect(harness.popoverElement.hoverDelay).toBe(0);
    });

    it('should not close if persistent hover is enabled', async () => {
      const harness = await createFixture({ triggerType: 'hover', persistentHover: true });

      expect(harness.isOpen).toBe(false);

      await harness.hoverTrigger();
      expect(harness.isOpen).toBe(true);

      await harness.hoverOutside();
      await task(POPOVER_HOVER_TIMEOUT + 100);

      expect(harness.isOpen).toBe(true);
    });

    it('should not close if persistent hover is updated dynamically while the popover is open', async () => {
      const harness = await createFixture({ triggerType: 'hover' });

      expect(harness.isOpen).toBe(false);

      await harness.hoverTrigger();
      expect(harness.isOpen).toBe(true);

      harness.popoverElement.persistentHover = true;
      await harness.hoverOutside();
      await task(POPOVER_HOVER_TIMEOUT + 100);

      expect(harness.isOpen).toBe(true);
    });

    it('should not hide current hovered popover if previously open popover is dismissed', async () => {
      const firstHarness = await createFixture({ triggerType: 'hover' });
      const secondHarness = await createFixture({ triggerType: 'hover' });

      expect(firstHarness.isOpen).toBe(false);
      expect(secondHarness.isOpen).toBe(false);

      await firstHarness.hoverTrigger();
      await firstHarness.hoverOutside();
      await secondHarness.hoverTrigger();

      await task(POPOVER_HOVER_TIMEOUT + 100);
      await firstHarness.exitAnimation();

      expect(firstHarness.isOpen).toBe(false);
      expect(secondHarness.isOpen).toBe(true);
    });
  });

  describe('longpress trigger type', () => {
    it('should open when longpressing the trigger button', async () => {
      const harness = await createFixture({ triggerType: 'longpress' });

      await harness.longpressTrigger();

      expect(harness.isOpen).toBe(true);
    });

    it('should close by click outside after longpressing to open', async () => {
      const harness = await createFixture({ triggerType: 'longpress' });

      await harness.longpressTrigger();
      expect(harness.isOpen).toBe(true);

      await harness.clickOutside();
      await harness.exitAnimation();
      expect(harness.isOpen).toBe(false);
    });

    it('should not open when releasing the trigger button before the longpress delay', async () => {
      const harness = await createFixture({ triggerType: 'longpress' });

      await harness.longpressStopBeforeDelay();
      expect(harness.isOpen).toBe(false);
    });

    it('should not open when longpressing the trigger button if before toggle event is cancelled', async () => {
      const harness = await createFixture({ triggerType: 'longpress' });

      expect(harness.isOpen).toBe(false);

      const beforeToggleSpy = vi.fn((evt: CustomEvent<IPopoverToggleEventData>) => evt.preventDefault());
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, beforeToggleSpy);

      await harness.longpressTrigger();

      expect(harness.isOpen).toBe(false);
    });

    it('should not close when clicking outside the popover if toggle event is cancelled', async () => {
      const harness = await createFixture({ open: true, triggerType: 'longpress' });

      expect(harness.isOpen).toBe(true);

      const toggleSpy = vi.fn((evt: CustomEvent<IPopoverToggleEventData>) => evt.preventDefault());
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, toggleSpy);

      await harness.clickOutside();

      expect(harness.isOpen).toBe(true);
    });

    it('should use custom longpress delay', async () => {
      const harness = await createFixture({ triggerType: 'longpress' });

      const customDelay = 100;
      harness.popoverElement.longpressDelay = customDelay;

      expect(harness.popoverElement.longpressDelay).toBe(customDelay);
      expect(harness.isOpen).toBe(false);

      await harness.longpressTrigger(customDelay);
      expect(harness.isOpen).toBe(true);
    });
  });

  describe('double click trigger type', () => {
    it('should open when double clicking the trigger button', async () => {
      const harness = await createFixture({ triggerType: 'doubleclick' });

      await harness.doubleClickTrigger();

      expect(harness.isOpen).toBe(true);
    });

    it('should open and close by double clicking', async () => {
      const harness = await createFixture({ triggerType: 'doubleclick' });

      await harness.doubleClickTrigger();
      expect(harness.isOpen).toBe(true);

      await harness.doubleClickTrigger();
      await harness.exitAnimation();
      expect(harness.isOpen).toBe(false);
    });

    it('should not open when double clicking the trigger if before toggle event is cancelled', async () => {
      const harness = await createFixture({ triggerType: 'doubleclick' });

      expect(harness.isOpen).toBe(false);

      const beforeToggleSpy = vi.fn((evt: CustomEvent<IPopoverToggleEventData>) => evt.preventDefault());
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, beforeToggleSpy);

      await harness.doubleClickTrigger();

      expect(harness.isOpen).toBe(false);
    });

    it('should not close when double clicking the trigger if before toggle event is cancelled', async () => {
      const harness = await createFixture({ open: true, triggerType: 'doubleclick' });

      expect(harness.isOpen).toBe(true);

      const toggleSpy = vi.fn((evt: CustomEvent<IPopoverToggleEventData>) => evt.preventDefault());
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, toggleSpy);

      await harness.doubleClickTrigger();

      expect(harness.isOpen).toBe(true);
    });
  });

  describe('contextmenu trigger type', () => {
    it('should open via contextmenu event (right click)', async () => {
      const screen = render(html`<forge-popover trigger-type="contextmenu">Context menu</forge-popover>`);
      const popover = screen.container.querySelector('forge-popover') as IPopoverComponent;

      expect(popover.open).toBe(false);

      document.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, clientX: 0, clientY: 0 }));

      expect(popover.open).toBe(true);
    });

    it('should not open via contextmenu event if trigger type is not set to contextmenu', async () => {
      const screen = render(html`<forge-popover>Context menu</forge-popover>`);
      const popover = screen.container.querySelector('forge-popover') as IPopoverComponent;

      expect(popover.open).toBe(false);

      document.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, clientX: 0, clientY: 0 }));

      expect(popover.open).toBe(false);
    });

    it('should update overlay position when contextmenu event is fired while open', async () => {
      const screen = render(html`<forge-popover trigger-type="contextmenu">Context menu</forge-popover>`);
      const popover = screen.container.querySelector('forge-popover') as IPopoverComponent;

      const overlayRootElement = popover.overlay.shadowRoot?.querySelector(OVERLAY_CONSTANTS.selectors.ROOT) as HTMLElement;

      expect(popover.open).toBe(false);

      document.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, clientX: 100, clientY: 10 }));
      expect(popover.open).toBe(true);

      await frame();
      const originalOverlayPosition = overlayRootElement.style.translate;

      document.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, clientX: 300, clientY: 50 }));
      await frame();

      const newOverlayPosition = overlayRootElement.style.translate;

      expect(popover.open).toBe(true);
      expect(originalOverlayPosition).not.toBe(newOverlayPosition);
    });
  });

  describe('manual trigger type', () => {
    it('should not open from user interaction if manual trigger type', async () => {
      const harness = await createFixture({ triggerType: 'manual' });

      await harness.clickTrigger();
      await harness.longpressTrigger();
      await harness.doubleClickTrigger();
      harness.focusTrigger();
      await harness.hoverTrigger();

      expect(harness.isOpen).toBe(false);
    });

    it('should open via property if manual trigger type', async () => {
      const harness = await createFixture({ triggerType: 'manual' });

      expect(harness.isOpen).toBe(false);

      harness.popoverElement.open = true;

      expect(harness.isOpen).toBe(true);
    });
  });

  describe('multiple trigger types', () => {
    it('should allow for providing multiple trigger types via attribute', async () => {
      const harness = await createFixture();

      harness.popoverElement.setAttribute(POPOVER_CONSTANTS.attributes.TRIGGER_TYPE, 'click,focus');

      expect(harness.popoverElement.triggerType).toEqual(['click', 'focus']);
    });

    it('should fall back to default trigger type of "click" if trigger-type attribute is removed', async () => {
      const harness = await createFixture({ triggerType: 'focus' });

      harness.popoverElement.removeAttribute(POPOVER_CONSTANTS.attributes.TRIGGER_TYPE);

      expect(harness.popoverElement.triggerType).toBe('click');
    });

    it('should fall back to default trigger type of "click" if triggerType property is set to empty array', async () => {
      const harness = await createFixture({ triggerType: 'focus' });

      harness.popoverElement.triggerType = [];

      expect(harness.popoverElement.triggerType).toBe('click');
    });

    it('should fall back to default trigger type of "click" if triggerType property is set to null', async () => {
      const harness = await createFixture({ triggerType: 'focus' });

      harness.popoverElement.triggerType = null as any;

      expect(harness.popoverElement.triggerType).toBe('click');
    });

    it('should only allow for click when doubleclick is also specified together since they conflict', async () => {
      const harness = await createFixture();

      harness.popoverElement.setAttribute(POPOVER_CONSTANTS.attributes.TRIGGER_TYPE, 'click,doubleclick');

      expect(harness.popoverElement.triggerType).toEqual(['click', 'doubleclick']);

      harness.triggerElement.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));

      expect(harness.isOpen).toBe(false);

      await harness.clickTrigger();

      expect(harness.isOpen).toBe(true);
    });

    it('should open/close via focus when both focus and hover triggers to be specified together', async () => {
      const harness = await createFixture();

      harness.popoverElement.setAttribute(POPOVER_CONSTANTS.attributes.TRIGGER_TYPE, 'focus,hover');

      expect(harness.popoverElement.triggerType).toEqual(['focus', 'hover']);

      harness.focusTrigger();
      expect(harness.isOpen).toBe(true);

      harness.blurTrigger();
      await harness.exitAnimation();
      expect(harness.isOpen).toBe(false);
    });

    it('should open/close via hover when both focus and hover triggers to be specified together', async () => {
      const harness = await createFixture();

      harness.popoverElement.setAttribute(POPOVER_CONSTANTS.attributes.TRIGGER_TYPE, 'focus,hover');

      expect(harness.popoverElement.triggerType).toEqual(['focus', 'hover']);

      await harness.hoverOutside();
      await harness.hoverTrigger();
      expect(harness.isOpen).toBe(true);

      await harness.hoverSurface();
      expect(harness.isOpen).toBe(true);

      await harness.hoverOutside();
      await task(POPOVER_HOVER_TIMEOUT + 100);
      await harness.exitAnimation();

      expect(harness.isOpen).toBe(false);
    });
  });

  describe('light dismiss', () => {
    it('should dismiss when clicking outside the popover', async () => {
      const harness = await createFixture({ open: true });

      await harness.clickOutside();
      await harness.exitAnimation();

      expect(harness.isOpen).toBe(false);
    });

    it('should not dismiss when clicking inside the popover', async () => {
      const harness = await createFixture({ open: true });

      await harness.clickSurface();

      expect(harness.isOpen).toBe(true);
    });

    it('should dismiss when pressing the escape key', async () => {
      const harness = await createFixture({ open: true });

      await harness.pressEscapeKey();
      await harness.exitAnimation();

      expect(harness.isOpen).toBe(false);
    });

    it('should not dismiss when pressing the escape key when persistent', async () => {
      const harness = await createFixture({ open: true, persistent: true });

      await harness.pressEscapeKey();

      expect(harness.isOpen).toBe(true);
    });

    it('should not dismiss when clicking inside the popover when persistent', async () => {
      const harness = await createFixture({ open: true, persistent: true });

      await harness.clickSurface();

      expect(harness.isOpen).toBe(true);
    });

    it('should not dismiss when clicking outside the popover when persistent', async () => {
      const harness = await createFixture({ open: true, persistent: true });

      await harness.clickOutside();

      expect(harness.isOpen).toBe(true);
    });

    it('should cancel beforetoggle event when clicking outside', async () => {
      const harness = await createFixture({ open: true });

      const beforeToggleSpy = vi.fn((evt: CustomEvent<IPopoverToggleEventData>) => evt.preventDefault());
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, beforeToggleSpy);

      await harness.clickOutside();

      expect(harness.isOpen).toBe(true);
    });

    it('should cancel beforetoggle event when pressing escape', async () => {
      const harness = await createFixture({ open: true });

      const beforeToggleSpy = vi.fn((evt: CustomEvent<IPopoverToggleEventData>) => evt.preventDefault());
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, beforeToggleSpy);

      await harness.pressEscapeKey();

      expect(harness.isOpen).toBe(true);
    });

    it('should be in the dismissible stack when requesting light dismiss via escape key', async () => {
      const harness = await createFixture({ open: true });

      const requestDismissSpy = vi.spyOn(DismissibleStack.instance, 'requestDismiss');

      await harness.pressEscapeKey();

      expect(requestDismissSpy).toHaveBeenCalledOnce();
      expect(requestDismissSpy.mock.calls[0][0]).toBe(harness.popoverElement);
      expect(requestDismissSpy.mock.calls[0][1]).toEqual({ reason: 'escape' });
      expect(DismissibleStack.instance.isRequestingLightDismiss(harness.popoverElement)).toBe(false);
      requestDismissSpy.mockRestore();
    });

    it('should be in the dismissible stack when requesting light dismiss via clicking outside', async () => {
      const harness = await createFixture({ open: true });

      const requestDismissSpy = vi.spyOn(DismissibleStack.instance, 'requestDismiss');

      await harness.clickOutside();

      expect(requestDismissSpy).toHaveBeenCalledOnce();
      expect(requestDismissSpy.mock.calls[0][0]).toBe(harness.popoverElement);
      expect(requestDismissSpy.mock.calls[0][1]).toEqual({ reason: 'click' });
      expect(DismissibleStack.instance.isRequestingLightDismiss(harness.popoverElement)).toBe(false);
      requestDismissSpy.mockRestore();
    });
  });

  describe('dismissible stack', () => {
    it('should add to the dismissible stack when opened', async () => {
      const harness = await createFixture({ open: true });

      expect(DismissibleStack.instance.has(harness.popoverElement)).toBe(true);
    });

    it('should remove from the dismissible stack when closed', async () => {
      const harness = await createFixture({ open: true });

      await harness.clickTrigger();

      expect(DismissibleStack.instance.has(harness.popoverElement)).toBe(false);
    });

    it('should dismiss when clicking outside the popover', async () => {
      const harness = await createFixture({ open: true });

      expect(DismissibleStack.instance.has(harness.popoverElement)).toBe(true);

      await harness.clickOutside();

      expect(DismissibleStack.instance.has(harness.popoverElement)).toBe(false);
    });

    it('should remove from dismissible queue when removed from DOM', async () => {
      const harness = await createFixture({ open: true });

      expect(DismissibleStack.instance.has(harness.popoverElement)).toBe(true);

      harness.popoverElement.remove();

      expect(DismissibleStack.instance.has(harness.popoverElement)).toBe(false);
    });
  });

  describe('with nested popover', () => {
    it('should add to the dismissible stack when opened', async () => {
      const harness = await createFixture({ open: true });

      expect(DismissibleStack.instance.has(harness.popoverElement)).toBe(true);

      harness.nestedPopoverElement.open = true;

      expect(DismissibleStack.instance.has(harness.popoverElement)).toBe(true);
      expect(DismissibleStack.instance.has(harness.nestedPopoverElement)).toBe(true);
    });

    it('should remove from the dismissible stack when closed', async () => {
      const harness = await createFixture({ open: true });

      expect(DismissibleStack.instance.has(harness.popoverElement)).toBe(true);

      harness.nestedPopoverElement.open = true;

      expect(DismissibleStack.instance.has(harness.popoverElement)).toBe(true);
      expect(DismissibleStack.instance.has(harness.nestedPopoverElement)).toBe(true);

      harness.nestedPopoverElement.open = false;

      expect(DismissibleStack.instance.has(harness.popoverElement)).toBe(true);
      expect(DismissibleStack.instance.has(harness.nestedPopoverElement)).toBe(false);
    });

    it('should dismiss all popovers when clicking outside the parent popover', async () => {
      const harness = await createFixture({ open: true });

      await harness.clickOutside();

      expect(DismissibleStack.instance.has(harness.popoverElement)).toBe(false);
      expect(DismissibleStack.instance.has(harness.nestedPopoverElement)).toBe(false);
    });

    it('should dispatch before toggle event to most recently opened popover first when clicking outside the parent popover', async () => {
      const harness = await createFixture({ open: true });

      const callOrder: string[] = [];
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, () => callOrder.push('parent'));
      harness.nestedPopoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, () => callOrder.push('nested'));

      harness.nestedPopoverElement.open = true;

      await harness.clickOutside();

      expect(callOrder).toEqual(['nested', 'parent']);
    });

    it('should not close when clicking outside the parent popover if beforetoggle event is cancelled on the nested popover', async () => {
      const harness = await createFixture({ open: true });

      harness.nestedPopoverElement.open = true;

      const beforetoggleSpy = vi.fn((evt: CustomEvent<IPopoverToggleEventData>) => evt.preventDefault());
      harness.nestedPopoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, beforetoggleSpy);

      await harness.clickOutside();

      expect(harness.isOpen).toBe(true);
      expect(harness.nestedPopoverElement.open).toBe(true);
    });

    it('should not close when click the parent trigger button if beforetoggle event is cancelled on the nested popover', async () => {
      const harness = await createFixture({ open: true });

      harness.nestedPopoverElement.open = true;
      await frame();

      const beforetoggleSpy = vi.fn((evt: CustomEvent<IPopoverToggleEventData>) => evt.preventDefault());
      harness.nestedPopoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, beforetoggleSpy);

      await harness.clickTrigger();

      expect(harness.isOpen).toBe(true);
      expect(harness.nestedPopoverElement.open).toBe(true);
    });

    it('should close nested popover when clicking outside the nested popover, but inside the parent popover', async () => {
      const harness = await createFixture({ open: true });

      harness.nestedPopoverElement.open = true;

      await harness.clickSurface();
      await harness.exitAnimation();

      expect(harness.isOpen).toBe(true);
      expect(harness.nestedPopoverElement.open).toBe(false);
    });
  });

  describe('arrow', () => {
    it('should not show arrow element by default', async () => {
      const harness = await createFixture({ open: true });

      expect(harness.arrowElement).toBeFalsy();
    });

    it('should show arrow element', async () => {
      const harness = await createFixture({ open: true, arrow: true });

      expect(harness.arrowElement).toBeTruthy();
    });

    it('should remove arrow element when arrow attribute is removed', async () => {
      const harness = await createFixture({ open: true, arrow: true });

      harness.popoverElement.removeAttribute('arrow');

      expect(harness.arrowElement).toBeFalsy();
    });
  });

  describe('focus management', () => {
    it('should focus element with autofocus attribute when opened via keyboard', async () => {
      const harness = await createFixture();

      const autofocusEl = document.createElement('input');
      autofocusEl.setAttribute('autofocus', '');
      harness.popoverElement.appendChild(autofocusEl);

      await harness.keyboardTrigger();

      // Wait two frames internally before attempting to set focus
      await frame();

      expect(document.activeElement).toBe(autofocusEl);
    });

    it('should focus element with autofocus attribute when opened via click', async () => {
      const harness = await createFixture();

      const autofocusEl = document.createElement('input');
      autofocusEl.setAttribute('autofocus', '');
      harness.popoverElement.appendChild(autofocusEl);

      await harness.clickTrigger();

      // Wait two frames internally before attempting to set focus
      await frame();

      expect(document.activeElement).toBe(autofocusEl);
    });

    it('should place focus back on trigger element when closed via escape key after opened via keyboard', async () => {
      const harness = await createFixture();

      const autofocusEl = document.createElement('input');
      autofocusEl.setAttribute('autofocus', '');
      harness.popoverElement.appendChild(autofocusEl);

      await harness.keyboardTrigger();

      // Wait two frames internally before attempting to set focus
      await frame();

      expect(document.activeElement).toBe(autofocusEl);

      await harness.pressEscapeKey();
      await harness.exitAnimation();

      expect(document.activeElement).toBe(harness.triggerElement);
    });

    it('should not place focus back on trigger element when closed via click outside after opened via keyboard', async () => {
      const harness = await createFixture();

      const autofocusEl = document.createElement('input');
      autofocusEl.setAttribute('autofocus', '');
      harness.popoverElement.appendChild(autofocusEl);

      await harness.keyboardTrigger();

      // Wait two frames internally before attempting to set focus
      await frame();

      expect(document.activeElement).toBe(autofocusEl);

      await harness.clickOutside();

      expect(document.activeElement).not.toBe(harness.triggerElement);
    });
  });

  describe('with virtual anchor element', () => {
    it('should open at virtual element position', async () => {
      const harness = await createFixture();

      harness.popoverElement.anchorElement = new VirtualElement(100, 100);
      harness.popoverElement.placement = 'bottom-start';
      harness.popoverElement.open = true;

      await frame();

      const overlayRoot = harness.popoverElement.overlay.shadowRoot?.querySelector(OVERLAY_CONSTANTS.selectors.ROOT) as HTMLElement;

      expect(harness.isOpen).toBe(true);
      expect(overlayRoot.style.translate).toBe('100px 100px');
    });
  });

  describe('anchor accessibility', () => {
    it('should have default anchor accessibility value of auto', async () => {
      const harness = await createFixture();

      expect(harness.popoverElement.anchorAccessibility).toBe('auto');
    });

    it('should set anchor accessibility via attribute', async () => {
      const harness = await createFixture({ anchorAccessibility: 'none' });

      expect(harness.popoverElement.anchorAccessibility).toBe('none');
      expect(harness.popoverElement.getAttribute(POPOVER_CONSTANTS.attributes.ANCHOR_ACCESSIBILITY)).toBe('none');
    });

    it('should set anchor accessibility via property', async () => {
      const harness = await createFixture();

      harness.popoverElement.anchorAccessibility = 'none';

      expect(harness.popoverElement.anchorAccessibility).toBe('none');
      expect(harness.popoverElement.getAttribute(POPOVER_CONSTANTS.attributes.ANCHOR_ACCESSIBILITY)).toBe('none');
    });

    it('should remove anchor accessibility attribute when setting to default value', async () => {
      const harness = await createFixture({ anchorAccessibility: 'none' });

      expect(harness.popoverElement.anchorAccessibility).toBe('none');
      expect(harness.popoverElement.getAttribute(POPOVER_CONSTANTS.attributes.ANCHOR_ACCESSIBILITY)).toBe('none');

      harness.popoverElement.anchorAccessibility = 'auto';

      expect(harness.popoverElement.anchorAccessibility).toBe('auto');
      expect(harness.popoverElement.getAttribute(POPOVER_CONSTANTS.attributes.ANCHOR_ACCESSIBILITY)).toBe('auto');
    });

    it('should set aria-expanded on anchor element when anchor accessibility is auto', async () => {
      const harness = await createFixture({ anchorAccessibility: 'auto' });

      expect(harness.triggerElement.getAttribute('aria-expanded')).toBe('false');

      await harness.clickTrigger();

      expect(harness.triggerElement.getAttribute('aria-expanded')).toBe('true');

      await harness.clickTrigger();
      await harness.exitAnimation();

      expect(harness.triggerElement.getAttribute('aria-expanded')).toBe('false');
    });

    it('should not set aria-expanded on anchor element when anchor accessibility is none', async () => {
      const harness = await createFixture({ anchorAccessibility: 'none' });

      expect(harness.triggerElement.hasAttribute('aria-expanded')).toBe(false);

      await harness.clickTrigger();

      expect(harness.triggerElement.hasAttribute('aria-expanded')).toBe(false);

      await harness.clickTrigger();
      await harness.exitAnimation();

      expect(harness.triggerElement.hasAttribute('aria-expanded')).toBe(false);
    });
  });

  describe('distinct', () => {
    it('should have distinct property null by default', async () => {
      const harness = await createFixture();

      expect(harness.popoverElement.distinct).toBeNull();
      expect(harness.popoverElement.hasAttribute(POPOVER_CONSTANTS.attributes.DISTINCT)).toBe(false);
    });

    it('should set distinct property when setting attribute', async () => {
      const harness = await createFixture();

      harness.popoverElement.setAttribute(POPOVER_CONSTANTS.attributes.DISTINCT, 'test-context');

      expect(harness.popoverElement.distinct).toBe('test-context');
    });

    it('should close other popovers with the same distinct value when opening', async () => {
      const distinctName = 'test-context';
      const firstHarness = await createFixture({ distinct: distinctName });
      const secondHarness = await createFixture({ distinct: distinctName });

      await firstHarness.clickTrigger();
      expect(firstHarness.isOpen).toBe(true);

      await secondHarness.clickTrigger();
      await firstHarness.exitAnimation();

      expect(firstHarness.isOpen).toBe(false);
      expect(secondHarness.isOpen).toBe(true);
    });

    it('should close other popovers with the same distinct value when opening via hover trigger type', async () => {
      const distinctName = 'test-context';
      const firstHarness = await createFixture({ distinct: distinctName, triggerType: 'hover' });
      const secondHarness = await createFixture({ distinct: distinctName, triggerType: 'hover' });

      await firstHarness.hoverTrigger();
      expect(firstHarness.isOpen).toBe(true);

      await firstHarness.hoverOutside();
      await secondHarness.hoverTrigger();
      await firstHarness.exitAnimation();

      expect(firstHarness.isOpen).toBe(false);
      expect(secondHarness.isOpen).toBe(true);
    });

    it('should not close popovers with different distinct values', async () => {
      const firstHarness = await createFixture({ triggerType: 'hover', hoverDismissDelay: 5000, distinct: 'context-1' });
      const secondHarness = await createFixture({ triggerType: 'hover', distinct: 'context-2' });

      await firstHarness.hoverTrigger();
      expect(firstHarness.isOpen).toBe(true);

      await secondHarness.hoverTrigger();
      await firstHarness.exitAnimation();

      expect(firstHarness.isOpen).toBe(true);
      expect(secondHarness.isOpen).toBe(true);
    });

    it('should not close popovers without distinct values', async () => {
      const firstHarness = await createFixture({ triggerType: 'hover', hoverDismissDelay: 5000 });
      const secondHarness = await createFixture({ triggerType: 'hover', distinct: 'test-context' });

      await firstHarness.hoverTrigger();
      expect(firstHarness.isOpen).toBe(true);

      await secondHarness.hoverTrigger();
      await firstHarness.exitAnimation();

      expect(firstHarness.isOpen).toBe(true);
      expect(secondHarness.isOpen).toBe(true);
    });

    it('should not close itself when reopening', async () => {
      const harness = await createFixture({ distinct: 'test-context', open: true });

      expect(harness.isOpen).toBe(true);

      await harness.clickTrigger();
      await harness.exitAnimation();
      expect(harness.isOpen).toBe(false);

      await harness.clickTrigger();
      expect(harness.isOpen).toBe(true);
    });

    it('should use default group context when distinct attribute is empty', async () => {
      const firstHarness = await createFixture({ distinct: '' });
      const secondHarness = await createFixture({ distinct: '' });

      expect(firstHarness.popoverElement.distinct).toBe('');
      expect(secondHarness.popoverElement.distinct).toBe('');

      await firstHarness.clickTrigger();
      expect(firstHarness.isOpen).toBe(true);

      await secondHarness.clickTrigger();
      await firstHarness.exitAnimation();

      expect(firstHarness.isOpen).toBe(false);
      expect(secondHarness.isOpen).toBe(true);
    });
  });
});

class PopoverHarness {
  constructor(
    public popoverElement: IPopoverComponent,
    public nestedPopoverElement: IPopoverComponent,
    public triggerElement: HTMLButtonElement,
    public altTriggerElement: HTMLButtonElement,
    public contentButton: HTMLButtonElement
  ) {}

  public get surfaceElement(): HTMLElement {
    return this.popoverElement.shadowRoot?.querySelector(POPOVER_CONSTANTS.selectors.SURFACE) as HTMLElement;
  }

  public get arrowElement(): HTMLElement {
    return this.popoverElement.shadowRoot?.querySelector(`.${POPOVER_CONSTANTS.classes.ARROW}`) as HTMLElement;
  }

  public get isOpen(): boolean {
    return this.popoverElement.open && this.popoverElement.hasAttribute(POPOVER_CONSTANTS.attributes.OPEN) && this.popoverElement.overlay.open;
  }

  public async clickOutside(): Promise<void> {
    const { x, y, height, width } = this.surfaceElement.getBoundingClientRect();
    const outsideX = Math.round(x + width * 2);
    const outsideY = Math.round(y + height * 2);
    const outsideElement = document.elementFromPoint(outsideX, outsideY) as HTMLElement;
    if (outsideElement) {
      await userEvent.click(outsideElement);
    } else {
      document.body.dispatchEvent(new MouseEvent('click', { bubbles: true, clientX: outsideX, clientY: outsideY }));
    }
  }

  public async clickTrigger(): Promise<void> {
    await userEvent.click(this.triggerElement);
  }

  public async keyboardTrigger(): Promise<void> {
    this.triggerElement.focus();
    await userEvent.keyboard('{Enter}');
  }

  public async clickSurface(): Promise<void> {
    await userEvent.click(this.surfaceElement);
  }

  public async hoverSurface(): Promise<void> {
    await userEvent.hover(this.surfaceElement);
  }

  public async hoverOutside(): Promise<void> {
    await userEvent.unhover(this.surfaceElement);
    await userEvent.unhover(this.triggerElement);
  }

  public async hoverTrigger(): Promise<void> {
    await userEvent.hover(this.triggerElement);
  }

  public async longpressTrigger(delay = LONGPRESS_TRIGGER_DELAY): Promise<void> {
    const rect = this.triggerElement.getBoundingClientRect();
    const clientX = rect.x + rect.width / 2;
    const clientY = rect.y + rect.height / 2;
    this.triggerElement.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX, clientY, pointerId: 1 }));
    await task(delay + 50);
    this.triggerElement.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, clientX, clientY, pointerId: 1 }));
  }

  public async longpressStopBeforeDelay(): Promise<void> {
    const rect = this.triggerElement.getBoundingClientRect();
    const clientX = rect.x + rect.width / 2;
    const clientY = rect.y + rect.height / 2;
    this.triggerElement.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX, clientY, pointerId: 1 }));
    await task(LONGPRESS_TRIGGER_DELAY / 2);
    this.triggerElement.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, clientX, clientY, pointerId: 1 }));
  }

  public focusTrigger(): void {
    this.triggerElement.focus();
  }

  public blurTrigger(): void {
    this.triggerElement.blur();
  }

  public async doubleClickTrigger(): Promise<void> {
    await userEvent.dblClick(this.triggerElement);
  }

  public async pressEscapeKey(): Promise<void> {
    await userEvent.keyboard('{Escape}');
  }

  public exitAnimation(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, EXIT_ANIMATION_DURATION));
  }
}

interface IPopoverFixtureConfig {
  open?: boolean;
  persistent?: boolean;
  arrow?: boolean;
  anchor?: string;
  animationType?: PopoverAnimationType;
  triggerType?: PopoverTriggerType;
  persistentHover?: boolean;
  hoverDelay?: number;
  hoverDismissDelay?: number;
  preset?: PopoverPreset;
  distinct?: string | null;
  anchorAccessibility?: PopoverAnchorAccessibility;
}

async function createFixture({
  open = false,
  persistent = false,
  arrow = false,
  anchor,
  animationType,
  triggerType,
  persistentHover = false,
  hoverDelay,
  hoverDismissDelay,
  preset,
  distinct,
  anchorAccessibility
}: IPopoverFixtureConfig = {}): Promise<PopoverHarness> {
  const screen = render(html`
    <div style="display: flex; justify-content: center; align-items: center; height: 300px; width: 300px;">
      <button type="button" id="alt-trigger">Alternative trigger</button>
      <button type="button" id="test-trigger">Popover Trigger</button>
      <forge-popover
        anchor=${anchor ?? nothing}
        ?open=${open}
        ?persistent=${persistent}
        ?arrow=${arrow}
        ?persistent-hover=${persistentHover}
        hover-delay=${hoverDelay ?? nothing}
        hover-dismiss-delay=${hoverDismissDelay ?? nothing}
        animation-type=${animationType ?? nothing}
        trigger-type=${triggerType ?? nothing}
        preset=${preset ?? nothing}
        distinct=${distinct ?? nothing}
        anchor-accessibility=${anchorAccessibility ?? nothing}>
        <span>Test popover content</span>
        <button type="button" id="content-button" style="pointer-events: none;">Button</button>
        <forge-popover id="nested-popover">Nested popover</forge-popover>
      </forge-popover>
    </div>
  `);

  const triggerEl = screen.container.querySelector('#test-trigger') as HTMLButtonElement;
  const altTriggerEl = screen.container.querySelector('#alt-trigger') as HTMLButtonElement;
  const popoverEl = screen.container.querySelector('forge-popover') as IPopoverComponent;
  const nestedPopoverEl = screen.container.querySelector('#nested-popover') as IPopoverComponent;
  const contentButton = screen.container.querySelector('#content-button') as HTMLButtonElement;

  return new PopoverHarness(popoverEl, nestedPopoverEl, triggerEl, altTriggerEl, contentButton);
}
