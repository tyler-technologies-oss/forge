import { Meta } from '@storybook/react';
import { argTypes, ILabelValueProps } from './label-value-args';
const MDX = require('./label-value.mdx').default;
import { DefaultTemplate } from './templates/default';

export default {
  title: 'Components/Label Value',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  empty: false,
  density: 'default',
  align: 'left',
  ellipsis: false,
  singleLine: false,
  hasIcon: false,
} as ILabelValueProps;
