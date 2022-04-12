import { Meta } from '@storybook/react';
import { argTypes, IBadgeProps } from './badge-arg-types';
import { IconButtonRecipeTemplate } from './templates/icon-button';
const MDX = require('./badge.mdx').default;

export default {
  title: 'Components/Badge/Recipes',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const RecipeIconButton = IconButtonRecipeTemplate.bind({});
RecipeIconButton.args = {
  dot: false,
  open: true,
  theme: 'default',
  positioned: true,
  strong: false,
  text: '1',
  badgeBackgroundColor: undefined,
} as IBadgeProps;
