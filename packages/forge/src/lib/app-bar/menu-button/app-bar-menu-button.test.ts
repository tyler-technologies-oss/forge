import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { frame } from '../../core/utils/utils.js';
import type { IAppBarMenuButtonComponent } from './app-bar-menu-button.js';
import type { IIconComponent } from '../../icon/index.js';

import './app-bar-menu-button.js';

describe('App Bar Menu Button', () => {
  it('should be accessible', async () => {
    const screen = render(html`<forge-app-bar-menu-button></forge-app-bar-menu-button>`);
    const el = screen.container.querySelector('forge-app-bar-menu-button') as IAppBarMenuButtonComponent;

    await expect(el).toBeAccessible();
  });

  it('should forward aria-label', async () => {
    const screen = render(html`<forge-app-bar-menu-button aria-label="foo"></forge-app-bar-menu-button>`);
    const el = screen.container.querySelector('forge-app-bar-menu-button') as IAppBarMenuButtonComponent;
    const iconButtonEl = el.querySelector('forge-icon-button') as HTMLElement;

    expect(iconButtonEl.getAttribute('aria-label')).toBe('foo');
  });

  it('should remove internal aria-label if aria-label removed', async () => {
    const screen = render(html`<forge-app-bar-menu-button aria-label="foo"></forge-app-bar-menu-button>`);
    const el = screen.container.querySelector('forge-app-bar-menu-button') as IAppBarMenuButtonComponent;
    const iconButtonEl = el.querySelector('forge-icon-button') as HTMLElement;

    expect(iconButtonEl.getAttribute('aria-label')).toBe('foo');

    el.removeAttribute('aria-label');
    await frame();

    expect(iconButtonEl.getAttribute('aria-label')).toBeNull();
  });

  it('should reset internal aria-labelledby to tooltip id if external aria-labelledby removed', async () => {
    const screen = render(html`<forge-app-bar-menu-button aria-labelledby="foo"></forge-app-bar-menu-button>`);
    const el = screen.container.querySelector('forge-app-bar-menu-button') as IAppBarMenuButtonComponent;
    const iconButtonEl = el.querySelector('forge-icon-button') as HTMLElement;
    const tooltipEl = el.querySelector('forge-tooltip') as HTMLElement;

    expect(iconButtonEl.getAttribute('aria-labelledby')).toBe('foo');

    el.removeAttribute('aria-labelledby');
    await frame();

    expect(iconButtonEl.getAttribute('aria-labelledby')).toBe(tooltipEl.id);
  });

  it('should set icon', async () => {
    const screen = render(html`<forge-app-bar-menu-button icon="test"></forge-app-bar-menu-button>`);
    const el = screen.container.querySelector('forge-app-bar-menu-button') as IAppBarMenuButtonComponent;
    const iconButtonEl = el.querySelector('forge-icon') as IIconComponent;

    expect(el.icon).toBe('test');
    expect(iconButtonEl.name).toBe('test');
  });

  it('should set icon dynamically', async () => {
    const screen = render(html`<forge-app-bar-menu-button></forge-app-bar-menu-button>`);
    const el = screen.container.querySelector('forge-app-bar-menu-button') as IAppBarMenuButtonComponent;
    const iconButtonEl = el.querySelector('forge-icon') as IIconComponent;

    el.icon = 'test';

    expect(el.icon).toBe('test');
    expect(iconButtonEl.name).toBe('test');
  });

  it('should bubble click event', async () => {
    const screen = render(html`<forge-app-bar-menu-button></forge-app-bar-menu-button>`);
    const el = screen.container.querySelector('forge-app-bar-menu-button') as IAppBarMenuButtonComponent;
    const clickSpy = vi.fn();
    el.addEventListener('click', clickSpy);

    el.click();

    expect(clickSpy).toHaveBeenCalledOnce();
  });

  it('should default expanded to false and reflect it only on menu icon button', async () => {
    const screen = render(html`<forge-app-bar-menu-button></forge-app-bar-menu-button>`);
    const el = screen.container.querySelector('forge-app-bar-menu-button') as IAppBarMenuButtonComponent;
    const iconButtonEl = el.querySelector('forge-icon-button') as HTMLElement;

    expect(el.expanded).toBe(false);
    expect(iconButtonEl.getAttribute('aria-expanded')).toBe('false');
    expect(el.hasAttribute('aria-expanded')).toBe(false);
  });

  it('should update aria-expanded on the menu icon button when expanded changes', async () => {
    const screen = render(html`<forge-app-bar-menu-button expanded></forge-app-bar-menu-button>`);
    const el = screen.container.querySelector('forge-app-bar-menu-button') as IAppBarMenuButtonComponent;
    const iconButtonEl = el.querySelector('forge-icon-button') as HTMLElement;

    expect(iconButtonEl.getAttribute('aria-expanded')).toBe('true');

    el.removeAttribute('expanded');
    await frame();

    expect(el.expanded).toBe(false);
    expect(iconButtonEl.getAttribute('aria-expanded')).toBe('false');
  });

  it('should reflect controls only on the menu icon button', async () => {
    const screen = render(html`<forge-app-bar-menu-button controls="nav-drawer"></forge-app-bar-menu-button>`);
    const el = screen.container.querySelector('forge-app-bar-menu-button') as IAppBarMenuButtonComponent;
    const iconButtonEl = el.querySelector('forge-icon-button') as HTMLElement;

    expect(el.controls).toBe('nav-drawer');
    expect(iconButtonEl.getAttribute('aria-controls')).toBe('nav-drawer');
    expect(el.hasAttribute('aria-controls')).toBe(false);

    el.removeAttribute('controls');
    await frame();

    expect(iconButtonEl.getAttribute('aria-controls')).toBeNull();
  });

  it('should default hasPopup to "menu" and reflect overrides only on the menu icon button', async () => {
    const screen = render(html`<forge-app-bar-menu-button></forge-app-bar-menu-button>`);
    const el = screen.container.querySelector('forge-app-bar-menu-button') as IAppBarMenuButtonComponent;
    const iconButtonEl = el.querySelector('forge-icon-button') as HTMLElement;

    expect(el.hasPopup).toBe('menu');
    expect(iconButtonEl.getAttribute('aria-haspopup')).toBe('menu');

    el.setAttribute('has-popup', 'dialog');
    await frame();

    expect(iconButtonEl.getAttribute('aria-haspopup')).toBe('dialog');
    expect(el.hasAttribute('aria-haspopup')).toBe(false);
  });
});
