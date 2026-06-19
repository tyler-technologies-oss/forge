import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { frame } from '../core/utils/utils.js';
import { BASE_BUTTON_CONSTANTS } from './base/base-button-constants.js';
import { BUTTON_CONSTANTS } from './button-constants.js';
import { ButtonComponent } from './button.js';
import type { IStateLayerComponent } from '../state-layer/index.js';
import type { IFocusIndicatorComponent } from '../focus-indicator/index.js';
import { ButtonComponentDelegate } from './button-component-delegate.js';

import './button.js';

describe('Button', () => {
  it('should initialize', async () => {
    const screen = render(html`<forge-button>Button</forge-button>`);
    const el = screen.container.querySelector('forge-button') as ButtonComponent;
    await el.updateComplete;

    const rootEl = getRootEl(el);
    const stateLayer = getStateLayer(el);
    const focusIndicator = getFocusIndicator(el);

    expect(el.shadowRoot).not.toBeNull();
    expect(el.type).toBe('button');
    expect(rootEl.getAttribute('part')).toBe('root');
    expect(rootEl.classList.contains(BASE_BUTTON_CONSTANTS.classes.ROOT)).toBe(true);
    expect(stateLayer.disabled).toBe(false);
    expect(focusIndicator).toBeTruthy();
  });

  it('should be accessible', async () => {
    const screen = render(html`<forge-button>Button</forge-button>`);
    const el = screen.container.querySelector('forge-button') as ButtonComponent;

    await expect(el).toBeAccessible();
  });

  it('should be text variant by default', async () => {
    const screen = render(html`<forge-button>Button</forge-button>`);
    const el = screen.container.querySelector('forge-button') as ButtonComponent;

    expect(el.variant).toBe('text');
  });

  it('should be raised variant', async () => {
    const screen = render(html`<forge-button variant="raised">Button</forge-button>`);
    const el = screen.container.querySelector('forge-button') as ButtonComponent;

    expect(el.variant).toBe('raised');

    await expect(el).toBeAccessible();
  });

  it('should be outlined variant', async () => {
    const screen = render(html`<forge-button variant="outlined">Button</forge-button>`);
    const el = screen.container.querySelector('forge-button') as ButtonComponent;

    expect(el.variant).toBe('outlined');

    await expect(el).toBeAccessible();
  });

  it('should be flat variant', async () => {
    const screen = render(html`<forge-button variant="flat">Button</forge-button>`);
    const el = screen.container.querySelector('forge-button') as ButtonComponent;

    expect(el.variant).toBe('flat');

    await expect(el).toBeAccessible();
  });

  it('should be link variant', async () => {
    const screen = render(html`<forge-button variant="link">Button</forge-button>`);
    const el = screen.container.querySelector('forge-button') as ButtonComponent;
    await el.updateComplete;
    await frame();

    const stateLayer = getStateLayer(el);

    expect(el.variant).toBe('link');
    expect(stateLayer.disabled).toBe(true);

    await expect(el).toBeAccessible();
  });

  it('should enable state layer when switching from link variant dynamically', async () => {
    const screen = render(html`<forge-button variant="link">Button</forge-button>`);
    const el = screen.container.querySelector('forge-button') as ButtonComponent;
    await el.updateComplete;
    await frame();

    const stateLayer = getStateLayer(el);
    expect(stateLayer.disabled).toBe(true);

    el.variant = 'raised';
    await el.updateComplete;

    expect(stateLayer.disabled).toBe(false);
  });

  it('should set pill', async () => {
    const screen = render(html`<forge-button pill>Button</forge-button>`);
    const el = screen.container.querySelector('forge-button') as ButtonComponent;

    expect(el.pill).toBe(true);
    expect(el.hasAttribute('pill')).toBe(true);

    await expect(el).toBeAccessible();
  });

  it('should set theme', async () => {
    const screen = render(html`<forge-button theme="success">Button</forge-button>`);
    const el = screen.container.querySelector('forge-button') as ButtonComponent;

    expect(el.theme).toBe('success');
    expect(el.getAttribute('theme')).toBe('success');

    await expect(el).toBeAccessible();
  });

  it('should set full width', async () => {
    const screen = render(html`<forge-button full-width>Button</forge-button>`);
    const el = screen.container.querySelector('forge-button') as ButtonComponent;

    expect(el.fullWidth).toBe(true);
    expect(el.hasAttribute(BUTTON_CONSTANTS.attributes.FULL_WIDTH)).toBe(true);

    el.fullWidth = false;
    await el.updateComplete;

    expect(el.fullWidth).toBe(false);
    expect(el.hasAttribute(BUTTON_CONSTANTS.attributes.FULL_WIDTH)).toBe(false);
  });

  describe('ButtonComponentDelegate', () => {
    it('should create button via delegate', async () => {
      const delegate = new ButtonComponentDelegate({ options: { text: 'Button' } });

      expect(delegate.element).toBeInstanceOf(ButtonComponent);
      expect(delegate.element.innerText).toBe('Button');
    });

    it('should set variant via delegate', async () => {
      const delegate = new ButtonComponentDelegate({ options: { variant: 'raised' } });

      expect(delegate.element.variant).toBe('raised');
    });

    it('should set type via delegate', async () => {
      const delegate = new ButtonComponentDelegate({ options: { type: 'submit' } });

      expect(delegate.element.type).toBe('submit');
    });

    it('should call click listener via delegate', async () => {
      const delegate = new ButtonComponentDelegate();
      document.body.appendChild(delegate.element);
      const clickSpy = vi.fn();

      delegate.onClick(clickSpy);
      await userEvent.click(delegate.element);
      delegate.element.remove();

      expect(clickSpy).toHaveBeenCalledOnce();
    });

    it('should call focus listener via delegate', async () => {
      const delegate = new ButtonComponentDelegate();
      document.body.appendChild(delegate.element);
      const focusSpy = vi.fn();

      delegate.onFocus(focusSpy);
      await userEvent.click(delegate.element);
      delegate.element.remove();

      expect(focusSpy).toHaveBeenCalledOnce();
    });

    it('should call blur listener via delegate', async () => {
      const delegate = new ButtonComponentDelegate();
      document.body.appendChild(delegate.element);
      await delegate.element.updateComplete;
      const blurSpy = vi.fn();

      delegate.onBlur(blurSpy);
      delegate.element.focus();
      await userEvent.click(document.body);
      await new Promise(resolve => setTimeout(resolve, 10));
      delegate.element.remove();

      expect(blurSpy).toHaveBeenCalledOnce();
    });
  });

  it('should accept aria-label attribute', async () => {
    const screen = render(html`<forge-button aria-label="Test label">Button</forge-button>`);
    const el = screen.container.querySelector('forge-button') as ButtonComponent;
    await el.updateComplete;

    expect(el.getAttribute('aria-label')).toBe('Test label');
  });

  it('should accept aria-labelledby attribute', async () => {
    const screen = render(html`
      <div>
        <label id="test-label">Test label</label>
        <forge-button aria-labelledby="test-label">Button</forge-button>
      </div>
    `);
    const button = screen.container.querySelector('forge-button') as ButtonComponent;
    await button.updateComplete;

    expect(button.getAttribute('aria-labelledby')).toBe('test-label');
  });

  function getRootEl(el: ButtonComponent): HTMLElement {
    return el.shadowRoot?.firstElementChild as HTMLElement;
  }

  function getStateLayer(btn: ButtonComponent): IStateLayerComponent {
    return btn.shadowRoot?.querySelector('forge-state-layer') as IStateLayerComponent;
  }

  function getFocusIndicator(btn: ButtonComponent): IFocusIndicatorComponent {
    return btn.shadowRoot?.querySelector('forge-focus-indicator') as IFocusIndicatorComponent;
  }
});
