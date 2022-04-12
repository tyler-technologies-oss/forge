import { Story } from '@storybook/react';
import { IconRegistry } from '@tylertech/forge';
import { ForgeAppBar, ForgeAppBarNotificationButton, ForgeIcon } from '@tylertech/forge-react';
import { tylIconForgeLogo } from '@tylertech/tyler-icons/custom';
import React, { useEffect } from 'react';
import { IAppBarNotificationsProps } from '../app-bar-notifications-args';

export const DefaultTemplate: Story<IAppBarNotificationsProps> = ({
  count = 1,
  dot = true,
  showBadge = true,
  theme = 'secondary'
}) => {
  useEffect(() => {
    IconRegistry.define(tylIconForgeLogo);
  }, []);
  
  const notificationProps = {
    count,
    dot,
    showBadge,
    theme,
  };
  return (
    <ForgeAppBar title-text="Title text">
      <ForgeIcon slot="logo" name="forge_logo" style={{fontSize: '2.5rem'}} />
      <ForgeAppBarNotificationButton slot="end" {...notificationProps}></ForgeAppBarNotificationButton>
    </ForgeAppBar>
  );
}
