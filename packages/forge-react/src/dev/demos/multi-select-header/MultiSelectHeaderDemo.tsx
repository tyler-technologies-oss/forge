import { useState } from 'react';
import { ForgeButton, ForgeMultiSelectHeader } from '@tylertech/forge-react';

export function MultiSelectHeaderDemo(): JSX.Element {
  const [selectedAll, setSelectedAll] = useState(false);

  return (
    <>
      <h2 className="forge-typography--subheading4">Multi Select Header</h2>
      <ForgeMultiSelectHeader text={`${selectedAll ? 5 : 2} selected`} on-forge-multi-select-header-select-all={() => setSelectedAll(true)}>
        <span slot="select-all-button-text">Select all</span>
        <ForgeButton slot="actions" variant="outlined">
          Delete
        </ForgeButton>
        <ForgeButton slot="actions" variant="outlined">
          Archive
        </ForgeButton>
      </ForgeMultiSelectHeader>
    </>
  );
}
