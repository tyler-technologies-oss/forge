import { Meta } from '@storybook/react';
import { DefaultTemplate } from './templates/default';
import { IToolbarProps, argTypes } from './toolbar-args';
const MDX = require('./toolbar.mdx').default;

export default {
  title: 'Components/Toolbar',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  inverted: false,
  hasStart: true,
  hasCenter: true,
  hasEnd: true,
} as IToolbarProps;
