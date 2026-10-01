import type { IMenuComponent, IMenuOption } from '@tylertech/forge';
import type { AppLauncherOption, IAppLauncherComponent } from '@tylertech/forge/app-launcher';
import { IconRegistry } from '@tylertech/forge/icon';
import {
  tylIconAccount,
  tylIconAccountCircle,
  tylIconApps,
  tylIconBarChart,
  tylIconDashboard,
  tylIconFolder,
  tylIconForgeLogo,
  tylIconHelp,
  tylIconPeople,
  tylIconSettings,
  tylIconMoreVert,
  tylIconNotifications
} from '@tylertech/tyler-icons';

IconRegistry.define([
  tylIconAccount,
  tylIconAccountCircle,
  tylIconApps,
  tylIconBarChart,
  tylIconDashboard,
  tylIconFolder,
  tylIconForgeLogo,
  tylIconHelp,
  tylIconPeople,
  tylIconSettings,
  tylIconMoreVert,
  tylIconNotifications
]);

const menu = document.getElementById('mobile-menu') as IMenuComponent;

const options: IMenuOption[] = [
  { label: 'Help', value: 'help', leadingIcon: 'help', leadingIconType: 'component' },
  { label: 'Notifications', value: 'notifications', leadingIcon: 'notifications', leadingIconType: 'component' },
  { label: 'Apps', value: 'apps', leadingIcon: 'apps', leadingIconType: 'component' },
  { label: 'Profile', value: 'profile', leadingIcon: 'account_circle', leadingIconType: 'component' }
];

menu.options = options;

menu.addEventListener('forge-menu-select', evt => {
  console.log('Selected option:', evt.detail.value);
});

const relatedApps: AppLauncherOption[] = [
  { label: 'Payments Administration', iconName: 'payment', uri: 'https://www.tylertech.com', target: '_blank' },
  { label: 'User Management', iconName: 'people', uri: 'https://www.tylertech.com', target: '_blank' }
];

const appLauncher = document.querySelector<IAppLauncherComponent>('forge-app-launcher');

if (appLauncher) {
  appLauncher.relatedApps = relatedApps;
  appLauncher.allApps = relatedApps;
}
