import { IconRegistry } from '@tylertech/forge';
import { ForgeButton, ForgeCheckbox, ForgeDivider, ForgeIcon } from '@tylertech/forge-react';
import { tylIconFavorite } from '@tylertech/tyler-icons';
import { useEffect, useState } from 'react';

export function ButtonDemo(): JSX.Element {
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    IconRegistry.define(tylIconFavorite);
  }, []);

  return (
    <>
      <h2 className="forge-typography--subheading4">Button</h2>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <ForgeButton disabled={isDisabled}>Default</ForgeButton>

        <ForgeButton variant="raised" disabled={isDisabled}>
          Raised
        </ForgeButton>

        <ForgeButton variant="outlined" disabled={isDisabled}>
          Outlined
        </ForgeButton>

        <ForgeButton variant="filled" disabled={isDisabled}>
          Unelevated
        </ForgeButton>

        <ForgeButton dense={true} variant="outlined" disabled={isDisabled}>
          Dense outlined
        </ForgeButton>

        <ForgeButton variant="outlined" disabled={isDisabled}>
          <ForgeIcon name="favorite" />
          <span>Leading icon</span>
        </ForgeButton>

        <ForgeButton variant="outlined" disabled={isDisabled}>
          <span>Trailing icon</span>
          <ForgeIcon name="favorite" />
        </ForgeButton>
      </div>
      <ForgeDivider className="demo-divider" />
      <div>
        <ForgeCheckbox id="disabled-checkbox" onChange={() => setIsDisabled(!isDisabled)} checked={isDisabled}>
          Disabled
        </ForgeCheckbox>
      </div>
    </>
  );
}
