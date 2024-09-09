import { type Meta, type StoryObj } from '@storybook/web-components';
import { action } from '@storybook/addon-actions';
import { html } from 'lit';
import { generateCustomElementArgTypes } from '../../../utils';

import '@tylertech/forge/app-bar';

const component = 'forge-app-bar-profile-button';
const profileClickedAction = action('forge-profile-card-profile');
const signOutClickedAction = action('forge-profile-card-sign-out');

const meta = {
  title: 'Components/App Bar/Profile',
  render: ({ profileButton, profileButtonText, signOutButton, signOutButtonText, open, fullName, email, avatarLetterCount = 2 }) => {
    return html`
      <forge-app-bar title-text="Profile">
        <forge-app-bar-profile-button
          slot="end"
          @forge-profile-card-profile=${profileClickedAction}
          @forge-profile-card-sign-out=${signOutClickedAction}
          .avatarLetterCount=${avatarLetterCount}
          .profileButton=${profileButton}
          .profileButtonText=${profileButtonText}
          .signOutButton=${signOutButton}
          .signOutButtonText=${signOutButtonText}
          .fullName=${fullName}
          .email=${email}
          .open=${open}>
        </forge-app-bar-profile-button>
      </forge-app-bar>
    `;
  },
  component,
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['avatarIcon', 'avatarImageUrl', 'avatarText', 'popupElement', 'profileCardBuilder']
    })
  },
  args: {
    email: 'first.last@tylertech.com',
    fullName: 'First Last',
    open: false,
    profileButton: false,
    signOutButton: true
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
