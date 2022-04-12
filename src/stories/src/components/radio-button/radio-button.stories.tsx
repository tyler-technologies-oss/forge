import { Meta } from '@storybook/react';
import { DefaultTemplate } from './templates/default';
import { IRadioButtonProps, argTypes } from './radio-button-args';
const MDX = require('./radio-button.mdx').default;

export default {
  title: 'Components/Radio Button',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  dense: false,
} as IRadioButtonProps;
