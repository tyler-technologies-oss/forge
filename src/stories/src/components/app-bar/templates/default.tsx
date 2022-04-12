import { Story } from '@storybook/react';
import { ForgeAppBar, ForgeAppBarHelpButton, ForgeAppBarMenuButton, ForgeAppBarNotificationButton, ForgeAppBarProfileButton, ForgeAppBarSearch, ForgeIcon } from '@tylertech/forge-react';
import React, { useEffect } from 'react';
import { IconRegistry } from '@tylertech/forge';
import { APP_BAR_HELP_BUTTON_OPTS } from '../../../mock/app-bar';
import { IAppBarProps } from '../app-bar-args';
import { tylIconForgeLogo } from '@tylertech/tyler-icons/custom';

export const DefaultTemplate: Story<IAppBarProps> = ({
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

  const appBarProps = {
    titleText: title,
    fixed,
    raised,
    logo,
    theme
  };

  function showToast(msg: string) {
    const toast = document.createElement('forge-toast');
    toast.message = msg;
    document.body.appendChild(toast);
  }

  return (
    <ForgeAppBar {...appBarProps}>
      <ForgeIcon slot="logo" name="forge_logo" style={{fontSize: '2.5rem'}} />

      {hasMenu && <ForgeAppBarMenuButton slot="start" onClick={() => showToast('Menu clicked!')} />}

      {hasSearch && (
        <ForgeAppBarSearch slot="center" on-forge-app-bar-search-input={evt => showToast(`Search value: ${evt.detail.value}`)}>
          <input type="text" aria-label="Search for a record" placeholder="Search" />
        </ForgeAppBarSearch>
      )}
      
      {hasHelp && <ForgeAppBarHelpButton slot="end" on-forge-menu-select={evt => showToast(`Selected option: ${evt.detail.value}`)} options={APP_BAR_HELP_BUTTON_OPTS} />}
      
      {hasNotifications && <ForgeAppBarNotificationButton slot="end" dot show-badge="true" />}

      {hasProfile && (
        <ForgeAppBarProfileButton
          on-forge-profile-card-sign-out={() => showToast('Sign out button clicked')}
          on-forge-profile-card-profile={() => showToast('Profile button clicked')}
          slot="profile"
          profile-button="true"
          avatar-text="First Last"
          full-name="First Last"
          email="first.last@tylertech.com">
        </ForgeAppBarProfileButton>
      )}
    </ForgeAppBar>
  );
};
