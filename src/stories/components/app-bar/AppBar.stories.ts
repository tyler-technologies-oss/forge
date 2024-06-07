import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { customElementStoryRenderer, generateCustomElementArgTypes, standaloneStoryParams } from '../../utils';
import { tylIconForgeLogo } from '@tylertech/tyler-icons/custom';
import { IconRegistry } from '@tylertech/forge/icon/icon-registry';

import '@tylertech/forge/app-bar';
import '@tylertech/forge/expansion-panel';
import '@tylertech/forge/divider';
import '@tylertech/forge/open-icon';

const component = 'forge-app-bar';

IconRegistry.define([tylIconForgeLogo]);

const meta = {
  title: 'Components/App Bar',
  render: args => customElementStoryRenderer(component, args),
  component,
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['target'],
      controls: {
        elevation: { type: 'string', control: 'select', options: ['none', 'raised'] },
        theme: { type: 'string', control: 'select', options: ['white', ''] }
      }
    })
  },
  args: {
    titleText: 'Tyler Forge',
    elevation: 'raised',
    theme: '',
    href: ''
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const Full: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <forge-app-bar title-text="Tyler Forge™">
      <forge-app-bar-menu-button slot="start"></forge-app-bar-menu-button>
      <forge-icon slot="logo" name="forge_logo"></forge-icon>
      <forge-app-bar-search slot="center">
        <input type="text" placeholder="Search" />
      </forge-app-bar-search>
      <forge-app-bar-help-button slot="end"></forge-app-bar-help-button>
      <forge-app-bar-notification-button slot="end"></forge-app-bar-notification-button>
      <forge-app-bar-app-launcher-button slot="end" allow-more="true"></forge-app-bar-app-launcher-button>
      <forge-app-bar-profile-button slot="end" avatar-text="First Last" full-name="First Last" email="first.last@tylertech.com"></forge-app-bar-profile-button>
    </forge-app-bar>
  `
};
