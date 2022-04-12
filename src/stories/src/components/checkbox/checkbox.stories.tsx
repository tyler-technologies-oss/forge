import { Meta } from '@storybook/react';
import { argTypes, ICheckboxProps } from './checkbox-args';
import { DefaultTemplate } from './templates/default';
const MDX = require('./checkbox.mdx').default;

export default {
  title: 'Components/Checkbox',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  checked: false,
  dense: false,
  hasLabel: true,
} as ICheckboxProps;
