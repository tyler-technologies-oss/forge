import { expect } from '@esm-bundle/chai';
import { spy } from 'sinon';
import { nothing } from 'lit';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { sendMouse, sendKeys } from '@web/test-runner-commands';
import { timer } from '@tylertech/forge-testing';
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
  });

  describe('accessibility', () => {
    it('should be presentational by default', async () => {
      const harness = await createFixture();

      expect(harness.tooltipElement.type).to.equal('presentation' satisfies TooltipType);
      expect(harness.tooltipElement.hasAttribute(TOOLTIP_CONSTANTS.attributes.TYPE)).to.be.false;
      expect(harness.tooltipElement.hasAttribute('role')).to.be.false;
      expect(harness.anchorElement.hasAttribute('aria-label')).to.be.false;
      expect(harness.anchorElement.hasAttribute('aria-describedby')).to.be.false;
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

    // it('should proxy hide', async () => {
    //   const harness = await createFixture();

    //   harness.tooltipElement.hide = 'never';

    //   expect(harness.tooltipElement.hide).to.equal('never');
    //   expect(harness.overlayElement?.hide).to.equal('never');
    //   expect(harness.tooltipElement.getAttribute(OVERLAY_CONSTANTS.attributes.HIDE)).to.equal('never');
    // });

    // it('should proxy shift', async () => {
    //   const harness = await createFixture();

    //   harness.tooltipElement.shift = true;

    //   expect(harness.tooltipElement.shift).to.be.true;
    //   expect(harness.overlayElement?.shift).to.be.true;
    //   expect(harness.tooltipElement.hasAttribute(OVERLAY_CONSTANTS.attributes.SHIFT)).to.be.true;
    // });

    // it('should proxy flip', async () => {
    //   const harness = await createFixture();

    //   harness.tooltipElement.flip = 'main';

    //   expect(harness.tooltipElement.flip).to.equal('main');
    //   expect(harness.overlayElement?.flip).to.equal('main');
    //   expect(harness.tooltipElement.getAttribute(OVERLAY_CONSTANTS.attributes.FLIP)).to.equal('main');
    // });

    // it('should proxy boundary', async () => {
    //   const harness = await createFixture();

    //   const elId = 'some-element-id';
    //   harness.tooltipElement.boundary = elId;

    //   expect(harness.tooltipElement.boundary).to.equal(elId);
    //   expect(harness.overlayElement?.boundary).to.equal(elId);
    //   expect(harness.tooltipElement.getAttribute(OVERLAY_CONSTANTS.attributes.BOUNDARY)).to.equal(elId);
    // });

    // it('should proxy boundary element', async () => {
    //   const harness = await createFixture();

    //   const boundaryEl = document.createElement('div');

    //   harness.tooltipElement.boundaryElement = boundaryEl;

    //   expect(harness.tooltipElement.boundaryElement).to.equal(boundaryEl);
    //   expect(harness.overlayElement?.boundaryElement).to.equal(boundaryEl);
    // });

    // it('should proxy fallback placements', async () => {
    //   const harness = await createFixture();

    //   harness.tooltipElement.fallbackPlacements = ['top', 'bottom'];

    //   expect(harness.tooltipElement.fallbackPlacements).to.deep.equal(['top', 'bottom']);
    //   expect(harness.overlayElement?.fallbackPlacements).to.deep.equal(['top', 'bottom']);
    // });

    // it('should proxy position() to overlay', async () => {
    //   const harness = await createFixture();

    //   const positionSpy = spy(harness.overlayElement, 'position');

    //   harness.tooltipElement.position();
    //   positionSpy.restore();

    //   expect(positionSpy).to.have.been.calledOnce;
    // });

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
      expect(harness.tooltipElement.hasAttribute(OVERLAY_CONSTANTS.attributes.OPEN)).to.be.true;;

      expect(harness.overlayElement?.open).to.be.true;
    });
  });

  describe('anchor', () => {
    
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
      await timer(harness.tooltipElement.delay + 100);

      expect(harness.isOpen).to.be.true;
    });

    it('should open and close when hovering and unhovering the trigger button', async () => {
      const harness = await createFixture({ triggerType: 'hover' });

      await harness.hoverTrigger();
      await timer(harness.tooltipElement.delay + 100);
      expect(harness.isOpen).to.be.true;
      
      await harness.hoverOutside();

      expect(harness.isOpen).to.be.false;
    });

    it('should not close after open when hovering and unhovering the trigger before the delay elapses', async () => {
      const harness = await createFixture({ triggerType: 'hover' });

      expect(harness.isOpen).to.be.false;

      await harness.hoverTrigger();
      await timer(harness.tooltipElement.delay + 100);
      expect(harness.isOpen).to.be.true;

      await harness.hoverOutside();
      await timer(harness.tooltipElement.delay / 2);
      await harness.hoverTrigger();
      await timer(harness.tooltipElement.delay + 100);

      expect(harness.isOpen).to.be.true;
    });

    it('should use custom hover dismiss delay', async () => {
      const harness = await createFixture({ triggerType: 'hover' });

      const customDelay = 100;
      harness.tooltipElement.delay = customDelay;
      
      expect(harness.tooltipElement.delay).to.equal(customDelay);
      expect(harness.isOpen).to.be.false;

      await harness.hoverTrigger();
      await timer(harness.tooltipElement.delay + 100);
      expect(harness.isOpen).to.be.true;

      await harness.hoverOutside();

      expect(harness.isOpen).to.be.false;
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

    // it('should use custom longpress delay', async () => {
    //   const harness = await createFixture({ triggerType: 'longpress' });

    //   const customDelay = 100;
    //   harness.tooltipElement.longpressDelay = customDelay;
      
    //   expect(harness.tooltipElement.longpressDelay).to.equal(customDelay);
    //   expect(harness.isOpen).to.be.false;

    //   await harness.longpressTrigger(customDelay);
    //   expect(harness.isOpen).to.be.true;
    // });
  });

  // describe('manual trigger type', () => {
  //   it('should not open from user interaction if manual trigger type', async () => {
  //     const harness = await createFixture({ triggerType: 'manual' });

  //     await harness.clickTrigger();
  //     await harness.longpressTrigger();
  //     await harness.doubleClickTrigger();
  //     await harness.focusTrigger();
  //     await harness.hoverTrigger();

  //     expect(harness.isOpen).to.be.false;
  //   });

  //   it('should open via property if manual trigger type', async () => {
  //     const harness = await createFixture({ triggerType: 'manual' });

  //     expect(harness.isOpen).to.be.false;

  //     harness.tooltipElement.open = true;

  //     expect(harness.isOpen).to.be.true;
  //   });
  // });

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
      await timer(harness.tooltipElement.delay + 100);
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
});

