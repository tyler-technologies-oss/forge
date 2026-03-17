import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { tylIconMoreVert } from '@tylertech/tyler-icons';
import { IconRegistry } from '../icon/icon-registry.js';
import { ICON_BUTTON_CONSTANTS } from './icon-button-constants.js';
import { IconButtonComponent, type IIconButtonComponent } from './icon-button.js';
import { IconButtonComponentDelegate } from './icon-button-component-delegate.js';
import type { ITooltipComponent } from '../tooltip/index.js';
import { ICON_CLASS_NAME } from '../constants.js';

import './icon-button.js';

const DEFAULT_ICON = '<forge-icon name="more_vert"></forge-icon>';
IconRegistry.define(tylIconMoreVert);

describe('Icon Button', () => {
  it('should initialize', async () => {
    const screen = render(html`<forge-icon-button>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IIconButtonComponent;
    expect(el.shadowRoot).not.toBeNull();
  });

  it('should not be toggle by default', async () => {
    const screen = render(html`<forge-icon-button>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IIconButtonComponent;

    expect(el.toggle).toBe(false);
    expect(el.pressed).toBe(false);
    expect(el.on).toBe(false);
  });

  it('should have default variant', async () => {
    const screen = render(html`<forge-icon-button>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IIconButtonComponent;

    expect(el.variant).toBe('icon');
  });

  it('should set variant', async () => {
    const screen = render(html`<forge-icon-button variant="outlined">${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IIconButtonComponent;

    expect(el.variant).toBe('outlined');
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.VARIANT)).toBe('outlined');
  });

  it('should set variant dynamically', async () => {
    const screen = render(html`<forge-icon-button>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IIconButtonComponent;

    el.variant = 'tonal';

    expect(el.variant).toBe('tonal');
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.VARIANT)).toBe('tonal');
  });

  it('should remove reset variant when variant attribute is removed', async () => {
    const screen = render(html`<forge-icon-button variant="outlined">${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IIconButtonComponent;

    el.removeAttribute(ICON_BUTTON_CONSTANTS.attributes.VARIANT);

    expect(el.variant).toBe('icon');
    expect(el.hasAttribute(ICON_BUTTON_CONSTANTS.attributes.VARIANT)).toBe(false);
  });

  it('should have default theme', async () => {
    const screen = render(html`<forge-icon-button>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IIconButtonComponent;

    expect(el.theme).toBe('default');
  });

  it('should set theme', async () => {
    const screen = render(html`<forge-icon-button theme="error">${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IIconButtonComponent;

    expect(el.theme).toBe('error');
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.THEME)).toBe('error');
  });

  it('should set theme dynamically', async () => {
    const screen = render(html`<forge-icon-button>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IIconButtonComponent;

    el.theme = 'secondary';

    expect(el.theme).toBe('secondary');
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.THEME)).toBe('secondary');
  });

  it('should remove reset theme when theme attribute is removed', async () => {
    const screen = render(html`<forge-icon-button theme="secondary">${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IIconButtonComponent;

    el.removeAttribute(ICON_BUTTON_CONSTANTS.attributes.THEME);

    expect(el.theme).toBe('default');
    expect(el.hasAttribute(ICON_BUTTON_CONSTANTS.attributes.THEME)).toBe(false);
  });

  it('should have default shape', async () => {
    const screen = render(html`<forge-icon-button>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IIconButtonComponent;

    expect(el.shape).toBe('circular');
  });

  it('should set shape', async () => {
    const screen = render(html`<forge-icon-button shape="squared">${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IIconButtonComponent;

    expect(el.shape).toBe('squared');
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.SHAPE)).toBe('squared');
  });

  it('should set shape dynamically', async () => {
    const screen = render(html`<forge-icon-button>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IIconButtonComponent;

    el.shape = 'squared';

    expect(el.shape).toBe('squared');
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.SHAPE)).toBe('squared');
  });

  it('should remove reset shape when shape attribute is removed', async () => {
    const screen = render(html`<forge-icon-button shape="squared">${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IIconButtonComponent;

    el.removeAttribute(ICON_BUTTON_CONSTANTS.attributes.SHAPE);

    expect(el.shape).toBe('circular');
    expect(el.hasAttribute(ICON_BUTTON_CONSTANTS.attributes.SHAPE)).toBe(false);
  });

  it('should have default density', async () => {
    const screen = render(html`<forge-icon-button>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IIconButtonComponent;

    expect(el.density).toBe('large');
  });

  it('should set density', async () => {
    const screen = render(html`<forge-icon-button density="small">${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IIconButtonComponent;

    expect(el.density).toBe('small');
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.DENSITY)).toBe('small');
  });

  it('should set density dynamically', async () => {
    const screen = render(html`<forge-icon-button>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IIconButtonComponent;

    el.density = 'small';

    expect(el.density).toBe('small');
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.DENSITY)).toBe('small');
  });

  it('should remove reset density when density attribute is removed', async () => {
    const screen = render(html`<forge-icon-button density="small">${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IIconButtonComponent;

    el.removeAttribute(ICON_BUTTON_CONSTANTS.attributes.DENSITY);

    expect(el.density).toBe('large');
    expect(el.hasAttribute(ICON_BUTTON_CONSTANTS.attributes.DENSITY)).toBe(false);
  });

  it('should be accessible with a aria-label', async () => {
    const screen = render(html`<forge-icon-button aria-label="Test label">${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IIconButtonComponent;
    await expect(el).toBeAccessible();
  });

  it('should be accessible with a aria-labelledby', async () => {
    const screen = render(html`
      <div>
        <label id="test-label">Test label</label>
        <forge-icon-button aria-labelledby="test-label">${DEFAULT_ICON}</forge-icon-button>
      </div>
    `);
    const iconButton = screen.container.querySelector('forge-icon-button') as IIconButtonComponent;
    await expect(iconButton).toBeAccessible();
  });

  it('should set toggle', async () => {
    const screen = render(html`<forge-icon-button toggle>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IIconButtonComponent;

    expect(el.toggle).toBe(true);
    expect(el.hasAttribute(ICON_BUTTON_CONSTANTS.attributes.TOGGLE)).toBe(true);
  });

  it('should set toggle dynamically', async () => {
    const screen = render(html`<forge-icon-button>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IIconButtonComponent;

    el.toggle = true;

    expect(el.toggle).toBe(true);
    expect(el.hasAttribute(ICON_BUTTON_CONSTANTS.attributes.TOGGLE)).toBe(true);
  });

  it('should remove reset toggle when toggle attribute is removed', async () => {
    const screen = render(html`<forge-icon-button toggle>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IIconButtonComponent;

    el.removeAttribute(ICON_BUTTON_CONSTANTS.attributes.TOGGLE);

    expect(el.toggle).toBe(false);
    expect(el.hasAttribute(ICON_BUTTON_CONSTANTS.attributes.TOGGLE)).toBe(false);
  });

  it('should not be on by default', async () => {
    const screen = render(html`<forge-icon-button toggle>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IIconButtonComponent;

    expect(el.pressed).toBe(false);
    expect(el.on).toBe(false);
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.ARIA_PRESSED)).toBe('false');
  });

  it('should toggle on click', async () => {
    const screen = render(html`<forge-icon-button toggle>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IIconButtonComponent;

    el.click();

    expect(el.pressed).toBe(true);
    expect(el.on).toBe(true);
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.ARIA_PRESSED)).toBe('true');
  });

  it('should toggle on click when pressed is set', async () => {
    const screen = render(html`<forge-icon-button toggle pressed>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IIconButtonComponent;

    el.click();

    expect(el.pressed).toBe(false);
    expect(el.on).toBe(false);
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.ARIA_PRESSED)).toBe('false');
  });

  it('should not toggle on click when disabled', async () => {
    const screen = render(html`<forge-icon-button toggle disabled>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IIconButtonComponent;

    el.click();

    expect(el.pressed).toBe(false);
    expect(el.on).toBe(false);
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.ARIA_PRESSED)).toBe('false');
  });

  it('should not toggle to pressed when toggle event cancelled', async () => {
    const screen = render(html`<forge-icon-button toggle>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IIconButtonComponent;
    const clickSpy = vi.fn((evt: CustomEvent<boolean>) => evt.preventDefault());

    expect(el.pressed).toBe(false);
    expect(el.on).toBe(false);
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.ARIA_PRESSED)).toBe('false');

    el.addEventListener(ICON_BUTTON_CONSTANTS.events.TOGGLE, clickSpy);
    el.click();

    expect(clickSpy).toHaveBeenCalledOnce();
    expect(el.pressed).toBe(false);
    expect(el.on).toBe(false);
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.ARIA_PRESSED)).toBe('false');
  });

  it('should not toggle to off when click event cancelled', async () => {
    const screen = render(html`<forge-icon-button toggle on>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IIconButtonComponent;
    const clickSpy = vi.fn((evt: CustomEvent<boolean>) => evt.preventDefault());

    expect(el.pressed).toBe(true);
    expect(el.on).toBe(true);
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.ARIA_PRESSED)).toBe('true');

    el.addEventListener(ICON_BUTTON_CONSTANTS.events.TOGGLE, clickSpy);
    el.click();

    expect(clickSpy).toHaveBeenCalledOnce();
    expect(el.pressed).toBe(true);
    expect(el.on).toBe(true);
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.ARIA_PRESSED)).toBe('true');
  });

  it('should not enable toggle if pressed is set while toggle is off', async () => {
    const screen = render(html`<forge-icon-button pressed>${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IIconButtonComponent;

    expect(el.toggle).toBe(false);
    expect(el.pressed).toBe(true);
    expect(el.on).toBe(true);
    expect(el.hasAttribute(ICON_BUTTON_CONSTANTS.attributes.ARIA_PRESSED)).toBe(false);
  });

  it('should remove aria-pressed if pressed is set while toggle is off', async () => {
    const screen = render(html`<forge-icon-button pressed aria-pressed="true">${DEFAULT_ICON}</forge-icon-button>`);
    const el = screen.container.querySelector('forge-icon-button') as IIconButtonComponent;

    el.pressed = false;

    expect(el.toggle).toBe(false);
    expect(el.pressed).toBe(false);
    expect(el.on).toBe(false);
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
      const blurSpy = vi.fn();

      delegate.onBlur(blurSpy);
      delegate.element.focus();
      await userEvent.click(document.body);
      delegate.element.remove();

      expect(blurSpy).toHaveBeenCalledOnce();
    });
  });
});
