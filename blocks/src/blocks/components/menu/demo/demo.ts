import type { IMenuComponent, IMenuOption } from '@tylertech/forge';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconSave, tylIconEdit, tylIconDelete } from '@tylertech/tyler-icons';

IconRegistry.define([tylIconSave, tylIconEdit, tylIconDelete]);

const menu = document.getElementById('basic-menu') as IMenuComponent;

const options: IMenuOption[] = [
  { label: 'Save', value: 'save', leadingIcon: 'save', leadingIconType: 'component' },
  { label: 'Edit', value: 'edit', leadingIcon: 'edit', leadingIconType: 'component' },
  { label: '', value: '', divider: true },
  { label: 'Delete', value: 'delete', leadingIcon: 'delete', leadingIconType: 'component' }
];

menu.options = options;

menu.addEventListener('forge-menu-select', evt => {
  console.log('Selected option:', evt.detail.value);
});
