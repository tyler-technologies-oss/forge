import React from 'react';
import { Story } from '@storybook/react';
import { ForgeCard, ForgeColorPicker } from '@tylertech/forge-react';
import { IColorPickerProps } from '../color-picker-args';

export const DefaultTemplate: Story<IColorPickerProps> = ({
  value = '#990000',
  allowOpacity = true,
  opacity = 1,
}) => {
  const colorPickerProps = {
    value: value.length === 7 ? value : '',
    allowOpacity,
    opacity,
  };
  return (
    <ForgeCard outlined style={{'--forge-card-padding': '0', display: 'inline-block'}}>
      <ForgeColorPicker {...colorPickerProps}></ForgeColorPicker>
    </ForgeCard>
  );
};
