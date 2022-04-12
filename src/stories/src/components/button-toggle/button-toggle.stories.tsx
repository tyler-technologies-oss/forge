import { Meta } from '@storybook/react';
const MDX = require('./button-toggle.mdx').default;
import { IButtonToggleGroupProps, argTypes } from './button-toggle-args';
import { DefaultTemplate } from './templates/default';

export default {
  title: 'Components/Button Toggle',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  multiple: false, 
  stretch: false, 
  mandatory: false, 
  vertical: false, 
  dense: false, 
  disabled: false,
  hasLeading: false,
  hasTrailing: false,
} as IButtonToggleGroupProps;
