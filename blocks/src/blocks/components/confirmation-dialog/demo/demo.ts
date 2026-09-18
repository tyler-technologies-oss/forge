import type { IConfirmationDialogComponent } from '@tylertech/forge/confirmation-dialog';

const showButton = document.querySelector<HTMLElement>('forge-button');
const confirmationDialog = document.querySelector<IConfirmationDialogComponent>('forge-confirmation-dialog');

showButton?.addEventListener('click', () => {
  if (!confirmationDialog) {
    return;
  }
  confirmationDialog.open = true;
});
