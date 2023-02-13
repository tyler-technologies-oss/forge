import '$src/shared';
import '@tylertech/forge/view-switcher';
import '@tylertech/forge/tabs';
import './view-switcher.scss';
import type { ITabBarComponent, IViewSwitcherComponent, ViewSwitcherAnimationType } from '@tylertech/forge';

const tabBar = document.querySelector('forge-tab-bar#tab-bar') as ITabBarComponent;
const viewSwitcher = document.querySelector('forge-view-switcher#view-switcher') as IViewSwitcherComponent;
const typeRadioGroup = document.querySelector('#view-switcher-animation-type-radiogroup');

tabBar.addEventListener('forge-tab-bar-activate', ({ detail: { index }}) => {
  viewSwitcher.index = index;
});

typeRadioGroup.addEventListener('change', evt => {
  viewSwitcher.animationType = (evt.target as HTMLInputElement).value as ViewSwitcherAnimationType;
});
