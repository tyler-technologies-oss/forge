import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { customElementStoryRenderer, generateCustomElementArgTypes } from '../../utils';

import '@tylertech/forge/view-switcher';

const component = 'forge-view-switcher';

const meta = {
  title: 'Components/View Switcher',
  render: args => customElementStoryRenderer(component, args),
  component,
  subcomponents: {
    'View': 'forge-view',
  },
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      
    }),
  },
  args: {

  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
