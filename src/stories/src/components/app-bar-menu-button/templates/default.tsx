import { Story } from '@storybook/react';
import { IconRegistry } from '@tylertech/forge';
import { ForgeAppBar, ForgeAppBarMenuButton, ForgeIcon } from '@tylertech/forge-react';
import { tylIconForgeLogo } from '@tylertech/tyler-icons/custom';
import React, { useEffect } from 'react';

export const DefaultTemplate: Story = () => {
  useEffect(() => {
    IconRegistry.define(tylIconForgeLogo);
  }, []);

  return (
    <ForgeAppBar title-text="App Bar">
      <ForgeIcon slot="logo" name="forge_logo" style={{fontSize: '2.5rem'}} />
      <ForgeAppBarMenuButton 
        onClick={() => {
          const toast = document.createElement('forge-toast');
          toast.message = 'Menu clicked!';
          document.body.appendChild(toast);
        }} 
        slot="start" />
    </ForgeAppBar>
  );
};
