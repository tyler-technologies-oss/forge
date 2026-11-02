import '$src/shared';
import '@tylertech/forge/button';
import '@tylertech/forge/divider';
import '@tylertech/forge/dropdown-menu';
import '@tylertech/forge/icon-button';
import '@tylertech/forge/kbd';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconDrafts, tylIconDriveFileMove, tylIconFileDownload, tylIconInbox, tylIconMoreVert, tylIconOpenInNew } from '@tylertech/tyler-icons';

IconRegistry.define([tylIconDrafts, tylIconDriveFileMove, tylIconFileDownload, tylIconInbox, tylIconMoreVert, tylIconOpenInNew]);

const elementMenu = document.getElementById('element-menu') as HTMLElementTagNameMap['forge-dropdown-menu'];
elementMenu.triggerElement = document.getElementById('element-trigger');

const output = document.getElementById('selection-output') as HTMLElement;
document.querySelectorAll('forge-dropdown-menu').forEach(menu => {
  menu.addEventListener('forge-dropdown-menu-item-select', evt => {
    const { value, checked } = evt.detail;
    output.textContent = checked === undefined ? `Selected: ${value}` : `Selected: ${value} (${checked ? 'checked' : 'unchecked'})`;
  });
});
