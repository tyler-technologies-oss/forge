import { type Meta, type StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { tylIconForgeLogo } from '@tylertech/tyler-icons';
import { storyStyles } from '../../../decorators';
import { IconRegistry } from '@tylertech/forge/icon/icon-registry';

import '@tylertech/forge/scaffold';
import '@tylertech/forge/app-bar';
import '@tylertech/forge/card';
import '@tylertech/forge/button';
import '@tylertech/forge/icon';

import styles from './SkipToMainContent.scss?inline';

IconRegistry.define(tylIconForgeLogo);

const meta = {
  title: 'Recipes/Accessibility/Skip To Main Content',
  decorators: [storyStyles(styles)],
  render: () => html`
    <div class="container">
      <a class="skip-to-main-content" href="javascript: void(0);" onclick="event.preventDefault(); document.getElementById('content').focus();">
        Skip to main content
      </a>

      <forge-app-bar title-text="App Title">
        <forge-icon slot="logo" name="forge_logo"></forge-icon>
      </forge-app-bar>
      <main class="content" id="content" tabindex="0">
        <forge-card class="card">
          <forge-button variant="raised" onclick="document.querySelector('.skip-to-main-content').focus()"> Focus skip to main content link </forge-button>
        </forge-card>
      </main>
    </div>
  `,
  parameters: {
    controls: { disable: true },
    actions: { disable: true }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
