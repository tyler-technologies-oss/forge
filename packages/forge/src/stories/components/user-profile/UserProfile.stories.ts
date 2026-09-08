import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { addons } from 'storybook/preview-api';
import { action } from 'storybook/actions';
import { DARK_MODE_EVENT_NAME, UPDATE_DARK_MODE_EVENT_NAME } from '@vueless/storybook-dark-mode';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconAccount, tylIconSettings } from '@tylertech/tyler-icons';
import type { ThemeToggleTheme, ThemeToggleUpdateEventData } from '@tylertech/forge/theme-toggle';
import type { IUserProfileComponent } from '@tylertech/forge/user-profile';

import '@tylertech/forge/user-profile';
import '@tylertech/forge/user-profile/profile-link';
import '@tylertech/forge/app-bar';

const channel = addons.getChannel();

const signOutAction = action('forge-user-profile-sign-out');
const signInAction = action('forge-user-profile-sign-in');

IconRegistry.define([tylIconSettings, tylIconAccount]);

const component = 'forge-user-profile';

let hasAttachedThemeListener = false;
let lastThemeToggleChange: ThemeToggleTheme | null = null;

const meta = {
  title: 'Components/User Profile',
  render: args => {
    const userProfileRef = createRef<IUserProfileComponent>();

    function handleThemeChange(evt: CustomEvent<ThemeToggleUpdateEventData>): void {
      const mode = evt.detail.theme === 'system' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : evt.detail.theme;
      lastThemeToggleChange = evt.detail.theme;
      channel.emit(UPDATE_DARK_MODE_EVENT_NAME, mode);
    }

    function handleStorybookThemeUpdate(isDark: boolean): void {
      // We only need to respond to the event if the theme toggle was not just changed to 'system'
      if (lastThemeToggleChange === 'system') {
        lastThemeToggleChange = null;
        return;
      }

      if (userProfileRef.value) {
        userProfileRef.value.setTheme(isDark ? 'dark' : 'light');
      }
    }

    // Make sure we only attach the theme listener once across multiple renders
    if (!hasAttachedThemeListener) {
      channel.on(DARK_MODE_EVENT_NAME, handleStorybookThemeUpdate);
      hasAttachedThemeListener = true;
    }

    return html`<forge-app-bar theme-mode="scoped" title-text="Forge Extended">
      <forge-user-profile
        ${ref(userProfileRef)}
        @forge-user-profile-sign-in=${(evt: Event) => signInAction(evt)}
        @forge-user-profile-sign-out=${(evt: Event) => signOutAction(evt)}
        @forge-theme-toggle-update=${handleThemeChange}
        slot="end"
        button-label="${args.buttonAriaLabel}"
        ?theme-toggle=${args.showThemeToggle}
        image-url="${args.imageUrl}"
        full-name="${args.fullName}"
        email="first.last@tylertech.com">
        ${args.showSlottedLinks
          ? html`<forge-profile-link slot="link">
                <forge-icon slot="icon" name="settings"></forge-icon>
                <a href="http://www.google.com" target="_blank">Settings</a>
              </forge-profile-link>
              <forge-profile-link slot="link">
                <forge-icon slot="icon" name="account"></forge-icon>
                <a href="http://www.google.com" target="_blank">Profile</a>
              </forge-profile-link>`
          : nothing}
        ${args.signInButtonText.length ? html`<span slot="sign-in-button-text">${args.signInButtonText}</span>` : ''}
        ${args.signOutButtonText.length ? html`<span slot="sign-out-button-text">${args.signOutButtonText}</span>` : ''}
      </forge-user-profile>
    </forge-app-bar>`;
  },
  component,
  subcomponents: {
    ['Profile Link']: 'forge-profile-link'
  },
  argTypes: {
    fullName: { control: 'text' },
    signInButtonText: { control: 'text' },
    signOutButtonText: { control: 'text' },
    buttonAriaLabel: { control: 'text' },
    imageUrl: { control: 'text' },
    showSlottedLinks: { control: 'boolean' },
    showThemeToggle: { control: 'boolean' }
  },
  args: {
    fullName: 'First Last',
    signInButtonText: 'Sign in',
    signOutButtonText: 'Sign Out',
    buttonAriaLabel: 'Open the incredibly awesome profile menu',
    imageUrl: '',
    showSlottedLinks: true,
    showThemeToggle: true
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
