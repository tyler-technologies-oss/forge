import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { customElementStoryRenderer, generateCustomElementArgTypes, standaloneStoryParams } from '../../../utils';

import '@tylertech/forge/app-bar';

const component = 'forge-app-bar-notification-button';

const meta = {
  title: 'Components/App Bar/Notifications',
  render: args => customElementStoryRenderer(component, args),
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

export const Demo: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-app-bar title-text="Menu Button">
      <forge-app-bar-notification-button slot="end" show-badge dot> </forge-app-bar-notification-button>
    </forge-app-bar>
  `
};
