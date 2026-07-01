import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { tylIconMoreVert } from '@tylertech/tyler-icons';
import { IconRegistry } from '../icon/icon-registry.js';
import { frame } from '../core/utils/utils.js';
import { ICON_BUTTON_CONSTANTS } from './icon-button-constants.js';
import { IconButtonComponent } from './icon-button.js';
import { IconButtonComponentDelegate } from './icon-button-component-delegate.js';
import type { ITooltipComponent } from '../tooltip/index.js';
import { ICON_CLASS_NAME } from '../constants.js';

import './icon-button.js';

const DEFAULT_ICON = '<forge-icon name="more_vert"></forge-icon>';
IconRegistry.define(tylIconMoreVert);

describe('Icon Button', () => {
  it('should initialize', async () => {
    const screen = render(html`<forge-icon-button>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IconButtonComponent;
    expect(el.shadowRoot).not.toBeNull();
  });

  it('should not be toggle by default', async () => {
    const screen = render(html`<forge-icon-button>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IconButtonComponent;

    expect(el.toggle).toBe(false);
    expect(el.pressed).toBe(false);
    expect(el.on).toBe(false);
  });

  it('should have default variant', async () => {
    const screen = render(html`<forge-icon-button>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IconButtonComponent;

    expect(el.variant).toBe('icon');
  });

  it('should set variant', async () => {
    const screen = render(html`<forge-icon-button variant="outlined">${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IconButtonComponent;

    expect(el.variant).toBe('outlined');
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.VARIANT)).toBe('outlined');
  });

  it('should set variant dynamically', async () => {
    const screen = render(html`<forge-icon-button>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IconButtonComponent;

    el.variant = 'tonal';
    await el.updateComplete;

    expect(el.variant).toBe('tonal');
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.VARIANT)).toBe('tonal');
  });

  it('should reset variant when variant attribute is removed', async () => {
    const screen = render(html`<forge-icon-button variant="outlined">${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IconButtonComponent;
    await el.updateComplete;

    el.variant = 'icon';
    await el.updateComplete;

    expect(el.variant).toBe('icon');
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.VARIANT)).toBe('icon');
  });

  it('should have default theme', async () => {
    const screen = render(html`<forge-icon-button>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IconButtonComponent;

    expect(el.theme).toBe('default');
  });

  it('should set theme', async () => {
    const screen = render(html`<forge-icon-button theme="error">${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IconButtonComponent;

    expect(el.theme).toBe('error');
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.THEME)).toBe('error');
  });

  it('should set theme dynamically', async () => {
    const screen = render(html`<forge-icon-button>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IconButtonComponent;

    el.theme = 'secondary';
    await el.updateComplete;

    expect(el.theme).toBe('secondary');
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.THEME)).toBe('secondary');
  });

  it('should reset theme when changed', async () => {
    const screen = render(html`<forge-icon-button theme="secondary">${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IconButtonComponent;
    await el.updateComplete;

    el.theme = 'default';
    await el.updateComplete;

    expect(el.theme).toBe('default');
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.THEME)).toBe('default');
  });

  it('should have default shape', async () => {
    const screen = render(html`<forge-icon-button>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IconButtonComponent;

    expect(el.shape).toBe('circular');
  });

  it('should set shape', async () => {
    const screen = render(html`<forge-icon-button shape="squared">${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IconButtonComponent;

    expect(el.shape).toBe('squared');
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.SHAPE)).toBe('squared');
  });

  it('should set shape dynamically', async () => {
    const screen = render(html`<forge-icon-button>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IconButtonComponent;

    el.shape = 'squared';
    await el.updateComplete;

    expect(el.shape).toBe('squared');
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.SHAPE)).toBe('squared');
  });

  it('should reset shape when changed', async () => {
    const screen = render(html`<forge-icon-button shape="squared">${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IconButtonComponent;
    await el.updateComplete;

    el.shape = 'circular';
    await el.updateComplete;

    expect(el.shape).toBe('circular');
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.SHAPE)).toBe('circular');
  });

  it('should have default density', async () => {
    const screen = render(html`<forge-icon-button>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IconButtonComponent;

    expect(el.density).toBe('large');
  });

  it('should set density', async () => {
    const screen = render(html`<forge-icon-button density="small">${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IconButtonComponent;

    expect(el.density).toBe('small');
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.DENSITY)).toBe('small');
  });

  it('should set density dynamically', async () => {
    const screen = render(html`<forge-icon-button>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IconButtonComponent;

    el.density = 'small';
    await el.updateComplete;

    expect(el.density).toBe('small');
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.DENSITY)).toBe('small');
  });

  it('should reset density when changed', async () => {
    const screen = render(html`<forge-icon-button density="small">${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IconButtonComponent;
    await el.updateComplete;

    el.density = 'large';
    await el.updateComplete;

    expect(el.density).toBe('large');
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.DENSITY)).toBe('large');
  });

  it('should accept aria-label attribute', async () => {
    const screen = render(html`<forge-icon-button aria-label="Test label">${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IconButtonComponent;
    await el.updateComplete;

    expect(el.getAttribute('aria-label')).toBe('Test label');
  });

  it('should accept aria-labelledby attribute', async () => {
    const screen = render(html`
      <div>
        <label id="test-label">Test label</label>
        <forge-icon-button aria-labelledby="test-label">${DEFAULT_ICON}</forge-icon-button>
      </div>
    `);
    const iconButton = screen.container.querySelector('forge-icon-button') as IconButtonComponent;
    await iconButton.updateComplete;

    expect(iconButton.getAttribute('aria-labelledby')).toBe('test-label');
  });

  it('should set toggle', async () => {
    const screen = render(html`<forge-icon-button toggle>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IconButtonComponent;

    expect(el.toggle).toBe(true);
    expect(el.hasAttribute(ICON_BUTTON_CONSTANTS.attributes.TOGGLE)).toBe(true);
  });

  it('should set toggle dynamically', async () => {
    const screen = render(html`<forge-icon-button>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IconButtonComponent;

    el.toggle = true;
    await el.updateComplete;

    expect(el.toggle).toBe(true);
    expect(el.hasAttribute(ICON_BUTTON_CONSTANTS.attributes.TOGGLE)).toBe(true);
  });

  it('should remove reset toggle when toggle attribute is removed', async () => {
    const screen = render(html`<forge-icon-button toggle>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IconButtonComponent;

    el.removeAttribute(ICON_BUTTON_CONSTANTS.attributes.TOGGLE);

    expect(el.toggle).toBe(false);
    expect(el.hasAttribute(ICON_BUTTON_CONSTANTS.attributes.TOGGLE)).toBe(false);
  });

  it('should not be on by default', async () => {
    const screen = render(html`<forge-icon-button toggle>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IconButtonComponent;
    await el.updateComplete;

    expect(el.pressed).toBe(false);
    expect(el.on).toBe(false);
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.ARIA_PRESSED)).toBe('false');
  });

  it('should toggle on click', async () => {
    const screen = render(html`<forge-icon-button toggle>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IconButtonComponent;
    await el.updateComplete;

    el.click();
    await el.updateComplete;
    await frame();

    expect(el.pressed).toBe(true);
    expect(el.on).toBe(true);
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.ARIA_PRESSED)).toBe('true');
  });

  it('should toggle on click when pressed is set', async () => {
    const screen = render(html`<forge-icon-button toggle pressed>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IconButtonComponent;
    await el.updateComplete;

    el.click();
    await el.updateComplete;
    await frame();

    expect(el.pressed).toBe(false);
    expect(el.on).toBe(false);
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.ARIA_PRESSED)).toBe('false');
  });

  it('should not toggle on click when disabled', async () => {
    const screen = render(html`<forge-icon-button toggle disabled>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IconButtonComponent;
    await el.updateComplete;

    el.click();
    await el.updateComplete;

    expect(el.pressed).toBe(false);
    expect(el.on).toBe(false);
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.ARIA_PRESSED)).toBe('false');
  });

  it('should not toggle to pressed when toggle event cancelled', async () => {
    const screen = render(html`<forge-icon-button toggle>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IconButtonComponent;
    await el.updateComplete;

    const clickSpy = vi.fn((evt: Event) => evt.preventDefault());

    expect(el.pressed).toBe(false);
    expect(el.on).toBe(false);
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.ARIA_PRESSED)).toBe('false');

    el.addEventListener(ICON_BUTTON_CONSTANTS.events.TOGGLE, clickSpy as EventListener);
    el.click();
    await el.updateComplete;
    await frame();

    expect(clickSpy).toHaveBeenCalledOnce();
    expect(el.pressed).toBe(false);
    expect(el.on).toBe(false);
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.ARIA_PRESSED)).toBe('false');
  });

  it('should not toggle to off when click event cancelled', async () => {
    const screen = render(html`<forge-icon-button toggle on>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IconButtonComponent;
    await el.updateComplete;

    const clickSpy = vi.fn((evt: Event) => evt.preventDefault());

    expect(el.pressed).toBe(true);
    expect(el.on).toBe(true);
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.ARIA_PRESSED)).toBe('true');

    el.addEventListener(ICON_BUTTON_CONSTANTS.events.TOGGLE, clickSpy as EventListener);
    el.click();
    await el.updateComplete;
    await frame();

    expect(clickSpy).toHaveBeenCalledOnce();
    expect(el.pressed).toBe(true);
    expect(el.on).toBe(true);
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.ARIA_PRESSED)).toBe('true');
  });

  it('should not enable toggle if pressed is set while toggle is off', async () => {
    const screen = render(html`<forge-icon-button pressed>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IconButtonComponent;

    expect(el.toggle).toBe(false);
    expect(el.pressed).toBe(true);
    expect(el.on).toBe(true);
    expect(el.hasAttribute(ICON_BUTTON_CONSTANTS.attributes.ARIA_PRESSED)).toBe(false);
  });

  describe('IconButtonComponentDelegate', () => {
    it('should create icon button via delegate', async () => {
      const delegate = new IconButtonComponentDelegate({
        options: {
          iconName: 'more_vert',
          iconExternal: false,
          iconExternalType: 'standard',
          iconClass: 'my-custom-class'
        }
      });

      expect(delegate.element).toBeInstanceOf(IconButtonComponent);
      expect(delegate.iconElement?.name).toBe('more_vert');
      expect(delegate.iconElement?.external).toBe(false);
      expect(delegate.iconElement?.externalType).toBe('standard');
      expect(delegate.iconElement?.classList.contains('my-custom-class')).toBe(true);
    });

    it('should set font-based icon', async () => {
      const delegate = new IconButtonComponentDelegate({ options: { iconName: 'more_vert', iconType: 'font' } });

      expect(delegate.element.innerText).toBe('more_vert');
      expect(delegate.element.classList.contains(ICON_CLASS_NAME)).toBe(true);
    });

    it('should set tooltip via delegate', async () => {
      const delegate = new IconButtonComponentDelegate({
        options: { tooltip: 'Test tooltip', tooltipPosition: 'bottom' }
      });

      const tooltipEl = delegate.element.querySelector('forge-tooltip') as ITooltipComponent;
      expect(tooltipEl.innerText).toBe('Test tooltip');
    });

    it('should set disabled via delegate', async () => {
      const delegate = new IconButtonComponentDelegate();

      delegate.disabled = true;

      expect(delegate.disabled).toBe(true);
    });

    it('should call click handler via delegate', async () => {
      const delegate = new IconButtonComponentDelegate();
      document.body.appendChild(delegate.element);
      const clickSpy = vi.fn();

      delegate.onClick(clickSpy);
      await userEvent.click(delegate.element);
      delegate.element.remove();

      expect(clickSpy).toHaveBeenCalledOnce();
    });

    it('should call focus handler via delegate', async () => {
      const delegate = new IconButtonComponentDelegate();
      document.body.appendChild(delegate.element);
      const focusSpy = vi.fn();

      delegate.onFocus(focusSpy);
      delegate.element.focus();
      await userEvent.click(delegate.element);
      delegate.element.remove();

      expect(focusSpy).toHaveBeenCalledOnce();
    });

    it('should call blur handler via delegate', async () => {
      const delegate = new IconButtonComponentDelegate();
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
});
