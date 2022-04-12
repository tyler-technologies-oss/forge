import { Meta } from '@storybook/react';
import { argTypes, IFilePickerProps } from './file-picker-args';
const MDX = require('./file-picker.mdx').default;
import { DefaultTemplate } from './templates/default';

export default {
  title: 'Components/File Picker',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  accept: '',
  maxSize: 0,
  multiple: false,
  disabled: false,
  compact: false,
  borderless: false,
} as IFilePickerProps;
