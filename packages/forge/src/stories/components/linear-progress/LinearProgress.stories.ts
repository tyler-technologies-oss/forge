import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { customElementStoryRenderer, generateCustomElementArgTypes, standaloneStoryParams } from '../../utils';

import '@tylertech/forge/linear-progress';

const component = 'forge-linear-progress';

const meta = {
  title: 'Components/Linear Progress',
  render: args => {
    const el = customElementStoryRenderer(component, args);
    el.setAttribute('aria-label', 'Linear progress demo');
    return el;
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

export const Determinate: Story = {
  ...standaloneStoryParams,
  render: () => html` <forge-linear-progress determinate progress="0.5" aria-label="Linear progress demo"></forge-linear-progress> `
};

export const Buffer: Story = {
  ...standaloneStoryParams,
  render: () => html` <forge-linear-progress determinate progress="0.33" buffer="0.66" aria-label="Linear progress buffer demo"></forge-linear-progress> `
};
