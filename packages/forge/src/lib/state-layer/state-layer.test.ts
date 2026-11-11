import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html, nothing } from 'lit';
import { getShadowElement } from '@tylertech/forge-core';
import { frame, task } from '../core/utils/utils.js';
import type { IStateLayerComponent } from './state-layer.js';
import { MINIMUM_PRESS_MS, PRESS_GROW_MS, STATE_LAYER_CONSTANTS, TOUCH_DELAY_MS } from './state-layer-constants.js';
import { createMouseEventInit, simulateHover, simulateLeave, simulatePressAndHold, simulatePressed } from '../core/testing/pointer.js';
import { StateLayerCore } from './state-layer-core.js';

import './state-layer.js';

describe('StateLayer', () => {
  it('should contain shadow root', async () => {
    const { stateLayer } = await createFixture();
    expect(stateLayer.shadowRoot).not.toBeNull();
  });

  it('should attach to parent if no target is specified', async () => {
    const { container, stateLayer } = await createFixture();
    expect(stateLayer.targetElement).toBe(container);
  });

  it('should defer attaching event listeners', async () => {
    const { container, stateLayer } = await createFixture();

    const core = (stateLayer as IStateLayerComponent & { _core: StateLayerCore })._core;
    expect(core.isAttached).toBe(false);

    simulateHover(container);
    await frame();

    expect(core.isAttached).toBe(true);
  });

  it('should show hover state', async () => {
    const { container, surface } = await createFixture();

    simulateHover(container);
    await frame();

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.HOVERED)).toBe(true);
  });

  it('should remove hover state', async () => {
    const { container, surface } = await createFixture();

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.HOVERED)).toBe(false);

    simulateHover(container);
    await frame();

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.HOVERED)).toBe(true);

    simulateLeave(container);
    await frame();

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.HOVERED)).toBe(false);
  });

  it('should not show hover state when disabled', async () => {
    const { container, surface } = await createFixture({ disabled: true });

    simulateHover(container);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.HOVERED)).toBe(false);
  });

  it('should not show hover state when using touch pointer', async () => {
    const { container, surface } = await createFixture();

    simulateHover(container, { pointerType: 'touch' });

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.HOVERED)).toBe(false);
  });

  it('should show hover state when using pen pointer', async () => {
    const { container, surface } = await createFixture();

    simulateHover(container, { pointerType: 'pen' });
    await frame();

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.HOVERED)).toBe(true);
  });

  it('should not show hover state if not primary pointer', async () => {
    const { container, surface } = await createFixture();

    simulateHover(container, { isPrimary: false });

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.HOVERED)).toBe(false);
  });

  it('should animate ripple', async () => {
    const { container, surface } = await createFixture({ ripple: true });

    const animateSpy = vi.spyOn(surface, 'animate');

    simulatePressed(container);
    await task(TOUCH_DELAY_MS);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).toBe(true);
    expect(animateSpy).toHaveBeenCalledOnce();
  });

  it('should not animate ripple when disabled', async () => {
    const { container, surface } = await createFixture({ disabled: true, ripple: true });

    const animateSpy = vi.spyOn(surface, 'animate');

    simulatePressed(container);
    await task(TOUCH_DELAY_MS);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).toBe(false);
    expect(animateSpy).not.toHaveBeenCalled();
  });

  it('should disable dynamically', async () => {
    const { container, surface, stateLayer } = await createFixture({ ripple: true });

    const animateSpy = vi.spyOn(surface, 'animate');
    stateLayer.disabled = true;
    await frame();

    simulatePressed(container);
    await task(TOUCH_DELAY_MS);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).toBe(false);
    expect(animateSpy).not.toHaveBeenCalled();
  });

  it('should animate ripple when using touch pointer', async () => {
    const { container, surface } = await createFixture({ ripple: true });

    const animateSpy = vi.spyOn(surface, 'animate');

    simulatePressed(container, { pointerType: 'touch' });
    await task(TOUCH_DELAY_MS);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).toBe(true);
    expect(animateSpy).toHaveBeenCalled();
  });

  it('should remove pressed when done animating', async () => {
    const { container, surface } = await createFixture();

    simulatePressed(container);
    await task(TOUCH_DELAY_MS);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).toBe(true);

    await task(PRESS_GROW_MS);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).toBe(false);
  });

  it('should not remove pressed when done animating if still pressed', async () => {
    const { container, surface } = await createFixture({ ripple: true });
    const animateSpy = vi.spyOn(surface, 'animate');

    await simulatePressAndHold(container);
    await task(TOUCH_DELAY_MS);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).toBe(true);

    simulateHover(container);
    await task(PRESS_GROW_MS);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).toBe(true);
    expect(animateSpy).toHaveBeenCalledOnce();
  });

  it('should animate via method manually', async () => {
    const { stateLayer, surface } = await createFixture({ ripple: true });

    const animateSpy = vi.spyOn(surface, 'animate');

    stateLayer.playAnimation();

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).toBe(true);
    expect(animateSpy).toHaveBeenCalledOnce();
  });

  it('should stop animating if pointercancel', async () => {
    const { container, surface } = await createFixture({ ripple: true });

    const animateSpy = vi.spyOn(surface, 'animate');

    simulatePressed(container);
    await task(TOUCH_DELAY_MS);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).toBe(true);

    const evtInit = createMouseEventInit(container);
    container.dispatchEvent(new PointerEvent('pointercancel', evtInit));
    await task(MINIMUM_PRESS_MS);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).toBe(false);
    expect(animateSpy).toHaveBeenCalledOnce();
  });

  it('should stop animating if contextmenu', async () => {
    const { container, surface } = await createFixture({ ripple: true });

    const animateSpy = vi.spyOn(surface, 'animate');

    simulatePressed(container);
    await task(TOUCH_DELAY_MS);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).toBe(true);

    container.dispatchEvent(new MouseEvent('contextmenu'));
    await task(MINIMUM_PRESS_MS);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).toBe(false);
    expect(animateSpy).toHaveBeenCalledOnce();
  });

  it('should remove target element', async () => {
    const { container, stateLayer, surface } = await createFixture();

    const animateSpy = vi.spyOn(surface, 'animate');

    stateLayer.targetElement = null;

    simulatePressed(container);
    await task(TOUCH_DELAY_MS);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).toBe(false);
    expect(stateLayer.targetElement).toBeNull();
    expect(animateSpy).not.toHaveBeenCalled();
  });

  it('should set target element by id dynamically', async () => {
    const { container, sibling, stateLayer, surface } = await createFixture({ ripple: true });

    const animateSpy = vi.spyOn(surface, 'animate');
    stateLayer.target = 'sibling';

    expect(stateLayer.targetElement).toBe(sibling);

    simulatePressed(container);
    await task(TOUCH_DELAY_MS);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).toBe(false);
    expect(animateSpy).not.toHaveBeenCalled();

    simulatePressed(sibling);
    await task(TOUCH_DELAY_MS);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).toBe(true);
    expect(animateSpy).toHaveBeenCalledOnce();
  });

  it('should animate on click', async () => {
    const { container, surface } = await createFixture({ ripple: true });

    const animateSpy = vi.spyOn(surface, 'animate');

    simulateHover(container);

    container.click();
    await task(TOUCH_DELAY_MS);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).toBe(true);
    expect(animateSpy).toHaveBeenCalledOnce();
  });

  it('should locate target if setting target property before connected', async () => {
    const { stateLayer, sibling } = await createFixture({ target: 'sibling' });
    expect(stateLayer.targetElement).toBe(sibling);
  });

  it('should set target element manually', async () => {
    const { container, sibling, stateLayer, surface } = await createFixture({ target: 'sibling', ripple: true });
    const animateSpy = vi.spyOn(surface, 'animate');

    expect(stateLayer.targetElement).toBe(sibling);

    simulateHover(sibling);
    await frame();

    stateLayer.targetElement = container;
    await frame();

    expect(stateLayer.targetElement).toBe(container);

    simulatePressed(container);
    await task(TOUCH_DELAY_MS);

    expect(animateSpy).toHaveBeenCalled();

    stateLayer.targetElement = sibling;
    await frame();

    simulatePressed(sibling);
    await task(TOUCH_DELAY_MS);

    expect(animateSpy).toHaveBeenCalledTimes(2);
  });

  it('should show a flat pressed state without a ripple by default', async () => {
    const { container, surface, stateLayer } = await createFixture();
    const animateSpy = vi.spyOn(surface, 'animate');

    simulatePressed(container);
    await task(TOUCH_DELAY_MS);

    expect(stateLayer.ripple).toBe(false);
    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).toBe(true);
    expect(animateSpy).not.toHaveBeenCalled();
  });

  it('should remove the flat pressed state after the minimum press time', async () => {
    const { container, surface } = await createFixture();

    simulatePressed(container);
    await task(TOUCH_DELAY_MS);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).toBe(true);

    await task(MINIMUM_PRESS_MS);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).toBe(false);
  });

  it('should show a flat pressed state when playing the animation manually by default', async () => {
    const { stateLayer, surface } = await createFixture();
    const animateSpy = vi.spyOn(surface, 'animate');

    stateLayer.playAnimation();

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).toBe(true);
    expect(animateSpy).not.toHaveBeenCalled();
  });

  it('should reflect the ripple property to the attribute', async () => {
    const { stateLayer } = await createFixture();

    stateLayer.ripple = true;
    expect(stateLayer.hasAttribute(STATE_LAYER_CONSTANTS.attributes.RIPPLE)).toBe(true);

    stateLayer.ripple = false;
    expect(stateLayer.hasAttribute(STATE_LAYER_CONSTANTS.attributes.RIPPLE)).toBe(false);
  });

  it('should enable the ripple from the global configuration', async () => {
    const originalConfig = window.TylerForgeGlobalConfiguration;
    window.TylerForgeGlobalConfiguration = { 'forge-state-layer': { ripple: true } };

    try {
      const { container, surface, stateLayer } = await createFixture();
      const animateSpy = vi.spyOn(surface, 'animate');

      simulatePressed(container);
      await task(TOUCH_DELAY_MS);

      expect(stateLayer.ripple).toBe(true);
      expect(animateSpy).toHaveBeenCalledOnce();
    } finally {
      window.TylerForgeGlobalConfiguration = originalConfig;
    }
  });

  it('should not animate the ripple when the user prefers reduced motion', async () => {
    const matchMediaSpy = vi
      .spyOn(window, 'matchMedia')
      .mockImplementation(query => ({ matches: query.includes('prefers-reduced-motion'), media: query }) as MediaQueryList);

    try {
      const { container, surface } = await createFixture({ ripple: true });
      const animateSpy = vi.spyOn(surface, 'animate');

      simulatePressed(container);
      await task(TOUCH_DELAY_MS);

      expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).toBe(true);
      expect(animateSpy).not.toHaveBeenCalled();
    } finally {
      matchMediaSpy.mockRestore();
    }
  });
});

async function createFixture({ target, disabled, ripple }: Partial<IStateLayerComponent> = {}): Promise<{
  container: HTMLDivElement;
  sibling: HTMLElement;
  stateLayer: IStateLayerComponent;
  surface: HTMLDivElement;
}> {
  const screen = render(html`
    <div style="position: relative; overflow: hidden; height: 100px; width: 100px;">
      <div id="sibling"></div>
      <forge-state-layer target=${target ?? nothing} ?disabled=${disabled} ?ripple=${ripple}></forge-state-layer>
    </div>
  `);
  const container = screen.container.firstElementChild as HTMLDivElement;
  const sibling = container.querySelector('#sibling') as HTMLDivElement;
  const stateLayer = container.querySelector('forge-state-layer') as IStateLayerComponent;
  const surface = getShadowElement(stateLayer, STATE_LAYER_CONSTANTS.selectors.SURFACE) as HTMLDivElement;
  return { container, sibling, stateLayer, surface };
}
