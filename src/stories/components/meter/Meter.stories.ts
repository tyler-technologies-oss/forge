import { type Meta, type StoryObj } from '@storybook/web-components';
import { customElementStoryRenderer, generateCustomElementArgTypes } from '../../utils';

import '@tylertech/forge/meter';

const component = 'forge-meter';

const meta = {
  title: 'Components/Meter',
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
