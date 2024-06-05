import { type Meta, type StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { tylIconNotifications } from '@tylertech/tyler-icons/standard';
import { storyStyles } from '../../../decorators';
import { IconRegistry } from '@tylertech/forge/icon/icon-registry';

import '@tylertech/forge/card';
import '@tylertech/forge/button';
import '@tylertech/forge/icon-button';
import '@tylertech/forge/toolbar';

import styles from './ProfileCard.scss?inline';

IconRegistry.define(tylIconNotifications);

const meta = {
  title: 'Recipes/Card/Profile',
  decorators: [storyStyles(styles)],
  render: () => html`
    <forge-card>
      <div class="container">
        <div class="avatar">
          <img src="https://png.pngtree.com/svg/20170602/0db185fb9c.svg" alt="Avatar">
        </div>
        <h2 class="forge-typography--heading4 overflow">Rick Dalton</h2>
        <span class="location">Hollywood, CA</span>
        <div class="overflow">
          <a href="mailto:email@tylertech.com">rick.dalton@tylertech.com</a>
        </div>
      </div>
      <forge-toolbar inverted>
        <forge-button slot="start">View Profile</forge-button>
        <forge-icon-button slot="end" aria-label="View notifications">
          <forge-icon name="notifications"></forge-icon>
        </forge-icon-button>
      </div>
    </forge-card>
  `,
  parameters: {
    controls: { disable: true },
    actions: { disable: true }
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
