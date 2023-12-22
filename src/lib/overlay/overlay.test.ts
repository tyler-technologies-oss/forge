import { nothing } from 'lit';
import { expect } from '@esm-bundle/chai';
import { spy } from 'sinon';
import { sendMouse, sendKeys } from '@web/test-runner-commands';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { IOverlayComponent, OverlayComponent } from './overlay';
import { OverlayFlipState, OverlayHideState, overlayStack, OVERLAY_CONSTANTS } from './overlay-constants';

import './overlay';

describe('Overlay', () => {
  describe('defaults', () => {
    it('should be accessible', async () => {
      const harness = await createFixture();

      await expect(harness.overlayElement).to.be.accessible();
    });

    it('should not be open by default', async () => {
      const harness = await createFixture();

      expect(harness.isOpen).to.be.false;
    });

    it('should have expected default state', async () => {
      const harness = await createFixture();

      expect(harness.overlayElement.anchorElement).to.equal(harness.anchorElement);
      expect(harness.overlayElement.anchor).to.equal('test-anchor');
      expect(harness.overlayElement.open).to.be.false;
      expect(harness.overlayElement.inline).to.be.false;
      expect(harness.overlayElement.placement).to.equal('bottom');
      expect(harness.overlayElement.positionStrategy).to.equal('fixed');
      expect(harness.overlayElement.offset).to.deep.equal({});
      expect(harness.overlayElement.shift).to.be.false;
      expect(harness.overlayElement.hide).to.equal('auto' as OverlayHideState);
      expect(harness.overlayElement.static).to.be.false;
      expect(harness.overlayElement.flip).to.equal('auto' as OverlayFlipState);
      expect(harness.overlayElement.auto).to.be.false;
    });
  });

  describe('overlay stack', () => {
    it('should update overlay stack when open', async () => {
      const harness = await createFixture();

      harness.overlayElement.open = true;

      expect(Array.from(OverlayComponent[overlayStack])).to.deep.equal([harness.overlayElement]);

      harness.overlayElement.open = false;

      expect(Array.from(OverlayComponent[overlayStack])).to.deep.equal([]);
    });

    it('should remove from overlay stack when removed from DOM', async () => {
      const harness = await createFixture();

      harness.overlayElement.open = true;

      expect(Array.from(OverlayComponent[overlayStack])).to.deep.equal([harness.overlayElement]);

      harness.overlayElement.remove();

      expect(Array.from(OverlayComponent[overlayStack])).to.deep.equal([]);
    });

    it('should remove from overlay stack when light dismissed', async () => {
      const harness = await createFixture();

      harness.overlayElement.open = true;

      expect(Array.from(OverlayComponent[overlayStack])).to.deep.equal([harness.overlayElement]);

      await harness.clickOutside();

      expect(Array.from(OverlayComponent[overlayStack])).to.deep.equal([]);
    });

    it('should update overlay stack with nested overlays', async () => {
      const { parentHarness, nestedHarness } = await createNestedFixture();

      parentHarness.overlayElement.open = true;
      await elementUpdated(parentHarness.overlayElement);

      nestedHarness.overlayElement.open = true;
      await elementUpdated(nestedHarness.overlayElement);

      expect(Array.from(OverlayComponent[overlayStack])).to.deep.equal([parentHarness.overlayElement, nestedHarness.overlayElement]);

      nestedHarness.pressEscapeKey();
      await elementUpdated(nestedHarness.overlayElement);

      expect(Array.from(OverlayComponent[overlayStack])).to.deep.equal([parentHarness.overlayElement]);
    });
  });

  describe('opened by default', () => {
    it('should set open by default when set statically', async () => {
      const harness = await createFixture({ open: true });

      expect(harness.isOpen).to.be.true;
      expect(harness.rootElement.hasAttribute('popover')).to.be.true;
      expect(harness.rootElement.getAttribute('popover')).to.equal('manual');
      expect(harness.isPopoverOpen).to.be.true;
    });

    it('should set open by default when set statically with inline', async () => {
      const harness = await createFixture({ open: true, inline: true });

      expect(harness.isOpen).to.be.true;
      expect(harness.overlayElement.inline).to.be.true;
      expect(harness.overlayElement.hasAttribute(OVERLAY_CONSTANTS.attributes.INLINE)).to.be.true;
      expect(harness.isInlineOpen).to.be.true;
    });
  });
  
  describe('show/hide', () => {
    it('should set open', async () => {
      const harness = await createFixture();

      harness.overlayElement.open = true;

      expect(harness.isOpen).to.be.true;
    });

    it('should hide after being open', async () => {
      const harness = await createFixture();

      harness.overlayElement.open = true;

      expect(harness.isOpen).to.be.true;
      await elementUpdated(harness.overlayElement);

      harness.overlayElement.open = false;

      expect(harness.isOpen).to.be.false;
    });

    it('should set open via attribute', async () => {
      const harness = await createFixture();

      harness.overlayElement.setAttribute('open', '');

      expect(harness.isOpen).to.be.true;
    });

    it('should use native popover API by default', async () => {
      const harness = await createFixture();

      expect(harness.isPopoverOpen).to.be.false;

      harness.overlayElement.open = true;

      expect(harness.rootElement.hasAttribute('popover')).to.be.true;
      expect(harness.rootElement.getAttribute('popover')).to.equal('manual');
      expect(harness.isPopoverOpen).to.be.true;
    });

    it('should open inline', async () => {
      const harness = await createFixture({ inline: true });

      harness.overlayElement.open = true;

      expect(harness.overlayElement.inline).to.be.true;
      expect(harness.overlayElement.hasAttribute(OVERLAY_CONSTANTS.attributes.INLINE)).to.be.true;
      expect(harness.isInlineOpen).to.be.true;
    });
  });

  describe('light dismiss', () => {
    it('should light dismiss when clicking outside of the overlay', async () => {
      const harness = await createFixture();
      const lightDismissSpy = spy();
      harness.overlayElement.addEventListener(OVERLAY_CONSTANTS.events.LIGHT_DISMISS, lightDismissSpy);

      harness.overlayElement.open = true;

      expect(harness.isOpen).to.be.true;

      await harness.clickOutside();

      expect(harness.isOpen).to.be.false;
      expect(lightDismissSpy).to.have.been.calledOnce;
    });

    it('should not light dismiss when clicking inside of the overlay', async () => {
      const harness = await createFixture();
      const lightDismissSpy = spy();
      harness.overlayElement.addEventListener(OVERLAY_CONSTANTS.events.LIGHT_DISMISS, lightDismissSpy);

      harness.overlayElement.open = true;
      
      expect(harness.isOpen).to.be.true;
      
      await elementUpdated(harness.overlayElement);
      await harness.clickOverlay();

      expect(harness.isOpen).to.be.true;
      expect(lightDismissSpy).to.not.have.been.called;
    });

    it('should light dismiss when clicking outside of the overlay with inline', async () => {
      const harness = await createFixture({ inline: true });
      const lightDismissSpy = spy();
      harness.overlayElement.addEventListener(OVERLAY_CONSTANTS.events.LIGHT_DISMISS, lightDismissSpy);

      harness.overlayElement.open = true;

      expect(harness.isOpen).to.be.true;

      await harness.clickOutside();

      expect(harness.isOpen).to.be.false;
      expect(lightDismissSpy).to.have.been.calledOnce;
    });

    it('should light dismiss when pressing escape key', async () => {
      const harness = await createFixture();
      const lightDismissSpy = spy();
      harness.overlayElement.addEventListener(OVERLAY_CONSTANTS.events.LIGHT_DISMISS, lightDismissSpy);

      harness.overlayElement.open = true;

      expect(harness.isOpen).to.be.true;

      await harness.pressEscapeKey();

      expect(harness.isOpen).to.be.false;
      expect(lightDismissSpy).to.have.been.calledOnce;
    });

    it('should light dismiss when pressing escape key with inline', async () => {
      const harness = await createFixture({ inline: true });
      const lightDismissSpy = spy();
      harness.overlayElement.addEventListener(OVERLAY_CONSTANTS.events.LIGHT_DISMISS, lightDismissSpy);

      harness.overlayElement.open = true;

      expect(harness.isOpen).to.be.true;

      await harness.pressEscapeKey();

      expect(harness.isOpen).to.be.false;
      expect(lightDismissSpy).to.have.been.calledOnce;
    });

    it('should not light dismiss when static', async () => {
      const harness = await createFixture({ inline: true, isStatic: true });
      const lightDismissSpy = spy();
      harness.overlayElement.addEventListener(OVERLAY_CONSTANTS.events.LIGHT_DISMISS, lightDismissSpy);

      harness.overlayElement.open = true;

      expect(harness.isOpen).to.be.true;

      await harness.clickOutside();

      expect(harness.isOpen).to.be.true;
      expect(lightDismissSpy).to.not.have.been.called;
    });

    it('should cancel light dismiss event', async () => {
      const harness = await createFixture();
      const lightDismissSpy = spy(evt => evt.preventDefault());
      harness.overlayElement.addEventListener(OVERLAY_CONSTANTS.events.LIGHT_DISMISS, lightDismissSpy);

      harness.overlayElement.open = true;

      expect(harness.isOpen).to.be.true;

      await harness.clickOutside();

      expect(harness.isOpen).to.be.true;
      expect(lightDismissSpy).to.have.been.calledOnce;
    });

    it('should hide top-most overlay via click outside on parent overlay when nested overlays are open', async () => {
      const { parentHarness, nestedHarness } = await createNestedFixture();

      parentHarness.overlayElement.open = true;
      nestedHarness.overlayElement.open = true;

      expect(parentHarness.isOpen).to.be.true;
      expect(nestedHarness.isOpen).to.be.true;

      await elementUpdated(parentHarness.overlayElement);
      await parentHarness.clickOverlay();

      expect(parentHarness.isOpen).to.be.true;
      expect(nestedHarness.isOpen).to.be.false;
    });

    it('should hide top-most overlay via escape key when nested overlays are open', async () => {
      const { parentHarness, nestedHarness } = await createNestedFixture();

      parentHarness.overlayElement.open = true;
      nestedHarness.overlayElement.open = true;

      expect(parentHarness.isOpen).to.be.true;
      expect(nestedHarness.isOpen).to.be.true;

      await nestedHarness.pressEscapeKey();

      expect(parentHarness.isOpen).to.be.true;
      expect(nestedHarness.isOpen).to.be.false;
    });
  });

  describe('positioning', () => {
    it('should position the overlay to default side', async () => {
      const harness = await createFixture({ open: true });

      await harness.positionUpdated();

      expect(harness.actualPositionPlacement).to.equal('bottom');
    });

    it('should position the overlay to the top side', async () => {
      const harness = await createFixture({ open: true, placement: 'top' });

      await harness.positionUpdated();

      expect(harness.actualPositionPlacement).to.equal('top');
    });

    it('should position the overlay to the right side', async () => {
      const harness = await createFixture({ open: true, placement: 'right' });

      await harness.positionUpdated();

      expect(harness.actualPositionPlacement).to.equal('right');
    });

    it('should position the overlay to the left side', async () => {
      const harness = await createFixture({ open: true, placement: 'left' });

      await harness.positionUpdated();

      expect(harness.actualPositionPlacement).to.equal('left');
    });

    it('should set shift', async () => {
      const harness = await createFixture({ open: true, shift: true });

      expect(harness.overlayElement.shift).to.be.true;
      expect(harness.overlayElement.hasAttribute(OVERLAY_CONSTANTS.attributes.SHIFT)).to.be.true;
    });

    it('should set position strategy', async () => {
      const harness = await createFixture({ open: true, positionStrategy: 'absolute' });

      expect(harness.overlayElement.positionStrategy).to.equal('absolute');
      expect(harness.overlayElement.hasAttribute(OVERLAY_CONSTANTS.attributes.POSITION_STRATEGY)).to.be.true;
    });

    it('should set boundary', async () => {
      const harness = await createFixture({ open: true, boundary: 'test-boundary' });

      expect(harness.overlayElement.boundary).to.equal('test-boundary');
      expect(harness.overlayElement.hasAttribute(OVERLAY_CONSTANTS.attributes.BOUNDARY)).to.be.true;
    });

    it('should set boundary element', async () => {
      const harness = await createFixture();
      harness.overlayElement.boundaryElement = document.body;

      expect(harness.overlayElement.boundaryElement).to.equal(document.body);
    });

    it('should set fallback placements via attribute', async () => {
      const harness = await createFixture();
        harness.overlayElement.setAttribute(OVERLAY_CONSTANTS.attributes.FALLBACK_PLACEMENTS, 'top,bottom');

      expect(harness.overlayElement.fallbackPlacements).to.deep.equal(['top', 'bottom']);
      expect(harness.overlayElement.getAttribute(OVERLAY_CONSTANTS.attributes.FALLBACK_PLACEMENTS)).to.equal('top,bottom');
    });

    it('should set fallback placements via property', async () => {
      const harness = await createFixture();
      harness.overlayElement.fallbackPlacements = ['top', 'bottom'];

      expect(harness.overlayElement.fallbackPlacements).to.deep.equal(['top', 'bottom']);
    });

    it('should set fallback placements to null when removing attribute', async () => {
      const harness = await createFixture({ fallbackPlacements: 'top,bottom' });

      expect(harness.overlayElement.fallbackPlacements).to.deep.equal(['top', 'bottom']);

      harness.overlayElement.removeAttribute(OVERLAY_CONSTANTS.attributes.FALLBACK_PLACEMENTS);

      expect(harness.overlayElement.fallbackPlacements).to.be.null;
    });

    it('should set auto', async () => {
      const harness = await createFixture({ open: true, auto: true });

      expect(harness.overlayElement.auto).to.be.true;
      expect(harness.overlayElement.hasAttribute(OVERLAY_CONSTANTS.attributes.AUTO)).to.be.true;
    });

    it('should call position() manually', async () => {
      const harness = await createFixture({ open: true });
      const adapterPositionSpy = spy(harness.overlayElement['_foundation']['_adapter'], 'positionElement');

      harness.overlayElement.position();

      expect(harness.actualPositionPlacement).to.equal('bottom');
      expect(adapterPositionSpy).to.have.been.calledOnce;
    });

    it('should not position element if not open', async () => {
      const harness = await createFixture();

      harness.overlayElement.position();

      expect(harness.actualPositionPlacement).to.equal('');
    });
  });

  describe('flip', () => {
    it('should flip the overlay to the opposite side when not enough room', async () => {
      const harness = await createFixture({ open: true, placement: 'left', content: 'This is a really long string that should cause the overlay to flip to the right side.' });

      await harness.positionUpdated();

      expect(harness.actualPositionPlacement).to.equal('right');
    });

    it('should not flip the overlay to the opposite side when not enough room and flip is false', async () => {
      const harness = await createFixture({ open: true, placement: 'left', flip: 'off', content: 'This is a really long string that should cause the overlay to flip to the right side.' });

      await harness.positionUpdated();

      expect(harness.actualPositionPlacement).to.equal('left');
    });

    it('should only flip on main axis', async () => {
      const harness = await createFixture({ open: true, placement: 'left', flip: 'main', content: 'This is a really long string that should cause the overlay to flip to the right side.' });

      await harness.positionUpdated();

      expect(harness.actualPositionPlacement).to.equal('right');
    });
  });

  describe('hide', () => {
    it('should hide when anchor element is not visible', async () => {
      const harness = await createFixture({ open: true });

      expect(harness.isOpen).to.be.true;

      harness.anchorElement.style.marginRight = '9999px';

      await harness.positionUpdated();

      expect(harness.rootElement.style.display).to.equal('none');
    });

    it('should not hide when anchor element is not visible and hide is false', async () => {
      const harness = await createFixture({ open: true, hide: 'off' });

      expect(harness.overlayElement.hide).to.equal('off');
      expect(harness.overlayElement.getAttribute(OVERLAY_CONSTANTS.attributes.HIDE)).to.equal('off');
      expect(harness.isOpen).to.be.true;

      harness.anchorElement.style.marginRight = '9999px';

      await harness.positionUpdated();

      expect(harness.rootElement.style.display).to.not.equal('none');
    });
  });

  describe('arrow', () => {
    it('should position arrow element', async () => {
      const harness = await createFixture();
      const arrowEl = document.createElement('div');
      harness.overlayElement.arrowElement = arrowEl;

      harness.overlayElement.open = true;
      harness.overlayElement.arrowElementOffset = arrowEl.offsetWidth / 2;

      await harness.positionUpdated();

      expect(arrowEl.style.left).not.to.equal('');
      expect(arrowEl.style.top).to.equal('');
    });
  });
});

