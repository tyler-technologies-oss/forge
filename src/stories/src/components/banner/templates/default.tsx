import { Story } from '@storybook/react';
import { ForgeBanner, ForgeButton } from '@tylertech/forge-react';
import React, { FC } from 'react';
import { IBannerProps } from '../banner-args';

export const DefaultTemplate: Story<IBannerProps> = ({
  dismissed = false,
  canDismiss = true,
  theme = 'default',
  hasIcon = false,
  hasButton = false,
}) => {
  const bannerProps = {
    dismissed,
    canDismiss, 
    theme,
  };
  const Button: FC = () => hasButton 
    ? (<ForgeButton type="outlined" slot="button">
          <button type="button" style={{backgroundColor: '#ffffff'}}>Learn more...</button>
      </ForgeButton>) 
    : null;
  const Icon: FC = () => hasIcon 
    ? (<i className="tyler-icons" slot="icon">add_alert</i>) 
    : null;
  return (
    <ForgeBanner {...bannerProps}>
      <Icon/>
      <div>Minim sunt eu laborum labore minim.</div>
      <Button/>
    </ForgeBanner>
  );
};
