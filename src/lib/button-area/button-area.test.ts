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

  it('should set disabled state when disabled property is set', async () => {
    const { el } = await createFixture({});

    el.disabled = true;
    await elementUpdated(el);

    expect(el.matches(':state(disabled)')).to.be.true;
  });

  it('should set disabled state when disabled attribute is set', async () => {
    const el = await fixture<IButtonAreaComponent>(html`
      <forge-button-area disabled>
        <button slot="button">Test</button>
      </forge-button-area>
    `);

    expect(el.matches(':state(disabled)')).to.be.true;
  });

  it('should remove disabled state when disabled is set to false', async () => {
    const { el } = await createFixture({ disabled: true });

    expect(el.matches(':state(disabled)')).to.be.true;

    el.disabled = false;
    await elementUpdated(el);

    expect(el.matches(':state(disabled)')).to.be.false;
  });

  it('should toggle disabled state dynamically', async () => {
    const { el } = await createFixture({});

    expect(el.matches(':state(disabled)')).to.be.false;

    el.disabled = true;
    await elementUpdated(el);

    expect(el.matches(':state(disabled)')).to.be.true;

    el.disabled = false;
    await elementUpdated(el);

    expect(el.matches(':state(disabled)')).to.be.false;
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

  describe('aria-pressed observation', () => {
    it('should not have pressed state initially', async () => {
      const { el } = await createFixture({});
      expect(el.matches(':state(pressed)')).to.be.false;
    });

    it('should sync pressed state when button aria-pressed attribute is true', async () => {
      const { el, button } = await createFixture({});

      button.setAttribute('aria-pressed', 'true');
      await elementUpdated(el);

      expect(el.matches(':state(pressed)')).to.be.true;
    });

    it('should remove pressed state when aria-pressed is set to false', async () => {
      const { el, button } = await createFixture({});

      button.setAttribute('aria-pressed', 'true');
      await elementUpdated(el);

      button.setAttribute('aria-pressed', 'false');
      await elementUpdated(el);

      expect(el.matches(':state(pressed)')).to.be.false;
    });

    it('should remove pressed state when aria-pressed attribute is removed', async () => {
      const { el, button } = await createFixture({});

      button.setAttribute('aria-pressed', 'true');
      await elementUpdated(el);

      button.removeAttribute('aria-pressed');
      await elementUpdated(el);

      expect(el.matches(':state(pressed)')).to.be.false;
    });

    it('should observe targetElement aria-pressed attribute changes', async () => {
      const targetButton = document.createElement('button');
      targetButton.textContent = 'Target Button';
      document.body.appendChild(targetButton);

      const { el } = await createFixture({});
      el.targetElement = targetButton;
      await elementUpdated(el);

      targetButton.setAttribute('aria-pressed', 'true');
      await elementUpdated(el);

      expect(el.matches(':state(pressed)')).to.be.true;

      document.body.removeChild(targetButton);
    });

    it('should sync initial pressed state from button with aria-pressed', async () => {
      const el = await fixture<IButtonAreaComponent>(html`
        <forge-button-area>
          <button slot="button" aria-pressed="true">Test</button>
        </forge-button-area>
      `);

      expect(el.matches(':state(pressed)')).to.be.true;
    });

    it('should not sync pressed state from slotted button when targetElement is set', async () => {
      const targetButton = document.createElement('button');
      document.body.appendChild(targetButton);

      const { el, button } = await createFixture({});
      el.targetElement = targetButton;
      await elementUpdated(el);

      button.setAttribute('aria-pressed', 'true');
      await elementUpdated(el);

      expect(el.matches(':state(pressed)')).to.be.false;

      document.body.removeChild(targetButton);
    });

    it('should sync initial pressed state from targetElement', async () => {
      const targetButton = document.createElement('button');
      targetButton.setAttribute('aria-pressed', 'true');
      document.body.appendChild(targetButton);

      const { el } = await createFixture({});
      el.targetElement = targetButton;
      await elementUpdated(el);

      expect(el.matches(':state(pressed)')).to.be.true;

      document.body.removeChild(targetButton);
    });
  });

  describe('aria-current observation', () => {
    it('should not have current state initially', async () => {
      const { el } = await createFixture({});
      expect(el.matches(':state(current)')).to.be.false;
    });

    it('should sync current state when aria-current is "true"', async () => {
      const { el, button } = await createFixture({});

      button.setAttribute('aria-current', 'true');
      await elementUpdated(el);

      expect(el.matches(':state(current)')).to.be.true;
    });

    it('should sync current state when aria-current is "page"', async () => {
      const { el, button } = await createFixture({});

      button.setAttribute('aria-current', 'page');
      await elementUpdated(el);

      expect(el.matches(':state(current)')).to.be.true;
    });

    it('should sync current state when aria-current is "step"', async () => {
      const { el, button } = await createFixture({});

      button.setAttribute('aria-current', 'step');
      await elementUpdated(el);

      expect(el.matches(':state(current)')).to.be.true;
    });

    it('should sync current state when aria-current is "location"', async () => {
      const { el, button } = await createFixture({});

      button.setAttribute('aria-current', 'location');
      await elementUpdated(el);

      expect(el.matches(':state(current)')).to.be.true;
    });

    it('should sync current state when aria-current is "date"', async () => {
      const { el, button } = await createFixture({});

      button.setAttribute('aria-current', 'date');
      await elementUpdated(el);

      expect(el.matches(':state(current)')).to.be.true;
    });

    it('should sync current state when aria-current is "time"', async () => {
      const { el, button } = await createFixture({});

      button.setAttribute('aria-current', 'time');
      await elementUpdated(el);

      expect(el.matches(':state(current)')).to.be.true;
    });

    it('should remove current state when aria-current is set to "false"', async () => {
      const { el, button } = await createFixture({});

      button.setAttribute('aria-current', 'page');
      await elementUpdated(el);
      expect(el.matches(':state(current)')).to.be.true;

      button.setAttribute('aria-current', 'false');
      await elementUpdated(el);

      expect(el.matches(':state(current)')).to.be.false;
    });

    it('should remove current state when aria-current attribute is removed', async () => {
      const { el, button } = await createFixture({});

      button.setAttribute('aria-current', 'page');
      await elementUpdated(el);
      expect(el.matches(':state(current)')).to.be.true;

      button.removeAttribute('aria-current');
      await elementUpdated(el);

      expect(el.matches(':state(current)')).to.be.false;
    });

    it('should not set current state for invalid aria-current values', async () => {
      const { el, button } = await createFixture({});

      button.setAttribute('aria-current', 'invalid');
      await elementUpdated(el);

      expect(el.matches(':state(current)')).to.be.false;
    });

    it('should observe targetElement aria-current attribute changes', async () => {
      const targetButton = document.createElement('button');
      targetButton.textContent = 'Target Button';
      document.body.appendChild(targetButton);

      const { el } = await createFixture({});
      el.targetElement = targetButton;
      await elementUpdated(el);

      targetButton.setAttribute('aria-current', 'page');
      await elementUpdated(el);

      expect(el.matches(':state(current)')).to.be.true;

      document.body.removeChild(targetButton);
    });

    it('should sync initial current state from button with aria-current', async () => {
      const el = await fixture<IButtonAreaComponent>(html`
        <forge-button-area>
          <button slot="button" aria-current="page">Test</button>
        </forge-button-area>
      `);

      expect(el.matches(':state(current)')).to.be.true;
    });

    it('should not sync current state from slotted button when targetElement is set', async () => {
      const targetButton = document.createElement('button');
      document.body.appendChild(targetButton);

      const { el, button } = await createFixture({});
      el.targetElement = targetButton;
      await elementUpdated(el);

      button.setAttribute('aria-current', 'page');
      await elementUpdated(el);

      expect(el.matches(':state(current)')).to.be.false;

      document.body.removeChild(targetButton);
    });

    it('should sync initial current state from targetElement', async () => {
      const targetButton = document.createElement('button');
      targetButton.setAttribute('aria-current', 'step');
      document.body.appendChild(targetButton);

      const { el } = await createFixture({});
      el.targetElement = targetButton;
      await elementUpdated(el);

      expect(el.matches(':state(current)')).to.be.true;

      document.body.removeChild(targetButton);
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
      await elementUpdated(el);

      expect(el.targetElement).to.equal(targetButton);

      document.body.removeChild(targetButton);
    });

    it('should use targetElement when set directly', async () => {
      const targetButton = document.createElement('button');
      targetButton.textContent = 'Target Button';
      document.body.appendChild(targetButton);

      const { el } = await createFixture({});
      el.targetElement = targetButton;
      await elementUpdated(el);

      expect(el.targetElement).to.equal(targetButton);

      document.body.removeChild(targetButton);
    });

    it('should remove focus indicator when targetElement is set', async () => {
      const targetButton = document.createElement('button');
      targetButton.textContent = 'Target Button';
      document.body.appendChild(targetButton);

      const { el, focusIndicator } = await createFixture({});

      expect(focusIndicator.isConnected).to.be.true;

      el.targetElement = targetButton;
      await elementUpdated(el);

      expect(focusIndicator.isConnected).to.be.false;

      document.body.removeChild(targetButton);
    });

    it('should restore focus indicator when targetElement is cleared', async () => {
      const targetButton = document.createElement('button');
      targetButton.textContent = 'Target Button';
      document.body.appendChild(targetButton);

      const { el, focusIndicator } = await createFixture({});

      el.targetElement = targetButton;
      await elementUpdated(el);
      expect(focusIndicator.isConnected).to.be.false;

      el.targetElement = undefined;
      await elementUpdated(el);

      expect(focusIndicator.isConnected).to.be.true;

      document.body.removeChild(targetButton);
    });

    it('should sync disabled state from targetElement when set', async () => {
      const targetButton = document.createElement('button');
      targetButton.textContent = 'Target Button';
      targetButton.disabled = true;
      document.body.appendChild(targetButton);

      const { el } = await createFixture({});
      expect(el.disabled).to.be.false;

      el.targetElement = targetButton;
      await elementUpdated(el);

      expect(el.disabled).to.be.true;

      document.body.removeChild(targetButton);
    });

    it('should sync disabled state to targetElement when button area disabled changes', async () => {
      const targetButton = document.createElement('button');
      targetButton.textContent = 'Target Button';
      document.body.appendChild(targetButton);

      const { el } = await createFixture({});
      el.targetElement = targetButton;
      await elementUpdated(el);

      expect(targetButton.disabled).to.be.false;

      el.disabled = true;
      await elementUpdated(el);

      expect(targetButton.disabled).to.be.true;

      document.body.removeChild(targetButton);
    });

    it('should observe targetElement disabled attribute changes', async () => {
      const targetButton = document.createElement('button');
      targetButton.textContent = 'Target Button';
      document.body.appendChild(targetButton);

      const { el } = await createFixture({});
      el.targetElement = targetButton;
      await elementUpdated(el);

      expect(el.disabled).to.be.false;

      targetButton.setAttribute('disabled', '');
      await elementUpdated(el);

      expect(el.disabled).to.be.true;

      document.body.removeChild(targetButton);
    });

    it('should clear targetElement when target element is removed and disabled changes', async () => {
      const targetButton = document.createElement('button');
      targetButton.textContent = 'Target Button';
      document.body.appendChild(targetButton);

      const { el } = await createFixture({});
      el.targetElement = targetButton;
      await elementUpdated(el);

      expect(el.targetElement).to.equal(targetButton);

      // Remove the element from DOM
      document.body.removeChild(targetButton);

      // Trigger a disabled attribute change to invoke the observer callback
      targetButton.setAttribute('disabled', '');
      await elementUpdated(el);

      // The observer detects the element is disconnected and clears targetElement
      expect(el.targetElement).to.be.undefined;
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
      await elementUpdated(el);

      expect(el.targetElement).to.equal(targetButton1);

      el.target = 'target-button-2';
      await elementUpdated(el);

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
      expect(button.disabled).to.be.false;

      el.targetElement = targetButton;
      await elementUpdated(el);

      // Button area should sync with target element, not slotted button
      expect(el.disabled).to.be.true;
      expect(button.disabled).to.be.false;

      document.body.removeChild(targetButton);
    });

    it('should not sync disabled state from slotted button when targetElement is set', async () => {
      const targetButton = document.createElement('button');
      targetButton.textContent = 'Target Button';
      document.body.appendChild(targetButton);

      const { el, button } = await createFixture({});
      el.targetElement = targetButton;
      await elementUpdated(el);

      expect(el.disabled).to.be.false;

      // Change slotted button disabled state
      button.setAttribute('disabled', '');
      await elementUpdated(el);

      // Button area should not sync with slotted button when target element is set
      expect(el.disabled).to.be.false;

      document.body.removeChild(targetButton);
    });

    it('should restore focus indicator only when not disabled and targetElement is cleared', async () => {
      const targetButton = document.createElement('button');
      targetButton.textContent = 'Target Button';
      document.body.appendChild(targetButton);

      const { el, focusIndicator } = await createFixture({});
      el.targetElement = targetButton;
      await elementUpdated(el);

      expect(focusIndicator.isConnected).to.be.false;

      el.disabled = true;
      await elementUpdated(el);

      el.targetElement = undefined;
      await elementUpdated(el);

      // Focus indicator should not be restored because button area is disabled
      expect(focusIndicator.isConnected).to.be.false;

      document.body.removeChild(targetButton);
    });

    it('should handle targetElement without disabled property', async () => {
      const targetDiv = document.createElement('div');
      targetDiv.textContent = 'Target Div';
      document.body.appendChild(targetDiv);

      const { el, button } = await createFixture({});
      el.targetElement = targetDiv;
      await elementUpdated(el);

      // Should fall back to slotted button since targetDiv doesn't have disabled property
      el.disabled = true;
      await elementUpdated(el);

      expect(button.disabled).to.be.true;

      document.body.removeChild(targetDiv);
    });
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
