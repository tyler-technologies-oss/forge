import { Meta } from '@storybook/react';
import { DefaultTemplate } from './templates/default';
import { IAppBarProfileProps, argTypes } from './app-bar-profile-args';
const MDX = require('./app-bar-profile.mdx').default;

export default {
  title: 'Components/App Bar/Profile',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  fullName: 'First Last',
  email: 'first.last@tylertech.com',
  avatarImageUrl: 'https://en.gravatar.com/userimage/27084046/aa996f464ca8f1ea69769cef1b76fbf9.jpg',
  avatarLetterCount: 2,
  avatarText: 'First Last',
  signOutButton: true,
  profileButton: true,
} as IAppBarProfileProps;
