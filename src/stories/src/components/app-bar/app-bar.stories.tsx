import { Meta } from '@storybook/react';
import { IAppBarProps, argTypes } from './app-bar-args';
import { Story } from '@storybook/react';
import { ForgeAppBar, ForgeAppBarHelpButton, ForgeAppBarMenuButton, ForgeAppBarNotificationButton, ForgeAppBarProfileButton, ForgeAppBarSearch, ForgeIcon } from '@tylertech/forge-react';
import React, { useEffect } from 'react';
import { IconRegistry } from '@tylertech/forge';
import { APP_BAR_HELP_BUTTON_OPTS } from '../../mock/app-bar';
import { tylIconForgeLogo } from '@tylertech/tyler-icons/custom';

const MDX = require('./app-bar.mdx').default;

export default {
  title: 'Components/App Bar',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default: Story<IAppBarProps> = ({
  title = 'App Bar',
  fixed = false,
  raised = true,
  logo = true,
  theme = 'primary',
  hasMenu = false,
  hasSearch = false,
  hasHelp = false,
  hasNotifications = false,
  hasProfile = false,
}) => {
  useEffect(() => {
    IconRegistry.define(tylIconForgeLogo);
  }, []);

  function showToast(msg: string) {
    const toast = document.createElement('forge-toast');
    toast.message = msg;
    document.body.appendChild(toast);
  }

  return (
    <ForgeAppBar
      titleText={title}
      fixed={fixed}
      raised={raised}
      logo={logo}
      theme={theme}>
      {logo && <ForgeIcon slot="logo" name="forge_logo" style={{fontSize: '2.5rem'}} />}

      {hasMenu && <ForgeAppBarMenuButton slot="start" onClick={() => showToast('Menu clicked!')} />}

      {hasSearch && (
        <ForgeAppBarSearch slot="center" on-forge-app-bar-search-input={evt => showToast(`Search value: ${evt.detail.value}`)}>
          <input type="text" aria-label="Search for a record" placeholder="Search" />
        </ForgeAppBarSearch>
      )}
      
      {hasHelp && <ForgeAppBarHelpButton slot="end" on-forge-menu-select={evt => showToast(`Selected option: ${evt.detail.value}`)} options={APP_BAR_HELP_BUTTON_OPTS} />}
      
      {hasNotifications && <ForgeAppBarNotificationButton slot="end" dot show-badge />}

      {hasProfile && (
        <ForgeAppBarProfileButton
          on-forge-profile-card-sign-out={() => showToast('Sign out button clicked')}
          on-forge-profile-card-profile={() => showToast('Profile button clicked')}
          slot="end"
          profile-button="true"
          avatar-text="First Last"
          full-name="First Last"
          email="first.last@tylertech.com">
        </ForgeAppBarProfileButton>
      )}
    </ForgeAppBar>
  );
};
Default.args = {
  title: 'AppBar',
  fixed: false,
  raised: true,
  logo: true,
  theme: 'primary',
  hasMenu: false,
  hasSearch: false,
  hasHelp: false,
  hasNotifications: false,
  hasProfile: false,
} as IAppBarProps;
