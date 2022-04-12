import { Meta } from '@storybook/react';
import { DefaultTemplate } from './templates/default';
import { IAppBarProps, argTypes } from './app-bar-args';
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

export const Default = DefaultTemplate.bind({});
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
