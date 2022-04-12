import { Story } from '@storybook/react';
import { ForgeButtonToggle, ForgeButtonToggleGroup } from '@tylertech/forge-react';
import React from 'react';
import { IButtonToggleGroupProps } from '../button-toggle-args';

export const DefaultTemplate: Story<IButtonToggleGroupProps> = ({
  multiple = false, 
  stretch = false, 
  mandatory = false, 
  vertical = false, 
  dense = false, 
  disabled = false,
  hasLeading = false,
  hasTrailing = false,
}) => {
  const buttonToggleGroupProps = {
    multiple, 
    stretch, 
    mandatory, 
    vertical, 
    dense, 
    disabled,
  };
  const Icon = ({children, slotName, show}) => show ? (<i className="tyler-icons" slot={slotName} aria-hidden="true">{children}</i>) : null;
  return (
    <ForgeButtonToggleGroup {...buttonToggleGroupProps}>
      <ForgeButtonToggle value="email" button-aria-label="By email">        
        <Icon show={hasLeading} slotName={'leading'}>email</Icon>
        By email
        <Icon show={hasTrailing} slotName={'trailing'}>email</Icon>
      </ForgeButtonToggle>
      <ForgeButtonToggle value="mail" button-aria-label="By mail">
        By mail
      </ForgeButtonToggle>
      <ForgeButtonToggle value="phone" button-aria-label="By phone">
        <Icon show={hasLeading} slotName={'leading'}>phone</Icon>
        By phone
        <Icon show={hasTrailing} slotName={'trailing'}>phone</Icon>
      </ForgeButtonToggle>
    </ForgeButtonToggleGroup>
  );
};
