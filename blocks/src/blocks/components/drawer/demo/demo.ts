import type { IAppBarMenuButtonComponent, IDrawerComponent } from '@tylertech/forge';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconDrafts, tylIconInbox, tylIconMenu, tylIconSend } from '@tylertech/tyler-icons';

IconRegistry.define([tylIconDrafts, tylIconInbox, tylIconMenu, tylIconSend]);

const menuButton = document.getElementById('menu-button') as IAppBarMenuButtonComponent;
const drawer = document.getElementById('drawer') as IDrawerComponent;

menuButton?.addEventListener('click', () => {
  drawer.open = !drawer.open;
});
