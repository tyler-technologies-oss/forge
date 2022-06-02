import React from 'react';
import { Meta, Story } from '@storybook/react';
import { IColorPickerProps, argTypes } from './color-picker-args';
import { ForgeCard, ForgeColorPicker } from '@tylertech/forge-react';

const MDX = require('./color-picker.mdx').default;

export default {
  title: 'Components/Color Picker',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    }
  }
} as Meta;

export const Default: Story<IColorPickerProps> = ({
  value = '#990000',
  allowOpacity = true,
  opacity = 1,
}) => {
  value = value.length === 7 ? value : '';

  return (
    <ForgeCard outlined style={{'--forge-card-padding': '0', display: 'inline-block'}}>
      <ForgeColorPicker value={value} allowOpacity={allowOpacity} opacity={opacity} />
    </ForgeCard>
  );
};
Default.args = {
  value: '#990000',
  allowOpacity: true,
  opacity: 1
} as IColorPickerProps;

