import { Story } from '@storybook/react';
import { ForgeButtonToggle, ForgeButtonToggleGroup, ForgeIcon } from '@tylertech/forge-react';
import { tylIconEmail, tylIconPhone } from '@tylertech/tyler-icons/standard';
import React, { useEffect } from 'react';
import { IconRegistry } from '@tylertech/forge';
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
  useEffect(() => {
    IconRegistry.define([tylIconEmail, tylIconPhone])
  }, []);
  return (
    <ForgeButtonToggleGroup
      multiple={multiple} 
      stretch={stretch} 
      mandatory={mandatory} 
      vertical={vertical} 
      dense={dense} 
      disabled={disabled}>
      <ForgeButtonToggle value="email" button-aria-label="By email">
        {hasLeading && <ForgeIcon slot="leading" name="email" />}
        By email
        {hasTrailing && <ForgeIcon slot="trailing" name="email" />}
      </ForgeButtonToggle>
      <ForgeButtonToggle value="mail" button-aria-label="By mail">
        By mail
      </ForgeButtonToggle>
      <ForgeButtonToggle value="phone" button-aria-label="By phone">
        {hasLeading && <ForgeIcon slot="leading" name="email" />}
        By phone
        {hasTrailing && <ForgeIcon slot="trailing" name="phone" />}
      </ForgeButtonToggle>
    </ForgeButtonToggleGroup>
  );
};
