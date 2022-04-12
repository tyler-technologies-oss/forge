import { Story } from '@storybook/react';
import { ForgeBanner, ForgeButton } from '@tylertech/forge-react';
import React from 'react';
import { MobilePreview } from '../../shared/mobile-preview';
import { IBannerProps } from '../banner-args';

export const MobileTemplate: Story<IBannerProps> = ({
  dismissed = false,
  canDismiss = true,
  theme = 'default',
  hasIcon = false,
  hasButton = false,
}) => {
  const bannerProps = {
    dismissed,
    canDismiss,
    theme
  };
  const Button = () => hasButton 
    ? (<ForgeButton type="outlined" slot="button">
          <button type="button" style={{backgroundColor: '#ffffff'}}>Learn more...</button>
      </ForgeButton>) 
    : null;
  const Icon = () => hasIcon 
    ? (<i className="tyler-icons" slot="icon">add_alert</i>) 
    : null;
  return (
    <MobilePreview>      
      <ForgeBanner style={{width: '320px', display: 'block'}} {...bannerProps}>
        <Icon/>
        <div>Minim sunt eu laborum labore minim.</div>
        <Button/>
      </ForgeBanner>
    </MobilePreview>
  );
};
