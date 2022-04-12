import React, { FC } from 'react';
import { Story } from "@storybook/react";
import { ForgeButton } from "@tylertech/forge-react";
import { MobilePreview } from '../../shared/mobile-preview';
import { IButtonMobileProps } from '../button-args';

export const MobileTemplate: Story<IButtonMobileProps> = ({
  type = 'raised',
  hasLeadingIcon = false,
  hasTrailingIcon = false,
}) => {   
  const LeadingIcon: FC = () => hasLeadingIcon
    ? (<i className="tyler-icons" aria-hidden="true" style={{paddingRight: '16px'}}>assignment</i>)
    : null;
  const TrailingIcon: FC = () => hasTrailingIcon
    ? (<i className="tyler-icons" aria-hidden="true" style={{paddingLeft: '16px'}}>assignment</i>)
    : null;
  const buttonProps = {
    type
  };
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
        <ForgeButton 
        {...buttonProps}
        style={{
          width: '100%', 
          display: 'flex', 
          flexDirection: 'column',
        }}>        
          <button>
            <LeadingIcon/>
            <span>Button</span>
            <TrailingIcon/>
          </button>
        </ForgeButton>
      </div>
    </MobilePreview>
  );
};
