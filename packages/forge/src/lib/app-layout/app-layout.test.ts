import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { getShadowElement } from '@tylertech/forge-core';
import type { IAppBarComponent } from '../app-bar/app-bar/app-bar.js';
import type { IAppBarMenuButtonComponent } from '../app-bar/menu-button/app-bar-menu-button.js';
import type { IDialogComponent } from '../dialog/dialog.js';
import type { IMiniDrawerComponent } from '../drawer/mini-drawer/mini-drawer.js';
import type { AppLayoutBreakpointChangeEventData, AppLayoutDrawerChangeEventData } from './app-layout-constants.js';
import type { IAppLayoutComponent } from './app-layout.js';

import './app-layout.js';

describe('AppLayout', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should contain shadow root', async () => {
    const element = await createFixture();
    expect(element.shadowRoot).not.toBeNull();
  });

  it('should have expected default state', async () => {
    const element = await createFixture();
    expect(element.appTitle).toBe('');
    expect(element.breakpoint).toBe(960);
    expect(element.useMiniDrawer).toBe(false);
    expect(element.miniHover).toBe(false);
  });

  it('should initialize drawer as closed in constructor', async () => {
    const element = await createFixture({ hasNavigation: true });
    expect(element.matches(':state(drawer-closed)')).toBe(true);
    expect(element.matches(':state(drawer-open)')).toBe(false);
  });

  it('should define sub-component dependencies', async () => {
    await createFixture();
    expect(window.customElements.get('forge-scaffold')).toBeTruthy();
    expect(window.customElements.get('forge-dialog')).toBeTruthy();
    expect(window.customElements.get('forge-drawer')).toBeTruthy();
    expect(window.customElements.get('forge-mini-drawer')).toBeTruthy();
    expect(window.customElements.get('forge-icon-button')).toBeTruthy();
    expect(window.customElements.get('forge-icon')).toBeTruthy();
  });

  it('should set app title', async () => {
    const element = await createFixture({ appTitle: 'My Application' });
    expect(element.appTitle).toBe('My Application');
    expect(appBarElement(element)?.titleText).toBe('My Application');
  });

  it('should set app title via attribute', async () => {
    const element = await createFixture();
    element.setAttribute('app-title', 'Test App');
    await element.updateComplete;

    expect(element.appTitle).toBe('Test App');
    expect(appBarElement(element)?.titleText).toBe('Test App');
  });

  it('should set app title href', async () => {
    const element = await createFixture({ appTitleHref: 'https://example.com' });
    expect(element.appTitleHref).toBe('https://example.com');
    expect(appBarElement(element)?.href).toBe('https://example.com');
  });

  it('should set app title href via attribute', async () => {
    const element = await createFixture();
    element.setAttribute('app-title-href', 'https://test.com');
    await element.updateComplete;

    expect(element.appTitleHref).toBe('https://test.com');
    expect(appBarElement(element)?.href).toBe('https://test.com');
  });

  it('should not set href attribute on app bar when appTitleHref is undefined', async () => {
    const element = await createFixture({ appTitleHref: undefined });
    expect(element.appTitleHref).toBeUndefined();
    expect(appBarElement(element)?.hasAttribute('href')).toBe(false);
  });

  it('should set custom breakpoint', async () => {
    const element = await createFixture({ breakpoint: 1200 });
    expect(element.breakpoint).toBe(1200);
  });

  it('should set use mini drawer', async () => {
    const element = await createFixture({ useMiniDrawer: true });
    expect(element.useMiniDrawer).toBe(true);
  });

  it('should set use mini drawer via attribute', async () => {
    const element = await createFixture();
    element.setAttribute('use-mini-drawer', '');
    await element.updateComplete;

    expect(element.useMiniDrawer).toBe(true);
  });

  it('should set mini hover', async () => {
    const element = await createFixture({ miniHover: true });
    expect(element.miniHover).toBe(true);
  });

  it('should set mini hover via attribute', async () => {
    const element = await createFixture();
    element.setAttribute('mini-hover', '');
    await element.updateComplete;

    expect(element.miniHover).toBe(true);
  });

  it('should project content into the navigation slot', async () => {
    const element = await createFixture({ hasNavigation: true });
    const slot = getShadowElement(element, 'slot[name="navigation"]') as HTMLSlotElement;
    expect(slot.assignedNodes().length).toBeGreaterThanOrEqual(1);
  });

  it('should project content into the body slot', async () => {
    const element = await createFixture({ hasBodyContent: true });
    const slot = getShadowElement(element, 'slot[name="body"]') as HTMLSlotElement;
    expect(slot.assignedNodes().length).toBeGreaterThanOrEqual(1);
  });

  it('should project content without a slot attribute into the body slot by default', async () => {
    const element = await createFixture({}, html`<div id="default-content">Default Body Content</div>`);
    const defaultSlot = element.shadowRoot!.querySelector('slot:not([name])') as HTMLSlotElement;
    const assignedElements = defaultSlot.assignedElements({ flatten: true });

    expect(assignedElements.length).toBeGreaterThan(0);
    expect(assignedElements.some(el => el.id === 'default-content')).toBe(true);
  });

  it('should project content into the app-bar-logo slot', async () => {
    const element = await createFixture({ hasLogo: true });
    const slot = getShadowElement(element, 'slot[name="app-bar-logo"]') as HTMLSlotElement;
    expect(slot.assignedNodes().length).toBeGreaterThanOrEqual(1);
  });

  it('should project content into the app-bar-start slot', async () => {
    const element = await createFixture({ hasAppBarStart: true });
    const slot = getShadowElement(element, 'slot[name="app-bar-start"]') as HTMLSlotElement;
    expect(slot.assignedNodes().length).toBeGreaterThanOrEqual(1);
  });

  it('should project content into the app-bar-center slot', async () => {
    const element = await createFixture({ hasAppBarCenter: true });
    const slot = getShadowElement(element, 'slot[name="app-bar-center"]') as HTMLSlotElement;
    expect(slot.assignedNodes().length).toBeGreaterThanOrEqual(1);
  });

  it('should project content into the app-bar-end slot', async () => {
    const element = await createFixture({ hasAppBarEnd: true });
    const slot = getShadowElement(element, 'slot[name="app-bar-end"]') as HTMLSlotElement;
    expect(slot.assignedNodes().length).toBeGreaterThanOrEqual(1);
  });

  it('should have small state when below breakpoint', async () => {
    stubMatchMedia(false);
    const element = await createFixture({ breakpoint: 960 });
    expect(element.matches(':state(small)')).toBe(true);
    expect(element.matches(':state(large)')).toBe(false);
  });

  it('should have large state when above breakpoint', async () => {
    stubMatchMedia(true);
    const element = await createFixture({ breakpoint: 960 });
    expect(element.matches(':state(large)')).toBe(true);
    expect(element.matches(':state(small)')).toBe(false);
  });

  it('should return false from isLargeScreen getter when below breakpoint', async () => {
    stubMatchMedia(false);
    const element = await createFixture({ breakpoint: 960 });
    expect(element.isLargeScreen).toBe(false);
  });

  it('should return true from isLargeScreen getter when above breakpoint', async () => {
    stubMatchMedia(true);
    const element = await createFixture({ breakpoint: 960 });
    expect(element.isLargeScreen).toBe(true);
  });

  it('should have drawer-closed state by default on small screens', async () => {
    stubMatchMedia(false);
    const element = await createFixture({ hasNavigation: true });
    expect(element.matches(':state(drawer-closed)')).toBe(true);
    expect(element.matches(':state(drawer-open)')).toBe(false);
  });

  it('should render dialog on small screens when navigation content is present', async () => {
    stubMatchMedia(false);
    const element = await createFixture({ hasNavigation: true });
    expect(getShadowElement(element, 'forge-dialog')).toBeTruthy();
  });

  it('should render drawer on large screens with useMiniDrawer=false', async () => {
    stubMatchMedia(true);
    const element = await createFixture({ hasNavigation: true, useMiniDrawer: false });
    expect(getShadowElement(element, 'forge-drawer')).toBeTruthy();
    expect(getShadowElement(element, 'forge-mini-drawer')).toBeFalsy();
  });

  it('should render mini-drawer on large screens with useMiniDrawer=true', async () => {
    stubMatchMedia(true);
    const element = await createFixture({ hasNavigation: true, useMiniDrawer: true });
    expect(getShadowElement(element, 'forge-mini-drawer')).toBeTruthy();
    expect(getShadowElement(element, 'forge-drawer')).toBeFalsy();
  });

  it('should apply hover property to mini-drawer', async () => {
    stubMatchMedia(true);
    const element = await createFixture({ hasNavigation: true, useMiniDrawer: true, miniHover: true });
    const miniDrawer = getShadowElement(element, 'forge-mini-drawer') as IMiniDrawerComponent;
    expect(miniDrawer.hover).toBe(true);
  });

  it('should show menu button when drawer is closed', async () => {
    stubMatchMedia(false);
    const element = await createFixture({ hasNavigation: true });
    expect(menuButton(element)).toBeTruthy();
  });

  it('should toggle drawer when menu button is clicked', async () => {
    stubMatchMedia(false);
    const element = await createFixture({ hasNavigation: true });
    expect(element.matches(':state(drawer-closed)')).toBe(true);

    menuButton(element)?.click();
    await element.updateComplete;

    expect(element.matches(':state(drawer-open)')).toBe(true);
  });

  describe('closeDrawer', () => {
    it('should close the drawer when called on small screens', async () => {
      stubMatchMedia(false);
      const element = await createFixture({ hasNavigation: true });

      menuButton(element)?.click();
      await element.updateComplete;
      expect(element.matches(':state(drawer-open)')).toBe(true);

      element.closeDrawer();
      await element.updateComplete;

      expect(element.matches(':state(drawer-closed)')).toBe(true);
      expect(element.matches(':state(drawer-open)')).toBe(false);
    });

    it('should emit forge-app-layout-drawer-change event when closeDrawer is called', async () => {
      stubMatchMedia(false);
      const element = await createFixture({ hasNavigation: true });

      menuButton(element)?.click();
      await element.updateComplete;

      const spy = vi.fn();
      element.addEventListener('forge-app-layout-drawer-change', spy);

      element.closeDrawer();
      await element.updateComplete;

      expect(spy).toHaveBeenCalledOnce();
      const eventDetail = spy.mock.calls[0][0].detail as AppLayoutDrawerChangeEventData;
      expect(eventDetail.open).toBe(false);
    });

    it('should not emit event when closeDrawer is called but drawer is already closed', async () => {
      stubMatchMedia(false);
      const element = await createFixture({ hasNavigation: true });

      const spy = vi.fn();
      element.addEventListener('forge-app-layout-drawer-change', spy);

      element.closeDrawer();
      await element.updateComplete;

      expect(spy).not.toHaveBeenCalled();
    });

    it('should not close drawer when called on large screens', async () => {
      stubMatchMedia(true);
      const element = await createFixture({ hasNavigation: true });
      expect(element.matches(':state(drawer-open)')).toBe(true);

      const spy = vi.fn();
      element.addEventListener('forge-app-layout-drawer-change', spy);

      element.closeDrawer();
      await element.updateComplete;

      expect(element.matches(':state(drawer-open)')).toBe(true);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should close drawer when clicking element with data-forge-app-layout-close attribute', async () => {
      stubMatchMedia(false);
      const element = await createFixture({ hasNavigation: true, navigationWithCloseAttribute: true });

      menuButton(element)?.click();
      await element.updateComplete;
      expect(element.matches(':state(drawer-open)')).toBe(true);

      (element.querySelector('#nav-with-close') as HTMLElement).click();
      await element.updateComplete;

      expect(element.matches(':state(drawer-closed)')).toBe(true);
    });

    it('should emit forge-app-layout-drawer-change when clicking element with data-forge-app-layout-close', async () => {
      stubMatchMedia(false);
      const element = await createFixture({ hasNavigation: true, navigationWithCloseAttribute: true });

      menuButton(element)?.click();
      await element.updateComplete;

      const spy = vi.fn();
      element.addEventListener('forge-app-layout-drawer-change', spy);

      (element.querySelector('#nav-with-close') as HTMLElement).click();
      await element.updateComplete;

      expect(spy).toHaveBeenCalledOnce();
      const eventDetail = spy.mock.calls[0][0].detail as AppLayoutDrawerChangeEventData;
      expect(eventDetail.open).toBe(false);
    });

    it('should not close drawer when clicking element without data-forge-app-layout-close attribute', async () => {
      stubMatchMedia(false);
      const element = await createFixture({ hasNavigation: true, navigationWithCloseAttribute: true });

      menuButton(element)?.click();
      await element.updateComplete;
      expect(element.matches(':state(drawer-open)')).toBe(true);

      (element.querySelector('#nav-without-close') as HTMLElement).click();
      await element.updateComplete;

      expect(element.matches(':state(drawer-open)')).toBe(true);
    });
  });

  describe('events', () => {
    it('should emit forge-app-layout-drawer-change event when drawer opens', async () => {
      stubMatchMedia(false);
      const element = await createFixture({ hasNavigation: true });
      const spy = vi.fn();

      element.addEventListener('forge-app-layout-drawer-change', spy);
      menuButton(element)?.click();
      await element.updateComplete;

      expect(spy).toHaveBeenCalledOnce();
      const eventDetail = spy.mock.calls[0][0].detail as AppLayoutDrawerChangeEventData;
      expect(eventDetail.open).toBe(true);
    });

    it('should emit forge-app-layout-drawer-change event when drawer closes', async () => {
      stubMatchMedia(false);
      const element = await createFixture({ hasNavigation: true });

      menuButton(element)?.click();
      await element.updateComplete;

      const spy = vi.fn();
      element.addEventListener('forge-app-layout-drawer-change', spy);

      menuButton(element)?.click();
      await element.updateComplete;

      expect(spy).toHaveBeenCalledOnce();
      const eventDetail = spy.mock.calls[0][0].detail as AppLayoutDrawerChangeEventData;
      expect(eventDetail.open).toBe(false);
    });

    it('should emit forge-app-layout-breakpoint-change event when breakpoint is crossed', async () => {
      const mediaQueryCallback = stubMatchMediaWithChangeCallback(false);
      const element = await createFixture({ hasNavigation: true });
      const spy = vi.fn();

      element.addEventListener('forge-app-layout-breakpoint-change', spy);
      mediaQueryCallback.current?.({ matches: true } as MediaQueryListEvent);
      await element.updateComplete;

      expect(spy).toHaveBeenCalledOnce();
      const eventDetail = spy.mock.calls[0][0].detail as AppLayoutBreakpointChangeEventData;
      expect(eventDetail.breakpoint).toBe('large');
    });

    it('should emit forge-app-layout-breakpoint-change event with small when going below breakpoint', async () => {
      const mediaQueryCallback = stubMatchMediaWithChangeCallback(true);
      const element = await createFixture({ hasNavigation: true });
      const spy = vi.fn();

      element.addEventListener('forge-app-layout-breakpoint-change', spy);
      mediaQueryCallback.current?.({ matches: false } as MediaQueryListEvent);
      await element.updateComplete;

      expect(spy).toHaveBeenCalledOnce();
      const eventDetail = spy.mock.calls[0][0].detail as AppLayoutBreakpointChangeEventData;
      expect(eventDetail.breakpoint).toBe('small');
    });

    it('should have bubbles and composed set to true on drawer change event', async () => {
      stubMatchMedia(false);
      const element = await createFixture({ hasNavigation: true });
      const spy = vi.fn();

      element.addEventListener('forge-app-layout-drawer-change', spy);
      menuButton(element)?.click();
      await element.updateComplete;

      const event = spy.mock.calls[0][0] as CustomEvent;
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
    });

    it('should have bubbles and composed set to true on breakpoint change event', async () => {
      const mediaQueryCallback = stubMatchMediaWithChangeCallback(false);
      const element = await createFixture({ hasNavigation: true });
      const spy = vi.fn();

      element.addEventListener('forge-app-layout-breakpoint-change', spy);
      mediaQueryCallback.current?.({ matches: true } as MediaQueryListEvent);
      await element.updateComplete;

      const event = spy.mock.calls[0][0] as CustomEvent;
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
    });

    it('should reset drawer state when dialog is closed via forge-dialog-close event', async () => {
      stubMatchMedia(false);
      const element = await createFixture({ hasNavigation: true });

      menuButton(element)?.click();
      await element.updateComplete;
      expect(element.matches(':state(drawer-open)')).toBe(true);

      dialogElement(element)?.dispatchEvent(new CustomEvent('forge-dialog-close', { bubbles: true, composed: true }));
      await element.updateComplete;

      expect(element.matches(':state(drawer-closed)')).toBe(true);
      expect(element.matches(':state(drawer-open)')).toBe(false);
    });

    it('should emit forge-app-layout-drawer-change event when dialog is closed via forge-dialog-close', async () => {
      stubMatchMedia(false);
      const element = await createFixture({ hasNavigation: true });

      menuButton(element)?.click();
      await element.updateComplete;

      const spy = vi.fn();
      element.addEventListener('forge-app-layout-drawer-change', spy);

      dialogElement(element)?.dispatchEvent(new CustomEvent('forge-dialog-close', { bubbles: true, composed: true }));
      await element.updateComplete;

      expect(spy).toHaveBeenCalledOnce();
      const eventDetail = spy.mock.calls[0][0].detail as AppLayoutDrawerChangeEventData;
      expect(eventDetail.open).toBe(false);
    });

    it('should allow reopening dialog with single click after closing via forge-dialog-close', async () => {
      stubMatchMedia(false);
      const element = await createFixture({ hasNavigation: true });

      menuButton(element)?.click();
      await element.updateComplete;
      expect(element.matches(':state(drawer-open)')).toBe(true);

      dialogElement(element)?.dispatchEvent(new CustomEvent('forge-dialog-close', { bubbles: true, composed: true }));
      await element.updateComplete;
      expect(element.matches(':state(drawer-closed)')).toBe(true);

      menuButton(element)?.click();
      await element.updateComplete;
      expect(element.matches(':state(drawer-open)')).toBe(true);
    });
  });
});

