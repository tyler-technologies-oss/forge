import { expect } from '@esm-bundle/chai';
import { spy } from 'sinon';
import { nothing } from 'lit';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { sendMouse, sendKeys } from '@web/test-runner-commands';
import { timer } from '@tylertech/forge-testing';
import { IPopoverToggleEventData, PopoverAnimationType, PopoverTriggerType, POPOVER_CONSTANTS, POPOVER_HOVER_TIMEOUT } from './popover-constants';
import { LONGPRESS_TRIGGER_DELAY } from '../core/mixins/interactions/longpress/with-longpress-listener';
import type { IPopoverComponent } from './popover';
import type { IOverlayComponent } from '../overlay/overlay';
import { DismissibleStack } from '../core/utils/dismissible-stack';
import { OVERLAY_CONSTANTS } from '../overlay';
import { VirtualElement } from '../core/utils/position-utils';

import './popover';

describe('Popover', () => {
  afterEach(async () => {
    // Always reset mouse position to avoid initial hover state issues when a test starts
    await sendMouse({ type: 'move', position: [0, 0] });
  });

  describe('defaults', () => {
    it('should have expected default values', async () => {
      const harness = await createFixture();

      expect(harness.popoverElement.open).to.be.false;
      expect(harness.popoverElement.persistent).to.be.false;
      expect(harness.popoverElement.arrow).to.be.false;
      expect(harness.popoverElement.animationType).to.equal('zoom');
      expect(harness.popoverElement.triggerType).to.equal('click');
      expect(harness.popoverElement.longpressDelay).to.equal(LONGPRESS_TRIGGER_DELAY);
      expect(harness.popoverElement.persistentHover).to.be.false;
      expect(harness.popoverElement.hoverDismissDelay).to.equal(POPOVER_HOVER_TIMEOUT);
    });

    it('should provide internal overlay element reference', async () => {
      const harness = await createFixture();

      const shadowOverlay = harness.popoverElement.shadowRoot?.querySelector('forge-overlay') as IOverlayComponent;
      expect(harness.popoverElement.overlay).to.equal(shadowOverlay);
    });

    it('should not be open by default', async () => {
      const harness = await createFixture();

      expect(harness.isOpen).to.be.false;
    });

    it('should open by default with open attribute', async () => {
      const harness = await createFixture({ open: true });

      expect(harness.isOpen).to.be.true;
    });
  });

  describe('animation type', () => {
    it('should have default fade + zoom animation type', async () => {
      const harness = await createFixture();

      expect(harness.popoverElement.animationType).to.equal('zoom');
      expect(getComputedStyle(harness.surfaceElement).animationName).to.equal('fadein, zoomin');
    });

    it('should set slide animation type', async () => {
      const harness = await createFixture({ animationType: 'slide' });

      expect(harness.popoverElement.animationType).to.equal('slide');
      expect(getComputedStyle(harness.surfaceElement).animationName).to.equal('fadein, slidein');
    });

    it('should set fade animation type', async () => {
      const harness = await createFixture({ animationType: 'fade' });

      expect(harness.popoverElement.animationType).to.equal('fade');
      expect(getComputedStyle(harness.surfaceElement).animationName).to.equal('fadein');
    });
    
    it('should set none animation type', async () => {
      const harness = await createFixture({ animationType: 'none' });

      expect(harness.popoverElement.animationType).to.equal('none');
      expect(getComputedStyle(harness.surfaceElement).animationName).to.equal('none');
    });
  });

  describe('overlay aware', () => {
    it('should set inline', async () => {
      const harness = await createFixture();
      harness.popoverElement.inline = true;

      expect(harness.popoverElement.inline).to.be.true;
      expect(harness.popoverElement.overlay.inline).to.be.true;
    });

    it('should proxy placement', async () => {
      const harness = await createFixture();

      harness.popoverElement.placement = 'right';

      expect(harness.popoverElement.placement).to.equal('right');
      expect(harness.popoverElement.overlay.placement).to.equal('right');
      expect(harness.popoverElement.getAttribute(OVERLAY_CONSTANTS.attributes.PLACEMENT)).to.equal('right');
    });

    it('should proxy position strategy', async () => {
      const harness = await createFixture();

      harness.popoverElement.positionStrategy = 'absolute';

      expect(harness.popoverElement.positionStrategy).to.equal('absolute');
      expect(harness.popoverElement.overlay.positionStrategy).to.equal('absolute');
      expect(harness.popoverElement.getAttribute(OVERLAY_CONSTANTS.attributes.POSITION_STRATEGY)).to.equal('absolute');
    });

    it('should proxy offset', async () => {
      const harness = await createFixture();

      const offset = { mainAxis: 10 };
      harness.popoverElement.offset = offset;

      expect(harness.popoverElement.offset).to.deep.equal(offset);
      expect(harness.popoverElement.overlay.offset).to.deep.equal(offset);
      expect(harness.popoverElement.hasAttribute('offset')).to.be.false;
    });

    it('should proxy hide', async () => {
      const harness = await createFixture();

      harness.popoverElement.hide = 'never';

      expect(harness.popoverElement.hide).to.equal('never');
      expect(harness.popoverElement.overlay.hide).to.equal('never');
      expect(harness.popoverElement.getAttribute(OVERLAY_CONSTANTS.attributes.HIDE)).to.equal('never');
    });

    it('should proxy persistent', async () => {
      const harness = await createFixture();

      harness.popoverElement.persistent = true;

      expect(harness.popoverElement.persistent).to.be.true;
      expect(harness.popoverElement.overlay.persistent).to.be.true;
      expect(harness.popoverElement.hasAttribute(OVERLAY_CONSTANTS.attributes.PERSISTENT)).to.be.true;
    });

    it('should proxy shift', async () => {
      const harness = await createFixture();

      harness.popoverElement.shift = true;

      expect(harness.popoverElement.shift).to.be.true;
      expect(harness.popoverElement.overlay.shift).to.be.true;
      expect(harness.popoverElement.hasAttribute(OVERLAY_CONSTANTS.attributes.SHIFT)).to.be.true;
    });

    it('should proxy flip', async () => {
      const harness = await createFixture();

      harness.popoverElement.flip = 'main';

      expect(harness.popoverElement.flip).to.equal('main');
      expect(harness.popoverElement.overlay.flip).to.equal('main');
      expect(harness.popoverElement.getAttribute(OVERLAY_CONSTANTS.attributes.FLIP)).to.equal('main');
    });

    it('should proxy boundary', async () => {
      const harness = await createFixture();

      const elId = 'some-element-id';
      harness.popoverElement.boundary = elId;

      expect(harness.popoverElement.boundary).to.equal(elId);
      expect(harness.popoverElement.overlay.boundary).to.equal(elId);
      expect(harness.popoverElement.getAttribute(OVERLAY_CONSTANTS.attributes.BOUNDARY)).to.equal(elId);
    });

    it('should proxy boundary element', async () => {
      const harness = await createFixture();

      const boundaryEl = document.createElement('div');

      harness.popoverElement.boundaryElement = boundaryEl;

      expect(harness.popoverElement.boundaryElement).to.equal(boundaryEl);
      expect(harness.popoverElement.overlay.boundaryElement).to.equal(boundaryEl);
    });

    it('should proxy fallback placements', async () => {
      const harness = await createFixture();

      harness.popoverElement.fallbackPlacements = ['top', 'bottom'];

      expect(harness.popoverElement.fallbackPlacements).to.deep.equal(['top', 'bottom']);
      expect(harness.popoverElement.overlay.fallbackPlacements).to.deep.equal(['top', 'bottom']);
    });

    it('should proxy position() to overlay', async () => {
      const harness = await createFixture();

      const positionSpy = spy(harness.popoverElement.overlay, 'position');

      harness.popoverElement.position();
      positionSpy.restore();

      expect(positionSpy).to.have.been.calledOnce;
    });

    it('should proxy anchorElement', async () => {
      const harness = await createFixture();

      harness.popoverElement.anchorElement = harness.altTriggerElement;

      expect(harness.popoverElement.anchorElement).to.equal(harness.altTriggerElement);
      expect(harness.popoverElement.overlay.anchorElement).to.equal(harness.altTriggerElement);
    });

    it('should proxy anchor', async () => {
      const harness = await createFixture();

      harness.popoverElement.anchor = harness.altTriggerElement.id;

      expect(harness.popoverElement.anchor).to.equal(harness.altTriggerElement.id);
      expect(harness.popoverElement.overlay.anchorElement).to.equal(harness.altTriggerElement);
    });

    it('should proxy open', async () => {
      const harness = await createFixture();

      harness.popoverElement.open = true;

      expect(harness.popoverElement.open).to.be.true;
      expect(harness.popoverElement.overlay.open).to.be.true;
      expect(harness.popoverElement.hasAttribute(OVERLAY_CONSTANTS.attributes.OPEN)).to.be.true;
    });
  });

  describe('events', () => {
    it('should dispatch beforetoggle event when opening', async () => {
      const harness = await createFixture();

      const beforeToggleSpy = spy();
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, beforeToggleSpy);

      await harness.clickTrigger();

      expect(beforeToggleSpy).to.have.been.calledOnce;
      expect(beforeToggleSpy.firstCall.args[0].detail).to.deep.equal({ oldState: 'closed', newState: 'open' });
    });

    it('should dispatch beforetoggle event when closing', async () => {
      const harness = await createFixture({ open: true });

      const beforeToggleSpy = spy();
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, beforeToggleSpy);

      await harness.clickTrigger();

      expect(beforeToggleSpy).to.have.been.calledOnce;
      expect(beforeToggleSpy.firstCall.args[0].detail).to.deep.equal({ oldState: 'open', newState: 'closed' });
    });

    it('should dispatch toggle event when opening', async () => {
      const harness = await createFixture();

      const toggleSpy = spy();
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.TOGGLE, toggleSpy);

      await harness.clickTrigger();

      expect(toggleSpy).to.have.been.calledOnce;
      expect(toggleSpy.firstCall.args[0].detail).to.deep.equal({ oldState: 'closed', newState: 'open' });
    });

    it('should dispatch toggle event when closing', async () => {
      const harness = await createFixture({ open: true });

      const toggleSpy = spy();
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.TOGGLE, toggleSpy);

      await harness.clickTrigger();

      expect(toggleSpy).to.have.been.calledOnce;
      expect(toggleSpy.firstCall.args[0].detail).to.deep.equal({ oldState: 'open', newState: 'closed' });
    });

    it('should cancel beforetoggle event when calling preventDefault to open', async () => {
      const harness = await createFixture();

      const beforeToggleSpy = spy((evt: CustomEvent<IPopoverToggleEventData>) => evt.preventDefault());
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, beforeToggleSpy);

      await harness.clickTrigger();

      expect(harness.isOpen).to.be.false;
    });

    it('should cancel beforetoggle event when calling preventDefault to close', async () => {
      const harness = await createFixture({ open: true });

      const beforeToggleSpy = spy((evt: CustomEvent<IPopoverToggleEventData>) => evt.preventDefault());
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, beforeToggleSpy);

      await harness.clickTrigger();

      expect(harness.isOpen).to.be.true;
    });

    it('should not cancel toggle event when calling preventDefault to open', async () => {
      const harness = await createFixture();

      const toggleSpy = spy((evt: CustomEvent<IPopoverToggleEventData>) => evt.preventDefault());
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.TOGGLE, toggleSpy);

      await harness.clickTrigger();

      expect(harness.isOpen).to.be.true;
    });

    it('should not cancel toggle event when calling preventDefault to close', async () => {
      const harness = await createFixture({ open: true });

      const toggleSpy = spy((evt: CustomEvent<IPopoverToggleEventData>) => evt.preventDefault());
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.TOGGLE, toggleSpy);

      await harness.clickTrigger();

      expect(harness.isOpen).to.be.false;
    });

    it('should dispatch before toggle event before toggle event when opening', async () => {
      const harness = await createFixture();

      const beforeToggleSpy = spy();
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, beforeToggleSpy);

      const toggleSpy = spy();
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.TOGGLE, toggleSpy);

      await harness.clickTrigger();

      expect(beforeToggleSpy).to.have.been.calledBefore(toggleSpy);
    });

    it('should not dispatch toggle event when before toggle event is cancelled when opening', async () => {
      const harness = await createFixture();

      const beforeToggleSpy = spy((evt: CustomEvent<IPopoverToggleEventData>) => evt.preventDefault());
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, beforeToggleSpy);

      const toggleSpy = spy();
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.TOGGLE, toggleSpy);

      await harness.clickTrigger();

      expect(toggleSpy).to.not.have.been.called;
    });

    it('should dispatch toggle event when before toggle event is not cancelled when closing', async () => {
      const harness = await createFixture({ open: true });

      const beforeToggleSpy = spy();
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, beforeToggleSpy);

      const toggleSpy = spy();
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.TOGGLE, toggleSpy);

      await harness.clickTrigger();

      expect(toggleSpy).to.have.been.calledOnce;
    });

    it('should not dispatch events when setting open property manually', async () => {
      const harness = await createFixture();

      const beforeToggleSpy = spy();
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, beforeToggleSpy);

      const toggleSpy = spy();
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.TOGGLE, toggleSpy);

      harness.popoverElement.open = true;
      harness.popoverElement.open = false;

      expect(beforeToggleSpy).to.not.have.been.called;
      expect(toggleSpy).to.not.have.been.called;
    });

    it('should not dispatch events when setting open attribute manually', async () => {
      const harness = await createFixture();

      const beforeToggleSpy = spy();
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, beforeToggleSpy);

      const toggleSpy = spy();
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.TOGGLE, toggleSpy);

      harness.popoverElement.setAttribute(POPOVER_CONSTANTS.attributes.OPEN, '');
      harness.popoverElement.removeAttribute(POPOVER_CONSTANTS.attributes.OPEN);

      expect(beforeToggleSpy).to.not.have.been.called;
      expect(toggleSpy).to.not.have.been.called;
    });
  });

  describe('anchor', () => {
    it('should anchor to the trigger button implicitly (previous element sibling)', async () => {
      const harness = await createFixture({ open: true });

      expect(harness.popoverElement.anchorElement).to.equal(harness.popoverElement.previousElementSibling);
      expect(harness.popoverElement.previousElementSibling).to.equal(harness.triggerElement);
    });

    it('should set the anchor element via IDREF', async () => {
      const harness = await createFixture({ open: true, anchor: 'alt-trigger' });

      expect(harness.popoverElement.anchorElement).to.equal(harness.altTriggerElement);

      harness.popoverElement.anchor = harness.triggerElement.id;
      expect(harness.popoverElement.anchorElement).to.equal(harness.triggerElement);
    });

    it('should set anchor to previous element sibling when anchor element is set to null', async () => {
      const harness = await createFixture({ open: true, anchor: 'alt-trigger' });

      expect(harness.popoverElement.anchorElement).to.equal(harness.altTriggerElement);

      harness.popoverElement.anchor = null;
      expect(harness.popoverElement.anchorElement).to.be.equal(harness.popoverElement.previousElementSibling);
    });

    it('should anchor to the trigger button explicitly', async () => {
      const harness = await createFixture({ open: true, anchor: 'alt-trigger' });

      expect(harness.popoverElement.overlay.anchorElement).to.equal(harness.altTriggerElement);

      harness.popoverElement.anchorElement = harness.triggerElement;
      expect(harness.popoverElement.overlay.anchorElement).to.equal(harness.triggerElement);
    });

    it('should not set anchor element if no anchor id is provided and there are no implicit siblings', async () => {
      const el = await fixture<IPopoverComponent>(html`<forge-popover></forge-popover>`);

      expect(el.anchorElement).to.be.null;
    });
  });

  describe('click trigger type', () => {
    it('should open when clicking the trigger button by default', async () => {
      const harness = await createFixture();

      await harness.clickTrigger();

      expect(harness.isOpen).to.be.true;
    });

    it('should close when clicking the trigger button', async () => {
      const harness = await createFixture({ open: true });

      await harness.clickTrigger();

      expect(harness.isOpen).to.be.false;
    });

    it('should open and close when clicking the trigger button', async () => {
      const harness = await createFixture();

      await harness.clickTrigger();
      expect(harness.isOpen).to.be.true;

      await harness.clickTrigger();
      expect(harness.isOpen).to.be.false;
    });

    it('should not open when clicking the trigger button when disabled', async () => {
      const harness = await createFixture();

      harness.triggerElement.disabled = true;
      await harness.clickTrigger();

      expect(harness.isOpen).to.be.false;
    });

    it('should not open when clicking the trigger button if before toggle event is cancelled', async () => {
      const harness = await createFixture();

      expect(harness.isOpen).to.be.false;

      const beforeToggleSpy = spy((evt: CustomEvent<IPopoverToggleEventData>) => evt.preventDefault());
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, beforeToggleSpy);

      await harness.clickTrigger();

      expect(harness.isOpen).to.be.false;
    });

    it('should not close when clicking the trigger button if toggle event is cancelled', async () => {
      const harness = await createFixture({ open: true });

      expect(harness.isOpen).to.be.true;

      const toggleSpy = spy((evt: CustomEvent<IPopoverToggleEventData>) => evt.preventDefault());
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, toggleSpy);

      await harness.clickTrigger();

      expect(harness.isOpen).to.be.true;
    });
  });

  describe('focus trigger type', () => {
    it('should open when focusing the trigger button', async () => {
      const harness = await createFixture({ triggerType: 'focus' });

      harness.focusTrigger();

      expect(harness.isOpen).to.be.true;
    });

    it('should open and close when focusing and blurring the trigger button', async () => {
      const harness = await createFixture({ triggerType: 'focus' });

      harness.focusTrigger();
      expect(harness.isOpen).to.be.true;

      await harness.blurTrigger();
      expect(harness.isOpen).to.be.false;
    });

    it('should not open when focusing the trigger if before toggle event is cancelled', async () => {
      const harness = await createFixture({ triggerType: 'focus' });

      expect(harness.isOpen).to.be.false;

      const beforeToggleSpy = spy((evt: CustomEvent<IPopoverToggleEventData>) => evt.preventDefault());
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, beforeToggleSpy);

      harness.focusTrigger();

      expect(harness.isOpen).to.be.false;
    });

    it('should not close when blurring the trigger if toggle event is cancelled', async () => {
      const harness = await createFixture({ open: true, triggerType: 'focus' });

      expect(harness.isOpen).to.be.true;

      const toggleSpy = spy((evt: CustomEvent<IPopoverToggleEventData>) => evt.preventDefault());
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, toggleSpy);

      await harness.blurTrigger();

      expect(harness.isOpen).to.be.true;
    });

    it('should allow focusing element inside content without closing', async () => {
      const harness = await createFixture({ triggerType: 'focus' });

      harness.focusTrigger();
      expect(harness.isOpen).to.be.true;

      await sendKeys({ press: 'Tab' });

      expect(document.activeElement).to.equal(harness.contentButton);
      expect(harness.isOpen).to.be.true;
    });

    it('should close when blurring element inside content to an element outside of content', async () => {
      const harness = await createFixture({ triggerType: 'focus' });

      harness.focusTrigger();
      expect(harness.isOpen).to.be.true;
      
      await sendKeys({ press: 'Tab' });
      expect(harness.isOpen).to.be.true;

      await sendKeys({ press: 'Tab' });

      expect(document.activeElement).not.to.equal(harness.triggerElement);
      expect(document.activeElement).not.to.equal(harness.contentButton);
      expect(harness.isOpen).to.be.false;
    });

    it('should not close if tabbing from content to trigger', async () => {
      const harness = await createFixture({ triggerType: 'focus' });

      harness.focusTrigger();
      expect(harness.isOpen).to.be.true;
      
      await sendKeys({ press: 'Tab' });
      expect(harness.isOpen).to.be.true;

      await sendKeys({ down: 'Shift' });
      await sendKeys({ press: 'Tab' });
      await sendKeys({ up: 'Shift' });

      expect(document.activeElement).to.equal(harness.triggerElement);
      expect(harness.isOpen).to.be.true;
    });
  });

  describe('hover trigger type', () => {
    it('should open when hovering the trigger button', async () => {
      const harness = await createFixture({ triggerType: 'hover' });

      expect(harness.isOpen).to.be.false;

      await harness.hoverTrigger();

      expect(harness.isOpen).to.be.true;
    });

    it('should open and close when hovering and unhovering the trigger button', async () => {
      const harness = await createFixture({ triggerType: 'hover' });

      await harness.hoverTrigger();
      expect(harness.isOpen).to.be.true;
      
      await harness.hoverOutside();
      await timer(POPOVER_HOVER_TIMEOUT + 100);

      expect(harness.isOpen).to.be.false;
    });

    it('should not close after open when hovering and unhovering the trigger and popover before the hover timeout', async () => {
      const harness = await createFixture({ triggerType: 'hover' });

      expect(harness.isOpen).to.be.false;

      await harness.hoverTrigger();
      expect(harness.isOpen).to.be.true;

      await harness.hoverOutside();
      await timer(POPOVER_HOVER_TIMEOUT / 4);
      await harness.hoverTrigger();
      await harness.hoverSurface();
      await timer(POPOVER_HOVER_TIMEOUT + 100);

      expect(harness.isOpen).to.be.true;
    });

    it('should not open when hovering the trigger button if before toggle event is cancelled', async () => {
      const harness = await createFixture({ triggerType: 'hover' });

      expect(harness.isOpen).to.be.false;

      const beforeToggleSpy = spy((evt: CustomEvent<IPopoverToggleEventData>) => evt.preventDefault());
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, beforeToggleSpy);

      await harness.hoverTrigger();

      expect(harness.isOpen).to.be.false;
    });

    it('should not close when unhovering the trigger button if toggle event is cancelled', async () => {
      const harness = await createFixture({ open: true, triggerType: 'hover' });

      expect(harness.isOpen).to.be.true;

      const toggleSpy = spy((evt: CustomEvent<IPopoverToggleEventData>) => evt.preventDefault());
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, toggleSpy);

      await harness.hoverOutside();

      expect(harness.isOpen).to.be.true;
    });

    it('should close if unhovering the surface after the hover timeout', async () => {
      const harness = await createFixture({ triggerType: 'hover' });

      expect(harness.isOpen).to.be.false;

      await harness.hoverTrigger();
      expect(harness.isOpen).to.be.true;

      await harness.hoverSurface();
      await elementUpdated(harness.popoverElement);
      await harness.hoverOutside();
      await timer(POPOVER_HOVER_TIMEOUT + 100);

      expect(harness.isOpen).to.be.false;
    });

    it('should use custom hover dismiss delay', async () => {
      const harness = await createFixture({ triggerType: 'hover' });

      const customDelay = 100;
      harness.popoverElement.hoverDismissDelay = customDelay;
      
      expect(harness.popoverElement.hoverDismissDelay).to.equal(customDelay);
      expect(harness.isOpen).to.be.false;

      await harness.hoverTrigger();
      expect(harness.isOpen).to.be.true;

      await harness.hoverOutside();
      await timer(customDelay + 100);

      expect(harness.isOpen).to.be.false;
    });

    it('should not close if persistent hover is enabled', async () => {
      const harness = await createFixture({ triggerType: 'hover', persistentHover: true });

      expect(harness.isOpen).to.be.false;

      await harness.hoverTrigger();
      expect(harness.isOpen).to.be.true;

      await harness.hoverOutside();
      await timer(POPOVER_HOVER_TIMEOUT + 100);

      expect(harness.isOpen).to.be.true;
    });

    it('should not close if persistent hover is updated dynamically while the popover is open', async () => {
      const harness = await createFixture({ triggerType: 'hover' });

      expect(harness.isOpen).to.be.false;

      await harness.hoverTrigger();
      expect(harness.isOpen).to.be.true;

      harness.popoverElement.persistentHover = true;
      await harness.hoverOutside();
      await timer(POPOVER_HOVER_TIMEOUT + 100);

      expect(harness.isOpen).to.be.true;
    });
  });

  describe('longpress trigger type', () => {
    it('should open when longpressing the trigger button', async () => {
      const harness = await createFixture({ triggerType: 'longpress' });

      await harness.longpressTrigger();

      expect(harness.isOpen).to.be.true;
    });

    it('should close by click outside after longpressing to open', async () => {
      const harness = await createFixture({ triggerType: 'longpress' });

      await harness.longpressTrigger();
      expect(harness.isOpen).to.be.true;

      await harness.clickOutside();
      expect(harness.isOpen).to.be.false;
    });

    it('should not open when releasing the trigger button before the longpress delay', async () => {
      const harness = await createFixture({ triggerType: 'longpress' });

      await harness.longpressStopBeforeDelay();
      expect(harness.isOpen).to.be.false;
    });

    it('should not open when longpressing the trigger button if before toggle event is cancelled', async () => {
      const harness = await createFixture({ triggerType: 'longpress' });

      expect(harness.isOpen).to.be.false;

      const beforeToggleSpy = spy((evt: CustomEvent<IPopoverToggleEventData>) => evt.preventDefault());
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, beforeToggleSpy);

      await harness.longpressTrigger();

      expect(harness.isOpen).to.be.false;
    });

    it('should not close when clicking outside the popover if toggle event is cancelled', async () => {
      const harness = await createFixture({ open: true, triggerType: 'longpress' });

      expect(harness.isOpen).to.be.true;

      const toggleSpy = spy((evt: CustomEvent<IPopoverToggleEventData>) => evt.preventDefault());
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, toggleSpy);

      await harness.clickOutside();

      expect(harness.isOpen).to.be.true;
    });

    it('should use custom longpress delay', async () => {
      const harness = await createFixture({ triggerType: 'longpress' });

      const customDelay = 100;
      harness.popoverElement.longpressDelay = customDelay;
      
      expect(harness.popoverElement.longpressDelay).to.equal(customDelay);
      expect(harness.isOpen).to.be.false;

      await harness.longpressTrigger(customDelay);
      expect(harness.isOpen).to.be.true;
    });
  });

  describe('double click trigger type', () => {
    it('should open when double clicking the trigger button', async () => {
      const harness = await createFixture({ triggerType: 'doubleclick' });

      harness.doubleClickTrigger();

      expect(harness.isOpen).to.be.true;
    });

    it('should open and close by double clicking', async () => {
      const harness = await createFixture({ triggerType: 'doubleclick' });

      harness.doubleClickTrigger();
      expect(harness.isOpen).to.be.true;

      harness.doubleClickTrigger();
      expect(harness.isOpen).to.be.false;
    });

    it('should not open when double clicking the trigger if before toggle event is cancelled', async () => {
      const harness = await createFixture({ triggerType: 'doubleclick' });

      expect(harness.isOpen).to.be.false;

      const beforeToggleSpy = spy((evt: CustomEvent<IPopoverToggleEventData>) => evt.preventDefault());
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, beforeToggleSpy);

      harness.doubleClickTrigger();

      expect(harness.isOpen).to.be.false;
    });

    it('should not close when double clicking the trigger if before toggle event is cancelled', async () => {
      const harness = await createFixture({ open: true, triggerType: 'doubleclick' });

      expect(harness.isOpen).to.be.true;

      const toggleSpy = spy((evt: CustomEvent<IPopoverToggleEventData>) => evt.preventDefault());
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, toggleSpy);

      harness.doubleClickTrigger();

      expect(harness.isOpen).to.be.true;
    });
  });

  describe('contextmenu trigger type', () => {
    it('should open via contextmenu event (right click)', async () => {
      const popover = await fixture<IPopoverComponent>(html`<forge-popover trigger-type="contextmenu">Context menu</forge-popover>`);

      expect(popover.open).to.be.false;

      await sendMouse({ type: 'click', position: [0, 0], button: 'right' });

      expect(popover.open).to.be.true;
    });

    it('should not open via contextmenu event if trigger type is not set to contextmenu', async () => {
      const popover = await fixture<IPopoverComponent>(html`<forge-popover>Context menu</forge-popover>`);

      expect(popover.open).to.be.false;

      await sendMouse({ type: 'click', position: [0, 0], button: 'right' });

      expect(popover.open).to.be.false;
    });

    it('should update overlay position when contextmenu event is fired while open', async () => {
      const popover = await fixture<IPopoverComponent>(html`<forge-popover trigger-type="contextmenu">Context menu</forge-popover>`);

      const overlayRootElement = popover.overlay.shadowRoot?.querySelector(OVERLAY_CONSTANTS.selectors.ROOT) as HTMLElement;

      expect(popover.open).to.be.false;

      await sendMouse({ type: 'click', position: [100, 10], button: 'right' });      
      expect(popover.open).to.be.true;

      const originalOverlayPosition = { x: overlayRootElement.style.left, y: overlayRootElement.style.top };

      await sendMouse({ type: 'click', position: [200, 10], button: 'right' });

      const newOverlayPosition = { x: overlayRootElement.style.left, y: overlayRootElement.style.top };

      expect(popover.open).to.be.true;
      expect(originalOverlayPosition).not.to.deep.equal(newOverlayPosition);
    });
  });

  describe('manual trigger type', () => {
    it('should not open from user interaction if manual trigger type', async () => {
      const harness = await createFixture({ triggerType: 'manual' });

      await harness.clickTrigger();
      await harness.longpressTrigger();
      await harness.doubleClickTrigger();
      await harness.focusTrigger();
      await harness.hoverTrigger();

      expect(harness.isOpen).to.be.false;
    });

    it('should open via property if manual trigger type', async () => {
      const harness = await createFixture({ triggerType: 'manual' });

      expect(harness.isOpen).to.be.false;

      harness.popoverElement.open = true;

      expect(harness.isOpen).to.be.true;
    });
  });

  describe('multiple trigger types', () => {
    it('should allow for providing multiple trigger types via attribute', async () => {
      const harness = await createFixture();

      harness.popoverElement.setAttribute(POPOVER_CONSTANTS.attributes.TRIGGER_TYPE, 'click,focus');

      expect(harness.popoverElement.triggerType).to.deep.equal(['click', 'focus']);
    });

    it('should fall back to default trigger type of "click" if trigger-type attribute is removed', async () => {
      const harness = await createFixture({ triggerType: 'focus' });

      harness.popoverElement.removeAttribute(POPOVER_CONSTANTS.attributes.TRIGGER_TYPE);

      expect(harness.popoverElement.triggerType).to.equal('click');
    });

    it('should fall back to default trigger type of "click" if triggerType property is set to empty array', async () => {
      const harness = await createFixture({ triggerType: 'focus' });

      harness.popoverElement.triggerType = [];

      expect(harness.popoverElement.triggerType).to.equal('click');
    });

    it('should fall back to default trigger type of "click" if triggerType property is set to null', async () => {
      const harness = await createFixture({ triggerType: 'focus' });

      harness.popoverElement.triggerType = null as any;

      expect(harness.popoverElement.triggerType).to.equal('click');
    });

    it('should only allow for click when doubleclick is also specified together since they conflict', async () => {
      const harness = await createFixture();

      harness.popoverElement.setAttribute(POPOVER_CONSTANTS.attributes.TRIGGER_TYPE, 'click,doubleclick');

      expect(harness.popoverElement.triggerType).to.deep.equal(['click', 'doubleclick']);

      harness.doubleClickTrigger();
      
      expect(harness.isOpen).to.be.false;
      
      await harness.clickTrigger();

      expect(harness.isOpen).to.be.true;
    });

    it('should open/close via focus when both focus and hover triggers to be specified together', async () => {
      const harness = await createFixture();

      harness.popoverElement.setAttribute(POPOVER_CONSTANTS.attributes.TRIGGER_TYPE, 'focus,hover');

      expect(harness.popoverElement.triggerType).to.deep.equal(['focus', 'hover']);

      await harness.focusTrigger();
      expect(harness.isOpen).to.be.true;
      
      await harness.blurTrigger();
      expect(harness.isOpen).to.be.false;
    });

    it('should open/close via hover when both focus and hover triggers to be specified together', async () => {
      const harness = await createFixture();

      harness.popoverElement.setAttribute(POPOVER_CONSTANTS.attributes.TRIGGER_TYPE, 'focus,hover');

      expect(harness.popoverElement.triggerType).to.deep.equal(['focus', 'hover']);
      
      await harness.hoverOutside();
      await harness.hoverTrigger();
      expect(harness.isOpen).to.be.true;
      
      await harness.hoverSurface();
      expect(harness.isOpen).to.be.true;
      
      await harness.hoverOutside();
      await timer(POPOVER_HOVER_TIMEOUT + 100);

      expect(harness.isOpen).to.be.false;
    });
  });

  describe('light dismiss', () => {
    it('should dismiss when clicking outside the popover', async () => {
      const harness = await createFixture({ open: true });

      await harness.clickOutside();

      expect(harness.isOpen).to.be.false;
    });

    it('should not dismiss when clicking inside the popover', async () => {
      const harness = await createFixture({ open: true });

      await harness.clickSurface();

      expect(harness.isOpen).to.be.true;
    });

    it('should dismiss when pressing the escape key', async () => {
      const harness = await createFixture({ open: true });

      await harness.pressEscapeKey();

      expect(harness.isOpen).to.be.false;
    });

    it('should not dismiss when pressing the escape key when persistent', async () => {
      const harness = await createFixture({ open: true, persistent: true });

      await harness.pressEscapeKey();

      expect(harness.isOpen).to.be.true;
    });

    it('should not dismiss when clicking inside the popover when persistent', async () => {
      const harness = await createFixture({ open: true, persistent: true });

      await harness.clickSurface();

      expect(harness.isOpen).to.be.true;
    });

    it('should not dismiss when clicking outside the popover when persistent', async () => {
      const harness = await createFixture({ open: true, persistent: true });

      await harness.clickOutside();

      expect(harness.isOpen).to.be.true;
    });

    it('should cancel beforetoggle event when clicking outside', async () => {
      const harness = await createFixture({ open: true });

      const beforeToggleSpy = spy((evt: CustomEvent<IPopoverToggleEventData>) => evt.preventDefault());
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, beforeToggleSpy);

      await harness.clickOutside();

      expect(harness.isOpen).to.be.true;
    });

    it('should cancel beforetoggle event when pressing escape', async () => {
      const harness = await createFixture({ open: true });

      const beforeToggleSpy = spy((evt: CustomEvent<IPopoverToggleEventData>) => evt.preventDefault());
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, beforeToggleSpy);

      await harness.pressEscapeKey();

      expect(harness.isOpen).to.be.true;
    });

    it('should be in the dismissible stack when requesting light dismiss via escape key', async () => {
      const harness = await createFixture({ open: true });

      const requestDismissSpy = spy(DismissibleStack.instance, 'requestDismiss');

      await harness.pressEscapeKey();
      requestDismissSpy.restore();

      expect(requestDismissSpy).to.have.been.calledOnce;
      expect(requestDismissSpy.firstCall.args[0]).to.equal(harness.popoverElement);
      expect(requestDismissSpy.firstCall.args[1]).to.deep.equal({ reason: 'escape' });
      expect(DismissibleStack.instance.isRequestingLightDismiss(harness.popoverElement)).to.be.false;
    });

    it('should be in the dismissible stack when requesting light dismiss via clicking outside', async () => {
      const harness = await createFixture({ open: true });

      const requestDismissSpy = spy(DismissibleStack.instance, 'requestDismiss');

      await harness.clickOutside();
      requestDismissSpy.restore();

      expect(requestDismissSpy).to.have.been.calledOnce;
      expect(requestDismissSpy.firstCall.args[0]).to.equal(harness.popoverElement);
      expect(requestDismissSpy.firstCall.args[1]).to.deep.equal({ reason: 'click' });
      expect(DismissibleStack.instance.isRequestingLightDismiss(harness.popoverElement)).to.be.false;
    });
  });

  describe('dismissible stack', () => {
    it('should add to the dismissible stack when opened', async () => {
      const harness = await createFixture({ open: true });

      expect(DismissibleStack.instance.has(harness.popoverElement)).to.be.true;
    });

    it('should remove from the dismissible stack when closed', async () => {
      const harness = await createFixture({ open: true });

      await harness.clickTrigger();

      expect(DismissibleStack.instance.has(harness.popoverElement)).to.be.false;
    });

    it('should dismiss when clicking outside the popover', async () => {
      const harness = await createFixture({ open: true });

      expect(DismissibleStack.instance.has(harness.popoverElement)).to.be.true;

      await harness.clickOutside();

      expect(DismissibleStack.instance.has(harness.popoverElement)).to.be.false;
    });

    it('should remove from dismissible queue when removed from DOM', async () => {
      const harness = await createFixture({ open: true });

      expect(DismissibleStack.instance.has(harness.popoverElement)).to.be.true;

      harness.popoverElement.remove();

      expect(DismissibleStack.instance.has(harness.popoverElement)).to.be.false;
    });
  });

  describe('with nested popover', () => {
    it('should add to the dismissible stack when opened', async () => {
      const harness = await createFixture({ open: true });
      
      expect(DismissibleStack.instance.has(harness.popoverElement)).to.be.true;
      
      harness.nestedPopoverElement.open = true;
      
      expect(DismissibleStack.instance.has(harness.popoverElement)).to.be.true;
      expect(DismissibleStack.instance.has(harness.nestedPopoverElement)).to.be.true;
    });

    it('should remove from the dismissible stack when closed', async () => {
      const harness = await createFixture({ open: true });
      
      expect(DismissibleStack.instance.has(harness.popoverElement)).to.be.true;
      
      harness.nestedPopoverElement.open = true;
      
      expect(DismissibleStack.instance.has(harness.popoverElement)).to.be.true;
      expect(DismissibleStack.instance.has(harness.nestedPopoverElement)).to.be.true;
      
      harness.nestedPopoverElement.open = false;
      
      expect(DismissibleStack.instance.has(harness.popoverElement)).to.be.true;
      expect(DismissibleStack.instance.has(harness.nestedPopoverElement)).to.be.false;
    });

    it('should dismiss all popovers when clicking outside the parent popover', async () => {
      const harness = await createFixture({ open: true });

      await harness.clickOutside();
      
      expect(DismissibleStack.instance.has(harness.popoverElement)).to.be.false;
      expect(DismissibleStack.instance.has(harness.nestedPopoverElement)).to.be.false;
    });

    it('should dispatch before toggle event to most recently opened popover first when clicking outside the parent popover', async () => {
      const harness = await createFixture({ open: true });

      const beforeToggleSpy = spy();
      harness.popoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, beforeToggleSpy);

      const nestedBeforeToggleSpy = spy();
      harness.nestedPopoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, nestedBeforeToggleSpy);

      harness.nestedPopoverElement.open = true;

      await harness.clickOutside();

      expect(beforeToggleSpy).to.have.been.calledOnce;
      expect(nestedBeforeToggleSpy).to.have.been.calledOnce;
      expect(nestedBeforeToggleSpy).to.have.been.calledBefore(beforeToggleSpy);
    });

    it('should not close when clicking outside the parent popover if beforetoggle event is cancelled on the nested popover', async () => {
      const harness = await createFixture({ open: true });

      harness.nestedPopoverElement.open = true;

      const beforetoggleSpy = spy((evt: CustomEvent<IPopoverToggleEventData>) => evt.preventDefault());
      harness.nestedPopoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, beforetoggleSpy);

      await harness.clickOutside();

      expect(harness.isOpen).to.be.true;
      expect(harness.nestedPopoverElement.open).to.be.true;
    });

    it('should not close when click the parent trigger button if beforetoggle event is cancelled on the nested popover', async () => {
      const harness = await createFixture({ open: true });

      harness.nestedPopoverElement.open = true;

      const beforetoggleSpy = spy((evt: CustomEvent<IPopoverToggleEventData>) => evt.preventDefault());
      harness.nestedPopoverElement.addEventListener(POPOVER_CONSTANTS.events.BEFORETOGGLE, beforetoggleSpy);

      await harness.clickTrigger();

      expect(harness.isOpen).to.be.true;
      expect(harness.nestedPopoverElement.open).to.be.true;
    });

    it('should close nested popover when clicking outside the nested popover, but inside the parent popover', async () => {
      const harness = await createFixture({ open: true });

      harness.nestedPopoverElement.open = true;

      await harness.clickSurface();

      expect(harness.isOpen).to.be.true;
      expect(harness.nestedPopoverElement.open).to.be.false;
    });
  });

  describe('arrow', () => {
    it('should not show arrow element by default', async () => {
      const harness = await createFixture({ open: true });

      expect(harness.arrowElement).to.not.exist;
    });

    it('should show arrow element', async () => {
      const harness = await createFixture({ open: true, arrow: true });

      expect(harness.arrowElement).to.exist;
    });
    
    it('should remove arrow element when arrow attribute is removed', async () => {
      const harness = await createFixture({ open: true, arrow: true });

      harness.popoverElement.removeAttribute('arrow');

      expect(harness.arrowElement).to.not.exist;
    });
  });

  describe('focus management', () => {
    it('should focus element with autofocus attribute when opened via keyboard', async () => {
      const harness = await createFixture();

      const autofocusEl = document.createElement('input');
      autofocusEl.setAttribute('autofocus', '');
      harness.popoverElement.appendChild(autofocusEl);

      await harness.keyboardTrigger();

      // We wait two frames internally before attempting to set focus
      await elementUpdated(harness.popoverElement);
      await elementUpdated(harness.popoverElement);

      expect(document.activeElement).to.be.equal(autofocusEl);
    });

    it('should place focus back on trigger element when closed via escape key after opened via keyboard', async () => {
      const harness = await createFixture();

      const autofocusEl = document.createElement('input');
      autofocusEl.setAttribute('autofocus', '');
      harness.popoverElement.appendChild(autofocusEl);

      await harness.keyboardTrigger();

      // We wait two frames internally before attempting to set focus
      await elementUpdated(harness.popoverElement);
      await elementUpdated(harness.popoverElement);

      expect(document.activeElement).to.be.equal(autofocusEl);

      await harness.pressEscapeKey();

      expect(document.activeElement).to.be.equal(harness.triggerElement);
    });

    it('should not place focus back on trigger element when closed via click outside after opened via keyboard', async () => {
      const harness = await createFixture();

      const autofocusEl = document.createElement('input');
      autofocusEl.setAttribute('autofocus', '');
      harness.popoverElement.appendChild(autofocusEl);

      await harness.keyboardTrigger();

      // We wait two frames internally before attempting to set focus
      await elementUpdated(harness.popoverElement);
      await elementUpdated(harness.popoverElement);

      expect(document.activeElement).to.be.equal(autofocusEl);

      await harness.clickOutside();

      expect(document.activeElement).not.to.be.equal(harness.triggerElement);
    });
  });

  describe('with virtual anchor element', () => {
    it('should open at virtual element position', async () => {
      const harness = await createFixture();

      harness.popoverElement.anchorElement = new VirtualElement(100, 100);
      harness.popoverElement.placement = 'bottom-start';
      harness.popoverElement.open = true;

      await elementUpdated(harness.popoverElement);

      const overlayRoot = harness.popoverElement.overlay.shadowRoot?.querySelector(OVERLAY_CONSTANTS.selectors.ROOT) as HTMLElement;

      expect(harness.isOpen).to.be.true;
      expect(overlayRoot.style.top).to.equal('100px');
      expect(overlayRoot.style.left).to.equal('100px');
    });
  });
});

