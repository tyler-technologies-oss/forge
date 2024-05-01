import '$src/shared';
import '@tylertech/forge/view-switcher';
import '@tylertech/forge/tabs';
import './view-switcher.scss';
import { ITabBarComponent } from '@tylertech/forge/tabs';
import { IViewSwitcherComponent, ViewSwitcherAnimationType } from '@tylertech/forge/view-switcher';

const tabBar = document.querySelector('forge-tab-bar#tab-bar') as ITabBarComponent;
const viewSwitcher = document.querySelector('forge-view-switcher#view-switcher') as IViewSwitcherComponent;
const typeRadioGroup = document.querySelector('#view-switcher-animation-type-radiogroup');

tabBar.addEventListener('forge-tab-bar-change', ({ detail }) => {
  viewSwitcher.index = detail;
});

typeRadioGroup.addEventListener('change', evt => {
  viewSwitcher.animationType = (evt.target as HTMLInputElement).value as ViewSwitcherAnimationType;
});
