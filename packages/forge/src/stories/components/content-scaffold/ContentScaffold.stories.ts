import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import '@tylertech/forge/content-scaffold';

const component = 'forge-content-scaffold';

const meta = {
  title: 'Components/Content Scaffold',
  component,
  tags: ['hidden'],
  render: () => html`
    <forge-content-scaffold id="storybook-demo">
      <div slot="before-header-start">before-header-start</div>
      <div slot="header-start">header-start</div>
      <div slot="header-end">header-end</div>
      <div class="body" slot="body">
        <div class="body-inner">body</div>
      </div>
      <div slot="footer-start">footer-start</div>
      <div slot="footer-end">footer-end</div>
    </forge-content-scaffold>
  `
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
