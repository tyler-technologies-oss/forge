import { Meta } from '@storybook/react';
const MDX = require('./expansion-panel.mdx').default;
import { CardRecipeTemplate } from './templates/card-recipe';
import { argTypes, IExpansionPanelProps } from './expansion-panel-args';

export default {
  title: 'Components/Expansion Panel/Recipes',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Card = CardRecipeTemplate.bind({});
Card.args = {
  open: false,
  orientation: 'vertical',
  useAnimations: true,
} as IExpansionPanelProps;
