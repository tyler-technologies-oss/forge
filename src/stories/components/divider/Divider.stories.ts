import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { customElementStoryRenderer, generateCustomElementArgTypes } from '../../utils';

import '@tylertech/forge/divider';

const component = 'forge-divider';

const meta = {
  title: 'Components/Divider',
  render: args => {
    const el = customElementStoryRenderer(component, args);
    let style = 'height: 200px;';
    if (!args.vertical) {
      style = '';
    }
    return html` <div style=${style}>${el}</div> `;
  },
  component,
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component
    })
  },
  args: {}
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
