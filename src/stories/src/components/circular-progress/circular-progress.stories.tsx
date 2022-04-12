import { Meta } from '@storybook/react';
import { DefaultTemplate } from './templates/default';
import { CustomTemplate } from './templates/custom';
import { ICircularProgressProps, argTypes } from './circular-progress-args';
const MDX = require('./circular-progress.mdx').default;

export default {
  title: 'Components/Circular Progress',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  open: true,
  determinate: false,
  progress: 0.5
} as ICircularProgressProps;

export const Custom = CustomTemplate.bind({});
Custom.args = {
  open: true,
  determinate: false,
  progress: 0.5
} as ICircularProgressProps;
