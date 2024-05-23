import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { customElementStoryRenderer, generateCustomElementArgTypes, standaloneStoryParams } from '../../utils';
import { tylIconPerson } from '@tylertech/tyler-icons/standard';
import { IconRegistry } from '@tylertech/forge/icon/icon-registry';

import '@tylertech/forge/avatar';
import '@tylertech/forge/icon-button';
import '@tylertech/forge/icon';

const component = 'forge-avatar';

const meta = {
  title: 'Components/Avatar',
  render: args => customElementStoryRenderer(component, args),
  component,
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({ tagName: component }),
  },
  args: {
    text: 'Tyler Forge',
    letterCount: 2
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

const imageUrl = 'https://cdn.forge.tylertech.com/v1/icons/svg/custom/forge_logo.svg';
export const WithImage: Story = {
  parameters: {
    controls: { disable: true }
  },
  args: {
    imageUrl
  }
};

export const WithIcon: Story = {
  ...standaloneStoryParams,
  render: () => {
    IconRegistry.define(tylIconPerson);
    return html`
      <forge-avatar>
        <forge-icon name="person"></forge-icon>
      </forge-avatar>
    `;
  }
};

export const WithIconButton: Story = {
  ...standaloneStoryParams,
  render: args => {
    return html`
      <forge-icon-button aria-label="Icon button with avatar">
        ${customElementStoryRenderer(component, args)}
      </forge-icon-button>
    `;
  }
};
