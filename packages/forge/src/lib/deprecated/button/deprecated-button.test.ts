import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { frame } from '../../core/utils/utils.js';
import type { IStateLayerComponent } from '../../state-layer/index.js';
import type { IFocusIndicatorComponent } from '../../focus-indicator/index.js';
import { DeprecatedButtonComponentDelegate } from './deprecated-button-component-delegate.js';
import { DeprecatedButtonComponent, type IDeprecatedButtonComponent } from './deprecated-button.js';
import { DEPRECATED_BUTTON_CONSTANTS } from './deprecated-button-constants.js';

import './deprecated-button.js';

describe('Deprecated Button', () => {
  it('should initialize', async () => {
    const screen = render(html`
      <forge-deprecated-button>
        <button type="button">Button</button>
      </forge-deprecated-button>
    `);
    const el = screen.container.querySelector('forge-deprecated-button') as IDeprecatedButtonComponent;

    const stateLayer = getStateLayer(el);
    const focusIndicator = getFocusIndicator(el);

    expect(el.shadowRoot).not.toBeNull();
    expect(stateLayer.disabled).toBe(false);
    expect(focusIndicator).toBeTruthy();
  });

  it('should be accessible', async () => {
    const screen = render(html`
      <forge-deprecated-button>
        <button type="button">Button</button>
      </forge-deprecated-button>
    `);
    const el = screen.container.querySelector('forge-deprecated-button') as IDeprecatedButtonComponent;

    await expect(el).toBeAccessible();
  });

  it('should be text (undefined) type by default', async () => {
    const screen = render(html`
      <forge-deprecated-button>
        <button type="button">Button</button>
      </forge-deprecated-button>
    `);
    const el = screen.container.querySelector('forge-deprecated-button') as IDeprecatedButtonComponent;

    expect(el.type).toBeUndefined();
  });

  it('should be raised type', async () => {
    const screen = render(html`
      <forge-deprecated-button type="raised">
        <button type="button">Button</button>
      </forge-deprecated-button>
    `);
    const el = screen.container.querySelector('forge-deprecated-button') as IDeprecatedButtonComponent;

    expect(el.type).toBe('raised');
    expect(el.getAttribute(DEPRECATED_BUTTON_CONSTANTS.attributes.TYPE)).toBe('raised');
    await expect(el).toBeAccessible();
  });

  it('should be outlined type', async () => {
    const screen = render(html`
      <forge-deprecated-button type="outlined">
        <button type="button">Button</button>
      </forge-deprecated-button>
    `);
    const el = screen.container.querySelector('forge-deprecated-button') as IDeprecatedButtonComponent;

    expect(el.type).toBe('outlined');
    expect(el.getAttribute(DEPRECATED_BUTTON_CONSTANTS.attributes.TYPE)).toBe('outlined');
    await expect(el).toBeAccessible();
  });

  it('should be flat type', async () => {
    const screen = render(html`
      <forge-deprecated-button type="unelevated">
        <button type="button">Button</button>
      </forge-deprecated-button>
    `);
    const el = screen.container.querySelector('forge-deprecated-button') as IDeprecatedButtonComponent;

    expect(el.type).toBe('unelevated');
    expect(el.getAttribute(DEPRECATED_BUTTON_CONSTANTS.attributes.TYPE)).toBe('unelevated');
    await expect(el).toBeAccessible();
  });

  it('should use anchor element', async () => {
    const screen = render(html`
      <forge-deprecated-button>
        <a href="javascript: void(0);">Anchor</a>
      </forge-deprecated-button>
    `);
    const el = screen.container.querySelector('forge-deprecated-button') as IDeprecatedButtonComponent;

    await expect(el).toBeAccessible();
  });

  it('should set full width', async () => {
    const screen = render(html`
      <forge-deprecated-button full-width>
        <button type="button">Button</button>
      </forge-deprecated-button>
    `);
    const el = screen.container.querySelector('forge-deprecated-button') as IDeprecatedButtonComponent;

    expect(el.fullWidth).toBe(true);
    expect(el.hasAttribute(DEPRECATED_BUTTON_CONSTANTS.attributes.FULL_WIDTH)).toBe(true);

    el.fullWidth = false;

    expect(el.fullWidth).toBe(false);
    expect(el.hasAttribute(DEPRECATED_BUTTON_CONSTANTS.attributes.FULL_WIDTH)).toBe(false);
  });

  it('should set disabled', async () => {
    const screen = render(html`
      <forge-deprecated-button disabled>
        <button type="button">Button</button>
      </forge-deprecated-button>
    `);
    const el = screen.container.querySelector('forge-deprecated-button') as IDeprecatedButtonComponent;

    expect(el.disabled).toBe(true);
    expect(el.hasAttribute(DEPRECATED_BUTTON_CONSTANTS.attributes.DISABLED)).toBe(true);

    el.disabled = false;

    expect(el.disabled).toBe(false);
    expect(el.hasAttribute(DEPRECATED_BUTTON_CONSTANTS.attributes.DISABLED)).toBe(false);
  });

  it('should wait to initialize until child button is available', async () => {
    const screen = render(html`<forge-deprecated-button></forge-deprecated-button>`);
    const el = screen.container.querySelector('forge-deprecated-button') as IDeprecatedButtonComponent;

    const stateLayer = getStateLayer(el);
    const focusIndicator = getFocusIndicator(el);

    expect(stateLayer.targetElement).toBeNull();
    expect(focusIndicator.targetElement).toBeUndefined();

    const button = document.createElement('button');
    el.appendChild(button);

    await frame();

    expect(stateLayer.targetElement).toBe(button);
    expect(focusIndicator.targetElement).toBe(button);
  });

  it('should wait to initialize until child anchor is available', async () => {
    const screen = render(html`<forge-deprecated-button></forge-deprecated-button>`);
    const el = screen.container.querySelector('forge-deprecated-button') as IDeprecatedButtonComponent;

    const stateLayer = getStateLayer(el);
    const focusIndicator = getFocusIndicator(el);

    expect(stateLayer.targetElement).toBeNull();
    expect(focusIndicator.targetElement).toBeUndefined();

    const anchor = document.createElement('a');
    el.appendChild(anchor);

    await frame();

    expect(stateLayer.targetElement).toBe(anchor);
    expect(focusIndicator.targetElement).toBe(anchor);
  });

  it('should dynamically swap button', async () => {
    const screen = render(html`
      <forge-deprecated-button>
        <button type="button">Button</button>
      </forge-deprecated-button>
    `);
    const el = screen.container.querySelector('forge-deprecated-button') as IDeprecatedButtonComponent;
    await frame();

    const stateLayer = getStateLayer(el);
    const focusIndicator = getFocusIndicator(el);
    const button = el.querySelector('button');

    expect(stateLayer.targetElement).toBe(button);
    expect(focusIndicator.targetElement).toBe(button);

    button?.remove();

    const anchor = document.createElement('a');
    el.appendChild(anchor);

    await frame();

    expect(stateLayer.targetElement).toBe(anchor);
    expect(focusIndicator.targetElement).toBe(anchor);
  });

  it('should detect disabled state from button when initialized', async () => {
    const screen = render(html`
      <forge-deprecated-button>
        <button type="button" disabled>Button</button>
      </forge-deprecated-button>
    `);
    const el = screen.container.querySelector('forge-deprecated-button') as IDeprecatedButtonComponent;

    expect(el.disabled).toBe(true);
    expect(el.hasAttribute(DEPRECATED_BUTTON_CONSTANTS.attributes.DISABLED)).toBe(true);
  });

  it('should sync disabled state from button', async () => {
    const screen = render(html`
      <forge-deprecated-button>
        <button type="button">Button</button>
      </forge-deprecated-button>
    `);
    const el = screen.container.querySelector('forge-deprecated-button') as IDeprecatedButtonComponent;

    const buttonEl = el.querySelector('button') as HTMLButtonElement;
    buttonEl.disabled = true;

    await frame();

    expect(el.disabled).toBe(true);
    expect(el.hasAttribute(DEPRECATED_BUTTON_CONSTANTS.attributes.DISABLED)).toBe(true);
  });

  it('should play state layer animation when pressing enter key', async () => {
    const screen = render(html`
      <forge-deprecated-button>
        <button type="button">Button</button>
      </forge-deprecated-button>
    `);
    const el = screen.container.querySelector('forge-deprecated-button') as IDeprecatedButtonComponent;

    const stateLayer = getStateLayer(el);
    const playAnimationSpy = vi.spyOn(stateLayer, 'playAnimation');

    el.focus();
    await userEvent.keyboard('{Enter}');

    expect(playAnimationSpy).toHaveBeenCalledOnce();
  });

  it('should play state layer animation when pressing space key', async () => {
    const screen = render(html`
      <forge-deprecated-button>
        <button type="button">Button</button>
      </forge-deprecated-button>
    `);
    const el = screen.container.querySelector('forge-deprecated-button') as IDeprecatedButtonComponent;

    const stateLayer = getStateLayer(el);
    const playAnimationSpy = vi.spyOn(stateLayer, 'playAnimation');

    el.focus();
    await userEvent.keyboard(' ');

    expect(playAnimationSpy).toHaveBeenCalledOnce();
  });

  it('should not initialize if invalid child is element slotted in', async () => {
    const screen = render(html`
      <forge-deprecated-button>
        <div>Button</div>
      </forge-deprecated-button>
    `);
    const el = screen.container.querySelector('forge-deprecated-button') as IDeprecatedButtonComponent;

    const stateLayer = getStateLayer(el);
    const focusIndicator = getFocusIndicator(el);

    expect(stateLayer.targetElement).toBeNull();
    expect(focusIndicator.targetElement).toBeUndefined();
  });

  describe('DeprecatedButtonComponentDelegate', () => {
    it('should create button via delegate', async () => {
      const delegate = new DeprecatedButtonComponentDelegate({ options: { text: 'Button' } });

      expect(delegate.element).toBeInstanceOf(DeprecatedButtonComponent);
      expect(delegate.element.innerText).toBe('Button');
    });

    it('should set type via delegate to button', async () => {
      const delegate = new DeprecatedButtonComponentDelegate({ options: { type: 'button' } });

      expect(delegate.buttonElement?.type).toBe('button');
    });

    it('should set type via delegate to submit', async () => {
      const delegate = new DeprecatedButtonComponentDelegate({ options: { type: 'submit' } });

      expect(delegate.buttonElement?.type).toBe('submit');
    });

    it('should call click listener via delegate', async () => {
      const delegate = new DeprecatedButtonComponentDelegate();
      document.body.appendChild(delegate.element);
      const clickSpy = vi.fn();

      delegate.onClick(clickSpy);
      await userEvent.click(delegate.buttonElement!);
      delegate.element.remove();

      expect(clickSpy).toHaveBeenCalledOnce();
    });

    it('should call focus listener via delegate', async () => {
      const delegate = new DeprecatedButtonComponentDelegate();
      document.body.appendChild(delegate.element);
      const focusSpy = vi.fn();

      delegate.onFocus(focusSpy);
      await userEvent.click(delegate.buttonElement!);
      delegate.element.remove();

      expect(focusSpy).toHaveBeenCalledOnce();
    });

    it('should call blur listener via delegate', async () => {
      const delegate = new DeprecatedButtonComponentDelegate();
      document.body.appendChild(delegate.element);
      const blurSpy = vi.fn();

      delegate.onBlur(blurSpy);
      delegate.buttonElement?.focus();
      await userEvent.click(document.body);
      delegate.element.remove();

      expect(blurSpy).toHaveBeenCalledOnce();
    });
  });

  it('should be accessible with aria-label', async () => {
    const screen = render(html`
      <forge-deprecated-button aria-label="Test label">
        <button type="button">Button</button>
      </forge-deprecated-button>
    `);
    const el = screen.container.querySelector('forge-deprecated-button') as IDeprecatedButtonComponent;
    await expect(el).toBeAccessible();
  });

  it('should be accessible with aria-labelledby', async () => {
    const screen = render(html`
      <div>
        <label id="test-label">Test label</label>
        <forge-deprecated-button>
          <button type="button" aria-labelledby="test-label">Button</button>
        </forge-deprecated-button>
      </div>
    `);
    const button = screen.container.querySelector('forge-deprecated-button') as IDeprecatedButtonComponent;
    await expect(button).toBeAccessible();
  });

  function getStateLayer(btn: IDeprecatedButtonComponent): IStateLayerComponent {
    return btn.shadowRoot?.querySelector('forge-state-layer') as IStateLayerComponent;
  }

  function getFocusIndicator(btn: IDeprecatedButtonComponent): IFocusIndicatorComponent {
    return btn.shadowRoot?.querySelector('forge-focus-indicator') as IFocusIndicatorComponent;
  }
});
