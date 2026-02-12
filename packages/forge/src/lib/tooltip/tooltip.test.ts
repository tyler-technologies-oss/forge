import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html, nothing, type TemplateResult } from 'lit';
import { userEvent } from 'vitest/browser';
import { TestHarness } from '../core/testing/test-harness.js';
import { frame, task } from '../core/utils/utils.js';
import { LONGPRESS_TRIGGER_DELAY } from '../core/mixins/interactions/longpress/with-longpress-listener.js';
import type { ITooltipComponent } from './tooltip.js';
import type { IOverlayComponent } from '../overlay/overlay.js';
import { OVERLAY_CONSTANTS } from '../overlay/index.js';
import { type TooltipPlacement, type TooltipTriggerType, type TooltipType, TOOLTIP_CONSTANTS } from './tooltip-constants.js';

import './tooltip.js';

class TooltipHarness extends TestHarness<ITooltipComponent> {
  public anchorElement: HTMLButtonElement;
  public altAnchorElement: HTMLButtonElement;
  public containerElement: HTMLElement;

  constructor(el: ITooltipComponent, anchorElement: HTMLButtonElement, altAnchorElement: HTMLButtonElement, containerElement: HTMLElement) {
    super(el);
    this.anchorElement = anchorElement;
    this.altAnchorElement = altAnchorElement;
    this.containerElement = containerElement;
  }

  public initElementRefs(): void {}

  public get contentElement(): HTMLElement {
    return this.element.shadowRoot?.querySelector(TOOLTIP_CONSTANTS.selectors.CONTENT) as HTMLElement;
  }

  public get arrowElement(): HTMLElement {
    return this.element.shadowRoot?.querySelector(TOOLTIP_CONSTANTS.selectors.ARROW) as HTMLElement;
  }

  public get overlayElement(): IOverlayComponent | null {
    return this.element.shadowRoot?.querySelector(OVERLAY_CONSTANTS.elementName) as IOverlayComponent;
  }

  public get isOpen(): boolean {
    return this.element.open && this.element.hasAttribute(TOOLTIP_CONSTANTS.attributes.OPEN) && !!this.overlayElement?.open;
  }

  public clickOutside(): void {
    document.body.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, composed: true }));
  }

  public async clickTrigger(): Promise<void> {
    await userEvent.click(this.anchorElement);
  }

  public async hoverOutside(): Promise<void> {
    if (this.isOpen && this.contentElement) {
      this.contentElement.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true, composed: true }));
    }
    await userEvent.unhover(this.anchorElement);
  }

  public async hoverTrigger(): Promise<void> {
    await userEvent.hover(this.anchorElement);
  }

  public hoverTooltip(): void {
    if (!this.isOpen || !this.contentElement) {
      throw new Error('Cannot hover tooltip when it is not open');
    }
    this.contentElement.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true, composed: true }));
  }

  public async longpressTrigger(delay = LONGPRESS_TRIGGER_DELAY): Promise<void> {
    this.anchorElement.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, composed: true, pointerId: 1 }));
    await task(delay);
    this.anchorElement.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, composed: true, pointerId: 1 }));
  }

  public async longpressStopBeforeDelay(): Promise<void> {
    this.anchorElement.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, composed: true, pointerId: 1 }));
    await task(LONGPRESS_TRIGGER_DELAY / 2);
    this.anchorElement.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, composed: true, pointerId: 1 }));
  }

  public focusTrigger(): void {
    this.anchorElement.focus();
  }

  public blurTrigger(): void {
    this.anchorElement.blur();
  }

  public async pressEscapeKey(): Promise<void> {
    await userEvent.keyboard('{Escape}');
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
  const screen = render(html`
    <div>
      <button type="button" id="alt-anchor">Alt Tooltip Anchor</button>
      <button type="button" id="test-anchor">Tooltip Anchor</button>
      <forge-tooltip ?open=${open} type=${type ?? nothing} trigger-type=${triggerType ?? nothing} delay=${delay ?? nothing} offset=${offset ?? nothing}>
        ${content}
      </forge-tooltip>
    </div>
  `);

  const container = screen.container.firstElementChild as HTMLElement;
  const anchorEl = container.querySelector('#test-anchor') as HTMLButtonElement;
  const altAnchorEl = container.querySelector('#alt-anchor') as HTMLButtonElement;
  const tooltipEl = container.querySelector('forge-tooltip') as ITooltipComponent;

  return new TooltipHarness(tooltipEl, anchorEl, altAnchorEl, container);
}