class OverlayHarness {
  constructor(public overlayElement: IOverlayComponent, public anchorElement: HTMLButtonElement) {}

  public get rootElement(): HTMLElement {
    return this.overlayElement.shadowRoot?.querySelector(OVERLAY_CONSTANTS.selectors.ROOT) as HTMLElement;
  }

  public get actualPositionPlacement(): string {
    return this.overlayElement.getAttribute(OVERLAY_CONSTANTS.attributes.POSITION_PLACEMENT) ?? '';
  }

  public get isOpen(): boolean {
    return this.isPopoverOpen || this.isInlineOpen;
  }

  public get isPopoverOpen(): boolean {
    return this.overlayElement.open && this.rootElement.hasAttribute('popover') && this.rootElement.matches(':popover-open');
  }

  public get isInlineOpen(): boolean {
    const { display } = getComputedStyle(this.rootElement);
    return this.overlayElement.open && !this.isPopoverOpen && display !== 'none';
  }

  public positionUpdated(): Promise<IOverlayComponent> {
    return elementUpdated(this.overlayElement);
  }

  public async clickOutside(): Promise<void> {
    const { x, y, height, width } = this.rootElement.getBoundingClientRect();
    const mouseX = Math.round(x + width * 2);
    const mouseY = Math.round(y + height * 2);
    await sendMouse({ type: 'click', position: [mouseX, mouseY], button: 'left' });
  }

