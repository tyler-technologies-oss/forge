import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconDelete, tylIconDownload, tylIconEdit, tylIconMoreVert, tylIconSave, tylIconShare } from '@tylertech/tyler-icons';
import type { IMenuComponent } from '@tylertech/forge/menu';

IconRegistry.define([tylIconDelete, tylIconDownload, tylIconEdit, tylIconMoreVert, tylIconSave, tylIconShare]);

const menu = document.querySelector<IMenuComponent>('#structured-card-menu');

if (menu) {
  menu.options = [
    { label: 'Edit', value: 'edit', leadingIcon: 'edit', leadingIconType: 'component' },
    { label: 'Share', value: 'share', leadingIcon: 'share', leadingIconType: 'component' },
    { label: 'Download', value: 'download', leadingIcon: 'download', leadingIconType: 'component' },
    { label: 'Delete', value: 'delete', leadingIcon: 'delete', leadingIconType: 'component' }
  ];
}
