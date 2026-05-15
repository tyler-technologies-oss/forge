import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';

import type { BreadcrumbsComponent, ICrumbConfiguration } from './breadcrumbs/breadcrumbs.js';
import type { BreadcrumbsItemComponent } from './breadcrumbs-item/breadcrumbs-item.js';
import { frame } from '../core/utils/utils.js';

import './breadcrumbs/breadcrumbs.js';
import './breadcrumbs-item/breadcrumbs-item.js';

const basicCrumbs: ICrumbConfiguration[] = [{ label: 'Home', path: '/' }, { label: 'Projects', path: '/projects' }, { label: 'Components' }];

describe('Breadcrumb', () => {
  it('should contain a shadow root', async () => {
    const screen = render(html`<forge-breadcrumbs .crumbs=${basicCrumbs}></forge-breadcrumbs>`);
    const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;

    expect(el.shadowRoot).not.toBeNull();
  });

  it('should be accessible', async () => {
    const screen = render(html`<forge-breadcrumbs .crumbs=${basicCrumbs}></forge-breadcrumbs>`);
    const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;
    await el.updateComplete;

    await expect(el).toBeAccessible();
  });

  it('should render the correct number of crumbs from crumbs property', async () => {
    const screen = render(html`<forge-breadcrumbs .crumbs=${basicCrumbs}></forge-breadcrumbs>`);
    const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;
    await el.updateComplete;

    const crumbEls = el.shadowRoot!.querySelectorAll('forge-breadcrumbs-item');
    expect(crumbEls.length).toBe(basicCrumbs.length);
  });

  it('should set aria-current="page" on the last crumb', async () => {
    const screen = render(html`<forge-breadcrumbs .crumbs=${basicCrumbs}></forge-breadcrumbs>`);
    const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;
    await el.updateComplete;

    const crumbEls = el.shadowRoot!.querySelectorAll('forge-breadcrumbs-item');
    const lastCrumb = crumbEls[crumbEls.length - 1];
    await lastCrumb.updateComplete;
    const activeLi = lastCrumb.shadowRoot!.querySelector('[aria-current="page"]');
    expect(activeLi).not.toBeNull();
  });

  it('should render home button when show-home is set', async () => {
    const screen = render(html`<forge-breadcrumbs .crumbs=${basicCrumbs} show-home></forge-breadcrumbs>`);
    const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;
    await el.updateComplete;

    const homeButton = el.shadowRoot!.querySelector('.home-button');
    expect(homeButton).not.toBeNull();
  });

  it('should not render home button when show-home is unset', async () => {
    const screen = render(html`<forge-breadcrumbs .crumbs=${basicCrumbs}></forge-breadcrumbs>`);
    const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;
    await el.updateComplete;

    const homeButton = el.shadowRoot!.querySelector('.home-button');
    expect(homeButton).toBeNull();
  });

  it('should emit forge-breadcrumbs-home-click when home button is clicked', async () => {
    const screen = render(html`<forge-breadcrumbs .crumbs=${basicCrumbs} show-home></forge-breadcrumbs>`);
    const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;
    await el.updateComplete;

    const spy = vi.fn();
    el.addEventListener('forge-breadcrumbs-home-click', spy);

    const homeButton = el.shadowRoot!.querySelector('.home-button') as HTMLElement;
    homeButton.click();

    expect(spy).toHaveBeenCalledOnce();
  });

  it('should emit forge-breadcrumbs-crumb-select with correct crumb and index when a crumb is clicked', async () => {
    const screen = render(html`<forge-breadcrumbs .crumbs=${basicCrumbs}></forge-breadcrumbs>`);
    const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;
    await el.updateComplete;

    const spy = vi.fn();
    el.addEventListener('forge-breadcrumbs-crumb-select', spy);

    const crumbEls = el.shadowRoot!.querySelectorAll('forge-breadcrumbs-item');
    const firstCrumb = crumbEls[0];
    await firstCrumb.updateComplete;
    const link = firstCrumb.shadowRoot!.querySelector('.link') as HTMLElement;
    link.click();

    expect(spy).toHaveBeenCalledOnce();
    const evt = spy.mock.calls[0][0] as Event;
    expect((evt.target as BreadcrumbsItemComponent).index).toBe(0);
  });

  it('should render a custom separator icon when separator property is set', async () => {
    const screen = render(html`<forge-breadcrumbs .crumbs=${basicCrumbs} separator-icon-name="chevron_right"></forge-breadcrumbs>`);
    const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;
    await el.updateComplete;

    const crumbEls = el.shadowRoot!.querySelectorAll('forge-breadcrumbs-item');
    const nonLastCrumbs = Array.from(crumbEls).slice(0, -1);
    expect(nonLastCrumbs.length).toBeGreaterThan(0);

    for (const crumb of nonLastCrumbs) {
      await crumb.updateComplete;
      const sep = crumb.shadowRoot!.querySelector('.separator') as any;
      expect(sep).not.toBeNull();
      expect(sep.name).toBe('chevron_right');
    }
  });

  it('should render a crumb icon when ICrumbConfiguration.icon is set', async () => {
    const crumbsWithIcon: ICrumbConfiguration[] = [{ label: 'Home', path: '/', icon: 'home' }, { label: 'End' }];
    const screen = render(html`<forge-breadcrumbs .crumbs=${crumbsWithIcon}></forge-breadcrumbs>`);
    const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;
    await el.updateComplete;

    const firstCrumb = el.shadowRoot!.querySelectorAll('forge-breadcrumbs-item')[0];
    await firstCrumb.updateComplete;
    const icon = firstCrumb.shadowRoot!.querySelector('.icon');
    expect(icon).not.toBeNull();
  });

  it('should render secondary text when ICrumbConfiguration.secondary is set', async () => {
    const crumbsWithSecondary: ICrumbConfiguration[] = [{ label: 'Home', path: '/', secondary: 'Main page' }, { label: 'End' }];
    const screen = render(html`<forge-breadcrumbs .crumbs=${crumbsWithSecondary}></forge-breadcrumbs>`);
    const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;
    await el.updateComplete;

    const firstCrumb = el.shadowRoot!.querySelectorAll('forge-breadcrumbs-item')[0];
    await firstCrumb.updateComplete;
    const secondary = firstCrumb.shadowRoot!.querySelector('.secondary-text');
    expect(secondary).not.toBeNull();
    expect(secondary!.textContent).toBe('Main page');
  });

  it('should render a sibling routes trigger when ICrumbConfiguration.siblingRoutes is set', async () => {
    const crumbsWithSiblings: ICrumbConfiguration[] = [
      {
        label: 'Projects',
        path: '/projects',
        siblingRoutes: [
          { label: 'Recent', path: '/recent' },
          { label: 'Archived', path: '/archived' }
        ]
      },
      { label: 'End' }
    ];
    const screen = render(html`<forge-breadcrumbs .crumbs=${crumbsWithSiblings}></forge-breadcrumbs>`);
    const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;
    await el.updateComplete;

    const firstCrumb = el.shadowRoot!.querySelectorAll('forge-breadcrumbs-item')[0];
    await firstCrumb.updateComplete;
    const siblingTrigger = firstCrumb.shadowRoot!.querySelector('.sibling-trigger');
    expect(siblingTrigger).not.toBeNull();
  });

  it('should not render a sibling routes trigger when siblingRoutes is absent', async () => {
    const screen = render(html`<forge-breadcrumbs .crumbs=${basicCrumbs}></forge-breadcrumbs>`);
    const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;
    await el.updateComplete;

    const firstCrumb = el.shadowRoot!.querySelectorAll('forge-breadcrumbs-item')[0];
    await firstCrumb.updateComplete;
    const siblingTrigger = firstCrumb.shadowRoot!.querySelector('.sibling-trigger');
    expect(siblingTrigger).toBeNull();
  });

  it('should emit forge-breadcrumbs-crumb-select with the sibling crumb when a sibling route is selected', async () => {
    const crumbsWithSiblings: ICrumbConfiguration[] = [
      {
        label: 'Projects',
        path: '/projects',
        siblingRoutes: [
          { label: 'Recent', path: '/recent' },
          { label: 'Archived', path: '/archived' }
        ]
      },
      { label: 'End' }
    ];
    const screen = render(html`<forge-breadcrumbs .crumbs=${crumbsWithSiblings}></forge-breadcrumbs>`);
    const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;
    await el.updateComplete;

    const spy = vi.fn();
    el.addEventListener('forge-breadcrumbs-crumb-select', spy);

    const firstCrumb = el.shadowRoot!.querySelectorAll('forge-breadcrumbs-item')[0];
    await firstCrumb.updateComplete;

    const menu = firstCrumb.shadowRoot!.querySelector('forge-menu')!;
    menu.dispatchEvent(new CustomEvent('forge-menu-select', { bubbles: true, composed: true, detail: { value: '/recent' } }));

    expect(spy).toHaveBeenCalledOnce();
    const evt = spy.mock.calls[0][0] as Event;
    expect((evt.target as BreadcrumbsItemComponent).index).toBe(0);
  });

  it('should show collapsed menu trigger when content overflows container width', async () => {
    const manyCrumbs: ICrumbConfiguration[] = [
      { label: 'Level 1', path: '/1' },
      { label: 'Level 2', path: '/2' },
      { label: 'Level 3', path: '/3' },
      { label: 'Level 4', path: '/4' },
      { label: 'Level 5', path: '/5' },
      { label: 'Current Page' }
    ];

    const container = document.createElement('div');
    container.style.width = '150px';
    container.style.overflow = 'hidden';
    document.body.appendChild(container);

    const screen = render(html`<forge-breadcrumbs .crumbs=${manyCrumbs}></forge-breadcrumbs>`, { container });
    const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;
    await el.updateComplete;
    await frame();
    await frame();
    await el.updateComplete;

    const collapsedTrigger = el.shadowRoot!.querySelector('.collapsed-trigger');
    expect(collapsedTrigger).not.toBeNull();

    container.remove();
  });

  it('should not show collapsed menu trigger when content fits container width', async () => {
    const shortCrumbs: ICrumbConfiguration[] = [{ label: 'A', path: '/a' }, { label: 'B' }];
    const screen = render(html`<forge-breadcrumbs .crumbs=${shortCrumbs}></forge-breadcrumbs>`);
    const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;
    await el.updateComplete;
    await frame();
    await el.updateComplete;

    const collapsedTrigger = el.shadowRoot!.querySelector('.collapsed-trigger');
    expect(collapsedTrigger).toBeNull();
  });

  it('should reflect show-home attribute to property', async () => {
    const screen = render(html`<forge-breadcrumbs .crumbs=${basicCrumbs} show-home></forge-breadcrumbs>`);
    const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;

    expect(el.showHome).toBe(true);
  });

  it('should reflect separator-icon-name attribute to property', async () => {
    const screen = render(html`<forge-breadcrumbs .crumbs=${basicCrumbs} separator-icon-name="chevron_right"></forge-breadcrumbs>`);
    const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;

    expect(el.separatorIconName).toBe('chevron_right');
  });

  it('should render a tooltip on the home button when show-home is set', async () => {
    const screen = render(html`<forge-breadcrumbs .crumbs=${basicCrumbs} show-home></forge-breadcrumbs>`);
    const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;
    await el.updateComplete;

    const tooltip = el.shadowRoot!.querySelector('forge-tooltip');
    expect(tooltip).not.toBeNull();
  });

  it('should not render a tooltip when show-home is unset', async () => {
    const screen = render(html`<forge-breadcrumbs .crumbs=${basicCrumbs}></forge-breadcrumbs>`);
    const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;
    await el.updateComplete;

    const tooltip = el.shadowRoot!.querySelector('forge-tooltip');
    expect(tooltip).toBeNull();
  });

  it('should display "Home" as the default tooltip text on the home button', async () => {
    const screen = render(html`<forge-breadcrumbs .crumbs=${basicCrumbs} show-home></forge-breadcrumbs>`);
    const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;
    await el.updateComplete;

    const tooltip = el.shadowRoot!.querySelector('forge-tooltip');
    expect(tooltip!.textContent).toBe('Home');
  });

  it('should display custom tooltip text when home-tooltip attribute is set', async () => {
    const screen = render(html`<forge-breadcrumbs .crumbs=${basicCrumbs} show-home home-tooltip="Go to homepage"></forge-breadcrumbs>`);
    const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;
    await el.updateComplete;

    const tooltip = el.shadowRoot!.querySelector('forge-tooltip');
    expect(tooltip!.textContent).toBe('Go to homepage');
  });

  it('should update tooltip text when homeTooltip property changes', async () => {
    const screen = render(html`<forge-breadcrumbs .crumbs=${basicCrumbs} show-home></forge-breadcrumbs>`);
    const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;
    await el.updateComplete;

    el.homeTooltip = 'Navigate home';
    await el.updateComplete;

    const tooltip = el.shadowRoot!.querySelector('forge-tooltip');
    expect(tooltip!.textContent).toBe('Navigate home');
  });

  it('should reflect home-tooltip attribute to property', async () => {
    const screen = render(html`<forge-breadcrumbs .crumbs=${basicCrumbs} home-tooltip="Custom home"></forge-breadcrumbs>`);
    const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;

    expect(el.homeTooltip).toBe('Custom home');
  });

  it('should use homeTooltip as the aria-label on the home button', async () => {
    const screen = render(html`<forge-breadcrumbs .crumbs=${basicCrumbs} show-home home-tooltip="Go home"></forge-breadcrumbs>`);
    const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;
    await el.updateComplete;

    const homeButton = el.shadowRoot!.querySelector('.home-button');
    expect(homeButton!.getAttribute('aria-label')).toBe('Go home');
  });

  it('should use "Home" as the default aria-label on the home button', async () => {
    const screen = render(html`<forge-breadcrumbs .crumbs=${basicCrumbs} show-home></forge-breadcrumbs>`);
    const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;
    await el.updateComplete;

    const homeButton = el.shadowRoot!.querySelector('.home-button');
    expect(homeButton!.getAttribute('aria-label')).toBe('Home');
  });

  it('should use "Show all breadcrumbs" as the default aria-label on the collapsed trigger', async () => {
    const manyCrumbs: ICrumbConfiguration[] = [
      { label: 'Level 1', path: '/1' },
      { label: 'Level 2', path: '/2' },
      { label: 'Level 3', path: '/3' },
      { label: 'Level 4', path: '/4' },
      { label: 'Level 5', path: '/5' },
      { label: 'Current Page' }
    ];
    const container = document.createElement('div');
    container.style.width = '150px';
    container.style.overflow = 'hidden';
    document.body.appendChild(container);

    const screen = render(html`<forge-breadcrumbs .crumbs=${manyCrumbs}></forge-breadcrumbs>`, { container });
    const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;
    await el.updateComplete;
    await frame();
    await frame();
    await el.updateComplete;

    const collapsedTrigger = el.shadowRoot!.querySelector('.collapsed-trigger');
    expect(collapsedTrigger!.getAttribute('aria-label')).toBe('Show all breadcrumbs');

    container.remove();
  });

  it('should use a custom expand-label as the aria-label on the collapsed trigger', async () => {
    const manyCrumbs: ICrumbConfiguration[] = [
      { label: 'Level 1', path: '/1' },
      { label: 'Level 2', path: '/2' },
      { label: 'Level 3', path: '/3' },
      { label: 'Level 4', path: '/4' },
      { label: 'Level 5', path: '/5' },
      { label: 'Current Page' }
    ];
    const container = document.createElement('div');
    container.style.width = '150px';
    container.style.overflow = 'hidden';
    document.body.appendChild(container);

    const screen = render(html`<forge-breadcrumbs .crumbs=${manyCrumbs} expand-label="Alle anzeigen"></forge-breadcrumbs>`, { container });
    const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;
    await el.updateComplete;
    await frame();
    await frame();
    await el.updateComplete;

    const collapsedTrigger = el.shadowRoot!.querySelector('.collapsed-trigger');
    expect(collapsedTrigger!.getAttribute('aria-label')).toBe('Alle anzeigen');

    container.remove();
  });

  it('should reflect expand-label attribute to property', async () => {
    const screen = render(html`<forge-breadcrumbs .crumbs=${basicCrumbs} expand-label="Expand navigation"></forge-breadcrumbs>`);
    const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;

    expect(el.expandLabel).toBe('Expand navigation');
  });

  it('should use "Sibling routes" as the default aria-label on the sibling routes trigger', async () => {
    const crumbsWithSiblings: ICrumbConfiguration[] = [
      {
        label: 'Projects',
        path: '/projects',
        siblingRoutes: [{ label: 'Recent', path: '/recent' }]
      },
      { label: 'End' }
    ];
    const screen = render(html`<forge-breadcrumbs .crumbs=${crumbsWithSiblings}></forge-breadcrumbs>`);
    const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;
    await el.updateComplete;

    const firstCrumb = el.shadowRoot!.querySelectorAll('forge-breadcrumbs-item')[0];
    await firstCrumb.updateComplete;
    const siblingTrigger = firstCrumb.shadowRoot!.querySelector('.sibling-trigger');
    expect(siblingTrigger!.getAttribute('aria-label')).toBe('Sibling routes');
  });

  it('should use a custom sibling-routes-label as the aria-label on the sibling routes trigger', async () => {
    const crumbsWithSiblings: ICrumbConfiguration[] = [
      {
        label: 'Projects',
        path: '/projects',
        siblingRoutes: [{ label: 'Recent', path: '/recent' }]
      },
      { label: 'End' }
    ];
    const screen = render(html`<forge-breadcrumbs .crumbs=${crumbsWithSiblings} sibling-routes-label="Verwandte Routen"></forge-breadcrumbs>`);
    const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;
    await el.updateComplete;

    const firstCrumb = el.shadowRoot!.querySelectorAll('forge-breadcrumbs-item')[0];
    await firstCrumb.updateComplete;
    const siblingTrigger = firstCrumb.shadowRoot!.querySelector('.sibling-trigger');
    expect(siblingTrigger!.getAttribute('aria-label')).toBe('Verwandte Routen');
  });

  it('should reflect sibling-routes-label attribute to property', async () => {
    const screen = render(html`<forge-breadcrumbs .crumbs=${basicCrumbs} sibling-routes-label="Related routes"></forge-breadcrumbs>`);
    const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;

    expect(el.siblingRoutesLabel).toBe('Related routes');
  });

  describe('Slot-based usage', () => {
    it('should render slotted forge-breadcrumbs-item elements when provided declaratively', async () => {
      const screen = render(html`
        <forge-breadcrumbs>
          <forge-breadcrumbs-item .crumb=${{ label: 'Home', path: '/' }}></forge-breadcrumbs-item>
          <forge-breadcrumbs-item .crumb=${{ label: 'Projects', path: '/projects' }}></forge-breadcrumbs-item>
          <forge-breadcrumbs-item .crumb=${{ label: 'Components' }}></forge-breadcrumbs-item>
        </forge-breadcrumbs>
      `);
      const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;
      await el.updateComplete;

      const slottedItems = screen.container.querySelectorAll('forge-breadcrumbs-item');
      expect(slottedItems.length).toBe(3);
    });

    it('should set active on the last slotted item', async () => {
      const screen = render(html`
        <forge-breadcrumbs>
          <forge-breadcrumbs-item .crumb=${{ label: 'Home', path: '/' }}></forge-breadcrumbs-item>
          <forge-breadcrumbs-item .crumb=${{ label: 'Components' }}></forge-breadcrumbs-item>
        </forge-breadcrumbs>
      `);
      const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;
      await el.updateComplete;

      const slottedItems = Array.from(screen.container.querySelectorAll('forge-breadcrumbs-item')) as BreadcrumbsItemComponent[];
      expect(slottedItems[0].active).toBe(false);
      expect(slottedItems[1].active).toBe(true);
    });

    it('should set the separator on non-last slotted items', async () => {
      const screen = render(html`
        <forge-breadcrumbs>
          <forge-breadcrumbs-item .crumb=${{ label: 'Home', path: '/' }}></forge-breadcrumbs-item>
          <forge-breadcrumbs-item .crumb=${{ label: 'Components' }}></forge-breadcrumbs-item>
        </forge-breadcrumbs>
      `);
      const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;
      await el.updateComplete;

      const slottedItems = Array.from(screen.container.querySelectorAll('forge-breadcrumbs-item')) as BreadcrumbsItemComponent[];
      expect(slottedItems[0].separator).toBe('slash_forward');
      expect(slottedItems[1].separator).toBe('');
    });

    it('should set the index on each slotted item', async () => {
      const screen = render(html`
        <forge-breadcrumbs>
          <forge-breadcrumbs-item .crumb=${{ label: 'Home', path: '/' }}></forge-breadcrumbs-item>
          <forge-breadcrumbs-item .crumb=${{ label: 'Projects', path: '/projects' }}></forge-breadcrumbs-item>
          <forge-breadcrumbs-item .crumb=${{ label: 'Components' }}></forge-breadcrumbs-item>
        </forge-breadcrumbs>
      `);
      const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;
      await el.updateComplete;

      const slottedItems = Array.from(screen.container.querySelectorAll('forge-breadcrumbs-item')) as BreadcrumbsItemComponent[];
      expect(slottedItems[0].index).toBe(0);
      expect(slottedItems[1].index).toBe(1);
      expect(slottedItems[2].index).toBe(2);
    });

    it('should update the separator on slotted items when separator-icon-name changes', async () => {
      const screen = render(html`
        <forge-breadcrumbs>
          <forge-breadcrumbs-item .crumb=${{ label: 'Home', path: '/' }}></forge-breadcrumbs-item>
          <forge-breadcrumbs-item .crumb=${{ label: 'Components' }}></forge-breadcrumbs-item>
        </forge-breadcrumbs>
      `);
      const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;
      await el.updateComplete;

      el.separatorIconName = 'chevron_right';
      await el.updateComplete;

      const slottedItems = Array.from(screen.container.querySelectorAll('forge-breadcrumbs-item')) as BreadcrumbsItemComponent[];
      expect(slottedItems[0].separator).toBe('chevron_right');
    });

    it('should show collapsed trigger when slotted content overflows container width', async () => {
      const container = document.createElement('div');
      container.style.width = '150px';
      container.style.overflow = 'hidden';
      document.body.appendChild(container);

      const screen = render(
        html`
          <forge-breadcrumbs>
            <forge-breadcrumbs-item .crumb=${{ label: 'Level 1', path: '/1' }}></forge-breadcrumbs-item>
            <forge-breadcrumbs-item .crumb=${{ label: 'Level 2', path: '/2' }}></forge-breadcrumbs-item>
            <forge-breadcrumbs-item .crumb=${{ label: 'Level 3', path: '/3' }}></forge-breadcrumbs-item>
            <forge-breadcrumbs-item .crumb=${{ label: 'Level 4', path: '/4' }}></forge-breadcrumbs-item>
            <forge-breadcrumbs-item .crumb=${{ label: 'Level 5', path: '/5' }}></forge-breadcrumbs-item>
            <forge-breadcrumbs-item .crumb=${{ label: 'Current Page' }}></forge-breadcrumbs-item>
          </forge-breadcrumbs>
        `,
        { container }
      );
      const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;
      await el.updateComplete;
      await frame();
      await frame();
      await el.updateComplete;

      const collapsedTrigger = el.shadowRoot!.querySelector('.collapsed-trigger');
      expect(collapsedTrigger).not.toBeNull();

      container.remove();
    });
  });

  describe('Custom separator-icon slot', () => {
    it('should render the slotted separator element instead of a forge-icon in each non-last crumb', async () => {
      const screen = render(html`
        <forge-breadcrumbs .crumbs=${basicCrumbs}>
          <span slot="separator-icon" class="custom-sep">/</span>
        </forge-breadcrumbs>
      `);
      const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;
      await el.updateComplete;
      await frame();
      await el.updateComplete;

      const crumbEls = Array.from(el.shadowRoot!.querySelectorAll('forge-breadcrumbs-item'));
      const nonLastCrumbs = crumbEls.slice(0, -1);
      expect(nonLastCrumbs.length).toBeGreaterThan(0);

      for (const crumb of nonLastCrumbs) {
        await crumb.updateComplete;
        const customSep = crumb.shadowRoot!.querySelector('.custom-sep');
        expect(customSep).not.toBeNull();
        const forgeSep = crumb.shadowRoot!.querySelector('forge-icon.separator');
        expect(forgeSep).toBeNull();
      }
    });

    it('should not render the slotted separator on the last crumb', async () => {
      const screen = render(html`
        <forge-breadcrumbs .crumbs=${basicCrumbs}>
          <span slot="separator-icon" class="custom-sep">/</span>
        </forge-breadcrumbs>
      `);
      const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;
      await el.updateComplete;

      const crumbEls = Array.from(el.shadowRoot!.querySelectorAll('forge-breadcrumbs-item'));
      const lastCrumb = crumbEls[crumbEls.length - 1];
      await lastCrumb.updateComplete;

      const customSep = lastCrumb.shadowRoot!.querySelector('.custom-sep');
      expect(customSep).toBeNull();
    });

    it('should fall back to forge-icon separator when the separator-icon slot is removed', async () => {
      const customSep = document.createElement('span');
      customSep.slot = 'separator-icon';
      customSep.className = 'custom-sep';
      customSep.textContent = '/';

      const screen = render(html`<forge-breadcrumbs .crumbs=${basicCrumbs}></forge-breadcrumbs>`);
      const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;
      el.appendChild(customSep);
      await el.updateComplete;
      await frame();

      el.removeChild(customSep);
      await el.updateComplete;
      await frame();

      const crumbEls = Array.from(el.shadowRoot!.querySelectorAll('forge-breadcrumbs-item'));
      const firstCrumb = crumbEls[0];
      await firstCrumb.updateComplete;

      const forgeSep = firstCrumb.shadowRoot!.querySelector('forge-icon.separator');
      expect(forgeSep).not.toBeNull();
    });

    it('should propagate slotted separator to declarative slot-based items', async () => {
      const screen = render(html`
        <forge-breadcrumbs>
          <forge-breadcrumbs-item .crumb=${{ label: 'Home', path: '/' }}></forge-breadcrumbs-item>
          <forge-breadcrumbs-item .crumb=${{ label: 'Projects', path: '/projects' }}></forge-breadcrumbs-item>
          <forge-breadcrumbs-item .crumb=${{ label: 'Current' }}></forge-breadcrumbs-item>
          <span slot="separator-icon" class="custom-sep">/</span>
        </forge-breadcrumbs>
      `);
      const el = screen.container.querySelector('forge-breadcrumbs') as BreadcrumbsComponent;
      await el.updateComplete;
      await frame();

      const slottedItems = Array.from(screen.container.querySelectorAll('forge-breadcrumbs-item')) as BreadcrumbsItemComponent[];
      const firstItem = slottedItems[0];
      await firstItem.updateComplete;

      const customSep = firstItem.shadowRoot!.querySelector('.custom-sep');
      expect(customSep).not.toBeNull();
    });
  });
});
