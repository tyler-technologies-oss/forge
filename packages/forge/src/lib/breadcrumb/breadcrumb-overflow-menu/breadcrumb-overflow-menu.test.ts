import { describe, it, expect } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { BreadcrumbOverflowMenuComponent } from './breadcrumb-overflow-menu.js';

import '../breadcrumb/breadcrumb.js';
import './breadcrumb-overflow-menu.js';
import '../breadcrumb-item/breadcrumb-item.js';

const template = html`
  <forge-breadcrumb-overflow-menu>
    <forge-breadcrumb-item href="#one">One</forge-breadcrumb-item>
    <forge-breadcrumb-item href="#two">Two</forge-breadcrumb-item>
  </forge-breadcrumb-overflow-menu>
`;

describe('Breadcrumb Overflow Menu', () => {
  it('should instantiate shadow root', async () => {
    const screen = render(html`<forge-breadcrumb-overflow-menu></forge-breadcrumb-overflow-menu>`);
    const el = screen.container.querySelector('forge-breadcrumb-overflow-menu') as BreadcrumbOverflowMenuComponent;

    expect(el.shadowRoot).not.toBeNull();
  });

  it('should render a button with an ellipsis icon', async () => {
    const screen = render(template);
    const el = screen.container.querySelector('forge-breadcrumb-overflow-menu') as BreadcrumbOverflowMenuComponent;
    await el.updateComplete;

    await expect.element(screen.getByRole('button', { name: 'More breadcrumbs' })).toBeInTheDocument();
    expect(el.shadowRoot?.querySelector('forge-icon-button forge-icon[name="more_horiz"]')).not.toBeNull();
  });

  it('should use tooltip slot content as the accessible name of the button', async () => {
    const screen = render(html`
      <forge-breadcrumb-overflow-menu>
        <span slot="tooltip">More pages</span>
        <forge-breadcrumb-item href="#one">One</forge-breadcrumb-item>
      </forge-breadcrumb-overflow-menu>
    `);

    await expect.element(screen.getByRole('button', { name: 'More pages' })).toBeInTheDocument();
  });

  it('should open popover with slotted items when button is clicked', async () => {
    const screen = render(template);

    await screen.getByRole('button', { name: 'More breadcrumbs' }).click();

    await expect.element(screen.getByRole('link', { name: 'One' })).toBeVisible();
    await expect.element(screen.getByRole('link', { name: 'Two' })).toBeVisible();
  });

  it('should set aria-expanded on the button when opened', async () => {
    const screen = render(template);
    const button = screen.getByRole('button', { name: 'More breadcrumbs' });

    await button.click();

    await expect.element(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('should close popover when focus moves outside of the menu', async () => {
    const screen = render(html`<div>${template}<button type="button">Outside</button></div>`);
    const button = screen.getByRole('button', { name: 'More breadcrumbs' });

    await button.click();
    await expect.element(button).toHaveAttribute('aria-expanded', 'true');

    await screen.getByRole('button', { name: 'Outside' }).click();

    await expect.element(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('should keep popover open when focus moves to a slotted item', async () => {
    const screen = render(template);
    const button = screen.getByRole('button', { name: 'More breadcrumbs' });

    await button.click();
    await userEvent.tab();

    expect(document.activeElement).toBe(screen.container.querySelector('forge-breadcrumb-item'));
    await expect.element(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('should keep popover open when focus moves between slotted items', async () => {
    const screen = render(template);
    const button = screen.getByRole('button', { name: 'More breadcrumbs' });
    const items = Array.from(screen.container.querySelectorAll('forge-breadcrumb-item'));

    await button.click();
    await userEvent.tab();
    expect(document.activeElement).toBe(items[0]);
    await userEvent.tab();

    expect(document.activeElement).toBe(items[1]);
    await expect.element(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('should close popover when a link is clicked', async () => {
    const screen = render(template);
    const button = screen.getByRole('button', { name: 'More breadcrumbs' });

    await button.click();
    await expect.element(button).toHaveAttribute('aria-expanded', 'true');
    const link = screen.getByRole('link', { name: 'One' });
    (link.element() as HTMLAnchorElement).focus();
    await userEvent.keyboard('{Enter}');

    await expect.element(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('should keep popover open when a non-link item is clicked', async () => {
    const screen = render(html`
      <forge-breadcrumb-overflow-menu>
        <forge-breadcrumb-item current>Current</forge-breadcrumb-item>
      </forge-breadcrumb-overflow-menu>
    `);
    const button = screen.getByRole('button', { name: 'More breadcrumbs' });

    await button.click();
    await screen.getByText('Current').click();

    await expect.element(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('should be accessible', async () => {
    const screen = render(html`<forge-breadcrumb aria-label="Breadcrumb">${template}</forge-breadcrumb>`);
    const el = screen.container.querySelector('forge-breadcrumb') as HTMLElement;

    await expect(el).toBeAccessible();
  });
});
