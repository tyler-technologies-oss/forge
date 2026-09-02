import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { customElementStoryRenderer, generateCustomElementArgTypes } from '../../utils.js';

import '@tylertech/forge/kbd';

const component = 'forge-kbd';

const meta = {
  title: 'Components/Kbd',
  tags: ['new'],
  render: args => customElementStoryRenderer(component, { ...args, keys: (args.keys as unknown as string).split(/\s+/).filter(Boolean) }),
  component,
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component
    }),
    theme: {
      control: { type: 'select' },
      defaultValue: '',
      options: ['', 'primary', 'secondary', 'tertiary', 'surface', 'info', 'success', 'warning', 'error']
    }
  },
  args: {
    keys: 'K',
    shift: true
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
