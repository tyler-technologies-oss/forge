import { type Meta, type StoryObj } from '@storybook/web-components';
import { customElementStoryRenderer, generateCustomElementArgTypes } from '../../utils';

import '@tylertech/forge/tree/tree';

const component = 'forge-tree';

const meta = {
  title: 'Components/Tree',
  render: args => customElementStoryRenderer(component, args),
  component,
  argTypes: {
    ...generateCustomElementArgTypes({ tagName: component })
  },
  args: {}
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
