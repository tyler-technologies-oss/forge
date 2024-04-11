import { Meta } from '@storybook/react';
import React, { useEffect } from 'react';
import { Story } from '@storybook/react';
import { ForgeAppBar, ForgeAppBarProfileButton, ForgeIcon } from '@tylertech/forge-react';
import { IconRegistry, ToastComponent } from '@tylertech/forge';
import { tylIconForgeLogo } from '@tylertech/tyler-icons/custom';
import { IAppBarProfileProps, argTypes } from './app-bar-profile-args';
import { tylIconPerson } from '@tylertech/tyler-icons/standard';

const MDX = require('./app-bar-profile.mdx').default;

export default {
  title: 'Components/App Bar/Profile',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    }
  }
} as Meta;

export const Default: Story<IAppBarProfileProps> = ({
  fullName = 'First Last',
  email = 'first.last@tylertech.com',
  avatarLetterCount = 2,
  avatarText = 'First Last',
  useAvatarImage = false,
  useAvatarIcon = false,
  signOutButton = true,
  profileButton = true,
}) => {
  useEffect(() => {
    IconRegistry.define([tylIconForgeLogo, tylIconPerson]);
  }, []);

  function showToast(message: string): void {
    ToastComponent.present({ message });
  }

  return (
    <ForgeAppBar title-text="Title text">
      <ForgeIcon slot="logo" name="forge_logo" style={{fontSize: '2.5rem'}} />
      <ForgeAppBarProfileButton
        fullName={fullName}
        email={email}
        avatarImageUrl={useAvatarImage && !useAvatarIcon ? 'https://en.gravatar.com/userimage/27084046/aa996f464ca8f1ea69769cef1b76fbf9.jpg' : null}
        avatarLetterCount={avatarLetterCount}
        avatarText={!useAvatarIcon ? avatarText : null}
        avatarIcon={useAvatarIcon ? 'person' : null}
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
  avatarLetterCount: 2,
  avatarText: 'First Last',
  useAvatarImage: false,
  useAvatarIcon: false,
  signOutButton: true,
  profileButton: true,
} as IAppBarProfileProps;
