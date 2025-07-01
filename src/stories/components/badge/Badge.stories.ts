import { html, nothing } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { standaloneStoryParams, customElementStoryRenderer, generateCustomElementArgTypes, GLOBAL_THEME_OPTIONS, getCssVariableArgs } from '../../utils';
import { tylIconNotifications, tylIconAlert } from '@tylertech/tyler-icons';
import { IconRegistry } from '@tylertech/forge/icon/icon-registry';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

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
    text: 'Status',
    dot: false,
    theme: 'default',
    strong: false,
    hide: false
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
        <forge-badge theme="default">Default</forge-badge>
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
        <forge-badge strong theme="default">Default</forge-badge>
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

export const WithIcon: Story = {
  ...standaloneStoryParams,
  render: () => {
    IconRegistry.define(tylIconAlert);
    return html`
      <forge-badge>
        <forge-icon name="alert" slot="start"></forge-icon>
        <span>Warning</span>
      </forge-badge>
    `;
  }
};

export const WithIconButton: Story = {
  ...standaloneStoryParams,
  render: () => {
    IconRegistry.define(tylIconNotifications);
    return html`
      <forge-icon-button>
        <forge-icon name="notifications"></forge-icon>
        <forge-badge slot="badge">1</forge-badge>
      </forge-icon-button>
    `;
  }
};

export const CSSOnly: Story = {
  parameters: {
    controls: { exclude: ['hide', 'strong'] }
  },
  args: {
    dot: false,
    showIcon: false
  },
  render: ({ text, dot, showIcon, ...args }) => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    const classes = {
      'forge-badge': true,
      'forge-badge--dot': dot
    };
    return html`
      <div class=${classMap(classes)} style=${style}>
        ${showIcon && !dot
          ? html`<svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>Forge design system logo</title>
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M20.9 3.2h-7.5c-.4 0-.7.2-.9.5l-1.6 2.9c-.3.5-.1 1.2.4 1.5.2.1.4.1.5.1h7.5c.4 0 .7-.2.9-.5l1.6-2.9c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.1-.5-.1zm-3.6 6.2H9.8c-.4 0-.8.2-1 .6l-1.6 2.7c-.2.3-.2.8 0 1.1l3.8 6.5c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l5.3-9.2c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.2-.5-.2zm-6.9-4.6c.3-.5.1-1.2-.4-1.5-.2-.1-.4-.1-.6-.1H3c-.6 0-1.1.5-1.1 1.1 0 .2.1.4.1.5l2.7 4.6.5.9c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l3.3-5.5z" />
            </svg>`
          : ''}
        ${dot ? nothing : text}
      </div>
    `;
  }
};
