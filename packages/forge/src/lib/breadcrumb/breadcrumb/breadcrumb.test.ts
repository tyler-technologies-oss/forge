import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { BreadcrumbComponent } from './breadcrumb.js';

import './breadcrumb.js';
import '../breadcrumb-item/breadcrumb-item.js';

describe('Breadcrumb', () => {
  it('should instantiate shadow root', async () => {
    const screen = render(html`<forge-breadcrumb></forge-breadcrumb>`);
    const el = screen.container.querySelector('forge-breadcrumb') as BreadcrumbComponent;

    expect(el.shadowRoot).not.toBeNull();
  });

  it('should have navigation role', async () => {
    const screen = render(html`<forge-breadcrumb></forge-breadcrumb>`);

    await expect.element(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('should render slotted items in a list', async () => {
    const screen = render(html`
      <forge-breadcrumb aria-label="Breadcrumb">
        <forge-breadcrumb-item href="#">Home</forge-breadcrumb-item>
        <forge-breadcrumb-item current>Current</forge-breadcrumb-item>
      </forge-breadcrumb>
    `);
    const el = screen.container.querySelector('forge-breadcrumb') as BreadcrumbComponent;
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('ul')).not.toBeNull();
    await expect.element(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByRole('listitem').elements()).toHaveLength(2);
  });

  it('should not render a separator on the last item', async () => {
    const screen = render(html`
      <forge-breadcrumb aria-label="Breadcrumb">
        <forge-breadcrumb-item href="#">Home</forge-breadcrumb-item>
        <forge-breadcrumb-item current>Current</forge-breadcrumb-item>
      </forge-breadcrumb>
    `);
    const items = Array.from(screen.container.querySelectorAll('forge-breadcrumb-item'));
    await Promise.all(items.map(item => item.updateComplete));
    const [first, last] = items.map(item => getComputedStyle(item.shadowRoot?.querySelector('div') as Element, '::after').display);

    expect(first).not.toBe('none');
    expect(last).toBe('none');
  });

  it('should be accessible', async () => {
    const screen = render(html`
      <forge-breadcrumb aria-label="Breadcrumb">
        <forge-breadcrumb-item href="#">Home</forge-breadcrumb-item>
        <forge-breadcrumb-item current>Current</forge-breadcrumb-item>
      </forge-breadcrumb>
    `);
    const el = screen.container.querySelector('forge-breadcrumb') as BreadcrumbComponent;

    await expect(el).toBeAccessible();
  });
});
