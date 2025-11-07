import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { tylIconOpenInNew } from '@tylertech/tyler-icons';
import { storyStyles } from '../../../decorators';
import { IconRegistry } from '@tylertech/forge/icon/icon-registry';

import '@tylertech/forge/card';
import '@tylertech/forge/button';
import '@tylertech/forge/icon';
import '@tylertech/forge/label-value';

import styles from './RequestCard.scss?inline';

IconRegistry.define(tylIconOpenInNew);

const meta = {
  title: 'Recipes/Card/Request',
  decorators: [storyStyles(styles)],
  render: () => html`
    <forge-card>
      <div class="grid-container">
        <div class="illustration-container">
          <img src="https://cdn.forge.tylertech.com/v1/images/spot/land-zoning-spot.png" alt="Land Zoning" />
        </div>
        <div class="date-request">
          <forge-label-value>
            <div slot="label">07/18/2019</div>
            <div slot="value">2 Pending requests to approve</div>
          </forge-label-value>
        </div>
        <div class="view-all">
          <forge-button>
            <a href="javascript: void(0);">
              View all
              <forge-icon name="open_in_new"></forge-icon>
            </a>
          </forge-button>
        </div>
      </div>
    </forge-card>
  `,
  parameters: {
    controls: { disable: true },
    actions: { disable: true }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
