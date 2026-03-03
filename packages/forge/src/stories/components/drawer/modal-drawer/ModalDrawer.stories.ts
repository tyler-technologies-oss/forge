import { html, nothing } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { action } from 'storybook/actions';
import { generateCustomElementArgTypes } from '../../../utils.js';
import { tylIconDrafts, tylIconEmail, tylIconInbox, tylIconSend } from '@tylertech/tyler-icons';
import { IconRegistry } from '@tylertech/forge/icon';
import { createRef, ref } from 'lit/directives/ref.js';
import { type IModalDrawerComponent } from '@tylertech/forge/drawer/modal-drawer';

import '@tylertech/forge/drawer/modal-drawer';
import '@tylertech/forge/list';
import '@tylertech/forge/toolbar';
import '@tylertech/forge/icon';
import '@tylertech/forge/scaffold';
import '@tylertech/forge/card';
import '@tylertech/forge/app-bar';
import '@tylertech/forge/app-bar/menu-button';

const component = 'forge-modal-drawer';

const closeAction = action('forge-modal-drawer-close');
const afterOpenAction = action('forge-drawer-after-open');
const afterCloseAction = action('forge-drawer-after-close');

IconRegistry.define([tylIconInbox, tylIconSend, tylIconDrafts, tylIconEmail]);

const meta = {
  title: 'Components/Drawer/Modal Drawer',
  render: args => {
    const drawerRef = createRef<IModalDrawerComponent>();

    function toggleDrawer(): void {
      const drawer = drawerRef.value as IModalDrawerComponent;
      drawer.open = !drawer.open;
    }

    const header = args.showHeader
      ? html`
          <forge-toolbar slot="header">
            <div>Header</div>
          </forge-toolbar>
        `
      : nothing;

    const footer = args.showFooter
      ? html`
          <forge-toolbar inverted slot="footer">
            <div>Footer</div>
          </forge-toolbar>
        `
      : nothing;

    return html`
      <forge-scaffold style="--forge-scaffold-height: 300px;">
        <forge-app-bar slot="header" title-text="Modal Drawer Demo">
          <forge-app-bar-menu-button slot="start" @click=${toggleDrawer}></forge-app-bar-menu-button>
        </forge-app-bar>
        <forge-modal-drawer
          ${ref(drawerRef)}
          slot=${args.direction}
          .open=${args.open}
          .direction=${args.direction}
          @forge-modal-drawer-close=${closeAction}
          @forge-drawer-after-open=${afterOpenAction}
          @forge-drawer-after-close=${afterCloseAction}>
          ${header}
          <aside>
            <forge-list navlist>
              <forge-list-item selected>
                <forge-icon slot="start" name="inbox"></forge-icon>
                <a href="javascript: void(0)">Inbox</a>
              </forge-list-item>
              <forge-list-item>
                <forge-icon slot="start" name="send"></forge-icon>
                <a href="javascript: void(0)">Outgoing</a>
              </forge-list-item>
              <forge-list-item indented>
                <a href="javascript: void(0)">Pending</a>
              </forge-list-item>
              <forge-list-item>
                <forge-icon slot="start" name="drafts"></forge-icon>
                <a href="javascript: void(0)">Drafts</a>
              </forge-list-item>
              <forge-list-item>
                <forge-icon slot="start" name="send"></forge-icon>
                <a href="javascript: void(0)">Sent</a>
              </forge-list-item>
            </forge-list>
          </aside>
          ${footer}
        </forge-modal-drawer>

        <main slot="body">
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
    }),
    showHeader: { control: { type: 'boolean' } },
    showFooter: { control: { type: 'boolean' } }
  },
  args: {
    showHeader: false,
    showFooter: false,
    open: true,
    direction: 'left'
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
