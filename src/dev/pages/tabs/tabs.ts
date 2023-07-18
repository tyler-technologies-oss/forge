import '$src/shared';
import '@tylertech/forge/tabs';
import '@tylertech/forge/view-switcher';
import { IconRegistry, ISelectComponent, ISwitchComponent, ITabBarComponent, IViewSwitcherComponent } from '@tylertech/forge';
import { tylIconFavorite, tylIconVideocam, tylIconInsertPhoto, tylIconAudiotrack } from '@tylertech/tyler-icons/standard';
import './tabs.scss';

IconRegistry.define([
  tylIconFavorite,
  tylIconVideocam,
  tylIconInsertPhoto,
  tylIconAudiotrack
]);

const container = document.querySelector('.tabs-demo-container');
const tabBar = document.querySelector('forge-tab-bar#tabs-demo') as ITabBarComponent;
const viewSwitcher = document.querySelector('#tab-panel') as IViewSwitcherComponent;

tabBar.addEventListener('forge-tab-bar-change', (evt) => {
  console.log('forge-tab-bar-change', evt.detail);
  setTabContent(evt.detail);
});

const verticalToggle = document.getElementById('opt-vertical') as ISwitchComponent;
verticalToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  tabBar.vertical = selected;
  container.classList.toggle('tabs-demo-container--vertical', selected);
});

const secondaryToggle = document.getElementById('opt-secondary') as ISwitchComponent;
secondaryToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  tabBar.secondary = selected;
});

const clusteredToggle = document.getElementById('opt-clustered') as ISwitchComponent;
clusteredToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  if (selected) {
    tabBar.setAttribute('clustered', clusteredAlignSelect.value);
  } else {
    tabBar.removeAttribute('clustered');
  }
  clusteredAlignSelect.disabled = !selected;
});

const stackedToggle = document.getElementById('opt-stacked') as ISwitchComponent;
stackedToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  tabBar.stacked = selected;
});

const disabledToggle = document.getElementById('opt-disabled') as ISwitchComponent;
disabledToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  tabBar.disabled = selected;
});

const invertedToggle = document.getElementById('opt-inverted') as ISwitchComponent;
invertedToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  tabBar.inverted = selected;
});

const autoActivateToggle = document.getElementById('opt-auto-activate') as ISwitchComponent;
autoActivateToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  tabBar.autoActivate = selected;
});

const scrollButtonsToggle = document.getElementById('opt-scroll-buttons') as ISwitchComponent;
scrollButtonsToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  tabBar.scrollButtons = selected;
});

const showLeadingToggle = document.getElementById('opt-show-leading') as ISwitchComponent;
showLeadingToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  const tabElements = tabBar.querySelectorAll('forge-tab');
  tabElements.forEach(tab => {
    if (selected) {
      tab.appendChild(createIcon('favorite', 'leading'));
    } else {
      tab.removeChild(tab.querySelector('forge-icon[slot=leading]'));
    }
  });
});

const showTrailingToggle = document.getElementById('opt-show-trailing') as ISwitchComponent;
showTrailingToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  const tabElements = tabBar.querySelectorAll('forge-tab');
  tabElements.forEach(tab => {
    if (selected) {
      tab.appendChild(createIcon('favorite', 'trailing'));
    } else {
      tab.removeChild(tab.querySelector('forge-icon[slot=trailing]'));
    }
  });
});

const clusteredAlignSelect = document.getElementById('opt-clustered-alignment') as ISelectComponent;
clusteredAlignSelect.addEventListener('change', () => {
  tabBar.setAttribute('clustered', clusteredAlignSelect.value);
});

function setTabContent(index: number): void {
  viewSwitcher.index = index;
}

function createIcon(name: string, slot: string): HTMLElement {
  const icon = document.createElement('forge-icon');
  icon.slot = slot;
  icon.name = name;
  return icon;
}
