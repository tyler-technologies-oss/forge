import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ForgeDateRangePicker, ForgeTextField } from '@tylertech/forge-react';
import { IDateRangePickerProps, argTypes } from './date-range-picker-args';
import { DEFAULT_DATE_MASK } from '../../../../lib/core';

const MDX = require('./date-range-picker.mdx').default;

export default {
  title: 'Components/Date Range Picker',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    }
  }
} as Meta;

export const Default: Story<IDateRangePickerProps> = ({
  disabled = false,
  min = '',
  max = '',
  open = false,
  masked = true,
  maskFormat = DEFAULT_DATE_MASK,
  showMaskFormat = false,
  allowInvalidDate = false,
  showToday = false,
  showClear = false,
  disabledDaysOfWeek = [],
  locale = undefined
}) => {
  if (min) {
    min = new Date(min);
  }
  if (max) {
    max = new Date(max);
  }
  return (
    <ForgeDateRangePicker
      disabled={disabled}
      min={min}
      max={max}
      open={open}
      masked={masked}
      maskFormat={maskFormat}
      showMaskFormat={showMaskFormat}
      allowInvalidDate={allowInvalidDate}
      showToday={showToday}
      showClear={showClear}
      disabledDaysOfWeek={disabledDaysOfWeek}
      locale={locale}
      style={{ width: '320px' }}>
      <ForgeTextField>
        <label htmlFor="input-date-range-picker-01">Date</label>
        <input type="text" id="input-date-range-picker-01" autoComplete="off" placeholder="mm/dd/yyyy" />
        <input type="text" id="input-date-range-picker-02" autoComplete="off" placeholder="mm/dd/yyyy" />
      </ForgeTextField>
    </ForgeDateRangePicker>
  );
};
Default.args = {
  disabled: false,
  min: '',
  max: '',
  open: false,
  masked: true,
  maskFormat: DEFAULT_DATE_MASK,
  showMaskFormat: false,
  allowInvalidDate: false,
  showToday: false,
  showClear: false,
  disabledDaysOfWeek: [],
  locale: ''
} as IDateRangePickerProps;
