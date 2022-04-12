import { Meta } from '@storybook/react';
import { ITimePickerProps, argTypes } from './time-picker-args';
import { DefaultTemplate } from './templates/default';
const MDX = require('./time-picker.mdx').default;

export default {
  title: 'Components/Time Picker',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  allowSeconds: false,
  masked: true,
  showMaskFormat: false,
  use24HourTime: false,
  allowInvalidTime: false,
  step: 60,
  allowInput: true,
  allowDropdown: true,
  showNow: false,
  disabled: false,
} as ITimePickerProps;
