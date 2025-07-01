import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import '@tylertech/forge/card';
import '@tylertech/forge/scaffold';
import '@tylertech/forge/button';
import '@tylertech/forge/text-field';
import { storyStyles } from '../decorators';

const meta = {
  title: 'FAQ/Focus Indicator Clipping',
  tags: ['hidden'],
  parameters: {
    controls: { disable: true },
    actions: { disable: true }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const ClippingExample: Story = {
  decorators: [
    storyStyles(`
      forge-scaffold > [slot="body"] > *:not(:last-child) {
        margin-block-end: var(--forge-spacing-medium);
      }
    `)
  ],
  render: () => {
    return html`
      <forge-card>
        <forge-scaffold>
          <div slot="body">
            <forge-text-field>
              <label for="my-input">My Input</label>
              <input id="my-input" type="text" />
            </forge-text-field>
            <forge-button>My Button</forge-button>
          </div>
        </forge-scaffold>
      </forge-card>
    `;
  }
};

export const NoClippingExample: Story = {
  decorators: [
    storyStyles(`
      forge-scaffold > [slot="body"] > *:not(:last-child) {
        margin-block-end: var(--forge-spacing-medium);
      }

      .my-scaffold-body {
        padding: var(--forge-spacing-medium);
      }
    `)
  ],
  render: () => {
    return html`
      <forge-card class="my-card">
        <forge-scaffold>
          <div slot="body" class="my-scaffold-body">
            <forge-text-field>
              <label for="my-input">My Input</label>
              <input id="my-input" type="text" />
            </forge-text-field>
            <forge-button>My Button</forge-button>
          </div>
        </forge-scaffold>
      </forge-card>
    `;
  }
};

export const NoClippingFixExample: Story = {
  decorators: [
    storyStyles(`
      forge-scaffold > [slot="body"] > *:not(:last-child) {
        margin-block-end: var(--forge-spacing-medium);
      }

      .my-card {
        --forge-card-padding: 0;
      }

      .my-scaffold-body {
        padding: var(--forge-spacing-medium);
      }
    `)
  ],
  render: () => {
    return html`
      <forge-card class="my-card">
        <forge-scaffold>
          <div slot="body" class="my-scaffold-body">
            <forge-text-field>
              <label for="my-input">My Input</label>
              <input id="my-input" type="text" />
            </forge-text-field>
            <forge-button>My Button</forge-button>
          </div>
        </forge-scaffold>
      </forge-card>
    `;
  }
};
