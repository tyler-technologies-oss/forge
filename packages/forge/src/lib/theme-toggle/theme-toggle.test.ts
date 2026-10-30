import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
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

function stubMatchMediaWithChangeCallback(matches: boolean): {
  ref: { current: ((evt: MediaQueryListEvent) => void) | null };
  mediaQueryList: { matches: boolean };
} {
  const ref: { current: ((evt: MediaQueryListEvent) => void) | null } = { current: null };
  const mediaQueryList = {
    matches,
    addEventListener: (eventName: string, callback: (evt: MediaQueryListEvent) => void) => {
      if (eventName === 'change') {
        ref.current = callback;
      }
    },
    removeEventListener: vi.fn(),
    media: '',
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn()
  } as unknown as MediaQueryList;
  vi.spyOn(window, 'matchMedia').mockReturnValue(mediaQueryList);
  return { ref, mediaQueryList };
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

  it('should dispatch update event with the resolved light/dark theme when theme changes to system', async () => {
    stubPrefersColorScheme(true);
    localStorage.setItem('.forge-theme', 'light');
    const harness = await createFixture();
    const spy = vi.fn();

    harness.element.addEventListener('forge-theme-toggle-update', spy);
    await userEvent.click(harness.systemButton);

    expect(spy).toHaveBeenCalled();
    const event = spy.mock.calls[0][0] as CustomEvent;
    expect(event.detail.theme).toBe('system');
    expect(event.detail.resolvedTheme).toBe('dark');
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

  it('should fall back to system when local storage contains an invalid theme value', async () => {
    localStorage.setItem('.forge-theme', 'garbage');
    stubPrefersColorScheme(true);

    const harness = await createFixture();

    expect(harness.systemButton.hasAttribute('selected')).toBe(true);
    expect(harness.htmlElement.getAttribute('data-forge-theme')).toBe('dark');
  });

  it('should update the theme automatically when the OS color scheme preference changes while theme is system', async () => {
    localStorage.setItem('.forge-theme', 'system');
    const { ref, mediaQueryList } = stubMatchMediaWithChangeCallback(false);

    const harness = await createFixture();

    expect(harness.htmlElement.getAttribute('data-forge-theme')).toBe('light');

    const spy = vi.fn();
    harness.element.addEventListener('forge-theme-toggle-update', spy);

    mediaQueryList.matches = true;
    ref.current?.({ matches: true } as MediaQueryListEvent);
    await harness.element.updateComplete;

    expect(harness.htmlElement.getAttribute('data-forge-theme')).toBe('dark');
    expect(harness.systemButton.hasAttribute('selected')).toBe(true);

    expect(spy).toHaveBeenCalled();
    const event = spy.mock.calls[0][0] as CustomEvent;
    expect(event.detail.theme).toBe('system');
    expect(event.detail.resolvedTheme).toBe('dark');
  });

  it('should not react to OS color scheme preference changes when a theme has been explicitly selected', async () => {
    const { ref, mediaQueryList } = stubMatchMediaWithChangeCallback(false);

    const harness = await createFixture();

    await userEvent.click(harness.lightButton);

    expect(harness.htmlElement.getAttribute('data-forge-theme')).toBe('light');

    mediaQueryList.matches = true;
    ref.current?.({ matches: true } as MediaQueryListEvent);
    await harness.element.updateComplete;

    expect(harness.htmlElement.getAttribute('data-forge-theme')).toBe('light');
  });

  it('should use default labels when no label content is slotted', async () => {
    const harness = await createFixture();

    expect(harness.groupEl.getAttribute('aria-label')).toBe('Select a theme');
    expect(harness.lightButton.textContent?.trim()).toBe('Light');
    expect(harness.darkButton.textContent?.trim()).toBe('Dark');
    expect(harness.systemButton.textContent?.trim()).toBe('System');
  });

  it('should use a custom group aria label when the property is provided', async () => {
    const harness = await createFixture({ groupAriaLabel: 'Choose a theme' });

    expect(harness.groupEl.getAttribute('aria-label')).toBe('Choose a theme');
  });

  it('content should project into the light, dark, and system label slots', async () => {
    const harness = await createFixture({ lightLabel: 'Bright', darkLabel: 'Night', systemLabel: 'Auto' });

    expect(harness.lightLabelSlot.assignedNodes({ flatten: true })[0]?.textContent?.trim()).toBe('Bright');
    expect(harness.darkLabelSlot.assignedNodes({ flatten: true })[0]?.textContent?.trim()).toBe('Night');
    expect(harness.systemLabelSlot.assignedNodes({ flatten: true })[0]?.textContent?.trim()).toBe('Auto');
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

  public get groupEl(): HTMLElement {
    return getShadowElement(this.element, 'forge-button-toggle-group');
  }

  public get lightLabelSlot(): HTMLSlotElement {
    return getShadowElement(this.element, 'slot[name="light-label"]') as HTMLSlotElement;
  }

  public get darkLabelSlot(): HTMLSlotElement {
    return getShadowElement(this.element, 'slot[name="dark-label"]') as HTMLSlotElement;
  }

  public get systemLabelSlot(): HTMLSlotElement {
    return getShadowElement(this.element, 'slot[name="system-label"]') as HTMLSlotElement;
  }
}

interface ThemeToggleFixtureConfig {
  groupAriaLabel?: string;
  lightLabel?: string;
  darkLabel?: string;
  systemLabel?: string;
}

async function createFixture({ groupAriaLabel, lightLabel, darkLabel, systemLabel }: ThemeToggleFixtureConfig = {}): Promise<ThemeToggleHarness> {
  const screen = render(html`
    <forge-theme-toggle group-aria-label=${ifDefined(groupAriaLabel)}>
      <span slot="title">Theme</span>
      ${lightLabel ? html`<span slot="light-label">${lightLabel}</span>` : null} ${darkLabel ? html`<span slot="dark-label">${darkLabel}</span>` : null}
      ${systemLabel ? html`<span slot="system-label">${systemLabel}</span>` : null}
    </forge-theme-toggle>
  `);
  const el = screen.container.querySelector('forge-theme-toggle') as IThemeToggleComponent;
  await el.updateComplete;

  return new ThemeToggleHarness(el);
}
