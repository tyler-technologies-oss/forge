import '$src/shared';
import './app-bar.scss';

// Components
import '@tylertech/forge/app-bar';
import '@tylertech/forge/icon';
import '@tylertech/forge/tabs';

// Icons
import type {
  IAppBarComponent,
  IAppBarHelpButtonComponent,
  IAppBarMenuButtonComponent,
  IAppBarProfileButtonComponent,
  IAppBarSearchComponent
} from '@tylertech/forge/app-bar';
import { IconRegistry } from '@tylertech/forge/icon';
import type { IListDropdownOption } from '@tylertech/forge/list-dropdown';
import type { ISelectComponent } from '@tylertech/forge/select';
import type { ITabBarComponent } from '@tylertech/forge/tabs';
import type { ISwitchComponent } from '@tylertech/forge/switch';
import { tylIconForgeLogo } from '@tylertech/tyler-icons/custom';
import {
  tylIconAssignment,
  tylIconClose,
  tylIconHelpOutline,
  tylIconInfoOutline,
  tylIconSettings,
  tylIconStars,
  tylIconWarning,
  tylIconWorkOutline
} from '@tylertech/tyler-icons/standard';

IconRegistry.define([
  tylIconForgeLogo,
  tylIconClose,
  tylIconHelpOutline,
  tylIconStars,
  tylIconInfoOutline,
  tylIconAssignment,
  tylIconWorkOutline,
  tylIconWarning,
  tylIconSettings
]);

const appBar = document.querySelector('forge-app-bar#forge-app-bar-example') as IAppBarComponent;
const appBarSearch = appBar.querySelector('forge-app-bar-search#app-bar-search') as IAppBarSearchComponent;
const appBarProfileButton = appBar.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;
const appBarTabs = appBar.querySelector('forge-tab-bar') as ITabBarComponent;

const appBarHelpButton = appBar.querySelector('forge-app-bar-help-button') as IAppBarHelpButtonComponent;
appBarHelpButton.options = [
  { value: 'help', label: 'Help', leadingIcon: 'help_outline', leadingIconType: 'component' },
  { value: 'enhancements', label: 'Enhancements', leadingIcon: 'stars', leadingIconType: 'component' },
  { value: 'about', label: 'About', leadingIcon: 'info_outline', leadingIconType: 'component' }
] as IListDropdownOption[];

appBarHelpButton.addEventListener('forge-menu-select', ({ detail }) => {
  console.log('[forge-menu-select]', detail);
});

const appBarMenuButton = appBar.querySelector('#forge-app-bar-example-menu-button') as IAppBarMenuButtonComponent;
appBarMenuButton.addEventListener('click', ({ detail }) => {
  console.log('[app-bar-menu-button] click', detail);

  const toast = document.createElement('forge-toast');
  toast.message = 'Menu clicked';
  document.body.appendChild(toast);
});

appBarSearch.addEventListener('forge-app-bar-search-input', ({ detail }) => {
  console.log('[forge-app-bar-search] ', detail);

  const toast = document.createElement('forge-toast');
  toast.message = 'Search text: ' + detail.value;
  document.body.appendChild(toast);
});

const useProfileCardBuilderToggle = document.querySelector('#app-bar-profile-card-builder-toggle') as ISwitchComponent;
useProfileCardBuilderToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  appBarProfileButton.profileCardBuilder = selected ? profileCardBuilder : undefined;
});

function buildListItemElement(text: string, icon: string, value: string): HTMLElement {
  const listItemElement = document.createElement('forge-list-item');
  listItemElement.value = value;

  const iconElement = document.createElement('forge-icon');
  iconElement.slot = 'leading';
  iconElement.name = icon;
  listItemElement.appendChild(iconElement);

  const textElement = document.createElement('span');
  textElement.innerText = text;
  listItemElement.appendChild(textElement);

  return listItemElement;
}

function profileCardBuilder(): HTMLElement {
  const listElement = document.createElement('forge-list');
  listElement.addEventListener('forge-list-item-select', ({ detail }) => {
    console.log('[profile-card] Selected custom item:', detail.value);
  });
  listElement.style.setProperty('--forge-list-padding', '0');
  listElement.appendChild(document.createElement('forge-divider'));
  listElement.appendChild(buildListItemElement('My Reports', 'assignment', 'reports'));
  listElement.appendChild(buildListItemElement('My Workflow', 'work_outline', 'workflow'));
  listElement.appendChild(buildListItemElement('My Alerts', 'warning', 'alerts'));
  listElement.appendChild(buildListItemElement('My Preferences', 'settings', 'preferences'));
  return listElement;
}

const appBarRaisedToggle = document.querySelector('#app-bar-raised-toggle') as ISwitchComponent;
appBarRaisedToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  appBar.raised = selected;
});

const appBarTitleInput = document.querySelector('#app-bar-title-input') as HTMLInputElement;
appBarTitleInput.addEventListener('input', () => {
  appBar.titleText = appBarTitleInput.value;
});

const appBarThemeSelect = document.querySelector('#app-bar-theme-select') as ISelectComponent;
appBarThemeSelect.addEventListener('change', () => {
  if (appBarThemeSelect.value) {
    appBar.setAttribute('theme', appBarThemeSelect.value);
  } else {
    appBar.removeAttribute('theme');
  }
});

const showAppBarTabsToggle = document.querySelector('#app-bar-show-tabs-toggle') as ISwitchComponent;
showAppBarTabsToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  if (selected) {
    appBarTabs.style.removeProperty('display');
  } else {
    appBarTabs.style.display = 'none';
  }
});

