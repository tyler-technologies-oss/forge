import { PropsWithChildren } from 'react';
import { ForgeButton, ForgeToolbar } from '@tylertech/forge-react';

function ConfirmDialog({ close }: PropsWithChildren<any>): JSX.Element {
  return (
    <div style={{ minWidth: '400px' }}>
      <ForgeToolbar>
        <h1 className="forge-typography--heading4" slot="start">
          Confirm
        </h1>
      </ForgeToolbar>
      <p style={{ padding: '16px' }}>Are you sure you want to cancel?</p>
      <ForgeToolbar inverted>
        <ForgeButton slot="end" style={{ marginRight: '8px' }} variant="outlined" onClick={() => close(false)}>
          Cancel
        </ForgeButton>
        <ForgeButton slot="end" variant="raised" onClick={() => close(true)}>
          OK
        </ForgeButton>
      </ForgeToolbar>
    </div>
  );
}

export default ConfirmDialog;
