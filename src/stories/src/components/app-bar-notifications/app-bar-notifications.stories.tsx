import { Meta } from '@storybook/react';
import { IAppBarNotificationsProps, argTypes } from './app-bar-notifications-args';
import { Story } from '@storybook/react';
import { IconRegistry } from '@tylertech/forge';
import { ForgeAppBar, ForgeAppBarNotificationButton, ForgeIcon } from '@tylertech/forge-react';
import { tylIconForgeLogo } from '@tylertech/tyler-icons/custom';
import { tylIconEmail } from '@tylertech/tyler-icons/standard'
import { tylIconConnection } from '@tylertech/tyler-icons/extended'
import React, { useEffect } from 'react';

const MDX = require('./app-bar-notifications.mdx').default;

export default {
  title: 'Components/App Bar/Notifications',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default: Story<IAppBarNotificationsProps> = ({
  count = 1,
  dot = true,
  showBadge = true,
  theme = 'default',
  icon = 'notifications'
}) => {
  useEffect(() => {
    IconRegistry.define([tylIconForgeLogo, tylIconEmail, tylIconConnection]);
  }, []);

  if (theme === 'default') {
    theme = '';
  }

  return (
    <ForgeAppBar title-text="Title text">
      <ForgeIcon slot="logo" name="forge_logo" style={{fontSize: '2.5rem'}} />
      <ForgeAppBarNotificationButton
        slot="end"
        count={count}
        dot={dot}
        showBadge={showBadge}
        theme={theme}
        icon={icon}
    ></ForgeAppBarNotificationButton>
    </ForgeAppBar>
  );
};
Default.args = {
  count: 1,
  dot: true,
  showBadge: true,
  theme: 'default',
  icon: 'notifications'
} as IAppBarNotificationsProps;
