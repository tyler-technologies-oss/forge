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

  const datepickerProps = {
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
    <ForgeDatePicker {...datepickerProps} style={{ maxWidth: '256px' }}>
      <ForgeTextField>
        <input type="text" id="input-datepicker"/>
        <label htmlFor="input-datepicker">Choose date</label>
      </ForgeTextField>
    </ForgeDatePicker>
  );
};