function stubMatchMedia(matches: boolean): void {
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

function stubMatchMediaWithChangeCallback(matches: boolean): { current: ((evt: MediaQueryListEvent) => void) | null } {
  const ref: { current: ((evt: MediaQueryListEvent) => void) | null } = { current: null };
  vi.spyOn(window, 'matchMedia').mockReturnValue({
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
  } as unknown as MediaQueryList);
  return ref;
}

function appBarElement(element: IAppLayoutComponent): IAppBarComponent | null {
  return getShadowElement(element, 'forge-app-bar') as IAppBarComponent | null;
}

function dialogElement(element: IAppLayoutComponent): IDialogComponent | null {
  return getShadowElement(element, 'forge-dialog') as IDialogComponent | null;
}

function menuButton(element: IAppLayoutComponent): IAppBarMenuButtonComponent | null {
  return getShadowElement(element, 'forge-app-bar-menu-button') as IAppBarMenuButtonComponent | null;
}

interface AppLayoutFixtureConfig {
  appTitle?: string;
  appTitleHref?: string;
  breakpoint?: number;
  useMiniDrawer?: boolean;
  miniHover?: boolean;
  hasNavigation?: boolean;
  navigationWithCloseAttribute?: boolean;
  hasBodyContent?: boolean;
  hasLogo?: boolean;
  hasAppBarStart?: boolean;
  hasAppBarCenter?: boolean;
  hasAppBarEnd?: boolean;
}

async function createFixture(
  {
    appTitle = '',
    appTitleHref,
    breakpoint = 960,
    useMiniDrawer = false,
    miniHover = false,
    hasNavigation = false,
    navigationWithCloseAttribute = false,
    hasBodyContent = false,
    hasLogo = false,
    hasAppBarStart = false,
    hasAppBarCenter = false,
    hasAppBarEnd = false
  }: AppLayoutFixtureConfig = {},
  extraContent: ReturnType<typeof html> | '' = ''
): Promise<IAppLayoutComponent> {
  const navigationContent = navigationWithCloseAttribute
    ? html`
        <nav slot="navigation">
          <a id="nav-with-close" href="#" data-forge-app-layout-close>Home</a>
          <a id="nav-without-close" href="#">Settings</a>
        </nav>
      `
    : hasNavigation
      ? html`<nav slot="navigation">Navigation Content</nav>`
      : '';

  const screen = render(html`
    <forge-app-layout app-title=${appTitle} .appTitleHref=${appTitleHref} breakpoint=${breakpoint} ?use-mini-drawer=${useMiniDrawer} ?mini-hover=${miniHover}>
      ${extraContent} ${navigationContent} ${hasBodyContent ? html`<div slot="body">Body Content</div>` : ''}
      ${hasLogo ? html`<div slot="app-bar-logo">Logo</div>` : ''} ${hasAppBarStart ? html`<div slot="app-bar-start">Start Content</div>` : ''}
      ${hasAppBarCenter ? html`<div slot="app-bar-center">Center Content</div>` : ''} ${hasAppBarEnd ? html`<div slot="app-bar-end">End Content</div>` : ''}
    </forge-app-layout>
  `);
  const element = screen.container.querySelector('forge-app-layout') as IAppLayoutComponent;
  await element.updateComplete;

  return element;
}
