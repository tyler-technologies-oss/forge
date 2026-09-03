import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconAttachMoney, tylIconMoreVert, tylIconShoppingCart, tylIconTrendingUp } from '@tylertech/tyler-icons';
import type { IMenuComponent } from '@tylertech/forge/menu';

IconRegistry.define([tylIconAttachMoney, tylIconMoreVert, tylIconShoppingCart, tylIconTrendingUp]);

const menu = document.querySelector<IMenuComponent>('forge-menu');

if (menu) {
  menu.options = [
    { label: 'View details', value: 'details' },
    { label: 'Export data', value: 'export' },
    { label: 'Remove card', value: 'remove' }
  ];
}
