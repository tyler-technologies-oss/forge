import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { frame } from '../../core/utils/utils.js';
import { APP_BAR_CONSTANTS } from './app-bar-constants.js';
import type { IStateLayerComponent } from '../../state-layer/index.js';
import type { IFocusIndicatorComponent } from '../../focus-indicator/index.js';
import type { IAppBarComponent } from './app-bar.js';

import './app-bar.js';

declare global {
  interface Window {
    forgeAppBarAnchorTest?: () => void;
  }
}

describe('App Bar', () => {
  it('should initialize', async () => {
    const screen = render(html`<forge-app-bar></forge-app-bar>`);
    const el = screen.container.querySelector('forge-app-bar') as IAppBarComponent;

    expect(el.shadowRoot).not.toBeNull();
  });

  it('should be accessible', async () => {
    const screen = render(html`<forge-app-bar title-text="Test"></forge-app-bar>`);
    const el = screen.container.querySelector('forge-app-bar') as IAppBarComponent;

    await expect(el).toBeAccessible();
  });

  it('should not have title element if no title text is set', async () => {
    const screen = render(html`<forge-app-bar></forge-app-bar>`);
    const el = screen.container.querySelector('forge-app-bar') as IAppBarComponent;

    const titleEl = getTitleEl(el);
    expect(el.titleText).toBe('');
    expect(titleEl).toBeNull();
  });

  it('should set title', async () => {
    const screen = render(html`<forge-app-bar title-text="Test"></forge-app-bar>`);
    const el = screen.container.querySelector('forge-app-bar') as IAppBarComponent;

    const titleEl = getTitleEl(el);
    expect(el.titleText).toBe('Test');
    expect(titleEl).toBeTruthy();
    expect(titleEl.innerText).toBe('Test');
  });

  it('should set title as slot', async () => {
    const screen = render(html`<forge-app-bar><h2 slot="title">Test</h2></forge-app-bar>`);
    const el = screen.container.querySelector('forge-app-bar') as IAppBarComponent;

    const titleEl = getTitleEl(el);

    expect(el.titleText).toBe('');
    expect(titleEl).toBeNull();
    await expect(el).toBeAccessible();
  });

  it('should set elevation', async () => {
    const screen = render(html`<forge-app-bar elevation="raised"></forge-app-bar>`);
    const el = screen.container.querySelector('forge-app-bar') as IAppBarComponent;

    expect(el.elevation).toBe('raised');
    expect(el.getAttribute(APP_BAR_CONSTANTS.attributes.ELEVATION)).toBe('raised');

    el.elevation = 'none';

    expect(el.elevation).toBe('none');
    expect(el.getAttribute(APP_BAR_CONSTANTS.attributes.ELEVATION)).toBe('none');
  });

  it('should set theme', async () => {
    const screen = render(html`<forge-app-bar theme="white"></forge-app-bar>`);
    const el = screen.container.querySelector('forge-app-bar') as IAppBarComponent;

    expect(el.theme).toBe('white');
    expect(el.getAttribute(APP_BAR_CONSTANTS.attributes.THEME)).toBe('white');

    el.theme = '';

    expect(el.theme).toBe('');
    expect(el.hasAttribute(APP_BAR_CONSTANTS.attributes.THEME)).toBe(false);
  });

  it('should set href', async () => {
    const screen = render(html`<forge-app-bar href="javascript: void(0);" title-text="Test"></forge-app-bar>`);
    const el = screen.container.querySelector('forge-app-bar') as IAppBarComponent;

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
    const el = screen.container.querySelector('forge-app-bar') as IAppBarComponent;

    let anchorEl = getAnchorEl(el);
    expect(el.target).toBe('_blank');
    expect(el.getAttribute(APP_BAR_CONSTANTS.attributes.TARGET)).toBe('_blank');
    expect(anchorEl.target).toBe('_blank');

    el.target = '';
    anchorEl = getAnchorEl(el);

    expect(el.target).toBe('');
    expect(el.hasAttribute(APP_BAR_CONSTANTS.attributes.TARGET)).toBe(false);
    expect(anchorEl.target).toBe('');
  });

  it('should set center section visibility', async () => {
    const screen = render(html`<forge-app-bar></forge-app-bar>`);
    const el = screen.container.querySelector('forge-app-bar') as IAppBarComponent;

    const centerEl = getCenterEl(el);
    expect(centerEl.style.display).toBe('none');
    expect(getRootEl(el).classList.contains(APP_BAR_CONSTANTS.classes.NO_CENTER)).toBe(true);

    const slottedCenterEl = document.createElement('div');
    slottedCenterEl.slot = 'center';
    el.appendChild(slottedCenterEl);

    await frame();

    expect(centerEl.style.display).toBe('');
    expect(getRootEl(el).classList.contains(APP_BAR_CONSTANTS.classes.NO_CENTER)).toBe(false);
  });

  it('should dispatch navigate event', async () => {
    const screen = render(html`<forge-app-bar href="javascript: void(0);"></forge-app-bar>`);
    const el = screen.container.querySelector('forge-app-bar') as IAppBarComponent;
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
    const el = screen.container.querySelector('forge-app-bar') as IAppBarComponent;
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
    const el = screen.container.querySelector('forge-app-bar') as IAppBarComponent;

    const defaultStyle = getComputedStyle(el);
    expect(defaultStyle.getPropertyValue('--forge-theme-primary')).toBe('#ffffff');

    expect(el.themeMode).toBe('inherit');
    expect(el.hasAttribute(APP_BAR_CONSTANTS.attributes.THEME_MODE)).toBe(false);

    el.themeMode = 'scoped';

    const noGlobalStyle = getComputedStyle(el);
    expect(noGlobalStyle.getPropertyValue('--forge-theme-primary')).toBe('');

    expect(el.themeMode).toBe('scoped');
    expect(el.getAttribute(APP_BAR_CONSTANTS.attributes.THEME_MODE)).toBe('scoped');
  });

  function getRootEl(el: IAppBarComponent): HTMLElement {
    return el.shadowRoot?.firstElementChild as HTMLElement;
  }

  function getTitleEl(el: IAppBarComponent): HTMLHeadingElement {
    return el.shadowRoot?.querySelector('h1') as HTMLHeadingElement;
  }

  function getAnchorEl(el: IAppBarComponent): HTMLAnchorElement {
    return el.shadowRoot?.querySelector('a') as HTMLAnchorElement;
  }

  function getCenterEl(el: IAppBarComponent): HTMLElement {
    return el.shadowRoot?.querySelector(APP_BAR_CONSTANTS.selectors.CENTER_SECTION) as HTMLElement;
  }

  function getStateLayer(el: IAppBarComponent): IStateLayerComponent {
    return el.shadowRoot?.querySelector('forge-state-layer') as IStateLayerComponent;
  }

  function getFocusIndicator(el: IAppBarComponent): IFocusIndicatorComponent {
    return el.shadowRoot?.querySelector('forge-focus-indicator') as IFocusIndicatorComponent;
  }
});
