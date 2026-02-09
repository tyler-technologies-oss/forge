import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { frame } from '../../core/utils/utils.js';
import type { IAppBarNotificationButtonComponent } from './app-bar-notification-button.js';
import type { IIconComponent } from '../../icon/index.js';
import type { IBadgeComponent } from '../../badge/index.js';

import './app-bar-notification-button.js';

describe('App Bar Notification Button', () => {
  it('should be accessible', async () => {
    const screen = render(html`<forge-app-bar-notification-button></forge-app-bar-notification-button>`);
    const el = screen.container.querySelector('forge-app-bar-notification-button') as IAppBarNotificationButtonComponent;

    await expect(el).toBeAccessible();
  });

  it('should forward aria-label', async () => {
    const screen = render(html`<forge-app-bar-notification-button aria-label="foo"></forge-app-bar-notification-button>`);
    const el = screen.container.querySelector('forge-app-bar-notification-button') as IAppBarNotificationButtonComponent;
    const iconButtonEl = el.querySelector('forge-icon-button') as HTMLElement;

    expect(iconButtonEl.getAttribute('aria-label')).toBe('foo');
  });

  it('should remove internal aria-label if aria-label removed', async () => {
    const screen = render(html`<forge-app-bar-notification-button aria-label="foo"></forge-app-bar-notification-button>`);
    const el = screen.container.querySelector('forge-app-bar-notification-button') as IAppBarNotificationButtonComponent;
    const iconButtonEl = el.querySelector('forge-icon-button') as HTMLElement;

    expect(iconButtonEl.getAttribute('aria-label')).toBe('foo');

    el.removeAttribute('aria-label');
    await frame();

    expect(iconButtonEl.getAttribute('aria-label')).toBeNull();
  });

  it('should reset internal aria-labelledby to tooltip id if external aria-labelledby removed', async () => {
    const screen = render(html`<forge-app-bar-notification-button aria-labelledby="foo"></forge-app-bar-notification-button>`);
    const el = screen.container.querySelector('forge-app-bar-notification-button') as IAppBarNotificationButtonComponent;
    const iconButtonEl = el.querySelector('forge-icon-button') as HTMLElement;
    const tooltipEl = el.querySelector('forge-tooltip') as HTMLElement;

    expect(iconButtonEl.getAttribute('aria-labelledby')).toBe('foo');

    el.removeAttribute('aria-labelledby');
    await frame();

    expect(iconButtonEl.getAttribute('aria-labelledby')).toBe(tooltipEl.id);
  });

  it('should set icon', async () => {
    const screen = render(html`<forge-app-bar-notification-button icon="test"></forge-app-bar-notification-button>`);
    const el = screen.container.querySelector('forge-app-bar-notification-button') as IAppBarNotificationButtonComponent;
    const iconButtonEl = el.querySelector('forge-icon') as IIconComponent;

    expect(iconButtonEl.name).toBe('test');
  });

  it('should set icon dynamically', async () => {
    const screen = render(html`<forge-app-bar-notification-button></forge-app-bar-notification-button>`);
    const el = screen.container.querySelector('forge-app-bar-notification-button') as IAppBarNotificationButtonComponent;
    const iconButtonEl = el.querySelector('forge-icon') as IIconComponent;

    el.icon = 'test';

    expect(iconButtonEl.name).toBe('test');
  });

  it('should show badge', async () => {
    const screen = render(html`<forge-app-bar-notification-button show-badge></forge-app-bar-notification-button>`);
    const el = screen.container.querySelector('forge-app-bar-notification-button') as IAppBarNotificationButtonComponent;
    const badgeEl = el.querySelector('forge-badge') as IBadgeComponent;

    expect(badgeEl).toBeTruthy();
    expect(badgeEl.hide).toBe(false);
    expect(badgeEl.textContent).toBe('0');
  });

  it('should show badge dynamically', async () => {
    const screen = render(html`<forge-app-bar-notification-button></forge-app-bar-notification-button>`);
    const el = screen.container.querySelector('forge-app-bar-notification-button') as IAppBarNotificationButtonComponent;
    const badgeEl = el.querySelector('forge-badge') as IBadgeComponent;

    el.showBadge = true;

    expect(badgeEl).toBeTruthy();
    expect(badgeEl.hide).toBe(false);
    expect(badgeEl.textContent).toBe('0');
  });

  it('should hide badge', async () => {
    const screen = render(html`<forge-app-bar-notification-button show-badge></forge-app-bar-notification-button>`);
    const el = screen.container.querySelector('forge-app-bar-notification-button') as IAppBarNotificationButtonComponent;

    el.showBadge = false;

    const badgeEl = el.querySelector('forge-badge') as IBadgeComponent;
    expect(badgeEl).toBeTruthy();
    expect(badgeEl.hide).toBe(true);
  });

  it('should show badge with count', async () => {
    const screen = render(html`<forge-app-bar-notification-button show-badge count="5"></forge-app-bar-notification-button>`);
    const el = screen.container.querySelector('forge-app-bar-notification-button') as IAppBarNotificationButtonComponent;
    const badgeEl = el.querySelector('forge-badge') as IBadgeComponent;

    expect(badgeEl.textContent).toBe('5');
  });

  it('should set badge count dynamically', async () => {
    const screen = render(html`<forge-app-bar-notification-button show-badge></forge-app-bar-notification-button>`);
    const el = screen.container.querySelector('forge-app-bar-notification-button') as IAppBarNotificationButtonComponent;
    const badgeEl = el.querySelector('forge-badge') as IBadgeComponent;

    el.count = 5;

    expect(badgeEl.textContent).toBe('5');
  });

  it('should show dot badge', async () => {
    const screen = render(html`<forge-app-bar-notification-button show-badge dot></forge-app-bar-notification-button>`);
    const el = screen.container.querySelector('forge-app-bar-notification-button') as IAppBarNotificationButtonComponent;
    const badgeEl = el.querySelector('forge-badge') as IBadgeComponent;

    expect(badgeEl.dot).toBe(true);
  });

  it('should set badge dot dynamically', async () => {
    const screen = render(html`<forge-app-bar-notification-button show-badge></forge-app-bar-notification-button>`);
    const el = screen.container.querySelector('forge-app-bar-notification-button') as IAppBarNotificationButtonComponent;
    const badgeEl = el.querySelector('forge-badge') as IBadgeComponent;

    el.dot = true;

    expect(badgeEl.dot).toBe(true);
  });

  it('should set badge theme', async () => {
    const screen = render(html`<forge-app-bar-notification-button show-badge theme="danger"></forge-app-bar-notification-button>`);
    const el = screen.container.querySelector('forge-app-bar-notification-button') as IAppBarNotificationButtonComponent;
    const badgeEl = el.querySelector('forge-badge') as IBadgeComponent;

    expect(badgeEl.getAttribute('theme')).toBe('danger');
  });

  it('should set badge theme dynamically', async () => {
    const screen = render(html`<forge-app-bar-notification-button show-badge></forge-app-bar-notification-button>`);
    const el = screen.container.querySelector('forge-app-bar-notification-button') as IAppBarNotificationButtonComponent;
    const badgeEl = el.querySelector('forge-badge') as IBadgeComponent;

    el.theme = 'danger';

    expect(badgeEl.getAttribute('theme')).toBe('danger');
  });

  it('should bubble click event', async () => {
    const screen = render(html`<forge-app-bar-notification-button></forge-app-bar-notification-button>`);
    const el = screen.container.querySelector('forge-app-bar-notification-button') as IAppBarNotificationButtonComponent;
    const clickSpy = vi.fn();
    el.addEventListener('click', clickSpy);

    el.click();

    expect(clickSpy).toHaveBeenCalledOnce();
  });
});
