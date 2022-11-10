// tslint:disable variable-name
import React, { useEffect } from 'react';
import { Meta } from '@storybook/react';
import { argTypes, IBadgeProps } from './badge-arg-types';
import { Story } from '@storybook/react';
import { ForgeBadge, ForgeIcon, ForgeIconButton } from '@tylertech/forge-react';
import { IconRegistry } from '@tylertech/forge';
import { tylIconNotifications } from '@tylertech/tyler-icons/standard';

const MDX = require('./badge.mdx').default;

export default {
  title: 'Components/Badge',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default: Story<IBadgeProps> = ({
  text = '',
  open = true,
  strong = false,
  dot = false,
  positioned = false,
  theme = 'default'
}) => (
  <ForgeBadge dot={dot} open={open} positioned={positioned} strong={strong} theme={theme}>{text}</ForgeBadge>
);
Default.args = {
  dot: false,
  open: true,
  theme: 'default',
  positioned: false,
  strong: false,
  text: 'Default'
} as IBadgeProps;

export const WithIconButton: Story<IBadgeProps> = ({
  text = '',
  open = true,
  strong = false,
  dot = false,
  positioned = false,
  theme = 'default'
}) => {
  useEffect(() => {
    IconRegistry.define(tylIconNotifications);
  }, []);

  const demoIconButtonStyles = {
    color: 'var(--mdc-theme-on-surface, #000000)',
  };

  return (
    <ForgeIconButton style={demoIconButtonStyles} className="forge-icon-button--with-badge">
      <button type="button">
        <ForgeIcon name="notifications" />
      </button>
      <ForgeBadge  dot={dot} open={open} positioned={positioned} strong={strong} theme={theme}>{text}</ForgeBadge>
    </ForgeIconButton>
  )
};
WithIconButton.args = {
  dot: false,
  open: true,
  theme: 'default',
  positioned: true,
  strong: false,
  text: '3'
} as IBadgeProps;

export const withIcon: Story<IBadgeProps> = ({
  text = 'Default',
  open = true,
  strong = false,
  dot = false,
  positioned = false,
  theme = 'default'
}) => {
  useEffect(() => {
    IconRegistry.define(tylIconNotifications)
  }, []);

  return (
    <ForgeBadge dot={dot} open={open} positioned={positioned} strong={strong} theme={theme}>
      <ForgeIcon slot="leading" name="notifications" />
      {text}
    </ForgeBadge>
  )
}
