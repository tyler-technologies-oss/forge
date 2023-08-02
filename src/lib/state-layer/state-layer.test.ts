import { expect } from '@esm-bundle/chai';
import { spy } from 'sinon';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { getShadowElement } from '@tylertech/forge-core';
import { timer } from '@tylertech/forge-testing';
import type { IStateLayerComponent } from './state-layer';
import { MINIMUM_PRESS_MS, PRESS_GROW_MS, STATE_LAYER_CONSTANTS, TOUCH_DELAY_MS } from './state-layer-constants';
import { createMouseEventInit, simulateHover, simulateLeave, simulatePressAndHold, simulatePressed } from '../core/testing/pointer';
import { StateLayerFoundation } from './state-layer-foundation';

import './state-layer';

describe('StateLayer', () => {
  it('should contain shadow root', async () => {
    const { stateLayer } = await createFixture();
    expect(stateLayer.shadowRoot).not.to.be.null;
  });

  it('should attach to parent if no target is specified', async () => {
    const { container, stateLayer } = await createFixture();
    expect(stateLayer.targetElement).to.equal(container);
  });

  it('should defer attaching event listeners', async () => {
    const { container, stateLayer } = await createFixture();

    const foundation = stateLayer['_foundation'] as StateLayerFoundation;
    await elementUpdated(stateLayer);
    expect(foundation.isAttached).to.be.false;

    simulateHover(container);
    await elementUpdated(stateLayer);

    expect(foundation.isAttached).to.be.true;
  });

  it('should show hover state', async () => {
    const { container, surface } = await createFixture();

    simulateHover(container);
    await elementUpdated(surface);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.HOVERED)).to.be.true;
  });

  it('should remove hover state', async () => {
    const { container, surface } = await createFixture();

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.HOVERED)).to.be.false;

    simulateHover(container);
    await elementUpdated(surface);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.HOVERED)).to.be.true;
    
    simulateLeave(container);
    await elementUpdated(surface);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.HOVERED)).to.be.false;
  });

  it('should not show hover state when disabled', async () => {
    const { container, surface } = await createFixture({ disabled: true });

    simulateHover(container);
    await elementUpdated(surface);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.HOVERED)).to.be.false;
  });

  it('should not show hover state when using touch pointer', async () => {
    const { container, surface } = await createFixture();

    simulateHover(container, { pointerType: 'touch' });
    await elementUpdated(surface);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.HOVERED)).to.be.false;
  });

  it('should show hover state when using pen pointer', async () => {
    const { container, surface } = await createFixture();

    simulateHover(container, { pointerType: 'pen' });
    await elementUpdated(surface);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.HOVERED)).to.be.true;
  });

  it('should not show hover state if not primary pointer', async () => {
    const { container, surface } = await createFixture();

    simulateHover(container, { isPrimary: false });

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.HOVERED)).to.be.false;
  });

  it('should animate ripple', async () => {
    const { container, surface } = await createFixture();

    const animateSpy = spy(surface, 'animate');

    simulatePressed(container);
    await timer(TOUCH_DELAY_MS);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).to.be.true;
    expect(animateSpy).to.have.been.calledOnce;
  });

  it('should not animate ripple when disabled', async () => {
    const { container, surface } = await createFixture({ disabled: true });

    const animateSpy = spy(surface, 'animate');

    simulatePressed(container);
    await timer(TOUCH_DELAY_MS);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).to.be.false;
    expect(animateSpy).not.to.have.been.called;
  });

  it('should disable dynamically', async () => {
    const { container, surface, stateLayer } = await createFixture();

    const animateSpy = spy(surface, 'animate');
    stateLayer.disabled = true;
    await elementUpdated(stateLayer);

    simulatePressed(container);
    await timer(TOUCH_DELAY_MS);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).to.be.false;
    expect(animateSpy).not.to.have.been.called;
  });

  it('should animate ripple when using touch pointer', async () => {
    const { container, surface } = await createFixture();

    const animateSpy = spy(surface, 'animate');

    simulatePressed(container, { pointerType: 'touch' });
    await timer(TOUCH_DELAY_MS);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).to.be.true;
    expect(animateSpy).to.have.been.called;
  });

  it('should remove pressed when done animating', async () => {
    const { container, surface } = await createFixture();

    simulatePressed(container);
    await timer(TOUCH_DELAY_MS);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).to.be.true;

    await timer(PRESS_GROW_MS);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).to.be.false;
  });

  it('should not remove pressed when done animating if still pressed', async () => {
    const { container, surface } = await createFixture();
    const animateSpy = spy(surface, 'animate');

    await simulatePressAndHold(container);
    await timer(TOUCH_DELAY_MS);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).to.be.true;

    simulateHover(container);
    await timer(PRESS_GROW_MS);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).to.be.true;
    expect(animateSpy).to.have.been.calledOnce;
  });

  it('should animate via method manually', async () => {
    const { stateLayer, surface } = await createFixture();

    const animateSpy = spy(surface, 'animate');

    stateLayer.playRippleAnimation();
    await elementUpdated(surface);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).to.be.true;
    expect(animateSpy).to.have.been.calledOnce;
  });

  it('should stop animating if pointercancel', async () => {
    const { container, surface } = await createFixture();

    const animateSpy = spy(surface, 'animate');

    simulatePressed(container);
    await timer(TOUCH_DELAY_MS);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).to.be.true;

    const evtInit = createMouseEventInit(container);
    container.dispatchEvent(new PointerEvent('pointercancel', evtInit));
    await timer(MINIMUM_PRESS_MS);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).to.be.false;
    expect(animateSpy).to.have.been.calledOnce;
  });

  it('should stop animating if contextmenu', async () => {
    const { container, surface } = await createFixture();

    const animateSpy = spy(surface, 'animate');

    simulatePressed(container);
    await timer(TOUCH_DELAY_MS);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).to.be.true;

    container.dispatchEvent(new MouseEvent('contextmenu'));
    await timer(MINIMUM_PRESS_MS);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).to.be.false;
    expect(animateSpy).to.have.been.calledOnce;
  });

  it('should remove target element', async () => {
    const { container, stateLayer, surface } = await createFixture();

    const animateSpy = spy(surface, 'animate');

    stateLayer.targetElement = null;

    simulatePressed(container);
    await timer(TOUCH_DELAY_MS);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).to.be.false;
    expect(stateLayer.targetElement).to.be.null;
    expect(animateSpy).not.to.have.been.called;
  });

  it('should set target element by id dynamically', async () => {
    const { container, sibling, stateLayer, surface } = await createFixture();

    const animateSpy = spy(surface, 'animate');
    stateLayer.target = 'sibling';

    expect(stateLayer.targetElement).to.equal(sibling);

    simulatePressed(container);
    await timer(TOUCH_DELAY_MS);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).to.be.false;
    expect(animateSpy).not.to.have.been.called;

    simulatePressed(sibling);
    await timer(TOUCH_DELAY_MS);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).to.be.true;
    expect(animateSpy).to.have.been.calledOnce;
  });

  it('should animate on click', async () => {
    const { container, surface } = await createFixture();

    const animateSpy = spy(surface, 'animate');

    simulateHover(container);
    await elementUpdated(surface);

    container.click();
    await timer(TOUCH_DELAY_MS);

    expect(surface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).to.be.true;
    expect(animateSpy).to.have.been.calledOnce;
  });

  it('should locate target if setting target property before connected', async () => {
    const { stateLayer, sibling } = await createFixture({ target: 'sibling' });
    expect(stateLayer.targetElement).to.equal(sibling);
  });

  it('should set target element manually', async () => {
    const { container, sibling, stateLayer, surface } = await createFixture({ target: 'sibling' });
    const animateSpy = spy(surface, 'animate');

    await elementUpdated(stateLayer);
    expect(stateLayer.targetElement).to.equal(sibling);

    simulateHover(sibling); // This forces the listeners to attach
    await elementUpdated(stateLayer);

    stateLayer.targetElement = container;
    await elementUpdated(stateLayer);

    expect(stateLayer.targetElement).to.equal(container);

    simulatePressed(container);
    await timer(TOUCH_DELAY_MS);

    expect(animateSpy).to.have.been.called;

    stateLayer.targetElement = sibling;
    await elementUpdated(stateLayer);

    simulatePressed(sibling);
    await timer(TOUCH_DELAY_MS);

    expect(animateSpy).to.have.been.calledTwice;
  });
});

async function createFixture({ target, disabled }: Partial<IStateLayerComponent> = {}): Promise<{ container: HTMLDivElement; sibling: HTMLElement; stateLayer: IStateLayerComponent, surface: HTMLDivElement }> {
  const el = await fixture<HTMLElement>(html`
    <div style="position: relative; overflow: hidden; height: 100px; width: 100px;">
      <div id="sibling"></div>
      <forge-state-layer target=${target} ?disabled=${disabled}></forge-state-layer>
    </div>
  `);
  const container = el as HTMLDivElement;
  const sibling = container.querySelector('#sibling') as HTMLDivElement;
  const stateLayer = el.querySelector('forge-state-layer') as IStateLayerComponent;
  const surface = getShadowElement(stateLayer, STATE_LAYER_CONSTANTS.selectors.SURFACE) as HTMLDivElement;
  return { container, sibling, stateLayer, surface };
}
