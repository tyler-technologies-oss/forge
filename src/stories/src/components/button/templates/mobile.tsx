import React, { useEffect } from 'react';
import { Story } from '@storybook/react';
import { IconRegistry } from '@tylertech/forge';
import { ForgeButton, ForgeIcon } from '@tylertech/forge-react';
import { tylIconAssignment } from '@tylertech/tyler-icons/standard';
import { MobilePreview } from '../../shared/mobile-preview';
import { IButtonMobileProps } from '../button-args';

export const MobileTemplate: Story<IButtonMobileProps> = ({
  type = 'raised',
  hasLeadingIcon = false,
  hasTrailingIcon = false,
}) => {
  useEffect(() => {
    IconRegistry.define(tylIconAssignment);
  }, []);
  return (
    <MobilePreview>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        height: '100%'
      }}>
        <p>Using a button in a mobile layout.</p>
        <ForgeButton type={type} style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <button type="button">
            {hasLeadingIcon && <ForgeIcon name="assignment" />}
            <span>Button</span>
            {hasTrailingIcon && <ForgeIcon name="assignment" />}
          </button>
        </ForgeButton>
      </div>
    </MobilePreview>
  );
};
