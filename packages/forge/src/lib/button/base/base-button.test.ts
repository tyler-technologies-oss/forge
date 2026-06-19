import { tylIconArrowDropDown } from '@tylertech/tyler-icons';
import { html, TemplateResult, unsafeCSS } from 'lit';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { userEvent } from 'vitest/browser';
import { frame } from '../../core/utils/utils.js';
import type { IFocusIndicatorComponent } from '../../focus-indicator/index.js';
import type { IIconComponent } from '../../icon/index.js';
import type { ILabelComponent } from '../../label/label.js';
import type { IStateLayerComponent } from '../../state-layer/index.js';
import { BASE_BUTTON_CONSTANTS } from '../base/base-button-constants.js';
import type { ButtonComponent } from '../button.js';
import { BaseButton } from './base-button.js';

import '../../focus-indicator/focus-indicator.js';
import '../../label/label.js';
import '../../state-layer/state-layer.js';

declare global {
  interface Window {
    forgeAnchorTest?: () => void;
  }
}

const styles = `
  :host {
    position: relative;
    display: inline-flex;
  }

  a {
    position: absolute;
    inset: 0;
  }
`;

class TestBaseButton extends BaseButton {
  public static style = unsafeCSS(styles);

  public render(): TemplateResult {
    return html`
      <div id="root" class="forge-test-base-button" part="root">
        <slot name="start"></slot>
        ${this._renderDefaultSlot()} ${this._renderEndSlotWithOptionalPopoverIcon()} ${this._renderInteractionLayer()}
      </div>
    `;
  }
}

window.customElements.define('forge-test-base-button', TestBaseButton);

