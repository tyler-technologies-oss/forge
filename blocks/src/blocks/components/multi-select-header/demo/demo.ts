import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconDelete, tylIconDownload, tylIconFileExcel, tylIconFilePdf, tylIconMoreVert } from '@tylertech/tyler-icons';
import type { IMenuComponent, IMenuOption } from '@tylertech/forge/menu';

IconRegistry.define([tylIconDelete, tylIconDownload, tylIconFileExcel, tylIconFilePdf, tylIconMoreVert]);

const menu = document.querySelector<IMenuComponent>('forge-menu');

if (menu) {
  const options: IMenuOption[] = [
    { label: 'Export as a PDF', value: 'option-1', icon: 'file_pdf', leadingIconType: 'component' },
    { label: 'Export to Excel', value: 'option-2', icon: 'file_excel', leadingIconType: 'component' }
  ];
  menu.options = options;
}
