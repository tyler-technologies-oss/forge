import React, { useEffect } from 'react';
import { Story, Meta } from '@storybook/react';
import { IconRegistry, ToastComponent } from '@tylertech/forge';
import { ForgeAppBar, ForgeAppBarSearch, ForgeIcon } from '@tylertech/forge-react';
import { tylIconForgeLogo } from '@tylertech/tyler-icons/custom';
import { IAppBarSearchProps, argTypes } from './app-bar-search-args';

const MDX = require('./app-bar-search.mdx').default;

export default {
  title: 'Components/App Bar/Search',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default: Story<IAppBarSearchProps> = ({
  disabled = false,
  placeholder = 'Search',
  combined = false,
  global = false,
}) => {
  useEffect(() => {
    IconRegistry.define(tylIconForgeLogo);
  }, []);

  return (
    <ForgeAppBar title-text="Search">
      <ForgeIcon slot="logo" name="forge_logo" style={{fontSize: '2.5rem'}} />
      <ForgeAppBarSearch 
        slot="center"
        disabled={disabled}
        placeholder={placeholder}
        combined={combined}
        global={global}
        on-forge-app-bar-search={evt => {
          ToastComponent.present({ message: `Search value: ${evt.detail.value}` });
        }}>
          <input type="text" aria-label="Search for a record" placeholder="Search" />
      </ForgeAppBarSearch>
    </ForgeAppBar>
  );
};
Default.args = {
  disabled: false,
  placeholder: 'Search',
  combined: false,
  global: false,
} as IAppBarSearchProps;
