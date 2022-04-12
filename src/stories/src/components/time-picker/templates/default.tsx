import { Story } from '@storybook/react';
import { ForgeTextField, ForgeTimePicker } from '@tylertech/forge-react';
import React from 'react';
import { ITimePickerProps } from '../time-picker-args';

export const DefaultTemplate: Story<ITimePickerProps> = ({
  allowSeconds = false,
  masked = true,
  showMaskFormat = false,
  use24HourTime = false,
  allowInvalidTime = false,
  step = 60,
  allowInput = true,
  allowDropdown = true,
  showNow = false,
  disabled = false
}) => {
  const timePickerProps = {
    allowSeconds,
    masked,
    showMaskFormat,
    use24HourTime,
    allowInvalidTime,
    step,
    allowInput,
    allowDropdown,
    showNow,
    disabled
  };
  return (
    <ForgeTimePicker {...timePickerProps} style={{maxWidth: '256px'}}>
      <ForgeTextField>
        <input autoComplete={'off'} type="text" id="time-picker" placeholder={`hh:mm${allowSeconds ? ':ss' : ''}${use24HourTime ? '' : ' AM'}`} />
        <label htmlFor="time-picker" slot="label">Time</label>
      </ForgeTextField>
    </ForgeTimePicker>
  );
}
