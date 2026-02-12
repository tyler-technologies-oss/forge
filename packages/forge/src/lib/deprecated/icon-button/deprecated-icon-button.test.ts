import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { tylIconForgeLogo } from '@tylertech/tyler-icons';
import { frame } from '../../core/utils/utils.js';
import type { IStateLayerComponent } from '../../state-layer/index.js';
import type { IFocusIndicatorComponent } from '../../focus-indicator/index.js';
import { DeprecatedIconButtonComponentDelegate } from './deprecated-icon-button-component-delegate.js';
import { DeprecatedIconButtonComponent, IDeprecatedIconButtonComponent } from './deprecated-icon-button.js';
import { DEPRECATED_ICON_BUTTON_CONSTANTS } from './deprecated-icon-button-constants.js';
import { IconRegistry } from '../../icon/icon-registry.js';

import './deprecated-icon-button.js';

describe('Deprecated Icon Button', () => {
  beforeAll(() => {
    IconRegistry.define(tylIconForgeLogo);
  });

  it('should initialize', async () => {
    const el = await createFixture();

    const stateLayer = getStateLayer(el);
    const focusIndicator = getFocusIndicator(el);

    expect(el.shadowRoot).not.toBeNull();
    expect(stateLayer.disabled).toBe(false);
    expect(focusIndicator).toBeTruthy();
  });

  it('should be accessible', async () => {
    const el = await createFixture({ ariaLabel: 'Test label' });

    await expect(el).toBeAccessible();
  });

  it('should use anchor element', async () => {
    const screen = render(html`
      <forge-deprecated-icon-button>
        <a href="javascript: void(0);" aria-label="Navigate somewhere">
          <forge-icon name="forge_logo"></forge-icon>
        </a>
      </forge-deprecated-icon-button>
    `);
    const el = screen.container.querySelector('forge-deprecated-icon-button') as IDeprecatedIconButtonComponent;

    await expect(el).toBeAccessible();
  });

  it('should set disabled', async () => {
    const el = await createFixture({ disabled: true });

    expect(el.disabled).toBe(true);
    expect(el.hasAttribute(DEPRECATED_ICON_BUTTON_CONSTANTS.attributes.DISABLED)).toBe(true);

    el.disabled = false;

    expect(el.disabled).toBe(false);
    expect(el.hasAttribute(DEPRECATED_ICON_BUTTON_CONSTANTS.attributes.DISABLED)).toBe(false);
  });

  it('should wait to initialize until child button is available', async () => {
    const screen = render(html`<forge-deprecated-icon-button></forge-deprecated-icon-button>`);
    const el = screen.container.querySelector('forge-deprecated-icon-button') as IDeprecatedIconButtonComponent;

    const stateLayer = getStateLayer(el);
    const focusIndicator = getFocusIndicator(el);

    expect(stateLayer.targetElement).toBeNull();
    expect(focusIndicator.targetElement).toBeUndefined();

    const button = document.createElement('button');
    el.appendChild(button);

    const icon = document.createElement('forge-icon');
    icon.name = 'forge_logo';
    button.appendChild(icon);

    await frame();

    expect(stateLayer.targetElement).toBe(button);
    expect(focusIndicator.targetElement).toBe(button);
  });

  it('should wait to initialize until child anchor is available', async () => {
    const screen = render(html`<forge-deprecated-icon-button></forge-deprecated-icon-button>`);
    const el = screen.container.querySelector('forge-deprecated-icon-button') as IDeprecatedIconButtonComponent;

    const stateLayer = getStateLayer(el);
    const focusIndicator = getFocusIndicator(el);

    expect(stateLayer.targetElement).toBeNull();
    expect(focusIndicator.targetElement).toBeUndefined();

    const anchor = document.createElement('a');
    el.appendChild(anchor);

    const icon = document.createElement('forge-icon');
    icon.name = 'forge_logo';
    anchor.appendChild(icon);

    await frame();

    expect(stateLayer.targetElement).toBe(anchor);
    expect(focusIndicator.targetElement).toBe(anchor);
  });

  it('should dynamically swap button', async () => {
    const el = await createFixture();

    const stateLayer = getStateLayer(el);
    const focusIndicator = getFocusIndicator(el);

    expect(stateLayer.targetElement).toBe(el.querySelector('button'));
    expect(focusIndicator.targetElement).toBe(el.querySelector('button'));

    el.querySelector('button')?.remove();

    const anchor = document.createElement('a');
    el.appendChild(anchor);

    const icon = document.createElement('forge-icon');
    icon.name = 'forge_logo';
    anchor.appendChild(icon);

    await frame();

    expect(stateLayer.targetElement).toBe(anchor);
    expect(focusIndicator.targetElement).toBe(anchor);
  });

  it('should detect disabled state from button when initialized', async () => {
    const screen = render(html`
      <forge-deprecated-icon-button>
        <button type="button" disabled>Button</button>
      </forge-deprecated-icon-button>
    `);
    const el = screen.container.querySelector('forge-deprecated-icon-button') as IDeprecatedIconButtonComponent;

    expect(el.disabled).toBe(true);
    expect(el.hasAttribute(DEPRECATED_ICON_BUTTON_CONSTANTS.attributes.DISABLED)).toBe(true);
  });

  it('should sync disabled state from button', async () => {
    const el = await createFixture();

    const buttonEl = el.querySelector('button') as HTMLButtonElement;
    buttonEl.disabled = true;

    await frame();

    expect(el.disabled).toBe(true);
    expect(el.hasAttribute(DEPRECATED_ICON_BUTTON_CONSTANTS.attributes.DISABLED)).toBe(true);
  });

  it('should play state layer animation when pressing enter key', async () => {
    const el = await createFixture();

    const stateLayer = getStateLayer(el);
    const playAnimationSpy = vi.spyOn(stateLayer, 'playAnimation');

    el.focus();
    await userEvent.keyboard('{Enter}');

    expect(playAnimationSpy).toHaveBeenCalledOnce();
  });

  it('should play state layer animation when pressing space key', async () => {
    const el = await createFixture();

    const stateLayer = getStateLayer(el);
    const playAnimationSpy = vi.spyOn(stateLayer, 'playAnimation');

    el.focus();
    await userEvent.keyboard(' ');

    expect(playAnimationSpy).toHaveBeenCalledOnce();
  });

  it('should not initialize if invalid child is element slotted in', async () => {
    const screen = render(html`
      <forge-deprecated-icon-button>
        <div>
          <forge-icon name="forge_logo"></forge-icon>
        </div>
      </forge-deprecated-icon-button>
    `);
    const el = screen.container.querySelector('forge-deprecated-icon-button') as IDeprecatedIconButtonComponent;

    const stateLayer = getStateLayer(el);
    const focusIndicator = getFocusIndicator(el);

    expect(stateLayer.targetElement).toBeNull();
    expect(focusIndicator.targetElement).toBeUndefined();
  });

  it('should toggle icons', async () => {
    const screen = render(html`
      <forge-deprecated-icon-button toggle>
        <button type="button">
          <forge-icon name="forge_logo" forge-icon-button-on></forge-icon>
          <forge-icon name="forge_logo"></forge-icon>
        </button>
      </forge-deprecated-icon-button>
    `);
    const el = screen.container.querySelector('forge-deprecated-icon-button') as IDeprecatedIconButtonComponent;

    const onIcon = el.querySelector(`forge-icon[${DEPRECATED_ICON_BUTTON_CONSTANTS.attributes.ON_ICON}]`) as HTMLElement;
    const offIcon = el.querySelector(`forge-icon:not([${DEPRECATED_ICON_BUTTON_CONSTANTS.attributes.ON_ICON}])`) as HTMLElement;

    expect(el.toggle).toBe(true);
    expect(el.hasAttribute(DEPRECATED_ICON_BUTTON_CONSTANTS.attributes.TOGGLE)).toBe(true);
    expect(el.isOn).toBe(false);
    expect(el.hasAttribute(DEPRECATED_ICON_BUTTON_CONSTANTS.attributes.IS_ON)).toBe(false);
    expect(onIcon.hidden).toBe(true);
    expect(offIcon.hidden).toBe(false);

    el.isOn = true;

    expect(el.isOn).toBe(true);
    expect(el.hasAttribute(DEPRECATED_ICON_BUTTON_CONSTANTS.attributes.IS_ON)).toBe(true);
    expect(onIcon.hidden).toBe(false);
    expect(offIcon.hidden).toBe(true);
  });

  it('should toggle when clicking button', async () => {
    const screen = render(html`
      <forge-deprecated-icon-button toggle>
        <button type="button">
          <forge-icon name="forge_logo" forge-icon-button-on></forge-icon>
          <forge-icon name="forge_logo"></forge-icon>
        </button>
      </forge-deprecated-icon-button>
    `);
    const el = screen.container.querySelector('forge-deprecated-icon-button') as IDeprecatedIconButtonComponent;

    const onIcon = el.querySelector(`forge-icon[${DEPRECATED_ICON_BUTTON_CONSTANTS.attributes.ON_ICON}]`) as HTMLElement;
    const offIcon = el.querySelector(`forge-icon:not([${DEPRECATED_ICON_BUTTON_CONSTANTS.attributes.ON_ICON}])`) as HTMLElement;
    const buttonElement = el.querySelector('button') as HTMLButtonElement;

    const toggleSpy = vi.fn();
    el.addEventListener(DEPRECATED_ICON_BUTTON_CONSTANTS.events.TOGGLE, toggleSpy);

    expect(el.isOn).toBe(false);
    expect(el.hasAttribute(DEPRECATED_ICON_BUTTON_CONSTANTS.attributes.IS_ON)).toBe(false);
    expect(onIcon.hidden).toBe(true);
    expect(offIcon.hidden).toBe(false);

    await userEvent.click(buttonElement);

    expect(toggleSpy).toHaveBeenCalledOnce();
    expect(el.isOn).toBe(true);
    expect(el.hasAttribute(DEPRECATED_ICON_BUTTON_CONSTANTS.attributes.IS_ON)).toBe(true);
    expect(onIcon.hidden).toBe(false);
    expect(offIcon.hidden).toBe(true);
  });

  it('should set density-level', async () => {
    const screen = render(html`
      <forge-deprecated-icon-button density-level="3">
        <button type="button">
          <forge-icon name="forge_logo"></forge-icon>
        </button>
      </forge-deprecated-icon-button>
    `);
    const el = screen.container.querySelector('forge-deprecated-icon-button') as IDeprecatedIconButtonComponent;

    expect(el.densityLevel).toBe(3);
    expect(el.hasAttribute(DEPRECATED_ICON_BUTTON_CONSTANTS.attributes.DENSITY_LEVEL)).toBe(true);
  });

  describe('DeprecatedIconButtonComponentDelegate', () => {
    it('should create button with icon via delegate', async () => {
      const delegate = new DeprecatedIconButtonComponentDelegate({ options: { iconName: 'forge_logo' } });

      expect(delegate.element).toBeInstanceOf(DeprecatedIconButtonComponent);
      expect(delegate.buttonElement).toBeTruthy();
      expect(delegate.iconElement).toBeTruthy();
      expect(delegate.iconElement?.name).toBe('forge_logo');
    });

    it('should call click listener via delegate', async () => {
      const delegate = new DeprecatedIconButtonComponentDelegate();
      document.body.appendChild(delegate.element);
      const clickSpy = vi.fn();

      delegate.onClick(clickSpy);
      await userEvent.click(delegate.buttonElement!);
      delegate.element.remove();

      expect(clickSpy).toHaveBeenCalledOnce();
    });

    it('should call focus listener via delegate', async () => {
      const delegate = new DeprecatedIconButtonComponentDelegate();
      document.body.appendChild(delegate.element);
      const focusSpy = vi.fn();

      delegate.onFocus(focusSpy);
      await userEvent.click(delegate.buttonElement!);
      delegate.element.remove();

      expect(focusSpy).toHaveBeenCalledOnce();
    });

    it('should call blur listener via delegate', async () => {
      const delegate = new DeprecatedIconButtonComponentDelegate();
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
    const el = await createFixture({ ariaLabel: 'Test label' });

    await expect(el).toBeAccessible();
  });

  it('should be accessible with aria-labelledby', async () => {
    const screen = render(html`
      <div>
        <span id="test-label">Test label</span>
        <forge-deprecated-icon-button>
          <button type="button" aria-labelledby="test-label">
            <forge-icon name="forge_logo"></forge-icon>
          </button>
        </forge-deprecated-icon-button>
      </div>
    `);
    const button = screen.container.querySelector('forge-deprecated-icon-button') as IDeprecatedIconButtonComponent;

    await expect(button).toBeAccessible();
  });
});

interface FixtureConfig {
  disabled?: boolean;
  ariaLabel?: string;
}

async function createFixture({ disabled, ariaLabel }: FixtureConfig = {}): Promise<IDeprecatedIconButtonComponent> {
  const screen = render(html`
    <forge-deprecated-icon-button ?disabled=${disabled}>
      <button type="button" aria-label=${ariaLabel ?? 'Icon button'}>
        <forge-icon name="forge_logo"></forge-icon>
      </button>
    </forge-deprecated-icon-button>
  `);
  return screen.container.querySelector('forge-deprecated-icon-button') as IDeprecatedIconButtonComponent;
}

function getStateLayer(btn: IDeprecatedIconButtonComponent): IStateLayerComponent {
  return btn.shadowRoot?.querySelector('forge-state-layer') as IStateLayerComponent;
}

function getFocusIndicator(btn: IDeprecatedIconButtonComponent): IFocusIndicatorComponent {
  return btn.shadowRoot?.querySelector('forge-focus-indicator') as IFocusIndicatorComponent;
}
