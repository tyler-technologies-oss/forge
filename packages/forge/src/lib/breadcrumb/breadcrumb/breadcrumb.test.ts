import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { IconButtonComponent } from '../../icon-button/icon-button.js';
import { BreadcrumbComponent } from './breadcrumb.js';

import './breadcrumb.js';
import '../breadcrumb-item/breadcrumb-item.js';

interface BreadcrumbFixture {
  el: BreadcrumbComponent;
  list: HTMLElement;
  previous: () => IconButtonComponent | null;
  next: () => IconButtonComponent | null;
}

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

  describe('scroll buttons', () => {
    const ITEM_COUNT = 12;

    const renderBreadcrumb = async (width: string, scrollButtons = true): Promise<BreadcrumbFixture> => {
      const screen = render(html`
        <div style="width: ${width}">
          <forge-breadcrumb aria-label="Breadcrumb" ?scroll-buttons=${scrollButtons}>
            ${Array.from({ length: ITEM_COUNT - 1 }, (_, i) => html`<forge-breadcrumb-item href="#">Section ${i + 1}</forge-breadcrumb-item>`)}
            <forge-breadcrumb-item current>Current page</forge-breadcrumb-item>
          </forge-breadcrumb>
        </div>
      `);
      const el = screen.container.querySelector('forge-breadcrumb') as BreadcrumbComponent;
      await el.updateComplete;
      await vi.waitFor(() => expect(el.shadowRoot?.querySelector('.forge-breadcrumb')).not.toBeNull());
      return {
        el,
        list: el.shadowRoot?.querySelector('.forge-breadcrumb') as HTMLElement,
        previous: () => el.shadowRoot?.querySelector<IconButtonComponent>('.scroll-button-previous') ?? null,
        next: () => el.shadowRoot?.querySelector<IconButtonComponent>('.scroll-button-next') ?? null
      };
    };

    it('should not show scroll buttons by default', async () => {
      const { el, previous, next } = await renderBreadcrumb('200px', false);
      await el.updateComplete;

      expect(el.scrollButtons).toBe(false);
      expect(previous()).toBeNull();
      expect(next()).toBeNull();
    });

    it('should not show scroll buttons when the items fit', async () => {
      const { previous, next } = await renderBreadcrumb('5000px');

      await vi.waitFor(() => expect(previous()).toBeNull());
      expect(next()).toBeNull();
    });

    it('should show scroll buttons when the items overflow', async () => {
      const { previous, next } = await renderBreadcrumb('300px');

      await vi.waitFor(() => expect(previous()).not.toBeNull());
      expect(next()).not.toBeNull();
    });

    it('should scroll to the current item when the items overflow', async () => {
      const { list, next } = await renderBreadcrumb('300px');

      await vi.waitFor(() => expect(list.scrollLeft).toBeGreaterThan(0));
      await vi.waitFor(() => expect(next()?.disabled).toBe(true));
    });

    it('should enable the previous button and disable the next button when scrolled to the end', async () => {
      const { previous, next } = await renderBreadcrumb('300px');

      await vi.waitFor(() => expect(previous()?.disabled).toBe(false));
      expect(next()?.disabled).toBe(true);
    });

    it('should scroll backward when the previous button is clicked', async () => {
      const { list, previous } = await renderBreadcrumb('300px');
      await vi.waitFor(() => expect(previous()?.disabled).toBe(false));
      const initialScrollLeft = list.scrollLeft;

      previous()?.click();

      await vi.waitFor(() => expect(list.scrollLeft).toBeLessThan(initialScrollLeft));
    });

    it('should scroll forward when the next button is clicked', async () => {
      const { list, previous, next } = await renderBreadcrumb('300px');
      await vi.waitFor(() => expect(previous()?.disabled).toBe(false));
      list.scrollTo({ behavior: 'instant', left: 0 });
      await vi.waitFor(() => expect(next()?.disabled).toBe(false));

      next()?.click();

      await vi.waitFor(() => expect(list.scrollLeft).toBeGreaterThan(0));
    });

    it('should remove scroll buttons when scroll-buttons is removed', async () => {
      const { el, previous, next } = await renderBreadcrumb('300px');
      await vi.waitFor(() => expect(previous()).not.toBeNull());

      el.scrollButtons = false;
      await el.updateComplete;

      await vi.waitFor(() => expect(previous()).toBeNull());
      expect(next()).toBeNull();
    });

    it('should be accessible with scroll buttons', async () => {
      const { el, previous } = await renderBreadcrumb('300px');
      await vi.waitFor(() => expect(previous()).not.toBeNull());

      await expect(el).toBeAccessible();
    });
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
