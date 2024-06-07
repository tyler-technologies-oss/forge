import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { customElementStoryRenderer, generateCustomElementArgTypes, standaloneStoryParams } from '../../../utils';

import '@tylertech/forge/app-bar';
import { IMenuOption } from '@tylertech/forge';

const component = 'forge-app-bar-profile-button';

const meta = {
  title: 'Components/App Bar/Profile',
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
  render: () => {
    return html`
      <forge-app-bar title-text="Profile">
        <forge-app-bar-profile-button slot="end" profile-button="true" avatar-text="First Last" full-name="First Last" email="first.last@tylertech.com">
        </forge-app-bar-profile-button>
      </forge-app-bar>
    `;
  }
};
