import type { AppLauncherOption, IAppLauncherComponent } from '@tylertech/forge/app-launcher';

const relatedApps: AppLauncherOption[] = [
  { label: 'Canva', iconName: 'palette', uri: 'https://www.canva.com', target: '_blank' },
  { label: 'Figma', iconName: 'design_services', uri: 'https://www.figma.com', target: '_blank' },
  { label: 'GitHub', iconName: '', uri: 'https://github.com', target: '_blank' },
  { label: 'Slack', iconName: 'forum', uri: 'https://slack.com', target: '_blank' },
  { label: 'Trello', iconName: 'view_kanban', uri: 'https://trello.com', target: '_blank' }
];

const allApps: AppLauncherOption[] = [
  ...relatedApps,
  { label: 'Payments Administration', iconName: 'payment', uri: 'https://www.tylertech.com', target: '_blank' },
  { label: 'PEP Administration', iconName: 'admin_panel_settings', uri: 'https://www.tylertech.com', target: '_blank' },
  { label: 'User Management', iconName: 'people', uri: 'https://www.tylertech.com', target: '_blank' },
  { label: 'Time Tracking', iconName: 'schedule', uri: 'https://www.tylertech.com', target: '_blank' },
  { label: 'Document Center', iconName: 'folder', uri: 'https://www.tylertech.com', target: '_blank' }
];

const appLauncher = document.querySelector<IAppLauncherComponent>('forge-app-launcher');

if (appLauncher) {
  appLauncher.relatedApps = relatedApps;
  appLauncher.allApps = allApps;
}
