import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import '@tylertech/forge/button';
import '@tylertech/forge/page-state';

const meta = {
  title: 'Recipes/Error Pages/Not Found',
  render: () => html`
    <forge-page-state>
      <img src="https://cdn.forge.tylertech.com/v1/images/spot-hero/404-error-spot-hero.svg" alt="" slot="graphic" />
      <div slot="title">Nothing but tumbleweeds here...</div>
      <p slot="message">Even our best explorer couldn't find the page you're looking for. It might have been removed or you may have mistyped the URL.</p>
      <forge-button variant="raised" slot="action">Go back</forge-button>
      <forge-button variant="outlined" slot="action">Refresh</forge-button>
    </forge-page-state>
  `,
  parameters: {
    controls: { disable: true },
    actions: { disable: true }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