class PopoverHarness {
  constructor(
    public popoverElement: IPopoverComponent,
    public nestedPopoverElement: IPopoverComponent,
    public triggerElement: HTMLButtonElement,
    public altTriggerElement: HTMLButtonElement,
    public contentButton: HTMLButtonElement) {}

  public get surfaceElement(): HTMLElement {
    return this.popoverElement.shadowRoot?.querySelector(POPOVER_CONSTANTS.selectors.SURFACE) as HTMLElement;
  }

  public get arrowElement(): HTMLElement {
    return this.popoverElement.shadowRoot?.querySelector(`.${POPOVER_CONSTANTS.classes.ARROW}`) as HTMLElement;
  }

  public get isOpen(): boolean {
    return this.popoverElement.open &&
           this.popoverElement.hasAttribute(POPOVER_CONSTANTS.attributes.OPEN) &&
           this.popoverElement.overlay.open;
  }

  public async clickOutside(): Promise<void> {
    const { x, y, height, width } = this.surfaceElement.getBoundingClientRect();
    const mouseX = Math.round(x + width * 2);
    const mouseY = Math.round(y + height * 2);
    await sendMouse({ type: 'click', position: [mouseX, mouseY], button: 'left' });
  }

  public async clickTrigger(): Promise<void> {
    const { x, y, height, width } = this.triggerElement.getBoundingClientRect();
    const mouseX = Math.round(x + width / 2);
    const mouseY = Math.round(y + height / 2);
    await sendMouse({ type: 'click', position: [mouseX, mouseY], button: 'left' });
  }

