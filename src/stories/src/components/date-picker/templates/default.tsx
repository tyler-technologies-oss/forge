import { Story } from '@storybook/react';
import { ForgeDatePicker, ForgeTextField } from '@tylertech/forge-react';
import React from 'react';
import { IDatePickerProps } from '../date-picker-args';

export const DefaultTemplate: Story<IDatePickerProps> = ({
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
      style={{ maxWidth: '256px' }}>
      <ForgeTextField>
        <input type="text" id="input-date-picker" />
        <label htmlFor="input-date-picker">Choose date</label>
      </ForgeTextField>
    </ForgeDatePicker>
  );
};
