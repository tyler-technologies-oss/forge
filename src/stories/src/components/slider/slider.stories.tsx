import { Meta } from '@storybook/react';
import { ISliderProps, argTypes } from './slider-args';
import { DefaultTemplate } from './templates/default';
const MDX = require('./slider.mdx').default;

export default {
  title: 'Components/Slider',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  type: 'continuous',
  value: 75,
  valueStart: 25,
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
} as ISliderProps;
