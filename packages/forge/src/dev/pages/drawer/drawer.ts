import '$src/shared';
import { IconRegistry } from '@tylertech/forge/icon';
import '@tylertech/forge/drawer';
import '@tylertech/forge/drawer/forge-drawer.scss';
import { tylIconForgeLogo, tylIconDrafts, tylIconInbox, tylIconMenu, tylIconSend } from '@tylertech/tyler-icons';
import './drawer.scss';
import type { IDrawerComponent, IModalDrawerComponent } from '@tylertech/forge/drawer';

IconRegistry.define([tylIconForgeLogo, tylIconMenu, tylIconInbox, tylIconSend, tylIconDrafts]);

const dismissibleAppBarMenuButton = document.querySelector('#drawer-dismissible-app-bar-menu-button');
const dismissibleRightAppBarMenuButton = document.querySelector('#drawer-dismissible-right-app-bar-menu-button');
const modalAppBarMenuButton = document.querySelector('#drawer-modal-app-bar-menu-button');
const dismissibleDrawer = document.querySelector('forge-drawer#dismissible-drawer') as IDrawerComponent;
const dismissibleRightDrawer = document.querySelector('forge-drawer#dismissible-drawer-right') as IDrawerComponent;
const modalDrawer = document.querySelector('forge-modal-drawer') as IModalDrawerComponent;

dismissibleDrawer.addEventListener('forge-drawer-after-close', () => {
  console.log('[dismissible drawer] forge-drawer-after-close');
});

dismissibleDrawer.addEventListener('forge-drawer-after-open', () => {
  console.log('[dismissible drawer] forge-drawer-after-open');
});

dismissibleAppBarMenuButton.addEventListener('click', () => {
  dismissibleDrawer.open = !dismissibleDrawer.open;
});

dismissibleRightAppBarMenuButton.addEventListener('click', () => {
  dismissibleRightDrawer.open = !dismissibleRightDrawer.open;
});

modalAppBarMenuButton.addEventListener('click', () => {
  modalDrawer.open = !modalDrawer.open;
});
