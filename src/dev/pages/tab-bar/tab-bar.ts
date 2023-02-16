import '$src/shared';
import '@tylertech/forge/tabs';
import { IconRegistry, ISelectComponent, ISwitchComponent, ITabBarComponent } from '@tylertech/forge';
import { tylIconFavorite, tylIconSettings } from '@tylertech/tyler-icons/standard';
import './tab-bar.scss';

IconRegistry.define([
  tylIconFavorite,
  tylIconSettings
]);

const tabBar = document.querySelector('forge-tab-bar#demo-tabs') as ITabBarComponent;
const tabContent = document.querySelector('.tab-content');
const firstTab = tabBar.querySelector('forge-tab:first-child');

setTabContent(0);

tabBar.addEventListener('forge-tab-bar-activate', ({ detail: { index }}) => {
  setTabContent(index);
});

const layoutModeSelect = document.getElementById('opt-layout-mode') as ISelectComponent;
layoutModeSelect.addEventListener('change', () => {
  tabBar.layoutMode = layoutModeSelect.value;
});

const layoutAlignSelect = document.getElementById('opt-layout-align') as ISelectComponent;
layoutAlignSelect.addEventListener('change', () => {
  tabBar.layoutAlign = layoutAlignSelect.value;
});

const underlinedToggle = document.getElementById('opt-underlined') as ISwitchComponent;
underlinedToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  tabBar.underline = selected;
});

const stackedToggle = document.getElementById('opt-stacked') as ISwitchComponent;
stackedToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  tabBar.stacked = selected;

  if (selected) {
    const icon = document.createElement('forge-icon');
    icon.name = 'favorite';
    icon.slot = 'top';
    firstTab.appendChild(icon);
  } else {
    const i = firstTab.querySelector('forge-icon');
    firstTab?.removeChild(i);
  }
});

const autoActivateToggle = document.getElementById('opt-auto-activate') as ISwitchComponent;
autoActivateToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  tabBar.autoActivate = selected;
});

const allowScrollButtonsToggle = document.getElementById('opt-allow-scroll-buttons') as ISwitchComponent;
allowScrollButtonsToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  tabBar.scrollButtons = selected;
});

const forceScrollButtonsToggle = document.getElementById('opt-force-scroll-buttons') as ISwitchComponent;
forceScrollButtonsToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  tabBar.forceScrollButtons = selected;
});

function setTabContent(index: number): void {
  tabContent.innerHTML = `Content for tab index: ${index}`;
}
