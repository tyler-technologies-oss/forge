import type { IMenuComponent, IMenuOptionGroup } from '@tylertech/forge';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconSortAscending, tylIconSortDescending, tylIconContentCopy, tylIconArchive, tylIconDelete } from '@tylertech/tyler-icons';

IconRegistry.define([tylIconSortAscending, tylIconSortDescending, tylIconContentCopy, tylIconArchive, tylIconDelete]);

const menu = document.getElementById('grouped-menu') as IMenuComponent;

const options: IMenuOptionGroup[] = [
  {
    text: 'Sort',
    options: [
      { label: 'Name (A-Z)', value: 'name-asc', leadingIcon: 'sort_ascending', leadingIconType: 'component' },
      { label: 'Date modified', value: 'date-modified', leadingIcon: 'sort_descending', leadingIconType: 'component' }
    ]
  },
  {
    text: 'Actions',
    options: [
      { label: 'Duplicate', value: 'duplicate', leadingIcon: 'content_copy', leadingIconType: 'component' },
      { label: 'Archive', value: 'archive', leadingIcon: 'archive', leadingIconType: 'component' },
      { label: 'Delete', value: 'delete', leadingIcon: 'delete', leadingIconType: 'component' }
    ]
  }
];

menu.options = options;

menu.addEventListener('forge-menu-select', evt => {
  console.log('Selected option:', evt.detail.value);
});
