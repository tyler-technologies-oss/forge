import { Story } from '@storybook/react';
import { IconRegistry } from '@tylertech/forge';
import { ForgeAppBar, ForgeAppBarSearch, ForgeIcon } from '@tylertech/forge-react';
import { tylIconForgeLogo } from '@tylertech/tyler-icons/custom';
import React, { useEffect } from 'react';
import { IAppBarSearchProps } from '../app-bar-search-args';

export const DefaultTemplate: Story<IAppBarSearchProps> = ({
  disabled = false,
  placeholder = 'Search',
  combined = false,
  global = false,
}) => {
  useEffect(() => {
    IconRegistry.define(tylIconForgeLogo);
  }, []);
  
  const searchProps = {
    disabled,
    placeholder,
    combined,
    global,
  };
  return (
    <ForgeAppBar title-text="Search">
      <ForgeIcon slot="logo" name="forge_logo" style={{fontSize: '2.5rem'}} />
      <ForgeAppBarSearch 
        {...searchProps}
        on-forge-app-bar-search={evt => {
          const toast = document.createElement('forge-toast');
          toast.message = `Search value: ${evt.detail.value}`;
          document.body.appendChild(toast);
        }}
        slot="center">
          <input type="text" aria-label="Search for a record" placeholder="Search" />
      </ForgeAppBarSearch>
    </ForgeAppBar>
  );
}
