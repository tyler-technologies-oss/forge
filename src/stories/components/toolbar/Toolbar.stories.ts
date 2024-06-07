import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { customElementStoryRenderer, generateCustomElementArgTypes } from '../../utils';

import '@tylertech/forge/toolbar';

const component = 'forge-toolbar';

const meta = {
  title: 'Components/Toolbar',
  render: args => html`
    <forge-toolbar .inverted=${args.inverted}>
      <div slot="before-start">Before start</div>
      <div slot="start">Start</div>
      <div slot="center">Center</div>
      <div slot="end">End</div>
      <div slot="after-end">After end</div>
    </forge-toolbar>
  `,
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

export const Inverted: Story = {
  render: () => html`
    <forge-toolbar inverted>
      <div slot="before-start">Before start</div>
      <div slot="start">Start</div>
      <div slot="center">Center</div>
      <div slot="end">End</div>
      <div slot="after-end">After end</div>
    </forge-toolbar>
  `
};