describe('Tooltip', () => {
  describe('defaults', () => {
    it('should have expected default values', async () => {
      const harness = await createFixture();

      expect(harness.element.open).toBe(false);
      expect(harness.element.type).toBe('presentation' satisfies TooltipType);
      expect(harness.element.anchor).toBeUndefined();
      expect(harness.element.anchorElement).toBe(harness.anchorElement);
      expect(harness.element.placement).toBe('right' satisfies TooltipPlacement);
      expect(harness.element.triggerType).toBe('hover' satisfies TooltipTriggerType);
      expect(harness.element.delay).toBe(TOOLTIP_CONSTANTS.defaults.DELAY);
      expect(harness.element.offset).toBe(TOOLTIP_CONSTANTS.defaults.OFFSET);
    });

    it('should not be open by default', async () => {
      const harness = await createFixture();
      expect(harness.isOpen).toBe(false);
    });

    it('should open by default with open attribute', async () => {
      const harness = await createFixture({ open: true });
      expect(harness.isOpen).toBe(true);
    });

    it('should toggle open via property', async () => {
      const harness = await createFixture();

      harness.element.open = true;
      expect(harness.isOpen).toBe(true);

      harness.element.open = false;
      expect(harness.isOpen).toBe(false);
    });

    it('should not open if there is no text content', async () => {
      const harness = await createFixture({ content: nothing });

      harness.element.open = true;

      expect(harness.isOpen).toBe(false);
      expect(harness.element.open).toBe(false);
      expect(harness.element.hasAttribute(TOOLTIP_CONSTANTS.attributes.OPEN)).toBe(false);
    });

    it('should open if there is an element node even if no text content', async () => {
      const harness = await createFixture({ content: html`<span></span>` });

      harness.element.open = true;

      expect(harness.isOpen).toBe(true);
      expect(harness.element.open).toBe(true);
      expect(harness.element.hasAttribute(TOOLTIP_CONSTANTS.attributes.OPEN)).toBe(true);
    });
  });

  describe('accessibility', () => {
    it('should be presentational by default', async () => {
      const harness = await createFixture();

      expect(harness.element.type).toBe('presentation' satisfies TooltipType);
      expect(harness.element.hasAttribute(TOOLTIP_CONSTANTS.attributes.TYPE)).toBe(false);
      expect(harness.element.hasAttribute('role')).toBe(false);
      expect(harness.element.hasAttribute('aria-hidden')).toBe(true);
      expect(harness.anchorElement.hasAttribute('aria-label')).toBe(false);
      expect(harness.anchorElement.hasAttribute('aria-labelledby')).toBe(false);
      expect(harness.anchorElement.hasAttribute('aria-describedby')).toBe(false);
    });

    it('should be accessible when closed with presentation type', async () => {
      const harness = await createFixture();

      expect(harness.isOpen).toBe(false);
      expect(harness.element.type).toBe('presentation' satisfies TooltipType);
      expect(harness.element.hasAttribute('role')).toBe(false);
      expect(harness.element.hasAttribute('aria-hidden')).toBe(true);
      await expect(harness.element).toBeAccessible();
    });

    it('should be accessible when closed with label type', async () => {
      const harness = await createFixture({ type: 'label' });

      expect(harness.isOpen).toBe(false);
      expect(harness.element.type).toBe('label' satisfies TooltipType);
      expect(harness.anchorElement.getAttribute('aria-labelledby')).toBe(harness.element.id);
      expect(harness.anchorElement.hasAttribute('aria-describedby')).toBe(false);
      expect(harness.element.hasAttribute('aria-hidden')).toBe(true);
      await expect(harness.element).toBeAccessible();
    });

    it('should be accessible when closed with description type', async () => {
      const harness = await createFixture({ type: 'description' });

      expect(harness.isOpen).toBe(false);
      expect(harness.element.type).toBe('description' satisfies TooltipType);
      expect(harness.anchorElement.getAttribute('aria-describedby')).toBe(harness.element.id);
      expect(harness.anchorElement.hasAttribute('aria-labelledby')).toBe(false);
      expect(harness.element.hasAttribute('aria-hidden')).toBe(true);
      await expect(harness.element).toBeAccessible();
    });

    it('should be accessible when open with presentation type', async () => {
      const harness = await createFixture({ open: true });

      expect(harness.isOpen).toBe(true);
      expect(harness.element.hasAttribute('aria-hidden')).toBe(true);
      expect(harness.element.hasAttribute('role')).toBe(false);
      expect(harness.anchorElement.hasAttribute('aria-labelledby')).toBe(false);
      expect(harness.anchorElement.hasAttribute('aria-describedby')).toBe(false);
      await expect(harness.element).toBeAccessible();
    });

    it('should be accessible when open with label type', async () => {
      const harness = await createFixture({ open: true, type: 'label' });

      expect(harness.isOpen).toBe(true);
      expect(harness.element.hasAttribute('aria-hidden')).toBe(true);
      expect(harness.element.hasAttribute('role')).toBe(false);
      expect(harness.anchorElement.hasAttribute('aria-describedby')).toBe(false);
      expect(harness.anchorElement.getAttribute('aria-labelledby')).toBe(harness.element.id);
      await expect(harness.element).toBeAccessible();
    });

    it('should be accessible when open with description type', async () => {
      const harness = await createFixture({ open: true, type: 'description' });

      expect(harness.isOpen).toBe(true);
      expect(harness.element.hasAttribute('aria-hidden')).toBe(true);
      expect(harness.element.getAttribute('role')).toBe('tooltip');
      expect(harness.anchorElement.hasAttribute('aria-labelledby')).toBe(false);
      expect(harness.anchorElement.getAttribute('aria-describedby')).toBe(harness.element.id);
      await expect(harness.element).toBeAccessible();
    });

    it('should not override user-provided aria-labelledby', async () => {
      const harness = await createFixture();

      harness.element.setAttribute('aria-labelledby', 'test-id');
      harness.anchorElement.setAttribute('aria-labelledby', 'test-id');
      harness.element.type = 'label';

      await frame();

      expect(harness.anchorElement.getAttribute('aria-labelledby')).toBe('test-id');
      await expect(harness.element).toBeAccessible();
    });

    it('should not override user-provided aria-describedby', async () => {
      const harness = await createFixture();

      harness.element.setAttribute('aria-describedby', 'test-id');
      harness.anchorElement.setAttribute('aria-describedby', 'test-id');
      harness.element.type = 'description';

      await frame();

      expect(harness.anchorElement.getAttribute('aria-describedby')).toBe('test-id');
      await expect(harness.element).toBeAccessible();
    });

    it('should detach aria-labelledby when changing anchor elements', async () => {
      const harness = await createFixture({ type: 'label' });

      expect(harness.anchorElement.getAttribute('aria-labelledby')).toBe(harness.element.id);

      harness.element.anchorElement = harness.altAnchorElement;

      expect(harness.anchorElement.hasAttribute('aria-labelledby')).toBe(false);
      expect(harness.altAnchorElement.getAttribute('aria-labelledby')).toBe(harness.element.id);
      await expect(harness.element).toBeAccessible();
    });

    it('should detach aria-labelledby when changing anchor elements via id', async () => {
      const harness = await createFixture({ type: 'label' });

      expect(harness.anchorElement.getAttribute('aria-labelledby')).toBe(harness.element.id);

      harness.element.anchor = harness.altAnchorElement.id;

      expect(harness.anchorElement.hasAttribute('aria-labelledby')).toBe(false);
      expect(harness.altAnchorElement.getAttribute('aria-labelledby')).toBe(harness.element.id);
      await expect(harness.element).toBeAccessible();
    });

    it('should detach aria-labelledby when removing tooltip', async () => {
      const harness = await createFixture({ type: 'label' });

      expect(harness.anchorElement.getAttribute('aria-labelledby')).toBe(harness.element.id);

      harness.element.remove();

      expect(harness.anchorElement.hasAttribute('aria-labelledby')).toBe(false);
    });

    it('should detach aria-describedby when changing anchor elements', async () => {
      const harness = await createFixture({ type: 'description' });

      expect(harness.anchorElement.getAttribute('aria-describedby')).toBe(harness.element.id);

      harness.element.anchorElement = harness.altAnchorElement;

      expect(harness.anchorElement.hasAttribute('aria-describedby')).toBe(false);
      expect(harness.altAnchorElement.getAttribute('aria-describedby')).toBe(harness.element.id);
      await expect(harness.element).toBeAccessible();
    });

    it('should detach aria-describedby when changing anchor elements via id', async () => {
      const harness = await createFixture({ type: 'description' });

      expect(harness.anchorElement.getAttribute('aria-describedby')).toBe(harness.element.id);

      harness.element.anchor = harness.altAnchorElement.id;

      expect(harness.anchorElement.hasAttribute('aria-describedby')).toBe(false);
      expect(harness.altAnchorElement.getAttribute('aria-describedby')).toBe(harness.element.id);
      await expect(harness.element).toBeAccessible();
    });

    it('should detach aria-describedby when removing tooltip', async () => {
      const harness = await createFixture({ type: 'description' });

      expect(harness.anchorElement.getAttribute('aria-describedby')).toBe(harness.element.id);

      harness.element.remove();

      expect(harness.anchorElement.hasAttribute('aria-describedby')).toBe(false);
    });

    it('should not remove user-provided aria-labelledby or aria-describedby attributes when removing tooltip if presentation type', async () => {
      const harness = await createFixture();

      harness.anchorElement.setAttribute('aria-labelledby', 'test-id');
      harness.anchorElement.setAttribute('aria-describedby', 'test-id');

      harness.element.remove();

      expect(harness.anchorElement.getAttribute('aria-labelledby')).toBe('test-id');
      expect(harness.anchorElement.getAttribute('aria-describedby')).toBe('test-id');
    });
  });

  describe('overlay', () => {
    it('should proxy placement', async () => {
      const harness = await createFixture();

      harness.element.placement = 'bottom';

      expect(harness.element.placement).toBe('bottom');
      expect(harness.element.getAttribute(OVERLAY_CONSTANTS.attributes.PLACEMENT)).toBe('bottom');

      harness.element.open = true;

      expect(harness.overlayElement?.placement).toBe('bottom');
    });

    it('should proxy offset', async () => {
      const harness = await createFixture();

      const offset = 10;
      harness.element.offset = offset;

      expect(harness.element.offset).toEqual(offset);
      expect(harness.element.getAttribute(TOOLTIP_CONSTANTS.attributes.OFFSET)).toBe(`${offset}`);

      harness.element.open = true;

      expect(harness.overlayElement?.offset).toEqual({ mainAxis: offset });
    });

    it('should proxy flip', async () => {
      const harness = await createFixture();

      harness.element.flip = 'main';

      expect(harness.element.flip).toBe('main');
      expect(harness.element.getAttribute(OVERLAY_CONSTANTS.attributes.FLIP)).toBe('main');

      harness.element.open = true;

      expect(harness.overlayElement?.flip).toBe('main');
    });

    it('should proxy boundary', async () => {
      const harness = await createFixture();

      const elId = 'alt-anchor';
      harness.element.boundary = elId;

      expect(harness.element.boundary).toBe(elId);
      expect(harness.element.getAttribute(OVERLAY_CONSTANTS.attributes.BOUNDARY)).toBe(elId);

      harness.element.open = true;

      expect(harness.overlayElement?.boundaryElement).toBe(harness.altAnchorElement);
    });

    it('should proxy boundary element', async () => {
      const harness = await createFixture();

      const boundaryEl = document.createElement('div');

      harness.element.boundaryElement = boundaryEl;

      expect(harness.element.boundaryElement).toBe(boundaryEl);

      harness.element.open = true;

      expect(harness.overlayElement?.boundaryElement).toBe(boundaryEl);
    });

    it('should proxy fallback placements', async () => {
      const harness = await createFixture();

      harness.element.fallbackPlacements = ['top', 'bottom'];

      expect(harness.element.fallbackPlacements).toEqual(['top', 'bottom']);

      harness.element.open = true;

      expect(harness.overlayElement?.fallbackPlacements).toEqual(['top', 'bottom']);
    });

    it('should proxy fallback placements via attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute(TOOLTIP_CONSTANTS.attributes.FALLBACK_PLACEMENTS, 'top,bottom');

      expect(harness.element.fallbackPlacements).toEqual(['top', 'bottom']);

      harness.element.open = true;

      expect(harness.overlayElement?.fallbackPlacements).toEqual(['top', 'bottom']);
    });

    it('should proxy anchorElement', async () => {
      const harness = await createFixture();

      harness.element.anchorElement = harness.altAnchorElement;

      expect(harness.element.anchorElement).toBe(harness.altAnchorElement);

      harness.element.open = true;

      expect(harness.overlayElement?.anchorElement).toBe(harness.altAnchorElement);
    });

    it('should proxy anchor', async () => {
      const harness = await createFixture();

      harness.element.anchor = harness.altAnchorElement.id;

      expect(harness.element.anchor).toBe(harness.altAnchorElement.id);

      harness.element.open = true;

      expect(harness.overlayElement?.anchorElement).toBe(harness.altAnchorElement);
    });

    it('should proxy open', async () => {
      const harness = await createFixture();

      harness.element.open = true;

      expect(harness.element.open).toBe(true);
      expect(harness.element.hasAttribute(OVERLAY_CONSTANTS.attributes.OPEN)).toBe(true);

      expect(harness.overlayElement?.open).toBe(true);
    });
  });

  describe('anchor', () => {
    it('should set anchor to previous element sibling implicitly', async () => {
      const harness = await createFixture();
      expect(harness.element.anchorElement).toBe(harness.anchorElement);
    });

    it('should set anchorElement explicitly', async () => {
      const harness = await createFixture();

      harness.element.anchorElement = harness.altAnchorElement;

      expect(harness.element.anchorElement).toBe(harness.altAnchorElement);
    });

    it('should set anchor via id reference explicitly', async () => {
      const harness = await createFixture();

      harness.element.anchor = harness.altAnchorElement.id;

      expect(harness.element.anchorElement).toBe(harness.altAnchorElement);
      expect(harness.element.getAttribute(TOOLTIP_CONSTANTS.attributes.ANCHOR)).toBe(harness.altAnchorElement.id);
    });

    it('should automatically set anchor to parent element if no previous sibling element exists', async () => {
      const harness = await createFixture();

      const newTooltip = document.createElement('forge-tooltip');
      harness.containerElement.insertAdjacentElement('afterbegin', newTooltip);

      expect(newTooltip.anchorElement).toBe(harness.containerElement);
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
      expect(harness.isOpen).toBe(false);
    });
  });

  describe('hover trigger type', () => {
    it('should open when hovering the trigger button', async () => {
      const harness = await createFixture({ triggerType: 'hover' });

      expect(harness.isOpen).toBe(false);

      await harness.hoverTrigger();
      await task(harness.element.delay + 100);

      expect(harness.isOpen).toBe(true);
    });

    it('should open and close when hovering and unhovering the trigger button', async () => {
      const harness = await createFixture({ triggerType: 'hover' });

      await harness.hoverTrigger();
      await task(harness.element.delay + 100);
      expect(harness.isOpen).toBe(true);

      await harness.hoverOutside();
      await task(TOOLTIP_CONSTANTS.numbers.HOVER_OUTSIDE_THRESHOLD + 50);

      expect(harness.isOpen).toBe(false);
    });

    it('should not close after open when hovering and unhovering the trigger before the delay elapses', async () => {
      const harness = await createFixture({ triggerType: 'hover' });

      expect(harness.isOpen).toBe(false);

      await harness.hoverTrigger();
      await task(harness.element.delay + 100);
      expect(harness.isOpen).toBe(true);

      await harness.hoverOutside();
      await task(harness.element.delay / 2);
      await harness.hoverTrigger();
      await task(harness.element.delay + 100);

      expect(harness.isOpen).toBe(true);
    });

    it('should use custom hover dismiss delay', async () => {
      const harness = await createFixture({ triggerType: 'hover' });

      const customDelay = 100;
      harness.element.delay = customDelay;

      expect(harness.element.delay).toBe(customDelay);
      expect(harness.isOpen).toBe(false);

      await harness.hoverTrigger();
      await task(harness.element.delay + 100);
      expect(harness.isOpen).toBe(true);

      await harness.hoverOutside();
      await task(TOOLTIP_CONSTANTS.numbers.HOVER_OUTSIDE_THRESHOLD + 50);

      expect(harness.isOpen).toBe(false);
    });

    it('should open immediately when hover delay is set to 0', async () => {
      const harness = await createFixture({ triggerType: 'hover', delay: 0 });

      expect(harness.isOpen).toBe(false);

      await harness.hoverTrigger();
      expect(harness.isOpen).toBe(true);
    });

    it('should open when focusing the trigger via keyboard with hover trigger type', async () => {
      const harness = await createFixture({ triggerType: 'hover' });

      expect(harness.isOpen).toBe(false);

      harness.focusTrigger();
      expect(harness.isOpen).toBe(true);
    });

    it('should close when blurring the trigger after keyboard focus with hover trigger type', async () => {
      const harness = await createFixture({ triggerType: 'hover' });

      harness.focusTrigger();
      expect(harness.isOpen).toBe(true);

      harness.blurTrigger();
      expect(harness.isOpen).toBe(false);
    });

    it('should not open when clicking the trigger with hover trigger type (no keyboard focus)', async () => {
      const harness = await createFixture({ triggerType: 'hover' });

      expect(harness.isOpen).toBe(false);

      await harness.clickTrigger();
      expect(harness.isOpen).toBe(false);
    });

    it('should use grace period when moving away from anchor', async () => {
      const harness = await createFixture({ triggerType: 'hover', delay: 0 });

      await harness.hoverTrigger();
      expect(harness.isOpen).toBe(true);

      await harness.hoverOutside();
      expect(harness.isOpen).toBe(true);

      await task(TOOLTIP_CONSTANTS.numbers.HOVER_OUTSIDE_THRESHOLD + 50);
      expect(harness.isOpen).toBe(false);
    });

    it('should allow hovering the tooltip itself to keep it open', async () => {
      const harness = await createFixture({ triggerType: 'hover', delay: 0 });

      await harness.hoverTrigger();
      expect(harness.isOpen).toBe(true);

      await harness.hoverOutside();

      harness.hoverTooltip();

      await task(TOOLTIP_CONSTANTS.numbers.HOVER_OUTSIDE_THRESHOLD + 50);
      expect(harness.isOpen).toBe(true);

      await harness.hoverOutside();
      await task(TOOLTIP_CONSTANTS.numbers.HOVER_OUTSIDE_THRESHOLD + 50);
      expect(harness.isOpen).toBe(false);
    });

    it('should close tooltip when moving from anchor to outside during grace period', async () => {
      const harness = await createFixture({ triggerType: 'hover', delay: 0 });

      await harness.hoverTrigger();
      expect(harness.isOpen).toBe(true);

      await harness.hoverOutside();
      await task(TOOLTIP_CONSTANTS.numbers.HOVER_OUTSIDE_THRESHOLD + 50);
      expect(harness.isOpen).toBe(false);
    });

    it('should allow rapid transitions between anchor and tooltip', async () => {
      const harness = await createFixture({ triggerType: 'hover', delay: 0 });

      await harness.hoverTrigger();
      expect(harness.isOpen).toBe(true);

      harness.hoverTooltip();
      expect(harness.isOpen).toBe(true);

      await harness.hoverTrigger();
      expect(harness.isOpen).toBe(true);

      harness.hoverTooltip();
      expect(harness.isOpen).toBe(true);

      await harness.hoverOutside();
      await task(TOOLTIP_CONSTANTS.numbers.HOVER_OUTSIDE_THRESHOLD + 50);
      expect(harness.isOpen).toBe(false);
    });

    it('should only attach tooltip hover listeners when hover trigger is active', async () => {
      const harness = await createFixture({ triggerType: 'focus' });

      harness.focusTrigger();
      expect(harness.isOpen).toBe(true);

      harness.hoverTooltip();
      expect(harness.isOpen).toBe(true);

      harness.blurTrigger();
      expect(harness.isOpen).toBe(false);
    });

    it('should handle anchor → tooltip → anchor transitions correctly', async () => {
      const harness = await createFixture({ triggerType: 'hover', delay: 0 });

      await harness.hoverTrigger();
      expect(harness.isOpen).toBe(true);

      harness.hoverTooltip();
      expect(harness.isOpen).toBe(true);

      await harness.hoverTrigger();
      expect(harness.isOpen).toBe(true);

      await task(TOOLTIP_CONSTANTS.numbers.HOVER_OUTSIDE_THRESHOLD + 50);
      expect(harness.isOpen).toBe(true);

      await harness.hoverOutside();
      await task(TOOLTIP_CONSTANTS.numbers.HOVER_OUTSIDE_THRESHOLD + 50);
      expect(harness.isOpen).toBe(false);
    });

    it('should handle quick anchor re-entry scenarios', async () => {
      const harness = await createFixture({ triggerType: 'hover', delay: 0 });

      await harness.hoverTrigger();
      expect(harness.isOpen).toBe(true);

      await harness.hoverOutside();
      expect(harness.isOpen).toBe(true);

      await task(TOOLTIP_CONSTANTS.numbers.HOVER_OUTSIDE_THRESHOLD / 2);
      await harness.hoverTrigger();
      expect(harness.isOpen).toBe(true);

      await task(TOOLTIP_CONSTANTS.numbers.HOVER_OUTSIDE_THRESHOLD + 50);
      expect(harness.isOpen).toBe(true);

      await harness.hoverOutside();
      await task(TOOLTIP_CONSTANTS.numbers.HOVER_OUTSIDE_THRESHOLD + 50);
      expect(harness.isOpen).toBe(false);
    });

    it('should use increased grace period for better usability', async () => {
      const harness = await createFixture({ triggerType: 'hover', delay: 0 });

      await harness.hoverTrigger();
      expect(harness.isOpen).toBe(true);

      await harness.hoverOutside();

      await task(50);
      expect(harness.isOpen).toBe(true);

      await task(TOOLTIP_CONSTANTS.numbers.HOVER_OUTSIDE_THRESHOLD + 50);
      expect(harness.isOpen).toBe(false);
    });

    it('should handle rapid multiple transitions between anchor and tooltip', async () => {
      const harness = await createFixture({ triggerType: 'hover', delay: 0 });

      await harness.hoverTrigger();
      expect(harness.isOpen).toBe(true);

      for (let i = 0; i < 3; i++) {
        harness.hoverTooltip();
        expect(harness.isOpen).toBe(true);
        await task(50);

        await harness.hoverTrigger();
        expect(harness.isOpen).toBe(true);
        await task(50);
      }

      await harness.hoverOutside();
      await task(TOOLTIP_CONSTANTS.numbers.HOVER_OUTSIDE_THRESHOLD + 50);
      expect(harness.isOpen).toBe(false);
    });
  });

  describe('longpress trigger type', () => {
    it('should open when longpressing the anchor', async () => {
      const harness = await createFixture({ triggerType: 'longpress' });

      await harness.longpressTrigger();

      expect(harness.isOpen).toBe(true);
    });

    it('should close by click outside after longpressing to open', async () => {
      const harness = await createFixture({ triggerType: 'longpress' });

      await harness.longpressTrigger();
      expect(harness.isOpen).toBe(true);

      harness.clickOutside();
      expect(harness.isOpen).toBe(false);
    });

    it('should not open when releasing the anchor before the longpress delay', async () => {
      const harness = await createFixture({ triggerType: 'longpress' });

      await harness.longpressStopBeforeDelay();
      expect(harness.isOpen).toBe(false);
    });

    it('should automatically hide after longpress visibility threshold', async () => {
      const harness = await createFixture({ triggerType: 'longpress' });

      await harness.longpressTrigger();
      expect(harness.isOpen).toBe(true);

      await task(TOOLTIP_CONSTANTS.numbers.LONGPRESS_VISIBILITY_DURATION + 100);
      expect(harness.isOpen).toBe(false);
    });
  });

  describe('multiple trigger types', () => {
    it('should allow for providing multiple trigger types via attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute(TOOLTIP_CONSTANTS.attributes.TRIGGER_TYPE, 'hover,focus');

      expect(harness.element.triggerType).toEqual(['hover', 'focus']);
    });

    it('should fall back to default trigger type of "hover" if trigger-type attribute is removed', async () => {
      const harness = await createFixture({ triggerType: 'focus' });

      harness.element.removeAttribute(TOOLTIP_CONSTANTS.attributes.TRIGGER_TYPE);

      expect(harness.element.triggerType).toBe('hover');
    });

    it('should fall back to default trigger type of "hover" if triggerType property is set to empty array', async () => {
      const harness = await createFixture({ triggerType: 'focus' });

      harness.element.triggerType = [];

      expect(harness.element.triggerType).toBe('hover');
    });

    it('should fall back to default trigger type of "hover" if triggerType property is set to null', async () => {
      const harness = await createFixture({ triggerType: 'focus' });

      harness.element.triggerType = null as any;

      expect(harness.element.triggerType).toBe('hover');
    });

    it('should open/close via focus when both focus and hover triggers to be specified together', async () => {
      const harness = await createFixture();

      harness.element.setAttribute(TOOLTIP_CONSTANTS.attributes.TRIGGER_TYPE, 'focus,hover');

      expect(harness.element.triggerType).toEqual(['focus', 'hover']);

      harness.focusTrigger();
      expect(harness.isOpen).toBe(true);

      harness.blurTrigger();
      expect(harness.isOpen).toBe(false);
    });

    it('should open/close via hover when both focus and hover triggers to be specified together', async () => {
      const harness = await createFixture();

      harness.element.setAttribute(TOOLTIP_CONSTANTS.attributes.TRIGGER_TYPE, 'focus,hover');

      expect(harness.element.triggerType).toEqual(['focus', 'hover']);

      await harness.hoverOutside();
      await harness.hoverTrigger();
      await task(harness.element.delay + 100);
      expect(harness.isOpen).toBe(true);

      await harness.hoverOutside();
      await task(TOOLTIP_CONSTANTS.numbers.HOVER_OUTSIDE_THRESHOLD + 50);

      expect(harness.isOpen).toBe(false);
    });

    it('should work correctly when both focus and hover triggers are specified (no double keyboard focus handling)', async () => {
      const harness = await createFixture();

      harness.element.setAttribute(TOOLTIP_CONSTANTS.attributes.TRIGGER_TYPE, 'focus,hover');

      expect(harness.element.triggerType).toEqual(['focus', 'hover']);

      harness.focusTrigger();
      expect(harness.isOpen).toBe(true);

      harness.blurTrigger();
      expect(harness.isOpen).toBe(false);

      await harness.hoverTrigger();
      await task(harness.element.delay + 100);
      expect(harness.isOpen).toBe(true);

      await harness.hoverOutside();
      await task(TOOLTIP_CONSTANTS.numbers.HOVER_OUTSIDE_THRESHOLD + 50);
      expect(harness.isOpen).toBe(false);
    });
  });

  describe('light dismiss', () => {
    it('should dismiss when clicking outside the tooltip', async () => {
      const harness = await createFixture({ open: true });

      harness.clickOutside();

      expect(harness.isOpen).toBe(false);
    });

    it('should dismiss when pressing the escape key', async () => {
      const harness = await createFixture({ open: true });

      await harness.pressEscapeKey();

      expect(harness.isOpen).toBe(false);
    });
  });

  describe('arrow', () => {
    it('should show arrow element', async () => {
      const harness = await createFixture({ open: true });

      expect(harness.arrowElement).toBeTruthy();
    });
  });

  describe('deprecated properties/attributes', () => {
    it('should set placement when setting deprecated position property', async () => {
      const harness = await createFixture();

      harness.element.position = 'bottom';

      expect(harness.element.position).toBe('bottom');
      expect(harness.element.placement).toBe('bottom');
      expect(harness.element.getAttribute(TOOLTIP_CONSTANTS.attributes.PLACEMENT)).toBe('bottom');
      expect(harness.element.hasAttribute('position')).toBe(false);
    });

    it('should set position when setting deprecated position attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute('position', 'bottom');

      expect(harness.element.position).toBe('bottom');
      expect(harness.element.placement).toBe('bottom');
      expect(harness.element.getAttribute(TOOLTIP_CONSTANTS.attributes.PLACEMENT)).toBe('bottom');
      expect(harness.element.getAttribute('position')).toBe('bottom');
    });

    it('should set anchor when setting deprecated target property', async () => {
      const harness = await createFixture();

      harness.element.target = 'alt-anchor';

      expect(harness.element.target).toBe('alt-anchor');
      expect(harness.element.anchor).toBe('alt-anchor');
      expect(harness.element.getAttribute(TOOLTIP_CONSTANTS.attributes.ANCHOR)).toBe('alt-anchor');
      expect(harness.element.hasAttribute('target')).toBe(false);
    });

    it('should set anchor when setting deprecated target attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute('target', 'alt-anchor');

      expect(harness.element.target).toBe('alt-anchor');
      expect(harness.element.anchor).toBe('alt-anchor');
      expect(harness.element.getAttribute(TOOLTIP_CONSTANTS.attributes.ANCHOR)).toBe('alt-anchor');
      expect(harness.element.getAttribute('target')).toBe('alt-anchor');
    });
  });
});
