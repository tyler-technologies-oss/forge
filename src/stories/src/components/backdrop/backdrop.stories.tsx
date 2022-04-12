import { Meta } from '@storybook/react';
const MDX = require('./backdrop.mdx').default;
import { argTypes, IBackdropProps } from './backdrop-args';
import { DefaultTemplate } from './templates/default';

export default {
  title: 'Components/Backdrop',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  delay: 0,
  maxOpacity: 0.54,
  appearance: 'dark',
} as IBackdropProps;
