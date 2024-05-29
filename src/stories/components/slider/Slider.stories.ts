import { type Meta, type StoryObj } from '@storybook/web-components';
import { action } from '@storybook/addon-actions';
import { customElementStoryRenderer, generateCustomElementArgTypes, standaloneStoryParams } from '../../utils';

import '@tylertech/forge/slider';
import './Slider.scss';

const component = 'forge-slider';

const inputAction = action('forge-slider-input');
const changeAction = action('forge-slider-change');
const rangeInputAction = action('forge-slider-range-input');
const rangeChangeAction = action('forge-slider-range-change');

const meta = {
  title: 'Components/Slider',
  render: args => {
    const el = customElementStoryRenderer(component, args);
    
    if (args.range) {
      el.setAttribute('data-aria-label-start', 'Start');
      el.setAttribute('data-aria-label-end', 'End');
    } else {
      el.setAttribute('data-aria-label', 'Value');
    }

    el.addEventListener('forge-slider-input', inputAction);
    el.addEventListener('forge-slider-change', changeAction);
    el.addEventListener('forge-slider-range-input', rangeInputAction);
    el.addEventListener('forge-slider-range-change', rangeChangeAction);

    return el;
  },
  component,
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['labelBuilder', 'name', 'nameStart', 'nameEnd', 'form', 'labels'],
      controls: {
        value: { 
          if : { arg: 'range', truthy: false },
          control: { type: 'range', min: 0, max: 100, step: 1 }
        },
        valueStart: {
          if: { arg: 'range' },
          control: { type: 'range', min: 0, max: 100, step: 1 }
        },
        valueEnd: {
          if: { arg: 'range' },
          control: { type: 'range', min: 0, max: 100, step: 1 }
        },
        label: { if: { arg: 'range', truthy: false }},
        labelStart: { if: { arg: 'range' }},
        labelEnd: { if: { arg: 'range' }}
      }
    }),
  },
  args: {
    value: 50,
    valueStart: 33,
    valueEnd: 67,
    min: 0,
    max: 100,
    step: 1,
    range: false,
    tickmarks: false,
    labeled: true,
    disabled: false,
    readonly: false
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const Range: Story = {
  ...standaloneStoryParams,
  args: { range: true }
};
