import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { tylIconFavorite } from '@tylertech/tyler-icons';
import { IconRegistry } from '../icon/icon-registry.js';
import type { IStateLayerComponent } from '../state-layer/index.js';
import type { IFocusIndicatorComponent } from '../focus-indicator/index.js';
import { FloatingActionButtonComponent, type IFloatingActionButtonComponent } from './floating-action-button.js';
import { FloatingActionButtonComponentDelegate } from './floating-action-button-component-delegate.js';
import { FLOATING_ACTION_BUTTON_CONSTANTS } from './floating-action-button-constants.js';

import './floating-action-button.js';
import { ICON_CLASS_NAME } from '../constants.js';

IconRegistry.define(tylIconFavorite);

describe('Floating Action Button', () => {
  it('should initialize', async () => {
    const screen = render(html`<forge-fab>Label</forge-fab>`);
    const el = screen.container.querySelector('forge-fab') as IFloatingActionButtonComponent;

    const rootEl = getRootEl(el);
    const stateLayer = getStateLayer(el);
    const focusIndicator = getFocusIndicator(el);

    expect(el.shadowRoot).not.toBeNull();
    expect(el.type).toBe('button');
    expect(rootEl.getAttribute('part')).toBe('root');
    expect(stateLayer.disabled).toBe(false);
    expect(focusIndicator).toBeTruthy();
  });

  it('should have correct defaults', async () => {
    const screen = render(html`<forge-fab>Label</forge-fab>`);
    const el = screen.container.querySelector('forge-fab') as IFloatingActionButtonComponent;

    expect(el.theme).toBe('secondary');
    expect(el.dense).toBe(false);
    expect(el.density).toBe('medium');
    expect(el.elevation).toBe('raised');
  });

  it('should be accessible', async () => {
    const screen = render(html`<forge-fab>Label</forge-fab>`);
    const el = screen.container.querySelector('forge-fab') as IFloatingActionButtonComponent;

    await expect(el).toBeAccessible();
  });

  it('should be accessible when disabled', async () => {
    const screen = render(html`<forge-fab disabled>Label</forge-fab>`);
    const el = screen.container.querySelector('forge-fab') as IFloatingActionButtonComponent;

    await expect(el).toBeAccessible();
  });

  it('should be accessible with icon and aria-label', async () => {
    const screen = render(html`
      <forge-fab aria-label="With icon">
        <forge-icon name="favorite"></forge-icon>
      </forge-fab>
    `);
    const el = screen.container.querySelector('forge-fab') as IFloatingActionButtonComponent;

    await expect(el).toBeAccessible();
  });

  it('should be accessible with aria-labelledby', async () => {
    const screen = render(html`
      <div>
        <label id="test-label">Test label</label>
        <forge-fab aria-labelledby="test-label">
          <forge-icon name="favorite"></forge-icon>
        </forge-fab>
      </div>
    `);
    const el = screen.container.querySelector('forge-fab') as IFloatingActionButtonComponent;

    await expect(el).toBeAccessible();
  });

  it('should set theme', async () => {
    const screen = render(html`<forge-fab theme="success">FAB</forge-fab>`);
    const el = screen.container.querySelector('forge-fab') as IFloatingActionButtonComponent;

    expect(el.theme).toBe('success');
    expect(el.getAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.THEME)).toBe('success');
    await expect(el).toBeAccessible();
  });

  it('should remove theme attribute when set to default', async () => {
    const screen = render(html`<forge-fab theme="success">FAB</forge-fab>`);
    const el = screen.container.querySelector('forge-fab') as IFloatingActionButtonComponent;

    el.theme = 'secondary';
    expect(el.theme).toBe('secondary');
    expect(el.hasAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.THEME)).toBe(false);
    await expect(el).toBeAccessible();
  });

  it('should set density', async () => {
    const screen = render(html`<forge-fab density="small">FAB</forge-fab>`);
    const el = screen.container.querySelector('forge-fab') as IFloatingActionButtonComponent;

    expect(el.density).toBe('small');
    expect(el.getAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.DENSITY)).toBe('small');
    await expect(el).toBeAccessible();
  });

  it('should remove density attribute when set to default', async () => {
    const screen = render(html`<forge-fab density="small">FAB</forge-fab>`);
    const el = screen.container.querySelector('forge-fab') as IFloatingActionButtonComponent;

    el.density = 'medium';
    expect(el.density).toBe('medium');
    expect(el.hasAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.DENSITY)).toBe(false);
    await expect(el).toBeAccessible();
  });

  it('should set elevation', async () => {
    const screen = render(html`<forge-fab elevation="lowered">FAB</forge-fab>`);
    const el = screen.container.querySelector('forge-fab') as IFloatingActionButtonComponent;

    expect(el.elevation).toBe('lowered');
    expect(el.getAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.ELEVATION)).toBe('lowered');
    await expect(el).toBeAccessible();
  });

  it('should remove elevation attribute when set to default', async () => {
    const screen = render(html`<forge-fab elevation="lowered">FAB</forge-fab>`);
    const el = screen.container.querySelector('forge-fab') as IFloatingActionButtonComponent;

    el.elevation = 'raised';
    expect(el.elevation).toBe('raised');
    expect(el.hasAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.ELEVATION)).toBe(false);
    await expect(el).toBeAccessible();
  });

  describe('Extended detection', () => {
    it('should not be extended without a slotted label', async () => {
      const screen = render(html`<forge-fab><forge-icon name="favorite"></forge-icon></forge-fab>`);
      const el = screen.container.querySelector('forge-fab') as IFloatingActionButtonComponent;

      const rootEl = getRootEl(el);
      expect(rootEl.classList.contains(FLOATING_ACTION_BUTTON_CONSTANTS.classes.EXTENDED)).toBe(false);
    });

    it('should not be extended with slotted text content', async () => {
      const screen = render(html`<forge-fab>A</forge-fab>`);
      const el = screen.container.querySelector('forge-fab') as IFloatingActionButtonComponent;

      const rootEl = getRootEl(el);
      expect(rootEl.classList.contains(FLOATING_ACTION_BUTTON_CONSTANTS.classes.EXTENDED)).toBe(false);
    });

    it('should not be extended when has long label in default slot', async () => {
      const screen = render(html`<forge-fab>Long label text</forge-fab>`);
      const el = screen.container.querySelector('forge-fab') as IFloatingActionButtonComponent;

      const rootEl = getRootEl(el);
      expect(rootEl.classList.contains(FLOATING_ACTION_BUTTON_CONSTANTS.classes.EXTENDED)).toBe(false);
    });

    it('should be extended when has slotted label', async () => {
      const screen = render(html`
        <forge-fab>
          <span slot="label">A</span>
        </forge-fab>
      `);
      const el = screen.container.querySelector('forge-fab') as IFloatingActionButtonComponent;

      const rootEl = getRootEl(el);
      expect(rootEl.classList.contains(FLOATING_ACTION_BUTTON_CONSTANTS.classes.EXTENDED)).toBe(true);
    });

    it('should be extended when has icon and slotted label', async () => {
      const screen = render(html`
        <forge-fab>
          <forge-icon name="favorite"></forge-icon>
          <span slot="label">Label</span>
        </forge-fab>
      `);
      const el = screen.container.querySelector('forge-fab') as IFloatingActionButtonComponent;

      const rootEl = getRootEl(el);
      expect(rootEl.classList.contains(FLOATING_ACTION_BUTTON_CONSTANTS.classes.EXTENDED)).toBe(true);
    });
  });

  describe('ButtonComponentDelegate', () => {
    it('should create button via delegate', async () => {
      const delegate = new FloatingActionButtonComponentDelegate({ options: { label: 'FAB' } });

      expect(delegate.element).toBeInstanceOf(FloatingActionButtonComponent);
      expect(delegate.element.innerText).toBe('FAB');
    });

    it('should set theme via delegate', async () => {
      const delegate = new FloatingActionButtonComponentDelegate({ options: { theme: 'success' } });

      expect(delegate.element.theme).toBe('success');
      expect(delegate.element.getAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.THEME)).toBe('success');
    });

    it('should set density via delegate', async () => {
      const delegate = new FloatingActionButtonComponentDelegate({ options: { density: 'small' } });

      expect(delegate.element.density).toBe('small');
      expect(delegate.element.getAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.DENSITY)).toBe('small');
    });

    it('should set elevation via delegate', async () => {
      const delegate = new FloatingActionButtonComponentDelegate({ options: { elevation: 'lowered' } });

      expect(delegate.element.elevation).toBe('lowered');
      expect(delegate.element.getAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.ELEVATION)).toBe('lowered');
    });

    it('should create icon button via delegate', async () => {
      const delegate = new FloatingActionButtonComponentDelegate({
        options: {
          iconName: 'more_vert',
          iconExternal: false,
          iconExternalType: 'standard',
          iconClass: 'my-custom-class'
        }
      });

      expect(delegate.element).toBeInstanceOf(FloatingActionButtonComponent);
      expect(delegate.iconElement?.name).toBe('more_vert');
      expect(delegate.iconElement?.external).toBe(false);
      expect(delegate.iconElement?.externalType).toBe('standard');
      expect(delegate.iconElement?.classList.contains('my-custom-class')).toBe(true);
    });

    it('should set font-based icon', async () => {
      const delegate = new FloatingActionButtonComponentDelegate({
        options: { iconName: 'more_vert', iconType: 'font' }
      });

      expect(delegate.element.innerText).toBe('more_vert');
      expect(delegate.element.classList.contains(ICON_CLASS_NAME)).toBe(true);
    });

    it('should set disabled via delegate', async () => {
      const delegate = new FloatingActionButtonComponentDelegate();

      delegate.disabled = true;

      expect(delegate.disabled).toBe(true);
      expect(delegate.element.hasAttribute('disabled')).toBe(true);
    });

    it('should call click listener via delegate', async () => {
      const delegate = new FloatingActionButtonComponentDelegate();
      document.body.appendChild(delegate.element);
      const clickSpy = vi.fn();

      delegate.onClick(clickSpy);
      await userEvent.click(delegate.element);
      delegate.element.remove();

      expect(clickSpy).toHaveBeenCalledOnce();
    });

    it('should call focus listener via delegate', async () => {
      const delegate = new FloatingActionButtonComponentDelegate();
      document.body.appendChild(delegate.element);
      const focusSpy = vi.fn();

      delegate.onFocus(focusSpy);
      await userEvent.click(delegate.element);
      delegate.element.remove();

      expect(focusSpy).toHaveBeenCalledOnce();
    });

    it('should call blur listener via delegate', async () => {
      const delegate = new FloatingActionButtonComponentDelegate();
      document.body.appendChild(delegate.element);
      const blurSpy = vi.fn();

      delegate.onBlur(blurSpy);
      delegate.element.focus();
      await userEvent.click(document.body);
      delegate.element.remove();

      expect(blurSpy).toHaveBeenCalledOnce();
    });
  });

  function getRootEl(el: IFloatingActionButtonComponent): HTMLElement {
    return el.shadowRoot?.firstElementChild as HTMLElement;
  }

  function getStateLayer(btn: IFloatingActionButtonComponent): IStateLayerComponent {
    return btn.shadowRoot?.querySelector('forge-state-layer') as IStateLayerComponent;
  }

  function getFocusIndicator(btn: IFloatingActionButtonComponent): IFocusIndicatorComponent {
    return btn.shadowRoot?.querySelector('forge-focus-indicator') as IFocusIndicatorComponent;
  }
});
