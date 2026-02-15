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
});
