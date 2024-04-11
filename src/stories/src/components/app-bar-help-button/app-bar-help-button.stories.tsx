import { Meta } from '@storybook/react';
import { Story } from '@storybook/react';
import { IconRegistry, IMenuSelectEventData, ToastComponent } from '@tylertech/forge';
import { ForgeAppBar, ForgeAppBarHelpButton, ForgeIcon } from '@tylertech/forge-react';
import { tylIconForgeLogo } from '@tylertech/tyler-icons/custom';
import React, { useEffect } from 'react';
import { APP_BAR_HELP_BUTTON_OPTS } from '../../mock/app-bar';

const MDX = require('./app-bar-help-button.mdx').default;

export default {
  title: 'Components/App Bar/Help Button',
  parameters: { 
    docs: { 
      page: MDX
    },
    controls: {
      disable: true
    }
  },
} as Meta;

export const Default: Story = () => {
  useEffect(() => {
    IconRegistry.define(tylIconForgeLogo);
  }, []);

  function showToast(evt: CustomEvent<IMenuSelectEventData>) {
    ToastComponent.present({ message: `Selected option: ${evt.detail.value}` });
  }

  return (
    <ForgeAppBar titleText="Title text">
      <ForgeIcon slot="logo" name="forge_logo" style={{fontSize: '2.5rem'}} />
      <ForgeAppBarHelpButton slot="end" on-forge-menu-select={showToast} options={APP_BAR_HELP_BUTTON_OPTS} />
    </ForgeAppBar>
  );
};
