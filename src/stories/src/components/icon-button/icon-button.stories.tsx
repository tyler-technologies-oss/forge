import { Meta } from '@storybook/react';
import { DefaultTemplate } from './templates/default';
import { argTypes, IIconButtonProps } from './icon-button-args';
const MDX = require('./icon-button.mdx').default;

export default {
  title: 'Components/Icon Button',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  toggle: false,
  dense: false,
  densityLevel: 5
} as IIconButtonProps;