  public async clickOverlay(): Promise<void> {
    const { x, y } = this.rootElement.getBoundingClientRect();
    const mouseX = Math.round(x);
    const mouseY = Math.round(y);
    await sendMouse({ type: 'click', position: [mouseX, mouseY], button: 'left' });
  }

  public async pressEscapeKey(): Promise<void> {
    await sendKeys({ press: 'Escape' });
  }
}

interface IOverlayFixtureConfig {
  open?: boolean;
  inline?: boolean;
  isStatic?: boolean;
  flip?: OverlayFlipState | null;
  hide?: OverlayHideState | null;
  placement?: string | null;
  content?: string;
  boundary?: string | null;
  fallbackPlacements?: string | null;
  positionStrategy?: string | null;
  shift?: boolean;
  auto?: boolean;
}

async function createFixture({
  open = false,
  inline = false,
  isStatic = false,
  flip = null,
  hide = null,
  placement = null,
  content = 'Test',
  boundary = null,
  fallbackPlacements = null,
  positionStrategy = null,
  shift = false,
  auto = false
}: IOverlayFixtureConfig = {}): Promise<OverlayHarness> {
  const container = await fixture(html`
    <div style="display: flex; justify-content: center; align-items: center; height: 300px; width: 300px;" id="test-boundary">
      <button type="button" id="test-anchor">Overlay Anchor</button>
      <forge-overlay
        anchor="test-anchor"
        ?open=${open}
        ?inline=${inline}
        ?static=${isStatic}
        flip=${flip ?? nothing}
        hide=${hide ?? nothing}
        ?shift=${shift}
        ?auto=${auto}
        placement=${placement ?? nothing}
        boundary=${boundary ?? nothing}
        fallback-placements=${fallbackPlacements ?? nothing}
        position-strategy=${positionStrategy ?? nothing}>
        <div style="white-space: nowrap;">${content}</div>
      </forge-overlay>
    </div>
  `);

  const button = container.querySelector('button') as HTMLButtonElement;
  const overlay = container.querySelector('forge-overlay') as IOverlayComponent;

  return new OverlayHarness(overlay, button);
}

