import React, { useEffect } from 'react';
import { Story } from '@storybook/react';
import { ForgeAppBar, ForgeAppBarProfileButton, ForgeIcon } from '@tylertech/forge-react';
import { IAppBarProfileProps } from '../app-bar-profile-args';
import { IconRegistry } from '@tylertech/forge';
import { tylIconForgeLogo } from '@tylertech/tyler-icons/custom';

export const DefaultTemplate: Story<IAppBarProfileProps> = ({
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
  
  const profileProps = {
    fullName,
    email,
    avatarImageUrl,
    avatarLetterCount,
    avatarText,
    signOutButton,
    profileButton,
  };
  const showToast = (msg: string) => {
    const toast = document.createElement('forge-toast');
    toast.message = msg;
    document.body.appendChild(toast);
  }
  return (
    <ForgeAppBar title-text="Title text">
      <ForgeIcon slot="logo" name="forge_logo" style={{fontSize: '2.5rem'}} />
      <ForgeAppBarProfileButton
        {...profileProps}
        on-forge-profile-card-sign-out={() => showToast('Sign out button clicked')}
        on-forge-profile-card-profile={() => showToast('Profile button clicked')}
        slot="end">
      </ForgeAppBarProfileButton>
    </ForgeAppBar>
  );
};
