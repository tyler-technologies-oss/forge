import { type Meta, type StoryObj } from '@storybook/web-components';
import { customElementStoryRenderer, generateCustomElementArgTypes } from '../../utils';

import '@tylertech/forge/virtualizer';

const component = 'forge-virtualizer';

const meta = {
  title: 'Components/Virtualizer',
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
