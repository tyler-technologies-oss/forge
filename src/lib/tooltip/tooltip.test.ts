import { expect } from '@esm-bundle/chai';
import { nothing, TemplateResult } from 'lit';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { sendMouse, sendKeys } from '@web/test-runner-commands';
import { task } from '../core/utils/utils';
import { LONGPRESS_TRIGGER_DELAY } from '../core/mixins/interactions/longpress/with-longpress-listener';
import type { ITooltipComponent } from './tooltip';
import type { IOverlayComponent } from '../overlay/overlay';
import { OVERLAY_CONSTANTS } from '../overlay';
import { TooltipPlacement, TooltipTriggerType, TooltipType, TOOLTIP_CONSTANTS } from './tooltip-constants';

import './tooltip';

describe('Tooltip', () => {
  afterEach(async () => {
    // Always reset mouse position to avoid initial hover state issues when a test starts
    await sendMouse({ type: 'move', position: [0, 0] });
  });

  describe('defaults', () => {
    it('should have expected default values', async () => {
      const harness = await createFixture();

      expect(harness.tooltipElement.open).to.be.false;
      expect(harness.tooltipElement.type).to.equal('presentation' satisfies TooltipType);
      expect(harness.tooltipElement.anchor).to.be.undefined;
      expect(harness.tooltipElement.anchorElement).to.equal(harness.anchorElement);
      expect(harness.tooltipElement.placement).to.equal('right' satisfies TooltipPlacement);
      expect(harness.tooltipElement.triggerType).to.equal('hover' satisfies TooltipTriggerType);
      expect(harness.tooltipElement.delay).to.equal(TOOLTIP_CONSTANTS.defaults.DELAY);
      expect(harness.tooltipElement.offset).to.equal(TOOLTIP_CONSTANTS.defaults.OFFSET);
    });

    it('should not be open by default', async () => {
      const harness = await createFixture();

      expect(harness.isOpen).to.be.false;
    });

    it('should open by default with open attribute', async () => {
      const harness = await createFixture({ open: true });

      expect(harness.isOpen).to.be.true;
    });

    it('should toggle open via property', async () => {
      const harness = await createFixture();

      harness.tooltipElement.open = true;
      expect(harness.isOpen).to.be.true;

      harness.tooltipElement.open = false;
      expect(harness.isOpen).to.be.false;
    });

    it('should not open if there is no text content', async () => {
      const harness = await createFixture({ content: nothing });

      harness.tooltipElement.open = true;

      expect(harness.isOpen).to.be.false;
      expect(harness.tooltipElement.open).to.be.false;
      expect(harness.tooltipElement.hasAttribute(TOOLTIP_CONSTANTS.attributes.OPEN)).to.be.false;
    });

    it('should open if there is an element node even if no text content', async () => {
      const harness = await createFixture({ content: html`<span></span>` });

      harness.tooltipElement.open = true;

      expect(harness.isOpen).to.be.true;
      expect(harness.tooltipElement.open).to.be.true;
      expect(harness.tooltipElement.hasAttribute(TOOLTIP_CONSTANTS.attributes.OPEN)).to.be.true;
    });
  });

  describe('accessibility', () => {
    it('should be presentational by default', async () => {
      const harness = await createFixture();

      expect(harness.tooltipElement.type).to.equal('presentation' satisfies TooltipType);
      expect(harness.tooltipElement.hasAttribute(TOOLTIP_CONSTANTS.attributes.TYPE)).to.be.false;
      expect(harness.tooltipElement.hasAttribute('role')).to.be.false;
      expect(harness.tooltipElement.hasAttribute('aria-hidden')).to.be.true;
      expect(harness.anchorElement.hasAttribute('aria-label')).to.be.false;
      expect(harness.anchorElement.hasAttribute('aria-labelledby')).to.be.false;
      expect(harness.anchorElement.hasAttribute('aria-describedby')).to.be.false;
    });

    it('should be accessible when closed with presentation type', async () => {
      const harness = await createFixture();

      expect(harness.isOpen).to.be.false;
      expect(harness.tooltipElement.type).to.equal('presentation' satisfies TooltipType);
      expect(harness.tooltipElement.hasAttribute('role')).to.be.false;
      expect(harness.tooltipElement.hasAttribute('aria-hidden')).to.be.true;
      await expect(harness.tooltipElement).to.be.accessible();
    });

    it('should be accessible when closed with label type', async () => {
      const harness = await createFixture({ type: 'label' });

      expect(harness.isOpen).to.be.false;
      expect(harness.tooltipElement.type).to.equal('label' satisfies TooltipType);
      expect(harness.anchorElement.getAttribute('aria-labelledby')).to.equal(harness.tooltipElement.id);
      expect(harness.anchorElement.hasAttribute('aria-describedby')).to.be.false;
      expect(harness.tooltipElement.hasAttribute('aria-hidden')).to.be.true;
      await expect(harness.tooltipElement).to.be.accessible();
    });

    it('should be accessible when closed with description type', async () => {
      const harness = await createFixture({ type: 'description' });

      expect(harness.isOpen).to.be.false;
      expect(harness.tooltipElement.type).to.equal('description' satisfies TooltipType);
      expect(harness.anchorElement.getAttribute('aria-describedby')).to.equal(harness.tooltipElement.id);
      expect(harness.anchorElement.hasAttribute('aria-labelledby')).to.be.false;
      expect(harness.tooltipElement.hasAttribute('aria-hidden')).to.be.true;
      await expect(harness.tooltipElement).to.be.accessible();
    });

    it('should be accessible when open with presentation type', async () => {
      const harness = await createFixture({ open: true });

      expect(harness.isOpen).to.be.true;
      expect(harness.tooltipElement.hasAttribute('aria-hidden')).to.be.true;
      expect(harness.tooltipElement.hasAttribute('role')).to.be.false;
      expect(harness.anchorElement.hasAttribute('aria-labelledby')).to.be.false;
      expect(harness.anchorElement.hasAttribute('aria-describedby')).to.be.false;
      await expect(harness.tooltipElement).to.be.accessible();
    });

    it('should be accessible when open with label type', async () => {
      const harness = await createFixture({ open: true, type: 'label' });

      expect(harness.isOpen).to.be.true;
      expect(harness.tooltipElement.hasAttribute('aria-hidden')).to.be.true;
      expect(harness.tooltipElement.hasAttribute('role')).to.be.false;
      expect(harness.anchorElement.hasAttribute('aria-describedby')).to.be.false;
      expect(harness.anchorElement.getAttribute('aria-labelledby')).to.equal(harness.tooltipElement.id);
      await expect(harness.tooltipElement).to.be.accessible();
    });

    it('should be accessible when open with description type', async () => {
      const harness = await createFixture({ open: true, type: 'description' });

      expect(harness.isOpen).to.be.true;
      expect(harness.tooltipElement.hasAttribute('aria-hidden')).to.be.true;
      expect(harness.tooltipElement.getAttribute('role')).to.equal('tooltip');
      expect(harness.anchorElement.hasAttribute('aria-labelledby')).to.be.false;
      expect(harness.anchorElement.getAttribute('aria-describedby')).to.equal(harness.tooltipElement.id);
      await expect(harness.tooltipElement).to.be.accessible();
    });

    it('should not override user-provided aria-labelledby', async () => {
      const harness = await createFixture();

      harness.tooltipElement.setAttribute('aria-labelledby', 'test-id');
      harness.anchorElement.setAttribute('aria-labelledby', 'test-id');
      harness.tooltipElement.type = 'label';

      await elementUpdated(harness.tooltipElement);

      expect(harness.anchorElement.getAttribute('aria-labelledby')).to.equal('test-id');
      await expect(harness.tooltipElement).to.be.accessible();
    });

    it('should not override user-provided aria-describedby', async () => {
      const harness = await createFixture();

      harness.tooltipElement.setAttribute('aria-describedby', 'test-id');
      harness.anchorElement.setAttribute('aria-describedby', 'test-id');
      harness.tooltipElement.type = 'description';

      await elementUpdated(harness.tooltipElement);

      expect(harness.anchorElement.getAttribute('aria-describedby')).to.equal('test-id');
      await expect(harness.tooltipElement).to.be.accessible();
    });

    it('should detach aria-labelledby when changing anchor elements', async () => {
      const harness = await createFixture({ type: 'label' });

      expect(harness.anchorElement.getAttribute('aria-labelledby')).to.equal(harness.tooltipElement.id);

      harness.tooltipElement.anchorElement = harness.altAnchorElement;

      expect(harness.anchorElement.hasAttribute('aria-labelledby')).to.be.false;
      expect(harness.altAnchorElement.getAttribute('aria-labelledby')).to.equal(harness.tooltipElement.id);
      await expect(harness.tooltipElement).to.be.accessible();
    });

    it('should detach aria-labelledby when changing anchor elements via id', async () => {
      const harness = await createFixture({ type: 'label' });

      expect(harness.anchorElement.getAttribute('aria-labelledby')).to.equal(harness.tooltipElement.id);

      harness.tooltipElement.anchor = harness.altAnchorElement.id;

      expect(harness.anchorElement.hasAttribute('aria-labelledby')).to.be.false;
      expect(harness.altAnchorElement.getAttribute('aria-labelledby')).to.equal(harness.tooltipElement.id);
      await expect(harness.tooltipElement).to.be.accessible();
    });

    it('should detach aria-labelledby when removing tooltip', async () => {
      const harness = await createFixture({ type: 'label' });

      expect(harness.anchorElement.getAttribute('aria-labelledby')).to.equal(harness.tooltipElement.id);

      harness.tooltipElement.remove();

      expect(harness.anchorElement.hasAttribute('aria-labelledby')).to.be.false;
    });

    it('should detach aria-describedby when changing anchor elements', async () => {
      const harness = await createFixture({ type: 'description' });

      expect(harness.anchorElement.getAttribute('aria-describedby')).to.equal(harness.tooltipElement.id);

      harness.tooltipElement.anchorElement = harness.altAnchorElement;

      expect(harness.anchorElement.hasAttribute('aria-describedby')).to.be.false;
      expect(harness.altAnchorElement.getAttribute('aria-describedby')).to.equal(harness.tooltipElement.id);
      await expect(harness.tooltipElement).to.be.accessible();
    });

    it('should detach aria-describedby when changing anchor elements via id', async () => {
      const harness = await createFixture({ type: 'description' });

      expect(harness.anchorElement.getAttribute('aria-describedby')).to.equal(harness.tooltipElement.id);

      harness.tooltipElement.anchor = harness.altAnchorElement.id;

      expect(harness.anchorElement.hasAttribute('aria-describedby')).to.be.false;
      expect(harness.altAnchorElement.getAttribute('aria-describedby')).to.equal(harness.tooltipElement.id);
      await expect(harness.tooltipElement).to.be.accessible();
    });

    it('should detach aria-describedby when removing tooltip', async () => {
      const harness = await createFixture({ type: 'description' });

      expect(harness.anchorElement.getAttribute('aria-describedby')).to.equal(harness.tooltipElement.id);

      harness.tooltipElement.remove();

      expect(harness.anchorElement.hasAttribute('aria-describedby')).to.be.false;
    });

    it('should not remove user-provided aria-labelledby or aria-describedby attributes when removing tooltip if presentation type', async () => {
      const harness = await createFixture();

      harness.anchorElement.setAttribute('aria-labelledby', 'test-id');
      harness.anchorElement.setAttribute('aria-describedby', 'test-id');

      harness.tooltipElement.remove();

      expect(harness.anchorElement.getAttribute('aria-labelledby')).to.equal('test-id');
      expect(harness.anchorElement.getAttribute('aria-describedby')).to.equal('test-id');
    });
  });

  describe('overlay', () => {
    it('should proxy placement', async () => {
      const harness = await createFixture();

      harness.tooltipElement.placement = 'bottom';

      expect(harness.tooltipElement.placement).to.equal('bottom');
      expect(harness.tooltipElement.getAttribute(OVERLAY_CONSTANTS.attributes.PLACEMENT)).to.equal('bottom');

      harness.tooltipElement.open = true;

      expect(harness.overlayElement?.placement).to.equal('bottom');
    });

    it('should proxy offset', async () => {
      const harness = await createFixture();

      const offset = 10;
      harness.tooltipElement.offset = offset;

      expect(harness.tooltipElement.offset).to.deep.equal(offset);
      expect(harness.tooltipElement.getAttribute(TOOLTIP_CONSTANTS.attributes.OFFSET)).to.equal(`${offset}`);

      harness.tooltipElement.open = true;

      expect(harness.overlayElement?.offset).to.deep.equal({ mainAxis: offset });
    });

    it('should proxy flip', async () => {
      const harness = await createFixture();

      harness.tooltipElement.flip = 'main';

      expect(harness.tooltipElement.flip).to.equal('main');
      expect(harness.tooltipElement.getAttribute(OVERLAY_CONSTANTS.attributes.FLIP)).to.equal('main');

      harness.tooltipElement.open = true;

      expect(harness.overlayElement?.flip).to.equal('main');
    });

    it('should proxy boundary', async () => {
      const harness = await createFixture();

      const elId = 'alt-anchor';
      harness.tooltipElement.boundary = elId;

      expect(harness.tooltipElement.boundary).to.equal(elId);
      expect(harness.tooltipElement.getAttribute(OVERLAY_CONSTANTS.attributes.BOUNDARY)).to.equal(elId);

      harness.tooltipElement.open = true;

      expect(harness.overlayElement?.boundaryElement).to.equal(harness.altAnchorElement);
    });

    it('should proxy boundary element', async () => {
      const harness = await createFixture();

      const boundaryEl = document.createElement('div');

      harness.tooltipElement.boundaryElement = boundaryEl;

      expect(harness.tooltipElement.boundaryElement).to.equal(boundaryEl);

      harness.tooltipElement.open = true;

      expect(harness.overlayElement?.boundaryElement).to.equal(boundaryEl);
    });

    it('should proxy fallback placements', async () => {
      const harness = await createFixture();

      harness.tooltipElement.fallbackPlacements = ['top', 'bottom'];

      expect(harness.tooltipElement.fallbackPlacements).to.deep.equal(['top', 'bottom']);

      harness.tooltipElement.open = true;

      expect(harness.overlayElement?.fallbackPlacements).to.deep.equal(['top', 'bottom']);
    });

    it('should proxy fallback placements via attribute', async () => {
      const harness = await createFixture();

      harness.tooltipElement.setAttribute(TOOLTIP_CONSTANTS.attributes.FALLBACK_PLACEMENTS, 'top,bottom');

      expect(harness.tooltipElement.fallbackPlacements).to.deep.equal(['top', 'bottom']);

      harness.tooltipElement.open = true;

      expect(harness.overlayElement?.fallbackPlacements).to.deep.equal(['top', 'bottom']);
    });

    it('should proxy anchorElement', async () => {
      const harness = await createFixture();

      harness.tooltipElement.anchorElement = harness.altAnchorElement;

      expect(harness.tooltipElement.anchorElement).to.equal(harness.altAnchorElement);

      harness.tooltipElement.open = true;

      expect(harness.overlayElement?.anchorElement).to.equal(harness.altAnchorElement);
    });

    it('should proxy anchor', async () => {
      const harness = await createFixture();

      harness.tooltipElement.anchor = harness.altAnchorElement.id;

      expect(harness.tooltipElement.anchor).to.equal(harness.altAnchorElement.id);

      harness.tooltipElement.open = true;

      expect(harness.overlayElement?.anchorElement).to.equal(harness.altAnchorElement);
    });

    it('should proxy open', async () => {
      const harness = await createFixture();

      harness.tooltipElement.open = true;

      expect(harness.tooltipElement.open).to.be.true;
      expect(harness.tooltipElement.hasAttribute(OVERLAY_CONSTANTS.attributes.OPEN)).to.be.true;

      expect(harness.overlayElement?.open).to.be.true;
    });
  });

  describe('anchor', () => {
    it('should set anchor to previous element sibling implicitly', async () => {
      const harness = await createFixture();

      expect(harness.tooltipElement.anchorElement).to.equal(harness.anchorElement);
    });

    it('should set anchorElement explicitly', async () => {
      const harness = await createFixture();

      harness.tooltipElement.anchorElement = harness.altAnchorElement;

      expect(harness.tooltipElement.anchorElement).to.equal(harness.altAnchorElement);
    });

    it('should set anchor via id reference explicitly', async () => {
      const harness = await createFixture();

      harness.tooltipElement.anchor = harness.altAnchorElement.id;

      expect(harness.tooltipElement.anchorElement).to.equal(harness.altAnchorElement);
      expect(harness.tooltipElement.getAttribute(TOOLTIP_CONSTANTS.attributes.ANCHOR)).to.equal(harness.altAnchorElement.id);
    });

    it('should automatically set anchor to parent element if no previous sibling element exists', async () => {
      const harness = await createFixture();

      const newTooltip = document.createElement('forge-tooltip');
      harness.containerElement.insertAdjacentElement('afterbegin', newTooltip);

      expect(newTooltip.anchorElement).to.equal(harness.containerElement);
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
  });

  describe('hover trigger type', () => {
    it('should open when hovering the trigger button', async () => {
      const harness = await createFixture({ triggerType: 'hover' });

      expect(harness.isOpen).to.be.false;

      await harness.hoverTrigger();
      await task(harness.tooltipElement.delay + 100);

      expect(harness.isOpen).to.be.true;
    });

    it('should open and close when hovering and unhovering the trigger button', async () => {
      const harness = await createFixture({ triggerType: 'hover' });

      await harness.hoverTrigger();
      await task(harness.tooltipElement.delay + 100);
      expect(harness.isOpen).to.be.true;

      await harness.hoverOutside();

      expect(harness.isOpen).to.be.false;
    });

    it('should not close after open when hovering and unhovering the trigger before the delay elapses', async () => {
      const harness = await createFixture({ triggerType: 'hover' });

      expect(harness.isOpen).to.be.false;

      await harness.hoverTrigger();
      await task(harness.tooltipElement.delay + 100);
      expect(harness.isOpen).to.be.true;

      await harness.hoverOutside();
      await task(harness.tooltipElement.delay / 2);
      await harness.hoverTrigger();
      await task(harness.tooltipElement.delay + 100);

      expect(harness.isOpen).to.be.true;
    });

    it('should use custom hover dismiss delay', async () => {
      const harness = await createFixture({ triggerType: 'hover' });

      const customDelay = 100;
      harness.tooltipElement.delay = customDelay;

      expect(harness.tooltipElement.delay).to.equal(customDelay);
      expect(harness.isOpen).to.be.false;

      await harness.hoverTrigger();
      await task(harness.tooltipElement.delay + 100);
      expect(harness.isOpen).to.be.true;

      await harness.hoverOutside();

      expect(harness.isOpen).to.be.false;
    });

    it('should open immediately when hover delay is set to 0', async () => {
      const harness = await createFixture({ triggerType: 'hover', delay: 0 });

      expect(harness.isOpen).to.be.false;

      await harness.hoverTrigger();
      expect(harness.isOpen).to.be.true;
    });
  });

  describe('longpress trigger type', () => {
    it('should open when longpressing the anchor', async () => {
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

    it('should not open when releasing the anchor before the longpress delay', async () => {
      const harness = await createFixture({ triggerType: 'longpress' });

      await harness.longpressStopBeforeDelay();
      expect(harness.isOpen).to.be.false;
    });

    it('should automatically hide after longpress visibility threshold', async () => {
      const harness = await createFixture({ triggerType: 'longpress' });

      await harness.longpressTrigger();
      expect(harness.isOpen).to.be.true;

      await task(TOOLTIP_CONSTANTS.numbers.LONGPRESS_VISIBILITY_DURATION + 100);
      expect(harness.isOpen).to.be.false;
    });
  });

  describe('multiple trigger types', () => {
    it('should allow for providing multiple trigger types via attribute', async () => {
      const harness = await createFixture();

      harness.tooltipElement.setAttribute(TOOLTIP_CONSTANTS.attributes.TRIGGER_TYPE, 'hover,focus');

      expect(harness.tooltipElement.triggerType).to.deep.equal(['hover', 'focus']);
    });

    it('should fall back to default trigger type of "hover" if trigger-type attribute is removed', async () => {
      const harness = await createFixture({ triggerType: 'focus' });

      harness.tooltipElement.removeAttribute(TOOLTIP_CONSTANTS.attributes.TRIGGER_TYPE);

      expect(harness.tooltipElement.triggerType).to.equal('hover');
    });

    it('should fall back to default trigger type of "hover" if triggerType property is set to empty array', async () => {
      const harness = await createFixture({ triggerType: 'focus' });

      harness.tooltipElement.triggerType = [];

      expect(harness.tooltipElement.triggerType).to.equal('hover');
    });

    it('should fall back to default trigger type of "hover" if triggerType property is set to null', async () => {
      const harness = await createFixture({ triggerType: 'focus' });

      harness.tooltipElement.triggerType = null as any;

      expect(harness.tooltipElement.triggerType).to.equal('hover');
    });

    it('should open/close via focus when both focus and hover triggers to be specified together', async () => {
      const harness = await createFixture();

      harness.tooltipElement.setAttribute(TOOLTIP_CONSTANTS.attributes.TRIGGER_TYPE, 'focus,hover');

      expect(harness.tooltipElement.triggerType).to.deep.equal(['focus', 'hover']);

      await harness.focusTrigger();
      expect(harness.isOpen).to.be.true;

      await harness.blurTrigger();
      expect(harness.isOpen).to.be.false;
    });

    it('should open/close via hover when both focus and hover triggers to be specified together', async () => {
      const harness = await createFixture();

      harness.tooltipElement.setAttribute(TOOLTIP_CONSTANTS.attributes.TRIGGER_TYPE, 'focus,hover');

      expect(harness.tooltipElement.triggerType).to.deep.equal(['focus', 'hover']);

      await harness.hoverOutside();
      await harness.hoverTrigger();
      await task(harness.tooltipElement.delay + 100);
      expect(harness.isOpen).to.be.true;

      await harness.hoverOutside();

      expect(harness.isOpen).to.be.false;
    });
  });

  describe('light dismiss', () => {
    it('should dismiss when clicking outside the tooltip', async () => {
      const harness = await createFixture({ open: true });

      await harness.clickOutside();

      expect(harness.isOpen).to.be.false;
    });

    it('should dismiss when pressing the escape key', async () => {
      const harness = await createFixture({ open: true });

      await harness.pressEscapeKey();

      expect(harness.isOpen).to.be.false;
    });
  });

  describe('arrow', () => {
    it('should show arrow element', async () => {
      const harness = await createFixture({ open: true });

      expect(harness.arrowElement).to.exist;
    });
  });

  describe('deprecated properties/attributes', () => {
    it('should set placement when setting deprecated position property', async () => {
      const harness = await createFixture();

      harness.tooltipElement.position = 'bottom';

      expect(harness.tooltipElement.position).to.equal('bottom');
      expect(harness.tooltipElement.placement).to.equal('bottom');
      expect(harness.tooltipElement.getAttribute(TOOLTIP_CONSTANTS.attributes.PLACEMENT)).to.equal('bottom');
      expect(harness.tooltipElement.hasAttribute('position')).to.be.false;
    });

    it('should set position when setting deprecated position attribute', async () => {
      const harness = await createFixture();

      harness.tooltipElement.setAttribute('position', 'bottom');

      expect(harness.tooltipElement.position).to.equal('bottom');
      expect(harness.tooltipElement.placement).to.equal('bottom');
      expect(harness.tooltipElement.getAttribute(TOOLTIP_CONSTANTS.attributes.PLACEMENT)).to.equal('bottom');
      expect(harness.tooltipElement.getAttribute('position')).to.equal('bottom');
    });

    it('should set anchor when setting deprecated target property', async () => {
      const harness = await createFixture();

      harness.tooltipElement.target = 'alt-anchor';

      expect(harness.tooltipElement.target).to.equal('alt-anchor');
      expect(harness.tooltipElement.anchor).to.equal('alt-anchor');
      expect(harness.tooltipElement.getAttribute(TOOLTIP_CONSTANTS.attributes.ANCHOR)).to.equal('alt-anchor');
      expect(harness.tooltipElement.hasAttribute('target')).to.be.false;
    });

    it('should set anchor when setting deprecated target attribute', async () => {
      const harness = await createFixture();

      harness.tooltipElement.setAttribute('target', 'alt-anchor');

      expect(harness.tooltipElement.target).to.equal('alt-anchor');
      expect(harness.tooltipElement.anchor).to.equal('alt-anchor');
      expect(harness.tooltipElement.getAttribute(TOOLTIP_CONSTANTS.attributes.ANCHOR)).to.equal('alt-anchor');
      expect(harness.tooltipElement.getAttribute('target')).to.equal('alt-anchor');
    });
  });
});

class TooltipHarness {
  constructor(
    public tooltipElement: ITooltipComponent,
    public anchorElement: HTMLButtonElement,
    public altAnchorElement: HTMLButtonElement,
    public containerElement: HTMLElement
  ) {}

  public get contentElement(): HTMLElement {
    return this.tooltipElement.shadowRoot?.querySelector(TOOLTIP_CONSTANTS.selectors.CONTENT) as HTMLElement;
  }

  public get arrowElement(): HTMLElement {
    return this.tooltipElement.shadowRoot?.querySelector(TOOLTIP_CONSTANTS.selectors.ARROW) as HTMLElement;
  }

  public get overlayElement(): IOverlayComponent | null {
    return this.tooltipElement.shadowRoot?.querySelector(OVERLAY_CONSTANTS.elementName) as IOverlayComponent;
  }

  public get isOpen(): boolean {
    return this.tooltipElement.open && this.tooltipElement.hasAttribute(TOOLTIP_CONSTANTS.attributes.OPEN) && !!this.overlayElement?.open;
  }

  public async clickOutside(): Promise<void> {
    const { x, y, height, width } = this.contentElement.getBoundingClientRect();
    const mouseX = Math.round(x + width * 2);
    const mouseY = Math.round(y + height * 2);
    await sendMouse({ type: 'click', position: [mouseX, mouseY], button: 'left' });
  }

  public async clickTrigger(): Promise<void> {
    const { x, y, height, width } = this.anchorElement.getBoundingClientRect();
    const mouseX = Math.round(x + width / 2);
    const mouseY = Math.round(y + height / 2);
    await sendMouse({ type: 'click', position: [mouseX, mouseY], button: 'left' });
  }

  public async hoverOutside(): Promise<void> {
    await sendMouse({ type: 'move', position: [0, 0] });
  }

  public async hoverTrigger(): Promise<void> {
    const { x, y, height, width } = this.anchorElement.getBoundingClientRect();
    const mouseX = Math.round(x + width / 2);
    const mouseY = Math.round(y + height / 2);
    await sendMouse({ type: 'move', position: [mouseX, mouseY] });
  }

  public async longpressTrigger(delay = LONGPRESS_TRIGGER_DELAY): Promise<void> {
    await this.hoverTrigger();
    await sendMouse({ type: 'down', button: 'left' });
    await task(delay);
    await sendMouse({ type: 'up', button: 'left' });
    await this.hoverOutside();
  }

  public async longpressStopBeforeDelay(): Promise<void> {
    await this.hoverTrigger();
    await sendMouse({ type: 'down', button: 'left' });
    await task(LONGPRESS_TRIGGER_DELAY / 2);
    await sendMouse({ type: 'up', button: 'left' });
    await this.hoverOutside();
  }

  public focusTrigger(): void {
    this.anchorElement.focus();
  }

  public blurTrigger(): void {
    this.anchorElement.blur();
  }

  public async pressEscapeKey(): Promise<void> {
    await sendKeys({ press: 'Escape' });
  }
}

interface ITooltipFixtureConfig {
  content?: string | TemplateResult | typeof nothing;
  open?: boolean;
  type?: TooltipType;
  triggerType?: TooltipTriggerType;
  delay?: number;
  offset?: number;
}

async function createFixture({ content = 'Tooltip text', open, type, triggerType, delay, offset }: ITooltipFixtureConfig = {}): Promise<TooltipHarness> {
  const container = await fixture<HTMLElement>(html`
    <div>
      <button type="button" id="alt-anchor">Alt Tooltip Anchor</button>
      <button type="button" id="test-anchor">Tooltip Anchor</button>
      <forge-tooltip ?open=${open} type=${type ?? nothing} trigger-type=${triggerType ?? nothing} delay=${delay ?? nothing} offset=${offset ?? nothing}>
        ${content}
      </forge-tooltip>
    </div>
  `);

  const anchorEl = container.querySelector('#test-anchor') as HTMLButtonElement;
  const altAnchorEl = container.querySelector('#alt-anchor') as HTMLButtonElement;
  const tooltipEl = container.querySelector('forge-tooltip') as ITooltipComponent;

  return new TooltipHarness(tooltipEl, anchorEl, altAnchorEl, container);
}
