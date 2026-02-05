import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { customElementStoryRenderer, generateCustomElementArgTypes, standaloneStoryParams } from '../../../utils';

import '@tylertech/forge/app-bar';

const component = 'forge-app-bar-search';

const meta = {
  title: 'Components/App Bar/Search',
  render: args => customElementStoryRenderer(component, args),
  component,
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['options', 'icon']
    })
  },
  args: {}
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-app-bar title-text="Search">
      <forge-app-bar-search slot="center">
        <input type="text" aria-label="Search for a record" placeholder="Search" />
      </forge-app-bar-search>
    </forge-app-bar>
  `
};
