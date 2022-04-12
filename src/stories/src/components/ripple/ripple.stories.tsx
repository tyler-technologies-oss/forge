import { Meta } from '@storybook/react';
import { DefaultTemplate } from './templates/default';
import { CardRecipeTemplate } from './templates/card-recipe';
import { IRippleArgs, argTypes } from './ripple-args';
const MDX = require('./ripple.mdx').default;

export default {
  title: 'Components/Ripple',
  parameters: { 
    docs: { 
      page: MDX
    }
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.argTypes = argTypes;
Default.args = {
  unbounded: false
} as IRippleArgs;

export const WithCard = CardRecipeTemplate.bind({});
WithCard.parameters = { 
  controls: { disable: true }
};
