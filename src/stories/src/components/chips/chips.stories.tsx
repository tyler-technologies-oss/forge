import { Meta } from '@storybook/react';
const MDX = require('./chips.mdx').default;
import { DefaultTemplate } from './templates/default';
import { argTypes, IChipsProps } from './chips-args';

export default {
  title: 'Components/Chips',
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
  type: 'action',
  vertical: false,
  disabled: false,
  invalid: false,
  hasLeading: false,
  hasTrailing: false,
} as IChipsProps;
