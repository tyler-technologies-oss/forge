import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { getShadowElement } from '@tylertech/forge-core';
import { TestHarness } from '../core/testing/test-harness.js';
import type { IButtonToggleComponent } from '../button-toggle/button-toggle/index.js';
import type { IThemeToggleComponent } from './theme-toggle.js';

import './theme-toggle.js';

function stubPrefersColorScheme(matches: boolean): void {
  vi.spyOn(window, 'matchMedia').mockReturnValue({
    matches,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    media: '',
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn()
  } as unknown as MediaQueryList);
}

describe('Theme Toggle', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('should contain shadow root', async () => {
    const harness = await createFixture();

    expect(harness.element.shadowRoot).not.toBeNull();
  });

  it('should dispatch update event when theme changes to light', async () => {
    const harness = await createFixture();
    const spy = vi.fn();

    harness.element.addEventListener('forge-theme-toggle-update', spy);
    await userEvent.click(harness.lightButton);

    expect(spy).toHaveBeenCalled();
  });

  it('should dispatch update event when theme changes to dark', async () => {
    const harness = await createFixture();
    const spy = vi.fn();

    harness.element.addEventListener('forge-theme-toggle-update', spy);
    await userEvent.click(harness.darkButton);

    expect(spy).toHaveBeenCalled();
  });

  it('should dispatch update event when theme changes to system', async () => {
    localStorage.setItem('.forge-theme', 'light');
    const harness = await createFixture();
    const spy = vi.fn();

    harness.element.addEventListener('forge-theme-toggle-update', spy);
    await userEvent.click(harness.systemButton);

    expect(spy).toHaveBeenCalled();
  });

  it('should update the HTML element with the appropriate data attribute value when theme changes to light', async () => {
    const harness = await createFixture();

    await userEvent.click(harness.lightButton);

    expect(harness.htmlElement.getAttribute('data-forge-theme')).toBe('light');
  });

  it('should update the HTML element with the appropriate data attribute value when theme changes to dark', async () => {
    const harness = await createFixture();

    await userEvent.click(harness.darkButton);

    expect(harness.htmlElement.getAttribute('data-forge-theme')).toBe('dark');
  });

  it('should set local storage when theme is set to light', async () => {
    const harness = await createFixture();

    await userEvent.click(harness.lightButton);

    expect(localStorage.getItem('.forge-theme')).toBe('light');
  });

  it('should set local storage when theme is set to dark', async () => {
    const harness = await createFixture();

    await userEvent.click(harness.darkButton);

    expect(localStorage.getItem('.forge-theme')).toBe('dark');
  });

  it('should detect prefers-color-scheme=dark and set data-forge-theme attr on html element to dark', async () => {
    stubPrefersColorScheme(true);

    const harness = await createFixture();

    expect(harness.systemButton.hasAttribute('selected')).toBe(true);
    expect(harness.htmlElement.getAttribute('data-forge-theme')).toBe('dark');
  });

  it('should detect prefers-color-scheme=light and set data-forge-theme attr on html element to light', async () => {
    stubPrefersColorScheme(false);

    const harness = await createFixture();

    expect(harness.systemButton.hasAttribute('selected')).toBe(true);
    expect(harness.htmlElement.getAttribute('data-forge-theme')).toBe('light');
  });

  it('should set local storage to light when clicking the light theme button toggle', async () => {
    const harness = await createFixture();

    await userEvent.click(harness.lightButton);

    expect(harness.lightButton.hasAttribute('selected')).toBe(true);
    expect(localStorage.getItem('.forge-theme')).toBe('light');
  });

  it('should set local storage to dark when clicking the dark theme button toggle', async () => {
    const harness = await createFixture();

    await userEvent.click(harness.darkButton);

    expect(harness.darkButton.hasAttribute('selected')).toBe(true);
    expect(localStorage.getItem('.forge-theme')).toBe('dark');
  });

  it('should set local storage to system when clicking the system theme button toggle', async () => {
    const harness = await createFixture();

    await userEvent.click(harness.systemButton);

    expect(harness.systemButton.hasAttribute('selected')).toBe(true);
    expect(localStorage.getItem('.forge-theme')).toBe('system');
  });

  it('should detect prefers-color-scheme and set dark theme when system is the local storage value', async () => {
    localStorage.setItem('.forge-theme', 'system');
    stubPrefersColorScheme(true);

    const harness = await createFixture();

    expect(harness.systemButton.hasAttribute('selected')).toBe(true);
    expect(harness.htmlElement.getAttribute('data-forge-theme')).toBe('dark');
  });

  it('should detect prefers-color-scheme and set light theme when system is the local storage value', async () => {
    localStorage.setItem('.forge-theme', 'system');
    stubPrefersColorScheme(false);

    const harness = await createFixture();

    expect(harness.systemButton.hasAttribute('selected')).toBe(true);
    expect(harness.htmlElement.getAttribute('data-forge-theme')).toBe('light');
  });
});

class ThemeToggleHarness extends TestHarness<IThemeToggleComponent> {
  public initElementRefs(): void {
    // Elements are queried lazily via getters below since they change based on component state.
  }

  public get htmlElement(): HTMLElement {
    return document.documentElement;
  }

  public get lightButton(): IButtonToggleComponent {
    return getShadowElement(this.element, '#light-button') as IButtonToggleComponent;
  }

  public get darkButton(): IButtonToggleComponent {
    return getShadowElement(this.element, '#dark-button') as IButtonToggleComponent;
  }

  public get systemButton(): IButtonToggleComponent {
    return getShadowElement(this.element, '#system-button') as IButtonToggleComponent;
  }
}

async function createFixture(): Promise<ThemeToggleHarness> {
  const screen = render(html`
    <forge-theme-toggle>
      <span slot="title">Theme</span>
    </forge-theme-toggle>
  `);
  const el = screen.container.querySelector('forge-theme-toggle') as IThemeToggleComponent;
  await el.updateComplete;

  return new ThemeToggleHarness(el);
}
