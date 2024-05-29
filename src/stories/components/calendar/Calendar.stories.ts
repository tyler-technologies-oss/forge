import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { customElementStoryRenderer, generateCustomElementArgTypes } from '../../utils';

import '@tylertech/forge/calendar';

const component = 'forge-calendar';

const meta = {
  title: 'Components/Calendar',
  render: args => customElementStoryRenderer(component, args),
  component,
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
