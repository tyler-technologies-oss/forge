import { Meta } from '@storybook/react';
import { IProductIconProps, argTypes } from './product-icon-args';
import { DefaultTemplate } from './templates/default';
const MDX = require('./product-icon.mdx').default;

export default {
  title: 'Components/Product Icon',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  color: 'indigo-500',
  size: 64,
  shadow: true,
  iterations: 32,
  contentType: 'icon',
  tylerIcon: 'accessibility',
} as IProductIconProps;