import { Meta } from '@storybook/react';
import { IToastProps, argTypes } from './toast-args';
import { DefaultTemplate } from './templates/default';
const MDX = require('./toast.mdx').default;

export default {
  title: 'Components/Toast',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  message: 'Save successful.',
  actionText: '',
  duration: 2750,
  placement: 'bottom',
  showClose: true,
} as IToastProps;
