import type { IMenuComponent } from '@tylertech/forge/menu';

const menu = document.querySelector<IMenuComponent>('#example-menu');

if (menu) {
  menu.options = [
    { label: 'Add User', value: 'add-user' },
    { label: 'Remove User', value: 'remove-user' },
    { label: 'Third action', value: 'third-action' }
  ];
}
