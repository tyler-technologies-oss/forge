import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { customElementStoryRenderer, generateCustomElementArgTypes, standaloneStoryParams } from '../../utils';
import { tylIconForgeLogo } from '@tylertech/tyler-icons/custom';
import { IconRegistry } from '@tylertech/forge/icon/icon-registry';
import { storyStyles } from '../../decorators';

import '@tylertech/forge/app-bar';
import '@tylertech/forge/expansion-panel';
import '@tylertech/forge/divider';
import '@tylertech/forge/open-icon';
import '@tylertech/forge/button';

const component = 'forge-app-bar';

IconRegistry.define([tylIconForgeLogo]);

const meta = {
  title: 'Components/App Bar',
  render: args => {
    const el = customElementStoryRenderer(component, args);
    const icon = document.createElement('forge-icon');
    icon.setAttribute('slot', 'logo');
    icon.setAttribute('name', 'forge_logo');
    el.appendChild(icon);
    return el;
  },
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
    <forge-app-bar title-text="Tyler Forge™" theme="custom">
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

export const WhiteTheme: Story = {
  ...standaloneStoryParams,
  args: {
    theme: 'white'
  }
};

export const CustomTheme: Story = {
  ...standaloneStoryParams,
  decorators: [
    storyStyles(`
      .custom-app-bar {
        --forge-app-bar-background: whitesmoke;
        --forge-app-bar-foreground: darkblue;
        --forge-theme-primary: orangered;
      }
  `)
  ],
  render: () => html`
    <forge-app-bar class="custom-app-bar" title-text="Tyler Forge™" theme="custom">
      <forge-icon slot="logo" name="forge_logo"></forge-icon>
      <forge-button slot="end">Sign In</forge-button>
    </forge-app-bar>
  `
};

export const CSSOnly: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <header class="forge-app-bar forge-app-bar--raised">
      <div class="forge-app-bar__section-start">
        <button type="button" class="forge-icon-button" aria-label="Toggle menu">
          <svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </button>
        <div class="forge-app-bar__logo-title-container">
          <svg class="forge-icon forge-app-bar__logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>Forge design system logo</title>
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M20.9 3.2h-7.5c-.4 0-.7.2-.9.5l-1.6 2.9c-.3.5-.1 1.2.4 1.5.2.1.4.1.5.1h7.5c.4 0 .7-.2.9-.5l1.6-2.9c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.1-.5-.1zm-3.6 6.2H9.8c-.4 0-.8.2-1 .6l-1.6 2.7c-.2.3-.2.8 0 1.1l3.8 6.5c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l5.3-9.2c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.2-.5-.2zm-6.9-4.6c.3-.5.1-1.2-.4-1.5-.2-.1-.4-.1-.6-.1H3c-.6 0-1.1.5-1.1 1.1 0 .2.1.4.1.5l2.7 4.6.5.9c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l3.3-5.5z" />
          </svg>
          <a href="javascript: void(0);" class="forge-app-bar__title">
            <h1>App Bar</h1>
          </a>
        </div>
      </div>

      <div class="forge-app-bar__section-center">
        <!--
        <div class="forge-app-bar-search">
          <input type="text" placeholder="Search" aria-label="Search" id="app-bar-search" style="width: 256px" />
        </div>
        -->
        <div class="forge-field forge-field--filled">
          <svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <input type="text" placeholder="Search..." aria-label="Search" />
        </div>
      </div>

      <div class="forge-app-bar__section-end">
        <button type="button" class="forge-icon-button" aria-label="View user profile">
          <div class="forge-avatar">
            <svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </button>
      </div>
    </header>
  `
};
