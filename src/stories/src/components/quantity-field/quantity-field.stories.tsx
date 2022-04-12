import { Meta } from '@storybook/react';
import { IQuantityFieldProps, argTypes } from './quantity-field-args';
import { DefaultTemplate } from './templates/default';
const MDX = require('./quantity-field.mdx').default;

export default {
  title: 'Components/Quantity Field',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  invalid: false,
  required: false,
} as IQuantityFieldProps;
