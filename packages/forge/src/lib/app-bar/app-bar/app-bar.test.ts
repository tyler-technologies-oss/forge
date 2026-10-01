import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { frame } from '../../core/utils/utils.js';
import { APP_BAR_CONSTANTS } from './app-bar-constants.js';
import type { IStateLayerComponent } from '../../state-layer/index.js';
import type { IFocusIndicatorComponent } from '../../focus-indicator/index.js';
import type { AppBarComponent } from './app-bar.js';

import './app-bar.js';

declare global {
  interface Window {
    forgeAppBarAnchorTest?: () => void;
  }
}

describe('App Bar', () => {
  it('should initialize', async () => {
    const screen = render(html`<forge-app-bar></forge-app-bar>`);
    const el = screen.container.querySelector('forge-app-bar') as AppBarComponent;

    expect(el.shadowRoot).not.toBeNull();
  });

  it('should be accessible', async () => {
    const screen = render(html`<forge-app-bar title-text="Test"></forge-app-bar>`);
    const el = screen.container.querySelector('forge-app-bar') as AppBarComponent;

    await expect(el).toBeAccessible();
  });

  it('should not have title element if no title text is set', async () => {
    const screen = render(html`<forge-app-bar></forge-app-bar>`);
    const el = screen.container.querySelector('forge-app-bar') as AppBarComponent;

    const titleEl = getTitleEl(el);
    expect(el.titleText).toBe('');
    expect(titleEl).toBeNull();
  });

  it('should set title', async () => {
    const screen = render(html`<forge-app-bar title-text="Test"></forge-app-bar>`);
    const el = screen.container.querySelector('forge-app-bar') as AppBarComponent;

    await el.updateComplete;

    const titleEl = getTitleEl(el);
    expect(el.titleText).toBe('Test');
    expect(titleEl).toBeTruthy();
    expect(titleEl.innerText).toBe('Test');
  });

  it('should set title as slot', async () => {
    const screen = render(html`<forge-app-bar><h2 slot="title">Test</h2></forge-app-bar>`);
    const el = screen.container.querySelector('forge-app-bar') as AppBarComponent;

    const titleEl = getTitleEl(el);

    expect(el.titleText).toBe('');
    expect(titleEl).toBeNull();
    await expect(el).toBeAccessible();
  });

  it('should set elevation', async () => {
    const screen = render(html`<forge-app-bar elevation="raised"></forge-app-bar>`);
    const el = screen.container.querySelector('forge-app-bar') as AppBarComponent;

    expect(el.elevation).toBe('raised');
    expect(el.getAttribute(APP_BAR_CONSTANTS.attributes.ELEVATION)).toBe('raised');

    el.elevation = 'none';

    await el.updateComplete;

    expect(el.elevation).toBe('none');
    expect(el.getAttribute(APP_BAR_CONSTANTS.attributes.ELEVATION)).toBe('none');
  });

  it('should set theme', async () => {
    const screen = render(html`<forge-app-bar theme="white"></forge-app-bar>`);
    const el = screen.container.querySelector('forge-app-bar') as AppBarComponent;

    expect(el.theme).toBe('white');
    expect(el.getAttribute(APP_BAR_CONSTANTS.attributes.THEME)).toBe('white');

    el.theme = '';
    await el.updateComplete;

    expect(el.theme).toBe('');
    expect(el.hasAttribute(APP_BAR_CONSTANTS.attributes.THEME)).toBe(false);
  });

  it('should set href', async () => {
    const screen = render(html`<forge-app-bar href="javascript: void(0);" title-text="Test"></forge-app-bar>`);
    const el = screen.container.querySelector('forge-app-bar') as AppBarComponent;
    await el.updateComplete;

    let anchorEl = getAnchorEl(el);
    expect(el.href).toBe('javascript: void(0);');
    expect(el.getAttribute(APP_BAR_CONSTANTS.attributes.HREF)).toBe('javascript: void(0);');
    expect(anchorEl).toBeTruthy();
    expect(anchorEl.href).toBe('javascript: void(0);');
    expect(anchorEl.classList.contains(APP_BAR_CONSTANTS.classes.LOGO_TITLE_CONTAINER)).toBe(true);
    expect(getStateLayer(el)).toBeTruthy();
    expect(getFocusIndicator(el)).toBeTruthy();
    await expect(el).toBeAccessible();

    el.href = '';
    await el.updateComplete;
    anchorEl = getAnchorEl(el);
    const containerEl = el.shadowRoot?.querySelector(APP_BAR_CONSTANTS.selectors.LOGO_TITLE_CONTAINER) as HTMLElement;

    expect(el.href).toBe('');
    expect(el.hasAttribute(APP_BAR_CONSTANTS.attributes.HREF)).toBe(false);
    expect(containerEl).toBeTruthy();
    expect(anchorEl).toBeFalsy();
    expect(getStateLayer(el)).toBeFalsy();
    expect(getFocusIndicator(el)).toBeFalsy();
  });

  it('should set anchor target', async () => {
    const screen = render(html`<forge-app-bar href="javascript: void(0);" target="_blank"></forge-app-bar>`);
    const el = screen.container.querySelector('forge-app-bar') as AppBarComponent;
    await el.updateComplete;

    let anchorEl = getAnchorEl(el);
    expect(el.target).toBe('_blank');
    expect(el.getAttribute(APP_BAR_CONSTANTS.attributes.TARGET)).toBe('_blank');
    expect(anchorEl.target).toBe('_blank');

    el.target = '';
    await el.updateComplete;
    anchorEl = getAnchorEl(el);

    expect(el.target).toBe('');
    expect(el.hasAttribute(APP_BAR_CONSTANTS.attributes.TARGET)).toBe(false);
    expect(anchorEl.target).toBe('');
  });

  it('should set center section visibility', async () => {
    const screen = render(html`<forge-app-bar></forge-app-bar>`);
    const el = screen.container.querySelector('forge-app-bar') as AppBarComponent;
    await el.updateComplete;
    await frame();

    const centerEl = getCenterEl(el);
    expect(centerEl.style.display).toBe('none');
    expect(getRootEl(el).classList.contains(APP_BAR_CONSTANTS.classes.NO_CENTER)).toBe(true);

    const slottedCenterEl = document.createElement('div');
    slottedCenterEl.slot = 'center';
    el.appendChild(slottedCenterEl);

    await el.updateComplete;
    await frame();

    expect(centerEl.style.display).toBe('');
    expect(getRootEl(el).classList.contains(APP_BAR_CONSTANTS.classes.NO_CENTER)).toBe(false);
  });

  it('should enter mobile state and show mobile-end when the title is truncated', async () => {
    const screen = render(html`
      <forge-app-bar title-text="A very long application title that cannot possibly fit" style="width: 200px">
        <button slot="end">End</button>
        <button slot="mobile-end">Mobile</button>
      </forge-app-bar>
    `);
    const el = screen.container.querySelector('forge-app-bar') as AppBarComponent;
    const spy = vi.fn();
    el.addEventListener('forge-app-bar-update', spy);

    await new Promise(resolve => setTimeout(resolve, 200));

    expect(el.matches(':state(mobile)')).toBe(true);
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls.at(-1)?.[0].detail).toEqual({ mobile: true, reason: 'title' });
    expect(el.querySelector<HTMLElement>('[slot=mobile-end]')?.getBoundingClientRect().width).toBeGreaterThan(0);
    expect((el.querySelector('[slot=end]') as HTMLElement).getBoundingClientRect().width).toBe(0);
  });

  it('should hide the center slot in mobile state when mobile-end has content', async () => {
    const screen = render(html`
      <forge-app-bar title-text="A very long application title that cannot possibly fit" style="width: 200px">
        <input slot="center" aria-label="Search" />
        <button slot="mobile-end">Mobile</button>
      </forge-app-bar>
    `);
    const el = screen.container.querySelector('forge-app-bar') as AppBarComponent;

    await new Promise(resolve => setTimeout(resolve, 200));

    expect(el.matches(':state(mobile)')).toBe(true);
    expect((el.querySelector('[slot=center]') as HTMLElement).getBoundingClientRect().width).toBe(0);
  });

  it('should keep the center slot visible in mobile state when nothing is slotted in mobile-end', async () => {
    const screen = render(html`
      <forge-app-bar title-text="A very long application title that cannot possibly fit" style="width: 200px">
        <input slot="center" aria-label="Search" />
      </forge-app-bar>
    `);
    const el = screen.container.querySelector('forge-app-bar') as AppBarComponent;

    await new Promise(resolve => setTimeout(resolve, 200));

    expect(el.matches(':state(mobile)')).toBe(true);
    expect((el.querySelector('[slot=center]') as HTMLElement).getBoundingClientRect().width).toBeGreaterThan(0);
  });

  it('should let the title use the freed space in mobile state', async () => {
    const screen = render(html`
      <forge-app-bar title-text="Community Services Directory" style="width: 640px">
        <input slot="center" aria-label="Search" />
        <button slot="end">End</button>
        <button slot="mobile-end">Mobile</button>
      </forge-app-bar>
    `);
    const el = screen.container.querySelector('forge-app-bar') as AppBarComponent;

    await new Promise(resolve => setTimeout(resolve, 200));

    const titleEl = getTitleEl(el) as HTMLElement;
    expect(el.matches(':state(mobile)')).toBe(true);
    expect(titleEl.scrollWidth).toBeLessThanOrEqual(titleEl.clientWidth);
  });

  it('should truncate the title in mobile state when it would overlap the mobile-end content', async () => {
    const screen = render(html`
      <forge-app-bar title-text="Community Services Directory" style="width: 220px">
        <button slot="mobile-end">Mobile</button>
      </forge-app-bar>
    `);
    const el = screen.container.querySelector('forge-app-bar') as AppBarComponent;

    await new Promise(resolve => setTimeout(resolve, 200));

    const titleEl = getTitleEl(el) as HTMLElement;
    const mobileEnd = el.querySelector('[slot=mobile-end]') as HTMLElement;
    expect(el.matches(':state(mobile)')).toBe(true);
    expect(titleEl.scrollWidth).toBeGreaterThan(titleEl.clientWidth);
    expect(titleEl.getBoundingClientRect().right).toBeLessThanOrEqual(mobileEnd.getBoundingClientRect().left);
  });

  it('should leave mobile state when the app bar becomes wide enough', async () => {
    const screen = render(html`
      <forge-app-bar title-text="Community Services Directory" style="width: 300px">
        <button slot="end">End</button>
        <button slot="mobile-end">Mobile</button>
      </forge-app-bar>
    `);
    const el = screen.container.querySelector('forge-app-bar') as AppBarComponent;
    await new Promise(resolve => setTimeout(resolve, 200));
    expect(el.matches(':state(mobile)')).toBe(true);

    el.style.width = '1200px';
    await new Promise(resolve => setTimeout(resolve, 200));

    expect(el.matches(':state(mobile)')).toBe(false);
  });

  it('should not enter mobile state when the title fits', async () => {
    const screen = render(html`<forge-app-bar title-text="Short" style="width: 800px"><button slot="mobile-end">Mobile</button></forge-app-bar>`);
    const el = screen.container.querySelector('forge-app-bar') as AppBarComponent;

    await new Promise(resolve => setTimeout(resolve, 200));

    expect(el.matches(':state(mobile)')).toBe(false);
    expect(el.querySelector<HTMLElement>('[slot=mobile-end]')?.getBoundingClientRect().width).toBe(0);
  });

  it('should keep the end slot visible in mobile state when nothing is slotted in mobile-end', async () => {
    const screen = render(
      html`<forge-app-bar title-text="A very long application title that cannot possibly fit" style="width: 200px"
        ><button slot="end">End</button></forge-app-bar
      >`
    );
    const el = screen.container.querySelector('forge-app-bar') as AppBarComponent;

    await new Promise(resolve => setTimeout(resolve, 200));

    expect(el.matches(':state(mobile)')).toBe(true);
    expect((el.querySelector('[slot=end]') as HTMLElement).getBoundingClientRect().width).toBeGreaterThan(0);
  });

  it('should report the search reason when end content does not fit alongside search', async () => {
    const screen = render(html`
      <forge-app-bar title-text="Hi" style="width: 400px">
        <forge-app-bar-search slot="center"><input type="search" aria-label="Search" /></forge-app-bar-search>
        <div slot="end" style="width: 300px; flex: none">End</div>
      </forge-app-bar>
    `);
    const el = screen.container.querySelector('forge-app-bar') as AppBarComponent;
    const spy = vi.fn();
    el.addEventListener('forge-app-bar-update', spy);

    await new Promise(resolve => setTimeout(resolve, 200));

    expect(spy.mock.calls.at(-1)?.[0].detail).toEqual({ mobile: true, reason: 'search' });
  });

  it('should dispatch navigate event', async () => {
    const screen = render(html`<forge-app-bar href="javascript: void(0);"></forge-app-bar>`);
    const el = screen.container.querySelector('forge-app-bar') as AppBarComponent;
    await el.updateComplete;
    const anchorEl = getAnchorEl(el);

    const navigateSpy = vi.fn();
    el.addEventListener(APP_BAR_CONSTANTS.events.NAVIGATE, navigateSpy);

    anchorEl.click();

    expect(navigateSpy).toHaveBeenCalledOnce();
  });

  it('should cancel navigate event', async () => {
    window.forgeAppBarAnchorTest = () => {};
    const testSpy = vi.spyOn(window as any, 'forgeAppBarAnchorTest');

    const screen = render(html`<forge-app-bar href="javascript: forgeAppBarAnchorTest();"></forge-app-bar>`);
    const el = screen.container.querySelector('forge-app-bar') as AppBarComponent;
    await el.updateComplete;
    const anchorEl = getAnchorEl(el);

    const navigateSpy = vi.fn(evt => evt.preventDefault());
    el.addEventListener(APP_BAR_CONSTANTS.events.NAVIGATE, navigateSpy);

    expect(window.forgeAppBarAnchorTest).toBeDefined();

    anchorEl.click();
    await frame();
    delete window.forgeAppBarAnchorTest;

    expect(navigateSpy).toHaveBeenCalledOnce();
    expect(window.forgeAppBarAnchorTest).toBeUndefined();
    expect(testSpy).not.toHaveBeenCalled();
  });

  it('should disable global theme token cascade when using scoped theme mode', async () => {
    const screen = render(html`<forge-app-bar></forge-app-bar>`);
    const el = screen.container.querySelector('forge-app-bar') as AppBarComponent;
    await el.updateComplete;
    const rootEl = getRootEl(el);

    const defaultStyle = getComputedStyle(rootEl);
    expect(defaultStyle.getPropertyValue('--forge-theme-primary')).toBe('#ffffff');

    expect(el.themeMode).toBe('inherit');
    expect(el.hasAttribute(APP_BAR_CONSTANTS.attributes.THEME_MODE)).toBe(false);

    el.themeMode = 'scoped';
    await el.updateComplete;

    const noGlobalStyle = getComputedStyle(rootEl);
    expect(noGlobalStyle.getPropertyValue('--forge-theme-primary')).toBe('');

    expect(el.themeMode).toBe('scoped');
    expect(el.getAttribute(APP_BAR_CONSTANTS.attributes.THEME_MODE)).toBe('scoped');
  });

  function getRootEl(el: AppBarComponent): HTMLElement {
    return el.shadowRoot?.firstElementChild as HTMLElement;
  }

  function getTitleEl(el: AppBarComponent): HTMLHeadingElement {
    return el.shadowRoot?.querySelector('h1') as HTMLHeadingElement;
  }

  function getAnchorEl(el: AppBarComponent): HTMLAnchorElement {
    return el.shadowRoot?.querySelector('a') as HTMLAnchorElement;
  }

  function getCenterEl(el: AppBarComponent): HTMLElement {
    return el.shadowRoot?.querySelector(APP_BAR_CONSTANTS.selectors.CENTER_SECTION) as HTMLElement;
  }

  function getStateLayer(el: AppBarComponent): IStateLayerComponent {
    return el.shadowRoot?.querySelector('forge-state-layer') as IStateLayerComponent;
  }

  function getFocusIndicator(el: AppBarComponent): IFocusIndicatorComponent {
    return el.shadowRoot?.querySelector('forge-focus-indicator') as IFocusIndicatorComponent;
  }
});
