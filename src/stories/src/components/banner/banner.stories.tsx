import { Meta } from '@storybook/react';
const MDX = require('./banner.mdx').default;
import { argTypes, IBannerProps } from './banner-args';
import { DefaultTemplate } from './templates/default';

export default {
  title: 'Components/Banner',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  dismissed: false,
  canDismiss: true,
  theme: 'default',
  hasIcon: true,
  hasButton: false,
} as IBannerProps;
