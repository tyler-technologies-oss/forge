import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { getShadowElement } from '@tylertech/forge-core';
import { task, frame } from '../core/utils/utils.js';
import { BUTTON_AREA_CONSTANTS } from './button-area-constants.js';
import type { IButtonAreaComponent } from './button-area.js';
import { TOUCH_DELAY_MS, type IStateLayerComponent, STATE_LAYER_CONSTANTS } from '../state-layer/index.js';
import type { IFocusIndicatorComponent } from '../focus-indicator/index.js';

import './button-area.js';
import '../icon-button/index.js';
import '../icon/index.js';
import '../tooltip/index.js';

describe('Button Area', () => {
  it('should initialize', async () => {
    const { el, root, stateLayer, focusIndicator } = await createFixture({});

    expect(el.shadowRoot).not.toBeNull();
    expect(root.getAttribute('part')).toBe('root');
    expect(root.classList.contains(BUTTON_AREA_CONSTANTS.classes.ROOT)).toBe(true);
    expect(stateLayer.disabled).toBe(false);
    expect(focusIndicator).toBeTruthy();
  });

  it('should be accessible', async () => {
    const { el } = await createFixture({});
    await expect(el).toBeAccessible();
  });

  it('should handle click', async () => {
    const { el } = await createFixture({});
    const clickSpy = vi.fn();
    el.addEventListener('click', clickSpy);

    el.click();

    expect(clickSpy).toHaveBeenCalledOnce();
  });

  it('should dispatch click event when button is clicked', async () => {
    const { el, button } = await createFixture({});
    const clickSpy = vi.fn();
    el.addEventListener('click', clickSpy);

    button.click();

    expect(clickSpy).toHaveBeenCalledOnce();
  });

  it('should handle keydown', async () => {
    const { el, button } = await createFixture({});
    const keydownSpy = vi.fn();
    el.addEventListener('keydown', keydownSpy);

    button.focus();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');

    expect(keydownSpy).toHaveBeenCalled();
  });

  it('should animate state layer when handling keydown', async () => {
    const { button, stateLayer } = await createFixture({});
    const stateLayerSurface = getStateLayerSurfaceEl(stateLayer);
    const animateSpy = vi.spyOn(stateLayerSurface, 'animate');

    button.focus();
    await userEvent.keyboard('z');
    await task(TOUCH_DELAY_MS);
    expect(animateSpy).not.toHaveBeenCalled();
    expect(stateLayerSurface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).toBe(false);

    await userEvent.keyboard('{Enter}');
    await task(TOUCH_DELAY_MS);

    expect(animateSpy).toHaveBeenCalled();
  });

  it('should not dispatch click events when disabled', async () => {
    const { el } = await createFixture({ disabled: true });
    const heading = getHeadingEl(el);
    const clickSpy = vi.fn();
    el.addEventListener('click', clickSpy);

    el.disabled = true;
    await frame();

    heading.click();

    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('should not animate state layer when disabled', async () => {
    const { el, stateLayer } = await createFixture({});
    const stateLayerSurface = getStateLayerSurfaceEl(stateLayer);
    const heading = getHeadingEl(el);

    el.disabled = true;
    await frame();

    heading.click();

    expect(stateLayerSurface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).toBe(false);
  });

  it('should not dispatch click event when ignored children are clicked', async () => {
    const { el, stateLayer } = await createFixture({}, true, true);
    const stateLayerSurface = getStateLayerSurfaceEl(stateLayer);
    const ignoredButton = getIgnoredButtonEl(el);
    const clickSpy = vi.fn();
    el.addEventListener('click', clickSpy);

    ignoredButton.click();

    expect(clickSpy).not.toHaveBeenCalled();
    expect(stateLayerSurface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).toBe(false);
  });

  it('should not dispatch pointer events when ignored children are clicked', async () => {
    const { el, button } = await createFixture({}, true, true);
    const ignoredButton = getIgnoredButtonEl(el);
    const pointerdownSpy = vi.fn();
    const pointerupSpy = vi.fn();
    el.addEventListener('pointerdown', pointerdownSpy);
    el.addEventListener('pointerup', pointerupSpy);

    ignoredButton.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    ignoredButton.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));

    expect(pointerdownSpy).not.toHaveBeenCalled();
    expect(pointerupSpy).not.toHaveBeenCalled();

    el.disabled = true;
    await frame();

    ignoredButton.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    ignoredButton.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));

    expect(pointerdownSpy).toHaveBeenCalledOnce();
    expect(pointerupSpy).toHaveBeenCalledOnce();

    el.disabled = false;
    await frame();

    button.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    button.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));

    expect(pointerdownSpy).toHaveBeenCalledTimes(2);
    expect(pointerupSpy).toHaveBeenCalledTimes(2);
  });

  it('should not animate state layer when clicking on ignored children', async () => {
    const { el, stateLayer } = await createFixture({}, true, true);
    const stateLayerSurface = getStateLayerSurfaceEl(stateLayer);
    const ignoredButton = getIgnoredButtonEl(el);

    ignoredButton.click();
    await task(TOUCH_DELAY_MS);

    expect(stateLayerSurface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).toBe(false);
  });

  it('should not handle keydown when ignored children are focused', async () => {
    const { el, stateLayer } = await createFixture({}, true, true);
    const stateLayerSurface = getStateLayerSurfaceEl(stateLayer);
    const ignoredButton = getIgnoredButtonEl(el);
    const keydownSpy = vi.fn();
    el.addEventListener('keydown', keydownSpy);

    ignoredButton.focus();
    await userEvent.keyboard('{Enter}');

    expect(keydownSpy).not.toHaveBeenCalled();
    expect(stateLayerSurface.classList.contains(STATE_LAYER_CONSTANTS.classes.PRESSED)).toBe(false);
  });

  it('should set disabled dynamically', async () => {
    const { el } = await createFixture({});

    el.disabled = true;

    expect(el.disabled).toBe(true);
    expect(el.hasAttribute('disabled')).toBe(true);
    await expect(el).toBeAccessible();

    el.disabled = false;

    expect(el.disabled).toBe(false);
    expect(el.hasAttribute('disabled')).toBe(false);
  });

  it('should set disabled if the button is disabled and is added after initialize', async () => {
    const { el } = await createFixture({}, false);

    expect(el.disabled).toBe(false);
    expect(el.hasAttribute('disabled')).toBe(false);
    await expect(el).toBeAccessible();

    const button = document.createElement('button') as HTMLButtonElement;
    button.setAttribute('slot', 'button');
    button.setAttribute('disabled', 'true');
    button.innerHTML = 'Slot Changed';
    el.append(button);
    await expect(el).toBeAccessible();

    expect(el.disabled).toBe(true);
    expect(el.hasAttribute('disabled')).toBe(true);
  });

  it('should set button to disabled if element is disabled and button is added after initialize', async () => {
    const { el } = await createFixture({ disabled: true }, false);
    await expect(el).toBeAccessible();

    expect(el.disabled).toBe(true);
    expect(el.hasAttribute('disabled')).toBe(true);

    const button = document.createElement('button') as HTMLButtonElement;
    button.setAttribute('slot', 'button');
    button.innerHTML = 'Slot Changed';
    el.append(button);
    await expect(el).toBeAccessible();

    expect(button.disabled).toBe(true);
  });

  function getHeadingEl(el: IButtonAreaComponent): HTMLSpanElement {
    return el.querySelector('.heading') as HTMLSpanElement;
  }

  function getIgnoredButtonEl(el: IButtonAreaComponent): HTMLButtonElement {
    return el.querySelector('[data-forge-ignore]') as HTMLButtonElement;
  }

  function getStateLayerSurfaceEl(el: IStateLayerComponent): HTMLDivElement {
    return getShadowElement(el, STATE_LAYER_CONSTANTS.selectors.SURFACE) as HTMLDivElement;
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
    content: HTMLSlotElement;
  }> {
    const screen = render(html`
      <forge-button-area ?disabled=${disabled}>
        ${hasButton ? html`<button slot="button" type="button">Go to detail</button>` : null}
        <div class="content">
          <div>
            <span class="heading">Heading</span>
            <span>Content</span>
          </div>
          ${hasIgnoredChildren
            ? html`
                <forge-icon-button data-forge-ignore>
                  <button type="button" aria-label="Favorite">
                    <forge-icon name="favorite"></forge-icon>
                  </button>
                  <forge-tooltip>Favorite</forge-tooltip>
                </forge-icon-button>
              `
            : null}
          <forge-icon name="chevron_right"></forge-icon>
        </div>
      </forge-button-area>
    `);
    const el = screen.container.querySelector('forge-button-area') as IButtonAreaComponent;
    const root = el.shadowRoot?.firstElementChild as HTMLElement;
    const stateLayer = el.shadowRoot?.querySelector('forge-state-layer') as IStateLayerComponent;
    const focusIndicator = el.shadowRoot?.querySelector('forge-focus-indicator') as IFocusIndicatorComponent;
    const button = el.querySelector('[slot=button]') as HTMLButtonElement;
    const content = el.shadowRoot?.querySelector('#content') as HTMLSlotElement;
    return { el, root, focusIndicator, stateLayer, button, content };
  }
});
