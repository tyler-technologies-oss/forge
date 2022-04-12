// tslint:disable variable-name
import { Meta } from '@storybook/react';
import { argTypes, IBadgeProps } from './badge-arg-types';
import { DefaultTemplate } from './templates/default';
import { IconButtonRecipeTemplate } from './templates/icon-button';
const MDX = require('./badge.mdx').default;

// tslint:disable-next-line: no-default-export
export default {
  title: 'Components/Badge',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  dot: false,
  open: true,
  theme: 'default',
  positioned: false,
  strong: false,
  text: 'Default',
  badgeBackgroundColor: undefined,
} as IBadgeProps;

export const WithIconButton = IconButtonRecipeTemplate.bind({});
WithIconButton.args = {
  dot: false,
  open: true,
  theme: 'default',
  positioned: true,
  strong: false,
  text: '3',
  badgeBackgroundColor: undefined,
} as IBadgeProps;
