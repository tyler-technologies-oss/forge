import '$src/shared';
import './app-bar.scss';
import '@tylertech/forge/app-bar/forge-app-bar.scss';

// Components
import '@tylertech/forge/app-bar';
import '@tylertech/forge/icon';
import '@tylertech/forge/tabs';

// Icons
import type {
  AppBarElevation,
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
  tylIconWorkOutline,
  tylIconKeyboardVoice
} from '@tylertech/tyler-icons/standard';
import { ToastComponent } from '@tylertech/forge/toast';

IconRegistry.define([
  tylIconForgeLogo,
  tylIconClose,
  tylIconHelpOutline,
  tylIconStars,
  tylIconInfoOutline,
  tylIconAssignment,
  tylIconWorkOutline,
  tylIconWarning,
  tylIconSettings,
  tylIconKeyboardVoice
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
  ToastComponent.present({ message: 'Menu clicked' });
});

appBarSearch.addEventListener('forge-app-bar-search-input', ({ detail }) => {
  console.log('[forge-app-bar-search] ', detail);
  ToastComponent.present({ message: `Search text: ${detail.value}` });
});

const themeSelect = document.querySelector('#opt-theme') as ISelectComponent;
themeSelect.addEventListener('change', () => {
  appBar.theme = themeSelect.value || '';
});

const elevationSelect = document.querySelector('#opt-elevation') as ISelectComponent;
elevationSelect.addEventListener('change', ({ detail }) => {
  appBar.elevation = detail as AppBarElevation;
});

const titleInput = document.querySelector('#opt-title-text') as HTMLInputElement;
titleInput.addEventListener('input', () => {
  appBar.titleText = titleInput.value;
});

const hrefToggle = document.querySelector('#opt-href') as ISwitchComponent;
hrefToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  appBar.href = selected ? 'javascript: void(0);' : undefined;
});

const showTabsToggle = document.querySelector('#opt-show-tabs') as ISwitchComponent;
showTabsToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  if (selected) {
    appBar.appendChild(appBarTabs);
  } else {
    appBarTabs.remove();
  }
});

const useProfileCardBuilderToggle = document.querySelector('#opt-profile-card-builder') as ISwitchComponent;
useProfileCardBuilderToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  appBarProfileButton.profileCardBuilder = selected ? profileCardBuilder : undefined;
});

function buildListItemElement(text: string, icon: string, value: string): HTMLElement {
  const listItemElement = document.createElement('forge-list-item');
  listItemElement.value = value;

  const iconElement = document.createElement('forge-icon');
  iconElement.slot = 'leading';
  iconElement.name = icon;
  listItemElement.appendChild(iconElement);

  const buttonElement = document.createElement('button');
  buttonElement.type = 'button';
  buttonElement.textContent = text;
  listItemElement.appendChild(buttonElement);

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
