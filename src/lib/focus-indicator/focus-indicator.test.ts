import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import { getShadowElement } from '@tylertech/forge-core';
import { sendKeys, sendMouse } from '@web/test-runner-commands';
import type { IFocusIndicatorComponent } from './focus-indicator';
import { ifDefined } from 'lit/directives/if-defined.js';

import './focus-indicator';

describe('FocusIndicator', () => {
  it('should contain shadow root', async () => {
    const { focusIndicator } = await createFixture();
    expect(focusIndicator.shadowRoot).not.to.be.null;
  });

  it('should be active on keyboard focus', async () => {
    const { detachedButton, button, focusIndicator } = await createFixture();

    expect(button.matches(':focus')).to.be.false;

    await focusKeyboard(detachedButton);

    expect(button.matches(':focus-visible')).to.be.true;
    expect(focusIndicator.active).to.be.true;
    expect(focusIndicator.hasAttribute('active')).to.be.true;
    expect(focusIndicator.matches(':state(active)')).to.be.true;
  });

  it('should not be active on pointer focus', async () => {
    const { button, focusIndicator } = await createFixture();

    expect(button.matches(':focus')).to.be.false;

    await focusPointer(button);

    expect(button.matches(':focus-visible')).to.be.false;
    expect(button.matches(':focus')).to.be.true;
    expect(focusIndicator.active).to.be.false;
    expect(focusIndicator.hasAttribute('active')).to.be.false;
    expect(focusIndicator.matches(':state(active)')).to.be.false;
  });

  it('should be active on pointer focus when allowFocus is true', async () => {
    const { button, focusIndicator } = await createFixture({ allowFocus: true });

    expect(button.matches(':focus')).to.be.false;

    await focusPointer(button);

    expect(button.matches(':focus-visible')).to.be.false;
    expect(button.matches(':focus')).to.be.true;
    expect(focusIndicator.active).to.be.true;
    expect(focusIndicator.hasAttribute('active')).to.be.true;
    expect(focusIndicator.matches(':state(active)')).to.be.true;
  });

  it('should attach to specific target via id', async () => {
    const { button, detachedButton, focusIndicator } = await createFixture({ target: 'detached' });

    expect(focusIndicator.targetElement).to.equal(detachedButton);

    button.focus();
    await sendKeys({ down: 'Shift' });
    await sendKeys({ press: 'Tab' });
    await sendKeys({ up: 'Shift' });

    expect(detachedButton.matches(':focus-visible')).to.be.true;
    expect(focusIndicator.active).to.be.true;
  });

  it('should set target element manually', async () => {
    const { button, detachedButton, focusIndicator } = await createFixture();

    expect(focusIndicator.targetElement).to.equal(button);

    focusIndicator.targetElement = detachedButton;

    expect(focusIndicator.targetElement).to.equal(detachedButton);

    button.focus();
    await sendKeys({ down: 'Shift' });
    await sendKeys({ press: 'Tab' });
    await sendKeys({ up: 'Shift' });

    expect(detachedButton.matches(':focus-visible')).to.be.true;
    expect(focusIndicator.active).to.be.true;
  });

  it('should set inward', async () => {
    const { focusIndicator } = await createFixture({ inward: true });
    expect(focusIndicator.inward).to.be.true;
    expect(focusIndicator.hasAttribute('inward')).to.be.true;
  });

  it('should animate inward when active', async () => {
    const { button, detachedButton, focusIndicator } = await createFixture({ inward: true });

    await focusKeyboard(detachedButton);

    const style = getComputedStyle(focusIndicator);

    expect(style.animationName).to.equal('forge-focus-indicator-inward-grow, forge-focus-indicator-inward-shrink');
    expect(button.matches(':focus-visible')).to.be.true;
    expect(focusIndicator.active).to.be.true;
  });

  it('should set circular', async () => {
    const { focusIndicator } = await createFixture({ circular: true });

    const style = getComputedStyle(focusIndicator);

    expect(style.getPropertyValue('--_focus-indicator-shape')).to.equal('50%');
    expect(focusIndicator.circular).to.be.true;
    expect(focusIndicator.hasAttribute('circular')).to.be.true;
  });

  it('should reattach listeners when moved in DOM', async () => {
    const { button, detachedButton, focusIndicator } = await createFixture();

    expect(focusIndicator.targetElement).to.equal(button);

    detachedButton.appendChild(focusIndicator);

    expect(focusIndicator.targetElement).to.equal(detachedButton);

    button.focus();
    await sendKeys({ down: 'Shift' });
    await sendKeys({ press: 'Tab' });
    await sendKeys({ up: 'Shift' });

    expect(button.matches(':focus')).to.be.false;
    expect(detachedButton.matches(':focus-visible')).to.be.true;
    expect(focusIndicator.active).to.be.true;
  });

  it('should release reference to target element when disconnected', async () => {
    const { button, focusIndicator } = await createFixture();

    expect(focusIndicator.targetElement).to.equal(button);

    button.remove();

    expect(focusIndicator.targetElement).to.be.undefined;
  });

  it('should locate target element when target is :host', async () => {
    class TestFocusIndicator extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot!.innerHTML = '<forge-focus-indicator target=":host"></forge-focus-indicator>';
      }
    }
    window.customElements.define('test-focus-indicator-host', TestFocusIndicator);

    const el = await fixture<TestFocusIndicator>(html`<test-focus-indicator-host></test-focus-indicator-host>`);
    const focusIndicator = getShadowElement(el, 'forge-focus-indicator') as IFocusIndicatorComponent;

    expect(focusIndicator.targetElement).to.equal(el);
  });

  it('should properly handle event listener attach/detach cycles', async () => {
    const { detachedButton, button, focusIndicator } = await createFixture();

    // Verify initial focus works
    await focusKeyboard(detachedButton);
    expect(focusIndicator.active).to.be.true;

    // Blur to deactivate
    button.blur();
    expect(focusIndicator.active).to.be.false;

    // Change target element to trigger detach/attach cycle
    const newButton = document.createElement('button');
    newButton.textContent = 'New Button';
    document.body.appendChild(newButton);

    focusIndicator.targetElement = newButton;

    // Verify targetElement was set correctly
    expect(focusIndicator.targetElement).to.equal(newButton);

    // Use keyboard focus by tabbing to the new button
    detachedButton.focus(); // Start from a known element
    await sendKeys({ press: 'Tab' }); // Tab to button (first tab target)
    await sendKeys({ press: 'Tab' }); // Tab to newButton (second tab target)

    expect(focusIndicator.active).to.be.true;

    // Cleanup
    newButton.remove();
  });
});

