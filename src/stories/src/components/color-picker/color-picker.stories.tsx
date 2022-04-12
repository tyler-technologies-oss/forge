import { Meta } from '@storybook/react';
const MDX = require('./color-picker.mdx').default;
import { IColorPickerProps, argTypes } from './color-picker-args';
import { DefaultTemplate } from './templates/default';

export default {
  title: 'Components/Color Picker',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  value: '#990000',
  allowOpacity: true,
  opacity: 1,
} as IColorPickerProps;

