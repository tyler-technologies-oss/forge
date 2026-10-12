import type { AppLauncherOption, AppLauncherToggleEventData, IAppLauncherComponent } from '@tylertech/forge/app-launcher';

const FETCH_DELAY_MS = 2000;

const apps: AppLauncherOption[] = [
  { label: 'Payments Administration', iconName: 'payment', uri: 'https://www.tylertech.com', target: '_blank' },
  { label: 'PEP Administration', iconName: 'admin_panel_settings', uri: 'https://www.tylertech.com', target: '_blank' },
  { label: 'User Management', iconName: 'people', uri: 'https://www.tylertech.com', target: '_blank' },
  { label: 'Time Tracking', iconName: 'schedule', uri: 'https://www.tylertech.com', target: '_blank' },
  { label: 'Document Center', iconName: 'folder', uri: 'https://www.tylertech.com', target: '_blank' }
];

/** Simulates an authenticated, per-user API request. */
const fetchApps = (): Promise<AppLauncherOption[]> => new Promise(resolve => setTimeout(() => resolve(apps), FETCH_DELAY_MS));

const appLauncher = document.querySelector<IAppLauncherComponent>('forge-app-launcher');
let hasRequestedApps = false;

appLauncher?.addEventListener('forge-app-launcher-toggle', async (evt: CustomEvent<AppLauncherToggleEventData>) => {
  if (evt.detail.newState !== 'open' || hasRequestedApps) {
    return;
  }

  hasRequestedApps = true;

  try {
    const loadedApps = await fetchApps();
    appLauncher.allApps = loadedApps;
  } catch {
    hasRequestedApps = false;
  }
});
