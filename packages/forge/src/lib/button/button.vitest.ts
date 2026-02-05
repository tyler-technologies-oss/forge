import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { BASE_BUTTON_CONSTANTS } from './base/base-button-constants';
import { BUTTON_CONSTANTS } from './button-constants';
import { ButtonComponent, IButtonComponent } from './button';
import type { IStateLayerComponent } from '../state-layer';
import type { IFocusIndicatorComponent } from '../focus-indicator';
import { ButtonComponentDelegate } from './button-component-delegate';

import './button';

describe('Button', () => {
  it('should initialize', async () => {
    const screen = render(html`<forge-button>Button</forge-button>`);
    const el = screen.container.querySelector('forge-button') as IButtonComponent;

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
    const el = screen.container.querySelector('forge-button') as IButtonComponent;

    await expect(el).toBeAccessible();
  });

  it('should be text variant by default', async () => {
    const screen = render(html`<forge-button>Button</forge-button>`);
    const el = screen.container.querySelector('forge-button') as IButtonComponent;

    expect(el.variant).toBe('text');
  });

  it('should be raised variant', async () => {
    const screen = render(html`<forge-button variant="raised">Button</forge-button>`);
    const el = screen.container.querySelector('forge-button') as IButtonComponent;

    expect(el.variant).toBe('raised');

    await expect(el).toBeAccessible();
  });

  it('should be outlined variant', async () => {
    const screen = render(html`<forge-button variant="outlined">Button</forge-button>`);
    const el = screen.container.querySelector('forge-button') as IButtonComponent;

    expect(el.variant).toBe('outlined');

    await expect(el).toBeAccessible();
  });

  it('should be flat variant', async () => {
    const screen = render(html`<forge-button variant="flat">Button</forge-button>`);
    const el = screen.container.querySelector('forge-button') as IButtonComponent;

    expect(el.variant).toBe('flat');

    await expect(el).toBeAccessible();
  });

  it('should be link variant', async () => {
    const screen = render(html`<forge-button variant="link">Button</forge-button>`);
    const el = screen.container.querySelector('forge-button') as IButtonComponent;

    const stateLayer = getStateLayer(el);

    expect(el.variant).toBe('link');
    expect(stateLayer.disabled).toBe(true);

    await expect(el).toBeAccessible();
  });

  it('should enable state layer when switching from link variant dynamically', async () => {
    const screen = render(html`<forge-button variant="link">Button</forge-button>`);
    const el = screen.container.querySelector('forge-button') as IButtonComponent;

    const stateLayer = getStateLayer(el);
    expect(stateLayer.disabled).toBe(true);

    el.variant = 'raised';

    expect(stateLayer.disabled).toBe(false);
  });

  it('should set pill', async () => {
    const screen = render(html`<forge-button pill>Button</forge-button>`);
    const el = screen.container.querySelector('forge-button') as IButtonComponent;

    expect(el.pill).toBe(true);
    expect(el.hasAttribute('pill')).toBe(true);

    await expect(el).toBeAccessible();
  });

  it('should set theme', async () => {
    const screen = render(html`<forge-button theme="success">Button</forge-button>`);
    const el = screen.container.querySelector('forge-button') as IButtonComponent;

    expect(el.theme).toBe('success');
    expect(el.getAttribute('theme')).toBe('success');

    await expect(el).toBeAccessible();
  });

  it('should set full width', async () => {
    const screen = render(html`<forge-button full-width>Button</forge-button>`);
    const el = screen.container.querySelector('forge-button') as IButtonComponent;

    expect(el.fullWidth).toBe(true);
    expect(el.hasAttribute(BUTTON_CONSTANTS.attributes.FULL_WIDTH)).toBe(true);

    el.fullWidth = false;

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
      const blurSpy = vi.fn();

      delegate.onBlur(blurSpy);
      delegate.element.focus();
      await userEvent.click(document.body);
      delegate.element.remove();

      expect(blurSpy).toHaveBeenCalledOnce();
    });
  });

  it('should be accessible with aria-label', async () => {
    const screen = render(html`<forge-button aria-label="Test label">Button</forge-button>`);
    const el = screen.container.querySelector('forge-button') as IButtonComponent;

    await expect(el).toBeAccessible();
  });

  it('should be accessible with aria-labelledby', async () => {
    const screen = render(html`
      <div>
        <label id="test-label">Test label</label>
        <forge-button aria-labelledby="test-label"></forge-button>
      </div>
    `);
    const button = screen.container.querySelector('forge-button') as IButtonComponent;

    await expect(button).toBeAccessible();
  });

  function getRootEl(el: IButtonComponent): HTMLElement {
    return el.shadowRoot?.firstElementChild as HTMLElement;
  }

  function getStateLayer(btn: IButtonComponent): IStateLayerComponent {
    return btn.shadowRoot?.querySelector('forge-state-layer') as IStateLayerComponent;
  }

  function getFocusIndicator(btn: IButtonComponent): IFocusIndicatorComponent {
    return btn.shadowRoot?.querySelector('forge-focus-indicator') as IFocusIndicatorComponent;
  }
});
