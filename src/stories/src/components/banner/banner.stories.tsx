import { Meta } from '@storybook/react';
const MDX = require('./banner.mdx').default;
import { argTypes, IBannerProps } from './banner-args';
import { DefaultTemplate } from './templates/default';
import { MobileTemplate } from './templates/mobile';
import { ThemedTemplate } from './templates/themed';

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
  hasIcon: false,
  hasButton: false,
} as IBannerProps;

export const Mobile = MobileTemplate.bind({});
Mobile.args = {
  dismissed: false,
  canDismiss: true,
  theme: 'default',
  hasIcon: false,
  hasButton: false,
} as IBannerProps;


export const Themed = ThemedTemplate.bind({});
Themed.args = {
  dismissed: false,
  canDismiss: true,
  theme: 'default',
  hasIcon: false,
  hasButton: false,
} as IBannerProps;
