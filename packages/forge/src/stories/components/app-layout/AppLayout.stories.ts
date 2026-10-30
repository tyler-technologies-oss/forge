import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconHome, tylIconInbox, tylIconSettings, tylIconStar } from '@tylertech/tyler-icons';

import '@tylertech/forge/app-layout';
import '@tylertech/forge/list';
import '@tylertech/forge/icon';

const component = 'forge-app-layout';

IconRegistry.define([tylIconHome, tylIconInbox, tylIconSettings, tylIconStar]);

const meta = {
  title: 'Components/App Layout',
  component,
  argTypes: {
    appTitle: {
      control: 'text',
      description: 'The title text to display in the app bar',
      table: {
        category: 'Properties'
      }
    },
    appTitleHref: {
      control: 'text',
      description: 'The URL that the app bar title links to',
      table: {
        category: 'Properties'
      }
    },
    breakpoint: {
      control: 'number',
      description: 'The screen width breakpoint in pixels for responsive behavior',
      table: {
        category: 'Properties'
      }
    }
  },
  args: {
    appTitle: 'App Layout Demo',
    appTitleHref: undefined,
    breakpoint: 960
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {
  render: args => html`
    <forge-app-layout app-title=${args.appTitle} app-title-href=${ifDefined(args.appTitleHref)} breakpoint=${args.breakpoint}>
      <forge-list navlist slot="navigation" data-forge-app-layout-close>
        <forge-list-item>
          <forge-icon slot="start" name="home"></forge-icon>
          <a href="javascript: void(0);">Home</a>
        </forge-list-item>
        <forge-list-item>
          <forge-icon slot="start" name="inbox"></forge-icon>
          <a href="javascript: void(0);">Inbox</a>
        </forge-list-item>
        <forge-list-item>
          <forge-icon slot="start" name="star"></forge-icon>
          <a href="javascript: void(0);">Starred</a>
        </forge-list-item>
        <forge-list-item>
          <forge-icon slot="start" name="settings"></forge-icon>
          <a href="javascript: void(0);">Settings</a>
        </forge-list-item>
      </forge-list>

      <div style="padding: var(--forge-spacing-medium);" slot="body">
        <p class="forge-typography--body1">Resize the frame to see the responsive behavior</p>
      </div>
    </forge-app-layout>
  `
};
