import { Story } from '@storybook/react';
import { IconRegistry } from '@tylertech/forge';
import { ForgeAppBar, ForgeAppBarHelpButton, ForgeIcon } from '@tylertech/forge-react';
import { tylIconForgeLogo } from '@tylertech/tyler-icons/custom';
import React, { useEffect } from 'react';
import { APP_BAR_HELP_BUTTON_OPTS } from '../../../mock/app-bar';

export const DefaultTemplate: Story = () => {
  useEffect(() => {
    IconRegistry.define(tylIconForgeLogo);
  }, []);

  function showToast(evt: CustomEvent) {
    const toast = document.createElement('forge-toast');
    toast.message =`Selected option: ${evt.detail.value}`;
    document.body.appendChild(toast);
  }

  return (
    <ForgeAppBar titleText="Title text">
      <ForgeIcon slot="logo" name="forge_logo" style={{fontSize: '2.5rem'}} />
      <ForgeAppBarHelpButton slot="end" on-forge-menu-select={showToast} options={APP_BAR_HELP_BUTTON_OPTS} />
    </ForgeAppBar>
  );
};
