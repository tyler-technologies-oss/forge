import { useState } from 'react';
import { ForgeBusyIndicator, ForgeButton } from '@tylertech/forge-react';

export function BusyIndicatorDemo(): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <>
      <h2 className="forge-typography--subheading4">Busy Indicator</h2>
      <ForgeButton variant="raised" onClick={() => setOpen(true)}>
        Show
      </ForgeButton>
      <div style={{ position: 'relative', height: '240px', marginTop: '16px', border: '1px solid var(--forge-theme-outline)' }}>
        <ForgeBusyIndicator
          open={open}
          mode="inline"
          variant="spinner"
          titleText="Loading"
          message="Please wait while we fetch your data..."
          cancelable
          on-forge-busy-indicator-cancel={() => setOpen(false)}
        />
      </div>
    </>
  );
}
