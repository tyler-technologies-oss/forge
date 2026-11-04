import type { IButtonComponent } from '@tylertech/forge/button';
import type { ConfirmationDialogActionEventData, IConfirmationDialogComponent } from '@tylertech/forge/confirmation-dialog';
import { ToastComponent } from '@tylertech/forge/toast';

const openButton = document.getElementById('open-confirmation-dialog-demo') as IButtonComponent;
const confirmationDialog = document.getElementById('confirmation-dialog-demo') as IConfirmationDialogComponent;

openButton?.addEventListener('click', () => (confirmationDialog.open = true));
confirmationDialog?.addEventListener('forge-confirmation-dialog-action', event => {
  const { value } = (event as CustomEvent<ConfirmationDialogActionEventData>).detail;
  ToastComponent.present({ message: value ? 'Record deleted.' : 'Delete canceled.' });
});
