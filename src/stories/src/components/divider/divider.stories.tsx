import { Meta } from '@storybook/react';
import { IDividerProps, argTypes } from './divider-args';
import { DefaultTemplate } from './templates/default';
const MDX = require('./divider.mdx').default;

export default {
  title: 'Components/Divider',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  vertical: false,
} as IDividerProps;
