import { expect } from '@esm-bundle/chai';
import { spy } from 'sinon';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { task } from '../core/utils/utils';
import { getShadowElement } from '@tylertech/forge-core';
import { BUTTON_AREA_CONSTANTS } from './button-area-constants';
import { IButtonAreaComponent } from './button-area';
import { TOUCH_DELAY_MS, type IStateLayerComponent, STATE_LAYER_CONSTANTS } from '../state-layer';
import type { IFocusIndicatorComponent } from '../focus-indicator';

import './button-area';

describe('Button Area', () => {
  it('should initialize', async () => {
    const { el, root, stateLayer, focusIndicator } = await createFixture({});

    expect(el.shadowRoot).not.to.be.null;
    expect(root.getAttribute('part')).to.equal('root');
    expect(root.classList.contains(BUTTON_AREA_CONSTANTS.classes.ROOT)).to.be.true;
    expect(stateLayer.disabled).to.be.false;
    expect(focusIndicator).to.be.ok;
  });

  it('should be accessible', async () => {
    const { el } = await createFixture({});

    await expect(el).to.be.accessible();
  });

  it('should handle click', async () => {
    const { el } = await createFixture({});
    const clickSpy = spy();
    el.addEventListener('click', clickSpy);

    el.click();

    expect(clickSpy.calledOnce).to.be.true;
  });

  it('should dispatch click event when button is clicked', async () => {
    const { el, button } = await createFixture({});
    const clickSpy = spy();
    el.addEventListener('click', clickSpy);

    button.click();

    expect(clickSpy.calledOnce).to.be.true;
  });

  it('should handle keydown', async () => {
    const { el, button } = await createFixture({});
    const keydownSpy = spy();
    el.addEventListener('keydown', keydownSpy);

    button.focus();
    await pressKey('Enter');
    await pressKey(' ');
    expect(keydownSpy.called).to.be.true;
  });

  it('should animate state layer when handling keydown', async () => {
    const { button, stateLayer } = await createFixture({});
    const stateLayerSurface = getStateLayerSurfaceEl(stateLayer);
    const animateSpy = spy(stateLayerSurface, 'animate');

    button.focus();
    await pressKey('z');
    await task(TOUCH_DELAY_MS);
    expect(animateSpy).to.not.have.been.called;
    expect(stateLayerSurface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).to.be.false;

    await pressKey('Enter');
    await task(TOUCH_DELAY_MS);

    expect(animateSpy).to.have.been.called;
    expect(stateLayerSurface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).to.be.true;
  });

  it('should not dispatch click events when disabled', async () => {
    const { el } = await createFixture({ disabled: true });
    const heading = getHeadingEl(el);
    const clickSpy = spy();
    el.addEventListener('click', clickSpy);

    await elementUpdated(el);

    heading.click();

    expect(clickSpy.called).to.be.false;
  });

  it('should not animate state layer when disabled', async () => {
    const { el, stateLayer } = await createFixture({});
    const stateLayerSurface = getStateLayerSurfaceEl(stateLayer);
    const heading = getHeadingEl(el);

    el.disabled = true;
    await elementUpdated(el);

    heading.click();

    expect(stateLayerSurface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).to.be.false;
  });

  it('should not dispatch click event when ignored children are clicked', async () => {
    const { el, stateLayer } = await createFixture({}, true, true);
    const stateLayerSurface = getStateLayerSurfaceEl(stateLayer);
    const ignoredButton = getIngoredButtonEl(el);
    const clickSpy = spy();
    el.addEventListener('click', clickSpy);

    ignoredButton.click();

    expect(clickSpy.called).to.be.false;
    expect(stateLayerSurface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).to.be.false;
  });

  it('should not dispatch pointer events when ignored children are clicked', async () => {
    const { el, button } = await createFixture({}, true, true);
    const ignoredButton = getIngoredButtonEl(el);
    const pointerdownSpy = spy();
    const pointerupSpy = spy();
    el.addEventListener('pointerdown', pointerdownSpy);
    el.addEventListener('pointerup', pointerupSpy);

    ignoredButton.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    ignoredButton.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));

    expect(pointerdownSpy.called).to.be.false;
    expect(pointerupSpy.called).to.be.false;

    el.disabled = true;

    await elementUpdated(el);

    ignoredButton.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    ignoredButton.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));

    expect(pointerdownSpy.called).to.be.true;
    expect(pointerupSpy.called).to.be.true;

    el.disabled = false;

    await elementUpdated(el);

    button.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    button.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));

    expect(pointerdownSpy.callCount).to.be.equal(2);
    expect(pointerupSpy.callCount).to.be.equal(2);
  });

  it('should not animate state layer when clicking on ignored children', async () => {
    const { el, stateLayer } = await createFixture({}, true, true);
    const stateLayerSurface = getStateLayerSurfaceEl(stateLayer);
    const ignoredButton = getIngoredButtonEl(el);

    ignoredButton.click();
    await task(TOUCH_DELAY_MS);

    expect(stateLayerSurface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).to.be.false;
  });

  it('should not handle keydown when ignored children are focused', async () => {
    const { el, stateLayer } = await createFixture({}, true, true);
    const stateLayerSurface = getStateLayerSurfaceEl(stateLayer);
    const ignoredButton = getIngoredButtonEl(el);
    const keydownSpy = spy();
    el.addEventListener('keydown', keydownSpy);

    ignoredButton.focus();
    await pressKey('Enter');

    expect(keydownSpy.called).to.be.false;
    expect(stateLayerSurface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).to.be.false;
  });

  it('should set disabled dynamically', async () => {
    const { el } = await createFixture({});

    el.disabled = true;
    await elementUpdated(el);

    expect(el.disabled).to.be.true;
    expect(el.hasAttribute('disabled')).to.be.true;
    await expect(el).to.be.accessible();

    el.disabled = false;
    await elementUpdated(el);

    expect(el.disabled).to.be.false;
    expect(el.hasAttribute('disabled')).to.be.false;
  });

  it('should set disabled if the button is disabled and is added after initialize', async () => {
    const { el } = await createFixture({}, false);

    expect(el.disabled).to.be.false;
    expect(el.hasAttribute('disabled')).to.be.false;
    await expect(el).to.be.accessible();

    const button = document.createElement('button') as HTMLButtonElement;
    button.setAttribute('slot', 'button');
    button.setAttribute('disabled', 'true');
    button.innerHTML = 'Slot Changed';
    el.append(button);
    await elementUpdated(el);
    await expect(el).to.be.accessible();

    expect(el.disabled).to.be.true;
    expect(el.hasAttribute('disabled')).to.be.true;
  });

  it('should set button to disabled if element is disabled and button is added after initialize', async () => {
    const { el } = await createFixture({ disabled: true }, false);
    await expect(el).to.be.accessible();

    expect(el.disabled).to.be.true;
    expect(el.hasAttribute('disabled')).to.be.true;

    const button = document.createElement('button') as HTMLButtonElement;
    button.setAttribute('slot', 'button');
    button.innerHTML = 'Slot Changed';
    el.append(button);
    await elementUpdated(el);
    await expect(el).to.be.accessible();

    expect(button.disabled).to.be.true;
  });

  it('should sync disabled state when button disabled attribute changes via DOM', async () => {
    const { el, button } = await createFixture({});

    expect(el.disabled).to.be.false;
    expect(button.disabled).to.be.false;

    // Simulate external DOM manipulation
    button.setAttribute('disabled', '');
    await elementUpdated(el);

    expect(el.disabled).to.be.true;
    expect(el.hasAttribute('disabled')).to.be.true;
  });

  function getHeadingEl(el: IButtonAreaComponent): HTMLSpanElement {
    return el.querySelector('.heading') as HTMLSpanElement;
  }

  function getIngoredButtonEl(el: IButtonAreaComponent): HTMLButtonElement {
    return el.querySelector('[data-forge-ignore]') as HTMLButtonElement;
  }

  function getStateLayerSurfaceEl(el: IStateLayerComponent): HTMLDivElement {
    return getShadowElement(el, STATE_LAYER_CONSTANTS.selectors.SURFACE) as HTMLDivElement;
  }

  function pressKey(press: 'z' | ' ' | 'Enter'): Promise<void> {
    return sendKeys({ press });
  }

  async function createFixture(
    { disabled }: Partial<IButtonAreaComponent> = {},
    hasButton: boolean = true,
    hasIgnoredChildren: boolean = false
  ): Promise<{
    el: IButtonAreaComponent;
    root: HTMLElement;
    focusIndicator: IFocusIndicatorComponent;
    stateLayer: IStateLayerComponent;
    button: HTMLButtonElement;
  }> {
    const buttonTemplate = html`<button slot="button" type="button">Go to detail</button>`;
    const ignoredButton = html`<forge-icon-button data-forge-ignore>
      <button type="button" aria-label="Favorite">
        <forge-icon name="favorite"></forge-icon>
      </button>
      <forge-tooltip>Favorite</forge-tooltip>
    </forge-icon-button>`;
    const el = await fixture<IButtonAreaComponent>(
      html`<forge-button-area ?disabled=${disabled}>
        ${hasButton ? buttonTemplate : null}
        <div class="content">
          <div>
            <span class="heading">Heading</span>
            <span>Content</span>
          </div>
          ${hasIgnoredChildren ? ignoredButton : null}
          <forge-icon name="chevron_right"></forge-icon>
        </div>
      </forge-button-area>`
    );
    const root = el.shadowRoot?.firstElementChild as HTMLElement;
    const stateLayer = el.shadowRoot?.querySelector('forge-state-layer') as IStateLayerComponent;
    const focusIndicator = el.shadowRoot?.querySelector('forge-focus-indicator') as IFocusIndicatorComponent;
    const button = el.querySelector('[slot=button]') as HTMLButtonElement;
    return { el, root, focusIndicator, stateLayer, button };
  }
});
