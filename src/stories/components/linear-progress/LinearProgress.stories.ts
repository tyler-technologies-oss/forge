import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { customElementStoryRenderer, generateCustomElementArgTypes, standaloneStoryParams } from '../../utils';

import '@tylertech/forge/linear-progress';

const component = 'forge-linear-progress';

const meta = {
  title: 'Components/Linear Progress',
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

export const Determinate: Story = {
  ...standaloneStoryParams,
  render: () => {
    return html`
    <forge-linear-progress determinate progress="0.5"></forge-linear-progress>
    `;
  },
};

export const Buffer: Story = {
  ...standaloneStoryParams,
  render: () => {
    return html`
    <forge-linear-progress determinate progress="0.33" buffer="0.66"></forge-linear-progress>
    `;
  },
};