  public async keyboardTrigger(): Promise<void> {
    this.triggerElement.focus();
    await sendKeys({ press: 'Enter' });
  }

  public async clickSurface(): Promise<void> {
    const { x, y } = this.surfaceElement.getBoundingClientRect();
    const mouseX = Math.round(x);
    const mouseY = Math.round(y);
    await sendMouse({ type: 'click', position: [mouseX, mouseY], button: 'left' });
  }

  public async hoverSurface(): Promise<void> {
    const { x, y, height, width } = this.surfaceElement.getBoundingClientRect();
    const mouseX = Math.round(x + width / 2);
    const mouseY = Math.round(y + height / 2);
    await sendMouse({ type: 'move', position: [mouseX, mouseY] });
  }

  public async hoverOutside(): Promise<void> {
    await sendMouse({ type: 'move', position: [0, 0] });
  }

  public async hoverTrigger(): Promise<void> {
    const { x, y, height, width } = this.triggerElement.getBoundingClientRect();
    const mouseX = Math.round(x + width / 2);
    const mouseY = Math.round(y + height / 2);
    await sendMouse({ type: 'move', position: [mouseX, mouseY] });
  }

  public async longpressTrigger(delay = LONGPRESS_TRIGGER_DELAY): Promise<void> {
    await this.hoverTrigger();
    await sendMouse({ type: 'down', button: 'left' });
    await timer(delay);
    await sendMouse({ type: 'up', button: 'left' });
    await this.hoverOutside();
  }