async function createNestedFixture({ inline = false } = {}): Promise<{ parentHarness: OverlayHarness, nestedHarness: OverlayHarness }> {
  const container = await fixture(html`
    <div style="display: flex; justify-content: center; align-items: center; height: 300px; width: 300px;" id="test-boundary">
      <button type="button" id="test-anchor">Overlay Anchor</button>

      <forge-overlay anchor="test-anchor" ?inline=${inline}>
        <div style="white-space: nowrap; border: 1px solid black;">
          <span>Parent</span>
          <button type="button" id="test-nested-anchor">Nested overlay anchor</button>
          <forge-overlay anchor="test-nested-anchor" ?inline=${inline}>
            <div style="border: 1px solid black;">Nested</div>
          </forge-overlay>
        </div>
      </forge-overlay>
    </div>
  `);

  const parentAnchor = container.querySelector('#test-anchor') as HTMLButtonElement;
  const nestedAnchor = container.querySelector('#test-nested-anchor') as HTMLButtonElement;
  const parentOverlay = container.querySelector('forge-overlay') as IOverlayComponent;
  const nestedOverlay = parentOverlay.querySelector('forge-overlay') as IOverlayComponent;

  return {
    parentHarness: new OverlayHarness(parentOverlay, parentAnchor),
    nestedHarness: new OverlayHarness(nestedOverlay, nestedAnchor)
  };
}