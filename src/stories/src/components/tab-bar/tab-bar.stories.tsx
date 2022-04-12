import { Meta } from '@storybook/react';
import { ITabBarProps, argTypes } from './tab-bar-args';
import { DefaultTemplate } from './templates/default';
const MDX = require('./tab-bar.mdx').default;

export default {
  title: 'Components/Tab Bar',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  layoutMode: 'fixed',
  layoutAlign: 'start',
  underline: true,
  autoActivate: false,
  stacked: false,
  scrollButtons: false,
  disabled: false,
  stretch: false,
} as ITabBarProps;
