import { Meta } from '@storybook/react';
const MDX = require('./avatar.mdx').default;
import { DefaultTemplate } from './templates/default';
import { argTypes, IAvatarProps } from './avatar-args';

export default {
  title: 'Components/Avatar',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Image = DefaultTemplate.bind({});
Image.args = {
  autoColor: false,
  imageUrl: 'https://en.gravatar.com/userimage/27084046/aa996f464ca8f1ea69769cef1b76fbf9.jpg',
  letterCount: 2,
  text: '',
} as IAvatarProps;

export const Letter = DefaultTemplate.bind({});
Letter.args = {
  autoColor: false,
  imageUrl : '',
  letterCount: 2,
  text: 'First Last',
} as IAvatarProps;