import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { frame } from '../../core/utils/utils.js';
import type { IAppBarHelpButtonComponent } from './app-bar-help-button.js';
import type { IMenuComponent } from '../../menu/menu.js';
import type { IIconComponent } from '../../icon/icon.js';
import { MENU_CONSTANTS } from '../../menu/menu-constants.js';

import './app-bar-help-button.js';

describe('App Bar Help Button', () => {
  it('should be accessible', async () => {
    const screen = render(html`<forge-app-bar-help-button></forge-app-bar-help-button>`);
    const el = screen.container.querySelector('forge-app-bar-help-button') as IAppBarHelpButtonComponent;

    await expect(el).toBeAccessible();
  });

  it('should set menu options', async () => {
    const screen = render(html`<forge-app-bar-help-button></forge-app-bar-help-button>`);
    const el = screen.container.querySelector('forge-app-bar-help-button') as IAppBarHelpButtonComponent;
    const menuEl = el.querySelector(MENU_CONSTANTS.elementName) as IMenuComponent;

    expect(menuEl.options.length).toBe(0);

    el.options = [
      { label: 'one', value: '1' },
      { label: 'two', value: '2' },
      { label: 'three', value: '3' }
    ];

    expect(el.options.length).toBe(3);
    expect(menuEl.options.length).toBe(3);
  });

  it('should forward aria-label', async () => {
    const screen = render(html`<forge-app-bar-help-button aria-label="foo"></forge-app-bar-help-button>`);
    const el = screen.container.querySelector('forge-app-bar-help-button') as IAppBarHelpButtonComponent;
    const iconButtonEl = el.querySelector('forge-icon-button') as HTMLElement;

    expect(iconButtonEl.getAttribute('aria-label')).toBe('foo');
  });

  it('should remove internal aria-label if arial-label removed', async () => {
    const screen = render(html`<forge-app-bar-help-button aria-label="foo"></forge-app-bar-help-button>`);
    const el = screen.container.querySelector('forge-app-bar-help-button') as IAppBarHelpButtonComponent;
    const iconButtonEl = el.querySelector('forge-icon-button') as HTMLElement;

    expect(iconButtonEl.getAttribute('aria-label')).toBe('foo');

    el.removeAttribute('aria-label');
    await frame();

    expect(iconButtonEl.getAttribute('aria-label')).toBeNull();
  });

  it('should set icon', async () => {
    const screen = render(html`<forge-app-bar-help-button icon="test"></forge-app-bar-help-button>`);
    const el = screen.container.querySelector('forge-app-bar-help-button') as IAppBarHelpButtonComponent;
    const iconButtonEl = el.querySelector('forge-icon') as IIconComponent;

    expect(el.icon).toBe('test');
    expect(iconButtonEl.name).toBe('test');
  });

  it('should set icon dynamically', async () => {
    const screen = render(html`<forge-app-bar-help-button></forge-app-bar-help-button>`);
    const el = screen.container.querySelector('forge-app-bar-help-button') as IAppBarHelpButtonComponent;
    const iconButtonEl = el.querySelector('forge-icon') as IIconComponent;

    el.icon = 'test';

    expect(el.icon).toBe('test');
    expect(iconButtonEl.name).toBe('test');
  });
});
