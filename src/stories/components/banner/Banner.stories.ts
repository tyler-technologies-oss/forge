import { html } from 'lit';
import { action } from 'storybook/actions';
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { tylIconNotifications } from '@tylertech/tyler-icons';
import { IconRegistry } from '@tylertech/forge/icon/icon-registry';

import '@tylertech/forge/banner';
import '@tylertech/forge/icon-button';
import '@tylertech/forge/button';
import '@tylertech/forge/icon';
import { GLOBAL_THEME_OPTIONS, customElementStoryRenderer, generateCustomElementArgTypes, standaloneStoryParams } from '../../utils';
import { BANNER_CONSTANTS } from '@tylertech/forge/banner';

const component = 'forge-banner';

const dismissedAction = action('forge-banner-dismissed');
const beforeDismissAction = action('forge-banner-before-dismiss');

const meta = {
  title: 'Components/Banner',
  render: args => {
    const el = customElementStoryRenderer('forge-banner', args);
    el.addEventListener('forge-banner-dismissed', dismissedAction);
    el.addEventListener('forge-banner-before-dismiss', beforeDismissAction);
    el.innerHTML = args.text;
    return el;
  },
  component,
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['canDismiss'],
      controls: {
        theme: { control: 'select', options: [...GLOBAL_THEME_OPTIONS, 'info-secondary'] }
      }
    })
  },
  args: {
    theme: BANNER_CONSTANTS.defaults.THEME,
    text: 'Minim sunt eu laborum labore minim.',
    dismissed: false,
    persistent: false
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const Themed: Story = {
  ...standaloneStoryParams,
  render: () => {
    return html`
      <div style="display: flex; gap: 12px; flex-direction: column;">
        <forge-banner theme="error">Error</forge-banner>
        <forge-banner theme="warning">Warning</forge-banner>
        <forge-banner theme="success">Success</forge-banner>
        <forge-banner theme="info">Info (default)</forge-banner>
        <forge-banner theme="info-secondary">Info (secondary)</forge-banner>
      </div>
    `;
  }
};

export const Combined: Story = {
  ...standaloneStoryParams,
  render: () => {
    IconRegistry.define(tylIconNotifications);

    return html`
      <forge-banner>
        Minim sunt eu laborum labore minim iconium buttonium.
        <forge-icon slot="icon" name="notifications"></forge-icon>
        <forge-button slot="button" variant="outlined">Learn more...</forge-button>
      </forge-banner>
    `;
  }
};

export const CSSOnly: Story = {
  ...standaloneStoryParams,
  render: () => {
    return html`
      <div class="forge-banner">
        <svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M10.01 21.01c0 1.1.89 1.99 1.99 1.99s1.99-.89 1.99-1.99h-3.98zm8.87-4.19V11c0-3.25-2.25-5.97-5.29-6.69v-.72C13.59 2.71 12.88 2 12 2s-1.59.71-1.59 1.59v.72A6.873 6.873 0 005.12 11v5.82L3 18.94V20h18v-1.06l-2.12-2.12zM16 13.01h-3v3h-2v-3H8V11h3V8h2v3h3v2.01z" />
        </svg>
        <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>
        <button type="button" class="forge-button forge-button--outlined">Learn more</button>
      </div>
    `;
  }
};
