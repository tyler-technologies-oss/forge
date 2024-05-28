import '$src/shared';
import '@tylertech/forge/tabs';
import '@tylertech/forge/view-switcher';
import { tylIconFavorite, tylIconVideocam, tylIconInsertPhoto, tylIconAudiotrack } from '@tylertech/tyler-icons/standard';
import './tabs.scss';
import { ITabBarComponent } from '@tylertech/forge/tabs';
import { IViewSwitcherComponent } from '@tylertech/forge/view-switcher';
import { IconRegistry } from '@tylertech/forge/icon';
import { ISelectComponent } from '@tylertech/forge/select';
import { ISwitchComponent } from '@tylertech/forge/switch';

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
  setTabContent(evt.detail.index);
});

const verticalToggle = document.getElementById('opt-vertical') as ISwitchComponent;
verticalToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  tabBar.vertical = selected;
  container.classList.toggle('tabs-demo-container--vertical', selected);
});

const secondaryToggle = document.getElementById('opt-secondary') as ISwitchComponent;
secondaryToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  tabBar.secondary = selected;
});

const clusteredToggle = document.getElementById('opt-clustered') as ISwitchComponent;
clusteredToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  if (selected) {
    tabBar.setAttribute('clustered', clusteredAlignSelect.value);
  } else {
    tabBar.removeAttribute('clustered');
  }
  clusteredAlignSelect.disabled = !selected;
});

const stackedToggle = document.getElementById('opt-stacked') as ISwitchComponent;
stackedToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  tabBar.stacked = selected;
});

const disabledToggle = document.getElementById('opt-disabled') as ISwitchComponent;
disabledToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  tabBar.disabled = selected;
});

const invertedToggle = document.getElementById('opt-inverted') as ISwitchComponent;
invertedToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  tabBar.inverted = selected;
});

const autoActivateToggle = document.getElementById('opt-auto-activate') as ISwitchComponent;
autoActivateToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  tabBar.autoActivate = selected;
});

const scrollButtonsToggle = document.getElementById('opt-scroll-buttons') as ISwitchComponent;
scrollButtonsToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  tabBar.scrollButtons = selected;
});

const showStartToggle = document.getElementById('opt-show-start') as ISwitchComponent;
showStartToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  const tabElements = tabBar.querySelectorAll('forge-tab');
  tabElements.forEach(tab => {
    if (selected) {
      tab.appendChild(createIcon('favorite', 'start'));
    } else {
      tab.removeChild(tab.querySelector('forge-icon[slot=start]'));
    }
  });
});

const showEndToggle = document.getElementById('opt-show-end') as ISwitchComponent;
showEndToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  const tabElements = tabBar.querySelectorAll('forge-tab');
  tabElements.forEach(tab => {
    if (selected) {
      tab.appendChild(createIcon('favorite', 'end'));
    } else {
      tab.removeChild(tab.querySelector('forge-icon[slot=end]'));
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
