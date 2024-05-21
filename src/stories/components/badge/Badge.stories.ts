import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { standaloneStoryParams, transformCssPropsToControls, customElementStoryRenderer } from '../utils';
import { tylIconNotifications } from '@tylertech/tyler-icons/standard';
import { IconRegistry } from '@tylertech/forge/icon/icon-registry';

import '@tylertech/forge/badge';
import '@tylertech/forge/icon-button';
import '@tylertech/forge/icon';

const meta = {
  title: 'Components/Badge',
  render: args => {
    const el = customElementStoryRenderer('forge-badge', args);
    el.innerHTML = args.text;
    return el;
  },
  component: 'forge-badge',
  parameters: {
    controls: {
      exclude: /^(start|end)$/i,
      include: {
        positioned: { control: 'boolean' },
      }
    },
    actions: { disable: true }
  },
  argTypes: {
    ...transformCssPropsToControls('forge-badge'),
    theme: { control: 'select', options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'] }
  },
  args: {
    theme: 'default',
    text: '3',
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
      <forge-badge theme="danger">Danger</forge-badge>
      <forge-badge theme="warning">Warning</forge-badge>
      <forge-badge theme="success">Success</forge-badge>
      <forge-badge theme="info">Info (primary)</forge-badge>
      <forge-badge theme="info-secondary">Info (secondary)</forge-badge>
      <forge-badge theme="default">default</forge-badge>
    </div>
    `;
  },
}

export const WithIcon: Story = {
  ...standaloneStoryParams,
  render: () => {
    IconRegistry.define(tylIconNotifications);
    return html`
    <forge-icon-button>
      <forge-icon name="notifications" style="position: absolute;"></forge-icon>
      <forge-badge slot="badge">1</forge-badge>
    </forge-icon-button>
    `;
  },
};

