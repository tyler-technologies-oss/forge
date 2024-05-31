import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { customElementStoryRenderer, generateCustomElementArgTypes } from '../../utils';

import '@tylertech/forge/divider';

const component = 'forge-divider';

const meta = {
  title: 'Components/Divider',
  render: args => {
    const el = customElementStoryRenderer(component, args);

    return html`
      <div style="height: 400px;">
        ${el}
      </div>
    `;
  },
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