  public async longpressStopBeforeDelay(): Promise<void> {
    await this.hoverTrigger();
    await sendMouse({ type: 'down', button: 'left' });
    await timer(LONGPRESS_TRIGGER_DELAY / 2);
    await sendMouse({ type: 'up', button: 'left' });
    await this.hoverOutside();
  }

  public focusTrigger(): void {
    this.triggerElement.focus();
  }
  
  public blurTrigger(): void {
    this.triggerElement.blur();
  }

  public doubleClickTrigger(): void {
    this.focusTrigger();
    this.triggerElement.dispatchEvent(new MouseEvent('dblclick'));
  }

  public async pressEscapeKey(): Promise<void> {
    await sendKeys({ press: 'Escape' });
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
}

async function createFixture({
  open = false,
  persistent = false,
  arrow = false,
  anchor,
  animationType,
  triggerType,
  persistentHover = false
}: IPopoverFixtureConfig = {}): Promise<PopoverHarness> {
  const container = await fixture(html`
    <div style="display: flex; justify-content: center; align-items: center; height: 300px; width: 300px;">
      <button type="button" id="alt-trigger">Alternative trigger</button>
      <button type="button" id="test-trigger">Popover Trigger</button>
      <forge-popover
        anchor=${anchor ?? nothing}
        ?open=${open}
        ?persistent=${persistent}
        ?arrow=${arrow}
        ?persistent-hover=${persistentHover}
        animation-type=${animationType ?? nothing}
        trigger-type=${triggerType ?? nothing}>
        <span>Test popover content<span>
        <button type="button" id="content-button" style="pointer-events: none;">Button</button>
        <forge-popover id="nested-popover">Nested popover</forge-popover>
      </forge-overlay>
    </div>
  `);

  const triggerEl = container.querySelector('#test-trigger') as HTMLButtonElement;
  const altTriggerEl = container.querySelector('#alt-trigger') as HTMLButtonElement;
  const popoverEl = container.querySelector('forge-popover') as IPopoverComponent;
  const nestedPopoverEl = container.querySelector('#nested-popover') as IPopoverComponent;
  const contentButton = container.querySelector('#content-button') as HTMLButtonElement;

  return new PopoverHarness(popoverEl, nestedPopoverEl, triggerEl, altTriggerEl, contentButton);
}
