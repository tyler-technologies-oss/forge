import React from 'react';
import { Meta, Story } from '@storybook/react';
import { argTypes, IDatePickerProps } from './date-picker-args';
import { ForgeDatePicker, ForgeTextField } from '@tylertech/forge-react';
import { DEFAULT_DATE_MASK } from '../../../../lib/core';

const MDX = require('./date-picker.mdx').default;

export default {
  title: 'Components/Date Picker',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    }
  }
} as Meta;

export const Default: Story<IDatePickerProps> = ({
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
  yearRange = '-50:+50',
  locale = undefined
}) => {
  if (min) {
    min = new Date(min);
  }
  if (max) {
    max = new Date(max);
  }
  return (
    <ForgeDatePicker
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
      yearRange={yearRange}
      locale={locale}
      style={{ maxWidth: '256px' }}>
      <ForgeTextField>
        <label htmlFor="input-date-picker">Choose date</label>
        <input type="text" id="input-date-picker" />
      </ForgeTextField>
    </ForgeDatePicker>
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
  yearRange: '-50:+50',
  locale: ''
} as IDatePickerProps;
