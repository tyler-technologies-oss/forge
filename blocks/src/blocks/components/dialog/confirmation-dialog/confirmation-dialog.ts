import type { IButtonComponent } from '@tylertech/forge';
import type { ConfirmationDialogComponent } from '@tylertech/forge-extended/confirmation-dialog';

const openButton = document.getElementById('open-confirmation-dialog-demo') as IButtonComponent;
const confirmationDialog = document.getElementById('confirmation-dialog-demo') as ConfirmationDialogComponent;

openButton?.addEventListener('click', () => (confirmationDialog.open = true));
confirmationDialog?.addEventListener('forge-confirmation-dialog-action', () => (confirmationDialog.open = false));
