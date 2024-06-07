import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import {
  standaloneStoryParams,
  transformCssPropsToControls,
  customElementStoryRenderer,
  generateCustomElementArgTypes,
  GLOBAL_THEME_OPTIONS
} from '../../utils';
import { tylIconNotifications } from '@tylertech/tyler-icons/standard';
import { IconRegistry } from '@tylertech/forge/icon/icon-registry';

import '@tylertech/forge/badge';
import '@tylertech/forge/icon-button';
import '@tylertech/forge/icon';

const component = 'forge-badge';

const meta = {
  title: 'Components/Badge',
  render: args => {
    const el = customElementStoryRenderer(component, args);
    el.innerHTML = args.text;
    return el;
  },
  component,
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      controls: {
        theme: { control: 'select', options: ['default', ...GLOBAL_THEME_OPTIONS, 'info-primary', 'info-secondary'] }
      }
    })
  },
  args: {
    text: 'Status'
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const Themed: Story = {
  ...standaloneStoryParams,
  render: () => {
    return html`
      <div style="display: flex; gap: 8px;">
        <forge-badge theme="default">default</forge-badge>
        <forge-badge theme="primary">Primary</forge-badge>
        <forge-badge theme="secondary">Secondary</forge-badge>
        <forge-badge theme="tertiary">Tertiary</forge-badge>
        <forge-badge theme="success">Success</forge-badge>
        <forge-badge theme="error">Error</forge-badge>
        <forge-badge theme="warning">Warning</forge-badge>
        <forge-badge theme="info">Info</forge-badge>
        <forge-badge theme="info-secondary">Info (secondary)</forge-badge>
      </div>
    `;
  }
};

export const Strong: Story = {
  ...standaloneStoryParams,
  args: {
    strong: true
  },
  render: () => {
    return html`
      <div style="display: flex; gap: 8px;">
        <forge-badge strong theme="default">default</forge-badge>
        <forge-badge strong theme="primary">Primary</forge-badge>
        <forge-badge strong theme="secondary">Secondary</forge-badge>
        <forge-badge strong theme="tertiary">Tertiary</forge-badge>
        <forge-badge strong theme="success">Success</forge-badge>
        <forge-badge strong theme="error">Error</forge-badge>
        <forge-badge strong theme="warning">Warning</forge-badge>
        <forge-badge strong theme="info">Info</forge-badge>
        <forge-badge strong theme="info-secondary">Info (secondary)</forge-badge>
      </div>
    `;
  }
};

export const WithIconButton: Story = {
  ...standaloneStoryParams,
  render: () => {
    IconRegistry.define(tylIconNotifications);
    return html`
      <forge-icon-button>
        <forge-icon name="notifications" style="position: absolute;"></forge-icon>
        <forge-badge slot="badge">1</forge-badge>
      </forge-icon-button>
    `;
  }
};
