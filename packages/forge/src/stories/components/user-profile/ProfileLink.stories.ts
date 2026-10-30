import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconAccount, tylIconHistory, tylIconSettings } from '@tylertech/tyler-icons';

import '@tylertech/forge/user-profile/profile-link';

IconRegistry.define([tylIconSettings, tylIconAccount, tylIconHistory]);

const component = 'forge-profile-link';

const meta = {
  tags: ['hidden'],
  title: 'Components/User Profile/Profile Link',
  render: () => html`
    <forge-profile-link slot="link">
      <forge-icon slot="icon" name="history"></forge-icon>
      <a href="http://www.google.com" target="_blank">Audit log</a>
    </forge-profile-link>
    <forge-profile-link slot="link">
      <forge-icon slot="icon" name="settings" external></forge-icon>
      <a href="http://www.google.com" target="_blank">Application settings</a>
    </forge-profile-link>
    <forge-profile-link slot="link">
      <forge-icon slot="icon" name="account"></forge-icon>
      <a href="http://www.google.com" target="_blank">Profile</a>
    </forge-profile-link>
  `,
  component
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
