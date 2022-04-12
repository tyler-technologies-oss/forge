import React from 'react';
import { Story } from '@storybook/react';
import { IDateRangePickerProps } from '../date-range-picker-args';
import { ForgeDateRangePicker, ForgeTextField } from '@tylertech/forge-react';

export const DefaultTemplate: Story<IDateRangePickerProps> = ({
  disabled = false,
  min = '',
  max = '',
  open = false,
  masked = true,
  maskFormat = 'MM/DD/YYYY',
  showMaskFormat = false,
  allowInvalidDate = false,
  showToday = false,
  showClear = false,
  disabledDaysOfWeek = []
}) => {
  if (min) {
    min = new Date(min);
  }
  if (max) {
    max = new Date(max);
  }
  const datePickerProps = {
    disabled,
    min,
    max,
    open,
    masked,
    maskFormat,
    showMaskFormat,
    allowInvalidDate,
    showToday,
    showClear,
    disabledDaysOfWeek
  };
  return (
    <ForgeDateRangePicker {...datePickerProps} style={{ width: '320px' }}>
      <ForgeTextField>
        <input type="text" id="input-date-range-picker-01" autoComplete="off" placeholder="mm/dd/yyyy" />
        <input type="text" id="input-date-range-picker-02" autoComplete="off" placeholder="mm/dd/yyyy" />
        <label htmlFor="input-date-range-picker-01">Date</label>
      </ForgeTextField>
    </ForgeDateRangePicker>
  );
};