interface FocusIndicatorFixtureConfig {
  target?: string;
  inward?: boolean;
  circular?: boolean;
  allowFocus?: boolean;
}

interface FocusIndicatorFixtureResult {
  detachedButton: HTMLButtonElement;
  button: HTMLButtonElement;
  focusIndicator: IFocusIndicatorComponent;
}

async function createFixture({ target, inward, circular, allowFocus }: FocusIndicatorFixtureConfig = {}): Promise<FocusIndicatorFixtureResult> {
  const result = await fixture<HTMLElement>(html`
    <div>
      <button id="detached" type="button">Simple button</button>
      <button id="attached" type="button">
        Button
        <forge-focus-indicator target=${ifDefined(target)} ?inward=${inward} ?circular=${circular} ?allow-focus=${allowFocus}> </forge-focus-indicator>
      </button>
    </div>
  `);
  const detachedButton = result.querySelector('button#detached') as HTMLButtonElement;
  const button = result.querySelector('button#attached') as HTMLButtonElement;
  const focusIndicator = result.querySelector('forge-focus-indicator') as IFocusIndicatorComponent;
  return { detachedButton, button, focusIndicator };
}

async function focusKeyboard(startFocusEl: HTMLElement): Promise<void> {
  startFocusEl.focus();
  await sendKeys({ press: 'Tab' });
}

async function focusPointer(targetEl: HTMLElement): Promise<void> {
  const { x, y, height, width } = targetEl.getBoundingClientRect();
  const mouseX = Math.round(x + width / 2);
  const mouseY = Math.round(y + height / 2);
  await sendMouse({ type: 'click', position: [mouseX, mouseY], button: 'left' });
  targetEl.focus();
}
