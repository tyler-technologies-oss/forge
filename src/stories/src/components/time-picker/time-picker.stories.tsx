import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ITimePickerProps, argTypes } from './time-picker-args';
import { ForgeTextField, ForgeTimePicker } from '@tylertech/forge-react';

const MDX = require('./time-picker.mdx').default;

export default {
  title: 'Components/Time Picker',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    }
  }
} as Meta;

export const Default: Story<ITimePickerProps> = ({
  allowSeconds = false,
  masked = true,
  showMaskFormat = false,
  use24HourTime = false,
  allowInvalidTime = false,
  step = 60,
  allowInput = true,
  allowDropdown = true,
  showNow = false,
  showHourOptions = true,
  disabled = false
}) => (
  <ForgeTimePicker 
    style={{maxWidth: '256px'}}
    allowSeconds={allowSeconds}
    masked={masked}
    showMaskFormat={showMaskFormat}
    use24HourTime={use24HourTime}
    allowInvalidTime={allowInvalidTime}
    step={step}
    allowInput={allowInput}
    allowDropdown={allowDropdown}
    showNow={showNow}
    showHourOptions={showHourOptions}
    disabled={disabled}>
    <ForgeTextField>
      <input autoComplete="off" type="text" id="time-picker" placeholder={`hh:mm${allowSeconds ? ':ss' : ''}${use24HourTime ? '' : ' AM'}`} />
      <label htmlFor="time-picker" slot="label">Time</label>
    </ForgeTextField>
  </ForgeTimePicker>
);
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
  showHourOptions: true,
  disabled: false
} as ITimePickerProps;
