import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ForgeSlider } from '@tylertech/forge-react';
import { ISliderProps, argTypes } from './slider-args';

const MDX = require('./slider.mdx').default;

export default {
  title: 'Components/Slider',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    }
  }
} as Meta;

export const Default: Story<ISliderProps> = ({
  type = 'continuous',
  value = 50,
  valueStart = 0,
  min = 0,
  max = 100,
  step = 1,
  disabled = false
}) => (
  <ForgeSlider
    type={type}
    value={value}
    valueStart={valueStart}
    min={min}
    max={max}
    step={step}
    disabled={disabled}
    style={{ marginTop: '24px' }} />
);
Default.args = {
  type: 'continuous',
  value: 75,
  valueStart: 25,
  min: 0,
  max: 100,
  step: 1,
  disabled: false
} as ISliderProps;
