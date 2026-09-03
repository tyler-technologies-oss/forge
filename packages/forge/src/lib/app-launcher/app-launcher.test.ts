import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { getShadowElement } from '@tylertech/forge-core';
import { TestHarness } from '../core/testing/test-harness.js';
import type { IDialogComponent } from '../dialog/index.js';
import type { IIconComponent } from '../icon/index.js';
import type { IPopoverComponent } from '../popover/index.js';
import type { AppLauncherOption } from './app-launcher-constants.js';
import type { IAppLauncherComponent } from './app-launcher.js';

import './app-launcher.js';

describe('AppLauncher', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic instantiation', () => {
    it('should contain shadow root', async () => {
      const harness = await createFixture();
      expect(harness.element.shadowRoot).not.toBeNull();
    });

    it('should have default property values', async () => {
      const harness = await createFixture({ relatedApps: [], allApps: [] });
      expect(harness.element.open).toBe(false);
      expect(harness.element.relatedApps).toEqual([]);
      expect(harness.element.allApps).toEqual([]);
      expect(harness.element.launcherAriaLabel).toBe('Open app launcher');
      expect(harness.element.backAriaLabel).toBe('Go back');
      expect(harness.element.closeAriaLabel).toBe('Close app launcher');
      expect(harness.element.searchPlaceholder).toBe('Search by product or app');
    });

    it('should define sub-component dependencies', async () => {
      await createFixture();
      expect(window.customElements.get('forge-avatar')).toBeTruthy();
      expect(window.customElements.get('forge-button')).toBeTruthy();
      expect(window.customElements.get('forge-card')).toBeTruthy();
      expect(window.customElements.get('forge-dialog')).toBeTruthy();
      expect(window.customElements.get('forge-icon-button')).toBeTruthy();
      expect(window.customElements.get('forge-icon')).toBeTruthy();
      expect(window.customElements.get('forge-list')).toBeTruthy();
      expect(window.customElements.get('forge-list-item')).toBeTruthy();
      expect(window.customElements.get('forge-popover')).toBeTruthy();
      expect(window.customElements.get('forge-skeleton')).toBeTruthy();
      expect(window.customElements.get('forge-text-field')).toBeTruthy();
      expect(window.customElements.get('forge-toolbar')).toBeTruthy();
    });
  });

  describe('Boolean properties', () => {
    it('should update open property', async () => {
      const harness = await createFixture();
      expect(harness.element.open).toBe(false);

      harness.element.open = true;
      await harness.element.updateComplete;

      expect(harness.element.open).toBe(true);
    });
  });

  describe('String/Enum properties', () => {
    it('should switch views through user interactions', async () => {
      const harness = await createFixture();

      expect(harness.viewAllAppsButton).toBeTruthy();
      expect(harness.backButton).toBeFalsy();

      harness.viewAllAppsButton?.click();
      await harness.element.updateComplete;

      expect(harness.backButton).toBeTruthy();
      expect(harness.viewAllAppsButton).toBeFalsy();
    });

    it('should default to all view when no related apps provided', async () => {
      const harness = await createFixture({ relatedApps: [] });

      expect(harness.searchField).toBeTruthy();
      expect(harness.viewAllAppsButton).toBeFalsy();
      expect(harness.backButton).toBeFalsy();
    });

    it('should show search field when in all view', async () => {
      const harness = await createFixture({ relatedApps: [] });
      expect(harness.searchField).toBeTruthy();
    });

    it('should hide search field when in related view', async () => {
      const harness = await createFixture({
        relatedApps: [{ label: 'Test App', iconName: 'test', uri: 'http://test.com' }]
      });
      expect(harness.searchField).toBeFalsy();
    });
  });

  describe('Array properties', () => {
    it('should accept relatedApps array', async () => {
      const relatedApps: AppLauncherOption[] = [{ label: 'Test App', iconName: 'test', uri: 'http://test.com' }];
      const harness = await createFixture({ relatedApps });

      expect(harness.element.relatedApps).toEqual(relatedApps);
      expect(harness.element.relatedApps.length).toBe(1);
    });

    it('should accept allApps array', async () => {
      const allApps: AppLauncherOption[] = [
        { label: 'App 1', iconName: 'app1', uri: 'http://app1.com' },
        { label: 'App 2', iconName: 'app2', uri: 'http://app2.com' }
      ];
      const harness = await createFixture({ allApps });

      expect(harness.element.allApps).toEqual(allApps);
      expect(harness.element.allApps.length).toBe(2);
    });
  });

  describe('App icons', () => {
    it('should render default icon when app has no iconName', async () => {
      const harness = await createFixture({
        relatedApps: [{ label: 'App Without Icon', iconName: '', uri: 'http://test.com' }]
      });

      const icon = harness.getAppIcon(0);
      expect(icon).toBeTruthy();
      expect(icon?.name).toBe('application');
      expect(icon?.external).toBe(false);
    });

    it('should render external icon when app has iconName', async () => {
      const harness = await createFixture({
        relatedApps: [{ label: 'App With Icon', iconName: 'custom_icon', uri: 'http://test.com' }]
      });

      const icon = harness.getAppIcon(0);
      expect(icon).toBeTruthy();
      expect(icon?.name).toBe('custom_icon');
      expect(icon?.external).toBe(true);
    });
  });

  describe('Loading functionality', () => {
    it('should show loading view when both arrays are empty', async () => {
      const harness = await createFixture({ relatedApps: [], allApps: [] });

      expect(harness.loadingState).toBeTruthy();
      expect(harness.loadingSkeletons.length).toBe(7); // 1 title + 5 content skeletons + 1 button skeleton
    });

    it('should hide loading view when apps are provided', async () => {
      const harness = await createFixture({
        relatedApps: [{ label: 'Test App', iconName: 'test', uri: 'http://test.com' }]
      });

      expect(harness.loadingState).toBeFalsy();
      expect(harness.viewAllAppsButton).toBeTruthy();
    });

    it('should show loading view when apps are removed', async () => {
      const harness = await createFixture({
        relatedApps: [{ label: 'Test App', iconName: 'test', uri: 'http://test.com' }]
      });

      expect(harness.viewAllAppsButton).toBeTruthy();
      expect(harness.loadingState).toBeFalsy();

      harness.element.relatedApps = [];
      harness.element.allApps = [];
      await harness.element.updateComplete;

      expect(harness.loadingState).toBeTruthy();
      expect(harness.viewAllAppsButton).toBeFalsy();
    });

    it('should transition from loading to appropriate view when apps are added', async () => {
      const harness = await createFixture({ relatedApps: [], allApps: [] });

      expect(harness.loadingState).toBeTruthy();

      harness.element.relatedApps = [{ label: 'Test App', iconName: 'test', uri: 'http://test.com' }];
      await harness.element.updateComplete;

      expect(harness.loadingState).toBeFalsy();
      expect(harness.viewAllAppsButton).toBeTruthy();
    });

    it('should show all view when only allApps are provided', async () => {
      const harness = await createFixture({
        relatedApps: [],
        allApps: [{ label: 'All App', iconName: 'app', uri: 'http://app.com' }]
      });

      expect(harness.loadingState).toBeFalsy();
      expect(harness.searchField).toBeTruthy();
      expect(harness.viewAllAppsButton).toBeFalsy();
    });

    it('should not disable view all apps button once apps are loaded', async () => {
      const harness = await createFixture({ relatedApps: [], allApps: [] });

      expect(harness.loadingState).toBeTruthy();
      expect(harness.viewAllAppsButton).toBeFalsy();

      harness.element.relatedApps = [{ label: 'Test App', iconName: 'test', uri: 'http://test.com' }];
      await harness.element.updateComplete;

      expect(harness.viewAllAppsButton).toBeTruthy();
      expect(harness.viewAllAppsButton?.hasAttribute('disabled')).toBe(false);
    });
  });

  describe('Launcher aria-label property', () => {
    it('should set the aria-label of the launcher button to the launcherAriaLabel property', async () => {
      const harness = await createFixture();

      harness.element.launcherAriaLabel = 'Launch applications';
      await harness.element.updateComplete;

      expect(harness.appLauncherTrigger?.getAttribute('aria-label')).toBe('Launch applications');
    });

    it('should set the aria-label of the launcher button via the launcher-aria-label attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute('launcher-aria-label', 'Open application menu');
      await harness.element.updateComplete;

      expect(harness.appLauncherTrigger?.getAttribute('aria-label')).toBe('Open application menu');
    });

    it('should have default aria-label value', async () => {
      const harness = await createFixture();

      expect(harness.element.launcherAriaLabel).toBe('Open app launcher');
      expect(harness.appLauncherTrigger?.getAttribute('aria-label')).toBe('Open app launcher');
    });
  });

  describe('Back button aria-label property', () => {
    it('should set the aria-label of the back button to the backAriaLabel property', async () => {
      const harness = await createFixture({
        relatedApps: [{ label: 'Test App', iconName: 'test', uri: 'http://test.com' }]
      });

      harness.viewAllAppsButton?.click();
      await harness.element.updateComplete;

      harness.element.backAriaLabel = 'Return to previous view';
      await harness.element.updateComplete;

      expect(harness.backButton?.getAttribute('aria-label')).toBe('Return to previous view');
    });

    it('should set the aria-label of the back button via the back-aria-label attribute', async () => {
      const harness = await createFixture({
        relatedApps: [{ label: 'Test App', iconName: 'test', uri: 'http://test.com' }]
      });

      harness.viewAllAppsButton?.click();
      await harness.element.updateComplete;

      harness.element.setAttribute('back-aria-label', 'Navigate back');
      await harness.element.updateComplete;

      expect(harness.backButton?.getAttribute('aria-label')).toBe('Navigate back');
    });

    it('should have default back button aria-label value', async () => {
      const harness = await createFixture({
        relatedApps: [{ label: 'Test App', iconName: 'test', uri: 'http://test.com' }]
      });

      harness.viewAllAppsButton?.click();
      await harness.element.updateComplete;

      expect(harness.element.backAriaLabel).toBe('Go back');
      expect(harness.backButton?.getAttribute('aria-label')).toBe('Go back');
    });
  });

  describe('Close button aria-label property', () => {
    it('should set the aria-label of the close button to the closeAriaLabel property', async () => {
      const harness = await createFixture({ open: true });

      harness.element.closeAriaLabel = 'Dismiss app launcher';
      await harness.element.updateComplete;

      expect(harness.closeButton?.getAttribute('aria-label')).toBe('Dismiss app launcher');
    });

    it('should set the aria-label of the close button via the close-aria-label attribute', async () => {
      const harness = await createFixture({ open: true });

      harness.element.setAttribute('close-aria-label', 'Exit application menu');
      await harness.element.updateComplete;

      expect(harness.closeButton?.getAttribute('aria-label')).toBe('Exit application menu');
    });

    it('should have default close button aria-label value', async () => {
      const harness = await createFixture({ open: true });

      expect(harness.element.closeAriaLabel).toBe('Close app launcher');
      expect(harness.closeButton?.getAttribute('aria-label')).toBe('Close app launcher');
    });
  });

  describe('Search placeholder property', () => {
    it('should have default search placeholder value', async () => {
      const harness = await createFixture({ relatedApps: [] });

      expect(harness.element.searchPlaceholder).toBe('Search by product or app');
      expect(harness.searchField?.getAttribute('placeholder')).toBe('Search by product or app');
    });

    it('should set the placeholder of the search input to the searchPlaceholder property', async () => {
      const harness = await createFixture({ relatedApps: [] });

      harness.element.searchPlaceholder = 'Find an app';
      await harness.element.updateComplete;

      expect(harness.searchField?.getAttribute('placeholder')).toBe('Find an app');
    });

    it('should set the placeholder of the search input via the search-placeholder attribute', async () => {
      const harness = await createFixture({ relatedApps: [] });

      harness.element.setAttribute('search-placeholder', 'Look for a product');
      await harness.element.updateComplete;

      expect(harness.searchField?.getAttribute('placeholder')).toBe('Look for a product');
    });
  });

  describe('Header title slot', () => {
    it('should render default header title text', async () => {
      const harness = await createFixture();
      expect(harness.headerTitleSlot?.textContent?.trim()).toBe('App Launcher');
    });

    it('should render custom slotted header title text', async () => {
      const harness = await createFixture();

      const titleElement = document.createElement('span');
      titleElement.slot = 'header-title';
      titleElement.textContent = 'My Custom Launcher';
      harness.element.appendChild(titleElement);
      await harness.element.updateComplete;

      expect(harness.headerTitleSlot?.assignedNodes({ flatten: true })[0]?.textContent).toBe('My Custom Launcher');
    });
  });

  describe('Empty state text slot', () => {
    it('should render default empty state text', async () => {
      const allApps: AppLauncherOption[] = [{ label: 'Payment System', iconName: 'payment', uri: 'http://test.com' }];
      const harness = await createFixture({ relatedApps: [], allApps });

      await harness.typeInSearchField('nonexistentapp');
      await harness.element.updateComplete;

      expect(harness.emptyStateTextSlot?.textContent?.trim()).toBe('No applications found');
    });

    it('should render custom slotted empty state text', async () => {
      const allApps: AppLauncherOption[] = [{ label: 'Payment System', iconName: 'payment', uri: 'http://test.com' }];
      const harness = await createFixture({ relatedApps: [], allApps });

      const emptyStateElement = document.createElement('span');
      emptyStateElement.slot = 'empty-state-text';
      emptyStateElement.textContent = 'No results';
      harness.element.appendChild(emptyStateElement);
      await harness.element.updateComplete;

      await harness.typeInSearchField('nonexistentapp');
      await harness.element.updateComplete;

      expect(harness.emptyStateTextSlot?.assignedNodes({ flatten: true })[0]?.textContent).toBe('No results');
    });
  });

  describe('Loading text slot', () => {
    it('should render default loading text', async () => {
      const harness = await createFixture({ relatedApps: [], allApps: [] });
      expect(harness.loadingTextSlot?.textContent?.trim()).toBe('Loading apps');
    });

    it('should render custom slotted loading text', async () => {
      const harness = await createFixture({ relatedApps: [], allApps: [] });

      const loadingElement = document.createElement('span');
      loadingElement.slot = 'loading-text';
      loadingElement.textContent = 'Fetching apps...';
      harness.element.appendChild(loadingElement);
      await harness.element.updateComplete;

      expect(harness.loadingTextSlot?.assignedNodes({ flatten: true })[0]?.textContent).toBe('Fetching apps...');
    });
  });

  describe('State management', () => {
    it('should reset state when close button is clicked', async () => {
      const harness = await createFixture({
        open: true,
        allApps: [{ label: 'Test App', iconName: 'test', uri: 'http://test.com' }],
        relatedApps: []
      });

      const searchField = harness.searchField;
      if (searchField) {
        searchField.value = 'test search';
        searchField.dispatchEvent(new Event('input', { bubbles: true }));
      }
      await harness.element.updateComplete;

      harness.closeButton?.click();
      await harness.element.updateComplete;

      expect(harness.element.open).toBe(false);
    });

    it('should reset state to initial values', async () => {
      const harness = await createFixture();

      harness.element.open = true;
      await harness.element.updateComplete;
      expect(harness.element.open).toBe(true);

      harness.closeButton?.click();
      await harness.element.updateComplete;

      expect(harness.element.open).toBe(false);
    });
  });

  describe('Popover events', () => {
    it('should handle forge-popover-toggle event and reset state when closed', async () => {
      stubMatchMedia(false);
      const harness = await createFixture({ open: true, relatedApps: [] });

      harness.element.open = true;
      await harness.typeInSearchField('test search');
      await harness.element.updateComplete;

      expect(harness.element.open).toBe(true);
      expect(harness.searchField).toBeTruthy();

      const popover = harness.popover;
      expect(popover).toBeTruthy();

      popover?.dispatchEvent(new CustomEvent('forge-popover-toggle', { detail: { newState: 'closed' }, bubbles: true }));
      await harness.element.updateComplete;

      expect(harness.element.open).toBe(false);
    });

    it('should not reset state when popover toggle event has non-closed state', async () => {
      stubMatchMedia(false);
      const harness = await createFixture({ open: true, relatedApps: [] });

      harness.element.open = true;
      await harness.element.updateComplete;
      expect(harness.element.open).toBe(true);

      const popover = harness.popover;
      expect(popover).toBeTruthy();

      popover?.dispatchEvent(new CustomEvent('forge-popover-toggle', { detail: { newState: 'opened' }, bubbles: true }));
      await harness.element.updateComplete;

      expect(harness.element.open).toBe(true);
    });

    it('should only render popover when smallScreen is false', async () => {
      stubMatchMedia(false);
      const harness = await createFixture();

      expect(harness.popover).toBeTruthy();
      expect(harness.dialog).toBeFalsy();
    });
  });

  describe('Dialog events', () => {
    it('should handle forge-dialog-close event and reset state', async () => {
      stubMatchMedia(true);
      const harness = await createFixture({ open: true, relatedApps: [] });

      harness.element.open = true;
      await harness.typeInSearchField('test search');
      await harness.element.updateComplete;

      expect(harness.element.open).toBe(true);
      expect(harness.searchField).toBeTruthy();

      const dialog = harness.dialog;
      expect(dialog).toBeTruthy();

      dialog?.dispatchEvent(new CustomEvent('forge-dialog-close', { bubbles: true }));
      await harness.element.updateComplete;

      expect(harness.element.open).toBe(false);
    });

    it('should only render dialog when smallScreen is true', async () => {
      stubMatchMedia(true);
      const harness = await createFixture();

      expect(harness.dialog).toBeTruthy();
      expect(harness.popover).toBeFalsy();
    });

    it('should set ElementInternals states based on screen size', async () => {
      stubMatchMedia(false);
      const largeHarness = await createFixture();

      expect(largeHarness.element.matches(':state(large)')).toBe(true);
      expect(largeHarness.element.matches(':state(small)')).toBe(false);

      stubMatchMedia(true);
      const smallHarness = await createFixture();

      expect(smallHarness.element.matches(':state(small)')).toBe(true);
      expect(smallHarness.element.matches(':state(large)')).toBe(false);
    });

    it('should reset state consistently between dialog and popover close events', async () => {
      stubMatchMedia(true);
      const dialogHarness = await createFixture({ open: true, relatedApps: [] });

      dialogHarness.element.open = true;
      await dialogHarness.element.updateComplete;
      expect(dialogHarness.dialog).toBeTruthy();

      dialogHarness.dialog?.dispatchEvent(new CustomEvent('forge-dialog-close', { bubbles: true }));
      await dialogHarness.element.updateComplete;
      expect(dialogHarness.element.open).toBe(false);

      stubMatchMedia(false);
      const popoverHarness = await createFixture({ open: true, relatedApps: [] });

      popoverHarness.element.open = true;
      await popoverHarness.element.updateComplete;
      expect(popoverHarness.popover).toBeTruthy();

      popoverHarness.popover?.dispatchEvent(new CustomEvent('forge-popover-toggle', { detail: { newState: 'closed' }, bubbles: true }));
      await popoverHarness.element.updateComplete;
      expect(popoverHarness.element.open).toBe(false);
    });
  });

  describe('Search functionality', () => {
    const searchApps: AppLauncherOption[] = [
      { label: 'Payment System', iconName: 'payment', uri: 'http://payment.com' },
      { label: 'User Management', iconName: 'users', uri: 'http://users.com' },
      { label: 'Analytics Dashboard', iconName: 'analytics', uri: 'http://analytics.com' },
      { label: 'Settings Panel', iconName: 'settings', uri: 'http://settings.com' }
    ];

    it('should filter apps based on search input', async () => {
      const harness = await createFixture({ relatedApps: [], allApps: searchApps });

      expect(harness.appLinks.length).toBe(4);

      await harness.typeInSearchField('payment');
      await harness.element.updateComplete;
      expect(harness.appLinks.length).toBe(1);
      expect(harness.appLinks[0].textContent?.trim()).toContain('Payment System');

      await harness.typeInSearchField('user');
      await harness.element.updateComplete;
      expect(harness.appLinks.length).toBe(1);
      expect(harness.appLinks[0].textContent?.trim()).toContain('User Management');

      await harness.typeInSearchField('system');
      await harness.element.updateComplete;
      expect(harness.appLinks.length).toBe(1);
      expect(harness.appLinks[0].textContent?.trim()).toContain('Payment System');
    });

    it('should be case insensitive when filtering', async () => {
      const harness = await createFixture({ relatedApps: [], allApps: searchApps.slice(0, 2) });

      await harness.typeInSearchField('PAYMENT');
      await harness.element.updateComplete;
      expect(harness.appLinks.length).toBe(1);
      expect(harness.appLinks[0].textContent?.trim()).toContain('Payment System');

      await harness.typeInSearchField('UsEr');
      await harness.element.updateComplete;
      expect(harness.appLinks.length).toBe(1);
      expect(harness.appLinks[0].textContent?.trim()).toContain('User Management');
    });

    it('should show empty state when no apps match search', async () => {
      const harness = await createFixture({ relatedApps: [], allApps: searchApps.slice(0, 2) });

      await harness.typeInSearchField('nonexistentapp');
      await harness.element.updateComplete;

      expect(harness.emptyState).toBeTruthy();
      expect(harness.emptyState?.textContent?.trim()).toContain('No applications found');
      expect(harness.appLinks.length).toBe(0);
    });

    it('should show all apps when search is cleared', async () => {
      const harness = await createFixture({ relatedApps: [], allApps: searchApps.slice(0, 2) });

      await harness.typeInSearchField('payment');
      await harness.element.updateComplete;
      expect(harness.appLinks.length).toBe(1);

      await harness.typeInSearchField('');
      await harness.element.updateComplete;
      expect(harness.appLinks.length).toBe(2);
    });

    it('should not show empty state when search field is empty', async () => {
      const harness = await createFixture({ allApps: [] });
      expect(harness.emptyState).toBeFalsy();
    });
  });

  describe('Slot change handling', () => {
    const monitoredSlotSetups: Record<string, () => Promise<AppLauncherHarness>> = {
      'related-apps-title': () => createFixture({ relatedApps: [{ label: 'Test App', iconName: 'test', uri: 'http://test.com' }] }),
      'view-all-apps-button-text': () => createFixture({ relatedApps: [{ label: 'Test App', iconName: 'test', uri: 'http://test.com' }] }),
      'header-title': () => createFixture(),
      'all-apps-title': () => createFixture({ relatedApps: [], allApps: [{ label: 'All App', iconName: 'app', uri: 'http://app.com' }] }),
      'loading-text': () => createFixture({ relatedApps: [], allApps: [] }),
      'app-launcher-link': async () => {
        const harness = await createFixture();
        const link = document.createElement('a');
        link.slot = 'app-launcher-link';
        link.textContent = 'Docs';
        harness.element.appendChild(link);
        await harness.element.updateComplete;
        return harness;
      },
      'app-launcher-links-title': async () => {
        const harness = await createFixture();
        const link = document.createElement('a');
        link.slot = 'app-launcher-link';
        link.textContent = 'Docs';
        harness.element.appendChild(link);
        await harness.element.updateComplete;
        return harness;
      },
      'empty-state-text': async () => {
        const harness = await createFixture({
          relatedApps: [],
          allApps: [{ label: 'Payment System', iconName: 'payment', uri: 'http://test.com' }]
        });
        await harness.typeInSearchField('nonexistentapp');
        return harness;
      }
    };

    it.each(Object.keys(monitoredSlotSetups))('should trigger update when the %s slot changes', async slotName => {
      const harness = await monitoredSlotSetups[slotName]();

      const slot = harness.element.shadowRoot!.querySelector(`slot[name="${slotName}"]`) as HTMLSlotElement | null;
      expect(slot).toBeTruthy();

      const requestUpdateSpy = vi.spyOn(harness.element, 'requestUpdate');

      slot!.dispatchEvent(new Event('slotchange', { bubbles: true }));
      await harness.element.updateComplete;

      expect(requestUpdateSpy).toHaveBeenCalled();
    });

    it('should not trigger update for non-monitored slot changes', async () => {
      const harness = await createFixture();
      const requestUpdateSpy = vi.spyOn(harness.element, 'requestUpdate');

      const listeningElement = harness.popover ?? harness.dialog;
      expect(listeningElement).toBeTruthy();

      const fakeSlot = document.createElement('slot');
      fakeSlot.setAttribute('name', 'non-monitored-slot');
      const slotChangeEvent = new Event('slotchange', { bubbles: true });
      Object.defineProperty(slotChangeEvent, 'target', { value: fakeSlot, enumerable: true });

      listeningElement!.dispatchEvent(slotChangeEvent);
      await harness.element.updateComplete;

      expect(requestUpdateSpy).not.toHaveBeenCalled();
    });

    it('should handle slotchange when all-apps-title content changes', async () => {
      const harness = await createFixture({ relatedApps: [] });

      const titleElement = document.createElement('span');
      titleElement.textContent = 'Initial Title';
      titleElement.slot = 'all-apps-title';
      harness.element.appendChild(titleElement);
      await harness.element.updateComplete;

      const requestUpdateSpy = vi.spyOn(harness.element, 'requestUpdate');

      titleElement.textContent = 'Updated Title';
      const allAppsSlot = harness.element.shadowRoot!.querySelector('slot[name="all-apps-title"]') as HTMLSlotElement;
      allAppsSlot.dispatchEvent(new Event('slotchange', { bubbles: true }));
      await harness.element.updateComplete;

      expect(requestUpdateSpy).toHaveBeenCalled();
    });
  });

  describe('View All Apps button functionality', () => {
    it('should switch to all apps view when View All Apps button is clicked', async () => {
      const harness = await createFixture({
        relatedApps: [{ label: 'Test App', iconName: 'test', uri: 'http://test.com' }],
        allApps: [
          { label: 'All App 1', iconName: 'app1', uri: 'http://app1.com' },
          { label: 'All App 2', iconName: 'app2', uri: 'http://app2.com' }
        ]
      });

      expect(harness.viewAllAppsButton).toBeTruthy();
      expect(harness.searchField).toBeFalsy();

      harness.viewAllAppsButton?.click();
      await harness.element.updateComplete;

      expect(harness.searchField).toBeTruthy();
      expect(harness.viewAllAppsButton).toBeFalsy();
    });

    it('should switch back to related apps view when back arrow button is clicked', async () => {
      const harness = await createFixture({
        relatedApps: [{ label: 'Test App', iconName: 'test', uri: 'http://test.com' }],
        allApps: [
          { label: 'All App 1', iconName: 'app1', uri: 'http://app1.com' },
          { label: 'All App 2', iconName: 'app2', uri: 'http://app2.com' }
        ]
      });

      harness.viewAllAppsButton?.click();
      await harness.element.updateComplete;

      expect(harness.searchField).toBeTruthy();
      expect(harness.backButton).toBeTruthy();
      expect(harness.viewAllAppsButton).toBeFalsy();

      harness.backButton?.click();
      await harness.element.updateComplete;

      expect(harness.searchField).toBeFalsy();
      expect(harness.viewAllAppsButton).toBeTruthy();
      expect(harness.backButton).toBeFalsy();
    });

    it('should clear search field input when switching back to related apps view', async () => {
      const harness = await createFixture({
        relatedApps: [{ label: 'Test App', iconName: 'test', uri: 'http://test.com' }],
        allApps: [
          { label: 'Payment System', iconName: 'payment', uri: 'http://payment.com' },
          { label: 'User Management', iconName: 'users', uri: 'http://users.com' }
        ]
      });

      harness.viewAllAppsButton?.click();
      await harness.element.updateComplete;
      expect(harness.searchField).toBeTruthy();

      await harness.typeInSearchField('payment');
      await harness.element.updateComplete;
      expect(harness.searchField?.value).toBe('payment');
      expect(harness.appLinks.length).toBe(1);
      expect(harness.appLinks[0].textContent?.trim()).toContain('Payment System');

      harness.backButton?.click();
      await harness.element.updateComplete;

      harness.viewAllAppsButton?.click();
      await harness.element.updateComplete;

      expect(harness.searchField).toBeTruthy();
      expect(harness.searchField?.value).toBe('');
      expect(harness.appLinks.length).toBe(2);
    });
  });
});