class TooltipHarness {
  constructor(
    public tooltipElement: ITooltipComponent,
    public anchorElement: HTMLButtonElement,
    public altAnchorElement: HTMLButtonElement) {}

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
    return this.tooltipElement.open &&
           this.tooltipElement.hasAttribute(TOOLTIP_CONSTANTS.attributes.OPEN) &&
           !!this.overlayElement?.open;
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
    await timer(delay);
    await sendMouse({ type: 'up', button: 'left' });
  }

  public async longpressStopBeforeDelay(): Promise<void> {
    await this.hoverTrigger();
    await sendMouse({ type: 'down', button: 'left' });
    await timer(LONGPRESS_TRIGGER_DELAY / 2);
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
  open?: boolean;
  triggerType?: TooltipTriggerType;
  delay?: number;
  offset?: number;
}

async function createFixture({ open, triggerType, delay, offset }: ITooltipFixtureConfig = {}): Promise<TooltipHarness> {
  const container = await fixture(html`
    <div>
      <button type="button" id="alt-anchor">Alt Tooltip Anchor</button>
      <button type="button" id="test-anchor">Tooltip Anchor</button>
      <forge-tooltip
        ?open=${open}
        trigger-type=${triggerType ?? nothing}
        delay=${delay ?? nothing}
        offset=${offset ?? nothing}>
        Test tooltip content
      </forge-tooltip>
    </div>
  `);

  const anchorEl = container.querySelector('#test-anchor') as HTMLButtonElement;
  const altAnchorEl = container.querySelector('#alt-anchor') as HTMLButtonElement;
  const tooltipEl = container.querySelector('forge-tooltip') as ITooltipComponent;

  return new TooltipHarness(tooltipEl, anchorEl, altAnchorEl);
}
