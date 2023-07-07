import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ForgeSlider } from '@tylertech/forge-react';
import { ISliderProps, argTypes } from './slider-args';
import { SLIDER_CONSTANTS } from '@tylertech/forge';

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
  range = false,
  tickmarks = false,
  value = SLIDER_CONSTANTS.numbers.DEFAULT_VALUE,
  valueStart = SLIDER_CONSTANTS.numbers.DEFAULT_START_VALUE,
  valueEnd = SLIDER_CONSTANTS.numbers.DEFAULT_END_VALUE,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  readonly = false
}) => (
  <ForgeSlider
    range={range}
    tickmarks={tickmarks}
    value={value}
    valueStart={valueStart}
    valueEnd={valueEnd}
    min={min}
    max={max}
    step={step}
    disabled={disabled}
    readonly={readonly}
    data-aria-label={range ? null : 'Choose value'}
    data-aria-label-start={range ? 'Choose start value' : null}
    data-aria-label-end={range ? 'Choose end value' : null}
    style={{ marginTop: '24px' }} />
);
Default.args = {
  range: false,
  tickmarks: false,
  value: SLIDER_CONSTANTS.numbers.DEFAULT_VALUE,
  valueStart: SLIDER_CONSTANTS.numbers.DEFAULT_START_VALUE,
  valueEnd: SLIDER_CONSTANTS.numbers.DEFAULT_END_VALUE,
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  readonly: false
} as ISliderProps;
