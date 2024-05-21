import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { standaloneStoryParams, transformCssPropsToControls, customElementStoryRenderer } from '../utils';
import { tylIconPerson } from '@tylertech/tyler-icons/standard';
import { IconRegistry } from '@tylertech/forge/icon/icon-registry';

import '@tylertech/forge/avatar';
import '@tylertech/forge/icon-button';
import '@tylertech/forge/icon';

const meta = {
  title: 'Components/Avatar',
  render: args => customElementStoryRenderer('forge-avatar', args),
  component: 'forge-avatar',
  parameters: {
    controls: {
      exclude: /^root/i,
    },
    actions: { disable: true }
  },
  argTypes: {
    ...transformCssPropsToControls('forge-avatar')
  },
  args: {
    text: 'Tyler Forge',
    letterCount: 2
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {};

const imageUrl = 'https://cdn.forge.tylertech.com/v1/icons/svg/custom/forge_logo.svg';
export const WithImage: Story = {
  parameters: {
    controls: { disable: true },
  },
  args: {
    'image-url': imageUrl,
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
    const iconButton = document.createElement('forge-icon-button');
    iconButton.setAttribute('aria-label', 'Icon button with avatar');
    const el = customElementStoryRenderer('forge-avatar', args);
    iconButton.appendChild(el);
    return iconButton;
  }
};
