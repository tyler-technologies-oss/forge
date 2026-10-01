import type { IMenuComponent, IMenuOption } from '@tylertech/forge';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconSave, tylIconEdit, tylIconFileDownload, tylIconDelete } from '@tylertech/tyler-icons';

IconRegistry.define([tylIconSave, tylIconEdit, tylIconFileDownload, tylIconDelete]);

const menu = document.getElementById('cascading-menu') as IMenuComponent;

const options: IMenuOption[] = [
  { label: 'Save', value: 'save', leadingIcon: 'save', leadingIconType: 'component' },
  {
    label: 'Edit',
    value: 'edit',
    leadingIcon: 'edit',
    leadingIconType: 'component',
    options: [
      { label: 'Overwrite', value: 'overwrite' },
      { label: 'Save as new', value: 'save-as-new' }
    ]
  },
  {
    label: 'Export',
    value: 'export',
    leadingIcon: 'file_download',
    leadingIconType: 'component',
    options: [
      { label: 'PDF', value: 'pdf' },
      { label: 'CSV', value: 'csv' },
      { label: 'Excel', value: 'excel' }
    ]
  },
  { label: '', value: '', divider: true },
  { label: 'Delete', value: 'delete', leadingIcon: 'delete', leadingIconType: 'component' }
];

menu.options = options;

menu.addEventListener('forge-menu-select', evt => {
  console.log('Selected option:', evt.detail.value);
});
