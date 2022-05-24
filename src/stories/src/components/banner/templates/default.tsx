import { Story } from '@storybook/react';
import { ForgeBanner, ForgeButton, ForgeIcon } from '@tylertech/forge-react';
import React, { useEffect } from 'react';
import { IBannerProps } from '../banner-args';
import { IconRegistry } from '@tylertech/forge';
import { tylIconAddAlert } from '@tylertech/tyler-icons/standard';

export const DefaultTemplate: Story<IBannerProps> = ({
  dismissed = false,
  canDismiss = true,
  theme = 'default',
  hasIcon = false,
  hasButton = false,
}) => {
  useEffect(() => {
    IconRegistry.define(tylIconAddAlert);
  }, []);

  return (
    <ForgeBanner dismissed={dismissed} canDismiss={canDismiss} theme={theme}>
      {hasIcon && <ForgeIcon slot="icon" name="add_alert"></ForgeIcon>}
      <div>Minim sunt eu laborum labore minim.</div>
      {hasButton && <ForgeButton type="outlined" slot="button">
        <button type="button" style={{backgroundColor: '#ffffff'}}>Learn more...</button>
      </ForgeButton>}
    </ForgeBanner>
  );
};
