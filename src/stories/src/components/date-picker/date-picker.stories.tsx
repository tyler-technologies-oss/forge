import { Meta } from '@storybook/react';
const MDX = require('./date-picker.mdx').default;
import { DefaultTemplate } from './templates/default';
import { argTypes, IDatePickerProps } from './date-picker-args';

export default {
  title: 'Components/Date Picker',
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
  disabledDaysOfWeek: [],
  yearRange: '-50:+50'
} as IDatePickerProps;
