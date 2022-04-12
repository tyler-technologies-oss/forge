import { Meta } from '@storybook/react';
import { IMenuProps, argTypes } from './menu-args';
const MDX = require('./menu.mdx').default;
import { DefaultTemplate } from './templates/default';

export default {
  title: 'Components/Menu',
  argTypes,
  parameters: {
    docs: {
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  mode: 'click',
  open: false,
  placement: 'bottom-start',
  dense: false,
  persistSelection: false,
} as IMenuProps;