describe('BaseButton', () => {
  it('should allow for alternate role', async () => {
    const screen = render(html`<forge-test-base-button role="presentation">Button</forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    await el.updateComplete;

    expect(el.role).toBe('presentation');
  });

  it('should allow for alternate role dynamically', async () => {
    const screen = render(html`<forge-test-base-button>Button</forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    await el.updateComplete;
    el.role = 'presentation';
    expect(el.role).toBe('presentation');
  });

  it('should show focus indicator when focused', async () => {
    const screen = render(html`<forge-test-base-button>Button</forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    await el.updateComplete;

    const focusIndicator = getFocusIndicator(el);
    expect(focusIndicator.active).toBe(false);

    el.focus();

    expect(el.matches(':focus-visible')).toBe(true);
    expect(focusIndicator.active).toBe(true);
  });

  it('should not show focus indicator programmatically', async () => {
    const screen = render(html`<forge-test-base-button>Button</forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    await el.updateComplete;

    const focusIndicator = getFocusIndicator(el);
    expect(focusIndicator.active).toBe(false);

    el.focus();

    expect(el.matches(':focus-visible')).toBe(true);
    expect(focusIndicator.active).toBe(true);
  });

  it('should show focus indicator programmatically when focusVisible is true', async () => {
    const screen = render(html`<forge-test-base-button>Button</forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    await el.updateComplete;

    const focusIndicator = getFocusIndicator(el);
    expect(focusIndicator.active).toBe(false);

    el.focus({ focusVisible: true });

    expect(el.matches(':focus-visible')).toBe(true);
    expect(focusIndicator.active).toBe(true);
  });

  it('should not set popover icon by default', async () => {
    const screen = render(html`<forge-test-base-button>Button</forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    await el.updateComplete;
    const popoverIcon = getPopoverIcon(el);

    expect(el.popoverIcon).toBe(false);
    expect(el.hasAttribute('popover-icon')).toBe(false);
    expect(popoverIcon).toBeFalsy();
  });

  it('should set default popover icon', async () => {
    const screen = render(html`<forge-test-base-button popover-icon>Button</forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    await el.updateComplete;

    const popoverIcon = getPopoverIcon(el);
    expect(el.popoverIcon).toBe(true);
    expect(el.hasAttribute('popover-icon')).toBe(true);
    expect(popoverIcon).toBeTruthy();
    expect(popoverIcon.name).toBe(tylIconArrowDropDown.name);

    await expect(el).toBeAccessible();
  });

  it('should set popover icon dynamically', async () => {
    const screen = render(html`<forge-test-base-button>Button</forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;

    el.popoverIcon = true;
    await el.updateComplete;

    const popoverIcon = getPopoverIcon(el);
    expect(el.popoverIcon).toBe(true);
    expect(el.hasAttribute('popover-icon')).toBe(true);
    expect(popoverIcon).toBeTruthy();
    expect(popoverIcon.name).toBe(tylIconArrowDropDown.name);
  });

  it('should remove popover icon dynamically', async () => {
    const screen = render(html`<forge-test-base-button popover-icon>Button</forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    await el.updateComplete;

    let popoverIcon = getPopoverIcon(el);
    expect(popoverIcon).toBeTruthy();

    el.popoverIcon = false;
    await el.updateComplete;

    popoverIcon = getPopoverIcon(el);
    expect(el.popoverIcon).toBe(false);
    expect(el.hasAttribute('popover-icon')).toBe(false);
    expect(popoverIcon).toBeFalsy();
  });

  it('should set dense', async () => {
    const screen = render(html`<forge-test-base-button dense>Button</forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    await el.updateComplete;

    expect(el.dense).toBe(true);
    expect(el.hasAttribute('dense')).toBe(true);

    await expect(el).toBeAccessible();
  });

  it('should set type to button by default', async () => {
    const screen = render(html`<forge-test-base-button>Button</forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    await el.updateComplete;

    expect(el.type).toBe('button');

    await expect(el).toBeAccessible();
  });

  it('should set type to submit', async () => {
    const screen = render(html`<forge-test-base-button type="submit">Button</forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    await el.updateComplete;

    expect(el.type).toBe('submit');
    expect(el.getAttribute('type')).toBe('submit');

    await expect(el).toBeAccessible();
  });

  it('should set type to reset', async () => {
    const screen = render(html`<forge-test-base-button type="reset">Button</forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    await el.updateComplete;

    expect(el.type).toBe('reset');
    expect(el.getAttribute('type')).toBe('reset');

    await expect(el).toBeAccessible();
  });

  it('should be disabled', async () => {
    const screen = render(html`<forge-test-base-button disabled>Button</forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    await el.updateComplete;

    expect(el.disabled).toBe(true);
    expect(el.hasAttribute('disabled')).toBe(true);
    expect(el.getAttribute('aria-disabled')).toBe('true');

    await expect(el).toBeAccessible();
  });

  it('should set disabled dynamically', async () => {
    const screen = render(html`<forge-test-base-button>Button</forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;

    el.disabled = true;
    await el.updateComplete;

    let stateLayer = getStateLayer(el);
    let focusIndicator = getFocusIndicator(el);

    expect(el.disabled).toBe(true);
    expect(el.hasAttribute('disabled')).toBe(true);
    expect(el.getAttribute('aria-disabled')).toBe('true');
    expect(el.hasAttribute('tabindex')).toBe(false);
    expect(stateLayer).toBeFalsy();
    expect(focusIndicator).toBeFalsy();

    await expect(el).toBeAccessible();

    el.disabled = false;
    await frame();

    stateLayer = getStateLayer(el);
    focusIndicator = getFocusIndicator(el);

    expect(el.disabled).toBe(false);
    expect(el.hasAttribute('disabled')).toBe(false);
    expect(el.hasAttribute('aria-disabled')).toBe(false);
    expect(el.getAttribute('tabindex')).toBe('0');
    expect(stateLayer).toBeTruthy();
    expect(focusIndicator).toBeTruthy();
  });

  it('should not disable when <a> is specified', async () => {
    const screen = render(html`<forge-test-base-button disabled><a href="javascript: void(0);">Button</a></forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    await frame();

    const stateLayer = getStateLayer(el);
    const focusIndicator = getFocusIndicator(el);

    expect(el.disabled).toBe(false);
    expect(el.hasAttribute('disabled')).toBe(false);
    expect(el.hasAttribute('aria-disabled')).toBe(false);
    expect(stateLayer).toBeTruthy();
    expect(focusIndicator).toBeTruthy();

    await expect(el).toBeAccessible();
  });

  it('should not disable dynamically when href is specified', async () => {
    const screen = render(html`<forge-test-base-button><a href="javascript: void(0);">Button</a></forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    await el.updateComplete;

    el.disabled = true;
    await el.updateComplete;

    const stateLayer = getStateLayer(el);
    const focusIndicator = getFocusIndicator(el);

    expect(el.disabled).toBe(false);
    expect(el.hasAttribute('disabled')).toBe(false);
    expect(el.hasAttribute('aria-disabled')).toBe(false);
    expect(stateLayer).toBeTruthy();
    expect(focusIndicator).toBeTruthy();

    await expect(el).toBeAccessible();
  });

  it('should focus element when focus() is called', async () => {
    const screen = render(html`<forge-test-base-button>Button</forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    await el.updateComplete;

    el.focus();

    expect(document.activeElement).toBe(el);
  });

  it('should focus element when clicked', async () => {
    const screen = render(html`<forge-test-base-button>Button</forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;

    await userEvent.click(el);

    expect(document.activeElement).toBe(el);
  });

  it('should not focus element if clicked when disabled', async () => {
    const screen = render(html`<forge-test-base-button disabled>Button</forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;

    await userEvent.click(el, { force: true });

    expect(document.activeElement).not.toBe(el);
  });

  it('should dispatch click event when click() is called', async () => {
    const screen = render(html`<forge-test-base-button>Button</forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    const clickSpy = vi.fn();
    el.addEventListener('click', clickSpy);

    el.click();

    expect(clickSpy).toHaveBeenCalledOnce();
  });

  it('should dispatch click event when clicked', async () => {
    const screen = render(html`<forge-test-base-button>Button</forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    const clickSpy = vi.fn();
    el.addEventListener('click', clickSpy);

    await userEvent.click(el);

    expect(clickSpy).toHaveBeenCalledOnce();
  });

  it('should dispatch click event when enter key is pressed', async () => {
    const screen = render(html`<forge-test-base-button>Button</forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    await el.updateComplete;

    const clickSpy = vi.fn();
    el.addEventListener('click', clickSpy);

    el.focus();
    await userEvent.keyboard('{Enter}');
    await el.updateComplete;

    expect(clickSpy).toHaveBeenCalledOnce();
  });

  it('should dispatch click event when space key is pressed', async () => {
    const screen = render(html`<forge-test-base-button>Button</forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    await el.updateComplete;

    const clickSpy = vi.fn();
    el.addEventListener('click', clickSpy);

    el.focus();
    await userEvent.keyboard(' ');
    await el.updateComplete;

    expect(clickSpy).toHaveBeenCalledOnce();
  });

  it('should not dispatch click event is click event is canceled', async () => {
    const screen = render(html`<forge-test-base-button>Button</forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    const clickSpy = vi.fn();
    el.addEventListener('click', evt => evt.preventDefault());

    el.focus();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');
    await el.updateComplete;

    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('should not dispatch click event is keydown event is canceled', async () => {
    const screen = render(html`<forge-test-base-button>Button</forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    const clickSpy = vi.fn();
    el.addEventListener('keydown', evt => evt.preventDefault());

    el.focus();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');
    await el.updateComplete;

    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('should not dispatch click event if click() is called when disabled', async () => {
    const screen = render(html`<forge-test-base-button disabled>Button</forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    const clickSpy = vi.fn();
    el.addEventListener('click', clickSpy);

    el.click();

    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('should not dispatch click event if clicked when disabled', async () => {
    const screen = render(html`<forge-test-base-button disabled>Button</forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    const clickSpy = vi.fn();
    el.addEventListener('click', clickSpy);

    await userEvent.click(el, { force: true });

    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('should not dispatch click event if enter key is pressed when disabled', async () => {
    const screen = render(html`<forge-test-base-button disabled>Button</forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    const clickSpy = vi.fn();
    el.addEventListener('click', clickSpy);

    el.focus();
    await userEvent.keyboard('{Enter}');
    await el.updateComplete;

    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('should not dispatch click event if space key is pressed when disabled', async () => {
    const screen = render(html`<forge-test-base-button disabled>Button</forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    const clickSpy = vi.fn();
    el.addEventListener('click', clickSpy);

    el.focus();
    await userEvent.keyboard(' ');
    await el.updateComplete;

    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('should detect when <a> is slotted', async () => {
    const screen = render(html`<forge-test-base-button><a href="javascript: console.log('test');">Test</a></forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    await el.updateComplete;

    const rootEl = getRootEl(el);
    expect(rootEl.classList.contains(BASE_BUTTON_CONSTANTS.classes.WITH_ANCHOR)).toBe(true);
    expect(el.tabIndex).toBe(-1);
    expect(el.hasAttribute('role')).toBe(false);

    await expect(el).toBeAccessible();
  });

  it('should detect when <a> is slotted dynamically', async () => {
    const screen = render(html`<forge-test-base-button>Button</forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;

    const anchor = document.createElement('a');
    anchor.href = 'javascript: console.log("test");';
    anchor.textContent = 'Test';
    el.appendChild(anchor);
    await el.updateComplete;

    const rootEl = getRootEl(el);
    expect(rootEl.classList.contains(BASE_BUTTON_CONSTANTS.classes.WITH_ANCHOR)).toBe(true);
    expect(el.tabIndex).toBe(-1);
    expect(el.hasAttribute('role')).toBe(false);

    await expect(el).toBeAccessible();
  });

  it('should detect when <a> is removed dynamically', async () => {
    const screen = render(html`<forge-test-base-button><a href="javascript: console.log('test');">Test</a></forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    await el.updateComplete;

    const anchor = el.querySelector('a') as HTMLAnchorElement;
    const rootEl = getRootEl(el);

    expect(rootEl.classList.contains(BASE_BUTTON_CONSTANTS.classes.WITH_ANCHOR)).toBe(true);
    expect(el.tabIndex).toBe(-1);
    expect(el.hasAttribute('role')).toBe(false);

    el.removeChild(anchor);
    el.textContent = 'Button';
    await el.updateComplete;

    expect(rootEl.classList.contains(BASE_BUTTON_CONSTANTS.classes.WITH_ANCHOR)).toBe(false);
    expect(el.tabIndex).toBe(0);
    expect(el.getAttribute('role')).toBe('button');

    await expect(el).toBeAccessible();
  });

  it('should click <a> tag when click() is called', async () => {
    window.forgeAnchorTest = () => {};
    const href = `javascript: forgeAnchorTest()`;
    const screen = render(html`<forge-test-base-button><a href="${href}">Test</a></forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    const clickSpy = vi.fn();
    el.addEventListener('click', clickSpy);

    el.click();
    await el.updateComplete;
    delete window.forgeAnchorTest;

    expect(clickSpy).toHaveBeenCalledOnce();
  });

  it('should click <a> tag via mouse', async () => {
    window.forgeAnchorTest = () => {};
    const href = `javascript: forgeAnchorTest()`;
    const screen = render(html`<forge-test-base-button><a href="${href}">Test</a></forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    await el.updateComplete;

    const testSpy = vi.spyOn(window as any, 'forgeAnchorTest');
    const clickSpy = vi.fn();
    el.addEventListener('click', clickSpy);

    const anchorEl = el.querySelector('a') as HTMLAnchorElement;
    await userEvent.click(anchorEl);
    delete window.forgeAnchorTest;

    expect(clickSpy).toHaveBeenCalledOnce();
    expect(testSpy).toHaveBeenCalledOnce();
  });

  it('should not click <a> tag when click event is canceled', async () => {
    window.forgeAnchorTest = () => {};
    const href = `javascript: forgeAnchorTest()`;
    const screen = render(html`<forge-test-base-button><a href="${href}">Test</a></forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    const testSpy = vi.spyOn(window as any, 'forgeAnchorTest');
    el.addEventListener('click', evt => evt.preventDefault());

    el.click();
    await el.updateComplete;
    delete window.forgeAnchorTest;

    expect(testSpy).not.toHaveBeenCalled();
  });

  it('should click <a> tag via keyboard', async () => {
    window.forgeAnchorTest = () => {};
    const href = `javascript: forgeAnchorTest()`;
    const screen = render(html`<forge-test-base-button><a href="${href}">Test</a></forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    await el.updateComplete;

    const testSpy = vi.spyOn(window as any, 'forgeAnchorTest');
    const clickSpy = vi.fn();
    el.addEventListener('click', clickSpy);

    const anchorEl = el.querySelector('a') as HTMLAnchorElement;
    anchorEl.focus();
    await userEvent.keyboard('{Enter}');
    await el.updateComplete;
    delete window.forgeAnchorTest;

    expect(clickSpy).toHaveBeenCalledOnce();
    expect(testSpy).toHaveBeenCalledOnce();
  });

  it('should not click <a> tag when enter key is pressed and event is canceled', async () => {
    window.forgeAnchorTest = () => {};
    const href = `javascript: forgeAnchorTest()`;
    const screen = render(html`<forge-test-base-button><a href="${href}">Test</a></forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    const testSpy = vi.spyOn(window as any, 'forgeAnchorTest');
    el.addEventListener('click', evt => evt.preventDefault());

    const anchorEl = el.querySelector('a') as HTMLAnchorElement;
    anchorEl.focus();
    await userEvent.keyboard('{Enter}');
    await el.updateComplete;
    delete window.forgeAnchorTest;

    expect(testSpy).not.toHaveBeenCalled();
  });

  it('should not disable <a>', async () => {
    const screen = render(html`<forge-test-base-button disabled><a href="javascript: void(0);">Test</a></forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    await el.updateComplete;

    const clickSpy = vi.fn();
    el.addEventListener('click', clickSpy);

    const anchorEl = el.querySelector('a') as HTMLAnchorElement;
    anchorEl.click();
    await el.updateComplete;

    expect(clickSpy).toHaveBeenCalled();
    expect(el.disabled).toBe(false);
  });

  it('should enable button when anchor is set while disabled', async () => {
    const screen = render(html`<forge-test-base-button disabled>Button</forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;

    const anchor = document.createElement('a');
    anchor.href = 'javascript: void(0);';
    el.appendChild(anchor);

    await el.updateComplete;

    expect(el.disabled).toBe(false);
  });

  it('should show popover when click() method is called', async () => {
    const screen = render(html`
      <div>
        <forge-test-base-button popovertarget="test-popover">Button</forge-test-base-button>
        <div popover id="test-popover">Popover</div>
      </div>
    `);

    const buttonEl = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    const popoverEl = screen.container.querySelector('[popover]') as HTMLElement;
    await buttonEl.updateComplete;

    const toggleSpy = vi.spyOn(popoverEl as any, 'togglePopover');

    buttonEl.click();
    await buttonEl.updateComplete;

    expect(toggleSpy).toHaveBeenCalledOnce();
  });

  it('should show popover when clicked', async () => {
    const screen = render(html`
      <div>
        <forge-test-base-button popovertarget="test-popover">Button</forge-test-base-button>
        <div popover id="test-popover">Popover</div>
      </div>
    `);

    const buttonEl = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    const popoverEl = screen.container.querySelector('[popover]') as HTMLElement;
    const toggleSpy = vi.spyOn(popoverEl as any, 'togglePopover');

    await userEvent.click(buttonEl);

    expect(toggleSpy).toHaveBeenCalledOnce();
    toggleSpy.mockRestore();
  });

  it('should show popover when enter key is pressed', async () => {
    const screen = render(html`
      <div>
        <forge-test-base-button popovertarget="test-popover">Button</forge-test-base-button>
        <div popover id="test-popover">Popover</div>
      </div>
    `);

    const buttonEl = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    const popoverEl = screen.container.querySelector('[popover]') as HTMLElement;
    await buttonEl.updateComplete;

    const toggleSpy = vi.spyOn(popoverEl as any, 'togglePopover');

    buttonEl.focus();
    await userEvent.keyboard('{Enter}');
    await buttonEl.updateComplete;

    expect(toggleSpy).toHaveBeenCalledOnce();
  });

  it('should not show popover when clicked if child of <form>', async () => {
    const screen = render(html`
      <form id="test-form" action="javascript: void(0);">
        <forge-test-base-button popovertarget="test-popover">Button</forge-test-base-button>
        <div popover id="test-popover">Popover</div>
      </form>
    `);

    const buttonEl = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    const popoverEl = screen.container.querySelector('[popover]') as HTMLElement;
    const toggleSpy = vi.spyOn(popoverEl as any, 'togglePopover');

    await userEvent.click(buttonEl);

    expect(toggleSpy).not.toHaveBeenCalled();
  });

  it('should not show popover if cannot locate target element', async () => {
    const screen = render(html`
      <div>
        <forge-test-base-button popovertarget="wrong-popovertarget-id">Button</forge-test-base-button>
        <div popover id="test-popover">Popover</div>
      </div>
    `);

    const buttonEl = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    const toggleSpy = vi.spyOn(buttonEl as any, 'togglePopover');

    await userEvent.click(buttonEl);

    expect(toggleSpy).not.toHaveBeenCalled();
  });

  it('should hide popover when clicked', async () => {
    const screen = render(html`
      <div>
        <forge-test-base-button popovertarget="test-popover">Button</forge-test-base-button>
        <div popover id="test-popover">Popover</div>
      </div>
    `);

    const buttonEl = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    const popoverEl = screen.container.querySelector('[popover]') as HTMLElement;
    await buttonEl.updateComplete;

    expect(popoverEl.matches(':popover-open')).toBe(false);

    buttonEl.click();
    await buttonEl.updateComplete;
    expect(popoverEl.matches(':popover-open')).toBe(true);

    buttonEl.click();
    await buttonEl.updateComplete;
    expect(popoverEl.matches(':popover-open')).toBe(false);
  });

  it('should hide popover when enter key is pressed', async () => {
    const screen = render(html`
      <div>
        <forge-test-base-button popovertarget="test-popover">Button</forge-test-base-button>
        <div popover id="test-popover">Popover</div>
      </div>
    `);

    const buttonEl = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    const popoverEl = screen.container.querySelector('[popover]') as HTMLElement;
    await buttonEl.updateComplete;

    buttonEl.focus();
    await userEvent.keyboard('{Enter}');
    await buttonEl.updateComplete;
    expect(popoverEl.matches(':popover-open')).toBe(true);

    buttonEl.focus();
    await userEvent.keyboard('{Enter}');
    await buttonEl.updateComplete;
    expect(popoverEl.matches(':popover-open')).toBe(false);
  });

  it('should not show popover if popovertargetaction is set to hide', async () => {
    const screen = render(html`
      <div>
        <forge-test-base-button popovertarget="test-popover" popovertargetaction="hide">Button</forge-test-base-button>
        <div popover id="test-popover">Popover</div>
      </div>
    `);

    const buttonEl = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    const popoverEl = screen.container.querySelector('[popover]') as HTMLElement;
    const showSpy = vi.spyOn(popoverEl as any, 'showPopover');
    const toggleSpy = vi.spyOn(popoverEl as any, 'togglePopover');

    await userEvent.click(buttonEl);

    expect(showSpy).not.toHaveBeenCalled();
    expect(toggleSpy).not.toHaveBeenCalled();
  });

  it('should show popover if popovertargetaction is set to show', async () => {
    const screen = render(html`
      <div>
        <forge-test-base-button popovertarget="test-popover" popovertargetaction="show">Button</forge-test-base-button>
        <div popover id="test-popover">Popover</div>
      </div>
    `);

    const buttonEl = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    const popoverEl = screen.container.querySelector('[popover]') as HTMLElement;
    const showSpy = vi.spyOn(popoverEl as any, 'showPopover');
    const toggleSpy = vi.spyOn(popoverEl as any, 'togglePopover');

    await userEvent.click(buttonEl);

    expect(showSpy).toHaveBeenCalledOnce();
    expect(toggleSpy).not.toHaveBeenCalled();
  });

  it('should not hide popover if popovertargetaction is set to show', async () => {
    const screen = render(html`
      <div>
        <forge-test-base-button popovertarget="test-popover" popovertargetaction="show">Button</forge-test-base-button>
        <div popover id="test-popover">Popover</div>
      </div>
    `);

    const buttonEl = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    const popoverEl = screen.container.querySelector('[popover]') as HTMLElement;

    await userEvent.click(buttonEl);
    await frame();
    expect(popoverEl.matches(':popover-open')).toBe(true);

    await userEvent.click(buttonEl);
    await frame();
    expect(popoverEl.matches(':popover-open')).toBe(true);
  });

  it('should hide popover if popovertargetaction is set to hide', async () => {
    const screen = render(html`
      <div>
        <forge-test-base-button popovertarget="test-popover" popovertargetaction="hide">Button</forge-test-base-button>
        <div popover id="test-popover">Popover</div>
      </div>
    `);

    const buttonEl = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    const popoverEl = screen.container.querySelector('[popover]') as HTMLElement;

    await userEvent.click(buttonEl);
    await frame();
    expect(popoverEl.matches(':popover-open')).toBe(false);

    popoverEl.showPopover();
    await frame();
    expect(popoverEl.matches(':popover-open')).toBe(true);

    await userEvent.click(buttonEl);
    await buttonEl.updateComplete;

    expect(popoverEl.matches(':popover-open')).toBe(false);
  });

  it('should set form reference', async () => {
    const screen = render(html`
      <form id="test-form" action="javascript: void(0)">
        <forge-test-base-button>Button</forge-test-base-button>
      </form>
    `);

    const formEl = screen.container.querySelector('form') as HTMLFormElement;
    const buttonEl = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    expect(buttonEl.form).toBe(formEl);
  });

  it('should submit form when click() is called', async () => {
    const screen = render(html`
      <form id="test-form" action="javascript: void(0);">
        <forge-test-base-button type="submit">Button</forge-test-base-button>
      </form>
    `);

    const formEl = screen.container.querySelector('form') as HTMLFormElement;
    const buttonEl = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    const submitSpy = vi.fn();
    formEl.addEventListener('submit', submitSpy);
    await frame();

    await userEvent.click(buttonEl);

    expect(submitSpy).toHaveBeenCalledOnce();
  });

  it('should submit form when clicked by mouse', async () => {
    const screen = render(html`
      <form id="test-form" action="javascript: void(0)">
        <forge-test-base-button type="submit">Button</forge-test-base-button>
      </form>
    `);

    const formEl = screen.container.querySelector('form') as HTMLFormElement;
    const buttonEl = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    const submitSpy = vi.fn();
    formEl.addEventListener('submit', submitSpy);

    await userEvent.click(buttonEl);

    expect(submitSpy).toHaveBeenCalledOnce();
  });

  it('should submit form when enter key is pressed', async () => {
    const screen = render(html`
      <form id="test-form" action="javascript: void(0)">
        <forge-test-base-button type="submit">Button</forge-test-base-button>
      </form>
    `);

    const formEl = screen.container.querySelector('form') as HTMLFormElement;
    const buttonEl = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    const submitSpy = vi.fn();
    formEl.addEventListener('submit', submitSpy);
    await frame();

    buttonEl.focus();
    await userEvent.keyboard('{Enter}');
    await frame();

    expect(submitSpy).toHaveBeenCalledOnce();
  });

  it('should submit form when space key is pressed', async () => {
    const screen = render(html`
      <form id="test-form" action="javascript: void(0)">
        <forge-test-base-button type="submit">Button</forge-test-base-button>
      </form>
    `);

    const formEl = screen.container.querySelector('form') as HTMLFormElement;
    const buttonEl = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    await frame();

    const submitSpy = vi.fn();
    formEl.addEventListener('submit', submitSpy);

    buttonEl.focus();
    await userEvent.keyboard(' ');
    await frame();

    expect(submitSpy).toHaveBeenCalledOnce();
  });

  it('should reset form when click() is called', async () => {
    const screen = render(html`
      <form id="test-form" action="javascript: void(0)">
        <forge-test-base-button type="reset">Button</forge-test-base-button>
      </form>
    `);

    const formEl = screen.container.querySelector('form') as HTMLFormElement;
    const buttonEl = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    const resetSpy = vi.fn();
    formEl.addEventListener('reset', resetSpy);
    await frame();

    await userEvent.click(buttonEl);

    expect(resetSpy).toHaveBeenCalledOnce();
  });

  it('should not submit form when click event is canceled', async () => {
    const screen = render(html`
      <form id="test-form" action="javascript: void(0);">
        <forge-test-base-button type="submit">Button</forge-test-base-button>
      </form>
    `);

    const formEl = screen.container.querySelector('form') as HTMLFormElement;
    const buttonEl = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    const submitSpy = vi.fn(evt => evt.preventDefault());
    formEl.addEventListener('submit', submitSpy);

    const clickSpy = vi.fn(evt => evt.preventDefault());
    buttonEl.addEventListener('click', clickSpy);
    await buttonEl.updateComplete;

    await userEvent.click(buttonEl);
    await buttonEl.updateComplete;

    expect(clickSpy).toHaveBeenCalled();
    expect(submitSpy).not.toHaveBeenCalled();
  });

  it('should set correct form submit event submitter', async () => {
    const screen = render(html`
      <form id="test-form" action="javascript: void(0)">
        <forge-test-base-button type="submit" name="test">Button</forge-test-base-button>
      </form>
    `);

    const formEl = screen.container.querySelector('form') as HTMLFormElement;
    const buttonEl = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    const submitSpy = vi.fn(evt => {
      expect(evt.submitter).toBe(buttonEl);
    });
    formEl.addEventListener('submit', submitSpy);
    await buttonEl.updateComplete;

    await userEvent.click(buttonEl);

    expect(submitSpy).toHaveBeenCalledOnce();
  });

  it('should set name and value', async () => {
    const screen = render(html`<forge-test-base-button type="submit" name="test" value="test-value">Button</forge-test-base-button>`);
    const el = screen.container.querySelector('forge-test-base-button') as ButtonComponent;

    expect(el.name).toBe('test');
    expect(el.getAttribute('name')).toBe('test');
    expect(el.value).toBe('test-value');
    expect(el.getAttribute('value')).toBe('test-value');

    el.name = 'updated-name';
    el.value = 'updated-value';
    await el.updateComplete;

    expect(el.name).toBe('updated-name');
    expect(el.getAttribute('name')).toBe('updated-name');
    expect(el.value).toBe('updated-value');
    expect(el.getAttribute('value')).toBe('updated-value');
  });

  it('should submit form with name', async () => {
    const screen = render(html`
      <form id="test-form" action="javascript: void(0)">
        <forge-test-base-button type="submit" name="test" value="test-value">Button</forge-test-base-button>
      </form>
    `);

    const formEl = screen.container.querySelector('form') as HTMLFormElement;
    const buttonEl = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    const submitSpy = vi.fn(evt => {
      const { name } = evt.submitter as HTMLButtonElement;
      const formData = new FormData(formEl);

      expect(name).toBe('test');
      expect(buttonEl.value).toBe('test-value');
      expect(formData.get('test')).toBe(buttonEl.value);
    });
    formEl.addEventListener('submit', submitSpy);
    await buttonEl.updateComplete;

    await userEvent.click(buttonEl);

    expect(submitSpy).toHaveBeenCalledOnce();
  });

  it('should close native <dialog> clicked as submit type', async () => {
    const screen = render(html`
      <dialog>
        <form method="dialog">
          <forge-test-base-button type="submit">Button</forge-test-base-button>
        </form>
      </dialog>
    `);

    const dialogEl = screen.container.querySelector('dialog') as HTMLDialogElement;
    dialogEl.showModal();

    const buttonEl = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    await buttonEl.updateComplete;

    expect(dialogEl.open).toBe(true);

    await userEvent.click(buttonEl);

    expect(dialogEl.open).toBe(false);
  });

  it('should be label aware', async () => {
    const screen = render(html`
      <div>
        <forge-test-base-button id="test-btn">Button</forge-test-base-button>
        <forge-label for="test-btn">Test label</forge-label>
      </div>
    `);

    const button = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    await button.updateComplete;

    expect(button.getAttribute('aria-label')).toBe('Test label');

    await expect(screen.container).toBeAccessible();
  });

  it('should preserve aria-label when label aware', async () => {
    const screen = render(html`
      <div>
        <forge-test-base-button id="test-btn" aria-label="Button">Button</forge-test-base-button>
        <forge-label for="test-btn">Test label</forge-label>
      </div>
    `);

    const button = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    await button.updateComplete;

    expect(button.getAttribute('aria-label')).toBe('Button');

    await expect(screen.container).toBeAccessible();
  });

  it('should dispatch click event when clicking label element', async () => {
    const screen = render(html`
      <div>
        <forge-test-base-button id="test-btn">Button</forge-test-base-button>
        <forge-label for="test-btn">Test label</forge-label>
      </div>
    `);

    const button = screen.container.querySelector('forge-test-base-button') as ButtonComponent;
    const label = screen.container.querySelector('forge-label') as ILabelComponent;
    const clickSpy = vi.fn();

    button.addEventListener('click', clickSpy);
    label.click();

    expect(clickSpy).toHaveBeenCalledOnce();
  });

  function getRootEl(btn: ButtonComponent): HTMLElement {
    return btn.shadowRoot?.querySelector('#root') as HTMLElement;
  }

  function getStateLayer(btn: ButtonComponent): IStateLayerComponent {
    return btn.shadowRoot?.querySelector('forge-state-layer') as IStateLayerComponent;
  }

  function getFocusIndicator(btn: ButtonComponent): IFocusIndicatorComponent {
    return btn.shadowRoot?.querySelector('forge-focus-indicator') as IFocusIndicatorComponent;
  }

  function getPopoverIcon(btn: ButtonComponent): IIconComponent {
    return btn.shadowRoot?.querySelector('slot[name=end] > forge-icon') as IIconComponent;
  }
});
