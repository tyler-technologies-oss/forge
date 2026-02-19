import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { getShadowElement } from '@tylertech/forge-core';
import { task, frame } from '../core/utils/utils.js';
import { BUTTON_AREA_CONSTANTS, ButtonAreaComponent } from './index.js';
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
    await frame();

    expect(el.disabled).toBe(true);
    expect(el.hasAttribute('disabled')).toBe(true);
    await expect(el).toBeAccessible();

    el.disabled = false;
    await frame();

    expect(el.disabled).toBe(false);
    expect(el.hasAttribute('disabled')).toBe(false);
  });

  it('should set disabled state when disabled property is set', async () => {
    const { el } = await createFixture({});

    el.disabled = true;
    await frame();

    expect(el.matches(':state(disabled)')).toBe(true);
  });

  it('should set disabled state when disabled attribute is set', async () => {
    const screen = render(html`
      <forge-button-area disabled>
        <button slot="button">Test</button>
      </forge-button-area>
    `);
    const el = screen.container.querySelector('forge-button-area') as ButtonAreaComponent;
    await el.updateComplete;
    await frame();

    expect(el.matches(':state(disabled)')).toBe(true);
  });

  it('should remove disabled state when disabled is set to false', async () => {
    const { el } = await createFixture({ disabled: true });
    await el.updateComplete;

    expect(el.matches(':state(disabled)')).toBe(true);

    el.disabled = false;
    await frame();

    expect(el.matches(':state(disabled)')).toBe(false);
  });

  it('should toggle disabled state dynamically', async () => {
    const { el } = await createFixture({});

    expect(el.matches(':state(disabled)')).toBe(false);

    el.disabled = true;
    await frame();

    expect(el.matches(':state(disabled)')).toBe(true);

    el.disabled = false;
    await frame();

    expect(el.matches(':state(disabled)')).toBe(false);
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
    await el.updateComplete;
    await expect(el).toBeAccessible();

    expect(el.disabled).toBe(true);
    expect(el.hasAttribute('disabled')).toBe(true);

    const button = document.createElement('button') as HTMLButtonElement;
    button.setAttribute('slot', 'button');
    button.innerHTML = 'Slot Changed';
    el.append(button);
    await el.updateComplete;
    await expect(el).toBeAccessible();

    expect(button.disabled).toBe(true);
  });

  it('should sync disabled state when button disabled attribute changes via DOM', async () => {
    const { el, button } = await createFixture({});

    expect(el.disabled).toBe(false);
    expect(button.disabled).toBe(false);

    // Simulate external DOM manipulation
    button.setAttribute('disabled', '');
    await frame();

    expect(el.disabled).toBe(true);
    expect(el.hasAttribute('disabled')).toBe(true);
  });

  describe('aria-pressed observation', () => {
    it('should not have pressed state initially', async () => {
      const { el } = await createFixture({});
      expect(el.matches(':state(pressed)')).toBe(false);
    });

    it('should sync pressed state when button aria-pressed attribute is true', async () => {
      const { el, button } = await createFixture({});

      button.setAttribute('aria-pressed', 'true');
      await frame();

      expect(el.matches(':state(pressed)')).toBe(true);
    });

    it('should remove pressed state when aria-pressed is set to false', async () => {
      const { el, button } = await createFixture({});

      button.setAttribute('aria-pressed', 'true');
      await frame();

      button.setAttribute('aria-pressed', 'false');
      await frame();

      expect(el.matches(':state(pressed)')).toBe(false);
    });

    it('should remove pressed state when aria-pressed attribute is removed', async () => {
      const { el, button } = await createFixture({});

      button.setAttribute('aria-pressed', 'true');
      await frame();

      button.removeAttribute('aria-pressed');
      await frame();

      expect(el.matches(':state(pressed)')).toBe(false);
    });

    it('should observe targetElement aria-pressed attribute changes', async () => {
      const targetButton = document.createElement('button');
      targetButton.textContent = 'Target Button';
      document.body.appendChild(targetButton);

      const { el } = await createFixture({});
      el.targetElement = targetButton;
      await frame();

      targetButton.setAttribute('aria-pressed', 'true');
      await frame();

      expect(el.matches(':state(pressed)')).toBe(true);

      document.body.removeChild(targetButton);
    });

    it('should sync initial pressed state from button with aria-pressed', async () => {
      const screen = render(html`
        <forge-button-area>
          <button slot="button" aria-pressed="true">Test</button>
        </forge-button-area>
      `);
      const el = screen.container.querySelector('forge-button-area') as ButtonAreaComponent;
      await frame();

      expect(el.matches(':state(pressed)')).toBe(true);
    });

    it('should not sync pressed state from slotted button when targetElement is set', async () => {
      const targetButton = document.createElement('button');
      document.body.appendChild(targetButton);

      const { el, button } = await createFixture({});
      el.targetElement = targetButton;
      await frame();

      button.setAttribute('aria-pressed', 'true');
      await frame();

      expect(el.matches(':state(pressed)')).toBe(false);

      document.body.removeChild(targetButton);
    });

    it('should sync initial pressed state from targetElement', async () => {
      const targetButton = document.createElement('button');
      targetButton.setAttribute('aria-pressed', 'true');
      document.body.appendChild(targetButton);

      const { el } = await createFixture({});
      el.targetElement = targetButton;
      await frame();

      expect(el.matches(':state(pressed)')).toBe(true);

      document.body.removeChild(targetButton);
    });
  });

  describe('aria-current observation', () => {
    it('should not have current state initially', async () => {
      const { el } = await createFixture({});
      expect(el.matches(':state(current)')).toBe(false);
    });

    it('should sync current state when aria-current is "true"', async () => {
      const { el, button } = await createFixture({});

      button.setAttribute('aria-current', 'true');
      await frame();

      expect(el.matches(':state(current)')).toBe(true);
    });

    it('should sync current state when aria-current is "page"', async () => {
      const { el, button } = await createFixture({});

      button.setAttribute('aria-current', 'page');
      await frame();

      expect(el.matches(':state(current)')).toBe(true);
    });

    it('should sync current state when aria-current is "step"', async () => {
      const { el, button } = await createFixture({});

      button.setAttribute('aria-current', 'step');
      await frame();

      expect(el.matches(':state(current)')).toBe(true);
    });

    it('should sync current state when aria-current is "location"', async () => {
      const { el, button } = await createFixture({});

      button.setAttribute('aria-current', 'location');
      await frame();

      expect(el.matches(':state(current)')).toBe(true);
    });

    it('should sync current state when aria-current is "date"', async () => {
      const { el, button } = await createFixture({});

      button.setAttribute('aria-current', 'date');
      await frame();

      expect(el.matches(':state(current)')).toBe(true);
    });

    it('should sync current state when aria-current is "time"', async () => {
      const { el, button } = await createFixture({});

      button.setAttribute('aria-current', 'time');
      await frame();

      expect(el.matches(':state(current)')).toBe(true);
    });

    it('should remove current state when aria-current is set to "false"', async () => {
      const { el, button } = await createFixture({});

      button.setAttribute('aria-current', 'page');
      await frame();
      expect(el.matches(':state(current)')).toBe(true);

      button.setAttribute('aria-current', 'false');
      await frame();

      expect(el.matches(':state(current)')).toBe(false);
    });

    it('should remove current state when aria-current attribute is removed', async () => {
      const { el, button } = await createFixture({});

      button.setAttribute('aria-current', 'page');
      await frame();
      expect(el.matches(':state(current)')).toBe(true);

      button.removeAttribute('aria-current');
      await frame();

      expect(el.matches(':state(current)')).toBe(false);
    });

    it('should not set current state for invalid aria-current values', async () => {
      const { el, button } = await createFixture({});

      button.setAttribute('aria-current', 'invalid');
      await frame();

      expect(el.matches(':state(current)')).toBe(false);
    });

    it('should observe targetElement aria-current attribute changes', async () => {
      const targetButton = document.createElement('button');
      targetButton.textContent = 'Target Button';
      document.body.appendChild(targetButton);

      const { el } = await createFixture({});
      el.targetElement = targetButton;
      await frame();

      targetButton.setAttribute('aria-current', 'page');
      await frame();

      expect(el.matches(':state(current)')).toBe(true);

      document.body.removeChild(targetButton);
    });

    it('should sync initial current state from button with aria-current', async () => {
      const screen = render(html`
        <forge-button-area>
          <button slot="button" aria-current="page">Test</button>
        </forge-button-area>
      `);
      const el = screen.container.querySelector('forge-button-area') as ButtonAreaComponent;
      await frame();

      expect(el.matches(':state(current)')).toBe(true);
    });

    it('should not sync current state from slotted button when targetElement is set', async () => {
      const targetButton = document.createElement('button');
      document.body.appendChild(targetButton);

      const { el, button } = await createFixture({});
      el.targetElement = targetButton;
      await frame();

      button.setAttribute('aria-current', 'page');
      await frame();

      expect(el.matches(':state(current)')).toBe(false);

      document.body.removeChild(targetButton);
    });

    it('should sync initial current state from targetElement', async () => {
      const targetButton = document.createElement('button');
      targetButton.setAttribute('aria-current', 'step');
      document.body.appendChild(targetButton);

      const { el } = await createFixture({});
      el.targetElement = targetButton;
      await frame();

      expect(el.matches(':state(current)')).toBe(true);

      document.body.removeChild(targetButton);
    });
  });

  describe('anchor element', () => {
    it('should initialize with anchor element in button slot', async () => {
      const { el, anchor, stateLayer, focusIndicator } = await createFixtureWithAnchor({});

      expect(el.shadowRoot).not.toBeNull();
      expect(anchor).toBeTruthy();
      expect(anchor.tagName).toBe('A');
      expect(stateLayer.disabled).toBe(false);
      expect(focusIndicator).toBeTruthy();
    });

    it('should handle Enter key with anchor element', async () => {
      const { anchor, stateLayer } = await createFixtureWithAnchor({});
      const stateLayerSurface = getStateLayerSurfaceEl(stateLayer);
      const animateSpy = vi.spyOn(stateLayerSurface, 'animate');

      anchor.focus();
      await userEvent.keyboard('{Enter}');
      await task(TOUCH_DELAY_MS);

      expect(animateSpy).toHaveBeenCalled();
    });

    it('should not handle Space key with anchor element', async () => {
      const { anchor, stateLayer } = await createFixtureWithAnchor({});
      const stateLayerSurface = getStateLayerSurfaceEl(stateLayer);
      const animateSpy = vi.spyOn(stateLayerSurface, 'animate');

      anchor.focus();
      await userEvent.keyboard(' ');
      await task(TOUCH_DELAY_MS);

      expect(animateSpy).not.toHaveBeenCalled();
    });

    it('should keep state layer when disabled with anchor element', async () => {
      const { el, stateLayer } = await createFixtureWithAnchor({});

      el.disabled = true;
      await frame();

      expect(stateLayer.isConnected).toBe(true);
    });

    it('should keep focus indicator when disabled with anchor element', async () => {
      const { el, focusIndicator } = await createFixtureWithAnchor({});

      el.disabled = true;
      await frame();

      expect(focusIndicator.isConnected).toBe(true);
    });

    it('should not add disabled attribute to anchor element', async () => {
      const { el, anchor } = await createFixtureWithAnchor({});

      el.disabled = true;
      await frame();

      expect(anchor.hasAttribute('disabled')).toBe(false);
    });

    it('should sync current state with anchor element aria-current', async () => {
      const { el, anchor } = await createFixtureWithAnchor({});

      anchor.setAttribute('aria-current', 'page');
      await frame();

      expect(el.matches(':state(current)')).toBe(true);
    });

    it('should use anchor element as target element', async () => {
      const targetAnchor = document.createElement('a');
      targetAnchor.href = '#test';
      targetAnchor.textContent = 'Target Link';
      document.body.appendChild(targetAnchor);

      const { el } = await createFixture({});
      el.targetElement = targetAnchor;
      await frame();

      expect(el.targetElement).toBe(targetAnchor);
      expect(el.targetElement.tagName).toBe('A');

      document.body.removeChild(targetAnchor);
    });

    it('should keep state layer when disabled with anchor target element', async () => {
      const targetAnchor = document.createElement('a');
      targetAnchor.href = '#test';
      document.body.appendChild(targetAnchor);

      const { el, stateLayer } = await createFixture({});
      el.targetElement = targetAnchor;
      await frame();

      el.disabled = true;
      await frame();

      expect(stateLayer.isConnected).toBe(true);

      document.body.removeChild(targetAnchor);
    });

    it('should locate anchor element by ID when target property is set', async () => {
      const targetAnchor = document.createElement('a');
      targetAnchor.id = 'target-anchor';
      targetAnchor.href = '#test';
      targetAnchor.textContent = 'Target Link';
      document.body.appendChild(targetAnchor);

      const { el } = await createFixture({});
      el.target = 'target-anchor';
      await frame();

      expect(el.targetElement).toBe(targetAnchor);
      expect(el.targetElement?.tagName).toBe('A');

      document.body.removeChild(targetAnchor);
    });

    it('should sync current state from anchor target element', async () => {
      const targetAnchor = document.createElement('a');
      targetAnchor.href = '#test';
      targetAnchor.setAttribute('aria-current', 'page');
      document.body.appendChild(targetAnchor);

      const { el } = await createFixture({});
      el.targetElement = targetAnchor;
      await frame();

      expect(el.matches(':state(current)')).toBe(true);

      document.body.removeChild(targetAnchor);
    });

    it('should trigger click on anchor target element when button area is clicked', async () => {
      const targetAnchor = document.createElement('a');
      targetAnchor.href = '#test';
      document.body.appendChild(targetAnchor);

      const { el } = await createFixture({});
      el.targetElement = targetAnchor;
      await frame();

      const clickSpy = vi.fn((e: Event) => e.preventDefault());
      targetAnchor.addEventListener('click', clickSpy);

      const content = el.querySelector('.content') as HTMLElement;
      content.click();

      expect(clickSpy).toHaveBeenCalledOnce();

      document.body.removeChild(targetAnchor);
    });
  });

  describe('target and targetElement', () => {
    it('should locate target element by ID when target property is set', async () => {
      const targetButton = document.createElement('button');
      targetButton.id = 'target-button';
      targetButton.textContent = 'Target Button';
      document.body.appendChild(targetButton);

      const { el } = await createFixture({});
      el.target = 'target-button';
      await frame();

      expect(el.targetElement).toBe(targetButton);

      document.body.removeChild(targetButton);
    });

    it('should use targetElement when set directly', async () => {
      const targetButton = document.createElement('button');
      targetButton.textContent = 'Target Button';
      document.body.appendChild(targetButton);

      const { el } = await createFixture({});
      el.targetElement = targetButton;
      await frame();

      expect(el.targetElement).toBe(targetButton);

      document.body.removeChild(targetButton);
    });

    it('should remove focus indicator when targetElement is set', async () => {
      const targetButton = document.createElement('button');
      targetButton.textContent = 'Target Button';
      document.body.appendChild(targetButton);

      const { el, focusIndicator } = await createFixture({});

      expect(focusIndicator.isConnected).toBe(true);

      el.targetElement = targetButton;
      await frame();

      expect(focusIndicator.isConnected).toBe(false);

      document.body.removeChild(targetButton);
    });

    it('should restore focus indicator when targetElement is cleared', async () => {
      const targetButton = document.createElement('button');
      targetButton.textContent = 'Target Button';
      document.body.appendChild(targetButton);

      const { el, focusIndicator } = await createFixture({});

      el.targetElement = targetButton;
      await frame();
      expect(focusIndicator.isConnected).toBe(false);

      el.targetElement = undefined;
      await frame();

      expect(focusIndicator.isConnected).toBe(true);

      document.body.removeChild(targetButton);
    });

    it('should sync disabled state from targetElement when set', async () => {
      const targetButton = document.createElement('button');
      targetButton.textContent = 'Target Button';
      targetButton.disabled = true;
      document.body.appendChild(targetButton);

      const { el } = await createFixture({});
      expect(el.disabled).toBe(false);

      el.targetElement = targetButton;
      await frame();

      expect(el.disabled).toBe(true);

      document.body.removeChild(targetButton);
    });

    it('should sync disabled state to targetElement when button area disabled changes', async () => {
      const targetButton = document.createElement('button');
      targetButton.textContent = 'Target Button';
      document.body.appendChild(targetButton);

      const { el } = await createFixture({});
      el.targetElement = targetButton;
      await frame();

      expect(targetButton.disabled).toBe(false);

      el.disabled = true;
      await frame();

      expect(targetButton.disabled).toBe(true);

      document.body.removeChild(targetButton);
    });

    it('should observe targetElement disabled attribute changes', async () => {
      const targetButton = document.createElement('button');
      targetButton.textContent = 'Target Button';
      document.body.appendChild(targetButton);

      const { el } = await createFixture({});
      el.targetElement = targetButton;
      await frame();

      expect(el.disabled).toBe(false);

      targetButton.setAttribute('disabled', '');
      await frame();

      expect(el.disabled).toBe(true);

      document.body.removeChild(targetButton);
    });

    it('should clear targetElement when target element is removed and disabled changes', async () => {
      const targetButton = document.createElement('button');
      targetButton.textContent = 'Target Button';
      document.body.appendChild(targetButton);

      const { el } = await createFixture({});
      el.targetElement = targetButton;
      await frame();

      expect(el.targetElement).toBe(targetButton);

      // Remove the element from DOM
      document.body.removeChild(targetButton);

      // Trigger a disabled attribute change to invoke the observer callback
      targetButton.setAttribute('disabled', '');
      await frame();

      // The observer detects the element is disconnected and clears targetElement
      expect(el.targetElement).toBeUndefined();
    });

    it('should update targetElement when target property changes', async () => {
      const targetButton1 = document.createElement('button');
      targetButton1.id = 'target-button-1';
      targetButton1.textContent = 'Target Button 1';
      document.body.appendChild(targetButton1);

      const targetButton2 = document.createElement('button');
      targetButton2.id = 'target-button-2';
      targetButton2.textContent = 'Target Button 2';
      document.body.appendChild(targetButton2);

      const { el } = await createFixture({});
      el.target = 'target-button-1';
      await frame();

      expect(el.targetElement).to.equal(targetButton1);

      el.target = 'target-button-2';
      await frame();

      expect(el.targetElement).to.equal(targetButton2);

      document.body.removeChild(targetButton1);
      document.body.removeChild(targetButton2);
    });

    it('should prioritize targetElement over slotted button for disabled state', async () => {
      const targetButton = document.createElement('button');
      targetButton.textContent = 'Target Button';
      targetButton.disabled = true;
      document.body.appendChild(targetButton);

      const { el, button } = await createFixture({});
      expect(button.disabled).toBe(false);

      el.targetElement = targetButton;
      await frame();

      // Button area should sync with target element, not slotted button
      expect(el.disabled).toBe(true);
      expect(button.disabled).toBe(false);

      document.body.removeChild(targetButton);
    });

    it('should not sync disabled state from slotted button when targetElement is set', async () => {
      const targetButton = document.createElement('button');
      targetButton.textContent = 'Target Button';
      document.body.appendChild(targetButton);

      const { el, button } = await createFixture({});
      el.targetElement = targetButton;
      await frame();

      expect(el.disabled).toBe(false);

      // Change slotted button disabled state
      button.setAttribute('disabled', '');
      await frame();

      // Button area should not sync with slotted button when target element is set
      expect(el.disabled).toBe(false);

      document.body.removeChild(targetButton);
    });

    it('should restore focus indicator only when not disabled and targetElement is cleared', async () => {
      const targetButton = document.createElement('button');
      targetButton.textContent = 'Target Button';
      document.body.appendChild(targetButton);

      const { el, focusIndicator } = await createFixture({});
      el.targetElement = targetButton;
      await frame();

      expect(focusIndicator.isConnected).toBe(false);

      el.disabled = true;
      await frame();

      el.targetElement = undefined;
      await frame();

      // Focus indicator should not be restored because button area is disabled
      expect(focusIndicator.isConnected).toBe(false);

      document.body.removeChild(targetButton);
    });

    it('should handle targetElement without disabled property', async () => {
      const targetDiv = document.createElement('div');
      targetDiv.textContent = 'Target Div';
      document.body.appendChild(targetDiv);

      const { el, button } = await createFixture({});
      el.targetElement = targetDiv;
      await frame();

      // Should fall back to slotted button since targetDiv doesn't have disabled property
      el.disabled = true;
      await frame();

      expect(button.disabled).toBe(true);

      document.body.removeChild(targetDiv);
    });
  });

  function getHeadingEl(el: ButtonAreaComponent): HTMLSpanElement {
    return el.querySelector('.heading') as HTMLSpanElement;
  }

  function getIgnoredButtonEl(el: ButtonAreaComponent): HTMLButtonElement {
    return el.querySelector('[data-forge-ignore]') as HTMLButtonElement;
  }

  function getStateLayerSurfaceEl(el: IStateLayerComponent): HTMLDivElement {
    return getShadowElement(el, STATE_LAYER_CONSTANTS.selectors.SURFACE) as HTMLDivElement;
  }

  async function createFixture(
    { disabled }: Partial<ButtonAreaComponent> = {},
    hasButton: boolean = true,
    hasIgnoredChildren: boolean = false
  ): Promise<{
    el: ButtonAreaComponent;
    root: HTMLElement;
    focusIndicator: IFocusIndicatorComponent;
    stateLayer: IStateLayerComponent;
    button: HTMLButtonElement;
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
    const el = screen.container.querySelector('forge-button-area') as ButtonAreaComponent;
    await frame();
    const root = el.shadowRoot?.firstElementChild as HTMLElement;
    const stateLayer = el.shadowRoot?.querySelector('forge-state-layer') as IStateLayerComponent;
    const focusIndicator = el.shadowRoot?.querySelector('forge-focus-indicator') as IFocusIndicatorComponent;
    const button = el.querySelector('[slot=button]') as HTMLButtonElement;
    return { el, root, focusIndicator, stateLayer, button };
  }

  async function createFixtureWithAnchor({ disabled }: Partial<ButtonAreaComponent> = {}): Promise<{
    el: ButtonAreaComponent;
    root: HTMLElement;
    focusIndicator: IFocusIndicatorComponent;
    stateLayer: IStateLayerComponent;
    anchor: HTMLAnchorElement;
  }> {
    const screen = render(html`
      <forge-button-area ?disabled=${disabled}>
        <a slot="button" href="#test">Go to detail</a>
        <div class="content">
          <div>
            <span class="heading">Heading</span>
            <span>Content</span>
          </div>
          <forge-icon name="chevron_right"></forge-icon>
        </div>
      </forge-button-area>
    `);
    const el = screen.container.querySelector('forge-button-area') as ButtonAreaComponent;
    await frame();
    const root = el.shadowRoot?.firstElementChild as HTMLElement;
    const stateLayer = el.shadowRoot?.querySelector('forge-state-layer') as IStateLayerComponent;
    const focusIndicator = el.shadowRoot?.querySelector('forge-focus-indicator') as IFocusIndicatorComponent;
    const anchor = el.querySelector('[slot=button]') as HTMLAnchorElement;
    return { el, root, focusIndicator, stateLayer, anchor };
  }
});
