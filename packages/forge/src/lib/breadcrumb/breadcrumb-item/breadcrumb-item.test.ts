import { describe, it, expect, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { BreadcrumbItemComponent } from './breadcrumb-item.js';

import '../breadcrumb/breadcrumb.js';
import './breadcrumb-item.js';
import '../breadcrumb-overflow-menu/breadcrumb-overflow-menu.js';

const renderItem = async (template: ReturnType<typeof html>): Promise<{ el: BreadcrumbItemComponent; root: ShadowRoot }> => {
  const screen = render(template);
  const el = screen.container.querySelector('forge-breadcrumb-item') as BreadcrumbItemComponent;
  await el.updateComplete;
  return { el, root: el.shadowRoot as ShadowRoot };
};

describe('Breadcrumb Item', () => {
  it('should instantiate shadow root', async () => {
    const { root } = await renderItem(html`<forge-breadcrumb-item></forge-breadcrumb-item>`);

    expect(root).not.toBeNull();
  });

  it('should have listitem role', async () => {
    const screen = render(html`<forge-breadcrumb-item href="#">Home</forge-breadcrumb-item>`);

    await expect.element(screen.getByRole('listitem')).toBeInTheDocument();
  });

  it('should default current and home to false', async () => {
    const { el } = await renderItem(html`<forge-breadcrumb-item></forge-breadcrumb-item>`);

    expect(el.current).toBe(false);
    expect(el.home).toBe(false);
  });

  it('should set aria-current to page on the listitem when current', async () => {
    const screen = render(html`<forge-breadcrumb-item current>Home</forge-breadcrumb-item>`);

    await expect.element(screen.getByRole('listitem')).toHaveAttribute('aria-current', 'page');
  });

  it('should not set aria-current on the listitem when not current', async () => {
    const screen = render(html`<forge-breadcrumb-item href="/home">Home</forge-breadcrumb-item>`);

    await expect.element(screen.getByRole('listitem')).not.toHaveAttribute('aria-current');
  });

  it('should add and remove aria-current when current changes', async () => {
    const screen = render(html`<forge-breadcrumb-item href="/home">Home</forge-breadcrumb-item>`);
    const el = screen.container.querySelector('forge-breadcrumb-item') as BreadcrumbItemComponent;
    const listItem = screen.getByRole('listitem');

    el.current = true;
    await el.updateComplete;
    await expect.element(listItem).toHaveAttribute('aria-current', 'page');

    el.current = false;
    await el.updateComplete;
    await expect.element(listItem).not.toHaveAttribute('aria-current');
  });

  it('should keep aria-current when an unrelated property changes', async () => {
    const screen = render(html`<forge-breadcrumb-item current>Home</forge-breadcrumb-item>`);
    const el = screen.container.querySelector('forge-breadcrumb-item') as BreadcrumbItemComponent;
    await el.updateComplete;

    el.home = true;
    await el.updateComplete;

    await expect.element(screen.getByRole('listitem')).toHaveAttribute('aria-current', 'page');
  });

  it('should set aria-current on a current item within an overflow menu', async () => {
    const screen = render(html`
      <forge-breadcrumb-overflow-menu>
        <forge-breadcrumb-item current>Current</forge-breadcrumb-item>
      </forge-breadcrumb-overflow-menu>
    `);
    const el = screen.container.querySelector('forge-breadcrumb-item') as BreadcrumbItemComponent;
    await el.updateComplete;

    expect(el.getAttribute('aria-current')).toBe('page');
  });

  describe('outside of an overflow menu', () => {
    it('should render a link with the href when not current', async () => {
      const screen = render(html`<forge-breadcrumb-item href="/home">Home</forge-breadcrumb-item>`);

      await expect.element(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/home');
    });

    it('should render link within a button when href is provided', async () => {
      const { root } = await renderItem(html`<forge-breadcrumb-item href="/home">Home</forge-breadcrumb-item>`);

      expect(root.querySelector('forge-button a')).not.toBeNull();
      expect(root.querySelector('.forge-breadcrumb-item')?.classList.contains('menu-item')).toBe(false);
      expect(root.querySelector('forge-list-item')).toBeNull();
    });

    it('should update link href when href property changes', async () => {
      const screen = render(html`<forge-breadcrumb-item href="/home">Home</forge-breadcrumb-item>`);
      const el = screen.container.querySelector('forge-breadcrumb-item') as BreadcrumbItemComponent;

      el.href = '/other';
      await el.updateComplete;

      await expect.element(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/other');
    });

    it('should render start slot before the link', async () => {
      const { root } = await renderItem(html`
        <forge-breadcrumb-item href="/home">
          <span slot="start">Start</span>
          Home
        </forge-breadcrumb-item>
      `);

      expect(root.querySelector('.start slot[name="start"]')).not.toBeNull();
    });

    it('should not render a link when current', async () => {
      const screen = render(html`<forge-breadcrumb-item href="/home" current>Home</forge-breadcrumb-item>`);
      const el = screen.container.querySelector('forge-breadcrumb-item') as BreadcrumbItemComponent;
      await el.updateComplete;

      expect(screen.getByRole('link').elements()).toHaveLength(0);
      expect(el.shadowRoot?.querySelector('a')).toBeNull();
      expect(el.shadowRoot?.querySelector('forge-button')).toBeNull();
      expect(el.shadowRoot?.querySelector('.text slot')).not.toBeNull();
    });

    it('should add current class to root when current', async () => {
      const { root } = await renderItem(html`<forge-breadcrumb-item current>Home</forge-breadcrumb-item>`);

      expect(root.querySelector('.forge-breadcrumb-item')?.classList.contains('current')).toBe(true);
    });

    it('should render plain text without a button or link when href is not provided', async () => {
      const { root } = await renderItem(html`<forge-breadcrumb-item>Home</forge-breadcrumb-item>`);

      expect(root.querySelector('a')).toBeNull();
      expect(root.querySelector('forge-button')).toBeNull();
      expect(root.querySelector('.start slot[name="start"]')).not.toBeNull();
      expect(root.querySelector('.text slot')).not.toBeNull();
    });

    it('should restore link when current is removed', async () => {
      const screen = render(html`<forge-breadcrumb-item href="/home" current>Home</forge-breadcrumb-item>`);
      const el = screen.container.querySelector('forge-breadcrumb-item') as BreadcrumbItemComponent;

      el.current = false;
      await el.updateComplete;

      await expect.element(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    });

    it('should render home icon button with tooltip when home item has href', async () => {
      const { root } = await renderItem(html`<forge-breadcrumb-item home href="/"></forge-breadcrumb-item>`);

      expect(root.querySelector('forge-icon-button a[href="/"] forge-icon[name="home"]')).not.toBeNull();
      expect(root.querySelector('forge-tooltip[anchor="button"]')).not.toBeNull();
      expect(root.querySelector('forge-button')).toBeNull();
    });

    it('should render home icon without a button or link when home item has no href', async () => {
      const { root } = await renderItem(html`<forge-breadcrumb-item home></forge-breadcrumb-item>`);

      expect(root.querySelector('a')).toBeNull();
      expect(root.querySelector('forge-icon-button')).toBeNull();
      expect(root.querySelector('forge-icon.text-icon[name="home"]')).not.toBeNull();
    });

    it('should render home icon without a link when home item is current', async () => {
      const { root } = await renderItem(html`<forge-breadcrumb-item home href="/" current></forge-breadcrumb-item>`);

      expect(root.querySelector('a')).toBeNull();
      expect(root.querySelector('forge-icon.text-icon[name="home"]')).not.toBeNull();
    });
  });

  describe('within an overflow menu', () => {
    it('should render link in a list item when href is provided', async () => {
      const { root } = await renderItem(html`
        <forge-breadcrumb-overflow-menu>
          <forge-breadcrumb-item href="/home">Home</forge-breadcrumb-item>
        </forge-breadcrumb-overflow-menu>
      `);

      expect(root.querySelector('forge-list-item a[href="/home"]')).not.toBeNull();
      expect(root.querySelector('forge-button')).toBeNull();
      expect(root.querySelector('.forge-breadcrumb-item')?.classList.contains('menu-item')).toBe(true);
    });

    it('should render plain text when href is not provided', async () => {
      const { root } = await renderItem(html`
        <forge-breadcrumb-overflow-menu>
          <forge-breadcrumb-item>Text</forge-breadcrumb-item>
        </forge-breadcrumb-overflow-menu>
      `);

      expect(root.querySelector('a')).toBeNull();
      expect(root.querySelector('forge-list-item .text')).not.toBeNull();
    });

    it('should apply menu item styling to current item without rendering a link', async () => {
      const { root } = await renderItem(html`
        <forge-breadcrumb-overflow-menu>
          <forge-breadcrumb-item href="/home" current>Current</forge-breadcrumb-item>
        </forge-breadcrumb-overflow-menu>
      `);

      expect(root.querySelector('.forge-breadcrumb-item')?.classList.contains('menu-item')).toBe(true);
      expect(root.querySelector('a')).toBeNull();
      expect(root.querySelector('.text')).not.toBeNull();
    });

    it('should render home icon in the start slot of the list item', async () => {
      const { root } = await renderItem(html`
        <forge-breadcrumb-overflow-menu>
          <forge-breadcrumb-item home href="/">Home</forge-breadcrumb-item>
        </forge-breadcrumb-overflow-menu>
      `);

      expect(root.querySelector('forge-list-item forge-icon[slot="start"][name="home"]')).not.toBeNull();
      expect(root.querySelector('forge-list-item a')).not.toBeNull();
    });

    it('should not render home icon when home is not set', async () => {
      const { root } = await renderItem(html`
        <forge-breadcrumb-overflow-menu>
          <forge-breadcrumb-item href="/">Home</forge-breadcrumb-item>
        </forge-breadcrumb-overflow-menu>
      `);

      expect(root.querySelector('forge-icon')).toBeNull();
    });
  });

  describe('with child items', () => {
    const childTemplate = html`
      <forge-breadcrumb aria-label="Breadcrumb">
        <forge-breadcrumb-item href="#ignored">
          Section
          <forge-breadcrumb-item slot="children" href="#one">One</forge-breadcrumb-item>
          <forge-breadcrumb-item slot="children" href="#two">Two</forge-breadcrumb-item>
        </forge-breadcrumb-item>
      </forge-breadcrumb>
    `;

    it('should render a menu button instead of a link when child items are slotted', async () => {
      const screen = render(childTemplate);
      const el = screen.container.querySelector('forge-breadcrumb-item') as BreadcrumbItemComponent;
      await el.updateComplete;

      expect(el.shadowRoot?.querySelector('forge-button a')).toBeNull();
      await expect.element(screen.getByRole('button', { name: 'Section' })).toBeInTheDocument();
    });

    it('should open a popover with the child items when the button is clicked', async () => {
      const screen = render(childTemplate);
      const button = screen.getByRole('button', { name: 'Section' });

      await button.click();

      await expect.element(button).toHaveAttribute('aria-expanded', 'true');
      await expect.element(screen.getByRole('link', { name: 'One' })).toBeVisible();
      await expect.element(screen.getByRole('link', { name: 'Two' })).toBeVisible();
    });

    it('should close the popover when a child link is activated', async () => {
      const screen = render(childTemplate);
      const button = screen.getByRole('button', { name: 'Section' });

      await button.click();
      (screen.getByRole('link', { name: 'One' }).element() as HTMLAnchorElement).focus();
      await userEvent.keyboard('{Enter}');

      await expect.element(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('should render child items as menu items', async () => {
      const screen = render(childTemplate);
      const child = screen.container.querySelector('forge-breadcrumb-item[slot="children"]') as BreadcrumbItemComponent;
      await child.updateComplete;

      expect(child.shadowRoot?.querySelector('forge-list-item a[href="#one"]')).not.toBeNull();
      expect(child.shadowRoot?.querySelector('.forge-breadcrumb-item')?.classList.contains('menu-item')).toBe(true);
    });

    it('should render a menu button when child items are slotted and href is not set', async () => {
      const screen = render(html`
        <forge-breadcrumb-item>
          Section
          <forge-breadcrumb-item slot="children" href="#one">One</forge-breadcrumb-item>
        </forge-breadcrumb-item>
      `);

      await expect.element(screen.getByRole('button', { name: 'Section' })).toBeInTheDocument();
    });

    it('should render a home icon button that toggles the menu when home is set', async () => {
      const screen = render(html`
        <forge-breadcrumb-item home href="#">
          Home
          <forge-breadcrumb-item slot="children" href="#one">One</forge-breadcrumb-item>
        </forge-breadcrumb-item>
      `);
      const el = screen.container.querySelector('forge-breadcrumb-item') as BreadcrumbItemComponent;
      await el.updateComplete;

      expect(el.shadowRoot?.querySelector('forge-icon-button forge-icon[name="home"]')).not.toBeNull();
      expect(el.shadowRoot?.querySelector('a')).toBeNull();
    });

    it('should render a link again when child items are removed', async () => {
      const screen = render(childTemplate);
      const el = screen.container.querySelector('forge-breadcrumb-item') as BreadcrumbItemComponent;
      await el.updateComplete;

      el.querySelectorAll('[slot="children"]').forEach(child => child.remove());

      await vi.waitFor(() => expect(el.shadowRoot?.querySelector('forge-button a[href="#ignored"]')).not.toBeNull());
    });

    it('should be accessible', async () => {
      const screen = render(childTemplate);
      const el = screen.container.querySelector('forge-breadcrumb') as HTMLElement;

      await expect(el).toBeAccessible();
    });
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