function stubMatchMedia(matches: boolean): void {
  vi.spyOn(window, 'matchMedia').mockReturnValue({
    matches,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    media: '',
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn()
  } as unknown as MediaQueryList);
}

class AppLauncherHarness extends TestHarness<IAppLauncherComponent> {
  public initElementRefs(): void {
    // Elements are queried lazily via getters below since they change based on component state.
  }

  public get appLauncherTrigger(): HTMLElement {
    return getShadowElement(this.element, '#app-launcher-trigger');
  }

  public get popover(): IPopoverComponent | null {
    return getShadowElement(this.element, '#app-launcher-popover') as IPopoverComponent | null;
  }

  public get dialog(): IDialogComponent | null {
    return getShadowElement(this.element, 'forge-dialog') as IDialogComponent | null;
  }

  public get searchField(): HTMLInputElement | null {
    return getShadowElement(this.element, 'forge-text-field input') as HTMLInputElement | null;
  }

  public get headerTitleSlot(): HTMLSlotElement | null {
    return getShadowElement(this.element, '#header-title-slot') as HTMLSlotElement | null;
  }

  public get emptyStateTextSlot(): HTMLSlotElement | null {
    return getShadowElement(this.element, '#empty-state-text-slot') as HTMLSlotElement | null;
  }

