import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html, nothing } from 'lit';
import { userEvent } from 'vitest/browser';
import { TestHarness } from '../core/testing/test-harness.js';
import { frame } from '../core/utils/utils.js';
import type { IOverlayComponent } from './overlay.js';
import { OverlayComponent } from './overlay.js';
import { type OverlayFlipState, type OverlayHideState, overlayStack, OVERLAY_CONSTANTS, type OverlayShiftState } from './overlay-constants.js';
import type { IOverlayAdapter } from './overlay-adapter.js';
import type { OverlayCore } from './overlay-core.js';

import './overlay.js';

type OverlayComponentInternal = IOverlayComponent & { _core: OverlayCore & { _adapter: IOverlayAdapter } };

class OverlayHarness extends TestHarness<OverlayComponentInternal> {
  public anchorElement: HTMLButtonElement;

  constructor(el: OverlayComponentInternal, anchorElement: HTMLButtonElement) {
    super(el);
    this.anchorElement = anchorElement;
  }

  public initElementRefs(): void {}

  public get rootElement(): HTMLElement {
    return this.element.shadowRoot?.querySelector(OVERLAY_CONSTANTS.selectors.ROOT) as HTMLElement;
  }

  public get actualPositionPlacement(): string {
    return this.element.getAttribute(OVERLAY_CONSTANTS.attributes.POSITION_PLACEMENT) ?? '';
  }

  public get isOpen(): boolean {
    return this.isPopoverOpen || this.isInlineOpen;
  }

  public get isPopoverOpen(): boolean {
    return this.element.open && this.rootElement.hasAttribute('popover') && this.rootElement.matches(':popover-open');
  }

  public get isInlineOpen(): boolean {
    const { display } = getComputedStyle(this.rootElement);
    return this.element.open && !this.isPopoverOpen && display !== 'none';
  }

  public get adapter(): IOverlayAdapter {
    return this.element._core._adapter;
  }

  public async positionUpdated(): Promise<void> {
    await frame();
  }

  public clickOutside(): void {
    document.body.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, composed: true }));
  }

  public async clickOverlay(): Promise<void> {
    await userEvent.click(this.rootElement);
  }

  public async pressEscapeKey(): Promise<void> {
    await userEvent.keyboard('{Escape}');
  }
}

interface IOverlayFixtureConfig {
  open?: boolean;
  inline?: boolean;
  persistent?: boolean;
  flip?: OverlayFlipState | null;
  hide?: OverlayHideState | null;
  placement?: string | null;
  content?: string;
  boundary?: string | null;
  fallbackPlacements?: string | null;
  positionStrategy?: string | null;
  shift?: OverlayShiftState;
}

async function createFixture({
  open = false,
  inline = false,
  persistent = false,
  flip = null,
  hide = null,
  placement = null,
  content = 'Test',
  boundary = null,
  fallbackPlacements = null,
  positionStrategy = null,
  shift = 'auto'
}: IOverlayFixtureConfig = {}): Promise<OverlayHarness> {
  const screen = render(html`
    <div style="display: flex; justify-content: center; align-items: center; height: 300px; width: 300px;" id="test-boundary">
      <button type="button" id="test-anchor">Overlay Anchor</button>
      <forge-overlay
        anchor="test-anchor"
        ?open=${open}
        ?inline=${inline}
        ?persistent=${persistent}
        flip=${flip ?? nothing}
        hide=${hide ?? nothing}
        shift=${shift ?? nothing}
        placement=${placement ?? nothing}
        boundary=${boundary ?? nothing}
        fallback-placements=${fallbackPlacements ?? nothing}
        position-strategy=${positionStrategy ?? nothing}>
        <div style="white-space: nowrap;">${content}</div>
      </forge-overlay>
    </div>
  `);

  const container = screen.container.firstElementChild as HTMLElement;
  const button = container.querySelector('button') as HTMLButtonElement;
  const overlay = container.querySelector('forge-overlay') as OverlayComponentInternal;

  return new OverlayHarness(overlay, button);
}

