import { Meta } from '@storybook/react';
import { DefaultTemplate } from './templates/default';
import { ISelectProps, argTypes } from './select-args';
const MDX = require('./select.mdx').default;

export default {
  title: 'Components/Select',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  density: 'default',
  floatLabelType: 'auto',
  shape: 'default',
  invalid: false,
  required: false,
  disabled: false,
  multiple: false,
  open: false,
  label: 'Food group',
  placeholder: '',
  hasLeadingIcon: false,
  hasHelperText: false,
  hasAddonEnd: false,
} as ISelectProps;