  public get loadingTextSlot(): HTMLSlotElement | null {
    return getShadowElement(this.element, '#loading-text-slot') as HTMLSlotElement | null;
  }

  public get viewAllAppsButton(): HTMLElement | null {
    return getShadowElement(this.element, 'forge-button') as HTMLElement | null;
  }

  public get backButton(): HTMLElement | null {
    return getShadowElement(this.element, 'forge-icon-button[slot="before-start"]') as HTMLElement | null;
  }

  public get closeButton(): HTMLElement | null {
    return getShadowElement(this.element, '.close-button') as HTMLElement | null;
  }

  public get emptyState(): HTMLElement | null {
    return getShadowElement(this.element, '.empty-state') as HTMLElement | null;
  }

  public get appLinks(): HTMLElement[] {
    return Array.from(this.element.shadowRoot!.querySelectorAll('.app-list-item'));
  }

  public get loadingState(): HTMLElement | null {
    return getShadowElement(this.element, '.loading-state') as HTMLElement | null;
  }

  public get loadingSkeletons(): HTMLElement[] {
    return Array.from(this.element.shadowRoot!.querySelectorAll('.loading-state forge-skeleton'));
  }

  public getAppIcon(index: number): IIconComponent | null {
    const appItems = this.appLinks;
    if (index >= appItems.length) {
      return null;
    }
    return appItems[index].querySelector('forge-avatar forge-icon') as IIconComponent | null;
  }

  public async typeInSearchField(text: string): Promise<void> {
    const searchField = this.searchField;
    if (searchField) {
      searchField.value = text;
      searchField.dispatchEvent(new Event('input', { bubbles: true }));
    }
    await this.element.updateComplete;
  }
}

interface AppLauncherFixtureConfig {
  open?: boolean;
  relatedApps?: AppLauncherOption[];
  allApps?: AppLauncherOption[];
}

async function createFixture({
  open = false,
  relatedApps = [{ label: 'Test App', iconName: 'test', uri: 'http://test.com' }],
  allApps = [
    { label: 'All App 1', iconName: 'app1', uri: 'http://app1.com' },
    { label: 'All App 2', iconName: 'app2', uri: 'http://app2.com' }
  ]
}: AppLauncherFixtureConfig = {}): Promise<AppLauncherHarness> {
  const screen = render(html`<forge-app-launcher .open=${open} .relatedApps=${relatedApps} .allApps=${allApps}></forge-app-launcher>`);
  const element = screen.container.querySelector('forge-app-launcher') as IAppLauncherComponent;
  await element.updateComplete;

  return new AppLauncherHarness(element);
}
