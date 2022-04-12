import { Meta } from '@storybook/react';
import { DefaultTemplate } from './templates/default';
import { argTypes, IBusyIndicatorProps } from './busy-indicator-args';
const MDX = require('./busy-indicator.mdx').default;

export default {
  title: 'Components/Busy Indicator',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  titleText: 'Title',
  message: 'Message text...',
  cancel: false,
  spinner: true,
  progressBar: false,
  progressBarDeterminate: false,
  progress: 0,
  buffer: 0,
  width: 0,
  direction: 'row',
} as IBusyIndicatorProps;

export const Progress = DefaultTemplate.bind({});
Progress.args = {
  titleText: 'Uploading',
  message: 'Your document is being uploaded...',
  cancel: true,
  spinner: false,
  progressBar: true,
  progressBarDeterminate: true,
  progress: 0.5,
  buffer: 1,
  width: 400,
  direction: 'row',
} as IBusyIndicatorProps;
