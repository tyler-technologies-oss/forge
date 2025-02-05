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

function setTabContent(index: number): void {
  viewSwitcher.index = index;
}

function createIcon(name: string, slot: string): HTMLElement {
  const icon = document.createElement('forge-icon');
  icon.slot = slot;
  icon.name = name;
  return icon;
}
