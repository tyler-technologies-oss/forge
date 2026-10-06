import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { BreadcrumbItemComponent } from './breadcrumb-item.js';

import '../breadcrumb/breadcrumb.js';
import './breadcrumb-item.js';

describe('Breadcrumb Item', () => {
  it('should instantiate shadow root', async () => {
    const screen = render(html`<forge-breadcrumb-item></forge-breadcrumb-item>`);
    const el = screen.container.querySelector('forge-breadcrumb-item') as BreadcrumbItemComponent;

    expect(el.shadowRoot).not.toBeNull();
  });

  it('should have listitem role', async () => {
    const screen = render(html`<forge-breadcrumb-item href="#">Home</forge-breadcrumb-item>`);

    await expect.element(screen.getByRole('listitem')).toBeInTheDocument();
  });

  it('should render a link with the href when not current', async () => {
    const screen = render(html`<forge-breadcrumb-item href="/home">Home</forge-breadcrumb-item>`);

    await expect.element(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/home');
  });

  it('should update link href when href property changes', async () => {
    const screen = render(html`<forge-breadcrumb-item href="/home">Home</forge-breadcrumb-item>`);
    const el = screen.container.querySelector('forge-breadcrumb-item') as BreadcrumbItemComponent;

    el.href = '/other';
    await el.updateComplete;

    await expect.element(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/other');
  });

  it('should not render a link when current', async () => {
    const screen = render(html`<forge-breadcrumb-item href="/home" current>Home</forge-breadcrumb-item>`);
    const el = screen.container.querySelector('forge-breadcrumb-item') as BreadcrumbItemComponent;
    await el.updateComplete;

    expect(screen.getByRole('link').elements()).toHaveLength(0);
    expect(el.shadowRoot?.querySelector('[aria-current="page"]')).not.toBeNull();
  });

  it('should restore link when current is removed', async () => {
    const screen = render(html`<forge-breadcrumb-item href="/home" current>Home</forge-breadcrumb-item>`);
    const el = screen.container.querySelector('forge-breadcrumb-item') as BreadcrumbItemComponent;

    el.current = false;
    await el.updateComplete;

    await expect.element(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
  });

  it('should be accessible', async () => {
    const screen = render(html`
      <forge-breadcrumb aria-label="Breadcrumb">
        <forge-breadcrumb-item href="#">Home</forge-breadcrumb-item>
      </forge-breadcrumb>
    `);
    const el = screen.container.querySelector('forge-breadcrumb') as HTMLElement;

    await expect(el).toBeAccessible();
  });
});
