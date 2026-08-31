import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconClose } from '@tylertech/tyler-icons';

IconRegistry.define([tylIconClose]);

const openButton = document.querySelector<HTMLElement>('forge-button');
const dialog = document.getElementById('css-dialog') as HTMLDialogElement | null;
const closeButton = dialog?.querySelector<HTMLElement>('forge-icon-button');
const dismissButton = dialog?.querySelector<HTMLElement>('forge-toolbar[slot="footer"] forge-button');

function toggleDialog(): void {
  if (!dialog) {
    return;
  }
  if (dialog.open) {
    dialog.close();
    return;
  }
  if (dialog.classList.contains('forge-dialog--modal')) {
    dialog.showModal();
  } else {
    dialog.show();
  }
}

openButton?.addEventListener('click', toggleDialog);
closeButton?.addEventListener('click', toggleDialog);
dismissButton?.addEventListener('click', toggleDialog);
