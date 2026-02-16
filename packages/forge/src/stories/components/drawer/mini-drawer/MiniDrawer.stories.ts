import { html, nothing } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { action } from 'storybook/actions';
import { generateCustomElementArgTypes } from '../../../utils';
import { tylIconDrafts, tylIconEmail, tylIconInbox, tylIconSend } from '@tylertech/tyler-icons';
import { IconRegistry } from '@tylertech/forge/icon/icon-registry';
import { createRef, ref } from 'lit/directives/ref.js';
import { type IMiniDrawerComponent } from '@tylertech/forge/drawer/mini-drawer';

import '@tylertech/forge/drawer/mini-drawer';
import '@tylertech/forge/list';
import '@tylertech/forge/toolbar';
import '@tylertech/forge/icon';
import '@tylertech/forge/scaffold';
import '@tylertech/forge/card';
import '@tylertech/forge/app-bar';
import '@tylertech/forge/app-bar/menu-button';
import '@tylertech/forge/tooltip';

const component = 'forge-mini-drawer';

const afterOpenAction = action('forge-drawer-after-open');
const afterCloseAction = action('forge-drawer-after-close');

IconRegistry.define([tylIconInbox, tylIconSend, tylIconDrafts, tylIconEmail]);

const meta = {
  title: 'Components/Drawer/Mini Drawer',
  render: args => {
    const drawerRef = createRef<IMiniDrawerComponent>();

    function toggleDrawer(): void {
      const drawer = drawerRef.value as IMiniDrawerComponent;
      drawer.open = !drawer.open;
    }

    return html`
      <forge-scaffold style="--forge-scaffold-height: 300px;">
        <forge-app-bar slot="header" title-text="Drawer Demo">
          <forge-app-bar-menu-button slot="start" @click=${toggleDrawer}></forge-app-bar-menu-button>
        </forge-app-bar>
        <forge-mini-drawer
          ${ref(drawerRef)}
          slot=${`body-${args.direction}`}
          .open=${args.open}
          .direction=${args.direction}
          ?hover=${args.hover}
          @forge-drawer-after-open=${afterOpenAction}
          @forge-drawer-after-close=${afterCloseAction}>
          <aside>
            <forge-list navlist>
              <forge-list-item selected id="tooltip-host-1">
                ${!args.hover ? html`<forge-tooltip anchor="tooltip-host-1">Inbox</forge-tooltip>` : nothing}
                <forge-icon slot="start" name="inbox"></forge-icon>
                <a href="javascript: void(0)">Inbox</a>
              </forge-list-item>
              <forge-list-item id="tooltip-host-2">
                ${!args.hover ? html`<forge-tooltip anchor="tooltip-host-2">Sent</forge-tooltip>` : nothing}
                <forge-icon slot="start" name="send"></forge-icon>
                <a href="javascript: void(0)">Sent</a>
              </forge-list-item>
              <forge-list-item id="tooltip-host-3">
                ${!args.hover ? html`<forge-tooltip anchor="tooltip-host-3">Drafts</forge-tooltip>` : nothing}
                <forge-icon slot="start" name="drafts"></forge-icon>
                <a href="javascript: void(0)">Drafts</a>
              </forge-list-item>
            </forge-list>
          </aside>
        </forge-mini-drawer>

        <main slot="body" style="padding: 16px; background-color: var(--forge-theme-surface-dim);">
          <forge-card>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </forge-card>
        </main>
      </forge-scaffold>
    `;
  },
  component,
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      controls: {
        direction: { control: 'select', options: ['left', 'right'] }
      }
    })
  },
  args: {
    open: true,
    hover: false,
    direction: 'left'
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const Hover: Story = {
  args: { hover: true }
};
