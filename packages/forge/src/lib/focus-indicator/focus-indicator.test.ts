import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { getShadowElement } from '@tylertech/forge-core';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { IFocusIndicatorComponent } from './focus-indicator.js';

import './focus-indicator.js';

describe('FocusIndicator', () => {
  it('should contain shadow root', async () => {
    const { focusIndicator } = await createFixture();
    expect(focusIndicator.shadowRoot).not.toBeNull();
  });

  it('should be active on keyboard focus', async () => {
    const { detachedButton, button, focusIndicator } = await createFixture();

    expect(button.matches(':focus')).toBe(false);

    await focusKeyboard(detachedButton);

    expect(button.matches(':focus-visible')).toBe(true);
    expect(focusIndicator.active).toBe(true);
    expect(focusIndicator.hasAttribute('active')).toBe(true);
    expect(focusIndicator.matches(':state(active)')).toBe(true);
  });

  it('should not be active on pointer focus', async () => {
    const { button, focusIndicator } = await createFixture();

    expect(button.matches(':focus')).toBe(false);

    await focusPointer(button);

    expect(button.matches(':focus-visible')).toBe(false);
    expect(button.matches(':focus')).toBe(true);
    expect(focusIndicator.active).toBe(false);
    expect(focusIndicator.hasAttribute('active')).toBe(false);
    expect(focusIndicator.matches(':state(active)')).toBe(false);
  });

  it('should be active on pointer focus when allowFocus is true', async () => {
    const { button, focusIndicator } = await createFixture({ allowFocus: true });

    expect(button.matches(':focus')).toBe(false);

    await focusPointer(button);

    expect(button.matches(':focus-visible')).toBe(false);
    expect(button.matches(':focus')).toBe(true);
    expect(focusIndicator.active).toBe(true);
    expect(focusIndicator.hasAttribute('active')).toBe(true);
    expect(focusIndicator.matches(':state(active)')).toBe(true);
  });

  it('should attach to specific target via id', async () => {
    const { button, detachedButton, focusIndicator } = await createFixture({ target: 'detached' });

    expect(focusIndicator.targetElement).toBe(detachedButton);

    button.focus();
    await userEvent.keyboard('{Shift>}{Tab}{/Shift}');

    expect(detachedButton.matches(':focus-visible')).toBe(true);
    expect(focusIndicator.active).toBe(true);
  });

  it('should set target element manually', async () => {
    const { button, detachedButton, focusIndicator } = await createFixture();

    expect(focusIndicator.targetElement).toBe(button);

    focusIndicator.targetElement = detachedButton;

    expect(focusIndicator.targetElement).toBe(detachedButton);

    button.focus();
    await userEvent.keyboard('{Shift>}{Tab}{/Shift}');

    expect(detachedButton.matches(':focus-visible')).toBe(true);
    expect(focusIndicator.active).toBe(true);
  });

  it('should set inward', async () => {
    const { focusIndicator } = await createFixture({ inward: true });
    expect(focusIndicator.inward).toBe(true);
    expect(focusIndicator.hasAttribute('inward')).toBe(true);
  });

  it('should animate inward when active', async () => {
    const { button, detachedButton, focusIndicator } = await createFixture({ inward: true });

    await focusKeyboard(detachedButton);

    const style = getComputedStyle(focusIndicator);

    expect(style.animationName).toBe('forge-focus-indicator-inward-grow, forge-focus-indicator-inward-shrink');
    expect(button.matches(':focus-visible')).toBe(true);
    expect(focusIndicator.active).toBe(true);
  });

  it('should set circular', async () => {
    const { focusIndicator } = await createFixture({ circular: true });

    const style = getComputedStyle(focusIndicator);

    expect(style.getPropertyValue('--_focus-indicator-shape')).toBe('50%');
    expect(focusIndicator.circular).toBe(true);
    expect(focusIndicator.hasAttribute('circular')).toBe(true);
  });

  it('should reattach listeners when moved in DOM', async () => {
    const { button, detachedButton, focusIndicator } = await createFixture();

    expect(focusIndicator.targetElement).toBe(button);

    detachedButton.appendChild(focusIndicator);

    expect(focusIndicator.targetElement).toBe(detachedButton);

    button.focus();
    await userEvent.keyboard('{Shift>}{Tab}{/Shift}');

    expect(button.matches(':focus')).toBe(false);
    expect(detachedButton.matches(':focus-visible')).toBe(true);
    expect(focusIndicator.active).toBe(true);
  });

  it('should release reference to target element when disconnected', async () => {
    const { button, focusIndicator } = await createFixture();

    expect(focusIndicator.targetElement).toBe(button);

    button.remove();

    expect(focusIndicator.targetElement).toBeUndefined();
  });

  it('should locate target element when target is :host', async () => {
    class TestFocusIndicator extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot!.innerHTML = '<forge-focus-indicator target=":host"></forge-focus-indicator>';
      }
    }
    if (!customElements.get('test-focus-indicator-host')) {
      customElements.define('test-focus-indicator-host', TestFocusIndicator);
    }

    const screen = render(html`<test-focus-indicator-host></test-focus-indicator-host>`);
    const el = screen.container.querySelector('test-focus-indicator-host') as TestFocusIndicator;
    const focusIndicator = getShadowElement(el, 'forge-focus-indicator') as IFocusIndicatorComponent;

    expect(focusIndicator.targetElement).toBe(el);
  });

  it('should properly handle event listener attach/detach cycles', async () => {
    const { detachedButton, button, focusIndicator } = await createFixture();

    await focusKeyboard(detachedButton);
    expect(focusIndicator.active).toBe(true);

    button.blur();
    expect(focusIndicator.active).toBe(false);

    const newButton = document.createElement('button');
    newButton.textContent = 'New Button';
    document.body.appendChild(newButton);

    focusIndicator.targetElement = newButton;

    expect(focusIndicator.targetElement).toBe(newButton);

    detachedButton.focus();
    await userEvent.keyboard('{Tab}');
    await userEvent.keyboard('{Tab}');

    expect(focusIndicator.active).toBe(true);

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
  const screen = render(html`
    <div>
      <button id="detached" type="button">Simple button</button>
      <button id="attached" type="button">
        Button
        <forge-focus-indicator target=${ifDefined(target)} ?inward=${inward} ?circular=${circular} ?allow-focus=${allowFocus}> </forge-focus-indicator>
      </button>
    </div>
  `);
  const detachedButton = screen.container.querySelector('button#detached') as HTMLButtonElement;
  const button = screen.container.querySelector('button#attached') as HTMLButtonElement;
  const focusIndicator = screen.container.querySelector('forge-focus-indicator') as IFocusIndicatorComponent;
  return { detachedButton, button, focusIndicator };
}

async function focusKeyboard(startFocusEl: HTMLElement): Promise<void> {
  startFocusEl.focus();
  await userEvent.keyboard('{Tab}');
}

async function focusPointer(targetEl: HTMLElement): Promise<void> {
  await userEvent.click(targetEl);
}
