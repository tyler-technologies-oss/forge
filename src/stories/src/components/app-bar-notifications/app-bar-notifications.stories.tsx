import { Meta } from '@storybook/react';
import { IAppBarNotificationsProps, argTypes } from './app-bar-notifications-args';
import { DefaultTemplate } from './templates/default';
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

export const Default = DefaultTemplate.bind({});
Default.args = {
  count: 1,
  dot: true,
  showBadge: true,
  theme: 'secondary',
} as IAppBarNotificationsProps;
