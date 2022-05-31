import { Meta } from '@storybook/react';
import React, { useEffect } from 'react';
import { Story } from '@storybook/react';
import { ForgeAppBar, ForgeAppBarProfileButton, ForgeIcon } from '@tylertech/forge-react';
import { IconRegistry } from '@tylertech/forge';
import { tylIconForgeLogo } from '@tylertech/tyler-icons/custom';
import { IAppBarProfileProps, argTypes } from './app-bar-profile-args';

const MDX = require('./app-bar-profile.mdx').default;

export default {
  title: 'Components/App Bar/Profile',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
    controls: {
      disable: true
    }
  }
} as Meta;

export const Default: Story<IAppBarProfileProps> = ({
  fullName = 'First Last',
  email = 'first.last@tylertech.com',
  avatarImageUrl = 'https://en.gravatar.com/userimage/27084046/aa996f464ca8f1ea69769cef1b76fbf9.jpg',
  avatarLetterCount = 2,
  avatarText = 'FL',
  signOutButton = true,
  profileButton = true,
}) => {
  useEffect(() => {
    IconRegistry.define(tylIconForgeLogo);
  }, []);

  function showToast(msg: string): void {
    const toast = document.createElement('forge-toast');
    toast.message = msg;
    document.body.appendChild(toast);
  }

  return (
    <ForgeAppBar title-text="Title text">
      <ForgeIcon slot="logo" name="forge_logo" style={{fontSize: '2.5rem'}} />
      <ForgeAppBarProfileButton
        fullName={fullName}
        email={email}
        avatarImageUrl={avatarImageUrl}
        avatarLetterCount={avatarLetterCount}
        avatarText={avatarText}
        signOutButton={signOutButton}
        profileButton={profileButton}
        on-forge-profile-card-sign-out={() => showToast('Sign out button clicked')}
        on-forge-profile-card-profile={() => showToast('Profile button clicked')}
        slot="end">
      </ForgeAppBarProfileButton>
    </ForgeAppBar>
  );
};
Default.args = {
  fullName: 'First Last',
  email: 'first.last@tylertech.com',
  avatarImageUrl: 'https://en.gravatar.com/userimage/27084046/aa996f464ca8f1ea69769cef1b76fbf9.jpg',
  avatarLetterCount: 2,
  avatarText: 'First Last',
  signOutButton: true,
  profileButton: true,
} as IAppBarProfileProps;
