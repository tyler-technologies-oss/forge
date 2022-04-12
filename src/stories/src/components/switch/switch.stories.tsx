import { Meta } from '@storybook/react';
import { ISwitchProps, argTypes } from './switch-args';
import { DefaultTemplate } from './templates/default';
const MDX = require('./switch.mdx').default;

export default {
  title: 'Components/Switch',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  dense: false,
  hasLabel: true
} as ISwitchProps;
