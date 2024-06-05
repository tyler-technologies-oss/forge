import { html, render } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { customElementStoryRenderer, generateCustomElementArgTypes, standaloneStoryParams } from '../../utils';

import '@tylertech/forge/skeleton';

const component = 'forge-skeleton';

const meta = {
  title: 'Components/Skeleton',
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

export const Profile = {
  ...standaloneStoryParams,
  render: () => html`
  <div style="width: 200px">
    <forge-skeleton avatar></forge-skeleton>
    <forge-skeleton text></forge-skeleton>
    <forge-skeleton text></forge-skeleton>
    <forge-skeleton text style="width: 75%;"></forge-skeleton>
  </div>
  `
}

export const List = {
  ...standaloneStoryParams,
  render: () => html`
  <div style="width: 200px">
    <forge-skeleton list-item></forge-skeleton>
    <forge-skeleton list-item></forge-skeleton>
    <forge-skeleton list-item></forge-skeleton>
  </div>
  `
}

export const Chips = {
  ...standaloneStoryParams,
  render: () => html`
  <div style="width: 200px">
    <forge-skeleton chip></forge-skeleton>
    <forge-skeleton chip></forge-skeleton>
    <forge-skeleton chip></forge-skeleton>
  </div>
  `
}

export const Buttons = {
  ...standaloneStoryParams,
  render: () => html`
  <div style="width: 200px">
    <forge-skeleton button></forge-skeleton>
    <forge-skeleton button></forge-skeleton>
    <forge-skeleton button></forge-skeleton>
  </div>
  `
}

export const FormField = {
  ...standaloneStoryParams,
  render: () => html`
  <div style="width: 200px">
    <forge-skeleton form-field></forge-skeleton>
    <forge-skeleton form-field></forge-skeleton>
    <forge-skeleton form-field></forge-skeleton>
  </div>
  `
}