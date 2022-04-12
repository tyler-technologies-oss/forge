import { Meta } from '@storybook/react';
import { DefaultTemplate } from './templates/default';
import { IViewSwitcherProps, argTypes } from './view-switcher-args';
const MDX = require('./view-switcher.mdx').default;

export default {
  title: 'Components/View Switcher',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  animationType: 'slide'
} as IViewSwitcherProps;
