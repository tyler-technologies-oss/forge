import { useState } from 'react';
import { ForgeButton, ForgeConfirmationDialog } from '@tylertech/forge-react';
import type { ConfirmationDialogActionEventData } from '@tylertech/forge/confirmation-dialog';

export function ConfirmationDialogDemo(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<string>();

  function handleAction(evt: CustomEvent<ConfirmationDialogActionEventData>): void {
    setResult(evt.detail.value ? 'Confirmed' : 'Cancelled');
  }

  return (
    <>
      <h2 className="forge-typography--subheading4">Confirmation Dialog</h2>
      <ForgeButton variant="raised" onClick={() => setOpen(true)}>
        Delete item
      </ForgeButton>
      {result && <p>Last action: {result}</p>}
      <ForgeConfirmationDialog open={open} on-forge-confirmation-dialog-action={handleAction}>
        <span slot="title">Delete item?</span>
        <span slot="message">This action cannot be undone.</span>
        <span slot="secondary-button-text">Cancel</span>
        <span slot="primary-button-text">Delete</span>
      </ForgeConfirmationDialog>
    </>
  );
}
