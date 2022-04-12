import { Meta } from '@storybook/react';
import { argTypes, ILinearProgressProps } from './linear-progress-args';
import { DefaultTemplate } from './templates/default';
const MDX = require('./linear-progress.mdx').default;

export default {
  title: 'Components/Linear Progress',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  determinate: false,
  progress: 0.5,
  buffer: 1,
  visible: true
} as ILinearProgressProps;
