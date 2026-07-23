import { tylIconFavorite } from '@tylertech/tyler-icons';
import { html } from 'lit';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { userEvent } from 'vitest/browser';
import { ICON_CLASS_NAME } from '../constants.js';
import { frame } from '../core/utils/utils.js';
import type { IFocusIndicatorComponent } from '../focus-indicator/index.js';
import { IconRegistry } from '../icon/icon-registry.js';
import type { IStateLayerComponent } from '../state-layer/index.js';
import { FloatingActionButtonComponentDelegate } from './floating-action-button-component-delegate.js';
import { FLOATING_ACTION_BUTTON_CONSTANTS } from './floating-action-button-constants.js';
import { FloatingActionButtonComponent } from './floating-action-button.js';

import './floating-action-button.js';

IconRegistry.define(tylIconFavorite);

describe('Floating Action Button', () => {
  it('should initialize', async () => {
    const screen = render(html`<forge-fab>Label</forge-fab>`);
    const el = screen.container.querySelector('forge-fab') as FloatingActionButtonComponent;
    await el.updateComplete;

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
    const el = screen.container.querySelector('forge-fab') as FloatingActionButtonComponent;

    expect(el.theme).toBe('secondary');
    expect(el.dense).toBe(false);
    expect(el.density).toBe('medium');
    expect(el.elevation).toBe('raised');
  });

  it('should be accessible', async () => {
    const screen = render(html`<forge-fab>Label</forge-fab>`);
    const el = screen.container.querySelector('forge-fab') as FloatingActionButtonComponent;

    await expect(el).toBeAccessible();
  });

  it('should be accessible when disabled', async () => {
    const screen = render(html`<forge-fab disabled>Label</forge-fab>`);
    const el = screen.container.querySelector('forge-fab') as FloatingActionButtonComponent;

    await expect(el).toBeAccessible();
  });

  it('should accept aria-label attribute', async () => {
    const screen = render(html`
      <forge-fab aria-label="With icon">
        <forge-icon name="favorite"></forge-icon>
      </forge-fab>
    `);
    const el = screen.container.querySelector('forge-fab') as FloatingActionButtonComponent;
    await el.updateComplete;

    expect(el.getAttribute('aria-label')).toBe('With icon');
  });

  it('should accept aria-labelledby attribute', async () => {
    const screen = render(html`
      <div>
        <label id="test-label">Test label</label>
        <forge-fab aria-labelledby="test-label">
          <forge-icon name="favorite"></forge-icon>
        </forge-fab>
      </div>
    `);
    const el = screen.container.querySelector('forge-fab') as FloatingActionButtonComponent;
    await el.updateComplete;

    expect(el.getAttribute('aria-labelledby')).toBe('test-label');
  });

  it('should set theme', async () => {
    const screen = render(html`<forge-fab theme="success">FAB</forge-fab>`);
    const el = screen.container.querySelector('forge-fab') as FloatingActionButtonComponent;

    expect(el.theme).toBe('success');
    expect(el.getAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.THEME)).toBe('success');
    await expect(el).toBeAccessible();
  });

  it('should remove theme attribute when set to default', async () => {
    const screen = render(html`<forge-fab theme="success">FAB</forge-fab>`);
    const el = screen.container.querySelector('forge-fab') as FloatingActionButtonComponent;
    await el.updateComplete;

    el.theme = 'secondary';
    await el.updateComplete;

    expect(el.theme).toBe('secondary');
    expect(el.getAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.THEME)).toBe('secondary');
    await expect(el).toBeAccessible();
  });

  it('should set density', async () => {
    const screen = render(html`<forge-fab density="small">FAB</forge-fab>`);
    const el = screen.container.querySelector('forge-fab') as FloatingActionButtonComponent;

    expect(el.density).toBe('small');
    expect(el.getAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.DENSITY)).toBe('small');
    await expect(el).toBeAccessible();
  });

  it('should remove density attribute when set to default', async () => {
    const screen = render(html`<forge-fab density="small">FAB</forge-fab>`);
    const el = screen.container.querySelector('forge-fab') as FloatingActionButtonComponent;
    await el.updateComplete;

    el.density = 'medium';
    await el.updateComplete;

    expect(el.density).toBe('medium');
    expect(el.getAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.DENSITY)).toBe('medium');
    await expect(el).toBeAccessible();
  });

  it('should set elevation', async () => {
    const screen = render(html`<forge-fab elevation="lowered">FAB</forge-fab>`);
    const el = screen.container.querySelector('forge-fab') as FloatingActionButtonComponent;

    expect(el.elevation).toBe('lowered');
    expect(el.getAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.ELEVATION)).toBe('lowered');
    await expect(el).toBeAccessible();
  });

  it('should remove elevation attribute when set to default', async () => {
    const screen = render(html`<forge-fab elevation="lowered">FAB</forge-fab>`);
    const el = screen.container.querySelector('forge-fab') as FloatingActionButtonComponent;
    await el.updateComplete;

    el.elevation = 'raised';
    await el.updateComplete;

    expect(el.elevation).toBe('raised');
    expect(el.getAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.ELEVATION)).toBe('raised');
    await expect(el).toBeAccessible();
  });

  describe('Extended detection', () => {
    it('should not be extended without a slotted label', async () => {
      const screen = render(html`<forge-fab><forge-icon name="favorite"></forge-icon></forge-fab>`);
      const el = screen.container.querySelector('forge-fab') as FloatingActionButtonComponent;
      await el.updateComplete;

      const rootEl = getRootEl(el);
      expect(rootEl.classList.contains('extended')).toBe(false);
    });

    it('should not be extended with slotted text content', async () => {
      const screen = render(html`<forge-fab>A</forge-fab>`);
      const el = screen.container.querySelector('forge-fab') as FloatingActionButtonComponent;
      await el.updateComplete;

      const rootEl = getRootEl(el);
      expect(rootEl.classList.contains('extended')).toBe(false);
    });

    it('should not be extended when has long label in default slot', async () => {
      const screen = render(html`<forge-fab>Long label text</forge-fab>`);
      const el = screen.container.querySelector('forge-fab') as FloatingActionButtonComponent;
      await el.updateComplete;

      const rootEl = getRootEl(el);
      expect(rootEl.classList.contains('extended')).toBe(false);
    });

    it('should be extended when has slotted label', async () => {
      const screen = render(html`
        <forge-fab>
          <span slot="label">A</span>
        </forge-fab>
      `);
      const el = screen.container.querySelector('forge-fab') as FloatingActionButtonComponent;
      await el.updateComplete;
      await frame();

      const rootEl = getRootEl(el);
      expect(rootEl.classList.contains('extended')).toBe(true);
    });

    it('should be extended when has icon and slotted label', async () => {
      const screen = render(html`
        <forge-fab>
          <forge-icon name="favorite"></forge-icon>
          <span slot="label">Label</span>
        </forge-fab>
      `);
      const el = screen.container.querySelector('forge-fab') as FloatingActionButtonComponent;
      await el.updateComplete;
      await frame();

      const rootEl = getRootEl(el);
      expect(rootEl.classList.contains('extended')).toBe(true);
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
      document.body.appendChild(delegate.element);
      await delegate.element.updateComplete;

      expect(delegate.element.theme).toBe('success');
      expect(delegate.element.getAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.THEME)).toBe('success');

      delegate.element.remove();
    });

    it('should set density via delegate', async () => {
      const delegate = new FloatingActionButtonComponentDelegate({ options: { density: 'small' } });
      document.body.appendChild(delegate.element);
      await delegate.element.updateComplete;

      expect(delegate.element.density).toBe('small');
      expect(delegate.element.getAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.DENSITY)).toBe('small');

      delegate.element.remove();
    });

    it('should set elevation via delegate', async () => {
      const delegate = new FloatingActionButtonComponentDelegate({ options: { elevation: 'lowered' } });
      document.body.appendChild(delegate.element);
      await delegate.element.updateComplete;

      expect(delegate.element.elevation).toBe('lowered');
      expect(delegate.element.getAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.ELEVATION)).toBe('lowered');

      delegate.element.remove();
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
      document.body.appendChild(delegate.element);

      delegate.disabled = true;
      await delegate.element.updateComplete;

      expect(delegate.disabled).toBe(true);
      expect(delegate.element.hasAttribute('disabled')).toBe(true);

      delegate.element.remove();
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

  function getRootEl(el: FloatingActionButtonComponent): HTMLElement {
    return el.shadowRoot?.firstElementChild as HTMLElement;
  }

  function getStateLayer(btn: FloatingActionButtonComponent): IStateLayerComponent {
    return btn.shadowRoot?.querySelector('forge-state-layer') as IStateLayerComponent;
  }

  function getFocusIndicator(btn: FloatingActionButtonComponent): IFocusIndicatorComponent {
    return btn.shadowRoot?.querySelector('forge-focus-indicator') as IFocusIndicatorComponent;
  }
});
