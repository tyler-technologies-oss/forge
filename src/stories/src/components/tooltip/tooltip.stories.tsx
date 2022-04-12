import { Meta } from '@storybook/react';
import { DefaultTemplate } from './templates/default';
import { ITooltipProps, argTypes } from './tooltip-args';
const MDX = require('./tooltip.mdx').default;

export default {
  title: 'Components/Tooltip',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  text: 'Some useful tooltip text',
  delay: 500,
  position: 'right',
} as ITooltipProps;