async function createNestedFixture({ inline = false } = {}): Promise<{
  parentHarness: OverlayHarness;
  nestedHarness: OverlayHarness;
}> {
  const screen = render(html`
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

  const container = screen.container.firstElementChild as HTMLElement;
  const parentAnchor = container.querySelector('#test-anchor') as HTMLButtonElement;
  const nestedAnchor = container.querySelector('#test-nested-anchor') as HTMLButtonElement;
  const parentOverlay = container.querySelector('forge-overlay') as OverlayComponentInternal;
  const nestedOverlay = parentOverlay.querySelector('forge-overlay') as OverlayComponentInternal;

  return {
    parentHarness: new OverlayHarness(parentOverlay, parentAnchor),
    nestedHarness: new OverlayHarness(nestedOverlay, nestedAnchor)
  };
}

describe('Overlay', () => {
  describe('defaults', () => {
    it('should be accessible', async () => {
      const harness = await createFixture();
      await expect(harness.element).toBeAccessible();
    });

    it('should not be open by default', async () => {
      const harness = await createFixture();
      expect(harness.isOpen).toBe(false);
    });

    it('should have expected default state', async () => {
      const harness = await createFixture();

      expect(harness.element.anchorElement).toBe(harness.anchorElement);
      expect(harness.element.anchor).toBe('test-anchor');
      expect(harness.element.open).toBe(false);
      expect(harness.element.inline).toBe(false);
      expect(harness.element.placement).toBe('bottom');
      expect(harness.element.positionStrategy).toBe('fixed');
      expect(harness.element.offset).toEqual({});
      expect(harness.element.shift).toBe('auto');
      expect(harness.element.hide).toBe('never' satisfies OverlayHideState);
      expect(harness.element.persistent).toBe(false);
      expect(harness.element.flip).toBe('auto' as OverlayFlipState);
    });
  });

  describe('overlay stack', () => {
    it('should update overlay stack when open', async () => {
      const harness = await createFixture();

      harness.element.open = true;
      await frame();

      expect(Array.from(OverlayComponent[overlayStack])).toEqual([harness.element]);

      harness.element.open = false;

      expect(Array.from(OverlayComponent[overlayStack])).toEqual([]);
    });

    it('should remove from overlay stack when removed from DOM', async () => {
      const harness = await createFixture();

      harness.element.open = true;
      await frame();

      expect(Array.from(OverlayComponent[overlayStack])).toEqual([harness.element]);

      harness.element.remove();

      expect(Array.from(OverlayComponent[overlayStack])).toEqual([]);
    });

    it('should remove from overlay stack when light dismissed', async () => {
      const harness = await createFixture();

      harness.element.open = true;
      await frame();

      expect(Array.from(OverlayComponent[overlayStack])).toEqual([harness.element]);

      harness.clickOutside();

      expect(Array.from(OverlayComponent[overlayStack])).toEqual([]);
    });

    it('should update overlay stack with nested overlays', async () => {
      const { parentHarness, nestedHarness } = await createNestedFixture();

      parentHarness.element.open = true;
      await frame();

      nestedHarness.element.open = true;
      await frame();

      expect(Array.from(OverlayComponent[overlayStack])).toEqual([parentHarness.element, nestedHarness.element]);

      await nestedHarness.pressEscapeKey();
      await frame();

      expect(Array.from(OverlayComponent[overlayStack])).toEqual([parentHarness.element]);
    });
  });

  describe('opened by default', () => {
    it('should set open by default when set statically', async () => {
      const harness = await createFixture({ open: true });

      expect(harness.isOpen).toBe(true);
      expect(harness.rootElement.hasAttribute('popover')).toBe(true);
      expect(harness.rootElement.getAttribute('popover')).toBe('manual');
      expect(harness.isPopoverOpen).toBe(true);
    });

    it('should set open by default when set statically with inline', async () => {
      const harness = await createFixture({ open: true, inline: true });

      expect(harness.isOpen).toBe(true);
      expect(harness.element.inline).toBe(true);
      expect(harness.element.hasAttribute(OVERLAY_CONSTANTS.attributes.INLINE)).toBe(true);
      expect(harness.isInlineOpen).toBe(true);
    });
  });

  describe('show/hide', () => {
    it('should set open', async () => {
      const harness = await createFixture();

      harness.element.open = true;

      expect(harness.isOpen).toBe(true);
    });

    it('should hide after being open', async () => {
      const harness = await createFixture();

      harness.element.open = true;

      expect(harness.isOpen).toBe(true);
      await frame();

      harness.element.open = false;

      expect(harness.isOpen).toBe(false);
    });

    it('should set open via attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute('open', '');

      expect(harness.isOpen).toBe(true);
    });

    it('should use native popover API by default', async () => {
      const harness = await createFixture();

      expect(harness.isPopoverOpen).toBe(false);

      harness.element.open = true;

      expect(harness.rootElement.hasAttribute('popover')).toBe(true);
      expect(harness.rootElement.getAttribute('popover')).toBe('manual');
      expect(harness.isPopoverOpen).toBe(true);
    });

    it('should open inline', async () => {
      const harness = await createFixture({ inline: true });

      harness.element.open = true;

      expect(harness.element.inline).toBe(true);
      expect(harness.element.hasAttribute(OVERLAY_CONSTANTS.attributes.INLINE)).toBe(true);
      expect(harness.isInlineOpen).toBe(true);
    });
  });

  describe('light dismiss', () => {
    it('should light dismiss when clicking outside of the overlay', async () => {
      const harness = await createFixture();
      const lightDismissSpy = vi.fn();
      harness.element.addEventListener(OVERLAY_CONSTANTS.events.LIGHT_DISMISS, lightDismissSpy);

      harness.element.open = true;

      expect(harness.isOpen).toBe(true);

      harness.clickOutside();

      expect(harness.isOpen).toBe(false);
      expect(lightDismissSpy).toHaveBeenCalledOnce();
    });

    it('should not light dismiss when clicking inside of the overlay', async () => {
      const harness = await createFixture();
      const lightDismissSpy = vi.fn();
      harness.element.addEventListener(OVERLAY_CONSTANTS.events.LIGHT_DISMISS, lightDismissSpy);

      harness.element.open = true;

      expect(harness.isOpen).toBe(true);

      await frame();
      await harness.clickOverlay();

      expect(harness.isOpen).toBe(true);
      expect(lightDismissSpy).not.toHaveBeenCalled();
    });

    it('should light dismiss when clicking outside of the overlay with inline', async () => {
      const harness = await createFixture({ inline: true });
      const lightDismissSpy = vi.fn();
      harness.element.addEventListener(OVERLAY_CONSTANTS.events.LIGHT_DISMISS, lightDismissSpy);

      harness.element.open = true;

      expect(harness.isOpen).toBe(true);

      harness.clickOutside();

      expect(harness.isOpen).toBe(false);
      expect(lightDismissSpy).toHaveBeenCalledOnce();
    });

    it('should light dismiss when pressing escape key', async () => {
      const harness = await createFixture();
      const lightDismissSpy = vi.fn();
      harness.element.addEventListener(OVERLAY_CONSTANTS.events.LIGHT_DISMISS, lightDismissSpy);

      harness.element.open = true;

      expect(harness.isOpen).toBe(true);

      await harness.pressEscapeKey();

      expect(harness.isOpen).toBe(false);
      expect(lightDismissSpy).toHaveBeenCalledOnce();
    });

    it('should light dismiss when pressing escape key with inline', async () => {
      const harness = await createFixture({ inline: true });
      const lightDismissSpy = vi.fn();
      harness.element.addEventListener(OVERLAY_CONSTANTS.events.LIGHT_DISMISS, lightDismissSpy);

      harness.element.open = true;

      expect(harness.isOpen).toBe(true);

      await harness.pressEscapeKey();

      expect(harness.isOpen).toBe(false);
      expect(lightDismissSpy).toHaveBeenCalledOnce();
    });

    it('should not light dismiss when persistent', async () => {
      const harness = await createFixture({ inline: true, persistent: true });
      const lightDismissSpy = vi.fn();
      harness.element.addEventListener(OVERLAY_CONSTANTS.events.LIGHT_DISMISS, lightDismissSpy);

      harness.element.open = true;

      expect(harness.isOpen).toBe(true);

      harness.clickOutside();

      expect(harness.isOpen).toBe(true);
      expect(lightDismissSpy).not.toHaveBeenCalled();
    });

    it('should light dismiss if persistent is toggle while open', async () => {
      const harness = await createFixture({ open: true, persistent: true });

      const lightDismissSpy = vi.fn();
      harness.element.addEventListener(OVERLAY_CONSTANTS.events.LIGHT_DISMISS, lightDismissSpy);

      expect(harness.isOpen).toBe(true);

      harness.clickOutside();
      expect(harness.isOpen).toBe(true);

      harness.element.persistent = false;
      harness.clickOutside();

      expect(harness.isOpen).toBe(false);
      expect(lightDismissSpy).toHaveBeenCalledOnce();
    });

    it('should cancel light dismiss event', async () => {
      const harness = await createFixture();
      const lightDismissSpy = vi.fn((evt: Event) => evt.preventDefault());
      harness.element.addEventListener(OVERLAY_CONSTANTS.events.LIGHT_DISMISS, lightDismissSpy);

      harness.element.open = true;

      expect(harness.isOpen).toBe(true);

      harness.clickOutside();

      expect(harness.isOpen).toBe(true);
      expect(lightDismissSpy).toHaveBeenCalledOnce();
    });

    it('should hide top-most overlay via click outside on parent overlay when nested overlays are open', async () => {
      const { parentHarness, nestedHarness } = await createNestedFixture();

      parentHarness.element.open = true;
      nestedHarness.element.open = true;

      expect(parentHarness.isOpen).toBe(true);
      expect(nestedHarness.isOpen).toBe(true);

      await frame();
      parentHarness.rootElement.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, composed: true }));

      expect(parentHarness.isOpen).toBe(true);
      expect(nestedHarness.isOpen).toBe(false);
    });

    it('should hide top-most overlay via escape key when nested overlays are open', async () => {
      const { parentHarness, nestedHarness } = await createNestedFixture();

      parentHarness.element.open = true;
      nestedHarness.element.open = true;

      expect(parentHarness.isOpen).toBe(true);
      expect(nestedHarness.isOpen).toBe(true);

      await nestedHarness.pressEscapeKey();

      expect(parentHarness.isOpen).toBe(true);
      expect(nestedHarness.isOpen).toBe(false);
    });
  });

  describe('positioning', () => {
    it('should position the overlay to default side', async () => {
      const harness = await createFixture({ open: true });

      await harness.positionUpdated();

      expect(harness.actualPositionPlacement).toBe('bottom');
    });

    it('should position the overlay to the top side', async () => {
      const harness = await createFixture({ open: true, placement: 'top' });

      await harness.positionUpdated();

      expect(harness.actualPositionPlacement).toBe('top');
    });

    it('should position the overlay to the right side', async () => {
      const harness = await createFixture({ open: true, placement: 'right' });

      await harness.positionUpdated();

      expect(harness.actualPositionPlacement).toBe('right');
    });

    it('should position the overlay to the left side', async () => {
      const harness = await createFixture({ open: true, placement: 'left' });

      await harness.positionUpdated();

      expect(harness.actualPositionPlacement).toBe('left');
    });

    it('should set shift', async () => {
      const harness = await createFixture({ open: true, shift: 'never' });

      expect(harness.element.shift).toBe('never');
      expect(harness.element.hasAttribute(OVERLAY_CONSTANTS.attributes.SHIFT)).toBe(true);
      expect(harness.element.getAttribute(OVERLAY_CONSTANTS.attributes.SHIFT)).toBe('never');
    });

    it('should set shift as boolean for backwards compatibility', async () => {
      const harness = await createFixture();
      expect(harness.element.shift).toBe('auto');

      harness.element.shift = false as unknown as OverlayShiftState;
      expect(harness.element.shift).toBe('never');

      harness.element.shift = true as unknown as OverlayShiftState;
      expect(harness.element.shift).toBe('auto');
    });

    it('should set shift as boolean attribute for backwards compatibility', async () => {
      const harness = await createFixture();

      harness.element.setAttribute(OVERLAY_CONSTANTS.attributes.SHIFT, '');
      expect(harness.element.shift).toBe('auto');

      harness.element.removeAttribute(OVERLAY_CONSTANTS.attributes.SHIFT);
      expect(harness.element.shift).toBe('never');

      harness.element.setAttribute(OVERLAY_CONSTANTS.attributes.SHIFT, 'true');
      expect(harness.element.shift).toBe('auto');
    });

    it('should handle invalid shift values', async () => {
      const harness = await createFixture({ open: true });

      harness.element.shift = 'invalid' as OverlayShiftState;
      expect(harness.element.shift).toBe('auto');

      harness.element.shift = null as unknown as OverlayShiftState;
      expect(harness.element.shift).toBe('auto');
    });

    it('should set position strategy', async () => {
      const harness = await createFixture({ open: true, positionStrategy: 'absolute' });

      expect(harness.element.positionStrategy).toBe('absolute');
      expect(harness.element.hasAttribute(OVERLAY_CONSTANTS.attributes.POSITION_STRATEGY)).toBe(true);
    });

    it('should set boundary', async () => {
      const harness = await createFixture({ open: true, boundary: 'test-boundary' });

      expect(harness.element.boundary).toBe('test-boundary');
      expect(harness.element.hasAttribute(OVERLAY_CONSTANTS.attributes.BOUNDARY)).toBe(true);
    });

    it('should set boundary element', async () => {
      const harness = await createFixture();
      harness.element.boundaryElement = document.body;

      expect(harness.element.boundaryElement).toBe(document.body);
    });

    it('should set fallback placements via attribute', async () => {
      const harness = await createFixture();
      harness.element.setAttribute(OVERLAY_CONSTANTS.attributes.FALLBACK_PLACEMENTS, 'top,bottom');

      expect(harness.element.fallbackPlacements).toEqual(['top', 'bottom']);
      expect(harness.element.getAttribute(OVERLAY_CONSTANTS.attributes.FALLBACK_PLACEMENTS)).toBe('top,bottom');
    });

    it('should set fallback placements via property', async () => {
      const harness = await createFixture();
      harness.element.fallbackPlacements = ['top', 'bottom'];

      expect(harness.element.fallbackPlacements).toEqual(['top', 'bottom']);
    });

    it('should set fallback placements to null when removing attribute', async () => {
      const harness = await createFixture({ fallbackPlacements: 'top,bottom' });

      expect(harness.element.fallbackPlacements).toEqual(['top', 'bottom']);

      harness.element.removeAttribute(OVERLAY_CONSTANTS.attributes.FALLBACK_PLACEMENTS);

      expect(harness.element.fallbackPlacements).toBeNull();
    });

    it('should set auto placement', async () => {
      const harness = await createFixture({ open: true, placement: 'auto' });

      expect(harness.element.placement).toBe('auto');
      expect(harness.element.getAttribute(OVERLAY_CONSTANTS.attributes.PLACEMENT)).toBe('auto');
    });

    it('should call position() manually', async () => {
      const harness = await createFixture({ open: true });
      await harness.positionUpdated();
      const adapterPositionSpy = vi.spyOn(harness.element._core._adapter, 'positionElement');

      harness.element.position();

      expect(harness.actualPositionPlacement).toBe('bottom');
      expect(adapterPositionSpy).toHaveBeenCalledOnce();
    });

    it('should not position element if not open', async () => {
      const harness = await createFixture();

      harness.element.position();

      expect(harness.actualPositionPlacement).toBe('');
    });

    it('should reposition if position state is updated while open', async () => {
      const harness = await createFixture({ open: true });

      const positionSpy = vi.spyOn(harness.adapter, 'positionElement');

      harness.element.placement = 'top';
      harness.element.positionStrategy = 'absolute';
      harness.element.offset = { mainAxis: 10, crossAxis: 10 };
      harness.element.shift = 'never';
      harness.element.hide = 'anchor-hidden';
      harness.element.flip = 'main';
      harness.element.boundary = 'test-boundary';
      harness.element.boundaryElement = document.body;
      harness.element.fallbackPlacements = ['top', 'bottom'];

      expect(positionSpy).toHaveBeenCalledTimes(9);
      positionSpy.mockRestore();
    });
  });

  describe('flip', () => {
    it('should flip the overlay to the opposite side when not enough room', async () => {
      const harness = await createFixture({
        open: true,
        placement: 'left',
        content: 'This is a really long string that should cause the overlay to flip to the right side.'
      });

      await harness.positionUpdated();

      expect(harness.actualPositionPlacement).toBe('right');
    });

    it('should not flip the overlay to the opposite side when not enough room and flip is false', async () => {
      const harness = await createFixture({
        open: true,
        placement: 'left',
        flip: 'never',
        content: 'This is a really long string that should cause the overlay to flip to the right side.'
      });

      await harness.positionUpdated();

      expect(harness.actualPositionPlacement).toBe('left');
    });

    it('should only flip on main axis', async () => {
      const harness = await createFixture({
        open: true,
        placement: 'left',
        flip: 'main',
        content: 'This is a really long string that should cause the overlay to flip to the right side.'
      });

      await harness.positionUpdated();

      expect(harness.actualPositionPlacement).toBe('right');
    });

    it('should fall back to default flip if null value is provided', async () => {
      const harness = await createFixture();

      harness.element.flip = null as unknown as OverlayFlipState;

      expect(harness.element.flip).toBe(OVERLAY_CONSTANTS.defaults.FLIP);
      expect(harness.element.hasAttribute(OVERLAY_CONSTANTS.attributes.FLIP)).toBe(false);
    });
  });

  describe('hide', () => {
    it('should hide when anchor element is not visible when anchor-hidden', async () => {
      const harness = await createFixture({ open: true, hide: 'anchor-hidden' });

      expect(harness.element.hide).toBe('anchor-hidden');
      expect(harness.element.getAttribute(OVERLAY_CONSTANTS.attributes.HIDE)).toBe('anchor-hidden');
      expect(harness.isOpen).toBe(true);

      harness.anchorElement.style.marginRight = '9999px';

      await harness.positionUpdated();

      expect(harness.rootElement.style.visibility).toBe('hidden');
    });

    it('should not hide when anchor element is not visible and hide is never (default)', async () => {
      const harness = await createFixture({ open: true });

      expect(harness.element.hide).toBe('never');
      expect(harness.isOpen).toBe(true);

      harness.anchorElement.style.marginRight = '9999px';

      await harness.positionUpdated();

      expect(harness.rootElement.style.display).not.toBe('none');
    });

    it('should fall back to default hide value (never) if null value is provided', async () => {
      const harness = await createFixture();

      harness.element.hide = null as unknown as OverlayHideState;

      expect(harness.element.hide).toBe(OVERLAY_CONSTANTS.defaults.HIDE);
      expect(harness.element.hasAttribute(OVERLAY_CONSTANTS.attributes.HIDE)).toBe(false);
    });
  });

  describe('arrow', () => {
    it('should position arrow element', async () => {
      const harness = await createFixture();
      const arrowEl = document.createElement('div');
      harness.element.arrowElement = arrowEl;

      harness.element.open = true;
      harness.element.arrowElementOffset = arrowEl.offsetWidth / 2;

      await harness.positionUpdated();

      expect(arrowEl.style.left).not.toBe('');
      expect(arrowEl.style.top).toBe('');
    });
  });

  describe('anchor', () => {
    it('should set anchor dynamically', async () => {
      const harness = await createFixture();

      expect(harness.element.anchorElement).toBe(harness.anchorElement);

      harness.element.anchor = 'test-boundary';

      const boundaryElement = document.getElementById('test-boundary') as HTMLElement;
      expect(harness.element.anchorElement).toBe(boundaryElement);
    });

    it('should set anchor element to null if null anchor is provided', async () => {
      const harness = await createFixture();

      harness.element.anchor = null;

      expect(harness.element.anchorElement).toBeNull();
    });
  });

  describe('no anchor', () => {
    it('should open with no-anchor', async () => {
      const harness = await createFixture();

      harness.element.noAnchor = true;
      harness.element.open = true;

      await harness.positionUpdated();

      expect(harness.isOpen).toBe(true);
      expect(harness.element.noAnchor).toBe(true);
      expect(harness.element.hasAttribute(OVERLAY_CONSTANTS.attributes.NO_ANCHOR)).toBe(true);
    });

    it('should not call position logic with no-anchor', async () => {
      const harness = await createFixture();

      harness.element.noAnchor = true;
      harness.element.open = true;

      const positionSpy = vi.spyOn(harness.adapter, 'positionElement');

      await harness.positionUpdated();

      expect(positionSpy).not.toHaveBeenCalled();
      expect(harness.element.hasAttribute(OVERLAY_CONSTANTS.attributes.POSITION_PLACEMENT)).toBe(false);
    });
  });
});
