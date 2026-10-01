import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { IconRegistry } from '@tylertech/forge/icon';
import {
  tylIconAttachMoney,
  tylIconDashboard,
  tylIconError,
  tylIconInfo,
  tylIconMoreVert,
  tylIconPeople,
  tylIconShoppingCart,
  tylIconStar,
  tylIconTrendingUp,
  tylIconWarning
} from '@tylertech/tyler-icons';
import { standaloneStoryParams } from '../../utils.js';

import '@tylertech/forge/count-card';
import '@tylertech/forge/icon';
import '@tylertech/forge/badge';
import '@tylertech/forge/icon-button';
import '@tylertech/forge/menu';
import '@tylertech/forge/meter';

IconRegistry.define([
  tylIconAttachMoney,
  tylIconDashboard,
  tylIconError,
  tylIconInfo,
  tylIconMoreVert,
  tylIconPeople,
  tylIconShoppingCart,
  tylIconStar,
  tylIconTrendingUp,
  tylIconWarning
]);

const component = 'forge-count-card';

const meta = {
  title: 'Components/Count Card',
  component,
  render: args => html`
    <div style="width: 320px;">
      <forge-count-card theme=${args.theme || nothing} ?no-border=${args.noBorder}>
        ${args.showIcon ? html`<forge-icon slot="icon" name="attach_money"></forge-icon>` : nothing}
        ${args.showLabel ? html`<span slot="label">${args.labelText}</span>` : nothing}
        ${args.showHeaderEnd ? html`<forge-badge slot="header-end" theme=${args.theme || nothing}>${args.badgeText}</forge-badge>` : nothing}
        ${args.showAction
          ? html`
              <forge-icon-button slot="action" aria-label="More options">
                <forge-icon name="more_vert"></forge-icon>
              </forge-icon-button>
            `
          : nothing}
        <span slot="count">${args.countText}</span>
        ${args.showCountEnd ? html`<forge-badge slot="count-end" theme=${args.theme || nothing}>${args.countEndText}</forge-badge>` : nothing}
        ${args.showFullWidth
          ? html`
              <svg slot="full-width" viewBox="0 0 200 40" style="width: 100%; display: block;">
                <polyline
                  fill="none"
                  stroke="var(--forge-theme-primary)"
                  stroke-width="2"
                  points="0,35 20,30 40,32 60,25 80,28 100,20 120,22 140,15 160,18 180,10 200,5" />
              </svg>
            `
          : nothing}
      </forge-count-card>
    </div>
  `,
  argTypes: {
    theme: {
      control: 'select',
      options: ['none', 'primary', 'secondary', 'tertiary', 'success', 'error', 'warning', 'info', 'info-secondary'],
      description: 'Theme variant applied to the card',
      table: { category: 'Properties' }
    },
    noBorder: {
      control: 'boolean',
      description: 'Hide the card border',
      table: { category: 'Properties' }
    },
    showIcon: {
      control: 'boolean',
      description: 'Toggle the icon slot',
      table: { category: 'Slots' }
    },
    showLabel: {
      control: 'boolean',
      description: 'Toggle the label slot',
      table: { category: 'Slots' }
    },
    showHeaderEnd: {
      control: 'boolean',
      description: 'Toggle the header-end slot (badge)',
      table: { category: 'Slots' }
    },
    showAction: {
      control: 'boolean',
      description: 'Toggle the action slot (icon button)',
      table: { category: 'Slots' }
    },
    showCountEnd: {
      control: 'boolean',
      description: 'Toggle the count-end slot (badge)',
      table: { category: 'Slots' }
    },
    showFullWidth: {
      control: 'boolean',
      description: 'Toggle the full-width slot (sparkline)',
      table: { category: 'Slots' }
    },
    labelText: {
      control: 'text',
      description: 'Label text content',
      table: { category: 'Content' }
    },
    countText: {
      control: 'text',
      description: 'Count text content',
      table: { category: 'Content' }
    },
    countEndText: {
      control: 'text',
      description: 'Count end text content',
      table: { category: 'Content' }
    },
    badgeText: {
      control: 'text',
      description: 'Badge text content',
      table: { category: 'Content' }
    }
  },
  args: {
    theme: 'none',
    noBorder: false,
    showIcon: true,
    showLabel: true,
    showHeaderEnd: true,
    showAction: false,
    showCountEnd: false,
    showFullWidth: false,
    labelText: 'Tomorrows money',
    countText: '$303.33',
    countEndText: '+5%',
    badgeText: '+12%'
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const MultipleCards: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
      <forge-count-card>
        <forge-icon slot="icon" name="attach_money"></forge-icon>
        <span slot="label">Revenue</span>
        <span slot="count">$12,450.00</span>
      </forge-count-card>

      <forge-count-card>
        <forge-icon slot="icon" name="people"></forge-icon>
        <span slot="label">Total Users</span>
        <span slot="count">1,234</span>
      </forge-count-card>

      <forge-count-card>
        <forge-icon slot="icon" name="shopping_cart"></forge-icon>
        <span slot="label">Orders</span>
        <span slot="count">567</span>
      </forge-count-card>

      <forge-count-card>
        <forge-icon slot="icon" name="trending_up"></forge-icon>
        <span slot="label">Growth</span>
        <span slot="count">+23.5%</span>
      </forge-count-card>
    </div>
  `
};

export const WithFullWidth: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <div style="width: 320px;">
      <forge-count-card>
        <forge-icon slot="icon" name="trending_up"></forge-icon>
        <span slot="label">Weekly Sales</span>
        <span slot="count">$4,250.00</span>
        <svg slot="full-width" viewBox="0 0 200 40" style="width: 100%; display: block;">
          <polyline
            fill="none"
            stroke="var(--forge-theme-primary)"
            stroke-width="2"
            points="0,35 20,30 40,32 60,25 80,28 100,20 120,22 140,15 160,18 180,10 200,5" />
        </svg>
      </forge-count-card>
    </div>
  `
};

export const AdditionalBodyContent: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <style>
      .meter-body {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--forge-theme-text-medium);
      }

      .body-content {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .last-updated {
        color: var(--forge-theme-text-low);
      }
    </style>
    <div style="width: 320px;">
      <forge-count-card>
        <span slot="label">Todays money</span>
        <forge-badge slot="header-end" theme="success">
          +8.2%
          <forge-icon slot="end" name="trending_up"></forge-icon>
        </forge-badge>
        <span slot="count">$50,846.00</span>
        <div slot="body" class="meter-body">
          <span class="forge-typography--body1">66% of monthly target</span>
          <span class="forge-typography--body1">100k</span>
        </div>
        <div slot="body" class="body-content">
          <forge-meter value="0.66" min="0" max="1" theme="success"></forge-meter>
          <span class="forge-typography--label1 last-updated">Last updated 12/12/2025</span>
        </div>
      </forge-count-card>
    </div>
  `
};

export const WithMenu: Story = {
  ...standaloneStoryParams,
  render: () => {
    const menuOptions = [
      { label: 'View details', value: 'details' },
      { label: 'Export data', value: 'export' },
      { label: 'Remove card', value: 'remove' }
    ];

    return html`
      <div style="width: 320px;">
        <forge-count-card>
          <forge-icon slot="icon" name="attach_money"></forge-icon>
          <span slot="label">Revenue</span>
          <forge-menu slot="action" .options=${menuOptions}>
            <forge-icon-button aria-label="More options">
              <forge-icon name="more_vert"></forge-icon>
            </forge-icon-button>
          </forge-menu>
          <span slot="count">$12,450.00</span>
        </forge-count-card>
      </div>
    `;
  }
};

export const Themes: Story = {
  ...standaloneStoryParams,
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
      <forge-count-card theme="none">
        <forge-icon slot="icon" name="dashboard"></forge-icon>
        <span slot="label">None (Default)</span>
        <span slot="count">100</span>
      </forge-count-card>

      <forge-count-card theme="primary">
        <forge-icon slot="icon" name="star"></forge-icon>
        <span slot="label">Primary</span>
        <span slot="count">1,234</span>
      </forge-count-card>

      <forge-count-card theme="secondary">
        <forge-icon slot="icon" name="people"></forge-icon>
        <span slot="label">Secondary</span>
        <span slot="count">5,678</span>
      </forge-count-card>

      <forge-count-card theme="tertiary">
        <forge-icon slot="icon" name="shopping_cart"></forge-icon>
        <span slot="label">Tertiary</span>
        <span slot="count">910</span>
      </forge-count-card>

      <forge-count-card theme="success">
        <forge-icon slot="icon" name="trending_up"></forge-icon>
        <span slot="label">Success</span>
        <span slot="count">+23.5%</span>
      </forge-count-card>

      <forge-count-card theme="error">
        <forge-icon slot="icon" name="error"></forge-icon>
        <span slot="label">Error</span>
        <span slot="count">12</span>
      </forge-count-card>

      <forge-count-card theme="warning">
        <forge-icon slot="icon" name="warning"></forge-icon>
        <span slot="label">Warning</span>
        <span slot="count">47</span>
      </forge-count-card>

      <forge-count-card theme="info">
        <forge-icon slot="icon" name="info"></forge-icon>
        <span slot="label">Info</span>
        <span slot="count">99+</span>
      </forge-count-card>

      <forge-count-card theme="info-secondary">
        <forge-icon slot="icon" name="attach_money"></forge-icon>
        <span slot="label">Info Secondary</span>
        <span slot="count">$12,450</span>
      </forge-count-card>
    </div>
  `
};
