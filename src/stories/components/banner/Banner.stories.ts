import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { standaloneStoryParams, transformCssPropsToControls, customElementStoryRenderer } from '../utils';
import { tylIconNotifications } from '@tylertech/tyler-icons/standard';
import { IconRegistry } from '@tylertech/forge/icon/icon-registry';

import '@tylertech/forge/banner';
import '@tylertech/forge/icon-button';
import '@tylertech/forge/button';
import '@tylertech/forge/icon';

const meta = {
  title: 'Components/Banner',
  render: args => {
    const el = customElementStoryRenderer('forge-banner', args);
    el.innerHTML = args.text;
    return el;
  },
  component: 'forge-banner',
  parameters: {
    controls: {
      exclude: /^(icon|button|forge-banner-before-dismiss|forge-banner-dismissed)$/i,
    },
    actions: { disable: true }
  },
  argTypes: {
    ...transformCssPropsToControls('forge-banner'),
    theme: { control: 'select', options: ['danger', 'warning', 'success', 'info (default)', 'info-secondary'] }
  },
  args: {
    theme: 'info (default)',
    text: 'Minim sunt eu laborum labore minim.',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const Themed: Story = {
  ...standaloneStoryParams,
  render: () => {
    return html`
    <div style="display: flex; gap: 12px; flex-direction: column;">
      <forge-banner theme="danger">Danger</forge-banner>
      <forge-banner theme="warning">Warning</forge-banner>
      <forge-banner theme="success">Success</forge-banner>
      <forge-banner theme="info">Info (default)</forge-banner>
      <forge-banner theme="info-secondary">Info (secondary)</forge-banner>
    </div>
    `;
  },
}

export const Combined: Story = {
  ...standaloneStoryParams,
  render: () => {
    IconRegistry.define(tylIconNotifications);

    return html`
    <forge-banner>
      Minim sunt eu laborum labore minim iconium buttonium.
      <forge-icon slot="icon" name="notifications"></forge-icon>
      <forge-button slot="button" variant="outlined" style="background: #ffffff">Learn more...</forge-button>
    </forge-banner>
    `;
  },
}