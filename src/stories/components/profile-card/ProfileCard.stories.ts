import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { customElementStoryRenderer, generateCustomElementArgTypes } from '../../utils';

import '@tylertech/forge/profile-card';

const component = 'forge-profile-card';

const meta = {
  title: 'Components/Profile Card',
  render: args => customElementStoryRenderer(component, args),
  component,
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component
    })
  },
  args: {
    fullName: 'First Last',
    email: 'first.last@tylertech.com',
    signOut: true,
    profile: true,
    avatarText: 'First Last'
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
