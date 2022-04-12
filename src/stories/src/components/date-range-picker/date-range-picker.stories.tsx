import { Meta } from '@storybook/react';
const MDX = require('./date-range-picker.mdx').default;
import { IDateRangePickerProps, argTypes } from './date-range-picker-args';
import { DefaultTemplate } from './templates/default';

export default {
  title: 'Components/Date Range Picker',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  disabled: false,
  min: '',
  max: '',
  open: false,
  masked: true,
  maskFormat: 'MM/DD/YYYY',
  showMaskFormat: false,
  allowInvalidDate: false,
  showToday: false,
  showClear: false,
  disabledDaysOfWeek: []
} as IDateRangePickerProps;
