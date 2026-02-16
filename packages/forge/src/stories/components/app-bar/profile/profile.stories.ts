import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { action } from 'storybook/actions';
import { html } from 'lit';
import { generateCustomElementArgTypes, standaloneStoryParams } from '../../../utils';
import { IconRegistry } from '@tylertech/forge';
import { tylIconAssignment, tylIconSettings, tylIconWarning, tylIconWorkOutline } from '@tylertech/tyler-icons';

import '@tylertech/forge/app-bar';

const component = 'forge-app-bar-profile-button';
const profileClickedAction = action('forge-profile-card-profile');
const signOutClickedAction = action('forge-profile-card-sign-out');

IconRegistry.define([tylIconAssignment, tylIconWorkOutline, tylIconWarning, tylIconSettings]);

const meta = {
  title: 'Components/App Bar/Profile',
  render: ({ profileButton, profileButtonText, signOutButton, signOutButtonText, open, fullName, email, avatarLetterCount = 2 }) => html`
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
  `,
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

export const WithCustomContent: Story = {
  ...standaloneStoryParams,
  render: () => {
    function builder(): HTMLElement {
      const listElement = document.createElement('forge-list');
      listElement.addEventListener('forge-list-item-select', ({ detail }) => {
        console.warn('[profile-card] Selected custom item:', detail.value);
      });
      listElement.style.setProperty('--forge-list-padding', '0');
      listElement.appendChild(document.createElement('forge-divider'));
      listElement.appendChild(buildListItemElement('My Reports', 'assignment', 'reports'));
      listElement.appendChild(buildListItemElement('My Workflow', 'work_outline', 'workflow'));
      listElement.appendChild(buildListItemElement('My Alerts', 'warning', 'alerts'));
      listElement.appendChild(buildListItemElement('My Preferences', 'settings', 'preferences'));
      return listElement;
    }

    function buildListItemElement(text: string, icon: string, value: string): HTMLElement {
      const listItemElement = document.createElement('forge-list-item');
      listItemElement.value = value;

      const iconElement = document.createElement('forge-icon');
      iconElement.slot = 'leading';
      iconElement.name = icon;
      listItemElement.appendChild(iconElement);

      const buttonElement = document.createElement('button');
      buttonElement.type = 'button';
      buttonElement.innerText = text;
      listItemElement.appendChild(buttonElement);

      return listItemElement;
    }

    return html`
      <forge-app-bar title-text="Profile With Custom Content">
        <forge-app-bar-profile-button slot="end" full-name="First Last" email="first.last@email.com" .profileCardBuilder=${builder}>
        </forge-app-bar-profile-button>
      </forge-app-bar>
    `;
  }
};
